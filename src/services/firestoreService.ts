import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  arrayUnion,
  serverTimestamp,
  onSnapshot,
  type Unsubscribe
} from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

// Types
export interface Section {
  id: string
  title: string
  content: string
  order: number
}

export interface MCQ {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  order: number
}

export interface LessonAttempt {
  lessonId: string
  userId: string
  attemptedMcqs: string[]
  correctAnswers: string[]
  lastAccessedSection: string
  completedSections: string[]
  startedAt: Date
  lastUpdatedAt: Date
  isCompleted: boolean
}

export interface Lesson {
  id: string
  title: string
  description: string
  courseId: string
  sections: Section[]
  mcqs: MCQ[]
}

// Firestore service class
export class FirestoreService {
  // Get lesson data with sections and MCQs
  static async getLesson(courseId: string, lessonId: string): Promise<Lesson | null> {
    try {
      // Get lesson basic info (if we had a lesson document)
      // For now, we'll construct it from sections and MCQs
      
      const sectionsRef = collection(db, `courses/${courseId}/lessons/${lessonId}/sections`)
      const mcqsRef = collection(db, `courses/${courseId}/lessons/${lessonId}/mcqs`)
      
      const [sectionsSnapshot, mcqsSnapshot] = await Promise.all([
        getDocs(query(sectionsRef, orderBy('order'))),
        getDocs(query(mcqsRef, orderBy('order')))
      ])
      
      const sections: Section[] = sectionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Section))
      
      const mcqs: MCQ[] = mcqsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as MCQ))
      
      if (sections.length === 0 && mcqs.length === 0) {
        return null
      }
      
      return {
        id: lessonId,
        courseId,
        title: 'Number System', // This could come from a lesson document
        description: 'Learn about different types of numbers and number systems',
        sections,
        mcqs
      }
    } catch (error) {
      console.error('Error fetching lesson:', error)
      return null
    }
  }
  
  // Get user's lesson attempt
  static async getLessonAttempt(userId: string, lessonId: string): Promise<LessonAttempt | null> {
    try {
      const attemptRef = doc(db, `userProgress/${userId}/lessonAttempts/${lessonId}`)
      const attemptDoc = await getDoc(attemptRef)
      
      if (attemptDoc.exists()) {
        return {
          ...attemptDoc.data(),
          startedAt: attemptDoc.data().startedAt?.toDate() || new Date(),
          lastUpdatedAt: attemptDoc.data().lastUpdatedAt?.toDate() || new Date()
        } as LessonAttempt
      }
      
      return null
    } catch (error) {
      console.error('Error fetching lesson attempt:', error)
      return null
    }
  }
  
  // Create or update lesson attempt
  static async updateLessonAttempt(userId: string, lessonId: string, updates: Partial<LessonAttempt>): Promise<void> {
    try {
      const attemptRef = doc(db, `userProgress/${userId}/lessonAttempts/${lessonId}`)
      const existingAttempt = await this.getLessonAttempt(userId, lessonId)
      
      if (existingAttempt) {
        await updateDoc(attemptRef, {
          ...updates,
          lastUpdatedAt: serverTimestamp()
        })
      } else {
        await setDoc(attemptRef, {
          lessonId,
          userId,
          attemptedMcqs: [],
          correctAnswers: [],
          lastAccessedSection: '',
          completedSections: [],
          startedAt: serverTimestamp(),
          lastUpdatedAt: serverTimestamp(),
          isCompleted: false,
          ...updates
        })
      }
    } catch (error) {
      console.error('Error updating lesson attempt:', error)
      throw error
    }
  }
  
  // Record MCQ attempt
  static async recordMCQAttempt(
    userId: string, 
    lessonId: string, 
    mcqId: string, 
    isCorrect: boolean
  ): Promise<void> {
    try {
      const attemptRef = doc(db, `userProgress/${userId}/lessonAttempts/${lessonId}`)
      
      const updates: any = {
        attemptedMcqs: arrayUnion(mcqId),
        lastUpdatedAt: serverTimestamp()
      }
      
      if (isCorrect) {
        updates.correctAnswers = arrayUnion(mcqId)
      }
      
      await updateDoc(attemptRef, updates)
    } catch (error) {
      console.error('Error recording MCQ attempt:', error)
      throw error
    }
  }
  
  // Mark section as completed
  static async markSectionCompleted(userId: string, lessonId: string, sectionId: string): Promise<void> {
    try {
      const attemptRef = doc(db, `userProgress/${userId}/lessonAttempts/${lessonId}`)
      
      await updateDoc(attemptRef, {
        completedSections: arrayUnion(sectionId),
        lastAccessedSection: sectionId,
        lastUpdatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error marking section completed:', error)
      throw error
    }
  }
  
  // Listen to lesson attempt changes (real-time updates)
  static listenToLessonAttempt(
    userId: string, 
    lessonId: string, 
    callback: (attempt: LessonAttempt | null) => void
  ): Unsubscribe {
    const attemptRef = doc(db, `userProgress/${userId}/lessonAttempts/${lessonId}`)
    
    return onSnapshot(attemptRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data()
        callback({
          ...data,
          startedAt: data.startedAt?.toDate() || new Date(),
          lastUpdatedAt: data.lastUpdatedAt?.toDate() || new Date()
        } as LessonAttempt)
      } else {
        callback(null)
      }
    })
  }
}