import { useState, useEffect, useRef } from 'react'
import { getQuestionsForLevel, getQuestionsForLesson, type Question } from '../data/questionBank'
import Phaser from 'phaser'

interface MathBalloonPopGameProps {
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
  gameStatus: 'levelStart' | 'playing' | 'paused' | 'gameComplete' | 'gameOver'
}

// Phaser game scene
class BalloonPopScene extends Phaser.Scene {
  private question: Question | null = null
  private gameState: GameState | null = null
  private onQuestionAnswered: ((isCorrect: boolean) => void) | null = null
  private balloons: Phaser.GameObjects.Ellipse[] = []
  private balloonTexts: Phaser.GameObjects.Text[] = []
  private balloonStrings: Phaser.GameObjects.Line[] = []
  private questionText: Phaser.GameObjects.Text | null = null
  private scoreText: Phaser.GameObjects.Text | null = null
  private levelText: Phaser.GameObjects.Text | null = null
  private heartsText: Phaser.GameObjects.Text | null = null
  private questionNumberText: Phaser.GameObjects.Text | null = null

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
    // Create background
    this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x9c27b0).setOrigin(0, 0)
    this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xe91e63, 0.3).setOrigin(0, 0)

    // Create HUD
    this.createHUD()

    // Create question display
    if (this.question) {
      this.questionText = this.add.text(
        this.cameras.main.width / 2, 
        50, 
        this.question.question, 
        { 
          fontSize: '24px', 
          color: '#ffffff',
          align: 'center',
          wordWrap: { width: this.cameras.main.width - 100 }
        }
      ).setOrigin(0.5, 0)

      // Add instruction text
      this.add.text(
        this.cameras.main.width / 2, 
        100, 
        '🎈 Tap the correct balloon before it floats away!', 
        { 
          fontSize: '16px', 
          color: '#e0b0ff',
          fontStyle: 'bold'
        }
      ).setOrigin(0.5, 0)
    }

    // Create balloons
    this.createBalloons()
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
      `Question: ${this.gameState.questionsInLevel + 1}/3`, 
      {
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: { x: 10, y: 5 }
      }
    ).setOrigin(0.5, 0)

    // Score
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

    // Hearts
    this.heartsText = this.add.text(
      this.cameras.main.width - 20, 
      50, 
      `Lives: ${'❤️'.repeat(this.gameState.hearts)}`, 
      {
        fontSize: '18px',
        color: '#ff5252',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: { x: 10, y: 5 }
      }
    ).setOrigin(1, 0)
  }

  private updateHUD() {
    if (!this.gameState) return

    if (this.levelText) {
      this.levelText.setText(`Level: ${this.gameState.level}`)
    }

    if (this.questionNumberText) {
      this.questionNumberText.setText(`Question: ${this.gameState.questionsInLevel + 1}/3`)
    }

    if (this.scoreText) {
      this.scoreText.setText(`Score: ${this.gameState.score}`)
    }

    if (this.heartsText) {
      this.heartsText.setText(`Lives: ${'❤️'.repeat(this.gameState.hearts)}`)
    }
  }

  private createBalloons() {
    if (!this.question) return

    const colors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4, 0xfeca57, 0xff9ff3, 0x54a0ff, 0x5f27cd]
    const letters = ['A', 'B', 'C', 'D']

    // Clear existing balloons
    this.balloons.forEach(balloon => balloon.destroy())
    this.balloonTexts.forEach(text => text.destroy())
    this.balloonStrings.forEach(string => string.destroy())
    this.balloons = []
    this.balloonTexts = []
    this.balloonStrings = []

    // Create new balloons
    this.question.options.forEach((option, index) => {
      const x = Phaser.Math.Between(80, this.cameras.main.width - 80)
      const y = this.cameras.main.height - 50
      
      const color = colors[index % colors.length]
      const balloon = this.add.ellipse(x, y, 70, 90, color)
      balloon.setOrigin(0.5, 1)
      balloon.setInteractive()
      
      // Add balloon string
      const string = this.add.line(x, y, 0, 0, 0, 30, 0x000000)
      string.setOrigin(0.5, 0)
      
      // Add text
      const text = this.add.text(x, y - 45, `${letters[index]}\n${option}`, {
        fontSize: '16px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: 60 }
      }).setOrigin(0.5, 0.5)
      
      // Store references
      this.balloons.push(balloon)
      this.balloonTexts.push(text)
      this.balloonStrings.push(string)
      
      // Add click event
      balloon.on('pointerdown', () => {
        this.popBalloon(index, balloon, text, string)
      })
      
      // Animate balloon floating upward
      this.tweens.add({
        targets: [balloon, text, string],
        y: '-=400',
        duration: Phaser.Math.Between(4000, 6000),
        ease: 'Sine.easeInOut',
        onComplete: () => {
          // Respawn balloon at bottom if not popped
          if (balloon.active) {
            this.respawnBalloon(balloon, text, string, index)
          }
        }
      })
    })
  }

  private popBalloon(index: number, balloon: Phaser.GameObjects.Ellipse, text: Phaser.GameObjects.Text, string: Phaser.GameObjects.Line) {
    if (!this.question || !this.onQuestionAnswered) return

    const isCorrect = index === this.question.correctAnswer
    
    // Create particle burst effect
    this.createParticleBurst(balloon.x, balloon.y, isCorrect ? 0x10b981 : 0xef4444)
    
    // Destroy balloon and text
    balloon.destroy()
    text.destroy()
    string.destroy()
    
    // Show result text at top
    const resultText = this.add.text(
      this.cameras.main.width / 2, 
      150, 
      isCorrect ? 'Correct!' : 'Wrong!', 
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

  private createParticleBurst(x: number, y: number, color: number) {
    for (let i = 0; i < 20; i++) {
      const particle = this.add.ellipse(x, y, 10, 10, color)
      const angle = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360))
      const speed = Phaser.Math.Between(100, 300)
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
  }

  private respawnBalloon(balloon: Phaser.GameObjects.Ellipse, text: Phaser.GameObjects.Text, string: Phaser.GameObjects.Line, index: number) {
    if (!this.question) return

    const letters = ['A', 'B', 'C', 'D']
    
    // Reset position
    balloon.x = Phaser.Math.Between(80, this.cameras.main.width - 80)
    balloon.y = this.cameras.main.height - 50
    
    string.x = balloon.x
    string.y = balloon.y
    
    text.x = balloon.x
    text.y = balloon.y - 45
    
    // Update text
    text.setText(`${letters[index]}\n${this.question.options[index]}`)
    
    // Restart animation
    this.tweens.add({
      targets: [balloon, text, string],
      y: '-=400',
      duration: Phaser.Math.Between(4000, 6000),
      ease: 'Sine.easeInOut',
      onComplete: () => {
        if (balloon.active) {
          this.respawnBalloon(balloon, text, string, index)
        }
      }
    })
  }

  updateGameState(newState: Partial<GameState>) {
    if (this.gameState) {
      this.gameState = { ...this.gameState, ...newState }
      this.updateHUD()
    }
  }

  loadNewQuestion(question: Question) {
    this.question = question
    if (this.questionText) {
      this.questionText.setText(question.question)
    }
    this.createBalloons()
  }
}

