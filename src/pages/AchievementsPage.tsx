import { useLanguage } from '../contexts/LanguageContext'
import { useState, useEffect } from 'react'
import StreakLeaderboard from '../components/StreakLeaderboard'
import { useAuth } from '../hooks/useAuth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { useLocation } from 'react-router-dom'

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

// Group badges by rarity level
const badgeSections = [
  { 
    id: 'legendary', 
    name: 'Legendary', 
    icon: '🟪',
    color: 'from-purple-600 to-indigo-700',
    borderColor: 'border-purple-500'
  },
  { 
    id: 'diamond', 
    name: 'Diamond', 
    icon: '💎',
    color: 'from-blue-400 to-cyan-500',
    borderColor: 'border-blue-400'
  },
  { 
    id: 'platinum', 
    name: 'Platinum', 
    icon: '🟦',
    color: 'from-gray-300 to-gray-500',
    borderColor: 'border-gray-400'
  },
  { 
    id: 'gold', 
    name: 'Gold', 
    icon: '🥇',
    color: 'from-yellow-500 to-amber-600',
    borderColor: 'border-yellow-500'
  },
  { 
    id: 'silver', 
    name: 'Silver', 
    icon: '🥈',
    color: 'from-gray-400 to-gray-600',
    borderColor: 'border-gray-500'
  },
  { 
    id: 'bronze', 
    name: 'Bronze', 
    icon: '🥉',
    color: 'from-amber-700 to-amber-900',
    borderColor: 'border-amber-700'
  },
  { 
    id: 'rookie', 
    name: 'Rookie', 
    icon: '🌱',
    color: 'from-green-500 to-emerald-600',
    borderColor: 'border-green-500'
  }
]

export function AchievementsPage() {
  const { t } = useLanguage()
  const { currentUser } = useAuth()
  const location = useLocation()
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 'first-steps',
      name: 'First Steps',
      icon: '👣',
      rarity: 'rookie',
      earned: true,
      progress: 100,
      description: 'Complete your first lesson',
      color: 'from-green-500 to-emerald-600',
      glow: 'shadow-green-500/50',
      borderColor: 'border-green-500',
      unlockCondition: 'Complete any lesson'
    },
    {
      id: 'week-warrior',
      name: 'Week Warrior',
      icon: '⚔️',
      rarity: 'bronze',
      earned: true,
      progress: 100,
      description: 'Study for 7 consecutive days',
      color: 'from-amber-700 to-amber-900',
      glow: 'shadow-amber-500/50',
      borderColor: 'border-amber-700',
      unlockCondition: 'Maintain a 7-day streak'
    },
    {
      id: 'math-master',
      name: 'Math Master',
      icon: '➗',
      rarity: 'gold',
      earned: false,
      progress: 75,
      description: 'Complete 10 math lessons',
      color: 'from-yellow-500 to-amber-600',
      glow: 'shadow-yellow-500/50',
      borderColor: 'border-yellow-500',
      unlockCondition: 'Complete 10 Math lessons'
    },
    {
      id: 'physics-pro',
      name: 'Physics Pro',
      icon: '🔬',
      rarity: 'gold',
      earned: false,
      progress: 40,
      description: 'Complete 8 physics lessons',
      color: 'from-yellow-500 to-amber-600',
      glow: 'shadow-yellow-500/50',
      borderColor: 'border-yellow-500',
      unlockCondition: 'Complete 8 Physics lessons'
    },
    {
      id: 'chemistry-champion',
      name: 'Chemistry Champion',
      icon: '⚗️',
      rarity: 'diamond',
      earned: false,
      progress: 20,
      description: 'Complete 12 chemistry lessons',
      color: 'from-blue-400 to-cyan-500',
      glow: 'shadow-blue-500/50',
      borderColor: 'border-blue-400',
      unlockCondition: 'Complete 12 Chemistry lessons'
    },
    {
      id: 'biology-boss',
      name: 'Biology Boss',
      icon: '🧬',
      rarity: 'diamond',
      earned: false,
      progress: 10,
      description: 'Complete 10 biology lessons',
      color: 'from-blue-400 to-cyan-500',
      glow: 'shadow-blue-500/50',
      borderColor: 'border-blue-400',
      unlockCondition: 'Complete 10 Biology lessons'
    },
    {
      id: 'quiz-champion',
      name: 'Quiz Champion',
      icon: '🏆',
      rarity: 'legendary',
      earned: false,
      progress: 5,
      description: 'Score 100% on 5 quizzes',
      color: 'from-purple-600 to-indigo-700',
      glow: 'shadow-purple-500/50',
      borderColor: 'border-purple-500',
      unlockCondition: 'Score 100% on 5 quizzes'
    },
    {
      id: 'knowledge-seeker',
      name: 'Knowledge Seeker',
      icon: '📚',
      rarity: 'silver',
      earned: true,
      progress: 100,
      description: 'Complete 20 lessons across subjects',
      color: 'from-gray-400 to-gray-600',
      glow: 'shadow-gray-500/50',
      borderColor: 'border-gray-500',
      unlockCondition: 'Complete 20 lessons across all subjects'
    }
  ])

  const [pinnedBadges, setPinnedBadges] = useState<string[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard'>('achievements')
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null)

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
        }
      } catch (error) {
        console.error('Error loading pinned badges:', error)
      }
    }
    
    loadPinnedBadges()
  }, [currentUser])

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
  const groupedBadges = badgeSections.map(section => {
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
                style={{ width: `${(earnedCount / totalCount) * 100}%` }}
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