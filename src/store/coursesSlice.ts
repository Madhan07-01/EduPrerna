import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Course, FiltersState, Subject } from './types'
import { cacheCourses, loadCachedCourses } from './db'
import { generateCourses } from './data'
import Fuse from 'fuse.js'

export interface CoursesState {
  all: Course[]
  filtered: Course[]
  filters: FiltersState
  status: 'idle' | 'loading' | 'ready'
}

const initialState: CoursesState = {
  all: [],
  filtered: [],
  filters: { query: '', grade: 'all', subject: 'all', progress: 'all' },
  status: 'idle',
}

export const initCourses = createAsyncThunk('courses/init', async () => {
  const cached = await loadCachedCourses()
  if (cached && cached.length > 0) return cached
  const generated = generateCourses()
  await cacheCourses(generated)
  return generated
})

function applyFilters(data: Course[], filters: FiltersState): Course[] {
  let list = data
  if (filters.grade !== 'all') list = list.filter((c) => c.grade === filters.grade)
  if (filters.subject !== 'all') list = list.filter((c) => c.subject === filters.subject)
  if (filters.progress !== 'all') {
    if (filters.progress === 'not') list = list.filter((c) => c.progress === 0)
    if (filters.progress === 'in') list = list.filter((c) => c.progress > 0 && c.progress < 100)
    if (filters.progress === 'done') list = list.filter((c) => c.progress === 100)
  }
  if (filters.query.trim()) {
    const fuse = new Fuse(list, {
      includeScore: false,
      threshold: 0.35,
      keys: ['title', 'description', 'subject', 'grade'],
    })
    list = fuse.search(filters.query).map((r) => r.item)
  }
  return list
}

const slice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.filters.query = action.payload
      state.filtered = applyFilters(state.all, state.filters)
    },
    setGrade(state, action: PayloadAction<number | 'all'>) {
      state.filters.grade = action.payload
      state.filtered = applyFilters(state.all, state.filters)
    },
    setSubject(state, action: PayloadAction<Subject | 'all'>) {
      state.filters.subject = action.payload
      state.filtered = applyFilters(state.all, state.filters)
    },
    setProgressFilter(state, action: PayloadAction<'all' | 'not' | 'in' | 'done'>) {
      state.filters.progress = action.payload
      state.filtered = applyFilters(state.all, state.filters)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initCourses.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(initCourses.fulfilled, (state, action) => {
        state.status = 'ready'
        state.all = action.payload
        state.filtered = applyFilters(state.all, state.filters)
      })
  },
})

export const { setQuery, setGrade, setSubject, setProgressFilter } = slice.actions
export default slice.reducer

