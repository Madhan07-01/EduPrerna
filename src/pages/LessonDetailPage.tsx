import { useParams, Link } from 'react-router-dom'
import { getLessonsForSubjectAndGrade, type Subject, type Grade } from '../data/lessonsData'
import { SectionCard } from '../components/SectionCard'
import { useTranslation } from 'react-i18next'

export function LessonDetailPage() {
  const { t } = useTranslation()

  const { subject, grade, lesson } = useParams<{ subject: string; grade: string; lesson: string }>()
  
  // Parse URL params
  const normalizeSubject = (s: string | undefined): Subject => {
    const raw = (s || '').trim()
    const map: Record<string, Subject> = {
      Mathematics: 'Mathematics',
      Maths: 'Mathematics',
      Math: 'Mathematics',
      Physics: 'Physics',
      Chemistry: 'Chemistry',
      Biology: 'Biology',
      ComputerScience: 'ComputerScience',
      'Computer Science': 'ComputerScience',
    }
    if (map[raw as keyof typeof map]) return map[raw as keyof typeof map]
    // Fallback: remove spaces and try again for Computer Science-like strings
    const noSpace = raw.replace(/\s+/g, '')
    if (map[noSpace as keyof typeof map]) return map[noSpace as keyof typeof map]
    return (raw as Subject) || 'Mathematics'
  }
  const subjectParam = normalizeSubject(subject)
  const gradeParam = parseInt(grade || '6') as Grade
  const lessonIndex = parseInt(lesson || '1') - 1
  
  // Get lessons for this subject and grade
  const lessons = getLessonsForSubjectAndGrade(subjectParam, gradeParam)
  const currentLesson = lessons[lessonIndex]

  // Resolve module route per subject/lesson for quick navigation
  const getModuleRoute = (subject: Subject, grade: number, index: number) => {
    switch (subject) {
      case 'Mathematics': {
        if (grade === 6) {
          if (index === 0) return '/module/math-g6-number-system'
          if (index === 1) return '/module/math-g6-operations-whole-numbers'
          if (index === 2) return '/module/math-g6-integers'
          return null
        }
        if (grade === 7) {
          if (index === 0) return '/module/math-g7-integers'
          if (index === 1) return '/module/math-g7-fractions-decimals'
          if (index === 2) return '/module/math-g7-data-handling'
          return null
        }
        if (grade === 8) {
          if (index === 0) return '/module/math-g8-rational-numbers'
          if (index === 1) return '/module/math-g8-linear-equations'
          if (index === 2) return '/module/math-g8-understanding-quadrilaterals'
          return null
        }
        if (grade === 9) {
          if (index === 0) return '/module/math-g9-number-systems'
          if (index === 1) return '/module/math-g9-polynomials'
          if (index === 2) return '/module/math-g9-coordinate-geometry'
          return null
        }
        return null
      }
      case 'ComputerScience':
        if (grade === 6) {
          if (index === 0) return '/module/cs-g6-categories-computers-languages'
          if (index === 1) return '/module/cs-g6-file-management'
          if (index === 2) return '/module/cs-g6-word-processor-tables'
          return null
        }
        if (grade === 7) {
          if (index === 0) return '/module/cs-g7-programming-languages'
          if (index === 1) return '/module/cs-g7-word-editing'
          if (index === 2) return '/module/cs-g7-powerpoint'
          return null
        }
        if (grade === 8) {
          if (index === 0) return '/module/cs-g8-intro-computer-language'
          if (index === 1) return '/module/cs-g8-intro-database'
          if (index === 2) return '/module/cs-g8-ms-access-dbms'
          return null
        }
        if (grade === 9) {
          if (index === 0) return '/module/cs-g9-basics-it'
          if (index === 1) return '/module/cs-g9-cyber-safety'
          if (index === 2) return '/module/cs-g9-office-tools'
          return null
        }
        return null
      case 'Physics':
        if (grade === 6) {
          if (index === 0) return '/module/phy-g6-measurement-motion'
          if (index === 1) return '/module/phy-g6-light-shadows-reflections'
          if (index === 2) return '/module/phy-g6-electricity-circuits'
          return null
        }
        if (grade === 7) {
          if (index === 0) return '/module/phy-g7-motion-time'
          if (index === 1) return '/module/phy-g7-electric-current-circuits'
          if (index === 2) return '/module/phy-g7-heat'
          return null
        }
        if (grade === 8) {
          if (index === 0) return '/module/phy-g8-force-pressure'
          if (index === 1) return '/module/phy-g8-friction'
          if (index === 2) return '/module/phy-g8-sound'
          return null
        }
        return null
      case 'Chemistry':
        if (grade === 6) {
          if (index === 0) return '/module/chem-g6-intro-chemistry'
          if (index === 1) return '/module/chem-g6-matter-properties'
          if (index === 2) return '/module/chem-g6-atoms-molecules'
        }
        return null
      case 'Biology':
        if (grade === 6) {
          if (index === 0) return '/module/bio-g6-living-nonliving'
          if (index === 1) return '/module/bio-g6-plants-animals'
          if (index === 2) return '/module/bio-g6-our-body-health'
          return null
        }
        if (grade === 7) {
          if (index === 0) return '/module/bio-g7-life-processes'
          if (index === 1) return '/module/bio-g7-nutrition-animals-plants'
          if (index === 2) return '/module/bio-g7-respiration-circulation'
          return null
        }
        if (grade === 8) {
          if (index === 0) return '/module/bio-g8-cell-structure-function'
          if (index === 1) return '/module/bio-g8-tissues'
          if (index === 2) return '/module/bio-g8-movement-locomotion'
          return null
        }
        if (grade === 9) {
          if (index === 0) return '/module/bio-g9-cell-theory'
          if (index === 1) return '/module/bio-g9-plant-animal-cells'
          if (index === 2) return '/module/bio-g9-diversity-organisms'
          return null
        }
        return null
      default:
        return null
    }
  }
  const moduleRoute = getModuleRoute(subjectParam, gradeParam, lessonIndex)

  const getSubjectIcon = (subject: Subject) => {
    const icons = {
      Mathematics: '🧮',
      Physics: '⚡',
      Chemistry: '🧪',
      ComputerScience: '💻',
      Biology: '🧬'
    }
    return icons[subject] || '📚'
  }

  const getSubjectColor = (subject: Subject) => {
    const colors = {
      Mathematics: 'from-blue-500 to-indigo-600',
      Physics: 'from-purple-500 to-pink-600', 
      Chemistry: 'from-green-500 to-teal-600',
      ComputerScience: 'from-gray-600 to-slate-700',
      Biology: 'from-orange-500 to-red-600'
    }
    return colors[subject] || 'from-blue-500 to-purple-600'
  }

  const formatSubjectName = (subject: Subject) => {
    return subject === 'ComputerScience' ? 'Computer Science' : subject
  }

  if (!currentLesson) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('lessonDetail.notFound', { defaultValue: 'Lesson Not Found' })}</h2>
        <p className="text-gray-600 dark:text-slate-400 mb-6">{t('lessonDetail.notFoundDesc', { defaultValue: "The lesson you're looking for doesn't exist or has been moved." })}</p>
        <Link
          to={`/lessons/${subjectParam}/${gradeParam}`}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          ← {t('backToLessons', { defaultValue: 'Back to Lessons' })}
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
        <Link to={`/lessons/${subjectParam}/${gradeParam}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {formatSubjectName(subjectParam)} {t('grade', { defaultValue: 'Grade' })} {gradeParam}
        </Link>
        <span>→</span>
        <span className="font-medium">{t('lesson', { defaultValue: 'Lesson' })} {lesson}</span>
      </div>
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className={`inline-block p-6 rounded-2xl bg-gradient-to-br ${getSubjectColor(subjectParam)} text-white mb-4`}>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-4xl">{getSubjectIcon(subjectParam)}</span>
            <div className="text-left">
              <h1 className="text-2xl font-bold">{currentLesson}</h1>
              <p className="text-lg opacity-90">{formatSubjectName(subjectParam)} • {t('grade', { defaultValue: 'Grade' })} {gradeParam} • {t('lesson', { defaultValue: 'Lesson' })} {lesson}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <SectionCard title={`🚧 ${t('lessonDetail.contentSoon', { defaultValue: 'Lesson Content Coming Soon' })}`}>
          <div className="space-y-6 text-center">
            <div className="text-8xl">📋</div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('lesson', { defaultValue: 'Lesson' })}: {currentLesson}</h2>
              <p className="text-lg text-gray-600 dark:text-slate-400">
                {t('lessonDetail.mcqMaterialsSoon', { defaultValue: 'MCQs & Lesson Materials coming soon.' })}
              </p>
            </div>

            {/* Feature Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">📝</span>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300">{t('mcqPractice', { defaultValue: 'MCQ Practice' })}</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600 dark:text-blue-400">✓</span>
                    <span>{t('lessonDetail.feature.interactiveMcq', { defaultValue: 'Interactive multiple choice questions' })}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600 dark:text-blue-400">✓</span>
                    <span>{t('lessonDetail.feature.instantFeedback', { defaultValue: 'Instant feedback and explanations' })}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600 dark:text-blue-400">✓</span>
                    <span>{t('lessonDetail.feature.progressTracking', { defaultValue: 'Progress tracking and scoring' })}</span>
                  </li>
                </ul>
                {moduleRoute ? (
                  <Link
                    to={moduleRoute}
                    className="w-full mt-4 inline-flex justify-center py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold"
                  >
                    {t('takeLesson', { defaultValue: 'Take Lesson' })}
                  </Link>
                ) : (
                  <button disabled className="w-full mt-4 py-2 bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-400 rounded-lg cursor-not-allowed">🔒 {t('comingSoon', { defaultValue: 'Coming Soon' })}</button>
                )}
              </div>

              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">📚</span>
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-300">{t('studyMaterials', { defaultValue: 'Study Materials' })}</h3>
                </div>
                <ul className="space-y-2 text-sm text-green-700 dark:text-green-400">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>{t('lessonDetail.feature.notes', { defaultValue: 'Comprehensive lesson notes' })}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>{t('lessonDetail.feature.pdf', { defaultValue: 'PDF downloads and references' })}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>{t('lessonDetail.feature.visuals', { defaultValue: 'Visual aids and diagrams' })}</span>
                  </li>
                </ul>
                {moduleRoute ? (
                  <Link
                    to={moduleRoute}
                    className="w-full mt-4 inline-flex justify-center py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-semibold"
                  >
                    {t('lessonDetail.openMaterials', { defaultValue: 'Open Study Materials' })}
                  </Link>
                ) : (
                  <button disabled className="w-full mt-4 py-2 bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-400 rounded-lg cursor-not-allowed">🔒 {t('comingSoon', { defaultValue: 'Coming Soon' })}</button>
                )}
              </div>
            </div>

            {/* Development Status */}
            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🛠️</span>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">{t('lessonDetail.devInProgress', { defaultValue: 'Development In Progress' })}</h3>
              </div>
              <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                {t('lessonDetail.devDesc', { defaultValue: "We're actively working on creating interactive content for {{lesson}}. This will include detailed explanations, practice questions, and comprehensive study materials.", lesson: currentLesson })}
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6">
        <Link
          to={`/lessons/${subjectParam}/${gradeParam}`}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          ← {t('backToLessons', { defaultValue: 'Back to Lessons' })}
        </Link>
        
        <div className="flex space-x-3">
          {lessonIndex > 0 && (
            <Link
              to={`/lesson/${subjectParam}/${gradeParam}/${lessonIndex}`}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              ← {t('lessonDetail.previous', { defaultValue: 'Previous' })}
            </Link>
          )}
          {lessonIndex < lessons.length - 1 && (
            <Link
              to={`/lesson/${subjectParam}/${gradeParam}/${lessonIndex + 2}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {t('lessonDetail.next', { defaultValue: 'Next' })} →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default LessonDetailPage