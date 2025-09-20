import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export type NavKey = 'dashboard' | 'courses' | 'achievements' | 'profile' | 'teacher' | 'settings' | 'quiz' | 'challenge' | 'games' | 'download' | 'onestudy'

type SidebarProps = {
  active: NavKey
  onNavigate: (key: NavKey) => void
}

const navItems: Array<{ key: NavKey; labelKey: string; icon: string }> = [
  { key: 'dashboard', labelKey: 'nav.dashboard', icon: '🏠' },
  { key: 'courses', labelKey: 'nav.courses', icon: '📚' },
  { key: 'achievements', labelKey: 'nav.achievements', icon: '🏆' },
  { key: 'onestudy', labelKey: 'nav.onestudy', icon: '⏱️' },
  { key: 'profile', labelKey: 'nav.profile', icon: '👤' },
  { key: 'teacher', labelKey: 'nav.teacher', icon: '📊' },
  { key: 'quiz', labelKey: 'nav.quiz', icon: '❓' },
  { key: 'challenge', labelKey: 'nav.challenge', icon: '🎯' },
  { key: 'games', labelKey: 'nav.games', icon: '🎮' },
  { key: 'download', labelKey: 'nav.download', icon: '📥' },
  { key: 'settings', labelKey: 'nav.settings', icon: '⚙️' },
]

export function Sidebar({ active }: SidebarProps) {
  const { t } = useLanguage()
  const { currentUser, profile, signOutUser } = useAuth()
  const navigate = useNavigate()

  const isTeacher = profile?.role === 'teacher'

  const visibleItems = navItems.filter((item) => {
    if (!currentUser) {
      // Not signed in: hide teacher nav
      return item.key !== 'teacher'
    }
    if (isTeacher) {
      // Teachers: only show teacher and settings
      return item.key === 'teacher' || item.key === 'settings'
    }
    // Students: hide teacher nav
    return item.key !== 'teacher'
  })

  return (
    <aside className="hidden md:flex md:flex-col w-64 border-r border-gray-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 text-gray-900 dark:text-slate-100 p-4 gap-4">
      <div className="flex items-center gap-2 px-2 py-1">
        <div className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-sky-600">⚡</div>
        <div>
          <div className="font-semibold">{t('app.title')}</div>
          <div className="text-xs text-gray-600 dark:text-slate-400">{t('app.subtitle')}</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {visibleItems.map((n) => {
          const isSettings = n.key === 'settings'
          if (isSettings) {
            return (
              <div key={n.key}>
                <button
                  onClick={() => navigate(`/${n.key}`)}
                  className={
                    'w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ' +
                    (active === n.key
                      ? 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900')
                  }
                >
                  <span className="text-lg">{n.icon}</span>
                  <span className="text-sm">{t(n.labelKey)}</span>
                </button>
                <ul className="ml-9 mt-1 list-none">
                  <li>
                    <button
                      onClick={async () => {
                        await signOutUser()
                        navigate('/')
                      }}
                      className="mt-2 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                    >
                      {t('settings.signOut')}
                    </button>
                  </li>
                </ul>
              </div>
            )
          }
          return (
            <button
              key={n.key}
              onClick={() => navigate(`/${n.key}`)}
              className={
                'w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ' +
                (active === n.key
                  ? 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white'
                  : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900')
              }
            >
              <span className="text-lg">{n.icon}</span>
              <span className="text-sm">{t(n.labelKey)}</span>
            </button>
          )
        })}
      </nav>
      <div className="px-2 text-xs text-gray-500 dark:text-slate-500">{t('footer.motto')}</div>
    </aside>
  )
}

export default Sidebar


