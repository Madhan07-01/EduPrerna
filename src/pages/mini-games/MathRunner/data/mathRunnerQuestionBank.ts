// Math Runner Question Bank (Grade 8 Mathematics)
// Exposes helpers used by MathRunnerGame.tsx

export type MRQuestion = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  difficulty: number
}

type TopicQuestions = Record<string, MRQuestion[]>
export type GradeQuestions = Record<string, TopicQuestions>

const mathematicsQuestions: GradeQuestions = {
  'grade-8': {
    'Fractions': [
      { id: 1, question: 'What is 1/2 + 1/4?', options: ['1/4', '3/4', '1/6'], correctAnswer: 1, difficulty: 1 },
      { id: 2, question: 'What is 2/3 of 12?', options: ['6', '8', '4'], correctAnswer: 1, difficulty: 1 },
      { id: 3, question: 'Which is larger: 3/5 or 2/3?', options: ['3/5', '2/3', 'Equal'], correctAnswer: 1, difficulty: 1 },
      { id: 4, question: 'What is 3/4 - 1/2?', options: ['1/4', '1/2', '2/4'], correctAnswer: 0, difficulty: 2 },
      { id: 5, question: 'Convert 1.5 to a fraction', options: ['3/2', '1/2', '5/3'], correctAnswer: 0, difficulty: 2 },
      { id: 6, question: 'What is 2/5 + 1/5?', options: ['3/5', '3/10', '1/5'], correctAnswer: 0, difficulty: 2 },
      { id: 7, question: 'Simplify 6/8', options: ['3/4', '2/3', '4/6'], correctAnswer: 0, difficulty: 2 },
      { id: 8, question: 'What is 5/6 - 1/3?', options: ['1/2', '4/3', '2/6'], correctAnswer: 0, difficulty: 2 },
      { id: 9, question: 'Which fraction equals 0.25?', options: ['1/4', '1/3', '2/5'], correctAnswer: 0, difficulty: 2 },
      { id: 10, question: 'What is 1/3 × 2/5?', options: ['2/15', '3/8', '2/8'], correctAnswer: 0, difficulty: 3 },
      { id: 11, question: 'Convert 3/4 to decimal', options: ['0.75', '0.34', '0.43'], correctAnswer: 0, difficulty: 3 },
      { id: 12, question: 'What is the reciprocal of 2/3?', options: ['3/2', '2/3', '6'], correctAnswer: 0, difficulty: 3 },
      { id: 13, question: 'Which is smallest: 1/2, 1/3, or 1/4?', options: ['1/2', '1/3', '1/4'], correctAnswer: 2, difficulty: 3 },
      { id: 14, question: 'What is 4/5 + 1/10?', options: ['9/10', '5/15', '4/10'], correctAnswer: 0, difficulty: 3 },
      { id: 15, question: 'Divide 3/4 by 1/2', options: ['3/2', '3/8', '6/4'], correctAnswer: 0, difficulty: 3 }
    ],
    'Algebra Basics': [
      { id: 1, question: 'Solve: x + 5 = 8', options: ['x = 3', 'x = 4', 'x = 2'], correctAnswer: 0, difficulty: 1 },
      { id: 2, question: 'What is 2x when x = 4?', options: ['6', '8', '10'], correctAnswer: 1, difficulty: 1 },
      { id: 3, question: 'Solve: x - 7 = 12', options: ['x = 19', 'x = 5', 'x = -5'], correctAnswer: 0, difficulty: 1 },
      { id: 4, question: 'What is 3x + 2 when x = 2?', options: ['8', '7', '6'], correctAnswer: 0, difficulty: 2 },
      { id: 5, question: 'Solve: 4x = 20', options: ['x = 5', 'x = 4', 'x = 16'], correctAnswer: 0, difficulty: 2 },
      { id: 6, question: 'If a = b + 3 and b = 5, what is a?', options: ['8', '2', '15'], correctAnswer: 0, difficulty: 2 },
      { id: 7, question: 'Solve: x/3 = 4', options: ['x = 12', 'x = 7', 'x = 1'], correctAnswer: 0, difficulty: 2 },
      { id: 8, question: 'What is the value of 5x - 3 when x = 4?', options: ['17', '23', '13'], correctAnswer: 0, difficulty: 2 },
      { id: 9, question: 'Solve: 2x + 5 = 13', options: ['x = 4', 'x = 9', 'x = 6'], correctAnswer: 0, difficulty: 2 },
      { id: 10, question: 'If y = x² and x = 3, what is y?', options: ['9', '6', '12'], correctAnswer: 0, difficulty: 3 },
      { id: 11, question: 'Solve: 3(x - 2) = 12', options: ['x = 6', 'x = 4', 'x = 8'], correctAnswer: 0, difficulty: 3 },
      { id: 12, question: 'What is x if 2x - 8 = x + 2?', options: ['x = 10', 'x = 6', 'x = 4'], correctAnswer: 0, difficulty: 3 },
      { id: 13, question: 'Solve: 3x - 6 = 9', options: ['x = 5', 'x = 4', 'x = 3'], correctAnswer: 0, difficulty: 3 },
      { id: 14, question: 'If y = 2x + 1, what is y when x = 3?', options: ['7', '6', '8'], correctAnswer: 0, difficulty: 3 },
      { id: 15, question: 'Solve: 2(x + 3) = 14', options: ['x = 4', 'x = 5', 'x = 3'], correctAnswer: 0, difficulty: 3 }
    ],
    'Geometry Fundamentals': [
      { id: 1, question: 'How many sides does a triangle have?', options: ['2', '3', '4'], correctAnswer: 1, difficulty: 1 },
      { id: 2, question: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '360°'], correctAnswer: 1, difficulty: 1 },
      { id: 3, question: 'How many vertices does a cube have?', options: ['6', '8', '12'], correctAnswer: 1, difficulty: 1 },
      { id: 4, question: 'Area of a rectangle with length 5 and width 3?', options: ['8', '15', '16'], correctAnswer: 1, difficulty: 2 },
      { id: 5, question: 'What is the perimeter of a square with side 4?', options: ['8', '12', '16'], correctAnswer: 2, difficulty: 2 },
      { id: 6, question: 'How many edges does a rectangular prism have?', options: ['8', '10', '12'], correctAnswer: 2, difficulty: 2 },
      { id: 7, question: 'What is the perimeter of a rectangle 6×4?', options: ['20', '24', '10'], correctAnswer: 0, difficulty: 2 },
      { id: 8, question: 'Which angle is 90 degrees?', options: ['Acute', 'Right', 'Obtuse'], correctAnswer: 1, difficulty: 2 },
      { id: 9, question: 'How many faces does a pyramid have?', options: ['4', '5', '6'], correctAnswer: 1, difficulty: 2 },
      { id: 10, question: 'Which shape has 6 sides?', options: ['Pentagon', 'Hexagon', 'Octagon'], correctAnswer: 1, difficulty: 3 },
      { id: 11, question: 'What is the area of a circle with radius 3? (π = 3.14)', options: ['28.26', '18.84', '9.42'], correctAnswer: 0, difficulty: 3 },
      { id: 12, question: 'What is the circumference of a circle with radius 2? (π = 3.14)', options: ['12.56', '6.28', '4.14'], correctAnswer: 0, difficulty: 3 },
      { id: 13, question: 'Which shape has all equal sides?', options: ['Rectangle', 'Square', 'Parallelogram'], correctAnswer: 1, difficulty: 3 },
      { id: 14, question: 'What is the volume of a cube with side 3?', options: ['27', '18', '9'], correctAnswer: 0, difficulty: 3 },
      { id: 15, question: 'How many degrees in a full circle?', options: ['180°', '270°', '360°'], correctAnswer: 2, difficulty: 3 }
    ]
  }
}

