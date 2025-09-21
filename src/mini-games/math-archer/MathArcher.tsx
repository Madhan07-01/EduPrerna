import React, { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser'

// Constants
const QUESTIONS_PER_LEVEL = 5
const MAX_LEVELS = 5

// Types
interface Question {
  id: number
  question: string
  options: Array<string | number>
  correctAnswer: number
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

// Build question bank (Grade 6)
const questions: Question[] = [
  // Level 1
  { id: 1, question: '3 + 2 = ?', options: [4, 5, 6], correctAnswer: 1 },
  { id: 2, question: '10 − 4 = ?', options: [5, 6, 7], correctAnswer: 1 },
  { id: 3, question: '2 × 3 = ?', options: [5, 6, 7], correctAnswer: 1 },
  { id: 4, question: '12 ÷ 4 = ?', options: [2, 3, 5], correctAnswer: 1 },
  { id: 5, question: '8 + 1 = ?', options: [9, 10, 11], correctAnswer: 0 },
  // Level 2
  { id: 6, question: '14 − 7 = ?', options: [6, 7, 8], correctAnswer: 1 },
  { id: 7, question: '5 × 4 = ?', options: [15, 20, 25], correctAnswer: 1 },
  { id: 8, question: '18 ÷ 3 = ?', options: [5, 6, 7], correctAnswer: 1 },
  { id: 9, question: '9 + 8 = ?', options: [16, 17, 18], correctAnswer: 1 },
  { id: 10, question: '20 − 9 = ?', options: [11, 12, 13], correctAnswer: 0 },
  // Level 3
  { id: 11, question: '7 × 6 = ?', options: [40, 42, 44], correctAnswer: 1 },
  { id: 12, question: '45 ÷ 5 = ?', options: [8, 9, 10], correctAnswer: 1 },
  { id: 13, question: '30 − 18 = ?', options: [12, 13, 14], correctAnswer: 0 },
  { id: 14, question: '25 + 36 = ?', options: [60, 61, 62], correctAnswer: 1 },
  { id: 15, question: '9 × 9 = ?', options: [80, 81, 82], correctAnswer: 1 },
  // Level 4
  { id: 16, question: '64 ÷ 8 = ?', options: [6, 7, 8], correctAnswer: 2 },
  { id: 17, question: '15 × 4 = ?', options: [50, 55, 60], correctAnswer: 2 },
  { id: 18, question: '72 − 39 = ?', options: [32, 33, 34], correctAnswer: 1 },
  { id: 19, question: '11 × 11 = ?', options: [120, 121, 122], correctAnswer: 1 },
  { id: 20, question: '100 − 47 = ?', options: [52, 53, 54], correctAnswer: 1 },
  // Level 5
  { id: 21, question: '125 ÷ 25 = ?', options: [4, 5, 6], correctAnswer: 1 },
  { id: 22, question: '18 × 12 = ?', options: [210, 216, 220], correctAnswer: 1 },
  { id: 23, question: '144 ÷ 12 = ?', options: [10, 11, 12], correctAnswer: 2 },
  { id: 24, question: '75 + 68 = ?', options: [141, 142, 143], correctAnswer: 1 },
  { id: 25, question: '99 − 37 = ?', options: [61, 62, 63], correctAnswer: 1 }
]

const getLevelSlice = (level: number) => {
  const start = (level - 1) * QUESTIONS_PER_LEVEL
  return questions.slice(start, start + QUESTIONS_PER_LEVEL)
}

// Phaser Scene
class MathArcherScene extends Phaser.Scene {
  constructor() { super('MathArcher') }

  private state!: GameState
  private onAnswer!: (hitCorrect: boolean) => void
  private currentQ!: Question

  private hudLives?: Phaser.GameObjects.Text
  private hudScore?: Phaser.GameObjects.Text
  private hudLevel?: Phaser.GameObjects.Text
  private qText?: Phaser.GameObjects.Text

  private targets: Phaser.GameObjects.Container[] = []
  private arrows: Phaser.GameObjects.Rectangle[] = []
  private aimAngle: number = -70 // degrees
  private bowX: number = 120
  private bowY: number = 460
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  private shootKey?: Phaser.Input.Keyboard.Key

  init(data: { state: GameState, question: Question, onAnswer: (ok: boolean) => void }) {
    this.state = data.state
    this.currentQ = data.question
    this.onAnswer = data.onAnswer
  }

  preload() {}

  create() {
    const w = 900
    const h = 600
    this.add.rectangle(0, 0, w, h, 0x0b1526).setOrigin(0)

    // ground
    this.add.rectangle(0, h - 40, w, 40, 0x111827).setOrigin(0)

    // HUD
    this.createHUD()

    // Question
    this.qText = this.add.text(w / 2, 70, this.currentQ ? this.currentQ.question : 'Loading…', { fontSize: '28px', color: '#ffffff' }).setOrigin(0.5)

    // Bow (simple triangle)
    const bow = this.add.triangle(this.bowX, this.bowY, 0, 0, 0, -60, 10, 0, 0x22c55e)
    bow.setName('bow')
    bow.rotation = Phaser.Math.DegToRad(this.aimAngle)

    // Targets with options
    if (this.currentQ) this.createTargets(this.currentQ)

    // Controls
    this.cursors = this.input.keyboard?.createCursorKeys()
    this.shootKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.input.on('pointerdown', () => this.shootArrow())

    this.events.on('updateHUD', () => this.updateHUD())
  }

  private createHUD() {
    const w = this.scale.width
    const level = this.state?.level ?? 1
    const lives = this.state?.lives ?? 3
    const score = this.state?.score ?? 0
    this.hudLevel = this.add.text(20, 16, `Level: ${level}`, { fontSize: '18px', color: '#cbd5e1' })
    this.hudLives = this.add.text(20, 40, `Lives: ${'❤️'.repeat(lives)}`, { fontSize: '18px', color: '#fca5a5' })
    this.hudScore = this.add.text(w - 20, 16, `Score: ${score}`, { fontSize: '18px', color: '#cbd5e1' }).setOrigin(1, 0)
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

      // give it velocity side-to-side
      const dir = idx % 2 === 0 ? 1 : -1
      this.tweens.add({
        targets: container,
        x: container.x + dir * 120,
        yoyo: true,
        repeat: -1,
        duration: 1200 + idx * 200,
        ease: 'Sine.easeInOut'
      })

      // attach metadata
      ;(container as any).answerIndex = idx
      this.targets.push(container)
    })
  }

  private updateHUD() {
    this.hudLevel?.setText(`Level: ${this.state.level}`)
    this.hudLives?.setText(`Lives: ${'❤️'.repeat(this.state.lives)}`)
    this.hudScore?.setText(`Score: ${this.state.score}`)
  }

  update(_t: number, dt: number) {
    if (!this.cursors || !this.shootKey) return

    if (this.cursors.left?.isDown) this.aimAngle = Phaser.Math.Clamp(this.aimAngle - 0.2 * (dt / 16), -110, -20)
    if (this.cursors.right?.isDown) this.aimAngle = Phaser.Math.Clamp(this.aimAngle + 0.2 * (dt / 16), -110, -20)

    const bow = this.children.getByName('bow') as Phaser.GameObjects.Triangle | null
    if (bow) bow.rotation = Phaser.Math.DegToRad(this.aimAngle)

    if (Phaser.Input.Keyboard.JustDown(this.shootKey)) this.shootArrow()

    // move arrows
    this.arrows.forEach((a) => {
      a.y += Math.sin(Phaser.Math.DegToRad(this.aimAngle)) * 10
      a.x += Math.cos(Phaser.Math.DegToRad(this.aimAngle)) * 10

      // collision test with targets
      this.targets.forEach((tgt) => {
        const dx = a.x - tgt.x
        const dy = a.y - tgt.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 36) {
          this.handleHit(tgt, (tgt as any).answerIndex)
          a.destroy()
        }
      })

      // cleanup offscreen
      if (a.x < -20 || a.x > 920 || a.y < -20 || a.y > 620) {
        a.destroy()
      }
    })
    this.arrows = this.arrows.filter(a => a.active)
  }

  private shootArrow() {
    // create a slim rectangle as an arrow
    const arrow = this.add.rectangle(this.bowX, this.bowY, 24, 3, 0xf59e0b)
    arrow.rotation = Phaser.Math.DegToRad(this.aimAngle)
    this.arrows.push(arrow)
  }

  private handleHit(target: Phaser.GameObjects.Container, idx: number) {
    const isCorrect = idx === this.currentQ.correctAnswer
    if (isCorrect) {
      // break effect
      const c = target.list[0] as Phaser.GameObjects.Arc
      this.tweens.add({ targets: c, scale: 1.3, alpha: 0, duration: 250, onComplete: () => target.destroy() })
    } else {
      // shake effect
      this.tweens.add({ targets: target, x: target.x + 8, yoyo: true, repeat: 2, duration: 60 })
    }

    this.time.delayedCall(350, () => this.onAnswer(isCorrect))
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

const MathArcher: React.FC<MathArcherProps> = ({ subject: _subject, grade: _grade, lesson: _lesson, onBack }) => {
  const [state, setState] = useState<GameState>({ level: 1, score: 0, lives: 3, qIndex: 0, status: 'levelStart' })
  const [currentQ, setCurrentQ] = useState<Question | null>(null)
  const gameRef = useRef<Phaser.Game | null>(null)
  const sceneRef = useRef<MathArcherScene | null>(null)

  // Load first question for level
  useEffect(() => {
    const levelQs = getLevelSlice(state.level)
    setCurrentQ(levelQs[0])
  }, [])

  // Gate from levelStart to playing
  useEffect(() => {
    if (state.status === 'levelStart') {
      const t = setTimeout(() => setState(prev => ({ ...prev, status: 'playing' })), 1000)
      return () => clearTimeout(t)
    }
  }, [state.status])

  // Create Phaser game while playing
  useEffect(() => {
    if (state.status !== 'playing' || !currentQ) {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
        sceneRef.current = null
      }
      return
    }

    if (!gameRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 900,
        height: 600,
        backgroundColor: '#0b1526',
        parent: 'math-archer-phaser',
        scene: MathArcherScene
      }
      gameRef.current = new Phaser.Game(config)

      const initScene = () => {
        const s = gameRef.current?.scene.getScene('MathArcher') as MathArcherScene
        if (s) {
          sceneRef.current = s
          s.setGameState(state)
          s.setQuestion(currentQ)
          ;(s as any).onAnswer = onAnswer
        }
      }
      const poll = () => { initScene(); if (!sceneRef.current) setTimeout(poll, 80) }
      setTimeout(poll, 60)
    } else if (sceneRef.current) {
      sceneRef.current.setGameState(state)
      sceneRef.current.setQuestion(currentQ)
    }
  }, [state.status, currentQ])

  // Keep HUD synced
  useEffect(() => {
    if (sceneRef.current) sceneRef.current.setGameState(state)
  }, [state.level, state.score, state.lives, state.qIndex])

  const onAnswer = (correct: boolean) => {
    const newLives = correct ? state.lives : Math.max(0, state.lives - 1)
    const newScore = correct ? state.score + 10 : state.score
    const nextQIdx = correct ? state.qIndex + 1 : state.qIndex

    // out of lives
    if (!correct && newLives === 0) {
      setState(prev => ({ ...prev, lives: newLives, score: newScore, status: 'gameOver' }))
      return
    }

    // Level complete after 5 correct answers
    if (nextQIdx >= QUESTIONS_PER_LEVEL) {
      if (state.level >= MAX_LEVELS) {
        setState(prev => ({ ...prev, lives: newLives, score: newScore, status: 'gameComplete' }))
      } else {
        setState(prev => ({ ...prev, lives: newLives, score: newScore, status: 'levelComplete' }))
      }
      return
    }

    // next question only when correct; otherwise retry same
    if (correct) {
      const levelQs = getLevelSlice(state.level)
      setCurrentQ(levelQs[nextQIdx])
    }

    setState(prev => ({ ...prev, lives: newLives, score: newScore, qIndex: nextQIdx }))
  }

  const restart = () => {
    setState({ level: 1, score: 0, lives: 3, qIndex: 0, status: 'levelStart' })
    setCurrentQ(getLevelSlice(1)[0])
  }

  const nextLevel = () => {
    const newLevel = state.level + 1
    setState(prev => ({ ...prev, level: newLevel, qIndex: 0, status: 'levelStart' }))
    setCurrentQ(getLevelSlice(newLevel)[0])
  }

  // Screens
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
