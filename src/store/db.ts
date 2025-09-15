import { openDB, type IDBPDatabase } from 'idb'
import type { Course } from './types'

const DB_NAME = 'eduprerna'
const DB_VERSION = 1
const STORE_COURSES = 'courses'

let dbPromise: Promise<IDBPDatabase> | null = null

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_COURSES)) {
          db.createObjectStore(STORE_COURSES)
        }
      },
    })
  }
  return dbPromise
}

export async function cacheCourses(courses: Course[]) {
  const db = await getDB()
  await db.put(STORE_COURSES, courses, 'all')
}

export async function loadCachedCourses(): Promise<Course[] | null> {
  const db = await getDB()
  return (await db.get(STORE_COURSES, 'all')) ?? null
}

