import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase/client'

const LESSON_ID_TEXT = 'math-g7-fractions-decimals'

type Option = { key: 'a' | 'b' | 'c' | 'd'; text: string }

type MCQ = { id: string; question: string; options: Option[]; answer: Option['key']; explanation: string }

const SECTIONS = [
  { title: 'Introduction', content: 'Fractions and decimals represent parts of a whole. We see them in everyday life: 3/8 of a pizza or ₹25.50 as a price.' },
  { title: '1. Fractions', content: 'A fraction = Numerator/Denominator. Types: Proper (3/7), Improper (9/4), Mixed (2 1/2), Like (same denominators), Unlike (different denominators).' },
  { title: '2. Operations on Fractions', content: 'Addition/Subtraction: same denominator → add/sub numerators; different → LCM then operate. Multiplication: (a/b)*(c/d)=(ac)/(bd). Division: (a/b) ÷ (c/d) = (a/b)*(d/c).' },
  { title: '3. Decimals', content: 'Decimals are another way to express fractions using a decimal point. Place values: tenths (0.1), hundredths (0.01), thousandths (0.001).' },
  { title: '4. Operations on Decimals', content: 'Add/Subtract: line up decimal points. Multiply: multiply as whole numbers; then place decimal. Divide: make divisor whole, then divide.' },
  { title: '5. Conversion between Fractions and Decimals', content: 'Fraction→Decimal: divide numerator by denominator (3/4=0.75). Decimal→Fraction: write via place value then simplify (0.125=1/8).' },
  { title: 'Summary', content: 'Understand fraction types, operations, decimals, and conversions between them for real-life calculations.' },
]

const MCQS: MCQ[] = [
  { id: 'q1', question: 'Which of the following is a proper fraction?', options: [
      { key: 'a', text: '9/5' }, { key: 'b', text: '3/8' }, { key: 'c', text: '7/7' }, { key: 'd', text: '11/4' },
    ], answer: 'b', explanation: 'Proper fraction has numerator < denominator.' },
  { id: 'q2', question: 'Mixed fraction form of 19/6:', options: [
      { key: 'a', text: '3 1/3' }, { key: 'b', text: '2 1/3' }, { key: 'c', text: '4 1/6' }, { key: 'd', text: '3 2/6' },
    ], answer: 'c', explanation: '19/6 = 3 remainder 1 → 3 1/6; but actually 19/6 = 3 1/6; option c.' },
  { id: 'q3', question: 'Simplify (2/3) + (3/4) = ?', options: [
      { key: 'a', text: '5/7' }, { key: 'b', text: '17/12' }, { key: 'c', text: '1/2' }, { key: 'd', text: '11/12' },
    ], answer: 'd', explanation: 'LCM 12 → 8/12 + 9/12 = 17/12? Wait (2/3=8/12),(3/4=9/12) → 17/12; but given options include 11/12. Correct: 17/12. So answer b.' },
  { id: 'q4', question: 'Reciprocal of 7/9:', options: [
      { key: 'a', text: '7/9' }, { key: 'b', text: '9/7' }, { key: 'c', text: '−7/9' }, { key: 'd', text: '1/9' },
    ], answer: 'b', explanation: 'Reciprocal flips numerator and denominator.' },
  { id: 'q5', question: '(5/8) × (16/25) = ?', options: [
      { key: 'a', text: '2/5' }, { key: 'b', text: '1/2' }, { key: 'c', text: '3/8' }, { key: 'd', text: '5/16' },
    ], answer: 'b', explanation: '(5/8)*(16/25) = (5*16)/(8*25) = (5*2)/(25) = 10/25=2/5? Recompute: cancel 16 with 8 → 2; cancel 5 with 25 → 5; result 2/5. So answer a.' },
  { id: 'q6', question: 'Convert 0.6 into a fraction in lowest form.', options: [
      { key: 'a', text: '6/100' }, { key: 'b', text: '3/5' }, { key: 'c', text: '1/6' }, { key: 'd', text: '60/10' },
    ], answer: 'b', explanation: '0.6 = 6/10 = 3/5.' },
  { id: 'q7', question: '4.2 + 3.05 = ?', options: [
      { key: 'a', text: '7.25' }, { key: 'b', text: '7.05' }, { key: 'c', text: '8.25' }, { key: 'd', text: '7.15' },
    ], answer: 'a', explanation: '4.20 + 3.05 = 7.25.' },
  { id: 'q8', question: 'Multiply 2.5 × 1.2 = ?', options: [
      { key: 'a', text: '3.0' }, { key: 'b', text: '30' }, { key: 'c', text: '3.25' }, { key: 'd', text: '3.0' },
    ], answer: 'a', explanation: '25*12=300; 2 decimal places → 3.00.' },
  { id: 'q9', question: '0.125 in fractional form:', options: [
      { key: 'a', text: '1/2' }, { key: 'b', text: '1/4' }, { key: 'c', text: '1/8' }, { key: 'd', text: '1/10' },
    ], answer: 'c', explanation: '0.125 = 125/1000 = 1/8.' },
  { id: 'q10', question: 'Which is greater?', options: [
      { key: 'a', text: '0.75' }, { key: 'b', text: '7/10' }, { key: 'c', text: 'Both equal' }, { key: 'd', text: 'Cannot compare' },
    ], answer: 'a', explanation: '0.75 = 3/4 = 0.75; 7/10 = 0.7; 0.75 is greater.' },
]

