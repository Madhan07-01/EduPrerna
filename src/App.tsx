import './index.css'
import { SWUpdatePrompt } from './sw-update'
import Sidebar, { type NavKey } from './components/Sidebar'
import TeacherSidebar from './components/TeacherSidebar'
import { useMemo, useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import CoursesPage from './pages/CoursesPage'
import AchievementsPage from './pages/AchievementsPage'
import ProfilePage from './pages/ProfilePage'
import TeacherPage from './pages/TeacherPage'
import LessonsPage from './pages/LessonsPage'
import LessonDetailPage from './pages/LessonDetailPage'
import QuizPage from './pages/QuizPage'
import SettingsPage from './pages/SettingsPage'
import ModulePage from './pages/ModulePage'
import MCQPage from './pages/MCQPage'
import MaterialsPage from './pages/MaterialsPage'
import { QuickQuizPage, DailyChallengePage, DownloadGradePage } from './pages/AdditionalPages'
import MiniGamesRoutes from './pages/mini-games'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import { BadgeProvider } from './contexts/BadgeContext'
import { ToastProvider } from './components/ToastProvider'
import { useAuth } from './hooks/useAuth'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import RoleSelector from './pages/RoleSelector'
import TeacherLogin from './pages/TeacherLogin'
import TeacherSignUp from './pages/TeacherSignUp'
import OneNightStudyLanding from './pages/OneNightStudy'

function AppContent() {
  const { currentUser } = useAuth()
  const location = useLocation()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  
  const active: NavKey = useMemo(() => {
    
    const pathname = location.pathname
    if (pathname.startsWith('/courses') || pathname.startsWith('/lessons') || pathname.startsWith('/lesson/')) {
      return 'courses'
    }
    if (pathname.startsWith('/module/') || pathname.startsWith('/mcq/') || pathname.startsWith('/materials/')) {
      return 'courses'
    }
    if (pathname.startsWith('/eduprerna/one-night-study') || pathname.startsWith('/onestudy')) {
      return 'one-night-study'
    }
    const seg = pathname.split('/')[1] || 'dashboard'
    const known: Array<NavKey> = ['dashboard','courses','achievements','profile','teacher','quiz','challenge','download','settings','mini-games','one-night-study']
    return (known.includes(seg as NavKey) ? (seg as NavKey) : 'dashboard')
  }, [location.pathname])

  const isTeacherPage = location.pathname.startsWith('/teacher') || location.pathname.startsWith('/admin')
  const showStudentSidebar = currentUser && !isTeacherPage
  const showTeacherSidebar = currentUser && isTeacherPage

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100">
      <div className="flex">
        {showStudentSidebar && <Sidebar active={active} onNavigate={() => {}} isCollapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />}
        {showTeacherSidebar && <TeacherSidebar />}
        <div className="flex-1 min-h-screen">
          <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 dark:bg-slate-950/70 bg-white/70 border-b border-gray-200 dark:border-slate-800">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="font-semibold text-gray-900 dark:text-white">{active.charAt(0).toUpperCase() + active.slice(1)}</div>
              {!currentUser && <span className="text-xs text-gray-600 dark:text-slate-400">Offline-first • PWA</span>}
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/teacher-login" element={<TeacherLogin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/teacher-signup" element={<TeacherSignUp />} />
              <Route path="/" element={<RoleSelector />} />
              <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/courses" element={<PrivateRoute><CoursesPage /></PrivateRoute>} />
              <Route path="/achievements" element={<PrivateRoute><AchievementsPage /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/teacher" element={<PrivateRoute><TeacherPage /></PrivateRoute>} />
              <Route path="/teacher/*" element={<PrivateRoute><TeacherPage /></PrivateRoute>} />
              <Route path="/admin/*" element={<PrivateRoute><TeacherPage /></PrivateRoute>} />
              <Route path="/lessons/:subject/:grade" element={<PrivateRoute><LessonsPage /></PrivateRoute>} />
              <Route path="/lesson/:subject/:grade/:lesson" element={<PrivateRoute><LessonDetailPage /></PrivateRoute>} />
              <Route path="/quiz/:subject/:grade/:lesson" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
              <Route path="/module/:lessonId" element={<PrivateRoute><ModulePage /></PrivateRoute>} />
              <Route path="/mcq/:lessonId" element={<PrivateRoute><MCQPage /></PrivateRoute>} />
              <Route path="/materials/:lessonId" element={<PrivateRoute><MaterialsPage /></PrivateRoute>} />
              <Route path="/quiz" element={<PrivateRoute><QuickQuizPage /></PrivateRoute>} />
              <Route path="/challenge" element={<PrivateRoute><DailyChallengePage /></PrivateRoute>} />
              <Route path="/mini-games/*" element={<PrivateRoute><MiniGamesRoutes /></PrivateRoute>} />
              <Route path="/download" element={<PrivateRoute><DownloadGradePage /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
              <Route path="/eduprerna/one-night-study/*" element={<PrivateRoute><OneNightStudyLanding /></PrivateRoute>} />
              <Route path="/onestudy/*" element={<PrivateRoute><OneNightStudyLanding /></PrivateRoute>} />
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
          <BadgeProvider>
            <ToastProvider>
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </ToastProvider>
          </BadgeProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App