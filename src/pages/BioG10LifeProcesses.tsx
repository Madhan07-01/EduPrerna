import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Life processes are essential functions that all living organisms carry out to survive, grow, and reproduce. These include nutrition, respiration, transportation, and excretion.' },
  { title: '1. Nutrition', content: 'Nutrition is the process by which organisms obtain and utilize food for energy, growth, and repair.\n\nTypes of Nutrition:\n• Autotrophic: Organisms make their own food using sunlight, water, and CO₂ (Photosynthesis).\n  Equation: 6CO₂ + 6H₂O —light→ C₆H₁₂O₆ + 6O₂\n• Heterotrophic: Organisms depend on other organisms for food (herbivores, carnivores, omnivores, saprophytes).'},
  { title: '2. Respiration', content: 'Respiration is the process of releasing energy from food.\n\nTypes:\n• Aerobic respiration (with oxygen): Glucose + O₂ → CO₂ + H₂O + Energy\n• Anaerobic respiration (without oxygen):\n  – Animals: Glucose → Lactic acid + Energy\n  – Yeast/plants: Glucose → Ethanol + CO₂ + Energy' },
  { title: '3. Transportation', content: 'Transportation is the movement of substances within organisms.\n\nIn Humans:\n• Blood transports oxygen, nutrients, hormones, and wastes.\n• Heart pumps blood through arteries, veins, and capillaries.\n\nIn Plants:\n• Xylem transports water and minerals from roots to leaves.\n• Phloem transports prepared food (sugars) from leaves to other parts.' },
  { title: '4. Excretion', content: 'Excretion is the removal of metabolic wastes to maintain homeostasis.\n\nIn Humans:\n• Kidneys remove urea, excess salts, water → urine.\n• Lungs remove CO₂.\n• Skin excretes sweat (water, salts).\n\nIn Plants:\n• Wastes are excreted via stomata, leaves, bark, or stored as resins, gums, latex.' },
  { title: '5. Why Life Processes Matter', content: '• Nutrition provides energy and building materials.\n• Respiration releases energy for cellular work.\n• Transportation distributes materials across the organism.\n• Excretion removes toxic wastes and maintains balance.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Photosynthesis is an example of:', options: [
    { key: 'a', text: 'Heterotrophic nutrition' }, { key: 'b', text: 'Autotrophic nutrition' }, { key: 'c', text: 'Anaerobic respiration' }, { key: 'd', text: 'Excretion' }
  ], answer: 'b', explanation: 'Plants make their own food using sunlight, water, and CO₂.' },
  { id: 'q2', question: 'Glucose breaks down to release energy in:', options: [
    { key: 'a', text: 'Photosynthesis' }, { key: 'b', text: 'Respiration' }, { key: 'c', text: 'Transportation' }, { key: 'd', text: 'Excretion' }
  ], answer: 'b', explanation: 'Respiration (aerobic or anaerobic) releases energy from glucose.' },
  { id: 'q3', question: 'Aerobic respiration produces:', options: [
    { key: 'a', text: 'Energy, Carbon dioxide, Water' }, { key: 'b', text: 'Lactic acid only' }, { key: 'c', text: 'Ethanol and CO₂' }, { key: 'd', text: 'Oxygen' }
  ], answer: 'a', explanation: 'Aerobic respiration fully oxidizes glucose to CO₂ and H₂O, releasing energy.' },
  { id: 'q4', question: 'Which of the following carries oxygen in human blood?', options: [
    { key: 'a', text: 'Platelets' }, { key: 'b', text: 'Red blood cells' }, { key: 'c', text: 'White blood cells' }, { key: 'd', text: 'Plasma' }
  ], answer: 'b', explanation: 'Hemoglobin in RBCs binds oxygen for transport.' },
  { id: 'q5', question: 'Water is transported from roots to leaves in:', options: [
    { key: 'a', text: 'Phloem' }, { key: 'b', text: 'Xylem' }, { key: 'c', text: 'Stomata' }, { key: 'd', text: 'Leaf veins' }
  ], answer: 'b', explanation: 'Xylem carries water and minerals upward.' },
  { id: 'q6', question: 'The main excretory organ in humans is:', options: [
    { key: 'a', text: 'Liver' }, { key: 'b', text: 'Lungs' }, { key: 'c', text: 'Kidney' }, { key: 'd', text: 'Skin' }
  ], answer: 'c', explanation: 'Kidneys filter blood and form urine.' },
  { id: 'q7', question: 'Plants excrete waste mainly through:', options: [
    { key: 'a', text: 'Roots only' }, { key: 'b', text: 'Leaves, stomata, bark' }, { key: 'c', text: 'Flowers' }, { key: 'd', text: 'Stem nodes' }
  ], answer: 'b', explanation: 'Leaves/stomata release gases; bark can shed wastes.' },
  { id: 'q8', question: 'Anaerobic respiration in muscles produces:', options: [
    { key: 'a', text: 'Ethanol' }, { key: 'b', text: 'Lactic acid' }, { key: 'c', text: 'Carbon dioxide only' }, { key: 'd', text: 'Oxygen' }
  ], answer: 'b', explanation: 'In oxygen debt, muscles form lactic acid.' },
  { id: 'q9', question: 'Phloem transports:', options: [
    { key: 'a', text: 'Water' }, { key: 'b', text: 'Minerals' }, { key: 'c', text: 'Food (sugars)' }, { key: 'd', text: 'Oxygen' }
  ], answer: 'c', explanation: 'Phloem distributes sugars from leaves.' },
  { id: 'q10', question: 'Which life process helps maintain homeostasis by removing toxic wastes?', options: [
    { key: 'a', text: 'Nutrition' }, { key: 'b', text: 'Respiration' }, { key: 'c', text: 'Excretion' }, { key: 'd', text: 'Transportation' }
  ], answer: 'c', explanation: 'Excretion removes metabolic wastes.' }
]

export default function BioG10LifeProcesses() {
  return (
    <LessonModuleTemplate
      title="Life Processes (Nutrition, Respiration, Transportation, Excretion)"
      subject="Biology"
      grade={10}
      backLink="/lessons/Biology/10"
      lessonId="bio-g10-life-processes"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
