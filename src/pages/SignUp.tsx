import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'

export default function SignUp() {
  const { signUpEmail, signInWithGoogle, loading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long'
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number'
    }
    return null
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Validate password
      const passwordError = validatePassword(password)
      if (passwordError) {
        setError(passwordError)
        return
      }
      
      await signUpEmail(email, password, name, 'student')
      navigate('/dashboard')
    } catch (err: unknown) {
      setError((err as Error)?.message || 'Sign up failed')
    }
  }

  const onGoogleSignIn = async () => {
    try {
      setError('')
      await signInWithGoogle('student')
      navigate('/dashboard')
    } catch (err: unknown) {
      setError((err as Error)?.message || 'Google sign-in failed')
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Create Student Account</h1>
      {error && <div className="mb-3 rounded-md bg-rose-50 p-3 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input 
            id="name"
            aria-label="Full name" 
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your full name" 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input 
            id="email"
            type="email"
            aria-label="Email" 
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input 
            id="password"
            aria-label="Password" 
            type="password" 
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Create a password" 
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Password must be at least 6 characters and include uppercase, lowercase, and number
          </p>
        </div>
        <button 
          disabled={loading} 
          className="w-full rounded-md bg-gradient-to-r from-sky-600 to-indigo-600 px-3 py-2 text-white font-medium shadow-md hover:from-sky-700 hover:to-indigo-700 disabled:opacity-60 transition-all duration-200"
        >
          Create Student Account
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <Link to="/login" className="text-sm text-sky-600 hover:underline dark:text-sky-400">
          Already have an account? Sign in
        </Link>
      </div>
      
      {/* Google Sign In Button */}
      <div className="mt-6">
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
          className="mt-3 w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 shadow-sm transition-all duration-200"
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
          Sign up with Google
        </button>
      </div>
    </div>
  )
}