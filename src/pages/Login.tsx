import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

export default function Login() {
  const { signInEmail, loading } = useAuth()
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
    </div>
  )
}


