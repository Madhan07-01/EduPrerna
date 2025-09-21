import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Organization in living organisms spans cell → tissue → organ → organ system → organism. Plants and animals show differences in structure based on their lifestyles and functions.' },
  { title: '1. Levels of Organization', content: 'Cell: basic unit.\nTissue: similar cells performing a function.\nOrgan: tissues combined for specific tasks.\nOrgan system: organs working together.\nOrganism: complete living being.' },
  { title: '2. Plants: Structural Organization', content: 'Cells with cell wall and chloroplasts.\nTissues: Meristematic (dividing) vs Permanent (specialized).\nSimple permanent: Parenchyma, Collenchyma (support in growing regions), Sclerenchyma (rigid).\nComplex: Xylem and Phloem for transport.\nOrgans/systems: Root and shoot systems; leaves (photosynthesis), stems (support/transport), roots (absorption).'},
  { title: '3. Animals: Structural Organization', content: 'Cells lack cell wall, flexible membranes.\nTissues: Epithelial (covering/lining), Connective (support: bone, cartilage, blood), Muscular (movement: skeletal, cardiac, smooth), Nervous (neurons, signalling).\nOrgans/systems: Heart, lungs, stomach; circulatory, respiratory, digestive systems.' },
  { title: '4. Plant vs Animal Organization', content: 'Cell wall/plastids: present in plants, absent in animals.\nLocomotion: plants sessile; animals mobile.\nTissue diversity: animals more diverse.\nGrowth: indeterminate via meristems in plants; determinate in many animals.' },
  { title: '5. Significance', content: 'Specialization increases efficiency; supports survival and adaptation; forms basis for anatomy, physiology, medicine, agriculture, and biotechnology.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Basic structural and functional unit of life is:', options: [
    { key: 'a', text: 'Tissue' }, { key: 'b', text: 'Cell' }, { key: 'c', text: 'Organ' }, { key: 'd', text: 'Organ system' }
  ], answer: 'b', explanation: 'Cells are the fundamental units of life.' },
  { id: 'q2', question: 'Xylem and phloem are:', options: [
    { key: 'a', text: 'Simple tissues' }, { key: 'b', text: 'Complex tissues' }, { key: 'c', text: 'Meristematic tissues' }, { key: 'd', text: 'Muscular tissues' }
  ], answer: 'b', explanation: 'They are complex permanent tissues for transport.' },
  { id: 'q3', question: 'Muscle tissue is responsible for:', options: [
    { key: 'a', text: 'Protection' }, { key: 'b', text: 'Support' }, { key: 'c', text: 'Movement' }, { key: 'd', text: 'Secretion' }
  ], answer: 'c', explanation: 'Muscles contract to produce movement.' },
  { id: 'q4', question: 'Meristematic tissue function is:', options: [
    { key: 'a', text: 'Photosynthesis' }, { key: 'b', text: 'Transport' }, { key: 'c', text: 'Growth' }, { key: 'd', text: 'Storage' }
  ], answer: 'c', explanation: 'Meristems are regions of active cell division (growth).' },
  { id: 'q5', question: 'Nervous tissue is made up of:', options: [
    { key: 'a', text: 'Neurons' }, { key: 'b', text: 'Parenchyma' }, { key: 'c', text: 'Collenchyma' }, { key: 'd', text: 'Sclerenchyma' }
  ], answer: 'a', explanation: 'Neurons transmit signals.' },
  { id: 'q6', question: 'Which organ is part of circulatory system?', options: [
    { key: 'a', text: 'Lung' }, { key: 'b', text: 'Heart' }, { key: 'c', text: 'Stomach' }, { key: 'd', text: 'Kidney' }
  ], answer: 'b', explanation: 'Heart pumps blood in the circulatory system.' },
  { id: 'q7', question: 'Collenchyma provides:', options: [
    { key: 'a', text: 'Photosynthesis' }, { key: 'b', text: 'Support in growing regions' }, { key: 'c', text: 'Transport' }, { key: 'd', text: 'Hormone production' }
  ], answer: 'b', explanation: 'Collenchyma supports young, growing parts.' },
  { id: 'q8', question: 'Shoot system includes:', options: [
    { key: 'a', text: 'Root and root hairs' }, { key: 'b', text: 'Stem, leaves, flowers' }, { key: 'c', text: 'Xylem and phloem only' }, { key: 'd', text: 'Seeds only' }
  ], answer: 'b', explanation: 'Shoot system is aerial parts of plant.' },
  { id: 'q9', question: 'Connective tissue includes:', options: [
    { key: 'a', text: 'Cartilage, bone, blood' }, { key: 'b', text: 'Meristematic tissue' }, { key: 'c', text: 'Neurons' }, { key: 'd', text: 'Collenchyma' }
  ], answer: 'a', explanation: 'All are connective tissues in animals.' },
  { id: 'q10', question: 'Plant cells differ from animal cells by:', options: [
    { key: 'a', text: 'Presence of nucleus' }, { key: 'b', text: 'Presence of cell wall and plastids' }, { key: 'c', text: 'Cytoplasm' }, { key: 'd', text: 'Cell membrane' }
  ], answer: 'b', explanation: 'Plants have cell walls and plastids; animals do not.' },
]

export default function BioG11StructuralOrganization() {
  return (
    <LessonModuleTemplate
      title="Structural Organization in Animals and Plants"
      subject="Biology"
      grade={11}
      backLink="/lessons/Biology/11"
      lessonId="bio-g11-structural-organization"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
