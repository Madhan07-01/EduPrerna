import { useState, useEffect, useRef } from 'react'
import { getQuestionsForLesson, type Question } from '../data/questionBank'
import Phaser from 'phaser'

// Game progression constants
const QUESTIONS_PER_LEVEL = 5
const MAX_LEVELS = 3

// Helper: slice questions for a given level (5 per level)
const getLevelSlice = (questions: Question[], level: number): Question[] => {
  const start = (level - 1) * QUESTIONS_PER_LEVEL
  return questions.slice(start, start + QUESTIONS_PER_LEVEL)
}

interface MathArcherGameProps {
  subject: string
  grade: string  
  lesson: string
  onBack: () => void
}

interface GameState {
  level: number
  score: number
  hearts: number
  currentQuestion: number
  questionsInLevel: number
  gameStatus: 'levelStart' | 'playing' | 'paused' | 'levelComplete' | 'gameComplete' | 'gameOver'
}

// Phaser game scene
class ArcherScene extends Phaser.Scene {
  constructor() {
    super('MathArcher')
  }
  private question: Question | null = null
  private gameState: GameState | null = null
  private onQuestionAnswered: ((isCorrect: boolean) => void) | null = null
  private targets: Phaser.GameObjects.Ellipse[] = []
  private targetTexts: Phaser.GameObjects.Text[] = []
  private archer: Phaser.GameObjects.Ellipse | null = null
  private questionText: Phaser.GameObjects.Text | null = null
  private scoreText: Phaser.GameObjects.Text | null = null
  private levelText: Phaser.GameObjects.Text | null = null
  private heartsText: Phaser.GameObjects.Text | null = null
  private questionNumberText: Phaser.GameObjects.Text | null = null
  private aimLine: Phaser.GameObjects.Line | null = null
  private isAiming: boolean = false
  private aimAngle: number = 0
  private static readonly QUESTIONS_PER_LEVEL = QUESTIONS_PER_LEVEL

  init(data: { 
    question: Question, 
    gameState: GameState,
    onQuestionAnswered: (isCorrect: boolean) => void
  }) {
    this.question = data.question
    this.gameState = data.gameState
    this.onQuestionAnswered = data.onQuestionAnswered
  }

  preload() {
    // Preload any assets if needed
  }

