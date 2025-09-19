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
    </div>
  )
}

export default CoursesPage