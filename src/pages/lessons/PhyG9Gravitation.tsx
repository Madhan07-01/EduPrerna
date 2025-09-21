import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Gravitation is the force of attraction between two masses. It governs falling bodies, planetary orbits, and satellite motion.' },
  { title: '1. Newton’s Law of Gravitation', content: 'F = G m1 m2 / r^2. Force is directly proportional to product of masses and inversely proportional to square of the distance between their centres.' },
  { title: '2. Acceleration due to Gravity (g)', content: 'Near Earth: g = G M / R^2 ≈ 9.8 m/s². M: mass of Earth, R: radius of Earth.' },
  { title: '3. Weight', content: 'Weight W = m g (force, in newtons). Mass is scalar (kg) and location independent; weight varies with g.' },
  { title: '4. Variation of g', content: 'With height h: g_h = g (1 − h/R). With depth d: g’ = g (1 − d/R).' },
  { title: '5. Free Fall', content: 'Motion under gravity alone (ignore air). Equations: v = u + g t; s = u t + (1/2) g t^2; v^2 = u^2 + 2 g s.' },
  { title: '6. Mass vs Weight', content: 'Mass (kg): amount of matter (scalar). Weight (N): gravitational force (vector). Weight = 0 at Earth’s centre.' },
  { title: '7. Orbital Motion', content: 'Satellite in circular orbit has speed v = sqrt(G M / r), where r is distance from Earth’s centre; gravity provides centripetal force.' },
  { title: 'Summary', content: 'Universal gravitation explains attraction, free fall, weight, variation of g, and satellite motion.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Law of gravitation: force is', options: [
    { key: 'a', text: '∝ distance' }, { key: 'b', text: '∝ 1/r^2' }, { key: 'c', text: 'independent of masses' }, { key: 'd', text: 'always zero' }
  ], answer: 'b', explanation: 'Inverse-square with distance.' },
  { id: 'q2', question: 'SI unit of gravitational force:', options: [
    { key: 'a', text: 'kg' }, { key: 'b', text: 'N' }, { key: 'c', text: 'm/s²' }, { key: 'd', text: 'J' }
  ], answer: 'b', explanation: 'Force measured in newtons.' },
  { id: 'q3', question: 'g near Earth surface is about:', options: [
    { key: 'a', text: '10 m/s²' }, { key: 'b', text: '9.8 m/s²' }, { key: 'c', text: '9 m/s²' }, { key: 'd', text: '8 m/s²' }
  ], answer: 'b', explanation: 'Standard value ~9.8 m/s².' },
  { id: 'q4', question: 'Weight W equals:', options: [
    { key: 'a', text: 'm/a' }, { key: 'b', text: 'm g' }, { key: 'c', text: 'a/g' }, { key: 'd', text: 'm v' }
  ], answer: 'b', explanation: 'Weight is gravitational force.' },
  { id: 'q5', question: 'Mass of an object:', options: [
    { key: 'a', text: 'changes with location' }, { key: 'b', text: 'remains constant' }, { key: 'c', text: 'measured in N' }, { key: 'd', text: 'is zero in space' }
  ], answer: 'b', explanation: 'Mass is invariant (non‑relativistic context).' },
  { id: 'q6', question: 'Free fall means:', options: [
    { key: 'a', text: 'motion with air resistance' }, { key: 'b', text: 'motion under gravity only' }, { key: 'c', text: 'motion with applied force' }, { key: 'd', text: 'circular motion' }
  ], answer: 'b', explanation: 'Only gravitational force acts.' },
  { id: 'q7', question: 'Value of G is:', options: [
    { key: 'a', text: '9.8 m/s²' }, { key: 'b', text: '6.67×10^−11 Nm²/kg²' }, { key: 'c', text: '3×10^8 m/s' }, { key: 'd', text: '1 N/kg' }
  ], answer: 'b', explanation: 'Universal gravitational constant.' },
  { id: 'q8', question: 'With height, weight generally:', options: [
    { key: 'a', text: 'increases' }, { key: 'b', text: 'decreases' }, { key: 'c', text: 'unchanged' }, { key: 'd', text: 'becomes infinite' }
  ], answer: 'b', explanation: 'g decreases with height.' },
  { id: 'q9', question: 'Orbital speed depends on:', options: [
    { key: 'a', text: 'satellite mass only' }, { key: 'b', text: 'distance from Earth’s centre and Earth’s mass' }, { key: 'c', text: 'height above sea level only' }, { key: 'd', text: 'none' }
  ], answer: 'b', explanation: 'v = sqrt(GM/r).' },
  { id: 'q10', question: 'Weight at Earth’s centre is:', options: [
    { key: 'a', text: 'maximum' }, { key: 'b', text: 'minimum but nonzero' }, { key: 'c', text: 'zero' }, { key: 'd', text: 'equal to mass' }
  ], answer: 'c', explanation: 'Net gravitational force zero at centre.' },
]

export default function PhyG9Gravitation() {
  return (
    <LessonModuleTemplate
      title="Gravitation"
      subject="Physics"
      grade={9}
      backLink="/lessons/Physics/9"
      lessonId="phy-g9-gravitation"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
