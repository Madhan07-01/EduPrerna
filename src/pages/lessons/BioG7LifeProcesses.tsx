import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'All living organisms perform life processes necessary to survive, grow, and reproduce. These include nutrition, respiration, transportation, excretion, and reproduction. Understanding these processes helps us appreciate the complexity of life.' },
  { title: '1. Nutrition', content: 'Process by which organisms obtain food and energy. Autotrophic: make own food (photosynthesis) — CO₂ + H₂O + Sunlight → Glucose + O₂. Heterotrophic: obtain food from other organisms (humans, animals).' },
  { title: '2. Respiration', content: 'Releases energy from food. Aerobic (with O₂): Glucose + O₂ → CO₂ + H₂O + Energy. Anaerobic (no O₂): Glucose → Lactic acid + Energy (humans) / Alcohol + CO₂ + Energy (yeast).' },
  { title: '3. Transportation', content: 'Movement of substances (water, nutrients, gases). Humans: Blood via heart, arteries, veins, capillaries. Plants: Xylem transports water/minerals; Phloem transports food.' },
  { title: '4. Excretion', content: 'Removal of waste products. Humans: Kidneys filter blood to form urine. Plants: release waste gases (O₂, CO₂).' },
  { title: '5. Reproduction', content: 'Producing offspring. Asexual: one parent (Hydra budding, bacteria fission). Sexual: two parents; offspring show variation (humans, many plants).' },
  { title: '6. Homeostasis', content: 'Maintaining stable internal environment (e.g., body temperature, blood sugar, water balance).' },
  { title: 'Summary', content: 'Life processes include nutrition, respiration, transport, excretion, reproduction, and homeostasis; together they sustain life.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Nutrition is necessary for:', options: [
    { key: 'a', text: 'Growth' }, { key: 'b', text: 'Energy' }, { key: 'c', text: 'Repair of tissues' }, { key: 'd', text: 'All of the above' }
  ], answer: 'd', explanation: 'Nutrition supports growth, energy supply, and tissue repair.' },
  { id: 'q2', question: 'Plants perform which type of nutrition?', options: [
    { key: 'a', text: 'Heterotrophic' }, { key: 'b', text: 'Autotrophic' }, { key: 'c', text: 'Both' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Most plants synthesize food via photosynthesis.' },
  { id: 'q3', question: 'Aerobic respiration produces:', options: [
    { key: 'a', text: 'Lactic acid + Energy' }, { key: 'b', text: 'Alcohol + CO₂ + Energy' }, { key: 'c', text: 'CO₂ + H₂O + Energy' }, { key: 'd', text: 'Only Energy' }
  ], answer: 'c', explanation: 'Aerobic: glucose fully oxidized to CO₂ and H₂O.' },
  { id: 'q4', question: 'Xylem in plants transports:', options: [
    { key: 'a', text: 'Food' }, { key: 'b', text: 'Water and minerals' }, { key: 'c', text: 'Oxygen' }, { key: 'd', text: 'Hormones' }
  ], answer: 'b', explanation: 'Xylem carries water/minerals from roots upward.' },
  { id: 'q5', question: 'Phloem transports:', options: [
    { key: 'a', text: 'Water' }, { key: 'b', text: 'Minerals' }, { key: 'c', text: 'Food' }, { key: 'd', text: 'CO₂' }
  ], answer: 'c', explanation: 'Phloem distributes sugars from leaves to plant parts.' },
  { id: 'q6', question: 'Excretion removes:', options: [
    { key: 'a', text: 'Nutrients' }, { key: 'b', text: 'Waste products' }, { key: 'c', text: 'Oxygen' }, { key: 'd', text: 'Water only' }
  ], answer: 'b', explanation: 'Excretion removes metabolic wastes.' },
  { id: 'q7', question: 'Asexual reproduction involves:', options: [
    { key: 'a', text: 'Two parents' }, { key: 'b', text: 'One parent' }, { key: 'c', text: 'Fertilization' }, { key: 'd', text: 'Pollination' }
  ], answer: 'b', explanation: 'One parent produces genetically identical offspring.' },
  { id: 'q8', question: 'Sexual reproduction produces offspring that are:', options: [
    { key: 'a', text: 'Identical' }, { key: 'b', text: 'Different / Variation' }, { key: 'c', text: 'Dead' }, { key: 'd', text: 'Single-celled' }
  ], answer: 'b', explanation: 'Combines genes from two parents → variation.' },
  { id: 'q9', question: 'Homeostasis maintains:', options: [
    { key: 'a', text: 'Internal stability' }, { key: 'b', text: 'External changes' }, { key: 'c', text: 'Reproduction' }, { key: 'd', text: 'Nutrition' }
  ], answer: 'a', explanation: 'Homeostasis keeps internal conditions stable.' },
  { id: 'q10', question: 'Kidneys are responsible for:', options: [
    { key: 'a', text: 'Respiration' }, { key: 'b', text: 'Circulation' }, { key: 'c', text: 'Filtration of blood and excretion' }, { key: 'd', text: 'Photosynthesis' }
  ], answer: 'c', explanation: 'Kidneys filter blood and form urine.' },
]

export default function BioG7LifeProcesses() {
  return (
    <LessonModuleTemplate
      title="Life Processes"
      subject="Biology"
      grade={7}
      backLink="/lessons/Biology/7"
      lessonId="bio-g7-life-processes"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
