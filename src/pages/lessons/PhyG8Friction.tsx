import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Friction is a force that opposes motion between surfaces. It slows down objects but also allows activities like walking, driving, and writing.' },
  { title: '1. What is Friction?', content: 'Friction is the resistive force between two surfaces in contact. It acts opposite to the direction of motion (or impending motion).' },
  { title: '2. Types of Friction', content: 'Static: acts when an object is at rest; prevents motion. Kinetic/Sliding: acts when surfaces slide. Rolling: acts when objects roll; smaller than sliding. Fluid: drag experienced in liquids/gases.' },
  { title: '3. Factors Affecting Friction', content: 'Surface roughness: rough → more friction; smooth → less friction. Normal force: heavier objects press harder → more friction. Type of motion: static > kinetic. Nature of materials: some pairs have more/less friction.' },
  { title: '4. Advantages of Friction', content: 'Enables walking/driving without slipping, braking vehicles, belts/clutches in machines, writing and gripping.' },
  { title: '5. Disadvantages of Friction', content: 'Causes wear and tear, energy loss as heat, reduces efficiency and speed.' },
  { title: '6. Reducing Friction', content: 'Use lubricants (oil, grease), ball bearings/wheels, polish surfaces, streamline shapes in fluids.' },
  { title: '7. Increasing Friction', content: 'Roughen surfaces, use rubber soles, treaded tires; increase normal force if needed.' },
  { title: 'Summary', content: 'Friction opposes motion. It can be helpful or wasteful. Manage friction by increasing when needed (grip) and reducing when it wastes energy.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Friction:', options: [
    { key: 'a', text: 'Assists motion' }, { key: 'b', text: 'Opposes motion' }, { key: 'c', text: 'Does not act' }, { key: 'd', text: 'Only in liquids' }
  ], answer: 'b', explanation: 'Friction always opposes relative motion.' },
  { id: 'q2', question: 'Friction on a stationary object is:', options: [
    { key: 'a', text: 'Kinetic' }, { key: 'b', text: 'Rolling' }, { key: 'c', text: 'Static' }, { key: 'd', text: 'Fluid' }
  ], answer: 'c', explanation: 'Static friction prevents motion.' },
  { id: 'q3', question: 'Sliding friction is ____ rolling friction.', options: [
    { key: 'a', text: '<' }, { key: 'b', text: '=' }, { key: 'c', text: '>' }, { key: 'd', text: 'Zero' }
  ], answer: 'c', explanation: 'Rolling friction is generally less than sliding friction.' },
  { id: 'q4', question: 'Which reduces friction?', options: [
    { key: 'a', text: 'Sandpaper' }, { key: 'b', text: 'Oil' }, { key: 'c', text: 'Rough surface' }, { key: 'd', text: 'Increasing weight' }
  ], answer: 'b', explanation: 'Lubricants reduce friction.' },
  { id: 'q5', question: 'Rolling friction is:', options: [
    { key: 'a', text: '> static' }, { key: 'b', text: '< sliding' }, { key: 'c', text: '= kinetic' }, { key: 'd', text: 'Not present' }
  ], answer: 'b', explanation: 'Rolling friction is typically the least among contact frictions.' },
  { id: 'q6', question: 'Friction is necessary for:', options: [
    { key: 'a', text: 'Driving' }, { key: 'b', text: 'Writing' }, { key: 'c', text: 'Walking' }, { key: 'd', text: 'All' }
  ], answer: 'd', explanation: 'All listed actions require friction.' },
  { id: 'q7', question: 'Air resistance is:', options: [
    { key: 'a', text: 'Static' }, { key: 'b', text: 'Sliding' }, { key: 'c', text: 'Fluid' }, { key: 'd', text: 'Rolling' }
  ], answer: 'c', explanation: 'Drag in fluids (air) is fluid friction.' },
  { id: 'q8', question: 'Does NOT affect friction:', options: [
    { key: 'a', text: 'Surface roughness' }, { key: 'b', text: 'Normal force' }, { key: 'c', text: 'Color' }, { key: 'd', text: 'Type of motion' }
  ], answer: 'c', explanation: 'Color has no effect.' },
  { id: 'q9', question: 'Rubber soles → more friction because they are:', options: [
    { key: 'a', text: 'Smooth' }, { key: 'b', text: 'Heavy' }, { key: 'c', text: 'Rough' }, { key: 'd', text: 'Reduce weight' }
  ], answer: 'c', explanation: 'Rough texture increases friction.' },
  { id: 'q10', question: 'Lubricants:', options: [
    { key: 'a', text: 'Increase friction' }, { key: 'b', text: 'Reduce friction' }, { key: 'c', text: 'Stop motion' }, { key: 'd', text: 'Increase weight' }
  ], answer: 'b', explanation: 'They separate surfaces with a thin film, reducing friction.' },
]

export default function PhyG8Friction() {
  return (
    <LessonModuleTemplate
      title="Friction"
      subject="Physics"
      grade={8}
      backLink="/lessons/Physics/8"
      lessonId="phy-g8-friction"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
