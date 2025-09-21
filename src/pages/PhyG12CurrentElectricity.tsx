import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Current electricity studies the flow of charge in conductors and the behavior of circuits. It covers current, resistance, Ohm’s law, power, EMF, internal resistance, and Kirchhoff’s laws.' },
  { title: '1. Electric Current (I)', content: 'Rate of flow of charge: I = dq/dt (Ampere). Conventional direction is from + to − terminal.' },
  { title: '2. Drift Velocity', content: 'Average electron velocity: v_d = I / (n A e), where n is number density, A area, e elementary charge.' },
  { title: '3. Ohm’s Law & Resistivity', content: 'V = IR. Resistance R = ρ l / A where ρ is resistivity, l length, A cross-section. Conductivity σ = 1/ρ.' },
  { title: '4. Series & Parallel Resistors', content: 'Series: R_total = R1 + R2 + ...; current same, voltages add. Parallel: 1/R_total = 1/R1 + 1/R2 + ...; voltage same, currents add.' },
  { title: '5. EMF, Internal Resistance', content: 'Terminal voltage: V = 𝓔 − I r. EMF is work per unit charge provided by source.' },
  { title: '6. Power in Circuits', content: 'P = VI = I^2 R = V^2 / R. Joule heating in resistors.' },
  { title: '7. Kirchhoff’s Laws', content: 'KCL: Sum of currents at a junction is zero. KVL: Sum of potential differences around a closed loop is zero. Used for complex circuits.' },
  { title: '8. Cells in Series & Parallel', content: 'Series: 𝓔 add, r add. Parallel: effective internal resistance reduces; EMF remains same (ideal identical cells).' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Unit of electric current is', options: [
    { key: 'a', text: 'Volt' }, { key: 'b', text: 'Ampere' }, { key: 'c', text: 'Ohm' }, { key: 'd', text: 'Watt' }
  ], answer: 'b', explanation: 'Current measured in Amperes (A).' },
  { id: 'q2', question: 'Resistance depends on', options: [
    { key: 'a', text: 'Conductor length' }, { key: 'b', text: 'Cross-sectional area' }, { key: 'c', text: 'Material (ρ)' }, { key: 'd', text: 'All of the above' }
  ], answer: 'd', explanation: 'R = ρ l / A.' },
  { id: 'q3', question: 'Series total resistance is', options: [
    { key: 'a', text: '1/R1 + 1/R2' }, { key: 'b', text: 'R1 + R2' }, { key: 'c', text: '√(R1^2 + R2^2)' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Series resistances add.' },
  { id: 'q4', question: 'Voltage across each resistor in parallel is', options: [
    { key: 'a', text: 'Different' }, { key: 'b', text: 'Same' }, { key: 'c', text: 'Zero' }, { key: 'd', text: 'Depends on current' }
  ], answer: 'b', explanation: 'Parallel branches have same potential difference.' },
  { id: 'q5', question: 'Ohm’s law is invalid for', options: [
    { key: 'a', text: 'Metal at constant temperature' }, { key: 'b', text: 'Superconductor' }, { key: 'c', text: 'Diode' }, { key: 'd', text: 'Both b and c' }
  ], answer: 'd', explanation: 'Non-ohmic devices (diode), superconductors violate V∝I.' },
  { id: 'q6', question: 'EMF is work done per', options: [
    { key: 'a', text: 'Unit current' }, { key: 'b', text: 'Unit charge' }, { key: 'c', text: 'Unit resistance' }, { key: 'd', text: 'Unit voltage' }
  ], answer: 'b', explanation: '𝓔 = W/q.' },
  { id: 'q7', question: 'Power in resistor equals', options: [
    { key: 'a', text: 'I^2 R' }, { key: 'b', text: 'V^2 / R' }, { key: 'c', text: 'VI' }, { key: 'd', text: 'All of these' }
  ], answer: 'd', explanation: 'All are equivalent via V = IR.' },
  { id: 'q8', question: 'Internal resistance reduces', options: [
    { key: 'a', text: 'EMF' }, { key: 'b', text: 'Terminal voltage' }, { key: 'c', text: 'Current' }, { key: 'd', text: 'Power' }
  ], answer: 'b', explanation: 'V = 𝓔 − I r; it also affects current and power.' },
  { id: 'q9', question: 'KCL is based on conservation of', options: [
    { key: 'a', text: 'Energy' }, { key: 'b', text: 'Charge' }, { key: 'c', text: 'Momentum' }, { key: 'd', text: 'Mass' }
  ], answer: 'b', explanation: 'Charge in = charge out at a node.' },
  { id: 'q10', question: 'Drift velocity increases when', options: [
    { key: 'a', text: 'Current increases' }, { key: 'b', text: 'Number density decreases' }, { key: 'c', text: 'Area decreases' }, { key: 'd', text: 'All of the above' }
  ], answer: 'd', explanation: 'From v_d = I/(n A e).' },
]

export default function PhyG12CurrentElectricity() {
  return (
    <LessonModuleTemplate
      title="Current Electricity"
      subject="Physics"
      grade={12}
      backLink="/lessons/Physics/12"
      lessonId="phy-g12-current-electricity"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
