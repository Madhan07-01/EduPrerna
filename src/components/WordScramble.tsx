import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function scrambleWord(word: string): string {
  const chars = word.split('')
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = chars[i]
    chars[i] = chars[j]
    chars[j] = temp
  }
  const scrambled = chars.join('')
  return scrambled === word && word.length > 1 ? scrambleWord(word) : scrambled
}

export default function WordScramble({ onExit, onSwitchToQuiz }: { onExit?: () => void; onSwitchToQuiz?: () => void }) {
  const words = useMemo(() => ['biology', 'math', 'science'], [])
  const [index, setIndex] = useState(0)
  const [scrambled, setScrambled] = useState('')
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [score, setScore] = useState(0)

  useEffect(() => {
    setScrambled(scrambleWord(words[index]))
    setGuess('')
    setFeedback(null)
  }, [index, words])

  function handleCheck() {
    if (!guess.trim()) return
    if (guess.trim().toLowerCase() === words[index].toLowerCase()) {
      setFeedback('correct')
      setScore((s) => s + 1)
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
      }, 600)
    } else {
      setFeedback('wrong')
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleCheck()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold text-gray-900 dark:text-white">Word Scramble</div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-700 dark:text-slate-300">Score: <span className="font-semibold">{score}</span></div>
          {onSwitchToQuiz && (
            <button
              onClick={onSwitchToQuiz}
              className="rounded-md bg-sky-600 text-white px-3 py-2 text-sm hover:bg-sky-700"
            >
              Switch to Quiz
            </button>
          )}
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

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-slate-900/60 p-6">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Unscramble the word:</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={scrambled}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="text-3xl font-bold tracking-wider text-gray-900 dark:text-slate-100 mb-4 select-none"
          >
            {scrambled}
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your guess"
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          />
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleCheck}
            className="rounded-md bg-green-600 text-white px-4 py-2 text-sm hover:bg-green-700"
          >
            Check
          </motion.button>
        </div>
        <AnimatePresence>
          {feedback === 'correct' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-3 text-sm text-emerald-600"
            >
              ✅ Correct!
            </motion.div>
          )}
          {feedback === 'wrong' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-3 text-sm text-rose-600"
            >
              ❌ Try again!
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-6 text-xs text-gray-600 dark:text-gray-400">
          Word {index + 1} of {words.length}
        </div>
      </div>
    </div>
  )
}



