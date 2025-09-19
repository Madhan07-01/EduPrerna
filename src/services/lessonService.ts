import { doc, getDoc, collection, query, where, getDocs, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import type { Lesson, LessonProgress } from '../types/lesson';

export class LessonService {
  // Get a lesson by ID
  static async getLessonById(lessonId: string): Promise<Lesson | null> {
    try {
      const lessonRef = doc(db, 'lessons', lessonId);
      const lessonSnap = await getDoc(lessonRef);
      
      if (lessonSnap.exists()) {
        const data = lessonSnap.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Lesson;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching lesson:', error);
      throw error;
    }
  }

  // Get lessons by grade and subject
  static async getLessonsByGradeAndSubject(grade: number, subject: string): Promise<Lesson[]> {
    try {
      const lessonsRef = collection(db, 'lessons');
      const q = query(
        lessonsRef,
        where('grade', '==', grade),
        where('subject', '==', subject)
      );
      
      const querySnapshot = await getDocs(q);
      const lessons: Lesson[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        lessons.push({
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Lesson);
      });
      
      return lessons;
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  }

  // Get user's lesson progress
  static async getLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | null> {
    try {
      const progressRef = doc(db, 'lessonProgress', `${userId}_${lessonId}`);
      const progressSnap = await getDoc(progressRef);
      
      if (progressSnap.exists()) {
        const data = progressSnap.data();
        return {
          ...data,
          lastAccessed: data.lastAccessed?.toDate() || new Date(),
        } as LessonProgress;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching lesson progress:', error);
      throw error;
    }
  }

  // Initialize lesson progress for a user
  static async initializeLessonProgress(userId: string, lessonId: string): Promise<void> {
    try {
      const progressRef = doc(db, 'lessonProgress', `${userId}_${lessonId}`);
      
      const initialProgress: LessonProgress = {
        userId,
        lessonId,
        completedSections: [],
        mcqScores: {},
        currentSection: 0,
        totalProgress: 0,
        lastAccessed: new Date(),
      };
      
      await setDoc(progressRef, {
        ...initialProgress,
        lastAccessed: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error initializing lesson progress:', error);
      throw error;
    }
  }

  // Update lesson progress
  static async updateLessonProgress(
    userId: string, 
    lessonId: string, 
    updates: Partial<LessonProgress>
  ): Promise<void> {
    try {
      const progressRef = doc(db, 'lessonProgress', `${userId}_${lessonId}`);
      
      await updateDoc(progressRef, {
        ...updates,
        lastAccessed: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating lesson progress:', error);
      throw error;
    }
  }

  // Mark section as completed
  static async markSectionCompleted(
    userId: string, 
    lessonId: string, 
    sectionId: string
  ): Promise<void> {
    try {
      const progress = await this.getLessonProgress(userId, lessonId);
      
      if (!progress) {
        await this.initializeLessonProgress(userId, lessonId);
        await this.markSectionCompleted(userId, lessonId, sectionId);
        return;
      }

      if (!progress.completedSections.includes(sectionId)) {
        const updatedCompletedSections = [...progress.completedSections, sectionId];
        
        await this.updateLessonProgress(userId, lessonId, {
          completedSections: updatedCompletedSections,
        });
      }
    } catch (error) {
      console.error('Error marking section as completed:', error);
      throw error;
    }
  }

  // Record MCQ score for a section
  static async recordMCQScore(
    userId: string, 
    lessonId: string, 
    sectionId: string, 
    score: number, 
    totalQuestions: number
  ): Promise<void> {
    try {
      const progress = await this.getLessonProgress(userId, lessonId);
      
      if (!progress) {
        await this.initializeLessonProgress(userId, lessonId);
        await this.recordMCQScore(userId, lessonId, sectionId, score, totalQuestions);
        return;
      }

      const updatedScores = {
        ...progress.mcqScores,
        [sectionId]: score,
      };

      await this.updateLessonProgress(userId, lessonId, {
        mcqScores: updatedScores,
      });
    } catch (error) {
      console.error('Error recording MCQ score:', error);
      throw error;
    }
  }

  // Update current section
  static async updateCurrentSection(
    userId: string, 
    lessonId: string, 
    sectionIndex: number
  ): Promise<void> {
    try {
      await this.updateLessonProgress(userId, lessonId, {
        currentSection: sectionIndex,
      });
    } catch (error) {
      console.error('Error updating current section:', error);
      throw error;
    }
  }
}