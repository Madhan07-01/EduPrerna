import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const heredityEvolutionModule: LearningModule = {
  title: 'Heredity and Evolution',
  introduction: 'Welcome to the fascinating world of Heredity and Evolution! Have you ever wondered why you have your mother\'s eyes or your father\'s nose? Or why there are so many different species of animals and plants on Earth? These questions are answered by the study of heredity and evolution. Heredity explains how traits are passed from parents to offspring, while evolution explains how species change over time. In this module, we\'ll explore the fundamental principles discovered by Gregor Mendel, the nature of genes and chromosomes, and how evolution shapes the diversity of life on our planet. Get ready to uncover the secrets of what makes you unique and how life on Earth has become so incredibly diverse!',
  concepts: [
    {
      title: 'Heredity and Evolution - Basic Definitions',
      content: 'Heredity is the process by which traits are passed from parents to offspring through genes. Evolution is the gradual change in the characteristics of species over several generations, resulting in the development of new species. These two concepts are closely related - heredity provides the mechanism for passing traits, while evolution explains how these traits change over time to produce new species.',
      examples: [
        'Heredity: Why children resemble their parents (eye color, height, blood type)',
        'Evolution: How simple life forms developed into complex organisms over millions of years',
        'Genetic variation: Differences in traits among individuals of the same species',
        'Natural selection: Process by which favorable traits become more common in a population',
        'Adaptation: Inherited characteristics that help organisms survive and reproduce',
        'Speciation: Formation of new and distinct species in the course of evolution'
      ]
    },
    {
      title: 'Genes and Chromosomes - The Fundamental Units of Heredity',
      content: 'Genes are segments of DNA that contain the instructions for making proteins, which determine our traits. Chromosomes are structures made of DNA and proteins that carry genes. Humans have 23 pairs of chromosomes (46 total), with one chromosome of each pair inherited from each parent.',
      examples: [
        'Gene: Basic unit of heredity (e.g., gene for eye color, gene for blood type)',
        'Chromosome: Thread-like structures in the nucleus that carry genes',
        'DNA (Deoxyribonucleic acid): Molecule that contains genetic information',
        'Alleles: Different versions of the same gene (e.g., allele for brown eyes, allele for blue eyes)',
        'Homozygous: Having two identical alleles for a trait (e.g., BB or bb)',
        'Heterozygous: Having two different alleles for a trait (e.g., Bb)'
      ]
    },
    {
      title: 'Mendel\'s Laws of Inheritance - The Foundation of Genetics',
      content: 'Gregor Mendel, an Austrian monk, is considered the father of genetics. Through his experiments with pea plants, he discovered fundamental laws that explain how traits are inherited. His work laid the foundation for our modern understanding of heredity.',
      examples: [
        'Law of Dominance: In a heterozygous condition, one allele (dominant) masks the expression of the other (recessive)',
        'Law of Segregation: During gamete formation, the two alleles for each trait separate so that each gamete carries only one allele',
        'Law of Independent Assortment: Alleles for different traits are distributed to gametes independently of one another',
        'Mendel\'s experiments: Studied seven different traits in pea plants (flower color, seed shape, plant height)',
        'P generation: Parental generation used in crosses',
        'F1 and F2 generations: First and second filial generations in genetic crosses'
      ]
    },
    {
      title: 'Dominant and Recessive Traits - Understanding Inheritance Patterns',
      content: 'Dominant traits are expressed even when only one copy of the allele is present, while recessive traits are only expressed when two copies of the allele are present. This explains why some traits seem to "skip" generations.',
      examples: [
        'Dominant traits: Brown eyes (over blue eyes), free earlobes (over attached), ability to roll tongue',
        'Recessive traits: Blue eyes (when two recessive alleles present), attached earlobes, inability to roll tongue',
        'Phenotype: Observable characteristics (what an organism looks like)',
        'Genotype: Genetic makeup (what alleles an organism has)',
        'Punnett square: Diagram used to predict the probability of offspring having certain traits',
        'Carrier: Heterozygous individual who has one recessive allele but doesn\'t show the trait'
      ]
    },
    {
      title: 'Monohybrid and Dihybrid Crosses - Applying Mendel\'s Laws',
      content: 'Monohybrid crosses involve the inheritance of one trait, while dihybrid crosses involve the inheritance of two traits. These crosses help us understand how traits are passed from parents to offspring and predict the probability of offspring having certain characteristics.',
      examples: [
        'Monohybrid cross: Crossing two plants that differ in only one trait (e.g., tall vs. short)',
        'Dihybrid cross: Crossing two plants that differ in two traits (e.g., tall/yellow vs. short/green)',
        'Phenotypic ratio in F2 generation of monohybrid cross: 3:1 (dominant:recessive)',
        'Phenotypic ratio in F2 generation of dihybrid cross: 9:3:3:1',
        'Test cross: Crossing an organism with unknown genotype with a homozygous recessive to determine genotype',
        'Incomplete dominance: Neither allele is completely dominant (e.g., red + white = pink flowers)'
      ]
    },
    {
      title: 'Basic Principles of Evolution - How Species Change Over Time',
      content: 'Evolution is the process by which populations of organisms change over generations. It explains the diversity of life on Earth and how species adapt to their environments. Evolution occurs through changes in the genetic composition of populations over time.',
      examples: [
        'Population: Group of organisms of the same species living in the same area',
        'Gene pool: All the genes and their alleles in a population',
        'Allele frequency: Proportion of a particular allele in a gene pool',
        'Microevolution: Small-scale changes in allele frequencies within a population',
        'Macroevolution: Large-scale evolutionary changes that result in new species',
        'Fitness: Ability of an organism to survive and reproduce in its environment'
      ]
    },
    {
      title: 'Mechanisms of Evolution - How Evolution Occurs',
      content: 'There are several mechanisms that drive evolution, with natural selection being the most important. These mechanisms cause changes in allele frequencies in populations over time, leading to evolutionary change.',
      examples: [
        'Natural selection: Differential survival and reproduction of individuals with favorable traits',
        'Genetic drift: Random changes in allele frequencies, especially in small populations',
        'Gene flow: Movement of alleles between populations through migration',
        'Mutation: Changes in DNA sequence that create new alleles',
        'Non-random mating: When individuals choose mates based on specific traits',
        'Artificial selection: Humans selecting for desirable traits in breeding (e.g., dog breeding)'
      ]
    },
    {
      title: 'Natural Selection - Darwin\'s Key Insight',
      content: 'Natural selection is the process by which organisms with traits that are better suited to their environment tend to survive and produce more offspring. This leads to changes in the frequency of traits in a population over time. Charles Darwin proposed this mechanism after his observations during his voyage on the HMS Beagle.',
      examples: [
        'Variation: Individuals in a population have different traits',
        'Inheritance: Some traits are passed from parents to offspring',
        'Selection pressure: Environmental factors that affect survival and reproduction',
        'Differential reproduction: Individuals with favorable traits produce more offspring',
        'Adaptation: Traits that improve survival and reproduction become more common',
        'Example: Peppered moths in industrial England (dark moths survived better in polluted areas)'
      ]
    },
    {
      title: 'Speciation - Formation of New Species',
      content: 'Speciation is the evolutionary process by which populations evolve to become distinct species. This occurs when populations of the same species become reproductively isolated and diverge genetically over time.',
      examples: [
        'Reproductive isolation: Barriers that prevent interbreeding between populations',
        'Geographic isolation: Physical separation of populations (mountains, rivers, islands)',
        'Temporal isolation: Populations breed at different times',
        'Behavioral isolation: Differences in mating behaviors or rituals',
        'Genetic isolation: Accumulation of genetic differences that prevent successful interbreeding',
        'Adaptive radiation: Rapid evolution of many species from a common ancestor (e.g., Darwin\'s finches)'
      ]
    },
    {
      title: 'Evidence for Evolution - Supporting the Theory',
      content: 'Multiple lines of evidence support the theory of evolution, including fossils, comparative anatomy, embryology, biogeography, and molecular biology. This evidence shows that all life on Earth is related and has evolved from common ancestors.',
      examples: [
        'Fossil evidence: Shows gradual changes in species over time and extinct species',
        'Homologous structures: Similar structures in different species due to common ancestry (e.g., human arm, whale flipper, bat wing)',
        'Analogous structures: Similar functions but different structures due to convergent evolution (e.g., bird and insect wings)',
        'Vestigial structures: Remnants of structures that were functional in ancestors (e.g., human tailbone, whale hip bones)',
        'Embryological evidence: Similarities in early development of different species',
        'Molecular evidence: Similarities in DNA and protein sequences between related species'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the main difference between heredity and evolution?',
      options: ['Heredity explains how traits change, evolution explains how traits are passed on', 'Heredity explains how traits are passed from parents to offspring, evolution explains how species change over time', 'Heredity occurs in animals, evolution occurs in plants', 'There is no difference'],
      correct: 1,
      explanation: 'Heredity is the process by which traits are passed from parents to offspring through genes, while evolution is the gradual change in the characteristics of species over several generations. Heredity provides the mechanism for passing traits, while evolution explains how these traits change over time.'
    },
    {
      question: 'What are genes and what is their relationship to chromosomes?',
      options: ['Genes are proteins, chromosomes are DNA', 'Genes are segments of DNA that code for proteins, chromosomes carry genes', 'Genes and chromosomes are the same thing', 'Genes are found in the cytoplasm, chromosomes in the nucleus'],
      correct: 1,
      explanation: 'Genes are segments of DNA that contain the instructions for making proteins, which determine our traits. Chromosomes are structures made of DNA and proteins that carry genes. Think of chromosomes as the "books" and genes as the "chapters" in those books.'
    },
    {
      question: 'According to Mendel\'s Law of Segregation, what happens during gamete formation?',
      options: ['All alleles for a trait go into the same gamete', 'The two alleles for each trait separate so each gamete carries only one allele', 'Only dominant alleles are passed to gametes', 'Only recessive alleles are passed to gametes'],
      correct: 1,
      explanation: 'Mendel\'s Law of Segregation states that during gamete formation, the two alleles for each trait separate so that each gamete carries only one allele. This ensures that offspring receive one allele from each parent for each trait.'
    },
    {
      question: 'What is the difference between dominant and recessive traits?',
      options: ['Dominant traits are always beneficial, recessive traits are harmful', 'Dominant traits are expressed only when two copies are present, recessive when one copy is present', 'Dominant traits are expressed when at least one copy is present, recessive traits only when two copies are present', 'There is no difference'],
      correct: 2,
      explanation: 'Dominant traits are expressed even when only one copy of the allele is present, while recessive traits are only expressed when two copies of the allele are present. For example, brown eyes (dominant) will be expressed even if a person has one allele for brown eyes and one for blue eyes.'
    },
    {
      question: 'What is natural selection according to Darwin?',
      options: ['The process by which humans breed animals for desirable traits', 'The process by which organisms with favorable traits survive and reproduce more successfully', 'The process by which all organisms mutate to become better', 'The process by which organisms change during their lifetime'],
      correct: 1,
      explanation: 'Natural selection is the process by which organisms with traits that are better suited to their environment tend to survive and produce more offspring. This leads to changes in the frequency of traits in a population over time, with favorable traits becoming more common.'
    },
    {
      question: 'What is speciation?',
      options: ['The extinction of species', 'The formation of new species from existing ones', 'The migration of species to new areas', 'The adaptation of species to new environments'],
      correct: 1,
      explanation: 'Speciation is the evolutionary process by which populations evolve to become distinct species. This occurs when populations of the same species become reproductively isolated and diverge genetically over time, eventually becoming unable to interbreed.'
    },
    {
      question: 'Which of the following is an example of a homologous structure?',
      options: ['Wings of birds and wings of insects', 'Flippers of whales and fins of fish', 'Human arm and bat wing', 'Eyes of humans and eyes of octopuses'],
      correct: 2,
      explanation: 'Homologous structures are similar structures in different species due to common ancestry. The human arm and bat wing are homologous because they have the same basic bone structure inherited from a common ancestor, even though they serve different functions.'
    },
    {
      question: 'What does fossil evidence show about evolution?',
      options: ['That species never change over time', 'That all organisms appeared at the same time', 'That there were no extinct species', 'That species have gradually changed over time and some have become extinct'],
      correct: 3,
      explanation: 'Fossil evidence shows that species have gradually changed over time and that many species that once existed are now extinct. Fossils provide a record of evolutionary changes, showing intermediate forms between different groups of organisms.'
    },
    {
      question: 'In a Punnett square for a monohybrid cross between two heterozygous parents (Aa x Aa), what is the expected phenotypic ratio?',
      options: ['1:1', '1:2:1', '3:1', '9:3:3:1'],
      correct: 2,
      explanation: 'In a monohybrid cross between two heterozygous parents (Aa x Aa), the expected phenotypic ratio is 3:1, with three individuals showing the dominant trait and one showing the recessive trait. The genotypic ratio is 1:2:1 (AA:Aa:aa).'
    },
    {
      question: 'What is genetic drift?',
      options: ['The movement of genes between populations', 'The process by which favorable traits become more common', 'Random changes in allele frequencies, especially in small populations', 'The process by which mutations occur'],
      correct: 2,
      explanation: 'Genetic drift is random changes in allele frequencies that occur by chance, especially in small populations. Unlike natural selection, which is driven by environmental pressures, genetic drift is a random process that can lead to significant changes in small populations.'
    }
  ]
}

export default function HeredityEvolutionModule() {
  return (
    <ModuleLayout 
      module={heredityEvolutionModule} 
      grade={10} 
      subject="Science" 
    />
  )
}