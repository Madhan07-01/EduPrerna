import { Link, Route, Routes } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getAllUserGameProgress } from '../../services/miniGames'

// Implemented sub-routes (present as folders)
import CodeBreakerPage from './code-breaker'
import CircuitConnectPage from './circuit-connect'
import EcoSurvivalPage from './eco-survival'
import GravityDropPage from './gravity-drop'
import HumanBodyQuestPage from './human-body-quest'
import LogicBuilderPage from './logic-builder'
import MagnetManiaPage from './magnet-mania'
import MathArcherPage from './math-archer'
import MathRunnerPage from './MathRunner'
import MoleculeBuilderPage from './molecule-builder/index'
import PeriodicTableQuestPage from './periodic-table-quest'
import EquationBuilderPage from './equation-builder'
import ReactionTimePage from './reaction-time'

// Launcher with Subject/Grade filters (recreated minimal)
type Subject = 'math' | 'physics' | 'chemistry' | 'biology' | 'cs'

type GameMeta = {
  path: string
  name: string
  icon: string
  description: string
  subject: Subject
  grades: number[]
}

const GAMES: GameMeta[] = [
  { path: 'code-breaker', name: 'Code Breaker', icon: '🐛', description: 'Fix code to advance levels', subject: 'cs', grades: [9] },
  { path: 'circuit-connect', name: 'Circuit Connect', icon: '🔌', description: 'Wire circuits and test power', subject: 'physics', grades: [9] },
  { path: 'eco-survival', name: 'Eco Survival', icon: '🌿', description: 'Adapt and balance ecosystems', subject: 'biology', grades: [8,9] },
  { path: 'gravity-drop', name: 'Gravity Drop', icon: '🌌', description: 'Gravity, motion and projectiles', subject: 'physics', grades: [9] },
  { path: 'molecule-builder', name: 'Molecule Builder', icon: '🧬', description: 'Build H₂O, CO₂, CH₄ and more', subject: 'chemistry', grades: [9] },
  { path: 'periodic-table-quest', name: 'Periodic Table Quest', icon: '⚛', description: 'Unlock and learn the elements', subject: 'chemistry', grades: [8,9] },
  { path: 'reaction-time', name: 'Reaction Time', icon: '🧪', description: 'Fast chemistry: types, balancing, matching', subject: 'chemistry', grades: [8] },
  { path: 'human-body-quest', name: 'Human Body Quest', icon: '🫀', description: 'Organs, systems and functions', subject: 'biology', grades: [8,9] },
  { path: 'logic-builder', name: 'Logic Builder', icon: '🧩', description: 'Arrange steps with logic', subject: 'cs', grades: [9] },
  { path: 'magnet-mania', name: 'Magnet Mania', icon: '🧲', description: 'Poles, compass and electromagnets', subject: 'physics', grades: [8,9] },
  { path: 'math-archer', name: 'Math Archer', icon: '🏹', description: 'Shoot the correct answers', subject: 'math', grades: [8,9] },
  { path: 'math-runner', name: 'Math Runner', icon: '🏃‍♂️', description: 'Run and answer quick math', subject: 'math', grades: [8,9] },
  { path: 'equation-builder', name: 'Equation Builder', icon: '🧮', description: 'Complete equations by picking the right parts', subject: 'math', grades: [6,9,10,12] },
]

