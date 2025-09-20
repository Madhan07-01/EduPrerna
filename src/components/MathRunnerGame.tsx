import { useState, useEffect, useRef } from 'react'

interface MathRunnerGameProps {
  subject: string
  grade: string  
  lesson: string
  onBack: () => void
}

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  difficulty: number
}

interface GameState {
  level: number
  score: number
  hearts: number
  currentQuestion: number
  gameStatus: 'playing' | 'paused' | 'levelComplete' | 'gameOver'
  speed: number
}

// Question bank organized by subject, grade, and lesson
const questionBank: Record<string, Record<string, Record<string, Question[]>>> = {
  mathematics: {
    'grade-6': {
      'Fractions': [
        { id: 1, question: 'What is 1/2 + 1/4?', options: ['1/4', '3/4', '1/6'], correctAnswer: 1, difficulty: 1 },
        { id: 2, question: 'What is 2/3 of 12?', options: ['6', '8', '4'], correctAnswer: 1, difficulty: 1 },
        { id: 3, question: 'Which is larger: 3/5 or 2/3?', options: ['3/5', '2/3', 'Equal'], correctAnswer: 1, difficulty: 2 },
        { id: 4, question: 'What is 3/4 - 1/2?', options: ['1/4', '1/2', '2/4'], correctAnswer: 0, difficulty: 2 },
        { id: 5, question: 'Convert 1.5 to a fraction', options: ['3/2', '1/2', '5/3'], correctAnswer: 0, difficulty: 3 },
      ],
      'Algebra Basics': [
        { id: 1, question: 'Solve: x + 5 = 8', options: ['x = 3', 'x = 4', 'x = 2'], correctAnswer: 0, difficulty: 1 },
        { id: 2, question: 'What is 2x when x = 4?', options: ['6', '8', '10'], correctAnswer: 1, difficulty: 1 },
        { id: 3, question: 'Solve: 3x - 6 = 9', options: ['x = 5', 'x = 4', 'x = 3'], correctAnswer: 0, difficulty: 2 },
        { id: 4, question: 'If y = 2x + 1, what is y when x = 3?', options: ['7', '6', '8'], correctAnswer: 0, difficulty: 2 },
        { id: 5, question: 'Solve: 2(x + 3) = 14', options: ['x = 4', 'x = 5', 'x = 3'], correctAnswer: 0, difficulty: 3 },
      ],
      'Geometry Fundamentals': [
        { id: 1, question: 'How many sides does a triangle have?', options: ['2', '3', '4'], correctAnswer: 1, difficulty: 1 },
        { id: 2, question: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '360°'], correctAnswer: 1, difficulty: 1 },
        { id: 3, question: 'Area of a rectangle with length 5 and width 3?', options: ['8', '15', '16'], correctAnswer: 1, difficulty: 2 },
        { id: 4, question: 'What is the perimeter of a square with side 4?', options: ['8', '12', '16'], correctAnswer: 2, difficulty: 2 },
        { id: 5, question: 'Which shape has 6 sides?', options: ['Pentagon', 'Hexagon', 'Octagon'], correctAnswer: 1, difficulty: 3 },
      ]
    },
    'grade-9': {
      'Polynomials': [
        { id: 1, question: 'What is (x + 2)(x + 3)?', options: ['x² + 5x + 6', 'x² + 6x + 5', 'x² + 4x + 6'], correctAnswer: 0, difficulty: 1 },
        { id: 2, question: 'Factor: x² + 7x + 12', options: ['(x + 3)(x + 4)', '(x + 2)(x + 6)', '(x + 1)(x + 12)'], correctAnswer: 0, difficulty: 2 },
        { id: 3, question: 'What is the degree of 3x⁴ + 2x² - 5?', options: ['3', '4', '2'], correctAnswer: 1, difficulty: 2 },
        { id: 4, question: 'Simplify: 2x² + 3x² - x²', options: ['4x²', '5x²', '6x²'], correctAnswer: 0, difficulty: 1 },
        { id: 5, question: 'What is (2x - 1)²?', options: ['4x² - 4x + 1', '4x² - 2x + 1', '4x² - 1'], correctAnswer: 0, difficulty: 3 },
      ]
    }
  }
}

