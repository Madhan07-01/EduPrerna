import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Trigonometric functions are periodic and not one-one on R. To define inverses, we restrict their domains to principal value branches, yielding inverse trigonometric functions like sin^{-1}x, cos^{-1}x, tan^{-1}x.' },
  { title: '1. Principal Value Branches', content: 'sin^{-1}x: [-1,1] → [-π/2, π/2]\ncos^{-1}x: [-1,1] → [0, π]\ntan^{-1}x: R → (-π/2, π/2)\ncot^{-1}x: R → (0, π)\nsec^{-1}x: (-∞,-1] ∪ [1,∞) → [0,π]\\{π/2}\ncsc^{-1}x: (-∞,-1] ∪ [1,∞) → [-π/2, π/2]\\{0}' },
  { title: '2. Key Identities', content: 'sin(sin^{-1}x) = x (|x|≤1); sin^{-1}(sin x) = x for x ∈ [-π/2, π/2].\ncos(cos^{-1}x) = x (|x|≤1); cos^{-1}(cos x) = x for x ∈ [0, π].\nOdd/even symmetry: sin^{-1}(-x) = -sin^{-1}x; tan^{-1}(-x) = -tan^{-1}x; cos^{-1}(-x) = π − cos^{-1}x.\nSum relations: sin^{-1}x + cos^{-1}x = π/2; tan^{-1}x + cot^{-1}x = π/2.' },
  { title: '3. Graphs', content: 'Graphs of y = sin^{-1}x, cos^{-1}x, tan^{-1}x are reflections of their restricted counterparts about y = x. Ranges: sin^{-1}x ∈ [-π/2, π/2]; cos^{-1}x ∈ [0,π]; tan^{-1}x ∈ (-π/2, π/2).' },
  { title: '4. Useful Formulas', content: 'tan^{-1}a + tan^{-1}b = tan^{-1}((a+b)/(1−ab)) when ab < 1.\nRelations with right triangles and algebraic manipulation are common in problems.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'sin^{-1}(0) equals:', options: [
    { key: 'a', text: 'π' }, { key: 'b', text: '0' }, { key: 'c', text: 'π/2' }, { key: 'd', text: '−π/2' }
  ], answer: 'b', explanation: 'sin^{-1}(0) = 0 within principal range.' },
  { id: 'q2', question: 'If cos^{-1}x = π/3, then x =', options: [
    { key: 'a', text: '1/2' }, { key: 'b', text: '−1/2' }, { key: 'c', text: '√3/2' }, { key: 'd', text: '−√3/2' }
  ], answer: 'a', explanation: 'cos^{-1}x = π/3 means x = cos(π/3) = 1/2.' },
  { id: 'q3', question: 'Principal value of tan^{-1}(−1) is:', options: [
    { key: 'a', text: '−π/4' }, { key: 'b', text: 'π/4' }, { key: 'c', text: '3π/4' }, { key: 'd', text: '−3π/4' }
  ], answer: 'a', explanation: 'tan^{-1} range is (−π/2, π/2).' },
  { id: 'q4', question: 'sin^{-1}x + cos^{-1}x equals:', options: [
    { key: 'a', text: '0' }, { key: 'b', text: 'π' }, { key: 'c', text: 'π/2' }, { key: 'd', text: 'Depends on x' }
  ], answer: 'c', explanation: 'Identity holds for |x| ≤ 1.' },
  { id: 'q5', question: 'Range of y = tan^{-1}x is:', options: [
    { key: 'a', text: '[0, π]' }, { key: 'b', text: '(−π, π)' }, { key: 'c', text: '(−π/2, π/2)' }, { key: 'd', text: '[−π/2, π/2]' }
  ], answer: 'c', explanation: 'Open interval endpoints are excluded.' },
  { id: 'q6', question: 'If θ = cos^{-1}x, then sin θ equals:', options: [
    { key: 'a', text: '√(1−x^2)' }, { key: 'b', text: '−√(1−x^2)' }, { key: 'c', text: '1−x^2' }, { key: 'd', text: 'None' }
  ], answer: 'a', explanation: 'Take principal value 0 ≤ θ ≤ π ⇒ sin θ ≥ 0.' },
  { id: 'q7', question: 'tan^{-1}x + tan^{-1}y = π/4 if and only if', options: [
    { key: 'a', text: '(x+y)/(1−xy) = 1' }, { key: 'b', text: '(x−y)/(1+xy) = 1' }, { key: 'c', text: 'x + y = xy' }, { key: 'd', text: 'None' }
  ], answer: 'a', explanation: 'Using addition formula with ab < 1.' },
  { id: 'q8', question: 'sin^{-1}(−1/2) equals:', options: [
    { key: 'a', text: 'π/6' }, { key: 'b', text: '−π/6' }, { key: 'c', text: '5π/6' }, { key: 'd', text: '−5π/6' }
  ], answer: 'b', explanation: 'Within principal range [−π/2, π/2], value is −π/6.' },
  { id: 'q9', question: 'Which is NOT true?', options: [
    { key: 'a', text: 'sin^{-1}(−x) = −sin^{-1}x' }, { key: 'b', text: 'cos^{-1}(−x) = π − cos^{-1}x' }, { key: 'c', text: 'tan^{-1}(−x) = π − tan^{-1}x' }, { key: 'd', text: 'cot^{-1}(−x) = π − cot^{-1}x' }
  ], answer: 'c', explanation: 'tan^{-1}(−x) = −tan^{-1}x.' },
  { id: 'q10', question: 'sin^{-1}(√3/2) equals:', options: [
    { key: 'a', text: 'π/6' }, { key: 'b', text: 'π/3' }, { key: 'c', text: '2π/3' }, { key: 'd', text: '−π/3' }
  ], answer: 'b', explanation: 'Principal value for √3/2 is π/3.' },
]

export default function MathG12InverseTrig() {
  return (
    <LessonModuleTemplate
      title="Inverse Trigonometric Functions"
      subject="Mathematics"
      grade={12}
      backLink="/lessons/Mathematics/12"
      lessonId="math-g12-inverse-trigonometric-functions"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
