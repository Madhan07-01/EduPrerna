import { useState, useEffect } from 'react'
import { evaluate } from 'mathjs'
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

interface BlankSlot {
  id: number
  filled: boolean
  value: string | number | null
  isCorrect?: boolean
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
  const [blankSlots, setBlankSlots] = useState<BlankSlot[]>([])
  const [showResult, setShowResult] = useState<boolean>(false)
  const [draggedItem, setDraggedItem] = useState<string | number | null>(null)
  const [usedOptions, setUsedOptions] = useState<Set<number>>(new Set())

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

  // Initialize blank slots when question changes
  useEffect(() => {
    if (currentQuestionData) {
      // Count blanks (_) in the equation
      const blanksCount = (currentQuestionData.equation.match(/_/g) || []).length
      const slots: BlankSlot[] = Array.from({ length: blanksCount }, (_, index) => ({
        id: index,
        filled: false,
        value: null
      }))
      setBlankSlots(slots)
      setUsedOptions(new Set())
    }
  }, [currentQuestionData])

  // Level start timer
  useEffect(() => {
    if (gameState.gameStatus === 'levelStart') {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, gameStatus: 'playing' }))
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [gameState.gameStatus])

  const handleDragStart = (item: string | number, optionIndex: number) => {
    if (!usedOptions.has(optionIndex)) {
      setDraggedItem(item)
    }
  }

  const handleDrop = (slotId: number) => {
    if (draggedItem !== null) {
      const optionIndex = currentQuestionData?.availableOptions.indexOf(draggedItem) ?? -1
      if (optionIndex !== -1 && !usedOptions.has(optionIndex)) {
        setBlankSlots(prev => prev.map(slot => 
          slot.id === slotId 
            ? { ...slot, filled: true, value: draggedItem }
            : slot
        ))
        setUsedOptions(prev => new Set([...prev, optionIndex]))
        setDraggedItem(null)
      }
    }
  }

  const removeFromBlank = (slotId: number) => {
    const slot = blankSlots.find(s => s.id === slotId)
    if (slot && slot.filled && currentQuestionData) {
      const optionIndex = currentQuestionData.availableOptions.indexOf(slot.value as string | number)
      if (optionIndex !== -1) {
        setUsedOptions(prev => {
          const newSet = new Set(prev)
          newSet.delete(optionIndex)
          return newSet
        })
      }
      setBlankSlots(prev => prev.map(s => 
        s.id === slotId 
          ? { ...s, filled: false, value: null, isCorrect: undefined }
          : s
      ))
    }
  }

  // Flexible equation validation function
  const validateEquation = (equation: string, userAnswers: (string | number)[]): boolean => {
    try {
      // Replace blanks with user answers
      let filledEquation = equation
      userAnswers.forEach((answer) => {
        filledEquation = filledEquation.replace('_', String(answer))
      })

      // Handle special mathematical symbols
      filledEquation = filledEquation.replace(/÷/g, '/')
      filledEquation = filledEquation.replace(/×/g, '*')
      filledEquation = filledEquation.replace(/²/g, '^2')
      filledEquation = filledEquation.replace(/³/g, '^3')
      
      // Handle calculus notation
      if (filledEquation.includes('∫') || filledEquation.includes('d/dx')) {
        // For calculus, we'll validate based on known derivative/integral rules
        return validateCalculusEquation(filledEquation)
      }
      
      // Split equation by equals sign
      const [leftSide, rightSide] = filledEquation.split('=')
      if (!leftSide || !rightSide) return false

      // For algebraic equations with variables (x, y, etc.), try with common values
      if (filledEquation.includes('x') || filledEquation.includes('y')) {
        const testValues = [1, 2, 3, 4, 5, -1, -2, 0, 0.5, -0.5]
        return testValues.some(val => {
          try {
            const leftWithValue = leftSide.replace(/x/g, `(${val})`).replace(/y/g, `(${val})`)
            const rightWithValue = rightSide.replace(/x/g, `(${val})`).replace(/y/g, `(${val})`)
            const leftResult = evaluate(leftWithValue)
            const rightResult = evaluate(rightWithValue)
            return Math.abs(leftResult - rightResult) < 0.0001
          } catch {
            return false
          }
        })
      }

      // For logical operations
      if (filledEquation.includes('AND') || filledEquation.includes('OR') || filledEquation.includes('NOT')) {
        return validateLogicalEquation(filledEquation)
      }

      // For regular mathematical equations
      try {
        const leftResult = evaluate(leftSide.trim())
        const rightResult = evaluate(rightSide.trim())
        return Math.abs(leftResult - rightResult) < 0.0001
      } catch {
        return false
      }
    } catch {
      return false
    }
  }

  // Helper function for calculus equation validation
  const validateCalculusEquation = (equation: string): boolean => {
    // Basic calculus validation - can be expanded
    const calculusRules = {
      '∫ cos x dx = sin x + C': true,
      '∫ sin x dx = -cos x + C': true,
      '∫ 1 dx = x + C': true,
      'd/dx (x²) = 2x': true,
      'd/dx (sin x) = cos x': true,
      'd/dx (cos x) = -sin x': true,
      'd/dx (e^x) = e^x': true,
      'd/dx (ln x) = 1/x': true
    }
    
    // Normalize the equation for comparison
    const normalized = equation.replace(/\s+/g, ' ').trim()
    return Object.keys(calculusRules).some(rule => normalized.includes(rule))
  }

  // Helper function for logical equation validation
  const validateLogicalEquation = (equation: string): boolean => {
    try {
      // Known logical equivalences
      const logicalRules = {
        '0 AND 1 = 0': true,
        '1 OR 0 = 1': true,
        '1 OR 1 = 1': true,
        'NOT 1 = 0': true,
        'NOT 0 = 1': true,
        '1 XOR 1 = 0': true,
        '0 XOR 1 = 1': true,
        '1 XOR 0 = 1': true
      }
      
      const normalized = equation.replace(/\s+/g, ' ').trim()
      return Object.keys(logicalRules).some(rule => normalized === rule)
    } catch {
      return false
    }
  }

  const checkEquation = () => {
    if (!currentQuestionData || blankSlots.some(slot => !slot.filled)) {
      return // Not all blanks filled
    }

    const userAnswers = blankSlots.map(slot => slot.value)
    
    // Use flexible validation
    const isCorrect = validateEquation(currentQuestionData.equation, userAnswers as (string | number)[])

    // Update slot visual feedback - for flexible validation, mark all as correct if equation is valid
    setBlankSlots(prev => prev.map(slot => ({
      ...slot,
      isCorrect: isCorrect
    })))
    
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
        const levelQuestions = getEquationQuestionsForLevel(currentQuestions, gameState.level)
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
    setBlankSlots([])
    setUsedOptions(new Set())
  }

  const renderEquationWithBlanks = () => {
    if (!currentQuestionData) return null
    
    const parts = currentQuestionData.equation.split('_')
    const elements: React.ReactNode[] = []
    
    parts.forEach((part, partIndex) => {
      // Add the text part
      if (part) {
        elements.push(
          <span key={`text-${partIndex}`} className="text-gray-800 text-2xl font-semibold">
            {part}
          </span>
        )
      }
      
      // Add blank slot if not the last part
      if (partIndex < parts.length - 1) {
        const slotIndex = partIndex
        const slot = blankSlots[slotIndex]
        
        elements.push(
          <div
            key={`blank-${slotIndex}`}
            onDrop={() => handleDrop(slotIndex)}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => slot?.filled ? removeFromBlank(slotIndex) : undefined}
            className={`inline-flex items-center justify-center min-w-[80px] h-12 mx-2 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
              slot?.filled 
                ? showResult 
                  ? slot.isCorrect 
                    ? 'bg-green-100 border-green-500 text-green-800' 
                    : 'bg-red-100 border-red-500 text-red-800 animate-shake'
                  : 'bg-blue-100 border-blue-500 text-blue-800'
                : 'border-gray-400 hover:border-blue-400 hover:bg-blue-50'
            }`}
          >
            {slot?.filled ? (
              <span className="text-lg font-bold">{slot.value}</span>
            ) : (
              <span className="text-gray-400 text-sm">Drop here</span>
            )}
          </div>
        )
      }
    })
    
    return <div className="flex items-center justify-center flex-wrap">{elements}</div>
  }

  // Level Start Screen
  if (gameState.gameStatus === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🧩</div>
          <div className="text-8xl font-bold text-white mb-4 animate-pulse">
            Level {gameState.level}
          </div>
          <div className="text-2xl text-white/80">
            Equation Builder - 3 questions coming up...
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
          {/* Equation Display */}
          <div className="bg-white rounded-2xl p-8 mb-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🧩</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Complete the Equation</h3>
              <div className="text-sm text-gray-600 mb-6">
                Level {gameState.level} - Question {gameState.questionsInLevel + 1} of 3
              </div>
              
              {/* Equation with blanks */}
              <div className="my-8 p-6 bg-gray-50 rounded-xl">
                {renderEquationWithBlanks()}
              </div>

              {/* Check button */}
              {blankSlots.every(slot => slot.filled) && !showResult && (
                <button
                  onClick={checkEquation}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-lg"
                >
                  ✓ Check Equation
                </button>
              )}
            </div>

            {/* Available Options */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">Drag the correct answers:</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {currentQuestionData.availableOptions.map((option, index) => (
                  <button
                    key={index}
                    draggable={!usedOptions.has(index)}
                    onDragStart={() => handleDragStart(option, index)}
                    onClick={() => {
                      const emptySlot = blankSlots.find(slot => !slot.filled)
                      if (emptySlot && !usedOptions.has(index)) {
                        handleDrop(emptySlot.id)
                      }
                    }}
                    disabled={usedOptions.has(index)}
                    className={`p-3 rounded-lg font-bold transition-all text-center ${
                      usedOptions.has(index)
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-grab active:cursor-grabbing hover:scale-105'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Display */}
          {showResult && (
            <div className="text-center mb-6">
              <div className={`text-2xl font-bold ${
                blankSlots.every(slot => slot.isCorrect)
                  ? 'text-green-300' 
                  : 'text-red-300'
              }`}>
                {blankSlots.every(slot => slot.isCorrect)
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

      {/* No Questions Available */}
      {!currentQuestionData && gameState.gameStatus === 'playing' && (
        <div className="text-center text-white">
          <div className="text-6xl mb-4">🧩</div>
          <h2 className="text-3xl font-bold mb-4">Equation Builder Puzzle</h2>
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

export default EquationBuilderGame