const MathRunnerGame: React.FC<MathRunnerGameProps> = ({ subject, grade, lesson, onBack }) => {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    score: 0,
    hearts: 3,
    currentQuestion: 0,
    gameStatus: 'playing',
    speed: 1
  })

  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([])
  const [currentQuestionData, setCurrentQuestionData] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [characterPosition, setCharacterPosition] = useState<number>(0)
  const [backgroundPosition, setBackgroundPosition] = useState<number>(0)
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const backgroundRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize questions for the current lesson
  useEffect(() => {
    const questions = questionBank[subject]?.[grade]?.[lesson] || []
    if (questions.length > 0) {
      // Generate level-specific questions (5 per level, with increasing difficulty)
      const levelQuestions = generateLevelQuestions(questions, gameState.level)
      setCurrentQuestions(levelQuestions)
      setCurrentQuestionData(levelQuestions[0])
    }
  }, [subject, grade, lesson, gameState.level])

  // Game loop for background animation
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      backgroundRef.current = setInterval(() => {
        setBackgroundPosition(prev => (prev - gameState.speed) % 100)
      }, 50)
    }
    
    return () => {
      if (backgroundRef.current) clearInterval(backgroundRef.current)
    }
  }, [gameState.gameStatus, gameState.speed])

  const generateLevelQuestions = (allQuestions: Question[], level: number): Question[] => {
    const questionsForLevel: Question[] = []
    const difficultyBonus = Math.floor((level - 1) / 2)
    
    for (let i = 0; i < 5; i++) {
      const questionIndex = ((level - 1) * 5 + i) % allQuestions.length
      const baseQuestion = allQuestions[questionIndex]
      questionsForLevel.push({
        ...baseQuestion,
        difficulty: Math.min(baseQuestion.difficulty + difficultyBonus, 3)
      })
    }
    
    return questionsForLevel
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || showResult) return
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    const isCorrect = answerIndex === currentQuestionData?.correctAnswer
    
    setTimeout(() => {
      if (isCorrect) {
        // Correct answer - character jumps and continues
        setCharacterPosition(20)
        setTimeout(() => setCharacterPosition(0), 500)
        
        setGameState(prev => ({
          ...prev,
          score: prev.score + (10 * prev.level),
          currentQuestion: prev.currentQuestion + 1
        }))
      } else {
        // Wrong answer - lose a heart and slow down
        setGameState(prev => ({
          ...prev,
          hearts: prev.hearts - 1,
          speed: Math.max(prev.speed * 0.8, 0.3)
        }))
      }
      
      // Reset for next question
      setSelectedAnswer(null)
      setShowResult(false)
      
      // Check if level is complete or game over
      if (gameState.currentQuestion + 1 >= 5) {
        // Level complete
        setGameState(prev => ({
          ...prev,
          level: prev.level + 1,
          currentQuestion: 0,
          gameStatus: 'levelComplete',
          speed: Math.min(prev.speed + 0.2, 3)
        }))
      } else if (gameState.hearts <= 1 && !isCorrect) {
        // Game over
        setGameState(prev => ({ ...prev, gameStatus: 'gameOver' }))
      } else {
        // Next question
        const nextQuestionIndex = gameState.currentQuestion + 1
        if (nextQuestionIndex < currentQuestions.length) {
          setCurrentQuestionData(currentQuestions[nextQuestionIndex])
        }
      }
    }, 1500)
  }

  const handleLevelComplete = () => {
    setGameState(prev => ({ ...prev, gameStatus: 'playing' }))
  }

  const restartGame = () => {
    setGameState({
      level: 1,
      score: 0,
      hearts: 3,
      currentQuestion: 0,
      gameStatus: 'playing',
      speed: 1
    })
  }

  if (gameState.gameStatus === 'levelComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Level {gameState.level - 1} Complete!</h2>
          <p className="text-gray-600 mb-4">Score: {gameState.score}</p>
          <div className="space-y-3">
            <button
              onClick={handleLevelComplete}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Continue to Level {gameState.level}
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Back to Lessons
            </button>
          </div>
        </div>
      </div>
    )
  }

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
              Back to Lessons
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-600 overflow-hidden relative">
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

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-repeat-x bg-contain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='20' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            transform: `translateX(${backgroundPosition}px)`
          }}
        />
        
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-400 border-t-4 border-green-600">
          <div 
            className="absolute inset-0 bg-repeat-x"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='15' width='5' height='5' fill='%23059669'/%3E%3Crect x='10' y='12' width='3' height='8' fill='%23059669'/%3E%3Crect x='20' y='14' width='4' height='6' fill='%23059669'/%3E%3Crect x='30' y='16' width='2' height='4' fill='%23059669'/%3E%3C/svg%3E")`,
              transform: `translateX(${backgroundPosition * 1.5}px)`
            }}
          />
        </div>
      </div>

      {/* Character */}
      <div 
        className="absolute bottom-20 left-16 z-10 transition-all duration-500 ease-out"
        style={{ transform: `translateY(-${characterPosition}px)` }}
      >
        <div className="text-6xl animate-bounce">🏃‍♂️</div>
      </div>

      {/* Question Obstacle */}
      {currentQuestionData && (
        <div className="absolute inset-0 flex items-center justify-center z-15">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl border-4 border-yellow-400">
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-gray-800 mb-4">
                {currentQuestionData.question}
              </div>
              <div className="text-sm text-gray-600">
                Question {gameState.currentQuestion + 1} of 5
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
                      ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      : selectedAnswer === index
                        ? index === currentQuestionData.correctAnswer
                          ? 'border-green-500 bg-green-100 text-green-800'
                          : 'border-red-500 bg-red-100 text-red-800'
                        : index === currentQuestionData.correctAnswer && showResult
                          ? 'border-green-500 bg-green-100 text-green-800'
                          : 'border-gray-300 bg-gray-50'
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
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="bg-black/20 backdrop-blur-sm rounded-full p-2">
          <div className="bg-white/20 rounded-full h-2">
            <div 
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((gameState.currentQuestion) / 5) * 100}%` }}
            />
          </div>
          <div className="text-center text-white text-sm mt-1">
            Progress: {gameState.currentQuestion}/5
          </div>
        </div>
      </div>
    </div>
  )
}

export default MathRunnerGame