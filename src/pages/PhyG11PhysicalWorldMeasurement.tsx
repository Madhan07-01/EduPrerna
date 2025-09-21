import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Physics studies the physical world — motion, force, energy, matter, and the universe. Measurement provides quantitative values for physical quantities, enabling experiments, comparisons, laws, and predictions.' },
  { title: '1. Physics and its Scope', content: 'Physics uses observations and experiments to discover laws of nature. Major branches include Mechanics, Thermodynamics, Electromagnetism, Optics, and Modern Physics.' },
  { title: '2. Need for Measurement', content: 'To describe quantities precisely, perform repeatable experiments, compare results, and build technology and scientific models.' },
  { title: '3. Physical Quantities', content: 'Fundamental (Base) quantities and SI units: Length (m), Mass (kg), Time (s), Electric current (A), Temperature (K), Luminous intensity (cd), Amount of substance (mol). Derived quantities are expressed using base units, e.g., Velocity (m/s), Force (N = kg·m/s²), Energy (J = N·m).' },
  { title: '4. Units and Prefixes', content: 'SI system is globally used. Common prefixes: kilo (10^3), centi (10^-2), milli (10^-3), micro (10^-6), nano (10^-9).' },
  { title: '5. Instruments', content: 'Length: meter scale, Vernier caliper; Mass: beam/digital balance; Time: stopwatch; Temperature: thermometer; Current: ammeter.' },
  { title: '6. Accuracy, Precision, Errors', content: 'Accuracy: closeness to true value. Precision: repeatability. Errors: Systematic (e.g., zero error), Random (unpredictable). Significant figures reflect reliability.' },
  { title: '7. Dimensional Analysis', content: 'Represents quantities by base dimensions; checks correctness, derives relations, and converts units. Example: [Force] = [M][L][T^-2].' },
  { title: '8. Standards of Measurement', content: 'Length: meter defined via speed of light; Mass: kilogram via Planck constant; Time: second via cesium-133 radiation.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Physics is primarily the study of:', options: [
    { key: 'a', text: 'Living organisms' }, { key: 'b', text: 'Non-living phenomena' }, { key: 'c', text: 'Chemical reactions' }, { key: 'd', text: 'Economic systems' }
  ], answer: 'b', explanation: 'Physics focuses on natural physical phenomena.' },
  { id: 'q2', question: 'SI unit of mass is:', options: [
    { key: 'a', text: 'Gram' }, { key: 'b', text: 'Kilogram' }, { key: 'c', text: 'Pound' }, { key: 'd', text: 'Tonne' }
  ], answer: 'b', explanation: 'The SI base unit for mass is kilogram (kg).' },
  { id: 'q3', question: 'The derived unit of force is:', options: [
    { key: 'a', text: 'Joule' }, { key: 'b', text: 'Newton' }, { key: 'c', text: 'Watt' }, { key: 'd', text: 'Pascal' }
  ], answer: 'b', explanation: 'Newton (N) = kg·m/s².' },
  { id: 'q4', question: '1 kilometer equals:', options: [
    { key: 'a', text: '10^3 meters' }, { key: 'b', text: '10^2 meters' }, { key: 'c', text: '10^4 meters' }, { key: 'd', text: '10^5 meters' }
  ], answer: 'a', explanation: 'kilo denotes 10^3.' },
  { id: 'q5', question: 'Which instrument measures length accurately?', options: [
    { key: 'a', text: 'Ammeter' }, { key: 'b', text: 'Vernier Caliper' }, { key: 'c', text: 'Thermometer' }, { key: 'd', text: 'Stopwatch' }
  ], answer: 'b', explanation: 'Vernier caliper is for precise length measurements.' },
  { id: 'q6', question: 'The dimension of velocity is:', options: [
    { key: 'a', text: '[L]' }, { key: 'b', text: '[T]' }, { key: 'c', text: '[L T^-1]' }, { key: 'd', text: '[M L T^-2]' }
  ], answer: 'c', explanation: 'Velocity = length/time.' },
  { id: 'q7', question: 'Accuracy refers to:', options: [
    { key: 'a', text: 'Repeatability' }, { key: 'b', text: 'Closeness to true value' }, { key: 'c', text: 'Random error' }, { key: 'd', text: 'Number of digits' }
  ], answer: 'b', explanation: 'Precision is repeatability; accuracy is closeness to true value.' },
  { id: 'q8', question: '1 Joule equals:', options: [
    { key: 'a', text: '1 N·m' }, { key: 'b', text: '1 kg·m^2/s^2' }, { key: 'c', text: 'Both a and b' }, { key: 'd', text: '1 W·s' }
  ], answer: 'c', explanation: 'Both are equivalent definitions of Joule.' },
  { id: 'q9', question: 'Which is a fundamental quantity?', options: [
    { key: 'a', text: 'Velocity' }, { key: 'b', text: 'Force' }, { key: 'c', text: 'Mass' }, { key: 'd', text: 'Energy' }
  ], answer: 'c', explanation: 'Mass is a base quantity; others are derived.' },
  { id: 'q10', question: 'A zero error is an example of:', options: [
    { key: 'a', text: 'Random error' }, { key: 'b', text: 'Systematic error' }, { key: 'c', text: 'Human error' }, { key: 'd', text: 'Accidental error' }
  ], answer: 'b', explanation: 'Consistent offset is systematic.' },
]

export default function PhyG11PhysicalWorldMeasurement() {
  return (
    <LessonModuleTemplate
      title="Physical World and Measurement"
      subject="Physics"
      grade={11}
      backLink="/lessons/Physics/11"
      lessonId="phy-g11-physical-world-measurement"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
