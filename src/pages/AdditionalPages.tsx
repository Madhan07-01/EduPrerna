// using automatic JSX runtime; no React default import needed
import { useState } from 'react'
import { SectionCard } from './Pages'
import MathRunnerGame from '../components/MathRunnerGame'

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
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [showGame, setShowGame] = useState<boolean>(false)

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

  // Games data organized by subject
  const gamesBySubject = {
    mathematics: [
      { name: 'Math Runner', description: 'Run through levels solving math problems to avoid obstacles.', icon: '🏃‍♂️', color: 'from-blue-500 to-indigo-600', hoverColor: 'hover:from-blue-600 hover:to-indigo-700' },
      { name: 'Equation Builder Puzzle', description: 'Drag and drop numbers/operators to form correct equations.', icon: '🧩', color: 'from-purple-500 to-blue-600', hoverColor: 'hover:from-purple-600 hover:to-blue-700' },
      { name: 'Geometry Shooter', description: 'Shoot the correct shapes, angles, or constructions.', icon: '🎯', color: 'from-indigo-500 to-purple-600', hoverColor: 'hover:from-indigo-600 hover:to-purple-700' }
    ],
    'computer-science': [
      { name: 'Code Breaker', description: 'Solve coding challenges to unlock levels.', icon: '🐛', color: 'from-green-500 to-teal-600', hoverColor: 'hover:from-green-600 hover:to-teal-700' },
      { name: 'Debugging Quest', description: 'Find and fix bugs in simple programs.', icon: '🔍', color: 'from-teal-500 to-cyan-600', hoverColor: 'hover:from-teal-600 hover:to-cyan-700' },
      { name: 'Logic Maze', description: 'Use logic to navigate through mazes and puzzles.', icon: '🧠', color: 'from-emerald-500 to-green-600', hoverColor: 'hover:from-emerald-600 hover:to-green-700' }
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

  // Grade options
  const grades = [
    { id: 'grade-6', name: 'Grade 6', color: 'from-pink-500 to-rose-600', hoverColor: 'hover:from-pink-600 hover:to-rose-700' },
    { id: 'grade-7', name: 'Grade 7', color: 'from-purple-500 to-indigo-600', hoverColor: 'hover:from-purple-600 hover:to-indigo-700' },
    { id: 'grade-8', name: 'Grade 8', color: 'from-blue-500 to-cyan-600', hoverColor: 'hover:from-blue-600 hover:to-cyan-700' },
    { id: 'grade-9', name: 'Grade 9', color: 'from-green-500 to-teal-600', hoverColor: 'hover:from-green-600 hover:to-teal-700' },
    { id: 'grade-10', name: 'Grade 10', color: 'from-yellow-500 to-orange-600', hoverColor: 'hover:from-yellow-600 hover:to-orange-700' },
    { id: 'grade-11', name: 'Grade 11', color: 'from-red-500 to-pink-600', hoverColor: 'hover:from-red-600 hover:to-pink-700' },
    { id: 'grade-12', name: 'Grade 12', color: 'from-indigo-500 to-purple-600', hoverColor: 'hover:from-indigo-600 hover:to-purple-700' }
  ]

  // Lessons data organized by subject and grade
  const lessonsBySubjectAndGrade = {
    mathematics: {
      'grade-6': ['Fractions', 'Algebra Basics', 'Geometry Fundamentals', 'Decimals', 'Percentages'],
      'grade-7': ['Linear Equations', 'Ratios & Proportions', 'Area & Perimeter', 'Integers', 'Data Handling'],
      'grade-8': ['Quadratic Equations', 'Triangles', 'Mensuration', 'Factorization', 'Graphs'],
      'grade-9': ['Polynomials', 'Coordinate Geometry', 'Trigonometry Basics', 'Statistics', 'Probability'],
      'grade-10': ['Real Numbers', 'Arithmetic Progressions', 'Circles', 'Surface Areas', 'Trigonometry'],
      'grade-11': ['Sets & Functions', 'Limits & Derivatives', 'Mathematical Reasoning', 'Statistics', 'Probability'],
      'grade-12': ['Relations & Functions', 'Calculus', 'Vectors', 'Three Dimensional Geometry', 'Linear Programming']
    }
  }

  // Show Math Runner Game
  if (showGame && selectedSubject && selectedGame && selectedGrade && selectedLesson) {
    return (
      <MathRunnerGame
        subject={selectedSubject}
        grade={selectedGrade}
        lesson={selectedLesson}
        onBack={() => {
          setShowGame(false)
          setSelectedLesson(null)
        }}
      />
    )
  }

  // Grade Selection Screen
  if (selectedSubject && selectedGame && !selectedGrade) {
    const currentSubject = subjects.find(s => s.id === selectedSubject)
    const currentGame = gamesBySubject[selectedSubject as keyof typeof gamesBySubject]?.find(g => g.name === selectedGame)
    
    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setSelectedGame(null)
                setSelectedGrade(null)
                setSelectedLesson(null)
              }}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="text-xl">←</span>
              <span className="font-medium">Back to Games</span>
            </button>
          </div>
          
          <div className="text-center">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">{currentGame?.icon}</span>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedGame}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Choose your grade level</div>
              </div>
            </div>
          </div>
          
          <div className="w-32"></div>
        </div>

        {/* Grade Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 max-w-6xl mx-auto">
          {grades.map((grade) => (
            <div
              key={grade.id}
              onClick={() => setSelectedGrade(grade.id)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${grade.color} ${grade.hoverColor} p-6 text-white shadow-lg transition-all duration-300 h-32 flex items-center justify-center`}>
                <div className="text-center">
                  <div className="text-3xl font-bold">{grade.name.split(' ')[1]}</div>
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
              Select your grade to see relevant lessons
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Lesson Selection Screen
  if (selectedSubject && selectedGame && selectedGrade && !selectedLesson) {
    const currentSubject = subjects.find(s => s.id === selectedSubject)
    const currentGame = gamesBySubject[selectedSubject as keyof typeof gamesBySubject]?.find(g => g.name === selectedGame)
    const currentGrade = grades.find(g => g.id === selectedGrade)
    const lessons = lessonsBySubjectAndGrade[selectedSubject as keyof typeof lessonsBySubjectAndGrade]?.[selectedGrade as keyof typeof lessonsBySubjectAndGrade[keyof typeof lessonsBySubjectAndGrade]] || []
    
    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setSelectedGrade(null)
                setSelectedLesson(null)
              }}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="text-xl">←</span>
              <span className="font-medium">Back to Grades</span>
            </button>
          </div>
          
          <div className="text-center">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">{currentGame?.icon}</span>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedGame} - {currentGrade?.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Choose a lesson to start playing</div>
              </div>
            </div>
          </div>
          
          <div className="w-32"></div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lessons.map((lesson, index) => (
            <div
              key={lesson}
              onClick={() => {
                setSelectedLesson(lesson)
                if (selectedGame === 'Math Runner') {
                  setShowGame(true)
                }
              }}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 p-6">
                {/* Lesson Number */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg mb-3">
                    {index + 1}
                  </div>
                </div>
                
                {/* Lesson Info */}
                <div className="text-center space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{lesson}</h3>
                  <button className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    {selectedGame === 'Math Runner' ? 'Start Math Runner' : 'Start Level 1'}
                  </button>
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
              {lessons.length} lessons available for {currentSubject?.name} {currentGrade?.name}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Subject Selection Screen
  if (!selectedSubject) {
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
            onClick={() => setSelectedSubject(subject.id)}
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

  // Games Screen for Selected Subject
  const currentSubject = subjects.find(s => s.id === selectedSubject)
  const games = gamesBySubject[selectedSubject as keyof typeof gamesBySubject] || []

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedSubject(null)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="text-xl">←</span>
            <span className="font-medium">Back to Subjects</span>
          </button>
        </div>
        
        <div className="text-center">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{currentSubject?.icon}</span>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentSubject?.name} Games</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{currentSubject?.description}</div>
            </div>
          </div>
        </div>
        
        <div className="w-32"></div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {games.map((game) => (
          <div
            key={game.name}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-64"
          >
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${game.color} ${game.hoverColor} p-6 text-white shadow-lg transition-all duration-300 h-full flex flex-col justify-between`}>
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
                
                {/* Play Button */}
                <button 
                  onClick={() => setSelectedGame(game.name)}
                  className="w-full rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-3 text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-white/30"
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
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Games Info Section */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full">
          <span className="text-2xl">🎮</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {games.length} games available for {currentSubject?.name}
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
