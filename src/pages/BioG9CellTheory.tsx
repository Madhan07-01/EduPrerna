import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'The cell is the basic structural and functional unit of life. All living organisms are made of cells, and life processes occur within them.' },
  { title: '1. Discovery of the Cell', content: 'Robert Hooke (1665) observed cork cells and coined the term "cell". Anton van Leeuwenhoek later observed living cells such as bacteria and protozoa using a simple microscope.' },
  { title: '2. Cell Theory', content: 'All living organisms are made of cells; the cell is the basic unit of structure and function; all cells arise from pre-existing cells. Cells contain hereditary material (DNA) and carry out life processes.' },
  { title: '3. Types of Cells', content: 'Prokaryotic: no true nucleus, DNA free in cytoplasm, no membrane-bound organelles (Bacteria, Blue-green algae). Eukaryotic: true nucleus and membrane-bound organelles (plants, animals, fungi).' },
  { title: '4. Structure of a Typical Cell', content: `Cell Membrane: controls entry/exit\nCytoplasm: suspends organelles, site of reactions\nNucleus: control center, contains DNA\nMitochondria: energy (ATP) production\nEndoplasmic Reticulum (ER): transports proteins/lipids\nRibosomes: protein synthesis\nGolgi Apparatus: packaging & secretion\nLysosomes: digest waste\nVacuoles: storage (food, water, waste)` },
  { title: '5. Cell Division', content: 'Mitosis: growth & repair—produces identical daughter cells. Meiosis: produces gametes for sexual reproduction (sperm/egg) with half the chromosome number.' },
  { title: 'Summary', content: 'Cell theory unifies biology. Cell structure and division underpin growth, repair, heredity, and function of organisms.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Cell discovered by:', options: [
    { key: 'a', text: 'Hooke' }, { key: 'b', text: 'Leeuwenhoek' }, { key: 'c', text: 'Pasteur' }, { key: 'd', text: 'Darwin' }
  ], answer: 'a', explanation: 'Robert Hooke named the cell after observing cork.' },
  { id: 'q2', question: 'Observed living cells (bacteria, protozoa):', options: [
    { key: 'a', text: 'Hooke' }, { key: 'b', text: 'Leeuwenhoek' }, { key: 'c', text: 'Schwann' }, { key: 'd', text: 'Schleiden' }
  ], answer: 'b', explanation: 'Anton van Leeuwenhoek saw living cells.' },
  { id: 'q3', question: 'Cell theory includes:', options: [
    { key: 'a', text: 'Cells arise spontaneously' }, { key: 'b', text: 'Cells arise from pre-existing cells' }, { key: 'c', text: 'Only plants have cells' }, { key: 'd', text: 'Cells lack DNA' }
  ], answer: 'b', explanation: 'Virchow added that cells arise from existing cells.' },
  { id: 'q4', question: 'Prokaryotic cells:', options: [
    { key: 'a', text: 'Have a true nucleus' }, { key: 'b', text: 'Lack membrane-bound organelles' }, { key: 'c', text: 'Have chloroplasts' }, { key: 'd', text: 'Have mitochondria' }
  ], answer: 'b', explanation: 'Prokaryotes lack nucleus and organelles.' },
  { id: 'q5', question: 'Powerhouse of the cell:', options: [
    { key: 'a', text: 'Chloroplast' }, { key: 'b', text: 'Mitochondria' }, { key: 'c', text: 'Golgi' }, { key: 'd', text: 'Ribosome' }
  ], answer: 'b', explanation: 'Mitochondria produce ATP.' },
  { id: 'q6', question: 'Cell membrane function is to:', options: [
    { key: 'a', text: 'Control transport' }, { key: 'b', text: 'Photosynthesize' }, { key: 'c', text: 'Store DNA' }, { key: 'd', text: 'Digest waste' }
  ], answer: 'a', explanation: 'It regulates entry and exit.' },
  { id: 'q7', question: 'Lysosomes are involved in:', options: [
    { key: 'a', text: 'Energy production' }, { key: 'b', text: 'Digestion of waste' }, { key: 'c', text: 'Protein synthesis' }, { key: 'd', text: 'Genetic control' }
  ], answer: 'b', explanation: 'Lysosomes contain hydrolytic enzymes.' },
  { id: 'q8', question: 'Mitosis results in:', options: [
    { key: 'a', text: 'Gametes' }, { key: 'b', text: 'Identical daughter cells' }, { key: 'c', text: 'Haploid cells' }, { key: 'd', text: 'No cell division' }
  ], answer: 'b', explanation: 'Mitosis produces two identical cells.' },
  { id: 'q9', question: 'Eukaryotic cells have:', options: [
    { key: 'a', text: 'No nucleus' }, { key: 'b', text: 'Membrane-bound organelles' }, { key: 'c', text: 'Only a cell wall' }, { key: 'd', text: 'No DNA' }
  ], answer: 'b', explanation: 'Organelles like nucleus, mitochondria, ER.' },
  { id: 'q10', question: 'Cytoplasm is the site of:', options: [
    { key: 'a', text: 'DNA replication only' }, { key: 'b', text: 'Many metabolic reactions' }, { key: 'c', text: 'Protein storage only' }, { key: 'd', text: 'Cell division only' }
  ], answer: 'b', explanation: 'Cytoplasm hosts many reactions.' },
]

export default function BioG9CellTheory() {
  return (
    <LessonModuleTemplate
      title="The Fundamental Unit of Life (Cell Theory)"
      subject="Biology"
      grade={9}
      backLink="/lessons/Biology/9"
      lessonId="bio-g9-cell-theory"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
