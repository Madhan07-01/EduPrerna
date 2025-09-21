import React, { useEffect, useMemo, useState } from 'react'

interface EcoSurvivalProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

type Status = 'levelStart' | 'playing' | 'levelComplete' | 'gameOver' | 'gameComplete'

type Task =
  | { kind: 'chain'; prompt: string; chain: string[] } // order matters
  | { kind: 'mcq'; prompt: string; options: string[]; correctIndex: number }

interface LevelSpec {
  id: number
  title: string
  biome: 'forest' | 'desert' | 'ocean' | 'tundra' | 'balance'
  tasks: Task[] // length 3
}

const LEVELS: LevelSpec[] = [
  {
    id: 1,
    title: 'Level 1 – Forest',
    biome: 'forest',
    tasks: [
      { kind: 'chain', prompt: 'Build the forest food chain', chain: ['Tree','Deer','Tiger'] },
      { kind: 'mcq', prompt: 'Identify the producer', options: ['Tree','Deer','Tiger'], correctIndex: 0 },
      { kind: 'mcq', prompt: 'Predator–prey balance: Which is predator?', options: ['Deer','Tiger','Tree'], correctIndex: 1 },
    ]
  },
  {
    id: 2,
    title: 'Level 2 – Desert',
    biome: 'desert',
    tasks: [
      { kind: 'mcq', prompt: 'Best desert adaptation?', options: ['Storing water','Thin fur','Active at noon'], correctIndex: 0 },
      { kind: 'mcq', prompt: 'Pick the right desert plant', options: ['Cactus','Fern','Lily'], correctIndex: 0 },
      { kind: 'mcq', prompt: 'Survive heat', options: ['Be nocturnal','Be active at noon','Wear dark fur'], correctIndex: 0 },
    ]
  },
  {
    id: 3,
    title: 'Level 3 – Ocean',
    biome: 'ocean',
    tasks: [
      { kind: 'chain', prompt: 'Build the ocean food chain', chain: ['Phytoplankton','Fish','Shark'] },
      { kind: 'mcq', prompt: 'Whales stay warm using…', options: ['Blubber','Scales','Feathers'], correctIndex: 0 },
      { kind: 'mcq', prompt: 'Who uses gills for oxygen?', options: ['Fish','Whale','Seal'], correctIndex: 0 },
    ]
  },
  {
    id: 4,
    title: 'Level 4 – Tundra',
    biome: 'tundra',
    tasks: [
      { kind: 'mcq', prompt: 'Right adaptation for cold?', options: ['Polar bear','Camel','Lizard'], correctIndex: 0 },
      { kind: 'mcq', prompt: 'Best camouflage here?', options: ['White fur','Green feathers','Bright skin'], correctIndex: 0 },
      { kind: 'mcq', prompt: 'Common tundra plant', options: ['Moss','Palm','Cactus'], correctIndex: 0 },
    ]
  },
  {
    id: 5,
    title: 'Level 5 – Balance in Nature',
    biome: 'balance',
    tasks: [
      { kind: 'mcq', prompt: 'If plants vanish → ?', options: ['Food chain collapses','Predators increase','No effect'], correctIndex: 0 },
      { kind: 'mcq', prompt: 'Why decomposers matter?', options: ['Recycle nutrients','Eat producers','Stop predators'], correctIndex: 0 },
      { kind: 'mcq', prompt: 'If predators vanish → ?', options: ['Prey overpopulate','Prey vanish','Plants vanish'], correctIndex: 0 },
    ]
  }
]

const biomeBg: Record<LevelSpec['biome'], { from: string; to: string; emoji: string }> = {
  forest: { from: 'from-green-700', to: 'to-emerald-900', emoji: '🌳' },
  desert: { from: 'from-amber-600', to: 'to-orange-800', emoji: '🏜️' },
  ocean: { from: 'from-sky-700', to: 'to-blue-900', emoji: '🌊' },
  tundra: { from: 'from-cyan-700', to: 'to-slate-900', emoji: '❄️' },
  balance: { from: 'from-purple-700', to: 'to-indigo-900', emoji: '⚖️' },
}

