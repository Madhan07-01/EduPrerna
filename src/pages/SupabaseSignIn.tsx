import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'

export default function SupabaseSignIn() {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [handlingCallback, setHandlingCallback] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const redirect = params.get('redirect') || '/module/math-g6-number-system'

  useEffect(() => {
    // If returning from magic link, tokens may be in URL hash or an authorization code in query string
    const hash = window.location.hash
    const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash)
    const access_token = hashParams.get('access_token')
    const refresh_token = hashParams.get('refresh_token')
    const token_type = hashParams.get('token_type')

    const search = new URLSearchParams(window.location.search)
    const code = search.get('code')

    const handle = async () => {
      // Case 1: hash tokens
      if (access_token && refresh_token && token_type === 'bearer') {
        setHandlingCallback(true)
        const { error } = await supabase.auth.setSession({ access_token, refresh_token })
        setHandlingCallback(false)
        if (error) {
          setError(error.message)
          return
        }
        // slight delay to allow session propagation
        setTimeout(() => navigate(redirect, { replace: true }), 50)
        return
      }

      // Case 2: authorization code
      if (code) {
        setHandlingCallback(true)
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        setHandlingCallback(false)
        if (error) {
          setError(error.message)
          return
        }
        setTimeout(() => navigate(redirect, { replace: true }), 50)
      }
    }

    handle()

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        navigate(redirect, { replace: true })
      }
    })
    return () => sub.subscription.unsubscribe()
  }, [navigate, redirect])

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSending(true)
    try {
      const callbackUrl = `${window.location.origin}/supabase-signin?redirect=${encodeURIComponent(redirect)}`
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: callbackUrl } })
      if (error) throw error
      setSent(true)
    } catch (err: any) {
      setError(err.message || 'Failed to send magic link')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <h1 className="text-2xl font-bold mb-2">Sign in to continue</h1>
      <p className="text-sm text-gray-600 dark:text-slate-400 mb-6">We use Supabase Auth for this section. Enter your email to receive a magic link.</p>
      {handlingCallback && (
        <div className="mb-4 text-sm text-gray-700 dark:text-slate-300">Finalizing sign-in…</div>
      )}
      <form onSubmit={sendMagicLink} className="space-y-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={sending}
          className={`w-full rounded-lg px-4 py-2 text-white font-semibold ${sending ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {sending ? 'Sending…' : 'Send Magic Link'}
        </button>
      </form>
      {sent && <div className="mt-4 text-sm text-emerald-600">Check your email for the magic link.</div>}
      {error && <div className="mt-4 text-sm text-rose-600">{error}</div>}
    </div>
  )
}
