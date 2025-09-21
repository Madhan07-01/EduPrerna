import { useParams, useNavigate, Link } from 'react-router-dom'
import { getLessonById } from '../data/courseData'
import { SectionCard } from '../components/SectionCard'
import { useTranslation } from 'react-i18next'

export function MCQPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const lesson = lessonId ? getLessonById(lessonId) : null

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('lessonDetail.notFound', { defaultValue: 'Lesson Not Found' })}</h2>
        <p className="text-gray-600 dark:text-slate-400 mb-6">{t('lessonDetail.notFoundDesc', { defaultValue: "The lesson you're looking for doesn't exist or has been moved." })}</p>
        <Link
          to="/courses"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          ← {t('lessons.backToCourses', { defaultValue: 'Back to Courses' })}
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-slate-400">
        <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.courses', { defaultValue: 'Courses' })}</Link>
        <span>→</span>
        <button onClick={() => navigate(-2)} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {t('lessons.title', { defaultValue: 'Lessons' })}
        </button>
        <span>→</span>
        <button onClick={() => navigate(-1)} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {lesson.title}
        </button>
        <span>→</span>
        <span className="font-medium">{t('mcqPractice', { defaultValue: 'MCQ Practice' })}</span>
      </div>

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
          <span className="text-3xl text-white">📝</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('mcqPractice', { defaultValue: 'MCQ Practice' })}</h1>
        <p className="text-lg text-gray-600 dark:text-slate-400">
          {lesson.title}
        </p>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
          🎯 {t('mcq.quizMode', { defaultValue: 'Quiz Mode' })}
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="max-w-2xl mx-auto">
        <SectionCard title={`🚧 ${t('mcq.underDevelopment', { defaultValue: 'MCQ System Under Development' })}`}>
          <div className="space-y-6 text-center">
            <div className="text-6xl">⚠️</div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('mcq.comingSoonTitle', { defaultValue: 'MCQ Questions Coming Soon!' })}</h3>
              <p className="text-gray-600 dark:text-slate-400">
                {t('mcq.comingSoonDesc', { defaultValue: "We're working hard to bring you an interactive quiz experience for {{title}}.", title: lesson.title })}
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-600 dark:text-green-400">🎯</span>
                  <h4 className="font-semibold text-green-800 dark:text-green-300">{t('mcq.feature.mcq', { defaultValue: 'Multiple Choice Questions' })}</h4>
                </div>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Interactive MCQs with instant feedback
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-600 dark:text-blue-400">📊</span>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300">Score Tracking</h4>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-400">{t('mcq.feature.tracking', { defaultValue: 'Track your progress and performance' })}</p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-purple-600 dark:text-purple-400">⏱️</span>
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300">{t('mcq.feature.timed', { defaultValue: 'Timed Quizzes' })}</h4>
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-400">
                  Challenge yourself with time limits
                </p>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-orange-600 dark:text-orange-400">💡</span>
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300">{t('mcq.feature.explanations', { defaultValue: 'Detailed Explanations' })}</h4>
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-400">
                  Learn from detailed answer explanations
                </p>
              </div>
            </div>

            {/* Placeholder Buttons */}
            <div className="space-y-3 mt-8">
              <button
                disabled
                className="w-full py-3 bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-400 rounded-lg cursor-not-allowed"
              >
                🔒 {t('mcq.startPractice', { defaultValue: 'Start Practice Quiz (Coming Soon)' })}
              </button>
              <button
                disabled
                className="w-full py-3 bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-400 rounded-lg cursor-not-allowed"
              >
                🔒 {t('mcq.viewAttempts', { defaultValue: 'View Previous Attempts (Coming Soon)' })}
              </button>
            </div>

            {/* Timeline */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-600 dark:text-blue-400">📅</span>
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">{t('mcq.expectedRelease', { defaultValue: 'Expected Release' })}</h4>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-400">{t('mcq.expectedReleaseDesc', { defaultValue: 'MCQ functionality will be available in the next update. Stay tuned!' })}</p>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          ← {t('mcq.backToModule', { defaultValue: 'Back to Module' })}
        </button>
        <Link
          to={`/materials/${lessonId}`}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {t('mcq.tryMaterials', { defaultValue: 'Try Study Materials' })} →
        </Link>
      </div>
    </div>
  )
}

export default MCQPage