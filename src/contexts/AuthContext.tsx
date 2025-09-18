import type React from 'react'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  updateProfile, 
  signOut, 
  type User as FirebaseUser 
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase/firebaseConfig'

type AuthContextType = {
  currentUser: FirebaseUser | null
  profile: { name?: string | null; email?: string | null; role?: string; uid?: string } | null
  loading: boolean
  signUpEmail: (email: string, password: string, name?: string, role?: string) => Promise<FirebaseUser>
  signInEmail: (email: string, password: string) => Promise<any>
  signOutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null)
  const [profile, setProfile] = useState<{ name?: string | null; email?: string | null; role?: string; uid?: string } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setCurrentUser(u)
        try {
          const snap = await getDoc(doc(db, 'users', u.uid))
          if (snap.exists()) {
            setProfile(snap.data())
          } else {
            setProfile({ name: u.displayName ?? null, email: u.email })
          }
        } catch (err) {
          console.warn('Failed to fetch user doc', err)
          setProfile({ name: u.displayName ?? null, email: u.email })
        }
      } else {
        setCurrentUser(null)
        setProfile(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const signUpEmail = useCallback(
    async (email: string, password: string, name?: string, role: string = 'student') => {
      setLoading(true)
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const u = userCredential.user

        if (name) {
          await updateProfile(u, { displayName: name })
        }

        await setDoc(doc(db, 'users', u.uid), {
          uid: u.uid,
          name: name ?? null,
          email,
          role,
          createdAt: serverTimestamp(),
        })

        setCurrentUser(u)
        setProfile({ name: name ?? null, email, role })
        return u
      } catch (err) {
        console.error('signUpEmail error', err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const signInEmail = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      return await signInWithEmailAndPassword(auth, email, password)
    } finally {
      setLoading(false)
    }
  }, [])

  const signOutUser = useCallback(async () => {
    await signOut(auth)
  }, [])

  const value = {
    currentUser,
    profile,
    loading,
    signUpEmail,
    signInEmail,
    signOutUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)


