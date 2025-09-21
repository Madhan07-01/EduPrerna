import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase/client'

const LESSON_ID_TEXT = 'bio-g6-plants-animals'

type Option = { key: 'a' | 'b' | 'c' | 'd'; text: string }

type MCQ = { id: string; question: string; options: Option[]; answer: Option['key']; explanation: string }

const SECTIONS = [
  { title: 'Introduction', content: 'The world is full of plants and animals. Studying them helps understand biodiversity, ecology, and interdependence of life.' },
  { title: '1. Plants Around Us', content: 'Plants make their own food (photosynthesis). Types: Trees (Mango, Neem), Shrubs (Rose, Hibiscus), Herbs (Mint, Spinach), Climbers (Money plant, Cucumber), Creepers (Pumpkin, Watermelon).' },
  { title: '2. Animals Around Us', content: 'Animals cannot make their own food and depend on plants/other animals. By habitat: Terrestrial (lion), Aquatic (fish), Aerial (birds), Amphibians (frog). By diet: Herbivores (cow), Carnivores (lion), Omnivores (human).' },
  { title: '3. Interdependence', content: 'Animals depend on plants for food and oxygen; plants depend on animals for pollination and seed dispersal; balance maintains a healthy ecosystem.' },
  { title: 'Summary', content: 'Plants and animals are living things; plants provide food/oxygen/shelter; animals aid pollination/seed dispersal; classification by habitat/diet; interdependence maintains balance.' },
]

const MCQS: MCQ[] = [
  { id: 'q1', question: 'Which is a tree?', options: [
      { key: 'a', text: 'Rose' }, { key: 'b', text: 'Mango' }, { key: 'c', text: 'Spinach' }, { key: 'd', text: 'Money plant' },
    ], answer: 'b', explanation: 'Mango is a tree; Rose is a shrub; Spinach is an herb; Money plant is a climber.' },
  { id: 'q2', question: 'Plants that spread on ground are:', options: [
      { key: 'a', text: 'Climbers' }, { key: 'b', text: 'Herbs' }, { key: 'c', text: 'Creepers' }, { key: 'd', text: 'Shrubs' },
    ], answer: 'c', explanation: 'Creepers spread on the ground.' },
  { id: 'q3', question: 'Animals in water are called:', options: [
      { key: 'a', text: 'Terrestrial' }, { key: 'b', text: 'Aquatic' }, { key: 'c', text: 'Aerial' }, { key: 'd', text: 'Amphibians' },
    ], answer: 'b', explanation: 'Aquatic animals live in water.' },
  { id: 'q4', question: 'Herbivores eat:', options: [
      { key: 'a', text: 'Other animals' }, { key: 'b', text: 'Both plants & animals' }, { key: 'c', text: 'Plants only' }, { key: 'd', text: 'Rocks' },
    ], answer: 'c', explanation: 'Herbivores eat only plants.' },
  { id: 'q5', question: 'Carnivores eat:', options: [
      { key: 'a', text: 'Plants only' }, { key: 'b', text: 'Other animals' }, { key: 'c', text: 'Both plants & animals' }, { key: 'd', text: 'Water' },
    ], answer: 'b', explanation: 'Carnivores eat other animals.' },
  { id: 'q6', question: 'Omnivores eat:', options: [
      { key: 'a', text: 'Plants only' }, { key: 'b', text: 'Other animals only' }, { key: 'c', text: 'Both plants & animals' }, { key: 'd', text: 'Soil' },
    ], answer: 'c', explanation: 'Humans are omnivores.' },
  { id: 'q7', question: 'Which is an amphibian?', options: [
      { key: 'a', text: 'Frog' }, { key: 'b', text: 'Cow' }, { key: 'c', text: 'Eagle' }, { key: 'd', text: 'Fish' },
    ], answer: 'a', explanation: 'Frogs live on land and in water.' },
  { id: 'q8', question: 'Plants provide animals with:', options: [
      { key: 'a', text: 'Food & oxygen' }, { key: 'b', text: 'Water only' }, { key: 'c', text: 'Soil' }, { key: 'd', text: 'Rocks' },
    ], answer: 'a', explanation: 'Plants produce oxygen and serve as food.' },
  { id: 'q9', question: 'Animals help plants by:', options: [
      { key: 'a', text: 'Making soil' }, { key: 'b', text: 'Pollination & seed dispersal' }, { key: 'c', text: 'Producing oxygen' }, { key: 'd', text: 'Providing sunlight' },
    ], answer: 'b', explanation: 'Many animals are pollinators or dispersers.' },
  { id: 'q10', question: 'Rose is classified as:', options: [
      { key: 'a', text: 'Tree' }, { key: 'b', text: 'Herb' }, { key: 'c', text: 'Shrub' }, { key: 'd', text: 'Creeper' },
    ], answer: 'c', explanation: 'Rose is typically a shrub.' },
]

export default function BioG6PlantsAnimals() {
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
    lines.push('Lesson: Plants and Animals Around Us')
    lines.push('Grade: 6  Subject: Biology')
    lines.push('')
    for (const s of SECTIONS) { lines.push(s.title); lines.push('-'.repeat(s.title.length)); lines.push(s.content); lines.push('') }
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Grade6_Biology_Plants_Animals.txt'; a.click(); URL.revokeObjectURL(url)
    if (userId) { try { await saveProgress(previousScore ?? 0, true) } catch {} }
  }

  return (
    <div className="space-y-8">
      <div><Link to="/lessons/Biology/6" className="text-sm text-blue-600 hover:underline">← Back to Lessons</Link></div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Lesson: Plants and Animals Around Us</h1>
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
