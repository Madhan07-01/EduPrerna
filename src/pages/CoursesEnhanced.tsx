import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initCourses, setGrade, setProgressFilter, setQuery, setSubject } from '../store/coursesSlice'
import type { RootState } from '../store'
import type { Subject, Course } from '../store/types'
import CourseCard from '../components/CourseCard'
import CourseDetail from './CourseDetail'

const subjects: Subject[] = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']

export default function CoursesEnhanced() {
  const dispatch = useDispatch()
  const { filtered, filters, status } = useSelector((s: RootState) => s.courses)
  const [selected, setSelected] = useState<Course | null>(null)
  const [queryLocal, setQueryLocal] = useState(filters.query)

  useEffect(() => {
    if (status === 'idle') dispatch(initCourses() as any)
  }, [status, dispatch])

  useEffect(() => {
    const id = setTimeout(() => dispatch(setQuery(queryLocal)), 300)
    return () => clearTimeout(id)
  }, [queryLocal, dispatch])

  const highlight = useMemo(() => {
    if (!filters.query) return undefined
    const regex = new RegExp(`(${filters.query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi')
    return (text: string) => (
      <span dangerouslySetInnerHTML={{ __html: text.replace(regex, '<mark>$1</mark>') }} />
    )
  }, [filters.query])

  if (selected) return <CourseDetail course={selected} onBack={() => setSelected(null)} />

  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-white dark:text-white text-gray-900">Explore STEM Courses</div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          value={queryLocal}
          onChange={(e) => setQueryLocal(e.target.value)}
          placeholder="Search by title, subject, grade, keywords..."
          className="w-full md:w-1/2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
        />

        <div className="flex flex-wrap gap-2">
          <select
            value={filters.grade}
            onChange={(e) => dispatch(setGrade(e.target.value === 'all' ? 'all' : Number(e.target.value) as any))}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          >
            <option value="all">All Grades</option>
            {[6,7,8,9,10,11,12].map((g) => <option key={g} value={g}>Grade {g}</option>)}
          </select>
          <select
            value={filters.subject}
            onChange={(e) => dispatch(setSubject(e.target.value as any))}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          >
            <option value="all">All Subjects</option>
            {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={filters.progress}
            onChange={(e) => dispatch(setProgressFilter(e.target.value as any))}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          >
            <option value="all">Any Progress</option>
            <option value="not">Not Started</option>
            <option value="in">In Progress</option>
            <option value="done">Completed</option>
          </select>
        </div>
      </div>

      {status !== 'ready' ? (
        <div className="text-sm text-slate-400">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((c) => (
            <CourseCard key={c.courseId} course={c} onOpen={setSelected} highlight={highlight} />
          ))}
        </div>
      )}
    </div>
  )
}

