import { useLanguage } from '../contexts/LanguageContext'
import { useState, useEffect } from 'react'
import StreakLeaderboard from '../components/StreakLeaderboard'
import { useAuth } from '../hooks/useAuth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { useLocation } from 'react-router-dom'
import { BADGE_SECTIONS, getBadgeDefinition } from '../services/badges'
import { subscribeGamification } from '../services/gamification'

// Define badge types with their properties
type Badge = {
  id: string
  name: string
  icon: string
  rarity: 'legendary' | 'diamond' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'rookie'
  earned: boolean
  progress: number // 0-100
  description: string
  color: string
  glow: string
  borderColor: string
  unlockCondition: string
}

export function AchievementsPage() {
  const { t } = useLanguage()
  const { currentUser } = useAuth()
  const location = useLocation()
  const [badges, setBadges] = useState<Badge[]>([])
  const [pinnedBadges, setPinnedBadges] = useState<string[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard'>('achievements')
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null)
  const [gamificationData, setGamificationData] = useState<any>(null)

  // Set active tab based on URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tab = params.get('tab')
    if (tab === 'leaderboard') {
      setActiveTab('leaderboard')
    } else {
      setActiveTab('achievements')
    }
  }, [location.search])

  // Load user gamification data
  useEffect(() => {
    if (!currentUser) return
    
    const unsubscribe = subscribeGamification(currentUser.uid, (data) => {
      setGamificationData(data)
      
      // Convert gamification data to badge display format
      const userBadges: Badge[] = []
      
      // Add all defined badges with earned status
      BADGE_SECTIONS.forEach(section => {
        const sectionBadges = []
        // Get badges for this rarity level
        const rarityBadges = [
          // Rookie Badges
          ...(section.id === 'rookie' ? [
            'daily-starter', 'quiz-taker', 'explorer', 'first-friend'
          ] : []),
          // Bronze Badges
          ...(section.id === 'bronze' ? [
            'streak-starter', 'quiz-rookie', 'note-keeper', 'warm-up-champion'
          ] : []),
          // Silver Badges
          ...(section.id === 'silver' ? [
            'subject-explorer', 'quiz-challenger', 'persistence-pro', 'daily-xp-earner'
          ] : []),
          // Gold Badges
          ...(section.id === 'gold' ? [
            'math-magician', 'science-sleuth', 'quiz-master', 'team-player', 'speed-learner'
          ] : []),
          // Diamond Badges
          ...(section.id === 'diamond' ? [
            'subject-specialist', 'quiz-dominator', 'month-warrior', 'knowledge-collector', 'mini-game-pro'
          ] : []),
          // Legendary Badges
          ...(section.id === 'legendary' ? [
            'quiz-champion', 'ultimate-learner', 'year-warrior', 'knowledge-titan', 'speed-demon'
          ] : [])
        ]
        
        rarityBadges.forEach(badgeId => {
          const badgeDef = getBadgeDefinition(badgeId)
          if (badgeDef) {
            userBadges.push({
              id: badgeDef.id,
              name: badgeDef.name,
              icon: badgeDef.icon,
              rarity: badgeDef.rarity,
              earned: data.badges?.includes(badgeDef.id) || false,
              progress: data.badges?.includes(badgeDef.id) ? 100 : calculateProgress(badgeDef.id, data),
              description: badgeDef.description,
              color: badgeDef.color,
              glow: badgeDef.glow,
              borderColor: badgeDef.borderColor,
              unlockCondition: badgeDef.unlockCondition
            })
          }
        })
      })
      
      // Also include any existing badges that might not be in our definitions
      if (data.badges) {
        data.badges.forEach(badgeId => {
          if (!userBadges.some(b => b.id === badgeId)) {
            // This is an older badge, add it with default properties
            userBadges.push({
              id: badgeId,
              name: badgeId.replace(/-/g, ' '),
              icon: '🎖️',
              rarity: 'rookie',
              earned: true,
              progress: 100,
              description: 'Achievement unlocked',
              color: 'from-green-500 to-emerald-600',
              glow: 'shadow-green-500/50',
              borderColor: 'border-green-500',
              unlockCondition: 'Special achievement'
            })
          }
        })
      }
      
      setBadges(userBadges)
    })
    
    return () => unsubscribe()
  }, [currentUser])

  // Load pinned badges from Firebase
  useEffect(() => {
    const loadPinnedBadges = async () => {
      if (!currentUser) return
      
      try {
        const userDoc = await getDoc(doc(db, 'students', currentUser.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          if (userData.pinnedBadges) {
            setPinnedBadges(userData.pinnedBadges)
          }
          // Reflect Download Master badge if present
          if (userData.downloadMaster) {
            setBadges((prev) => {
              const exists = prev.some(b => b.id === 'download-master')
              if (exists) {
                return prev.map(b => b.id === 'download-master' ? { ...b, earned: true, progress: 100 } : b)
              }
              return [
                {
                  id: 'download-master',
                  name: 'Download Master',
                  icon: '📥',
                  rarity: 'rookie',
                  earned: true,
                  progress: 100,
                  description: 'Download 3 or more files',
                  color: 'from-green-500 to-emerald-600',
                  glow: 'shadow-green-500/50',
                  borderColor: 'border-green-500',
                  unlockCondition: 'Download 3+ files from the Download page'
                },
                ...prev
              ]
            })
          }
        }
      } catch (error) {
        console.error('Error loading pinned badges:', error)
      }
    }
    
    loadPinnedBadges()
  }, [currentUser])

  // Fallback: if not yet saved to Firestore but present in localStorage, show the badge
  useEffect(() => {
    const localEarned = localStorage.getItem('ep_download_master') === '1'
    if (localEarned) {
      setBadges((prev) => {
        const exists = prev.some(b => b.id === 'download-master')
        if (exists) return prev
        return [
          {
            id: 'download-master',
            name: 'Download Master',
            icon: '📥',
            rarity: 'rookie',
            earned: true,
            progress: 100,
            description: 'Download 3 or more files',
            color: 'from-green-500 to-emerald-600',
            glow: 'shadow-green-500/50',
            borderColor: 'border-green-500',
            unlockCondition: 'Download 3+ files from the Download page'
          },
          ...prev
        ]
      })
    }
  }, [])

  // Function to calculate progress for a badge (simplified)
  const calculateProgress = (badgeId: string, data: any): number => {
    // This is a simplified progress calculation
    // In a real implementation, this would be more sophisticated
    switch (badgeId) {
      // Rookie Badges
      case 'daily-starter':
        return data.lessonsCompleted ? Math.min(100, (data.lessonsCompleted / 1) * 100) : 0
      case 'quiz-taker':
        return data.quizzesAttempted ? Math.min(100, (data.quizzesAttempted / 1) * 100) : 0
      case 'explorer':
        return data.subjectsExplored ? Math.min(100, (data.subjectsExplored.length / 3) * 100) : 0
      case 'first-friend':
        return data.studyGroupsJoined ? Math.min(100, (data.studyGroupsJoined / 1) * 100) : 0
        
      // Bronze Badges
      case 'streak-starter':
        return Math.min(100, (data.streakDays / 3) * 100)
      case 'quiz-rookie':
        return data.quizzesPassed ? Math.min(100, (data.quizzesPassed / 3) * 100) : 0
      case 'note-keeper':
        return data.bookmarkedLessons ? Math.min(100, (data.bookmarkedLessons / 5) * 100) : 0
      case 'warm-up-champion':
        return data.miniGamesCompleted ? Math.min(100, (data.miniGamesCompleted / 3) * 100) : 0
        
      // Silver Badges
      case 'subject-explorer':
        const subjectsWithLessons = data.lessonsPerSubject ? Object.values(data.lessonsPerSubject).filter((count: number) => count > 0).length : 0
        return Math.min(100, (subjectsWithLessons / 3) * 100)
      case 'quiz-challenger':
        return data.quizzesPassed ? Math.min(100, (data.quizzesPassed / 5) * 100) : 0
      case 'persistence-pro':
        return Math.min(100, (data.streakDays / 10) * 100)
      case 'daily-xp-earner':
        return data.consecutiveDaysXpEarned ? Math.min(100, (data.consecutiveDaysXpEarned / 7) * 100) : 0
        
      // Gold Badges
      case 'math-magician':
        return data.mathProblemsSolved ? Math.min(100, (data.mathProblemsSolved / 50) * 100) : 0
      case 'science-sleuth':
        return data.scienceLessonsCompleted ? Math.min(100, (data.scienceLessonsCompleted / 10) * 100) : 0
      case 'quiz-master':
        return data.quizzesPassed ? Math.min(100, (data.quizzesPassed / 10) * 100) : 0
      case 'team-player':
        return data.studyGroupsJoined ? Math.min(100, (data.studyGroupsJoined / 3) * 100) : 0
        
      // Diamond Badges
      case 'quiz-dominator':
        return data.quizzesPassed ? Math.min(100, (data.quizzesPassed / 20) * 100) : 0
      case 'month-warrior':
        return Math.min(100, (data.streakDays / 30) * 100)
      case 'mini-game-pro':
        return data.miniGamesCompleted ? Math.min(100, (data.miniGamesCompleted / 20) * 100) : 0
        
      // Legendary Badges
      case 'quiz-champion':
        return data.perfectQuizStreak ? Math.min(100, (data.perfectQuizStreak / 10) * 100) : 0
      case 'year-warrior':
        return Math.min(100, (data.streakDays / 365) * 100)
        
      default:
        return 0
    }
  }

  // Function to pin/unpin a badge
  const togglePinBadge = async (badgeId: string) => {
    if (!currentUser) return
    
    try {
      const newPinnedBadges = pinnedBadges.includes(badgeId)
        ? pinnedBadges.filter(id => id !== badgeId) // Unpin
        : [...pinnedBadges, badgeId] // Pin
      
      setPinnedBadges(newPinnedBadges)
      
      // Update Firebase
      const studentRef = doc(db, 'students', currentUser.uid)
      await updateDoc(studentRef, {
        pinnedBadges: newPinnedBadges
      })
      
      // Show animation
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 1000)
    } catch (error) {
      console.error('Error updating pinned badges:', error)
    }
  }

  // Function to unlock a badge (for demo purposes)
  const unlockBadge = (badgeId: string) => {
    setBadges(prev => prev.map(badge => 
      badge.id === badgeId ? {...badge, earned: true, progress: 100} : badge
    ))
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 1000)
  }

  // Get earned badges count
  const earnedCount = badges.filter(b => b.earned).length
  const totalCount = badges.length

  // Group badges by rarity
  const groupedBadges = BADGE_SECTIONS.map(section => {
    const sectionBadges = badges.filter(badge => badge.rarity === section.id)
    const earnedBadges = sectionBadges.filter(badge => badge.earned)
    return {
      ...section,
      badges: sectionBadges,
      earnedCount: earnedBadges.length,
      totalCount: sectionBadges.length
    }
  }).filter(section => section.badges.length > 0)

  // Get pinned badges data
  const pinnedBadgesData = badges.filter(badge => pinnedBadges.includes(badge.id))

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">{t('achievements.title')}</div>
      
      {/* Tab navigation */}
      <div className="flex border-b border-gray-200 dark:border-slate-700">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'achievements'
              ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
              : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('achievements')}
        >
          My Achievements
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'leaderboard'
              ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
              : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('leaderboard')}
        >
          Streak Leaderboard
        </button>
      </div>
      
      {activeTab === 'achievements' ? (
        <>
          {/* Collection Progress */}
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 border border-blue-100 dark:border-slate-700 p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-gray-700 dark:text-slate-300 font-medium">
                Badge Collection Progress
              </div>
              <div className="text-sm text-gray-600 dark:text-slate-400">
                {earnedCount}/{totalCount} badges
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                style={{ width: `${totalCount > 0 ? (earnedCount / totalCount) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          
          {/* Pinned Badges Section */}
          {pinnedBadgesData.length > 0 && (
            <div className="rounded-xl border border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">⭐</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pinned Badges</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {pinnedBadgesData.map(badge => (
                  <div 
                    key={badge.id}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full ${badge.color} text-white shadow-sm`}
                  >
                    <span className="text-lg">{badge.icon}</span>
                    <span className="text-sm font-medium">{badge.name}</span>
                    <button 
                      onClick={() => togglePinBadge(badge.id)}
                      className="text-white/80 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Celebration Animation */}
          {showCelebration && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="text-4xl animate-bounce">⭐</div>
            </div>
          )}
          
          {/* Badge Sections */}
          <div className="space-y-8">
            {groupedBadges.map(section => (
              <div key={section.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{section.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{section.name} Badges</h3>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-slate-400">
                    {section.earnedCount}/{section.totalCount} unlocked
                  </div>
                </div>
                
                {/* Section Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${section.color} h-2 rounded-full`}
                    style={{ width: `${section.totalCount > 0 ? (section.earnedCount / section.totalCount) * 100 : 0}%` }}
                  ></div>
                </div>
                
                {/* Badges Grid */}
                {section.badges.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.badges.map((badge) => (
                      <div 
                        key={badge.id}
                        className={`
                          rounded-xl border-2 p-4 relative overflow-hidden transition-all duration-300
                          ${badge.earned 
                            ? `bg-gradient-to-br ${badge.color} text-white shadow-lg ${badge.glow}` 
                            : 'bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 grayscale opacity-80'
                          }
                          ${badge.borderColor}
                          ${hoveredBadge === badge.id ? 'scale-105' : ''}
                        `}
                        onMouseEnter={() => setHoveredBadge(badge.id)}
                        onMouseLeave={() => setHoveredBadge(null)}
                      >
                        {/* Lock overlay for unearned badges */}
                        {!badge.earned && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="text-4xl">🔒</div>
                          </div>
                        )}
                        
                        {/* Badge content */}
                        <div className="relative z-10">
                          <div className="flex justify-between items-start">
                            <div className="text-4xl">{badge.icon}</div>
                            {badge.earned && (
                              <button 
                                onClick={() => togglePinBadge(badge.id)}
                                className={`text-xs rounded-full px-2 py-1 transition-colors ${
                                  pinnedBadges.includes(badge.id)
                                    ? 'bg-yellow-400 text-yellow-900'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                                }`}
                              >
                                {pinnedBadges.includes(badge.id) ? 'Pinned ⭐' : 'Pin'}
                              </button>
                            )}
                          </div>
                          
                          <div className="mt-2 font-bold">{badge.name}</div>
                          <div className="text-xs opacity-80 mt-1">{badge.description}</div>
                          
                          {/* Progress ring */}
                          <div className="mt-3 relative">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{badge.progress}%</span>
                            </div>
                            <div className="w-full bg-black/20 rounded-full h-2 mt-1">
                              <div 
                                className={`h-2 rounded-full ${badge.earned ? 'bg-white' : 'bg-gradient-to-r from-blue-400 to-purple-500'}`}
                                style={{ width: `${badge.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Rarity indicator */}
                          <div className="mt-2 text-xs flex items-center gap-1">
                            <span className="capitalize">
                              {badge.rarity === 'legendary' && 'Legendary'}
                              {badge.rarity === 'diamond' && 'Diamond'}
                              {badge.rarity === 'platinum' && 'Platinum'}
                              {badge.rarity === 'gold' && 'Gold'}
                              {badge.rarity === 'silver' && 'Silver'}
                              {badge.rarity === 'bronze' && 'Bronze'}
                              {badge.rarity === 'rookie' && 'Rookie'}
                            </span>
                          </div>
                          
                          {/* Unlock condition tooltip */}
                          {hoveredBadge === badge.id && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                              {badge.unlockCondition}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                            </div>
                          )}
                          
                          {/* Unlock button for demo */}
                          {!badge.earned && (
                            <button 
                              onClick={() => unlockBadge(badge.id)}
                              className="mt-2 text-xs bg-white/20 rounded-full px-2 py-1 hover:bg-white/30 transition-colors w-full"
                            >
                              Unlock (Demo)
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 dark:text-slate-400 py-4">
                    No badges in this category yet
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        // Streak Leaderboard Tab
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Full Streak Leaderboard</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              See how you rank against other students based on your daily learning streaks.
            </p>
          </div>
          <StreakLeaderboard maxEntries={20} showCurrentUser={true} />
        </div>
      )}
    </div>
  )
}

export default AchievementsPage