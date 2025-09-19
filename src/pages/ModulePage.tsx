import { useParams, useNavigate, Link } from 'react-router-dom'
import { getLessonById } from '../data/courseData'
import { SectionCard } from '../components/SectionCard'
import { motion } from 'framer-motion'
import { seedNumberSystemLesson } from '../data/numberSystemSeed'
import { useState } from 'react'

export function ModulePage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const [seedLoading, setSeedLoading] = useState(false)
  const [seedResult, setSeedResult] = useState<string | null>(null)
  
  const lesson = lessonId ? getLessonById(lessonId) : null
  
  const handleSeedData = async () => {
    setSeedLoading(true)
    setSeedResult(null)
    
    try {
      const result = await seedNumberSystemLesson()
      
      if (result.success) {
        setSeedResult(`✅ Successfully seeded ${result.sectionsAdded} sections and ${result.mcqsAdded} MCQs!`)
      } else {
        setSeedResult(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      setSeedResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSeedLoading(false)
    }
  }
  
  if (!lesson) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Lesson Not Found</h2>
        <p className="text-gray-600 dark:text-slate-400 mb-6">
          The lesson you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/courses"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          ← Back to Courses
        </Link>
      </div>
    )
  }

  const handleMCQClick = () => {
    navigate(`/mcq/${lessonId}`)
  }

  const handleMaterialsClick = () => {
    navigate(`/materials/${lessonId}`)
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-slate-400">
        <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Courses</Link>
        <span>→</span>
        <button onClick={() => navigate(-1)} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Lessons
        </button>
        <span>→</span>
        <span className="font-medium">{lesson.title}</span>
      </div>

      {/* Lesson Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
          <span className="text-3xl text-white">📚</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{lesson.title}</h1>
        {lesson.description && (
          <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            {lesson.description}
          </p>
        )}
        {lesson.duration && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            🕒 {lesson.duration}
          </div>
        )}
      </div>

      {/* Lesson Content Options */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          Choose Your Learning Mode
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* MCQs Button */}
          <SectionCard title="📝 Practice MCQs">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-slate-400">
                Test your understanding with multiple choice questions
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Interactive quizzes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Instant feedback</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Track your score</span>
                </div>
              </div>
              <button
                onClick={handleMCQClick}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                Start MCQ Test →
              </button>
            </div>
          </SectionCard>

          {/* Lesson Materials Button */}
          <SectionCard title="📖 Study Materials">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-slate-400">
                Access comprehensive study materials and resources
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Detailed notes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>PDF resources</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Visual aids</span>
                </div>
              </div>
              <button
                onClick={handleMaterialsClick}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                Access Materials →
              </button>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Firebase Learning Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto mt-8"
      >
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
              🔥 New: Firebase-Powered Learning System
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Experience our new interactive learning platform with real-time progress tracking
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Demo Lesson Card - Number System */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl text-white">🔢</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Number System</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mathematics • Grade 6 • Interactive Lesson</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">8 Interactive Sections</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">21 Practice MCQs</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">Real-time Progress Tracking</span>
                </div>
              </div>

              <motion.button
                onClick={() => navigate('/lesson-detail/mathematics/number-system')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xl">🚀</span>
                Try Number System
              </motion.button>
            </div>

            {/* New Lesson Card - Integers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl text-white">➖➕</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Integers</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mathematics • Grade 7 • Interactive Lesson</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">6 Interactive Sections</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">15 Practice MCQs</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">4-Option MCQs</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">Number Line & Operations</span>
                </div>
              </div>

              <motion.button
                onClick={() => navigate('/lesson-detail/mathematics/integers')}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xl">🚀</span>
                Try Integers Lesson
              </motion.button>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              🌱 Seed Lesson Data
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Click to populate the Firestore database with Number System lesson content.
            </p>
            
            <motion.button
              onClick={handleSeedData}
              disabled={seedLoading}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 mb-4"
              whileHover={!seedLoading ? { scale: 1.05 } : {}}
              whileTap={!seedLoading ? { scale: 0.95 } : {}}
            >
              {seedLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Seeding...
                </>
              ) : (
                <>
                  🌱 Seed Data
                </>
              )}
            </motion.button>
            
            {seedResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <p className="text-sm text-gray-900 dark:text-white">{seedResult}</p>
              </motion.div>
            )}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">How to get started:</h4>
                <ol className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                  <li>1. Click "🌱 Seed Data" to populate the database with lesson content</li>
                  <li>2. Click "🚀 Try Demo Lesson" to experience the interactive learning system</li>
                  <li>3. Navigate through sections and answer MCQs to see real-time progress tracking</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Learning Tips */}
      <div className="max-w-2xl mx-auto mt-8">
        <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">💡</span>
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Learning Tip</h3>
          </div>
          <p className="text-yellow-700 dark:text-yellow-400 text-sm">
            Try both lessons to see the difference between Grade 6 (3-option MCQs) and Grade 7 (4-option MCQs). 
            Both lessons feature interactive content and real-time progress tracking!
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          ← Back to Lessons
        </button>
      </div>
    </div>
  )
}

export default ModulePage