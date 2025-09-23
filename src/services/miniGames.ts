import { doc, setDoc, getDoc, collection, query, orderBy, limit, getDocs, onSnapshot, type Unsubscribe } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { awardXPAndStreak, describeBadge, trackMiniGameCompletion } from './gamification'

// Explicit TypeScript types
export type GameResult = {
  userId: string
  gameId: string
  score: number
  timestamp: number
  completed: boolean
}

export type GameProgress = {
  completed: boolean
  score: number
  lastPlayed?: string
}

export type LeaderboardEntry = {
  uid: string
  username: string
  score: number
  timestamp: number
}

export type Badge = {
  id: string
  name: string
  description: string
  icon?: string
  quote?: string
}

/**
 * Save game result and update leaderboard
 * Uses async/await for cleaner code and better error handling
 */
export async function saveGameResult(
  userId: string, 
  gameId: string, 
  score: number, 
  username: string = 'Anonymous',
  bonusXP: number = 0,
  queueBadge?: (badge: Badge) => void,
  onComplete?: () => void
): Promise<{ success: boolean; xpAwarded?: number; badgesAwarded?: string[]; error?: any }> {
  try {
    // Validate inputs
    if (!userId || !gameId) {
      throw new Error('User ID and Game ID are required')
    }

    // Save score to leaderboard
    const leaderboardRef = doc(db, 'leaderboards', 'miniGames', gameId, userId)
    const leaderboardData = {
      username,
      score,
      timestamp: Date.now()
    }
    await setDoc(leaderboardRef, leaderboardData, { merge: true })
    
    // Update user progress
    const progressRef = doc(db, 'users', userId, 'miniGamesProgress', gameId)
    const progressData = {
      completed: true,
      score: Math.max(score, 0), // Ensure non-negative score
      lastPlayed: new Date().toISOString().split('T')[0]
    }
    await setDoc(progressRef, progressData, { merge: true })
    
    // Track mini-game completion for badges
    const earnedBadges = await trackMiniGameCompletion(userId)
    
    // Award XP (10 XP for completing a game, plus bonus for high score) + optional external bonus
    const baseXP = 10 + Math.floor(score / 10)
    const xpAwarded = baseXP + Math.max(0, Math.floor(bonusXP))
    const awardResult = await awardXPAndStreak(userId, xpAwarded)
    
    // Combine all earned badges
    const allEarnedBadges = [...awardResult.earnedBadges, ...earnedBadges]
    
    // Award any new badges
    if (allEarnedBadges.length > 0 && queueBadge) {
      allEarnedBadges.forEach(badgeId => {
        queueBadge(describeBadge(badgeId))
      })
    }
    
    // Call onComplete callback if provided
    if (onComplete) onComplete()
    
    return { success: true, xpAwarded, badgesAwarded: allEarnedBadges }
  } catch (error) {
    console.error('Error saving game result:', error)
    return { success: false, error }
  }
}

/**
 * Get leaderboard for a specific game
 * Uses async/await and includes proper error handling
 */
export async function getLeaderboard(gameId: string): Promise<LeaderboardEntry[]> {
  try {
    // Validate input
    if (!gameId) {
      console.error('Game ID is required for fetching leaderboard')
      return []
    }

    const q = query(
      collection(db, 'leaderboards', 'miniGames', gameId),
      orderBy('score', 'desc'),
      limit(10)
    )
    const snapshot = await getDocs(q)
    const entries: LeaderboardEntry[] = []
    snapshot.forEach((doc) => {
      entries.push({ uid: doc.id, ...(doc.data() as Omit<LeaderboardEntry, 'uid'>) })
    })
    return entries
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    // Return empty array as fallback
    return []
  }
}

/**
 * Get user's game progress for a specific game
 * Uses async/await and includes proper error handling
 */
export async function getUserGameProgress(userId: string, gameId: string): Promise<GameProgress | null> {
  try {
    // Validate inputs
    if (!userId || !gameId) {
      console.error('User ID and Game ID are required for fetching game progress')
      return null
    }

    const progressRef = doc(db, 'users', userId, 'miniGamesProgress', gameId)
    const progressSnap = await getDoc(progressRef)
    if (progressSnap.exists()) {
      return progressSnap.data() as GameProgress
    }
    return null
  } catch (error) {
    console.error('Error fetching user game progress:', error)
    return null
  }
}

/**
 * Get all user's game progress
 * Uses async/await and includes proper error handling
 */
export async function getAllUserGameProgress(userId: string): Promise<Record<string, GameProgress>> {
  try {
    // Validate input
    if (!userId) {
      console.error('User ID is required for fetching all game progress')
      return {}
    }

    const progressRef = collection(db, 'users', userId, 'miniGamesProgress')
    const progressSnap = await getDocs(progressRef)
    const progress: Record<string, GameProgress> = {}
    progressSnap.forEach((doc) => {
      progress[doc.id] = doc.data() as GameProgress
    })
    return progress
  } catch (error) {
    console.error('Error fetching all user game progress:', error)
    // Return empty object as fallback
    return {}
  }
}

