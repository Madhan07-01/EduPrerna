import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, type User } from 'firebase/auth'
import { auth, db } from './firebaseConfig'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export type PublicUser = {
  uid: string
  email: string | null
  displayName?: string | null
  createdAt?: unknown
}

export async function signUp(email: string, password: string, displayName?: string): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  if (displayName) {
    await updateProfile(cred.user, { displayName })
  }
  const ref = doc(db, 'users', cred.user.uid)
  const profile: PublicUser = {
    uid: cred.user.uid,
    email: cred.user.email,
    displayName: cred.user.displayName ?? displayName ?? null,
    createdAt: serverTimestamp(),
  }
  await setDoc(ref, profile, { merge: true })
  return cred.user
}

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function signOutUser() {
  return signOut(auth)
}

export { onAuthStateChanged }


