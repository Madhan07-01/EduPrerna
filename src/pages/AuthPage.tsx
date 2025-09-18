import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { isDemoConfig } from '../services/firebase'

export default function AuthPage() {
  const { signInGoogle, signInEmail, signUpEmail, signInTeacherUsername, loading } = useAuth()
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
          className={`px-2 py-1 rounded ${role === 'student' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-200 dark:bg-slate-800 dark:text-slate-200 bg-gray-200 text-gray-800'}`}
          onClick={() => setRole('student')}
        >
          Student
        </button>
        <button
          className={`px-2 py-1 rounded ${role === 'teacher' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-200 dark:bg-slate-800 dark:text-slate-200 bg-gray-200 text-gray-800'}`}
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
          onClick={() => (role === 'teacher' ? signInTeacherUsername(email, password) : signInEmail(email, password))}
        >
          Sign In
        </button>
      ) : (
        <button className="w-full rounded-md bg-sky-600 text-white px-3 py-2" disabled={loading} onClick={() => signUpEmail(email, password, name)}>
          Create Account
        </button>
      )}
      {role === 'student' && (
        <button className="w-full rounded-md bg-red-600 text-white px-3 py-2" disabled={loading} onClick={() => signInGoogle()}>Continue with Google</button>
      )}
      {role === 'student' && (
        <button className="text-xs text-sky-400" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? 'New here? Create an account' : 'Have an account? Sign in'}
        </button>
      )}
    </div>
  )
}

