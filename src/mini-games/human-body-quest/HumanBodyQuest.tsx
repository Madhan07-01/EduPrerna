import React, { useEffect, useMemo, useState } from 'react'

interface HumanBodyQuestProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

type Status = 'levelStart' | 'playing' | 'levelComplete' | 'gameOver' | 'gameComplete'

type Q = { prompt: string; options: string[]; correctIndex: number }

type LevelSpec =
  | { id: 1 | 2 | 3 | 4; title: string; type: 'mcq'; mcqs: Q[] }
  | { id: 5; title: string; type: 'match'; groups: Array<Array<{ left: string; right: string }>> }

const LEVELS: LevelSpec[] = [
  {
    id: 1, type: 'mcq', title: 'Level 1 – Organs & Functions',
    mcqs: [
      { prompt: 'Which organ pumps blood throughout the body?', options: ['Heart','Lungs','Kidneys'], correctIndex: 0 },
      { prompt: 'Which organ helps us breathe in oxygen?', options: ['Lungs','Brain','Stomach'], correctIndex: 0 },
      { prompt: 'Which organ filters waste from blood?', options: ['Kidneys','Liver','Pancreas'], correctIndex: 0 }
    ]
  },
  {
    id: 2, type: 'mcq', title: 'Level 2 – Digestive System',
    mcqs: [
      { prompt: 'Where does most nutrient absorption occur?', options: ['Small Intestine','Stomach','Large Intestine'], correctIndex: 0 },
      { prompt: 'Which organ produces bile for digestion?', options: ['Liver','Pancreas','Gallbladder'], correctIndex: 0 },
      { prompt: 'Which organ stores bile?', options: ['Gallbladder','Small Intestine','Esophagus'], correctIndex: 0 }
    ]
  },
  {
    id: 3, type: 'mcq', title: 'Level 3 – Skeletal & Muscular System',
    mcqs: [
      { prompt: 'Which is the largest bone in the human body?', options: ['Femur','Tibia','Humerus'], correctIndex: 0 },
      { prompt: 'Which joint connects the thigh bone to the hip?', options: ['Ball-and-socket joint','Hinge joint','Pivot joint'], correctIndex: 0 },
      { prompt: 'Which muscle is responsible for breathing?', options: ['Diaphragm','Biceps','Quadriceps'], correctIndex: 0 }
    ]
  },
  {
    id: 4, type: 'mcq', title: 'Level 4 – Nervous System',
    mcqs: [
      { prompt: 'Which organ controls body activities?', options: ['Brain','Spinal Cord','Heart'], correctIndex: 0 },
      { prompt: 'Which part of the nervous system runs down the spine?', options: ['Spinal Cord','Neuron','Brainstem'], correctIndex: 0 },
      { prompt: 'Which type of cell carries messages in the nervous system?', options: ['Neuron','Muscle cell','Skin cell'], correctIndex: 0 }
    ]
  },
  {
    id: 5, type: 'match', title: 'Level 5 – Mixed Challenge',
    groups: [
      [ { left: 'Heart', right: 'Circulatory' }, { left: 'Stomach', right: 'Digestive' }, { left: 'Brain', right: 'Nervous' } ],
      [ { left: 'Kidneys', right: 'Excretory' }, { left: 'Lungs', right: 'Respiratory' }, { left: 'Bones', right: 'Skeletal' } ],
      [ { left: 'Muscles', right: 'Movement' }, { left: 'Skin', right: 'Protection' }, { left: 'Pancreas', right: 'Hormone regulation' } ]
    ]
  }
]

