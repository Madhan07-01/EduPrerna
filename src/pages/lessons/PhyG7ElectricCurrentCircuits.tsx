import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Electricity powers our homes, schools, and gadgets. Electric current is the flow of electric charge through a conductor. Electrical devices work when components are arranged in a circuit. Understanding current and circuits helps us use electricity safely and efficiently.' },
  { title: '1. Electric Current', content: 'Electric current (I) = flow of charges (usually electrons). Unit: Ampere (A). Formula: I = Q / t, where Q = charge (Coulombs), t = time (seconds). Conventional direction: Positive → Negative.' },
  { title: '2. Voltage / Potential Difference', content: 'Voltage (V) is the energy per unit charge that drives current. Unit: Volt (V). Provided by batteries, cells, or a power supply.' },
  { title: '3. Resistance', content: 'Opposition to current flow in a material. Unit: Ohm (Ω). Ohm’s Law: V = I × R.' },
  { title: '4. Electric Circuits', content: 'A circuit is a closed path through which current flows. Components: Battery/Cell, Wires, Load (resistor, bulb, motor), Switch.' },
  { title: '5. Types of Circuits', content: 'Series: components end-to-end; current same; voltage divides (e.g., old Christmas lights). Parallel: components across same nodes; voltage same; current divides (e.g., home wiring).' },
  { title: '6. Switches and Safety', content: 'Switch opens/closes circuit. Safety devices include fuse and circuit breaker (protect against excessive current).' },
  { title: '7. Conductors and Insulators', content: 'Conductors allow current (copper, aluminum); Insulators resist current (rubber, plastic, wood).' },
  { title: 'Summary', content: 'Current is charge flow driven by voltage and opposed by resistance. Circuits must be closed; series/parallel have distinct behaviors; use switches and safety devices.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Electric current is the flow of:', options: [
    { key: 'a', text: 'Protons' }, { key: 'b', text: 'Neutrons' }, { key: 'c', text: 'Electrons' }, { key: 'd', text: 'Photons' }
  ], answer: 'c', explanation: 'In conductors, electrons carry charge.' },
  { id: 'q2', question: 'Unit of electric current:', options: [
    { key: 'a', text: 'Volt' }, { key: 'b', text: 'Ampere' }, { key: 'c', text: 'Ohm' }, { key: 'd', text: 'Watt' }
  ], answer: 'b', explanation: 'Ampere (A) is the SI unit of current.' },
  { id: 'q3', question: 'Voltage is also called:', options: [
    { key: 'a', text: 'Resistance' }, { key: 'b', text: 'Potential Difference' }, { key: 'c', text: 'Power' }, { key: 'd', text: 'Charge' }
  ], answer: 'b', explanation: 'Potential difference drives current.' },
  { id: 'q4', question: 'Ohm’s law is:', options: [
    { key: 'a', text: 'V = I + R' }, { key: 'b', text: 'V = I × R' }, { key: 'c', text: 'I = V × R' }, { key: 'd', text: 'R = V + I' }
  ], answer: 'b', explanation: 'For ohmic conductors, V is proportional to I: V = I R.' },
  { id: 'q5', question: 'In a series circuit:', options: [
    { key: 'a', text: 'Current same in all components' }, { key: 'b', text: 'Voltage same in all components' }, { key: 'c', text: 'Current divides among branches' }, { key: 'd', text: 'Circuit cannot be closed' }
  ], answer: 'a', explanation: 'Series path carries same current through each element.' },
  { id: 'q6', question: 'In a parallel circuit:', options: [
    { key: 'a', text: 'Current same in all components' }, { key: 'b', text: 'Voltage same across all components' }, { key: 'c', text: 'Voltage divides among components' }, { key: 'd', text: 'Circuit cannot work' }
  ], answer: 'b', explanation: 'All branches share the same voltage across them.' },
  { id: 'q7', question: 'Device controlling flow of current:', options: [
    { key: 'a', text: 'Bulb' }, { key: 'b', text: 'Battery' }, { key: 'c', text: 'Switch' }, { key: 'd', text: 'Resistor' }
  ], answer: 'c', explanation: 'Switch opens/closes circuit.' },
  { id: 'q8', question: 'Material that resists current:', options: [
    { key: 'a', text: 'Copper' }, { key: 'b', text: 'Aluminum' }, { key: 'c', text: 'Rubber' }, { key: 'd', text: 'Iron' }
  ], answer: 'c', explanation: 'Rubber is an insulator.' },
  { id: 'q9', question: 'Unit of resistance:', options: [
    { key: 'a', text: 'Volt' }, { key: 'b', text: 'Ampere' }, { key: 'c', text: 'Ohm' }, { key: 'd', text: 'Watt' }
  ], answer: 'c', explanation: 'Ohm (Ω) is the SI unit of resistance.' },
  { id: 'q10', question: 'Circuit is closed when:', options: [
    { key: 'a', text: 'Switch open' }, { key: 'b', text: 'Current does not flow' }, { key: 'c', text: 'Complete path exists' }, { key: 'd', text: 'Battery removed' }
  ], answer: 'c', explanation: 'A continuous path is required for current to flow.' },
]

export default function PhyG7ElectricCurrentCircuits() {
  return (
    <LessonModuleTemplate
      title="Electric Current and Circuits"
      subject="Physics"
      grade={7}
      backLink="/lessons/Physics/7"
      lessonId="phy-g7-electric-current-circuits"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
