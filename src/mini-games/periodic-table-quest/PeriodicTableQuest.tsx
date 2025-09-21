import React, { useMemo, useState } from 'react'

interface PeriodicTableQuestProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

type Status = 'levelStart' | 'playing' | 'levelComplete' | 'gameOver' | 'gameComplete'

type Elem = {
  symbol: string
  name: string
  group: number // 1-18
  period: number // 1-7
  type: 'metal' | 'nonmetal' | 'metalloid' | 'noble'
}

const ELEMENTS: Elem[] = [
  { symbol: 'H', name: 'Hydrogen', group: 1, period: 1, type: 'nonmetal' },
  { symbol: 'He', name: 'Helium', group: 18, period: 1, type: 'noble' },
  { symbol: 'Na', name: 'Sodium', group: 1, period: 3, type: 'metal' },
  { symbol: 'O', name: 'Oxygen', group: 16, period: 2, type: 'nonmetal' },
  { symbol: 'K', name: 'Potassium', group: 1, period: 4, type: 'metal' },
  { symbol: 'Ne', name: 'Neon', group: 18, period: 2, type: 'noble' },
  { symbol: 'Fe', name: 'Iron', group: 8, period: 4, type: 'metal' },
  { symbol: 'Si', name: 'Silicon', group: 14, period: 3, type: 'metalloid' },
]

// quick lookup by group/period
const keyGP = (g: number, p: number) => `${g}-${p}`
const mapByGP = new Map(ELEMENTS.map(e => [keyGP(e.group, e.period), e]))

// per-element base color by type
const typeColor: Record<Elem['type'], string> = {
  metal: 'bg-yellow-500/30 border-yellow-500/40',
  nonmetal: 'bg-blue-500/30 border-blue-500/40',
  metalloid: 'bg-emerald-500/30 border-emerald-500/40',
  noble: 'bg-fuchsia-500/30 border-fuchsia-500/40',
}

// Levels definition
interface Level {
  id: number
  title: string
  question: string
  options: string[]
  correctIndex: number
  unlock: string[] // symbols to unlock
  note?: string
  kind?: 'mcq' | 'match'
}

const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Level 1 – Symbol Hunt',
    question: 'Which is the symbol for Sodium?',
    options: ['So', 'Na', 'Sn'],
    correctIndex: 1,
    unlock: ['Na'],
    note: 'Correct → Sodium square lights up.'
  },
  {
    id: 2,
    title: 'Level 2 – Metal or Non-metal?',
    question: 'Which of these is a non-metal?',
    options: ['Oxygen', 'Calcium', 'Iron'],
    correctIndex: 0,
    unlock: ['O'],
  },
  {
    id: 3,
    title: 'Level 3 – Group & Period',
    question: 'Potassium belongs to which group?',
    options: ['Group 1', 'Group 2', 'Group 18'],
    correctIndex: 0,
    unlock: ['K'],
  },
  {
    id: 4,
    title: 'Level 4 – Element Properties',
    question: 'Which element is a noble gas?',
    options: ['Neon', 'Chlorine', 'Magnesium'],
    correctIndex: 0,
    unlock: ['Ne'],
  },
  {
    id: 5,
    title: 'Level 5 – Mixed Challenge',
    question: 'Match the element with its use',
    options: [],
    correctIndex: 0, // not used
    unlock: ['Fe', 'He', 'Si'],
    kind: 'match'
  }
]

const gridPeriods = 7
const gridGroups = 18

