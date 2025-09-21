import React, { useMemo, useState } from 'react'

export interface QuizQuestionProps {
  // Content
  question: string
  options: string[]
  correctIndex: number
  // Progress + score (display only)
  current: number // 1-based
  total: number
  score: number
  // Callbacks
  onCorrect?: () => void
  onWrongRetry?: () => void
  // Optional: allow disabling interactions from parent
  disabled?: boolean
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correctIndex,
  current,
  total,
  score,
  onCorrect,
  onWrongRetry,
  disabled = false,
}) => {
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong' | null; message: string }>({ type: null, message: '' })

  const progressPercent = useMemo(() => {
    const pct = Math.max(0, Math.min(100, Math.round((current / Math.max(1, total)) * 100)))
    return pct
  }, [current, total])

  const handleClick = (idx: number) => {
    if (disabled) return
    setSelected(idx)
    const isCorrect = idx === correctIndex
    if (isCorrect) {
      setFeedback({ type: 'correct', message: '✅ Correct!' })
      // Slight delay for animation then notify parent
      window.setTimeout(() => {
        onCorrect?.()
      }, 600)
    } else {
      setFeedback({ type: 'wrong', message: '❌ Wrong! Try again…' })
      // Allow retry; do not lock
      onWrongRetry?.()
    }
  }

  const buttonState = (idx: number) => {
    if (selected == null) return ''
    if (idx === selected) {
      if (feedback.type === 'correct') return 'ring-2 ring-emerald-400 bg-emerald-500/20 text-emerald-200'
      if (feedback.type === 'wrong') return 'ring-2 ring-red-400 bg-red-500/20 text-red-200'
    }
    return ''
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

      {/* Top progress bar */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between text-white/90 mb-2">
          <div className="text-sm md:text-base font-medium">Question {current} of {total}</div>
          <div className="text-sm md:text-base font-semibold">⭐ Score: {score}</div>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Centered card */}
      <div className="relative z-10 min-h-[calc(100vh-96px)] flex items-center justify-center px-4 pb-10">
        <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <div className="p-6 md:p-8">
            {/* Question */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight text-center leading-snug">
              {question}
            </h1>

            {/* Feedback with animation */}
            {feedback.type && (
              <div
                key={feedback.message}
                className={`mt-4 text-center font-semibold transition-all duration-300 ease-out ${feedback.type === 'correct' ? 'text-emerald-400' : 'text-red-400'} animate-[fadeInScale_300ms_ease-out]`}
              >
                {feedback.message}
              </div>
            )}

            {/* Options */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {options.map((opt, i) => (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => handleClick(i)}
                  className={[
                    'group relative w-full rounded-xl px-4 py-3 md:py-4 text-left text-white/90',
                    'bg-white/10 hover:bg-white/15 active:scale-[0.99] transition-all duration-200',
                    'border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400',
                    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                    buttonState(i),
                  ].join(' ')}
                >
                  <span className="mr-2 font-semibold text-white/60">{String.fromCharCode(65 + i)}.</span>
                  <span className="font-medium">{opt}</span>
                  <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes (Tailwind JIT supports arbitrary) */}
      <style>{`
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}

export default QuizQuestion
