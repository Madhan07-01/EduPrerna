import React, { useEffect, useMemo, useRef, useState } from 'react'

interface CellExplorerProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

type Status = 'levelStart' | 'playing' | 'questionComplete' | 'levelComplete' | 'gameOver' | 'gameComplete'

type Q = { prompt: string; options: string[]; correctIndex: number }

// Basic plant/animal cell diagram placeholders using canvas shapes
const drawCellDiagram = (
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  mode: 'plant' | 'animal',
  highlight?: string
) => {
  // background
  ctx.fillStyle = '#0b1220'
  ctx.fillRect(0, 0, W, H)

  // cell boundary
  ctx.strokeStyle = '#64748b'
  ctx.lineWidth = 3
  if (mode === 'animal') {
    ctx.beginPath(); ctx.ellipse(W/2, H/2, 220, 140, 0, 0, Math.PI*2); ctx.stroke()
  } else {
    ctx.beginPath(); ctx.rect(W/2-230, H/2-150, 460, 300); ctx.stroke()
  }

  // nucleus
  ctx.strokeStyle = highlight==='Nucleus' ? '#10b981' : '#94a3b8'
  ctx.lineWidth = highlight==='Nucleus' ? 5 : 2
  ctx.beginPath(); ctx.ellipse(W/2+40, H/2+10, 60, 45, 0, 0, Math.PI*2); ctx.stroke()

  // mitochondria
  ctx.strokeStyle = highlight==='Mitochondria' ? '#10b981' : '#94a3b8'
  ctx.lineWidth = highlight==='Mitochondria' ? 5 : 2
  ctx.beginPath(); ctx.ellipse(W/2-80, H/2-40, 50, 26, 0, 0, Math.PI*2); ctx.stroke()

  // chloroplast + cell wall + large vacuole for plant
  if (mode === 'plant') {
    // cell wall outer
    ctx.strokeStyle = '#22c55e'
    ctx.lineWidth = 2
    ctx.strokeRect(W/2-240, H/2-160, 480, 320)

    // chloroplast
    ctx.strokeStyle = highlight==='Chloroplast' ? '#10b981' : '#94a3b8'
    ctx.lineWidth = highlight==='Chloroplast' ? 5 : 2
    ctx.beginPath(); ctx.ellipse(W/2-80, H/2+40, 60, 30, 0, 0, Math.PI*2); ctx.stroke()

    // vacuole
    ctx.strokeStyle = highlight==='Large Vacuole' ? '#10b981' : '#94a3b8'
    ctx.lineWidth = highlight==='Large Vacuole' ? 5 : 2
    ctx.beginPath(); ctx.rect(W/2+100, H/2-90, 120, 160); ctx.stroke()
  }

  // labels (subtle)
  ctx.fillStyle = '#94a3b8'
  ctx.font = '12px system-ui'
  ctx.fillText('Cell Membrane', W/2-30, H/2-160)
  ctx.fillText('Nucleus', W/2+30, H/2+70)
  ctx.fillText('Mitochondria', W/2-120, H/2-60)
  if (mode === 'plant') {
    ctx.fillText('Cell Wall', W/2-220, H/2-170)
    ctx.fillText('Chloroplast', W/2-120, H/2+80)
    ctx.fillText('Large Vacuole', W/2+110, H/2+80)
  }
}

