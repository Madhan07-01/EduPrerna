import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { supabase } from '../supabase/client'

export default function SupabaseRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [isAuthed, setIsAuthed] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let mounted = true
    const check = async () => {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      setIsAuthed(!!data.user)
      setLoading(false)
    }
    check()

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session?.user)
    })
    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-[40vh] grid place-items-center text-sm text-gray-600 dark:text-slate-300">
        Checking access…
      </div>
    )
  }

  if (!isAuthed) {
    const redirect = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/supabase-signin?redirect=${redirect}`} replace />
  }

  return <>{children}</>
}
