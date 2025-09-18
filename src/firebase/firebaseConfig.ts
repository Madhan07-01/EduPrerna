import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'

// ✅ Fixed config with correct storageBucket
const firebaseConfig = {
  apiKey: "AIzaSyDAESRjN11EuOeLlkFlGGX5DNJoqbgHZl4",
  authDomain: "eduprerna-43718.firebaseapp.com",
  projectId: "eduprerna-43718",
  storageBucket: "eduprerna-43718.appspot.com", // fixed here
  messagingSenderId: "75188580452",
  appId: "1:75188580452:web:bcefb1d76beac55e092f71",
  measurementId: "G-GD1YFQFHYB"
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

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
  apiKey: firebaseConfig.apiKey.slice(0, 6) + "...",
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
})

export default firebaseConfig