import { doc, getDoc, setDoc, updateDoc, collection, query, orderBy, limit, getDocs, serverTimestamp, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { trackQuizAttempt, describeBadge } from './gamification'

export type ChallengeDifficulty = 'easy' | 'medium' | 'hard'

export type ChallengeResult = {
  userId: string
  challengeId: string
  xpEarned: number
  difficulty: ChallengeDifficulty
  streak: number
  timestamp: number
}

export type LeaderboardEntry = {
  uid: string
  username: string
  xp: number
  streak: number
  timestamp: number
}

export type UserProfile = {
  xp: number
  level: number
  streak: number
  lastChallengeDate?: string // yyyy-mm-dd
}

export type UserBadges = {
  beginnerExplorer?: boolean
  achiever?: boolean
  streakMaster?: boolean
  knowledgeSeeker?: boolean
}

// XP values for different challenge difficulties
export const CHALLENGE_XP_VALUES: Record<ChallengeDifficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30
}

// XP thresholds for levels (exponential growth)
export const LEVEL_XP_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  300,    // Level 3
  600,    // Level 4
  1000,   // Level 5
  1500,   // Level 6
  2100,   // Level 7
  2800,   // Level 8
  3600,   // Level 9
  4500,   // Level 10
  5500,   // Level 11
  6600,   // Level 12
  7800,   // Level 13
  9100,   // Level 14
  10500   // Level 15
]

/**
 * Calculate level based on XP
 */
export function calculateLevel(xp: number): number {
  for (let i = LEVEL_XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_XP_THRESHOLDS[i]) return i + 1
  }
  return 1
}

/**
 * Get XP needed for next level
 */
export function getXpForNextLevel(currentLevel: number): number {
  if (currentLevel >= LEVEL_XP_THRESHOLDS.length) return 0
  return LEVEL_XP_THRESHOLDS[currentLevel] - (LEVEL_XP_THRESHOLDS[currentLevel - 1] || 0)
}

/**
 * Get XP progress within current level
 */
