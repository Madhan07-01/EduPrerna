import { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { useAuth } from '../hooks/useAuth'

type LeaderboardEntry = {
  id: string
  username: string
  xp: number
  streak: number
  rank: number
  isCurrentUser: boolean
  lastUpdated?: number
  pinnedBadges?: {id: string, name: string, icon: string}[]
}

type StreakLeaderboardProps = {
  maxEntries?: number
  showCurrentUser?: boolean
  compact?: boolean
}

export function StreakLeaderboard({ 
  maxEntries = 10, 
  showCurrentUser = true,
  compact = false
}: StreakLeaderboardProps) {
  const { currentUser } = useAuth()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!currentUser) return
      
      try {
        setLoading(true)
        
        // Query to get top XP entries
        const leaderboardQuery = query(
          collection(db, 'leaderboard'),
          orderBy('xp', 'desc'),
          limit(maxEntries * 2) // Get more entries to ensure we can find current user
        )
        
        const querySnapshot = await getDocs(leaderboardQuery)
        const entries: LeaderboardEntry[] = []
        
        let currentUserEntry: LeaderboardEntry | null = null
        let rank = 1
        
        // Process all entries
        for (const doc of querySnapshot.docs) {
          const data = doc.data()
          const userId = doc.id
          const username = data.username || data.name || 'Anonymous'
          const xp = data.xp || 0
          const streak = data.streak || 0
          const lastUpdated = data.lastUpdated || 0
          const pinnedBadges = data.pinnedBadgesData || []
          
          const entry: LeaderboardEntry = {
            id: userId,
            username,
            xp,
            streak,
            lastUpdated,
            rank,
            isCurrentUser: userId === currentUser.uid,
            pinnedBadges
          }
          
          // Save current user entry if found
          if (entry.isCurrentUser) {
            currentUserEntry = entry
          }
          
          entries.push(entry)
          rank++
        }
        
        // Sort by XP (desc) then by username (asc) for tie-breaking
        entries.sort((a, b) => {
          if (b.xp !== a.xp) {
            return b.xp - a.xp
          }
          return a.username.localeCompare(b.username)
        })
        
        // Reassign ranks after sorting
        entries.forEach((entry, index) => {
          entry.rank = index + 1
          if (entry.isCurrentUser) {
            if (currentUserEntry) {
              currentUserEntry.rank = entry.rank
            }
          }
        })
        
        // Filter to max entries
        let finalEntries = entries.slice(0, maxEntries)
        
        // If current user is not in top entries but we want to show them
        if (showCurrentUser && currentUserEntry && !finalEntries.some(e => e.isCurrentUser)) {
          // Find the current user's actual rank
          const currentUserRank = entries.findIndex(e => e.isCurrentUser)
          if (currentUserRank >= 0) {
            // Add current user to the list
            finalEntries.push(currentUserEntry)
            // Sort again to maintain order
            finalEntries.sort((a, b) => {
              if (b.xp !== a.xp) {
                return b.xp - a.xp
              }
              return a.username.localeCompare(b.username)
            })
          }
        }
        
        // Limit to max entries again after adding current user
        finalEntries = finalEntries.slice(0, maxEntries)
        
        // Reassign final ranks
        finalEntries.forEach((entry, index) => {
          entry.rank = index + 1
        })
        
        setLeaderboard(finalEntries)
      } catch (err: any) {
        console.error('Error fetching leaderboard:', err)
        const code = err?.code || err?.message || ''
        if (typeof code === 'string' && code.includes('permission') || err?.code === 'permission-denied') {
          setError("You don’t have access to view the leaderboard. Please contact admin.")
        } else {
          setError('Failed to load leaderboard')
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchLeaderboard()
  }, [currentUser, maxEntries, showCurrentUser])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    )
  }
  
  if (leaderboard.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No leaderboard data available
      </div>
    )
  }
  
  return (
    <div className={`space-y-2 ${compact ? 'text-sm' : ''}`}>
      {leaderboard.map((entry) => (
        <div 
          key={entry.id}
          className={`
            flex items-center justify-between p-3 rounded-lg transition-all
            ${entry.isCurrentUser 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
              : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700'
            }
            ${compact ? 'p-2' : ''}
          `}
        >
          <div className="flex items-center gap-3">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full
              ${entry.isCurrentUser 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-200'
              }
              ${compact ? 'w-6 h-6 text-xs' : ''}
            `}>
              {getRankDisplay(entry.rank)}
            </div>
            <div>
              <div className={`font-medium ${entry.isCurrentUser ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {entry.username}
              </div>
              {compact ? null : (
                <div className={`text-xs ${entry.isCurrentUser ? 'text-white/80' : 'text-gray-500 dark:text-slate-400'}`}>
                  {getBadgeForRank(entry.rank)}
                </div>
              )}
              {/* Pinned badges preview */}
              {!compact && entry.pinnedBadges && entry.pinnedBadges.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {entry.pinnedBadges.slice(0, 3).map((badge, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-xs"
                      title={badge.name}
                    >
                      {badge.icon}
                    </div>
                  ))}
                  {entry.pinnedBadges.length > 3 && (
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-xs">
                      +{entry.pinnedBadges.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {compact ? null : (
              <div className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${entry.isCurrentUser 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-200'
                }
              `}>
                {getBadgeForRank(entry.rank)}
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className={`font-bold ${entry.isCurrentUser ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {entry.xp} XP
              </span>
              <span className="mx-1">•</span>
              <span className={`font-bold ${entry.isCurrentUser ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {entry.streak}
              </span>
              <span className={entry.isCurrentUser ? 'text-white/80' : 'text-gray-500 dark:text-slate-400'}>🔥</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function getRankDisplay(rank: number) {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return rank
}

function getBadgeForRank(rank: number) {
  if (rank === 1) return '🏆 Champion'
  if (rank <= 3) return '🏅 Top Performer'
  if (rank <= 10) return '🌟 High Achiever'
  return '🚀 Learner'
}

export default StreakLeaderboard