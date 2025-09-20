import { useState, useEffect } from 'react'
import { getTargetQuestionsForLesson, getTargetQuestionsForLevel, type TargetQuestion } from '../data/questionBank'

interface GeometryShooterGameProps {
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

interface Target {
  id: string
  x: number
  y: number
  isCorrect: boolean
  shape: string
}



const GeometryShooterGame: React.FC<GeometryShooterGameProps> = ({ subject, grade, lesson, onBack }) => {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    score: 0,
    hearts: 3,
    currentQuestion: 0,
    questionsInLevel: 0,
    gameStatus: 'levelStart'
  })

  const [currentQuestions, setCurrentQuestions] = useState<TargetQuestion[]>([])
  const [currentQuestionData, setCurrentQuestionData] = useState<TargetQuestion | null>(null)
  const [targets, setTargets] = useState<Target[]>([])
  const [crosshair, setCrosshair] = useState({ x: 50, y: 50 })
  const [showResult, setShowResult] = useState<boolean>(false)
  const [shotResult, setShotResult] = useState<'correct' | 'incorrect' | null>(null)

  // Initialize questions for the current lesson
  useEffect(() => {
    const questions = getTargetQuestionsForLesson(subject, grade, lesson)
    if (questions.length > 0) {
      setCurrentQuestions(questions)
      if (gameState.gameStatus === 'playing') {
        const levelQuestions = getTargetQuestionsForLevel(questions, gameState.level)
        if (levelQuestions.length > 0) {
          const question = levelQuestions[gameState.questionsInLevel]
          setCurrentQuestionData(question)
          generateTargets(question)
        }
      }
    }
  }, [subject, grade, lesson, gameState.level, gameState.questionsInLevel, gameState.gameStatus])

  // Level start timer
  useEffect(() => {
    if (gameState.gameStatus === 'levelStart') {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, gameStatus: 'playing' }))
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [gameState.gameStatus])

  // Move crosshair automatically
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      const interval = setInterval(() => {
        setCrosshair(prev => ({
          x: (prev.x + 2) % 100,
          y: 30 + Math.sin(Date.now() / 1000) * 10
        }))
      }, 50)
      return () => clearInterval(interval)
    }
  }, [gameState.gameStatus])



  const generateTargets = (question: TargetQuestion) => {
    const newTargets: Target[] = question.targets.map((target, index) => ({
      id: `target-${index}`,
      x: 20 + (index * 20) + Math.random() * 10,
      y: 60 + Math.random() * 20,
      isCorrect: target === question.correctTarget,
      shape: target
    }))
    setTargets(newTargets)
  }

  const handleShoot = () => {
    if (!currentQuestionData) return

    // Find target near crosshair
    const targetHit = targets.find(target => 
      Math.abs(target.x - crosshair.x) < 8 && Math.abs(target.y - crosshair.y) < 8
    )

    if (targetHit) {
      const isCorrect = targetHit.isCorrect
      setShotResult(isCorrect ? 'correct' : 'incorrect')
      setShowResult(true)

      setTimeout(() => {
        if (isCorrect) {
          setGameState(prev => ({
            ...prev,
            score: prev.score + 10,
            questionsInLevel: prev.questionsInLevel + 1
          }))
        } else {
          setGameState(prev => ({
            ...prev,
            hearts: prev.hearts - 1,
            questionsInLevel: prev.questionsInLevel + 1
          }))
        }
        
        // Reset for next question
        setShowResult(false)
        setShotResult(null)
        
        // Check if level is complete, game over, or continue
        if (gameState.questionsInLevel + 1 >= 3) {
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
        } else if (gameState.hearts <= 1 && !isCorrect) {
          setGameState(prev => ({ ...prev, gameStatus: 'gameOver' }))
        } else {
          const nextQuestionIndex = gameState.questionsInLevel + 1
          const levelQuestions = getTargetQuestionsForLevel(currentQuestions, gameState.level)
          if (nextQuestionIndex < levelQuestions.length) {
            const nextQuestion = levelQuestions[nextQuestionIndex]
            setCurrentQuestionData(nextQuestion)
            generateTargets(nextQuestion)
          }
        }
      }, 1500)
    }
  }

  const restartGame = () => {
    setGameState({
      level: 1,
      score: 0,
      hearts: 3,
      currentQuestion: 0,
      questionsInLevel: 0,
      gameStatus: 'levelStart'
    })
  }

  // Level Start Screen
  if (gameState.gameStatus === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl font-bold text-white mb-4 animate-pulse">
            Level {gameState.level}
          </div>
          <div className="text-2xl text-white/80">
            Aim and shoot! 3 questions coming up...
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600 overflow-hidden relative">
      {/* Game Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <span className="text-xl">←</span>
            <span className="text-white font-medium">Back</span>
          </button>
          
          <div className="flex items-center space-x-6 text-white">
            <div className="text-center">
              <div className="text-sm opacity-80">Level</div>
              <div className="text-xl font-bold">{gameState.level}</div>
            </div>
            <div className="text-center">
              <div className="text-sm opacity-80">Score</div>
              <div className="text-xl font-bold">{gameState.score}</div>
            </div>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="text-2xl">
                  {i < gameState.hearts ? '❤️' : '🤍'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Question Display */}
      {currentQuestionData && (
        <div className="absolute top-20 left-0 right-0 z-10">
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mx-4 max-w-md mx-auto shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentQuestionData.question}</h3>
              <div className="text-sm text-gray-600">
                Level {gameState.level} - Question {gameState.questionsInLevel + 1} of 3
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className="absolute inset-0 pt-32 pb-20">
        <div className="relative w-full h-full">
          {/* Targets */}
          {targets.map((target) => (
            <div
              key={target.id}
              className="absolute transition-all duration-300 hover:scale-110"
              style={{
                left: `${target.x}%`,
                top: `${target.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="text-6xl animate-pulse cursor-pointer">
                {target.shape}
              </div>
            </div>
          ))}

          {/* Crosshair */}
          <div
            className="absolute z-10 pointer-events-none"
            style={{
              left: `${crosshair.x}%`,
              top: `${crosshair.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="text-4xl text-red-500 animate-pulse">⊕</div>
          </div>

          {/* Shoot Button */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={handleShoot}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-xl font-bold transition-colors shadow-2xl transform hover:scale-105"
            >
              🎯 SHOOT
            </button>
          </div>
        </div>
      </div>

      {/* Result Display */}
      {showResult && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <div className={`text-6xl mb-4 ${shotResult === 'correct' ? 'animate-bounce' : 'animate-pulse'}`}>
              {shotResult === 'correct' ? '🎉' : '💥'}
            </div>
            <div className={`text-3xl font-bold ${
              shotResult === 'correct' ? 'text-green-600' : 'text-red-600'
            }`}>
              {shotResult === 'correct' ? 'Perfect Shot!' : 'Try Again!'}
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="bg-black/20 backdrop-blur-sm rounded-full p-2">
          <div className="bg-white/20 rounded-full h-2">
            <div 
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((gameState.level - 1) * 20 + (gameState.questionsInLevel / 3) * 20)}%` }}
            />
          </div>
          <div className="text-center text-white text-sm mt-1">
            Level {gameState.level}/5 - Question {gameState.questionsInLevel + 1}/3
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeometryShooterGame