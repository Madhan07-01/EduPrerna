import { useParams, useNavigate, Link } from 'react-router-dom'
import { getLessonById } from '../data/courseData'
import { SectionCard } from '../components/SectionCard'
import { useTranslation } from 'react-i18next'

export function MaterialsPage() {
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
        <span className="font-medium">{t('studyMaterials', { defaultValue: 'Study Materials' })}</span>
      </div>

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
          <span className="text-3xl text-white">📖</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('studyMaterials', { defaultValue: 'Study Materials' })}</h1>
        <p className="text-lg text-gray-600 dark:text-slate-400">
          {lesson.title}
        </p>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
          📚 {t('materials.learningResources', { defaultValue: 'Learning Resources' })}
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="max-w-4xl mx-auto">
        <SectionCard title={`🚧 ${t('materials.underDevelopment', { defaultValue: 'Study Materials Under Development' })}`}>
          <div className="space-y-6 text-center">
            <div className="text-6xl">📚</div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('materials.comingSoonTitle', { defaultValue: 'Comprehensive Study Materials Coming Soon!' })}</h3>
              <p className="text-gray-600 dark:text-slate-400">
                {t('materials.comingSoonDesc', { defaultValue: "We're preparing detailed study materials for {{title}} to enhance your learning experience.", title: lesson.title })}
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-600 dark:text-blue-400">📄</span>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300">{t('materials.feature.pdfNotes', { defaultValue: 'PDF Notes' })}</h4>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  {t('materials.feature.pdfNotesDesc', { defaultValue: 'Downloadable comprehensive notes and summaries' })}
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-600 dark:text-green-400">🎥</span>
                  <h4 className="font-semibold text-green-800 dark:text-green-300">{t('materials.feature.videos', { defaultValue: 'Video Tutorials' })}</h4>
                </div>
                <p className="text-sm text-green-700 dark:text-green-400">
                  {t('materials.feature.videosDesc', { defaultValue: 'Interactive video lessons and demonstrations' })}
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-purple-600 dark:text-purple-400">📊</span>
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300">{t('materials.feature.diagrams', { defaultValue: 'Diagrams & Charts' })}</h4>
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-400">
                  {t('materials.feature.diagramsDesc', { defaultValue: 'Visual learning aids and infographics' })}
                </p>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-orange-600 dark:text-orange-400">🔬</span>
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300">{t('materials.feature.simulations', { defaultValue: 'Interactive Simulations' })}</h4>
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-400">
                  {t('materials.feature.simulationsDesc', { defaultValue: 'Virtual labs and interactive experiments' })}
                </p>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-red-600 dark:text-red-400">📝</span>
                  <h4 className="font-semibold text-red-800 dark:text-red-300">{t('materials.feature.worksheets', { defaultValue: 'Practice Worksheets' })}</h4>
                </div>
                <p className="text-sm text-red-700 dark:text-red-400">
                  {t('materials.feature.worksheetsDesc', { defaultValue: 'Printable worksheets and exercises' })}
                </p>
              </div>

              <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-teal-600 dark:text-teal-400">💾</span>
                  <h4 className="font-semibold text-teal-800 dark:text-teal-300">{t('materials.feature.offline', { defaultValue: 'Offline Access' })}</h4>
                </div>
                <p className="text-sm text-teal-700 dark:text-teal-400">
                  {t('materials.feature.offlineDesc', { defaultValue: 'Download materials for offline study' })}
                </p>
              </div>
            </div>

            {/* Placeholder Material Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="p-6 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
                <div className="text-4xl mb-3">🔒</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('materials.category.notes', { defaultValue: 'Lesson Notes' })}</h4>
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
                  {t('materials.category.notesDesc', { defaultValue: 'Detailed explanations and key concepts' })}
                </p>
                <button
                  disabled
                  className="w-full py-2 bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-400 rounded-lg cursor-not-allowed"
                >
                  {t('materials.category.comingSoon', { defaultValue: 'Coming Soon' })}
                </button>
              </div>

              <div className="p-6 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
                <div className="text-4xl mb-3">🔒</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('materials.category.reference', { defaultValue: 'Reference Materials' })}</h4>
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
                  {t('materials.category.referenceDesc', { defaultValue: 'Additional resources and external links' })}
                </p>
                <button
                  disabled
                  className="w-full py-2 bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-400 rounded-lg cursor-not-allowed"
                >
                  {t('materials.category.comingSoon', { defaultValue: 'Coming Soon' })}
                </button>
              </div>
            </div>

            {/* Development Timeline */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🚀</span>
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">{t('materials.timeline.title', { defaultValue: 'Development Progress' })}</h4>
              </div>
              <div className="space-y-2 text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 dark:text-green-400">✅</span>
                  <span className="text-sm text-blue-700 dark:text-blue-400">{t('materials.timeline.platform', { defaultValue: 'Platform structure completed' })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-600 dark:text-yellow-400">🔄</span>
                  <span className="text-sm text-blue-700 dark:text-blue-400">{t('materials.timeline.content', { defaultValue: 'Content creation in progress' })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">⏳</span>
                  <span className="text-sm text-blue-700 dark:text-blue-400">{t('materials.timeline.review', { defaultValue: 'Quality review and testing pending' })}</span>
                </div>
              </div>
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
          ← {t('materials.backToModule', { defaultValue: 'Back to Module' })}
        </button>
        <Link
          to={`/mcq/${lessonId}`}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          {t('materials.tryMcq', { defaultValue: 'Try MCQ Practice' })} →
        </Link>
      </div>
    </div>
  )
}

export default MaterialsPage