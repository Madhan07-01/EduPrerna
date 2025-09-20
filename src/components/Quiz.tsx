import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Question = {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
}

export default function Quiz() {
  const questions: Question[] = [
    {
      id: 'q1',
      prompt: 'Which number is a prime?',
      options: ['4', '9', '11'],
      correctIndex: 2,
    },
    {
      id: 'q2',
      prompt: 'Water boils at what temperature (°C)?',
      options: ['80', '90', '100'],
      correctIndex: 2,
    },
    {
      id: 'q3',
      prompt: 'Chemical symbol for Oxygen is…',
      options: ['O', 'Ox', 'Og'],
      correctIndex: 0,
    },
    {
      id: 'q4',
      prompt: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter'],
      correctIndex: 1,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [completed, setCompleted] = useState(false)

  const current = questions[currentIndex]

  function handleSelect(optionIndex: number) {
    if (completed) return
    setSelected(optionIndex)
  }

  function handleNext() {
    if (selected === null) return
    if (selected === current.correctIndex) setScore((s) => s + 1)
    if (currentIndex === questions.length - 1) {
      setCompleted(true)
      return
    }
    setCurrentIndex((i) => i + 1)
    setSelected(null)
  }

  function handleRestart() {
    setCurrentIndex(0)
    setScore(0)
    setSelected(null)
    setCompleted(false)
  }

  if (completed) {
    return (
      <div className="space-y-4">
        <div className="text-xl font-semibold">Quiz Complete</div>
        <div className="text-sm">Your score: {score} / {questions.length}</div>
        <button onClick={handleRestart} className="rounded-md bg-blue-600 text-white px-4 py-2 text-sm">Restart</button>
      </div>
    )
  }

  const isAnswered = selected !== null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Question {currentIndex + 1} of {questions.length}</div>
        <div className="text-sm">Score: <span className="font-semibold">{score}</span></div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="text-lg font-medium"
        >
          {current.prompt}
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-1 gap-2">
        {current.options.map((opt, idx) => {
          const isCorrect = isAnswered && idx === current.correctIndex
          const isWrongSelection = isAnswered && idx === selected && selected !== current.correctIndex
          const base = 'rounded-md border px-4 py-2 text-left text-sm transition-colors select-none'
          const color = isCorrect
            ? 'bg-emerald-600 text-white border-emerald-600'
            : isWrongSelection
              ? 'bg-rose-600 text-white border-rose-600'
              : selected === idx
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white border-gray-300 hover:bg-gray-50'
          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(idx)}
              className={`${base} ${color}`}
            >
              {opt}
            </motion.button>
          )
        })}
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={handleNext}
          disabled={selected === null}
          className={`rounded-md px-4 py-2 text-sm ${selected === null ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
        >
          {currentIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
        </button>
      </div>
    </div>
  )
}



