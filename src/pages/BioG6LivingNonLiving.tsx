import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase/client'

const LESSON_ID_TEXT = 'bio-g6-living-nonliving'

type Option = { key: 'a' | 'b' | 'c' | 'd'; text: string }

type MCQ = { id: string; question: string; options: Option[]; answer: Option['key']; explanation: string }

const SECTIONS = [
  { title: 'Introduction', content: 'The world around us is made up of living and non-living things. Understanding the difference helps us study life, growth, and the environment. Living things grow, reproduce, respond to stimuli, and need food, water, and air. Non-living things do not.' },
  { title: '1. Characteristics of Living Things', content: 'Growth (size/cell number increase); Reproduction (offspring); Respiration (energy from food); Movement (whole body or parts); Sensitivity (respond to stimuli); Nutrition (food for energy); Excretion (remove wastes); Adaptation (adjust to environment).' },
  { title: '2. Non-living Things', content: 'Non-living things do not exhibit life processes. Examples: rocks, water, chair, pencil.' },
  { title: '3. Differences Between Living and Non-living', content: 'Living: growth, reproduction, nutrition, respiration, movement, response to stimuli, life span. Non-living: none of these.' },
  { title: '4. Importance of Classification', content: 'Helps study the environment, identify needs/behavior of living things, and distinguish them from objects that do not need care.' },
  { title: 'Summary', content: 'Living things grow, reproduce, move, respond, and need food/water. Non-living things do not. Classification organizes knowledge about the environment.' },
]

const MCQS: MCQ[] = [
  { id: 'q1', question: 'Which of the following is a living thing?', options: [
      { key: 'a', text: 'Rock' }, { key: 'b', text: 'Dog' }, { key: 'c', text: 'Chair' }, { key: 'd', text: 'Water' },
    ], answer: 'b', explanation: 'Dogs show life processes like growth, respiration, response.' },
  { id: 'q2', question: 'Which shows growth?', options: [
      { key: 'a', text: 'Plant' }, { key: 'b', text: 'Stone' }, { key: 'c', text: 'Table' }, { key: 'd', text: 'Book' },
    ], answer: 'a', explanation: 'Plants increase in size and number of cells.' },
  { id: 'q3', question: 'Which is a non-living thing?', options: [
      { key: 'a', text: 'Bird' }, { key: 'b', text: 'Fish' }, { key: 'c', text: 'Pencil' }, { key: 'd', text: 'Tree' },
    ], answer: 'c', explanation: 'Pencil does not show any life processes.' },
  { id: 'q4', question: 'Living things respond to:', options: [
      { key: 'a', text: 'Food only' }, { key: 'b', text: 'Stimuli from the environment' }, { key: 'c', text: 'Stones' }, { key: 'd', text: 'Tables' },
    ], answer: 'b', explanation: 'Response to stimuli is a key characteristic of life.' },
  { id: 'q5', question: 'Plants are living because they:', options: [
      { key: 'a', text: 'Do not move' }, { key: 'b', text: 'Grow and reproduce' }, { key: 'c', text: 'Are made of soil' }, { key: 'd', text: 'Cannot speak' },
    ], answer: 'b', explanation: 'Growth and reproduction are life processes of plants.' },
  { id: 'q6', question: 'NOT a characteristic of living things:', options: [
      { key: 'a', text: 'Respiration' }, { key: 'b', text: 'Reproduction' }, { key: 'c', text: 'Growth' }, { key: 'd', text: 'Breaking' },
    ], answer: 'd', explanation: 'Breaking is not a life process.' },
  { id: 'q7', question: 'Rocks are:', options: [
      { key: 'a', text: 'Living things' }, { key: 'b', text: 'Non-living things' }, { key: 'c', text: 'Partially living' }, { key: 'd', text: 'Always growing' },
    ], answer: 'b', explanation: 'Rocks do not show life processes.' },
  { id: 'q8', question: 'Animals need food for:', options: [
      { key: 'a', text: 'Decoration' }, { key: 'b', text: 'Energy and growth' }, { key: 'c', text: 'Making rocks' }, { key: 'd', text: 'Writing' },
    ], answer: 'b', explanation: 'Food provides energy and building materials.' },
  { id: 'q9', question: 'Which process removes waste products?', options: [
      { key: 'a', text: 'Reproduction' }, { key: 'b', text: 'Respiration' }, { key: 'c', text: 'Excretion' }, { key: 'd', text: 'Nutrition' },
    ], answer: 'c', explanation: 'Excretion removes metabolic waste.' },
  { id: 'q10', question: 'A characteristic distinguishing living from non-living:', options: [
      { key: 'a', text: 'Color' }, { key: 'b', text: 'Shape' }, { key: 'c', text: 'Ability to respond to stimuli' }, { key: 'd', text: 'Size' },
    ], answer: 'c', explanation: 'Response to stimuli is a key difference.' },
]

export default function BioG6LivingNonLiving() {
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
          .from('user_progress_biology')
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
    await supabase.from('user_progress_biology').insert({ user_uid: userId, lesson_id: LESSON_ID_TEXT, completed_mcq: true, mcq_score: percent, material_downloaded: !!materialDownloaded, timestamp: new Date().toISOString() })
  }

  const handleSubmit = async () => { setSubmitted(true); if (!userId) { setPreviousScore(score); setCompletion('completed'); return } setSaving(true); try { await saveProgress(score); setPreviousScore(score); setCompletion('completed') } finally { setSaving(false) } }

  const downloadMaterials = async () => {
    const lines: string[] = []
    lines.push('Lesson: Living and Non-living Things')
    lines.push('Grade: 6  Subject: Biology')
    lines.push('')
    for (const s of SECTIONS) { lines.push(s.title); lines.push('-'.repeat(s.title.length)); lines.push(s.content); lines.push('') }
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Grade6_Biology_Living_Nonliving.txt'; a.click(); URL.revokeObjectURL(url)
    if (userId) { try { await saveProgress(previousScore ?? 0, true) } catch {} }
  }

  return (
    <div className="space-y-8">
      <div><Link to="/lessons/Biology/6" className="text-sm text-blue-600 hover:underline">← Back to Lessons</Link></div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Lesson: Living and Non-living Things</h1>
          <p className="text-sm text-gray-600 dark:text-slate-400">Grade 6 • Biology</p>
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
