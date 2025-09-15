import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth, db, googleProvider } from '../services/firebase'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

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
  signInEmail: (email: string, password: string) => Promise<void>
  signUpEmail: (email: string, password: string, displayName: string) => Promise<void>
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>
  signOutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const demo = (import.meta as any).env?.VITE_AUTH_DEMO === 'true'

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
      const ref = doc(db, 'users', u.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setUser(snap.data() as UserProfile)
      } else {
        const profile: UserProfile = { uid: u.uid, email: u.email, displayName: u.displayName, role: 'student' }
        await setDoc(ref, profile)
        setUser(profile)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [demo])

  const signInGoogle = async () => {
    if (demo) {
      const demoUser: UserProfile = { uid: 'demo-google', email: 'demo@student.com', displayName: 'Demo Student', role: 'student' }
      setUser(demoUser)
      localStorage.setItem('demoUser', JSON.stringify(demoUser))
      return
    }
    await signInWithPopup(auth, googleProvider)
  }

  const signInEmail = async (email: string, password: string) => {
    if (demo) {
      const isTeacher = email.toLowerCase() === 'teacher@school.com' && password === 'Teacher123!'
      const isStudent = email.toLowerCase() === 'demo@student.com' && password === 'Demo123!'
      if (!isTeacher && !isStudent) throw new Error('Invalid demo credentials')
      const demoUser: UserProfile = {
        uid: isTeacher ? 'demo-teacher' : 'demo-student',
        email,
        displayName: isTeacher ? 'Demo Teacher' : 'Demo Student',
        role: isTeacher ? 'teacher' : 'student',
      }
      setUser(demoUser)
      localStorage.setItem('demoUser', JSON.stringify(demoUser))
      return
    }
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUpEmail = async (email: string, password: string, displayName: string) => {
    if (demo) {
      const demoUser: UserProfile = { uid: 'demo-'+Date.now(), email, displayName, role: 'student' }
      setUser(demoUser)
      localStorage.setItem('demoUser', JSON.stringify(demoUser))
      return
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (auth.currentUser) await updateProfile(auth.currentUser, { displayName })
    const ref = doc(db, 'users', cred.user.uid)
    const profile: UserProfile = { uid: cred.user.uid, email, displayName, role: 'student' }
    await setDoc(ref, profile)
    setUser(profile)
  }

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
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
  }

  const signOutUser = async () => {
    if (demo) {
      localStorage.removeItem('demoUser')
      setUser(null)
      return
    }
    await signOut(auth)
  }

  const value = useMemo<AuthContextType>(() => ({ user, loading, signInGoogle, signInEmail, signUpEmail, updateUserProfile, signOutUser }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}