// Questions per level
const LEVELS: Array<{
  id: number
  title: string
  type: 'mcq' | 'drag' | 'match'
  mcqs?: Q[]
  drag?: { mode: 'plant' | 'animal'; targets: string[] }[]
  matches?: { left: string; right: string }[]
}> = [
  {
    id: 1,
    title: 'Level 1 – Basic Organelle Match',
    type: 'mcq',
    mcqs: [
      { prompt: 'Which organelle is the control center of the cell?', options: ['Nucleus','Mitochondria','Ribosome'], correctIndex: 0 },
      { prompt: 'Which organelle contains DNA and chromosomes?', options: ['Nucleus','Lysosome','Endoplasmic Reticulum'], correctIndex: 0 },
      { prompt: 'Which part is called the brain of the cell?', options: ['Nucleus','Golgi Body','Vacuole'], correctIndex: 0 },
    ]
  },
  {
    id: 2,
    title: 'Level 2 – Plant vs Animal Cell',
    type: 'mcq',
    mcqs: [
      { prompt: 'Which organelle is found only in plant cells?', options: ['Chloroplast','Mitochondria','Ribosome'], correctIndex: 0 },
      { prompt: 'Which structure provides rigidity to plant cells but is absent in animal cells?', options: ['Cell Wall','Cell Membrane','Vacuole'], correctIndex: 0 },
      { prompt: 'Large central vacuoles are common in:', options: ['Plant cells','Animal cells','Bacteria'], correctIndex: 0 },
    ]
  },
  {
    id: 3,
    title: 'Level 3 – Energy Factory',
    type: 'mcq',
    mcqs: [
      { prompt: 'Which organelle is known as the powerhouse of the cell?', options: ['Mitochondria','Ribosome','Golgi Apparatus'], correctIndex: 0 },
      { prompt: 'Which organelle performs photosynthesis?', options: ['Chloroplast','Vacuole','Nucleus'], correctIndex: 0 },
      { prompt: 'Which organelle helps in protein synthesis?', options: ['Ribosome','Lysosome','Cell Wall'], correctIndex: 0 },
    ]
  },
  {
    id: 4,
    title: 'Level 4 – Drag & Drop Organelle',
    type: 'drag',
    drag: [
      { mode: 'animal', targets: ['Cell Membrane','Nucleus','Mitochondria'] },
      { mode: 'plant', targets: ['Chloroplast','Cell Wall','Large Vacuole'] },
      { mode: 'animal', targets: ['Nucleus','Golgi Body','Ribosome'] },
    ]
  },
  {
    id: 5,
    title: 'Level 5 – Mixed Challenge',
    type: 'match',
    matches: [
      { left: 'Ribosome', right: 'Protein synthesis' },
      { left: 'Chloroplast', right: 'Photosynthesis' },
      { left: 'Vacuole', right: 'Storage' },
      { left: 'Mitochondria', right: 'Powerhouse' },
      { left: 'Nucleus', right: 'Control center' },
      { left: 'Cell Membrane', right: 'Gatekeeper' },
      { left: 'Lysosome', right: 'Digestion' },
      { left: 'Golgi Apparatus', right: 'Packaging' },
      { left: 'Endoplasmic Reticulum', right: 'Transport' },
    ]
  }
]

