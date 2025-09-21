import { useParams, Link, useNavigate } from 'react-router-dom'
import { getLessonsForSubjectAndGrade, type Subject, type Grade } from '../data/lessonsData'
import { SectionCard } from '../components/SectionCard'
import { useTranslation } from 'react-i18next'

export function LessonsPage() {
  const { subject, grade } = useParams<{ subject: string; grade: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  // Parse URL params
  const subjectParam = subject as Subject
  const gradeParam = parseInt(grade || '6') as Grade
  
  // Get lessons for this subject and grade
  const lessons = getLessonsForSubjectAndGrade(subjectParam, gradeParam)
  
  const handleLessonClick = (lessonIndex: number) => {
    navigate(`/lesson/${subjectParam}/${gradeParam}/${lessonIndex + 1}`)
  }

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
  
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-slate-400">
        <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.courses', { defaultValue: 'Courses' })}</Link>
        <span>→</span>
        <span className="font-medium">{formatSubjectName(subjectParam)} - {t('grade', { defaultValue: 'Grade' })} {grade}</span>
      </div>
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className={`inline-block p-6 rounded-2xl bg-gradient-to-br ${getSubjectColor(subjectParam)} text-white mb-4`}>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-5xl">{getSubjectIcon(subjectParam)}</span>
            <div className="text-left">
              <h1 className="text-3xl font-bold">{formatSubjectName(subjectParam)}</h1>
              <p className="text-xl opacity-90">{t('lessons.gradeLessons', { defaultValue: 'Grade {{grade}} Lessons', grade })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            📚 {t('lessons.available', { defaultValue: 'Available Lessons' })} ({lessons.length})
          </h2>
          <div className="text-sm text-gray-500 dark:text-slate-400">
            {t('lessons.clickToStart', { defaultValue: 'Click any lesson to start learning' })}
          </div>
        </div>
        
        {lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className="group cursor-pointer transform transition-all duration-200 hover:scale-[1.02]" 
                onClick={() => handleLessonClick(index)}
              >
                <SectionCard title={`${index + 1}. ${lesson}`}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        📚 {t('lesson', { defaultValue: 'Lesson' })} {index + 1}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        🎥 {t('lessons.interactive', { defaultValue: 'Interactive' })}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center gap-2">
                      <div className="text-xs text-gray-500 dark:text-slate-400">
                        {formatSubjectName(subjectParam)} • {t('grade', { defaultValue: 'Grade' })} {grade}
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (subjectParam === 'Mathematics' && gradeParam === 6) {
                              if (index === 0) navigate('/module/math-g6-number-system')
                              else if (index === 1) navigate('/module/math-g6-operations-whole-numbers')
                              else if (index === 2) navigate('/module/math-g6-integers')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'ComputerScience' && gradeParam === 6) {
                              if (index === 0) navigate('/module/cs-g6-categories-computers-languages')
                              else if (index === 1) navigate('/module/cs-g6-file-management')
                              else if (index === 2) navigate('/module/cs-g6-word-processor-tables')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Chemistry' && gradeParam === 6) {
                              if (index === 0) navigate('/module/chem-g6-intro-chemistry')
                              else if (index === 1) navigate('/module/chem-g6-matter-properties')
                              else if (index === 2) navigate('/module/chem-g6-atoms-molecules')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Biology' && gradeParam === 6) {
                              if (index === 0) navigate('/module/bio-g6-living-nonliving')
                              else if (index === 1) navigate('/module/bio-g6-plants-animals')
                              else if (index === 2) navigate('/module/bio-g6-our-body-health')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Mathematics' && gradeParam === 7) {
                              if (index === 0) navigate('/module/math-g7-integers')
                              else if (index === 1) navigate('/module/math-g7-fractions-decimals')
                              else if (index === 2) navigate('/module/math-g7-data-handling')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'ComputerScience' && gradeParam === 7) {
                              if (index === 0) navigate('/module/cs-g7-programming-languages')
                              else if (index === 1) navigate('/module/cs-g7-word-editing')
                              else if (index === 2) navigate('/module/cs-g7-powerpoint')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Physics' && gradeParam === 7) {
                              if (index === 0) navigate('/module/phy-g7-motion-time')
                              else if (index === 1) navigate('/module/phy-g7-electric-current-circuits')
                              else if (index === 2) navigate('/module/phy-g7-heat')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Biology' && gradeParam === 7) {
                              if (index === 0) navigate('/module/bio-g7-life-processes')
                              else if (index === 1) navigate('/module/bio-g7-nutrition-animals-plants')
                              else if (index === 2) navigate('/module/bio-g7-respiration-circulation')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Mathematics' && gradeParam === 8) {
                              if (index === 0) navigate('/module/math-g8-rational-numbers')
                              else if (index === 1) navigate('/module/math-g8-linear-equations')
                              else if (index === 2) navigate('/module/math-g8-understanding-quadrilaterals')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'ComputerScience' && gradeParam === 8) {
                              if (index === 0) navigate('/module/cs-g8-intro-computer-language')
                              else if (index === 1) navigate('/module/cs-g8-intro-database')
                              else if (index === 2) navigate('/module/cs-g8-ms-access-dbms')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Physics' && gradeParam === 8) {
                              if (index === 0) navigate('/module/phy-g8-force-pressure')
                              else if (index === 1) navigate('/module/phy-g8-friction')
                              else if (index === 2) navigate('/module/phy-g8-sound')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Biology' && gradeParam === 8) {
                              if (index === 0) navigate('/module/bio-g8-cell-structure-function')
                              else if (index === 1) navigate('/module/bio-g8-tissues')
                              else if (index === 2) navigate('/module/bio-g8-movement-locomotion')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Mathematics' && gradeParam === 9) {
                              if (index === 0) navigate('/module/math-g9-number-systems')
                              else if (index === 1) navigate('/module/math-g9-polynomials')
                              else if (index === 2) navigate('/module/math-g9-coordinate-geometry')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'ComputerScience' && gradeParam === 9) {
                              if (index === 0) navigate('/module/cs-g9-basics-it')
                              else if (index === 1) navigate('/module/cs-g9-cyber-safety')
                              else if (index === 2) navigate('/module/cs-g9-office-tools')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Mathematics' && gradeParam === 10) {
                              if (index === 0) navigate('/module/math-g10-real-numbers')
                              else if (index === 1) navigate('/module/math-g10-polynomials')
                              else if (index === 2) navigate('/module/math-g10-pair-linear-equations')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Mathematics' && gradeParam === 11) {
                              if (index === 0) navigate('/module/math-g11-sets')
                              else if (index === 1) navigate('/module/math-g11-relations-functions')
                              else if (index === 2) navigate('/module/math-g11-trigonometric-functions')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Mathematics' && gradeParam === 12) {
                              if (index === 0) navigate('/module/math-g12-relations-functions')
                              else if (index === 1) navigate('/module/math-g12-inverse-trigonometric-functions')
                              else if (index === 2) navigate('/module/math-g12-matrices')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'ComputerScience' && gradeParam === 11) {
                              if (index === 0) navigate('/module/cs-g11-computer-fundamentals')
                              else if (index === 1) navigate('/module/cs-g11-programming-methodology-python')
                              else if (index === 2) navigate('/module/cs-g11-intro-cpp')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Chemistry' && gradeParam === 11) {
                              if (index === 0) navigate('/module/chem-g11-some-basic-concepts')
                              else if (index === 1) navigate('/module/chem-g11-structure-of-atom')
                              else if (index === 2) navigate('/module/chem-g11-classification-periodicity')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'ComputerScience' && gradeParam === 12) {
                              if (index === 0) navigate('/module/cs-g12-advanced-programming')
                              else if (index === 1) navigate('/module/cs-g12-data-structures-algorithms')
                              else if (index === 2) navigate('/module/cs-g12-dbms-sql')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Physics' && gradeParam === 12) {
                              if (index === 0) navigate('/module/phy-g12-electrostatics')
                              else if (index === 1) navigate('/module/phy-g12-current-electricity')
                              else if (index === 2) navigate('/module/phy-g12-magnetic-effects')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Chemistry' && gradeParam === 12) {
                              if (index === 0) navigate('/module/chem-g12-solid-state')
                              else if (index === 1) navigate('/module/chem-g12-solutions')
                              else if (index === 2) navigate('/module/chem-g12-electrochemistry')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Biology' && gradeParam === 12) {
                              if (index === 0) navigate('/module/bio-g12-reproduction')
                              else if (index === 1) navigate('/module/bio-g12-genetics-evolution')
                              else if (index === 2) navigate('/module/bio-g12-biology-human-welfare')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Physics' && gradeParam === 10) {
                              if (index === 0) navigate('/module/phy-g10-light-reflection-refraction')
                              else if (index === 1) navigate('/module/phy-g10-human-eye-colourful-world')
                              else if (index === 2) navigate('/module/phy-g10-electricity')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Physics' && gradeParam === 9) {
                              if (index === 0) navigate('/module/phy-g9-motion')
                              else if (index === 1) navigate('/module/phy-g9-force-laws')
                              else if (index === 2) navigate('/module/phy-g9-gravitation')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'ComputerScience' && gradeParam === 10) {
                              if (index === 0) navigate('/module/cs-g10-intro-programming')
                              else if (index === 1) navigate('/module/cs-g10-office-automation')
                              else if (index === 2) navigate('/module/cs-g10-internet-network-basics')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Biology' && gradeParam === 10) {
                              if (index === 0) navigate('/module/bio-g10-life-processes')
                              else if (index === 1) navigate('/module/bio-g10-control-coordination')
                              else if (index === 2) navigate('/module/bio-g10-heredity-evolution')
                              else handleLessonClick(index)
                            } else if (subjectParam === 'Biology' && gradeParam === 9) {
                              if (index === 0) navigate('/module/bio-g9-cell-theory')
                              else if (index === 1) navigate('/module/bio-g9-plant-animal-cells')
                              else if (index === 2) navigate('/module/bio-g9-diversity-organisms')
                              else handleLessonClick(index)
                            } else handleLessonClick(index)
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 group-hover:shadow-lg"
                        >
                          {t('startLesson', { defaultValue: 'Start Lesson' })} →
                        </button>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('lessons.comingSoon', { defaultValue: 'Coming Soon!' })}
            </h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6">
              {t('lessons.preparing', { defaultValue: '{{subject}} lessons for Grade {{grade}} are being prepared.', subject: formatSubjectName(subjectParam), grade })}
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              ← {t('lessons.backToCourses', { defaultValue: 'Back to Courses' })}
            </Link>
          </div>
        )}
      </div>

      {/* Progress Info */}
      {lessons.length > 0 && (
        <div className="mt-8">
          <div className={`p-6 rounded-2xl bg-gradient-to-r ${getSubjectColor(subjectParam)} text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">🎓</span>
                <div>
                  <h3 className="text-xl font-bold">{t('lessons.yourLearningPath', { defaultValue: 'Your Learning Path' })}</h3>
                  <p className="opacity-90">
                    {t('lessons.completeAll', { defaultValue: 'Complete all {{count}} lessons to master {{subject}} Grade {{grade}}', count: lessons.length, subject: formatSubjectName(subjectParam), grade })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{lessons.length}</div>
                <div className="text-sm opacity-90">{t('lessons.totalLessons', { defaultValue: 'Total Lessons' })}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Learning Tips */}
      <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-2xl">💡</span>
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">{t('lessons.learningTips', { defaultValue: 'Learning Tips' })}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700 dark:text-yellow-400">
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">✓</span>
            <span>{t('lessons.tip.order', { defaultValue: 'Take lessons in order for best understanding' })}</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">✓</span>
            <span>{t('lessons.tip.mcq', { defaultValue: 'Practice MCQs after each lesson' })}</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">✓</span>
            <span>{t('lessons.tip.review', { defaultValue: 'Review study materials for better retention' })}</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">✓</span>
            <span>{t('lessons.tip.breaks', { defaultValue: 'Take breaks between lessons to absorb concepts' })}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonsPage