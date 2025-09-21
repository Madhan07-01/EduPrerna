import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Heat is a form of energy that causes temperature to rise. It is involved in boiling, melting, sunlight, and daily phenomena. Understanding heat and its transfer is fundamental in physics.' },
  { title: '1. What is Heat?', content: 'Heat is energy transferred from a hotter object to a cooler object. Unit: Joule (J). Temperature indicates degree of hotness or coldness.' },
  { title: '2. Modes of Heat Transfer', content: 'Conduction: Transfer through solids via contact (e.g., metal spoon in boiling water). Convection: Transfer in fluids via bulk motion (e.g., boiling water currents). Radiation: Transfer by electromagnetic waves without a medium (e.g., sunlight).' },
  { title: '3. Effects of Heat', content: 'Expansion: Most substances expand on heating and contract on cooling (bridges have expansion gaps). Change of state: Melting (solid→liquid), Boiling/Evaporation (liquid→gas), Condensation (gas→liquid), Freezing (liquid→solid).' },
  { title: '4. Measuring Temperature', content: 'Use a thermometer. Common scales: Celsius (°C), Kelvin (K), Fahrenheit (°F).' },
  { title: '5. Specific Heat Capacity', content: 'Heat required to raise 1 kg of a substance by 1°C. Formula: Q = m × c × ΔT, where Q (J) is heat, m (kg) is mass, c (J/kg°C) is specific heat, ΔT (°C) is temperature change.' },
  { title: '6. Insulators and Conductors of Heat', content: 'Conductors allow heat easily (metals). Insulators resist heat transfer (wood, plastic, wool).' },
  { title: 'Summary', content: 'Heat flows from hot to cold by conduction, convection, or radiation. Heating can expand matter or change its state. Temperature is measured on °C/K/°F; specific heat links heat, mass, and temperature change.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Heat is a form of:', options: [
    { key: 'a', text: 'Mass' }, { key: 'b', text: 'Energy' }, { key: 'c', text: 'Force' }, { key: 'd', text: 'Pressure' }
  ], answer: 'b', explanation: 'Heat is energy in transit due to temperature difference.' },
  { id: 'q2', question: 'Unit of heat:', options: [
    { key: 'a', text: 'Joule' }, { key: 'b', text: 'Watt' }, { key: 'c', text: 'Newton' }, { key: 'd', text: 'Volt' }
  ], answer: 'a', explanation: 'Joule (J) is SI unit of energy.' },
  { id: 'q3', question: 'Heat transfer by direct contact:', options: [
    { key: 'a', text: 'Conduction' }, { key: 'b', text: 'Convection' }, { key: 'c', text: 'Radiation' }, { key: 'd', text: 'Reflection' }
  ], answer: 'a', explanation: 'Conduction requires contact between particles.' },
  { id: 'q4', question: 'Heat transfer in fluids due to bulk motion:', options: [
    { key: 'a', text: 'Conduction' }, { key: 'b', text: 'Convection' }, { key: 'c', text: 'Radiation' }, { key: 'd', text: 'Diffusion' }
  ], answer: 'b', explanation: 'Convection occurs in liquids and gases.' },
  { id: 'q5', question: 'Heat transfer without a medium:', options: [
    { key: 'a', text: 'Conduction' }, { key: 'b', text: 'Convection' }, { key: 'c', text: 'Radiation' }, { key: 'd', text: 'Evaporation' }
  ], answer: 'c', explanation: 'Radiation propagates through vacuum.' },
  { id: 'q6', question: 'Example of expansion of solids:', options: [
    { key: 'a', text: 'Ice melting' }, { key: 'b', text: 'Mercury rising in thermometer' }, { key: 'c', text: 'Water boiling' }, { key: 'd', text: 'Steam condensing' }
  ], answer: 'b', explanation: 'Mercury expands with temperature increase.' },
  { id: 'q7', question: 'Specific heat = heat required to raise 1 kg by:', options: [
    { key: 'a', text: '1 K' }, { key: 'b', text: '1 m' }, { key: 'c', text: '1°C' }, { key: 'd', text: '1 L' }
  ], answer: 'c', explanation: 'Specific heat relates to temperature change per kg.' },
  { id: 'q8', question: 'Materials allowing heat easily:', options: [
    { key: 'a', text: 'Insulators' }, { key: 'b', text: 'Conductors' }, { key: 'c', text: 'Fluids' }, { key: 'd', text: 'Solids' }
  ], answer: 'b', explanation: 'Metals conduct heat well.' },
  { id: 'q9', question: 'Temperature is measured by:', options: [
    { key: 'a', text: 'Barometer' }, { key: 'b', text: 'Thermometer' }, { key: 'c', text: 'Hygrometer' }, { key: 'd', text: 'Ammeter' }
  ], answer: 'b', explanation: 'Thermometers measure temperature.' },
  { id: 'q10', question: 'Process of liquid → gas:', options: [
    { key: 'a', text: 'Condensation' }, { key: 'b', text: 'Evaporation/Boiling' }, { key: 'c', text: 'Freezing' }, { key: 'd', text: 'Melting' }
  ], answer: 'b', explanation: 'Evaporation/boiling changes liquid to gas.' },
]

export default function PhyG7Heat() {
  return (
    <LessonModuleTemplate
      title="Heat"
      subject="Physics"
      grade={7}
      backLink="/lessons/Physics/7"
      lessonId="phy-g7-heat"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
