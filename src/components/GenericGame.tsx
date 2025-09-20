import { useState, useEffect } from 'react'
import { getQuestionsForLesson, getQuestionsForLevel, type Question } from '../data/questionBank'

interface GenericGameProps {
  subject: string
  grade: string  
  lesson: string
  gameName: string
  gameIcon: string
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



const GenericGame: React.FC<GenericGameProps> = ({ subject, grade, lesson, gameName, gameIcon, onBack }) => {
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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState<boolean>(false)

  // Initialize questions for the current lesson
  useEffect(() => {
    const questions = getQuestionsForLesson(subject, grade, lesson)
    if (questions.length > 0) {
      setCurrentQuestions(questions)
      if (gameState.gameStatus === 'playing') {
        const levelQuestions = getQuestionsForLevel(questions, gameState.level)
        if (levelQuestions.length > 0) {
          setCurrentQuestionData(levelQuestions[gameState.questionsInLevel])
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



  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || showResult) return
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    const isCorrect = answerIndex === currentQuestionData?.correctAnswer
    
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
      setSelectedAnswer(null)
      setShowResult(false)
      
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
        // Get next question for the current level
        const levelQuestions = getQuestionsForLevel(currentQuestions, gameState.level)
        const nextQuestionIndex = gameState.questionsInLevel + 1
        if (nextQuestionIndex < levelQuestions.length) {
          setCurrentQuestionData(levelQuestions[nextQuestionIndex])
        }
      }
    }, 1500)
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
          <div className="text-8xl mb-4">{gameIcon}</div>
          <div className="text-8xl font-bold text-white mb-4 animate-pulse">
            Level {gameState.level}
          </div>
          <div className="text-2xl text-white/80">
            {gameName} - 3 questions coming up...
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-400 to-blue-600 p-4">
      {/* Game Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back</span>
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

      {/* Game Area */}
      {currentQuestionData && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{gameIcon}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{gameName}</h2>
              <div className="text-2xl font-bold text-gray-800 mb-4">
                {currentQuestionData.question}
              </div>
              <div className="text-sm text-gray-600">
                Level {gameState.level} - Question {gameState.questionsInLevel + 1} of 3
              </div>
            </div>
            
            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-lg border-2 transition-all font-semibold ${
                    selectedAnswer === null
                      ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-800 hover:text-gray-900'
                      : selectedAnswer === index
                        ? index === currentQuestionData.correctAnswer
                          ? 'border-green-500 bg-green-100 text-green-800'
                          : 'border-red-500 bg-red-100 text-red-800'
                        : index === currentQuestionData.correctAnswer && showResult
                          ? 'border-green-500 bg-green-100 text-green-800'
                          : 'border-gray-300 bg-gray-50 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {showResult && (
              <div className="mt-4 text-center">
                <div className={`text-lg font-bold ${
                  selectedAnswer === currentQuestionData.correctAnswer 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {selectedAnswer === currentQuestionData.correctAnswer ? '🎉 Correct!' : '❌ Try again!'}
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
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
      )}

      {/* No Questions Available */}
      {!currentQuestionData && gameState.gameStatus === 'playing' && (
        <div className="text-center text-white">
          <div className="text-6xl mb-4">{gameIcon}</div>
          <h2 className="text-3xl font-bold mb-4">{gameName}</h2>
          <p className="text-xl mb-6">Questions coming soon for this lesson!</p>
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            🎯 Back to Games
          </button>
        </div>
      )}
    </div>
  )
}

export default GenericGame