import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Diversity of living organisms encompasses the variety of life forms on Earth in structure, function, habitat, and reproduction. Classification groups organisms based on shared features to study relationships and evolution.' },
  { title: '1. Need for Classification', content: 'Helps identify, name, and study millions of species; reveals evolutionary relationships and ecological roles.' },
  { title: '2. Five Kingdom Classification (Whittaker, 1969)', content: '• Monera: unicellular, prokaryotic (Bacteria, Cyanobacteria)\n• Protista: unicellular eukaryotes (Amoeba, Paramecium)\n• Fungi: eukaryotic, saprophytic; cell wall of chitin (Yeast, Mushrooms)\n• Plantae: multicellular autotrophs; cell wall of cellulose (Moss, Fern, Mango)\n• Animalia: multicellular heterotrophs; no cell wall (Fish, Human, Insects)' },
  { title: '3. Basis of Classification', content: 'Morphology, anatomy, physiology, reproduction, and molecular data (DNA/RNA/proteins).' },
  { title: '4. Taxonomic Hierarchy', content: 'Species < Genus < Family < Order < Class < Phylum/Division < Kingdom.' },
  { title: '5. Binomial Nomenclature (Linnaeus)', content: 'Two-part Latin names: Genus (Capitalized) + species (lowercase), italicized or underlined. Example: Homo sapiens, Mangifera indica.' },
  { title: '6. Major Groups', content: 'Prokaryotes (Monera); Protists; Fungi (chitin cell wall); Plants (cellulose cell wall, chlorophyll); Animals (no cell wall).'},
  { title: '7. Significance of Diversity', content: 'Ecological balance, resources for food/medicine/industry, insight into evolution; conservation is vital.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Five Kingdom Classification was proposed by:', options: [
    { key: 'a', text: 'Linnaeus' }, { key: 'b', text: 'Whittaker' }, { key: 'c', text: 'Darwin' }, { key: 'd', text: 'Haeckel' }
  ], answer: 'b', explanation: 'R.H. Whittaker proposed the five-kingdom system in 1969.' },
  { id: 'q2', question: 'Binomial nomenclature uses:', options: [
    { key: 'a', text: 'Family and species' }, { key: 'b', text: 'Genus and species' }, { key: 'c', text: 'Order and genus' }, { key: 'd', text: 'Kingdom and class' }
  ], answer: 'b', explanation: 'Format: Genus species (e.g., Homo sapiens).' },
  { id: 'q3', question: 'Fungal cell wall is made of:', options: [
    { key: 'a', text: 'Cellulose' }, { key: 'b', text: 'Chitin' }, { key: 'c', text: 'Pectin' }, { key: 'd', text: 'Lignin' }
  ], answer: 'b', explanation: 'Chitin is characteristic of fungi.' },
  { id: 'q4', question: 'Prokaryotes lack:', options: [
    { key: 'a', text: 'Cell wall' }, { key: 'b', text: 'Ribosomes' }, { key: 'c', text: 'Nucleus' }, { key: 'd', text: 'DNA' }
  ], answer: 'c', explanation: 'DNA is present but not enclosed by a nucleus.' },
  { id: 'q5', question: 'Multicellular autotrophs belong to:', options: [
    { key: 'a', text: 'Monera' }, { key: 'b', text: 'Protista' }, { key: 'c', text: 'Plantae' }, { key: 'd', text: 'Fungi' }
  ], answer: 'c', explanation: 'Plants are multicellular autotrophs.' },
  { id: 'q6', question: 'Amoeba belongs to:', options: [
    { key: 'a', text: 'Monera' }, { key: 'b', text: 'Protista' }, { key: 'c', text: 'Fungi' }, { key: 'd', text: 'Animalia' }
  ], answer: 'b', explanation: 'Amoeba is a protist (unicellular eukaryote).' },
  { id: 'q7', question: 'Humans are in Kingdom:', options: [
    { key: 'a', text: 'Plantae' }, { key: 'b', text: 'Animalia' }, { key: 'c', text: 'Protista' }, { key: 'd', text: 'Monera' }
  ], answer: 'b', explanation: 'Humans are animals.' },
  { id: 'q8', question: 'Smallest taxonomic unit is:', options: [
    { key: 'a', text: 'Genus' }, { key: 'b', text: 'Family' }, { key: 'c', text: 'Species' }, { key: 'd', text: 'Order' }
  ], answer: 'c', explanation: 'Species is the basic unit of classification.' },
  { id: 'q9', question: 'Cyanobacteria are:', options: [
    { key: 'a', text: 'Eukaryotic' }, { key: 'b', text: 'Prokaryotic' }, { key: 'c', text: 'Fungi' }, { key: 'd', text: 'Protists' }
  ], answer: 'b', explanation: 'They are photosynthetic prokaryotes.' },
  { id: 'q10', question: 'Scientific names are:', options: [
    { key: 'a', text: 'Only genus name' }, { key: 'b', text: 'Only species name' }, { key: 'c', text: 'Two-part Latin names' }, { key: 'd', text: 'Family and genus' }
  ], answer: 'c', explanation: 'Binomial format uses Genus + species.' },
]

export default function BioG11DiversityLivingOrganisms() {
  return (
    <LessonModuleTemplate
      title="Diversity of Living Organisms"
      subject="Biology"
      grade={11}
      backLink="/lessons/Biology/11"
      lessonId="bio-g11-diversity-living-organisms"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
