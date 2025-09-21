import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { isDemoConfig } from '../services/firebase'

export default function AuthPage() {
  const { signInEmail, signUpEmail, signInWithGoogle, loading } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<'student' | 'teacher'>('student')

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">{mode === 'login' ? 'Sign In' : 'Create Account'}</div>
      <div className="flex gap-2 text-xs">
        <button
          className={`px-2 py-1 rounded ${role === 'student' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-slate-800 dark:text-slate-200'}`}
          onClick={() => setRole('student')}
        >
          Student
        </button>
        <button
          className={`px-2 py-1 rounded ${role === 'teacher' ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-slate-800 dark:text-slate-200'}`}
          onClick={() => setRole('teacher')}
        >
          Teacher
        </button>
      </div>
      {isDemoConfig && (
        <div className="text-xs text-slate-400">
          Demo credentials: Student demo@student.com / Demo123! • Teacher teacher@school.com / Teacher123!
        </div>
      )}
      {mode === 'signup' && role === 'student' && (
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm" />
      )}
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={role === 'teacher' ? 'Username' : 'Email'} className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm" />
      {mode === 'login' ? (
        <button
          className="w-full rounded-md bg-sky-600 text-white px-3 py-2"
          disabled={loading}
          onClick={() => signInEmail(email, password)}
        >
          Sign In
        </button>
      ) : (
        <button className="w-full rounded-md bg-sky-600 text-white px-3 py-2" disabled={loading} onClick={() => signUpEmail(email, password, name, role)}>
          Create Account
        </button>
      )}
      {role === 'student' && (
        <button className="text-xs text-sky-400" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? 'New here? Create an account' : 'Have an account? Sign in'}
        </button>
      )}
      
      {/* Google Sign In Button */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Or continue with</span>
        </div>
      </div>
      
      <button
        onClick={() => signInWithGoogle()}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  )
}

