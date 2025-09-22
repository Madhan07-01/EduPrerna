import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const tissuesModule: LearningModule = {
  title: 'Tissues in Plants and Animals',
  introduction: 'Welcome to the amazing world of Tissues! Just like how different workers in a factory have specific jobs, different cells in living organisms group together to form tissues that perform special functions. Think of tissues as teams of similar cells working together like musicians in an orchestra - each section has its own role, but together they create something beautiful and functional. From the roots of a mighty oak tree to the beating of your heart, tissues are the building blocks that make complex life possible. Get ready to discover how these cellular teams make plants grow tall and animals move, think, and thrive!',
  concepts: [
    {
      title: 'Definition of Tissue and Its Role in Organisms',
      content: 'A tissue is a group of similar cells that work together to perform a specific function in an organism. Just like how workers with similar skills form departments in a company, cells with similar structures and functions group together to create tissues.',
      examples: [
        'Think of tissues as cellular teams where everyone has the same job',
        'Muscle tissue is made of muscle cells that all work together to create movement',
        'Leaf tissue is made of cells that all help with photosynthesis',
        'Tissues bridge the gap between individual cells and complete organs',
        'Different tissues combine to form organs, like how heart muscle tissue helps form the heart'
      ]
    },
    {
      title: 'Plant Tissues - Two Main Categories',
      content: 'Plants have two main categories of tissues based on their growth and function. Meristematic tissues are the growth centers, while permanent tissues are the mature, specialized tissues that perform specific functions throughout the plant\'s life.',
      examples: [
        'Meristematic tissues are like construction sites where new cells are constantly built',
        'Permanent tissues are like completed buildings that serve specific purposes',
        'Young plants have more meristematic tissue for rapid growth',
        'Mature plants have mostly permanent tissues for specialized functions',
        'Both types work together to help plants grow, survive, and reproduce'
      ]
    },
    {
      title: 'Meristematic Tissue - The Growth Centers',
      content: 'Meristematic tissues are made of young, actively dividing cells that help plants grow. These tissues are found at the tips of roots and shoots, and they\'re responsible for increasing the length and sometimes the width of plants.',
      examples: [
        'Located at root tips - helps roots grow deeper into soil',
        'Found at shoot tips - helps stems and branches grow taller',
        'Cells are small, thin-walled, and divide rapidly',
        'Like a plant\'s growth factory that never stops working',
        'Examples: Root tip meristem, shoot tip meristem, cambium (for width growth)'
      ]
    },
    {
      title: 'Permanent Tissue - The Specialized Workers',
      content: 'Permanent tissues are mature tissues that have stopped dividing and have developed specialized structures to perform specific functions. They include simple tissues (one cell type) and complex tissues (multiple cell types working together).',
      examples: [
        'Simple tissues: Parenchyma (storage), Collenchyma (support), Sclerenchyma (strength)',
        'Complex tissues: Xylem (water transport), Phloem (food transport)',
        'Parenchyma stores food and water like a plant\'s pantry',
        'Xylem acts like water pipes carrying water from roots to leaves',
        'Phloem acts like food delivery system carrying sugar from leaves to all parts'
      ]
    },
    {
      title: 'Animal Tissues - Four Main Types',
      content: 'Animals have four main types of tissues, each with specialized functions. These tissues work together like different systems in a city - each has its own job but all are essential for the organism to function properly.',
      examples: [
        'Epithelial tissue - protective covering like skin on a building',
        'Connective tissue - structural framework like the skeleton of a building',
        'Muscular tissue - movement system like elevators and moving parts',
        'Nervous tissue - communication system like electrical wiring and internet',
        'All four types work together to keep animals healthy and functioning'
      ]
    },
    {
      title: 'Epithelial Tissue - The Protective Barriers',
      content: 'Epithelial tissue forms protective coverings and linings throughout the body. It acts like a security barrier, protecting internal organs from damage and controlling what substances can enter or leave the body.',
      examples: [
        'Skin epithelium protects body from external environment',
        'Stomach lining epithelium protects from digestive acids',
        'Lung epithelium allows gas exchange while protecting delicate air sacs',
        'Intestinal epithelium absorbs nutrients while blocking harmful substances',
        'Forms continuous sheets with cells tightly packed together like tiles'
      ]
    },
    {
      title: 'Connective Tissue - The Body\'s Framework',
      content: 'Connective tissue provides structural support, connects different parts of the body, and often stores materials or transports substances. It\'s like the framework and infrastructure that holds everything together.',
      examples: [
        'Bone tissue provides rigid support like steel beams in a building',
        'Cartilage provides flexible support like cushions in joints',
        'Blood tissue transports materials like a delivery system throughout body',
        'Fat tissue stores energy and provides insulation like building insulation',
        'Tendons connect muscles to bones like cables connecting parts'
      ]
    },
    {
      title: 'Muscular Tissue - The Movement Makers',
      content: 'Muscular tissue is specialized for contraction and movement. Different types of muscle tissue create different kinds of movement, from the beating of your heart to the movement of your arms and legs.',
      examples: [
        'Skeletal muscle moves bones and creates voluntary movements like walking',
        'Cardiac muscle pumps blood through the heart continuously',
        'Smooth muscle creates involuntary movements in organs like stomach churning',
        'All muscle cells can contract (shorten) and relax (lengthen)',
        'Muscle tissue is rich in proteins that slide past each other to create movement'
      ]
    },
    {
      title: 'Nervous Tissue - The Communication Network',
      content: 'Nervous tissue is specialized for receiving, processing, and transmitting information throughout the body. It acts like the body\'s electrical and communication system, coordinating all activities.',
      examples: [
        'Brain tissue processes information and makes decisions like a computer',
        'Spinal cord tissue carries messages between brain and body',
        'Nerve tissue carries electrical signals like telephone wires',
        'Neurons (nerve cells) can transmit signals over long distances very quickly',
        'Sensory neurons detect changes, motor neurons control movement'
      ]
    },
    {
      title: 'Importance of Tissues in Living Organisms',
      content: 'Tissues are essential for life because they allow organisms to be more efficient and complex. By grouping similar cells together, organisms can perform specialized functions while maintaining organization and coordination.',
      examples: [
        'Division of labor - different tissues handle different jobs efficiently',
        'Multicellular organization allows for larger, more complex organisms',
        'Tissue specialization enables advanced functions like thinking and flying',
        'Tissue cooperation allows organs and organ systems to work together',
        'Tissue repair and regeneration help organisms heal from injuries',
        'Without tissues, complex life forms like plants and animals couldn\'t exist'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the definition of a tissue?',
      options: ['A single cell that performs multiple functions', 'A group of similar cells working together to perform a specific function', 'An organ made of different cell types', 'A complete organism'],
      correct: 1,
      explanation: 'A tissue is a group of similar cells that work together to perform a specific function, like how workers with similar skills form departments in a company.'
    },
    {
      question: 'What are the two main categories of plant tissues?',
      options: ['Simple and complex', 'Xylem and phloem', 'Meristematic and permanent', 'Parenchyma and sclerenchyma'],
      correct: 2,
      explanation: 'The two main categories of plant tissues are meristematic tissues (actively dividing growth tissues) and permanent tissues (mature, specialized tissues).'
    },
    {
      question: 'Where are meristematic tissues typically found in plants?',
      options: ['Only in leaves', 'At the tips of roots and shoots', 'Only in flowers', 'Throughout the entire plant equally'],
      correct: 1,
      explanation: 'Meristematic tissues are found at the tips of roots and shoots, where active cell division occurs to promote plant growth in length.'
    },
    {
      question: 'Which plant tissue is responsible for transporting water from roots to leaves?',
      options: ['Phloem', 'Parenchyma', 'Xylem', 'Collenchyma'],
      correct: 2,
      explanation: 'Xylem tissue transports water and minerals from roots to leaves, acting like water pipes in the plant\'s transport system.'
    },
    {
      question: 'How many main types of animal tissues are there?',
      options: ['Two', 'Three', 'Four', 'Five'],
      correct: 2,
      explanation: 'There are four main types of animal tissues: epithelial, connective, muscular, and nervous tissues, each with specialized functions.'
    },
    {
      question: 'What is the primary function of epithelial tissue?',
      options: ['Movement', 'Support', 'Protection and covering', 'Communication'],
      correct: 2,
      explanation: 'Epithelial tissue primarily functions as protective covering and lining, forming barriers that protect internal organs and control substance movement.'
    },
    {
      question: 'Which type of connective tissue transports materials throughout the body?',
      options: ['Bone', 'Cartilage', 'Blood', 'Fat'],
      correct: 2,
      explanation: 'Blood is a connective tissue that transports oxygen, nutrients, hormones, and waste products throughout the body via circulation.'
    },
    {
      question: 'Which type of muscle tissue is found in the heart?',
      options: ['Skeletal muscle', 'Cardiac muscle', 'Smooth muscle', 'Voluntary muscle'],
      correct: 1,
      explanation: 'Cardiac muscle is the specialized muscle tissue found in the heart that contracts rhythmically to pump blood throughout the body.'
    },
    {
      question: 'What is the main function of nervous tissue?',
      options: ['Protection', 'Movement', 'Support', 'Communication and information processing'],
      correct: 3,
      explanation: 'Nervous tissue specializes in receiving, processing, and transmitting information throughout the body, acting as the body\'s communication network.'
    },
    {
      question: 'Why are tissues important for living organisms?',
      options: ['They make organisms smaller', 'They allow for specialization and efficiency', 'They reduce the number of cells needed', 'They eliminate the need for organs'],
      correct: 1,
      explanation: 'Tissues are important because they allow for specialization and division of labor, enabling organisms to perform complex functions efficiently while maintaining organization.'
    }
  ]
}

export default function TissuesModule() {
  return (
    <ModuleLayout 
      module={tissuesModule} 
      grade={8} 
      subject="Science" 
    />
  )
}