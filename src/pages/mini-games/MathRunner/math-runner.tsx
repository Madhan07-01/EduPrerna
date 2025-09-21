import React, { useEffect, useMemo, useState } from 'react'
import { getLessonsForGrade, getQuestionsForLevel, isGradeSupported } from './questionBank'

interface MathRunnerProps {
  subject: string
  grade: string
  lesson?: string
  onBack: () => void
}

type Status = 'levelStart' | 'playing' | 'levelComplete' | 'gameOver' | 'gameComplete'

const MAX_LEVELS = 5
const QUESTIONS_PER_LEVEL = 3

const Pill = ({ children }:{ children: React.ReactNode }) => (
  <span className="inline-block px-2 py-1 rounded-full text-xs bg-slate-900/60 text-white border border-white/10">{children}</span>
)

const MathRunner: React.FC<MathRunnerProps> = ({ grade, lesson, onBack }) => {
  const [status, setStatus] = useState<Status>('levelStart')
  const [level, setLevel] = useState(1)
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [activeLesson, setActiveLesson] = useState<string>('')

  const lessons = useMemo(() => (isGradeSupported(grade) ? getLessonsForGrade(grade) : []), [grade])

  useEffect(() => {
    setActiveLesson(lesson && lessons.includes(lesson) ? lesson : (lessons[0] || ''))
  }, [lesson, lessons])

  const questions = useMemo(() => {
    if (!activeLesson) return [] as string[]
    return getQuestionsForLevel(grade, activeLesson, String(level))
  }, [grade, activeLesson, level])

  useEffect(() => { setQIndex(0) }, [level, activeLesson])

  const answer = (correct: boolean) => {
    const newLives = correct ? lives : Math.max(0, lives - 1)
    const newScore = correct ? score + 10 : score

    if (!correct && newLives === 0) { setLives(newLives); setScore(newScore); setStatus('gameOver'); return }

    const nextIndex = correct ? qIndex + 1 : qIndex
    if (nextIndex >= QUESTIONS_PER_LEVEL) {
      if (level >= MAX_LEVELS) setStatus('gameComplete')
      else setStatus('levelComplete')
      setLives(newLives); setScore(newScore)
      return
    }

    if (correct) setQIndex(nextIndex)
    setLives(newLives); setScore(newScore)
  }

  const restart = () => { setStatus('levelStart'); setLevel(1); setQIndex(0); setLives(3); setScore(0) }
  const nextLevel = () => { setStatus('levelStart'); setLevel(l => Math.min(MAX_LEVELS, l + 1)); setQIndex(0) }

  if (!isGradeSupported(grade)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-fuchsia-600 to-pink-700 text-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">ℹ️</div>
          <h2 className="text-3xl font-bold mb-2">Grade not supported</h2>
          <p className="opacity-90">Please choose a supported grade from the launcher.</p>
          <div className="mt-6"><button onClick={onBack} className="underline">Back</button></div>
        </div>
      </div>
    )
  }

  if (!activeLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-violet-700 text-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📘</div>
          <h2 className="text-3xl font-bold mb-2">Pick a Lesson</h2>
          <p className="opacity-90">Select a lesson to begin your run.</p>
          <div className="mt-6"><button onClick={onBack} className="underline">Back</button></div>
        </div>
      </div>
    )
  }

  if (status === 'levelStart') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-600 to-indigo-800 text-white flex items-center justify-center p-6">
        <div className="text-center max-w-lg w-full">
          <div className="text-6xl mb-2">🏃‍♂️</div>
          <h1 className="text-4xl font-bold">Math Runner</h1>
          <div className="mt-2 space-x-2">
            <Pill>Grade {grade}</Pill>
            <Pill>Lesson: {activeLesson}</Pill>
            <Pill>Level {level}</Pill>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lessons.map(lsn => (
              <button key={lsn} onClick={() => setActiveLesson(lsn)} className={`px-4 py-2 rounded-lg border ${activeLesson===lsn? 'bg-white/20 border-white/40' : 'bg-white/10 border-white/20 hover:bg-white/15'}`}>{lsn}</button>
            ))}
          </div>

          <button onClick={() => setStatus('playing')} className="mt-6 px-6 py-3 rounded-lg bg-white/20 hover:bg-white/30">Start Level</button>
          <div className="mt-4"><button onClick={onBack} className="underline">Back</button></div>
        </div>
      </div>
    )
  }

  if (status === 'levelComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-500 to-teal-700 text-white flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md w-full border border-white/20">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold mb-2">Level {level} Complete!</h2>
          <p className="mb-4">Score: {score} • Lives: {'❤️'.repeat(lives)}</p>
          <div className="space-y-3">
            <button onClick={nextLevel} className="w-full bg-emerald-500/80 hover:bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors">➡️ Next Level</button>
            <button onClick={onBack} className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-500 to-red-700 text-white flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md w-full border border-white/20">
          <div className="text-6xl mb-4">💥</div>
          <h2 className="text-3xl font-bold mb-2">Game Over</h2>
          <p className="mb-4">Final Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-blue-500/80 hover:bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Retry</button>
            <button onClick={onBack} className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'gameComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-500 to-orange-700 text-white flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center max-w-md w-full border border-white/20">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold mb-2">You finished all levels!</h2>
          <p className="mb-4">Total Score: {score}</p>
          <div className="space-y-3">
            <button onClick={restart} className="w-full bg-indigo-500/80 hover:bg-indigo-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors">🔄 Play Again</button>
            <button onClick={onBack} className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold transition-colors">Back</button>
          </div>
        </div>
      </div>
    )
  }

  // Playing UI
  const q = questions[qIndex]
  const progress = ((qIndex) / QUESTIONS_PER_LEVEL) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-600 to-indigo-800 text-white">
      <div className="max-w-5xl mx-auto pt-4 px-4 flex items-center justify-between">
        <button onClick={onBack} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20">← Back</button>
        <div className="text-white/90 space-x-6">
          <span>Level: {level}</span>
          <span>Lives: {'❤️'.repeat(lives)}</span>
          <span>Score: {score}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white/10 rounded-2xl border border-white/20 overflow-hidden">
          <div className="h-2 bg-white/10">
            <div className="h-2 bg-emerald-400" style={{ width: `${progress}%` }} />
          </div>
          <div className="p-4">
            <div className="text-lg text-white/90 font-semibold mb-2">{activeLesson} — Question {qIndex + 1} of {QUESTIONS_PER_LEVEL}</div>
            <div className="text-white/90 text-2xl mb-6">{q || 'No questions found for this level.'}</div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => answer(true)} className="px-4 py-3 rounded-lg bg-emerald-500/80 hover:bg-emerald-500 text-white">I know this ✅</button>
              <button onClick={() => answer(false)} className="px-4 py-3 rounded-lg bg-rose-500/80 hover:bg-rose-500 text-white">I got it wrong ❌</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MathRunner
