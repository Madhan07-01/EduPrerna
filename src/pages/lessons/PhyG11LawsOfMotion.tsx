import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Newton\'s laws of motion relate the motion of objects with the forces acting on them. They underpin mechanics, explaining motion, collisions, and many daily phenomena.' },
  { title: "1. Newton's First Law (Inertia)", content: 'A body remains at rest or in uniform motion in a straight line unless acted upon by a net external force. Inertia is the tendency to resist change in motion; mass measures inertia.' },
  { title: "2. Newton's Second Law", content: 'Net force equals rate of change of momentum. For constant mass: F = m a. Acceleration ∝ force and inversely ∝ mass. SI unit of force: Newton (N).' },
  { title: "3. Newton's Third Law", content: 'For every action, there is an equal and opposite reaction. Forces occur in pairs on different bodies (e.g., recoil of gun, rocket thrust).' },
  { title: '4. Applications', content: 'Friction, tension, motion on inclined planes (resolve components), circular motion (centripetal force), collisions (conservation of momentum).' },
  { title: '5. Equations of Motion (Constant Force)', content: 'From F = m a and a = (v − u)/t, derive: v = u + a t; s = u t + (1/2) a t^2; v^2 = u^2 + 2 a s.' },
  { title: '6. Momentum & Impulse', content: 'Momentum p = m v (vector). Impulse J = Δp = F Δt. In an isolated system, total momentum is conserved.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: "Newton's First Law is also called:", options: [
    { key: 'a', text: 'Law of Acceleration' }, { key: 'b', text: 'Law of Action-Reaction' }, { key: 'c', text: 'Law of Inertia' }, { key: 'd', text: 'Law of Momentum' }
  ], answer: 'c', explanation: 'First law defines inertia.' },
  { id: 'q2', question: 'Unit of force (SI) is:', options: [
    { key: 'a', text: 'kg·m/s' }, { key: 'b', text: 'N (Newton)' }, { key: 'c', text: 'Joule' }, { key: 'd', text: 'Watt' }
  ], answer: 'b', explanation: '1 N = 1 kg·m/s^2.' },
  { id: 'q3', question: 'If net external force is zero, a body:', options: [
    { key: 'a', text: 'Stops' }, { key: 'b', text: 'Moves with uniform velocity' }, { key: 'c', text: 'Accelerates' }, { key: 'd', text: 'Moves randomly' }
  ], answer: 'b', explanation: 'No change in state of motion.' },
  { id: 'q4', question: "Newton's Second Law:", options: [
    { key: 'a', text: 'F = m a' }, { key: 'b', text: 'F = m v' }, { key: 'c', text: 'F = m / a' }, { key: 'd', text: 'F = m + a' }
  ], answer: 'a', explanation: 'For constant mass, F = m a.' },
  { id: 'q5', question: 'Action and reaction forces:', options: [
    { key: 'a', text: 'Act on same body' }, { key: 'b', text: 'Cancel each other' }, { key: 'c', text: 'Act on different bodies' }, { key: 'd', text: 'Are always zero' }
  ], answer: 'c', explanation: 'They are equal and opposite on different bodies.' },
  { id: 'q6', question: 'A gun recoils backward when fired because of:', options: [
    { key: 'a', text: 'Friction' }, { key: 'b', text: 'Third law of motion' }, { key: 'c', text: 'Acceleration' }, { key: 'd', text: 'Mass of bullet' }
  ], answer: 'b', explanation: 'Action-reaction pair between gun and bullet.' },
  { id: 'q7', question: 'Momentum is a:', options: [
    { key: 'a', text: 'Scalar' }, { key: 'b', text: 'Vector' }, { key: 'c', text: 'Unitless' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Momentum has direction (same as velocity).' },
  { id: 'q8', question: 'Impulse equals:', options: [
    { key: 'a', text: 'Force × displacement' }, { key: 'b', text: 'Force × time' }, { key: 'c', text: 'Mass × velocity' }, { key: 'd', text: 'Mass × acceleration' }
  ], answer: 'b', explanation: 'Impulse J = F Δt = Δp.' },
  { id: 'q9', question: 'A 2 kg mass with 10 N force has acceleration:', options: [
    { key: 'a', text: '5 m/s²' }, { key: 'b', text: '10 m/s²' }, { key: 'c', text: '2 m/s²' }, { key: 'd', text: '20 m/s²' }
  ], answer: 'a', explanation: 'a = F/m = 10/2 = 5 m/s².' },
  { id: 'q10', question: 'Which is an action-reaction example?', options: [
    { key: 'a', text: 'Book on table' }, { key: 'b', text: 'Rocket launching' }, { key: 'c', text: 'Ball rolling' }, { key: 'd', text: 'Pendulum at rest' }
  ], answer: 'b', explanation: 'Exhaust gases push back, rocket pushes forward.' },
]

export default function PhyG11LawsOfMotion() {
  return (
    <LessonModuleTemplate
      title="Laws of Motion"
      subject="Physics"
      grade={11}
      backLink="/lessons/Physics/11"
      lessonId="phy-g11-laws-of-motion"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
