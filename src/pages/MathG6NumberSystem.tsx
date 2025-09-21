import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../supabase/client'

// IDs and constants for this lesson
const LESSON_ID_TEXT = 'math-g6-number-system'

// MCQ data model
type Option = {
  key: 'a' | 'b' | 'c' | 'd'
  text: string
}

type MCQ = {
  id: string
  question: string
  options: Option[]
  answer: Option['key']
  explanation: string
  section: string
}

// (removed unused DB type ProgressRow)

const MCQS: MCQ[] = [
  {
    id: 'q1',
    section: 'Natural Numbers',
    question: 'Which of the following is the smallest natural number?',
    options: [
      { key: 'a', text: '0' },
      { key: 'b', text: '1' },
      { key: 'c', text: '–1' },
      { key: 'd', text: '2' },
    ],
    answer: 'b',
    explanation: 'Natural numbers start from 1.',
  },
  {
    id: 'q2',
    section: 'Prime and Composite Numbers',
    question: 'What is the only even prime number?',
    options: [
      { key: 'a', text: '1' },
      { key: 'b', text: '2' },
      { key: 'c', text: '4' },
      { key: 'd', text: '6' },
    ],
    answer: 'b',
    explanation: '2 is the only even prime number; all other primes are odd.',
  },
  {
    id: 'q3',
    section: 'Place and Face Value',
    question: 'In the number 3,476, what is the place value of 7?',
    options: [
      { key: 'a', text: '7' },
      { key: 'b', text: '70' },
      { key: 'c', text: '700' },
      { key: 'd', text: '7000' },
    ],
    answer: 'c',
    explanation: 'The 7 is in the hundreds place, so its place value is 700.',
  },
  {
    id: 'q4',
    section: 'Roman Numerals',
    question: 'Which Roman numeral represents 14?',
    options: [
      { key: 'a', text: 'IX' },
      { key: 'b', text: 'XIV' },
      { key: 'c', text: 'XX' },
      { key: 'd', text: 'XV' },
    ],
    answer: 'b',
    explanation: 'XIV = 10 (X) + 4 (IV) = 14.',
  },
  {
    id: 'q5',
    section: 'Sets of Numbers',
    question: 'Which set includes negative numbers?',
    options: [
      { key: 'a', text: 'Natural Numbers' },
      { key: 'b', text: 'Whole Numbers' },
      { key: 'c', text: 'Integers' },
      { key: 'd', text: 'Roman Numerals' },
    ],
    answer: 'c',
    explanation: 'Integers include negative numbers, zero, and positive numbers.',
  },
]

const SECTIONS = [
  {
    title: 'Introduction',
    content:
      'Numbers are the foundation of mathematics... Understanding the number system makes it easier to learn advanced topics later.',
  },
  {
    title: '1. Natural Numbers',
    content:
      'Numbers used for counting are called Natural Numbers. Example: 1, 2, 3, ... Smallest natural number = 1. Set: N.',
  },
  {
    title: '2. Whole Numbers',
    content:
      'Including 0 along with natural numbers gives Whole Numbers. Example: 0, 1, 2, 3, ... Smallest whole number = 0. Set: W.',
  },
  {
    title: '3. Integers',
    content:
      'Integers include negative numbers, zero, and positive numbers. Example: –3, –2, –1, 0, 1, 2, 3. Set: Z.',
  },
  {
    title: '4. Even and Odd Numbers',
    content:
      'Even: divisible by 2 (0, 2, 4, 6, ...). Odd: not divisible by 2 (1, 3, 5, 7, ...).',
  },
  {
    title: '5. Prime and Composite Numbers',
    content:
      'Prime: exactly 2 factors (1 and itself). Composite: more than 2 factors. Note: 1 is neither prime nor composite; 2 is the only even prime.',
  },
  {
    title: '6. Place Value and Face Value',
    content:
      'Place value depends on the position of a digit (e.g., in 4,582, place value of 5 = 500). Face value is the digit itself (5).',
  },
  {
    title: '7. Roman Numerals',
    content:
      'Romans used letters: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Examples: IX=9, XIV=14, XX=20.',
  },
  {
    title: 'Summary',
    content:
      'Natural (N), Whole (W), Integers (Z), Even/Odd, Prime/Composite, Roman Numerals.',
  },
]

