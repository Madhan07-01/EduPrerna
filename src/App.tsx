import './index.css'
import { SWUpdatePrompt } from './sw-update'
import Sidebar, { type NavKey } from './components/Sidebar'
import { useMemo } from 'react'
import { AchievementsPage, CoursesPage, DashboardPage, ProfilePage, SettingsPage } from './pages/Pages'
import TeacherDashboard from './pages/TeacherDashboard'
import { QuickQuizPage, DailyChallengePage, MiniGamesPage, DownloadGradePage } from './pages/AdditionalPages'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function AppContent() {
  const { user } = useAuth()
  const location = useLocation()
  const active: NavKey = useMemo(() => {
    const seg = location.pathname.split('/')[1] || 'dashboard'
    const known: Array<NavKey> = ['dashboard','courses','achievements','profile','teacher','quiz','challenge','games','download','settings']
    return (known.includes(seg as NavKey) ? (seg as NavKey) : 'dashboard')
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 bg-gray-50 text-slate-100 dark:text-slate-100 text-gray-900">
      <div className="flex">
        <Sidebar active={active} onNavigate={() => {}} />
        <div className="flex-1 min-h-screen">
          <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 dark:bg-slate-950/70 bg-white/70 border-b border-slate-800 dark:border-slate-800 border-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="font-semibold text-white dark:text-white text-gray-900">{active.charAt(0).toUpperCase() + active.slice(1)}</div>
              {!user && <span className="text-xs text-slate-400 dark:text-slate-400 text-gray-600">Offline-first • PWA</span>}
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/courses" element={<PrivateRoute><CoursesPage /></PrivateRoute>} />
              <Route path="/achievements" element={<PrivateRoute><AchievementsPage /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/teacher" element={<PrivateRoute>{user?.role === 'teacher' ? <TeacherDashboard /> : <div className="text-sm text-slate-400">Teacher access only.</div>}</PrivateRoute>} />
              <Route path="/quiz" element={<PrivateRoute><QuickQuizPage /></PrivateRoute>} />
              <Route path="/challenge" element={<PrivateRoute><DailyChallengePage /></PrivateRoute>} />
              <Route path="/games" element={<PrivateRoute><MiniGamesPage /></PrivateRoute>} />
              <Route path="/download" element={<PrivateRoute><DownloadGradePage /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
            </Routes>
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
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
