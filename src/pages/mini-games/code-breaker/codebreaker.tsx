import React, { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { saveGameResult } from '../../../services/miniGames'

interface CodeBreakerProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

type Status = 'levelStart' | 'playing' | 'levelComplete' | 'gameOver' | 'gameComplete'

type BugTask = {
  prompt: string
  code: string
  options: string[]
  correctIndex: number
  hint?: string
}

interface LevelSpec {
  id: number
  title: string
  tasks: BugTask[]
}

const LEVELS: LevelSpec[] = [
  {
    id: 1,
    title: 'Level 1 – Fix the variable',
    tasks: [
      {
        prompt: 'Choose the correct fix so this code logs 6',
        code: `let a = 2
let b = 3
// TODO: make sum correct
let sum = a /* ? */ b
console.log(sum)` ,
        options: ['+','-','*','/'],
        correctIndex: 0,
        hint: 'Use the operator that adds numbers.'
      },
      {
        prompt: 'Make greeting say: Hello, Ada!',
        code: `const name = 'Ada'
// TODO: set greeting properly
const greeting = 'Hello, ' /* ? */ name + '!'
console.log(greeting)` ,
        options: ['+','-','*','/'],
        correctIndex: 0,
      },
      {
        prompt: 'Fix comparison so the message prints',
        code: `const x = 10
if (x /* ? */ 5) {
  console.log('x is greater than 5')
}` ,
        options: ['>','<','==','<='],
        correctIndex: 0,
      }
    ]
  },
  {
    id: 2,
    title: 'Level 2 – Arrays & loops',
    tasks: [
      {
        prompt: 'Pick method to add an item to the end of an array',
        code: `const arr = [1,2,3]
// add 4 at the end
arr./* ? */(4)` ,
        options: ['push','pop','shift','slice'],
        correctIndex: 0,
      },
      {
        prompt: 'Complete loop to print all items',
        code: `const nums = [1,2,3]
for (let i = 0; i /* ? */ nums.length; i++) {
  console.log(nums[i])
}` ,
        options: ['<','<=','>','>='],
        correctIndex: 0,
      },
      {
        prompt: 'Choose the correct array length',
        code: `const animals = ['cat','dog']
console.log(animals./* ? */)` ,
        options: ['length','size','count','len'],
        correctIndex: 0,
      }
    ]
  },
  {
    id: 3,
    title: 'Level 3 – Functions & types',
    tasks: [
      {
        prompt: 'Make function return the square',
        code: `function square(n /* ? */ number) /* ? */ number {
  return n * n
}` ,
        options: [':', '=>', 'as', '/* no type */'],
        correctIndex: 0,
        hint: 'Use TypeScript annotation syntax.'
      },
      {
        prompt: 'Fix arrow function to add two numbers',
        code: `const add = (a: number, b: number) /* ? */ a + b` ,
        options: ['=>','->',':','return'],
        correctIndex: 0,
      },
      {
        prompt: 'Pick the correct boolean literal',
        code: `const isReady: boolean = /* ? */` ,
        options: ['true','True','TRUE','1'],
        correctIndex: 0,
      }
    ]
  }
]

const CodeBlock = ({ children }:{ children: React.ReactNode }) => (
  <pre className="bg-slate-900 text-slate-100 text-sm p-4 rounded-lg overflow-auto border border-slate-800">
    <code>{children}</code>
  </pre>
)

const CodeBreaker: React.FC<CodeBreakerProps> = ({ onBack }) => {
  const { currentUser } = useAuth()
  const [params] = useSearchParams()
  const isDaily = params.get('daily') === 'true'
  const awardedRef = useRef(false)
  const [level, setLevel] = useState(1)
  const [status, setStatus] = useState<Status>('levelStart')
  const [taskIndex, setTaskIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)

  const spec = useMemo(() => LEVELS.find(l => l.id === level)!, [level])
  const current = spec.tasks[taskIndex]

  const pick = (i: number) => setSelected(i)

  const submit = () => {
    if (selected == null) return
    const ok = selected === current.correctIndex
    if (!ok) {
      setLives(h => {
        const left = Math.max(0, h - 1)
        if (left === 0) setStatus('gameOver')
        return left
      })
    } else {
      setScore(s => s + 10)
    }

    // advance or complete
    if (taskIndex + 1 >= spec.tasks.length) {
      if (level >= LEVELS.length) setStatus('gameComplete')
      else setStatus('levelComplete')
    } else {
      setTaskIndex(i => i + 1)
      setSelected(null)
    }
  }

  const startLevel = () => { setTaskIndex(0); setSelected(null); setStatus('playing') }
  const nextLevel = () => { setLevel(l => l + 1); setTaskIndex(0); setSelected(null); setStatus('levelStart') }
  const restart = () => { setLevel(1); setTaskIndex(0); setSelected(null); setLives(3); setScore(0); setStatus('levelStart') }

  if (status === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-700 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center max-w-lg mx-4">
          <div className="text-6xl mb-4">🐛</div>
          <h1 className="text-4xl font-bold mb-2">{spec.title}</h1>
          <p className="text-white/90">Fix 3 small bugs to pass the level. You have {lives} lives.</p>
          <div className="mt-6 space-x-4 text-white/90">
            <span>Score: {score}</span>
            <span>Lives: {'❤️'.repeat(lives)}</span>
          </div>
          <div className="mt-6 space-x-3">
            <button onClick={startLevel} className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg">Start</button>
            <button onClick={onBack} className="underline">Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'levelComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-700 to-indigo-900 text-white flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md w-full mx-4 border border-white/20">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold mb-2">Level {level} Complete!</h2>
          <p className="mb-4">Score: {score} • Lives: {'❤️'.repeat(lives)}</p>
          <div className="space-y-3">
            <button onClick={nextLevel} className="w-full bg-emerald-500/80 hover:bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors">➡️ Next Level</button>
            <button onClick={onBack} className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-700 to-indigo-900 text-white flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md w-full mx-4 border border-white/20">
          <div className="text-6xl mb-4">💀</div>
          <h2 className="text-3xl font-bold mb-2">Game Over</h2>
          <p className="mb-4">Final Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-blue-500/80 hover:bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Retry</button>
            <button onClick={onBack} className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'gameComplete') {
    if (!awardedRef.current) {
      awardedRef.current = true
      ;(async () => {
        try {
          if (currentUser?.uid) {
            // Persist local best
            try {
              const key = 'mg_best'
              const raw = localStorage.getItem(key) || '{}'
              const obj = JSON.parse(raw) as Record<string, number>
              obj['code-breaker'] = Math.max(obj['code-breaker'] || 0, score)
              localStorage.setItem(key, JSON.stringify(obj))
            } catch {}
            const bonus = isDaily ? 20 : 0
            await saveGameResult(currentUser.uid, 'code-breaker', score, currentUser.displayName || 'Anonymous', bonus)
          }
        } catch (e) {
          console.error('Failed to award XP for Code Breaker:', e)
        }
      })()
    }
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-700 to-indigo-900 text-white flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md w-full mx-4 border border-white/20">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold mb-2">You beat Code Breaker!</h2>
          <p className="mb-4">Total Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-indigo-500/80 hover:bg-indigo-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Play Again</button>
            <button onClick={onBack} className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  // playing UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-700 to-indigo-900 text-white">
      <div className="max-w-6xl mx-auto pt-4 px-4 flex items-center justify-between">
        <button onClick={onBack} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20">← Back</button>
        <div className="text-white/90 space-x-6">
          <span>Level: {level}</span>
          <span>Lives: {'❤️'.repeat(lives)}</span>
          <span>Score: {score}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white/10 rounded-2xl border border-white/20 p-4">
          <div className="text-white/90 text-lg font-semibold mb-2">{spec.title} — Task {taskIndex + 1} of {spec.tasks.length}</div>
          <div className="text-white/80 mb-4">{current.prompt}</div>
          <CodeBlock>{current.code}</CodeBlock>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => pick(i)}
                className={`px-4 py-3 rounded-lg border text-center ${selected===i ? 'bg-emerald-500/30 border-emerald-300' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
              >
                {opt}
              </button>
            ))}
          </div>

          {current.hint && (
            <div className="mt-3 text-indigo-200">Hint: {current.hint}</div>
          )}

          <div className="mt-6 flex justify-end">
            <button onClick={submit} className="rounded-lg bg-emerald-500/80 hover:bg-emerald-500 text-white px-5 py-2">
              Submit / Check Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeBreaker
