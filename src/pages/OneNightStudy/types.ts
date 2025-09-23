export type Topic = {
  grade: number
  subject: string
  title: string
  bullets: string[]
}

export type MCQ = {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export type LearningModule = {
  title: string
  introduction: string
  concepts: {
    title: string
    content: string
    examples: string[]
  }[]
  mcqs: MCQ[]
}