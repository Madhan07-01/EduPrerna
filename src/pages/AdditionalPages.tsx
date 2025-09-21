// using automatic JSX runtime; no React default import needed
import { useParams, useNavigate } from 'react-router-dom'
import { SectionCard } from './Pages'
import MathRunnerGame from '../components/MathRunnerGame'
import EquationBuilderGame from '../components/EquationBuilderGame'
import MathArcher from '../mini-games/math-archer/MathArcher'
import GenericGame from '../components/GenericGame'
import CodeBreaker from '../mini-games/code-breaker/CodeBreaker'
import PhysicsLabEscapeGame from '../components/PhysicsLabEscapeGame'
import LogicBuilder from '../mini-games/logic-builder/LogicBuilder'
import CircuitConnect from '../mini-games/circuit-connect/CircuitConnect'

export function MiniGamePlayPage() {
  const { subject, grade, lesson, game } = useParams()
  const navigate = useNavigate()

  // Helper function to convert kebab-case back to proper lesson name
  const convertLessonName = (lessonSlug: string | undefined): string => {
    // This is a simple conversion - in a real app you might want to store the mapping
    return lessonSlug?.split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || 'Unknown Lesson'
  }

  // Handle back navigation
  const handleBack = () => {
    navigate(`/mini/${subject}/${grade}/${lesson}/games`)
  }

  const lessonName = convertLessonName(lesson)
  const gameName = game?.split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Unknown Game'

  // Game icon mapping - All 15 games
  const gameIconMap: Record<string, string> = {
    'math-runner': '🏃‍♂️',
    'equation-builder-puzzle': '🧩',
    'math-archer': '🏹',
    'code-breaker': '🐛',
    'logic-builder': '🧩',
    'debugging-quest': '🔍',
    'logic-maze': '🧠',
    'physics-lab-escape': '⚗️',
    'circuit-connect': '🔌',
    'gravity-drop': '🌍',
    'periodic-table-quest': '⚛️',
    'reaction-time': '💥',
    'molecule-builder': '🧪',
    'cell-explorer': '🔬',
    'human-body-quest': '🫀',
    'eco-survival': '🌿'
  }

  // For Math Runner, show the game component
  if (game === 'math-runner') {
    return (
      <MathRunnerGame
        subject={subject || 'mathematics'}
        grade={grade || 'grade-6'}
        lesson={lessonName}
        onBack={handleBack}
      />
    )
  }

  // For Equation Builder Puzzle
  if (game === 'equation-builder-puzzle') {
    return (
      <EquationBuilderGame
        subject={subject || 'mathematics'}
        grade={grade || 'grade-6'}
        lesson={lessonName}
        onBack={handleBack}
      />
    )
  }

  // For Math Archer
  if (game === 'math-archer') {
    return (
      <MathArcher
        subject={subject || 'mathematics'}
        grade={grade || 'grade-6'}
        lesson={lessonName}
        onBack={handleBack}
      />
    )
  }

  // For Code Breaker (Computer Science)
  if (game === 'code-breaker') {
    return (
      <CodeBreaker
        subject={subject || 'computer-science'}
        grade={grade || 'grade-6'}
        lesson={lessonName}
        onBack={handleBack}
      />
    )
  }

  // For Logic Builder (Computer Science)
  if (game === 'logic-builder') {
    return (
      <LogicBuilder
        subject={subject || 'computer-science'}
        grade={grade || 'grade-6'}
        lesson={lessonName}
        onBack={handleBack}
      />
    )
  }

  // For Physics Lab Escape (Physics)
  if (game === 'physics-lab-escape') {
    return (
      <PhysicsLabEscapeGame
        subject={subject || 'physics'}
        grade={grade || 'grade-6'}
        lesson={lessonName}
        onBack={handleBack}
      />
    )
  }

  // For Circuit Connect (Physics)
  if (game === 'circuit-connect') {
    return (
      <CircuitConnect
        subject={subject || 'physics'}
        grade={grade || 'grade-6'}
        lesson={lessonName}
        onBack={handleBack}
      />
    )
  }

  // For other games, use GenericGame component
  const gameIcon = gameIconMap[game || ''] || '🎮'
  
  // All games now use their respective components with hardcoded questions
  return (
    <GenericGame
      subject={subject || 'mathematics'}
      grade={grade || 'grade-6'}
      lesson={lessonName}
      gameName={gameName}
      gameIcon={gameIcon}
      onBack={handleBack}
    />
  )
}

