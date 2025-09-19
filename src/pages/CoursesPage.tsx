import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubjects, getGrades, type Subject, type Grade } from '../data/lessonsData'

export function CoursesPage() {
  const navigate = useNavigate()
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [selectedGrade, setSelectedGrade] = useState<Grade>(6)

  const subjects = getSubjects()
  const grades = getGrades()

  const handleStartLearning = () => {
    if (selectedSubject) {
      navigate(`/lessons/${selectedSubject}/${selectedGrade}`)
    }
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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Choose Your Subject</h1>
        <p className="text-xl text-gray-600 dark:text-slate-400">
          Select a subject and grade to start your learning journey
        </p>
      </div>

      {/* 5 Big Subject Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`group relative p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
              selectedSubject === subject
                ? 'ring-4 ring-blue-400 shadow-2xl scale-105'
                : 'hover:shadow-xl'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${getSubjectColor(subject)} rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity`} />
            <div className="relative text-center text-white space-y-4">
              <div className="text-5xl">{getSubjectIcon(subject)}</div>
              <h3 className="text-xl font-bold">{formatSubjectName(subject)}</h3>
              <p className="text-sm opacity-90">
                Grade {selectedGrade} Ready
              </p>
              {selectedSubject === subject && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Grade Selection */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Select Your Grade</h2>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`p-4 rounded-xl font-semibold transition-all duration-200 ${
                  selectedGrade === grade
                    ? 'bg-blue-600 text-white shadow-lg transform scale-110'
                    : 'bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-400 hover:scale-105'
                }`}
              >
                <div className="text-2xl mb-1">📚</div>
                <div className="text-sm">Grade</div>
                <div className="text-xl font-bold">{grade}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Start Learning Button */}
      <div className="text-center">
        <button
          onClick={handleStartLearning}
          disabled={!selectedSubject}
          className={`px-12 py-4 rounded-2xl text-xl font-bold transition-all duration-300 transform ${
            selectedSubject
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105'
              : 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-400 cursor-not-allowed'
          }`}
        >
          {selectedSubject 
            ? `🚀 Start Learning ${formatSubjectName(selectedSubject)} - Grade ${selectedGrade}` 
            : '👆 Select a Subject to Continue'
          }
        </button>
      </div>

      {/* Firebase-Powered Lessons Section */}
      <div className="max-w-6xl mx-auto mt-16">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              🔥 New: Interactive Firebase Lessons
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Experience our enhanced learning system with real-time progress tracking
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Number System Lesson Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-3xl text-white">🔢</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Number System</h3>
                  <p className="text-gray-600 dark:text-gray-400">Grade 6 Mathematics • Interactive</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">8 Comprehensive Sections</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">10 Interactive MCQs</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">Real-time Progress Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">Confetti Animations</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">Rich HTML Content</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/lesson-detail/mathematics/grade6_number_system')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span className="text-xl">🚀</span>
                Start Number System Lesson
              </button>
            </div>

            {/* Instructions Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                🌱 Setup Instructions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Follow these steps to experience the full Firebase-powered learning system:
              </p>
              
              <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                  <div>
                    <strong>Go to Module Page:</strong> Navigate to any module page in the sidebar
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                  <div>
                    <strong>Seed Database:</strong> Click "🌱 Seed Data" to populate Firestore
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                  <div>
                    <strong>Start Learning:</strong> Click the button above to begin!
                  </div>
                </li>
              </ol>

              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                  <span className="font-semibold text-yellow-800 dark:text-yellow-300">First Time?</span>
                </div>
                <p className="text-xs text-yellow-700 dark:text-yellow-400">
                  Make sure to seed the database first, or you'll see "Lesson not found" error.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Original Subject Selection */}
      {selectedSubject && (
        <div className="max-w-4xl mx-auto">
          <div className={`p-6 rounded-2xl bg-gradient-to-r ${getSubjectColor(selectedSubject)} text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{getSubjectIcon(selectedSubject)}</div>
                <div>
                  <h3 className="text-2xl font-bold">{formatSubjectName(selectedSubject)}</h3>
                  <p className="opacity-90">Grade {selectedGrade} Curriculum</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">Ready!</div>
                <div className="text-sm opacity-90">Click Start Learning to begin</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
        <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">Track Progress</h3>
          <p className="text-blue-700 dark:text-blue-400 text-sm">
            Monitor your learning journey with detailed progress tracking
          </p>
        </div>
        
        <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">Interactive Learning</h3>
          <p className="text-green-700 dark:text-green-400 text-sm">
            Engage with MCQs, quizzes, and interactive content
          </p>
        </div>
        
        <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2">Rich Content</h3>
          <p className="text-purple-700 dark:text-purple-400 text-sm">
            Access comprehensive study materials and resources
          </p>
        </div>
      </div>
    </div>
  )
}

export default CoursesPage