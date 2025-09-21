import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Kinematics studies motion without considering its causes. It uses displacement, velocity, acceleration, and time to describe motion in 1D, 2D (projectile), and circular paths.' },
  { title: '1. Basic Quantities', content: '• Displacement (vector) vs Distance (scalar)\n• Speed (scalar) vs Velocity (vector)\n• Acceleration: rate of change of velocity' },
  { title: '2. Equations of Motion (Constant a)', content: 'v = u + a t\n s = u t + (1/2) a t^2\n v^2 = u^2 + 2 a s\nWhere u = initial velocity, v = final velocity, a = acceleration, s = displacement, t = time.' },
  { title: '3. Graphical Representation', content: '• x–t slope = velocity\n• v–t slope = acceleration, area = displacement\n• a–t area = change in velocity' },
  { title: '4. Projectile Motion', content: 'Assuming no air drag and flat ground:\n• x = u cosθ · t\n• y = u sinθ · t − (1/2) g t^2\n• Max height H = (u^2 sin^2θ)/(2g)\n• Range R = (u^2 sin 2θ)/g\n• Time of flight T = (2 u sinθ)/g' },
  { title: '5. Relative Motion', content: 'v⃗(A/B) = v⃗A − v⃗B. Useful for trains, rivers, and moving frames.' },
  { title: '6. Uniform Circular Motion', content: 'Speed constant, direction changes. Centripetal acceleration a_c = v^2/r, force F_c = m v^2 / r towards center.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Displacement is a:', options: [
    { key: 'a', text: 'Scalar' }, { key: 'b', text: 'Vector' }, { key: 'c', text: 'Neither' }, { key: 'd', text: 'Both' }
  ], answer: 'b', explanation: 'Displacement has magnitude and direction.' },
  { id: 'q2', question: 'Which equation holds for constant acceleration?', options: [
    { key: 'a', text: 'v = u + a t' }, { key: 'b', text: 'v = u + (1/2) a t^2' }, { key: 'c', text: 's = u t^2' }, { key: 'd', text: 'a = v / t^2' }
  ], answer: 'a', explanation: 'The three standard kinematic equations are valid for constant a.' },
  { id: 'q3', question: '20 m east then 15 m north: displacement =', options: [
    { key: 'a', text: '35 m' }, { key: 'b', text: '25 m' }, { key: 'c', text: '15 m' }, { key: 'd', text: '20 m' }
  ], answer: 'b', explanation: 'Pythagoras: √(20^2+15^2) = 25 m.' },
  { id: 'q4', question: 'Slope of displacement–time graph is:', options: [
    { key: 'a', text: 'Acceleration' }, { key: 'b', text: 'Velocity' }, { key: 'c', text: 'Force' }, { key: 'd', text: 'Mass' }
  ], answer: 'b', explanation: 'dx/dt = velocity.' },
  { id: 'q5', question: 'Horizontal acceleration in projectile motion is:', options: [
    { key: 'a', text: 'g' }, { key: 'b', text: '0' }, { key: 'c', text: 'u' }, { key: 'd', text: 'Depends on angle' }
  ], answer: 'b', explanation: 'Neglecting drag, horizontal acceleration is zero.' },
  { id: 'q6', question: 'Time of flight of projectile is:', options: [
    { key: 'a', text: 'u/g' }, { key: 'b', text: '2u sinθ / g' }, { key: 'c', text: 'u sinθ / g' }, { key: 'd', text: '2u/g' }
  ], answer: 'b', explanation: 'T = 2 u sinθ / g.' },
  { id: 'q7', question: 'Range is maximum at:', options: [
    { key: 'a', text: '30°' }, { key: 'b', text: '45°' }, { key: 'c', text: '60°' }, { key: 'd', text: '90°' }
  ], answer: 'b', explanation: 'sin 2θ maximizes at θ = 45°.' },
  { id: 'q8', question: 'Centripetal acceleration direction:', options: [
    { key: 'a', text: 'Tangent to circle' }, { key: 'b', text: 'Away from center' }, { key: 'c', text: 'Towards center' }, { key: 'd', text: 'Zero' }
  ], answer: 'c', explanation: 'Always radially inward.' },
  { id: 'q9', question: 'Relative velocity v(A/B) equals:', options: [
    { key: 'a', text: 'vA + vB' }, { key: 'b', text: 'vB − vA' }, { key: 'c', text: 'vA − vB' }, { key: 'd', text: 'None' }
  ], answer: 'c', explanation: 'v(A/B) = vA − vB.' },
  { id: 'q10', question: 'Uniform velocity implies:', options: [
    { key: 'a', text: 'Zero acceleration' }, { key: 'b', text: 'Constant acceleration' }, { key: 'c', text: 'Changing displacement' }, { key: 'd', text: 'Both a and c' }
  ], answer: 'd', explanation: 'Displacement changes linearly with time; acceleration is zero.' },
]

export default function PhyG11Kinematics() {
  return (
    <LessonModuleTemplate
      title="Kinematics"
      subject="Physics"
      grade={11}
      backLink="/lessons/Physics/11"
      lessonId="phy-g11-kinematics"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
