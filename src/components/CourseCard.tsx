import type { ReactNode } from 'react'
import type { Course } from '../store/types'

type Props = { course: Course; onOpen: (course: Course) => void; highlight?: (text: string) => ReactNode }

export function CourseCard({ course, onOpen, highlight }: Props) {
  const progressWidthClass =
    course.progress >= 100 ? 'w-full' :
    course.progress >= 75 ? 'w-3/4' :
    course.progress >= 50 ? 'w-1/2' :
    course.progress >= 25 ? 'w-1/4' :
    'w-0'
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
      <div className="flex items-center justify-between">
        <div className="text-gray-900 dark:text-white font-semibold">
          {highlight ? highlight(course.title) : course.title}
        </div>
        <button className="rounded-md bg-sky-600 text-white text-sm px-3 py-1" onClick={() => onOpen(course)}>Start Learning</button>
      </div>
      <div className="text-xs text-gray-600 dark:text-slate-400 mt-1">
        {course.subject} • Grade {course.grade}
      </div>
      <div className="text-sm text-gray-700 dark:text-slate-300 mt-2">
        {highlight ? highlight(course.description) : course.description}
      </div>
      <div className="h-2 bg-gray-200 dark:bg-slate-800 rounded mt-3">
        <div className={`h-2 rounded bg-sky-500 ${progressWidthClass}`}></div>
      </div>
    </div>
  )
}

export default CourseCard


