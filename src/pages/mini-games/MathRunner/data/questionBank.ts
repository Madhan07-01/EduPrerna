// Adapter for MathRunnerGame expected API
// Provides Question type and helpers compatible with the new Math Runner component

export type Question = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  difficulty: number
}

// Fallback: return empty; Math Runner primarily uses the grade-specific bank
export function getQuestionsForLesson(_subject: string, _grade: string, _lesson: string): Question[] {
  return []
}

export function getQuestionsForLevel(all: Question[], level: number): Question[] {
  const chunk = 3
  const start = (level - 1) * chunk
  return all.slice(start, start + chunk)
}
