import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'The cell is the basic structural and functional unit of life. All organisms are made of cells. Studying cell structure reveals how organisms grow, metabolize, reproduce, and respond to stimuli.' },
  { title: '1. Cell Theory', content: '• All living organisms are composed of one or more cells.\n• The cell is the basic unit of structure and function.\n• All cells arise from pre-existing cells.\n• Energy flow (metabolism) occurs within cells.' },
  { title: '2. Types of Cells', content: 'Prokaryotic: no true nucleus, DNA in nucleoid; lack membrane-bound organelles (Bacteria, Cyanobacteria).\nEukaryotic: true nucleus, membrane-bound organelles (animals, plants, fungi, protists).' },
  { title: '3. Cell Organelles & Functions', content: '• Nucleus: double membrane, nucleolus; control center, genetic material.\n• Mitochondria: double membrane with cristae; ATP production (respiration).\n• Ribosomes: protein synthesis.\n• Endoplasmic Reticulum: RER (protein synthesis), SER (lipid synthesis, detox).\n• Golgi Apparatus: modifies, sorts, packages proteins/lipids.\n• Lysosomes: digestive enzymes; intracellular digestion, waste removal.\n• Chloroplasts (plants): photosynthesis.\n• Cell membrane: lipid bilayer with proteins; selective permeability, communication.\n• Cell wall (plants): cellulose; support and protection.\n• Cytoplasm: medium for organelles and reactions.\n• Centrosome/centrioles (animals): microtubule organization, cell division.' },
  { title: '4. Cell Functions', content: 'Metabolism; Growth; Reproduction (mitosis, meiosis); Response to stimuli; Transport of substances (diffusion, osmosis, active transport).' },
  { title: '5. Membrane & Transport', content: 'Fluid mosaic model. Passive: diffusion, osmosis. Active: requires ATP, against gradient. Endocytosis/exocytosis for bulk transport.' },
  { title: '6. Specialized Cells', content: 'Plants: Parenchyma, Collenchyma, Guard cells. Animals: Neurons, Muscle cells, Epithelial cells, Blood cells.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'The basic structural unit of life is:', options: [
    { key: 'a', text: 'Tissue' }, { key: 'b', text: 'Cell' }, { key: 'c', text: 'Organ' }, { key: 'd', text: 'Organ system' }
  ], answer: 'b', explanation: 'Cell is the fundamental unit.' },
  { id: 'q2', question: 'Prokaryotic cells lack:', options: [
    { key: 'a', text: 'Ribosomes' }, { key: 'b', text: 'Plasma membrane' }, { key: 'c', text: 'Nucleus' }, { key: 'd', text: 'DNA' }
  ], answer: 'c', explanation: 'They lack a true, membrane-bound nucleus.' },
  { id: 'q3', question: 'Mitochondria function is:', options: [
    { key: 'a', text: 'Protein synthesis' }, { key: 'b', text: 'Energy (ATP) production' }, { key: 'c', text: 'Photosynthesis' }, { key: 'd', text: 'Digestion' }
  ], answer: 'b', explanation: 'Mitochondria are sites of cellular respiration.' },
  { id: 'q4', question: 'Rough ER is associated with:', options: [
    { key: 'a', text: 'Lipid synthesis' }, { key: 'b', text: 'Protein synthesis' }, { key: 'c', text: 'ATP production' }, { key: 'd', text: 'Waste removal' }
  ], answer: 'b', explanation: 'RER has ribosomes for protein synthesis.' },
  { id: 'q5', question: 'Lysosomes contain:', options: [
    { key: 'a', text: 'DNA' }, { key: 'b', text: 'Digestive enzymes' }, { key: 'c', text: 'Ribosomes' }, { key: 'd', text: 'Chlorophyll' }
  ], answer: 'b', explanation: 'Lysosomal hydrolases digest macromolecules.' },
  { id: 'q6', question: 'Chloroplasts occur in:', options: [
    { key: 'a', text: 'Animal cells' }, { key: 'b', text: 'Plant cells' }, { key: 'c', text: 'Both' }, { key: 'd', text: 'Bacteria' }
  ], answer: 'b', explanation: 'Chloroplasts are plant organelles for photosynthesis.' },
  { id: 'q7', question: 'Plant cell wall is composed of:', options: [
    { key: 'a', text: 'Cellulose' }, { key: 'b', text: 'Chitin' }, { key: 'c', text: 'Pectin' }, { key: 'd', text: 'Proteins' }
  ], answer: 'a', explanation: 'Primary component is cellulose.' },
  { id: 'q8', question: 'Control center of the cell:', options: [
    { key: 'a', text: 'Mitochondria' }, { key: 'b', text: 'Nucleus' }, { key: 'c', text: 'Golgi apparatus' }, { key: 'd', text: 'Ribosome' }
  ], answer: 'b', explanation: 'Nucleus houses DNA and regulates activities.' },
  { id: 'q9', question: 'Active transport requires:', options: [
    { key: 'a', text: 'No energy' }, { key: 'b', text: 'ATP' }, { key: 'c', text: 'Osmosis' }, { key: 'd', text: 'Diffusion' }
  ], answer: 'b', explanation: 'Moves substances against gradient using ATP.' },
  { id: 'q10', question: 'Ribosomes are sites of:', options: [
    { key: 'a', text: 'DNA replication' }, { key: 'b', text: 'Protein synthesis' }, { key: 'c', text: 'Lipid synthesis' }, { key: 'd', text: 'Photosynthesis' }
  ], answer: 'b', explanation: 'Ribosomes assemble polypeptides.' },
]

export default function BioG11CellStructureFunction() {
  return (
    <LessonModuleTemplate
      title="Cell Structure and Function"
      subject="Biology"
      grade={11}
      backLink="/lessons/Biology/11"
      lessonId="bio-g11-cell-structure-function"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
