import React, { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser'

// Constants
const QUESTIONS_PER_LEVEL = 3
const MAX_LEVELS = 5

// Types
interface Question {
  id: number
  question: string
  options: Array<string | number>
  correctAnswer: number // index in options
}

interface MathArcherProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

interface GameState {
  level: number
  score: number
  lives: number
  qIndex: number // 0..QUESTIONS_PER_LEVEL-1 within current level
  status: 'levelStart' | 'playing' | 'levelComplete' | 'gameOver' | 'gameComplete'
}

// Question bank — 5 levels × 3 questions each
const questions: Question[] = [
  // Level 1 – Basic Arithmetic
  { id: 1, question: '5 + 4 = ?', options: [8, 9, 10], correctAnswer: 1 },
  { id: 2, question: '12 − 7 = ?', options: [4, 5, 6], correctAnswer: 1 },
  { id: 3, question: '3 × 2 = ?', options: [5, 6, 7], correctAnswer: 1 },
  // Level 2 – Larger Numbers
  { id: 4, question: '25 − 9 = ?', options: [15, 16, 17], correctAnswer: 1 },
  { id: 5, question: '7 × 5 = ?', options: [34, 35, 36], correctAnswer: 1 },
  { id: 6, question: '56 ÷ 8 = ?', options: [6, 7, 8], correctAnswer: 1 },
  // Level 3 – Squares & Mixed Ops
  { id: 7, question: '6 × 6 = ?', options: [35, 36, 37], correctAnswer: 1 },
  { id: 8, question: '81 ÷ 9 = ?', options: [8, 9, 10], correctAnswer: 1 },
  { id: 9, question: '14 + 29 = ?', options: [42, 43, 44], correctAnswer: 1 },
  // Level 4 – Word Problems & Harder Ops
  { id: 10, question: 'A box has 48 apples, shared by 6 kids. Each gets?', options: [7, 8, 9], correctAnswer: 1 },
  { id: 11, question: '12 × 9 = ?', options: [107, 108, 109], correctAnswer: 1 },
  { id: 12, question: '144 ÷ 12 = ?', options: [10, 11, 12], correctAnswer: 2 },
  // Level 5 – Challenge Round
  { id: 13, question: '125 ÷ 5 = ?', options: [24, 25, 26], correctAnswer: 1 },
  { id: 14, question: '19 × 12 = ?', options: [227, 228, 229], correctAnswer: 1 },
  { id: 15, question: '225 ÷ 15 = ?', options: [14, 15, 16], correctAnswer: 1 },
]

const getLevelSlice = (level: number) => {
  const start = (level - 1) * QUESTIONS_PER_LEVEL
  return questions.slice(start, start + QUESTIONS_PER_LEVEL)
}

// Phaser Scene
class MathArcherScene extends Phaser.Scene {
  constructor() { super('MathArcher') }

  // Initialize with safe defaults so createHUD() can render before React passes state
  private state: GameState = { level: 1, score: 0, lives: 3, qIndex: 0, status: 'playing' }
  private onAnswer!: (hitCorrect: boolean) => void
  private currentQ: Question | null = null

  private hudLives?: Phaser.GameObjects.Text
  private hudScore?: Phaser.GameObjects.Text
  private hudLevel?: Phaser.GameObjects.Text
  private qText?: Phaser.GameObjects.Text

  private targets: Phaser.GameObjects.Container[] = []
  private arrows: Phaser.GameObjects.Container[] = []
  private aimAngle: number = -90 // degrees (upwards)
  private bowX: number = 0
  private bowY: number = 0
  private shootKey?: Phaser.Input.Keyboard.Key

  init(data: { state?: GameState, question?: Question, onAnswer?: (ok: boolean) => void }) {
    if (data.state) this.state = data.state
    if (data.question) this.currentQ = data.question
    if (data.onAnswer) this.onAnswer = data.onAnswer
  }

  create() {
    const w = 900
    const h = 600
    this.cameras.main.setBackgroundColor('#0b1526')

    // ground (brown)
    this.add.rectangle(0, h - 60, w, 60, 0x7a3f10).setOrigin(0)

    this.bowX = w / 2
    this.bowY = h - 90

    // HUD & question
    this.createHUD()
    this.qText = this.add.text(w / 2, 70, this.currentQ ? this.currentQ.question : 'Loading…', { fontSize: '28px', color: '#ffffff' }).setOrigin(0.5)

    // Aim indicator
    const bow = this.add.container(this.bowX, this.bowY)
    bow.setName('bow')
    const aimShaft = this.add.rectangle(-28, 0, 40, 5, 0x22c55e).setOrigin(0, 0.5)
    const aimHead = this.add.triangle(0, 0, 0, 0, -10, -7, -10, 7, 0x22c55e)
    bow.add([aimShaft, aimHead])

    // Targets with options
    if (this.currentQ) this.createTargets(this.currentQ)

    // Keyboard to shoot
    this.shootKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    // Pointer aim + shoot
    this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      const dx = p.x - this.bowX
      const dy = p.y - this.bowY
      const ang = Phaser.Math.RadToDeg(Math.atan2(dy, dx))
      this.aimAngle = Phaser.Math.Clamp(ang, -160, -20)
      bow.rotation = Phaser.Math.DegToRad(this.aimAngle)
    })
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      const dx = p.x - this.bowX
      const dy = p.y - this.bowY
      const ang = Phaser.Math.RadToDeg(Math.atan2(dy, dx))
      this.aimAngle = Phaser.Math.Clamp(ang, -160, -20)
      bow.rotation = Phaser.Math.DegToRad(this.aimAngle)
      this.shootArrow()
    })
  }

  private createHUD() {
    const w = this.scale.width
    const s = this.state
    this.hudLevel = this.add.text(20, 16, `Level: ${s.level}` , { fontSize: '18px', color: '#cbd5e1' })
    this.hudLives = this.add.text(20, 40, `Lives: ${'❤️'.repeat(s.lives)}` , { fontSize: '18px', color: '#fca5a5' })
    this.hudScore = this.add.text(w - 20, 16, `Score: ${s.score}` , { fontSize: '18px', color: '#cbd5e1' }).setOrigin(1, 0)
  }

  private createTargets(q: Question) {
    // cleanup
    this.targets.forEach(t => t.destroy()); this.targets = []

    const baseY = 260
    const startX = 360
    const spacing = 170

    q.options.forEach((opt, idx) => {
      const container = this.add.container(startX + idx * spacing, baseY)
      const body = this.add.circle(0, 0, 34, 0x1f2937).setStrokeStyle(2, 0x60a5fa)
      const label = this.add.text(0, 0, String(opt), { fontSize: '16px', color: '#e5e7eb' }).setOrigin(0.5)
      container.add([body, label])

      // Distance-aware motion
      const dx0 = container.x - this.bowX
      const dy0 = container.y - this.bowY
      const dist = Math.sqrt(dx0 * dx0 + dy0 * dy0)
      const maxDist = 900
      const norm = Phaser.Math.Clamp(dist / maxDist, 0, 1)
      const amplitude = Phaser.Math.Linear(80, 40, norm)
      const speed = Phaser.Math.Linear(0.0022, 0.0012, norm)
      ;(container as any).baseX = container.x
      ;(container as any).phase = Math.PI * 0.6 * idx
      ;(container as any).amp = amplitude
      ;(container as any).spd = speed
      ;(container as any).answerIndex = idx
      this.targets.push(container)
    })
  }

  private updateHUD() {
    this.hudLevel?.setText(`Level: ${this.state.level}` )
    this.hudLives?.setText(`Lives: ${'❤️'.repeat(this.state.lives)}` )
    this.hudScore?.setText(`Score: ${this.state.score}`)
  }

  update() {
    if (this.shootKey && Phaser.Input.Keyboard.JustDown(this.shootKey)) this.shootArrow()

    // Move targets with sine motion
    const now = this.time.now
    this.targets.forEach((tgt: any) => {
      const baseX = tgt.baseX as number
      const amp = tgt.amp as number
      const spd = tgt.spd as number
      const phase = tgt.phase as number
      tgt.x = baseX + Math.sin(now * spd + phase) * amp
    })

    // Move arrows
    this.arrows.forEach((a: any) => {
      const vx = a.vx as number
      const vy = a.vy as number
      a.x += vx
      a.y += vy
      a.rotation = Math.atan2(vy, vx)

      const tipX = a.x
      const tipY = a.y
      for (const tgt of this.targets) {
        const dx = tipX - tgt.x
        const dy = tipY - tgt.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 36) {
          this.handleHit(tgt, (tgt as any).answerIndex)
          a.destroy()
          break
        }
      }

      if (a.x < -40 || a.x > 940 || a.y < -40 || a.y > 640) a.destroy()
    })
    this.arrows = this.arrows.filter(a => a.active)
  }

  private shootArrow() {
    const cont = this.add.container(this.bowX, this.bowY)
    const shaft = this.add.rectangle(-28, 0, 40, 3, 0xcbd5e1).setOrigin(0, 0.5)
    const head = this.add.triangle(0, 0, 0, 0, -8, -5, -8, 5, 0xf59e0b)
    const fletch = this.add.triangle(-36, 0, 0, 0, 8, -4, 8, 4, 0x22c55e)
    cont.add([shaft, head, fletch])
    const rad = Phaser.Math.DegToRad(this.aimAngle)
    cont.rotation = rad
    const speed = 14
    ;(cont as any).vx = Math.cos(rad) * speed
    ;(cont as any).vy = Math.sin(rad) * speed
    this.arrows.push(cont)
  }

  private handleHit(target: Phaser.GameObjects.Container, idx: number) {
    const isCorrect = this.currentQ ? idx === this.currentQ.correctAnswer : false
    if (isCorrect) {
      const c = target.list[0] as Phaser.GameObjects.Arc
      this.tweens.add({ targets: c, scale: 1.3, alpha: 0, duration: 250, onComplete: () => target.destroy() })
    } else {
      this.tweens.add({ targets: target, x: target.x + 8, yoyo: true, repeat: 2, duration: 60 })
    }
    this.time.delayedCall(150, () => this.onAnswer(isCorrect))
  }

  public setQuestion(q: Question) {
    this.currentQ = q
    this.qText?.setText(q.question)
    this.createTargets(q)
  }

  public setGameState(s: GameState) {
    this.state = s
    this.updateHUD()
  }
}

const MathArcher: React.FC<MathArcherProps> = ({ onBack }) => {
  const [state, setState] = useState<GameState>({ level: 1, score: 0, lives: 3, qIndex: 0, status: 'levelStart' })
  const [currentQ, setCurrentQ] = useState<Question | null>(null)
  const gameRef = useRef<Phaser.Game | null>(null)
  const sceneRef = useRef<MathArcherScene | null>(null)

  useEffect(() => { setCurrentQ(getLevelSlice(1)[0]) }, [])

  useEffect(() => {
    if (state.status === 'levelStart') {
      const t = setTimeout(() => setState(prev => ({ ...prev, status: 'playing' })), 600)
      return () => clearTimeout(t)
    }
  }, [state.status])

  useEffect(() => {
    if (state.status !== 'playing' || !currentQ) {
      if (gameRef.current) { gameRef.current.destroy(true); gameRef.current = null; sceneRef.current = null }
      return
    }

    if (!gameRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 900,
        height: 600,
        backgroundColor: '#0b1526',
        parent: 'math-archer-phaser',
        scene: MathArcherScene,
        physics: { default: 'arcade', arcade: { debug: false } },
      }
      gameRef.current = new Phaser.Game(config)

      const initScene = () => {
        const s = gameRef.current?.scene.getScene('MathArcher') as MathArcherScene
        if (s) { sceneRef.current = s; s.setGameState(state); s.setQuestion(currentQ); (s as any).onAnswer = onAnswer }
      }
      const poll = () => { initScene(); if (!sceneRef.current) setTimeout(poll, 80) }
      setTimeout(poll, 60)
    } else if (sceneRef.current) {
      sceneRef.current.setGameState(state)
      sceneRef.current.setQuestion(currentQ)
    }
  }, [state.status, currentQ])

  useEffect(() => { if (sceneRef.current) sceneRef.current.setGameState(state) }, [state.level, state.score, state.lives, state.qIndex])

  const onAnswer = (correct: boolean) => {
    const newLives = correct ? state.lives : Math.max(0, state.lives - 1)
    const newScore = correct ? state.score + 10 : state.score
    const nextQIdx = correct ? state.qIndex + 1 : state.qIndex

    if (!correct && newLives === 0) { setState(prev => ({ ...prev, lives: newLives, score: newScore, status: 'gameOver' })); return }

    if (nextQIdx >= QUESTIONS_PER_LEVEL) {
      if (state.level >= MAX_LEVELS) setState(prev => ({ ...prev, lives: newLives, score: newScore, status: 'gameComplete' }))
      else setState(prev => ({ ...prev, lives: newLives, score: newScore, status: 'levelComplete' }))
      return
    }

    if (correct) {
      const levelQs = getLevelSlice(state.level)
      setCurrentQ(levelQs[nextQIdx])
    }
    setState(prev => ({ ...prev, lives: newLives, score: newScore, qIndex: nextQIdx }))
  }

  const restart = () => { setState({ level: 1, score: 0, lives: 3, qIndex: 0, status: 'levelStart' }); setCurrentQ(getLevelSlice(1)[0]) }
  const nextLevel = () => { const newLevel = state.level + 1; setState(prev => ({ ...prev, level: newLevel, qIndex: 0, status: 'levelStart' })); setCurrentQ(getLevelSlice(newLevel)[0]) }

  if (state.status === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏹</div>
          <div className="text-5xl font-bold text-white mb-2">Level {state.level}</div>
          <div className="text-lg text-slate-300">Shoot the correct answers to clear the level!</div>
        </div>
      </div>
    )
  }

  if (state.status === 'levelComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-400 to-teal-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Level {state.level} Complete!</h2>
          <p className="text-gray-600 mb-4">Score: {state.score} • Lives: {'❤️'.repeat(state.lives)}</p>
          <div className="space-y-3">
            <button onClick={nextLevel} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">➡️ Next Level</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🎯 Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (state.status === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-400 to-pink-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">💥</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Game Over</h2>
          <p className="text-gray-600 mb-4">Final Score: {state.score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Retry</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🎯 Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (state.status === 'gameComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">You are a Math Archer Master!</h2>
          <p className="text-gray-600 mb-4">Total Score: {state.score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Replay</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🎯 Back</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden relative">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <button onClick={onBack} className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
            <span className="text-xl text-white">←</span>
            <span className="text-white font-medium">Back</span>
          </button>
        </div>
      </div>
      {/* Phaser mount */}
      <div id="math-archer-phaser" className="absolute inset-0 pt-16 flex items-center justify-center" />
    </div>
  )
}

export default MathArcher