export default function MathG6NumberSystem() {
  const [answers, setAnswers] = useState<Record<string, Option['key'] | null>>({})
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [previousScore, setPreviousScore] = useState<number | null>(null)
  const [completion, setCompletion] = useState<'not_started' | 'in_progress' | 'completed'>('not_started')
  const mcqRef = useRef<HTMLDivElement>(null)

  const [userId, setUserId] = useState<string | null>(null)
  const [questions, setQuestions] = useState<MCQ[]>(MCQS)
  useEffect(() => {
    let mounted = true
    const load = async () => {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      setUserId(data.user?.id ?? null)
    }
    load()
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null)
    })
    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    // Initialize local MCQs and answers
    setQuestions(MCQS)
    const init: Record<string, Option['key'] | null> = {}
    for (const q of MCQS) init[q.id] = null
    setAnswers(init)
    setLoading(false)
  }, [])

  useEffect(() => {
    // Fetch progress & last score from lesson_progress (new schema). Completion is based on having a score.
    const fetchProgress = async () => {
      if (!userId) return
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('mcq_score')
        .eq('user_uid', userId)
        .eq('lesson_id', LESSON_ID_TEXT)
        .maybeSingle()
      if (!error && data) {
        const last = data.mcq_score ?? null
        setPreviousScore(last)
        if ((last ?? 0) > 0) setCompletion('completed')
      }
    }
    fetchProgress()
  }, [userId])

  const score = useMemo(() => {
    let s = 0
    for (const q of questions) {
      if (answers[q.id] === q.answer) s += 1
    }
    return s
  }, [answers, questions])

  const handleSelect = (qid: string, key: Option['key']) => {
    setAnswers((prev) => ({ ...prev, [qid]: key }))
    if (completion === 'not_started') setCompletion('in_progress')
  }

  // Removed per-section Mark as Learned. Completion will be set on submit.

  const handleSubmit = async () => {
    setSubmitted(true)
    if (!userId) {
      // No auth: just show results locally without saving to Supabase
      setPreviousScore(score)
      setCompletion('completed')
      return
    }
    try {
      setSaving(true)
      // Update or insert lesson_progress with mcq_score
      const { data } = await supabase
        .from('lesson_progress')
        .select('id, completed_sections')
        .eq('user_uid', userId)
        .eq('lesson_id', LESSON_ID_TEXT)
        .maybeSingle()
      if (!data) {
        await supabase.from('lesson_progress').insert({
          user_uid: userId,
          lesson_id: LESSON_ID_TEXT,
          completed_sections: SECTIONS.map((s) => s.title),
          mcq_score: score,
        })
      } else {
        await supabase.from('lesson_progress').update({
          mcq_score: score,
          completed_sections: SECTIONS.map((s) => s.title),
        }).eq('id', data.id)
      }
      setCompletion('completed')
      setPreviousScore(score)
    } finally {
      setSaving(false)
    }
  }

  const downloadMaterials = () => {
    const lines: string[] = []
    lines.push('Lesson: Number System')
    lines.push('Grade: 6  Subject: Mathematics')
    lines.push('')
    for (const s of SECTIONS) {
      lines.push(s.title)
      lines.push('-'.repeat(s.title.length))
      lines.push(s.content)
      lines.push('')
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Grade6_Mathematics_NumberSystem.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const startMcq = () => {
    mcqRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Lesson: Number System</h1>
          <p className="text-sm text-gray-600 dark:text-slate-400">Grade 6 • Mathematics</p>
          {loading ? (
            <div className="mt-2 text-xs text-gray-500">Loading your progress…</div>
          ) : (
            <div className="mt-2 text-xs">
              <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full ring-1 ring-inset ${
                completion === 'completed'
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30'
                  : completion === 'in_progress'
                  ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-amber-500/30'
                  : 'bg-gray-500/10 text-gray-700 dark:text-slate-300 ring-gray-500/30'
              }`}>
                <span className={`h-2 w-2 rounded-full ${
                  completion === 'completed' ? 'bg-emerald-500' : completion === 'in_progress' ? 'bg-amber-500' : 'bg-gray-400'
                }`} />
                {completion === 'completed' ? 'Already learnt' : completion === 'in_progress' ? 'In progress' : 'Not started'}
              </span>
              {previousScore !== null && (
                <span className="ml-3 text-gray-600 dark:text-slate-400">Last score: {previousScore}/{MCQS.length}</span>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <button onClick={startMcq} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow">
            Start MCQ
          </button>
          <button onClick={downloadMaterials} className="px-4 py-2 rounded-xl bg-gray-900/80 dark:bg-slate-800 text-white text-sm font-semibold hover:bg-black">
            Download Study Materials
          </button>
        </div>
      </div>

      {/* Two main sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Materials */}
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
          <div className="text-xl font-semibold mb-3">📚 Study Materials</div>
          <div className="space-y-4 text-sm leading-6 text-gray-800 dark:text-slate-200">
            {SECTIONS.map((s) => (
              <section key={s.title} className="group">
                <h3 className="font-semibold text-gray-900 dark:text-white">{s.title}</h3>
                <p className="mt-1 text-gray-700 dark:text-slate-300">{s.content}</p>
              </section>
            ))}
          </div>
        </div>

        {/* MCQ Practice */}
        <div ref={mcqRef} className="p-5 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
          <div className="text-xl font-semibold mb-3">📝 MCQ Practice</div>

          <div className="space-y-6">
            {questions.map((q, idx) => {
              const selected = answers[q.id]
              const isCorrect = selected && selected === q.answer
              const showFeedback = submitted || (selected && selected === q.answer)
              return (
                <div key={q.id} className="rounded-xl border border-gray-200 dark:border-slate-700 p-4">
                  <div className="text-sm text-gray-500 dark:text-slate-400 mb-1">Section: {q.section}</div>
                  <div className="font-medium mb-3">Q{idx + 1}. {q.question}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => {
                      const active = selected === opt.key
                      const correct = submitted && opt.key === q.answer
                      const wrong = submitted && active && opt.key !== q.answer
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelect(q.id, opt.key)}
                          className={`text-left px-3 py-2 rounded-lg border transition-all ${
                            active
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800'
                          } ${correct ? 'ring-2 ring-emerald-500' : ''} ${wrong ? 'ring-2 ring-rose-500' : ''}`}
                        >
                          <span className="font-semibold mr-2">{opt.key.toUpperCase()})</span>
                          {opt.text}
                        </button>
                      )
                    })}
                  </div>

                  {showFeedback && (
                    <div className={`mt-3 text-sm rounded-lg px-3 py-2 ${
                      isCorrect ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300'
                    }`}>
                      {isCorrect ? '✅ Correct! ' : 'ℹ️ Explanation: '} {q.explanation}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-slate-300">Score: {score}/{MCQS.length}</div>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className={`px-4 py-2 rounded-xl text-white text-sm font-semibold shadow ${
                saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {saving ? 'Saving…' : 'Submit & Save Progress'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
