import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Tissues are groups of similar cells performing a specific function. They form organs and help organisms grow, support, transport, and respond to the environment.' },
  { title: '1. What is a Tissue?', content: 'A group of similar cells performing a specific function.' },
  { title: '2. Plant Tissues — Meristematic', content: 'Responsible for growth; small, actively dividing cells with thin walls and no vacuole. Types: Apical (tips), Lateral/Cambium (sides), Intercalary (base of leaves/stems).' },
  { title: '3. Plant Tissues — Permanent', content: `Parenchyma: thin-walled; photosynthesis, storage, secretion.\nCollenchyma: thickened corners; flexible support.\nSclerenchyma: thick, lignified; rigid support.\nXylem: hollow tubes; transport water & minerals.\nPhloem: sieve tubes/companion cells; transport food.\nEpidermis: single layer; protection & reduces water loss.` },
  { title: '4. Animal Tissues', content: `Epithelial: tightly packed; covers & protects (e.g., skin lining).\nConnective: cells + matrix; support & bind (bone, cartilage, blood).\nMuscular: long fibers; movement (skeletal, cardiac, smooth).\nNervous: neurons; signal transmission (brain, spinal cord).` },
  { title: '5. Importance of Tissues', content: 'Provide structure, support, movement, transport, repair, and response in plants and animals.' },
  { title: 'Summary', content: 'Plant tissues: meristematic & permanent (parenchyma, collenchyma, sclerenchyma, xylem, phloem, epidermis). Animal tissues: epithelial, connective, muscular, nervous.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Tissue is:', options: [
    { key: 'a', text: 'Single cell' }, { key: 'b', text: 'Group of cells' }, { key: 'c', text: 'Organ' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Tissues are groups of similar cells.' },
  { id: 'q2', question: 'Meristematic tissue function:', options: [
    { key: 'a', text: 'Photosynthesis' }, { key: 'b', text: 'Growth' }, { key: 'c', text: 'Transport' }, { key: 'd', text: 'Protection' }
  ], answer: 'b', explanation: 'Meristems drive growth by cell division.' },
  { id: 'q3', question: 'Rigid plant support tissue:', options: [
    { key: 'a', text: 'Parenchyma' }, { key: 'b', text: 'Collenchyma' }, { key: 'c', text: 'Sclerenchyma' }, { key: 'd', text: 'Epidermis' }
  ], answer: 'c', explanation: 'Sclerenchyma has thick, lignified walls.' },
  { id: 'q4', question: 'Xylem transports:', options: [
    { key: 'a', text: 'Food' }, { key: 'b', text: 'Water' }, { key: 'c', text: 'Hormones' }, { key: 'd', text: 'Oxygen' }
  ], answer: 'b', explanation: 'Xylem carries water and minerals.' },
  { id: 'q5', question: 'Phloem transports:', options: [
    { key: 'a', text: 'Water' }, { key: 'b', text: 'Minerals' }, { key: 'c', text: 'Food' }, { key: 'd', text: 'Proteins' }
  ], answer: 'c', explanation: 'Phloem distributes photosynthates (sugars).' },
  { id: 'q6', question: 'Tissue covering body surfaces:', options: [
    { key: 'a', text: 'Connective' }, { key: 'b', text: 'Epithelial' }, { key: 'c', text: 'Muscular' }, { key: 'd', text: 'Nervous' }
  ], answer: 'b', explanation: 'Epithelia cover and protect surfaces.' },
  { id: 'q7', question: 'Muscle tissue function:', options: [
    { key: 'a', text: 'Protection' }, { key: 'b', text: 'Movement' }, { key: 'c', text: 'Transport' }, { key: 'd', text: 'Secretion' }
  ], answer: 'b', explanation: 'Muscles contract to produce movement.' },
  { id: 'q8', question: 'Neurons are found in:', options: [
    { key: 'a', text: 'Muscular' }, { key: 'b', text: 'Connective' }, { key: 'c', text: 'Nervous' }, { key: 'd', text: 'Epithelial' }
  ], answer: 'c', explanation: 'Neurons form nervous tissue.' },
  { id: 'q9', question: 'Collenchyma function:', options: [
    { key: 'a', text: 'Rigid support' }, { key: 'b', text: 'Flexible support' }, { key: 'c', text: 'Transport' }, { key: 'd', text: 'Protection' }
  ], answer: 'b', explanation: 'Flexible support comes from collenchyma.' },
  { id: 'q10', question: 'Blood is a type of:', options: [
    { key: 'a', text: 'Connective' }, { key: 'b', text: 'Muscular' }, { key: 'c', text: 'Nervous' }, { key: 'd', text: 'Epithelial' }
  ], answer: 'a', explanation: 'Blood is a fluid connective tissue.' },
]

export default function BioG8Tissues() {
  return (
    <LessonModuleTemplate
      title="Tissues in Plants and Animals"
      subject="Biology"
      grade={8}
      backLink="/lessons/Biology/8"
      lessonId="bio-g8-tissues"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
