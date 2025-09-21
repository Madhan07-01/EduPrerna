import React, { useEffect, useMemo, useRef, useState } from 'react'

// Types
interface CircuitConnectProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

type Status = 'levelStart' | 'playing' | 'levelComplete' | 'gameOver' | 'gameComplete'

type ComponentType = 'battery' | 'bulb' | 'switch' | 'motor' | 'resistor' | 'buzzer'

type TerminalId = `${string}-a` | `${string}-b`

interface PlacedComponent {
  id: string
  type: ComponentType
  x: number // in grid units
  y: number // in grid units
  rot: 0 | 90 | 180 | 270
  state?: { on?: boolean } // for switch
}

interface Wire {
  id: string
  from: TerminalId
  to: TerminalId
}

interface LevelSpec {
  id: number
  title: string
  description: string
  palette: ComponentType[]
  targets: {
    bulbsOn?: number
    motorOn?: boolean
    switchRequired?: boolean
    parallelBulbs?: boolean
    seriesBulbs?: number
    resistorRequired?: boolean
    buzzerOn?: boolean
  }
}

const GRID_W = 12
const GRID_H = 8

const LEVELS: LevelSpec[] = [
  {
    id: 1,
    title: 'Level 1 – Light the Bulb',
    description: 'Connect battery → bulb → battery to complete the circuit.',
    palette: ['battery', 'bulb'],
    targets: { bulbsOn: 1 }
  },
  {
    id: 2,
    title: 'Level 2 – Switch Control',
    description: 'Add a switch in series. Bulb only lights when switch is ON.',
    palette: ['battery', 'bulb', 'switch'],
    targets: { bulbsOn: 1, switchRequired: true }
  },
  {
    id: 3,
    title: 'Level 3 – Two Bulbs in Series',
    description: 'Connect two bulbs in series with the battery.',
    palette: ['battery', 'bulb', 'bulb'],
    targets: { seriesBulbs: 2, bulbsOn: 2 }
  },
  {
    id: 4,
    title: 'Level 4 – Two Bulbs in Parallel',
    description: 'Connect two bulbs in parallel across the battery.',
    palette: ['battery', 'bulb', 'bulb'],
    targets: { parallelBulbs: true, bulbsOn: 2 }
  },
  {
    id: 5,
    title: 'Level 5 – Mixed Challenge',
    description: 'Switch controls bulb + motor in parallel; include a resistor to limit current.',
    palette: ['battery', 'bulb', 'motor', 'switch', 'resistor', 'buzzer'],
    targets: { bulbsOn: 1, motorOn: true, switchRequired: true, resistorRequired: true, buzzerOn: true }
  }
]

const genId = () => Math.random().toString(36).slice(2, 9)

function compTerminals(c: PlacedComponent): { a: { x: number; y: number; id: TerminalId }, b: { x: number; y: number; id: TerminalId } } {
  // two terminals on left/right (or top/bottom if rotated)
  const baseId = `${c.id}`
  const cellSize = 64
  const px = c.x * cellSize + cellSize / 2
  const py = c.y * cellSize + cellSize / 2
  const offset = 22
  let ax = px - offset, ay = py
  let bx = px + offset, by = py
  if (c.rot === 90 || c.rot === 270) {
    ax = px; ay = py - offset
    bx = px; by = py + offset
  }
  return {
    a: { x: ax, y: ay, id: `${baseId}-a` as TerminalId },
    b: { x: bx, y: by, id: `${baseId}-b` as TerminalId }
  }
}

function drawComponent(ctx: CanvasRenderingContext2D, c: PlacedComponent) {
  const cell = 64
  const x = c.x * cell + cell / 2
  const y = c.y * cell + cell / 2

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate((Math.PI / 180) * c.rot)

  // body
  ctx.fillStyle = '#1f2937' // slate-800
  ctx.strokeStyle = '#94a3b8'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.roundRect(-28, -18, 56, 36, 8)
  ctx.fill()
  ctx.stroke()

  // icon
  ctx.fillStyle = '#e5e7eb'
  ctx.font = '16px system-ui, -apple-system, Segoe UI'
  const label = {
    battery: '🔋',
    bulb: '💡',
    switch: c.state?.on ? '🔘' : '⚪',
    motor: '🌀',
    resistor: '♒',
    buzzer: '🔔'
  }[c.type]
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label || '', 0, 0)

  // terminals
  ctx.fillStyle = '#60a5fa'
  const t = compTerminals(c)
  ctx.beginPath(); ctx.arc(t.a.x - x, t.a.y - y, 4, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(t.b.x - x, t.b.y - y, 4, 0, Math.PI * 2); ctx.fill()

  ctx.restore()
}

