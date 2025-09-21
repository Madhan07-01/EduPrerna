import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabase/client'

export type TemplateSection = { title: string; content: string }
export type TemplateOption = { key: 'a' | 'b' | 'c' | 'd'; text: string }
export type TemplateMCQ = {
  id: string
  question: string
  options: TemplateOption[]
  answer: TemplateOption['key']
  explanation?: string
}

export type LessonModuleTemplateProps = {
  // Display
  title: string
  subject: string
  grade: number
  backLink?: string // e.g. `/lessons/Mathematics/6`

  // Data & progress
  lessonId: string // e.g. 'math-g6-number-system'
  sections: TemplateSection[]
  mcqs: TemplateMCQ[]

  // Supabase table name for progress. Default: 'user_progress'
  progressTable?: string

  // If true, store score as percentage 0-100; otherwise raw correct count
  storePercent?: boolean
}

export default function LessonModuleTemplate(props: LessonModuleTemplateProps) {
  const {
    title,
    subject,
    grade,
    backLink,
    lessonId,
    sections,
    mcqs,
    progressTable = 'user_progress',
    storePercent = true,
  } = props

  const [answers, setAnswers] = useState<Record<string, TemplateOption['key'] | null>>({})
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [previousScore, setPreviousScore] = useState<number | null>(null)
  const [completion, setCompletion] = useState<'not_started' | 'in_progress' | 'completed'>('not_started')
  const [userId, setUserId] = useState<string | null>(null)
  const mcqRef = useRef<HTMLDivElement>(null)

  // Initialize auth and answers, load last score if available
  useEffect(() => {
    let mounted = true
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      setUserId(data.user?.id ?? null)

      const initAns: Record<string, TemplateOption['key'] | null> = {}
      for (const q of mcqs) initAns[q.id] = null
      setAnswers(initAns)

      if (data.user?.id) {
        // Try percent schema first (common new schema)
        const { data: up1 } = await supabase
          .from(progressTable)
          .select('mcq_score')
          .eq('user_uid', data.user.id)
          .eq('lesson_id', lessonId)
          .order('timestamp', { ascending: false })
          .limit(1)
        const last1 = up1 && up1[0]?.mcq_score
        if (typeof last1 === 'number') {
          setPreviousScore(last1)
          if (last1 > 0) setCompletion('completed')
          return
        }
        // Fallback legacy schema (if present)
        const { data: up2 } = await supabase
          .from(progressTable)
          .select('mcq_score, created_at')
          .eq('user_uid', data.user.id)
          .eq('lesson_id', lessonId)
          .order('created_at', { ascending: false })
          .limit(1)
        const last2 = up2 && up2[0]?.mcq_score
        if (typeof last2 === 'number') {
          setPreviousScore(last2)
          if (last2 > 0) setCompletion('completed')
        }
      }
    }
    init()
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUserId(s?.user?.id ?? null))
    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [lessonId, mcqs, progressTable])

  const score = useMemo(() => {
    let s = 0
    for (const q of mcqs) if (answers[q.id] === q.answer) s += 1
    return s
  }, [answers, mcqs])

  const percentScore = useMemo(() => Math.round((score / mcqs.length) * 100), [score, mcqs.length])

  const handleSelect = (qid: string, key: TemplateOption['key']) => {
    setAnswers((prev) => ({ ...prev, [qid]: key }))
    if (completion === 'not_started') setCompletion('in_progress')
  }

  const saveProgress = async (attemptScore: number, materialDownloaded?: boolean) => {
    if (!userId) return
    const payloadScore = storePercent ? Math.round((attemptScore / mcqs.length) * 100) : attemptScore
    await supabase.from(progressTable).insert({
      user_uid: userId,
      lesson_id: lessonId,
      completed_mcq: true,
      mcq_score: payloadScore,
      material_downloaded: !!materialDownloaded,
      timestamp: new Date().toISOString(),
    })
  }

  const handleSubmit = async () => {
    setSubmitted(true)
    if (!userId) {
      setPreviousScore(storePercent ? percentScore : score)
      setCompletion('completed')
      return
    }
    setSaving(true)
    try {
      await saveProgress(score)
      setPreviousScore(storePercent ? percentScore : score)
      setCompletion('completed')
    } finally {
      setSaving(false)
    }
  }

  const downloadMaterials = async () => {
    const lines: string[] = []
    lines.push(`Lesson: ${title}`)
    lines.push(`Grade: ${grade}  Subject: ${subject}`)
    lines.push('')
    for (const s of sections) {
      lines.push(s.title)
      lines.push('-'.repeat(s.title.length))
      lines.push(s.content)
      lines.push('')
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Grade${grade}_${subject.replace(/\s+/g, '')}_${title.replace(/\s+/g, '')}.txt`
    a.click()
    URL.revokeObjectURL(url)

    if (userId) {
      try { await saveProgress(previousScore ?? 0, true) } catch {}
    }
  }

  return (
    <div className="space-y-8">
      {backLink && (
        <div>
          <Link to={backLink} className="text-sm text-blue-600 hover:underline">← Back to Lessons</Link>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Lesson: {title}</h1>
          <p className="text-sm text-gray-600 dark:text-slate-400">Grade {grade} • {subject}</p>
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
              <span className="ml-3 text-gray-600 dark:text-slate-400">Last score: {previousScore}/{storePercent ? 100 : mcqs.length}</span>
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
            {sections.map((s) => (
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
            {mcqs.map((q, idx) => {
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
                        <button
                          key={opt.key}
                          onClick={() => handleSelect(q.id, opt.key)}
                          className={`text-left px-3 py-2 rounded-lg border transition-all ${
                            active
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800'
                          } ${correct ? 'ring-2 ring-emerald-500' : ''} ${wrong ? 'ring-2 ring-rose-500' : ''}`}
                        >
                          <span className="font-semibold mr-2">{opt.key.toUpperCase()})</span>
                          {opt.text}
                        </button>
                      )
                    })}
                  </div>
                  {showFeedback && (
                    <div
                      className={`mt-3 text-sm rounded-lg px-3 py-2 ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300'
                      }`}
                    >
                      {isCorrect ? '✅ Correct!' : 'ℹ️ Explanation:'} {q.explanation || ''}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-slate-300">
              Score: {storePercent ? percentScore : score}/{storePercent ? 100 : mcqs.length}
            </div>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className={`px-4 py-2 rounded-xl text-white text-sm font-semibold shadow ${
                saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {saving ? 'Saving…' : 'Submit & Save Progress'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
