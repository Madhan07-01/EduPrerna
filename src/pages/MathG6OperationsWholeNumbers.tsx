import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../supabase/client'

const LESSON_ID_TEXT = 'math-g6-operations-whole-numbers'

type Option = { key: 'a' | 'b' | 'c' | 'd'; text: string }

type MCQ = {
  id: string
  question: string
  options: Option[]
  answer: Option['key']
  explanation: string
  section?: string
}

const SECTIONS = [
  {
    title: 'Introduction',
    content:
      'Whole numbers include 0 and all positive numbers (0, 1, 2, 3, …). Operations on whole numbers form the foundation of arithmetic. Mastering these operations helps in everyday problem solving and advanced mathematics. We mainly perform four basic operations on whole numbers: addition, subtraction, multiplication, and division.',
  },
  {
    title: '1. Addition',
    content:
      'Combining two or more numbers is called addition. Symbol: +. Example: 245 + 378 = 623.\nProperties:\n• Commutative: a + b = b + a\n• Associative: (a + b) + c = a + (b + c)\n• Identity element: a + 0 = a',
  },
  {
    title: '2. Subtraction',
    content:
      'Finding the difference between numbers is called subtraction. Symbol: −. Example: 587 − 239 = 348.\nProperties:\n• Not commutative: a − b ≠ b − a\n• Not associative: (a − b) − c ≠ a − (b − c)',
  },
  {
    title: '3. Multiplication',
    content:
      'Repeated addition of the same number is called multiplication. Symbols: × or ·. Example: 7 × 6 = 42.\nProperties:\n• Commutative: a × b = b × a\n• Associative: (a × b) × c = a × (b × c)\n• Distributive over addition: a × (b + c) = a × b + a × c\n• Identity element: a × 1 = a\n• Multiplication by 0: a × 0 = 0',
  },
  {
    title: '4. Division',
    content:
      'Splitting a number into equal parts is called division. Symbol: ÷. Example: 56 ÷ 8 = 7.\nTerminology: Dividend = 56, Divisor = 8, Quotient = 7, Remainder = 0 (if exact).\nProperties:\n• Not commutative: a ÷ b ≠ b ÷ a\n• Not associative: (a ÷ b) ÷ c ≠ a ÷ (b ÷ c)\n• Division by 0 is undefined',
  },
  {
    title: '5. Order of Operations (BODMAS/BIDMAS)',
    content:
      'When an expression has multiple operations, follow: Brackets → Orders (powers/roots) → Division → Multiplication → Addition → Subtraction.\nExample: 12 + 6 × (5 − 3) = 12 + 6 × 2 = 12 + 12 = 24',
  },
  {
    title: '6. Estimation',
    content:
      'Approximate results by rounding to the nearest tens, hundreds, etc., to quickly check calculations.\nExample: 298 + 147 ≈ 300 + 150 = 450',
  },
  {
    title: 'Summary',
    content:
      'Whole numbers allow addition, subtraction, multiplication, and division. Use the properties to simplify work, follow the BODMAS order, and apply estimation for quick checks.',
  },
]

const MCQS: MCQ[] = [
  {
    id: 'q1',
    question: 'What is the sum of 347 and 258?',
    options: [
      { key: 'a', text: '595' },
      { key: 'b', text: '605' },
      { key: 'c', text: '615' },
      { key: 'd', text: '625' },
    ],
    answer: 'b',
    explanation: '347 + 258 = 605. Add column-wise with carrying.',
  },
  {
    id: 'q2',
    question: 'Which of the following is true about subtraction?',
    options: [
      { key: 'a', text: 'Commutative property applies' },
      { key: 'b', text: '5 – 3 = 3 – 5' },
      { key: 'c', text: 'Not commutative' },
      { key: 'd', text: '0 – a = a' },
    ],
    answer: 'c',
    explanation: 'Subtraction is not commutative: 5−3 ≠ 3−5.',
  },
  {
    id: 'q3',
    question: 'Which property is demonstrated: 3 × (4 × 2) = (3 × 4) × 2?',
    options: [
      { key: 'a', text: 'Commutative' },
      { key: 'b', text: 'Associative' },
      { key: 'c', text: 'Distributive' },
      { key: 'd', text: 'Identity' },
    ],
    answer: 'b',
    explanation: 'Associative property of multiplication: grouping does not affect product.',
  },
  {
    id: 'q4',
    question: 'What is 72 ÷ 8?',
    options: [
      { key: 'a', text: '7' },
      { key: 'b', text: '8' },
      { key: 'c', text: '9' },
      { key: 'd', text: '10' },
    ],
    answer: 'c',
    explanation: '72/8 = 9.',
  },
  {
    id: 'q5',
    question: 'Using BODMAS, solve: 12 + 6 × (5 – 3) = ?',
    options: [
      { key: 'a', text: '24' },
      { key: 'b', text: '30' },
      { key: 'c', text: '36' },
      { key: 'd', text: '18' },
    ],
    answer: 'a',
    explanation: 'Brackets first: 5−3=2; then 6×2=12; then 12+12=24.',
  },
]

