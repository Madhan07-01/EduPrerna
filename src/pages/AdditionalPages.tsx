// using automatic JSX runtime; no React default import needed
import { useState } from 'react'
import { SectionCard } from './Pages'

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

  // Games data organized by subject with detailed descriptions
  const gamesBySubject = {
    mathematics: [
      { 
        name: 'Math Runner', 
        shortDescription: 'Endless runner with math obstacles',
        detailedDescription: 'Endless runner where obstacles are math problems. Correct answers let player jump/slide; wrong answers slow them down. Higher grades → more complex problems (fractions, algebra, probability).', 
        icon: '🏃‍♂️' 
      },
      { 
        name: 'Equation Builder Puzzle', 
        shortDescription: 'Drag and drop to form equations',
        detailedDescription: 'Drag and drop numbers/operators to form correct equations. Covers algebra, identities, linear equations.', 
        icon: '🧩' 
      },
      { 
        name: 'Geometry Shooter', 
        shortDescription: 'Shoot correct shapes and angles',
        detailedDescription: 'Player shoots the correct shape/angle/construction from multiple options. Higher levels introduce coordinate geometry and trigonometry targets.', 
        icon: '🎯' 
      }
    ],
    'computer-science': [
      { 
        name: 'Code Breaker', 
        shortDescription: 'Debug code snippets to progress',
        detailedDescription: 'Debug short code snippets to progress. Fix syntax errors in Python/HTML/QBasic. Higher levels increase logic and algorithm complexity.', 
        icon: '🐛' 
      },
      { 
        name: 'Logic Builder', 
        shortDescription: 'Arrange steps to solve puzzles',
        detailedDescription: 'Arrange steps in correct order to solve puzzles. Build flowcharts, algorithms, sorting logic. Higher grades → recursion, data structures.', 
        icon: '🔧' 
      },
      { 
        name: 'Cyber Quest', 
        shortDescription: 'Detective adventure on cyber safety',
        detailedDescription: 'Detective-style adventure on cyber safety and IT basics. Choose strongest passwords and correct protocols. Higher grades → networking and database security.', 
        icon: '🕵️‍♂️' 
      }
    ],
    physics: [
      { 
        name: 'Force Quest', 
        shortDescription: 'Apply Newton\'s laws to move objects',
        detailedDescription: 'Puzzle game where players apply Newton\'s laws to move objects. Calculate required forces to push objects. Higher grades → gravitation, momentum, energy.', 
        icon: '💪' 
      },
      { 
        name: 'Circuit Crafter', 
        shortDescription: 'Build working electrical circuits',
        detailedDescription: 'Build working circuits by dragging components (wires, bulbs, batteries). Correct arrangements light up the circuit. Higher grades → AC/DC circuits, resistors, capacitors.', 
        icon: '🔌' 
      },
      { 
        name: 'Optics Maze', 
        shortDescription: 'Solve mazes using light principles',
        detailedDescription: 'Solve maze puzzles using reflection/refraction principles. Aim light rays at mirrors to open doors. Higher levels include lenses and wave optics.', 
        icon: '🔍' 
      }
    ],
    chemistry: [
      { 
        name: 'Element Match', 
        shortDescription: 'Match elements with symbols',
        detailedDescription: 'Match elements with their symbols/atomic numbers/groups. Connect Na → Sodium, Cl → Chlorine. Higher levels → periodic trends, d- and f-block elements.', 
        icon: '⚛️' 
      },
      { 
        name: 'Reaction Master', 
        shortDescription: 'Predict and balance reactions',
        detailedDescription: 'Predict and balance chemical reactions. Balance equations like HCl + NaOH → NaCl + H2O. Higher levels → organic and redox reactions.', 
        icon: '⚗️' 
      },
      { 
        name: 'Lab Escape', 
        shortDescription: 'Escape room with chemical clues',
        detailedDescription: 'Escape room puzzle using chemical clues. Choose which solutions turn litmus red. Higher levels → biomolecules, polymers, everyday chemistry.', 
        icon: '🧪' 
      }
    ],
    biology: [
      { 
        name: 'Cell Explorer', 
        shortDescription: 'Explore cells and identify organelles',
        detailedDescription: 'Explore a cell and identify organelles. Click ribosomes for protein synthesis. Higher levels → DNA, genetics, biotechnology.', 
        icon: '🔬' 
      },
      { 
        name: 'Body Quest', 
        shortDescription: 'Place organs in correct systems',
        detailedDescription: 'Place organs in correct systems or answer physiology questions. Identify which chamber pumps blood to lungs. Higher levels → nervous, circulatory, reproductive systems.', 
        icon: '🫀' 
      },
      { 
        name: 'Eco Adventure', 
        shortDescription: 'Restore ecosystem balance',
        detailedDescription: 'Restore balance in ecosystems with puzzles. Arrange food chains correctly. Higher levels → cycles, biodiversity, conservation.', 
        icon: '🌿' 
      }
    ]
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
        
        {/* Fun Stats or Info Section */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full">
            <span className="text-2xl">🎮</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {subjects.reduce((total, subject) => total + gamesBySubject[subject.id as keyof typeof gamesBySubject].length, 0)} games available across {subjects.length} subjects
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
        
        <div className="w-32"></div> {/* Spacer for centering */}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.name}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300">
              {/* Game Icon */}
              <div className="text-center p-6 pb-4">
                <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {game.icon}
                </div>
              </div>
              
              {/* Game Info */}
              <div className="px-6 pb-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{game.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{game.shortDescription}</p>
                </div>
                
                {/* Play Button */}
                <button className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3 text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <span>🎮</span>
                  <span>Play Game</span>
                </button>
              </div>
              
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Coming Soon Games Preview */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="text-center space-y-2">
          <div className="text-2xl">🚀</div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">More Games Coming Soon!</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We're working on bringing you even more exciting {currentSubject?.name.toLowerCase()} games. Stay tuned for updates!
          </p>
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
