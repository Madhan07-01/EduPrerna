import { useMemo, useState } from 'react'

type Question = {
  prompt: string
  options: string[]
  correctIndex: number
}

export default function TreasureHuntQuiz({ onExit }: { onExit?: () => void }) {
  const questions: Question[] = useMemo(
    () => [
      {
        prompt: 'Clue 1: I am the smallest prime number. Who am I?',
        options: ['0', '1', '2'],
        correctIndex: 2,
      },
      {
        prompt: 'Clue 2: Water boils at what temperature (°C) at sea level?',
        options: ['90', '100', '110'],
        correctIndex: 1,
      },
      {
        prompt: 'Final Clue: The chemical symbol for gold is…',
        options: ['Ag', 'Au', 'Gd'],
        correctIndex: 1,
      },
    ],
    [],
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)

  const current = questions[currentIndex]

  function handleSelect(optionIndex: number) {
    if (completed) return
    const isCorrect = optionIndex === current.correctIndex
    if (!isCorrect) {
      setFeedback('Try Again')
      return
    }
    setFeedback(null)
    const isFinal = currentIndex === questions.length - 1
    if (isFinal) {
      setCompleted(true)
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  function handleRestart() {
    setCurrentIndex(0)
    setFeedback(null)
    setCompleted(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold text-gray-900 dark:text-white">Treasure Hunt Quiz</div>
        <div className="flex gap-2">
          <button
            onClick={handleRestart}
            className="rounded-md bg-gray-600 text-white px-3 py-2 text-sm hover:bg-gray-700"
          >
            Restart
          </button>
          {onExit && (
            <button
              onClick={onExit}
              className="rounded-md bg-slate-800 text-white px-3 py-2 text-sm hover:bg-slate-900"
            >
              Back
            </button>
          )}
        </div>
      </div>

      {!completed ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-slate-900/60 p-6">
          <div className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-4">{current.prompt}</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {current.options.map((opt, idx) => (
              <button
                key={opt}
                onClick={() => handleSelect(idx)}
                className="rounded-md bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700"
              >
                {opt}
              </button>
            ))}
          </div>
          {feedback && (
            <div className="mt-4 text-sm text-rose-500 font-medium" role="status">
              {feedback}
            </div>
          )}
          <div className="mt-6 text-xs text-gray-600 dark:text-gray-400">
            Clue {currentIndex + 1} of {questions.length}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-600 to-teal-500 p-6 text-white">
          <div className="text-2xl">🎉 You found the Treasure!</div>
          <div className="mt-2 opacity-90">Great job solving all the clues.</div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleRestart}
              className="rounded-md bg-white text-emerald-700 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
            >
              Play Again
            </button>
            {onExit && (
              <button
                onClick={onExit}
                className="rounded-md bg-white/20 text-white px-4 py-2 text-sm font-semibold hover:bg-white/30"
              >
                Back to Games
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}




