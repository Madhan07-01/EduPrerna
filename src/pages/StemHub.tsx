// src/pages/StemHub.tsx
// STEM Hub: pick subject (STEM umbrellas) and grade (6–10), preview today's challenge, and launch.
// Firebase auth remains the ONLY auth provider; Supabase stores game data.

import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchDailyChallenge, type Subject, type Challenge } from '../services/supabaseGames'

const STEM_SUBJECTS: Subject[] = ['Mathematics', 'Science', 'Technology', 'Engineering']
const GRADES: number[] = [6, 7, 8, 9, 10]

export default function StemHub() {
  const navigate = useNavigate()
  const [subject, setSubject] = useState<Subject>('Mathematics')
  const [grade, setGrade] = useState<number>(6)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchDailyChallenge(grade, subject)
      .then((c) => setChallenge(c))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [subject, grade])

  const info = useMemo(() => {
    if (loading) return { title: 'Loading…', desc: '' }
    if (error) return { title: 'Error', desc: error }
    if (!challenge) return { title: 'No challenge scheduled', desc: 'Use seed/rotation SQL to create today\'s schedule.' }
    return { title: challenge.title, desc: `Game type: ${challenge.game_type}` }
  }, [challenge, loading, error])

  const play = () => navigate(`/stem/${subject}/${grade}`)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">STEM Challenges Hub</h1>
      <p className="text-sm text-gray-600 dark:text-slate-400">Pick a STEM subject and grade to play today\'s challenge. Data is stored in Supabase; authentication via Firebase remains unchanged.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="font-medium mb-2">Subject</div>
          <div className="flex flex-wrap gap-2">
            {STEM_SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`px-3 py-2 rounded-lg text-sm border ${
                  subject === s
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 border-gray-300 dark:border-slate-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="font-medium mb-2">Grade</div>
          <div className="flex flex-wrap gap-2">
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`px-3 py-2 rounded-lg text-sm border ${
                  grade === g
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 border-gray-300 dark:border-slate-600'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="font-medium mb-1">Today\'s Challenge</div>
            <div className="text-sm text-gray-800 dark:text-slate-200">{info.title}</div>
            {info.desc && <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">{info.desc}</div>}
          </div>
          <div className="mt-3">
            <button
              onClick={play}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
            >
              🎮 Play Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
