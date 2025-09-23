import { trackLessonCompletion, describeBadge } from './gamification'

export type LessonCompletion = {
  userId: string
  lessonId: string
  subject: string
  timestamp: number
  timeSpent: number // in seconds
}

/**
 * Track lesson completion and award badges
 */
export async function trackLessonCompletionAndAwardBadges(
  userId: string,
  lessonId: string,
  subject: string,
  timeSpent: number,
  queueBadge?: (badge: any) => void
) {
  try {
    // Track lesson completion for badges
    const earnedBadges = await trackLessonCompletion(userId, subject)
    
    // Award any new badges
    if (earnedBadges.length > 0 && queueBadge) {
      earnedBadges.forEach(badgeId => {
        queueBadge(describeBadge(badgeId))
      })
    }
    
    return { success: true, badgesAwarded: earnedBadges }
  } catch (error) {
    console.error('Error tracking lesson completion:', error)
    return { success: false, error }
  }
}