export type Subject = 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology' | 'Computer Science'

export interface Course {
  courseId: string
  subject: Subject
  grade: 6 | 7 | 8 | 9 | 10 | 11 | 12
  title: string
  description: string
  modules: string[]
  progress: number
}

export interface FiltersState {
  query: string
  grade: number | 'all'
  subject: Subject | 'all'
  progress: 'all' | 'not' | 'in' | 'done'
}

