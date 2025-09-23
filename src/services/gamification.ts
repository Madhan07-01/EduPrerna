import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { getBadgeDefinition, type BadgeDefinition } from './badges'

export type GamificationSnapshot = {
  xp: number
  level: number
  streakDays: number
  lastActivityDate?: string // yyyy-mm-dd
  badges?: string[]
  // New tracking fields for badges
  lessonsCompleted?: number
  quizzesAttempted?: number
  quizzesPassed?: number
  subjectsExplored?: string[]
  miniGamesCompleted?: number
  studyGroupsJoined?: number
  bookmarkedLessons?: number
  mathProblemsSolved?: number
  scienceLessonsCompleted?: number
  consecutiveDaysXpEarned?: number
  perfectQuizStreak?: number
  lessonsPerSubject?: Record<string, number>
}

export type AwardResult = {
  newXP: number
  newLevel: number
  newStreak: number
  earnedBadges: string[]
  levelUp: boolean
}

export const LEVEL_XP_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1400, 1850, 2350, 2900]

export function levelForXP(xp: number): number {
  for (let i = LEVEL_XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_XP_THRESHOLDS[i]) return i + 1
  }
  return 1
}

export function todaysDate(): string {
  return new Date().toISOString().split('T')[0]
}

export async function getGamification(uid: string): Promise<GamificationSnapshot> {
  const ref = doc(db, 'students', uid)
  const snap = await getDoc(ref)
  if (snap.exists()) {
    const d = snap.data() as any
    return {
      xp: d.xp || 0,
      level: d.level || levelForXP(d.xp || 0),
      streakDays: d.streakDays || 0,
      lastActivityDate: d.lastActivityDate,
      badges: d.badges || [],
      lessonsCompleted: d.lessonsCompleted || 0,
      quizzesAttempted: d.quizzesAttempted || 0,
      quizzesPassed: d.quizzesPassed || 0,
      subjectsExplored: d.subjectsExplored || [],
      miniGamesCompleted: d.miniGamesCompleted || 0,
      studyGroupsJoined: d.studyGroupsJoined || 0,
      bookmarkedLessons: d.bookmarkedLessons || 0,
      mathProblemsSolved: d.mathProblemsSolved || 0,
      scienceLessonsCompleted: d.scienceLessonsCompleted || 0,
      consecutiveDaysXpEarned: d.consecutiveDaysXpEarned || 0,
      perfectQuizStreak: d.perfectQuizStreak || 0,
      lessonsPerSubject: d.lessonsPerSubject || {}
    }
  }
  const init: GamificationSnapshot = { 
    xp: 0, 
    level: 1, 
    streakDays: 0, 
    badges: [],
    lessonsCompleted: 0,
    quizzesAttempted: 0,
    quizzesPassed: 0,
    subjectsExplored: [],
    miniGamesCompleted: 0,
    studyGroupsJoined: 0,
    bookmarkedLessons: 0,
    mathProblemsSolved: 0,
    scienceLessonsCompleted: 0,
    consecutiveDaysXpEarned: 0,
    perfectQuizStreak: 0,
    lessonsPerSubject: {}
  }
  await setDoc(ref, { ...init, createdAt: serverTimestamp() }, { merge: true })
  return init
}

export function subscribeGamification(uid: string, cb: (g: GamificationSnapshot) => void) {
  const ref = doc(db, 'students', uid)
  return onSnapshot(ref, (snap) => {
    if (!snap.exists()) return
    const d = snap.data() as any
    cb({
      xp: d.xp || 0,
      level: d.level || levelForXP(d.xp || 0),
      streakDays: d.streakDays || 0,
      lastActivityDate: d.lastActivityDate,
      badges: d.badges || [],
      lessonsCompleted: d.lessonsCompleted || 0,
      quizzesAttempted: d.quizzesAttempted || 0,
      quizzesPassed: d.quizzesPassed || 0,
      subjectsExplored: d.subjectsExplored || [],
      miniGamesCompleted: d.miniGamesCompleted || 0,
      studyGroupsJoined: d.studyGroupsJoined || 0,
      bookmarkedLessons: d.bookmarkedLessons || 0,
      mathProblemsSolved: d.mathProblemsSolved || 0,
      scienceLessonsCompleted: d.scienceLessonsCompleted || 0,
      consecutiveDaysXpEarned: d.consecutiveDaysXpEarned || 0,
      perfectQuizStreak: d.perfectQuizStreak || 0,
      lessonsPerSubject: d.lessonsPerSubject || {}
    })
  })
}

