import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Everyday activities like pushing doors, lifting books, and kicking balls involve force. Force can change the motion of objects, while pressure describes how that force is distributed over an area.' },
  { title: '1. Force', content: 'A push or pull on an object that can change its motion. Unit: Newton (N). Symbol: F. Newton\'s Second Law: F = m × a (F in N, m in kg, a in m/s²). Examples: pulling a rope, kicking a football, gravity on a falling object.' },
  { title: '2. Types of Forces', content: 'Contact forces require physical contact (friction, tension, applied force). Non-contact forces act at a distance (gravity, magnetism, electrostatics).' },
  { title: '3. Pressure', content: 'Pressure is force per unit area. Formula: P = F / A (P in Pascal, Pa; F in Newtons; A in m²). Examples: sharp knife → small area → high pressure; snowshoes → large area → low pressure.' },
  { title: '4. Factors Affecting Pressure', content: 'Force applied (more force → more pressure) and area of contact (larger area → less pressure).' },
  { title: '5. Applications', content: 'Hydraulic lifts and brakes, sharp tools and nails, snowshoes, inflated tyres.' },
  { title: 'Summary', content: 'Force changes motion; pressure spreads force over area. P = F/A explains why small areas increase pressure and large areas reduce it.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'SI unit of force:', options: [
    { key: 'a', text: 'Joule' }, { key: 'b', text: 'Newton' }, { key: 'c', text: 'Pascal' }, { key: 'd', text: 'Watt' }
  ], answer: 'b', explanation: 'Force is measured in Newtons (N).' },
  { id: 'q2', question: 'Pressure = ?', options: [
    { key: 'a', text: 'Force × Area' }, { key: 'b', text: 'Force ÷ Area' }, { key: 'c', text: 'Mass × Acceleration' }, { key: 'd', text: 'Mass ÷ Volume' }
  ], answer: 'b', explanation: 'P = F / A.' },
  { id: 'q3', question: 'If area decreases while force is constant, pressure:', options: [
    { key: 'a', text: 'Decreases' }, { key: 'b', text: 'Increases' }, { key: 'c', text: 'Remains same' }, { key: 'd', text: 'Becomes zero' }
  ], answer: 'b', explanation: 'Smaller A → larger P.' },
  { id: 'q4', question: 'Force = ?', options: [
    { key: 'a', text: 'm + a' }, { key: 'b', text: 'm × a' }, { key: 'c', text: 'm / a' }, { key: 'd', text: 'a / m' }
  ], answer: 'b', explanation: 'Newton\'s Second Law: F = m × a.' },
  { id: 'q5', question: 'Non-contact force example:', options: [
    { key: 'a', text: 'Friction' }, { key: 'b', text: 'Tension' }, { key: 'c', text: 'Gravity' }, { key: 'd', text: 'Applied force' }
  ], answer: 'c', explanation: 'Gravity acts at a distance.' },
  { id: 'q6', question: 'Sharp knife cuts easily because:', options: [
    { key: 'a', text: 'Less force' }, { key: 'b', text: 'Force on smaller area' }, { key: 'c', text: 'Force on larger area' }, { key: 'd', text: 'Pressure irrelevant' }
  ], answer: 'b', explanation: 'Smaller area → higher pressure for same force.' },
  { id: 'q7', question: 'SI unit of pressure:', options: [
    { key: 'a', text: 'N' }, { key: 'b', text: 'Pa' }, { key: 'c', text: 'J' }, { key: 'd', text: 'W' }
  ], answer: 'b', explanation: 'Pressure is measured in Pascal (Pa).' },
  { id: 'q8', question: 'Snowshoes prevent sinking because they:', options: [
    { key: 'a', text: 'Increase force' }, { key: 'b', text: 'Reduce contact area' }, { key: 'c', text: 'Increase pressure' }, { key: 'd', text: 'Increase contact area' }
  ], answer: 'd', explanation: 'Larger area spreads force → lower pressure.' },
  { id: 'q9', question: 'A car tyre supports the car by:', options: [
    { key: 'a', text: 'Decreasing pressure' }, { key: 'b', text: 'High air pressure' }, { key: 'c', text: 'Low force' }, { key: 'd', text: 'No pressure' }
  ], answer: 'b', explanation: 'Compressed air provides internal pressure to support load.' },
  { id: 'q10', question: 'Hydraulic lifts work based on:', options: [
    { key: 'a', text: 'Newton\'s first law' }, { key: 'b', text: 'Pascal\'s law' }, { key: 'c', text: 'Coulomb\'s law' }, { key: 'd', text: 'Hooke\'s law' }
  ], answer: 'b', explanation: 'Pressure applied to a confined fluid is transmitted equally in all directions (Pascal\'s law).'},
]

export default function PhyG8ForcePressure() {
  return (
    <LessonModuleTemplate
      title="Force and Pressure"
      subject="Physics"
      grade={8}
      backLink="/lessons/Physics/8"
      lessonId="phy-g8-force-pressure"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