const PeriodicTableQuest: React.FC<PeriodicTableQuestProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState<Status>('levelStart')

  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set())
  const [instantFeedback, setInstantFeedback] = useState<'correct' | 'wrong' | null>(null)

  // matching state for level 5
  const [matchA, setMatchA] = useState<string>('')
  const [matchB, setMatchB] = useState<string>('')
  const [matchC, setMatchC] = useState<string>('')

  const levelSpec = useMemo(() => LEVELS.find(l => l.id === level)!, [level])

  const resetForNext = () => {
    setSelected(null)
    setFeedback(null)
    setInstantFeedback(null)
    setMatchA(''); setMatchB(''); setMatchC('')
  }

  const handleUnlockAnimation = (toUnlock: string[]) => {
    // simple: add to unlocked set; CSS will glow via animation classes
    setUnlocked(prev => new Set([...Array.from(prev), ...toUnlock]))
  }

  const onLaunch = () => {
    if (levelSpec.kind === 'match') {
      // Validate pairs: Iron→Construction, Helium→Balloons, Silicon→Electronics
      const ok = matchA === 'Iron' && matchB === 'Helium' && matchC === 'Silicon'
      if (!ok) {
        setFeedback('wrong')
        setLives(h => {
          const left = Math.max(0, h - 1)
          if (left === 0) setStatus('gameOver')
          return left
        })
        return
      }
      setFeedback('correct')
      handleUnlockAnimation(levelSpec.unlock)
      setScore(s => s + 20)
      if (level >= LEVELS.length) setStatus('gameComplete')
      else setStatus('levelComplete')
      return
    }

    if (selected == null) return
    const correct = selected === levelSpec.correctIndex
    if (!correct) {
      setFeedback('wrong')
      setLives(h => {
        const left = Math.max(0, h - 1)
        if (left === 0) setStatus('gameOver')
        return left
      })
      return
    }

    setFeedback('correct')
    handleUnlockAnimation(levelSpec.unlock)
    setScore(s => s + 20)
    if (level >= LEVELS.length) setStatus('gameComplete')
    else setStatus('levelComplete')
  }

  const nextLevel = () => {
    setLevel(l => l + 1)
    setLives(3)
    setStatus('levelStart')
    resetForNext()
  }

  const restart = () => {
    setLevel(1)
    setLives(3)
    setScore(0)
    setStatus('levelStart')
    setUnlocked(new Set())
    resetForNext()
  }

  // Screens
  if (status === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">⚛️</div>
          <div className="text-5xl font-bold mb-2">{levelSpec.title}</div>
          <div className="text-lg text-slate-300">{levelSpec.question || 'Solve the puzzle to unlock elements!'}</div>
          <div className="mt-6 text-slate-300 space-x-6"><span>Lives: {'❤️'.repeat(lives)}</span><span>Score: {score}</span></div>
          <button onClick={() => setStatus('playing')} className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg">Start</button>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🎉 You completed the Periodic Table Quest!</h2>
          <p className="text-gray-600 mb-4">Total Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Play Again</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  // playing screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Top bar */}
      <div className="max-w-6xl mx-auto pt-4 px-4 flex items-center justify-between">
        <button onClick={onBack} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20">← Back</button>
        <div className="text-white/90 space-x-6">
          <span>Level: {level}</span>
          <span>Lives: {'❤️'.repeat(lives)}</span>
          <span>Score: {score}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-12 gap-4">
        {/* Center: Periodic Table Grid */}
        <div className="col-span-12 md:col-span-7">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
            <div className="text-slate-300 mb-3">Glowing Periodic Table</div>
            <div className={`grid gap-1`} style={{ gridTemplateColumns: `repeat(${gridGroups}, minmax(0, 1fr))` }}>
              {Array.from({ length: gridPeriods }).map((_, pIdx) => (
                <React.Fragment key={pIdx}>
                  {Array.from({ length: gridGroups }).map((__, gIdx) => {
                    const g = gIdx + 1
                    const p = pIdx + 1
                    const e = mapByGP.get(keyGP(g, p))
                    const isUnlocked = e ? unlocked.has(e.symbol) : false
                    const base = e ? typeColor[e.type] : 'bg-slate-900/40 border-slate-700/60'
                    return (
                      <div
                        key={`${g}-${p}`}
                        className={`relative aspect-square rounded-lg border flex items-center justify-center text-xs md:text-sm select-none ${base} ${isUnlocked ? 'ring-2 ring-amber-300 shadow-[0_0_20px_#fbbf24] animate-pulse' : ''}`}
                      >
                        {e ? (
                          <div className="text-center">
                            <div className="font-bold text-white drop-shadow-sm">{e.symbol}</div>
                            <div className="text-[10px] text-white/70">{e.name}</div>
                          </div>
                        ) : (
                          <div className="text-slate-600">•</div>
                        )}
                        {e && !isUnlocked && (
                          <div className="absolute inset-0 bg-slate-950/60 rounded-lg backdrop-blur-[1px] flex items-center justify-center text-red-300">
                            🔒
                          </div>
                        )}
                        {e && isUnlocked && (
                          <div className="absolute -top-1 -right-1 text-green-300">✨</div>
                        )}
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Question */}
        <div className="col-span-12 md:col-span-5">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4 h-[560px] flex flex-col">
            <div className="text-slate-200 font-semibold mb-2">{levelSpec.title}</div>
            {levelSpec.kind !== 'match' ? (
              <>
                <div className="text-slate-300 mb-4 text-sm leading-relaxed">{levelSpec.question}</div>
                <div className="grid grid-cols-1 gap-2">
                  {levelSpec.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelected(i); setInstantFeedback(i === levelSpec.correctIndex ? 'correct' : 'wrong') }}
                      className={`text-left px-3 py-3 rounded-lg border ${selected===i ? 'bg-orange-600/30 border-orange-500' : 'bg-slate-900/40 border-slate-700 hover:bg-slate-900/60'}`}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </button>
                  ))}
                </div>
                {instantFeedback === 'correct' && <div className="mt-2 text-emerald-400 font-semibold text-sm">✅ Correct</div>}
                {instantFeedback === 'wrong' && <div className="mt-2 text-red-400 font-semibold text-sm">❌ Wrong</div>}
              </>
            ) : (
              <>
                <div className="text-slate-300 mb-4 text-sm leading-relaxed">Match the element with its use:</div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 items-center">
                    <div className="text-slate-200">Construction →</div>
                    <select value={matchA} onChange={e => setMatchA(e.target.value)} className="bg-slate-900/50 border border-slate-700 rounded px-2 py-2">
                      <option value="">Select element</option>
                      <option>Iron</option>
                      <option>Helium</option>
                      <option>Silicon</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2 items-center">
                    <div className="text-slate-200">Balloons →</div>
                    <select value={matchB} onChange={e => setMatchB(e.target.value)} className="bg-slate-900/50 border border-slate-700 rounded px-2 py-2">
                      <option value="">Select element</option>
                      <option>Iron</option>
                      <option>Helium</option>
                      <option>Silicon</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2 items-center">
                    <div className="text-slate-200">Electronics →</div>
                    <select value={matchC} onChange={e => setMatchC(e.target.value)} className="bg-slate-900/50 border border-slate-700 rounded px-2 py-2">
                      <option value="">Select element</option>
                      <option>Iron</option>
                      <option>Helium</option>
                      <option>Silicon</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {feedback === 'correct' && <div className="mt-3 text-emerald-400 font-semibold">✅ Correct!</div>}
            {feedback === 'wrong' && <div className="mt-3 text-red-400 font-semibold">❌ Wrong! Try again…</div>}

            {/* Bottom: Unlock button */}
            <div className="mt-auto pt-4 flex justify-end">
              <button onClick={onLaunch} className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-4 py-2">
                Unlock Element 🔓
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PeriodicTableQuest
