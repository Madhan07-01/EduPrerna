import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function TeacherAuthPage() {
  const { signInEmail, loading } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async () => {
    setError(null)
    try {
      // Use email-based login with teacher role validation
      await signInEmail(username, password, 'teacher')
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Login failed'
      setError(errorMessage)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">Teacher Sign In</div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm" />
      {error && <div className="text-xs text-rose-400">{error}</div>}
      <button className="w-full rounded-md bg-sky-600 text-white px-3 py-2" disabled={loading} onClick={onSubmit}>Sign In</button>
    </div>
  )
}


