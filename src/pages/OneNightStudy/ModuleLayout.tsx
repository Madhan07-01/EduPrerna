import { useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { LearningModule } from './types'

interface ModuleLayoutProps {
  module: LearningModule
  grade: number
  subject: string
  children?: ReactNode
}

export default function ModuleLayout({ module, grade, subject }: ModuleLayoutProps) {
  const navigate = useNavigate()
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showAnswers, setShowAnswers] = useState<boolean>(false)
  const [moduleStarted, setModuleStarted] = useState<boolean>(false)

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }))
  }

  const calculateScore = () => {
    let correct = 0
    module.mcqs.forEach((mcq, index) => {
      if (selectedAnswers[index] === mcq.correct) {
        correct++
      }
    })
    return correct
  }

  const resetMCQs = () => {
    setSelectedAnswers({})
    setShowAnswers(false)
  }

  const backToTopics = () => {
    navigate('/onestudy')
  }

  const startModule = () => {
    setModuleStarted(true)
    resetMCQs()
  }

  const retryModule = () => {
    resetMCQs()
    setModuleStarted(true)
  }

  // If module hasn't been started, show the start screen
  if (!moduleStarted) {
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={backToTopics}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Topics
          </button>
          <div className="text-sm text-gray-500 dark:text-slate-500">Grade {grade} • {subject}</div>
        </div>

        {/* Module Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{module.title}</h1>
          <p className="text-lg text-gray-600 dark:text-slate-400">Complete Learning Module</p>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-3">📚 Introduction</h2>
          <p className="text-blue-800 dark:text-blue-400 leading-relaxed">{module.introduction}</p>
        </div>

        {/* Start Module Button */}
        <div className="text-center">
          <button
            onClick={startModule}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-3 mx-auto"
          >
            <span>🚀</span>
            <span>Start Complete Learning Module</span>
          </button>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-3">
            Interactive lessons + MCQs + Self-checking
          </p>
        </div>

        {/* Preview of topics */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📋 What You'll Learn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {module.concepts.map((concept, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">{concept.title}</h4>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-slate-400">
            Plus {module.mcqs.length} practice questions with detailed explanations
          </div>
        </div>
      </div>
    )
  }

  // Main module content when started
  return (
    <div className="space-y-6">
      {/* Header with back button and retry */}
      <div className="flex items-center justify-between">
        <button
          onClick={backToTopics}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          ← Back to Topics
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={retryModule}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm transition-colors"
          >
            🔄 Retry Module
          </button>
          <div className="text-sm text-gray-500 dark:text-slate-500">Grade {grade} • {subject}</div>
        </div>
      </div>

      {/* Module Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{module.title}</h1>
        <p className="text-lg text-gray-600 dark:text-slate-400">Complete Learning Module</p>
      </div>

      {/* Introduction */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-3">📚 Introduction</h2>
        <p className="text-blue-800 dark:text-blue-400 leading-relaxed">{module.introduction}</p>
      </div>

      {/* Core Concepts */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🎯 Core Concepts</h2>
        {module.concepts.map((concept, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{concept.title}</h3>
            <p className="text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">{concept.content}</p>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Examples:</h4>
              <ul className="list-disc pl-6 space-y-1">
                {concept.examples.map((example, exIndex) => (
                  <li key={exIndex} className="text-gray-600 dark:text-slate-400">{example}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* MCQ Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Practice Questions</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
            >
              {showAnswers ? 'Hide Answers' : 'Show Answers'}
            </button>
            <button
              onClick={resetMCQs}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
            >
              Reset Questions
            </button>
          </div>
        </div>

        {module.mcqs.map((mcq, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Question {index + 1}: {mcq.question}
            </h3>
            <div className="space-y-2">
              {mcq.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    checked={selectedAnswers[index] === optionIndex}
                    onChange={() => handleAnswerSelect(index, optionIndex)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className={`text-gray-700 dark:text-slate-300 ${
                    showAnswers && optionIndex === mcq.correct ? 'font-semibold text-green-600 dark:text-green-400' : ''
                  }`}>
                    {option}
                  </span>
                  {showAnswers && optionIndex === mcq.correct && (
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  )}
                </label>
              ))}
            </div>
            {showAnswers && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Explanation:</h4>
                <p className="text-green-700 dark:text-green-400">{mcq.explanation}</p>
              </div>
            )}
          </div>
        ))}

        {/* Score Display */}
        {Object.keys(selectedAnswers).length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Progress</h3>
            <p className="text-gray-700 dark:text-slate-300">
              You've answered {Object.keys(selectedAnswers).length} out of {module.mcqs.length} questions.
              {showAnswers && (
                <span className="block mt-2">
                  Score: {calculateScore()}/{module.mcqs.length} ({Math.round((calculateScore() / module.mcqs.length) * 100)}%)
                </span>
              )}
            </p>
            {Object.keys(selectedAnswers).length === module.mcqs.length && showAnswers && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  🎉 Module Complete!
                </h4>
                <p className="text-green-700 dark:text-green-400">
                  Great job! You've completed all questions. 
                  {calculateScore() === module.mcqs.length 
                    ? ' Perfect score! 🌟' 
                    : ` You scored ${Math.round((calculateScore() / module.mcqs.length) * 100)}%.`
                  }
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={retryModule}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={backToTopics}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                  >
                    Back to Topics
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}