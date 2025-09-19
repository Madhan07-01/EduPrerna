import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export function LessonDetailPage() {
  const { subject, grade, lesson } = useParams()
  const navigate = useNavigate()
  
  // Check if this is the Number System lesson and redirect to the special component
  useEffect(() => {
    if (subject === 'Mathematics' && grade === '6' && lesson === '1') {
      navigate('/lesson-detail/mathematics/number-system', { replace: true })
      return
    }
  }, [subject, grade, lesson, navigate])

  // For other lessons, show a placeholder
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md mx-auto p-6">
        <div className="text-6xl">🚧</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lesson Coming Soon</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This lesson is currently being prepared. For now, try our interactive Number System lesson!
        </p>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/lesson-detail/mathematics/number-system')}
            className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            🔢 Try Number System Lesson
          </button>
          <button
            onClick={() => navigate('/courses')}
            className="block w-full px-6 py-3 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    </div>
  )
}

export default LessonDetailPage