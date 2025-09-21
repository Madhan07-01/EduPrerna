import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase/client'

const LESSON_ID_TEXT = 'math-g7-integers'

type Option = { key: 'a' | 'b' | 'c' | 'd'; text: string }

type MCQ = { id: string; question: string; options: Option[]; answer: Option['key']; explanation: string }

const SECTIONS = [
  { title: 'Introduction', content: 'Integers include positive numbers, negative numbers, and zero. We meet them in temperature (−5 °C), game scores (−10), and bank overdrafts. Integers help describe values below zero as well as above.' },
  { title: '1. Definition of Integers', content: 'Integers are whole numbers and their negatives: {..., −4, −3, −2, −1, 0, 1, 2, 3, 4, ...}. Zero is neither positive nor negative.' },
  { title: '2. Number Line Representation', content: 'On the number line, positive integers lie to the right of 0; negatives to the left. Farther right means greater.' },
  { title: '3. Comparing Integers', content: 'Any positive > any negative. Among positives: larger value is greater. Among negatives: the one with smaller absolute value is greater (e.g., −2 > −5). +3 > −2 because +3 is to the right of −2.' },
  { title: '4. Operations with Integers', content: 'Addition: same signs → add absolute values, keep sign; different signs → subtract smaller absolute value from larger and keep sign of larger. Subtraction: a − b = a + (−b). Multiplication & Division signs: +×+=+, −×−=+, +×−=−, −×+=−.' },
  { title: '5. Absolute Value', content: 'Absolute value |a| is the distance from zero; always non‑negative. Examples: |+5|=5, |−7|=7.' },
  { title: 'Summary', content: 'Integers extend numbers below zero. Use number lines to compare; apply sign rules for operations; |a| measures distance from 0.' },
]

const MCQS: MCQ[] = [
  { id: 'q1', question: 'Which of the following is an integer?', options: [
      { key: 'a', text: '3.5' }, { key: 'b', text: '−2' }, { key: 'c', text: '2/3' }, { key: 'd', text: '√5' },
    ], answer: 'b', explanation: 'Integers are whole numbers and their negatives.' },
  { id: 'q2', question: 'Which number is greater?', options: [
      { key: 'a', text: '−7' }, { key: 'b', text: '−4' }, { key: 'c', text: 'Equal' }, { key: 'd', text: 'Cannot compare' },
    ], answer: 'b', explanation: 'On the number line, −4 lies to the right of −7.' },
  { id: 'q3', question: 'The opposite of −8 is:', options: [
      { key: 'a', text: '−8' }, { key: 'b', text: '0' }, { key: 'c', text: '+8' }, { key: 'd', text: '−1' },
    ], answer: 'c', explanation: 'Opposite means same distance from 0 with opposite sign.' },
  { id: 'q4', question: 'The sum of (+9) and (−6) is:', options: [
      { key: 'a', text: '+15' }, { key: 'b', text: '−3' }, { key: 'c', text: '+3' }, { key: 'd', text: '−15' },
    ], answer: 'c', explanation: '9 + (−6) = 3.' },
  { id: 'q5', question: 'The result of (−5) − (−2) is:', options: [
      { key: 'a', text: '−7' }, { key: 'b', text: '−3' }, { key: 'c', text: '+3' }, { key: 'd', text: '+7' },
    ], answer: 'b', explanation: 'Subtracting a negative is adding the positive: −5 + 2 = −3.' },
  { id: 'q6', question: 'Which of the following is true?', options: [
      { key: 'a', text: '−3 > +2' }, { key: 'b', text: '−2 < −5' }, { key: 'c', text: '−7 < −2' }, { key: 'd', text: '+4 < 0' },
    ], answer: 'c', explanation: '−7 is to the left of −2; thus smaller, so statement is true for “<”.' },
  { id: 'q7', question: '(−12) ÷ (+3) = ?', options: [
      { key: 'a', text: '−36' }, { key: 'b', text: '−4' }, { key: 'c', text: '+4' }, { key: 'd', text: '+36' },
    ], answer: 'b', explanation: 'Negative divided by positive yields negative; 12/3=4.' },
  { id: 'q8', question: 'The product of (−6) × (−5) is:', options: [
      { key: 'a', text: '−30' }, { key: 'b', text: '+30' }, { key: 'c', text: '−1' }, { key: 'd', text: '+11' },
    ], answer: 'b', explanation: 'Negative × negative = positive.' },
  { id: 'q9', question: 'If |x| = 9, then x can be:', options: [
      { key: 'a', text: '+9 only' }, { key: 'b', text: '−9 only' }, { key: 'c', text: '+9 or −9' }, { key: 'd', text: '0' },
    ], answer: 'c', explanation: 'Absolute value ignores sign.' },
  { id: 'q10', question: 'On a number line, which number is farthest to the left?', options: [
      { key: 'a', text: '−10' }, { key: 'b', text: '−3' }, { key: 'c', text: '0' }, { key: 'd', text: '+5' },
    ], answer: 'a', explanation: 'More negative means farther left.' },
]

export default function MathG7Integers() {
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
    lines.push('Lesson: Integers')
    lines.push('Grade: 7  Subject: Mathematics')
    lines.push('')
    for (const s of SECTIONS) { lines.push(s.title); lines.push('-'.repeat(s.title.length)); lines.push(s.content); lines.push('') }
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Grade7_Math_Integers.txt'; a.click(); URL.revokeObjectURL(url)
    if (userId) { try { await saveProgress(previousScore ?? 0, true) } catch {} }
  }

  return (
    <div className="space-y-8">
      <div><Link to="/lessons/Mathematics/7" className="text-sm text-blue-600 hover:underline">← Back to Lessons</Link></div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Lesson: Integers</h1>
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