export function QuickQuizPage() {
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">Quick Quiz</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'].map((subject) => (
          <SectionCard key={subject} title={`${subject} Quiz`}>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">10 questions • 5 minutes</div>
              <button className="w-full rounded-md bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700">
                Start Quiz
              </button>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

export function DailyChallengePage() {
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">Daily Challenge</div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <div className="text-xl font-bold">Today's Challenge</div>
        <div className="text-sm opacity-90">Solve 5 math problems in under 10 minutes</div>
        <div className="mt-4">
          <div className="text-sm">Progress: 0/5 completed</div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
            <div className="bg-white h-2 rounded-full w-0"></div>
          </div>
        </div>
        <button className="mt-4 rounded-md bg-white text-purple-600 px-4 py-2 font-semibold hover:bg-gray-100">
          Start Challenge
        </button>
      </div>
    </div>
  )
}

export function MiniGamesPage() {
  const navigate = useNavigate()

  // Subject data with icons and descriptions
  const subjects = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: '🔢',
      description: 'Number games and math puzzles',
      bgColor: 'from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700'
    },
    {
      id: 'computer-science',
      name: 'Computer Science',
      icon: '💻',
      description: 'Programming and logic challenges',
      bgColor: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700'
    },
    {
      id: 'physics',
      name: 'Physics',
      icon: '⚡',
      description: 'Physics experiments and simulations',
      bgColor: 'from-purple-500 to-violet-600',
      hoverColor: 'hover:from-purple-600 hover:to-violet-700'
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: '🧪',
      description: 'Chemical reactions and lab games',
      bgColor: 'from-orange-500 to-red-600',
      hoverColor: 'hover:from-orange-600 hover:to-red-700'
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: '🔬',
      description: 'Life science and nature exploration',
      bgColor: 'from-teal-500 to-cyan-600',
      hoverColor: 'hover:from-teal-600 hover:to-cyan-700'
    }
  ]


  // Subject Selection Screen
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="text-3xl font-bold text-gray-900 dark:text-white">Mini-Games</div>
        <div className="text-lg text-gray-600 dark:text-gray-400">Choose your subject to start playing!</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            onClick={() => navigate(`/mini/${subject.id}/grades`)}
            className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-64`}
          >
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${subject.bgColor} ${subject.hoverColor} p-6 text-white shadow-lg transition-all duration-300 h-full flex flex-col justify-between`}>
              {/* Subject Icon */}
              <div className="text-center mb-4 flex-shrink-0">
                <div className="text-6xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {subject.icon}
                </div>
              </div>
              
              {/* Subject Info */}
              <div className="text-center space-y-2 flex-grow flex flex-col justify-center">
                <h3 className="text-xl font-bold">{subject.name}</h3>
                <p className="text-sm opacity-90 leading-relaxed line-clamp-2">{subject.description}</p>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-2 right-2 opacity-20">
                <div className="w-8 h-8 rounded-full bg-white"></div>
              </div>
              <div className="absolute bottom-2 left-2 opacity-10">
                <div className="w-12 h-12 rounded-full bg-white"></div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Info Section */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full">
          <span className="text-2xl">🎮</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            15 games available across {subjects.length} subjects
          </span>
        </div>
      </div>
    </div>
  )
}

export function DownloadGradePage() {
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">Download Grade</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((grade) => (
          <SectionCard key={grade} title={grade}>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">Complete curriculum for {grade}</div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-md bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700">
                  Download PDF
                </button>
                <button className="flex-1 rounded-md bg-gray-600 text-white px-3 py-2 text-sm hover:bg-gray-700">
                  Download ZIP
                </button>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}
