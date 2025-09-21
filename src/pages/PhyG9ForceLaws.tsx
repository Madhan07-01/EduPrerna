import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Motion of objects is often caused by forces. Understanding forces and their effects is key to studying how objects move, stop, or change direction. Newton’s Laws of Motion describe the relationship between force, mass, and motion.' },
  { title: '1. Force', content: 'A force is a push or pull that can move, stop, or deform an object. Unit: Newton (N). 1 N gives 1 kg a = 1 m/s². Types: Contact (friction, tension, normal) and Non‑contact (gravity, magnetic, electrostatic).' },
  { title: '2. Newton’s Laws of Motion', content: `First Law (Inertia): Bodies maintain state unless external force acts.\nSecond Law: F = m a (force proportional to rate of change of momentum).\nThird Law: For every action there is an equal and opposite reaction.` },
  { title: '3. Inertia', content: 'Tendency of an object to resist change in motion; depends on mass (greater mass → greater inertia).' },
  { title: '4. Momentum', content: 'p = m v (kg·m/s). Law of conservation: total momentum of an isolated system remains constant if no external force acts.' },
  { title: '5. Applications', content: 'Seat belts reduce sudden changes; sports techniques (hitting/throwing); vehicles: brakes/acceleration depend on mass and force; rockets use action–reaction.' },
  { title: 'Summary', content: 'Forces change motion. Newton’s three laws, inertia, momentum, and their conservation govern dynamics; many practical applications rely on them.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'SI unit of force:', options: [
    { key: 'a', text: 'kg' }, { key: 'b', text: 'm/s²' }, { key: 'c', text: 'Newton' }, { key: 'd', text: 'Joule' }
  ], answer: 'c', explanation: 'Force is measured in newtons (N).' },
  { id: 'q2', question: '“Object at rest stays at rest…” is:', options: [
    { key: 'a', text: 'First Law' }, { key: 'b', text: 'Second Law' }, { key: 'c', text: 'Third Law' }, { key: 'd', text: 'Conservation of momentum' }
  ], answer: 'a', explanation: 'Law of inertia.' },
  { id: 'q3', question: 'Correct formula:', options: [
    { key: 'a', text: 'F = m/v' }, { key: 'b', text: 'F = m a' }, { key: 'c', text: 'F = m v²' }, { key: 'd', text: 'F = m + a' }
  ], answer: 'b', explanation: 'Newton’s second law.' },
  { id: 'q4', question: 'Inertia depends on:', options: [
    { key: 'a', text: 'Velocity' }, { key: 'b', text: 'Acceleration' }, { key: 'c', text: 'Mass' }, { key: 'd', text: 'Force' }
  ], answer: 'c', explanation: 'More mass → greater inertia.' },
  { id: 'q5', question: 'Pushing a wall, the wall pushes back with:', options: [
    { key: 'a', text: 'Same magnitude, opposite direction' }, { key: 'b', text: 'No force' }, { key: 'c', text: 'Twice the force' }, { key: 'd', text: 'Less force' }
  ], answer: 'a', explanation: 'Third law action–reaction.' },
  { id: 'q6', question: 'Momentum p equals:', options: [
    { key: 'a', text: 'm a' }, { key: 'b', text: 'm v' }, { key: 'c', text: 'F t' }, { key: 'd', text: 'm / v' }
  ], answer: 'b', explanation: 'p = m v.' },
  { id: 'q7', question: 'Conservation of momentum:', options: [
    { key: 'a', text: 'Total momentum constant if net external force = 0' }, { key: 'b', text: 'Momentum always increases' }, { key: 'c', text: 'Momentum decreases over time' }, { key: 'd', text: 'Independent of forces' }
  ], answer: 'a', explanation: 'Holds in isolated systems.' },
  { id: 'q8', question: 'Greater inertia:', options: [
    { key: 'a', text: 'Bicycle' }, { key: 'b', text: 'Heavy truck' }, { key: 'c', text: 'Football' }, { key: 'd', text: 'Pebble' }
  ], answer: 'b', explanation: 'More mass → more inertia.' },
  { id: 'q9', question: 'Non‑contact force among:', options: [
    { key: 'a', text: 'Friction' }, { key: 'b', text: 'Tension' }, { key: 'c', text: 'Magnetic force' }, { key: 'd', text: 'Applied force' }
  ], answer: 'c', explanation: 'Magnetic force acts at a distance.' },
  { id: 'q10', question: 'Rockets move upward because:', options: [
    { key: 'a', text: 'Action = rocket' }, { key: 'b', text: 'Reaction: gases push rocket upward' }, { key: 'c', text: 'Gravity pushes up' }, { key: 'd', text: 'No forces involved' }
  ], answer: 'b', explanation: 'Action–reaction pair with exhaust gases.' },
]

export default function PhyG9ForceLaws() {
  return (
    <LessonModuleTemplate
      title="Force and Laws of Motion"
      subject="Physics"
      grade={9}
      backLink="/lessons/Physics/9"
      lessonId="phy-g9-force-laws"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
