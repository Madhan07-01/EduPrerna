import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

export default function Login() {
  const { signInEmail, signInWithGoogle, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setMessage('')
      await signInEmail(email, password)
      navigate('/dashboard')
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || 'Login failed'
      setError(msg)
    }
  }

  const onReset = async () => {
    try {
      setError('')
      setMessage('')
      if (!email) {
        setError('Enter your email to reset your password')
        return
      }
      await sendPasswordResetEmail(auth, email)
      setMessage('Password reset email sent. Check your inbox.')
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || 'Failed to send reset email'
      setError(msg)
    }
  }

  const onGoogleSignIn = async () => {
    try {
      setError('')
      setMessage('')
      await signInWithGoogle()
      navigate('/dashboard')
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || 'Google sign-in failed'
      setError(msg)
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Login</h1>
      {error && <div className="mb-3 rounded-md bg-rose-50 p-3 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">{error}</div>}
      {message && <div className="mb-3 rounded-md bg-emerald-50 p-3 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">{message}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input aria-label="Email" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input aria-label="Password" type="password" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button disabled={loading} className="w-full rounded-md bg-sky-600 px-3 py-2 text-white disabled:opacity-60">Sign In</button>
      </form>
      <div className="mt-3 grid gap-2">
        <button onClick={onReset} className="text-sm text-sky-500 hover:underline w-fit">Forgot password?</button>
        <div className="text-sm text-gray-600 dark:text-slate-400">
          New here? <Link className="text-sky-500 hover:underline" to="/signup">Create account</Link>
        </div>
      </div>
      
      {/* Google Sign In Button */}
      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Or continue with</span>
          </div>
        </div>
        
        <button
          onClick={onGoogleSignIn}
          disabled={loading}
          className="mt-3 w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
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
    </div>
  )
}