const MathBalloonPopGame: React.FC<MathBalloonPopGameProps> = ({ subject, grade, lesson, onBack }) => {
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
  const sceneRef = useRef<BalloonPopScene | null>(null)

  // Initialize questions for the current lesson
  useEffect(() => {
    const questions = getQuestionsForLesson(subject, grade, lesson)
    if (questions.length > 0) {
      setCurrentQuestions(questions)
      // Load the first question when starting the game
      if ((gameState.gameStatus === 'levelStart' || gameState.gameStatus === 'playing') && !currentQuestionData) {
        const levelQuestions = getQuestionsForLevel(questions, gameState.level)
        if (levelQuestions.length > 0) {
          const question = levelQuestions[gameState.questionsInLevel]
          setCurrentQuestionData(question)
        }
      }
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
      const levelQuestions = getQuestionsForLevel(questions, 1)
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
        if (newQuestionsInLevel >= 3) {
          if (gameState.level >= 5) {
            setGameState(prev => ({ ...prev, gameStatus: 'gameComplete' }))
          } else {
            setGameState(prev => ({
              ...prev,
              level: prev.level + 1,
              questionsInLevel: 0,
              gameStatus: 'levelStart'
            }))
          }
        } else {
          // Load next question
          const nextQuestionIndex = newQuestionsInLevel
          const levelQuestions = getQuestionsForLevel(currentQuestions, gameState.level)
          if (nextQuestionIndex < levelQuestions.length) {
            const nextQuestion = levelQuestions[nextQuestionIndex]
            setCurrentQuestionData(nextQuestion)
          }
        }
      }, 1500)
    }, 100)
  }

  // Initialize Phaser game
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && currentQuestionData) {
      // Clean up existing game
      if (gameRef.current) {
        gameRef.current.destroy(true)
      }

      // Create new game
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#9c27b0',
        parent: 'phaser-game',
        scene: BalloonPopScene,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
          }
        }
      }

      gameRef.current = new Phaser.Game(config)

      // Get scene reference after game creation
      const initializeScene = () => {
        const scene = gameRef.current?.scene.getScene('default') as BalloonPopScene
        if (scene) {
          sceneRef.current = scene
          // Pass initial data to scene
          scene.init({
            question: currentQuestionData,
            gameState: gameState,
            onQuestionAnswered: handleQuestionAnswered
          })
        }
      }
      
      // Try to get scene reference immediately and after a delay
      setTimeout(initializeScene, 100)
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [gameState.gameStatus, currentQuestionData, gameState])

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
      <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-400 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎈</div>
          <div className="text-8xl font-bold text-white mb-4 animate-pulse">
            Level {gameState.level}
          </div>
          <div className="text-2xl text-white/80">
            Math Balloon Pop - Tap the correct answer! 3 questions coming up...
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
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-400 overflow-hidden relative">
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

export default MathBalloonPopGame