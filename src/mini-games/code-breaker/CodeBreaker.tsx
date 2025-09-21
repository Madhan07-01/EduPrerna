import React, { useMemo, useState } from 'react'

interface Question {
  id: number
  level: number
  title: string
  snippet: string
  language: 'python' | 'html' | 'qbasic'
  options: string[]
  correctIndex: number
}

interface CodeBreakerProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

type Status = 'levelStart' | 'playing' | 'levelComplete' | 'gameOver' | 'gameComplete'

const QUESTIONS_PER_LEVEL = 5
const MAX_LEVELS = 5

const bank: Question[] = [
  // Level 1 – Basics
  { id: 1, level: 1, title: 'Python: Fix print', language: 'python', snippet: 'print("Hello World', options: ['Add missing )', 'Change print to Print', 'Remove quotes'], correctIndex: 0 },
  { id: 2, level: 1, title: 'HTML: Close tag', language: 'html', snippet: '<h1>Welcome<h1>', options: ['Close tag as </h1>', 'Change h1 to H1', 'Add ; at end'], correctIndex: 0 },
  { id: 3, level: 1, title: 'QBasic: PRINT', language: 'qbasic', snippet: 'PRNT "HELLO"', options: ['Fix spelling → PRINT', 'Change HELLO to hello', 'Add ;'], correctIndex: 0 },
  { id: 4, level: 1, title: 'Python: newline', language: 'python', snippet: 'x = 5 print(x)', options: ['Add ;', 'Add newline before print', 'Remove ='], correctIndex: 1 },
  { id: 5, level: 1, title: 'HTML: img tag', language: 'html', snippet: '<img src="dog.jpg">', options: ['Add closing </img>', 'Self-closing <img src="dog.jpg" />', 'Remove quotes'], correctIndex: 1 },

  // Level 2 – Print & Variables
  { id: 6, level: 2, title: 'Python: print()', language: 'python', snippet: 'prit("Hi")', options: ['Fix spelling → print', 'Add colon', 'Remove brackets'], correctIndex: 0 },
  { id: 7, level: 2, title: 'QBasic: variable name', language: 'qbasic', snippet: 'LET A = 5\nPRINT B', options: ['Change B to A', 'Add colon', 'Remove LET'], correctIndex: 0 },
  { id: 8, level: 2, title: 'HTML: paragraph', language: 'html', snippet: '<p>Paragraph<p>', options: ['Close with </p>', 'Add ;', 'Use <para>'], correctIndex: 0 },
  { id: 9, level: 2, title: 'Python: comparison', language: 'python', snippet: 'if x=5:', options: ['Use ==', 'Add semicolon', 'Remove colon'], correctIndex: 0 },
  { id: 10, level: 2, title: 'QBasic: INPUT', language: 'qbasic', snippet: 'INPUT "Enter name" NAME', options: ['Use ; instead of space', 'Correct → INPUT "Enter name"; NAME', 'Remove quotes'], correctIndex: 1 },

  // Level 3 – Loops & Conditions
  { id: 11, level: 3, title: 'Python: for loop', language: 'python', snippet: 'for i in range(5)\n    print(i)', options: ['Add : after range(5)', 'Remove range', 'Add semicolon'], correctIndex: 0 },
  { id: 12, level: 3, title: 'QBasic: FOR loop', language: 'qbasic', snippet: 'FOR I=1 TO 5\nPRINT I\nNEXT', options: ['NEXT I', 'Remove FOR', 'Add ;'], correctIndex: 0 },
  { id: 13, level: 3, title: 'HTML: list', language: 'html', snippet: '<ul><li>One<li>Two</ul>', options: ['Close </li>', 'Add colon', 'Remove <ul>'], correctIndex: 0 },
  { id: 14, level: 3, title: 'Python: condition', language: 'python', snippet: 'if name = "Tom":', options: ['Use ==', 'Add ;', 'Remove quotes'], correctIndex: 0 },
  { id: 15, level: 3, title: 'QBasic: IF-ELSE', language: 'qbasic', snippet: 'IF A>5 THEN PRINT "YES" ELSE', options: ['Add action after ELSE', 'Add semicolon', 'Remove THEN'], correctIndex: 0 },

  // Level 4 – Multi-line Debugging
  { id: 16, level: 4, title: 'Python: while loop', language: 'python', snippet: 'while i < 5\n    print(i)\n    i += 1', options: ['Add : after while', 'Remove i+=1', 'Add semicolon'], correctIndex: 0 },
  { id: 17, level: 4, title: 'HTML: table nesting', language: 'html', snippet: '<table><tr><td>Hi</tr></td></table>', options: ['Correct order → </td></tr>', 'Add ;', 'Remove <td>'], correctIndex: 0 },
  { id: 18, level: 4, title: 'QBasic: FOR NEXT', language: 'qbasic', snippet: 'FOR I=1 TO 10\nPRINT I', options: ['Add NEXT I', 'Add ;', 'Remove FOR'], correctIndex: 0 },
  { id: 19, level: 4, title: 'Python: def', language: 'python', snippet: 'def greet print("Hi")', options: ['Add (): after greet', 'Add ;', 'Remove def'], correctIndex: 0 },
  { id: 20, level: 4, title: 'HTML: anchor', language: 'html', snippet: '<a href="page.html">Click', options: ['Close with </a>', 'Add ;', 'Use  '], correctIndex: 0 },

  // Level 5 – Challenge Round
  { id: 21, level: 5, title: 'Python: def add', language: 'python', snippet: 'def add(a,b)\n    return a+b', options: ['Add : after def line', 'Add ;', 'Remove return'], correctIndex: 0 },
  { id: 22, level: 5, title: 'QBasic: END IF', language: 'qbasic', snippet: 'INPUT "Enter number"; N\nIF N MOD 2=0 THEN\nPRINT "Even"\nELSE\nPRINT "Odd"', options: ['Missing END IF', 'Add ;', 'Remove ELSE'], correctIndex: 0 },
  { id: 23, level: 5, title: 'HTML: order', language: 'html', snippet: '<html><head><title>Hi</title></body></html>', options: ['Fix order → </head><body>', 'Add ;', 'Remove body'], correctIndex: 0 },
  { id: 24, level: 5, title: 'Python: for line', language: 'python', snippet: 'for i in [1,2,3] print(i)', options: ['Add :', 'Remove for', 'Add ;'], correctIndex: 0 },
  { id: 25, level: 5, title: 'QBasic: THEN', language: 'qbasic', snippet: 'IF A>10 PRINT "YES"', options: ['Add THEN', 'Add ;', 'Remove IF'], correctIndex: 0 },
]