function Filters({ subject, setSubject, grade, setGrade }:{
  subject: Subject | null
  setSubject: (s: Subject | null) => void
  grade: number | null
  setGrade: (g: number | null) => void
}){
  const subjects: { key: Subject; label: string; color: string }[] = [
    { key: 'math', label: 'Mathematics', color: 'bg-indigo-600 hover:bg-indigo-500' },
    { key: 'physics', label: 'Physics', color: 'bg-sky-600 hover:bg-sky-500' },
    { key: 'chemistry', label: 'Chemistry', color: 'bg-emerald-600 hover:bg-emerald-500' },
    { key: 'biology', label: 'Biology', color: 'bg-teal-600 hover:bg-teal-500' },
    { key: 'cs', label: 'Computer Science', color: 'bg-violet-600 hover:bg-violet-500' },
  ]
  const grades = [8, 9]
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {subjects.map(s => (
          <button key={s.key} onClick={()=> setSubject(subject===s.key? null : s.key)} className={`px-4 py-2 rounded-full text-white ${s.color} ${subject===s.key? 'ring-4 ring-white/30 shadow' : 'opacity-90'}`}>
            {s.label}
          </button>
        ))}
      </div>
      {subject && (
        <div className="flex flex-wrap gap-2">
          {grades.map(g => (
            <button key={g} onClick={()=> setGrade(grade===g? null : g)} className={`px-3 py-1.5 rounded-full text-sm font-medium border ${grade===g? 'bg-white text-slate-900 border-slate-300 shadow' : 'bg-slate-900/70 text-white border-slate-700 hover:bg-slate-800'}`}>
              Grade {g}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MiniGamesHome(){
  const { currentUser } = useAuth()
  const [subject, setSubject] = useState<Subject | null>(null)
  const [grade, setGrade] = useState<number | null>(null)
  const [best, setBest] = useState<Record<string, number>>({})
  const [progress, setProgress] = useState<Record<string, { completed: boolean; score: number }>>({})

  const filtered = useMemo(() => GAMES.filter(g => (!subject || g.subject===subject) && (!grade || g.grades.includes(grade))), [subject, grade])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mg_best') || '{}'
      const obj = JSON.parse(raw) as Record<string, number>
      setBest(obj)
    } catch { setBest({}) }
  }, [])

  useEffect(() => {
    // Fetch cloud progress for progress tracker
    (async () => {
      if (!currentUser) return
      const all = await getAllUserGameProgress(currentUser.uid)
      setProgress(all as any)
    })()
  }, [currentUser])

  return (
    <div className="space-y-6">
      <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white shadow relative">
        <div className="p-6 md:p-8">
          <div className="text-sm uppercase tracking-wide opacity-90">Play & Learn</div>
          <div className="mt-1 text-2xl md:text-3xl font-semibold">Mini‑Games Hub</div>
          <div className="mt-2 opacity-90">Choose subject and grade to see games.</div>
        </div>
        {/* Daily Challenge Badge */}
        {(() => {
          const idx = new Date().getDate() % GAMES.length
          const daily = GAMES[idx]
          return (
            <div className="absolute right-4 top-4 bg-white/10 backdrop-blur rounded-xl px-4 py-2 border border-white/20 shadow">
              <div className="text-xs opacity-90">Daily Challenge</div>
              <div className="font-semibold flex items-center gap-2"><span>{daily.icon}</span><span>{daily.name}</span></div>
              <div className="mt-1">
                <Link to={`/${'mini-games'}/${daily.path}?daily=true`} className="inline-block text-xs bg-white/20 hover:bg-white/30 rounded px-2 py-1">Play for bonus XP ⭐</Link>
              </div>
            </div>
          )
        })()}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <Filters subject={subject} setSubject={setSubject} grade={grade} setGrade={setGrade} />
        <div className="flex gap-2">
          {/* Random Game */}
          <Link
            to={`/mini-games/${GAMES[Math.floor(Math.random()*GAMES.length)].path}`}
            className="rounded-md bg-yellow-400 text-slate-900 px-3 py-2 text-sm font-semibold hover:bg-yellow-300 shadow-sm"
          >
            🎲 Random Game
          </Link>

          {/* Progress Tracker */}
          <div className="rounded-md bg-white text-slate-900 dark:bg-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm">
            {(() => {
              const total = GAMES.length
              const done = Object.keys(progress).filter(k => progress[k]?.completed).length
              const pct = Math.round((done/total)*100)
              return (
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-2 bg-emerald-500" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="text-xs">{done}/{total} completed</div>
                </div>
              )
            })()}
          </div>
        </div>
      </div>

      {!subject || !grade ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-center">
          <div className="text-5xl mb-2">🎮</div>
          <div className="text-lg font-medium">Select a subject and grade to get started</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">We currently support Grades 8 and 9</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(g => (
            <div key={g.path} className="group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4 overflow-hidden shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 hover:shadow-lg">
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-xl group-hover:scale-110 transition" />
              <div className="text-3xl">{g.icon}</div>
              <div className="mt-2 font-semibold text-slate-900 dark:text-white">{g.name}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{g.description}</div>
              {best[g.path] !== undefined && (
                <div className="mt-2 inline-block text-xs bg-emerald-600 text-white px-2 py-1 rounded">Best: {best[g.path]}</div>
              )}
              <div className="mt-3">
                {(() => {
                  let lesson = ''
                  if (g.path === 'equation-builder' && g.subject === 'math'){
                    if (grade === 6) lesson = 'fractions'
                    else if (grade === 10) lesson = 'quadratic%20equations'
                    else if (grade === 12) lesson = 'calculus'
                  }
                  const href = `${g.path}?subject=${g.subject}&grade=${grade}` + (lesson? `&lesson=${lesson}` : '')
                  return (
                    <Link to={href} className="inline-block rounded-md bg-slate-900 text-white px-3 py-2 text-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition">Play</Link>
                  )
                })()}
              </div>
              {/* Quick preview hover */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform">
                <div className="p-3 text-xs bg-slate-900/80 text-white dark:bg-white/80 dark:text-slate-900">{g.description} • Subject: {g.subject.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function MiniGamesRoutes(){
  return (
    <Routes>
      <Route index element={<MiniGamesHome />} />
      <Route path="code-breaker" element={<CodeBreakerPage />} />
      <Route path="circuit-connect" element={<CircuitConnectPage />} />
      <Route path="eco-survival" element={<EcoSurvivalPage />} />
      <Route path="gravity-drop" element={<GravityDropPage />} />
      <Route path="human-body-quest" element={<HumanBodyQuestPage />} />
      <Route path="logic-builder" element={<LogicBuilderPage />} />
      <Route path="magnet-mania" element={<MagnetManiaPage />} />
      <Route path="math-archer" element={<MathArcherPage />} />
      <Route path="math-runner" element={<MathRunnerPage />} />
      <Route path="molecule-builder" element={<MoleculeBuilderPage />} />
      <Route path="periodic-table-quest" element={<PeriodicTableQuestPage />} />
      <Route path="equation-builder" element={<EquationBuilderPage />} />
      <Route path="reaction-time" element={<ReactionTimePage />} />
    </Routes>
  )
}
