import React, { useEffect, useMemo, useRef, useState } from 'react'

interface GravityDropProps {
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
  sim: 'freeFall' | 'twoMasses' | 'upThrow' | 'projectile' | 'rampProjectile'
  params: any
}

const G = 9.8

const LEVELS: LevelSpec[] = [
  { id: 1, title: 'Level 1 – Free Fall Basics', prompt: 'Drop a ball from height h = 20 m. What is the time to hit ground? t = sqrt(2h/g) (g=9.8 m/s²)', options: ['1.5 s', '2.0 s', '2.5 s'], correctIndex: 1, sim: 'freeFall', params: { h: 20 } },
  { id: 2, title: 'Level 2 – Gravity vs Mass', prompt: 'Two balls of different masses are dropped together. Which hits first?', options: ['Heavier ball', 'Lighter ball', 'Both at the same time'], correctIndex: 2, sim: 'twoMasses', params: { h: 18 } },
  { id: 3, title: 'Level 3 – Initial Velocity', prompt: 'A ball is thrown upward with speed 10 m/s. What is max height? h = v²/(2g)', options: ['3.5 m', '5.1 m', '6.2 m'], correctIndex: 1, sim: 'upThrow', params: { v: 10 } },
  { id: 4, title: 'Level 4 – Projectile Motion', prompt: 'Launched horizontally at 5 m/s from height 10 m. Horizontal distance before hitting ground?', options: ['6 m', '8 m', '10 m'], correctIndex: 1, sim: 'projectile', params: { v: 5, h: 10 } },
  { id: 5, title: 'Level 5 – Mixed: Ramp + Projectile', prompt: 'Object slides down a ramp and flies off at the end. Predict landing point range.', options: ['Short (2–3 m)', 'Medium (4–6 m)', 'Far (8–10 m)'], correctIndex: 1, sim: 'rampProjectile', params: { rampH: 6, rampLen: 12, dropH: 4 } },
]

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

