import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Electricity is the flow of electric charge through a conductor. It powers homes, industries, and electronic devices. This lesson covers current, voltage, resistance, Ohm’s law, power, and basic circuits.' },
  { title: '1. Electric Current', content: 'Current I is the rate of flow of charge: I = Q / t, where Q (C) is charge and t (s) is time. Unit: Ampere (A). Conventional current flows from + to −.' },
  { title: '2. Voltage (Potential Difference)', content: 'Voltage V is work per unit charge: V = W / Q, with W (J) work and Q (C) charge. Unit: Volt (V).' },
  { title: '3. Resistance', content: 'Resistance R opposes current. Unit: Ohm (Ω). Depends on material, length (↑ length → ↑ R), area (↑ area → ↓ R), and temperature (usually ↑ T → ↑ R).' },
  { title: '4. Ohm’s Law', content: 'V = I R for ohmic conductors (R constant). Linear V–I characteristic.' },
  { title: '5. Electric Power', content: 'Power P is rate of energy use: P = V I = I^2 R = V^2 / R. Unit: Watt (W).' },
  { title: '6. Series and Parallel Circuits', content: 'Series: same current; R_total = R1 + R2 + …. Parallel: same voltage; 1/R_total = 1/R1 + 1/R2 + ….' },
  { title: '7. Applications', content: 'House wiring (mostly parallel), appliances, motors, and power distribution.' },
  { title: 'Summary', content: 'Current measures charge flow; voltage drives charges; resistance hinders flow. Ohm’s law links V, I, R; power quantifies energy rate; series/parallel rules size up circuits.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'SI unit of electric current:', options: [
    { key: 'a', text: 'Volt' }, { key: 'b', text: 'Ampere' }, { key: 'c', text: 'Ohm' }, { key: 'd', text: 'Watt' }
  ], answer: 'b', explanation: 'Ampere (A).' },
  { id: 'q2', question: 'Potential difference is measured in:', options: [
    { key: 'a', text: 'Ampere' }, { key: 'b', text: 'Volt' }, { key: 'c', text: 'Ohm' }, { key: 'd', text: 'Coulomb' }
  ], answer: 'b', explanation: 'Volt (V).' },
  { id: 'q3', question: 'Resistance depends on:', options: [
    { key: 'a', text: 'Material' }, { key: 'b', text: 'Length/area' }, { key: 'c', text: 'Temperature' }, { key: 'd', text: 'All of the above' }
  ], answer: 'd', explanation: 'All listed factors affect R.' },
  { id: 'q4', question: 'Ohm’s law is:', options: [
    { key: 'a', text: 'V = I / R' }, { key: 'b', text: 'V = I R' }, { key: 'c', text: 'P = I V' }, { key: 'd', text: 'R = V I' }
  ], answer: 'b', explanation: 'V = I R for ohmic conductors.' },
  { id: 'q5', question: 'Unit of electrical power:', options: [
    { key: 'a', text: 'Ampere' }, { key: 'b', text: 'Volt' }, { key: 'c', text: 'Ohm' }, { key: 'd', text: 'Watt' }
  ], answer: 'd', explanation: 'Watt (W).' },
  { id: 'q6', question: 'In series circuits, total resistance is:', options: [
    { key: 'a', text: 'Equal to smallest R' }, { key: 'b', text: 'Sum of all R' }, { key: 'c', text: 'Less than smallest R' }, { key: 'd', text: 'Equal to largest R' }
  ], answer: 'b', explanation: 'R_total adds up in series.' },
  { id: 'q7', question: 'In parallel, voltage across each resistor is:', options: [
    { key: 'a', text: 'Different' }, { key: 'b', text: 'Same' }, { key: 'c', text: 'Zero' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'All branches share same V.' },
  { id: 'q8', question: 'Power in terms of I and R:', options: [
    { key: 'a', text: 'P = I^2 R' }, { key: 'b', text: 'P = V / I' }, { key: 'c', text: 'P = V^2 / I' }, { key: 'd', text: 'P = I / R' }
  ], answer: 'a', explanation: 'P = I^2 R.' },
  { id: 'q9', question: 'Conventional current flows from:', options: [
    { key: 'a', text: 'Negative to positive' }, { key: 'b', text: 'Positive to negative' }, { key: 'c', text: 'Both directions' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Defined as + → − direction.' },
  { id: 'q10', question: 'Ohm’s law applies to:', options: [
    { key: 'a', text: 'All materials' }, { key: 'b', text: 'Only superconductors' }, { key: 'c', text: 'Ohmic conductors' }, { key: 'd', text: 'None' }
  ], answer: 'c', explanation: 'Linear V–I relation.' },
]

export default function PhyG10Electricity() {
  return (
    <LessonModuleTemplate
      title="Electricity"
      subject="Physics"
      grade={10}
      backLink="/lessons/Physics/10"
      lessonId="phy-g10-electricity"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
