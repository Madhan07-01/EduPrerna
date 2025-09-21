import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'All living organisms are made of cells, the basic unit of life. Cells perform essential functions such as obtaining nutrients, producing energy, and reproducing. Understanding cell structure helps us learn how organisms survive, grow, and function.' },
  { title: '1. What is a Cell?', content: 'Smallest structural and functional unit of life. Organisms can be Unicellular (Amoeba, Bacteria) or Multicellular (Humans, Plants).' },
  { title: '2. Types of Cells', content: 'Prokaryotic: No nucleus, DNA in cytoplasm, no membrane-bound organelles (Bacteria, Blue-green algae). Eukaryotic: Nucleus contains DNA; has organelles (Plant and Animal cells).' },
  { title: '3. Cell Structures and Functions', content: `Cell Membrane: thin, flexible; controls movement in/out.\nCell Wall: rigid outer layer in plants/fungi; provides shape & support.\nCytoplasm: jelly-like; site of chemical reactions.\nNucleus: contains DNA; control center.\nMitochondria: bean-shaped; produces energy (ATP).\nChloroplast: green (plants); photosynthesis.\nEndoplasmic Reticulum: network of membranes; transports proteins/lipids.\nRibosomes: small dots; protein synthesis.\nGolgi Apparatus: stacks; modifies & packages proteins.\nLysosomes: sacs; digest waste.\nVacuole: large sac (plant); stores water, nutrients, waste.` },
  { title: '4. Plant vs Animal Cells', content: `Cell Wall: present (plant) vs absent (animal).\nShape: fixed/rectangular (plant) vs irregular/round (animal).\nVacuole: large central (plant) vs small/absent (animal).\nChloroplast: present (plant) vs absent (animal).` },
  { title: '5. Importance of Cells', content: 'Cells are the basic unit of life; enable growth, reproduction, metabolism, and tissue/organ formation.' },
  { title: 'Summary', content: 'Cells vary in type and structure but share core components. Organelles carry out specialized functions supporting life.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Basic unit of life:', options: [
    { key: 'a', text: 'Atom' }, { key: 'b', text: 'Tissue' }, { key: 'c', text: 'Cell' }, { key: 'd', text: 'Organ' }
  ], answer: 'c', explanation: 'The cell is the basic structural and functional unit of life.' },
  { id: 'q2', question: 'DNA is in:', options: [
    { key: 'a', text: 'Cytoplasm' }, { key: 'b', text: 'Nucleus' }, { key: 'c', text: 'Cell wall' }, { key: 'd', text: 'Ribosome' }
  ], answer: 'b', explanation: 'Eukaryotic cells store DNA in the nucleus.' },
  { id: 'q3', question: 'Organelle producing energy:', options: [
    { key: 'a', text: 'Chloroplast' }, { key: 'b', text: 'Mitochondria' }, { key: 'c', text: 'Ribosome' }, { key: 'd', text: 'Golgi apparatus' }
  ], answer: 'b', explanation: 'Mitochondria are the powerhouse of the cell.' },
  { id: 'q4', question: 'Large central vacuole is typical of:', options: [
    { key: 'a', text: 'Nucleus' }, { key: 'b', text: 'Mitochondria' }, { key: 'c', text: 'Vacuole' }, { key: 'd', text: 'Lysosome' }
  ], answer: 'c', explanation: 'Plant cells have a large central vacuole.' },
  { id: 'q5', question: 'Protein synthesis occurs in:', options: [
    { key: 'a', text: 'Ribosome' }, { key: 'b', text: 'Golgi' }, { key: 'c', text: 'ER' }, { key: 'd', text: 'Lysosome' }
  ], answer: 'a', explanation: 'Ribosomes assemble amino acids into proteins.' },
  { id: 'q6', question: 'Chloroplast present in:', options: [
    { key: 'a', text: 'Animal' }, { key: 'b', text: 'Plant' }, { key: 'c', text: 'Both' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Plants have chloroplasts for photosynthesis.' },
  { id: 'q7', question: 'Cell wall provides:', options: [
    { key: 'a', text: 'Energy' }, { key: 'b', text: 'Shape & support' }, { key: 'c', text: 'Protein synthesis' }, { key: 'd', text: 'Digestion' }
  ], answer: 'b', explanation: 'Cell wall provides mechanical support in plants.' },
  { id: 'q8', question: 'Prokaryotic cells lack:', options: [
    { key: 'a', text: 'Cytoplasm' }, { key: 'b', text: 'Nucleus' }, { key: 'c', text: 'Cell membrane' }, { key: 'd', text: 'Ribosome' }
  ], answer: 'b', explanation: 'Their DNA is not enclosed in a true nucleus.' },
  { id: 'q9', question: 'Control center of the cell:', options: [
    { key: 'a', text: 'Mitochondria' }, { key: 'b', text: 'Nucleus' }, { key: 'c', text: 'Ribosome' }, { key: 'd', text: 'Vacuole' }
  ], answer: 'b', explanation: 'The nucleus regulates cell activities.' },
  { id: 'q10', question: 'Lysosomes function:', options: [
    { key: 'a', text: 'Energy' }, { key: 'b', text: 'Photosynthesis' }, { key: 'c', text: 'Digestion' }, { key: 'd', text: 'Protein synthesis' }
  ], answer: 'c', explanation: 'Lysosomes digest waste and cellular debris.' },
]

export default function BioG8CellStructureFunction() {
  return (
    <LessonModuleTemplate
      title="Cell Structure and Function"
      subject="Biology"
      grade={8}
      backLink="/lessons/Biology/8"
      lessonId="bio-g8-cell-structure-function"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
