import { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export type FeedEvent = {
  id: string
  uid: string
  type: string
  grade?: number
  chapter?: number
  subject?: string
  lesson?: number
  score?: number
  details?: Record<string, any>
  createdAt?: { seconds: number, nanoseconds: number }
  source?: 'teacherUpload' | 'studentDownload' | 'bundleDownload' | 'system'
}

function todayKey() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export default function TeacherActivityFeed() {
  const [items, setItems] = useState<FeedEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<'all'|'upload'|'download'|'quiz_completed'|'badge_awarded'|'login'|'streak_update'>('all')
  const [sourceFilter, setSourceFilter] = useState<'all'|'teacherUpload'|'studentDownload'|'bundleDownload'|'system'>('all')

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        const key = todayKey()
        // Use flattened path: activity/{yyyy-mm-dd}/events
        const col = collection(db, 'activity', key, 'events')
        const q = query(col, orderBy('createdAt', 'desc'), limit(50))
        const snap = await getDocs(q)
        const list: FeedEvent[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
        setItems(list)
      } catch (e: any) {
        console.error('activity feed error', e)
        setError(e?.message || 'Failed to load activity feed')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const filtered = items.filter((ev) => {
    const okType = typeFilter === 'all' || ev.type === typeFilter
    const okSource = sourceFilter === 'all' || ev.source === sourceFilter
    return okType && okSource
  })

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
      </div>
    )
  }
  if (error) {
    return <div className="p-4 text-sm text-amber-700 bg-amber-50 rounded">{error}</div>
  }

  if (items.length === 0) {
    return <div className="p-4 text-sm text-gray-500">No activity logged today.</div>
  }

  return (
    <div className="space-y-2 max-h-[420px] overflow-auto">
      <div className="flex items-center gap-2 sticky top-0 bg-white/80 dark:bg-slate-900/60 p-2 rounded border border-gray-200 dark:border-slate-700">
        <label className="text-xs">Type</label>
        <select className="text-xs border rounded px-1 py-0.5" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as any)}>
          <option value="all">All</option>
          <option value="upload">Uploads</option>
          <option value="download">Downloads</option>
          <option value="quiz_completed">Quizzes</option>
          <option value="badge_awarded">Badges</option>
          <option value="login">Logins</option>
          <option value="streak_update">Streak</option>
        </select>
        <label className="text-xs ml-2">Source</label>
        <select className="text-xs border rounded px-1 py-0.5" value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value as any)}>
          <option value="all">All</option>
          <option value="teacherUpload">Teacher uploads</option>
          <option value="studentDownload">Student downloads</option>
          <option value="bundleDownload">Bundle downloads</option>
          <option value="system">System</option>
        </select>
      </div>
      {filtered.map((ev) => (
        <div key={ev.id} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {renderTitle(ev)}
            </div>
            <div className="text-xs text-gray-500 dark:text-slate-400">
              UID: {ev.uid} • {renderMeta(ev)}
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-slate-400">
            {renderTime(ev.createdAt)}
          </div>
        </div>
      ))}
    </div>
  )
}

function renderTitle(ev: FeedEvent) {
  switch (ev.type) {
    case 'upload':
      return `Uploaded Chapter ${ev.chapter} (Grade ${ev.grade})`
    case 'download':
      return `Downloaded Chapter ${ev.chapter} (Grade ${ev.grade})`
    case 'quiz_completed':
      return `Quiz Completed (Grade ${ev.grade} Lesson ${ev.lesson})`
    case 'login':
      return 'Student login'
    case 'streak_update':
      return 'Streak updated'
    case 'badge_awarded':
      return 'Badge awarded'
    default:
      return ev.type
  }
}

function renderMeta(ev: FeedEvent) {
  const parts: string[] = []
  if (ev.details?.kind) parts.push(`Type: ${ev.details.kind}`)
  if (typeof ev.score === 'number') parts.push(`Score: ${ev.score}`)
  return parts.join(' • ')
}

function renderTime(ts?: { seconds: number, nanoseconds: number }) {
  if (!ts) return ''
  const date = new Date(ts.seconds * 1000)
  return date.toLocaleTimeString()
}
