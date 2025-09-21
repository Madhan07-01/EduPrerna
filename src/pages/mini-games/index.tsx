import { Link, Route, Routes } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

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
  { path: 'human-body-quest', name: 'Human Body Quest', icon: '🫀', description: 'Organs, systems and functions', subject: 'biology', grades: [8,9] },
  { path: 'logic-builder', name: 'Logic Builder', icon: '🧩', description: 'Arrange steps with logic', subject: 'cs', grades: [9] },
  { path: 'magnet-mania', name: 'Magnet Mania', icon: '🧲', description: 'Poles, compass and electromagnets', subject: 'physics', grades: [8,9] },
  { path: 'math-archer', name: 'Math Archer', icon: '🏹', description: 'Shoot the correct answers', subject: 'math', grades: [8,9] },
  { path: 'math-runner', name: 'Math Runner', icon: '🏃‍♂️', description: 'Run and answer quick math', subject: 'math', grades: [8,9] },
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
  const [subject, setSubject] = useState<Subject | null>(null)
  const [grade, setGrade] = useState<number | null>(null)
  const [best, setBest] = useState<Record<string, number>>({})

  const filtered = useMemo(() => GAMES.filter(g => (!subject || g.subject===subject) && (!grade || g.grades.includes(grade))), [subject, grade])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mg_best') || '{}'
      const obj = JSON.parse(raw) as Record<string, number>
      setBest(obj)
    } catch { setBest({}) }
  }, [])

  return (
    <div className="space-y-6">
      <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white shadow">
        <div className="p-6 md:p-8">
          <div className="text-sm uppercase tracking-wide opacity-90">Play & Learn</div>
          <div className="mt-1 text-2xl md:text-3xl font-semibold">Mini‑Games Hub</div>
          <div className="mt-2 opacity-90">Choose subject and grade to see games.</div>
        </div>
      </div>

      <Filters subject={subject} setSubject={setSubject} grade={grade} setGrade={setGrade} />

      {!subject || !grade ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-center">
          <div className="text-5xl mb-2">🎮</div>
          <div className="text-lg font-medium">Select a subject and grade to get started</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">We currently support Grades 8 and 9</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(g => (
            <div key={g.path} className="group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-xl group-hover:scale-110 transition" />
              <div className="text-3xl">{g.icon}</div>
              <div className="mt-2 font-semibold text-slate-900 dark:text-white">{g.name}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{g.description}</div>
              {best[g.path] !== undefined && (
                <div className="mt-2 inline-block text-xs bg-emerald-600 text-white px-2 py-1 rounded">Best: {best[g.path]}</div>
              )}
              <div className="mt-3">
                <Link to={`${g.path}?subject=${g.subject}&grade=${grade}`} className="inline-block rounded-md bg-slate-900 text-white px-3 py-2 text-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition">Play</Link>
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
    </Routes>
  )
}