const EcoSurvival: React.FC<EcoSurvivalProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1)
  const [status, setStatus] = useState<Status>('levelStart')
  const [health, setHealth] = useState(3)
  const [energy, setEnergy] = useState(0)

  const spec = useMemo(() => LEVELS.find(l => l.id === level)!, [level])
  const bg = biomeBg[spec.biome]

  const [taskIndex, setTaskIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [instant, setInstant] = useState<'correct' | 'wrong' | null>(null)

  // chain builder state: click-to-order (simple mobile-friendly alternative to drag)
  const [chainPick, setChainPick] = useState<number[]>([])

  useEffect(() => {
    setTaskIndex(0); setSelected(null); setInstant(null); setChainPick([])
  }, [level])

  const currentTask = spec.tasks[taskIndex]

  const onSelectOption = (i: number) => {
    if (currentTask.kind === 'mcq') {
      setSelected(i)
      setInstant(i === currentTask.correctIndex ? 'correct' : 'wrong')
    }
  }

  const onPickChainItem = (i: number) => {
    if (currentTask.kind !== 'chain') return
    if (chainPick.includes(i)) {
      // unpick on second tap
      setChainPick(prev => prev.filter(x => x !== i))
    } else {
      setChainPick(prev => [...prev, i])
    }
  }

  const checkTask = () => {
    if (currentTask.kind === 'mcq') {
      if (selected == null) return
      const ok = selected === currentTask.correctIndex
      if (!ok) {
        setHealth(h => { const left = Math.max(0, h - 1); if (left === 0) setStatus('gameOver'); return left })
        setInstant('wrong')
        return
      }
      setInstant('correct')
      setEnergy(e => e + 20)
    } else {
      // chain check
      if (chainPick.length !== currentTask.chain.length) return
      const order = chainPick.map(i => currentTask.chain[i])
      const ok = order.join('>') === currentTask.chain.join('>')
      if (!ok) {
        setHealth(h => { const left = Math.max(0, h - 1); if (left === 0) setStatus('gameOver'); return left })
        return
      }
      setEnergy(e => e + 20)
    }

    // next task or level
    if (taskIndex + 1 >= 3) {
      if (level >= LEVELS.length) setStatus('gameComplete')
      else setStatus('levelComplete')
    } else {
      setTaskIndex(i => i + 1)
      setSelected(null); setInstant(null); setChainPick([])
    }
  }

  const nextLevel = () => { setLevel(l => l + 1); setHealth(3); setStatus('levelStart') }
  const restart = () => { setLevel(1); setHealth(3); setEnergy(0); setStatus('levelStart') }

  // Screens
  if (status === 'levelStart') {
    return (
      <div className={`min-h-screen bg-gradient-to-b ${bg.from} ${bg.to} text-white flex items-center justify-center`}>
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">{bg.emoji}</div>
          <div className="text-5xl font-bold mb-2">{spec.title}</div>
          <div className="text-lg text-white/80">Survive by completing 3 tasks.</div>
          <div className="mt-6 text-white/90 space-x-6"><span>Health: {'❤️'.repeat(health)}</span><span>Energy: {energy}</span></div>
          <button onClick={() => setStatus('playing')} className="mt-6 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg">Start</button>
          <div className="mt-6"><button onClick={onBack} className="text-white/80 underline">Back</button></div>
        </div>
      </div>
    )
  }

  if (status === 'levelComplete') {
    return (
      <div className={`min-h-screen bg-gradient-to-b ${bg.from} ${bg.to} text-white flex items-center justify-center`}>
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md w-full mx-4 border border-white/20">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold mb-2">{spec.title} Survived!</h2>
          <p className="mb-4">Energy: {energy} • Health: {'❤️'.repeat(health)}</p>
          <div className="space-y-3">
            <button onClick={nextLevel} className="w-full bg-emerald-500/80 hover:bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors">➡️ Next Ecosystem</button>
            <button onClick={onBack} className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'gameOver') {
    return (
      <div className={`min-h-screen bg-gradient-to-b ${bg.from} ${bg.to} text-white flex items-center justify-center`}>
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md w-full mx-4 border border-white/20">
          <div className="text-6xl mb-4">💀</div>
          <h2 className="text-3xl font-bold mb-2">You didn’t survive this ecosystem!</h2>
          <p className="mb-4">Final Energy: {energy}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-blue-500/80 hover:bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Retry</button>
            <button onClick={onBack} className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'gameComplete') {
    return (
      <div className={`min-h-screen bg-gradient-to-b ${bg.from} ${bg.to} text-white flex items-center justify-center`}>
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md w-full mx-4 border border-white/20">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold mb-2">🎉 You are an Eco-Survivor!</h2>
          <p className="mb-4">Total Energy: {energy}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-indigo-500/80 hover:bg-indigo-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Play Again</button>
            <button onClick={onBack} className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  // playing
  return (
    <div className={`min-h-screen bg-gradient-to-b ${bg.from} ${bg.to} text-white`}>
      {/* Top bar */}
      <div className="max-w-6xl mx-auto pt-4 px-4 flex items-center justify-between">
        <button onClick={onBack} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20">← Back</button>
        <div className="text-white/90 space-x-6">
          <span>Level: {level}</span>
          <span>Health: {'❤️'.repeat(health)}</span>
          <span>Energy: {energy}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white/10 rounded-2xl border border-white/20 p-4">
          <div className="text-white/90 text-lg font-semibold mb-2">{spec.title} — Task {taskIndex + 1} of 3</div>
          <div className="text-white/80 mb-4">{currentTask.prompt}</div>

          {currentTask.kind === 'mcq' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {currentTask.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => onSelectOption(i)}
                  className={`px-4 py-3 rounded-lg border ${selected===i ? 'bg-indigo-500/30 border-indigo-300' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {currentTask.kind === 'chain' && (
            <div className="flex flex-wrap gap-3">
              {currentTask.chain.map((item, i) => {
                const pickedIdx = chainPick.indexOf(i)
                return (
                  <button
                    key={i}
                    onClick={() => onPickChainItem(i)}
                    className={`px-4 py-3 rounded-lg border relative ${pickedIdx>=0 ? 'bg-emerald-500/30 border-emerald-300' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                  >
                    {item}
                    {pickedIdx>=0 && <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full w-6 h-6 grid place-items-center">{pickedIdx+1}</span>}
                  </button>
                )
              })}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button onClick={checkTask} className="rounded-lg bg-emerald-500/80 hover:bg-emerald-500 text-white px-5 py-2">
              Submit / Check Answer
            </button>
          </div>

          {instant === 'correct' && currentTask.kind==='mcq' && <div className="mt-2 text-emerald-300 font-semibold">✅ Correct!</div>}
          {instant === 'wrong' && currentTask.kind==='mcq' && <div className="mt-2 text-red-300 font-semibold">❌ Wrong!</div>}
        </div>
      </div>
    </div>
  )
}

export default EcoSurvival
