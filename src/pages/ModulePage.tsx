import { useParams, useNavigate, Link } from 'react-router-dom'
import { getLessonById } from '../data/courseData'
import { SectionCard } from '../components/SectionCard'

export function ModulePage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  
  const lesson = lessonId ? getLessonById(lessonId) : null
  
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

      {/* Learning Tips */}
      <div className="max-w-2xl mx-auto mt-8">
        <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">💡</span>
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Learning Tip</h3>
          </div>
          <p className="text-yellow-700 dark:text-yellow-400 text-sm">
            For best results, start with the study materials to understand the concepts, 
            then test your knowledge with MCQs. Take breaks and review topics you find challenging.
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