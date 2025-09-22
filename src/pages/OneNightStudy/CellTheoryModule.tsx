import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const cellTheoryModule: LearningModule = {
  title: 'The Fundamental Unit of Life – Cell Theory',
  introduction: 'Welcome to the extraordinary world of Cell Theory! Every living thing around you - from the tiniest bacteria to the largest whale, from the grass beneath your feet to the neurons in your brain - shares one fundamental truth: they are all made of cells! The discovery of cells revolutionized our understanding of life itself and laid the foundation for all modern biology. Cell Theory is one of the most important scientific theories ever developed, explaining how life works at its most basic level. Get ready to explore the incredible journey of discovery that revealed the secrets of life\'s building blocks and learn how these microscopic structures create the amazing diversity of life on Earth!',
  concepts: [
    {
      title: 'Historical Pioneers in Cell Discovery',
      content: 'The discovery of cells involved many brilliant scientists over several centuries. Each contribution built upon previous work, gradually revealing the fundamental nature of life at the microscopic level.',
      examples: [
        'Robert Hooke (1665): First to observe and name "cells" while studying cork under a microscope',
        'Anton van Leeuwenhoek (1670s): "Father of Microbiology" - first to observe living cells, bacteria, and protozoa',
        'Matthias Schleiden (1838): German botanist who proposed that all plants are made of cells',
        'Theodor Schwann (1839): German zoologist who extended cell theory to animals',
        'Rudolf Virchow (1855): Added "all cells come from pre-existing cells" - cells don\'t spontaneously appear'
      ]
    },
    {
      title: 'The Three Classical Tenets of Cell Theory',
      content: 'Cell Theory consists of three fundamental principles that describe the basic properties of life. These principles revolutionized biology and remain the foundation of life sciences today.',
      examples: [
        '1st Tenet: All living things are composed of one or more cells',
        '2nd Tenet: The cell is the basic unit of structure and function in living organisms',
        '3rd Tenet: All cells arise from pre-existing cells (no spontaneous generation)',
        'Example of 1st: Humans have trillions of cells, bacteria have just one cell',
        'Example of 2nd: Even a single cell can perform all life functions (nutrition, reproduction, growth)',
        'Example of 3rd: When you get a cut, new skin cells come from existing skin cells dividing'
      ]
    },
    {
      title: 'Modern Extensions to Cell Theory',
      content: 'As science advanced, additional principles were added to the classical cell theory, incorporating discoveries about genetics, energy, and cellular biochemistry.',
      examples: [
        '4th Principle: Cells contain hereditary information (DNA) that is passed from cell to cell during division',
        '5th Principle: All cells have the same basic chemical composition and metabolic processes',
        '6th Principle: Energy flow (metabolism and biochemistry) occurs within cells',
        'DNA example: Every cell in your body contains the same genetic instructions',
        'Metabolism example: All cells use glucose for energy through similar chemical pathways',
        'These additions connect cell theory to genetics, biochemistry, and evolution'
      ]
    },
    {
      title: 'Prokaryotic Cells - Simple but Successful',
      content: 'Prokaryotic cells are the simpler type of cells, lacking a membrane-bound nucleus and organelles. Despite their simplicity, they are incredibly successful and represent the most abundant form of life on Earth.',
      examples: [
        'Definition: Cells without a membrane-bound nucleus (pro = before, karyon = nucleus)',
        'Examples: Bacteria and archaea (single-celled microorganisms)',
        'Structure: Cell wall, cell membrane, cytoplasm, ribosomes, nucleoid region',
        'Nucleoid: Region where DNA is located, not enclosed by membrane',
        'Advantages: Simple structure allows rapid reproduction and adaptation',
        'Success: Bacteria exist everywhere - soil, water, air, inside other organisms'
      ]
    },
    {
      title: 'Eukaryotic Cells - Complex and Compartmentalized',
      content: 'Eukaryotic cells are more complex cells with a membrane-bound nucleus and specialized organelles. This complexity allows for more sophisticated cellular functions and multicellular organization.',
      examples: [
        'Definition: Cells with a membrane-bound nucleus (eu = true, karyon = nucleus)',
        'Examples: Plant cells, animal cells, fungal cells, protist cells',
        'Key feature: Compartmentalization - different organelles perform different functions',
        'Nucleus: Control center containing DNA in chromosomes',
        'Advantages: Specialization allows complex multicellular organisms',
        'Evolution: Eukaryotic cells evolved from prokaryotic cells about 2 billion years ago'
      ]
    },
    {
      title: 'Essential Cell Components and Their Functions',
      content: 'All cells, whether prokaryotic or eukaryotic, share certain essential components that are necessary for life. Understanding these components helps us understand how life functions at the cellular level.',
      examples: [
        'Cell membrane: Controls what enters and exits the cell (selective permeability)',
        'Cytoplasm: Gel-like substance where cellular activities occur',
        'Ribosomes: Protein-making factories found in all cells',
        'DNA/Genetic material: Contains instructions for cell function and reproduction',
        'Enzymes: Special proteins that speed up chemical reactions in cells',
        'These components work together to maintain life processes'
      ]
    },
    {
      title: 'Specialized Organelles in Eukaryotic Cells',
      content: 'Eukaryotic cells contain specialized organelles, each with specific functions. This division of labor allows eukaryotic cells to perform complex tasks efficiently.',
      examples: [
        'Nucleus: Controls cell activities, contains DNA and chromosomes',
        'Mitochondria: "Powerhouses" that produce energy (ATP) for the cell',
        'Endoplasmic Reticulum: Network for protein and lipid synthesis',
        'Golgi apparatus: Packages and ships proteins made by ribosomes',
        'Lysosomes: "Cleanup crew" that digest waste and worn-out organelles',
        'Plant-specific: Chloroplasts (photosynthesis), cell wall (support), large vacuole (storage)'
      ]
    },
    {
      title: 'Cells and Life Processes',
      content: 'Cells are responsible for all life processes, whether in single-celled or multicellular organisms. Understanding how cells carry out life functions helps us understand how all living things survive and thrive.',
      examples: [
        'Metabolism: Cells break down food and produce energy for life activities',
        'Growth: Cells increase in size and number to allow organisms to grow',
        'Reproduction: Cells divide to create new organisms or repair tissues',
        'Response: Cells detect and respond to environmental changes',
        'Homeostasis: Cells maintain stable internal conditions despite external changes',
        'Single-celled: One cell does everything; Multicellular: Cells specialize for different functions'
      ]
    },
    {
      title: 'Cell Division - Creating New Cells',
      content: 'Cell division is the process by which cells reproduce to create new cells. There are two main types of cell division, each serving different purposes in living organisms.',
      examples: [
        'Mitosis: Division that produces two identical diploid cells for growth and repair',
        'Meiosis: Division that produces four genetically different gametes for reproduction',
        'Mitosis purpose: Replace worn-out cells, heal injuries, allow organisms to grow',
        'Meiosis purpose: Create sex cells (sperm and eggs) for sexual reproduction',
        'Mitosis result: 2 cells with same number of chromosomes as parent',
        'Meiosis result: 4 cells with half the chromosomes of parent (genetic diversity)'
      ]
    },
    {
      title: 'The Significance of Cell Theory in Modern Biology',
      content: 'Cell Theory provides the foundation for understanding all of biology, from medical research to biotechnology. Its principles guide scientific research and practical applications that benefit humanity.',
      examples: [
        'Medicine: Understanding diseases at cellular level leads to better treatments',
        'Cancer research: Studying how normal cells become cancerous cells',
        'Stem cell therapy: Using cells\' ability to differentiate for medical treatments',
        'Biotechnology: Using cellular processes to produce medicines and food',
        'Evolution: Cells provide evidence for common ancestry of all life',
        'Environmental science: Understanding how pollutants affect cellular processes'
      ]
    }
  ],
  mcqs: [
    {
      question: 'Who was the first scientist to observe and name "cells"?',
      options: ['Anton van Leeuwenhoek', 'Robert Hooke', 'Matthias Schleiden', 'Theodor Schwann'],
      correct: 1,
      explanation: 'Robert Hooke was the first to observe and name "cells" in 1665 while studying cork under a microscope. He named them "cells" because they reminded him of small rooms or cells in a monastery.'
    },
    {
      question: 'Which scientist is known as the "Father of Microbiology"?',
      options: ['Robert Hooke', 'Anton van Leeuwenhoek', 'Rudolf Virchow', 'Matthias Schleiden'],
      correct: 1,
      explanation: 'Anton van Leeuwenhoek is known as the "Father of Microbiology" because he was the first to observe living cells, bacteria, and protozoa using his handcrafted microscopes in the 1670s.'
    },
    {
      question: 'What are the three classical tenets of Cell Theory?',
      options: ['Cells have DNA, cells reproduce, cells use energy', 'All living things are made of cells, cells are the basic unit of life, all cells come from existing cells', 'Cells have organelles, cells have membranes, cells have cytoplasm', 'Cells are small, cells are numerous, cells are important'],
      correct: 1,
      explanation: 'The three classical tenets are: (1) All living things are composed of cells, (2) The cell is the basic unit of life, and (3) All cells arise from pre-existing cells.'
    },
    {
      question: 'What is the main difference between prokaryotic and eukaryotic cells?',
      options: ['Size difference', 'Prokaryotic cells have a membrane-bound nucleus, eukaryotic cells do not', 'Eukaryotic cells have a membrane-bound nucleus, prokaryotic cells do not', 'Prokaryotic cells are found in plants, eukaryotic cells in animals'],
      correct: 2,
      explanation: 'The main difference is that eukaryotic cells have a membrane-bound nucleus containing their DNA, while prokaryotic cells have their DNA freely floating in the cytoplasm without a membrane around it.'
    },
    {
      question: 'Which of the following are examples of prokaryotic cells?',
      options: ['Plant and animal cells', 'Bacteria and archaea', 'Fungi and protists', 'Human and tree cells'],
      correct: 1,
      explanation: 'Bacteria and archaea are prokaryotic cells - they lack a membrane-bound nucleus. Plants, animals, fungi, and protists are all eukaryotic organisms.'
    },
    {
      question: 'What is the function of mitochondria in eukaryotic cells?',
      options: ['Control cell activities', 'Make proteins', 'Produce energy (ATP)', 'Store genetic material'],
      correct: 2,
      explanation: 'Mitochondria are known as the "powerhouses" of the cell because they produce ATP (energy) that the cell needs for all its activities through the process of cellular respiration.'
    },
    {
      question: 'Which organelle contains the genetic material (DNA) in eukaryotic cells?',
      options: ['Mitochondria', 'Ribosomes', 'Nucleus', 'Golgi apparatus'],
      correct: 2,
      explanation: 'The nucleus contains the cell\'s DNA organized into chromosomes. It acts as the control center of the cell, directing all cellular activities.'
    },
    {
      question: 'What is the main purpose of mitosis?',
      options: ['Produce sex cells', 'Create genetic diversity', 'Growth and repair of tissues', 'Reduce chromosome number'],
      correct: 2,
      explanation: 'Mitosis produces two identical diploid cells for growth and repair of tissues. It allows organisms to grow larger and replace damaged or worn-out cells.'
    },
    {
      question: 'How many cells are produced at the end of meiosis?',
      options: ['2 identical cells', '4 identical cells', '2 different cells', '4 genetically different cells'],
      correct: 3,
      explanation: 'Meiosis produces four genetically different gametes (sex cells) with half the chromosome number of the parent cell, which is important for sexual reproduction and genetic diversity.'
    },
    {
      question: 'According to modern cell theory, what do all cells contain that is passed from cell to cell during division?',
      options: ['Proteins', 'Hereditary information (DNA)', 'Energy', 'Water'],
      correct: 1,
      explanation: 'Modern cell theory includes the principle that all cells contain hereditary information (DNA) that is passed from cell to cell during division, ensuring genetic continuity.'
    }
  ]
}

export default function CellTheoryModule() {
  return (
    <ModuleLayout 
      module={cellTheoryModule} 
      grade={9} 
      subject="Science" 
    />
  )
}