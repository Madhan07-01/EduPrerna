import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { saveGameResult } from '../../../services/miniGames'

interface ReactionTimeProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

type Status = 'levelStart' | 'playing' | 'levelComplete' | 'gameOver' | 'gameComplete'

type MCQ = {
  prompt: string
  options: string[]
  correctIndex: number
}

type LevelSpec =
  | { id: 1 | 2 | 3; title: string; timer: number; type: 'mcq'; mcq: MCQ }
  | { id: 4; title: string; timer: number; type: 'match'; pairs: { reactants: string; products: string[]; correct: string }[] }
  | { id: 5; title: string; timer: number; type: 'speed'; rounds: MCQ[] }

const LEVELS: LevelSpec[] = [
  {
    id: 1,
    title: 'Level 1 – Identify Reaction Type',
    timer: 30,
    type: 'mcq',
    mcq: {
      prompt: 'Which type of reaction is: 2H₂ + O₂ → 2H₂O?',
      options: ['Decomposition', 'Combination', 'Displacement'],
      correctIndex: 1,
    },
  },
  {
    id: 2,
    title: 'Level 2 – Balance the Equation',
    timer: 30,
    type: 'mcq',
    mcq: {
      prompt: 'Balance: Na + Cl₂ → NaCl',
      options: ['Na + Cl₂ → NaCl', '2Na + Cl₂ → 2NaCl', '2Na + 2Cl₂ → NaCl₂'],
      correctIndex: 1,
    },
  },
  {
    id: 3,
    title: 'Level 3 – Predict the Product',
    timer: 30,
    type: 'mcq',
    mcq: {
      prompt: 'What forms when CaCO₃ is heated?',
      options: ['CaO + CO₂', 'Ca + O₂', 'Ca(OH)₂'],
      correctIndex: 0,
    },
  },
  {
    id: 4,
    title: 'Level 4 – Match Reactants & Products',
    timer: 30,
    type: 'match',
    pairs: [
      { reactants: 'Fe + CuSO₄', products: ['FeSO₄ + Cu', 'Fe₂O₃', 'FeCl₃'], correct: 'FeSO₄ + Cu' },
      { reactants: 'HCl + NaOH', products: ['NaCl + H₂O', 'H₂ + Cl₂', 'NaOH + HCl'], correct: 'NaCl + H₂O' },
      { reactants: 'Zn + HCl', products: ['ZnCl₂ + H₂', 'ZnO + H₂', 'Zn + HCl'], correct: 'ZnCl₂ + H₂' },
    ],
  },
  {
    id: 5,
    title: 'Level 5 – Mixed Speed Round',
    timer: 60,
    type: 'speed',
    rounds: [
      { prompt: 'Type: CH₄ + 2O₂ → CO₂ + 2H₂O', options: ['Combustion', 'Decomposition', 'Substitution'], correctIndex: 0 },
      { prompt: 'Balance: H₂ + Cl₂ → HCl', options: ['H₂ + Cl₂ → HCl', 'H₂ + Cl₂ → 2HCl', '2H₂ + Cl₂ → 2HCl'], correctIndex: 1 },
      { prompt: 'Predict: AgNO₃ + NaCl → ?', options: ['AgCl + NaNO₃', 'Ag + NaClO₃', 'AgNa + NO₃Cl'], correctIndex: 0 },
      { prompt: 'Type: CaCO₃ → CaO + CO₂', options: ['Combination', 'Decomposition', 'Neutralization'], correctIndex: 1 },
      { prompt: 'Balance: N₂ + 3H₂ → 2NH₃ correct?', options: ['Yes', 'No', 'Need more info'], correctIndex: 0 },
    ],
  },
]

type Anim = 'idle' | 'correct' | 'wrong'

