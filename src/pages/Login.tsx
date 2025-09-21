import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

// Motivational quotes for students
const MOTIVATIONAL_QUOTES = [
  "Learning is a treasure that follows its owner everywhere.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
  "The more you learn, the more you earn.",
  "Learning never exhausts the mind.",
  "An investment in knowledge pays the best interest.",
  "The expert in anything was once a beginner.",
  "Today is the perfect day to learn something new."
]

export default function Login() {
  const { signInEmail, signInWithGoogle, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [shakeCard, setShakeCard] = useState(false)
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const navigate = useNavigate()

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prev => (prev + 1) % MOTIVATIONAL_QUOTES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Trigger shake animation on error
  useEffect(() => {
    if (error) {
      setShakeCard(true)
      const timer = setTimeout(() => setShakeCard(false), 500)
      return () => clearTimeout(timer)
    }
  }, [error])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setMessage('')
      // Pass 'student' as expectedRole to ensure only students can log in
      await signInEmail(email, password, 'student')
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
      // Pass 'student' as expectedRole to ensure only students can log in
      await signInWithGoogle('student')
      navigate('/dashboard')
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || 'Google sign-in failed. Please check browser console for details.'
      setError(msg)
      console.error('Google Sign-In Error:', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-4">
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-10 w-16 h-16 rounded-lg bg-blue-200 dark:bg-blue-900 opacity-30 animate-float"></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 rounded-full bg-purple-200 dark:bg-purple-900 opacity-30 animate-float-delay"></div>
        <div className="absolute bottom-1/4 left-1/4 w-8 h-8 rounded-lg bg-indigo-200 dark:bg-indigo-900 opacity-30 animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-10 h-10 rounded-full bg-blue-300 dark:bg-blue-800 opacity-30 animate-float-fast"></div>
        
        {/* Educational icons */}
        <div className="absolute top-20 left-1/3 w-8 h-10 bg-gradient-to-r from-amber-500 to-amber-700 rounded-sm animate-float-slow rotate-12"></div>
        <div className="absolute bottom-20 right-1/4 w-12 h-1 bg-gradient-to-r from-gray-700 to-black rounded-full animate-float"></div>
        <div className="absolute top-1/3 left-20 w-6 h-6 border-2 border-blue-500 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-20 w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Motivational quote section */}
        <div className="mb-6 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium py-2 px-4 rounded-full mb-3">
            💡 {MOTIVATIONAL_QUOTES[currentQuoteIndex]}
          </div>
        </div>
        
        {/* Header with student identity */}
        <div className="text-center mb-6">
          <div className="mx-auto bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Login</h1>
          <p className="text-lg text-blue-600 dark:text-blue-400 mt-1">Your learning journey starts here</p>
        </div>
        
        {/* Login Card with interactive features */}
        <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-8 transition-all duration-300 hover:shadow-2xl relative overflow-hidden ${shakeCard ? 'animate-shake' : ''}`}>
          {/* Gradient glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl -z-10"></div>
          
          {error && <div className="mb-4 rounded-lg bg-rose-50 dark:bg-rose-900/20 p-3 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50">{error}</div>}
          {message && <div className="mb-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-3 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">{message}</div>}
          
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input 
                  id="email"
                  aria-label="Email" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-md" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="your.email@student.edu" 
                  type="email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input 
                  id="password"
                  aria-label="Password" 
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-md" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-slate-300">
                  Remember me
                </label>
              </div>
              <button 
                type="button"
                onClick={onReset}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>
            
            <button 
              disabled={loading} 
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600 hover:shadow-xl disabled:opacity-60 transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-600 dark:text-slate-400">
              New here? <Link className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors duration-200" to="/signup">Create account</Link>
            </div>
            <div className="text-sm text-gray-600 dark:text-slate-400 mt-2">
              <Link className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors duration-200" to="/">
                ← Back to role selection
              </Link>
            </div>
          </div>
          
          {/* Google Sign In Button */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-slate-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400">Or continue with</span>
              </div>
            </div>
            
            <button
              onClick={onGoogleSignIn}
              disabled={loading}
              className="mt-4 w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 shadow-sm transition-all duration-300 hover:shadow-md transform hover:scale-[1.01]"
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
      </div>
      
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  )
}