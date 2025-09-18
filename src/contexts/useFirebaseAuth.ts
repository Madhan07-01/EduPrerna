import { useCallback } from 'react'
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, type UserCredential } from 'firebase/auth'
import { auth, db } from '../firebase/firebaseConfig'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

export function useGoogleSignIn() {
  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider()
    try {
      let cred: UserCredential | undefined
      try {
        cred = await signInWithPopup(auth, provider)
      } catch (e: any) {
        if (e?.code === 'auth/popup-blocked' || e?.code === 'auth/popup-closed-by-user') {
          // Fallback to redirect when popup is blocked or closed.
          await signInWithRedirect(auth, provider)
          return
        }
        if (e?.code === 'auth/operation-not-allowed') {
          throw new Error('Google sign-in is not enabled for this Firebase project.')
        }
        if (e?.code === 'auth/account-exists-with-different-credential') {
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
    } catch (err) {
      throw err
    }
  }, [])

  return { signInWithGoogle }
}


