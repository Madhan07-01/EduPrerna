import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Coordinate Geometry studies points, lines, and shapes using numbers. The Cartesian Plane connects algebra with geometry.' },
  { title: '1. Cartesian Plane', content: 'Two perpendicular lines: x-axis (horizontal) and y-axis (vertical). Their intersection is the origin (0,0).' },
  { title: '2. Coordinates of a Point', content: 'Ordered pair (x, y) where x is the abscissa and y is the ordinate. Example: (3, −2) → 3 right, 2 down.' },
  { title: '3. Quadrants', content: 'Quadrants: I (+,+), II (−,+), III (−,−), IV (+,−). Points fall in quadrants based on signs of x and y.' },
  { title: '4. Distance Formula', content: 'Between (x₁, y₁) & (x₂, y₂): d = sqrt((x₂−x₁)² + (y₂−y₁)²).' },
  { title: '5. Midpoint Formula', content: 'Midpoint M = ((x₁+x₂)/2, (y₁+y₂)/2).' },
  { title: '6. Section Formula', content: 'Point P divides (x₁, y₁) & (x₂, y₂) in ratio m:n: P = ((m x₂ + n x₁)/(m+n), (m y₂ + n y₁)/(m+n)).' },
  { title: '7. Collinearity', content: 'Three points are collinear if the area of the triangle they form is zero: 1/2 [x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)] = 0.' },
  { title: 'Summary', content: 'Coordinates locate points; formulas for distance, midpoint, and section help analyze geometry algebraically; signs determine quadrants.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Coordinates of origin:', options: [
    { key: 'a', text: '(1,1)' }, { key: 'b', text: '(0,1)' }, { key: 'c', text: '(0,0)' }, { key: 'd', text: '(1,0)' }
  ], answer: 'c', explanation: 'Origin is (0,0).' },
  { id: 'q2', question: 'Abscissa of (7, −3):', options: [
    { key: 'a', text: '−3' }, { key: 'b', text: '7' }, { key: 'c', text: '10' }, { key: 'd', text: '3' }
  ], answer: 'b', explanation: 'Abscissa is x-coordinate.' },
  { id: 'q3', question: 'Ordinate of (−5, 4):', options: [
    { key: 'a', text: '−5' }, { key: 'b', text: '5' }, { key: 'c', text: '4' }, { key: 'd', text: '−4' }
  ], answer: 'c', explanation: 'Ordinate is y-coordinate.' },
  { id: 'q4', question: 'Quadrant of (−2, −5):', options: [
    { key: 'a', text: 'I' }, { key: 'b', text: 'II' }, { key: 'c', text: 'III' }, { key: 'd', text: 'IV' }
  ], answer: 'c', explanation: 'Both coordinates negative → III quadrant.' },
  { id: 'q5', question: 'Distance between (0,0) & (6,8):', options: [
    { key: 'a', text: '10' }, { key: 'b', text: '12' }, { key: 'c', text: '8' }, { key: 'd', text: '6' }
  ], answer: 'a', explanation: 'd = sqrt(6²+8²) = 10.' },
  { id: 'q6', question: 'Midpoint of (2,3) & (4,7):', options: [
    { key: 'a', text: '(2,5)' }, { key: 'b', text: '(3,5)' }, { key: 'c', text: '(4,6)' }, { key: 'd', text: '(3,7)' }
  ], answer: 'b', explanation: 'Average each coordinate.' },
  { id: 'q7', question: '(0, −4) lies on:', options: [
    { key: 'a', text: 'x-axis' }, { key: 'b', text: 'y-axis' }, { key: 'c', text: 'origin' }, { key: 'd', text: 'Quadrant II' }
  ], answer: 'b', explanation: 'x=0 → y-axis.' },
  { id: 'q8', question: 'Point dividing (2, −2) & (8, 10) in 1:2 is:', options: [
    { key: 'a', text: '(4,2)' }, { key: 'b', text: '(6,6)' }, { key: 'c', text: '(5,6)' }, { key: 'd', text: '(3,4)' }
  ], answer: 'c', explanation: 'Use section formula with m:n = 1:2.' },
  { id: 'q9', question: 'Points A(1,1), B(2,2), C(3,3) are:', options: [
    { key: 'a', text: 'Not collinear' }, { key: 'b', text: 'Collinear' }, { key: 'c', text: 'Triangle' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'They lie on y=x.' },
  { id: 'q10', question: 'Equidistant from (2,3) & (−2,3):', options: [
    { key: 'a', text: '(0,3)' }, { key: 'b', text: '(2,0)' }, { key: 'c', text: '(0,0)' }, { key: 'd', text: '(3,0)' }
  ], answer: 'a', explanation: 'Midpoint along x is 0; y is 3.' },
]

export default function MathG9CoordinateGeometry() {
  return (
    <LessonModuleTemplate
      title="Coordinate Geometry"
      subject="Mathematics"
      grade={9}
      backLink="/lessons/Mathematics/9"
      lessonId="math-g9-coordinate-geometry"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
