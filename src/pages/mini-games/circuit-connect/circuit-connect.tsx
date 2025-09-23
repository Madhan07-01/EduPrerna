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

type TerminalId = `${string}-a`  | `${string}-b`

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
  { id: 1, title: 'Level 1 – Light the Bulb', description: 'Connect battery → bulb → battery to complete the circuit.', palette: ['battery', 'bulb'], targets: { bulbsOn: 1 } },
  { id: 2, title: 'Level 2 – Switch Control', description: 'Add a switch in series. Bulb only lights when switch is ON.', palette: ['battery', 'bulb', 'switch'], targets: { bulbsOn: 1, switchRequired: true } },
  { id: 3, title: 'Level 3 – Two Bulbs in Series', description: 'Connect two bulbs in series with the battery.', palette: ['battery', 'bulb', 'bulb'], targets: { seriesBulbs: 2, bulbsOn: 2 } },
  { id: 4, title: 'Level 4 – Two Bulbs in Parallel', description: 'Connect two bulbs in parallel across the battery.', palette: ['battery', 'bulb', 'bulb'], targets: { parallelBulbs: true, bulbsOn: 2 } },
  { id: 5, title: 'Level 5 – Mixed Challenge', description: 'Switch controls bulb + motor in parallel; include a resistor to limit current.', palette: ['battery', 'bulb', 'motor', 'switch', 'resistor', 'buzzer'], targets: { bulbsOn: 1, motorOn: true, switchRequired: true, resistorRequired: true, buzzerOn: true } },
]

const genId = () => Math.random().toString(36).slice(2, 9)

function compTerminals(c: PlacedComponent): { a: { x: number; y: number; id: TerminalId }, b: { x: number; y: number; id: TerminalId } } {
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
  return { a: { x: ax, y: ay, id: `${baseId}-a` as TerminalId }, b: { x: bx, y: by, id: `${baseId}-b` as TerminalId } }
}

