export type EquationQuestion = {
  id?: number
  equation: string
  availableOptions: Array<string | number>
  difficulty?: number
}

// Provided nested question bank
export const EQUATION_QUESTION_BANK: Record<string, Record<string, Record<string, EquationQuestion[]>>> = {
  mathematics: {
    'grade-6': {
      'Fractions': [
        { id: 1, equation: '_ + _ = 8', availableOptions: [2, 3, 5, 7, 4, 6], difficulty: 1 },
        { id: 2, equation: '_ - _ = 4', availableOptions: [1, 2, 3, 7, 8, 5], difficulty: 1 },
        { id: 3, equation: '_ × _ = 12', availableOptions: [2, 3, 4, 6, 5, 1], difficulty: 1 },
        { id: 4, equation: '_ + _ = 10', availableOptions: [2, 4, 6, 8, 3, 5], difficulty: 2 },
        { id: 5, equation: '_ × _ = 15', availableOptions: [2, 3, 5, 7, 4, 6], difficulty: 2 },
        { id: 6, equation: '_ - _ = 2', availableOptions: [1, 2, 3, 5, 6, 4], difficulty: 2 },
        { id: 7, equation: '_ ÷ _ = 3', availableOptions: [2, 3, 6, 9, 4, 5], difficulty: 2 },
        { id: 8, equation: '_ + _ = 9', availableOptions: [2, 4, 5, 7, 3, 6], difficulty: 2 },
        { id: 9, equation: '_ × _ = 18', availableOptions: [2, 3, 6, 9, 4, 5], difficulty: 2 },
        { id: 10, equation: '_ - _ = 5', availableOptions: [3, 5, 7, 8, 9, 6], difficulty: 3 },
        { id: 11, equation: '_ × _ = 20', availableOptions: [2, 4, 5, 8, 6, 3], difficulty: 3 },
        { id: 12, equation: '_ ÷ _ = 4', availableOptions: [3, 4, 6, 12, 8, 2], difficulty: 3 },
        { id: 13, equation: '_ + _ = 15', availableOptions: [5, 6, 7, 8, 9, 4], difficulty: 3 },
        { id: 14, equation: '_ - _ = 6', availableOptions: [4, 6, 8, 10, 12, 5], difficulty: 3 },
        { id: 15, equation: '_ × _ = 24', availableOptions: [3, 4, 6, 8, 5, 7], difficulty: 3 }
      ],
      'Algebra Basics': [
        { id: 1, equation: 'x + _ = 12', availableOptions: [3, 4, 5, 6, 7, 8], difficulty: 1 },
        { id: 2, equation: '_ - x = 8', availableOptions: [12, 13, 14, 15, 16, 17], difficulty: 1 },
        { id: 3, equation: '_ × 3 = 21', availableOptions: [5, 6, 7, 8, 9, 10], difficulty: 1 },
        { id: 4, equation: 'x + _ = 20', availableOptions: [6, 7, 8, 9, 10, 11], difficulty: 2 },
        { id: 5, equation: '_ - 3x = 9', availableOptions: [18, 21, 24, 27, 30, 33], difficulty: 2 },
        { id: 6, equation: '2x + _ = 16', availableOptions: [2, 3, 4, 5, 6, 7], difficulty: 2 },
        { id: 7, equation: '_ ÷ x = 5', availableOptions: [20, 22, 25, 28, 30, 32], difficulty: 2 },
        { id: 8, equation: 'x² - _ = 16', availableOptions: [6, 7, 8, 9, 10, 11], difficulty: 2 },
        { id: 9, equation: '_ + 2x = 18', availableOptions: [6, 7, 8, 9, 10, 11], difficulty: 2 },
        { id: 10, equation: '3x - _ = 12', availableOptions: [4, 5, 6, 7, 8, 9], difficulty: 3 },
        { id: 11, equation: '_ + x² = 34', availableOptions: [7, 8, 9, 10, 11, 12], difficulty: 3 },
        { id: 12, equation: 'x³ + _ = 35', availableOptions: [6, 7, 8, 9, 10, 11], difficulty: 3 },
        { id: 13, equation: '_ - 4x = 8', availableOptions: [24, 26, 28, 30, 32, 34], difficulty: 3 },
        { id: 14, equation: '5x + _ = 35', availableOptions: [8, 9, 10, 11, 12, 13], difficulty: 3 },
        { id: 15, equation: '_ ÷ (x-1) = 6', availableOptions: [24, 27, 30, 33, 36, 39], difficulty: 3 }
      ]
    },
    'grade-10': {
      'Quadratic Equations': [
        { id: 1, equation: 'x² + _x + 12 = 0', availableOptions: [4, 5, 6, 7, 8, 9], difficulty: 1 },
        { id: 2, equation: 'x² - _ = 0', availableOptions: [9, 16, 25, 36, 49, 64], difficulty: 1 },
        { id: 3, equation: '_ + x² = 13', availableOptions: [2, 3, 4, 5, 6, 7], difficulty: 1 },
        { id: 4, equation: 'x² + 6x + _ = 0', availableOptions: [5, 8, 9, 10, 12, 15], difficulty: 2 },
        { id: 5, equation: '2x² - _ = 0', availableOptions: [8, 18, 32, 50, 72, 98], difficulty: 2 },
        { id: 6, equation: 'x² - _x + 20 = 0', availableOptions: [8, 9, 10, 11, 12, 13], difficulty: 2 },
        { id: 7, equation: '_ - 4x² = -36', availableOptions: [0, 4, 8, 12, 16, 20], difficulty: 2 },
        { id: 8, equation: 'x² + 2x - _ = 0', availableOptions: [8, 15, 24, 35, 48, 63], difficulty: 2 },
        { id: 9, equation: '3x² + _x + 3 = 0', availableOptions: [4, 5, 6, 7, 8, 9], difficulty: 2 },
        { id: 10, equation: 'x² - 10x + _ = 0', availableOptions: [16, 21, 25, 30, 36, 42], difficulty: 3 },
        { id: 11, equation: '_x² + 8x + 12 = 0', availableOptions: [1, 2, 3, 4, 5, 6], difficulty: 3 },
        { id: 12, equation: 'x² + _x - 56 = 0', availableOptions: [1, 3, 5, 7, 9, 11], difficulty: 3 },
        { id: 13, equation: '4x² - _x + 1 = 0', availableOptions: [2, 3, 4, 5, 6, 7], difficulty: 3 },
        { id: 14, equation: 'x² + 12x + _ = 0', availableOptions: [27, 32, 35, 36, 40, 45], difficulty: 3 },
        { id: 15, equation: '_x² - 18x + 81 = 0', availableOptions: [1, 2, 3, 4, 5, 6], difficulty: 3 }
      ]
    },
    'grade-12': {
      'Calculus': [
        { id: 1, equation: '∫ cos x dx = _', availableOptions: ['sin x + C', 'cos x + C', '-sin x + C', 'tan x + C', 'x + C', '1 + C'], difficulty: 1 },
        { id: 2, equation: '∫ _ dx = x + C', availableOptions: ['1', 'x', 'x²', '2x', '0', 'C'], difficulty: 1 },
        { id: 3, equation: 'd/dx (x²) = _', availableOptions: ['x', '2x', 'x²', '2', '1', '0'], difficulty: 1 },
        { id: 4, equation: '∫ 2x dx = _', availableOptions: ['x² + C', '2x² + C', 'x + C', '2x + C', 'x³ + C', '2 + C'], difficulty: 2 },
        { id: 5, equation: 'd/dx (sin x) = _', availableOptions: ['cos x', '-cos x', 'sin x', '-sin x', 'tan x', '1'], difficulty: 2 },
        { id: 6, equation: '∫ _ dx = ln|x| + C', availableOptions: ['1/x', 'x', '1', 'ln x', 'e^x', 'x²'], difficulty: 2 },
        { id: 7, equation: 'd/dx (e^x) = _', availableOptions: ['e^x', 'x*e^x', 'e', 'x', '1', 'ln x'], difficulty: 2 },
        { id: 8, equation: '∫ x² dx = _', availableOptions: ['x³/3 + C', 'x² + C', '2x + C', 'x³ + C', '3x² + C', 'x/3 + C'], difficulty: 2 },
        { id: 9, equation: 'd/dx (ln x) = _', availableOptions: ['1/x', 'x', '1', 'ln x', 'e^x', '0'], difficulty: 2 },
        { id: 10, equation: '∫ e^x dx = _', availableOptions: ['e^x + C', 'x*e^x + C', 'e^x/x + C', 'ln(e^x) + C', 'x + C', 'e + C'], difficulty: 3 },
        { id: 11, equation: 'd/dx (x^n) = _', availableOptions: ['n*x^(n-1)', 'x^n', 'n*x^n', 'x^(n-1)', 'n*x', 'x^(n+1)'], difficulty: 3 },
        { id: 12, equation: '∫ sin x dx = _', availableOptions: ['-cos x + C', 'cos x + C', 'sin x + C', '-sin x + C', 'tan x + C', '1 + C'], difficulty: 3 },
        { id: 13, equation: 'd/dx (tan x) = _', availableOptions: ['sec² x', 'cos² x', 'sin² x', 'tan² x', '1', 'sec x'], difficulty: 3 },
        { id: 14, equation: '∫ _ dx = -cos x + C', availableOptions: ['sin x', 'cos x', '-sin x', '-cos x', 'tan x', '1'], difficulty: 3 },
        { id: 15, equation: 'd/dx (cos x) = _', availableOptions: ['-sin x', 'sin x', 'cos x', '-cos x', 'tan x', '0'], difficulty: 3 }
      ]
    }
  },
  physics: {
    'grade-8': {
      'Electricity and Circuits': [
        { id: 1, equation: 'V = I × _', availableOptions: ['R', 'P', 'W', 'Q', 'F', 'C'], difficulty: 1 },
        { id: 2, equation: 'P = _ × I', availableOptions: ['V', 'R', 'W', 'Q', 'F', 'C'], difficulty: 1 },
        { id: 3, equation: 'I = _ ÷ R', availableOptions: ['V', 'P', 'W', 'Q', 'F', 'C'], difficulty: 1 },
        { id: 4, equation: 'R = _ ÷ I', availableOptions: ['V', 'P', 'W', 'Q', 'F', 'C'], difficulty: 2 },
        { id: 5, equation: 'P = I² × _', availableOptions: ['R', 'V', 'W', 'Q', 'F', 'C'], difficulty: 2 },
        { id: 6, equation: 'W = P × _', availableOptions: ['t', 'V', 'R', 'Q', 'F', 'C'], difficulty: 2 },
        { id: 7, equation: 'Q = I × _', availableOptions: ['t', 'V', 'R', 'P', 'F', 'C'], difficulty: 2 },
        { id: 8, equation: 'E = _ × Q', availableOptions: ['V', 'I', 'R', 'P', 'F', 'C'], difficulty: 2 },
        { id: 9, equation: 'F = k × _', availableOptions: ['q₁q₂/r²', 'q₁+q₂', 'r²', 'q₁×q₂', 'r', 'k'], difficulty: 2 },
        { id: 10, equation: 'C = Q ÷ _', availableOptions: ['V', 'I', 'R', 'P', 'F', 't'], difficulty: 3 },
        { id: 11, equation: 'Rtotal = R₁ + R₂ + _', availableOptions: ['R₃', 'R₁R₂', '1/R₃', 'R₁-R₂', 'R₁×R₂', '2R₃'], difficulty: 3 },
        { id: 12, equation: '1/Rtotal = 1/R₁ + 1/R₂ + _', availableOptions: ['1/R₃', 'R₃', 'R₁R₂', 'R₁+R₂', 'R₁×R₂', '2/R₃'], difficulty: 3 },
        { id: 13, equation: 'η = (Pout ÷ _) × 100%', availableOptions: ['Pin', 'Pout', 'Ptotal', 'Ploss', 'V', 'I'], difficulty: 3 },
        { id: 14, equation: 'τ = R × _', availableOptions: ['C', 'L', 'V', 'I', 'P', 'W'], difficulty: 3 },
        { id: 15, equation: 'XL = 2π × f × _', availableOptions: ['L', 'C', 'R', 'f', 'π', 'ω'], difficulty: 3 }
      ]
    }
  },
  'computer-science': {
    'grade-7': {
      'Logic and Problem Solving': [
        { id: 1, equation: '_ AND 1 = 0', availableOptions: [0, 1, 'True', 'False', 'X', 'Y'], difficulty: 1 },
        { id: 2, equation: '1 OR _ = 1', availableOptions: [0, 1, 'True', 'False', 'X', 'Y'], difficulty: 1 },
        { id: 3, equation: 'NOT _ = 0', availableOptions: [0, 1, 'True', 'False', 'X', 'Y'], difficulty: 1 },
        { id: 4, equation: '_ XOR 1 = 0', availableOptions: [0, 1, 'True', 'False', 'X', 'Y'], difficulty: 2 },
        { id: 5, equation: '(A AND B) OR _ = 1', availableOptions: ['A', 'B', 'C', 'D', '0', '1'], difficulty: 2 },
        { id: 6, equation: 'NOT(A OR _) = NOT A AND NOT B', availableOptions: ['A', 'B', 'C', 'D', '0', '1'], difficulty: 2 },
        { id: 7, equation: 'A AND (B OR _) = (A AND B) OR (A AND C)', availableOptions: ['A', 'B', 'C', 'D', 'E', 'F'], difficulty: 2 },
        { id: 8, equation: '_ NAND B = NOT(A AND B)', availableOptions: ['A', 'B', 'C', 'D', '0', '1'], difficulty: 2 },
        { id: 9, equation: 'A NOR _ = NOT(A OR B)', availableOptions: ['A', 'B', 'C', 'D', '0', '1'], difficulty: 2 },
        { id: 10, equation: '(A XOR B) XOR _ = A XOR (B XOR C)', availableOptions: ['A', 'B', 'C', 'D', 'E', 'F'], difficulty: 3 },
        { id: 11, equation: 'A → B = _ OR B', availableOptions: ['A', 'NOT A', 'B', 'NOT B', 'C', 'D'], difficulty: 3 },
        { id: 12, equation: 'A ↔ B = (A → B) AND (_→ A)', availableOptions: ['A', 'B', 'NOT A', 'NOT B', 'C', 'D'], difficulty: 3 },
        { id: 13, equation: '∀x P(x) = P(a) AND P(b) AND _', availableOptions: ['P(a)', 'P(b)', 'P(c)', 'P(x)', 'Q(x)', 'R(x)'], difficulty: 3 },
        { id: 14, equation: '∃x P(x) = P(a) OR P(b) OR _', availableOptions: ['P(a)', 'P(b)', 'P(c)', 'P(x)', 'Q(x)', 'R(x)'], difficulty: 3 },
        { id: 15, equation: 'while(condition) { _ }', availableOptions: ['statement', 'condition', 'loop', 'break', 'continue', 'return'], difficulty: 3 }
      ]
    }
  }
}

