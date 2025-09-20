// src/pages/MyProgress.tsx
// Shows current user's points and recent attempts from Supabase

import { useEffect, useState } from 'react'
import { getMyPoints, getMyRecentAttempts } from '../services/supabaseGames'

export default function MyProgress() {
  const [points, setPoints] = useState<number>(0)
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    Promise.all([getMyPoints(), getMyRecentAttempts(25)])
      .then(([p, r]) => {
        if (!mounted) return
        setPoints(p)
        setRows(r)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div>Loading my progress…</div>
  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My STEM Progress</h1>

      <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
        <div className="text-sm text-gray-500 dark:text-slate-400">Total Points</div>
        <div className="text-3xl font-bold text-emerald-600">{points}</div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Recent Attempts</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-2 text-left">When</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Game</th>
                <th className="px-4 py-2 text-left">Grade</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Score</th>
                <th className="px-4 py-2 text-left">Completed</th>
                <th className="px-4 py-2 text-left">Time (s)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="odd:bg-white even:bg-gray-50/50 dark:odd:bg-slate-800 dark:even:bg-slate-900/40">
                  <td className="px-4 py-2">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="px-4 py-2">{r.challenge?.title ?? r.challenge_id}</td>
                  <td className="px-4 py-2">{r.challenge?.game_type ?? ''}</td>
                  <td className="px-4 py-2">{r.grade}</td>
                  <td className="px-4 py-2">{r.subject}</td>
                  <td className="px-4 py-2">{r.score}</td>
                  <td className="px-4 py-2">{r.completed ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2">{r.time_taken_seconds}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td className="px-4 py-3" colSpan={8}>No attempts yet. Play a challenge to see it here.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
