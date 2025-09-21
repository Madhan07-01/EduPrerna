import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Heredity explains how traits pass from parents to offspring, while evolution explains how populations change over time leading to adaptation and diversity.' },
  { title: '1. Heredity — Genes and Chromosomes', content: 'Traits are controlled by genes, segments of DNA on chromosomes. Humans have 46 chromosomes (23 pairs) per somatic cell — 22 pairs of autosomes and 1 pair of sex chromosomes (XX female, XY male).'},
  { title: "2. Mendel's Laws", content: '• Law of Segregation: Two alleles for a trait separate during gamete formation.\n• Law of Independent Assortment: Genes for different traits assort independently during gamete formation.' },
  { title: '3. Dominance and Punnett Squares', content: 'Dominant allele (A) expresses even in single copy; recessive (a) needs both copies. Punnett squares predict genotypic and phenotypic ratios in offspring.' },
  { title: '4. Evolution — Mechanisms and Evidence', content: 'Evolution is change in inherited traits of a population across generations.\nMechanisms: variation (mutation, recombination), natural selection (favorable traits increase), and speciation (formation of new species).\nEvidence: fossils; homologous structures (common ancestry); analogous structures (convergent evolution); embryological similarities.' },
  { title: '5. Importance', content: 'Understanding heredity helps explain inheritance patterns and genetic disorders, while evolution explains adaptation, biodiversity, and guides breeding and conservation.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'The unit of heredity is:', options: [
    { key: 'a', text: 'Cell' }, { key: 'b', text: 'Chromosome' }, { key: 'c', text: 'Gene' }, { key: 'd', text: 'DNA' }
  ], answer: 'c', explanation: 'Genes are heritable units that encode traits.' },
  { id: 'q2', question: 'Humans have how many pairs of chromosomes?', options: [
    { key: 'a', text: '22' }, { key: 'b', text: '23' }, { key: 'c', text: '24' }, { key: 'd', text: '46' }
  ], answer: 'b', explanation: 'There are 23 pairs (46 chromosomes total).' },
  { id: 'q3', question: 'In Mendelian genetics, the dominant allele is represented by:', options: [
    { key: 'a', text: 'Lowercase letter' }, { key: 'b', text: 'Uppercase letter' }, { key: 'c', text: 'Number' }, { key: 'd', text: 'Symbol *' }
  ], answer: 'b', explanation: 'Dominant alleles are conventionally uppercase (e.g., A).' },
  { id: 'q4', question: 'Law of independent assortment states that:', options: [
    { key: 'a', text: 'Genes for different traits segregate independently' }, { key: 'b', text: 'Alleles always remain together' }, { key: 'c', text: 'Only dominant traits are expressed' }, { key: 'd', text: 'None of the above' }
  ], answer: 'a', explanation: 'Assortment of one gene pair is independent of another (for unlinked genes).' },
  { id: 'q5', question: 'Evolution is primarily driven by:', options: [
    { key: 'a', text: 'Natural selection' }, { key: 'b', text: 'Random growth' }, { key: 'c', text: 'External environment only' }, { key: 'd', text: 'Learning' }
  ], answer: 'a', explanation: 'Natural selection increases frequency of favorable traits.' },
  { id: 'q6', question: 'Fossil records provide evidence for:', options: [
    { key: 'a', text: 'Heredity' }, { key: 'b', text: 'Evolution' }, { key: 'c', text: 'Photosynthesis' }, { key: 'd', text: 'Respiration' }
  ], answer: 'b', explanation: 'Fossils trace transitions and lineage changes over time.' },
  { id: 'q7', question: 'Homologous structures indicate:', options: [
    { key: 'a', text: 'Convergent evolution' }, { key: 'b', text: 'Common ancestry' }, { key: 'c', text: 'Random mutation only' }, { key: 'd', text: 'Analogous traits' }
  ], answer: 'b', explanation: 'Similar structural plan suggests shared ancestry.' },
  { id: 'q8', question: 'Recessive traits are expressed when:', options: [
    { key: 'a', text: 'Both alleles are recessive' }, { key: 'b', text: 'One allele is recessive' }, { key: 'c', text: 'Dominant allele is present' }, { key: 'd', text: 'Only in males' }
  ], answer: 'a', explanation: 'Homozygous recessive genotype (aa) is required.' },
  { id: 'q9', question: 'Variation in a population is caused by:', options: [
    { key: 'a', text: 'Mutation' }, { key: 'b', text: 'Recombination' }, { key: 'c', text: 'Sexual reproduction' }, { key: 'd', text: 'All of the above' }
  ], answer: 'd', explanation: 'All listed mechanisms contribute to genetic variation.' },
  { id: 'q10', question: 'Formation of a new species over time is called:', options: [
    { key: 'a', text: 'Variation' }, { key: 'b', text: 'Adaptation' }, { key: 'c', text: 'Speciation' }, { key: 'd', text: 'Mutation' }
  ], answer: 'c', explanation: 'Speciation is the process yielding new species.' }
]

export default function BioG10HeredityEvolution() {
  return (
    <LessonModuleTemplate
      title="Heredity & Evolution"
      subject="Biology"
      grade={10}
      backLink="/lessons/Biology/10"
      lessonId="bio-g10-heredity-evolution"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
