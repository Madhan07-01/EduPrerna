import { trackQuizAttempt, describeBadge } from './gamification'

export type QuizResult = {
  userId: string
  quizId: string
  score: number
  totalQuestions: number
  timestamp: number
  subject?: string
}

/**
 * Save quiz result and track for badges
 */
export async function saveQuizResult(
  userId: string,
  quizId: string,
  score: number,
  totalQuestions: number,
  subject?: string,
  queueBadge?: (badge: any) => void
) {
  try {
    // Calculate percentage
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0
    const passed = percentage >= 50
    
    // Track quiz attempt for badges
    const earnedBadges = await trackQuizAttempt(userId, percentage, passed)
    
    // Award any new badges
    if (earnedBadges.length > 0 && queueBadge) {
      earnedBadges.forEach(badgeId => {
        queueBadge(describeBadge(badgeId))
      })
    }
    
    return { success: true, percentage, passed, badgesAwarded: earnedBadges }
  } catch (error) {
    console.error('Error saving quiz result:', error)
    return { success: false, error }
  }
}