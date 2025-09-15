import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export type NavKey = 'dashboard' | 'courses' | 'achievements' | 'profile' | 'teacher' | 'settings' | 'quiz' | 'challenge' | 'games' | 'download'

type SidebarProps = {
  active: NavKey
  onNavigate: (key: NavKey) => void
}

const navItems: Array<{ key: NavKey; labelKey: string; icon: string }> = [
  { key: 'dashboard', labelKey: 'nav.dashboard', icon: '🏠' },
  { key: 'courses', labelKey: 'nav.courses', icon: '📚' },
  { key: 'achievements', labelKey: 'nav.achievements', icon: '🏆' },
  { key: 'profile', labelKey: 'nav.profile', icon: '👤' },
  { key: 'teacher', labelKey: 'nav.teacher', icon: '📊' },
  { key: 'quiz', labelKey: 'nav.quiz', icon: '❓' },
  { key: 'challenge', labelKey: 'nav.challenge', icon: '🎯' },
  { key: 'games', labelKey: 'nav.games', icon: '🎮' },
  { key: 'download', labelKey: 'nav.download', icon: '📥' },
  { key: 'settings', labelKey: 'nav.settings', icon: '⚙️' },
]

export function Sidebar({ active, onNavigate }: SidebarProps) {
  const { t } = useLanguage()
  
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-slate-950/90 dark:bg-slate-950/90 bg-white/95 border-r border-slate-800 dark:border-slate-800 border-gray-200 text-slate-100 dark:text-slate-100 text-gray-900 p-4 gap-4">
      <div className="flex items-center gap-2 px-2 py-1">
        <div className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-sky-600">⚡</div>
        <div>
          <div className="font-semibold">{t('app.title')}</div>
          <div className="text-xs text-slate-400 dark:text-slate-400 text-gray-600">{t('app.subtitle')}</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((n) => (
          <button
            key={n.key}
            onClick={() => onNavigate(n.key)}
            className={
              'w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ' +
              (active === n.key
                ? 'bg-slate-800 dark:bg-slate-800 bg-gray-100 text-white dark:text-white text-gray-900'
                : 'text-slate-300 dark:text-slate-300 text-gray-700 hover:bg-slate-900 dark:hover:bg-slate-900 hover:bg-gray-50')
            }
          >
            <span className="text-lg">{n.icon}</span>
            <span className="text-sm">{t(n.labelKey)}</span>
          </button>
        ))}
      </nav>
      <div className="px-2 text-xs text-slate-500 dark:text-slate-500 text-gray-500">{t('footer.motto')}</div>
    </aside>
  )
}

export default Sidebar


