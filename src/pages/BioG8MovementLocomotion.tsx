import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Movement allows organisms to find food, escape predators, reproduce, and interact with the environment. Animals use locomotion, while plant movements are usually limited to parts like leaves or roots.' },
  { title: '1. What is Movement?', content: 'Change in position of an organism or body parts. Internal (inside body) or external (whole-body). Examples: humans walking/running; heart beating; peristalsis; plant bending toward sunlight.' },
  { title: '2. Types of Movement — Animals', content: 'Amoeboid: pseudopodia for crawling/engulfing (Amoeba). Ciliary & Flagellar: cilia (Paramecium), flagella (Euglena, sperm). Muscular movement: muscles attached to bones; locomotion in vertebrates includes walking, running, flying, swimming.' },
  { title: '3. Types of Movement — Plants', content: 'Tropic movements (directional): phototropism (light), geotropism (gravity), thigmotropism (touch). Nastic movements (non-directional): Mimosa leaves folding, flower opening/closing.' },
  { title: '4. Skeleton & Muscles in Animals', content: 'Skeleton provides support, shape, protection, and a framework for muscles. Muscles contract/relax and work in antagonistic pairs (e.g., biceps/triceps) to produce movement.' },
  { title: '5. Importance', content: 'Movement and locomotion help find food/water, escape predators, reproduce; in plants, movements support growth toward resources and reproduction.' },
  { title: 'Summary', content: 'Animals exhibit diverse movement types; muscles and skeleton coordinate motion. Plants show tropic and nastic movements in response to stimuli.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Movement is:', options: [
    { key: 'a', text: 'Change in shape' }, { key: 'b', text: 'Change in position' }, { key: 'c', text: 'Only locomotion' }, { key: 'd', text: 'Growth' }
  ], answer: 'b', explanation: 'Movement involves positional change.' },
  { id: 'q2', question: 'Locomotion is:', options: [
    { key: 'a', text: 'Within cells' }, { key: 'b', text: 'From one place to another' }, { key: 'c', text: 'Plant growth' }, { key: 'd', text: 'Muscular contraction' }
  ], answer: 'b', explanation: 'Locomotion moves the entire organism.' },
  { id: 'q3', question: 'Amoeba moves with:', options: [
    { key: 'a', text: 'Cilia' }, { key: 'b', text: 'Flagella' }, { key: 'c', text: 'Pseudopodia' }, { key: 'd', text: 'Muscles' }
  ], answer: 'c', explanation: 'Pseudopodia extend and pull the cell.' },
  { id: 'q4', question: 'Tropic movement example:', options: [
    { key: 'a', text: 'Mimosa folding' }, { key: 'b', text: 'Stem bending toward light' }, { key: 'c', text: 'Flower opening' }, { key: 'd', text: 'Worm crawling' }
  ], answer: 'b', explanation: 'Phototropism is directional toward light.' },
  { id: 'q5', question: 'Nastic movement:', options: [
    { key: 'a', text: 'Phototropism' }, { key: 'b', text: 'Thigmotropism' }, { key: 'c', text: 'Mimosa leaf folding' }, { key: 'd', text: 'Root downward growth' }
  ], answer: 'c', explanation: 'Mimosa folding is non-directional response.' },
  { id: 'q6', question: 'Skeleton provides:', options: [
    { key: 'a', text: 'Movement only' }, { key: 'b', text: 'Support, protection, shape' }, { key: 'c', text: 'Food' }, { key: 'd', text: 'Energy' }
  ], answer: 'b', explanation: 'Bones support, protect, and shape the body.' },
  { id: 'q7', question: 'Muscles work in:', options: [
    { key: 'a', text: 'Single action' }, { key: 'b', text: 'Antagonistic pairs' }, { key: 'c', text: 'Trios' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'One muscle contracts while the other relaxes.' },
  { id: 'q8', question: 'Swimming in fish uses:', options: [
    { key: 'a', text: 'Legs' }, { key: 'b', text: 'Fins' }, { key: 'c', text: 'Wings' }, { key: 'd', text: 'Pseudopodia' }
  ], answer: 'b', explanation: 'Fins and body flexion enable swimming.' },
  { id: 'q9', question: 'Roots downward (gravity) is:', options: [
    { key: 'a', text: 'Phototropism' }, { key: 'b', text: 'Geotropism' }, { key: 'c', text: 'Thigmotropism' }, { key: 'd', text: 'Nastic' }
  ], answer: 'b', explanation: 'Positive geotropism.' },
  { id: 'q10', question: 'Stem bending toward light is:', options: [
    { key: 'a', text: 'Nastic' }, { key: 'b', text: 'Tropic' }, { key: 'c', text: 'Amoeboid' }, { key: 'd', text: 'Flagellar' }
  ], answer: 'b', explanation: 'Phototropism is a tropic movement.' },
]

export default function BioG8MovementLocomotion() {
  return (
    <LessonModuleTemplate
      title="Movement and Locomotion"
      subject="Biology"
      grade={8}
      backLink="/lessons/Biology/8"
      lessonId="bio-g8-movement-locomotion"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
