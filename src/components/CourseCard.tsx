import React from 'react'
import type { Course } from '../store/types'

type Props = { course: Course; onOpen: (course: Course) => void; highlight?: (text: string) => React.ReactNode }

export function CourseCard({ course, onOpen, highlight }: Props) {
  return (
    <div className="rounded-xl border border-slate-800 dark:border-slate-800 border-gray-200 bg-slate-900/60 dark:bg-slate-900/60 bg-white/80 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white dark:text-white text-gray-900 font-semibold">
          {highlight ? highlight(course.title) : course.title}
        </div>
        <button className="rounded-md bg-sky-600 text-white text-sm px-3 py-1" onClick={() => onOpen(course)}>Start Learning</button>
      </div>
      <div className="text-xs text-slate-400 dark:text-slate-400 text-gray-600 mt-1">
        {course.subject} • Grade {course.grade}
      </div>
      <div className="text-sm text-slate-300 dark:text-slate-300 text-gray-700 mt-2">
        {highlight ? highlight(course.description) : course.description}
      </div>
      <div className="h-2 bg-slate-800 dark:bg-slate-800 bg-gray-200 rounded mt-3">
        <div className="h-2 bg-sky-500 rounded" style={{ width: `${course.progress}%` }}></div>
      </div>
    </div>
  )
}

export default CourseCard


