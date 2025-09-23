import React, { useEffect, useRef, useState } from 'react'
import { getQuestionsForLesson, getQuestionsForLevel, type Question } from './data/questionBank'
import { getQuestionsForLevel as getMathRunnerQuestions, isGradeSupported } from './data/mathRunnerQuestionBank'
import { useAuth } from '../../../hooks/useAuth'
import { saveGameResult } from '../../../services/miniGames'

// Old props/types removed; using MathRunnerGameProps and gameState below

interface MathRunnerGameProps {
  subject: string
  grade: string  
  lesson?: string
  onBack: () => void
}

interface GameState {
  level: number
  score: number
  hearts: number
  currentQuestion: number
  questionsInLevel: number
  gameStatus: 'levelStart' | 'playing' | 'paused' | 'levelComplete' | 'gameComplete' | 'gameOver'
  speed: number
}

const generateOptions = (question: string): { options: string[], correctAnswer: number } => {
  try {
    const numbers = question.match(/[\d.]+/g) || []
    const operators = question.match(/[+\-×÷x*/\-]/g) || []
    let correctAnswer = 0
    if (numbers.length >= 2) {
      const a = parseFloat(numbers[0] || '0')
      const b = parseFloat(numbers[1] || '0')
      switch (operators[0]) {
        case '+': correctAnswer = a + b; break
        case '-': correctAnswer = a - b; break
        case '×': case 'x': case '*': correctAnswer = a * b; break
        case '÷': case '/': correctAnswer = b !== 0 ? a / b : 0; break
        default: correctAnswer = a + b
      }
    }
    const options = [
      correctAnswer.toString(),
      (correctAnswer + Math.floor(Math.random() * 5) + 1).toString(),
      (correctAnswer - Math.floor(Math.random() * 5) - 1).toString()
    ]
    const shuffled = [...options].sort(() => Math.random() - 0.5)
    const correctIndex = shuffled.indexOf(correctAnswer.toString())
    return { options: shuffled, correctAnswer: Math.max(0, correctIndex) }
  } catch {
    return { options: ['A','B','C'], correctAnswer: 0 }
  }
}

