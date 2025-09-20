import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../hooks/useAuth'
import { SectionCard } from '../components/SectionCard'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import StreakLeaderboard from '../components/StreakLeaderboard'
import { useNavigate } from 'react-router-dom'

// Motivational quotes for students
const MOTIVATIONAL_QUOTES = [
  "Every expert was once a beginner—keep going!",
  "Ready to achieve new milestones today?",
  "Learning is a treasure that follows its owner everywhere.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Your streak shows your dedication—keep it up!",
  "Small progress is still progress. Keep going!",
  "You're building knowledge that will last a lifetime.",
  "Consistency is the key to success. You've got this!"
]

export function DashboardPage() {
  const { t } = useLanguage()
  const { currentUser, profile } = useAuth()
  const navigate = useNavigate()
  const [streakCount, setStreakCount] = useState(1)
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const name = profile?.name ?? currentUser?.displayName ?? currentUser?.email ?? 'Learner'
  
  // Rotate quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prev => (prev + 1) % MOTIVATIONAL_QUOTES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    // Only fetch streak for student accounts
    if (currentUser && profile?.role === 'student') {
      const fetchStreak = async () => {
        try {
          const studentRef = doc(db, 'students', currentUser.uid)
          const studentDoc = await getDoc(studentRef)
          
          if (studentDoc.exists()) {
            const studentData = studentDoc.data()
            setStreakCount(studentData.streakCount || 1)
          }
        } catch (error) {
          console.error('Error fetching streak:', error)
          // Default to 1 on error
          setStreakCount(1)
        }
      }
      
      fetchStreak()
    }
  }, [currentUser, profile])
  
  // Only show leaderboard for students
  const showLeaderboard = currentUser && profile?.role === 'student'
  
  return (
    <div className="space-y-4">
      {/* Single welcome message inside the purple card */}
      <div className="rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 p-6 text-white">
        <div className="text-xl font-bold">Welcome back, {name}! 👋</div>
        <div className="text-sm opacity-90 mt-1">Every expert was once a beginner—keep going!</div>
        
        {/* Personalized streak/XP summary badge */}
        <div className="mt-4 flex items-center gap-4">
          <div className="bg-white/20 rounded-lg p-2 text-center min-w-[80px]">
            <div className="text-2xl font-bold">{streakCount}</div>
            <div className="text-xs">Day Streak</div>
          </div>
          <div className="bg-white/20 rounded-lg p-2 text-center min-w-[80px]">
            <div className="text-2xl font-bold">0</div>
            <div className="text-xs">Total XP</div>
          </div>
          <div className="bg-white/20 rounded-lg p-2 text-center min-w-[80px]">
            <div className="text-2xl font-bold">1</div>
            <div className="text-xs">Level</div>
          </div>
        </div>
      </div>
      
      {/* Daily motivational tip */}
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 border border-blue-100 dark:border-slate-700 p-4">
        <div className="flex items-start">
          <div className="text-blue-500 dark:text-blue-400 mr-2">💡</div>
          <div className="text-gray-700 dark:text-slate-300 text-sm">
            {MOTIVATIONAL_QUOTES[currentQuoteIndex]}
          </div>
        </div>
      </div>
      
      {/* Streak Leaderboard - Only for students */}
      {showLeaderboard && (
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-900 dark:text-white font-semibold">Streak Leaderboard</div>
            <div className="text-xs text-gray-500 dark:text-slate-400">Top 5 Students</div>
          </div>
          <StreakLeaderboard maxEntries={5} compact={true} />
        </div>
      )}
      
      {/* Navigation buttons to Achievements page */}
      {showLeaderboard && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/achievements')}
            className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🏆</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">View All Badges</div>
                <div className="text-sm text-gray-600 dark:text-slate-400">See your achievements and progress</div>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/achievements?tab=leaderboard')}
            className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🔥</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">View Full Leaderboard</div>
                <div className="text-sm text-gray-600 dark:text-slate-400">See how you rank against others</div>
              </div>
            </div>
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { labelKey: 'stats.xp', value: '0' },
          { labelKey: 'stats.badges', value: '0' },
          { labelKey: 'stats.level', value: '1' },
          { labelKey: 'stats.streak', value: String(streakCount) },
        ].map((s) => (
          <SectionCard key={s.labelKey} title={t(s.labelKey)}>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{s.value}</div>
          </SectionCard>
        ))}
      </div>
      <div>
        <div className="text-gray-800 dark:text-slate-200 font-semibold mb-2">{t('courses.title')}</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {['Mathematics', 'Physics', 'Chemistry', 'Biology'].map((c) => (
            <div key={c} className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
              <div className="flex items-center justify-between">
                <div className="text-gray-900 dark:text-white font-semibold">{c}</div>
            <button className="rounded-md bg-sky-600 text-white text-sm px-3 py-1" aria-label={`Open ${c} course`}>Open</button>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-slate-800 rounded mt-3">
                <div className="h-2 w-2/3 bg-sky-500 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage