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
    <div className="space-y-10">
      {/* Hero header with decorative gradient and SVG orbs */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-slate-800 bg-gradient-to-br from-indigo-600/10 via-fuchsia-500/10 to-emerald-500/10 p-6 md:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Daily STEM Challenge</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">Pick your grade and subject to play today\'s interactive game.</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-slate-900/60 backdrop-blur px-3 py-1 text-xs text-gray-700 dark:text-slate-300 ring-1 ring-inset ring-gray-300/60 dark:ring-slate-700">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              New challenges unlock daily at 7 AM
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge text="PWA" />
            <Badge text="Offline-first" />
            <Badge text="STEM" />
          </div>
        </div>
        {/* Decorative SVG blobs */}
        <DecorativeOrbs />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Grades panel */}
        <div className="xl:col-span-1 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">Grade</div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-600/10 text-indigo-700 dark:text-indigo-300 ring-1 ring-inset ring-indigo-600/20">Select one</span>
          </div>
          <div role="radiogroup" aria-label="Select grade" className="grid grid-cols-7 gap-2">
            {GRADES.map((g) => {
              const active = grade === g
              return (
                <button
                  key={g}
                  role="radio"
                  aria-checked={active}
                  onClick={() => setGrade(g)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setGrade(g);
                    }
                  }}
                  className={`group relative isolate select-none px-0 py-0 rounded-xl overflow-hidden ring-1 ring-inset transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 ${
                    active
                      ? 'bg-indigo-600 text-white ring-indigo-600 shadow-md shadow-indigo-600/20'
                      : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 ring-gray-300 dark:ring-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                  title={`Grade ${g}`}
                >
                  <span className={`block text-sm font-semibold text-center py-2`}>{g}</span>
                  {/* selection shimmer */}
                  <span className={`pointer-events-none absolute inset-0 opacity-0 group-aria-checked:opacity-100 ${active ? 'opacity-100' : ''}`}>
                    <span className="absolute -inset-x-6 -bottom-10 h-24 bg-white/15 blur-2xl"></span>
                  </span>
                </button>
              )
            })}
          </div>
          <div className="mt-3 text-xs text-gray-500 dark:text-slate-400">Grades 6–12 supported</div>
        </div>

        {/* Subjects panel */}
        <div className="xl:col-span-2 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">STEM Subject</div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20">Pick one</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SUBJECTS.map((s) => {
              const active = subject === s
              const icon = subjectIcon(s)
              const gradient = subjectGradient(s)
              return (
                <button
                  key={s}
                  onClick={() => setSubject(s)}
                  className={`group relative overflow-hidden rounded-2xl p-4 text-left ring-1 ring-inset transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 ${
                    active
                      ? 'ring-blue-600 shadow-lg shadow-blue-600/20'
                      : 'ring-gray-200 dark:ring-slate-800 hover:ring-gray-300 dark:hover:ring-slate-700 hover:shadow'
                  }`}
                >
                  {/* Artwork background */}
                  <div className={`absolute inset-0 -z-10 ${gradient} opacity-80`}></div>
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 shrink-0 rounded-xl bg-white/80 dark:bg-slate-900/70 backdrop-blur grid place-content-center text-lg">
                      <span aria-hidden>{icon}</span>
                    </div>
                    <div>
                      <div className="font-semibold leading-tight">{s}</div>
                      <div className="text-[11px] text-gray-700/80 dark:text-slate-300/80">Daily puzzles and mini-games</div>
                    </div>
                  </div>
                  {/* Active marker */}
                  <span className={`pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/70 dark:bg-slate-900/70 text-gray-700 dark:text-slate-300'
                  }`}>
                    {active ? 'Selected' : 'Tap to select'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* CTA card */}
        <div className="xl:col-span-1 p-0 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden bg-white/90 dark:bg-slate-900/70 backdrop-blur">
          <div className="p-5 pb-3">
            <div className="font-semibold">Ready to play?</div>
            <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">You picked <strong className="font-semibold">Grade {grade}</strong> • <strong className="font-semibold">{subject}</strong>.</p>
          </div>
          <div className="px-5 pb-5">
            <button
              onClick={playNow}
              disabled={!canPlay}
              className={`w-full px-5 py-3 rounded-xl text-white text-sm font-medium shadow transition-all flex items-center justify-center gap-2 ${
                canPlay
                  ? 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <span>🎮 Play Daily Challenge</span>
            </button>
            <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Rewards</span>
              <span>+XP • +Badges</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-slate-500">
        Note: Grades 11–12 may not have a scheduled challenge yet; if none is found, the game tries the first active challenge.
      </div>
    </div>
  )
}

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/80 dark:bg-slate-900/70 backdrop-blur px-3 py-1 text-[11px] font-medium text-gray-700 dark:text-slate-300 ring-1 ring-inset ring-gray-300/70 dark:ring-slate-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
      {text}
    </span>
  )
}

function DecorativeOrbs() {
  return (
    <svg className="pointer-events-none absolute -top-10 -right-10 h-48 md:h-64 opacity-60" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(99,102,241,0.8)" />
          <stop offset="100%" stopColor="rgba(236,72,153,0.2)" />
        </radialGradient>
        <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(16,185,129,0.8)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0.2)" />
        </radialGradient>
      </defs>
      <circle cx="70" cy="70" r="60" fill="url(#grad1)" />
      <circle cx="140" cy="100" r="50" fill="url(#grad2)" />
    </svg>
  )
}

function subjectIcon(s: Subject) {
  switch (s) {
    case 'Mathematics':
      return '➗'
    case 'Science':
      return '🔬'
    case 'Technology':
      return '💻'
    case 'Engineering':
      return '⚙️'
  }
}

function subjectGradient(s: Subject) {
  // background gradient per subject
  switch (s) {
    case 'Mathematics':
      return 'bg-gradient-to-br from-indigo-300/70 via-indigo-500/40 to-fuchsia-400/40'
    case 'Science':
      return 'bg-gradient-to-br from-emerald-300/70 via-emerald-500/40 to-teal-400/40'
    case 'Technology':
      return 'bg-gradient-to-br from-sky-300/70 via-blue-500/40 to-cyan-400/40'
    case 'Engineering':
      return 'bg-gradient-to-br from-amber-300/70 via-orange-500/40 to-rose-400/40'
  }
}