// Helper function to check if a badge has been earned
function checkBadgeEarned(badgeId: string, gamification: GamificationSnapshot): boolean {
  switch (badgeId) {
    // Rookie Badges
    case 'daily-starter':
      return gamification.lessonsCompleted !== undefined && gamification.lessonsCompleted > 0
    case 'quiz-taker':
      return (gamification.quizzesAttempted || 0) >= 1
    case 'explorer':
      return (gamification.subjectsExplored?.length || 0) >= 3
    case 'first-friend':
      return (gamification.studyGroupsJoined || 0) >= 1
      
    // Bronze Badges
    case 'streak-starter':
      return gamification.streakDays >= 3
    case 'quiz-rookie':
      return (gamification.quizzesPassed || 0) >= 3
    case 'note-keeper':
      return (gamification.bookmarkedLessons || 0) >= 5
    case 'warm-up-champion':
      return (gamification.miniGamesCompleted || 0) >= 3
      
    // Silver Badges
    case 'subject-explorer':
      const subjectsWithLessons = Object.values(gamification.lessonsPerSubject || {}).filter(count => count > 0)
      return subjectsWithLessons.length >= 3
    case 'quiz-challenger':
      return (gamification.quizzesPassed || 0) >= 5
    case 'persistence-pro':
      return gamification.streakDays >= 10
    case 'daily-xp-earner':
      return (gamification.consecutiveDaysXpEarned || 0) >= 7
      
    // Gold Badges
    case 'math-magician':
      return (gamification.mathProblemsSolved || 0) >= 50
    case 'science-sleuth':
      return (gamification.scienceLessonsCompleted || 0) >= 10
    case 'quiz-master':
      return (gamification.quizzesPassed || 0) >= 10
    case 'team-player':
      return (gamification.studyGroupsJoined || 0) >= 3
    // Speed Learner would need time tracking data
      
    // Diamond Badges
    case 'subject-specialist':
      // This would need to check if all lessons in a subject are completed
      return false // Implementation would depend on subject tracking
    case 'quiz-dominator':
      return (gamification.quizzesPassed || 0) >= 20
    case 'month-warrior':
      return gamification.streakDays >= 30
    case 'knowledge-collector':
      // Check if all Rookie, Bronze, and Silver badges are earned
      const requiredBadges = [
        'daily-starter', 'quiz-taker', 'explorer', 'first-friend',
        'streak-starter', 'quiz-rookie', 'note-keeper', 'warm-up-champion',
        'subject-explorer', 'quiz-challenger', 'persistence-pro', 'daily-xp-earner'
      ]
      return requiredBadges.every(badge => gamification.badges?.includes(badge))
    case 'mini-game-pro':
      return (gamification.miniGamesCompleted || 0) >= 20
      
    // Legendary Badges
    case 'quiz-champion':
      return (gamification.perfectQuizStreak || 0) >= 10
    case 'ultimate-learner':
      // This would need to check completion of all lessons in all subjects
      return false // Implementation would depend on subject tracking
    case 'year-warrior':
      return gamification.streakDays >= 365
    case 'knowledge-titan':
      // Check if all Gold & Diamond badges are earned
      const goldDiamondBadges = [
        'math-magician', 'science-sleuth', 'quiz-master', 'team-player', 'speed-learner',
        'subject-specialist', 'quiz-dominator', 'month-warrior', 'knowledge-collector', 'mini-game-pro'
      ]
      return goldDiamondBadges.every(badge => gamification.badges?.includes(badge))
    case 'speed-demon':
      // This would need timing data
      return false
      
    default:
      return false
  }
}

