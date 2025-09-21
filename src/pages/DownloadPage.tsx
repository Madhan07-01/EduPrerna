import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getDriveGradeMapping } from '../services/driveMappings'
import { driveDirectDownloadUrl } from '../data/driveFiles'
import PdfPreviewModal from '../components/PdfPreviewModal'
import ChapterCard from '../components/ChapterCard'
import { awardXPAndStreak, subscribeGamification, describeBadge, LEVEL_XP_THRESHOLDS } from '../services/gamification'
import { doc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { useBadgeQueue } from '../contexts/BadgeContext'
import type { DriveGradeEntry, ChapterEntry } from '../data/driveFiles'
import type { GamificationSnapshot } from '../services/gamification'
import { formatRelativeTime, formatDetailedTime } from '../utils/timeUtils'

export default function DownloadPage() {
  const { currentUser, profile } = useAuth()
  const { queueBadge } = useBadgeQueue()
  const [grade, setGrade] = useState(6)
  const [driveData, setDriveData] = useState<DriveGradeEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [gamification, setGamification] = useState<GamificationSnapshot | null>(null)
  const [downloadHistory, setDownloadHistory] = useState<any[]>([])
  const [quizUnlocked, setQuizUnlocked] = useState({ 1: true, 2: false, 3: false })
  const [downloads, setDownloads] = useState<{ [key: number]: boolean }>({})
  const [badgeAwarded, setBadgeAwarded] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [levelUpDetails, setLevelUpDetails] = useState({ from: 1, to: 1 })

  // Available grades (6-12)
  const availableGrades = [6, 7, 8, 9, 10, 11, 12]
  
  // Chapter titles based on curriculum data
  const chapterTitles: Record<number, string> = {
    1: "Number System",
    2: "Algebra Basics",
    3: "Geometry Fundamentals"
  }

  // Subject-themed gradients for each grade
  const gradeGradients: Record<number, string> = {
    6: "from-blue-400 to-purple-500",
    7: "from-green-400 to-teal-500",
    8: "from-yellow-400 to-orange-500",
    9: "from-red-400 to-pink-500",
    10: "from-indigo-400 to-blue-500",
    11: "from-purple-400 to-indigo-500",
    12: "from-pink-400 to-rose-500"
  }

  useEffect(() => {
    if (!currentUser?.uid) return
    
    // Load gamification data
    const unsubscribe = subscribeGamification(currentUser.uid, (g) => {
      setGamification(g)
    })
    
    // Load download history from localStorage
    const history = localStorage.getItem(`downloadHistory_${currentUser.uid}`)
    if (history) {
      setDownloadHistory(JSON.parse(history))
    }
    
    return () => unsubscribe()
  }, [currentUser?.uid])

  // Check quiz completion to unlock chapters
  useEffect(() => {
    const checkQuizCompletion = async () => {
      if (!currentUser?.uid) return
      
      try {
        // Check if quizzes for previous chapters are completed
        const q1 = await getDoc(doc(db, 'users', currentUser.uid, 'progress', `quiz_Mathematics_${grade}_1`))
        const q2 = await getDoc(doc(db, 'users', currentUser.uid, 'progress', `quiz_Mathematics_${grade}_2`))
        
        const ok1 = q1.exists() && ((q1.data() as any).score ?? 0) >= 1
        const ok2 = q2.exists() && ((q2.data() as any).score ?? 0) >= 1
        
        setQuizUnlocked({ 1: true, 2: ok1, 3: ok2 })
      } catch (e) {
        // If permissions or docs missing, keep defaults (only Chapter 1 unlocked)
        console.warn('Quiz unlock check failed', e)
      }
    }
    
    checkQuizCompletion()
  }, [currentUser?.uid, grade])

  // Load download progress
  useEffect(() => {
    const loadDownloadProgress = async () => {
      if (!currentUser?.uid) return
      
      try {
        const dlRef = doc(db, 'users', currentUser.uid, 'downloads', 'progress')
        const dlSnap = await getDoc(dlRef)
        if (dlSnap.exists()) {
          const data = dlSnap.data() as any
          const gradeKey = `grade${grade}`
          if (data[gradeKey]) {
            setDownloads(data[gradeKey])
          }
        }
      } catch (e) {
        console.warn('Download progress load failed', e)
      }
    }
    
    loadDownloadProgress()
  }, [currentUser?.uid, grade])

  useEffect(() => {
    const loadDriveData = async () => {
      if (!grade) return
      setLoading(true)
      try {
        const data = await getDriveGradeMapping(grade)
        setDriveData(data)
      } catch (error) {
        console.error('Failed to load drive data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadDriveData()
  }, [grade])

  const handlePreview = (url: string) => {
    setPreviewUrl(url)
  }

  const handleDownload = async (chapter: number, type: 'pdf' | 'zip') => {
    if (!currentUser?.uid || !driveData) return
    
    const chapterData = driveData[chapter as keyof DriveGradeEntry]
    if (!chapterData) return
    
    const url = type === 'pdf' ? chapterData.pdf : chapterData.zip
    if (!url) return
    
    // Award XP for download
    try {
      const result = await awardXPAndStreak(currentUser.uid, 10)
      console.log('XP awarded:', result)
      
      // Show level up notification if applicable
      if (result.levelUp) {
        setLevelUpDetails({ from: result.newLevel - 1, to: result.newLevel })
        setShowLevelUp(true)
        setTimeout(() => setShowLevelUp(false), 5000)
      }
      
      // Show badge notifications
      if (result.earnedBadges.length > 0) {
        result.earnedBadges.forEach(badgeId => {
          queueBadge(describeBadge(badgeId))
        })
      }
    } catch (error) {
      console.error('Failed to award XP:', error)
    }
    
    // Update download progress
    try {
      const next = { ...(downloads || {}), [chapter]: true }
      setDownloads(next)
      
      const dlRef = doc(db, 'users', currentUser.uid, 'downloads', 'progress')
      await setDoc(dlRef, { [`grade${grade}`]: next }, { merge: true })
      
      // Save to download history
      try {
        await addDoc(collection(db, 'users', currentUser.uid, 'downloads', 'items'), {
          chapter,
          grade: grade,
          type: type,
          ts: new Date(),
        })
      } catch {}
      
      // Check for badge eligibility
      const count = Object.values(next).filter(Boolean).length
      if (count >= 3 && !badgeAwarded) {
        setBadgeAwarded(true)
        
        // Award badges
        const studentRef = doc(db, 'students', currentUser.uid)
        try {
          const snap = await getDoc(studentRef)
          const cur = snap.exists() ? (snap.data() as any) : {}
          const badgesArr: string[] = Array.isArray(cur.badges) ? cur.badges : []
          const toAdd = ['download-master', 'grade-champion', 'knowledge-collector']
          const merged = Array.from(new Set([...badgesArr, ...toAdd]))
          await setDoc(studentRef, { badges: merged }, { merge: true })
          
          // Queue badge popups
          queueBadge(describeBadge('download-master'))
          queueBadge(describeBadge('grade-champion'))
          queueBadge(describeBadge('knowledge-collector'))
        } catch (e) {
          console.error('Failed to award badges', e)
        }
      }
    } catch (e) {
      console.error('Failed to update download progress', e)
    }
    
    // Add to download history
    const newDownload = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      grade,
      chapter,
      type,
      title: `Chapter ${chapter} - ${chapterTitles[chapter] || 'Untitled'}`
    }
    
    const updatedHistory = [newDownload, ...downloadHistory.slice(0, 9)] // Keep last 10
    setDownloadHistory(updatedHistory)
    
    // Save to localStorage
    if (currentUser.uid) {
      localStorage.setItem(`downloadHistory_${currentUser.uid}`, JSON.stringify(updatedHistory))
    }
    
    // Trigger download
    const link = document.createElement('a')
    link.href = driveDirectDownloadUrl(url)
    link.download = `grade${grade}_chapter${chapter}.${type}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getProgress = () => {
    if (!driveData) return 0
    let downloaded = 0
    for (let i = 1; i <= 3; i++) {
      const chapter = driveData[i as keyof DriveGradeEntry]
      if (chapter && (chapter.pdf || chapter.zip)) {
        downloaded++
      }
    }
    return downloaded
  }

  const progress = getProgress()
  const progressPercentage = Math.round((progress / 3) * 100)

  return (
    <div className="space-y-8">
      {/* Level Up Notification */}
      {showLevelUp && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-4 shadow-xl animate-bounce-slow">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🎉</span>
              <div>
                <div className="font-bold text-lg">Level Up!</div>
                <div className="text-sm">You reached level {levelUpDetails.to}!</div>
              </div>
              <button 
                onClick={() => setShowLevelUp(false)}
                className="ml-4 text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header with personalized greeting and XP display */}
      <div className="text-center space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">📚 Study Materials</h1>
          <p className="text-lg md:text-xl opacity-90">
            Welcome, {profile?.name || 'Student'}! Here are your Grade {grade} Downloads
          </p>
          
          {/* XP and Level Display */}
          {gamification && (
            <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Level {gamification.level}</span>
                <span className="font-semibold">{gamification.xp} XP</span>
              </div>
              <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-1000 animate-shimmer"
                  style={{ 
                    width: `${((gamification.xp - (LEVEL_XP_THRESHOLDS[gamification.level-1] || 0)) / 
                              ((LEVEL_XP_THRESHOLDS[gamification.level] || LEVEL_XP_THRESHOLDS[gamification.level-1] + 100) - (LEVEL_XP_THRESHOLDS[gamification.level-1] || 0))) * 100}%` 
                  }}
                ></div>
              </div>
              <div className="mt-2 text-xs opacity-80">
                {gamification.xp - (LEVEL_XP_THRESHOLDS[gamification.level-1] || 0)} / 
                {(LEVEL_XP_THRESHOLDS[gamification.level] || LEVEL_XP_THRESHOLDS[gamification.level-1] + 100) - (LEVEL_XP_THRESHOLDS[gamification.level-1] || 0)} XP to next level
              </div>
              
              {/* Streak Display */}
              {gamification.streakDays > 0 && (
                <div className="mt-3 flex items-center justify-center text-sm">
                  <span className="mr-1">🔥</span>
                  <span>{gamification.streakDays} day streak!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Grade Selector */}
      <div className="flex justify-center animate-fade-in">
        <div className="inline-flex flex-wrap justify-center rounded-xl border border-gray-200 dark:border-slate-700 p-2 bg-white dark:bg-slate-800 shadow-md">
          {availableGrades.map((g) => (
            <button
              key={g}
              className={`m-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 ${
                grade === g
                  ? `bg-gradient-to-r ${gradeGradients[g]} text-white shadow-lg`
                  : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
              onClick={() => setGrade(g)}
            >
              Grade {g}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto animate-fade-in">
        <div className="flex justify-between text-sm text-gray-600 dark:text-slate-400 mb-2">
          <span>Chapter Progress</span>
          <span>{progress}/3 chapters</span>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
          <div 
            className={`h-full bg-gradient-to-r ${gradeGradients[grade]} rounded-full transition-all duration-1000 ${progress > 0 ? 'animate-shimmer' : ''}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="mt-2 text-center text-xs text-gray-500 dark:text-slate-400">
          Download all 3 chapters to earn badges!
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Chapter Cards */}
      {!loading && driveData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((chapter) => (
            <ChapterCard
              key={chapter}
              chapter={chapter}
              title={chapterTitles[chapter] || `Chapter ${chapter}`}
              data={driveData[chapter as keyof DriveGradeEntry]}
              onPreview={handlePreview}
              onDownload={handleDownload}
              isUnlocked={quizUnlocked[chapter as keyof typeof quizUnlocked]}
              grade={grade}
            />
          ))}
        </div>
      )}

      {/* No Data State */}
      {!loading && !driveData && (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-7xl mb-6">📚</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No Materials Available</h3>
          <p className="text-gray-600 dark:text-slate-400 max-w-md mx-auto">
            No study materials have been uploaded for Grade {grade} yet. Check back later!
          </p>
        </div>
      )}

      {/* Download History */}
      {downloadHistory.length > 0 && (
        <div className="mt-12 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="mr-3">🕒</span> Your Downloads
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg">
            <ul className="divide-y divide-gray-200 dark:divide-slate-700">
              {downloadHistory.map((download) => (
                <li 
                  key={download.id} 
                  className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white flex items-center">
                        {download.title}
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          Grade {download.grade}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500 dark:text-slate-400 flex items-center flex-wrap">
                        <span className="mr-3">Chapter {download.chapter}</span>
                        <span className="mr-3">•</span>
                        <span className="mr-3">{download.type.toUpperCase()}</span>
                        <span className="mr-3">•</span>
                        <span 
                          className="group-hover:hidden"
                          title={formatDetailedTime(download.timestamp)}
                        >
                          {formatRelativeTime(download.timestamp)}
                        </span>
                        <span 
                          className="hidden group-hover:inline"
                          title={formatRelativeTime(download.timestamp)}
                        >
                          {formatDetailedTime(download.timestamp)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        download.type === 'pdf' 
                          ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' 
                          : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                      }`}>
                        {download.type === 'pdf' ? '📄 PDF' : '📦 ZIP'}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {previewUrl && (
        <PdfPreviewModal 
          url={previewUrl} 
          onClose={() => setPreviewUrl(null)} 
        />
      )}
    </div>
  )
}