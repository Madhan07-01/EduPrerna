import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../hooks/useAuth'
import { SectionCard } from '../components/SectionCard'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export function ProfilePage() {
  const { t } = useLanguage()
  const { currentUser, profile } = useAuth()
  const [streakCount, setStreakCount] = useState(1)
  const name = profile?.name ?? currentUser?.displayName ?? currentUser?.email ?? 'User'
  
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
        <SectionCard title="Day Streak">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium">Current Day Streak: {streakCount}</span>
            <span className="text-yellow-500">🔥</span>
          </div>
        </SectionCard>
      )}
      <SectionCard title="Learning History">Start your learning journey</SectionCard>
    </div>
  )
}

export default ProfilePage