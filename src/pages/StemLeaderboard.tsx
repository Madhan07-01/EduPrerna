// src/pages/StemLeaderboard.tsx
// Shows top students by points from Supabase student_points

import { useEffect, useState } from 'react'
import { getLeaderboard } from '../services/supabaseGames'

export default function StemLeaderboard() {
  const [rows, setRows] = useState<Array<{ user_uid: string; total_points: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getLeaderboard(50)
      .then((d) => setRows(d))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading leaderboard…</div>
  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">STEM Leaderboard</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={r.user_uid} className={idx % 2 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50/50 dark:bg-slate-900/40'}>
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{r.user_uid}</td>
                <td className="px-4 py-2 font-semibold">{r.total_points}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="px-4 py-3" colSpan={3}>No points yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
