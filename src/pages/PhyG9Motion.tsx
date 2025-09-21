import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Motion is the change in position of an object with respect to time. Studying motion helps us understand how objects move in the world around us, from cars and bicycles to planets and satellites.' },
  { title: '1. Types of Motion', content: 'Uniform: equal distances in equal time intervals (e.g., constant-speed car). Non-uniform: unequal distances in equal time intervals (e.g., accelerating car).' },
  { title: '2. Distance and Displacement', content: 'Distance (scalar): total path length. Displacement (vector): shortest straight-line change in position. Displacement can be zero even if distance is not (e.g., full circle).' },
  { title: '3. Speed and Velocity', content: 'Speed v = distance / time (scalar). Velocity v⃗ = displacement / time (vector). Averages use total distance/displacement divided by total time.' },
  { title: '4. Acceleration', content: 'Acceleration a = (v − u) / t, rate of change of velocity. Positive → speed up; negative (deceleration) → slow down.' },
  { title: '5. Equations of Motion (uniform acceleration)', content: 'v = u + at;  s = ut + (1/2) a t^2;  v^2 = u^2 + 2 a s. (u: initial velocity, v: final velocity, a: acceleration, t: time, s: displacement) ' },
  { title: '6. Graphical Representation', content: 'Distance–time: slope = speed; straight line → uniform motion. Velocity–time: slope = acceleration; area under curve = displacement.' },
  { title: '7. Relative Motion', content: 'Relative velocity of A w.r.t. B is v_A − v_B; useful for moving observers.' },
  { title: 'Summary', content: 'Use distance vs. displacement (scalar vs. vector), speed vs. velocity, acceleration, and motion equations/graphs to analyse motion.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Motion of a train at constant speed is:', options: [
    { key: 'a', text: 'Uniform motion' }, { key: 'b', text: 'Non-uniform motion' }, { key: 'c', text: 'Accelerated motion' }, { key: 'd', text: 'Circular motion' }
  ], answer: 'a', explanation: 'Equal distances in equal times.' },
  { id: 'q2', question: 'Displacement is a:', options: [
    { key: 'a', text: 'Scalar' }, { key: 'b', text: 'Vector' }, { key: 'c', text: 'Always zero' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'It has magnitude and direction.' },
  { id: 'q3', question: 'Speed is:', options: [
    { key: 'a', text: 'Vector' }, { key: 'b', text: 'Scalar' }, { key: 'c', text: 'Both' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'No direction associated.' },
  { id: 'q4', question: 'Acceleration formula is:', options: [
    { key: 'a', text: 'a = s / t' }, { key: 'b', text: 'a = (v − u)/t' }, { key: 'c', text: 'a = (u + v)/t' }, { key: 'd', text: 'a = v × t' }
  ], answer: 'b', explanation: 'Rate of change of velocity.' },
  { id: 'q5', question: 'Velocity–time graph for uniform speed is:', options: [
    { key: 'a', text: 'Horizontal line' }, { key: 'b', text: 'Straight line with slope' }, { key: 'c', text: 'Parabola' }, { key: 'd', text: 'Vertical line' }
  ], answer: 'a', explanation: 'Slope (acceleration) = 0.' },
  { id: 'q6', question: 'Correct displacement equation (uniform a):', options: [
    { key: 'a', text: 's = ut + (1/2) a t^2' }, { key: 'b', text: 's = u + at' }, { key: 'c', text: 's = v − u' }, { key: 'd', text: 's = vt' }
  ], answer: 'a', explanation: 'One of the SUVAT equations.' },
  { id: 'q7', question: 'A body in uniform circular motion has:', options: [
    { key: 'a', text: 'Zero velocity' }, { key: 'b', text: 'Zero acceleration' }, { key: 'c', text: 'Constant speed, changing velocity' }, { key: 'd', text: 'Constant velocity' }
  ], answer: 'c', explanation: 'Direction changes continuously.' },
  { id: 'q8', question: 'Relative velocity (same direction) is:', options: [
    { key: 'a', text: 'Sum of speeds' }, { key: 'b', text: 'Difference of velocities' }, { key: 'c', text: 'Product of speeds' }, { key: 'd', text: 'Zero' }
  ], answer: 'b', explanation: 'v_rel = v_A − v_B.' },
  { id: 'q9', question: 'Area under velocity–time graph:', options: [
    { key: 'a', text: 'Speed' }, { key: 'b', text: 'Displacement' }, { key: 'c', text: 'Acceleration' }, { key: 'd', text: 'Distance travelled in a second only' }
  ], answer: 'b', explanation: 'Area integrates velocity over time.' },
  { id: 'q10', question: 'SI unit of acceleration:', options: [
    { key: 'a', text: 'm/s' }, { key: 'b', text: 'm/s²' }, { key: 'c', text: 'km/h' }, { key: 'd', text: 'm²/s' }
  ], answer: 'b', explanation: 'Standard SI unit.' },
]

export default function PhyG9Motion() {
  return (
    <LessonModuleTemplate
      title="Motion"
      subject="Physics"
      grade={9}
      backLink="/lessons/Physics/9"
      lessonId="phy-g9-motion"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
