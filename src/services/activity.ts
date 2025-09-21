import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export type ActivityEvent = {
  uid: string
  type: 'download' | 'quiz_completed' | 'login' | 'streak_update' | 'badge_awarded'
  grade?: number
  chapter?: number
  subject?: string
  lesson?: number
  score?: number
  details?: Record<string, any>
  source?: 'teacherUpload' | 'studentDownload' | 'bundleDownload' | 'system'
  createdAt?: any
}

export async function logActivity(ev: ActivityEvent) {
  const date = new Date()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const dayKey = `${yyyy}-${mm}-${dd}`
  const col = collection(db, 'activity', dayKey, 'events')
  await addDoc(col, {
    ...ev,
    createdAt: serverTimestamp(),
  })
}

// Best-effort helper to read today's recent events; caller can filter by type
export async function getTodayEvents(limitCount = 50): Promise<ActivityEvent[]> {
  const date = new Date()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const dayKey = `${yyyy}-${mm}-${dd}`
  const col = collection(db, 'activity', dayKey, 'events')
  const { getDocs, query, orderBy, limit } = await import('firebase/firestore')
  const q = query(col, orderBy('createdAt', 'desc'), limit(limitCount))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as any
}
