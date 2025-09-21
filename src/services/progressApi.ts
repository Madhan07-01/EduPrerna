import { auth } from '../firebase/firebaseConfig'

const FUNCTIONS_BASE = `${import.meta.env.VITE_SUPABASE_URL?.replace(/\/?$/, '')}/functions/v1/eduprerna-progress`

async function getIdToken(): Promise<string> {
  const user = auth.currentUser
  if (!user) throw new Error('Not authenticated')
  return await user.getIdToken()
}

export async function fetchLessonProgress(lessonId: string) {
  const token = await getIdToken()
  const url = `${FUNCTIONS_BASE}/progress?lessonId=${encodeURIComponent(lessonId)}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) throw new Error(`Progress fetch failed: ${res.status}`)
  return res.json() as Promise<{ status: 'not_started' | 'in_progress' | 'completed' | null; lastScore: number | null; lastTotal: number | null }>
}

export async function saveMcqResult(payload: { lessonId: string; subject: string; grade: number; score: number; total: number }) {
  const token = await getIdToken()
  const url = `${FUNCTIONS_BASE}/save`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Save failed: ${res.status} ${text}`)
  }
  return res.json() as Promise<{ ok: true }>
}
