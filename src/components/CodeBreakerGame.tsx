import React, { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser'
import { getQuestionsForLesson, type Question } from '../data/questionBank'

// Game constants
const QUESTIONS_PER_LEVEL = 5
const MAX_LEVELS = 3

// Utility: slice questions for a particular level
const getLevelSlice = (questions: Question[], level: number) => {
  const start = (level - 1) * QUESTIONS_PER_LEVEL
  return questions.slice(start, start + QUESTIONS_PER_LEVEL)
}

interface CodeBreakerProps {
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

class CodeBreakerScene extends Phaser.Scene {
  constructor() { super('CodeBreaker') }
  private question: Question | null = null
  private gameState: GameState | null = null
  private onAnswer: ((correct: boolean) => void) | null = null

  private questionText?: Phaser.GameObjects.Text
  private scoreText?: Phaser.GameObjects.Text
  private levelText?: Phaser.GameObjects.Text
  private livesText?: Phaser.GameObjects.Text
  private blocks: Phaser.GameObjects.Rectangle[] = []
  private blockTexts: Phaser.GameObjects.Text[] = []

  init(data: { question: Question | null, gameState: GameState, onAnswer: (ok: boolean) => void }) {
    this.question = data.question
    this.gameState = data.gameState
    this.onAnswer = data.onAnswer
  }

  preload() {}

  create() {
    // Background
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x0b1526).setOrigin(0)
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x0b1526, 0.5).setOrigin(0)

    // HUD
    this.createHUD()

    // Question
    if (this.question) this.createQuestion(this.question)

    this.events.emit('ready')
  }

  private createHUD() {
    if (!this.gameState) return

    this.levelText = this.add.text(20, 20, `Level: ${this.gameState.level}` , {
      fontSize: '18px', color: '#cbd5e1'
    })
    this.livesText = this.add.text(20, 48, `Lives: ${'❤️'.repeat(this.gameState.lives)}`, {
      fontSize: '18px', color: '#fca5a5'
    })
    this.scoreText = this.add.text(this.scale.width - 20, 20, `Score: ${this.gameState.score}`, {
      fontSize: '18px', color: '#cbd5e1'
    }).setOrigin(1, 0)
  }

  private updateHUD() {
    if (!this.gameState) return
    this.levelText?.setText(`Level: ${this.gameState.level}`)
    this.livesText?.setText(`Lives: ${'❤️'.repeat(this.gameState.lives)}`)
    this.scoreText?.setText(`Score: ${this.gameState.score}`)
  }

  private createQuestion(q: Question) {
    // Cleanup old
    this.blocks.forEach(b => b.destroy()); this.blocks = []
    this.blockTexts.forEach(t => t.destroy()); this.blockTexts = []
    this.questionText?.destroy()

    // Top-center question
    this.questionText = this.add.text(this.scale.width / 2, 70, q.question, {
      fontSize: '28px', color: '#ffffff', align: 'center', wordWrap: { width: this.scale.width - 120 }
    }).setOrigin(0.5, 0.5)

    // Answer blocks layout
    const count = q.options.length
    const startX = this.scale.width / 2 - ((count - 1) * 180) / 2
    const y = this.scale.height / 2 + 40

    q.options.forEach((opt, index) => {
      const x = startX + index * 180
      const rect = this.add.rectangle(x, y, 160, 80, 0x1f2937).setStrokeStyle(2, 0x60a5fa)
      rect.setInteractive({ useHandCursor: true })
      const label = this.add.text(x, y, String(opt), {
        fontSize: '18px', color: '#e5e7eb', align: 'center', wordWrap: { width: 140 }
      }).setOrigin(0.5)
      rect.on('pointerdown', () => this.handlePick(index, x, y))
      this.blocks.push(rect); this.blockTexts.push(label)
    })
  }

  private handlePick(index: number, x: number, y: number) {
    if (!this.question || !this.onAnswer) return
    const isCorrect = index === this.question.correctAnswer

    // Animation feedback
    if (isCorrect) {
      const glow = this.add.rectangle(x, y, 170, 90, 0x22c55e, 0.25)
      this.tweens.add({ targets: glow, alpha: 0, scale: 1.2, duration: 600, onComplete: () => glow.destroy() })
      const text = this.add.text(this.scale.width/2, 130, 'Code Unlocked ✅', { fontSize: '26px', color: '#22c55e' }).setOrigin(0.5)
      this.tweens.add({ targets: text, alpha: 0, y: 100, duration: 900, onComplete: () => text.destroy() })
    } else {
      const glow = this.add.rectangle(x, y, 170, 90, 0xef4444, 0.3)
      this.tweens.add({ targets: glow, alpha: 0, scale: 1.1, duration: 600, onComplete: () => glow.destroy() })
      const text = this.add.text(this.scale.width/2, 130, 'Access Denied ❌', { fontSize: '26px', color: '#ef4444' }).setOrigin(0.5)
      this.tweens.add({ targets: text, alpha: 0, y: 100, duration: 900, onComplete: () => text.destroy() })
    }

    this.time.delayedCall(650, () => this.onAnswer && this.onAnswer(isCorrect))
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

const CodeBreakerGame: React.FC<CodeBreakerProps> = ({ subject, grade, lesson, onBack }) => {
  const [gameState, setGameState] = useState<GameState>({ level: 1, score: 0, lives: 3, questionsInLevel: 0, status: 'levelStart' })
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const gameRef = useRef<Phaser.Game | null>(null)
  const sceneRef = useRef<CodeBreakerScene | null>(null)

  // Load lesson questions (with fallback samples for CS Grade 6)
  useEffect(() => {
    let q = getQuestionsForLesson(subject, grade, lesson)
    if (q.length === 0) {
      const samples: Question[] = [
        // Level 1
        { id: 1, question: 'print(2 + 3 * 2)', options: ['10', '7', '12'], correctAnswer: 1, difficulty: 1 },
        { id: 2, question: 'print("Hello" + "World")', options: ['Hello World', 'HelloWorld', 'Hello+World'], correctAnswer: 1, difficulty: 1 },
        { id: 3, question: 'print(5 - 2 * 2)', options: ['1', '6', '9'], correctAnswer: 0, difficulty: 1 },
        { id: 4, question: 'print(3**2)', options: ['6', '9', '8'], correctAnswer: 1, difficulty: 1 },
        { id: 5, question: 'print(10//3)', options: ['3', '3.3', '4'], correctAnswer: 0, difficulty: 1 },
        // Level 2
        { id: 6, question: 'Which is used for comments in Python?', options: ['//', '#', '/* */'], correctAnswer: 1, difficulty: 2 },
        { id: 7, question: 'Which is a valid variable name?', options: ['2name', 'name2', '@name'], correctAnswer: 1, difficulty: 2 },
        { id: 8, question: 'Which is string literal in Python?', options: ['hello', '"hello"', 'hello()'], correctAnswer: 1, difficulty: 2 },
        { id: 9, question: 'Which operator is assignment?', options: ['==', '=', '==='], correctAnswer: 1, difficulty: 2 },
        { id: 10, question: 'Which is a list literal?', options: ['{}', '[]', '()'], correctAnswer: 1, difficulty: 2 },
        // Level 3
        { id: 11, question: 'Binary of 5?', options: ['110', '101', '111'], correctAnswer: 1, difficulty: 3 },
        { id: 12, question: 'NOT True = ?', options: ['True', 'False', '1'], correctAnswer: 1, difficulty: 3 },
        { id: 13, question: 'True AND False = ?', options: ['True', 'False', 'Error'], correctAnswer: 1, difficulty: 3 },
        { id: 14, question: 'Binary of 4?', options: ['100', '010', '001'], correctAnswer: 0, difficulty: 3 },
        { id: 15, question: 'True OR False = ?', options: ['True', 'False', 'None'], correctAnswer: 0, difficulty: 3 }
      ]
      q = samples
    }
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
      // Tear down if leaving play
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
        parent: 'code-breaker-phaser',
        scene: CodeBreakerScene
      }
      gameRef.current = new Phaser.Game(config)

      const initScene = () => {
        const s = gameRef.current?.scene.getScene('CodeBreaker') as CodeBreakerScene
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

  // Update scene HUD on changes
  useEffect(() => {
    if (sceneRef.current) sceneRef.current.setGameState(gameState)
  }, [gameState.level, gameState.score, gameState.lives, gameState.questionsInLevel])

  const handleAnswer = (correct: boolean) => {
    // Lives & score
    const newLives = correct ? gameState.lives : Math.max(0, gameState.lives - 1)
    const newScore = correct ? gameState.score + 10 : gameState.score
    const nextQInLevel = correct ? gameState.questionsInLevel + 1 : gameState.questionsInLevel

    // If wrong and out of lives
    if (!correct && newLives === 0) {
      setGameState(prev => ({ ...prev, lives: newLives, score: newScore, status: 'gameOver' }))
      return
    }

    // If finished level
    if (nextQInLevel >= QUESTIONS_PER_LEVEL) {
      if (gameState.level >= MAX_LEVELS) {
        setGameState(prev => ({ ...prev, lives: newLives, score: newScore, status: 'gameComplete' }))
      } else {
        setGameState(prev => ({ ...prev, lives: newLives, score: newScore, status: 'levelComplete' }))
      }
      return
    }

    // Else, load next question (if correct) or retry same (if wrong)
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
          <div className="text-6xl mb-4">🧩</div>
          <div className="text-5xl font-bold text-white mb-2">Level {gameState.level}</div>
          <div className="text-lg text-slate-300">Solve 5 coding challenges to unlock the system…</div>
        </div>
      </div>
    )
  }

  if (gameState.status === 'levelComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-400 to-teal-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">✅</div>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">You Win!</h2>
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
      <div id="code-breaker-phaser" className="absolute inset-0 pt-16 flex items-center justify-center" />
    </div>
  )
}

export default CodeBreakerGame
