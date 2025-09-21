import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Everything around us is in motion. A bird flies, a car moves, and even the Earth revolves around the Sun. Understanding motion and how it is measured is a key part of physics. Time helps us describe how fast or slow something is moving.' },
  { title: '1. Motion', content: 'Motion is the change in position of an object with respect to time. Example: A car moving from home to school. Reference Point: The position from which motion is observed.' },
  { title: '2. Types of Motion', content: 'Uniform Motion: Object covers equal distances in equal intervals of time (e.g., constant speed on a highway). Non-uniform Motion: Unequal distances in equal intervals (e.g., car in traffic).' },
  { title: '3. Distance and Displacement', content: 'Distance = total path length, always positive. Displacement = shortest straight line from initial to final position, can be positive/negative/zero. Example: 5 m east then 3 m west → Distance = 8 m, Displacement = 2 m east.' },
  { title: '4. Speed', content: 'Speed = Distance / Time. SI unit: m/s. Average speed = total distance / total time. Example: 200 m in 10 s → 20 m/s.' },
  { title: '5. Time Measurement', content: 'Measured using clocks, stopwatches, timers. SI unit: second (s). 1 minute = 60 s; 1 hour = 3600 s.' },
  { title: '6. Distance, Speed, Time Relations', content: 'Distance = Speed × Time; Time = Distance / Speed; Speed = Distance / Time. Example: 20 m/s for 10 s → Distance = 200 m.' },
  { title: '7. Motion Graphs', content: 'Distance–Time Graph: slope = speed; straight line → uniform motion. Speed–Time Graph: area under graph = distance.' },
  { title: '8. Measuring Instruments', content: 'Odometer → distance travelled; Stopwatch → time; Speedometer → instantaneous speed.' },
  { title: 'Summary', content: 'Motion relates position change with time. Use distance/displacement, speed, and graphs to describe motion; measure using odometer, stopwatch, speedometer.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Motion is defined as:', options: [
    { key: 'a', text: 'Change in speed only' }, { key: 'b', text: 'Change in position with time' }, { key: 'c', text: 'Change in acceleration' }, { key: 'd', text: 'Change in direction only' }
  ], answer: 'b', explanation: 'Motion involves position change with respect to time.' },
  { id: 'q2', question: 'SI unit of time is:', options: [
    { key: 'a', text: 'Minute' }, { key: 'b', text: 'Hour' }, { key: 'c', text: 'Second' }, { key: 'd', text: 'Meter' }
  ], answer: 'c', explanation: 'The SI unit for time is second (s).' },
  { id: 'q3', question: 'Distance is always:', options: [
    { key: 'a', text: 'Positive' }, { key: 'b', text: 'Negative' }, { key: 'c', text: 'Zero' }, { key: 'd', text: 'Positive or Negative' }
  ], answer: 'a', explanation: 'Distance is a scalar and non-negative.' },
  { id: 'q4', question: 'Displacement is:', options: [
    { key: 'a', text: 'Always equal to distance' }, { key: 'b', text: 'Shortest distance from initial to final position' }, { key: 'c', text: 'Always positive' }, { key: 'd', text: 'Total path covered' }
  ], answer: 'b', explanation: 'Displacement is a vector from start to end point.' },
  { id: 'q5', question: 'Which is an example of uniform motion?', options: [
    { key: 'a', text: 'Car stuck in traffic' }, { key: 'b', text: 'Train moving at constant speed' }, { key: 'c', text: 'Ball rolling down a slope' }, { key: 'd', text: 'Walking in zig-zag' }
  ], answer: 'b', explanation: 'Constant speed → uniform motion.' },
  { id: 'q6', question: 'Formula for speed is:', options: [
    { key: 'a', text: 'Speed × Time = Distance' }, { key: 'b', text: 'Distance / Time = Speed' }, { key: 'c', text: 'Distance × Time = Speed' }, { key: 'd', text: 'Time / Distance = Speed' }
  ], answer: 'b', explanation: 'Speed = Distance / Time.' },
  { id: 'q7', question: 'A car moves 150 m in 30 s. Its speed is:', options: [
    { key: 'a', text: '5 m/s' }, { key: 'b', text: '3 m/s' }, { key: 'c', text: '10 m/s' }, { key: 'd', text: '0.2 m/s' }
  ], answer: 'a', explanation: '150/30 = 5 m/s.' },
  { id: 'q8', question: 'In a distance-time graph, a straight line indicates:', options: [
    { key: 'a', text: 'Non-uniform motion' }, { key: 'b', text: 'Uniform motion' }, { key: 'c', text: 'Acceleration' }, { key: 'd', text: 'Rest' }
  ], answer: 'b', explanation: 'Straight line slope is constant → uniform speed.' },
  { id: 'q9', question: 'Which instrument measures instantaneous speed?', options: [
    { key: 'a', text: 'Odometer' }, { key: 'b', text: 'Speedometer' }, { key: 'c', text: 'Stopwatch' }, { key: 'd', text: 'Tape measure' }
  ], answer: 'b', explanation: 'Speedometer shows current speed.' },
  { id: 'q10', question: 'If a body moves 50 m in 10 s, the time to move 100 m at the same speed is:', options: [
    { key: 'a', text: '20 s' }, { key: 'b', text: '5 s' }, { key: 'c', text: '10 s' }, { key: 'd', text: '15 s' }
  ], answer: 'a', explanation: 'Speed = 5 m/s, so 100/5 = 20 s.' },
]

export default function PhyG7MotionTime() {
  return (
    <LessonModuleTemplate
      title="Motion and Time"
      subject="Physics"
      grade={7}
      backLink="/lessons/Physics/7"
      lessonId="phy-g7-motion-time"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
