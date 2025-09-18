import type React from 'react'
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/firebaseConfig'
import { signIn as fbSignIn, signOutUser as fbSignOut, signUp as fbSignUp } from '../firebase/auth'
import { useGoogleSignIn } from './useFirebaseAuth'

export type UserProfile = {
  uid: string
  email: string | null
  displayName: string | null
  username?: string
  dob?: string
  class?: string
  grade?: number
  role?: 'student' | 'teacher'
}

type AuthContextType = {
  user: UserProfile | null
  loading: boolean
  signInGoogle: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInEmail: (email: string, password: string) => Promise<void>
  signUpEmail: (email: string, password: string, displayName: string) => Promise<void>
  // Aliases for convenience in UI pages
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>
  signOutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const demo = false

  useEffect(() => {
    if (demo) {
      const saved = localStorage.getItem('demoUser')
      if (saved) setUser(JSON.parse(saved))
      setLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null)
        setLoading(false)
        return
      }
      try {
        const ref = doc(db, 'users', u.uid)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setUser(snap.data() as UserProfile)
        } else {
          const profile: UserProfile = { uid: u.uid, email: u.email, displayName: u.displayName, role: 'student' }
          await setDoc(ref, profile)
          setUser(profile)
        }
      } catch (err: unknown) {
        const maybe = err as { code?: string; message?: string }
        if (maybe?.code === 'unavailable' || maybe?.message?.includes('offline')) {
          console.warn('Firestore unavailable/offline. Using auth user as fallback; profile will sync later.')
          // Fallback: allow the app to proceed with minimal auth user info.
          setUser({ uid: u.uid, email: u.email, displayName: u.displayName ?? null, role: 'student' })
        } else {
          console.error('Failed to fetch user profile:', err)
        }
      } finally {
        setLoading(false)
      }
    })
    return () => unsub()
  }, [demo])

  const { signInWithGoogle } = useGoogleSignIn()
  const signInGoogle = useCallback(async () => {
    await signInWithGoogle()
  }, [signInWithGoogle])

  const signInEmail = useCallback(async (email: string, password: string) => {
    await fbSignIn(email, password)
  }, [])

  const signUpEmail = useCallback(async (email: string, password: string, displayName: string) => {
    const u = await fbSignUp(email, password, displayName)
    const ref = doc(db, 'users', u.uid)
    const profile: UserProfile = { uid: u.uid, email: u.email, displayName: u.displayName, role: 'student' }
    await setDoc(ref, profile, { merge: true })
    setUser(profile)
  }, [])

  const updateUserProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!user) return
    const newProfile = { ...user, ...updates }
    setUser(newProfile)
    if (demo) {
      localStorage.setItem('demoUser', JSON.stringify(newProfile))
      return
    }
    const ref = doc(db, 'users', user.uid)
    await setDoc(ref, newProfile, { merge: true })
    if (updates.displayName && auth.currentUser) await updateProfile(auth.currentUser, { displayName: updates.displayName })
  }, [demo, user])

  const signOutUser = useCallback(async () => {
    await fbSignOut()
  }, [])

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      signInGoogle,
      signInWithGoogle,
      signInEmail,
      signUpEmail,
      signIn: signInEmail,
      signUp: signUpEmail,
      updateUserProfile,
      signOutUser,
    }),
    [user, loading, signInGoogle, signInWithGoogle, signInEmail, signUpEmail, updateUserProfile, signOutUser]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}


