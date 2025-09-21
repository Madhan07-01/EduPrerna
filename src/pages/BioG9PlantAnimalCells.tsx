import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Common Structures', content: `Cell Membrane: controls entry/exit\nCytoplasm: suspends organelles\nNucleus: control center with DNA\nMitochondria: energy (ATP) production\nEndoplasmic Reticulum (ER): transport of proteins/lipids\nRibosomes: protein synthesis\nGolgi Apparatus: packaging & secretion\nLysosomes: digestion` },
  { title: 'Plant Cell — Specific Components', content: `Cell Wall: cellulose; shape & support\nChloroplasts: photosynthesis (chlorophyll)\nLarge Central Vacuole: storage and turgor\nPlasmodesmata: cytoplasmic connections between cells` },
  { title: 'Animal Cell — Specific Components', content: `Centrioles: help in cell division\nSmall Vacuoles: storage\nLysosomes: waste breakdown (more common)` },
  { title: 'Differences Between Plant & Animal Cells', content: `Cell Wall: present (plant) / absent (animal)\nShape: rectangular (plant) / round-irregular (animal)\nVacuole: large central (plant) / small-absent (animal)\nPlastids: present (plant) / absent (animal)\nCentrioles: usually absent (plant) / present (animal)\nLysosomes: rare (plant) / common (animal)` },
  { title: 'Summary', content: 'Plant and animal cells share many organelles but differ in cell wall, plastids, vacuoles, centrioles, and typical shape; functions align with organism needs.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Powerhouse of the cell:', options: [
    { key: 'a', text: 'Chloroplast' }, { key: 'b', text: 'Mitochondria' }, { key: 'c', text: 'Ribosome' }, { key: 'd', text: 'Golgi' }
  ], answer: 'b', explanation: 'Mitochondria make ATP.' },
  { id: 'q2', question: 'Plant cells have a:', options: [
    { key: 'a', text: 'Cell wall' }, { key: 'b', text: 'Centrioles' }, { key: 'c', text: 'No vacuole' }, { key: 'd', text: 'No nucleus' }
  ], answer: 'a', explanation: 'Cell wall is typical of plants.' },
  { id: 'q3', question: 'Ribosomes function in:', options: [
    { key: 'a', text: 'Protein synthesis' }, { key: 'b', text: 'Digestion' }, { key: 'c', text: 'Packaging' }, { key: 'd', text: 'Photosynthesis' }
  ], answer: 'a', explanation: 'Site of translation.' },
  { id: 'q4', question: 'Chloroplasts occur in:', options: [
    { key: 'a', text: 'Animal cells' }, { key: 'b', text: 'Plant cells' }, { key: 'c', text: 'Both' }, { key: 'd', text: 'Neither' }
  ], answer: 'b', explanation: 'Photosynthetic plastids.' },
  { id: 'q5', question: 'Plant vacuole is typically:', options: [
    { key: 'a', text: 'Small' }, { key: 'b', text: 'Large & central' }, { key: 'c', text: 'Absent' }, { key: 'd', text: 'Full of enzymes' }
  ], answer: 'b', explanation: 'Maintains turgor.' },
  { id: 'q6', question: 'Centrioles generally in:', options: [
    { key: 'a', text: 'Plant cells' }, { key: 'b', text: 'Animal cells' }, { key: 'c', text: 'Bacteria' }, { key: 'd', text: 'Fungi only' }
  ], answer: 'b', explanation: 'Aid spindle formation in animals.' },
  { id: 'q7', question: 'Golgi apparatus role:', options: [
    { key: 'a', text: 'Packaging & secretion' }, { key: 'b', text: 'Energy' }, { key: 'c', text: 'Genetic control' }, { key: 'd', text: 'Membrane transport' }
  ], answer: 'a', explanation: 'Processes and ships products.' },
  { id: 'q8', question: 'Cell wall composition:', options: [
    { key: 'a', text: 'Cellulose' }, { key: 'b', text: 'Chitin' }, { key: 'c', text: 'Peptidoglycan' }, { key: 'd', text: 'Glycogen' }
  ], answer: 'a', explanation: 'Plant walls have cellulose.' },
  { id: 'q9', question: 'Plasmodesmata connect:', options: [
    { key: 'a', text: 'Nuclei' }, { key: 'b', text: 'Cytoplasm of adjacent plant cells' }, { key: 'c', text: 'Mitochondria' }, { key: 'd', text: 'Ribosomes' }
  ], answer: 'b', explanation: 'Channels across walls.' },
  { id: 'q10', question: 'Animal cell shape is often:', options: [
    { key: 'a', text: 'Rectangular' }, { key: 'b', text: 'Round/irregular' }, { key: 'c', text: 'Triangular' }, { key: 'd', text: 'Hexagonal' }
  ], answer: 'b', explanation: 'No rigid wall → variable shapes.' },
]

export default function BioG9PlantAnimalCells() {
  return (
    <LessonModuleTemplate
      title="Structure & Functions of Plant and Animal Cells"
      subject="Biology"
      grade={9}
      backLink="/lessons/Biology/9"
      lessonId="bio-g9-plant-animal-cells"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
