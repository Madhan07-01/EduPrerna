import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Control and coordination enable organisms to respond to stimuli, maintain internal balance, and ensure survival and reproduction. In animals, the nervous and endocrine systems are key; in plants, growth regulators (hormones) drive responses.' },
  { title: '1. Nervous System (Animals)', content: 'The nervous system orchestrates rapid responses.\n\nKey terms:\n• Neuron: basic unit (dendrites → cell body → axon).\n• Nerve impulse: electrical signal transmitted along a neuron.\n• Synapse: junction between neurons.\n\nResponses:\n• Reflex action: rapid, involuntary (e.g., withdrawing hand from heat).\n• Voluntary action: controlled by brain (e.g., writing).'},
  { title: '2. Endocrine System (Animals)', content: 'Endocrine glands secrete hormones into blood for slower, longer-lasting effects.\n\nMajor hormones:\n• Pituitary: Growth hormone — stimulates growth.\n• Thyroid: Thyroxine — regulates metabolism.\n• Pancreas: Insulin — controls blood glucose.\n• Adrenal: Adrenaline — “fight or flight” response.\n• Gonads: Estrogen/Testosterone — reproductive functions.' },
  { title: '3. Plant Control & Coordination', content: 'Plants lack nerves but respond using hormones.\n\nKey hormones:\n• Auxin — cell elongation, phototropism (growth towards light).\n• Gibberellins — stem elongation, seed germination.\n• Cytokinins — cell division, delays aging.\n• Abscisic Acid (ABA) — inhibits growth, closes stomata during stress.\n• Ethylene — fruit ripening, leaf abscission.\n\nResponses:\n• Tropisms (directional growth): phototropism, geotropism, hydrotropism.\n• Nastic movements: non-directional (e.g., flower opening/closing).'} ,
  { title: '4. Importance', content: '• Enables organisms to respond to stimuli and adapt.\n• Maintains homeostasis.\n• Supports growth, reproduction, and survival.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'The functional unit of the nervous system is:', options: [
    { key: 'a', text: 'Brain' }, { key: 'b', text: 'Nerve' }, { key: 'c', text: 'Neuron' }, { key: 'd', text: 'Spinal cord' }
  ], answer: 'c', explanation: 'A neuron is the basic structural and functional unit.' },
  { id: 'q2', question: 'Reflex actions are:', options: [
    { key: 'a', text: 'Slow and voluntary' }, { key: 'b', text: 'Rapid and involuntary' }, { key: 'c', text: 'Hormone-controlled only' }, { key: 'd', text: 'Plant responses' }
  ], answer: 'b', explanation: 'Reflexes are quick and automatic for protection.' },
  { id: 'q3', question: 'Which hormone regulates blood glucose?', options: [
    { key: 'a', text: 'Adrenaline' }, { key: 'b', text: 'Thyroxine' }, { key: 'c', text: 'Insulin' }, { key: 'd', text: 'Growth hormone' }
  ], answer: 'c', explanation: 'Insulin lowers blood glucose by facilitating uptake.' },
  { id: 'q4', question: 'Phototropism is a response to:', options: [
    { key: 'a', text: 'Gravity' }, { key: 'b', text: 'Light' }, { key: 'c', text: 'Water' }, { key: 'd', text: 'Touch' }
  ], answer: 'b', explanation: 'Shoots typically grow towards light (positive phototropism).' },
  { id: 'q5', question: 'Which plant hormone promotes fruit ripening?', options: [
    { key: 'a', text: 'Auxin' }, { key: 'b', text: 'Gibberellin' }, { key: 'c', text: 'Ethylene' }, { key: 'd', text: 'Abscisic Acid' }
  ], answer: 'c', explanation: 'Ethylene accelerates ripening and abscission.' },
  { id: 'q6', question: 'The adrenal gland primarily secretes:', options: [
    { key: 'a', text: 'Insulin' }, { key: 'b', text: 'Adrenaline' }, { key: 'c', text: 'Thyroxine' }, { key: 'd', text: 'Estrogen' }
  ], answer: 'b', explanation: 'Adrenaline mediates the “fight or flight” response.' },
  { id: 'q7', question: 'Nastic movements in plants are:', options: [
    { key: 'a', text: 'Directional growth responses' }, { key: 'b', text: 'Non-directional responses' }, { key: 'c', text: 'Voluntary movements' }, { key: 'd', text: 'Reflex actions' }
  ], answer: 'b', explanation: 'They depend on stimulus intensity, not direction.' },
  { id: 'q8', question: 'The hormone responsible for cell division in plants is:', options: [
    { key: 'a', text: 'Cytokinins' }, { key: 'b', text: 'Auxin' }, { key: 'c', text: 'Gibberellins' }, { key: 'd', text: 'Ethylene' }
  ], answer: 'a', explanation: 'Cytokinins promote cytokinesis (cell division).' },
  { id: 'q9', question: 'Which part of a neuron receives impulses?', options: [
    { key: 'a', text: 'Axon' }, { key: 'b', text: 'Dendrite' }, { key: 'c', text: 'Synapse' }, { key: 'd', text: 'Myelin sheath' }
  ], answer: 'b', explanation: 'Dendrites receive signals from other neurons.' },
  { id: 'q10', question: 'Control and coordination are essential to:', options: [
    { key: 'a', text: 'Respond to stimuli' }, { key: 'b', text: 'Maintain homeostasis' }, { key: 'c', text: 'Ensure growth and reproduction' }, { key: 'd', text: 'All of the above' }
  ], answer: 'd', explanation: 'All listed functions rely on control/coordination.' }
]

export default function BioG10ControlCoordination() {
  return (
    <LessonModuleTemplate
      title="Control & Coordination in Animals and Plants"
      subject="Biology"
      grade={10}
      backLink="/lessons/Biology/10"
      lessonId="bio-g10-control-coordination"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
