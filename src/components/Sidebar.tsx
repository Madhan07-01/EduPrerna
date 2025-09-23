import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useState, useEffect, useRef } from 'react'

export type NavKey = 'dashboard' | 'courses' | 'achievements' | 'profile' | 'teacher' | 'settings' | 'quiz' | 'challenge' | 'games' | 'download' | 'mini-games' | 'one-night-study'

type SidebarProps = {
  active: NavKey
  onNavigate: (key: NavKey) => void
  isCollapsed?: boolean
  onToggle?: () => void
}

const navItems: Array<{ key: NavKey; labelKey: string; icon: string; to?: string }> = [
  { key: 'dashboard', labelKey: 'nav.dashboard', icon: '🏠' },
  { key: 'courses', labelKey: 'nav.courses', icon: '📚' },
  { key: 'achievements', labelKey: 'nav.achievements', icon: '🏆' },
  { key: 'profile', labelKey: 'nav.profile', icon: '👤' },
  { key: 'teacher', labelKey: 'nav.teacher', icon: '📊' },
  { key: 'one-night-study', labelKey: 'nav.oneNightStudy', icon: '🌙', to: '/eduprerna/one-night-study' },
  { key: 'quiz', labelKey: 'nav.quiz', icon: '❓' },
  { key: 'challenge', labelKey: 'nav.challenge', icon: '🎯' },
  { key: 'games', labelKey: 'nav.games', icon: '🎮' },
  { key: 'mini-games', labelKey: 'nav.miniGames', icon: '🕹️' },
  { key: 'download', labelKey: 'nav.download', icon: '📥' },
  { key: 'settings', labelKey: 'nav.settings', icon: '⚙️' },
]

export function Sidebar({ active, isCollapsed = true, onToggle }: SidebarProps) {
  const { t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { currentUser, profile, signOutUser } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(isCollapsed)
  const [isMobile, setIsMobile] = useState(false)
  const tooltipRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const isTeacher = profile?.role === 'teacher'

  // Check if we're on mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // On mobile, sidebar should be collapsed by default
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setCollapsed(isCollapsed)
  }, [isCollapsed])

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

  const toggleSidebar = () => {
    if (onToggle) {
      onToggle()
    } else {
      setCollapsed(!collapsed)
    }
  }

  const showTooltip = (key: string) => {
    if (tooltipRefs.current[key]) {
      tooltipRefs.current[key]!.style.opacity = '1'
    }
  }

  const hideTooltip = (key: string) => {
    if (tooltipRefs.current[key]) {
      tooltipRefs.current[key]!.style.opacity = '0'
    }
  }

  return (
    <>
      {/* Hamburger button for mobile and desktop */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-white dark:bg-slate-800 rounded-md p-2 shadow-md md:hidden"
        aria-label="Toggle sidebar"
      >
        <div className="text-lg">☰</div>
      </button>
      
      {/* Desktop hamburger button - always visible */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 bg-white dark:bg-slate-800 rounded-md p-2 shadow-md hidden md:block"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <div className="text-lg">☰</div>
      </button>

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:relative z-40 md:z-auto
          h-screen md:h-auto
          w-64
          border-r border-gray-200 dark:border-slate-800 
          bg-white/95 dark:bg-slate-950/90 
          text-gray-900 dark:text-slate-100 
          p-4 gap-4
          transition-all duration-300 ease-in-out animate-sidebar-appear
          ${collapsed ? 'md:translate-x-0 md:w-20' : ''}
          ${isMobile ? (collapsed ? '-translate-x-full' : 'translate-x-0') : ''}
          md:flex md:flex-col
        `}
      >
        <div className={`flex items-center gap-2 px-2 py-1 ${collapsed ? 'justify-center' : ''}`}>
          <div className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-sky-600">⚡</div>
          {!collapsed && (
            <div>
              <div className="font-semibold">{t('app.title')}</div>
              <div className="text-xs text-gray-600 dark:text-slate-400">{t('app.subtitle')}</div>
            </div>
          )}
        </div>
        
        <nav className="flex-1 space-y-1">
          {visibleItems.map((n) => {
            const isSettings = n.key === 'settings'
            if (isSettings) {
              return (
                <div key={n.key}>
                  <button
                    onClick={() => navigate(n.to ?? `/${n.key}`)}
                    className={`
                      w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors
                      ${active === n.key
                        ? 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900'}
                      ${collapsed ? 'justify-center' : ''}
                    `}
                    onMouseEnter={() => showTooltip(n.key)}
                    onMouseLeave={() => hideTooltip(n.key)}
                  >
                    <span className="text-lg transition-transform duration-200 hover:scale-110">{n.icon}</span>
                    {!collapsed && <span className="text-sm">{t(n.labelKey)}</span>}
                    
                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div 
                        ref={(el) => { tooltipRefs.current[n.key] = el; }}
                        className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 transition-opacity duration-200"
                      >
                        {t(n.labelKey)}
                      </div>
                    )}
                  </button>
                  
                  {!collapsed && (
                    <ul className="ml-9 mt-1 list-none">
                      <li>
                        <button
                          onClick={async () => {
                            await signOutUser()
                            navigate('/')
                          }}
                          className="mt-2 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                        >
                          {t('settings.signOut')}
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              )
            }
            return (
              <button
                key={n.key}
                onClick={() => navigate(n.to ?? `/${n.key}`)}
                className={`
                  w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors
                  ${active === n.key
                    ? 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white'
                    : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900'}
                  ${collapsed ? 'justify-center' : ''}
                `}
                onMouseEnter={() => showTooltip(n.key)}
                onMouseLeave={() => hideTooltip(n.key)}
              >
                <span className="text-lg transition-transform duration-200 hover:scale-110">{n.icon}</span>
                {!collapsed && <span className="text-sm">{t(n.labelKey)}</span>}
                
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div 
                    ref={(el) => { tooltipRefs.current[n.key] = el; }}
                    className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 transition-opacity duration-200"
                  >
                    {t(n.labelKey)}
                  </div>
                )}
              </button>
            )
          })}
        </nav>
        
        {/* Theme toggle and footer */}
        {!collapsed && (
          <div className="space-y-2">
            <button
              onClick={toggleTheme}
              className="w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900"
            >
              <span className="text-lg">☀️</span>
              <span className="text-sm">
                {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              </span>
            </button>
            
            <div className="px-2 text-xs text-gray-500 dark:text-slate-500">{t('footer.motto')}</div>
          </div>
        )}
        
        {/* Collapsed theme toggle */}
        {collapsed && (
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-md flex items-center justify-center transition-colors text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900"
            aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            <span className="text-lg">☀️</span>
          </button>
        )}
      </aside>
      
      {/* Overlay for mobile when sidebar is open */}
      {!collapsed && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Local styles for smooth appear animation */}
      <style>{`
        @keyframes sidebarAppear { from { opacity: 0; transform: translateX(-12px) } to { opacity: 1; transform: translateX(0) } }
        .animate-sidebar-appear { animation: sidebarAppear 280ms ease-out; }
      `}</style>
    </>
  )
}

export default Sidebar