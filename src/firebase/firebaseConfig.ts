import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator, type Firestore, initializeFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

// Use environment variables for Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase with Firestore settings to avoid internal assertion errors
const app: FirebaseApp = initializeApp(firebaseConfig)
const db: Firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  cacheSizeBytes: 1048576, // 1MB cache size
  ignoreUndefinedProperties: true
})

export { app, db }
export const auth: Auth = getAuth(app)
export const storage: FirebaseStorage = getStorage(app)

export let analytics: Analytics | undefined
if (typeof window !== 'undefined') {
  // Analytics is only available in supported environments (browsers) and when measurementId exists
  isSupported().then((supported) => {
    if (supported && firebaseConfig.measurementId) {
      try {
        analytics = getAnalytics(app)
      } catch {
        // no-op
      }
    }
  })
}

// Log config once at startup (hide sensitive parts)
console.log("Firebase config check", {
  apiKey: firebaseConfig.apiKey?.slice(0, 6) + "...",
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
})

export default firebaseConfig