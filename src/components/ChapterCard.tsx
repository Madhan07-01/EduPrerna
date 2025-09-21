import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ChapterEntry } from '../data/driveFiles'

interface ChapterCardProps {
  chapter: number
  title: string
  data?: ChapterEntry
  onPreview: (url: string) => void
  onDownload: (chapter: number, type: 'pdf' | 'zip') => void
  isUnlocked: boolean
  grade: number
}

export default function ChapterCard({ 
  chapter, 
  title, 
  data, 
  onPreview, 
  onDownload,
  isUnlocked,
  grade
}: ChapterCardProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isDownloading, setIsDownloading] = useState<{[key: string]: boolean}>({ pdf: false, zip: false })
  const navigate = useNavigate()

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

  // Show confetti animation when chapter is unlocked
  useEffect(() => {
    if (isUnlocked) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isUnlocked])

  const handleDownloadClick = async (type: 'pdf' | 'zip') => {
    setIsDownloading(prev => ({ ...prev, [type]: true }))
    
    try {
      await onDownload(chapter, type)
      
      // Show quest prompt after download
      setTimeout(() => {
        const shouldShowPrompt = Math.random() > 0.7 // 30% chance to show prompt
        if (shouldShowPrompt && window.confirm("Want to test yourself? Take the Quiz →")) {
          // Navigate to quiz page (assuming Mathematics subject for now)
          navigate(`/quiz/Mathematics/${grade}/${chapter}`)
        }
      }, 1500)
    } finally {
      setIsDownloading(prev => ({ ...prev, [type]: false }))
    }
  }

  if (!isUnlocked) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Chapter {chapter}</h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-200 animate-pulse">
              🔒 Locked
            </span>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">{title}</h4>
          <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-slate-700 rounded-xl">
            <span className="text-5xl">🔒</span>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400 text-center">
            Complete previous chapter to unlock
          </p>
        </div>
      </div>
    )
  }

  // If no data, show empty state
  if (!data || (!data.pdf && !data.zip)) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Chapter {chapter}</h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
              🚧 Coming Soon
            </span>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">{title}</h4>
          <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-slate-700 rounded-xl">
            <span className="text-5xl">⏳</span>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-slate-400 text-center">
            Materials not available yet
          </p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Confetti effect when unlocked */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${Math.random() * 15 + 15}px`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            >
              {['🎉', '🎊', '✨', '⭐', '🌟'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg">Chapter {chapter}</h3>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 animate-pulse-slow">
            ✅ Ready
          </span>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">{title}</h4>
        
        {/* Subject-themed gradient background */}
        <div className="relative h-40 rounded-xl mb-5 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${gradeGradients[grade] || 'from-blue-400 to-purple-500'} transition-transform duration-700 ${isHovered ? 'scale-110' : ''}`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl text-white drop-shadow-lg">📚</span>
          </div>
          {isHovered && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Download Now!</span>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {data.pdf && (
            <>
              <button
                onClick={() => onPreview(data.pdf!)}
                className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 transition-all transform hover:scale-105 shadow-sm"
                title="Preview PDF"
                disabled={isDownloading.pdf}
              >
                <span className="text-lg">👀</span>
                <span className="ml-2">Preview</span>
              </button>
              <button
                onClick={() => handleDownloadClick('pdf')}
                className="inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all transform hover:scale-105 shadow-md animate-pulse-slow"
                title="Download PDF"
                disabled={isDownloading.pdf}
              >
                {isDownloading.pdf ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">⏳</span>
                    Downloading...
                  </span>
                ) : (
                  <>
                    <span className="text-lg">📄</span>
                    <span className="ml-2">PDF</span>
                  </>
                )}
              </button>
            </>
          )}
          
          {data.zip && (
            <button
              onClick={() => handleDownloadClick('zip')}
              className="inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-all transform hover:scale-105 shadow-md animate-pulse-slow"
              title="Download ZIP"
              disabled={isDownloading.zip}
            >
              {isDownloading.zip ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Downloading...
                </span>
              ) : (
                <>
                  <span className="text-lg">📦</span>
                  <span className="ml-2">ZIP</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}