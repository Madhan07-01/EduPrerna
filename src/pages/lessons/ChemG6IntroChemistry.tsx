import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase/client'

const LESSON_ID_TEXT = 'chem-g6-intro-chemistry'

type Option = { key: 'a' | 'b' | 'c' | 'd'; text: string }

type MCQ = { id: string; question: string; options: Option[]; answer: Option['key']; explanation: string }

const SECTIONS = [
  { title: 'Introduction', content: 'Chemistry studies matter, its properties, and how it changes. Everything around us—air, water, food, metals—is made of matter. Chemistry helps us understand the material world.' },
  { title: '1. What is Chemistry?', content: 'Study of matter and its changes. Examples: rusting of iron, burning wood, digestion of food.' },
  { title: '2. Matter', content: 'Anything with mass and that occupies space. States: Solid (definite shape & volume), Liquid (definite volume, no fixed shape), Gas (no definite shape or volume).' },
  { title: '3. Physical and Chemical Changes', content: 'Physical: appearance changes, no new substance (ice melting). Chemical: new substance formed (burning paper, rusting).' },
  { title: '4. Elements, Compounds, Mixtures', content: 'Element: one type of atom (H, O). Compound: atoms chemically combined (H₂O, CO₂). Mixture: physical combination (salt + sand, air).' },
  { title: '5. Importance of Chemistry', content: 'Daily life: cooking, cleaning, medicines. Industries: metals, plastics, fertilizers. Environment: water purification, pollution control.' },
  { title: 'Summary', content: 'Chemistry = study of matter & changes; matter exists as solid/liquid/gas; changes are physical or chemical; substances are elements, compounds or mixtures.' },
]

const MCQS: MCQ[] = [
  { id: 'q1', question: 'Chemistry studies:', options: [
      { key: 'a', text: 'Plants and animals' }, { key: 'b', text: 'Matter and its changes' }, { key: 'c', text: 'Stars and planets' }, { key: 'd', text: 'Computers' },
    ], answer: 'b', explanation: 'Chemistry focuses on matter and its transformations.' },
  { id: 'q2', question: 'Matter has:', options: [
      { key: 'a', text: 'Energy only' }, { key: 'b', text: 'Mass & occupies space' }, { key: 'c', text: 'Color only' }, { key: 'd', text: 'Shape only' },
    ], answer: 'b', explanation: 'Definition of matter.' },
  { id: 'q3', question: 'Solid example:', options: [
      { key: 'a', text: 'Water' }, { key: 'b', text: 'Oxygen' }, { key: 'c', text: 'Ice' }, { key: 'd', text: 'Carbon dioxide' },
    ], answer: 'c', explanation: 'Ice is water in the solid state.' },
  { id: 'q4', question: 'Melting ice is a:', options: [
      { key: 'a', text: 'Chemical change' }, { key: 'b', text: 'Physical change' }, { key: 'c', text: 'Biological change' }, { key: 'd', text: 'Nuclear change' },
    ], answer: 'b', explanation: 'No new substance forms on melting.' },
  { id: 'q5', question: 'Burning paper is a:', options: [
      { key: 'a', text: 'Physical change' }, { key: 'b', text: 'Chemical change' }, { key: 'c', text: 'Mixture' }, { key: 'd', text: 'Dissolving' },
    ], answer: 'b', explanation: 'New substances (ash, gases) form.' },
  { id: 'q6', question: 'Water (H₂O) is:', options: [
      { key: 'a', text: 'Element' }, { key: 'b', text: 'Compound' }, { key: 'c', text: 'Mixture' }, { key: 'd', text: 'Gas only' },
    ], answer: 'b', explanation: 'Made of hydrogen and oxygen atoms chemically bonded.' },
  { id: 'q7', question: 'Salt + sand is a:', options: [
      { key: 'a', text: 'Compound' }, { key: 'b', text: 'Mixture' }, { key: 'c', text: 'Element' }, { key: 'd', text: 'Chemical change' },
    ], answer: 'b', explanation: 'No chemical bonding between salt and sand.' },
  { id: 'q8', question: 'Rusting of iron is:', options: [
      { key: 'a', text: 'Physical change' }, { key: 'b', text: 'Chemical change' }, { key: 'c', text: 'Mixture' }, { key: 'd', text: 'None' },
    ], answer: 'b', explanation: 'New compound (iron oxide) forms.' },
  { id: 'q9', question: 'Oxygen is:', options: [
      { key: 'a', text: 'Compound' }, { key: 'b', text: 'Mixture' }, { key: 'c', text: 'Element' }, { key: 'd', text: 'Solution' },
    ], answer: 'c', explanation: 'Oxygen is an element.' },
  { id: 'q10', question: 'Chemistry is important for:', options: [
      { key: 'a', text: 'Cooking, medicines, cleaning' }, { key: 'b', text: 'Only making computers' }, { key: 'c', text: 'Only growing plants' }, { key: 'd', text: 'Only watching TV' },
    ], answer: 'a', explanation: 'Chemistry underpins many daily processes.' },
]

