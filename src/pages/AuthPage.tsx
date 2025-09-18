import { useState } from 'react'

import { useAuth } from '../contexts/AuthContext'
import { isDemoConfig } from '../services/firebase'

export default function AuthPage() {
  const { signInGoogle, signInEmail, signUpEmail, loading } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">{mode === 'login' ? 'Sign In' : 'Create Account'}</div>
      {isDemoConfig && (
        <div className="text-xs text-slate-400">
          Demo credentials: Student demo@student.com / Demo123! • Teacher teacher@school.com / Teacher123!
        </div>
      )}
      {mode === 'signup' && (
        <input aria-label="Full name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm" />
      )}
      <input aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm" />
      <input aria-label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm" />
      {mode === 'login' ? (
        <button className="w-full rounded-md bg-sky-600 text-white px-3 py-2" disabled={loading} onClick={() => signInEmail(email, password)}>Sign In</button>
      ) : (
        <button className="w-full rounded-md bg-sky-600 text-white px-3 py-2" disabled={loading} onClick={() => signUpEmail(email, password, name)}>Create Account</button>
      )}
      <button className="w-full rounded-md bg-red-600 text-white px-3 py-2" disabled={loading} onClick={() => signInGoogle()}>Continue with Google</button>
      <button className="text-xs text-sky-400" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        {mode === 'login' ? 'New here? Create an account' : 'Have an account? Sign in'}
      </button>
    </div>
  )
}

