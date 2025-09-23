import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const cellStructureFunctionModule: LearningModule = {
  title: 'Cell Structure and Function',
  introduction: 'Welcome to the incredible microscopic world of Cells! Every living thing around you - from the tiniest bacteria to the largest whale, from a single blade of grass to towering trees - is made up of amazing little structures called cells. You are made of trillions of cells working together like a perfectly organized city! Cells are like tiny factories, each with special parts that have important jobs to keep life going. Get ready to explore these building blocks of life and discover how they make everything living possible!',
  concepts: [
    {
      title: 'Definition of a Cell - The Basic Unit of Life',
      content: 'A cell is the smallest structural and functional unit of all living organisms. Just like a brick is the basic building block of a house, cells are the basic building blocks of all life. Every living thing is made up of one or more cells.',
      examples: [
        'Think of cells as tiny rooms where all life activities happen',
        'Cells can exist as single units (like bacteria) or in groups (like in your body)',
        'All cells carry out basic life processes: nutrition, respiration, growth, reproduction',
        'Cells are so small that millions can fit on the head of a pin',
        'Robert Hooke first discovered cells in 1665 by looking at cork under a microscope'
      ]
    },
    {
      title: 'Unicellular vs Multicellular Organisms',
      content: 'Organisms can be classified based on the number of cells they have. Unicellular organisms consist of just one cell that performs all life functions, while multicellular organisms are made up of many cells working together.',
      examples: [
        'Unicellular: Bacteria, amoeba, paramecium - entire organism is just one cell',
        'Multicellular: Humans, animals, plants, fungi - made of many specialized cells',
        'A single amoeba can move, eat, and reproduce all by itself',
        'In your body, different cells have different jobs: muscle cells for movement, nerve cells for signals',
        'Humans have about 37 trillion cells working together as one organism'
      ]
    },
    {
      title: 'Prokaryotic Cells - Simple but Efficient',
      content: 'Prokaryotic cells are the simpler type of cells that do not have a membrane-bound nucleus. Their genetic material floats freely in the cytoplasm. These cells are typically smaller and have a simpler internal structure.',
      examples: [
        'Bacteria and archaea are prokaryotic organisms',
        'No nucleus - DNA floats freely in the cell like papers scattered on a desk',
        'Smaller and simpler structure compared to eukaryotic cells',
        'Cell wall provides structure and protection',
        'Some have flagella (whip-like structures) for movement like tiny propellers'
      ]
    },
    {
      title: 'Eukaryotic Cells - Complex and Organized',
      content: 'Eukaryotic cells are more complex cells that have a membrane-bound nucleus containing their genetic material. They also have various specialized organelles that perform specific functions, like different departments in a company.',
      examples: [
        'Plants, animals, fungi, and protists have eukaryotic cells',
        'Nucleus acts like the control center or headquarters of the cell',
        'DNA is safely stored inside the nucleus like important documents in a vault',
        'Multiple specialized organelles work together like different factory departments',
        'Generally larger and more complex than prokaryotic cells'
      ]
    },
    {
      title: 'Cell Membrane - The Protective Gateway',
      content: 'The cell membrane is a flexible barrier that surrounds all cells, controlling what enters and leaves the cell. It\'s like a smart security guard that decides who can come in and who must stay out.',
      examples: [
        'Made of a double layer of molecules called phospholipids',
        'Selectively permeable - allows some substances in while keeping others out',
        'Like a fence with gates that open and close for different materials',
        'Lets oxygen and nutrients in, keeps harmful substances out',
        'Maintains cell shape and protects the internal environment'
      ]
    },
    {
      title: 'Nucleus - The Control Center',
      content: 'The nucleus is like the brain or control center of eukaryotic cells. It contains the cell\'s DNA, which holds all the instructions for how the cell should function, grow, and reproduce.',
      examples: [
        'Contains chromosomes made of DNA - the cell\'s instruction manual',
        'Controls all cell activities like a manager directing workers',
        'Surrounded by nuclear membrane with pores for communication',
        'Nuclear pores act like doors allowing messages to pass in and out',
        'The nucleolus inside makes ribosomes - the protein-making machines'
      ]
    },
    {
      title: 'Mitochondria - The Cellular Power Plants',
      content: 'Mitochondria are the powerhouses of the cell, converting food molecules into energy (ATP) that the cell can use. They\'re like tiny power plants generating electricity for a city.',
      examples: [
        'Break down glucose and oxygen to produce ATP (cellular energy)',
        'Have their own DNA, suggesting they were once independent organisms',
        'Muscle cells have many mitochondria because they need lots of energy',
        'Often called the "powerhouse of the cell" for their energy production',
        'Have a folded inner membrane to increase surface area for energy production'
      ]
    },
    {
      title: 'Chloroplasts - The Solar Panels of Plant Cells',
      content: 'Chloroplasts are special organelles found only in plant cells and some algae. They capture sunlight and convert it into food through photosynthesis, making plants the food producers of our planet.',
      examples: [
        'Contain chlorophyll - the green pigment that captures sunlight',
        'Convert carbon dioxide and water into glucose using solar energy',
        'Only found in plant cells, not in animal cells',
        'Give plants their green color due to chlorophyll',
        'Have stacks of membranes called thylakoids where photosynthesis occurs'
      ]
    },
    {
      title: 'Ribosomes - The Protein Factories',
      content: 'Ribosomes are tiny structures that make proteins by reading instructions from DNA. They\'re like factories that assemble products (proteins) according to specific blueprints (genetic code).',
      examples: [
        'Found in both prokaryotic and eukaryotic cells',
        'Can be free-floating in cytoplasm or attached to endoplasmic reticulum',
        'Read messenger RNA to assemble amino acids into proteins',
        'Like workers following a recipe to build protein molecules',
        'Essential for cell growth, repair, and function'
      ]
    },
    {
      title: 'Key Differences Between Plant and Animal Cells',
      content: 'While plant and animal cells share many similarities as eukaryotic cells, they have several important differences that reflect their different lifestyles and needs.',
      examples: [
        'Plant cells have cell walls for extra support; animal cells do not',
        'Plant cells have chloroplasts for photosynthesis; animal cells do not',
        'Plant cells have large central vacuoles for storage; animal cells have small vacuoles',
        'Animal cells can change shape easily; plant cells are more rigid',
        'Plant cells are generally rectangular; animal cells are more rounded',
        'Both have nucleus, mitochondria, and cell membrane'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the definition of a cell?',
      options: ['The largest unit of life', 'The smallest structural and functional unit of life', 'A type of tissue', 'An organ system'],
      correct: 1,
      explanation: 'A cell is the smallest structural and functional unit of all living organisms. Just like a brick is the basic building block of a house, cells are the basic building blocks of all life.'
    },
    {
      question: 'What is the main difference between unicellular and multicellular organisms?',
      options: ['Unicellular organisms are larger', 'Unicellular organisms are made of one cell, multicellular are made of many cells', 'Multicellular organisms are simpler', 'There is no difference'],
      correct: 1,
      explanation: 'Unicellular organisms consist of just one cell that performs all life functions (like bacteria), while multicellular organisms are made up of many cells working together (like humans and plants).'
    },
    {
      question: 'What is the main characteristic of prokaryotic cells?',
      options: ['They have a nucleus', 'They lack a membrane-bound nucleus', 'They are only found in plants', 'They are larger than eukaryotic cells'],
      correct: 1,
      explanation: 'Prokaryotic cells lack a membrane-bound nucleus. Their genetic material (DNA) floats freely in the cytoplasm instead of being enclosed in a nucleus.'
    },
    {
      question: 'Which type of organisms have eukaryotic cells?',
      options: ['Only bacteria', 'Only viruses', 'Plants, animals, fungi, and protists', 'Only single-celled organisms'],
      correct: 2,
      explanation: 'Plants, animals, fungi, and protists all have eukaryotic cells. These cells have a membrane-bound nucleus and specialized organelles.'
    },
    {
      question: 'What is the main function of the cell membrane?',
      options: ['To make proteins', 'To control what enters and leaves the cell', 'To store DNA', 'To produce energy'],
      correct: 1,
      explanation: 'The cell membrane controls what enters and leaves the cell. It\'s selectively permeable, acting like a security guard that allows some substances in while keeping others out.'
    },
    {
      question: 'What is often called the "control center" of the cell?',
      options: ['Mitochondria', 'Ribosome', 'Nucleus', 'Cell membrane'],
      correct: 2,
      explanation: 'The nucleus is often called the control center of the cell because it contains the cell\'s DNA and controls all cell activities, like a manager directing workers.'
    },
    {
      question: 'Why are mitochondria called the "powerhouses" of the cell?',
      options: ['They control cell division', 'They make proteins', 'They produce energy (ATP) for the cell', 'They store genetic material'],
      correct: 2,
      explanation: 'Mitochondria are called powerhouses because they convert food molecules into ATP (cellular energy) that the cell can use, like power plants generating electricity for a city.'
    },
    {
      question: 'Which organelle is found only in plant cells and is responsible for photosynthesis?',
      options: ['Nucleus', 'Mitochondria', 'Ribosomes', 'Chloroplasts'],
      correct: 3,
      explanation: 'Chloroplasts are found only in plant cells and some algae. They contain chlorophyll and are responsible for photosynthesis, converting sunlight into food.'
    },
    {
      question: 'What is the main function of ribosomes?',
      options: ['To produce energy', 'To control the cell', 'To make proteins', 'To store water'],
      correct: 2,
      explanation: 'Ribosomes are the protein factories of the cell. They read instructions from DNA and assemble amino acids into proteins according to the genetic code.'
    },
    {
      question: 'Which structure is present in plant cells but NOT in animal cells?',
      options: ['Nucleus', 'Cell membrane', 'Cell wall', 'Mitochondria'],
      correct: 2,
      explanation: 'Cell walls are present in plant cells but not in animal cells. Cell walls provide extra structural support and protection, making plant cells more rigid than animal cells.'
    }
  ]
}

export default function CellStructureFunctionModule() {
  return (
    <ModuleLayout 
      module={cellStructureFunctionModule} 
      grade={8} 
      subject="Science" 
    />
  )
}