import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const { signUpEmail, loading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signUpEmail(email, password, name, 'student')
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Sign up failed')
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Create account</h1>
      {error && <div className="mb-3 rounded-md bg-rose-50 p-3 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input aria-label="Full name" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        <input aria-label="Email" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input aria-label="Password" type="password" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button disabled={loading} className="w-full rounded-md bg-sky-600 px-3 py-2 text-white disabled:opacity-60">Create Account</button>
      </form>
    </div>
  )
}