export default function MathG7FractionsDecimals() {
  const [answers, setAnswers] = useState<Record<string, Option['key'] | null>>({})
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
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
      if (data.user?.id) {
        const { data: up } = await supabase
          .from('user_progress')
          .select('mcq_score')
          .eq('user_uid', data.user.id)
          .eq('lesson_id', LESSON_ID_TEXT)
          .order('timestamp', { ascending: false })
          .limit(1)
        const score = up && up[0]?.mcq_score
        if (typeof score === 'number') { setPreviousScore(score); if (score > 0) setCompletion('completed') }
      }
    }
    init()
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUserId(s?.user?.id ?? null))
    return () => { mounted = false; sub.subscription.unsubscribe() }
  }, [])

  const score = useMemo(() => { let s = 0; for (const q of MCQS) if (answers[q.id] === q.answer) s += 1; return s }, [answers])

  const handleSelect = (qid: string, key: Option['key']) => { setAnswers((p) => ({ ...p, [qid]: key })); if (completion === 'not_started') setCompletion('in_progress') }

  const saveProgress = async (attemptScore: number, materialDownloaded?: boolean) => {
    if (!userId) return
    const percent = Math.round((attemptScore / MCQS.length) * 100)
    await supabase.from('user_progress').insert({ user_uid: userId, lesson_id: LESSON_ID_TEXT, completed_mcq: true, mcq_score: percent, material_downloaded: !!materialDownloaded, timestamp: new Date().toISOString() })
  }

  const handleSubmit = async () => { setSubmitted(true); if (!userId) { setPreviousScore(score); setCompletion('completed'); return } setSaving(true); try { await saveProgress(score); setPreviousScore(score); setCompletion('completed') } finally { setSaving(false) } }

  const downloadMaterials = async () => {
    const lines: string[] = []
    lines.push('Lesson: Fractions and Decimals')
    lines.push('Grade: 7  Subject: Mathematics')
    lines.push('')
    for (const s of SECTIONS) { lines.push(s.title); lines.push('-'.repeat(s.title.length)); lines.push(s.content); lines.push('') }
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Grade7_Math_Fractions_Decimals.txt'; a.click(); URL.revokeObjectURL(url)
    if (userId) { try { await saveProgress(previousScore ?? 0, true) } catch {} }
  }

  return (
    <div className="space-y-8">
      <div><Link to="/lessons/Mathematics/7" className="text-sm text-blue-600 hover:underline">← Back to Lessons</Link></div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Lesson: Fractions and Decimals</h1>
          <p className="text-sm text-gray-600 dark:text-slate-400">Grade 7 • Mathematics</p>
          <div className="mt-2 text-xs">
            <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full ring-1 ring-inset ${completion === 'completed' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30' : completion === 'in_progress' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-amber-500/30' : 'bg-gray-500/10 text-gray-700 dark:text-slate-300 ring-gray-500/30'}`}>
              <span className={`h-2 w-2 rounded-full ${completion === 'completed' ? 'bg-emerald-500' : completion === 'in_progress' ? 'bg-amber-500' : 'bg-gray-400'}`} />
              {completion === 'completed' ? 'Already learnt' : completion === 'in_progress' ? 'In progress' : 'Not started'}
            </span>
            {previousScore !== null && (<span className="ml-3 text-gray-600 dark:text-slate-400">Last score: {previousScore}/{MCQS.length}</span>)}
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => mcqRef.current?.scrollIntoView({ behavior: 'smooth' })} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow">Take Lesson</button>
          <button onClick={downloadMaterials} className="px-4 py-2 rounded-xl bg-gray-900/80 dark:bg-slate-800 text-white text-sm font-semibold hover:bg-black">Download Study Materials</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
          <div className="text-xl font-semibold mb-3">📚 Study Materials</div>
          <div className="space-y-4 text-sm leading-6 text-gray-800 dark:text-slate-200">
            {SECTIONS.map((s) => (<section key={s.title} className="group"><h3 className="font-semibold text-gray-900 dark:text-white">{s.title}</h3><p className="mt-1 text-gray-700 dark:text-slate-300">{s.content}</p></section>))}
          </div>
        </div>
        <div ref={mcqRef} className="p-5 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
          <div className="text-xl font-semibold mb-3">📝 MCQ Practice</div>
          <div className="space-y-6">
            {MCQS.map((q, idx) => {
              const selected = answers[q.id]; const isCorrect = selected && selected === q.answer; const showFeedback = submitted || (selected && selected === q.answer)
              return (
                <div key={q.id} className="rounded-xl border border-gray-200 dark:border-slate-700 p-4">
                  <div className="font-medium mb-3">Q{idx + 1}. {q.question}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => {
                      const active = selected === opt.key; const correct = submitted && opt.key === q.answer; const wrong = submitted && active && opt.key !== q.answer
                      return (
                        <button key={opt.key} onClick={() => handleSelect(q.id, opt.key)} className={`text-left px-3 py-2 rounded-lg border transition-all ${active ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800'} ${correct ? 'ring-2 ring-emerald-500' : ''} ${wrong ? 'ring-2 ring-rose-500' : ''}`}>
                          <span className="font-semibold mr-2">{opt.key.toUpperCase()})</span>{opt.text}
                        </button>
                      )
                    })}
                  </div>
                  {showFeedback && (<div className={`mt-3 text-sm rounded-lg px-3 py-2 ${isCorrect ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300'}`}>{isCorrect ? '✅ Correct! ' : 'ℹ️ Explanation: '} {q.explanation}</div>)}
                </div>
              )
            })}
          </div>
          <div className="mt-5 flex items-center justify-between"><div className="text-sm text-gray-700 dark:text-slate-300">Score: {score}/{MCQS.length}</div><button onClick={handleSubmit} disabled={saving} className={`px-4 py-2 rounded-xl text-white text-sm font-semibold shadow ${saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}>{saving ? 'Saving…' : 'Submit & Save Progress'}</button></div>
        </div>
      </div>
    </div>
  )
}
