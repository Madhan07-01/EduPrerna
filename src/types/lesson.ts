// TypeScript interfaces for the lesson data model

export interface MCQ {
  id: string;
  question: string;
  options: [string, string, string] | [string, string, string, string]; // 3 or 4 options: a, b, c or a, b, c, d
  correctAnswer: number; // Index of correct answer (0, 1, 2, or 3)
  explanation?: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string; // Rich text/markdown content
  mcqs: MCQ[];
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  grade: number;
  subject: string;
  description?: string;
  sections: LessonSection[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonProgress {
  userId: string;
  lessonId: string;
  completedSections: string[];
  mcqScores: Record<string, number>; // sectionId -> score out of total MCQs
  currentSection: number;
  totalProgress: number; // Percentage (0-100)
  lastAccessed: Date;
}