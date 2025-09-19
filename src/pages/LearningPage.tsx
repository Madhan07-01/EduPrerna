import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export function LearningPage() {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()
  
  // Redirect to the NumberSystemLesson component for the number system lesson
  useEffect(() => {
    if (courseId === 'mathematics' && lessonId === 'grade6_number_system') {
      navigate('/lesson-detail/mathematics/number-system', { replace: true })
      return
    }
    
    // For other lessons that aren't implemented yet
    navigate('/courses', { replace: true })
  }, [courseId, lessonId, navigate])

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading lesson...</p>
      </div>
    </div>
  )
}

export default LearningPage