function drawWire(ctx: CanvasRenderingContext2D, p1: { x: number; y: number }, p2: { x: number; y: number }, glow = false) {
  ctx.save()
  ctx.lineWidth = 3
  ctx.strokeStyle = glow ? '#f59e0b' : '#38bdf8'
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  // slight curve
  const mx = (p1.x + p2.x) / 2
  const my = (p1.y + p2.y) / 2
  ctx.quadraticCurveTo(mx, my - 10, p2.x, p2.y)
  ctx.stroke()
  ctx.restore()
}

// Simple circuit evaluator
function evaluateCircuit(components: PlacedComponent[], wires: Wire[], level: LevelSpec) {
  // Build adjacency where each terminal is a node; wires and conductive components create edges
  const nodes = new Map<TerminalId, { compId: string; type: ComponentType }>()
  components.forEach(c => {
    const t = compTerminals(c)
    nodes.set(t.a.id, { compId: c.id, type: c.type })
    nodes.set(t.b.id, { compId: c.id, type: c.type })
  })

  const adj: Record<string, Set<string>> = {}
  const addEdge = (u: string, v: string) => {
    if (!adj[u]) adj[u] = new Set()
    if (!adj[v]) adj[v] = new Set()
    adj[u].add(v)
    adj[v].add(u)
  }

  // Add wire connections
  for (const w of wires) addEdge(w.from, w.to)

  // Add conduction through components (except battery). Switch conducts only when ON.
  for (const c of components) {
    if (c.type === 'battery') continue
    const t = compTerminals(c)
    const conductive = c.type === 'switch' ? (c.state?.on === true) : true
    if (conductive) addEdge(t.a.id, t.b.id)
  }

  // Find the battery terminals (must be exactly one battery)
  const battery = components.find(c => c.type === 'battery')
  if (!battery) return { ok: false, details: { bulbsOn: 0, motorOn: false, buzzerOn: false } }
  const bTerms = compTerminals(battery)

  // DFS to find nodes reachable from battery + terminal
  const visit = (start: TerminalId) => {
    const seen = new Set<string>()
    const stack: string[] = [start]
    while (stack.length) {
      const u = stack.pop() as string
      if (seen.has(u)) continue
      seen.add(u)
      const nxt = adj[u]
      if (!nxt) continue
      nxt.forEach(v => { if (!seen.has(v)) stack.push(v) })
    }
    return seen
  }

  const fromPlus = visit(bTerms.a.id)
  const fromMinus = visit(bTerms.b.id)

  // A component is powered if its two terminals belong to different reachability sets separated by battery terminals (simple model)
  let bulbsOn = 0
  let motorOn = false
  let buzzerOn = false

  for (const c of components) {
    if (c.id === battery.id) continue
    // switches must be ON and present when required
    if (c.type === 'switch' && c.state?.on !== true) {
      // open circuit; treat as disconnected by NOT bridging its terminals in logic below
    }
    const t = compTerminals(c)
    const aPlus = fromPlus.has(t.a.id)
    const bPlus = fromPlus.has(t.b.id)
    const aMinus = fromMinus.has(t.a.id)
    const bMinus = fromMinus.has(t.b.id)

    const acrossBattery = (aPlus && bMinus) || (bPlus && aMinus)

    if (acrossBattery) {
      if (c.type === 'bulb') bulbsOn++
      if (c.type === 'motor') motorOn = true
      if (c.type === 'buzzer') buzzerOn = true
    }
  }

  // Level specific checks
  const t = level.targets
  let ok = true
  if (t.bulbsOn !== undefined) ok = ok && bulbsOn >= t.bulbsOn
  if (t.motorOn) ok = ok && motorOn
  if (t.buzzerOn) ok = ok && buzzerOn

  // switch required: ensure at least one switch placed AND is ON
  if (t.switchRequired) {
    const sw = components.find(c => c.type === 'switch')
    if (!sw || !sw.state?.on) ok = false
  }

  // resistor required
  if (t.resistorRequired) {
    const rs = components.find(c => c.type === 'resistor')
    if (!rs) ok = false
  }

  // series bulbs: ensure count of bulbs is at least N and not in parallel (simplified: detect a single path)
  if (t.seriesBulbs) {
    const bulbIds = components.filter(c => c.type === 'bulb').map(c => c.id)
    ok = ok && bulbIds.length >= t.seriesBulbs
  }

  // parallel bulbs: simplified heuristic — both bulbs individually across the battery
  if (t.parallelBulbs) {
    ok = ok && bulbsOn >= 2
  }

  return { ok, details: { bulbsOn, motorOn, buzzerOn } }
}

