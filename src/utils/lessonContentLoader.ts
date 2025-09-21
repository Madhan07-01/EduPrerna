import chapter1Grade6 from '../content/mathematics/grade6/chapter1.json';
import chapter2Grade6 from '../content/mathematics/grade6/chapter2.json';
import chapter3Grade6 from '../content/mathematics/grade6/chapter3.json';
import chapter1Grade7 from '../content/mathematics/grade7/chapter1.json';
import chapter2Grade7 from '../content/mathematics/grade7/chapter2.json';
import chapter3Grade7 from '../content/mathematics/grade7/chapter3.json';
import chapter1Grade8 from '../content/mathematics/grade8/chapter1.json';
import chapter2Grade8 from '../content/mathematics/grade8/chapter2.json';
import chapter3Grade8 from '../content/mathematics/grade8/chapter3.json';
import chapter1Grade9 from '../content/mathematics/grade9/chapter1.json';
import chapter2Grade9 from '../content/mathematics/grade9/chapter2.json';
import chapter3Grade9 from '../content/mathematics/grade9/chapter3.json';

// Define types for our lesson content structure
interface Subtopic {
  title: string;
  content: string;
}

interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface Quiz {
  questions: Question[];
}

export interface LessonContent {
  title: string;
  subtopics: Subtopic[];
  quiz: Quiz;
}

// Map chapter numbers to their content for different grades
const chapterContentMapGrade6: Record<number, LessonContent> = {
  1: chapter1Grade6 as LessonContent,
  2: chapter2Grade6 as LessonContent,
  3: chapter3Grade6 as LessonContent
};

const chapterContentMapGrade7: Record<number, LessonContent> = {
  1: chapter1Grade7 as LessonContent,
  2: chapter2Grade7 as LessonContent,
  3: chapter3Grade7 as LessonContent
};

const chapterContentMapGrade8: Record<number, LessonContent> = {
  1: chapter1Grade8 as LessonContent,
  2: chapter2Grade8 as LessonContent,
  3: chapter3Grade8 as LessonContent
};

const chapterContentMapGrade9: Record<number, LessonContent> = {
  1: chapter1Grade9 as LessonContent,
  2: chapter2Grade9 as LessonContent,
  3: chapter3Grade9 as LessonContent
};

/**
 * Load lesson content for a specific chapter and grade
 * @param chapterNumber - The chapter number (1-3 for Mathematics)
 * @param grade - The grade level (6, 7, 8, or 9)
 * @returns The lesson content or null if not found
 */
export function loadLessonContent(chapterNumber: number, grade: number = 6): LessonContent | null {
  if (grade === 9) {
    return chapterContentMapGrade9[chapterNumber] || null;
  }
  if (grade === 8) {
    return chapterContentMapGrade8[chapterNumber] || null;
  }
  if (grade === 7) {
    return chapterContentMapGrade7[chapterNumber] || null;
  }
  return chapterContentMapGrade6[chapterNumber] || null;
}

/**
 * Get all available chapter numbers for a specific grade
 * @param grade - The grade level (6, 7, 8, or 9)
 * @returns Array of available chapter numbers
 */
export function getAvailableChapters(grade: number = 6): number[] {
  if (grade === 9) {
    return Object.keys(chapterContentMapGrade9).map(Number);
  }
  if (grade === 8) {
    return Object.keys(chapterContentMapGrade8).map(Number);
  }
  if (grade === 7) {
    return Object.keys(chapterContentMapGrade7).map(Number);
  }
  return Object.keys(chapterContentMapGrade6).map(Number);
}