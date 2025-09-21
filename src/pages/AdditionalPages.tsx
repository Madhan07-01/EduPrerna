// using automatic JSX runtime; no React default import needed
import { SectionCard } from './Pages'
import { useEffect, useMemo, useState } from 'react'
import { driveFiles, driveDirectDownloadUrl, type GradeKey, type DriveGradeEntry } from '../data/driveFiles'
import { useAuth } from '../hooks/useAuth'
import { addDoc, collection, doc, getDoc, getDocs, setDoc, increment } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { awardXPAndStreak, describeBadge } from '../services/gamification'
import { useBadgeQueue } from '../contexts/BadgeContext'
import { getDriveGradeMapping } from '../services/driveMappings'
import { logActivity } from '../services/activity'
import { useLanguage } from '../contexts/LanguageContext'
import PdfPreviewModal from '../components/PdfPreviewModal'

export function QuickQuizPage() {
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">Quick Quiz</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'].map((subject) => (
          <SectionCard key={subject} title={`${subject} Quiz`}>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">10 questions • 5 minutes</div>
              <button className="w-full rounded-md bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700">
                Start Quiz
              </button>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

export function DailyChallengePage() {
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">Daily Challenge</div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <div className="text-xl font-bold">Today's Challenge</div>
        <div className="text-sm opacity-90">Solve 5 math problems in under 10 minutes</div>
        <div className="mt-4">
          <div className="text-sm">Progress: 0/5 completed</div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
            <div className="bg-white h-2 rounded-full w-0"></div>
          </div>
        </div>
        <button className="mt-4 rounded-md bg-white text-purple-600 px-4 py-2 font-semibold hover:bg-gray-100">
          Start Challenge
        </button>
      </div>
    </div>
  )
}

