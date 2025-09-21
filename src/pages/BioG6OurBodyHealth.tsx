import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase/client'

const LESSON_ID_TEXT = 'bio-g6-our-body-health'

type Option = { key: 'a' | 'b' | 'c' | 'd'; text: string }

type MCQ = { id: string; question: string; options: Option[]; answer: Option['key']; explanation: string }

const SECTIONS = [
  { title: 'Introduction', content: 'The human body is a complex system. Good health is essential for growth, energy, and resistance to diseases.' },
  { title: '1. Human Body Systems', content: 'Digestive (mouth, esophagus, stomach, intestines); Circulatory (heart, vessels); Respiratory (lungs, trachea, bronchi); Excretory (kidneys, bladder); Nervous (brain, spinal cord, nerves); Skeletal & Muscular (bones, muscles).' },
  { title: '2. Good Health & Hygiene', content: 'Health = complete physical, mental, social well-being. Hygiene practices: bathing, handwashing, brushing teeth, clean surroundings, safe food & water.' },
  { title: '3. Balanced Diet', content: 'Carbohydrates (energy); Proteins (growth & repair); Fats (energy storage); Vitamins & Minerals (immunity); Water (hydration).' },
  { title: '4. Diseases & Prevention', content: 'Communicable (spread: cold, malaria); Non-communicable (not spread: diabetes, asthma). Prevention: vaccination, clean environment, proper nutrition, exercise.' },
  { title: 'Summary', content: 'Body systems work together; health via hygiene/diet/exercise; understanding functions helps prevent disease.' },
]

const MCQS: MCQ[] = [
  { id: 'q1', question: 'System transporting blood & nutrients:', options: [
      { key: 'a', text: 'Digestive' }, { key: 'b', text: 'Circulatory' }, { key: 'c', text: 'Respiratory' }, { key: 'd', text: 'Nervous' },
    ], answer: 'b', explanation: 'Circulatory system transports blood and nutrients.' },
  { id: 'q2', question: 'Organ for gas exchange:', options: [
      { key: 'a', text: 'Heart' }, { key: 'b', text: 'Lungs' }, { key: 'c', text: 'Stomach' }, { key: 'd', text: 'Kidney' },
    ], answer: 'b', explanation: 'Lungs exchange oxygen and carbon dioxide.' },
  { id: 'q3', question: 'NOT good hygiene practice:', options: [
      { key: 'a', text: 'Washing hands' }, { key: 'b', text: 'Brushing teeth' }, { key: 'c', text: 'Eating stale food' }, { key: 'd', text: 'Bathing regularly' },
    ], answer: 'c', explanation: 'Stale food can cause illness.' },
  { id: 'q4', question: 'Proteins are important for:', options: [
      { key: 'a', text: 'Energy only' }, { key: 'b', text: 'Growth & repair' }, { key: 'c', text: 'Immunity only' }, { key: 'd', text: 'Hydration' },
    ], answer: 'b', explanation: 'Proteins build and repair body tissues.' },
  { id: 'q5', question: 'Part of excretory system:', options: [
      { key: 'a', text: 'Brain' }, { key: 'b', text: 'Kidney' }, { key: 'c', text: 'Heart' }, { key: 'd', text: 'Lungs' },
    ], answer: 'b', explanation: 'Kidneys filter blood and make urine.' },
  { id: 'q6', question: 'Communicable diseases:', options: [
      { key: 'a', text: 'Not spread' }, { key: 'b', text: 'Spread person to person' }, { key: 'c', text: 'Always inherited' }, { key: 'd', text: 'Only in animals' },
    ], answer: 'b', explanation: 'They spread through contact, air, water, etc.' },
  { id: 'q7', question: 'Drinking clean water ensures:', options: [
      { key: 'a', text: 'Good hygiene & health' }, { key: 'b', text: 'Making bones' }, { key: 'c', text: 'Nervous system only' }, { key: 'd', text: 'Strengthening muscles' },
    ], answer: 'a', explanation: 'Clean water prevents many diseases.' },
  { id: 'q8', question: 'Nutrient for energy:', options: [
      { key: 'a', text: 'Vitamins' }, { key: 'b', text: 'Carbohydrates' }, { key: 'c', text: 'Proteins' }, { key: 'd', text: 'Minerals' },
    ], answer: 'b', explanation: 'Carbohydrates are primary energy source.' },
  { id: 'q9', question: 'Vaccination helps:', options: [
      { key: 'a', text: 'Improve eyesight' }, { key: 'b', text: 'Prevent diseases' }, { key: 'c', text: 'Increase appetite' }, { key: 'd', text: 'Strengthen muscles' },
    ], answer: 'b', explanation: 'Vaccines build immunity against diseases.' },
  { id: 'q10', question: 'System controlling activities & senses:', options: [
      { key: 'a', text: 'Circulatory' }, { key: 'b', text: 'Nervous' }, { key: 'c', text: 'Digestive' }, { key: 'd', text: 'Excretory' },
    ], answer: 'b', explanation: 'Nervous system controls body actions and senses.' },
]

export default function BioG6OurBodyHealth() {
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
    lines.push('Lesson: Our Body and Health')
    lines.push('Grade: 6  Subject: Biology')
    lines.push('')
    for (const s of SECTIONS) { lines.push(s.title); lines.push('-'.repeat(s.title.length)); lines.push(s.content); lines.push('') }
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Grade6_Biology_OurBody_Health.txt'; a.click(); URL.revokeObjectURL(url)
    if (userId) { try { await saveProgress(previousScore ?? 0, true) } catch {} }
  }

  return (
    <div className="space-y-8">
      <div><Link to="/lessons/Biology/6" className="text-sm text-blue-600 hover:underline">← Back to Lessons</Link></div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Lesson: Our Body and Health</h1>
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
