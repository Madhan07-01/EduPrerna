import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase/client'

const LESSON_ID_TEXT = 'math-g7-data-handling'

type Option = { key: 'a' | 'b' | 'c' | 'd'; text: string }

type MCQ = { id: string; question: string; options: Option[]; answer: Option['key']; explanation: string }

const SECTIONS = [
  { title: 'Introduction', content: 'Data is information in the form of numbers (scores, marks, temperatures). Data handling means collecting, organizing, and representing data to understand it.' },
  { title: '1. Data', content: 'Collection of facts, numbers, or observations. Example: Marks of 5 students = 12, 15, 18, 10, 20.' },
  { title: '2. Organization of Data', content: 'Raw data can be confusing. Use tables, tallies, and frequency to organize. Frequency = count of occurrences.' },
  { title: '3. Pictograph', content: 'Represents data using pictures/symbols. If 🍎 = 5 apples, 🍎🍎 = 10 apples.' },
  { title: '4. Bar Graph', content: 'Represents data with rectangular bars (vertical/horizontal). Bar length shows value.' },
  { title: '5. Double Bar Graph', content: 'Compares two related data sets (e.g., marks of two groups) side by side.' },
  { title: '6. Arithmetic Mean (Average)', content: 'Mean = (Sum of values) / (Number of values). Example: (4+6+10)/3 = 20/3 ≈ 6.67.' },
  { title: '7. Median', content: 'Middle value when data is ordered. If two middle values, take their average.' },
  { title: '8. Mode', content: 'Value occurring most frequently. Example: 3,4,4,5,6 → Mode = 4.' },
  { title: '9. Probability (Intro)', content: 'P(E) = favourable outcomes / total outcomes. Example: probability of heads on a fair coin = 1/2.' },
  { title: 'Summary', content: 'Organize and visualize data using tables and graphs; compute mean/median/mode; probability measures likelihood.' },
]

const MCQS: MCQ[] = [
  { id: 'q1', question: 'Data: 2,4,6,4,3,4,5 → Mode = ?', options: [
      { key: 'a', text: '2' }, { key: 'b', text: '4' }, { key: 'c', text: '5' }, { key: 'd', text: '6' },
    ], answer: 'b', explanation: '4 occurs most often.' },
  { id: 'q2', question: 'Mean of 5,10,15 = ?', options: [
      { key: 'a', text: '10' }, { key: 'b', text: '15' }, { key: 'c', text: '12.5' }, { key: 'd', text: '30' },
    ], answer: 'a', explanation: '(5+10+15)/3 = 30/3 = 10.' },
  { id: 'q3', question: 'Middle value of 7,9,5,12,8?', options: [
      { key: 'a', text: '7' }, { key: 'b', text: '8' }, { key: 'c', text: '9' }, { key: 'd', text: '12' },
    ], answer: 'b', explanation: 'Ordered: 5,7,8,9,12 → median = 8.' },
  { id: 'q4', question: 'In tally chart, |||| = ?', options: [
      { key: 'a', text: '10' }, { key: 'b', text: '1' }, { key: 'c', text: '5' }, { key: 'd', text: '4' },
    ], answer: 'd', explanation: 'Four tallies = 4; fifth is a diagonal slash across (group of 5).' },
  { id: 'q5', question: 'Which graph compares two groups?', options: [
      { key: 'a', text: 'Pictograph' }, { key: 'b', text: 'Double Bar Graph' }, { key: 'c', text: 'Line Graph' }, { key: 'd', text: 'Pie Chart' },
    ], answer: 'b', explanation: 'Double bar graph shows two bars per category.' },
  { id: 'q6', question: 'If 🍎 = 2 apples, 🍎🍎🍎🍎 = ?', options: [
      { key: 'a', text: '4' }, { key: 'b', text: '6' }, { key: 'c', text: '8' }, { key: 'd', text: '2' },
    ], answer: 'c', explanation: '4 symbols × 2 each = 8.' },
  { id: 'q7', question: 'Probability of getting 3 on a fair die:', options: [
      { key: 'a', text: '1/2' }, { key: 'b', text: '1/3' }, { key: 'c', text: '1/6' }, { key: 'd', text: '1/4' },
    ], answer: 'c', explanation: 'Favourable=1, total=6.' },
  { id: 'q8', question: 'Median of 10,20,30,40,50 = ?', options: [
      { key: 'a', text: '20' }, { key: 'b', text: '30' }, { key: 'c', text: '40' }, { key: 'd', text: '25' },
    ], answer: 'b', explanation: 'Ordered list middle value is 30.' },
  { id: 'q9', question: 'Bar graph bars differ in:', options: [
      { key: 'a', text: 'Colours' }, { key: 'b', text: 'Lengths' }, { key: 'c', text: 'Widths' }, { key: 'd', text: 'Shapes' },
    ], answer: 'b', explanation: 'Bar length encodes the value.' },
  { id: 'q10', question: 'Mean of 12,14,16,18,20 = ?', options: [
      { key: 'a', text: '14' }, { key: 'b', text: '15' }, { key: 'c', text: '16' }, { key: 'd', text: '17' },
    ], answer: 'c', explanation: 'Sum=80; 80/5=16.' },
]

export default function MathG7DataHandling() {
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
    lines.push('Lesson: Data Handling')
    lines.push('Grade: 7  Subject: Mathematics')
    lines.push('')
    for (const s of SECTIONS) { lines.push(s.title); lines.push('-'.repeat(s.title.length)); lines.push(s.content); lines.push('') }
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Grade7_Math_DataHandling.txt'; a.click(); URL.revokeObjectURL(url)
    if (userId) { try { await saveProgress(previousScore ?? 0, true) } catch {} }
  }

  return (
    <div className="space-y-8">
      <div><Link to="/lessons/Mathematics/7" className="text-sm text-blue-600 hover:underline">← Back to Lessons</Link></div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Lesson: Data Handling</h1>
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