export function getXpProgressInLevel(xp: number, level: number): number {
  if (level <= 1) return xp
  const levelStartXp = LEVEL_XP_THRESHOLDS[level - 2] || 0
  return xp - levelStartXp
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

/**
 * Complete a play challenge and award XP
 */
export async function completePlayChallenge(
  userId: string,
  username: string,
  difficulty: ChallengeDifficulty,
  queueBadge?: (badge: any) => void
): Promise<{ success: boolean; xpEarned: number; newLevel: number; streak: number; streakBonus: number; badgesAwarded: string[] }> {
  try {
    const today = getTodayDate()
    const baseXp = CHALLENGE_XP_VALUES[difficulty]
    
    // Get current user profile
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)
    
    let currentXp = 0
    let currentStreak = 0
    let lastChallengeDate: string | undefined = undefined
    let badges: UserBadges = {}
    let challengesCompleted = 0
    
    if (userSnap.exists()) {
      const userData = userSnap.data()
      currentXp = userData.xp || 0
      currentStreak = userData.streak || 0
      lastChallengeDate = userData.lastChallengeDate
      badges = userData.badges || {}
      challengesCompleted = userData.challengesCompleted || 0
    }
    
    // Calculate streak
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    let newStreak = currentStreak
    
    if (lastChallengeDate === today) {
      // Already completed a challenge today, no streak change
    } else if (lastChallengeDate === yesterday) {
      // Continuing streak
      newStreak += 1
    } else {
      // Streak broken or first challenge
      newStreak = 1
    }
    
    // Calculate streak bonus
    let streakBonus = 0
    if (newStreak >= 3 && newStreak < 7) {
      streakBonus = 10 // +10 XP for 3-day streak
    } else if (newStreak >= 7) {
      streakBonus = 25 // +25 XP for 7-day streak
    }
    
    // Total XP earned
    const totalXpEarned = baseXp + streakBonus
    const newXp = currentXp + totalXpEarned
    const newLevel = calculateLevel(newXp)
    const newChallengesCompleted = challengesCompleted + 1
    
    // Update user profile
    const updatedProfile: any = {
      xp: newXp,
      level: newLevel,
      streak: newStreak,
      lastChallengeDate: today,
      challengesCompleted: newChallengesCompleted,
      updatedAt: serverTimestamp()
    }
    
    // Check for new badges
    const newBadges: string[] = []
    
    // Beginner Explorer: First 5 challenges
    if (newChallengesCompleted >= 5 && !badges.beginnerExplorer) {
      updatedProfile['badges.beginnerExplorer'] = true
      newBadges.push('beginnerExplorer')
    }
    
    // Achiever: 500 XP
    if (newXp >= 500 && !badges.achiever) {
      updatedProfile['badges.achiever'] = true
      newBadges.push('achiever')
    }
    
    // Streak Master: 7-day streak
    if (newStreak >= 7 && !badges.streakMaster) {
      updatedProfile['badges.streakMaster'] = true
      newBadges.push('streakMaster')
    }
    
    // Knowledge Seeker: 50 challenges
    if (newChallengesCompleted >= 50 && !badges.knowledgeSeeker) {
      updatedProfile['badges.knowledgeSeeker'] = true
      newBadges.push('knowledgeSeeker')
    }
    
    // Update user document with dot notation for nested fields
    const updateData: Record<string, any> = {}
    Object.keys(updatedProfile).forEach(key => {
      if (key.startsWith('badges.')) {
        const badgeKey = key.split('.')[1]
        updateData[`badges.${badgeKey}`] = updatedProfile[key]
      } else {
        updateData[key] = updatedProfile[key]
      }
    })
    
    await updateDoc(userRef, updateData)
    
    // Update leaderboard
    const leaderboardRef = doc(db, 'leaderboards', 'playChallenges', userId)
    await setDoc(leaderboardRef, {
      uid: userId,
      username,
      xp: newXp,
      streak: newStreak,
      timestamp: Date.now()
    }, { merge: true })
    
    // Award badges
    if (queueBadge && newBadges.length > 0) {
      newBadges.forEach(badgeId => {
        queueBadge(describePlayChallengeBadge(badgeId))
      })
    }
    
    return {
      success: true,
      xpEarned: totalXpEarned,
      newLevel,
      streak: newStreak,
      streakBonus,
      badgesAwarded: newBadges
    }
  } catch (error) {
    console.error('Error completing play challenge:', error)
    return {
      success: false,
      xpEarned: 0,
      newLevel: 0,
      streak: 0,
      streakBonus: 0,
      badgesAwarded: []
    }
  }
}

/**
 * Get user profile
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)
    
    if (userSnap.exists()) {
      const data = userSnap.data()
      return {
        xp: data.xp || 0,
        level: data.level || 1,
        streak: data.streak || 0,
        lastChallengeDate: data.lastChallengeDate
      }
    }
    
    return null
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

/**
 * Subscribe to real-time user profile updates with enhanced retry logic
 */