const HumanBodyQuest: React.FC<HumanBodyQuestProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1)
  const [status, setStatus] = useState<Status>('levelStart')
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)

  const levelSpec = useMemo(() => LEVELS.find(l => l.id === level)!, [level])

  // MCQ state
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [instant, setInstant] = useState<'correct' | 'wrong' | null>(null)

  // Match state
  const [matchSel, setMatchSel] = useState<Record<string, string>>({})

  useEffect(() => {
    setQIndex(0); setSelected(null); setInstant(null); setMatchSel({})
  }, [level])

  const handleSubmit = () => {
    if (levelSpec.type === 'mcq') {
      if (selected == null) return
      const correct = selected === levelSpec.mcqs[qIndex].correctIndex
      if (!correct) {
        setInstant('wrong')
        setLives(h => { const left = Math.max(0, h - 1); if (left === 0) setStatus('gameOver'); return left })
        return
      }
      setInstant('correct')
      setScore(s => s + 20)
      if (qIndex + 1 >= 3) {
        if (level >= LEVELS.length) setStatus('gameComplete')
        else setStatus('levelComplete')
      } else {
        setQIndex(i => i + 1); setSelected(null); setInstant(null)
      }
      return
    }

    if (levelSpec.type === 'match') {
      const group = levelSpec.groups[qIndex]
      const ok = group.every(pair => matchSel[pair.left] === pair.right)
      if (!ok) {
        setLives(h => { const left = Math.max(0, h - 1); if (left === 0) setStatus('gameOver'); return left })
        return
      }
      setScore(s => s + 20)
      if (qIndex + 1 >= 3) setStatus('gameComplete')
      else { setQIndex(i => i + 1); setMatchSel({}) }
    }
  }

  const nextLevel = () => { setLevel(l => l + 1); setLives(3); setStatus('levelStart') }
  const restart = () => { setLevel(1); setLives(3); setScore(0); setStatus('levelStart') }

  // Screens
  if (status === 'levelStart') {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-10 text-center max-w-2xl w-full mx-4">
          <div className="text-6xl mb-2">🫀</div>
          <div className="text-4xl font-bold mb-1">Human Body Quest</div>
          <div className="text-lg text-gray-600 mb-6">{levelSpec.title}</div>
          <div className="mt-2 text-gray-600 space-x-6"><span>Lives: {'❤️'.repeat(lives)}</span><span>Score: {score}</span></div>
          <button onClick={() => setStatus('playing')} className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">Start</button>
          <div className="mt-6"><button onClick={onBack} className="text-gray-600 underline">Back</button></div>
        </div>
      </div>
    )
  }

  if (status === 'levelComplete') {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl border border-emerald-200">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Level {level} Complete!</h2>
          <p className="text-gray-600 mb-4">Score: {score} • Lives: {'❤️'.repeat(lives)}</p>
          <div className="space-y-3">
            <button onClick={nextLevel} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">➡️ Next Level</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'gameOver') {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl border border-red-200">
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
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl border border-yellow-200">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🎉 You completed Human Body Quest!</h2>
          <p className="text-gray-600 mb-4">Total Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Play Again</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  // playing: full-width Q&A panel
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">← Back</button>
          <div className="text-gray-700 space-x-6 text-sm">
            <span>Level: {level}</span>
            <span>Lives: {'❤️'.repeat(lives)}</span>
            <span>Score: {score}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-xl border border-gray-200 p-6">
          <div className="text-lg font-semibold mb-2">{levelSpec.title}</div>

          {levelSpec.type === 'mcq' && (
            <>
              <div className="text-gray-700 mb-4">{levelSpec.mcqs[qIndex].prompt}</div>
              <div className="grid grid-cols-1 gap-2">
                {levelSpec.mcqs[qIndex].options.map((opt, i) => (
                  <button key={i} onClick={() => { setSelected(i); setInstant(i === levelSpec.mcqs[qIndex].correctIndex ? 'correct' : 'wrong') }} className={`text-left px-4 py-3 rounded-lg border ${selected===i ? 'bg-indigo-50 border-indigo-400' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                ))}
              </div>
              {instant === 'correct' && <div className="mt-3 text-emerald-600 font-semibold">✅ Correct</div>}
              {instant === 'wrong' && <div className="mt-3 text-red-600 font-semibold">❌ Wrong</div>}
            </>
          )}

          {levelSpec.type === 'match' && (
            <>
              <div className="text-gray-700 mb-4">Match the following:</div>
              {levelSpec.groups[qIndex].map(pair => (
                <div key={pair.left} className="grid grid-cols-2 gap-3 items-center mb-2">
                  <div className="text-gray-800">{pair.left} →</div>
                  <select value={matchSel[pair.left] || ''} onChange={e => setMatchSel(s => ({ ...s, [pair.left]: e.target.value }))} className="bg-white border border-gray-300 rounded px-2 py-2">
                    <option value="">Select</option>
                    {Array.from(new Set(levelSpec.groups.flat().map(x => x.right))).map((right, j) => (
                      <option key={j}>{right}</option>
                    ))}
                  </select>
                </div>
              ))}
            </>
          )}

          <div className="mt-6 flex justify-end">
            <button onClick={handleSubmit} className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2">
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HumanBodyQuest
