import { useState } from 'react'

interface ResourceFilterProps {
  onFilterChange: (filters: { subject: string; grade: string; lesson: string }) => void
}

const ResourceFilter = ({ onFilterChange }: ResourceFilterProps) => {
  const [subject, setSubject] = useState('')
  const [grade, setGrade] = useState('')
  const [lesson, setLesson] = useState('')

  const subjects = ['Mathematics', 'Computer Science', 'Physics', 'Chemistry', 'Biology']
  const grades = ['6', '7', '8', '9', '10', '11', '12'] 
  const lessons = ['Algebra', 'Geometry', 'Calculus', 'Programming', 'Mechanics', 'Chemical Reactions', 'Ecology']

  const handleSubjectChange = (value: string) => {
    setSubject(value)
    onFilterChange({ subject: value, grade, lesson })
  }

  const handleGradeChange = (value: string) => {
    setGrade(value)
    onFilterChange({ subject, grade: value, lesson })
  }

  const handleLessonChange = (value: string) => {
    setLesson(value)
    onFilterChange({ subject, grade, lesson: value })
  }

  const clearFilters = () => {
    setSubject('')
    setGrade('')
    setLesson('')
    onFilterChange({ subject: '', grade: '', lesson: '' })
  }

  const hasActiveFilters = subject || grade || lesson

  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Resources</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            🔄 Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Subject Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Subject
          </label>
          <select 
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={subject}
            onChange={(e) => handleSubjectChange(e.target.value)}
          >
            <option value="">All Subjects</option>
            {subjects.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        {/* Grade Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Grade
          </label>
          <select 
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={grade}
            onChange={(e) => handleGradeChange(e.target.value)}
          >
            <option value="">All Grades</option>
            {grades.map(g => (
              <option key={g} value={g}>Grade {g}</option>
            ))}
          </select>
        </div>

        {/* Lesson Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Lesson
          </label>
          <select 
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={lesson}
            onChange={(e) => handleLessonChange(e.target.value)}
          >
            <option value="">All Lessons</option>
            {lessons.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-medium">Active Filters:</span>
            <div className="mt-1 space-x-2">
              {subject && <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">{subject}</span>}
              {grade && <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">Grade {grade}</span>}
              {lesson && <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">{lesson}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResourceFilter