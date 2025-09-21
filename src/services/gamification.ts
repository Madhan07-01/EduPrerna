import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export type GamificationSnapshot = {
  xp: number
  level: number
  streakDays: number
  lastActivityDate?: string // yyyy-mm-dd
  badges?: string[]
}

export type AwardResult = {
  newXP: number
  newLevel: number
  newStreak: number
  earnedBadges: string[]
  levelUp: boolean
}

export const LEVEL_XP_THRESHOLDS = [0, 50, 150, 300, 500, 750, 1050, 1400, 1800, 2250]

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
    }
  }
  const init: GamificationSnapshot = { xp: 0, level: 1, streakDays: 0, badges: ['rookie'] }
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
    })
  })
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
  
  if (snap.exists()) {
    const d = snap.data() as any
    xp = (d.xp || 0) + deltaXP
    streak = d.streakDays || 0
    last = d.lastActivityDate
    badges = d.badges || []
    currentLevel = d.level || levelForXP(d.xp || 0)
    username = d.name || d.username || 'Anonymous'
  } else {
    xp = deltaXP
  }

  // streak calc
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  if (last === today) {
    // same day, keep streak
  } else if (last === yesterday) {
    streak += 1
  } else {
    streak = 1
  }

  const newLevel = levelForXP(xp)
  const levelUp = newLevel > currentLevel
  const earned: string[] = []

  // Example badge rules (extendable) - Increased thresholds to make badges harder to earn
  if (xp >= 200 && !badges.includes('xp-100')) { earned.push('xp-100') } // Increased from 100 to 200
  if (streak >= 14 && !badges.includes('streak-7')) { earned.push('streak-7') } // Increased from 7 to 14
  if (xp >= 1000 && !badges.includes('xp-500')) { earned.push('xp-500') } // Increased from 500 to 1000
  if (streak >= 60 && !badges.includes('streak-30')) { earned.push('streak-30') } // Increased from 30 to 60
  
  // Additional badge criteria
  if (xp >= 50 && !badges.includes('first-download')) { earned.push('first-download') }
  if (xp >= 500 && streak >= 7 && !badges.includes('dedicated-learner')) { earned.push('dedicated-learner') }
  if (xp >= 1500 && streak >= 30 && !badges.includes('scholar')) { earned.push('scholar') }

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

export type QueuedBadge = {
  id: string
  name: string
  description: string
  quote?: string
  icon?: string
}

export function describeBadge(id: string): QueuedBadge {
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
    case 'first-download':
      return { id, name: 'First Download', description: 'Downloaded your first study material!', quote: 'Great start to your learning journey!', icon: '🎯' }
    case 'chapter-set':
      return { id, name: 'Chapter Set Completed', description: 'Completed all chapters in a subject!', quote: 'You\'ve mastered this subject!', icon: '🏅' }
    case 'dedicated-learner':
      return { id, name: 'Dedicated Learner', description: '7-day streak with 500+ XP!', quote: 'Your dedication is inspiring!', icon: '🔥' }
    case 'scholar':
      return { id, name: 'Scholar', description: '30-day streak with 1500+ XP!', quote: 'True scholar in the making!', icon: '🎓' }
    case 'rookie':
      return { id, name: 'Rookie', description: 'Just started your learning journey!', quote: 'Every expert was once a beginner.', icon: '🌱' }
    default:
      return { id, name: 'New Badge', description: 'You unlocked a badge!', quote: 'Keep going—curiosity fuels discovery.', icon: '🎖️' }
  }
}