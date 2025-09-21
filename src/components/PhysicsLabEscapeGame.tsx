import React, { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser'

// Game constants
const QUESTIONS_PER_LEVEL = 5
const MAX_LEVELS = 3

// Types
interface Question {
  id: number
  question: string
  options: Array<string | number>
  correctAnswer: number // index in options
  difficulty: number
}

interface PhysicsLabEscapeProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

interface GameState {
  level: number
  score: number
  lives: number
  questionsInLevel: number
  status: 'levelStart' | 'playing' | 'levelComplete' | 'gameOver' | 'gameComplete'
}

// Slice helper
const getLevelSlice = (questions: Question[], level: number) => {
  const start = (level - 1) * QUESTIONS_PER_LEVEL
  return questions.slice(start, start + QUESTIONS_PER_LEVEL)
}

// Hardcoded sample questions for Physics (as placeholders until DB integration)
const sampleQuestions: Question[] = [
  // Level 1 (Motion & Measurement)
  { id: 1, question: 'SI unit of force?', options: ['N', 'J', 'W'], correctAnswer: 0, difficulty: 1 },
  { id: 2, question: '1 km = ? m', options: ['100', '1000', '10'], correctAnswer: 1, difficulty: 1 },
  { id: 3, question: 'Speed formula?', options: ['distance/time', 'mass*acceleration', 'force*distance'], correctAnswer: 0, difficulty: 1 },
  { id: 4, question: 'SI unit of length?', options: ['m', 'cm', 'km'], correctAnswer: 0, difficulty: 1 },
  { id: 5, question: '1 cm = ? mm', options: ['1', '10', '100'], correctAnswer: 1, difficulty: 1 },
  // Level 2 (Force & Energy)
  { id: 6, question: 'Work = ?', options: ['Force × Distance', 'Mass × Acceleration', 'Power × Time'], correctAnswer: 0, difficulty: 2 },
  { id: 7, question: 'Energy unit?', options: ['J', 'W', 'N'], correctAnswer: 0, difficulty: 2 },
  { id: 8, question: 'Power = ?', options: ['Work/Time', 'Energy*Time', 'Force*Time'], correctAnswer: 0, difficulty: 2 },
  { id: 9, question: 'Potential energy depends on?', options: ['Height & mass', 'Temperature', 'Color'], correctAnswer: 0, difficulty: 2 },
  { id: 10, question: 'Friction is a force that?', options: ['Opposes motion', 'Increases speed', 'Creates energy'], correctAnswer: 0, difficulty: 2 },
  // Level 3 (Machines)
  { id: 11, question: 'A lever is an example of?', options: ['Simple Machine', 'Pulley', 'Complex Circuit'], correctAnswer: 0, difficulty: 3 },
  { id: 12, question: 'Pulley helps by?', options: ['Changing direction of force', 'Increasing speed', 'Decreasing friction'], correctAnswer: 0, difficulty: 3 },
  { id: 13, question: 'Inclined plane reduces?', options: ['Effort', 'Distance', 'Weight'], correctAnswer: 0, difficulty: 3 },
  { id: 14, question: 'Wheel & axle is used to?', options: ['Reduce effort', 'Store energy', 'Measure mass'], correctAnswer: 0, difficulty: 3 },
  { id: 15, question: 'Screw is a type of?', options: ['Inclined plane', 'Lever', 'Pulley'], correctAnswer: 0, difficulty: 3 }
]

class PhysicsLabScene extends Phaser.Scene {
  constructor() { super('PhysicsLab') }
  private question: Question | null = null
  private gameState: GameState | null = null
  private onAnswer: ((correct: boolean) => void) | null = null

  private questionText?: Phaser.GameObjects.Text
  private scoreText?: Phaser.GameObjects.Text
  private levelText?: Phaser.GameObjects.Text
  private livesText?: Phaser.GameObjects.Text
  private door?: Phaser.GameObjects.Rectangle
  private doorLock?: Phaser.GameObjects.Ellipse
  private panels: Phaser.GameObjects.Container[] = []

  init(data: { question: Question | null, gameState: GameState, onAnswer: (ok: boolean) => void }) {
    this.question = data.question
    this.gameState = data.gameState
    this.onAnswer = data.onAnswer
  }

  preload() {}

  create() {
    // Background: simple lab vibe using gradients/rects
    const w = this.scale.width
    const h = this.scale.height
    this.add.rectangle(0, 0, w, h, 0x111827).setOrigin(0) // dark bg
    // floor
    this.add.rectangle(0, h - 120, w, 120, 0x0f172a).setOrigin(0)
    // lab tables
    this.add.rectangle(60, h - 180, 260, 24, 0x1f2937).setOrigin(0)
    this.add.rectangle(w - 320, h - 220, 260, 24, 0x1f2937).setOrigin(0)

    // Locked door at center-right
    this.door = this.add.rectangle(w - 180, h - 300, 120, 220, 0x374151).setOrigin(0.5, 0)
    this.doorLock = this.add.ellipse(this.door.x, this.door.y + 110, 16, 16, 0xf59e0b)

    // HUD
    this.createHUD()

    // Question
    if (this.question) this.createQuestion(this.question)

    this.events.emit('ready')
  }

  private createHUD() {
    if (!this.gameState) return
    // Top-left hearts
    this.livesText = this.add.text(20, 20, `Lives: ${'❤️'.repeat(this.gameState.lives)}`, { fontSize: '18px', color: '#fca5a5' })
    // Top-center question label is separate
    // Top-right score
    const w = this.scale.width
    this.levelText = this.add.text(w - 20, 20, `Level: ${this.gameState.level}`, { fontSize: '18px', color: '#cbd5e1' }).setOrigin(1, 0)
    this.scoreText = this.add.text(w - 20, 48, `Score: ${this.gameState.score}`, { fontSize: '18px', color: '#cbd5e1' }).setOrigin(1, 0)
  }

  private updateHUD() {
    if (!this.gameState) return
    this.levelText?.setText(`Level: ${this.gameState.level}`)
    this.livesText?.setText(`Lives: ${'❤️'.repeat(this.gameState.lives)}`)
    this.scoreText?.setText(`Score: ${this.gameState.score}`)
  }

  private createQuestion(q: Question) {
    // cleanup
    this.panels.forEach(p => p.destroy()); this.panels = []
    this.questionText?.destroy()

    // Top-center question
    this.questionText = this.add.text(this.scale.width / 2, 70, q.question, {
      fontSize: '28px', color: '#ffffff', align: 'center', wordWrap: { width: this.scale.width - 160 }
    }).setOrigin(0.5, 0.5)

    // Create 3-4 clickable answer panels styled as lab panels/keys
    const count = q.options.length
    const spacing = 200
    const totalWidth = (count - 1) * spacing
    const startX = this.scale.width / 2 - totalWidth / 2
    const y = this.scale.height / 2 + 20

    q.options.forEach((opt, i) => {
      const x = startX + i * spacing
      const panel = this.add.container(x, y)
      const base = this.add.rectangle(0, 0, 180, 90, 0x1f2937).setStrokeStyle(2, 0x8b5cf6)
      const label = this.add.text(0, 0, String(opt), { fontSize: '18px', color: '#e5e7eb' }).setOrigin(0.5)
      const glow = this.add.rectangle(0, 0, 190, 100, 0x8b5cf6, 0).setVisible(true)
      panel.add([base, glow, label])

      panel.setSize(180, 90)
      panel.setInteractive(new Phaser.Geom.Rectangle(-90, -45, 180, 90), Phaser.Geom.Rectangle.Contains)
      panel.on('pointerover', () => base.setFillStyle(0x111827))
      panel.on('pointerout', () => base.setFillStyle(0x1f2937))

      panel.on('pointerdown', () => {
        const correct = i === q.correctAnswer
        if (correct) {
          // Door unlock animation
          this.playDoorUnlock()
          glow.fillAlpha = 0.25
          this.tweens.add({ targets: glow, alpha: 0, scale: 1.1, duration: 600 })
        } else {
          // Error buzzer effect (red flash)
          this.cameras.main.flash(150, 239, 68, 68)
          this.shakeLives()
        }
        this.time.delayedCall(650, () => this.onAnswer && this.onAnswer(correct))
      })

      this.panels.push(panel)
    })
  }

  private playDoorUnlock() {
    if (!this.door || !this.doorLock) return
    // Capture non-null locals for safety inside callbacks
    const door = this.door as Phaser.GameObjects.Rectangle
    const doorLock = this.doorLock as Phaser.GameObjects.Ellipse
    // Simulate lock turning green and door sliding open
    doorLock.setFillStyle(0x22c55e)
    this.tweens.add({
      targets: door,
      x: door.x + 160,
      duration: 600,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        // Reset door back for next puzzle
        this.tweens.add({ targets: door, x: door.x - 160, duration: 0 })
        doorLock.setFillStyle(0xf59e0b)
      }
    })
  }

  private shakeLives() {
    if (!this.livesText) return
    this.tweens.add({ targets: this.livesText, angle: { from: -8, to: 8 }, yoyo: true, repeat: 2, duration: 80, onComplete: () => this.livesText && this.livesText.setAngle(0) })
  }

  public setQuestion(q: Question) {
    this.question = q
    this.createQuestion(q)
  }

  public setGameState(state: GameState) {
    this.gameState = state
    this.updateHUD()
  }
}