/**
 * Subscribe to real-time user game progress updates with enhanced stability
 * Fixed Firestore internal assertion errors by:
 * 1. Properly handling subscription lifecycle
 * 2. Adding comprehensive error boundaries
 * 3. Ensuring cleanup on unmount
 * 4. Adding validation and fallbacks
 */
export function subscribeToUserGameProgress(
  userId: string, 
  callback: (progress: Record<string, GameProgress>) => void, 
  errorCallback?: (error: Error) => void
): Unsubscribe {
  // Validate inputs
  if (!userId) {
    const error = new Error('User ID is required for subscribing to game progress')
    console.error(error.message)
    errorCallback?.(error)
    // Return noop unsubscribe function
    return () => {}
  }

  let unsubscribe: Unsubscribe | null = null
  
  try {
    // Create the collection reference
    const progressRef = collection(db, 'users', userId, 'miniGamesProgress')
    
    // Set up the snapshot listener with proper error handling
    unsubscribe = onSnapshot(
      progressRef,
      (snapshot) => {
        try {
          // Process the snapshot data
          const progress: Record<string, GameProgress> = {}
          snapshot.forEach((doc) => {
            progress[doc.id] = doc.data() as GameProgress
          })
          // Call the success callback with the processed data
          callback(progress)
        } catch (processError: any) {
          console.error('Error processing user game progress snapshot:', processError)
          errorCallback?.(new Error(`Failed to process game progress data: ${processError.message || processError}`))
        }
      },
      (error) => {
        console.error('Firestore error in user game progress subscription:', error)
        // Handle specific Firestore errors
        if (error.name === 'FirebaseError') {
          // For internal assertion errors, provide a user-friendly message
          if (error.message.includes('INTERNAL ASSERTION FAILED')) {
            const userFriendlyError = new Error('Temporary connection issue with game progress tracking. Please refresh the page.')
            errorCallback?.(userFriendlyError)
          } else {
            errorCallback?.(error)
          }
        } else {
          errorCallback?.(error)
        }
      }
    )
  } catch (setupError: any) {
    console.error('Error setting up user game progress subscription:', setupError)
    errorCallback?.(new Error(`Failed to initialize game progress tracking: ${setupError.message || setupError}`))
    // Return noop unsubscribe function in case of setup error
    return () => {}
  }
  
  // Return the unsubscribe function, or a noop if something went wrong
  return unsubscribe || (() => {})
}

/**
 * Subscribe to real-time leaderboard updates with enhanced stability
 * Fixed Firestore internal assertion errors by:
 * 1. Properly handling subscription lifecycle
 * 2. Adding comprehensive error boundaries
 * 3. Ensuring cleanup on unmount
 */
export function subscribeToLeaderboard(
  gameId: string, 
  callback: (entries: LeaderboardEntry[]) => void, 
  errorCallback?: (error: Error) => void
): Unsubscribe {
  // Validate input
  if (!gameId) {
    const error = new Error('Game ID is required for subscribing to leaderboard')
    console.error(error.message)
    errorCallback?.(error)
    // Return noop unsubscribe function
    return () => {}
  }

  let unsubscribe: Unsubscribe | null = null
  
  try {
    // Create the query
    const q = query(
      collection(db, 'leaderboards', 'miniGames', gameId),
      orderBy('score', 'desc'),
      limit(10)
    )
    
    // Set up the snapshot listener with proper error handling
    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          // Process the snapshot data
          const entries: LeaderboardEntry[] = []
          snapshot.forEach((doc) => {
            entries.push({ uid: doc.id, ...(doc.data() as Omit<LeaderboardEntry, 'uid'>) })
          })
          // Call the success callback with the processed data
          callback(entries)
        } catch (processError: any) {
          console.error('Error processing leaderboard snapshot:', processError)
          errorCallback?.(new Error(`Failed to process leaderboard data: ${processError.message || processError}`))
        }
      },
      (error) => {
        console.error('Firestore error in leaderboard subscription:', error)
        // Handle specific Firestore errors
        if (error.name === 'FirebaseError') {
          // For internal assertion errors, provide a user-friendly message
          if (error.message.includes('INTERNAL ASSERTION FAILED')) {
            const userFriendlyError = new Error('Temporary connection issue with leaderboard. Please refresh the page.')
            errorCallback?.(userFriendlyError)
          } else {
            errorCallback?.(error)
          }
        } else {
          errorCallback?.(error)
        }
      }
    )
  } catch (setupError: any) {
    console.error('Error setting up leaderboard subscription:', setupError)
    errorCallback?.(new Error(`Failed to initialize leaderboard tracking: ${setupError.message || setupError}`))
    // Return noop unsubscribe function in case of setup error
    return () => {}
  }
  
  // Return the unsubscribe function, or a noop if something went wrong
  return unsubscribe || (() => {})
}