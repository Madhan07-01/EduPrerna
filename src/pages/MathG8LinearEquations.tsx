import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Linear equations involve variables raised only to the first power. They are like balance scales—both sides must be equal. Linear equations help solve real-life problems (age, cost, quantities).' },
  { title: '1. Definition', content: 'One variable: ax + b = 0, a ≠ 0. Two variables: ax + by + c = 0 (a, b not both zero). Solutions that satisfy these relations are called roots or solutions.' },
  { title: '2. Solving Linear Equations (One Variable)', content: 'Steps: (1) Remove brackets; (2) Simplify both sides; (3) Collect variables on one side and constants on the other; (4) Solve; (5) Check the answer by substitution.' },
  { title: '3. Graphical Representation (Two Variables)', content: 'Solutions (x, y) plotted form a straight line. Each point on the line is a solution. Intercepts show where the line crosses axes.' },
  { title: '4. Properties', content: 'One variable equations typically have a unique solution. Two-variable linear equations have infinitely many solutions along the line. Intersection of two non-parallel lines gives the common solution.' },
  { title: '5. Applications', content: 'Use to model age problems, cost/quantity calculations, mixture and rate problems, and simple geometry relations.' },
  { title: 'Summary', content: 'Linear equations are first-degree algebraic relations. Solve one-variable equations algebraically; represent two-variable equations as straight lines on the coordinate plane.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Solution of 2x + 5 = 15?', options: [
    { key: 'a', text: '5' }, { key: 'b', text: '10' }, { key: 'c', text: '15' }, { key: 'd', text: '20' }
  ], answer: 'a', explanation: '2x = 10 → x = 5.' },
  { id: 'q2', question: 'Linear equation in one variable:', options: [
    { key: 'a', text: '2x² + 3 = 0' }, { key: 'b', text: 'x + 7 = 12' }, { key: 'c', text: 'xy = 10' }, { key: 'd', text: 'y² − 4 = 0' }
  ], answer: 'b', explanation: 'Degree 1 and single variable.' },
  { id: 'q3', question: 'Solution of 3x − 7 = 11?', options: [
    { key: 'a', text: '6' }, { key: 'b', text: '−6' }, { key: 'c', text: '2/3' }, { key: 'd', text: '3' }
  ], answer: 'a', explanation: '3x = 18 → x = 6.' },
  { id: 'q4', question: 'Which point satisfies 2x + y = 7?', options: [
    { key: 'a', text: '(2,3)' }, { key: 'b', text: '(1,2)' }, { key: 'c', text: '(3,2)' }, { key: 'd', text: '(4,2)' }
  ], answer: 'a', explanation: '2·2 + 3 = 7.' },
  { id: 'q5', question: 'Line parallel to x + y = 4?', options: [
    { key: 'a', text: 'x + y = 2' }, { key: 'b', text: 'x − y = 4' }, { key: 'c', text: 'y = 2x' }, { key: 'd', text: 'x = 4' }
  ], answer: 'a', explanation: 'Same normal vector (1,1) → parallel.' },
  { id: 'q6', question: 'Solve 5x = 20 → x = ?', options: [
    { key: 'a', text: '25' }, { key: 'b', text: '5' }, { key: 'c', text: '4' }, { key: 'd', text: '0' }
  ], answer: 'c', explanation: 'x = 4.' },
  { id: 'q7', question: 'Graph of a linear equation in two variables?', options: [
    { key: 'a', text: 'Straight line' }, { key: 'b', text: 'Curve' }, { key: 'c', text: 'Circle' }, { key: 'd', text: 'Parabola' }
  ], answer: 'a', explanation: 'Linear → straight line.' },
  { id: 'q8', question: 'Line parallel to x-axis?', options: [
    { key: 'a', text: 'x = 3' }, { key: 'b', text: 'y = 2' }, { key: 'c', text: 'x + y = 0' }, { key: 'd', text: '2x + 3y = 6' }
  ], answer: 'b', explanation: 'y = constant is parallel to x-axis.' },
  { id: 'q9', question: 'Solve 3x + 2 = 5 → x = ?', options: [
    { key: 'a', text: '6' }, { key: 'b', text: '9' }, { key: 'c', text: '1' }, { key: 'd', text: '12' }
  ], answer: 'c', explanation: '3x = 3 → x = 1.' },
  { id: 'q10', question: 'Which has infinitely many solutions?', options: [
    { key: 'a', text: '2x + 3 = 7' }, { key: 'b', text: 'x + y = 5' }, { key: 'c', text: '5x = 25' }, { key: 'd', text: 'x − 2 = 0' }
  ], answer: 'b', explanation: 'Two-variable linear equation has line of solutions.' },
]

export default function MathG8LinearEquations() {
  return (
    <LessonModuleTemplate
      title="Linear Equations"
      subject="Mathematics"
      grade={8}
      backLink="/lessons/Mathematics/8"
      lessonId="math-g8-linear-equations"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
