import { useParams, useNavigate } from 'react-router-dom'
import { formatSubjectName } from '../data/subjects.js'

const GameSelect = () => {
  const { subject, grade, lesson } = useParams()
  const navigate = useNavigate()

  // Games data organized by subject
  const gamesBySubject = {
    mathematics: [
      { name: 'Math Runner', description: 'Run through levels solving math problems to avoid obstacles.', icon: '🏃‍♂️', color: 'from-blue-500 to-indigo-600', hoverColor: 'hover:from-blue-600 hover:to-indigo-700' },
      { name: 'Equation Builder Puzzle', description: 'Drag and drop numbers/operators to form correct equations.', icon: '🧩', color: 'from-purple-500 to-blue-600', hoverColor: 'hover:from-purple-600 hover:to-blue-700' },
      { name: 'Math Archer', description: 'Shoot arrows at targets with correct answers to math problems.', icon: '🏹', color: 'from-indigo-500 to-purple-600', hoverColor: 'hover:from-indigo-600 hover:to-purple-700' }
    ],
    'computer-science': [
      { name: 'Code Breaker', description: 'Solve coding challenges to unlock levels.', icon: '🐛', color: 'from-green-500 to-teal-600', hoverColor: 'hover:from-green-600 hover:to-teal-700' },
      { name: 'Logic Builder', description: 'Arrange jumbled steps into the correct logical order.', icon: '🧩', color: 'from-emerald-500 to-green-600', hoverColor: 'hover:from-emerald-600 hover:to-green-700' },
      { name: 'Debugging Quest', description: 'Find and fix bugs in simple programs.', icon: '🔍', color: 'from-teal-500 to-cyan-600', hoverColor: 'hover:from-teal-600 hover:to-cyan-700' }
    ],
    physics: [
      { name: 'Physics Lab Escape', description: 'Solve physics puzzles to escape a virtual lab.', icon: '⚗️', color: 'from-purple-500 to-pink-600', hoverColor: 'hover:from-purple-600 hover:to-pink-700' },
      { name: 'Circuit Connect', description: 'Build working circuits by connecting components correctly.', icon: '🔌', color: 'from-violet-500 to-purple-600', hoverColor: 'hover:from-violet-600 hover:to-purple-700' },
      { name: 'Gravity Drop', description: 'Experiment with gravity and motion challenges.', icon: '🌍', color: 'from-indigo-500 to-violet-600', hoverColor: 'hover:from-indigo-600 hover:to-violet-700' }
    ],
    chemistry: [
      { name: 'Periodic Table Quest', description: 'Match elements and discover their properties.', icon: '⚛️', color: 'from-orange-500 to-red-600', hoverColor: 'hover:from-orange-600 hover:to-red-700' },
      { name: 'Reaction Time', description: 'Combine substances and predict reactions.', icon: '💥', color: 'from-red-500 to-pink-600', hoverColor: 'hover:from-red-600 hover:to-pink-700' },
      { name: 'Molecule Builder', description: 'Construct molecules using atoms and bonds.', icon: '🧪', color: 'from-yellow-500 to-orange-600', hoverColor: 'hover:from-yellow-600 hover:to-orange-700' }
    ],
    biology: [
      { name: 'Cell Explorer', description: 'Explore cell structures and match their functions.', icon: '🔬', color: 'from-teal-500 to-cyan-600', hoverColor: 'hover:from-teal-600 hover:to-cyan-700' },
      { name: 'Human Body Quest', description: 'Identify body systems and organs to complete tasks.', icon: '🫀', color: 'from-cyan-500 to-blue-600', hoverColor: 'hover:from-cyan-600 hover:to-blue-700' },
      { name: 'Eco-Survival', description: 'Balance ecosystems and keep species alive.', icon: '🌿', color: 'from-green-500 to-teal-600', hoverColor: 'hover:from-green-600 hover:to-teal-700' }
    ]
  }

  const handleGameClick = (game) => {
    // Convert game name to kebab-case for URL
    const gameSlug = game.name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '')
    
    // Navigate to game play route
    navigate(`/mini/${subject}/${grade}/${lesson}/${gameSlug}/play`)
  }

  const handleBack = () => {
    navigate(`/mini/${subject}/${grade}/lessons`)
  }

  const formattedSubject = formatSubjectName(subject)
  const formattedGrade = grade?.replace('grade-', 'Grade ')
  const formattedLesson = lesson?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  // Get games for this subject
  const games = gamesBySubject[subject] || []

  // Show error if no games found
  if (games.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Games Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            No games available for {formattedSubject}
          </p>
          <button
            onClick={handleBack}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            ← Back to Lessons
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
            aria-label="Back to lesson selection"
          >
            <span className="text-xl">←</span>
            <span className="font-medium">Back to Lessons</span>
          </button>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">Select Game</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {formattedSubject} • {formattedGrade} • {formattedLesson}
          </div>
        </div>
        
        <div className="w-32"></div> {/* Spacer for centering */}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {games.map((game) => (
          <div
            key={game.name}
            onClick={() => handleGameClick(game)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${game.color} ${game.hoverColor} p-6 text-white shadow-lg transition-all duration-300 h-64 flex flex-col justify-between`}>
              {/* Game Icon */}
              <div className="text-center mb-4 flex-shrink-0">
                <div className="text-6xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {game.icon}
                </div>
              </div>
              
              {/* Game Info */}
              <div className="text-center space-y-3 flex-grow flex flex-col justify-center">
                <h3 className="text-xl font-bold">{game.name}</h3>
                <p className="text-sm opacity-90 leading-relaxed px-2">{game.description}</p>
              </div>
              
              {/* Play Button */}
              <div className="mt-auto pt-4">
                <button 
                  className="w-full rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-3 text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-white/30"
                  aria-label={`Play ${game.name}`}
                >
                  🎮 Play Game
                </button>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-2 right-2 opacity-20">
                <div className="w-8 h-8 rounded-full bg-white"></div>
              </div>
              <div className="absolute bottom-2 left-2 opacity-10">
                <div className="w-12 h-12 rounded-full bg-white"></div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Games Info */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full">
          <span className="text-2xl">🎮</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {games.length} games available for {formattedSubject}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GameSelect