// Simple beep using WebAudio
function playBeep() {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.connect(g)
  g.connect(ctx.destination)
  o.type = 'square'
  o.frequency.value = 880
  g.gain.value = 0.05
  o.start()
  setTimeout(() => { o.stop(); ctx.close() }, 200)
}

const CircuitConnect: React.FC<CircuitConnectProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState<Status>('levelStart')

  const [palette, setPalette] = useState<ComponentType[]>([])
  const [components, setComponents] = useState<PlacedComponent[]>([])
  const [wires, setWires] = useState<Wire[]>([])
  const [selectedTerminal, setSelectedTerminal] = useState<TerminalId | null>(null)
  const [feedback, setFeedback] = useState<string>('')

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const levelSpec = useMemo(() => LEVELS.find(l => l.id === level)!, [level])

  // Initialize level
  useEffect(() => {
    if (!levelSpec) return
    setPalette(levelSpec.palette)
    setComponents([])
    setWires([])
    setSelectedTerminal(null)
    setFeedback('')
  }, [levelSpec?.id])

  // Draw board
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = GRID_W * 64
    const H = GRID_H * 64
    canvas.width = W
    canvas.height = H

    // background
    ctx.fillStyle = '#0f172a' // slate-900
    ctx.fillRect(0, 0, W, H)

    // grid
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 1
    for (let gx = 0; gx <= GRID_W; gx++) {
      ctx.beginPath(); ctx.moveTo(gx * 64, 0); ctx.lineTo(gx * 64, H); ctx.stroke()
    }
    for (let gy = 0; gy <= GRID_H; gy++) {
      ctx.beginPath(); ctx.moveTo(0, gy * 64); ctx.lineTo(W, gy * 64); ctx.stroke()
    }

    // wires
    wires.forEach(w => {
      const fromComp = components.find(c => `${c.id}-a` === w.from || `${c.id}-b` === w.from)
      const toComp = components.find(c => `${c.id}-a` === w.to || `${c.id}-b` === w.to)
      if (!fromComp || !toComp) return
      const tf = compTerminals(fromComp)
      const tt = compTerminals(toComp)
      const p1 = w.from.endsWith('-a') ? tf.a : tf.b
      const p2 = w.to.endsWith('-a') ? tt.a : tt.b
      drawWire(ctx, p1, p2)
    })

    // components
    components.forEach(c => drawComponent(ctx, c))
  }, [components, wires])

  const addComponentFromPalette = (type: ComponentType) => {
    // count currently placed of this type when duplicates are limited by palette entries
    const existingCount = components.filter(c => c.type === type).length
    const allowedCount = levelSpec.palette.filter(t => t === type).length
    if (existingCount >= allowedCount) return

    const newC: PlacedComponent = {
      id: genId(),
      type,
      x: Math.floor(GRID_W / 2),
      y: Math.floor(GRID_H / 2),
      rot: 0,
      state: type === 'switch' ? { on: false } : {}
    }
    setComponents(prev => [...prev, newC])
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // check terminal hit first
    for (const c of components) {
      const t = compTerminals(c)
      const hit = (px: number, py: number, qx: number, qy: number) => Math.hypot(px - qx, py - qy) < 10
      if (hit(x, y, t.a.x, t.a.y)) {
        onTerminalClick(t.a.id)
        return
      }
      if (hit(x, y, t.b.x, t.b.y)) {
        onTerminalClick(t.b.id)
        return
      }
    }

    // otherwise, select/move/rotate component
    const gx = Math.max(0, Math.min(GRID_W - 1, Math.floor(x / 64)))
    const gy = Math.max(0, Math.min(GRID_H - 1, Math.floor(y / 64)))

    // try to select the top-most component in this cell
    const idx = [...components].reverse().findIndex(c => c.x === gx && c.y === gy)
    if (idx !== -1) {
      // rotate on click with shift, toggle switch with alt, drag is simplified: click empty cell to move selected last component
      const actualIndex = components.length - 1 - idx
      setComponents(prev => prev.map((c, i) => {
        if (i !== actualIndex) return c
        if (e.shiftKey) {
          const nextRot = (c.rot + 90) % 360 as 0 | 90 | 180 | 270
          return { ...c, rot: nextRot }
        }
        if (e.altKey && c.type === 'switch') {
          return { ...c, state: { on: !c.state?.on } }
        }
        return c
      }))
      return
    }

    // move the last placed component to this cell for simplicity
    setComponents(prev => {
      if (prev.length === 0) return prev
      const last = prev[prev.length - 1]
      const moved = { ...last, x: gx, y: gy }
      return [...prev.slice(0, -1), moved]
    })
  }

  const onTerminalClick = (tid: TerminalId) => {
    if (!selectedTerminal) {
      setSelectedTerminal(tid)
      setFeedback('Select another terminal to connect a wire')
    } else if (selectedTerminal === tid) {
      setSelectedTerminal(null)
      setFeedback('')
    } else {
      // Avoid duplicate wire
      const exists = wires.some(w => (w.from === selectedTerminal && w.to === tid) || (w.from === tid && w.to === selectedTerminal))
      if (!exists) {
        setWires(prev => [...prev, { id: genId(), from: selectedTerminal, to: tid }])
      }
      setSelectedTerminal(null)
      setFeedback('')
    }
  }

  const testCircuit = () => {
    const result = evaluateCircuit(components, wires, levelSpec)
    if (result.ok) {
      playBeep()
      setScore(s => s + 20)
      if (level >= LEVELS.length) {
        setStatus('gameComplete')
      } else {
        setStatus('levelComplete')
      }
    } else {
      setLives(h => {
        const left = Math.max(0, h - 1)
        if (left === 0) setStatus('gameOver')
        return left
      })
      setFeedback('⚠️ Circuit Incomplete. Try again')
    }
  }

  const nextLevel = () => {
    setLevel(l => l + 1)
    setLives(3)
    setStatus('levelStart')
  }

  const restart = () => {
    setLevel(1); setLives(3); setScore(0); setStatus('levelStart')
  }

  // Screens
  if (status === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔌</div>
          <div className="text-5xl font-bold text-white mb-2">{levelSpec.title}</div>
          <div className="text-lg text-slate-300 max-w-xl mx-auto">{levelSpec.description}</div>
          <div className="mt-6 flex items-center justify-center gap-3 text-slate-300">
            <span>Lives: {'❤️'.repeat(lives)}</span>
            <span>Score: {score}</span>
          </div>
          <button onClick={() => setStatus('playing')} className="mt-6 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg">Start</button>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🎉 You are a Circuit Master!</h2>
          <p className="text-gray-600 mb-4">Total Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Play Again</button>
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
      <div className="max-w-6xl mx-auto pt-6 px-4 flex items-center justify-between">
        <button onClick={onBack} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20">← Back</button>
        <div className="text-white/90 space-x-6">
          <span>Level: {level}</span>
          <span>Lives: {'❤️'.repeat(lives)}</span>
          <span>Score: {score}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-12 gap-4">
        {/* Palette */}
        <div className="col-span-12 md:col-span-3 bg-slate-800/60 rounded-xl border border-slate-700 p-3">
          <div className="text-slate-200 font-semibold mb-2">Components</div>
          <div className="grid grid-cols-2 gap-2">
            {palette.map((t, i) => (
              <button key={`${t}-${i}`} onClick={() => addComponentFromPalette(t)} className="bg-violet-600/80 hover:bg-violet-600 rounded-lg py-3 text-sm">
                {t === 'battery' && '🔋 Battery'}
                {t === 'bulb' && '💡 Bulb'}
                {t === 'switch' && '🔘 Switch'}
                {t === 'motor' && '🌀 Motor'}
                {t === 'resistor' && '♒ Resistor'}
                {t === 'buzzer' && '🔔 Buzzer'}
              </button>
            ))}
          </div>
          <div className="text-xs text-slate-400 mt-3 space-y-1">
            <div>• Click a palette item to place it.</div>
            <div>• Click grid to move last-placed component.</div>
            <div>• Shift+Click a component to rotate.</div>
            <div>• Alt+Click a switch to toggle ON/OFF.</div>
            <div>• Click two terminals to connect a wire.</div>
          </div>
        </div>

        {/* Workspace */}
        <div className="col-span-12 md:col-span-9">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-3">
            <div className="relative">
              <canvas ref={canvasRef} onClick={handleCanvasClick} className="w-full h-full block rounded-lg border border-slate-700" style={{ width: GRID_W*64, height: GRID_H*64 }} />
              {feedback && (
                <div className="absolute top-2 left-2 text-sm text-amber-300 bg-amber-900/40 px-2 py-1 rounded">
                  {feedback}
                </div>
              )}
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="text-slate-300 text-sm">{levelSpec.description}</div>
              <button onClick={testCircuit} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">
                Test Circuit ⚡
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircuitConnect
