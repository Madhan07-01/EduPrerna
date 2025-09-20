import { useParams, useNavigate } from 'react-router-dom'
import { getLessonsForSubjectAndGrade, formatSubjectName } from '../data/subjects.js'

const LessonSelect = () => {
  const { subject, game, grade } = useParams()
  const navigate = useNavigate()

  // Get lessons for this subject and grade
  const lessons = getLessonsForSubjectAndGrade(subject, grade) || []

  const handleLessonClick = (lesson) => {
    // Convert lesson name to kebab-case for URL
    const lessonSlug = lesson.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '')
    
    // Navigate to game play route
    navigate(`/mini/${subject}/${game}/${grade}/${lessonSlug}/play`)
  }

  const handleBack = () => {
    navigate(`/mini/${subject}/${game}/grades`)
  }

  const formattedSubject = formatSubjectName(subject)
  const formattedGame = game?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  const formattedGrade = grade?.replace('grade-', 'Grade ')

  // Show error if no lessons found
  if (lessons.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Lessons Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            No lessons found for {formattedSubject} {formattedGrade}
          </p>
          <button
            onClick={handleBack}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            ← Back to Grade Selection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Back to grade selection"
          >
            <span className="text-xl">←</span>
            <span className="font-medium">Back to Grades</span>
          </button>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">Select Lesson</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {formattedGame} • {formattedSubject} • {formattedGrade}
          </div>
        </div>
        
        <div className="w-32"></div> {/* Spacer for centering */}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {lessons.map((lesson, index) => (
          <div
            key={lesson}
            onClick={() => handleLessonClick(lesson)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 h-48 flex flex-col justify-between">
              {/* Lesson Number Circle */}
              <div className="text-center mb-4 flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg mb-3">
                  {index + 1}
                </div>
              </div>
              
              {/* Lesson Info */}
              <div className="text-center space-y-3 flex-grow flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                  {lesson}
                </h3>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Lesson {index + 1} of {lessons.length}
                </div>
              </div>
              
              {/* Play Button */}
              <div className="mt-auto pt-4">
                <button 
                  className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  aria-label={`Start ${formattedGame} for ${lesson}`}
                >
                  {formattedGame === 'Math Runner' ? '🏃‍♂️ Start Math Runner' : '🎮 Start Game'}
                </button>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-2 right-2 opacity-10">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
              </div>
              
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Lesson Info */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full">
          <span className="text-2xl">📚</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {lessons.length} lessons available for {formattedSubject} {formattedGrade}
          </span>
        </div>
      </div>
    </div>
  )
}

export default LessonSelect