import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Genetics studies inheritance of traits; evolution explains origin and diversification of species over time. Together, they underpin modern biology.' },
  { title: '1. Mendelian Genetics', content: 'Mendel’s laws from pea experiments:\n• Law of Segregation: allele pairs separate in gametes.\n• Law of Independent Assortment: alleles of different genes assort independently (if unlinked).\nMonohybrid and dihybrid crosses yield 3:1 and 9:3:3:1 phenotypic ratios (ideal cases).'},
  { title: '2. Chromosomes and Genes', content: 'Gene: unit of heredity. Alleles: variants. Genotype (AA, Aa, aa) vs phenotype (observable trait). Homozygous vs heterozygous.' },
  { title: '3. Sex Determination', content: 'Humans: XX (female), XY (male). Other systems: ZW (birds), haplo-diploid (bees).'},
  { title: '4. Mutations', content: 'DNA sequence changes: point (missense, nonsense, silent), frameshift (insertion/deletion), chromosomal (deletion/duplication/inversion/translocation).'},
  { title: '5. Linkage & Crossing Over', content: 'Linked genes on same chromosome show non-independent assortment. Crossing over during meiosis I (prophase I) generates recombinants → variation.' },
  { title: '6. Evolution & Natural Selection', content: 'Darwin’s natural selection: variation, struggle, survival of the fittest, inheritance. Speciation via reproductive isolation: allopatric (geographic), sympatric (ecological/behavioral). Evidence: fossils, anatomy, embryology, molecular data, biogeography.' },
  { title: '7. Hardy–Weinberg Principle', content: 'Allele frequencies remain constant if no mutation, migration, selection; random mating; infinitely large population.\nEquations: p + q = 1; p^2 + 2pq + q^2 = 1.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Law of Segregation states that', options: [
    { key: 'a', text: 'Alleles separate during gamete formation' }, { key: 'b', text: 'Alleles remain together' }, { key: 'c', text: 'Alleles mutate randomly' }, { key: 'd', text: 'Traits are blended' }
  ], answer: 'a', explanation: 'Each gamete gets one allele of a pair.' },
  { id: 'q2', question: 'Self-cross of heterozygote (Tt × Tt) gives genotype ratio', options: [
    { key: 'a', text: '1:1' }, { key: 'b', text: '3:1' }, { key: 'c', text: '1:2:1' }, { key: 'd', text: '9:3:3:1' }
  ], answer: 'c', explanation: 'Genotypes: TT, Tt, tt = 1:2:1.' },
  { id: 'q3', question: 'Humans have how many pairs of chromosomes?', options: [
    { key: 'a', text: '22' }, { key: 'b', text: '23' }, { key: 'c', text: '46' }, { key: 'd', text: '44' }
  ], answer: 'b', explanation: '23 pairs (46 total).' },
  { id: 'q4', question: 'A mutation that does not change the amino acid is', options: [
    { key: 'a', text: 'Missense' }, { key: 'b', text: 'Nonsense' }, { key: 'c', text: 'Silent' }, { key: 'd', text: 'Frameshift' }
  ], answer: 'c', explanation: 'Silent mutations alter codon but not amino acid.' },
  { id: 'q5', question: 'Natural selection is based on', options: [
    { key: 'a', text: 'Random mating' }, { key: 'b', text: 'Survival and reproduction of the fittest' }, { key: 'c', text: 'Equal reproduction' }, { key: 'd', text: 'Genetic drift only' }
  ], answer: 'b', explanation: 'Differential fitness drives allele frequency shifts.' },
  { id: 'q6', question: 'XY sex determination occurs in', options: [
    { key: 'a', text: 'Birds' }, { key: 'b', text: 'Mammals' }, { key: 'c', text: 'Bees' }, { key: 'd', text: 'Some fish only' }
  ], answer: 'b', explanation: 'Mammals (including humans) use XY system.' },
  { id: 'q7', question: 'Crossing over occurs during', options: [
    { key: 'a', text: 'Mitosis' }, { key: 'b', text: 'Meiosis I (Prophase I)' }, { key: 'c', text: 'Meiosis II' }, { key: 'd', text: 'Fertilization' }
  ], answer: 'b', explanation: 'Homologous recombination at prophase I.' },
  { id: 'q8', question: 'If p = 0.6 in H–W equilibrium, then q =', options: [
    { key: 'a', text: '0.4' }, { key: 'b', text: '0.36' }, { key: 'c', text: '0.16' }, { key: 'd', text: '0.6' }
  ], answer: 'a', explanation: 'p + q = 1 ⇒ q = 0.4.' },
  { id: 'q9', question: 'Speciation due to geographic isolation is', options: [
    { key: 'a', text: 'Sympatric' }, { key: 'b', text: 'Allopatric' }, { key: 'c', text: 'Parapatric' }, { key: 'd', text: 'Artificial' }
  ], answer: 'b', explanation: 'Allopatric speciation involves physical barriers.' },
  { id: 'q10', question: 'Fossil records primarily support', options: [
    { key: 'a', text: 'Genetics' }, { key: 'b', text: 'Evolution' }, { key: 'c', text: 'Mutation' }, { key: 'd', text: 'Reproduction' }
  ], answer: 'b', explanation: 'Fossils document evolutionary transitions.' },
]

export default function BioG12GeneticsEvolution() {
  return (
    <LessonModuleTemplate
      title="Genetics and Evolution"
      subject="Biology"
      grade={12}
      backLink="/lessons/Biology/12"
      lessonId="bio-g12-genetics-evolution"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
