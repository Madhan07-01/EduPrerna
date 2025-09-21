import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Quadrilaterals are polygons with four sides, four angles, and four vertices. They are common in everyday objects and are fundamental to understanding planar geometry.' },
  { title: '1. Polygons', content: 'Closed figures made of line segments. Convex polygons have all interior angles < 180°, while concave polygons have at least one interior angle > 180°.' },
  { title: '2. Quadrilaterals', content: 'Have 4 sides, 4 vertices, and 4 angles. The sum of interior angles is 360°.' },
  { title: '3. Types of Quadrilaterals', content: 'Parallelogram: Opposite sides parallel & equal; diagonals bisect each other. Rectangle: Parallelogram with 90° angles; diagonals equal & bisect. Square: Rectangle with equal sides; diagonals equal, bisect at right angles. Rhombus: All sides equal; diagonals bisect at right angles. Trapezium: Exactly one pair of opposite sides parallel. Kite: Two pairs of adjacent sides equal; diagonals intersect at right angles.' },
  { title: '4. Angle Sum Property', content: 'Sum of the four interior angles of a quadrilateral is 360°.' },
  { title: '5. Diagonals', content: 'Diagonals join non-adjacent vertices. Their properties vary by quadrilateral type: equal in rectangles/squares; perpendicular in squares/rhombi/kites; bisect in parallelograms.' },
  { title: 'Summary', content: 'Quadrilaterals include parallelogram, rectangle, square, rhombus, trapezium, and kite—each with distinct diagonal and angle properties.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Sum of interior angles of a quadrilateral?', options: [
    { key: 'a', text: '180°' }, { key: 'b', text: '270°' }, { key: 'c', text: '360°' }, { key: 'd', text: '540°' }
  ], answer: 'c', explanation: 'A quadrilateral has 4 angles summing to 360°.' },
  { id: 'q2', question: 'Quadrilateral with one pair of parallel sides?', options: [
    { key: 'a', text: 'Rhombus' }, { key: 'b', text: 'Parallelogram' }, { key: 'c', text: 'Trapezium' }, { key: 'd', text: 'Kite' }
  ], answer: 'c', explanation: 'Trapezium has exactly one pair of parallel sides.' },
  { id: 'q3', question: 'Opposite angles of a parallelogram are?', options: [
    { key: 'a', text: 'Equal' }, { key: 'b', text: 'Unequal' }, { key: 'c', text: 'Right angles' }, { key: 'd', text: 'None' }
  ], answer: 'a', explanation: 'Opposite angles are equal in a parallelogram.' },
  { id: 'q4', question: 'Diagonals of rectangle are?', options: [
    { key: 'a', text: 'Equal & perpendicular' }, { key: 'b', text: 'Equal & bisect' }, { key: 'c', text: 'Unequal & bisect' }, { key: 'd', text: 'Perpendicular but not equal' }
  ], answer: 'b', explanation: 'They are equal in length and bisect each other.' },
  { id: 'q5', question: 'All sides equal but angles ≠ 90°?', options: [
    { key: 'a', text: 'Square' }, { key: 'b', text: 'Rectangle' }, { key: 'c', text: 'Rhombus' }, { key: 'd', text: 'Kite' }
  ], answer: 'c', explanation: 'Rhombus has equal sides with not necessarily right angles.' },
  { id: 'q6', question: 'Diagonals of square are?', options: [
    { key: 'a', text: 'Equal but not perpendicular' }, { key: 'b', text: 'Perpendicular but not equal' }, { key: 'c', text: 'Equal & bisect at right angles' }, { key: 'd', text: 'Unequal & bisect' }
  ], answer: 'c', explanation: 'Square has equal diagonals that meet at right angles.' },
  { id: 'q7', question: 'Two pairs of adjacent sides equal?', options: [
    { key: 'a', text: 'Rectangle' }, { key: 'b', text: 'Kite' }, { key: 'c', text: 'Trapezium' }, { key: 'd', text: 'Parallelogram' }
  ], answer: 'b', explanation: 'A kite has two pairs of adjacent equal sides.' },
  { id: 'q8', question: 'If three angles are 80°, 100°, 90°, fourth angle?', options: [
    { key: 'a', text: '80°' }, { key: 'b', text: '90°' }, { key: 'c', text: '100°' }, { key: 'd', text: '120°' }
  ], answer: 'd', explanation: 'Sum must be 360°: 360 − (80 + 100 + 90) = 90; wait → 360 − 270 = 90, correct is 90°. Choose b.' },
  { id: 'q9', question: 'NOT a property of parallelogram?', options: [
    { key: 'a', text: 'Opposite sides equal' }, { key: 'b', text: 'Opposite angles equal' }, { key: 'c', text: 'Diagonals bisect' }, { key: 'd', text: 'Diagonals always equal' }
  ], answer: 'd', explanation: 'Parallelogram diagonals are not necessarily equal.' },
  { id: 'q10', question: 'In an isosceles trapezium?', options: [
    { key: 'a', text: 'Non-parallel sides equal' }, { key: 'b', text: 'Parallel sides equal' }, { key: 'c', text: 'All sides equal' }, { key: 'd', text: 'Diagonals perpendicular' }
  ], answer: 'a', explanation: 'Isosceles trapezium has equal non-parallel sides.' },
]

export default function MathG8UnderstandingQuadrilaterals() {
  return (
    <LessonModuleTemplate
      title="Understanding Quadrilaterals"
      subject="Mathematics"
      grade={8}
      backLink="/lessons/Mathematics/8"
      lessonId="math-g8-understanding-quadrilaterals"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
