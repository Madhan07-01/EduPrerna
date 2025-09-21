import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Living organisms range from bacteria to whales and tall trees. Classification helps study, identify, and understand evolutionary relationships.' },
  { title: '1. Classification', content: 'Arrangement of organisms based on similarities/differences. Artificial systems use observable features; natural systems use structural and evolutionary relationships.' },
  { title: '2. Hierarchy of Classification', content: 'Kingdom → Phylum → Class → Order → Family → Genus → Species. Mnemonic: King Philip Came Over For Good Soup.' },
  { title: '3. Five Kingdom Classification (Whittaker, 1969)', content: `Monera: bacteria/blue-green algae—unicellular, prokaryotic.\nProtista: Amoeba/Paramecium—mostly unicellular, eukaryotic.\nFungi: yeast/mushroom—eukaryotic, chitin wall, saprophytic.\nPlantae: moss/fern/flowering plants—multicellular, autotrophic, cellulose wall.\nAnimalia: humans/birds—multicellular, heterotrophic, no cell wall.` },
  { title: '4. Binomial Nomenclature', content: 'Two-name system (Genus + species) by Carolus Linnaeus. Genus capitalized, species lowercase, italicized, e.g., Homo sapiens.' },
  { title: '5. Importance', content: 'Provides uniform naming, clarifies relationships, useful in medicine, agriculture, biodiversity and conservation.' },
  { title: 'Summary', content: 'Classification organizes biodiversity; five-kingdom system, hierarchy, and binomial names enable clear communication and study.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Purpose of classification:', options: [
    { key: 'a', text: 'Entertainment' }, { key: 'b', text: 'Identify, study, understand' }, { key: 'c', text: 'Random grouping' }, { key: 'd', text: 'Only naming' }
  ], answer: 'b', explanation: 'Classification aids study and understanding.' },
  { id: 'q2', question: 'Smallest taxon:', options: [
    { key: 'a', text: 'Kingdom' }, { key: 'b', text: 'Genus' }, { key: 'c', text: 'Species' }, { key: 'd', text: 'Order' }
  ], answer: 'c', explanation: 'Species is the basic unit.' },
  { id: 'q3', question: 'Binomial nomenclature by:', options: [
    { key: 'a', text: 'Whittaker' }, { key: 'b', text: 'Darwin' }, { key: 'c', text: 'Linnaeus' }, { key: 'd', text: 'Hooke' }
  ], answer: 'c', explanation: 'Linnaeus proposed binomial names.' },
  { id: 'q4', question: 'Chitin cell wall is found in:', options: [
    { key: 'a', text: 'Plantae' }, { key: 'b', text: 'Animalia' }, { key: 'c', text: 'Fungi' }, { key: 'd', text: 'Protista' }
  ], answer: 'c', explanation: 'Fungal walls are chitinous.' },
  { id: 'q5', question: 'Multicellular, autotrophic, cellulose wall:', options: [
    { key: 'a', text: 'Monera' }, { key: 'b', text: 'Plantae' }, { key: 'c', text: 'Fungi' }, { key: 'd', text: 'Animalia' }
  ], answer: 'b', explanation: 'Plants are autotrophs with cellulose walls.' },
  { id: 'q6', question: 'Prokaryotic unicellular kingdom:', options: [
    { key: 'a', text: 'Monera' }, { key: 'b', text: 'Protista' }, { key: 'c', text: 'Fungi' }, { key: 'd', text: 'Plantae' }
  ], answer: 'a', explanation: 'Bacteria are in Monera.' },
  { id: 'q7', question: 'Amoeba belongs to:', options: [
    { key: 'a', text: 'Monera' }, { key: 'b', text: 'Protista' }, { key: 'c', text: 'Fungi' }, { key: 'd', text: 'Animalia' }
  ], answer: 'b', explanation: 'Protists are mostly unicellular eukaryotes.' },
  { id: 'q8', question: 'Humans are in:', options: [
    { key: 'a', text: 'Protista' }, { key: 'b', text: 'Plantae' }, { key: 'c', text: 'Animalia' }, { key: 'd', text: 'Fungi' }
  ], answer: 'c', explanation: 'Humans are animals.' },
  { id: 'q9', question: 'Fungi nutrition type:', options: [
    { key: 'a', text: 'Autotrophic' }, { key: 'b', text: 'Saprophytic' }, { key: 'c', text: 'Parasitic only' }, { key: 'd', text: 'Photosynthetic' }
  ], answer: 'b', explanation: 'They obtain nutrients from dead/decaying matter.' },
  { id: 'q10', question: 'Binomial name format:', options: [
    { key: 'a', text: 'species Species' }, { key: 'b', text: 'GENUS SPECIES' }, { key: 'c', text: 'Genus species' }, { key: 'd', text: 'genus Species' }
  ], answer: 'c', explanation: 'Genus capitalized, species lowercase, italicized.' },
]

export default function BioG9DiversityOrganisms() {
  return (
    <LessonModuleTemplate
      title="Diversity of Organisms"
      subject="Biology"
      grade={9}
      backLink="/lessons/Biology/9"
      lessonId="bio-g9-diversity-organisms"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
