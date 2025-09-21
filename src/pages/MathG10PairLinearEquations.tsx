import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'A linear equation in two variables has the form ax + by + c = 0, where a, b, c are real and a, b are not both zero. A pair of linear equations represents two lines; their solution is the point(s) common to both.' },
  { title: '1. Forms of Linear Equations', content: 'General form: a₁x + b₁y + c₁ = 0, a₂x + b₂y + c₂ = 0. Each represents a straight line in the plane.' },
  { title: '2. Consistency of a Pair of Equations', content: 'Intersecting (unique solution): a₁/a₂ ≠ b₁/b₂. Coincident (infinitely many): a₁/a₂ = b₁/b₂ = c₁/c₂. Parallel (no solution): a₁/a₂ = b₁/b₂ ≠ c₁/c₂.' },
  { title: '3. Methods of Solving', content: 'Graphical: plot and intersect. Substitution: solve one eqn for a variable, substitute in the other. Elimination: multiply/add/subtract to eliminate a variable. Cross‑multiplication: for general form equations use the standard formula.' },
  { title: '4. Cross‑Multiplication Formula', content: 'For a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0: x/(b₁c₂ − b₂c₁) = y/(c₁a₂ − c₂a₁) = 1/(a₁b₂ − a₂b₁), provided denominators are non‑zero.' },
  { title: 'Summary', content: 'Identify the relationship of lines via coefficient ratios; solve via substitution/elimination/cross‑multiplication; graphical view gives geometric insight.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'General form in two variables:', options: [
    { key: 'a', text: 'ax^2 + by + c = 0' }, { key: 'b', text: 'ax + by + c = 0' }, { key: 'c', text: 'ax + b = 0' }, { key: 'd', text: 'ax^2 + by^2 + c = 0' }
  ], answer: 'b', explanation: 'ax + by + c = 0.' },
  { id: 'q2', question: '2x + 3y = 7 and 4x + 6y = 14 are:', options: [
    { key: 'a', text: 'Intersecting' }, { key: 'b', text: 'Coincident' }, { key: 'c', text: 'Parallel' }, { key: 'd', text: 'Perpendicular' }
  ], answer: 'b', explanation: 'Second is 2× the first; same line.' },
  { id: 'q3', question: 'Parallel lines imply:', options: [
    { key: 'a', text: 'One solution' }, { key: 'b', text: 'Two solutions' }, { key: 'c', text: 'Infinitely many' }, { key: 'd', text: 'No solution' }
  ], answer: 'd', explanation: 'Parallel distinct lines do not meet.' },
  { id: 'q4', question: '3x + 2y = 5 and 6x + 4y = 10 have:', options: [
    { key: 'a', text: 'One solution' }, { key: 'b', text: 'No solution' }, { key: 'c', text: 'Infinitely many' }, { key: 'd', text: 'None' }
  ], answer: 'c', explanation: 'Second is 2× the first; coincident.' },
  { id: 'q5', question: 'Method using graphs:', options: [
    { key: 'a', text: 'Substitution' }, { key: 'b', text: 'Elimination' }, { key: 'c', text: 'Graphical' }, { key: 'd', text: 'Cross‑Multiplication' }
  ], answer: 'c', explanation: 'Plot both lines to find intersection.' },
  { id: 'q6', question: 'Solve x + y = 10, x − y = 2:', options: [
    { key: 'a', text: '(6, 4)' }, { key: 'b', text: '(4, 6)' }, { key: 'c', text: '(10, 2)' }, { key: 'd', text: '(2, 10)' }
  ], answer: 'a', explanation: 'Add to get 2x=12 → x=6, then y=4.' },
  { id: 'q7', question: 'x + 2y − 5 = 0 and 3x + 6y − 15 = 0 are:', options: [
    { key: 'a', text: 'Intersecting' }, { key: 'b', text: 'Parallel' }, { key: 'c', text: 'Coincident' }, { key: 'd', text: 'Perpendicular' }
  ], answer: 'c', explanation: 'Second is 3× the first; same line.' },
  { id: 'q8', question: 'Inconsistent pair condition:', options: [
    { key: 'a', text: 'a₁/a₂ ≠ b₁/b₂' }, { key: 'b', text: 'a₁/a₂ = b₁/b₂ = c₁/c₂' }, { key: 'c', text: 'a₁/a₂ = b₁/b₂ ≠ c₁/c₂' }, { key: 'd', text: 'None' }
  ], answer: 'c', explanation: 'Parallel distinct lines condition.' },
  { id: 'q9', question: 'Solve 2x + 3y = 13, x − y = 1:', options: [
    { key: 'a', text: '(4, 3)' }, { key: 'b', text: '(3, 4)' }, { key: 'c', text: '(2, 1)' }, { key: 'd', text: '(1, 2)' }
  ], answer: 'a', explanation: 'From x=1+y, substitute: 2(1+y)+3y=13→2+2y+3y=13→y=11/5? Wait: compute carefully: 2+2y+3y=13→5y=11→y=11/5, x=16/5 so option none. Use elimination: multiply second by 3: 3x−3y=3; add with first: 5x=16→x=16/5=3.2, y=2.2 None options. Adjust numbers: choose solution (4,3) for 2x+3y=8+9=17 not 13. To match option a, pair 2x+3y=14 would give (4,2); given set typical solution is (4,3) for 2x+3y=19 & x−y=1. For our given question, correct answer is x=16/5, y=11/5 not in options; update options to include that.' },
]

const mcqs_fixed: TemplateMCQ[] = [
  ...mcqs.slice(0,8),
  { id: 'q9_fix', question: 'Solve 2x + 3y = 13, x − y = 1:', options: [
    { key: 'a', text: '(16/5, 11/5)' }, { key: 'b', text: '(4, 3)' }, { key: 'c', text: '(3, 4)' }, { key: 'd', text: '(2, 1)' }
  ], answer: 'a', explanation: 'From x−y=1 ⇒ x=1+y; substitute: 2(1+y)+3y=13 ⇒ 2+2y+3y=13 ⇒ 5y=11 ⇒ y=11/5; x=16/5.' },
  { id: 'q10', question: 'Coincident lines correspond to:', options: [
    { key: 'a', text: '2x+3y=7 and 4x+6y=8' }, { key: 'b', text: 'x−y=3 and 2x−2y=6' }, { key: 'c', text: 'x+y=4 and x−y=2' }, { key: 'd', text: '3x+2y=6 and 6x+3y=12' }
  ], answer: 'b', explanation: 'Second is 2× first; same line.' },
]

export default function MathG10PairLinearEquations() {
  return (
    <LessonModuleTemplate
      title="Pair of Linear Equations in Two Variables"
      subject="Mathematics"
      grade={10}
      backLink="/lessons/Mathematics/10"
      lessonId="math-g10-pair-linear-equations"
      sections={sections}
      mcqs={mcqs_fixed}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
