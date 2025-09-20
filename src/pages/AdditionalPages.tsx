// using automatic JSX runtime; no React default import needed
import { SectionCard } from './Pages'
import { Link } from 'react-router-dom'

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
  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">Mini-Games</div>
      <p className="text-gray-600 dark:text-gray-300">
        🎮 Interactive educational games to make learning fun! Choose from our collection of STEM mini-games.
      </p>
      

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Biology Lab Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white">
            <div className="text-2xl font-bold mb-2">🔬 Biology Lab Section</div>
            <div className="text-sm opacity-90">Complete independent Biology section</div>
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              • All grades 6-12 available<br/>
              • 30-second timed questions<br/>
              • Isolated Firestore progress<br/>
              • Enhanced animations & sounds
            </div>
            <Link
              to="/biology-lab-section"
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 inline-block text-center"
            >
              Enter Biology Lab
            </Link>
          </div>
        </div>

        {/* Code Challenge Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-white">
            <div className="text-2xl font-bold mb-2">💻 Code Challenge Section</div>
            <div className="text-sm opacity-90">Complete independent Coding section</div>
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              • All grades 6-12 available<br/>
              • 30-second timed questions<br/>
              • Isolated Firestore progress<br/>
              • Enhanced animations & sounds
            </div>
            <Link
              to="/code-challenge-section"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 inline-block text-center"
            >
              Start Code Challenge
            </Link>
          </div>
        </div>

        {/* Math Puzzle Game */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white">
            <div className="text-2xl font-bold mb-2">🧮 Math Puzzle</div>
            <div className="text-sm opacity-90">Interactive math questions for grades 6-12</div>
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              • Multiple-choice questions<br/>
              • Grade-specific topics<br/>
              • Instant feedback & animations<br/>
              • Motivational rewards
            </div>
            <Link
              to="/minigames/math-puzzle"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 inline-block text-center"
            >
              Play Math Puzzle
            </Link>
          </div>
        </div>

        {/* Physics Simulator */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 text-white">
            <div className="text-2xl font-bold mb-2">🌟 Physics Simulator</div>
            <div className="text-sm opacity-90">Interactive physics questions with animations</div>
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              • Forces, energy, and motion<br/>
              • Real physics concepts<br/>
              • Engaging visual effects<br/>
              • Scientific explanations
            </div>
            <Link
              to="/games/physics-simulator"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 inline-block text-center"
            >
              Launch Simulator
            </Link>
          </div>
        </div>

        {/* Chemistry Lab */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white">
            <div className="text-2xl font-bold mb-2">🧪 Chemistry Lab</div>
            <div className="text-sm opacity-90">Build compounds with periodic elements</div>
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              • Periodic element selection<br/>
              • Compound building game<br/>
              • Progressive levels<br/>
              • Chemistry formulas
            </div>
            <Link
              to="/games/chemistry-lab"
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 inline-block text-center"
            >
              Enter Lab
            </Link>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🚀 Available Games</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: '🔬 Biology Lab', desc: 'Interactive biology experiments', link: '/games/biology-lab' },
            { name: '💻 Code Challenge', desc: 'Programming puzzles & concepts', link: '/games/code-challenge' },
            { name: '🌍 Geography Quest', desc: 'World exploration game', link: null },
            { name: '⚗️ Chemical Reactions', desc: 'Reaction simulations', link: null }
          ].map((game) => (
            <div key={game.name} className={`rounded-lg p-4 text-center ${game.link ? 'bg-white dark:bg-gray-700 hover:shadow-lg transition-shadow cursor-pointer' : 'bg-gray-100 dark:bg-gray-700 opacity-60'}`}>
              {game.link ? (
                <Link to={game.link} className="block">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{game.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{game.desc}</div>
                  <div className="mt-3 text-xs text-blue-600 dark:text-blue-400">Click to Play</div>
                </Link>
              ) : (
                <>
                  <div className="font-semibold text-gray-700 dark:text-gray-300">{game.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{game.desc}</div>
                  <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">Coming Soon</div>
                </>
              )}
            </div>
          ))}
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
