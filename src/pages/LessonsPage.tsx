import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getLessonsForSubjectAndGrade, type Subject, type Grade } from '../data/lessonsData'
import { SectionCard } from '../components/SectionCard'

export function LessonsPage() {
  const { subject, grade } = useParams<{ subject: string; grade: string }>()
  const navigate = useNavigate()
  
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
        <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Courses</Link>
        <span>→</span>
        <span className="font-medium">{formatSubjectName(subjectParam)} - Grade {grade}</span>
      </div>
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className={`inline-block p-6 rounded-2xl bg-gradient-to-br ${getSubjectColor(subjectParam)} text-white mb-4`}>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-5xl">{getSubjectIcon(subjectParam)}</span>
            <div className="text-left">
              <h1 className="text-3xl font-bold">{formatSubjectName(subjectParam)}</h1>
              <p className="text-xl opacity-90">Grade {grade} Lessons</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            📚 Available Lessons ({lessons.length})
          </h2>
          <div className="text-sm text-gray-500 dark:text-slate-400">
            Click any lesson to start learning
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
                        📚 Lesson {index + 1}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        🎥 Interactive
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500 dark:text-slate-400">
                        {formatSubjectName(subjectParam)} • Grade {grade}
                      </div>
                      
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 group-hover:shadow-lg">
                        Start Lesson →
                      </button>
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
              Coming Soon!
            </h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6">
              {formatSubjectName(subjectParam)} lessons for Grade {grade} are being prepared.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              ← Back to Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default LessonsPage