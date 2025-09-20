import { useState, useEffect } from 'react'
import { getEquationQuestionsForLesson, getEquationQuestionsForLevel, type EquationQuestion } from '../data/questionBank'

interface EquationBuilderGameProps {
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



const EquationBuilderGame: React.FC<EquationBuilderGameProps> = ({ subject, grade, lesson, onBack }) => {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    score: 0,
    hearts: 3,
    currentQuestion: 0,
    questionsInLevel: 0,
    gameStatus: 'levelStart'
  })

  const [currentQuestions, setCurrentQuestions] = useState<EquationQuestion[]>([])
  const [currentQuestionData, setCurrentQuestionData] = useState<EquationQuestion | null>(null)
  const [equation, setEquation] = useState<(number | string)[]>([])
  const [showResult, setShowResult] = useState<boolean>(false)
  const [draggedItem, setDraggedItem] = useState<number | string | null>(null)

  // Initialize questions for the current lesson
  useEffect(() => {
    const questions = getEquationQuestionsForLesson(subject, grade, lesson)
    if (questions.length > 0) {
      setCurrentQuestions(questions)
      if (gameState.gameStatus === 'playing') {
        const levelQuestions = getEquationQuestionsForLevel(questions, gameState.level)
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



  const handleDragStart = (item: number | string) => {
    setDraggedItem(item)
  }

  const handleDrop = () => {
    if (draggedItem !== null && equation.length < 3) {
      setEquation(prev => [...prev, draggedItem])
      setDraggedItem(null)
    }
  }

  const removeFromEquation = (index: number) => {
    setEquation(prev => prev.filter((_, i) => i !== index))
  }

  const checkEquation = () => {
    if (equation.length === 3 && currentQuestionData) {
      try {
        const result = evaluateEquation(equation)
        const isCorrect = result === currentQuestionData.targetResult
        
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
          setEquation([])
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
            const nextQuestionIndex = gameState.questionsInLevel + 1
            if (nextQuestionIndex < currentQuestions.length) {
              setCurrentQuestionData(currentQuestions[nextQuestionIndex])
            }
          }
        }, 1500)
      } catch (error) {
        setShowResult(true)
        setTimeout(() => setShowResult(false), 1500)
      }
    }
  }

  const evaluateEquation = (eq: (number | string)[]): number => {
    if (eq.length !== 3) throw new Error('Invalid equation length')
    
    const [num1, operator, num2] = eq
    const n1 = Number(num1)
    const n2 = Number(num2)
    
    switch (operator) {
      case '+': return n1 + n2
      case '-': return n1 - n2
      case '*': return n1 * n2
      case '/': return n1 / n2
      default: throw new Error('Invalid operator')
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
    setEquation([])
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
            Build equations! 3 questions coming up...
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
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-600 p-4">
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

      {currentQuestionData && (
        <div className="max-w-4xl mx-auto">
          {/* Target Result */}
          <div className="text-center mb-8">
            <div className="text-white text-lg mb-2">Build an equation that equals:</div>
            <div className="text-6xl font-bold text-yellow-300 mb-2">{currentQuestionData.targetResult}</div>
            <div className="text-white/80">Level {gameState.level} - Question {gameState.questionsInLevel + 1} of 3</div>
          </div>

          {/* Equation Builder Area */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Build Your Equation</h3>
              
              {/* Equation Display */}
              <div className="flex justify-center items-center space-x-4 mb-6 min-h-[60px]">
                {equation.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <button
                      onClick={() => removeFromEquation(index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xl font-bold transition-colors"
                    >
                      {item}
                    </button>
                    {index < equation.length - 1 && <span className="text-gray-400">→</span>}
                  </div>
                ))}
                
                {equation.length < 3 && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-gray-400 rounded-lg px-4 py-2 min-w-[60px] min-h-[40px] flex items-center justify-center text-gray-400"
                  >
                    Drop here
                  </div>
                )}
              </div>

              {equation.length === 3 && (
                <div className="mb-4">
                  <div className="text-lg text-gray-600 mb-2">
                    = {evaluateEquation(equation)}
                  </div>
                  <button
                    onClick={checkEquation}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Check Answer
                  </button>
                </div>
              )}
            </div>

            {/* Available Items */}
            <div className="grid grid-cols-2 gap-6">
              {/* Numbers */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Numbers</h4>
                <div className="grid grid-cols-3 gap-2">
                  {currentQuestionData.availableNumbers.map((num, index) => (
                    <button
                      key={`num-${index}`}
                      draggable
                      onDragStart={() => handleDragStart(num)}
                      onClick={() => equation.length < 3 && setEquation(prev => [...prev, num])}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-3 rounded-lg font-bold transition-colors cursor-grab active:cursor-grabbing"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Operators */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Operators</h4>
                <div className="grid grid-cols-2 gap-2">
                  {currentQuestionData.availableOperators.map((op, index) => (
                    <button
                      key={`op-${index}`}
                      draggable
                      onDragStart={() => handleDragStart(op)}
                      onClick={() => equation.length < 3 && setEquation(prev => [...prev, op])}
                      className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-4 py-3 rounded-lg font-bold transition-colors cursor-grab active:cursor-grabbing"
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {showResult && (
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                currentQuestionData && equation.length === 3 && evaluateEquation(equation) === currentQuestionData.targetResult
                  ? 'text-green-300' 
                  : 'text-red-300'
              }`}>
                {currentQuestionData && equation.length === 3 && evaluateEquation(equation) === currentQuestionData.targetResult 
                  ? '🎉 Correct!' 
                  : '❌ Try again!'
                }
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mt-6">
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
      )}
    </div>
  )
}

export default EquationBuilderGame