  create() {
    // Create background - forest/archery range theme
    this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x2d5016).setOrigin(0, 0)
    this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x4a7c59, 0.3).setOrigin(0, 0)

    // Add ground
    this.add.rectangle(0, this.cameras.main.height - 80, this.cameras.main.width, 80, 0x8b4513).setOrigin(0, 0)

    // Create HUD
    this.createHUD()

    // Create question display
    if (this.question) {
      this.questionText = this.add.text(
        this.cameras.main.width / 2, 
        50, 
        this.question.question, 
        { 
          fontSize: '28px', 
          color: '#ffffff',
          align: 'center',
          wordWrap: { width: this.cameras.main.width - 100 }
        }
      ).setOrigin(0.5, 0)

      // Add instruction text
      this.add.text(
        this.cameras.main.width / 2, 
        100, 
        '🏹 Click and drag to aim, release to shoot at the correct target!', 
        { 
          fontSize: '16px', 
          color: '#90ee90',
          fontStyle: 'bold'
        }
      ).setOrigin(0.5, 0)
    }

    // Create archer
    this.createArcher()

    // Create targets
    this.createTargets()

    // Add mouse/touch controls
    this.input.on('pointerdown', this.startAiming, this)
    this.input.on('pointermove', this.updateAim, this)
    this.input.on('pointerup', this.shootArrow, this)

    // Keyboard: SPACE to shoot toward aimed direction
    this.input.keyboard?.on('keydown-SPACE', this.shootSpace, this)

    // Notify external code that scene is ready for data
    this.events.emit('ready')
  }

  private createHUD() {
    if (!this.gameState) return

    // Level
    this.levelText = this.add.text(20, 20, `Level: ${this.gameState.level}`, {
      fontSize: '18px',
      color: '#ffffff',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: { x: 10, y: 5 }
    })

    // Question number
    this.questionNumberText = this.add.text(
      this.cameras.main.width / 2, 
      20, 
      `Question: ${this.gameState.questionsInLevel + 1}/${ArcherScene.QUESTIONS_PER_LEVEL}`, 
      {
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: { x: 10, y: 5 }
      }
    ).setOrigin(0.5, 0)

    // Score (top-right)
    this.scoreText = this.add.text(
      this.cameras.main.width - 20, 
      20, 
      `Score: ${this.gameState.score}`, 
      {
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: { x: 10, y: 5 }
      }
    ).setOrigin(1, 0)

    // Hearts (top-left)
    this.heartsText = this.add.text(
      20, 
      50, 
      `Lives: ${'❤️'.repeat(this.gameState.hearts)}`, 
      {
        fontSize: '18px',
        color: '#ffb3b3',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: { x: 10, y: 5 }
      }
    ).setOrigin(0, 0)
  }

  private updateHUD() {
    if (!this.gameState) return

    if (this.levelText) {
      this.levelText.setText(`Level: ${this.gameState.level}`)
    }

    if (this.questionNumberText) {
      this.questionNumberText.setText(`Question: ${this.gameState.questionsInLevel + 1}/${ArcherScene.QUESTIONS_PER_LEVEL}`)
    }

    if (this.scoreText) {
      this.scoreText.setText(`Score: ${this.gameState.score}`)
    }

    if (this.heartsText) {
      this.heartsText.setText(`Lives: ${'❤️'.repeat(this.gameState.hearts)}`)
    }
  }

  private createArcher() {
    const archerX = 100
    const archerY = this.cameras.main.height - 120

    // Create archer body (simple representation)
    this.archer = this.add.ellipse(archerX, archerY, 30, 50, 0x8b4513)
    
    // Create bow
    this.add.ellipse(archerX + 20, archerY - 10, 8, 40, 0x654321)
    
    // Add archer face
    this.add.ellipse(archerX, archerY - 30, 20, 20, 0xfdbcb4)
    
    // Add eyes
    this.add.ellipse(archerX - 5, archerY - 35, 3, 3, 0x000000)
    this.add.ellipse(archerX + 5, archerY - 35, 3, 3, 0x000000)
  }

  private createTargets() {
    if (!this.question) return

    const colors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4]
    const letters = ['A', 'B', 'C', 'D']

    // Clear existing targets
    this.targets.forEach(target => target.destroy())
    this.targetTexts.forEach(text => text.destroy())
    this.targets = []
    this.targetTexts = []

    // Create new targets
    this.question.options.forEach((option, index) => {
      const x = 500 + (index % 2) * 200
      const y = 200 + Math.floor(index / 2) * 150
      
      const color = colors[index % colors.length]
      
      // Create target (bullseye style)
      const outerTarget = this.add.ellipse(x, y, 80, 80, color)
      this.add.ellipse(x, y, 60, 60, 0xffffff)
      this.add.ellipse(x, y, 40, 40, color)
      this.add.ellipse(x, y, 20, 20, 0xffffff)
      
      outerTarget.setInteractive()
      
      // Add text
      const text = this.add.text(x, y + 50, `${letters[index]}: ${option}`, {
        fontSize: '16px',
        color: '#ffffff',
        align: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: { x: 8, y: 4 }
      }).setOrigin(0.5, 0.5)
      
      // Store references
      this.targets.push(outerTarget)
      this.targetTexts.push(text)
      
      // Add click event for mobile/touch
      outerTarget.on('pointerdown', () => {
        this.hitTarget(index, x, y)
      })
    })
  }

  private startAiming(pointer: Phaser.Input.Pointer) {
    if (!this.archer) return
    
    this.isAiming = true
    
    // Create aim line
    if (this.aimLine) {
      this.aimLine.destroy()
    }
    
    this.aimLine = this.add.line(0, 0, this.archer.x + 20, this.archer.y - 10, pointer.x, pointer.y, 0xffff00)
    this.aimLine.setOrigin(0, 0)
    this.aimLine.setAlpha(0.7)
  }

  private updateAim(pointer: Phaser.Input.Pointer) {
    if (!this.isAiming || !this.archer || !this.aimLine) return
    
    // Update aim line
    this.aimLine.setTo(this.archer.x + 20, this.archer.y - 10, pointer.x, pointer.y)
    
    // Calculate aim angle
    const dx = pointer.x - (this.archer.x + 20)
    const dy = pointer.y - (this.archer.y - 10)
    this.aimAngle = Math.atan2(dy, dx)
  }

  private shootArrow(pointer: Phaser.Input.Pointer) {
    if (!this.isAiming || !this.archer) return
    
    this.isAiming = false
    
    // Hide aim line
    if (this.aimLine) {
      this.aimLine.destroy()
      this.aimLine = null
    }
    
    // Create and animate arrow
    const startX = this.archer.x + 20
    const startY = this.archer.y - 10
    
    const arrow = this.add.line(0, 0, 0, 0, 20, 0, 0xffd700)
    arrow.setPosition(startX, startY)
    arrow.setRotation(this.aimAngle)
    arrow.setLineWidth(3)
    
    // Animate arrow flight
    this.tweens.add({
      targets: arrow,
      x: pointer.x,
      y: pointer.y,
      duration: 500,
      ease: 'Power2',
      onComplete: () => {
        // Check if arrow hit any target
        let hitTarget = false
        this.targets.forEach((target, index) => {
          const distance = Phaser.Math.Distance.Between(arrow.x, arrow.y, target.x, target.y)
          if (distance < 40) { // Hit radius
            this.hitTarget(index, target.x, target.y)
            hitTarget = true
          }
        })
        
        if (!hitTarget) {
          // Miss - show miss effect
          this.showMissEffect(arrow.x, arrow.y)
        }
        
        arrow.destroy()
      }
    })
  }

  // Shoot using keyboard SPACE toward the nearest target along the aim line
  private shootSpace() {
    if (!this.archer) return

    // Default aim to the right if not set by user
    const aim = this.aimAngle || 0

    const startX = this.archer.x + 20
    const startY = this.archer.y - 10
    const dirX = Math.cos(aim)
    const dirY = Math.sin(aim)

    // Create arrow visual
    const arrow = this.add.line(0, 0, 0, 0, 20, 0, 0xffd700)
    arrow.setPosition(startX, startY)
    arrow.setRotation(aim)
    arrow.setLineWidth(3)

    // Find nearest target that lies within a small angle from aim and in front of the archer
    const candidate = this.findTargetAlongAim(startX, startY, aim)

    // Compute destination: either the candidate target or off-screen along the ray
    let destX = startX + dirX * 1000
    let destY = startY + dirY * 1000
    let targetIndex: number | null = null
    if (candidate) {
      destX = candidate.target.x
      destY = candidate.target.y
      targetIndex = candidate.index
    }

    this.tweens.add({
      targets: arrow,
      x: destX,
      y: destY,
      duration: 500,
      ease: 'Power2',
      onComplete: () => {
        if (targetIndex != null) {
          this.hitTarget(targetIndex, destX, destY)
        } else {
          this.showMissEffect(arrow.x, arrow.y)
        }
        arrow.destroy()
      }
    })
  }

  // Helper: find nearest target aligned with aim angle
  private findTargetAlongAim(startX: number, startY: number, aim: number): { target: Phaser.GameObjects.Ellipse, index: number } | null {
    const MAX_ANGLE_DIFF = Phaser.Math.DegToRad(25) // ~25 degrees tolerance
    let bestTarget: Phaser.GameObjects.Ellipse | null = null
    let bestIndex: number | null = null
    let bestDist = Infinity
    this.targets.forEach((t, i) => {
      const dx = t.x - startX
      const dy = t.y - startY
      const angleToTarget = Math.atan2(dy, dx)
      let d = Phaser.Math.Angle.Wrap(angleToTarget - aim)
      d = Math.abs(d)
      const dot = dx * Math.cos(aim) + dy * Math.sin(aim)
      if (d <= MAX_ANGLE_DIFF && dot > 0) {
        const dist = Math.hypot(dx, dy)
        if (dist < bestDist) {
          bestDist = dist
          bestTarget = t
          bestIndex = i
        }
      }
    })
    if (bestTarget == null || bestIndex == null) return null
    return { target: bestTarget, index: bestIndex }
  }

  private hitTarget(index: number, x: number, y: number) {
    if (!this.question || !this.onQuestionAnswered) return

    const isCorrect = index === this.question.correctAnswer
    
    // Create hit effect
    this.createHitEffect(x, y, isCorrect)
    
    // Show result text
    const resultText = this.add.text(
      this.cameras.main.width / 2, 
      150, 
      isCorrect ? 'Bullseye! 🎯' : 'Miss! 💥', 
      {
        fontSize: '32px',
        color: isCorrect ? '#10b981' : '#ef4444',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5, 0)
    
    // Animate result text
    this.tweens.add({
      targets: resultText,
      alpha: 0,
      y: 100,
      duration: 1500,
      ease: 'Power2'
    })
    
    // Notify parent component
    this.onQuestionAnswered(isCorrect)
  }

  private showMissEffect(x: number, y: number) {
    // Create dust cloud effect for missed shots
    for (let i = 0; i < 10; i++) {
      const particle = this.add.ellipse(x, y, 8, 8, 0x8b4513)
      const angle = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360))
      const speed = Phaser.Math.Between(50, 150)
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed
      
      this.tweens.add({
        targets: particle,
        x: x + vx,
        y: y + vy,
        alpha: 0,
        scale: 0,
        duration: 800,
        ease: 'Power2',
        onComplete: () => particle.destroy()
      })
    }
  }

  private createHitEffect(x: number, y: number, isCorrect: boolean) {
    const color = isCorrect ? 0x10b981 : 0xef4444
    
    // Create particle burst effect
    for (let i = 0; i < 15; i++) {
      const particle = this.add.ellipse(x, y, 12, 12, color)
      const angle = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360))
      const speed = Phaser.Math.Between(100, 250)
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed
      
      this.tweens.add({
        targets: particle,
        x: x + vx,
        y: y + vy,
        alpha: 0,
        scale: 0,
        duration: 1000,
        ease: 'Power2',
        onComplete: () => particle.destroy()
      })
    }
    
    // Add impact ring
    const ring = this.add.ellipse(x, y, 20, 20, color, 0)
    ring.setStrokeStyle(4, color)
    
    this.tweens.add({
      targets: ring,
      scaleX: 3,
      scaleY: 3,
      alpha: 0,
      duration: 600,
      ease: 'Power2',
      onComplete: () => ring.destroy()
    })
  }

  updateGameState(newState: Partial<GameState>) {
    if (this.gameState) {
      this.gameState = { ...this.gameState, ...newState }
      // Ensure HUD exists even if gameState was injected after create()
      if (!this.levelText || !this.scoreText || !this.heartsText || !this.questionNumberText) {
        this.createHUD()
      } else {
        this.updateHUD()
      }
    }
  }

  loadNewQuestion(question: Question) {
    this.question = question
    // Ensure question text exists
    if (!this.questionText) {
      this.questionText = this.add.text(
        this.cameras.main.width / 2,
        50,
        question.question,
        {
          fontSize: '28px',
          color: '#ffffff',
          align: 'center',
          wordWrap: { width: this.cameras.main.width - 100 }
        }
      ).setOrigin(0.5, 0)
    } else {
      this.questionText.setText(question.question)
    }
    this.createTargets()
  }
}