export function MiniGamesPage() {
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">Mini-Games</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Math Puzzle', description: 'Solve equations to advance', icon: '🧩' },
          { name: 'Physics Simulator', description: 'Experiment with physics laws', icon: '⚡' },
          { name: 'Chemistry Lab', description: 'Mix elements and compounds', icon: '🧪' },
          { name: 'Biology Explorer', description: 'Discover cellular structures', icon: '🔬' },
          { name: 'Code Breaker', description: 'Decode programming patterns', icon: '💻' },
          { name: 'Memory Match', description: 'Match scientific terms', icon: '🧠' },
        ].map((game) => (
          <SectionCard key={game.name} title={game.name}>
            <div className="space-y-2">
              <div className="text-4xl">{game.icon}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{game.description}</div>
              <button className="w-full rounded-md bg-green-600 text-white px-4 py-2 text-sm hover:bg-green-700">
                Play Game
              </button>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

export function DownloadGradePage() {
  const { currentUser } = useAuth()
  const { queueBadge } = useBadgeQueue()
  const { language } = useLanguage()
  const grades = useMemo(() => [6,7,8,9,10,11,12] as const, [])
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null)
  const [downloads, setDownloads] = useState<{ [chapter: number]: boolean }>({})
  const [saving, setSaving] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [downloadCount, setDownloadCount] = useState(0)
  const [badgeAwarded, setBadgeAwarded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [quizUnlocked, setQuizUnlocked] = useState<{ [chapter: number]: boolean }>({1: true, 2: false, 3: false})
  const [driveMap, setDriveMap] = useState<DriveGradeEntry | null>(null)
  const [history, setHistory] = useState<Array<{ id: string; chapter: number; type: string; ts?: any }>>([])
  const [burstChapter, setBurstChapter] = useState<number | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Load preferred grade and downloads progress from Firestore
  useEffect(() => {
    const load = async () => {
      if (!currentUser) return
      try {
        setLoading(true)
        const userRef = doc(db, 'users', currentUser.uid)
        const userSnap = await getDoc(userRef)
        const prefGrade = userSnap.exists() ? (userSnap.data() as any).preferredGrade : undefined
        if (prefGrade && grades.includes(prefGrade)) {
          setSelectedGrade(prefGrade)
        } else {
          setShowPicker(true)
        }


        const dlRef = doc(db, 'users', currentUser.uid, 'downloads', 'progress')
        const dlSnap = await getDoc(dlRef)
        if (dlSnap.exists()) {
          const data = dlSnap.data() as any
          const gradeKey = prefGrade ? (`grade${prefGrade}` as GradeKey) : null
          if (gradeKey && data[gradeKey]) {
            setDownloads(data[gradeKey])
            const count = Object.values(data[gradeKey]).filter(Boolean).length
            setDownloadCount(count)
          }
        }

        // Progressive unlocking: require previous chapter quiz completion
        try {
          const g = prefGrade
          if (g) {
            const q1 = await getDoc(doc(db, 'users', currentUser.uid, 'progress', `quiz_Mathematics_${g}_1`))
            const q2 = await getDoc(doc(db, 'users', currentUser.uid, 'progress', `quiz_Mathematics_${g}_2`))
            const ok1 = q1.exists() && ((q1.data() as any).score ?? 0) >= 1
            const ok2 = q2.exists() && ((q2.data() as any).score ?? 0) >= 1
            setQuizUnlocked({ 1: true, 2: ok1, 3: ok2 })
          }
        } catch (e) {
          // If permissions or docs missing, keep defaults (only Chapter 1 unlocked)
          console.warn('Quiz unlock check failed', e)
        }

        // Drive mappings
        if (prefGrade) {
          const fm = await getDriveGradeMapping(prefGrade, language)
          if (fm) setDriveMap(fm)
        }
      } catch (e) {
        console.error('Failed to load preferences/progress', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [currentUser, grades, language])

  // Load download history
  useEffect(() => {
    const run = async () => {
      if (!currentUser) return
      try {
        const col = collection(db, 'users', currentUser.uid, 'downloads', 'items')
        const snap = await getDocs(col)
        const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
        setHistory(list.sort((a, b) => (b.ts?.seconds || 0) - (a.ts?.seconds || 0)))
      } catch (e) {
        // best-effort only
      }
    }
    run()
  }, [currentUser])

  const onPickGrade = async (g: number) => {
    if (!currentUser) return
    try {
      setSaving(true)
      const userRef = doc(db, 'users', currentUser.uid)
      await setDoc(userRef, { preferredGrade: g }, { merge: true })
      setSelectedGrade(g)
      setShowPicker(false)
    } catch (e) {
      console.error('Failed to save preferred grade', e)
    } finally {
      setSaving(false)
    }
  }

  // Whole-grade bundle download: marks all chapters as downloaded, awards XP and badges, logs activity
  const handleBundleDownload = async (_type: 'pdf'|'zip', url?: string) => {
    if (!currentUser || !selectedGrade) return
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')

    try {
      const gradeKey = `grade${selectedGrade}` as GradeKey
      const next = { 1: true, 2: true, 3: true } as { [chapter: number]: boolean }
      setDownloads(next)
      setDownloadCount(3)

      const dlRef = doc(db, 'users', currentUser.uid, 'downloads', 'progress')
      await setDoc(dlRef, { [gradeKey]: next }, { merge: true })

      // Award XP for whole bundle (3 chapters)
      await awardXPAndStreak(currentUser.uid, 30)
      try {
        await logActivity({ uid: currentUser.uid, type: 'download', grade: selectedGrade, chapter: 0, details: { kind: `bundle-${_type}` }, source: 'bundleDownload' })
      } catch {}
      try {
        await addDoc(collection(db, 'users', currentUser.uid, 'downloads', 'items'), {
          chapter: 0,
          grade: selectedGrade,
          type: `bundle-${_type}`,
          ts: new Date(),
        })
      } catch {}
      try {
        const lbRef = doc(db, 'leaderboard', currentUser.uid)
        await setDoc(lbRef, { downloadsCompleted: increment(3) }, { merge: true })
        const stuRef = doc(db, 'students', currentUser.uid)
        await setDoc(stuRef, { downloadsCompleted: increment(3) }, { merge: true })
      } catch {}

      // Queue badges on completion
      if (!badgeAwarded) {
        setBadgeAwarded(true)
        const studentRef = doc(db, 'students', currentUser.uid)
        try {
          const snap = await getDoc(studentRef)
          const cur = snap.exists() ? (snap.data() as any) : {}
          const badgesArr: string[] = Array.isArray(cur.badges) ? cur.badges : []
          const toAdd = ['download-master', 'grade-champion', 'knowledge-collector']
          const merged = Array.from(new Set([...badgesArr, ...toAdd]))
          await setDoc(studentRef, { badges: merged }, { merge: true })
        } catch {}
        queueBadge(describeBadge('download-master'))
        queueBadge(describeBadge('grade-champion'))
        queueBadge(describeBadge('knowledge-collector'))
      }
    } catch (e) {
      console.error('Failed to update download progress (bundle)', e)
    }
  }

  const handleDownload = async (chapter: 1|2|3, _type: 'pdf'|'zip', url?: string) => {
    if (!currentUser || !selectedGrade) return
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')

    // Update progress
    try {
      const gradeKey = `grade${selectedGrade}` as GradeKey
      const next = { ...(downloads || {}), [chapter]: true }
      setDownloads(next)
      const count = Object.values(next).filter(Boolean).length
      setDownloadCount(count)

      const dlRef = doc(db, 'users', currentUser.uid, 'downloads', 'progress')
      await setDoc(dlRef, { [gradeKey]: next }, { merge: true })

      // Award XP per download and badge when complete
      await awardXPAndStreak(currentUser.uid, 10)
      // Log activity for Teacher analytics
      try {
        await logActivity({ uid: currentUser.uid, type: 'download', grade: selectedGrade, chapter, details: { kind: _type }, source: 'studentDownload' })
      } catch {}
      // Save per-user history
      try {
        await addDoc(collection(db, 'users', currentUser.uid, 'downloads', 'items'), {
          chapter,
          grade: selectedGrade,
          type: _type,
          ts: new Date(),
        })
      } catch {}

      // Increment downloadsCompleted counters for insights
      try {
        const lbRef = doc(db, 'leaderboard', currentUser.uid)
        await setDoc(lbRef, { downloadsCompleted: increment(1) }, { merge: true })
        const stuRef = doc(db, 'students', currentUser.uid)
        await setDoc(stuRef, { downloadsCompleted: increment(1) }, { merge: true })
      } catch {}

      // Trigger burst animation
      setBurstChapter(chapter)
      setTimeout(() => setBurstChapter(null), 450)

      // Badge logic
      if (count >= 3 && !badgeAwarded) {
        setBadgeAwarded(true)
        const studentRef = doc(db, 'students', currentUser.uid)
        // Fetch current badges, append new ones uniquely
        try {
          const snap = await getDoc(studentRef)
          const cur = snap.exists() ? (snap.data() as any) : {}
          const badgesArr: string[] = Array.isArray(cur.badges) ? cur.badges : []
          const toAdd = ['download-master', 'grade-champion', 'knowledge-collector']
          const merged = Array.from(new Set([...badgesArr, ...toAdd]))
          await setDoc(studentRef, { badges: merged }, { merge: true })
          // Knowledge Explorer if user completed 3 chapters in 2+ grades
          const progressSnap = await getDoc(dlRef)
          if (progressSnap.exists()) {
            const pdata = progressSnap.data() as any
            const completedGrades = Object.values(pdata || {}).filter((g: any) => g && g[1] && g[2] && g[3]).length
            if (completedGrades >= 2 && !merged.includes('knowledge-explorer')) {
              const merged2 = Array.from(new Set([...merged, 'knowledge-explorer']))
              await setDoc(studentRef, { badges: merged2 }, { merge: true })
              queueBadge(describeBadge('knowledge-explorer'))
              try { await logActivity({ uid: currentUser.uid, type: 'badge_awarded', details: { id: 'knowledge-explorer' } }) } catch {}
            }
          }
        } catch {}
        // Queue popups and activity logs
        queueBadge(describeBadge('download-master'))
        queueBadge(describeBadge('grade-champion'))
        queueBadge(describeBadge('knowledge-collector'))
        try { await logActivity({ uid: currentUser.uid, type: 'badge_awarded', details: { id: 'grade-champion' } }) } catch {}
        try { await logActivity({ uid: currentUser.uid, type: 'badge_awarded', details: { id: 'knowledge-collector' } }) } catch {}
      }
    } catch (e) {
      console.error('Failed to update download progress', e)
    }
  }

  const gradeKey = selectedGrade ? (`grade${selectedGrade}` as GradeKey) : null
  const chapterEntries = gradeKey ? (driveMap ?? driveFiles[gradeKey]) : undefined

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">Downloads</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Personalized by your grade</div>
        </div>
        {selectedGrade && (
          <button
            className="text-sm px-3 py-2 rounded-md border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
            onClick={() => setShowPicker(true)}
          >
            Change Grade
          </button>
        )}
      </div>

      {loading && !showPicker && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Grade picker modal */}
      {showPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-[min(92vw,520px)] shadow-2xl">
            <div className="text-xl font-bold mb-2">Select your Grade</div>
            <div className="text-sm text-gray-600 dark:text-slate-400 mb-4">We will personalize downloads for you.</div>
            <div className="grid grid-cols-3 gap-2">
              {grades.map((g) => (
                <button
                  key={g}
                  disabled={saving}
                  onClick={() => onPickGrade(g)}
                  className="rounded-lg px-4 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  Grade {g}
                </button>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button className="text-sm px-3 py-2" onClick={() => setShowPicker(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {!loading && selectedGrade && (
        <SectionCard title={`Grade ${selectedGrade} • Chapters 1–3`}>
          <div className="space-y-4">
            {/* Progress */}
            <div>
              <div className="text-sm text-gray-700 dark:text-slate-300">Progress: {downloadCount}/3 downloaded</div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${(downloadCount/3)*100}%` }}></div>
              </div>
            </div>

            {/* Whole-grade bundle (all subjects) */}
            {chapterEntries && (chapterEntries as any).bundle && (
              <div className="rounded-lg border p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 border-amber-200 dark:border-amber-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">Whole Grade Bundle</div>
                  <div className="text-xs text-amber-700 dark:text-amber-300">All subjects in one file</div>
                </div>
                <div className="flex gap-2">
                  {(() => { const b = (chapterEntries as any).bundle || {}; const pdfUrl = b.pdf ? driveDirectDownloadUrl(b.pdf) : undefined; return (
                    <button
                      onClick={() => handleBundleDownload('pdf', pdfUrl)}
                      disabled={!pdfUrl}
                      title={pdfUrl ? 'Direct PDF download' : 'Not available yet'}
                      className={`flex-1 rounded-md px-3 py-2 text-sm text-white ${pdfUrl ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      Download Bundle PDF
                    </button>
                  )})()}
                  {(() => { const b = (chapterEntries as any).bundle || {}; const zipUrl = b.zip ? driveDirectDownloadUrl(b.zip) : undefined; return (
                    <button
                      onClick={() => handleBundleDownload('zip', zipUrl)}
                      disabled={!zipUrl}
                      title={zipUrl ? 'Direct ZIP download' : 'Not available yet'}
                      className={`flex-1 rounded-md px-3 py-2 text-sm text-white ${zipUrl ? 'bg-amber-700 hover:bg-amber-800' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      Download Bundle ZIP
                    </button>
                  )})()}
                </div>
                <div className="mt-1 text-xs text-gray-600 dark:text-slate-400">Tip: Use the bundle for a single-click download of all resources.</div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[1,2,3].map((ch) => {
                const entry = chapterEntries?.[ch as 1|2|3] || {}
                const pdfUrl = entry.pdf ? driveDirectDownloadUrl(entry.pdf) : undefined
                const zipUrl = entry.zip ? driveDirectDownloadUrl(entry.zip) : undefined
                const completed = !!downloads[ch]
                const unlocked = quizUnlocked[ch] ?? (ch === 1)
                return (
                  <div key={ch} className={`rounded-lg border p-4 relative ${completed ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-slate-700'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">Chapter {ch}</div>
                      <div className="text-sm">{completed ? '✅ Downloaded' : (unlocked ? '⬇️ Ready' : '🔒 Locked')}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownload(ch as 1|2|3, 'pdf', pdfUrl)}
                        disabled={!pdfUrl || !unlocked}
                        title={
                          !unlocked ? `Complete Chapter ${ch-1} quiz to unlock` : (pdfUrl ? 'Direct PDF download' : 'Not available yet')
                        }
                        className={`flex-1 rounded-md px-3 py-2 text-sm text-white ${pdfUrl && unlocked ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                      >
                        Download PDF
                      </button>
                      <button
                        onClick={() => setPreviewUrl(pdfUrl || null)}
                        disabled={!pdfUrl}
                        title={pdfUrl ? 'Preview first page' : 'Not available yet'}
                        className={`rounded-md px-3 py-2 text-sm border ${pdfUrl ? 'border-blue-300 text-blue-700 hover:bg-blue-50' : 'border-gray-300 text-gray-400 cursor-not-allowed'}`}
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => handleDownload(ch as 1|2|3, 'zip', zipUrl)}
                        disabled={!zipUrl || !unlocked}
                        title={
                          !unlocked ? `Complete Chapter ${ch-1} quiz to unlock` : (zipUrl ? 'Direct ZIP download' : 'Not available yet')
                        }
                        className={`flex-1 rounded-md px-3 py-2 text-sm text-white ${zipUrl && unlocked ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'}`}
                      >
                        Download ZIP
                      </button>
                    </div>
                    {!pdfUrl || !zipUrl ? (
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">Some files not available yet.</div>
                    ) : null}
                    {/* Confetti burst element */}
                    <div className={`pointer-events-none absolute inset-0 download-burst ${burstChapter === ch ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>
                )
              })}
            </div>
            {previewUrl && (
              <PdfPreviewModal url={previewUrl} onClose={() => setPreviewUrl(null)} />
            )}

            {/* Download history */}
            {history.length > 0 && (
              <div>
                <div className="mt-6 text-sm font-semibold">Your Download History</div>
                <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-slate-300">
                  {history.slice(0, 8).map((h) => (
                    <li key={h.id}>Chapter {h.chapter} • {String(h.type).toUpperCase()} • {h.ts?.seconds ? new Date(h.ts.seconds * 1000).toLocaleString() : ''}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      <style>{`
        .unlock-animate { animation: unlock 600ms ease-out forwards; }
        @keyframes unlock { 0% { transform: scale(.98); opacity:.9 } 70% { transform: scale(1.03) } 100% { transform: scale(1); opacity:1 } }
        .download-burst { background: radial-gradient(circle at center, rgba(255,255,255,0.6), transparent 60%); transition: opacity .4s; }
      `}</style>
    </div>
  )
}

// Old DownloadCard replaced by personalized per-chapter UI above.
