import React, { useEffect, useMemo, useState } from 'react'

interface MoleculeBuilderProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

type Status = 'levelStart' | 'playing' | 'levelComplete' | 'gameOver' | 'gameComplete'

type AtomKind = 'H' | 'O' | 'C' | 'N' | 'Na' | 'Cl' | 'Ca' | 'S'

interface LevelSpec {
  id: number
  title: string
  goal: string // e.g., H₂O
  targets: Record<AtomKind, number>
}

// (Reserved for potential future visualizations)

// UI palette and atomic number for tiles
const ELEMENT_INFO: Record<AtomKind, { bg: string; text: string; atomic: number }> = {
  H:  { bg: '#f87171', text: '#ffffff', atomic: 1 },
  O:  { bg: '#34d399', text: '#0b1220', atomic: 8 },
  C:  { bg: '#60a5fa', text: '#0b1220', atomic: 6 },
  N:  { bg: '#93c5fd', text: '#0b1220', atomic: 7 },
  Na: { bg: '#fde68a', text: '#0b1220', atomic: 11 },
  Cl: { bg: '#f0abfc', text: '#0b1220', atomic: 17 },
  Ca: { bg: '#ddd6fe', text: '#0b1220', atomic: 20 },
  S:  { bg: '#fde68a', text: '#0b1220', atomic: 16 },
}

const ALL_ATOMS: AtomKind[] = ['H','O','C','N','Na','Cl','Ca','S']

const LEVELS: LevelSpec[] = [
  { id: 1, title: 'Level 1 – H₂O (Water)',          goal: 'H₂O',  targets: { H:2, O:1, C:0, N:0, Na:0, Cl:0, Ca:0, S:0 } },
  { id: 2, title: 'Level 2 – CO₂ (Carbon Dioxide)',  goal: 'CO₂',  targets: { C:1, O:2, H:0, N:0, Na:0, Cl:0, Ca:0, S:0 } },
  { id: 3, title: 'Level 3 – CH₄ (Methane)',         goal: 'CH₄',  targets: { C:1, H:4, O:0, N:0, Na:0, Cl:0, Ca:0, S:0 } },
  { id: 4, title: 'Level 4 – NH₃ (Ammonia)',         goal: 'NH₃',  targets: { N:1, H:3, O:0, C:0, Na:0, Cl:0, Ca:0, S:0 } },
  { id: 5, title: 'Level 5 – NaCl (Sodium Chloride)',goal: 'NaCl', targets: { Na:1, Cl:1, H:0, O:0, C:0, N:0, Ca:0, S:0 } },
]

const BONUS_MOLECULES: Array<{ goal: string; targets: Record<AtomKind, number> }> = [
  { goal: 'HCl',  targets: { H:1, Cl:1, O:0, C:0, N:0, Na:0, Ca:0, S:0 } },
  { goal: 'O₂',   targets: { O:2, H:0, C:0, N:0, Na:0, Cl:0, Ca:0, S:0 } },
  { goal: 'C₂H₆', targets: { C:2, H:6, O:0, N:0, Na:0, Cl:0, Ca:0, S:0 } },
]

