// src/pages/DailyChallengeSelector.tsx
// Lets user pick Grade (6–12) and STEM Subject, then navigates to /stem/:subject/:grade
// Styling uses the same Tailwind scheme as the rest of the app.

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GRADES = [6, 7, 8, 9, 10, 11, 12] as const
const SUBJECTS = ['Mathematics', 'Science', 'Technology', 'Engineering'] as const

type Subject = typeof SUBJECTS[number]

export default function DailyChallengeSelector() {
  const navigate = useNavigate()
  const [grade, setGrade] = useState<number>(6)
  const [subject, setSubject] = useState<Subject>('Mathematics')

  const canPlay = useMemo(() => !!grade && !!subject, [grade, subject])

  const playNow = () => {
    if (!canPlay) return
    navigate(`/stem/${subject}/${grade}`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Daily STEM Challenge</h1>
        <div className="text-sm text-gray-500 dark:text-slate-400">Pick your grade and subject to play today\'s game.</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Grades */}
        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="font-medium mb-3">Grade</div>
          <div className="flex flex-wrap gap-2">
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                  grade === g
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-900'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="font-medium mb-3">STEM Subject</div>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                  subject === s
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center">
          <button
            onClick={playNow}
            disabled={!canPlay}
            className={`px-5 py-3 rounded-xl text-white text-sm font-medium shadow transition-all ${
              canPlay
                ? 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            🎮 Play Daily Challenge
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-slate-500">
        Note: Grades 11–12 may not have a scheduled challenge yet; if none is found, the game tries the first active challenge.
      </div>
    </div>
  )
}
