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
import chapter1Grade10 from '../content/mathematics/grade10/chapter1.json';
import chapter2Grade10 from '../content/mathematics/grade10/chapter2.json';
import chapter3Grade10 from '../content/mathematics/grade10/chapter3.json';
import chapter1Grade11 from '../content/mathematics/grade11/chapter1.json';
import chapter2Grade11 from '../content/mathematics/grade11/chapter2.json';
import chapter3Grade11 from '../content/mathematics/grade11/chapter3.json';
import relationsAndFunctionsGrade12 from '../content/mathematics/grade12/relations-and-functions.json';
import inverseTrigonometricFunctionsGrade12 from '../content/mathematics/grade12/inverse-trigonometric-functions.json';
import matricesGrade12 from '../content/mathematics/grade12/matrices.json';

// Define types for the existing lesson content structure
interface Subtopic {
  title: string;
  content: string;
}

interface QuestionOld {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface QuizOld {
  questions: QuestionOld[];
}

export interface LessonContentOld {
  title: string;
  subtopics: Subtopic[];
  quiz: QuizOld;
}

// Define types for the new Grade 12 lesson content structure
interface ContentItem {
  type: string;
  [key: string]: any;
}

interface Chapter {
  id: string;
  title: string;
  content: ContentItem[];
}

interface QuestionNew {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizNew {
  title: string;
  questions: QuestionNew[];
}

export interface LessonContentNew {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  quiz: QuizNew;
}

// Create a union type for both structures
export type LessonContent = LessonContentOld | LessonContentNew;

// Map chapter numbers to their content for different grades
const chapterContentMapGrade6: Record<number, LessonContentOld> = {
  1: chapter1Grade6 as LessonContentOld,
  2: chapter2Grade6 as LessonContentOld,
  3: chapter3Grade6 as LessonContentOld
};

const chapterContentMapGrade7: Record<number, LessonContentOld> = {
  1: chapter1Grade7 as LessonContentOld,
  2: chapter2Grade7 as LessonContentOld,
  3: chapter3Grade7 as LessonContentOld
};

const chapterContentMapGrade8: Record<number, LessonContentOld> = {
  1: chapter1Grade8 as LessonContentOld,
  2: chapter2Grade8 as LessonContentOld,
  3: chapter3Grade8 as LessonContentOld
};

const chapterContentMapGrade9: Record<number, LessonContentOld> = {
  1: chapter1Grade9 as LessonContentOld,
  2: chapter2Grade9 as LessonContentOld,
  3: chapter3Grade9 as LessonContentOld
};

const chapterContentMapGrade10: Record<number, LessonContentOld> = {
  1: chapter1Grade10 as LessonContentOld,
  2: chapter2Grade10 as LessonContentOld,
  3: chapter3Grade10 as LessonContentOld
};

const chapterContentMapGrade11: Record<number, LessonContentOld> = {
  1: chapter1Grade11 as LessonContentOld,
  2: chapter2Grade11 as LessonContentOld,
  3: chapter3Grade11 as LessonContentOld
};

// Map chapter numbers to their content for Grade 12
const chapterContentMapGrade12: Record<number, LessonContentNew> = {
  1: relationsAndFunctionsGrade12 as LessonContentNew,
  2: inverseTrigonometricFunctionsGrade12 as LessonContentNew,
  3: matricesGrade12 as LessonContentNew
};

/**
 * Type guard to check if content is in the old format
 * @param content - The lesson content to check
 * @returns true if content is in the old format
 */
export function isOldFormat(content: LessonContent): content is LessonContentOld {
  return (content as LessonContentOld).subtopics !== undefined;
}

/**
 * Type guard to check if content is in the new format
 * @param content - The lesson content to check
 * @returns true if content is in the new format
 */
export function isNewFormat(content: LessonContent): content is LessonContentNew {
  return (content as LessonContentNew).chapters !== undefined;
}

/**
 * Load lesson content for a specific chapter and grade
 * @param chapterNumber - The chapter number (1-3 for Mathematics)
 * @param grade - The grade level (6-12)
 * @returns The lesson content or null if not found
 */
export function loadLessonContent(chapterNumber: number, grade: number = 6): LessonContent | null {
  if (grade === 12) {
    return chapterContentMapGrade12[chapterNumber] || null;
  }
  if (grade === 11) {
    return chapterContentMapGrade11[chapterNumber] || null;
  }
  if (grade === 10) {
    return chapterContentMapGrade10[chapterNumber] || null;
  }
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
 * @param grade - The grade level (6-12)
 * @returns Array of available chapter numbers
 */
export function getAvailableChapters(grade: number = 6): number[] {
  if (grade === 12) {
    return Object.keys(chapterContentMapGrade12).map(Number);
  }
  if (grade === 11) {
    return Object.keys(chapterContentMapGrade11).map(Number);
  }
  if (grade === 10) {
    return Object.keys(chapterContentMapGrade10).map(Number);
  }
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