const GravityDrop: React.FC<GravityDropProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState<Status>('levelStart')
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const levelSpec = useMemo(() => LEVELS.find(l => l.id === level)!, [level])

  useEffect(() => { setSelected(null); setFeedback(null) }, [level])
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  const runSimulation = (onDone: () => void) => {
    const canvas = canvasRef.current; if (!canvas) return onDone()
    const ctx = canvas.getContext('2d')!
    const W = 900, H = 520
    canvas.width = W; canvas.height = H
    const drawBg = () => { ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#1f2937'; ctx.fillRect(0, H - 40, W, 40) }
    const S = 30
    const drawBall = (x:number,y:number,color='#60a5fa') => { ctx.beginPath(); ctx.fillStyle=color; ctx.arc(x,y,10,0,Math.PI*2); ctx.fill() }
    let t0 = performance.now(); const nowT=()=> (performance.now()-t0)/1000; const start=()=>{ t0 = performance.now() }

    const tickFreeFall = (h:number) => { const x0=120; const yGround=H-40; const hPx=h*S; const yStart = clamp(yGround - hPx, 70, yGround - 60); start(); const step=()=>{ const t=nowT(); const y=yStart + 0.5*G*t*t*S; const done = y+10>=yGround; drawBg(); drawBall(x0, Math.min(y, yGround-10)); if(!done) rafRef.current=requestAnimationFrame(step); else onDone() }; step() }
    const tickTwoMasses = (h:number) => { const xL=120,xR=180; const yGround=H-40; const yStart=clamp(yGround-h*S,70,yGround-60); start(); const step=()=>{ const t=nowT(); const y=yStart+0.5*G*t*t*S; const done=y+10>=yGround; drawBg(); drawBall(xL, Math.min(y,yGround-10),'#60a5fa'); drawBall(xR, Math.min(y,yGround-10),'#f59e0b'); if(!done) rafRef.current=requestAnimationFrame(step); else onDone() }; step() }
    const tickUpThrow = (v:number) => { const x0=150; const yBase=H-50; start(); const step=()=>{ const t=nowT(); const y=yBase - (v*t - 0.5*G*t*t)*S; const hit=y+10>=H-40; drawBg(); drawBall(x0, Math.min(y, H-50)); if(!hit) rafRef.current=requestAnimationFrame(step); else onDone() }; step() }
    const tickProjectile = (v:number,h:number) => { const x0=120; const yGround=H-40; const yStart=clamp(yGround-h*S,70,yGround-60); start(); const step=()=>{ const t=nowT(); const x=x0 + v*t*S; const y=yStart + 0.5*G*t*t*S; const done = y+10>=yGround; drawBg(); ctx.strokeStyle='#34d399'; ctx.beginPath(); for(let tt=0; tt<t; tt+=0.04){ const tx=x0+v*tt*S; const ty=yStart+0.5*G*tt*tt*S; if(tt===0) ctx.moveTo(tx,ty); else ctx.lineTo(tx,ty) } ctx.stroke(); drawBall(x, Math.min(y, yGround-10),'#a78bfa'); if(!done) rafRef.current=requestAnimationFrame(step); else onDone() }; step() }
    const tickRampProjectile = (rH:number, rL:number, dH:number) => { const yG=H-40; const x0=120; const x1=x0 + rL*S; const y0=yG - dH*S - rH*S; const y1=yG - dH*S; const dx=(x1-x0)/S; const dy=(y1-y0)/S; const theta=Math.atan2(y1-y0,x1-x0); const a=G*Math.sin(theta); start(); const step=()=>{ const t=nowT(); let x=0,y=0; const t1=2.0; if(t<t1){ const s=0.5*a*t*t; const frac=clamp(s/Math.sqrt(dx*dx+dy*dy),0,1); x=x0+frac*(x1-x0); y=y0+frac*(y1-y0) } else { const v=a*t1; const tp=t-t1; const vx=v*Math.cos(theta); const vy=v*Math.sin(theta); x=x1+vx*tp*S; y=y1+vy*tp*S+0.5*G*tp*tp*S } const done=y+10>=yG; drawBg(); ctx.strokeStyle='#64748b'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1); ctx.stroke(); drawBall(x, Math.min(y,yG-10),'#22c55e'); if(!done) rafRef.current=requestAnimationFrame(step); else onDone() }; step() }

    drawBg()
    switch (levelSpec.sim) {
      case 'freeFall': return tickFreeFall(levelSpec.params.h)
      case 'twoMasses': return tickTwoMasses(levelSpec.params.h)
      case 'upThrow': return tickUpThrow(levelSpec.params.v)
      case 'projectile': return tickProjectile(levelSpec.params.v, levelSpec.params.h)
      case 'rampProjectile': return tickRampProjectile(levelSpec.params.rampH, levelSpec.params.rampLen, levelSpec.params.dropH)
    }
  }

  const onLaunch = () => {
    if (selected == null) return
    const correct = selected === levelSpec.correctIndex
    if (!correct) { setFeedback('wrong'); setLives(h => { const left = Math.max(0, h - 1); if (left===0) setStatus('gameOver'); return left }); return }
    setFeedback('correct'); runSimulation(() => { setScore(s => s + 20); if (level >= LEVELS.length) setStatus('gameComplete'); else setStatus('levelComplete') })
  }

  const nextLevel = () => { setLevel(l => l + 1); setLives(3); setStatus('levelStart') }
  const restart = () => { setLevel(1); setLives(3); setScore(0); setStatus('levelStart') }

  if (status === 'levelStart') return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white flex items-center justify-center">
      <div className="text-center max-w-2xl"><div className="text-6xl mb-4">🌌</div><div className="text-5xl font-bold mb-2">{levelSpec.title}</div><div className="text-lg text-slate-300">{levelSpec.prompt}</div><div className="mt-6 text-slate-300 space-x-6"><span>Lives: {'❤️'.repeat(lives)}</span><span>Score: {score}</span></div></div>
    </div>
  )
  if (status === 'levelComplete') return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-400 to-teal-500 flex items-center justify-center"><div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl"><div className="text-6xl mb-4">✅</div><h2 className="text-3xl font-bold text-gray-800 mb-2">Level {level} Complete!</h2><p className="text-gray-600 mb-4">Score: {score} • Lives: {'❤️'.repeat(lives)}</p><div className="space-y-3"><button onClick={()=>nextLevel()} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold">➡️ Next Level</button><button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold">Back</button></div></div></div>
  )
  if (status === 'gameOver') return (
    <div className="min-h-screen bg-gradient-to-b from-red-400 to-pink-500 flex items-center justify-center"><div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl"><div className="text-6xl mb-4">💥</div><h2 className="text-3xl font-bold text-gray-800 mb-2">Game Over</h2><p className="text-gray-600 mb-4">Final Score: {score}</p><div className="space-y-3"><button onClick={()=>restart()} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold">🔄 Retry</button><button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold">Back</button></div></div></div>
  )
  if (status === 'gameComplete') return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-500 flex items-center justify-center"><div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl"><div className="text-6xl mb-4">🏆</div><h2 className="text-3xl font-bold text-gray-800 mb-2">🎉 You mastered Gravity & Motion!</h2><p className="text-gray-600 mb-4">Total Score: {score}</p><div className="space-y-3"><button onClick={()=>restart()} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-semibold">🔄 Play Again</button><button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold">Back</button></div></div></div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="max-w-6xl mx-auto pt-4 px-4 flex items-center justify-between"><button onClick={onBack} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20">← Back</button><div className="text-white/90 space-x-6"><span>Level: {level}</span><span>Lives: {'❤️'.repeat(lives)}</span><span>Score: {score}</span></div></div>
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8"><div className="bg-slate-800/60 rounded-xl border border-slate-700 p-3 h-[560px] flex flex-col"><div className="text-slate-300 mb-2">Simulation</div><canvas ref={canvasRef} className="flex-1 rounded-lg border border-slate-700" /><div className="mt-3 flex justify-end"><button onClick={()=>onLaunch()} className={`px-4 py-2 rounded-lg text-white ${selected==null ? 'bg-slate-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>Drop / Launch 🚀</button></div></div></div>
        <div className="col-span-12 md:col-span-4"><div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4 h-[560px] flex flex-col"><div className="text-slate-200 font-semibold mb-2">{levelSpec.title}</div><div className="text-slate-300 mb-4 text-sm leading-relaxed">{levelSpec.prompt}</div><div className="grid grid-cols-1 gap-2">{levelSpec.options.map((opt,i)=> (<button key={i} onClick={()=>setSelected(i)} className={`text-left px-3 py-3 rounded-lg border ${selected===i ? 'bg-indigo-600/30 border-indigo-500' : 'bg-slate-900/40 border-slate-700 hover:bg-slate-900/60'}`}>{String.fromCharCode(65+i)}. {opt}</button> ))}</div>{feedback==='correct' && <div className="mt-3 text-emerald-400 font-semibold">✅ Correct!</div>}{feedback==='wrong' && <div className="mt-3 text-red-400 font-semibold">❌ Wrong! Try again…</div>}</div></div>
      </div>
    </div>
  )
}

export default GravityDrop
