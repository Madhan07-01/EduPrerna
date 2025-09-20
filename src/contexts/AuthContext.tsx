import type React from 'react'
import { createContext, useEffect, useState, useCallback } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  updateProfile, 
  signOut, 
  GoogleAuthProvider,
  signInWithPopup,
  type User as FirebaseUser 
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase/firebaseConfig'

type AuthContextType = {
  currentUser: FirebaseUser | null
  profile: { name?: string | null; email?: string | null; role?: string; uid?: string } | null
  loading: boolean
  signUpEmail: (email: string, password: string, name?: string, role?: string) => Promise<FirebaseUser>
  signInEmail: (email: string, password: string, expectedRole?: string) => Promise<unknown>
  signInWithGoogle: (expectedRole?: string) => Promise<void>
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

  const signInEmail = useCallback(async (email: string, password: string, expectedRole?: string) => {
    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const user = result.user
      
      // If role validation is required
      if (expectedRole) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          if (userData.role !== expectedRole) {
            await signOut(auth)
            throw new Error(`This account is not authorized to log in as a ${expectedRole === 'teacher' ? 'Teacher' : 'Student'}`)
          }
        }
      }
      
      return result
    } finally {
      setLoading(false)
    }
  }, [])

  const signInWithGoogle = useCallback(async (expectedRole?: string) => {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check if user document exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        const role = expectedRole || 'student'
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: user.displayName ?? null,
          email: user.email,
          role: role, // Use expected role or default to student
          createdAt: serverTimestamp(),
        })
      } else if (expectedRole) {
        // If role validation is required for existing user
        const userData = userDoc.data()
        if (userData.role !== expectedRole) {
          await signOut(auth)
          throw new Error(`This account is not authorized to log in as a ${expectedRole === 'teacher' ? 'Teacher' : 'Student'}`)
        }
      }

      console.log('User signed in with Google:', user)
    } catch (error) {
      console.error('Error during Google sign-in:', error)
      throw error
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
    signInWithGoogle,
    signOutUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Export the context for useAuth hook
export { AuthContext }


