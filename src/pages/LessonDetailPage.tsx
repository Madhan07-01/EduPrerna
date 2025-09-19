import { useParams, Link } from 'react-router-dom'
import { getLessonsForSubjectAndGrade, type Subject, type Grade } from '../data/lessonsData'
import { SectionCard } from '../components/SectionCard'

export function LessonDetailPage() {
  const { subject, grade, lesson } = useParams<{ subject: string; grade: string; lesson: string }>()
  
  // Parse URL params
  const subjectParam = subject as Subject
  const gradeParam = parseInt(grade || '6') as Grade
  const lessonIndex = parseInt(lesson || '1') - 1
  
  // Get lessons for this subject and grade
  const lessons = getLessonsForSubjectAndGrade(subjectParam, gradeParam)
  const currentLesson = lessons[lessonIndex]

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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Lesson Not Found</h2>
        <p className="text-gray-600 dark:text-slate-400 mb-6">
          The lesson you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to={`/lessons/${subjectParam}/${gradeParam}`}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          ← Back to Lessons
        </Link>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-slate-400">
        <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Courses</Link>
        <span>→</span>
        <Link to={`/lessons/${subjectParam}/${gradeParam}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {formatSubjectName(subjectParam)} Grade {gradeParam}
        </Link>
        <span>→</span>
        <span className="font-medium">Lesson {lesson}</span>
      </div>
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className={`inline-block p-6 rounded-2xl bg-gradient-to-br ${getSubjectColor(subjectParam)} text-white mb-4`}>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-4xl">{getSubjectIcon(subjectParam)}</span>
            <div className="text-left">
              <h1 className="text-2xl font-bold">{currentLesson}</h1>
              <p className="text-lg opacity-90">{formatSubjectName(subjectParam)} • Grade {gradeParam} • Lesson {lesson}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <SectionCard title="🚧 Lesson Content Coming Soon">
          <div className="space-y-6 text-center">
            <div className="text-8xl">📋</div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Lesson: {currentLesson}
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-400">
                MCQs & Lesson Materials coming soon.
              </p>
            </div>

            {/* Feature Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">📝</span>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300">MCQ Practice</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600 dark:text-blue-400">✓</span>
                    <span>Interactive multiple choice questions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600 dark:text-blue-400">✓</span>
                    <span>Instant feedback and explanations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-600 dark:text-blue-400">✓</span>
                    <span>Progress tracking and scoring</span>
                  </li>
                </ul>
                <button
                  disabled
                  className="w-full mt-4 py-2 bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-400 rounded-lg cursor-not-allowed"
                >
                  🔒 Coming Soon
                </button>
              </div>

              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">📚</span>
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-300">Study Materials</h3>
                </div>
                <ul className="space-y-2 text-sm text-green-700 dark:text-green-400">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Comprehensive lesson notes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>PDF downloads and references</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Visual aids and diagrams</span>
                  </li>
                </ul>
                <button
                  disabled
                  className="w-full mt-4 py-2 bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-400 rounded-lg cursor-not-allowed"
                >
                  🔒 Coming Soon
                </button>
              </div>
            </div>

            {/* Development Status */}
            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🛠️</span>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Development In Progress</h3>
              </div>
              <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                We're actively working on creating interactive content for <strong>{currentLesson}</strong>. 
                This will include detailed explanations, practice questions, and comprehensive study materials.
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
          ← Back to Lessons
        </Link>
        
        <div className="flex space-x-3">
          {lessonIndex > 0 && (
            <Link
              to={`/lesson/${subjectParam}/${gradeParam}/${lessonIndex}`}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              ← Previous
            </Link>
          )}
          {lessonIndex < lessons.length - 1 && (
            <Link
              to={`/lesson/${subjectParam}/${gradeParam}/${lessonIndex + 2}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default LessonDetailPage