const MathArcherGame: React.FC<MathArcherGameProps> = ({ subject, grade, lesson, onBack }) => {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    score: 0,
    hearts: 3,
    currentQuestion: 0,
    questionsInLevel: 0,
    gameStatus: 'levelStart'
  })

  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([])
  const [currentQuestionData, setCurrentQuestionData] = useState<Question | null>(null)
  const gameRef = useRef<Phaser.Game | null>(null)
  const sceneRef = useRef<ArcherScene | null>(null)

  // Initialize questions for the current lesson
  useEffect(() => {
    let questions = getQuestionsForLesson(subject, grade, lesson)
    // Fallback seed if no questions for this lesson
    if (questions.length === 0) {
      const base = { id: 1, question: '2 × _ = 10', options: ['3', '5', '7'], correctAnswer: 1, difficulty: 1 }
      // Repeat to fill at least MAX_LEVELS * QUESTIONS_PER_LEVEL
      const needed = QUESTIONS_PER_LEVEL * MAX_LEVELS
      questions = Array.from({ length: needed }, (_, i) => ({ ...base, id: i + 1 }))
    }
    setCurrentQuestions(questions)
    // Load the first question when starting the game
    if ((gameState.gameStatus === 'levelStart' || gameState.gameStatus === 'playing') && !currentQuestionData) {
      const levelQuestions = getLevelSlice(questions, gameState.level)
      const question = levelQuestions[gameState.questionsInLevel] || levelQuestions[0] || questions[0]
      setCurrentQuestionData(question)
    }
  }, [subject, grade, lesson, gameState.level, gameState.questionsInLevel, gameState.gameStatus, currentQuestionData])

  // Level start timer
  useEffect(() => {
    if (gameState.gameStatus === 'levelStart') {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, gameStatus: 'playing' }))
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [gameState.gameStatus])

  const restartGame = () => {
    setGameState({
      level: 1,
      score: 0,
      hearts: 3,
      currentQuestion: 0,
      questionsInLevel: 0,
      gameStatus: 'levelStart'
    })
    setCurrentQuestionData(null)
    
    // Also reset the questions to ensure we get fresh data
    const questions = getQuestionsForLesson(subject, grade, lesson)
    if (questions.length > 0) {
      setCurrentQuestions(questions)
      const levelQuestions = getLevelSlice(questions, 1)
      if (levelQuestions.length > 0) {
        const question = levelQuestions[0]
        setCurrentQuestionData(question)
      }
    }
  }

  const handleQuestionAnswered = (isCorrect: boolean) => {
    setTimeout(() => {
      let newHearts = gameState.hearts
      if (!isCorrect) {
        newHearts = Math.max(0, gameState.hearts - 1)
      }
      
      // Scoring: +10 for correct, 0 for wrong
      const newScore = isCorrect ? gameState.score + 10 : gameState.score
      const newQuestionsInLevel = gameState.questionsInLevel + 1

      setGameState(prev => ({
        ...prev,
        score: newScore,
        hearts: newHearts,
        questionsInLevel: newQuestionsInLevel
      }))

      setTimeout(() => {
        // Check if game is over due to losing all hearts
        if (newHearts <= 0) {
          setGameState(prev => ({ ...prev, gameStatus: 'gameOver' }))
          return
        }

        // Check game progression
        if (newQuestionsInLevel >= QUESTIONS_PER_LEVEL) {
          if (gameState.level >= MAX_LEVELS) {
            setGameState(prev => ({ ...prev, gameStatus: 'gameComplete' }))
          } else {
            // Level complete screen
            setGameState(prev => ({ ...prev, gameStatus: 'levelComplete' }))
          }
        } else {
          // Load next question
          const nextQuestionIndex = newQuestionsInLevel
          const levelQuestions = getLevelSlice(currentQuestions, gameState.level)
          if (nextQuestionIndex < levelQuestions.length) {
            const nextQuestion = levelQuestions[nextQuestionIndex]
            setCurrentQuestionData(nextQuestion)
          }
        }
      }, 1500)
    }, 100)
  }

  // Initialize Phaser game (create once when entering playing, destroy when leaving)
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && currentQuestionData) {
      if (!gameRef.current) {
        const config: Phaser.Types.Core.GameConfig = {
          type: Phaser.AUTO,
          width: 800,
          height: 600,
          backgroundColor: '#2d5016',
          parent: 'phaser-game',
          scene: ArcherScene,
          physics: {
            default: 'arcade',
            arcade: {
              gravity: { x: 0, y: 0 },
              debug: false
            }
          }
        }
        gameRef.current = new Phaser.Game(config)

        const initializeScene = () => {
          const scene = gameRef.current?.scene.getScene('MathArcher') as ArcherScene
          if (scene) {
            sceneRef.current = scene
            if (currentQuestionData) {
              scene.loadNewQuestion(currentQuestionData)
            }
            scene.updateGameState(gameState)
            ;(scene as any).onQuestionAnswered = handleQuestionAnswered
          }
        }
        // Poll until scene exists
        const poll = () => {
          initializeScene()
          if (!sceneRef.current) setTimeout(poll, 100)
        }
        setTimeout(poll, 50)
      } else if (sceneRef.current) {
        // Update existing scene
        sceneRef.current.loadNewQuestion(currentQuestionData)
        sceneRef.current.updateGameState(gameState)
      }
    } else {
      // Not in playing state: destroy game if exists
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
        sceneRef.current = null
      }
    }
  }, [gameState.gameStatus, currentQuestionData])

  // Update Phaser scene when question or game state changes
  useEffect(() => {
    if (sceneRef.current && currentQuestionData) {
      if (gameState.gameStatus === 'playing') {
        sceneRef.current.loadNewQuestion(currentQuestionData)
      }
      sceneRef.current.updateGameState(gameState)
    }
  }, [currentQuestionData, gameState.gameStatus, gameState.level, gameState.score, gameState.hearts, gameState.questionsInLevel])

  // Level Start Screen
  if (gameState.gameStatus === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏹</div>
          <div className="text-8xl font-bold text-white mb-4 animate-pulse">
            Level {gameState.level}
          </div>
          <div className="text-2xl text-white/80">
            Math Archer - Aim and shoot at the correct target! {QUESTIONS_PER_LEVEL} questions coming up...
          </div>
        </div>
      </div>
    )
  }

  // Level Complete Screen
  if (gameState.gameStatus === 'levelComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-400 to-teal-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Level {gameState.level} Complete!</h2>
          <p className="text-gray-600 mb-2">Great shooting!</p>
          <p className="text-2xl font-bold text-emerald-600 mb-4">Score: {gameState.score}</p>
          <div className="space-y-3">
            <button
              onClick={() => setGameState(prev => ({ ...prev, level: prev.level + 1, questionsInLevel: 0, gameStatus: 'levelStart' }))}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              ➡️ Next Level
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              🎯 Back to Games
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Game Complete Screen
  if (gameState.gameStatus === 'gameComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Lesson Complete!</h2>
          <p className="text-gray-600 mb-2">Congratulations! You completed all 5 levels!</p>
          <p className="text-2xl font-bold text-yellow-600 mb-4">Final Score: {gameState.score}</p>
          <div className="space-y-3">
            <button
              onClick={restartGame}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              🔄 Play Again
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              🎯 Back to Games
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Game Over Screen
  if (gameState.gameStatus === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-400 to-pink-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Game Over</h2>
          <p className="text-gray-600 mb-2">Final Score: {gameState.score}</p>
          <p className="text-gray-600 mb-4">Level Reached: {gameState.level}</p>
          <div className="space-y-3">
            <button
              onClick={restartGame}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              🎯 Back to Games
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-800 overflow-hidden relative">
      {/* Game Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <span className="text-xl text-white">←</span>
            <span className="text-white font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Phaser Game Container */}
      <div id="phaser-game" className="absolute inset-0 pt-20 flex items-center justify-center">
        {/* Phaser game will be rendered here */}
      </div>
    </div>
  )
}

export default MathArcherGame
