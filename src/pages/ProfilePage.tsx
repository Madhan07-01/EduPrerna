import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../hooks/useAuth'
import { SectionCard } from '../components/SectionCard'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import StreakLeaderboard from '../components/StreakLeaderboard'

export function ProfilePage() {
  const { t } = useLanguage()
  const { currentUser, profile } = useAuth()
  const [streakCount, setStreakCount] = useState(1)
  const [pinnedBadges, setPinnedBadges] = useState<{id: string, name: string, icon: string}[]>([])
  const navigate = useNavigate()
  const name = profile?.name ?? currentUser?.displayName ?? currentUser?.email ?? 'User'
  
  useEffect(() => {
    // Only fetch streak for student accounts
    if (currentUser && profile?.role === 'student') {
      const fetchStreakAndBadges = async () => {
        try {
          const studentRef = doc(db, 'students', currentUser.uid)
          const studentDoc = await getDoc(studentRef)
          
          if (studentDoc.exists()) {
            const studentData = studentDoc.data()
            setStreakCount(studentData.streakCount || 1)
            
            // Set pinned badges if available
            if (studentData.pinnedBadgesData) {
              setPinnedBadges(studentData.pinnedBadgesData)
            }
          }
        } catch (error) {
          console.error('Error fetching streak and badges:', error)
          // Default to 1 on error
          setStreakCount(1)
        }
      }
      
      fetchStreakAndBadges()
    }
  }, [currentUser, profile])
  
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-gradient-to-tr from-indigo-600 to-fuchsia-600 p-6 text-white">
        <div className="text-xl font-bold">{name}</div>
        <div className="text-sm">Grade 6 • English</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { labelKey: 'stats.xp', value: '0' },
          { labelKey: 'stats.badges', value: '0' },
          { labelKey: 'stats.streak', value: String(streakCount) },
          { labelKey: 'stats.courses', value: '0' },
        ].map((s) => (
          <SectionCard key={s.labelKey} title={t(s.labelKey)}>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{s.value}</div>
          </SectionCard>
        ))}
      </div>
      {profile?.role === 'student' && (
        <>
          {/* Pinned Badges Preview */}
          <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-900 dark:text-white font-semibold">Pinned Badges</div>
              <button 
                onClick={() => navigate('/achievements')}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View All Badges
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {pinnedBadges.length > 0 ? (
                pinnedBadges.map(badge => (
                  <div 
                    key={badge.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm"
                  >
                    <span className="text-lg">{badge.icon}</span>
                    <span className="text-sm font-medium">{badge.name}</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 dark:text-slate-400 text-sm">
                  No badges pinned yet. Visit Achievements to pin your favorite badges!
                </div>
              )}
            </div>
          </div>
          
          <SectionCard title="Day Streak">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium">Current Day Streak: {streakCount}</span>
              <span className="text-yellow-500">🔥</span>
            </div>
          </SectionCard>
          
          {/* Streak Leaderboard Preview */}
          <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-900 dark:text-white font-semibold">Streak Leaderboard</div>
              <button 
                onClick={() => navigate('/achievements')}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View Full Leaderboard
              </button>
            </div>
            <StreakLeaderboard maxEntries={3} compact={true} />
          </div>
        </>
      )}
      <SectionCard title="Learning History">Start your learning journey</SectionCard>
    </div>
  )
}

export default ProfilePage