const MathRunner: React.FC<MathRunnerGameProps> = ({ subject, grade, lesson, onBack }) => {
  const { currentUser } = useAuth()
  const [gameState, setGameState] = useState<GameState>({ level: 1, score: 0, hearts: 3, currentQuestion: 0, questionsInLevel: 0, gameStatus: 'levelStart', speed: 1 })
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([])
  const [currentQuestionData, setCurrentQuestionData] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [characterPosition, setCharacterPosition] = useState<number>(0)
  const [backgroundPosition, setBackgroundPosition] = useState<number>(0)
  const [characterAnimation, setCharacterAnimation] = useState<'running' | 'jumping' | 'stumbling'>('running')
  const awardedRef = useRef(false)

  useEffect(() => {
    if (gameState.gameStatus === 'levelStart') {
      const timer = setTimeout(() => { setGameState(prev => ({ ...prev, gameStatus: 'playing' })) }, 2000)
      return () => clearTimeout(timer)
    }
  }, [gameState.gameStatus])

  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      const interval = setInterval(() => { setBackgroundPosition(prev => (prev - gameState.speed) % 100) }, 50)
      return () => clearInterval(interval)
    }
  }, [gameState.gameStatus, gameState.speed])

  // When gameplay starts or level changes, set the first question of the level
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return
    const levelQuestions = getQuestionsForLevel(currentQuestions, gameState.level)
    if (levelQuestions.length > 0) {
      setCurrentQuestionData(levelQuestions[gameState.questionsInLevel] || levelQuestions[0])
    }
  }, [gameState.gameStatus, gameState.level, currentQuestions])

  useEffect(() => {
    if (isGradeSupported(grade)) {
      const questions: Question[] = []
      for (let level = 1; level <= 5; level++) {
        const levelQuestions = getMathRunnerQuestions(grade, lesson || '', level.toString())
        levelQuestions.forEach((questionText, index) => {
          const { options, correctAnswer } = generateOptions(questionText)
          questions.push({ id: (level - 1) * 3 + index + 1, question: questionText, options, correctAnswer, difficulty: level })
        })
      }
      setCurrentQuestions(questions)
      if (gameState.gameStatus === 'playing' && questions.length > 0) {
        const levelQuestions = getQuestionsForLevel(questions, gameState.level)
        if (levelQuestions.length > 0) setCurrentQuestionData(levelQuestions[gameState.questionsInLevel])
      }
    } else {
      const questions = getQuestionsForLesson(subject, grade, lesson || '')
      if (questions.length > 0) {
        setCurrentQuestions(questions)
        if (gameState.gameStatus === 'playing') {
          const levelQuestions = getQuestionsForLevel(questions, gameState.level)
          if (levelQuestions.length > 0) setCurrentQuestionData(levelQuestions[gameState.questionsInLevel])
        }
      }
    }
  }, [subject, grade, lesson, gameState.level, gameState.questionsInLevel, gameState.gameStatus])

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || showResult) return
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    const isCorrect = answerIndex === currentQuestionData?.correctAnswer
    setTimeout(() => {
      if (isCorrect) {
        setCharacterAnimation('jumping'); setCharacterPosition(20)
        setTimeout(() => { setCharacterPosition(0); setCharacterAnimation('running') }, 500)
        setGameState(prev => ({ ...prev, score: prev.score + 10, questionsInLevel: prev.questionsInLevel + 1 }))
      } else {
        setCharacterAnimation('stumbling'); setTimeout(() => setCharacterAnimation('running'), 800)
        setGameState(prev => ({ ...prev, hearts: prev.hearts - 1, questionsInLevel: prev.questionsInLevel + 1, speed: Math.max(prev.speed * 0.8, 0.3) }))
      }
      setSelectedAnswer(null); setShowResult(false)
      if (gameState.questionsInLevel + 1 >= 3) {
        if (gameState.level >= 5) setGameState(prev => ({ ...prev, gameStatus: 'gameComplete' }))
        else setGameState(prev => ({ ...prev, gameStatus: 'levelComplete' }))
      } else if (gameState.hearts <= 1 && !isCorrect) {
        setGameState(prev => ({ ...prev, gameStatus: 'gameOver' }))
      } else {
        const nextQuestionIndex = gameState.questionsInLevel + 1
        const levelQuestions = getQuestionsForLevel(currentQuestions, gameState.level)
        if (nextQuestionIndex < levelQuestions.length) setCurrentQuestionData(levelQuestions[nextQuestionIndex])
      }
    }, 1500)
  }

  const restartGame = () => {
    setGameState({ level: 1, score: 0, hearts: 3, currentQuestion: 0, questionsInLevel: 0, gameStatus: 'levelStart', speed: 1 })
  }

  const nextLevel = () => {
    setGameState(prev => ({ ...prev, level: prev.level + 1, questionsInLevel: 0, gameStatus: 'levelStart', speed: Math.min(prev.speed + 0.2, 3) }))
  }

  const restart = () => restartGame()

  if (gameState.gameStatus === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl font-bold text-white mb-4 animate-pulse">Level {gameState.level}</div>
          <div className="text-2xl text-white/80">Get ready! 3 questions coming up...</div>
        </div>
      </div>
    )
  }

  if (gameState.gameStatus === 'levelComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-500 to-teal-700 text-white flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md w-full border border-white/20">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold mb-2">Level {gameState.level} Complete!</h2>
          <p className="mb-4">Score: {gameState.score} • Lives: {'❤️'.repeat(gameState.hearts)}</p>
          <div className="space-y-3">
            <button onClick={nextLevel} className="w-full bg-emerald-500/80 hover:bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors">➡️ Next Level</button>
            <button onClick={onBack} className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState.gameStatus === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-500 to-red-700 text-white flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md w-full border border-white/20">
          <div className="text-6xl mb-4">💥</div>
          <h2 className="text-3xl font-bold mb-2">Game Over</h2>
          <p className="mb-4">Final Score: {gameState.score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-blue-500/80 hover:bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Retry</button>
            <button onClick={onBack} className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (gameState.gameStatus === 'gameComplete') {
    // Award XP once on completion
    if (!awardedRef.current) {
      awardedRef.current = true
      ;(async () => {
        try {
          if (currentUser?.uid) {
            // Persist local best
            try {
              const key = 'mg_best'
              const raw = localStorage.getItem(key) || '{}'
              const obj = JSON.parse(raw) as Record<string, number>
              obj['math-runner'] = Math.max(obj['math-runner'] || 0, gameState.score)
              localStorage.setItem(key, JSON.stringify(obj))
            } catch {}

            await saveGameResult(currentUser.uid, 'math-runner', gameState.score, currentUser.displayName || 'Anonymous')
          }
        } catch (e) {
          console.error('Failed to award XP for Math Runner:', e)
        }
      })()
    }
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-500 to-orange-700 text-white flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md w-full border border-white/20">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold mb-2">You finished all levels!</h2>
          <p className="mb-4">Total Score: {gameState.score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-indigo-500/80 hover:bg-indigo-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Play Again</button>
            <button onClick={onBack} className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-600 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <button onClick={onBack} className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
            <span className="text-xl">←</span>
            <span className="text-white font-medium">Back</span>
          </button>
          <div className="flex items-center space-x-6 text-white">
            <div className="text-center"><div className="text-sm opacity-80">Level</div><div className="text-xl font-bold">{gameState.level}</div></div>
            <div className="text-center"><div className="text-sm opacity-80">Score</div><div className="text-xl font-bold">{gameState.score}</div></div>
            <div className="flex space-x-1">{[...Array(3)].map((_, i) => (<span key={i} className="text-2xl">{i < gameState.hearts ? '❤' : '🤍'}</span>))}</div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-repeat-x bg-contain" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'100\\' height=\\'20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Crect width=\\'100\\' height=\\'20\\' fill=\\'%23ffffff\\' fill-opacity=\\'0.1\\'/%3E%3C/svg%3E')", transform: `translateX(${backgroundPosition}px)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-400 border-t-4 border-green-600">
          <div className="absolute inset-0 bg-repeat-x" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Crect x=\\'0\\' y=\\'15\\' width=\\'5\\' height=\\'5\\' fill=\\'%23059669\\'/%3E%3Crect x=\\'10\\' y=\\'12\\' width=\\'3\\' height=\\'8\\' fill=\\'%23059669\\'/%3E%3Crect x=\\'20\\' y=\\'14\\' width=\\'4\\' height=\\'6\\' fill=\\'%23059669\\'/%3E%3Crect x=\\'30\\' y=\\'16\\' width=\\'2\\' height=\\'4\\' fill=\\'%23059669\\'/%3E%3C/svg%3E')", transform: `translateX(${backgroundPosition * 1.5}px)` }} />
        </div>
      </div>

      <div className={`absolute bottom-20 left-16 z-10 transition-all duration-500 ease-out ${characterAnimation === 'stumbling' ? 'animate-pulse' : ''}`} style={{ transform: `translateY(-${characterPosition}px)` }}>
        <div className={`text-6xl ${characterAnimation === 'running' ? 'animate-bounce' : characterAnimation === 'jumping' ? 'animate-ping' : 'animate-pulse'}`}>
          {characterAnimation === 'stumbling' ? '🤕' : '🏃‍♂'}
        </div>
      </div>

      {currentQuestionData && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl border-4 border-yellow-400">
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-gray-800 mb-4">{currentQuestionData.question}</div>
              <div className="text-sm text-gray-600">Level {gameState.level} - Question {gameState.questionsInLevel + 1} of 3</div>
            </div>
            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <button key={index} onClick={() => handleAnswerSelect(index)} disabled={selectedAnswer !== null} className={`w-full p-4 rounded-lg border-2 transition-all font-semibold ${selectedAnswer === null ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-800 hover:text-gray-900' : selectedAnswer === index ? (index === currentQuestionData.correctAnswer ? 'border-green-500 bg-green-100 text-green-800' : 'border-red-500 bg-red-100 text-red-800') : index === currentQuestionData.correctAnswer && showResult ? 'border-green-500 bg-green-100 text-green-800' : 'border-gray-300 bg-gray-50 text-gray-700'}`}>
                  {option}
                </button>
              ))}
            </div>
            {showResult && (
              <div className="mt-4 text-center">
                <div className={`text-lg font-bold ${selectedAnswer === currentQuestionData.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>{selectedAnswer === currentQuestionData.correctAnswer ? '🎉 Correct!' : '❌ Try again!'}</div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="bg-black/20 backdrop-blur-sm rounded-full p-2">
          <div className="bg-white/20 rounded-full h-2">
            <div className="bg-yellow-400 h-2 rounded-full transition-all duration-300" style={{ width: `${((gameState.level - 1) * 20 + (gameState.questionsInLevel / 3) * 20)}%` }} />
          </div>
          <div className="text-center text-white text-sm mt-1">Level {gameState.level}/5 - Question {gameState.questionsInLevel + 1}/3</div>
        </div>
      </div>
    </div>
  )
}

export default MathRunner