const ReactionTime: React.FC<ReactionTimeProps> = ({ onBack }) => {
  const { currentUser } = useAuth()
  const [params] = useSearchParams()
  const isDaily = params.get('daily') === 'true'
  const awardedRef = useRef(false)
  const [level, setLevel] = useState(1)
  const [status, setStatus] = useState<Status>('levelStart')
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [anim, setAnim] = useState<Anim>('idle')
  const [instantFeedback, setInstantFeedback] = useState<'correct' | 'wrong' | null>(null)

  // match selections level 4
  const [matchSel, setMatchSel] = useState<Record<number, string>>({})

  // level 5 speed round state
  const [roundIndex, setRoundIndex] = useState(0)

  const levelSpec = useMemo(() => LEVELS.find(l => l.id === level)!, [level])

  // timer
  const [timeLeft, setTimeLeft] = useState(levelSpec.timer)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (status !== 'playing') return
    setTimeLeft(levelSpec.timer)
  }, [levelSpec.timer, status])

  useEffect(() => {
    if (status !== 'playing') return
    if (timerRef.current) cancelAnimationFrame(timerRef.current)
    let last = performance.now()
    const step = (t: number) => {
      const dt = (t - last) / 1000
      last = t
      setTimeLeft(prev => {
        const v = Math.max(0, prev - dt)
        if (v === 0) {
          onWrong()
          return levelSpec.timer
        }
        return v
      })
      timerRef.current = requestAnimationFrame(step)
    }
    timerRef.current = requestAnimationFrame(step)
    return () => { if (timerRef.current) cancelAnimationFrame(timerRef.current) }
  }, [status, level])

  const resetLevelState = () => {
    setSelected(null)
    setAnim('idle')
    setMatchSel({})
    setRoundIndex(0)
    setInstantFeedback(null)
  }

  const onWrong = () => {
    setAnim('wrong')
    setLives(h => {
      const left = Math.max(0, h - 1)
      if (left === 0) setStatus('gameOver')
      return left
    })
  }

  const onCorrect = (bonusFromSpeed = 0) => {
    setAnim('correct')
    setScore(s => s + 10 + Math.round(bonusFromSpeed))
    if (level < LEVELS.length) setStatus('levelComplete')
    else setStatus('gameComplete')
  }

  const handleReact = () => {
    if (levelSpec.type === 'mcq') {
      if (selected == null) return
      const correct = selected === levelSpec.mcq.correctIndex
      if (!correct) return onWrong()
      const bonus = Math.min(5, timeLeft)
      return onCorrect(bonus)
    }
    if (levelSpec.type === 'match') {
      const allOk = levelSpec.pairs.every((p, idx) => matchSel[idx] === p.correct)
      if (!allOk) return onWrong()
      const bonus = Math.min(5, timeLeft)
      return onCorrect(bonus)
    }
    if (levelSpec.type === 'speed') {
      if (selected == null) return
      const cur = levelSpec.rounds[roundIndex]
      const correct = selected === cur.correctIndex
      if (!correct) return onWrong()
      setScore(s => s + 10 + Math.round(Math.min(3, timeLeft / 10)))
      setSelected(null)
      if (roundIndex + 1 >= levelSpec.rounds.length) {
        if (level < LEVELS.length) setStatus('levelComplete')
        else setStatus('gameComplete')
      } else {
        setRoundIndex(i => i + 1)
        setInstantFeedback(null)
      }
    }
  }

  const nextLevel = () => {
    setLevel(l => l + 1)
    setLives(3)
    setStatus('levelStart')
    resetLevelState()
  }

  const restart = () => {
    setLevel(1)
    setLives(3)
    setScore(0)
    setStatus('levelStart')
    resetLevelState()
  }

  if (status === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">🧪</div>
          <div className="text-5xl font-bold mb-2">{levelSpec.title}</div>
          <div className="text-lg text-slate-300">Solve the reaction puzzle before the timer runs out!</div>
          <div className="mt-6 text-slate-300 space-x-6"><span>Lives: {'❤'.repeat(lives)}</span><span>Score: {score}</span></div>
          <button onClick={() => setStatus('playing')} className="mt-6 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg">Start</button>
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
          <p className="text-gray-600 mb-4">Score: {score} • Lives: {'❤'.repeat(lives)}</p>
          <div className="space-y-3">
            <button onClick={nextLevel} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">➡ Next Level</button>
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
    if (!awardedRef.current) {
      awardedRef.current = true
      ;(async () => {
        try {
          if (currentUser?.uid) {
            // persist best score locally
            try {
              const key = 'mg_best'
              const raw = localStorage.getItem(key) || '{}'
              const obj = JSON.parse(raw) as Record<string, number>
              obj['reaction-time'] = Math.max(obj['reaction-time'] || 0, score)
              localStorage.setItem(key, JSON.stringify(obj))
            } catch {}
            const bonus = isDaily ? 20 : 0
            await saveGameResult(currentUser.uid, 'reaction-time', score, currentUser.displayName || 'Anonymous', bonus)
          }
        } catch (e) {
          console.error('Failed to award XP for Reaction Time:', e)
        }
      })()
    }
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🎉 You mastered Chemical Reactions!</h2>
          <p className="text-gray-600 mb-4">Total Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Play Again</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  const beakerClass = anim === 'correct'
    ? 'ring-2 ring-emerald-300 shadow-[0_0_24px_#10b981] animate-pulse'
    : anim === 'wrong'
      ? 'ring-2 ring-red-400 shadow-[0_0_24px_#ef4444]'
      : 'ring-1 ring-slate-600'

  const beakerEmoji = anim === 'correct' ? '🫧' : anim === 'wrong' ? '💨' : '🫙'

  const mcqToShow: MCQ | null = levelSpec.type === 'mcq' ? levelSpec.mcq
    : levelSpec.type === 'speed' ? levelSpec.rounds[roundIndex]
    : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Top bar: Timer + Score */}
      <div className="max-w-6xl mx-auto pt-4 px-4 flex items-center justify-between">
        <button onClick={onBack} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20">← Back</button>
        <div className="text-white/90 space-x-6">
          <span>Level: {level}</span>
          <span>Lives: {'❤'.repeat(lives)}</span>
          <span>Score: {score}</span>
          <span className={`px-2 py-1 rounded ${timeLeft < 10 ? 'bg-red-600/40' : 'bg-white/10'}`}>⏱ {Math.ceil(timeLeft)}s</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-12 gap-4">
        {/* Center: Reaction equation + beaker animation */}
        <div className="col-span-12 md:col-span-7">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4 h-[560px] flex flex-col">
            <div className="text-slate-300 mb-3">Reaction Chamber</div>
            <div className={`flex-1 grid place-items-center`}>
              <div className="text-center space-y-4">
                <div className={`mx-auto w-40 h-40 bg-slate-900/60 border border-slate-700 rounded-2xl grid place-items-center ${beakerClass}`}>
                  <div className="text-5xl">{beakerEmoji}</div>
                </div>
                <div className="text-xl font-semibold">
                  {levelSpec.type === 'match' && 'Match reactants with the correct products'}
                  {mcqToShow && mcqToShow.prompt}
                </div>
              </div>
            </div>
            <div className="pt-3 text-slate-400 text-sm">
              Correct → beaker glows and bubbles. Wrong → smoky crack.
            </div>
          </div>
        </div>

        {/* Right: Options / Matching */}
        <div className="col-span-12 md:col-span-5">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4 h-[560px] flex flex-col">
            <div className="text-slate-200 font-semibold mb-2">{levelSpec.title}</div>

            {levelSpec.type === 'mcq' && (
              <div className="grid grid-cols-1 gap-2">
                {levelSpec.mcq.options.map((opt, i) => (
                  <button key={i} onClick={() => { setSelected(i); setInstantFeedback(i === levelSpec.mcq.correctIndex ? 'correct' : 'wrong') }} className={`text-left px-3 py-3 rounded-lg border ${selected===i ? 'bg-rose-600/30 border-rose-500' : 'bg-slate-900/40 border-slate-700 hover:bg-slate-900/60'}`}>
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                ))}
                {instantFeedback === 'correct' && <div className="text-emerald-400 font-semibold text-sm">✅ Correct</div>}
                {instantFeedback === 'wrong' && <div className="text-red-400 font-semibold text-sm">❌ Wrong</div>}
              </div>
            )}

            {levelSpec.type === 'speed' && (
              <>
                <div className="text-slate-300 mb-3 text-sm">Round {roundIndex + 1} of {levelSpec.rounds.length}</div>
                <div className="grid grid-cols-1 gap-2">
                  {mcqToShow!.options.map((opt, i) => (
                    <button key={i} onClick={() => { setSelected(i); setInstantFeedback(i === mcqToShow!.correctIndex ? 'correct' : 'wrong') }} className={`text-left px-3 py-3 rounded-lg border ${selected===i ? 'bg-rose-600/30 border-rose-500' : 'bg-slate-900/40 border-slate-700 hover:bg-slate-900/60'}`}>
                      {String.fromCharCode(65 + i)}. {opt}
                    </button>
                  ))}
                  {instantFeedback === 'correct' && <div className="text-emerald-400 font-semibold text-sm">✅ Correct</div>}
                  {instantFeedback === 'wrong' && <div className="text-red-400 font-semibold text-sm">❌ Wrong</div>}
                </div>
              </>
            )}

            {levelSpec.type === 'match' && (
              <div className="space-y-3">
                {levelSpec.pairs.map((p, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2 items-center">
                    <div className="text-slate-200">{p.reactants} →</div>
                    <select value={matchSel[idx] || ''} onChange={e => setMatchSel(s => ({ ...s, [idx]: e.target.value }))} className="bg-slate-900/50 border border-slate-700 rounded px-2 py-2">
                      <option value="">Select products</option>
                      {p.products.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom: React button */}
            <div className="mt-auto pt-4 flex justify-end">
              <button onClick={handleReact} className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-4 py-2">
                React! ⚡
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReactionTime
