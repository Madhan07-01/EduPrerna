import { useParams, Link } from 'react-router-dom'
import { SectionCard } from '../components/SectionCard'

export function LessonDetailPage() {
  const { subject, grade, lesson } = useParams<{ subject: string; grade: string; lesson: string }>()
  
  // Mock lesson content - this would typically come from your store or API
  const lessonData = {
    id: lesson,
    title: 'Introduction to Numbers',
    duration: '15 min',
    content: [
      {
        type: 'text',
        content: 'Numbers are the building blocks of mathematics. In this lesson, we will explore different types of numbers and their properties.'
      },
      {
        type: 'video',
        content: 'Watch this introduction video to get started.'
      },
      {
        type: 'exercise',
        content: 'Complete these practice problems to test your understanding.'
      }
    ]
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-slate-400">
        <Link to="/courses" className="hover:text-sky-600">Courses</Link>
        <span>→</span>
        <Link to={`/courses/${subject}/${grade}`} className="hover:text-sky-600 capitalize">{subject}</Link>
        <span>→</span>
        <span>Grade {grade}</span>
        <span>→</span>
        <span>Lesson {lesson}</span>
      </div>
      
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
        {lessonData.title}
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-slate-400">
        <span>Duration: {lessonData.duration}</span>
        <span>•</span>
        <span className="capitalize">{subject} - Grade {grade}</span>
      </div>
      
      <div className="space-y-4">
        {lessonData.content.map((section, index) => (
          <SectionCard key={index} title={section.type === 'text' ? 'Lesson Content' : section.type === 'video' ? 'Video Tutorial' : 'Practice Exercise'}>
            {section.type === 'text' && (
              <p>{section.content}</p>
            )}
            {section.type === 'video' && (
              <div className="space-y-2">
                <p>{section.content}</p>
                <div className="bg-gray-200 dark:bg-slate-800 rounded-lg h-48 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-slate-400">Video Player Placeholder</span>
                </div>
              </div>
            )}
            {section.type === 'exercise' && (
              <div className="space-y-2">
                <p>{section.content}</p>
                <button className="rounded-md bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 transition-colors">
                  Start Exercise
                </button>
              </div>
            )}
          </SectionCard>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Link
          to={`/courses/${subject}/${grade}`}
          className="rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
        >
          ← Back to Lessons
        </Link>
        <button className="rounded-md bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 transition-colors">
          Mark as Complete
        </button>
      </div>
    </div>
  )
}

export default LessonDetailPage