function drawComponent(ctx: CanvasRenderingContext2D, c: PlacedComponent, powered = false) {
  const cell = 64
  const x = c.x * cell + cell / 2
  const y = c.y * cell + cell / 2
  ctx.save(); ctx.translate(x, y); ctx.rotate((Math.PI / 180) * c.rot)
  ctx.fillStyle = powered ? '#334155' : '#1f2937'
  ctx.strokeStyle = powered ? '#f59e0b' : '#94a3b8'
  ctx.lineWidth = 2
  ctx.beginPath(); (ctx as any).roundRect?.(-28, -18, 56, 36, 8); ctx.fill(); ctx.stroke()
  ctx.fillStyle = powered ? '#fde68a' : '#e5e7eb'
  ctx.font = '16px system-ui, -apple-system, Segoe UI'
  const label = { battery: '🔋', bulb: '💡', switch: c.state?.on ? '🔘' : '⚪', motor: '🌀', resistor: '♒', buzzer: '🔔' }[c.type]
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label || '', 0, 0)
  ctx.fillStyle = powered ? '#fbbf24' : '#60a5fa'
  const t = compTerminals(c)
  ctx.beginPath(); ctx.arc(t.a.x - x, t.a.y - y, 4, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(t.b.x - x, t.b.y - y, 4, 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}

function drawWire(ctx: CanvasRenderingContext2D, p1: { x: number; y: number }, p2: { x: number; y: number }, glow = false) {
  ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = glow ? '#f59e0b' : '#38bdf8'
  ctx.beginPath(); ctx.moveTo(p1.x, p1.y)
  const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2
  ctx.quadraticCurveTo(mx, my - 10, p2.x, p2.y); ctx.stroke(); ctx.restore()
}

function CircuitConnect({ onBack }: CircuitConnectProps) {
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState<Status>('levelStart')
  const [palette, setPalette] = useState<ComponentType[]>([])
  const [components, setComponents] = useState<PlacedComponent[]>([])
  const [wires, setWires] = useState<Wire[]>([])
  const [selectedTerminal, setSelectedTerminal] = useState<TerminalId | null>(null)
  const [feedback, setFeedback] = useState('')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const levelSpec = useMemo(() => LEVELS.find(l => l.id === level)!, [level])

  useEffect(() => { setPalette(levelSpec.palette); setComponents([]); setWires([]); setSelectedTerminal(null); setFeedback('') }, [levelSpec.id])

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!; const W = GRID_W * 64; const H = GRID_H * 64
    canvas.width = W; canvas.height = H
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1
    for (let gx = 0; gx <= GRID_W; gx++) { ctx.beginPath(); ctx.moveTo(gx * 64, 0); ctx.lineTo(gx * 64, H); ctx.stroke() }
    for (let gy = 0; gy <= GRID_H; gy++) { ctx.beginPath(); ctx.moveTo(0, gy * 64); ctx.lineTo(W, gy * 64); ctx.stroke() }

    // reachability for glow/powered
    const battery = components.find(c => c.type === 'battery')
    let fromPlus = new Set<string>(), fromMinus = new Set<string>()
    if (battery) {
      const adj: Record<string, Set<string>> = {}
      const addEdge = (u: string, v: string) => { (adj[u] ||= new Set()).add(v); (adj[v] ||= new Set()).add(u) }
      wires.forEach(w => addEdge(w.from, w.to))
      for (const c of components) { if (c.type === 'battery') continue; const t = compTerminals(c); const conductive = c.type === 'switch' ? (c.state?.on === true) : true; if (conductive) addEdge(t.a.id, t.b.id) }
      const visit = (start: TerminalId) => { const seen = new Set<string>(); const stack = [start as string]; while (stack.length) { const u = stack.pop()!; if (seen.has(u)) continue; seen.add(u); (adj[u]||new Set()).forEach(v => { if (!seen.has(v)) stack.push(v) }) } return seen }
      const bT = compTerminals(battery); fromPlus = visit(bT.a.id); fromMinus = visit(bT.b.id)
    }

    wires.forEach(w => { const fc = components.find(c => `${c.id}-a`===w.from || `${c.id}-b`===w.from); const tc = components.find(c => `${c.id}-a`===w.to || `${c.id}-b`===w.to); if (!fc || !tc) return; const tf = compTerminals(fc); const tt = compTerminals(tc); const p1 = w.from.endsWith('-a') ? tf.a : tf.b; const p2 = w.to.endsWith('-a') ? tt.a : tt.b; const glow = (fromPlus.has(p1.id) && fromMinus.has(p2.id)) || (fromPlus.has(p2.id) && fromMinus.has(p1.id)); drawWire(ctx, p1, p2, glow) })
    components.forEach(c => { let powered = false; if (battery) { const t = compTerminals(c); const across = (fromPlus.has(t.a.id) && fromMinus.has(t.b.id)) || (fromPlus.has(t.b.id) && fromMinus.has(t.a.id)); powered = across && (c.type !== 'switch' || c.state?.on === true) } drawComponent(ctx, c, powered) })
  }, [components, wires])

  const addComponentFromPalette = (type: ComponentType) => {
    const existingCount = components.filter(c => c.type === type).length
    const allowedCount = levelSpec.palette.filter(t => t === type).length
    if (existingCount >= allowedCount) return
    const newC: PlacedComponent = { id: genId(), type, x: Math.floor(GRID_W / 2), y: Math.floor(GRID_H / 2), rot: 0, state: type === 'switch' ? { on: false } : {} }
    setComponents(prev => [...prev, newC])
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top
    for (const c of components) { const t = compTerminals(c); const hit = (px:number,py:number,qx:number,qy:number)=> Math.hypot(px-qx,py-qy)<10; if (hit(x,y,t.a.x,t.a.y)) { onTerminalClick(t.a.id); return } if (hit(x,y,t.b.x,t.b.y)) { onTerminalClick(t.b.id); return } }
    const gx = Math.max(0, Math.min(GRID_W - 1, Math.floor(x / 64))); const gy = Math.max(0, Math.min(GRID_H - 1, Math.floor(y / 64)))
    const idx = [...components].reverse().findIndex(c => c.x === gx && c.y === gy)
    if (idx !== -1) {
      const actualIndex = components.length - 1 - idx
      setComponents(prev => prev.map((c,i)=>{ if (i!==actualIndex) return c; if (e.shiftKey) return { ...c, rot: ((c.rot + 90) % 360) as 0|90|180|270 }; if (e.altKey && c.type==='switch') return { ...c, state: { on: !c.state?.on } }; return c }))
      return
    }
    setComponents(prev => { if (prev.length===0) return prev; const last = prev[prev.length-1]; const moved = { ...last, x: gx, y: gy }; return [...prev.slice(0,-1), moved] })
  }

  const onTerminalClick = (tid: TerminalId) => {
    if (!selectedTerminal) { setSelectedTerminal(tid); setFeedback('Select another terminal to connect a wire') }
    else if (selectedTerminal === tid) { setSelectedTerminal(null); setFeedback('') }
    else { const exists = wires.some(w => (w.from===selectedTerminal && w.to===tid) || (w.from===tid && w.to===selectedTerminal)); if (!exists) setWires(prev => [...prev, { id: genId(), from: selectedTerminal, to: tid }]); setSelectedTerminal(null); setFeedback('') }
  }

  const testCircuit = () => {
    const result = evaluateCircuit(components, wires, levelSpec)
    if (result.ok) { setScore(s => s + 20); if (level >= LEVELS.length) setStatus('gameComplete'); else setStatus('levelComplete') }
    else { setLives(h => { const left = Math.max(0, h - 1); if (left === 0) setStatus('gameOver'); return left }); setFeedback('⚠️ Circuit Incomplete. Try again') }
  }

  const nextLevel = () => { setLevel(l => l + 1); setLives(3); setStatus('levelStart') }
  const restart = () => { setLevel(1); setLives(3); setScore(0); setStatus('levelStart') }

  if (status === 'levelStart') return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔌</div>
        <div className="text-5xl font-bold text-white mb-2">{levelSpec.title}</div>
        <div className="text-lg text-slate-300 max-w-xl mx-auto">{levelSpec.description}</div>
        <div className="mt-6 flex items-center justify-center gap-3 text-slate-300"><span>Lives: {'❤️'.repeat(lives)}</span><span>Score: {score}</span></div>
        <button onClick={() => setStatus('playing')} className="mt-6 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg">Start</button>
        <div className="mt-6"><button onClick={onBack} className="text-slate-300 underline">Back</button></div>
      </div>
    </div>
  )

  if (status === 'levelComplete') return (
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

  if (status === 'gameOver') return (
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

  if (status === 'gameComplete') return (
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="max-w-6xl mx-auto pt-6 px-4 flex items-center justify-between">
        <button onClick={onBack} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20">← Back</button>
        <div className="text-white/90 space-x-6"><span>Level: {level}</span><span>Lives: {'❤️'.repeat(lives)}</span><span>Score: {score}</span></div>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-12 gap-4">
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
          <div className="mt-4 flex gap-2">
            <button onClick={() => { setComponents([]); setWires([]); setSelectedTerminal(null); setFeedback('Level reset') }} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm">Reset Level</button>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9">
          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-3">
            <div className="relative">
              <canvas ref={canvasRef} onClick={handleCanvasClick} className="w-full h-full block rounded-lg border border-slate-700" style={{ width: GRID_W*64, height: GRID_H*64 }} />
              {feedback && (<div className="absolute top-2 left-2 text-sm text-amber-300 bg-amber-900/40 px-2 py-1 rounded">{feedback}</div>)}
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="text-slate-300 text-sm">{levelSpec.description}</div>
              <button onClick={testCircuit} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">Test Circuit ⚡</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple evaluator
function evaluateCircuit(components: PlacedComponent[], wires: Wire[], level: LevelSpec) {
  const adj: Record<string, Set<string>> = {}
  const addEdge = (u:string,v:string)=>{ (adj[u] ||= new Set()).add(v); (adj[v] ||= new Set()).add(u) }
  wires.forEach(w => addEdge(w.from, w.to))
  for (const c of components) { if (c.type==='battery') continue; const t = compTerminals(c); const conductive = c.type==='switch' ? (c.state?.on===true) : true; if (conductive) addEdge(t.a.id, t.b.id) }
  const battery = components.find(c => c.type==='battery'); if (!battery) return { ok:false, details:{} }
  const bT = compTerminals(battery)
  const visit = (start:TerminalId)=>{ const seen=new Set<string>(); const stack=[start as string]; while(stack.length){ const u=stack.pop()!; if(seen.has(u)) continue; seen.add(u); (adj[u]||new Set()).forEach(v=>{ if(!seen.has(v)) stack.push(v) }) } return seen }
  const fromPlus = visit(bT.a.id); const fromMinus = visit(bT.b.id)
  let bulbsOn = 0, motorOn=false, buzzerOn=false
  for (const c of components) { if (c.id===battery.id) continue; const t=compTerminals(c); const across=(fromPlus.has(t.a.id)&&fromMinus.has(t.b.id))||(fromPlus.has(t.b.id)&&fromMinus.has(t.a.id)); if (across) { if (c.type==='bulb') bulbsOn++; if (c.type==='motor') motorOn=true; if (c.type==='buzzer') buzzerOn=true } }
  const t=level.targets
  let ok=true
  if (t.bulbsOn!==undefined) ok = ok && bulbsOn>=t.bulbsOn
  if (t.motorOn) ok = ok && motorOn
  if (t.buzzerOn) ok = ok && buzzerOn
  if (t.switchRequired) { const sw=components.find(c=>c.type==='switch'); if (!sw || !sw.state?.on) ok=false }
  if (t.resistorRequired) { const rs=components.find(c=>c.type==='resistor'); if (!rs) ok=false }
  if (t.seriesBulbs) { const bulbIds=components.filter(c=>c.type==='bulb').map(c=>c.id); ok = ok && bulbIds.length>=t.seriesBulbs }
  if (t.parallelBulbs) { ok = ok && bulbsOn>=2 }
  return { ok, details:{ bulbsOn, motorOn, buzzerOn } }
}

export default CircuitConnect