export async function awardXPAndStreak(uid: string, deltaXP: number): Promise<AwardResult> {
  const ref = doc(db, 'students', uid)
  const snap = await getDoc(ref)
  const today = todaysDate()
  let xp = 0
  let streak = 0
  let last = undefined as string | undefined
  let badges: string[] = []
  let currentLevel = 1
  let username = 'Anonymous'
  
  // Initialize tracking fields
  let lessonsCompleted = 0
  let quizzesAttempted = 0
  let quizzesPassed = 0
  let subjectsExplored: string[] = []
  let miniGamesCompleted = 0
  let studyGroupsJoined = 0
  let bookmarkedLessons = 0
  let mathProblemsSolved = 0
  let scienceLessonsCompleted = 0
  let consecutiveDaysXpEarned = 0
  let perfectQuizStreak = 0
  let lessonsPerSubject: Record<string, number> = {}
  
  if (snap.exists()) {
    const d = snap.data() as any
    xp = (d.xp || 0) + deltaXP
    streak = d.streakDays || 0
    last = d.lastActivityDate
    badges = d.badges || []
    currentLevel = d.level || levelForXP(d.xp || 0)
    username = d.name || d.username || 'Anonymous'
    
    // Get tracking fields
    lessonsCompleted = d.lessonsCompleted || 0
    quizzesAttempted = d.quizzesAttempted || 0
    quizzesPassed = d.quizzesPassed || 0
    subjectsExplored = d.subjectsExplored || []
    miniGamesCompleted = d.miniGamesCompleted || 0
    studyGroupsJoined = d.studyGroupsJoined || 0
    bookmarkedLessons = d.bookmarkedLessons || 0
    mathProblemsSolved = d.mathProblemsSolved || 0
    scienceLessonsCompleted = d.scienceLessonsCompleted || 0
    consecutiveDaysXpEarned = d.consecutiveDaysXpEarned || 0
    perfectQuizStreak = d.perfectQuizStreak || 0
    lessonsPerSubject = d.lessonsPerSubject || {}
  } else {
    xp = deltaXP
  }

  // streak calc
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  if (last === today) {
    // same day, keep streak
  } else if (last === yesterday) {
    streak += 1
    consecutiveDaysXpEarned += 1
  } else {
    streak = 1
    consecutiveDaysXpEarned = 1
  }

  const newLevel = levelForXP(xp)
  const levelUp = newLevel > currentLevel
  const earned: string[] = []

  // Check for newly earned badges
  const allBadgeIds = [
    // Rookie Badges
    'daily-starter', 'quiz-taker', 'explorer', 'first-friend',
    // Bronze Badges
    'streak-starter', 'quiz-rookie', 'note-keeper', 'warm-up-champion',
    // Silver Badges
    'subject-explorer', 'quiz-challenger', 'persistence-pro', 'daily-xp-earner',
    // Gold Badges
    'math-magician', 'science-sleuth', 'quiz-master', 'team-player', 'speed-learner',
    // Diamond Badges
    'subject-specialist', 'quiz-dominator', 'month-warrior', 'knowledge-collector', 'mini-game-pro',
    // Legendary Badges
    'quiz-champion', 'ultimate-learner', 'year-warrior', 'knowledge-titan', 'speed-demon'
  ]

  // Create a temporary gamification object to check badge conditions
  const tempGamification: GamificationSnapshot = {
    xp,
    level: newLevel,
    streakDays: streak,
    lastActivityDate: today,
    badges: [...badges],
    lessonsCompleted,
    quizzesAttempted,
    quizzesPassed,
    subjectsExplored,
    miniGamesCompleted,
    studyGroupsJoined,
    bookmarkedLessons,
    mathProblemsSolved,
    scienceLessonsCompleted,
    consecutiveDaysXpEarned,
    perfectQuizStreak,
    lessonsPerSubject
  }

  // Check each badge to see if it's now earned
  for (const badgeId of allBadgeIds) {
    // Skip if already earned
    if (badges.includes(badgeId)) continue
    
    // Check if newly earned
    if (checkBadgeEarned(badgeId, tempGamification)) {
      earned.push(badgeId)
    }
  }

  const updatedBadges = Array.from(new Set([...(badges || []), ...earned]))

  await setDoc(ref, {
    xp,
    level: newLevel,
    streakDays: streak,
    streakCount: streak,
    lastActivityDate: today,
    badges: updatedBadges,
    name: username,
    username,
    updatedAt: serverTimestamp(),
    // Update tracking fields
    lessonsCompleted,
    quizzesAttempted,
    quizzesPassed,
    subjectsExplored,
    miniGamesCompleted,
    studyGroupsJoined,
    bookmarkedLessons,
    mathProblemsSolved,
    scienceLessonsCompleted,
    consecutiveDaysXpEarned,
    perfectQuizStreak,
    lessonsPerSubject
  }, { merge: true })

  // Update leaderboard entry for this user
  const leaderboardRef = doc(db, 'leaderboard', uid)
  await setDoc(leaderboardRef, {
    username,
    xp,
    streak,
    lastUpdated: Date.now(),
  }, { merge: true })

  return { newXP: xp, newLevel, newStreak: streak, earnedBadges: earned, levelUp }
}

// New function to track lesson completion
export async function trackLessonCompletion(uid: string, subject: string): Promise<string[]> {
  const ref = doc(db, 'students', uid)
  const snap = await getDoc(ref)
  const today = todaysDate()
  
  let lessonsCompleted = 0
  let subjectsExplored: string[] = []
  let lessonsPerSubject: Record<string, number> = {}
  let badges: string[] = []
  
  if (snap.exists()) {
    const d = snap.data() as any
    lessonsCompleted = (d.lessonsCompleted || 0) + 1
    subjectsExplored = d.subjectsExplored || []
    lessonsPerSubject = d.lessonsPerSubject || {}
    badges = d.badges || []
    
    // Add subject to explored subjects if not already there
    if (!subjectsExplored.includes(subject)) {
      subjectsExplored = [...subjectsExplored, subject]
    }
    
    // Update lessons per subject count
    lessonsPerSubject[subject] = (lessonsPerSubject[subject] || 0) + 1
  } else {
    lessonsCompleted = 1
    subjectsExplored = [subject]
    lessonsPerSubject = { [subject]: 1 }
  }
  
  // Update document
  await setDoc(ref, {
    lessonsCompleted,
    subjectsExplored,
    lessonsPerSubject,
    lastActivityDate: today,
    updatedAt: serverTimestamp()
  }, { merge: true })
  
  // Check for newly earned badges
  const earned: string[] = []
  const tempGamification: GamificationSnapshot = {
    xp: 0, // Not needed for badge checking in this context
    level: 1, // Not needed for badge checking in this context
    streakDays: 0, // Not needed for badge checking in this context
    lastActivityDate: today,
    badges: [...badges],
    lessonsCompleted,
    quizzesAttempted: 0, // Not tracked here
    quizzesPassed: 0, // Not tracked here
    subjectsExplored,
    miniGamesCompleted: 0, // Not tracked here
    studyGroupsJoined: 0, // Not tracked here
    bookmarkedLessons: 0, // Not tracked here
    mathProblemsSolved: 0, // Not tracked here
    scienceLessonsCompleted: subject === 'science' ? 1 : 0,
    consecutiveDaysXpEarned: 0, // Not tracked here
    perfectQuizStreak: 0, // Not tracked here
    lessonsPerSubject
  }
  
  // Check specific badges that could be earned from lesson completion
  const lessonBadges = ['daily-starter', 'explorer', 'subject-explorer', 'science-sleuth']
  for (const badgeId of lessonBadges) {
    if (!badges.includes(badgeId) && checkBadgeEarned(badgeId, tempGamification)) {
      earned.push(badgeId)
    }
  }
  
  // Update badges if any were earned
  if (earned.length > 0) {
    const updatedBadges = Array.from(new Set([...badges, ...earned]))
    await setDoc(ref, { badges: updatedBadges }, { merge: true })
  }
  
  return earned
}

// New function to track quiz attempt
export async function trackQuizAttempt(uid: string, score: number, passed: boolean): Promise<string[]> {
  const ref = doc(db, 'students', uid)
  const snap = await getDoc(ref)
  const today = todaysDate()
  
  let quizzesAttempted = 0
  let quizzesPassed = 0
  let perfectQuizStreak = 0
  let badges: string[] = []
  
  if (snap.exists()) {
    const d = snap.data() as any
    quizzesAttempted = (d.quizzesAttempted || 0) + 1
    quizzesPassed = passed ? (d.quizzesPassed || 0) + 1 : (d.quizzesPassed || 0)
    perfectQuizStreak = score === 100 ? (d.perfectQuizStreak || 0) + 1 : 0
    badges = d.badges || []
  } else {
    quizzesAttempted = 1
    quizzesPassed = passed ? 1 : 0
    perfectQuizStreak = score === 100 ? 1 : 0
  }
  
  // Update document
  await setDoc(ref, {
    quizzesAttempted,
    quizzesPassed,
    perfectQuizStreak,
    lastActivityDate: today,
    updatedAt: serverTimestamp()
  }, { merge: true })
  
  // Check for newly earned badges
  const earned: string[] = []
  const tempGamification: GamificationSnapshot = {
    xp: 0, // Not needed for badge checking in this context
    level: 1, // Not needed for badge checking in this context
    streakDays: 0, // Not needed for badge checking in this context
    lastActivityDate: today,
    badges: [...badges],
    lessonsCompleted: 0, // Not tracked here
    quizzesAttempted,
    quizzesPassed,
    subjectsExplored: [], // Not tracked here
    miniGamesCompleted: 0, // Not tracked here
    studyGroupsJoined: 0, // Not tracked here
    bookmarkedLessons: 0, // Not tracked here
    mathProblemsSolved: 0, // Not tracked here
    scienceLessonsCompleted: 0, // Not tracked here
    consecutiveDaysXpEarned: 0, // Not tracked here
    perfectQuizStreak,
    lessonsPerSubject: {} // Not tracked here
  }
  
  // Check specific badges that could be earned from quiz attempts
  const quizBadges = ['quiz-taker', 'quiz-rookie', 'quiz-challenger', 'quiz-master', 'quiz-dominator', 'quiz-champion']
  for (const badgeId of quizBadges) {
    if (!badges.includes(badgeId) && checkBadgeEarned(badgeId, tempGamification)) {
      earned.push(badgeId)
    }
  }
  
  // Update badges if any were earned
  if (earned.length > 0) {
    const updatedBadges = Array.from(new Set([...badges, ...earned]))
    await setDoc(ref, { badges: updatedBadges }, { merge: true })
  }
  
  return earned
}

// New function to track mini-game completion
export async function trackMiniGameCompletion(uid: string): Promise<string[]> {
  const ref = doc(db, 'students', uid)
  const snap = await getDoc(ref)
  const today = todaysDate()
  
  let miniGamesCompleted = 0
  let badges: string[] = []
  
  if (snap.exists()) {
    const d = snap.data() as any
    miniGamesCompleted = (d.miniGamesCompleted || 0) + 1
    badges = d.badges || []
  } else {
    miniGamesCompleted = 1
  }
  
  // Update document
  await setDoc(ref, {
    miniGamesCompleted,
    lastActivityDate: today,
    updatedAt: serverTimestamp()
  }, { merge: true })
  
  // Check for newly earned badges
  const earned: string[] = []
  const tempGamification: GamificationSnapshot = {
    xp: 0, // Not needed for badge checking in this context
    level: 1, // Not needed for badge checking in this context
    streakDays: 0, // Not needed for badge checking in this context
    lastActivityDate: today,
    badges: [...badges],
    lessonsCompleted: 0, // Not tracked here
    quizzesAttempted: 0, // Not tracked here
    quizzesPassed: 0, // Not tracked here
    subjectsExplored: [], // Not tracked here
    miniGamesCompleted,
    studyGroupsJoined: 0, // Not tracked here
    bookmarkedLessons: 0, // Not tracked here
    mathProblemsSolved: 0, // Not tracked here
    scienceLessonsCompleted: 0, // Not tracked here
    consecutiveDaysXpEarned: 0, // Not tracked here
    perfectQuizStreak: 0, // Not tracked here
    lessonsPerSubject: {} // Not tracked here
  }
  
  // Check specific badges that could be earned from mini-game completion
  const gameBadges = ['warm-up-champion', 'mini-game-pro']
  for (const badgeId of gameBadges) {
    if (!badges.includes(badgeId) && checkBadgeEarned(badgeId, tempGamification)) {
      earned.push(badgeId)
    }
  }
  
  // Update badges if any were earned
  if (earned.length > 0) {
    const updatedBadges = Array.from(new Set([...badges, ...earned]))
    await setDoc(ref, { badges: updatedBadges }, { merge: true })
  }
  
  return earned
}