export function subscribeToUserProfile(userId: string, callback: (profile: UserProfile | null) => void, errorCallback?: (error: Error) => void) {
  let unsubscribe: (() => void) | null = null;
  let retryCount = 0;
  const maxRetries = 5; // Increase retry attempts
  let isRetrying = false;
  
  const setupSubscription = () => {
    // Prevent multiple simultaneous retries
    if (isRetrying) return;
    
    try {
      const userRef = doc(db, 'users', userId);
      unsubscribe = onSnapshot(userRef, 
        (snapshot) => {
          try {
            if (snapshot.exists()) {
              const data = snapshot.data();
              callback({
                xp: data.xp || 0,
                level: data.level || 1,
                streak: data.streak || 0,
                lastChallengeDate: data.lastChallengeDate
              });
            } else {
              callback(null);
            }
            // Reset retry count on successful snapshot
            retryCount = 0;
          } catch (err) {
            console.error('Error processing user profile snapshot:', err);
            errorCallback?.(err as Error);
            callback(null);
          }
        }, 
        (error) => {
          console.error('Error subscribing to user profile:', error);
          errorCallback?.(error);
          callback(null);
          
          // Enhanced retry logic for various error types
          const shouldRetry = retryCount < maxRetries && 
            (error.code === 'unavailable' || 
             error.code === 'deadline-exceeded' || 
             error.code === 'failed-precondition' ||
             error.message.includes('QUIC') || 
             error.message.includes('INTERNAL') ||
             error.message.includes('unauthenticated') ||
             error.message.includes('permission-denied'));
          
          if (shouldRetry) {
            retryCount++;
            isRetrying = true;
            console.log(`Retrying user profile subscription... Attempt ${retryCount}/${maxRetries}`);
            
            // Clear previous unsubscribe if it exists
            if (unsubscribe) {
              unsubscribe();
              unsubscribe = null;
            }
            
            // Exponential backoff with jitter
            const delay = Math.min(1000 * Math.pow(2, retryCount) + Math.random() * 1000, 30000); // Max 30s
            setTimeout(() => {
              isRetrying = false;
              setupSubscription();
            }, delay);
          } else if (retryCount >= maxRetries) {
            console.error('Max retry attempts reached for user profile subscription');
            errorCallback?.(new Error('Unable to establish connection after multiple attempts. Please check your network and refresh the page.'));
          }
        }
      );
    } catch (err) {
      console.error('Error setting up user profile subscription:', err);
      errorCallback?.(err as Error);
      callback(null);
      
      // Retry logic for setup errors
      if (retryCount < maxRetries) {
        retryCount++;
        isRetrying = true;
        console.log(`Retrying user profile subscription setup... Attempt ${retryCount}/${maxRetries}`);
        
        // Exponential backoff with jitter
        const delay = Math.min(1000 * Math.pow(2, retryCount) + Math.random() * 1000, 30000); // Max 30s
        setTimeout(() => {
          isRetrying = false;
          setupSubscription();
        }, delay);
      } else {
        console.error('Max retry attempts reached for user profile subscription setup');
        errorCallback?.(new Error('Unable to initialize subscription after multiple attempts. Please check your network and refresh the page.'));
        return () => {}; // Return noop unsubscribe function
      }
    }
  };
  
  setupSubscription();
  
  // Return unsubscribe function
  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
}

/**
 * Get leaderboard
 */
export async function getPlayChallengeLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const q = query(
      collection(db, 'leaderboards', 'playChallenges'),
      orderBy('xp', 'desc'),
      limit(50) // Get top 50 players
    )
    
    const snapshot = await getDocs(q)
    const entries: LeaderboardEntry[] = []
    
    snapshot.forEach((doc) => {
      const data = doc.data()
      entries.push({
        uid: doc.id,
        username: data.username || 'Anonymous',
        xp: data.xp || 0,
        streak: data.streak || 0,
        timestamp: data.timestamp || Date.now()
      })
    })
    
    return entries
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return []
  }
}

/**
 * Describe play challenge badges
 */
export function describePlayChallengeBadge(badgeId: string): any {
  switch (badgeId) {
    case 'beginnerExplorer':
      return {
        id: 'beginnerExplorer',
        name: 'Beginner Explorer',
        description: 'Completed your first 5 challenges!',
        quote: 'Every expert was once a beginner.',
        icon: '🎯'
      }
    case 'achiever':
      return {
        id: 'achiever',
        name: 'Achiever',
        description: 'Reached 500 XP!',
        quote: 'Consistent effort leads to success.',
        icon: '🏆'
      }
    case 'streakMaster':
      return {
        id: 'streakMaster',
        name: 'Streak Master',
        description: 'Maintained a 7-day challenge streak!',
        quote: 'Discipline is the bridge between goals and accomplishment.',
        icon: '🔥'
      }
    case 'knowledgeSeeker':
      return {
        id: 'knowledgeSeeker',
        name: 'Knowledge Seeker',
        description: 'Completed 50 challenges!',
        quote: 'The more you know, the more you know you don\'t know.',
        icon: '🌟'
      }
    default:
      return {
        id: badgeId,
        name: 'New Badge',
        description: 'You unlocked a new badge!',
        quote: 'Keep going—every step counts!',
        icon: '🎖️'
      }
  }
}