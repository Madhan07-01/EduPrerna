import './index.css'
import { SWUpdatePrompt } from './sw-update'
import Sidebar, { type NavKey } from './components/Sidebar'
import { useState } from 'react'
import { AchievementsPage, CoursesPage, DashboardPage, ProfilePage, SettingsPage } from './pages/Pages'
import TeacherDashboard from './pages/TeacherDashboard'
import { QuickQuizPage, DailyChallengePage, MiniGamesPage, DownloadGradePage } from './pages/AdditionalPages'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import AuthPage from './pages/AuthPage'

function AppContent() {
  const [active, setActive] = useState<NavKey>('dashboard')
  const { user, signOutUser } = useAuth()

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 bg-gray-50 text-slate-100 dark:text-slate-100 text-gray-900">
      <div className="flex">
        <Sidebar active={active} onNavigate={setActive} />
        <div className="flex-1 min-h-screen">
          <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 dark:bg-slate-950/70 bg-white/70 border-b border-slate-800 dark:border-slate-800 border-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="font-semibold text-white dark:text-white text-gray-900">{active.charAt(0).toUpperCase() + active.slice(1)}</div>
              <div className="flex items-center gap-3">
                {user && <div className="text-xs text-slate-300 dark:text-slate-300 text-gray-700">{user.displayName || user.email}</div>}
                {user && <button className="text-xs underline" onClick={() => signOutUser()}>Sign Out</button>}
                {!user && <span className="text-xs text-slate-400 dark:text-slate-400 text-gray-600">Offline-first • PWA</span>}
              </div>
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-4 py-6">
            {!user ? (
              <AuthPage />
            ) : (
            <>
            {active === 'dashboard' && user.role !== 'teacher' && <DashboardPage />}
            {active === 'dashboard' && user.role === 'teacher' && <TeacherDashboard />}
            {active === 'courses' && <CoursesPage />}
            {active === 'achievements' && <AchievementsPage />}
            {active === 'profile' && <ProfilePage />}
            {active === 'teacher' && user.role === 'teacher' && <TeacherDashboard />}
            {active === 'teacher' && user.role !== 'teacher' && <div className="text-sm text-slate-400">Teacher access only.</div>}
            {active === 'quiz' && <QuickQuizPage />}
            {active === 'challenge' && <DailyChallengePage />}
            {active === 'games' && <MiniGamesPage />}
            {active === 'download' && <DownloadGradePage />}
            {active === 'settings' && <SettingsPage />}
            </>
            )}
          </main>
        </div>
      </div>
      <SWUpdatePrompt />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
