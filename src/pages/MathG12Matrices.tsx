import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'A matrix is a rectangular array of numbers arranged in rows and columns. Matrices are used for systems of equations, transformations, and data representation across STEM fields.' },
  { title: '1. Types of Matrices', content: 'Row, Column, Square, Zero (null), Identity (I), Diagonal, Scalar, Symmetric (A = A^T), Skew-symmetric (A^T = -A).' },
  { title: '2. Equality', content: 'Same order and element-wise equality.' },
  { title: '3. Operations', content: 'Addition/Subtraction (same order); Scalar multiplication; Matrix multiplication (AB defined if cols(A) = rows(B); not commutative in general).' },
  { title: '4. Transpose', content: 'A^T: interchange rows and columns. Properties: (AB)^T = B^T A^T; (A^T)^T = A; (kA)^T = kA^T; (A + B)^T = A^T + B^T.' },
  { title: '5. Special Results', content: 'For any square matrix A: A + A^T is symmetric; A - A^T is skew-symmetric.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Order of a matrix with 3 rows and 4 columns is:', options: [
    { key: 'a', text: '4×3' }, { key: 'b', text: '3×4' }, { key: 'c', text: '7' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Rows × Columns.' },
  { id: 'q2', question: 'If A = [[1,2],[3,4]], then A^T =', options: [
    { key: 'a', text: '[[1,3],[2,4]]' }, { key: 'b', text: '[[4,3],[2,1]]' }, { key: 'c', text: '[[2,1],[4,3]]' }, { key: 'd', text: 'None' }
  ], answer: 'a', explanation: 'Transpose swaps rows and columns.' },
  { id: 'q3', question: 'For any square A, which is always symmetric?', options: [
    { key: 'a', text: 'A - A^T' }, { key: 'b', text: 'A + A^T' }, { key: 'c', text: 'A^T = -A' }, { key: 'd', text: 'A^T = A' }
  ], answer: 'b', explanation: '(A + A^T)^T = A^T + A = A + A^T.' },
  { id: 'q4', question: 'If A is 2×3 and B is 3×4, order of AB is:', options: [
    { key: 'a', text: '2×4' }, { key: 'b', text: '3×3' }, { key: 'c', text: '4×2' }, { key: 'd', text: 'Not defined' }
  ], answer: 'a', explanation: 'Inner dimensions match (3); result is 2×4.' },
  { id: 'q5', question: 'Matrix multiplication is:', options: [
    { key: 'a', text: 'Always commutative' }, { key: 'b', text: 'Never defined' }, { key: 'c', text: 'Not commutative in general' }, { key: 'd', text: 'Only for square matrices' }
  ], answer: 'c', explanation: 'AB ≠ BA in general.' },
  { id: 'q6', question: 'The transpose of a skew-symmetric matrix is:', options: [
    { key: 'a', text: 'Same matrix' }, { key: 'b', text: 'Negative of the matrix' }, { key: 'c', text: 'Symmetric' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'By definition A^T = -A.' },
  { id: 'q7', question: 'Identity matrix I has:', options: [
    { key: 'a', text: 'All zeros' }, { key: 'b', text: '1s on diagonal and 0 elsewhere' }, { key: 'c', text: 'All ones' }, { key: 'd', text: 'Negative diagonal' }
  ], answer: 'b', explanation: 'I acts as multiplicative identity: IA = AI = A.' },
  { id: 'q8', question: 'AB is defined iff:', options: [
    { key: 'a', text: 'rows(A) = rows(B)' }, { key: 'b', text: 'cols(A) = rows(B)' }, { key: 'c', text: 'rows(A) = cols(B)' }, { key: 'd', text: 'cols(A) = cols(B)' }
  ], answer: 'b', explanation: 'Inner dimensions must match.' },
  { id: 'q9', question: 'If A = [[2,-3],[4,5]], then A + A^T =', options: [
    { key: 'a', text: '[[2,1],[1,5]]' }, { key: 'b', text: '[[4,1],[1,10]]' }, { key: 'c', text: '[[4,-6],[8,10]]' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'A + A^T = [[2+2, -3+4],[4-3, 5+5]] = [[4,1],[1,10]].' },
  { id: 'q10', question: 'A zero matrix is:', options: [
    { key: 'a', text: 'A matrix with all entries 0' }, { key: 'b', text: 'A matrix with ones on diagonal' }, { key: 'c', text: 'A diagonal matrix with equal diagonals' }, { key: 'd', text: 'None' }
  ], answer: 'a', explanation: 'Also called null matrix.' },
]

export default function MathG12Matrices() {
  return (
    <LessonModuleTemplate
      title="Matrices"
      subject="Mathematics"
      grade={12}
      backLink="/lessons/Mathematics/12"
      lessonId="math-g12-matrices"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
