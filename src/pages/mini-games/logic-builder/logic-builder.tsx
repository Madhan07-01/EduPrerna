import React, { useMemo, useState } from 'react'

interface Puzzle {
  id: number
  level: number
  title: string
  steps: string[]
  correctOrder: number[] // indexes into steps in the right order (0-based)
}

interface LogicBuilderProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

type Status = 'levelStart' | 'playing' | 'levelComplete' | 'gameOver' | 'gameComplete'

const QUESTIONS_PER_LEVEL = 5
const MAX_LEVELS = 5

// Shuffle utility (pure)
const shuffle = <T,>(arr: T[]): T[] => {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const bank: Puzzle[] = [
  // Level 1 – Daily Sequence
  { id: 1, level: 1, title: 'Making Tea', steps: ['Boil water', 'Add tea leaves', 'Pour into cup', 'Add milk & sugar'], correctOrder: [0,1,2,3] },
  { id: 2, level: 1, title: 'Getting Ready for School', steps: ['Wear uniform', 'Eat breakfast', 'Pack bag', 'Go to school'], correctOrder: [0,1,2,3] },
  { id: 3, level: 1, title: 'Washing Hands', steps: ['Turn on tap', 'Apply soap', 'Rub hands', 'Rinse', 'Dry'], correctOrder: [0,1,2,3,4] },
  { id: 4, level: 1, title: 'Switching on a Computer', steps: ['Press power button', 'Boot OS', 'Login', 'Open application'], correctOrder: [0,1,2,3] },
  { id: 5, level: 1, title: 'Cooking Rice', steps: ['Wash rice', 'Add water', 'Boil', 'Serve'], correctOrder: [0,1,2,3] },

  // Level 2 – Basic Logic
  { id: 6, level: 2, title: 'Start a Program', steps: ['Write code', 'Save', 'Compile/Run', 'Output shown'], correctOrder: [0,1,2,3] },
  { id: 7, level: 2, title: 'Logging In', steps: ['Enter username', 'Enter password', 'Click login', 'Access granted'], correctOrder: [0,1,2,3] },
  { id: 8, level: 2, title: 'Sending Email', steps: ['Compose', 'Add recipient', 'Send', 'Delivered'], correctOrder: [0,1,2,3] },
  { id: 9, level: 2, title: 'Solving Simple Math', steps: ['Read numbers', 'Choose operation', 'Calculate', 'Show result'], correctOrder: [0,1,2,3] },
  { id: 10, level: 2, title: 'Starting a Game', steps: ['Open game app', 'Select level', 'Start playing', 'Score points'], correctOrder: [0,1,2,3] },

  // Level 3 – Loops & Conditions
  { id: 11, level: 3, title: 'Multiplying Table of 2', steps: ['Set i=1', 'Multiply 2*i', 'Print result', 'Increment i', 'Repeat until 10'], correctOrder: [0,1,2,3,4] },
  { id: 12, level: 3, title: 'Checking Even Number', steps: ['Read number', 'Divide by 2', 'If remainder=0 print Even', 'Else print Odd'], correctOrder: [0,1,2,3] },
  { id: 13, level: 3, title: 'Finding Largest of Two Numbers', steps: ['Read a', 'Read b', 'Compare a and b', 'Print larger number'], correctOrder: [0,1,2,3] },
  { id: 14, level: 3, title: 'Printing "Hello" 5 Times', steps: ['Set count=1', 'Print Hello', 'Increment count', 'Repeat until count=5'], correctOrder: [0,1,2,3] },
  { id: 15, level: 3, title: 'Basic Decision (Age Check)', steps: ['Read age', 'If age ≥ 18 print Adult', 'Else print Minor'], correctOrder: [0,1,2] },

  // Level 4 – Algorithms
  { id: 16, level: 4, title: 'Linear Search', steps: ['Read list', 'Read target', 'Compare each element', 'If match found print position', 'If not found end'], correctOrder: [0,1,2,3,4] },
  { id: 17, level: 4, title: 'Bubble Sort (Simplified)', steps: ['Start with first two elements', 'Compare', 'Swap if needed', 'Move to next', 'Repeat until sorted'], correctOrder: [0,1,2,3,4] },
  { id: 18, level: 4, title: 'Logging Out of System', steps: ['Click logout', 'Save progress', 'Confirm', 'Exit to login screen'], correctOrder: [0,1,2,3] },
  { id: 19, level: 4, title: 'Summing 10 Numbers', steps: ['Set sum=0', 'Read number', 'Add to sum', 'Repeat for 10 times', 'Print sum'], correctOrder: [0,1,2,3,4] },
  { id: 20, level: 4, title: 'Buying Item Online', steps: ['Search product', 'Add to cart', 'Pay', 'Get confirmation'], correctOrder: [0,1,2,3] },

  // Level 5 – Challenge Round
  { id: 21, level: 5, title: 'ATM Withdrawal', steps: ['Insert card', 'Enter PIN', 'Choose amount', 'Dispense cash', 'Take card'], correctOrder: [0,1,2,3,4] },
  { id: 22, level: 5, title: 'Binary Search (Simplified)', steps: ['Read sorted list', 'Find middle', 'Compare target with middle', 'If equal stop', 'Else choose left/right half', 'Repeat'], correctOrder: [0,1,2,3,4,5] },
  { id: 23, level: 5, title: 'Traffic Light Simulation', steps: ['Turn red', 'Wait', 'Turn green', 'Wait', 'Turn yellow', 'Wait', 'Repeat'], correctOrder: [0,1,2,3,4,5,6] },
  { id: 24, level: 5, title: 'Preparing Presentation', steps: ['Open software', 'Create slides', 'Add content', 'Save file', 'Present'], correctOrder: [0,1,2,3,4] },
  { id: 25, level: 5, title: 'Online Exam Flow', steps: ['Login', 'Start exam', 'Answer questions', 'Submit', 'Get result'], correctOrder: [0,1,2,3,4] },
]

const getLevelSlice = (level: number) => bank.filter(p => p.level === level)

const LogicBuilder: React.FC<LogicBuilderProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [pIdx, setPIdx] = useState(0)
  const [status, setStatus] = useState<Status>('levelStart')
  const [selectedOrder, setSelectedOrder] = useState<number[]>([])
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong' | null; message: string }>({ type: null, message: '' })
  const [showTutorial, setShowTutorial] = useState(true)

  const puzzles = useMemo(() => getLevelSlice(level), [level])
  const puzzle = puzzles[pIdx]

  // Build a shuffled index list for the current puzzle
  const shuffledIndexes = useMemo(() => {
    if (!puzzle) return [] as number[]
    return shuffle(puzzle.steps.map((_, i) => i))
  }, [puzzle?.id])

  const pickStep = (idx: number) => {
    if (!puzzle) return
    if (selectedOrder.includes(idx)) return
    const nextSel = [...selectedOrder, idx]
    setSelectedOrder(nextSel)

    // If sequence complete, evaluate
    if (nextSel.length === puzzle.steps.length) {
      const isCorrect = nextSel.every((v, i) => v === puzzle.correctOrder[i])
      if (isCorrect) {
        setFeedback({ type: 'correct', message: '✅ Correct sequence!' })
        setScore(s => s + 10)
        const next = pIdx + 1
        // brief delay to show feedback (faster)
        window.setTimeout(() => {
          setFeedback({ type: null, message: '' })
          setSelectedOrder([])
          if (next >= QUESTIONS_PER_LEVEL) {
            if (level >= MAX_LEVELS) { saveBestIfHigher('logic-builder', score + 10); setStatus('gameComplete') }
            else { saveBestIfHigher('logic-builder', score + 10); setStatus('levelComplete') }
          } else {
            setPIdx(next)
          }
        }, 200)
      } else {
        setFeedback({ type: 'wrong', message: '❌ Wrong order! Try again…' })
        setLives(h => {
          const left = Math.max(0, h - 1)
          if (left === 0) setStatus('gameOver')
          return left
        })
        // Reset selection for retry after a short moment
        window.setTimeout(() => {
          setFeedback({ type: null, message: '' })
          setSelectedOrder([])
        }, 700)
      }
    }
  }

  const nextLevel = () => {
    setLevel(l => l + 1)
    setPIdx(0)
    setStatus('levelStart')
    setSelectedOrder([])
    setFeedback({ type: null, message: '' })
    setShowTutorial(level + 1 === 1)
  }

  const restart = () => {
    setLevel(1)
    setLives(3)
    setScore(0)
    setPIdx(0)
    setStatus('levelStart')
    setSelectedOrder([])
    setFeedback({ type: null, message: '' })
    setShowTutorial(true)
  }

  function saveBestIfHigher(key: string, value: number){
    try {
      const raw = localStorage.getItem('mg_best') || '{}'
      const obj = JSON.parse(raw) as Record<string, number>
      if (!obj[key] || value > obj[key]) { obj[key] = value; localStorage.setItem('mg_best', JSON.stringify(obj)) }
    } catch {}
  }

  if (status === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🧩</div>
          <div className="text-5xl font-bold text-white mb-2">Level {level}</div>
          <div className="text-lg text-slate-300">Arrange the steps in correct logical order!</div>
          <button onClick={() => setStatus('playing')} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">Start</button>
          <div className="mt-6"><button onClick={onBack} className="text-slate-300 underline">Back</button></div>
        </div>
      </div>
    )
  }

  if (status === 'levelComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-400 to-teal-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Level {level} Complete!</h2>
          <p className="text-gray-600 mb-4">Score: {score} • Lives: {'❤️'.repeat(lives)}</p>
          <div className="space-y-3">
            <button onClick={nextLevel} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">➡️ Next Level</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-400 to-pink-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">💥</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Game Over</h2>
          <p className="text-gray-600 mb-4">Final Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Retry</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'gameComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🎉 You are a Logic Builder Master!</h2>
          <p className="text-gray-600 mb-4">Total Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Play Again</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  // playing
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 overflow-auto">
      <div className="max-w-3xl mx-auto pt-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="px-3 py-2 rounded bg-white/10 text-white hover:bg-white/20">← Back</button>
          <div className="text-white/90 space-x-6">
            <span>Level: {level}</span>
            <span>Lives: {'❤️'.repeat(lives)}</span>
            <span>Score: {score}</span>
          </div>
        </div>

        {puzzle && (
          <div className="relative bg-slate-900/60 rounded-xl border border-slate-700 p-4 mb-4">
            <div className="text-slate-200 font-semibold mb-2">{puzzle.title}</div>
            <div className="text-slate-400 mb-3">Arrange the steps in order:</div>

            {/* Selected sequence display */}
            <ol className="bg-slate-900 rounded-lg p-3 text-slate-100 space-y-2 mb-3 list-decimal list-inside min-h-[56px]">
              {selectedOrder.length === 0 && (
                <li className="text-slate-500">Tap steps below to build the sequence…</li>
              )}
              {selectedOrder.map((idx, i) => (
                <li key={i} className="">{puzzle.steps[idx]}</li>
              ))}
            </ol>

            {feedback.type && (
              <div className={`mt-2 font-semibold ${feedback.type === 'correct' ? 'text-emerald-400' : 'text-red-400'}`}>
                {feedback.message}
              </div>
            )}

            {showTutorial && level === 1 && (
              <div className="absolute inset-3 rounded-xl bg-black/50 text-slate-100 p-4 backdrop-blur-sm">
                <div className="font-semibold mb-1">How to play</div>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Tap the step buttons below to build the sequence.</li>
                  <li>Wrong order reduces a life and resets selection.</li>
                  <li>Finish all puzzles to complete the level.</li>
                </ul>
                <div className="mt-3 text-right">
                  <button onClick={() => setShowTutorial(false)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-sm">Got it</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {shuffledIndexes.map((idx) => (
            <button
              key={idx}
              onClick={() => pickStep(idx)}
              className={`bg-blue-600 text-white py-3 px-4 rounded-lg text-left shadow ${selectedOrder.includes(idx) ? 'opacity-40 line-through' : 'hover:bg-blue-700'}`}
            >
              {puzzle?.steps[idx]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LogicBuilder