const CellExplorer: React.FC<CellExplorerProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1)
  const [status, setStatus] = useState<Status>('levelStart')
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)

  const levelSpec = useMemo(() => LEVELS.find(l => l.id === level)!, [level])

  // MCQ state
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [instant, setInstant] = useState<'correct' | 'wrong' | null>(null)

  // Drag-drop state
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [currentDragTargets, setCurrentDragTargets] = useState<string[]>([])
  const [placed, setPlaced] = useState<Record<string, boolean>>({})

  // Match state (level 5)
  const [matchSel, setMatchSel] = useState<Record<string, string>>({})

  useEffect(() => {
    setQIndex(0); setSelected(null); setInstant(null)
    setPlaced({}); setMatchSel({})
    if (levelSpec.type === 'drag') {
      const tgts = levelSpec.drag![qIndex % levelSpec.drag!.length].targets
      setCurrentDragTargets(tgts)
    } else {
      setCurrentDragTargets([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])

  // Redraw cell diagram for both MCQ and Drag levels
  useEffect(() => {
    if (status !== 'playing') return
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = 900, H = 520
    canvas.width = W; canvas.height = H

    if (levelSpec.type === 'drag') {
      const spec = levelSpec.drag![qIndex % levelSpec.drag!.length]
      const hl = Object.entries(placed).find(([k,v]) => v)?.[0]
      drawCellDiagram(ctx, W, H, spec.mode, hl as any)
      return
    }

    if (levelSpec.type === 'mcq') {
      const q = levelSpec.mcqs![qIndex]
      const selectedLabel = selected != null ? q.options[selected] : undefined
      const correctLabel = q.options[q.correctIndex]
      const highlight = instant === 'correct' ? correctLabel : selectedLabel
      const plantOnly = ['Chloroplast','Cell Wall','Large Vacuole']
      const mode: 'plant' | 'animal' = plantOnly.includes(highlight || correctLabel) ? 'plant' : 'animal'
      drawCellDiagram(ctx, W, H, mode, highlight as any)
      return
    }

    // match level – neutral diagram (animal)
    drawCellDiagram(ctx, W, H, 'animal')
  }, [levelSpec, status, placed, qIndex, selected, instant])

  const handleSubmit = () => {
    if (levelSpec.type === 'mcq') {
      if (selected == null) return
      const correct = selected === levelSpec.mcqs![qIndex].correctIndex
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

    if (levelSpec.type === 'drag') {
      const spec = levelSpec.drag![qIndex % levelSpec.drag!.length]
      const ok = spec.targets.every(t => placed[t])
      if (!ok) {
        setLives(h => { const left = Math.max(0, h - 1); if (left === 0) setStatus('gameOver'); return left })
        return
      }
      setScore(s => s + 20)
      if (qIndex + 1 >= 3) {
        if (level >= LEVELS.length) setStatus('gameComplete')
        else setStatus('levelComplete')
      } else {
        setQIndex(i => i + 1); setPlaced({})
      }
      return
    }

    if (levelSpec.type === 'match') {
      // three mini-matches per question group
      const groups = [
        ['Ribosome','Chloroplast','Vacuole'],
        ['Mitochondria','Nucleus','Cell Membrane'],
        ['Lysosome','Golgi Apparatus','Endoplasmic Reticulum']
      ]
      const need: Record<string,string> = {
        Ribosome: 'Protein synthesis',
        Chloroplast: 'Photosynthesis',
        Vacuole: 'Storage',
        Mitochondria: 'Powerhouse',
        Nucleus: 'Control center',
        'Cell Membrane': 'Gatekeeper',
        Lysosome: 'Digestion',
        'Golgi Apparatus': 'Packaging',
        'Endoplasmic Reticulum': 'Transport'
      }
      const ok = groups[qIndex].every(left => matchSel[left] === need[left])
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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">🧬</div>
          <div className="text-5xl font-bold mb-2">{levelSpec.title}</div>
          <div className="text-lg text-slate-300">Answer 3 questions to complete this level.</div>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🎉 You are a Cell Explorer!</h2>
          <p className="text-gray-600 mb-4">Total Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Play Again</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  // playing UI
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
        {/* Center: cell diagram */}
        <div className="col-span-12 md:col-span-7">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-3 h-[560px] flex flex-col">
            <div className="text-slate-300 mb-2">Cell Diagram</div>
            <canvas ref={canvasRef} className="flex-1 rounded-lg border border-slate-700" />
            {levelSpec.type === 'drag' && (
              <div className="mt-3 text-xs text-slate-400">Drag items into the diagram by clicking them below; click again to toggle placed ✓</div>
            )}
          </div>
        </div>

        {/* Right: question panel */}
        <div className="col-span-12 md:col-span-5">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4 h-[560px] flex flex-col">
            <div className="text-slate-200 font-semibold mb-2">{levelSpec.title}</div>
            {levelSpec.type === 'mcq' && (
              <>
                <div className="text-slate-300 mb-4 text-sm leading-relaxed">{levelSpec.mcqs![qIndex].prompt}</div>
                <div className="grid grid-cols-1 gap-2">
                  {levelSpec.mcqs![qIndex].options.map((opt, i) => (
                    <button key={i} onClick={() => { setSelected(i); setInstant(i === levelSpec.mcqs![qIndex].correctIndex ? 'correct' : 'wrong') }} className={`text-left px-3 py-3 rounded-lg border ${selected===i ? 'bg-indigo-600/30 border-indigo-500' : 'bg-slate-900/40 border-slate-700 hover:bg-slate-900/60'}`}>
                      {String.fromCharCode(65 + i)}. {opt}
                    </button>
                  ))}
                </div>
                {instant === 'correct' && <div className="mt-3 text-emerald-400 font-semibold">✅ Correct</div>}
                {instant === 'wrong' && <div className="mt-3 text-red-400 font-semibold">❌ Wrong</div>}
              </>
            )}

            {levelSpec.type === 'drag' && (
              <>
                <div className="text-slate-300 mb-2 text-sm">Place the following organelles:</div>
                <div className="flex flex-wrap gap-2">
                  {currentDragTargets.map(t => (
                    <button key={t} onClick={() => setPlaced(p => ({ ...p, [t]: !p[t] }))} className={`px-3 py-2 rounded-lg border text-sm ${placed[t] ? 'bg-emerald-600/30 border-emerald-500' : 'bg-slate-900/40 border-slate-700 hover:bg-slate-900/60'}`}>
                      {placed[t] ? '✓ ' : ''}{t}
                    </button>
                  ))}
                </div>
              </>
            )}

            {levelSpec.type === 'match' && (
              <>
                <div className="text-slate-300 mb-2 text-sm">Match organelles to functions:</div>
                {['Ribosome','Chloroplast','Vacuole','Mitochondria','Nucleus','Cell Membrane','Lysosome','Golgi Apparatus','Endoplasmic Reticulum'].slice(qIndex*3, qIndex*3+3).map(left => (
                  <div key={left} className="grid grid-cols-2 gap-2 items-center mb-2">
                    <div className="text-slate-200 text-sm">{left} →</div>
                    <select value={matchSel[left] || ''} onChange={e => setMatchSel(s => ({ ...s, [left]: e.target.value }))} className="bg-slate-900/50 border border-slate-700 rounded px-2 py-2">
                      <option value="">Select</option>
                      {['Protein synthesis','Photosynthesis','Storage','Powerhouse','Control center','Gatekeeper','Digestion','Packaging','Transport'].map(r => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </>
            )}

            <div className="mt-auto pt-4 flex justify-end">
              <button onClick={handleSubmit} className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2">
                {levelSpec.type === 'mcq' ? 'Submit Answer' : levelSpec.type === 'drag' ? 'Check Placement' : 'Submit Matches'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CellExplorer
