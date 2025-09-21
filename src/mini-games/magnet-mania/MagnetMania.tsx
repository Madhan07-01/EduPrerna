import React, { useEffect, useMemo, useRef, useState } from 'react'

interface MagnetManiaProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

type Status = 'levelStart' | 'playing' | 'levelComplete' | 'gameOver' | 'gameComplete'

interface LevelSpec {
  id: number
  title: string
  prompt: string
  options: string[]
  correctIndex: number
  sim: 'poles' | 'materials' | 'compass' | 'electromagnet' | 'mixed'
}

const LEVELS: LevelSpec[] = [
  {
    id: 1,
    title: 'Level 1 – Poles Basics',
    prompt: 'Which poles attract each other?',
    options: ['N - N', 'S - S', 'N - S'],
    correctIndex: 2,
    sim: 'poles'
  },
  {
    id: 2,
    title: 'Level 2 – Magnetic vs Non-Magnetic',
    prompt: 'Which object will a magnet attract?',
    options: ['Plastic toy', 'Iron nail', 'Wooden block'],
    correctIndex: 1,
    sim: 'materials'
  },
  {
    id: 3,
    title: 'Level 3 – Compass Directions',
    prompt: 'A compass needle points _____.',
    options: ['North–South', 'East–West', 'Random'],
    correctIndex: 0,
    sim: 'compass'
  },
  {
    id: 4,
    title: 'Level 4 – Electromagnet',
    prompt: 'What increases the strength of an electromagnet?',
    options: ['More turns of wire', 'Wooden core', 'Less current'],
    correctIndex: 0,
    sim: 'electromagnet'
  },
  {
    id: 5,
    title: 'Level 5 – Mixed Challenge',
    prompt: 'Which setup will attract pins?',
    options: ['Magnet with proper poles exposed', 'Magnet covered in wood', 'Non-magnetic material'],
    correctIndex: 0,
    sim: 'mixed'
  }
]

