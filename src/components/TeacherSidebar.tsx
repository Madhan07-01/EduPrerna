import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function TeacherSidebar() {
  const { t } = useLanguage()
  const { signOutUser } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className="flex flex-col w-64 border-r border-gray-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 text-gray-900 dark:text-slate-100 p-4 gap-4">
      <div className="flex items-center gap-2 px-2 py-1">
        <div className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-emerald-600">👨‍🏫</div>
        <div>
          <div className="font-semibold">{t('app.title')} - Teacher</div>
          <div className="text-xs text-gray-600 dark:text-slate-400">{t('app.subtitle')}</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        <button
          onClick={() => navigate('/teacher')}
          className="w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
        >
          <span className="text-lg">📊</span>
          <span className="text-sm">Dashboard</span>
        </button>
        
        <div>
          <button
            onClick={() => navigate('/settings')}
            className="w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900"
          >
            <span className="text-lg">⚙️</span>
            <span className="text-sm">Settings</span>
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
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}