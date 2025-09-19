import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../hooks/useAuth'
import { SectionCard } from '../components/SectionCard'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export function DashboardPage() {
  const { t } = useLanguage()
  const { currentUser, profile } = useAuth()
  const [streakCount, setStreakCount] = useState(1)
  const name = profile?.name ?? currentUser?.displayName ?? currentUser?.email ?? 'Learner'
  
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
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Welcome, {name} 👋</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 p-6 text-white">
          <div className="text-xl font-bold">{t('welcome.title')}</div>
          <div className="text-sm opacity-90">{t('welcome.subtitle')}</div>
        </div>
        <div className="rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-6 text-white">
          <div className="text-xl font-bold">{t('ready.title')}</div>
          <div className="text-sm opacity-90">{t('ready.subtitle')}</div>
        </div>
      </div>
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