import { useParams, useNavigate } from 'react-router-dom'
import { formatSubjectName } from '../data/subjects.js'

const GradeSelect = () => {
  const { subject, game } = useParams()
  const navigate = useNavigate()

  // Grade options with colors
  const grades = [
    { id: 'grade-6', name: 'Grade 6', displayNumber: '6', color: 'from-pink-500 to-rose-600', hoverColor: 'hover:from-pink-600 hover:to-rose-700' },
    { id: 'grade-7', name: 'Grade 7', displayNumber: '7', color: 'from-purple-500 to-indigo-600', hoverColor: 'hover:from-purple-600 hover:to-indigo-700' },
    { id: 'grade-8', name: 'Grade 8', displayNumber: '8', color: 'from-blue-500 to-cyan-600', hoverColor: 'hover:from-blue-600 hover:to-cyan-700' },
    { id: 'grade-9', name: 'Grade 9', displayNumber: '9', color: 'from-green-500 to-teal-600', hoverColor: 'hover:from-green-600 hover:to-teal-700' },
    { id: 'grade-10', name: 'Grade 10', displayNumber: '10', color: 'from-yellow-500 to-orange-600', hoverColor: 'hover:from-yellow-600 hover:to-orange-700' },
    { id: 'grade-11', name: 'Grade 11', displayNumber: '11', color: 'from-red-500 to-pink-600', hoverColor: 'hover:from-red-600 hover:to-pink-700' },
    { id: 'grade-12', name: 'Grade 12', displayNumber: '12', color: 'from-indigo-500 to-purple-600', hoverColor: 'hover:from-indigo-600 hover:to-purple-700' }
  ]

  const handleGradeClick = (gradeId) => {
    navigate(`/mini/${subject}/${game}/${gradeId}/lessons`)
  }

  const handleBack = () => {
    navigate(`/mini/${subject}/games`)
  }

  const formattedSubject = formatSubjectName(subject)
  const formattedGame = game?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Back to games"
          >
            <span className="text-xl">←</span>
            <span className="font-medium">Back to Games</span>
          </button>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">Select Grade</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {formattedGame} • {formattedSubject}
          </div>
        </div>
        
        <div className="w-32"></div> {/* Spacer for centering */}
      </div>

      {/* Grade Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 max-w-6xl mx-auto">
        {grades.map((grade) => (
          <div
            key={grade.id}
            onClick={() => handleGradeClick(grade.id)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${grade.color} ${grade.hoverColor} p-6 text-white shadow-lg transition-all duration-300 h-32 flex items-center justify-center`}>
              <div className="text-center">
                <div className="text-3xl font-bold">{grade.displayNumber}</div>
                <div className="text-sm opacity-90 font-medium">{grade.name}</div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-1 right-1 opacity-20">
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Grade Info */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full">
          <span className="text-2xl">🎓</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Select your grade to see relevant lessons for {formattedSubject}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GradeSelect