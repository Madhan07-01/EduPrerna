import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

type Subject = 'Mathematics' | 'ComputerScience' | 'Physics' | 'Chemistry' | 'Biology'
const grades = [6, 7, 8, 9, 10, 11, 12]
const subjects: Subject[] = ['Mathematics', 'ComputerScience', 'Physics', 'Chemistry', 'Biology']

export default function DailyChallengePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  const getSubjectIcon = (s: Subject) => {
    const icons: Record<Subject, string> = {
      Mathematics: '🧮',
      ComputerScience: '💻',
      Physics: '⚡',
      Chemistry: '🧪',
      Biology: '🧬'
    }
    return icons[s]
  }

  const getSubjectColor = (s: Subject) => {
    const colors: Record<Subject, string> = {
      Mathematics: 'from-indigo-500 to-blue-600',
      ComputerScience: 'from-gray-600 to-slate-700',
      Physics: 'from-purple-500 to-pink-600',
      Chemistry: 'from-green-500 to-emerald-600',
      Biology: 'from-orange-500 to-red-600'
    }
    return colors[s]
  }

  const handlePlay = () => {
    if (selectedGrade && selectedSubject) {
      // Navigate to the daily-challenge pattern as requested
      navigate(`/daily-challenge/${selectedSubject}/${selectedGrade}`)
    }
  }

  // Preselect from query params, e.g., /challenge?grade=7&subject=Science
  useEffect(() => {
    const gradeParam = searchParams.get('grade')
    const subjectParam = searchParams.get('subject') as Subject | null

    if (gradeParam) {
      const g = parseInt(gradeParam, 10)
      if (!Number.isNaN(g) && grades.includes(g as (typeof grades)[number])) {
        setSelectedGrade(g)
      }
    }

    if (subjectParam && (subjects as readonly string[]).includes(subjectParam)) {
      setSelectedSubject(subjectParam as Subject)
    }
  }, [searchParams])

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Daily STEM Challenge
        </h1>
        <p className="text-lg text-gray-600 dark:text-slate-400">
          Pick your grade and subject to play today&apos;s interactive game
        </p>
        <p className="text-sm text-emerald-500 mt-1">New challenges unlock daily at 7 AM</p>
      </div>

      {/* Grade Selector */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Select Grade
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-3 justify-items-center">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`w-16 h-16 rounded-xl font-bold text-lg transition-all duration-200 
                ${selectedGrade === g
                  ? 'bg-blue-600 text-white shadow-lg scale-110'
                  : 'bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:border-blue-400 hover:scale-105'}`}
            >
              {g}
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Grades 6–12 supported
        </p>
      </div>

      {/* Subject Cards */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-xl font-semibold text-gray-900 dark:text-white mb-6">
          STEM Subject
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`relative p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden
                ${selectedSubject === subject ? 'ring-4 ring-blue-400 shadow-2xl scale-105' : 'hover:shadow-xl'}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${getSubjectColor(subject)} opacity-90 rounded-2xl` } />
              <div className="relative text-center text-white space-y-4">
                <div className="text-5xl">{getSubjectIcon(subject)}</div>
                <h3 className="text-xl font-bold">{subject === 'ComputerScience' ? 'Computer Science' : subject}</h3>
                <p className="text-sm opacity-90">Daily puzzles & mini-games</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Play Button */}
      <div className="text-center">
        <button
          onClick={handlePlay}
          disabled={!selectedGrade || !selectedSubject}
          className={`px-10 py-4 rounded-2xl text-xl font-bold transition-all duration-300
            ${selectedGrade && selectedSubject
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105'
              : 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-400 cursor-not-allowed'
            }`}
        >
          {selectedGrade && selectedSubject
            ? `🎮 Play Daily Challenge` 
            : 'Select Grade & Subject'}
        </button>
      </div>
    </div>
  )
}
