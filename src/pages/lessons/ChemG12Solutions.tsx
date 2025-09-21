import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Solutions are homogeneous mixtures of solute(s) in a solvent. Key ideas: concentration units, dilution, solubility, colligative properties, Raoult’s law.' },
  { title: '1. Concentration Units', content: '• Molarity (M) = moles solute / litre solution.\n• Molality (m) = moles solute / kg solvent.\n• Mole fraction (X).\n• Mass %, volume %.' },
  { title: '2. Dilution', content: 'C1 V1 = C2 V2 relates initial and final concentration–volume upon dilution.' },
  { title: '3. Solubility & Henry’s Law', content: 'Solubility depends on temperature, pressure (for gases), and nature. Henry’s law for gases: C ∝ P at constant T.' },
  { title: '4. Colligative Properties', content: 'Depend on number of solute particles: ΔP (vapor pressure lowering), ΔT_b = K_b m (boiling point elevation), ΔT_f = K_f m (freezing point depression), π = C R T (osmotic pressure). Van’t Hoff factor i accounts for association/dissociation.' },
  { title: '5. Raoult’s Law (Ideal Solutions)', content: 'P_A = X_A P_A^0, P_B = X_B P_B^0, total P = P_A + P_B. Positive/negative deviations for non-ideal mixtures.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Molality is defined as moles per', options: [
    { key: 'a', text: 'Litre of solution' }, { key: 'b', text: 'kg of solvent' }, { key: 'c', text: 'Litre of solvent' }, { key: 'd', text: 'g of solute' }
  ], answer: 'b', explanation: 'm = n / kg(solvent).' },
  { id: 'q2', question: 'For dilution, the relation used is', options: [
    { key: 'a', text: 'PV = nRT' }, { key: 'b', text: 'C1 V1 = C2 V2' }, { key: 'c', text: 'π = CRT' }, { key: 'd', text: 'ΔT_b = K_b m' }
  ], answer: 'b', explanation: 'Dilution formula.' },
  { id: 'q3', question: 'Vapor pressure lowering depends mainly on', options: [
    { key: 'a', text: 'Type of solute' }, { key: 'b', text: 'Number of solute particles' }, { key: 'c', text: 'Pressure' }, { key: 'd', text: 'Viscosity' }
  ], answer: 'b', explanation: 'Colligative effect depends on particle count.' },
  { id: 'q4', question: 'Osmotic pressure formula is', options: [
    { key: 'a', text: 'π = CRT' }, { key: 'b', text: 'π = K_f m' }, { key: 'c', text: 'π = K_b m' }, { key: 'd', text: 'π = P^0 - P' }
  ], answer: 'a', explanation: 'Ideal dilute solutions: π = CRT.' },
  { id: 'q5', question: 'Raoult’s law applies to', options: [
    { key: 'a', text: 'Ideal solutions' }, { key: 'b', text: 'Electrolyte solutions' }, { key: 'c', text: 'Solids' }, { key: 'd', text: 'Gases only' }
  ], answer: 'a', explanation: 'Ideal liquid mixtures.' },
  { id: 'q6', question: 'Van’t Hoff factor i accounts for', options: [
    { key: 'a', text: 'Electrolyte dissociation/association' }, { key: 'b', text: 'Viscosity only' }, { key: 'c', text: 'Surface tension' }, { key: 'd', text: 'Molar mass definition' }
  ], answer: 'a', explanation: 'i modifies colligative property expressions.' },
  { id: 'q7', question: 'C1 V1 equals', options: [
    { key: 'a', text: 'Moles of solute' }, { key: 'b', text: 'Mass of solute' }, { key: 'c', text: 'Molality' }, { key: 'd', text: 'Mole fraction' }
  ], answer: 'a', explanation: 'For molarity-based dilution: M×V = moles (if V in L).' },
  { id: 'q8', question: 'Freezing point depression is', options: [
    { key: 'a', text: 'ΔT_f = K_f m' }, { key: 'b', text: 'ΔT_f = K_b m' }, { key: 'c', text: 'ΔT_f = CRT' }, { key: 'd', text: 'ΔT_f = P^0 - P' }
  ], answer: 'a', explanation: 'Cryoscopic relation.' },
  { id: 'q9', question: 'Percent by mass of solute in 20 g solute + 80 g solvent', options: [
    { key: 'a', text: '20%' }, { key: 'b', text: '25%' }, { key: 'c', text: '33%' }, { key: 'd', text: '50%' }
  ], answer: 'a', explanation: '20 / (20+80) × 100 = 20%.' },
  { id: 'q10', question: 'Henry’s law relates gas solubility to', options: [
    { key: 'a', text: 'Temperature only' }, { key: 'b', text: 'Pressure of gas' }, { key: 'c', text: 'Viscosity' }, { key: 'd', text: 'Dielectric constant' }
  ], answer: 'b', explanation: 'At constant T, C ∝ P.' },
]

export default function ChemG12Solutions() {
  return (
    <LessonModuleTemplate
      title="Solutions"
      subject="Chemistry"
      grade={12}
      backLink="/lessons/Chemistry/12"
      lessonId="chem-g12-solutions"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
