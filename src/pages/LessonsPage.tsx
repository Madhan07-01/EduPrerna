import { useParams, Link } from 'react-router-dom'
import { SectionCard } from '../components/SectionCard'

export function LessonsPage() {
  const { subject, grade } = useParams<{ subject: string; grade: string }>()
  
  // Mock lessons data - this would typically come from your store or API
  const lessons = [
    { id: 1, title: 'Introduction to Numbers', duration: '15 min', completed: true },
    { id: 2, title: 'Basic Arithmetic', duration: '20 min', completed: true },
    { id: 3, title: 'Fractions and Decimals', duration: '25 min', completed: false },
    { id: 4, title: 'Geometry Basics', duration: '30 min', completed: false },
    { id: 5, title: 'Word Problems', duration: '18 min', completed: false },
  ]
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-slate-400">
        <Link to="/courses" className="hover:text-sky-600">Courses</Link>
        <span>→</span>
        <span className="capitalize">{subject}</span>
        <span>→</span>
        <span>Grade {grade}</span>
      </div>
      
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
        {subject} - Grade {grade} Lessons
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {lessons.map((lesson) => (
          <SectionCard key={lesson.id} title={lesson.title}>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500 dark:text-slate-400">{lesson.duration}</span>
                {lesson.completed && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    ✓ Completed
                  </span>
                )}
              </div>
              <Link
                to={`/lesson/${subject}/${grade}/${lesson.id}`}
                className="rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm px-3 py-1 transition-colors"
              >
                {lesson.completed ? 'Review' : 'Start Lesson'}
              </Link>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

export default LessonsPage