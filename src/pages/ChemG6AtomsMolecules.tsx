import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase/client'

const LESSON_ID_TEXT = 'chem-g6-atoms-molecules'

type Option = { key: 'a' | 'b' | 'c' | 'd'; text: string }

type MCQ = { id: string; question: string; options: Option[]; answer: Option['key']; explanation: string }

const SECTIONS = [
  { title: 'Introduction', content: 'Atoms are the building blocks of matter. Atoms combine to form molecules which make up all substances. Understanding them explains substance behavior and composition.' },
  { title: '1. Atom', content: 'Smallest unit of matter retaining identity. Structure: nucleus (protons + neutrons) and electrons.' },
  { title: '2. Molecule', content: 'Two or more atoms bonded together. Examples: H₂, O₂, H₂O.' },
  { title: '3. Elements & Compounds', content: 'Element: one type of atom (O₂, H₂). Compound: two or more atoms chemically combined (H₂O, CO₂).' },
  { title: '4. Importance', content: 'Atoms and molecules explain reactions, properties, and composition of substances.' },
  { title: 'Summary', content: 'Matter is made of atoms → molecules. Substances are elements or compounds.' },
]

const MCQS: MCQ[] = [
  { id: 'q1', question: 'Smallest unit of matter:', options: [
      { key: 'a', text: 'Molecule' }, { key: 'b', text: 'Atom' }, { key: 'c', text: 'Compound' }, { key: 'd', text: 'Element' },
    ], answer: 'b', explanation: 'Atom is the smallest particle that retains identity.' },
  { id: 'q2', question: 'Water (H₂O) is:', options: [
      { key: 'a', text: 'Atom' }, { key: 'b', text: 'Molecule' }, { key: 'c', text: 'Element' }, { key: 'd', text: 'Mixture' },
    ], answer: 'b', explanation: 'H₂O is a molecule made of H and O atoms.' },
  { id: 'q3', question: 'An element contains:', options: [
      { key: 'a', text: 'One type of atom' }, { key: 'b', text: 'Two types' }, { key: 'c', text: 'Only molecules' }, { key: 'd', text: 'Mixture' },
    ], answer: 'a', explanation: 'Elements are pure substances with one kind of atom.' },
  { id: 'q4', question: 'A molecule is formed by:', options: [
      { key: 'a', text: 'Two or more atoms' }, { key: 'b', text: 'Single atom' }, { key: 'c', text: 'Only elements' }, { key: 'd', text: 'Mixture of compounds' },
    ], answer: 'a', explanation: 'Atoms bond to form molecules.' },
  { id: 'q5', question: 'CO₂ is:', options: [
      { key: 'a', text: 'Atom' }, { key: 'b', text: 'Molecule & compound' }, { key: 'c', text: 'Mixture' }, { key: 'd', text: 'Element' },
    ], answer: 'b', explanation: 'CO₂ is a molecular compound (C and O).' },
  { id: 'q6', question: 'Electrons have:', options: [
      { key: 'a', text: 'Positive charge' }, { key: 'b', text: 'Negative charge' }, { key: 'c', text: 'No charge' }, { key: 'd', text: 'Neutral & positive' },
    ], answer: 'b', explanation: 'Electrons are negatively charged.' },
  { id: 'q7', question: 'Nucleus contains:', options: [
      { key: 'a', text: 'Only electrons' }, { key: 'b', text: 'Protons & neutrons' }, { key: 'c', text: 'Only neutrons' }, { key: 'd', text: 'Only protons' },
    ], answer: 'b', explanation: 'The nucleus has protons and neutrons.' },
  { id: 'q8', question: 'O₂ is:', options: [
      { key: 'a', text: 'Compound' }, { key: 'b', text: 'Element & molecule' }, { key: 'c', text: 'Mixture' }, { key: 'd', text: 'Solution' },
    ], answer: 'b', explanation: 'O₂ is an elemental molecule.' },
  { id: 'q9', question: 'Atoms combine to form:', options: [
      { key: 'a', text: 'Elements only' }, { key: 'b', text: 'Molecules' }, { key: 'c', text: 'Mixtures only' }, { key: 'd', text: 'Solids only' },
    ], answer: 'b', explanation: 'Atoms → molecules.' },
  { id: 'q10', question: 'Hydrogen gas representation:', options: [
      { key: 'a', text: 'H' }, { key: 'b', text: 'H₂' }, { key: 'c', text: 'H₂O' }, { key: 'd', text: 'HO' },
    ], answer: 'b', explanation: 'Diatomic molecule: H₂.' },
]

export default function ChemG6AtomsMolecules() {
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
        if (typeof score1 === 'number') { setPreviousScore(score1); if (score1 > 0) setCompletion('completed'); return }
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
    await supabase.from('user_progress_chemistry').insert({ user_uid: userId, lesson_id: LESSON_ID_TEXT, completed_mcq: true, mcq_score: percent, material_downloaded: !!materialDownloaded, timestamp: new Date().toISOString() })
  }

  const handleSubmit = async () => { setSubmitted(true); if (!userId) { setPreviousScore(score); setCompletion('completed'); return } setSaving(true); try { await saveProgress(score); setPreviousScore(score); setCompletion('completed') } finally { setSaving(false) } }

  const downloadMaterials = async () => {
    const lines: string[] = []
    lines.push('Lesson: Atoms and Molecules')
    lines.push('Grade: 6  Subject: Chemistry')
    lines.push('')
    for (const s of SECTIONS) { lines.push(s.title); lines.push('-'.repeat(s.title.length)); lines.push(s.content); lines.push('') }
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Grade6_Chemistry_Atoms_Molecules.txt'; a.click(); URL.revokeObjectURL(url)
    if (userId) { try { await saveProgress(previousScore ?? 0, true) } catch {} }
  }

  return (
    <div className="space-y-8">
      <div><Link to="/lessons/Chemistry/6" className="text-sm text-blue-600 hover:underline">← Back to Lessons</Link></div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Lesson: Atoms and Molecules</h1>
          <p className="text-sm text-gray-600 dark:text-slate-400">Grade 6 • Chemistry</p>
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
            {SECTIONS.map((s) => (<section key={s.title} className="group"><h3 className="font-semibold text-gray-900 dark:text-white">{s.title}</h3><p className="mt-1 text-gray-700 dark:text-slate-300 whitespace-pre-line">{s.content}</p></section>))}
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
