import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase/client'

const LESSON_ID_TEXT = 'phy-g6-light-shadows-reflections'

type Option = { key: 'a' | 'b' | 'c' | 'd'; text: string }

type MCQ = {
  id: string
  question: string
  options: Option[]
  answer: Option['key']
  explanation: string
}

const SECTIONS = [
  { title: 'Introduction', content: 'Light lets us see objects and travels in straight lines. It forms shadows and reflections when it interacts with objects.' },
  { title: '1. What is Light?', content: 'Light is a form of energy that makes objects visible. It travels in straight lines. Sources: Natural (Sun, stars, fire) and Artificial (bulbs, LEDs).' },
  { title: '2. Shadows', content: 'Shadows form when opaque objects block light. Shape depends on object and source. Size changes with distance between source/object/screen.' },
  { title: '3. Reflection of Light', content: 'Reflection is the bouncing back of light from a surface. Plane surfaces (mirrors) give clear reflections. Laws: angle of incidence equals angle of reflection; incident ray, normal and reflected ray lie in the same plane.' },
  { title: '4. Types of Reflection', content: 'Regular reflection occurs on smooth surfaces and produces clear images. Diffused reflection occurs on rough surfaces and scatters rays.' },
  { title: '5. Image Formation', content: 'Plane mirror: upright, virtual image. Concave mirror: magnified or real depending on object distance. Convex mirror: diminished, virtual, upright images.' },
  { title: 'Summary', content: 'Light travels straight; shadows form when light is blocked; reflection follows fixed laws; different mirrors form different images.' },
]

const MCQS: MCQ[] = [
  { id: 'q1', question: 'Light travels in:', options: [
      { key: 'a', text: 'Curves' }, { key: 'b', text: 'Straight lines' }, { key: 'c', text: 'Zig-zag' }, { key: 'd', text: 'Circles' },
    ], answer: 'b', explanation: 'Light travels in straight lines in a uniform medium.' },
  { id: 'q2', question: 'A shadow forms when:', options: [
      { key: 'a', text: 'Light passes through an object' }, { key: 'b', text: 'Light is blocked by an opaque object' }, { key: 'c', text: 'Light reflects from a mirror' }, { key: 'd', text: 'None of the above' },
    ], answer: 'b', explanation: 'Shadows need a light source, opaque object and a screen.' },
  { id: 'q3', question: 'Angle of incidence equals:', options: [
      { key: 'a', text: 'Angle of reflection' }, { key: 'b', text: 'Angle of deviation' }, { key: 'c', text: 'Angle of refraction' }, { key: 'd', text: 'None' },
    ], answer: 'a', explanation: 'Law of reflection: i = r.' },
  { id: 'q4', question: 'Concave mirror can form:', options: [
      { key: 'a', text: 'Only diminished images' }, { key: 'b', text: 'Magnified or real images' }, { key: 'c', text: 'Only virtual images' }, { key: 'd', text: 'Plane images' },
    ], answer: 'b', explanation: 'Depending on position, concave mirrors form magnified or real images.' },
  { id: 'q5', question: 'Diffused reflection occurs on:', options: [
      { key: 'a', text: 'Smooth surfaces' }, { key: 'b', text: 'Rough surfaces' }, { key: 'c', text: 'Mirrors only' }, { key: 'd', text: 'Transparent surfaces' },
    ], answer: 'b', explanation: 'Irregular surfaces scatter rays in many directions.' },
]

export default function PhyG6LightShadowsReflections() {
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
    lines.push('Lesson: Light, Shadows, and Reflections')
    lines.push('Grade: 6  Subject: Physics')
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
    a.download = 'Grade6_Physics_LightShadowsReflections.txt'
    a.click()
    URL.revokeObjectURL(url)

    if (userId) {
      try { await saveProgress(previousScore ?? 0, true) } catch {}
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/lessons/Physics/6" className="text-sm text-blue-600 hover:underline">← Back to Lessons</Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Lesson: Light, Shadows, and Reflections</h1>
          <p className="text-sm text-gray-600 dark:text-slate-400">Grade 6 • Physics</p>
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
                <p className="mt-1 text-gray-700 dark:text-slate-300 whitespace-pre-line">{s.content}</p>
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
