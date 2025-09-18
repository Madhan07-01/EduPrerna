import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Replace with your Firebase project config or set via environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE || 'demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER || '0',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:0:web:demo',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
type ViteEnv = { VITE_AUTH_DEMO?: string }
export const isDemoConfig = ((import.meta as unknown as { env?: ViteEnv }).env?.VITE_AUTH_DEMO === 'true') || firebaseConfig.apiKey === 'demo-api-key'