const getLevelSlice = (level: number) => bank.filter(q => q.level === level)

const CodeBreaker: React.FC<CodeBreakerProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [status, setStatus] = useState<Status>('levelStart')

  const questions = useMemo(() => getLevelSlice(level), [level])
  const q = questions[qIdx]

  const handleOption = (idx: number) => {
    if (!q) return
    const correct = idx === q.correctIndex
    if (correct) {
      setScore(s => s + 10)
      const next = qIdx + 1
      if (next >= QUESTIONS_PER_LEVEL) {
        if (level >= MAX_LEVELS) setStatus('gameComplete')
        else setStatus('levelComplete')
      } else {
        setQIdx(next)
      }
    } else {
      setLives(h => {
        const left = Math.max(0, h - 1)
        if (left === 0) setStatus('gameOver')
        return left
      })
    }
  }

  const nextLevel = () => {
    setLevel(l => l + 1)
    setQIdx(0)
    setStatus('levelStart')
  }

  const restart = () => {
    setLevel(1)
    setLives(3)
    setScore(0)
    setQIdx(0)
    setStatus('levelStart')
  }

  if (status === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🐛</div>
          <div className="text-5xl font-bold text-white mb-2">Level {level}</div>
          <div className="text-lg text-slate-300">Fix the code to break through!</div>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Game Completed!</h2>
          <p className="text-gray-600 mb-4">Total Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Replay</button>
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

        {q && (
          <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-4 mb-4">
            <div className="text-slate-200 font-semibold mb-2">{q.title}</div>
            <pre className="bg-slate-900 rounded-lg p-3 overflow-auto text-slate-100"><code>{q.snippet}</code></pre>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {q?.options.map((opt, i) => (
            <button key={i} onClick={() => handleOption(i)} className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-left shadow">
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CodeBreaker