export default function ChemG6IntroChemistry() {
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
        const { data: up1 } = await supabase
          .from('user_progress_chemistry')
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
      }
    }
    init()
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null)
    })
    return () => { mounted = false; sub.subscription.unsubscribe() }
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
    const percent = Math.round((attemptScore / MCQS.length) * 100)
    await supabase.from('user_progress_chemistry').insert({
      user_uid: userId,
      lesson_id: LESSON_ID_TEXT,
      completed_mcq: true,
      mcq_score: percent,
      material_downloaded: !!materialDownloaded,
      timestamp: new Date().toISOString(),
    })
  }

  const handleSubmit = async () => {
    setSubmitted(true)
    if (!userId) { setPreviousScore(score); setCompletion('completed'); return }
    setSaving(true)
    try { await saveProgress(score); setPreviousScore(score); setCompletion('completed') } finally { setSaving(false) }
  }

  const downloadMaterials = async () => {
    const lines: string[] = []
    lines.push('Lesson: Introduction to Chemistry')
    lines.push('Grade: 6  Subject: Chemistry')
    lines.push('')
    for (const s of SECTIONS) { lines.push(s.title); lines.push('-'.repeat(s.title.length)); lines.push(s.content); lines.push('') }
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Grade6_Chemistry_Intro.txt'
    a.click()
    URL.revokeObjectURL(url)

    if (userId) { try { await saveProgress(previousScore ?? 0, true) } catch {} }
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/lessons/Chemistry/6" className="text-sm text-blue-600 hover:underline">← Back to Lessons</Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Lesson: Introduction to Chemistry</h1>
          <p className="text-sm text-gray-600 dark:text-slate-400">Grade 6 • Chemistry</p>
          <div className="mt-2 text-xs">
            <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full ring-1 ring-inset ${
              completion === 'completed' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30'
              : completion === 'in_progress' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-amber-500/30'
              : 'bg-gray-500/10 text-gray-700 dark:text-slate-300 ring-gray-500/30'}`}>
              <span className={`h-2 w-2 rounded-full ${completion === 'completed' ? 'bg-emerald-500' : completion === 'in_progress' ? 'bg-amber-500' : 'bg-gray-400'}`} />
              {completion === 'completed' ? 'Already learnt' : completion === 'in_progress' ? 'In progress' : 'Not started'}
            </span>
            {previousScore !== null && (
              <span className="ml-3 text-gray-600 dark:text-slate-400">Last score: {previousScore}/{MCQS.length}</span>
            )}
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
            <button onClick={handleSubmit} disabled={saving} className={`px-4 py-2 rounded-xl text-white text-sm font-semibold shadow ${saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}>{saving ? 'Saving…' : 'Submit & Save Progress'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
