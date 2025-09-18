import type { Course } from '../store/types'

type Props = { course: Course; onBack: () => void }

export default function CourseDetail({ course, onBack }: Props) {
  const progressWidthClass =
    course.progress >= 100 ? 'w-full' :
    course.progress >= 75 ? 'w-3/4' :
    course.progress >= 50 ? 'w-1/2' :
    course.progress >= 25 ? 'w-1/4' :
    'w-0'
  return (
    <div className="space-y-4">
      <button className="text-sm text-sky-400" onClick={onBack}>← Back to Courses</button>
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">{course.title}</div>
      <div className="text-gray-700 dark:text-slate-300">{course.description}</div>
      <div className="h-2 bg-gray-200 dark:bg-slate-800 rounded">
        <div className={`h-2 rounded bg-sky-500 ${progressWidthClass}`}></div>
      </div>
      <div className="text-gray-900 dark:text-white font-semibold">Modules</div>
      <ul className="space-y-2">
        {course.modules.map((m, i) => (
          <li key={i} className="rounded-md border border-gray-200 dark:border-slate-800 p-3 flex items-center justify-between">
            <span className="text-gray-800 dark:text-slate-200">{m}</span>
            <button className="rounded-md bg-emerald-600 text-white text-sm px-3 py-1">Start Module</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