function normalizeGrade(grade: string): string {
  const g = (grade || '').toLowerCase().replace('grade','').replace('g','').trim()
  return `grade-${g}`
}

export function isGradeSupported(grade: string): boolean {
  const g = normalizeGrade(grade)
  return g === 'grade-8'
}

// Returns 3 question texts for a given level (1..5)
// If lesson matches a topic name, prefers that topic; otherwise maps
export function getQuestionsForLevel(grade: string, lesson: string, level: string): string[] {
  const g = normalizeGrade(grade)
  if (g !== 'grade-8') return []

  const topics = mathematicsQuestions['grade-8']
  const lessonLower = (lesson || '').toLowerCase()

  const pickTopicKey = () => {
    const keys = Object.keys(topics)
    const match = keys.find(k => k.toLowerCase().includes(lessonLower))
    if (match) return match
    // default mapping by level: L1-2 Fractions, L3-4 Algebra Basics, L5 Geometry
    if (parseInt(level, 10) <= 2) return 'Fractions'
    if (parseInt(level, 10) <= 4) return 'Algebra Basics'
    return 'Geometry Fundamentals'
  }

  const topicKey = pickTopicKey()
  const arr = topics[topicKey] || []

  // Take 3 items per level with wrap-around
  const lvl = Math.max(1, Math.min(5, parseInt(level, 10) || 1))
  const start = ((lvl - 1) * 3) % arr.length
  const slice = arr.slice(start, start + 3)
  return slice.map(q => q.question)
}