export default function MathG6OperationsWholeNumbers() {
  const [answers, setAnswers] = useState<Record<string, Option['key'] | null>>({})
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  // removed unused loading state
  const [previousScore, setPreviousScore] = useState<number | null>(null)
  const [completion, setCompletion] = useState<'not_started' | 'in_progress' | 'completed'>('not_started')
  const [userId, setUserId] = useState<string | null>(null)
  const mcqRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      setUserId(data.user?.id ?? null)
      const initAns: Record<string, Option['key'] | null> = {}
      for (const q of MCQS) initAns[q.id] = null
      setAnswers(initAns)
      // no loading flag

      // Load prior score if table matches either new or old shape
      if (data.user?.id) {
        // Try new user_progress schema
        const { data: up1 } = await supabase
          .from('user_progress')
          .select('mcq_score')
          .eq('user_uid', data.user.id)
          .eq('lesson_id', LESSON_ID_TEXT)
          .order('timestamp', { ascending: false })
          .limit(1)
        const score1 = up1 && up1[0]?.mcq_score
        if (typeof score1 === 'number') {
          setPreviousScore(score1)
          if (score1 > 0) setCompletion('completed')
          return
        }
        // Fallback to old shape
        const { data: up2 } = await supabase
          .from('user_progress')
          .select('mcq_score, completed, created_at')
          .eq('user_uid', data.user.id)
          .order('created_at', { ascending: false })
          .limit(1)
        const score2 = up2 && up2[0]?.mcq_score
        if (typeof score2 === 'number') {
          setPreviousScore(score2)
          if (score2 > 0) setCompletion('completed')
        }
      }
    }
    init()
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null)
    })
    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const score = useMemo(() => {
    let s = 0
    for (const q of MCQS) if (answers[q.id] === q.answer) s += 1
    return s
  }, [answers])

  const handleSelect = (qid: string, key: Option['key']) => {
    setAnswers((prev) => ({ ...prev, [qid]: key }))
    if (completion === 'not_started') setCompletion('in_progress')
  }

  const saveProgress = async (attemptScore: number, materialDownloaded?: boolean) => {
    if (!userId) return
    // First try new schema (lesson_id text, completed_mcq, mcq_score 0-100, material_downloaded, timestamp)
    const percent = Math.round((attemptScore / MCQS.length) * 100)
    try {
      await supabase.from('user_progress').insert({
        user_uid: userId,
        lesson_id: LESSON_ID_TEXT,
        completed_mcq: true,
        mcq_score: percent,
        material_downloaded: !!materialDownloaded,
        timestamp: new Date().toISOString(),
      })
      return
    } catch (e) {
      // Fall back to old shape (mcq_score int, completed boolean, created_at)
      await supabase.from('user_progress').insert({
        user_uid: userId,
        lesson_id: LESSON_ID_TEXT,
        mcq_score: attemptScore,
        completed: true,
        created_at: new Date().toISOString(),
      } as any)
    }
  }

  const handleSubmit = async () => {
    setSubmitted(true)
    if (!userId) {
      setPreviousScore(score)
      setCompletion('completed')
      return
    }
    setSaving(true)
    try {
      await saveProgress(score)
      setPreviousScore(score)
      setCompletion('completed')
    } finally {
      setSaving(false)
    }
  }

  const downloadMaterials = async () => {
    const lines: string[] = []
    lines.push('Lesson: Operations on Whole Numbers')
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
    a.download = 'Grade6_Math_OperationsWholeNumbers.txt'
    a.click()
    URL.revokeObjectURL(url)

    // save material_downloaded status if signed in
    if (userId) {
      try { await saveProgress(previousScore ?? 0, true) } catch {}
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Lesson: Operations on Whole Numbers</h1>
          <p className="text-sm text-gray-600 dark:text-slate-400">Grade 6 • Mathematics</p>
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
        </div>
        <div className="flex gap-3">
          <button onClick={() => mcqRef.current?.scrollIntoView({ behavior: 'smooth' })} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow">
            Take Lesson
          </button>
          <button onClick={downloadMaterials} className="px-4 py-2 rounded-xl bg-gray-900/80 dark:bg-slate-800 text-white text-sm font-semibold hover:bg-black">
            Download Study Materials
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <div ref={mcqRef} className="p-5 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
          <div className="text-xl font-semibold mb-3">📝 MCQ Practice</div>
          <div className="space-y-6">
            {MCQS.map((q, idx) => {
              const selected = answers[q.id]
              const isCorrect = selected && selected === q.answer
              const showFeedback = submitted || (selected && selected === q.answer)
              return (
                <div key={q.id} className="rounded-xl border border-gray-200 dark:border-slate-700 p-4">
                  <div className="font-medium mb-3">Q{idx + 1}. {q.question}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => {
                      const active = selected === opt.key
                      const correct = submitted && opt.key === q.answer
                      const wrong = submitted && active && opt.key !== q.answer
                      return (
                        <button key={opt.key} onClick={() => handleSelect(q.id, opt.key)}
                          className={`text-left px-3 py-2 rounded-lg border transition-all ${active ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800'} ${correct ? 'ring-2 ring-emerald-500' : ''} ${wrong ? 'ring-2 ring-rose-500' : ''}`}>
                          <span className="font-semibold mr-2">{opt.key.toUpperCase()})</span>
                          {opt.text}
                        </button>
                      )
                    })}
                  </div>
                  {showFeedback && (
                    <div className={`mt-3 text-sm rounded-lg px-3 py-2 ${isCorrect ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300'}`}>
                      {isCorrect ? '✅ Correct! ' : 'ℹ️ Explanation: '} {q.explanation}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-slate-300">Score: {score}/{MCQS.length}</div>
            <button onClick={handleSubmit} disabled={saving} className={`px-4 py-2 rounded-xl text-white text-sm font-semibold shadow ${saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
              {saving ? 'Saving…' : 'Submit & Save Progress'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
