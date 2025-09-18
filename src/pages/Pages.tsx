import type { ReactNode } from 'react'
import CoursesEnhanced from './CoursesEnhanced'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export function SectionCard({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
      <div className="text-gray-900 dark:text-slate-100 font-semibold mb-2">{title}</div>
      <div className="text-gray-700 dark:text-slate-300 text-sm">{children}</div>
    </div>
  )
}

export function DashboardPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsername = async () => {
      if (!user?.uid) return
      try {
        const ref = doc(db, 'users', user.uid)
        const snap = await getDoc(ref)
        const data = snap.data() as { username?: string } | undefined
        setUsername(data?.username ?? null)
      } catch {
        setUsername(null)
      }
    }
    fetchUsername()
  }, [user?.uid])
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Welcome, {username ? username : 'Learner'} 👋</h2>
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
          { labelKey: 'stats.streak', value: '1' },
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

export function CoursesPage() {
  return <CoursesEnhanced />
}

export function AchievementsPage() {
  const { t } = useLanguage()
  
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">{t('achievements.title')}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['First Steps', 'Week Warrior', 'Math Master', 'Physics Pro', 'Chemistry Champion', 'Biology Boss', 'Quiz Champion', 'Knowledge Seeker'].map(
          (b) => (
            <SectionCard key={b} title={b}>
              Not earned yet
            </SectionCard>
          ),
        )}
      </div>
    </div>
  )
}

export function ProfilePage() {
  const { t } = useLanguage()
  
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-gradient-to-tr from-indigo-600 to-fuchsia-600 p-6 text-white">
        <div className="text-xl font-bold">MADHAN V. M</div>
        <div className="text-sm">Grade 6 • English</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { labelKey: 'stats.xp', value: '0' },
          { labelKey: 'stats.badges', value: '0' },
          { labelKey: 'stats.streak', value: '1' },
          { labelKey: 'stats.courses', value: '0' },
        ].map((s) => (
          <SectionCard key={s.labelKey} title={t(s.labelKey)}>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{s.value}</div>
          </SectionCard>
        ))}
      </div>
      <SectionCard title="Learning History">Start your learning journey</SectionCard>
    </div>
  )
}

// Teacher page moved to dedicated TeacherDashboard component

export function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const { signOutUser } = useAuth()
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">{t('settings.title')}</div>
      <SectionCard title={t('settings.appearance')}>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{t('settings.darkMode')}</div>
            <div className="text-xs text-slate-400 dark:text-slate-400 text-gray-600">Switch between light and dark themes</div>
          </div>
          <button
            aria-label={t('settings.darkMode')}
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </SectionCard>
      <SectionCard title={t('settings.language')}>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{t('settings.appLanguage')}</div>
            <div className="text-xs text-slate-400 dark:text-slate-400 text-gray-600">Choose your preferred language</div>
          </div>
          <select
            aria-label={t('settings.appLanguage')}
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'or')}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1 text-sm"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="or">ଓଡ଼ିଆ</option>
          </select>
        </div>
      </SectionCard>
      <SectionCard title={t('settings.offline')}>
        <div className="font-medium">{t('settings.enableOffline')}</div>
        <div className="h-2 bg-gray-200 dark:bg-slate-800 rounded mt-3 w-full">
          <div className="h-2 bg-indigo-500 rounded w-4/5"></div>
        </div>
      </SectionCard>
      <SectionCard title={t('settings.account')}>
        <button onClick={signOutUser} className="rounded-md bg-rose-600 text-white px-3 py-2 text-sm">{t('settings.signOut')}</button>
      </SectionCard>
    </div>
  )
}


