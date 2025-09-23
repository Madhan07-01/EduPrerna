import React, { useEffect, useState } from 'react'
import type { EquationQuestion } from './data/questionBank'
import { getEquationQuestionsForLesson, getEquationQuestionsForLevel } from './data/questionBank'

interface EquationBuilderGameProps {
  subject: string
  grade: string
  lesson: string
  onBack: () => void
}

type Status = 'levelStart' | 'playing' | 'gameOver' | 'gameComplete'

type BlankSlot = { id: number; filled: boolean; value: string | number | null; isCorrect?: boolean }

function safeEval(expr: string): number {
  // tiny evaluator using Function; supports + - * / ^ and parentheses
  // replace unicode ops
  const js = expr.replace(/÷/g,'/').replace(/×/g,'*').replace(/\^/g,'**')
  // eslint-disable-next-line no-new-func
  return Function(`return (${js})`)() as number
}

export default function EquationBuilderGame({ subject, grade, lesson, onBack }: EquationBuilderGameProps){
  const [status, setStatus] = useState<Status>('levelStart')
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState(3)
  const [questions, setQuestions] = useState<EquationQuestion[]>([])
  const [qIdx, setQIdx] = useState(0)
  const [slots, setSlots] = useState<BlankSlot[]>([])
  const [used, setUsed] = useState<Set<number>>(new Set())
  const [topicLabel, setTopicLabel] = useState<string>('')

  // Determine topic per level for Mathematics based on grade
  const topicForLevel = (subj: string, grd: string, lvl: number): { topic?: string; levelWithinTopic?: number } => {
    const s = (subj || '').toLowerCase()
    const g = String(grd || '').toLowerCase().replace('grade','').replace('g','').trim()
    if (s.startsWith('math')){
      if (g==='6'){
        // Levels 1-3 Fractions, 4-5 Algebra Basics
        if (lvl <= 3) return { topic: 'fractions', levelWithinTopic: lvl }
        return { topic: 'algebra basics', levelWithinTopic: lvl - 3 }
      }
      if (g==='10'){
        return { topic: 'quadratic equations', levelWithinTopic: lvl }
      }
      if (g==='12'){
        return { topic: 'calculus', levelWithinTopic: lvl }
      }
    }
    // default: use aggregated lesson dataset
    return { }
  }

  // Build questions for current level using dataset and topic mapping
  useEffect(() => {
    const mapping = topicForLevel(subject, grade, level)
    if (mapping.topic){
      const pool = getEquationQuestionsForLesson(subject, grade, mapping.topic)
      const perLevel = getEquationQuestionsForLevel(pool, mapping.levelWithinTopic || level)
      setQuestions(perLevel)
      setTopicLabel(mapping.topic)
    } else {
      const all = getEquationQuestionsForLesson(subject, grade, lesson)
      const perLevel = getEquationQuestionsForLevel(all, level)
      setQuestions(perLevel)
      setTopicLabel('')
    }
    setQIdx(0)
    setStatus('levelStart')
  }, [subject, grade, lesson, level])

  const current = questions[qIdx]

  useEffect(() => {
    if (!current) return
    const blanksCount = (current.equation.match(/_/g) || []).length
    setSlots(Array.from({length: blanksCount}, (_,i) => ({ id:i, filled:false, value:null })))
    setUsed(new Set())
  }, [current])

  // Start is controlled by button on the levelStart screen

  const dropInto = (slotId: number, optionIndex: number) => {
    if (!current) return
    if (used.has(optionIndex)) return
    setSlots(prev => prev.map(s => s.id===slotId? { ...s, filled:true, value: current.availableOptions[optionIndex] } : s))
    setUsed(prev => new Set([...Array.from(prev), optionIndex]))
  }

  const removeFrom = (slotId: number) => {
    if (!current) return
    const slot = slots.find(s => s.id===slotId)
    if (!slot || !slot.filled) return
    const idx = current.availableOptions.indexOf(slot.value as any)
    if (idx>=0){ const next = new Set(used); next.delete(idx); setUsed(next) }
    setSlots(prev => prev.map(s => s.id===slotId? { ...s, filled:false, value:null, isCorrect: undefined } : s))
  }

  const validate = (): boolean => {
    if (!current) return false
    let filled = current.equation
    slots.forEach(s => { filled = filled.replace('_', String(s.value)) })
    const [L, R] = filled.split('=')
    if (!L || !R) return false
    try {
      // variable substitution quick test for x,y
      if (filled.includes('x') || filled.includes('y')){
        const tests = [0,1,2,3,4,5]
        return tests.some(v => {
          const left = L.replace(/x/g, String(v)).replace(/y/g, String(v))
          const right = R.replace(/x/g, String(v)).replace(/y/g, String(v))
          return Math.abs(safeEval(left) - safeEval(right)) < 1e-6
        })
      }
      return Math.abs(safeEval(L) - safeEval(R)) < 1e-6
    } catch { return false }
  }

  const check = () => {
    const ok = validate()
    setSlots(prev => prev.map(s => ({ ...s, isCorrect: ok })))
    setTimeout(() => {
      if (ok){
        setScore(s => s + 10)
      } else {
        setHearts(h => h - 1)
      }
      const nextQ = qIdx + 1
      if (nextQ >= questions.length){
        if (level >= 5) setStatus('gameComplete')
        else setLevel(l => l + 1)
        return
      }
      setQIdx(nextQ)
    }, 900)
  }

  if (status === 'levelStart'){
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-b from-indigo-600 to-pink-600 text-white">
        <div className="text-center animate-in fade-in slide-in-from-bottom-2">
          <div className="text-6xl mb-2">🧮</div>
          <div className="text-4xl font-bold">Equation Builder</div>
          <div className="mt-2 text-white/90">Level {level} • 3 questions {topicLabel ? `• ${topicLabel}` : ''}</div>
          <button onClick={()=> setStatus('playing')} className="mt-6 px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:scale-105 transition-transform">Start</button>
        </div>
      </div>
    )
  }

  if (status === 'gameComplete'){
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-b from-yellow-400 to-orange-500">
        <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
          <div className="text-6xl mb-3">🏆</div>
          <div className="text-2xl font-semibold">Great job! You completed all levels.</div>
          <div className="mt-3">Final Score: {score}</div>
          <div className="mt-4 space-x-2">
            <button onClick={()=>{ setLevel(1); setScore(0); setHearts(3); setStatus('levelStart') }} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Play Again</button>
            <button onClick={onBack} className="px-4 py-2 rounded-lg bg-gray-600 text-white">Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (hearts <= 0){
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-b from-red-400 to-pink-500">
        <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
          <div className="text-6xl mb-3">💔</div>
          <div className="text-2xl font-semibold">Game Over</div>
          <div className="mt-3">Score: {score}</div>
          <div className="mt-4 space-x-2">
            <button onClick={()=>{ setLevel(1); setScore(0); setHearts(3); setStatus('levelStart') }} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Retry</button>
            <button onClick={onBack} className="px-4 py-2 rounded-lg bg-gray-600 text-white">Back</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-pink-600 text-white p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="px-3 py-2 rounded bg-white/20 hover:bg-white/30">← Back</button>
          <div className="flex items-center gap-6">
            <div>Level <span className="font-bold">{level}</span></div>
            <div>Score <span className="font-bold">{score}</span></div>
            <div>{[0,1,2].map(i => <span key={i} className="text-2xl">{i < hearts ? '❤' : '🤍'}</span>)}</div>
          </div>
        </div>

        {/* Equation */}
        {current && (
          <div className="mt-6 bg-white/10 rounded-2xl p-6">
            <div className="text-center">
              <div className="text-5xl">🧮</div>
              <div className="mt-2 text-lg">Question {qIdx+1} of {questions.length}{topicLabel ? ` • ${topicLabel}` : ''}</div>
              <div className="mt-6 p-4 rounded-xl bg-black/20 inline-block min-w-[280px]">
                {/* Render equation with blanks */}
                {(() => {
                  const parts = current.equation.split('_')
                  const elements: React.ReactNode[] = []
                  parts.forEach((part, i) => {
                    if (part) elements.push(<span key={`t-${i}`} className="text-2xl font-semibold">{part}</span>)
                    if (i < parts.length - 1){
                      const slot = slots[i]
                      elements.push(
                        <button key={`b-${i}`} onClick={()=> removeFrom(i)} className={`mx-2 px-6 h-12 rounded-lg border-2 border-dashed ${slot?.filled? 'bg-yellow-300 text-slate-900 border-yellow-400' : 'border-white/50 text-white/70'}`}>
                          {slot?.filled ? String(slot.value) : 'Drop'}
                        </button>
                      )
                    }
                  })
                  return <div className="flex items-center justify-center flex-wrap gap-1">{elements}</div>
                })()}

                {/* Check */}
                <div className="mt-4">
                  {slots.length>0 && slots.every(s=>s.filled) && (
                    <button onClick={check} className="px-5 py-2 rounded-lg bg-emerald-400 text-slate-900 font-semibold hover:bg-emerald-300">✓ Check</button>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {current.availableOptions.map((opt, idx) => (
                  <button key={idx} disabled={used.has(idx)} onClick={()=>{
                    const empty = slots.findIndex(s=>!s.filled)
                    if (empty>=0) dropInto(empty, idx)
                  }} className={`py-3 rounded-lg font-bold ${used.has(idx)? 'bg-white/20 text-white/50 cursor-not-allowed' : 'bg-white text-slate-900 hover:scale-105 transition-transform'}`}>
                    {String(opt)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