// Normalization helpers
function normalizeSubject(s: string): string {
  const v = (s || '').toLowerCase().trim()
  if (v.startsWith('math')) return 'mathematics'
  if (v === 'cs' || v.includes('computer')) return 'computer-science'
  return v
}
function normalizeGrade(g: string): string {
  const n = (g || '').toLowerCase().replace('grade', '').replace('g', '').trim()
  const num = parseInt(n || '0', 10)
  return `grade-${isNaN(num) ? n : num}`
}

// Build a flat array of questions for a subject+grade. If a specific topic is desired, pass its key via lesson; otherwise aggregate.
export function getEquationQuestionsForLesson(subject: string, grade: string, lesson?: string): EquationQuestion[] {
  const s = normalizeSubject(subject)
  const g = normalizeGrade(grade)
  const bankForSG = EQUATION_QUESTION_BANK[s]?.[g]
  if (bankForSG) {
    if (lesson) {
      // try to match a topic by name (case-insensitive contains)
      const topics = Object.keys(bankForSG)
      const matchKey = topics.find(t => t.toLowerCase().includes(lesson.toLowerCase()))
      if (matchKey) return bankForSG[matchKey]
    }
    // aggregate all topics
    return Object.values(bankForSG).flat()
  }

  // Fallback for Math Grade 9 so game remains playable if no data present
  if (s === 'mathematics' && (g === 'grade-9' || g === 'grade-09')) {
    return [
      { equation: '_ + 3 = 7', availableOptions: [4, 2, 1, 3] },
      { equation: '2 × _ = 8', availableOptions: [4, 8, 2, 16] },
      { equation: '_ − 5 = 4', availableOptions: [9, 6, 11, 5] },
      { equation: '3x = _', availableOptions: [9, 6, 12, 3] },
      { equation: '_ / 4 = 3', availableOptions: [12, 16, 20, 24] },
      { equation: '(_)^2 = 25', availableOptions: [5, -5, 10, 25] },
    ]
  }
  return []
}

export function getEquationQuestionsForLevel(all: EquationQuestion[], level: number): EquationQuestion[] {
  // 3 questions per level, sequential slice; if difficulty exists, a smarter scheme could be used.
  const chunk = 3
  const start = (level - 1) * chunk
  return all.slice(start, start + chunk)
}
