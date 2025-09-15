import React from 'react'
import type { Course } from '../store/types'

type Props = { course: Course; onBack: () => void }

export default function CourseDetail({ course, onBack }: Props) {
  return (
    <div className="space-y-4">
      <button className="text-sm text-sky-400" onClick={onBack}>← Back to Courses</button>
      <div className="text-2xl font-semibold text-white dark:text-white text-gray-900">{course.title}</div>
      <div className="text-slate-300 dark:text-slate-300 text-gray-700">{course.description}</div>
      <div className="h-2 bg-slate-800 dark:bg-slate-800 bg-gray-200 rounded">
        <div className="h-2 bg-sky-500 rounded" style={{ width: `${course.progress}%` }}></div>
      </div>
      <div className="text-white dark:text-white text-gray-900 font-semibold">Modules</div>
      <ul className="space-y-2">
        {course.modules.map((m, i) => (
          <li key={i} className="rounded-md border border-slate-800 dark:border-slate-800 border-gray-200 p-3 flex items-center justify-between">
            <span className="text-slate-200 dark:text-slate-200 text-gray-800">{m}</span>
            <button className="rounded-md bg-emerald-600 text-white text-sm px-3 py-1">Start Module</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