const MagnetMania: React.FC<MagnetManiaProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState<Status>('levelStart')

  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const levelSpec = useMemo(() => LEVELS.find(l => l.id === level)!, [level])

  useEffect(() => {
    setSelected(null)
    setFeedback(null)
  }, [level])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  const drawScene = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
    // background
    ctx.fillStyle = '#0b1220' // dark lab
    ctx.fillRect(0, 0, W, H)
    // table/floor
    ctx.fillStyle = '#1f2937'
    ctx.fillRect(0, H - 40, W, 40)
  }

  // animations for each sim
  const simPoles = (onDone: () => void, correct: boolean) => {
    const c = canvasRef.current; if (!c) return onDone()
    const ctx = c.getContext('2d')!
    const W = 900, H = 520
    c.width = W; c.height = H

    let xN = 180, y = 200
    let xS = 720

    const step = () => {
      drawScene(ctx, W, H)
      // draw bar magnets
      ctx.fillStyle = '#ef4444' // N red
      ctx.fillRect(xN - 60, y - 20, 120, 40)
      ctx.fillStyle = '#3b82f6' // S blue
      ctx.fillRect(xS - 60, y - 20, 120, 40)
      ctx.fillStyle = '#fff'; ctx.font = '16px system-ui'
      ctx.fillText('N', xN - 40, y + 5)
      ctx.fillText('S', xS + 30, y + 5)

      if (correct) {
        // attraction: move together
        if (xS - xN > 160) { xN += 2.5; xS -= 2.5; rafRef.current = requestAnimationFrame(step) }
        else onDone()
      } else {
        // repulsion: bounce away
        if (xS < 820) { xN -= 2.5; xS += 2.5; rafRef.current = requestAnimationFrame(step) }
        else onDone()
      }
    }
    step()
  }

  const simMaterials = (onDone: () => void, iron: boolean) => {
    const c = canvasRef.current; if (!c) return onDone()
    const ctx = c.getContext('2d')!
    const W = 900, H = 520
    c.width = W; c.height = H

    let mx = 200, my = 240
    let ox = 680, oy = 240

    const step = () => {
      drawScene(ctx, W, H)
      // magnet
      ctx.fillStyle = '#ef4444'
      ctx.fillRect(mx - 60, my - 20, 120, 40)
      ctx.fillStyle = '#fff'; ctx.fillText('N', mx - 40, my + 5)
      // object (iron or not)
      ctx.fillStyle = iron ? '#94a3b8' : '#10b981'
      ctx.beginPath(); ctx.arc(ox, oy, 16, 0, Math.PI * 2); ctx.fill()

      if (iron) {
        // attraction
        if (ox - mx > 160) { ox -= 3; rafRef.current = requestAnimationFrame(step) } else onDone()
      } else {
        // no effect
        onDone()
      }
    }
    step()
  }

  const simCompass = (onDone: () => void, correct: boolean) => {
    const c = canvasRef.current; if (!c) return onDone()
    const ctx = c.getContext('2d')!
    const W = 900, H = 520
    c.width = W; c.height = H

    let angle = -Math.PI / 2 // pointing north

    const step = () => {
      drawScene(ctx, W, H)
      // compass outer
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(450, 240, 60, 0, Math.PI * 2); ctx.stroke()
      // needle
      ctx.save()
      ctx.translate(450, 240)
      ctx.rotate(angle)
      ctx.fillStyle = '#ef4444'
      ctx.beginPath(); ctx.moveTo(0, -48); ctx.lineTo(6, 0); ctx.lineTo(-6, 0); ctx.closePath(); ctx.fill()
      ctx.fillStyle = '#3b82f6'
      ctx.beginPath(); ctx.moveTo(0, 48); ctx.lineTo(6, 0); ctx.lineTo(-6, 0); ctx.closePath(); ctx.fill()
      ctx.restore()

      // animation
      const target = -Math.PI / 2
      angle += (target - angle) * 0.1
      if (Math.abs(target - angle) > 0.01) rafRef.current = requestAnimationFrame(step)
      else onDone()
    }
    step()
  }

  const simElectromagnet = (onDone: () => void, stronger: boolean) => {
    const c = canvasRef.current; if (!c) return onDone()
    const ctx = c.getContext('2d')!
    const W = 900, H = 520
    c.width = W; c.height = H

    let pinsY = 320

    const step = () => {
      drawScene(ctx, W, H)
      // coil on nail
      ctx.fillStyle = '#64748b'
      ctx.fillRect(260, 210, 240, 20) // nail
      // coil turns
      ctx.strokeStyle = stronger ? '#f59e0b' : '#94a3b8'
      ctx.lineWidth = 6
      for (let i = 0; i < (stronger ? 10 : 5); i++) {
        const x = 280 + i * 20
        ctx.beginPath(); ctx.arc(x, 220, 16, 0, Math.PI * 2); ctx.stroke()
      }
      // pins
      ctx.fillStyle = '#cbd5e1'
      for (let i = 0; i < 6; i++) {
        ctx.fillRect(560 + i * 18, pinsY, 12, 6)
      }

      if (stronger) {
        // pull pins upward gradually
        if (pinsY > 260) { pinsY -= 2; rafRef.current = requestAnimationFrame(step) } else onDone()
      } else {
        // weak / wrong — no motion
        onDone()
      }
    }
    step()
  }

  const simMixed = (onDone: () => void, correct: boolean) => {
    const c = canvasRef.current; if (!c) return onDone()
    const ctx = c.getContext('2d')!
    const W = 900, H = 520
    c.width = W; c.height = H

    let pinsY = 320
    let magX = 220

    const step = () => {
      drawScene(ctx, W, H)
      // magnet
      ctx.fillStyle = '#ef4444'; ctx.fillRect(magX - 60, 220, 120, 30)
      ctx.fillStyle = '#fff'; ctx.fillText('N', magX - 40, 240)
      // pins on right
      ctx.fillStyle = '#cbd5e1'
      for (let i = 0; i < 8; i++) ctx.fillRect(600 + i * 14, pinsY, 10, 6)

      if (correct) {
        // attraction: move magnet closer & pins slightly up
        if (magX < 420) { magX += 3; pinsY -= 0.6; rafRef.current = requestAnimationFrame(step) } else onDone()
      } else {
        // wrong: no effect
        onDone()
      }
    }
    step()
  }

  const runSimulation = (correct: boolean, onDone: () => void) => {
    switch (levelSpec.sim) {
      case 'poles': return simPoles(onDone, correct)
      case 'materials': return simMaterials(onDone, correct)
      case 'compass': return simCompass(onDone, correct)
      case 'electromagnet': return simElectromagnet(onDone, correct)
      case 'mixed': return simMixed(onDone, correct)
    }
  }

  const onLaunch = () => {
    if (selected == null) return
    const correct = selected === levelSpec.correctIndex
    if (!correct) {
      setFeedback('wrong')
      setLives(h => {
        const left = Math.max(0, h - 1)
        if (left === 0) setStatus('gameOver')
        return left
      })
      // play a quick repulsion animation for poles level even on wrong
      runSimulation(false, () => {})
      return
    }
    setFeedback('correct')
    runSimulation(true, () => {
      setScore(s => s + 20)
      if (level >= LEVELS.length) setStatus('gameComplete')
      else setStatus('levelComplete')
    })
  }

  const nextLevel = () => { setLevel(l => l + 1); setLives(3); setStatus('levelStart') }
  const restart = () => { setLevel(1); setLives(3); setScore(0); setStatus('levelStart') }

  // Screens
  if (status === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">🧲</div>
          <div className="text-5xl font-bold mb-2">{levelSpec.title}</div>
          <div className="text-lg text-slate-300">{levelSpec.prompt}</div>
          <div className="mt-6 text-slate-300 space-x-6"><span>Lives: {'❤️'.repeat(lives)}</span><span>Score: {score}</span></div>
          <button onClick={() => setStatus('playing')} className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">Start</button>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🎉 You mastered Magnetism!</h2>
          <p className="text-gray-600 mb-4">Total Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Play Again</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  // playing
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
        {/* Simulation area */}
        <div className="col-span-12 md:col-span-8">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-3 h-[560px] flex flex-col">
            <div className="text-slate-300 mb-2">Puzzle Simulation</div>
            <canvas ref={canvasRef} className="flex-1 rounded-lg border border-slate-700" />
            <div className="mt-3 flex justify-end">
              <button onClick={onLaunch} className={`px-4 py-2 rounded-lg text-white ${selected==null ? 'bg-slate-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                Test / Animate 🧲
              </button>
            </div>
          </div>
        </div>

        {/* Question area */}
        <div className="col-span-12 md:col-span-4">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4 h-[560px] flex flex-col">
            <div className="text-slate-200 font-semibold mb-2">{levelSpec.title}</div>
            <div className="text-slate-300 mb-4 text-sm leading-relaxed">{levelSpec.prompt}</div>
            <div className="grid grid-cols-1 gap-2">
              {levelSpec.options.map((opt, i) => (
                <button key={i} onClick={() => setSelected(i)} className={`text-left px-3 py-3 rounded-lg border ${selected===i ? 'bg-indigo-600/30 border-indigo-500' : 'bg-slate-900/40 border-slate-700 hover:bg-slate-900/60'}`}>
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              ))}
            </div>
            {feedback === 'correct' && <div className="mt-3 text-emerald-400 font-semibold">✅ Correct!</div>}
            {feedback === 'wrong' && <div className="mt-3 text-red-400 font-semibold">❌ Wrong! Try again…</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MagnetMania
