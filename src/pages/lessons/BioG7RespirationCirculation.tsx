import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Living organisms need energy for life processes. Respiration releases energy from food, while circulation transports oxygen, nutrients, and waste. Together, they maintain proper body function.' },
  { title: '1. Respiration', content: 'Releases energy from food. Types: Aerobic → Glucose + O₂ → CO₂ + H₂O + Energy (humans, animals, plants; high energy). Anaerobic → No oxygen; less energy. Humans: Glucose → Lactic acid + Energy. Yeast: Glucose → Alcohol + CO₂ + Energy. Respiratory organs: Humans → Lungs; Fish → Gills; Insects → Tracheae.' },
  { title: '2. Circulation', content: 'Movement of blood to supply oxygen & nutrients and remove wastes. Heart pumps blood. Arteries carry blood away (usually oxygenated). Veins carry blood to heart (usually deoxygenated). Capillaries exchange substances with tissues. Blood components: RBCs carry O₂; WBCs defend; Platelets clot; Plasma transports nutrients/hormones/wastes.' },
  { title: '3. Double Circulation', content: 'Pulmonary: Heart → Lungs → Heart. Systemic: Heart → Body → Heart. Ensures efficient oxygenation and distribution.' },
  { title: '4. Importance', content: 'Respiration provides energy; circulation distributes essentials and removes wastes; both help maintain homeostasis.' },
  { title: 'Summary', content: 'Respiration (aerobic/anaerobic) supplies energy while circulation distributes materials and removes wastes via heart, vessels, and blood components.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Respiration releases:', options: [
    { key: 'a', text: 'Oxygen' }, { key: 'b', text: 'Energy' }, { key: 'c', text: 'Water' }, { key: 'd', text: 'Glucose' }
  ], answer: 'b', explanation: 'Energy is released from food molecules.' },
  { id: 'q2', question: 'Aerobic respiration requires:', options: [
    { key: 'a', text: 'CO₂' }, { key: 'b', text: 'Oxygen' }, { key: 'c', text: 'Lactic acid' }, { key: 'd', text: 'Alcohol' }
  ], answer: 'b', explanation: 'O₂ is essential for aerobic respiration.' },
  { id: 'q3', question: 'Anaerobic respiration in humans produces:', options: [
    { key: 'a', text: 'Alcohol + CO₂' }, { key: 'b', text: 'Water + Energy' }, { key: 'c', text: 'Lactic acid + Energy' }, { key: 'd', text: 'Glucose' }
  ], answer: 'c', explanation: 'Muscle fatigue is linked to lactic acid.' },
  { id: 'q4', question: 'Organ for respiration in humans:', options: [
    { key: 'a', text: 'Heart' }, { key: 'b', text: 'Lungs' }, { key: 'c', text: 'Stomach' }, { key: 'd', text: 'Liver' }
  ], answer: 'b', explanation: 'Gas exchange occurs in lungs.' },
  { id: 'q5', question: 'Arteries carry blood:', options: [
    { key: 'a', text: 'To the heart' }, { key: 'b', text: 'Away from the heart' }, { key: 'c', text: 'Only deoxygenated blood' }, { key: 'd', text: 'Only from lungs' }
  ], answer: 'b', explanation: 'By definition, arteries lead away from the heart.' },
  { id: 'q6', question: 'Veins carry blood:', options: [
    { key: 'a', text: 'Away from the heart' }, { key: 'b', text: 'To the heart' }, { key: 'c', text: 'Only oxygenated blood' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Veins return blood to the heart.' },
  { id: 'q7', question: 'Capillaries are:', options: [
    { key: 'a', text: 'Large vessels' }, { key: 'b', text: 'Tiny vessels for exchange' }, { key: 'c', text: 'Only in lungs' }, { key: 'd', text: 'Only in heart' }
  ], answer: 'b', explanation: 'They enable exchange with tissues.' },
  { id: 'q8', question: 'RBCs are responsible for:', options: [
    { key: 'a', text: 'Fighting infection' }, { key: 'b', text: 'Carrying oxygen' }, { key: 'c', text: 'Blood clotting' }, { key: 'd', text: 'Transporting hormones' }
  ], answer: 'b', explanation: 'Hemoglobin binds oxygen in RBCs.' },
  { id: 'q9', question: 'Double circulation means:', options: [
    { key: 'a', text: 'Blood flows once through heart' }, { key: 'b', text: 'Blood flows twice through heart' }, { key: 'c', text: 'Blood flows only in lungs' }, { key: 'd', text: 'Blood does not circulate' }
  ], answer: 'b', explanation: 'Pulmonary and systemic cycles pass through heart separately.' },
  { id: 'q10', question: 'Pulmonary circulation carries blood between:', options: [
    { key: 'a', text: 'Heart and body' }, { key: 'b', text: 'Heart and lungs' }, { key: 'c', text: 'Lungs and body' }, { key: 'd', text: 'Heart and kidneys' }
  ], answer: 'b', explanation: 'Pulmonary is heart ↔ lungs.' },
]

export default function BioG7RespirationCirculation() {
  return (
    <LessonModuleTemplate
      title="Respiration and Circulation"
      subject="Biology"
      grade={7}
      backLink="/lessons/Biology/7"
      lessonId="bio-g7-respiration-circulation"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