export type QueuedBadge = {
  id: string
  name: string
  description: string
  quote?: string
  icon?: string
}

export function describeBadge(id: string): QueuedBadge {
  // First check if it's one of the new badges
  const badgeDef = getBadgeDefinition(id)
  if (badgeDef) {
    return {
      id: badgeDef.id,
      name: badgeDef.name,
      description: badgeDef.description,
      quote: badgeDef.quote,
      icon: badgeDef.icon
    }
  }
  
  // Fall back to existing badge definitions
  switch (id) {
    case 'xp-100':
      return { id, name: 'Century XP', description: 'Earned 100 total XP!', quote: 'Small steps lead to big leaps.', icon: '⭐' }
    case 'xp-500':
      return { id, name: 'Half K', description: 'Earned 500 total XP!', quote: 'Halfway to legend status!', icon: '🔥' }
    case 'streak-7':
      return { id, name: 'Week Warrior', description: '7-day learning streak!', quote: 'Consistency beats intensity.', icon: '📅' }
    case 'streak-30':
      return { id, name: 'Monthly Master', description: '30-day learning streak!', quote: 'A month of dedication!', icon: '🏆' }
    case 'download-master':
      return { id, name: 'Download Master', description: 'Downloaded 3 files!', quote: 'Preparation is the key to success.', icon: '📥' }
    case 'knowledge-collector':
      return { id, name: 'Knowledge Collector', description: 'Completed all chapter downloads for your grade!', quote: 'Collect knowledge like treasures.', icon: '📚' }
    case 'grade-champion':
      return { id, name: 'Grade Champion', description: 'Downloaded all chapters in a grade!', quote: 'Mastery unlocked.', icon: '👑' }
    case 'knowledge-explorer':
      return { id, name: 'Knowledge Explorer', description: 'Completed downloads across multiple grades!', quote: 'Curiosity knows no bounds.', icon: '🧭' }
    // Mini-games badges
    case 'first-game':
      return { id, name: 'First Game', description: 'Played your first mini-game!', quote: 'Every expert was once a beginner.', icon: '🎮' }
    case 'game-master':
      return { id, name: 'Game Master', description: 'Completed 10 mini-games!', quote: 'Practice makes progress!', icon: '👑' }
    case 'speed-runner':
      return { id, name: 'Speed Runner', description: 'Completed a game in under 30 seconds!', quote: 'Lightning fast!', icon: '⚡' }
    case 'perfect-score':
      return { id, name: 'Perfect Score', description: 'Achieved a perfect score!', quote: 'Flawless victory!', icon: '💯' }
    case 'daily-champion':
      return { id, name: 'Daily Champion', description: 'Completed the daily challenge 7 days in a row!', quote: 'Consistency is key!', icon: '🌅' }
    default:
      return { id, name: 'New Badge', description: 'You unlocked a badge!', quote: 'Keep going—curiosity fuels discovery.', icon: '🎖️' }
  }
}