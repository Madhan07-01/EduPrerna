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
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">Mini-Games</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Math Puzzle', description: 'Solve equations to advance', icon: '🧩' },
          { name: 'Physics Simulator', description: 'Experiment with physics laws', icon: '⚡' },
          { name: 'Chemistry Lab', description: 'Mix elements and compounds', icon: '🧪' },
          { name: 'Biology Explorer', description: 'Discover cellular structures', icon: '🔬' },
          { name: 'Code Breaker', description: 'Decode programming patterns', icon: '💻' },
          { name: 'Memory Match', description: 'Match scientific terms', icon: '🧠' },
        ].map((game) => (
          <SectionCard key={game.name} title={game.name}>
            <div className="space-y-2">
              <div className="text-4xl">{game.icon}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{game.description}</div>
              <button className="w-full rounded-md bg-green-600 text-white px-4 py-2 text-sm hover:bg-green-700">
                Play Game
              </button>
            </div>
          </SectionCard>
        ))}
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