const MoleculeBuilder: React.FC<MoleculeBuilderProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1)
  const [status, setStatus] = useState<Status>('levelStart')
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)

  // selection-based counts for formula
  const [selectedCounts, setSelectedCounts] = useState<Record<AtomKind, number>>({ H:0,O:0,C:0,N:0,Na:0,Cl:0,Ca:0,S:0 })
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [bonusGoals, setBonusGoals] = useState<typeof BONUS_MOLECULES>([])
  const [bonusIndex, setBonusIndex] = useState(0)

  const levelSpec = useMemo(() => LEVELS.find(l => l.id === level)!, [level])
  const activeTargets = useMemo(() => levelSpec.targets, [levelSpec])

  // Friendly names for target compounds
  const compoundName = useMemo(() => {
    const map: Record<string, string> = {
      'H₂O': 'Water',
      'CO₂': 'Carbon Dioxide',
      'CH₄': 'Methane',
      'NH₃': 'Ammonia',
      'HCl': 'Hydrogen Chloride',
      'O₂': 'Oxygen',
      'NaCl': 'Sodium Chloride (Salt)',
      'C₂H₆': 'Ethane',
    }
    if (level <= 5) {
      const goal = levelSpec.goal
      return map[goal] ? `${goal} - ${map[goal]}` : goal
    } else {
      const goal = bonusGoals[bonusIndex]?.goal || 'Mixed'
      return map[goal] ? `${goal} - ${map[goal]}` : goal
    }
  }, [level, levelSpec.goal, bonusGoals, bonusIndex])

  // Render chemical formula nicely with subscripts for counts > 1
  const renderFormula = (counts: Record<AtomKind, number>) => {
    const order: AtomKind[] = ['C','H','O','N','Na','Cl','Ca','S']
    const toSub = (n: number) => {
      const map: Record<string, string> = { '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉' }
      return String(n).split('').map(d => map[d] || d).join('')
    }
    const parts: string[] = []
    order.forEach(k => {
      const c = counts[k] || 0
      if (c > 0) parts.push(`${k}${c>1 ? toSub(c) : ''}`)
    })
    return parts.length ? parts.join('') : '—'
  }

  // initialize or reset board on level change
  useEffect(() => {
    setSelectedCounts({ H:0,O:0,C:0,N:0,Na:0,Cl:0,Ca:0,S:0 })
    setFeedback(null)
  }, [level])

  const addAtom = (kind: AtomKind) => {
    setSelectedCounts(prev => ({ ...prev, [kind]: (prev[kind] || 0) + 1 }))
  }

  const removeAtom = (kind: AtomKind) => {
    setSelectedCounts(prev => ({ ...prev, [kind]: Math.max(0, (prev[kind] || 0) - 1) }))
  }

  const evaluateMolecule = (counts: Record<AtomKind, number>, targets: Record<AtomKind, number>): boolean => {
    for (const k of ALL_ATOMS) {
      const want = targets[k] || 0
      const have = counts[k] || 0
      if (want !== have) return false
    }
    return true
  }

  const onCheck = () => {
    // Regular levels
    if (level <= 5) {
      const ok = evaluateMolecule(selectedCounts, activeTargets)
      if (!ok) {
        setFeedback('wrong')
        setLives(h => { const left = Math.max(0, h - 1); if (left === 0) setStatus('gameOver'); return left })
        return
      }
      setFeedback('correct')
      setScore(s => s + 20)
      if (level >= 5) {
        // move to bonus mixed
        // generate 3 random unique molecules from BONUS_MOLECULES
        const shuffled = [...BONUS_MOLECULES].sort(() => Math.random() - 0.5)
        setBonusGoals(shuffled.slice(0, 3))
        setBonusIndex(0)
        setLevel(6)
        setStatus('levelStart')
      } else {
        setStatus('levelComplete')
      }
      return
    }

    // Bonus mixed: 3 quick compounds
    const current = bonusGoals[bonusIndex]
    const ok = current ? evaluateMolecule(selectedCounts, current.targets as Record<AtomKind, number>) : false
    if (!ok) {
      setFeedback('wrong')
      setLives(h => { const left = Math.max(0, h - 1); if (left === 0) setStatus('gameOver'); return left })
      return
    }
    setFeedback('correct')
    setScore(s => s + 20)
    if (bonusIndex + 1 >= 3) {
      setStatus('gameComplete')
    } else {
      setBonusIndex(i => i + 1)
      setSelectedCounts({ H:0,O:0,C:0,N:0,Na:0,Cl:0,Ca:0,S:0 })
      setFeedback(null)
      setStatus('levelStart')
    }
  }

  const nextLevel = () => {
    setLevel(l => l + 1)
    setLives(3)
    setStatus('levelStart')
    setFeedback(null)
    setSelectedCounts({ H:0,O:0,C:0,N:0,Na:0,Cl:0,Ca:0,S:0 })
  }

  const restart = () => {
    setLevel(1)
    setLives(3)
    setScore(0)
    setStatus('levelStart')
    setFeedback(null)
    setBonusGoals([])
    setBonusIndex(0)
    setSelectedCounts({ H:0,O:0,C:0,N:0,Na:0,Cl:0,Ca:0,S:0 })
  }

  // Screens
  if (status === 'levelStart') {
    const subGoal = level <= 5 ? levelSpec.goal : (bonusGoals[bonusIndex]?.goal || 'Mixed')
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">🧬</div>
          <div className="text-5xl font-bold mb-2">{levelSpec.title}</div>
          <div className="text-lg text-slate-300">Build: {subGoal}</div>
          <div className="mt-6 text-slate-300 space-x-6"><span>Lives: {'❤️'.repeat(lives)}</span><span>Score: {score}</span></div>
          <button onClick={() => setStatus('playing')} className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg">Start</button>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🎉 You are a Molecule Master!</h2>
          <p className="text-gray-600 mb-4">Total Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Play Again</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  // playing

  const clearBoard = () => { setSelectedCounts({ H:0,O:0,C:0,N:0,Na:0,Cl:0,Ca:0,S:0 }); setFeedback(null) }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto p-4">
        <button onClick={onBack} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">← Back</button>

        {/* Card */}
        <div className="mt-4 rounded-2xl bg-white shadow-xl border border-gray-200 p-6">
          {/* Header row: title + badges */}
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">Chemistry Lab</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-block rounded-full bg-blue-600 text-white px-3 py-1">Level: {level}</span>
              <span className="inline-block rounded-full bg-green-600 text-white px-3 py-1">Score: {score}</span>
            </div>
          </div>

          {/* Target ribbon */}
          <div className="mt-4 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 p-4">
            <div className="text-sm text-gray-600">Target Compound:</div>
            <div className="text-lg md:text-xl font-bold text-purple-700">{level <= 5 ? compoundName : (bonusGoals[bonusIndex] ? `${bonusGoals[bonusIndex].goal} - ${{
              HCl:'Hydrogen Chloride',
              'O₂':'Oxygen',
              'C₂H₆':'Ethane'
            }[bonusGoals[bonusIndex].goal as 'HCl'|'O₂'|'C₂H₆']}` : 'Mixed Challenge')}</div>
          </div>

          {/* Question line (our design question) */}
          <div className="mt-3 text-gray-700">
            <span className="font-medium">Question:</span> Build the target compound by placing atoms from the palette and creating bonds (Shift+Click between atoms).
          </div>

          {/* Available Elements */}
          <div className="mt-6">
            <div className="font-medium mb-2">Available Elements:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
              {ALL_ATOMS.map(k => {
                const count = selectedCounts[k] || 0
                return (
                  <button
                    key={k}
                    onClick={() => addAtom(k)}
                    onContextMenu={(e) => { e.preventDefault(); removeAtom(k) }}
                    className={`relative rounded-xl p-3 text-center border shadow-sm transition hover:shadow-md ${feedback==='correct' && (activeTargets[k]|| (level>5 && bonusGoals[bonusIndex]?.targets[k])) ? 'ring-2 ring-emerald-400' : ''}`}
                    style={{ backgroundColor: ELEMENT_INFO[k].bg, color: ELEMENT_INFO[k].text, borderColor: 'rgba(0,0,0,0.08)' }}
                  >
                    <div className="text-2xl font-bold tracking-wide">{k}</div>
                    <div className="absolute bottom-2 right-2 text-xs opacity-90">{ELEMENT_INFO[k].atomic}</div>
                    {count > 0 && <div className="absolute top-2 left-2 text-xs font-semibold bg-white/80 text-gray-900 rounded px-1">x{count}</div>}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Your Compound (Formula) */}
          <div className="mt-6">
            <div className="font-medium mb-2">Your Compound:</div>
            <div className="rounded-xl border border-gray-200 bg-gray-100/70 p-6">
              <div className="min-h-[80px] grid place-items-center">
                <div className="text-2xl font-semibold tracking-wide">
                  {renderFormula(selectedCounts)}
                </div>
              </div>
              <div className="mt-3 flex flex-col items-center gap-3">
                <div className="text-sm text-gray-600">Formula: Select elements to create a compound</div>
                <div className="flex items-center gap-3">
                  <button onClick={onCheck} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">Check Compound</button>
                  <button onClick={clearBoard} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800">Clear</button>
                </div>
              </div>
              {feedback === 'wrong' && <div className="mt-2 text-red-600 font-semibold">❌ Incorrect! Try again.</div>}
              {feedback === 'correct' && <div className="mt-2 text-emerald-600 font-semibold">✅ Success!</div>}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MoleculeBuilder