const PhysicsLabEscapeGame: React.FC<PhysicsLabEscapeProps> = ({ subject, grade, lesson, onBack }) => {
  const [gameState, setGameState] = useState<GameState>({ level: 1, score: 0, lives: 3, questionsInLevel: 0, status: 'levelStart' })
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const gameRef = useRef<Phaser.Game | null>(null)
  const sceneRef = useRef<PhysicsLabScene | null>(null)

  // Load placeholder questions for Physics
  useEffect(() => {
    // In future, fetch based on subject/grade/lesson
    const q = sampleQuestions
    setQuestions(q)
    const first = getLevelSlice(q, 1)[0]
    setCurrentQuestion(first)
  }, [subject, grade, lesson])

  // Level start gate
  useEffect(() => {
    if (gameState.status === 'levelStart') {
      const t = setTimeout(() => setGameState(prev => ({ ...prev, status: 'playing' })), 1200)
      return () => clearTimeout(t)
    }
  }, [gameState.status])

  // Create Phaser game when playing
  useEffect(() => {
    if (gameState.status !== 'playing' || !currentQuestion) {
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
        parent: 'physics-lab-phaser',
        scene: PhysicsLabScene
      }
      gameRef.current = new Phaser.Game(config)

      const initScene = () => {
        const s = gameRef.current?.scene.getScene('PhysicsLab') as PhysicsLabScene
        if (s) {
          sceneRef.current = s
          s.setGameState(gameState)
          s.setQuestion(currentQuestion)
          ;(s as any).onAnswer = handleAnswer
        }
      }
      const poll = () => { initScene(); if (!sceneRef.current) setTimeout(poll, 80) }
      setTimeout(poll, 60)
    } else if (sceneRef.current) {
      sceneRef.current.setGameState(gameState)
      sceneRef.current.setQuestion(currentQuestion)
    }
  }, [gameState.status, currentQuestion])

  // Update HUD on changes
  useEffect(() => {
    if (sceneRef.current) sceneRef.current.setGameState(gameState)
  }, [gameState.level, gameState.score, gameState.lives, gameState.questionsInLevel])

  const handleAnswer = (correct: boolean) => {
    const newLives = correct ? gameState.lives : Math.max(0, gameState.lives - 1)
    const newScore = correct ? gameState.score + 10 : gameState.score
    const nextQInLevel = correct ? gameState.questionsInLevel + 1 : gameState.questionsInLevel

    if (!correct && newLives === 0) {
      setGameState(prev => ({ ...prev, lives: newLives, score: newScore, status: 'gameOver' }))
      return
    }

    if (nextQInLevel >= QUESTIONS_PER_LEVEL) {
      if (gameState.level >= MAX_LEVELS) {
        setGameState(prev => ({ ...prev, lives: newLives, score: newScore, status: 'gameComplete' }))
      } else {
        setGameState(prev => ({ ...prev, lives: newLives, score: newScore, status: 'levelComplete' }))
      }
      return
    }

    if (correct) {
      const levelQs = getLevelSlice(questions, gameState.level)
      const nq = levelQs[nextQInLevel]
      setCurrentQuestion(nq)
    }
    setGameState(prev => ({ ...prev, lives: newLives, score: newScore, questionsInLevel: nextQInLevel }))
  }

  const restart = () => {
    const first = getLevelSlice(questions, 1)[0] || questions[0]
    setCurrentQuestion(first)
    setGameState({ level: 1, score: 0, lives: 3, questionsInLevel: 0, status: 'levelStart' })
  }

  const nextLevel = () => {
    const newLevel = gameState.level + 1
    const first = getLevelSlice(questions, newLevel)[0] || questions[0]
    setCurrentQuestion(first)
    setGameState(prev => ({ ...prev, level: newLevel, questionsInLevel: 0, status: 'levelStart' }))
  }

  // Screens
  if (gameState.status === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚗️</div>
          <div className="text-5xl font-bold text-white mb-2">Level {gameState.level}</div>
          <div className="text-lg text-slate-300">Solve 5 physics puzzles to unlock the lab door…</div>
        </div>
      </div>
    )
  }

  if (gameState.status === 'levelComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-400 to-teal-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">🔓</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Level {gameState.level} Complete!</h2>
          <p className="text-gray-600 mb-4">Score: {gameState.score}</p>
          <div className="space-y-3">
            <button onClick={nextLevel} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">➡️ Next Level</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🎯 Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState.status === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-400 to-pink-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">💥</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Game Over</h2>
          <p className="text-gray-600 mb-4">Final Score: {gameState.score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Replay</button>
            <button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🎯 Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState.status === 'gameComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">You Escaped the Lab!</h2>
          <p className="text-gray-600 mb-4">Total Score: {gameState.score}</p>
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
      <div id="physics-lab-phaser" className="absolute inset-0 pt-16 flex items-center justify-center" />
    </div>
  )
}

export default PhysicsLabEscapeGame
