import { useCallback } from 'react'
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, type UserCredential } from 'firebase/auth'
import { auth, db } from '../firebase/firebaseConfig'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

export function useGoogleSignIn() {
  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider()
    let cred: UserCredential | undefined
    try {
      cred = await signInWithPopup(auth, provider)
    } catch (e: unknown) {
      const error = e as { code?: string; message?: string }
      if (error?.code === 'auth/popup-blocked' || error?.code === 'auth/popup-closed-by-user') {
        // Fallback to redirect when popup is blocked or closed.
        await signInWithRedirect(auth, provider)
        return
      }
      if (error?.code === 'auth/operation-not-allowed') {
        throw new Error('Google sign-in is not enabled for this Firebase project.')
      }
      if (error?.code === 'auth/account-exists-with-different-credential') {
        throw new Error('An account already exists with a different credential for this email.')
      }
      throw e
    }

    if (!cred) return
    const { user } = cred
    // Ensure a Firestore document exists for this user
    const ref = doc(db, 'users', user.uid)
    await setDoc(ref, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      provider: 'google',
      createdAt: serverTimestamp(),
    }, { merge: true })
  }, [])

  return { signInWithGoogle }
}


