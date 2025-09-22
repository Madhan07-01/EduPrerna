import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const lifeProcessesModule: LearningModule = {
  title: 'Life Processes',
  introduction: 'Welcome to the incredible world of Life Processes! As a 10th-grade student, you\'re ready to dive deep into understanding how living organisms survive and thrive. Life processes are the essential activities that all living things must perform to stay alive. In this module, we\'ll explore four critical life processes: Nutrition (how organisms obtain food), Respiration (how they release energy), Transportation (how materials move within organisms), and Excretion (how waste is removed). By the end of this module, you\'ll have a comprehensive understanding of how these processes work together to sustain life, from tiny single-celled organisms to complex multicellular beings like humans.',
  concepts: [
    {
      title: 'Nutrition - How Organisms Obtain and Utilize Food',
      content: 'Nutrition is the process by which organisms obtain and utilize food materials for energy, growth, and maintenance. Different organisms have evolved various strategies to obtain nutrition, which can be broadly classified into autotrophic and heterotrophic nutrition.',
      examples: [
        'Autotrophic Nutrition: Organisms that make their own food using simple inorganic substances',
        'Examples: Green plants, algae, and some bacteria that perform photosynthesis',
        'Process: CO₂ + H₂O + sunlight → glucose + O₂ (in presence of chlorophyll)',
        'Heterotrophic Nutrition: Organisms that depend on other organisms for food',
        'Examples: Animals, fungi, and most bacteria',
        'Types: Holozoic (ingesting solid food), Saprophytic (feeding on dead organic matter), and Parasitic (living on/in another organism)'
      ]
    },
    {
      title: 'Autotrophic Nutrition - Making Food from Simple Substances',
      content: 'Autotrophic nutrition is the process where organisms synthesize their own food from simple inorganic materials. This is primarily done through photosynthesis in plants and chemosynthesis in some bacteria.',
      examples: [
        'Photosynthesis: Occurs in chloroplasts containing chlorophyll',
        'Requirements: Sunlight, carbon dioxide, water, and chlorophyll',
        'Equation: 6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂',
        'Site: Chloroplasts in leaf cells, specifically in the mesophyll tissue',
        'Factors affecting rate: Light intensity, CO₂ concentration, temperature, and water availability',
        'Importance: Provides food for all heterotrophs and produces oxygen for respiration'
      ]
    },
    {
      title: 'Heterotrophic Nutrition - Dependence on Other Organisms',
      content: 'Heterotrophic nutrition involves organisms obtaining ready-made food from other organisms. This type of nutrition is essential for animals and many microorganisms that cannot produce their own food.',
      examples: [
        'Holozoic nutrition: Ingestion of solid food (most animals including humans)',
        'Steps: Ingestion → Digestion → Absorption → Assimilation → Egestion',
        'Saprophytic nutrition: Feeding on dead and decaying organic matter (fungi, some bacteria)',
        'Parasitic nutrition: Living on or in another organism (tapeworm, mistletoe)',
        'Symbiotic nutrition: Mutual benefit relationship (lichens, mycorrhizae)',
        'Examples: Humans eating plants/animals, mushrooms decomposing logs, tapeworms in intestines'
      ]
    },
    {
      title: 'Respiration - Releasing Energy from Food',
      content: 'Respiration is the biochemical process in which food molecules (mainly glucose) are broken down to release energy for cellular activities. This process occurs in all living cells and is essential for life.',
      examples: [
        'Aerobic Respiration: Occurs in presence of oxygen, most efficient energy production',
        'Equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP (energy)',
        'Site: Mitochondria (powerhouse of the cell)',
        'Anaerobic Respiration: Occurs without oxygen, less efficient energy production',
        'In muscles: C₆H₁₂O₆ → 2C₃H₆O₃ (lactic acid) + less ATP',
        'In yeast: C₆H₁₂O₆ → 2C₂H₅OH (alcohol) + 2CO₂ + less ATP'
      ]
    },
    {
      title: 'Aerobic Respiration - Oxygen-Dependent Energy Production',
      content: 'Aerobic respiration is the most efficient way to produce energy from glucose. It requires oxygen and occurs in the mitochondria of cells. This process produces significantly more ATP (energy currency) than anaerobic respiration.',
      examples: [
        'Three stages: Glycolysis (in cytoplasm), Krebs cycle (mitochondrial matrix), Electron transport chain (inner mitochondrial membrane)',
        'Glycolysis: Glucose breaks down into two pyruvate molecules (net gain of 2 ATP)',
        'Krebs cycle: Pyruvate completely oxidized, producing CO₂, NADH, FADH₂, and 2 ATP',
        'Electron transport chain: NADH and FADH₂ produce maximum ATP (about 34 ATP)',
        'Total ATP yield: About 38 ATP molecules per glucose molecule',
        'End products: CO₂ (exhaled) and H₂O (used in cellular processes)'
      ]
    },
    {
      title: 'Anaerobic Respiration - Energy Production Without Oxygen',
      content: 'Anaerobic respiration occurs when oxygen is not available or in limited supply. While less efficient than aerobic respiration, it allows organisms to produce some energy in emergency situations.',
      examples: [
        'In human muscles during intense exercise when oxygen supply is insufficient',
        'Results in lactic acid accumulation causing muscle fatigue and cramps',
        'In yeast during fermentation for bread making and alcohol production',
        'Produces only 2 ATP molecules per glucose molecule (compared to 38 in aerobic)',
        'End products vary: Lactic acid in muscles, ethanol and CO₂ in yeast',
        'Temporary solution: Organisms switch back to aerobic when oxygen becomes available'
      ]
    },
    {
      title: 'Transportation in Plants - Moving Materials Throughout',
      content: 'Plants have specialized tissues to transport water, minerals, and food throughout the plant body. This transportation system ensures all parts of the plant receive necessary materials for survival and growth.',
      examples: [
        'Xylem: Transports water and minerals from roots to leaves (upward movement)',
        'Phloem: Transports food (sugars) from leaves to other parts (bidirectional movement)',
        'Transpiration: Loss of water vapor through stomata, creates suction for water uptake',
        'Root pressure: Pushes water up from roots (especially at night)',
        'Translocation: Movement of food materials in phloem from source to sink',
        'Structure-function relationship: Hollow xylem vessels and sieve tubes in phloem facilitate transport'
      ]
    },
    {
      title: 'Transportation in Humans - The Circulatory System',
      content: 'The human circulatory system is a complex network that transports oxygen, nutrients, hormones, and waste products throughout the body. It consists of the heart, blood vessels, and blood.',
      examples: [
        'Heart: Four-chambered muscular pump (right atrium, right ventricle, left atrium, left ventricle)',
        'Blood vessels: Arteries (carry blood away from heart), veins (carry blood to heart), capillaries (exchange site)',
        'Double circulation: Pulmonary (heart-lungs-heart) and systemic (heart-body-heart) circuits',
        'Pulmonary circulation: Deoxygenated blood to lungs for oxygenation, returns as oxygenated blood',
        'Systemic circulation: Oxygenated blood to body tissues, returns as deoxygenated blood',
        'Blood components: Red blood cells (oxygen transport), white blood cells (immunity), platelets (clotting), plasma (transport medium)'
      ]
    },
    {
      title: 'Excretion in Plants - Removing Waste Products',
      content: 'Plants produce various waste products during metabolic activities and have developed several mechanisms to eliminate them. Unlike animals, plants do not have a specialized excretory system.',
      examples: [
        'Oxygen: Released during photosynthesis as a waste product',
        'Carbon dioxide: Released during respiration',
        'Excess water: Lost through transpiration via stomata',
        'Resins and gums: Stored in old xylem or secreted',
        'Tannins and alkaloids: Stored in leaves or bark and shed periodically',
        'Special mechanisms: Some plants store waste in vacuoles or specialized cells'
      ]
    },
    {
      title: 'Excretion in Humans - The Excretory System',
      content: 'The human excretory system removes metabolic waste products from the body to maintain homeostasis. The kidneys are the primary excretory organs, but lungs, skin, and liver also play roles.',
      examples: [
        'Kidneys: Filter blood to remove nitrogenous wastes (urea, uric acid, creatinine)',
        'Nephrons: Functional units of kidneys where filtration occurs',
        'Urine formation: Glomerular filtration, selective reabsorption, tubular secretion',
        'Lungs: Remove CO₂ and water vapor during exhalation',
        'Skin: Eliminates water, salts, and small amounts of urea through sweat',
        'Liver: Converts toxic ammonia to less toxic urea for excretion by kidneys'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the main difference between autotrophic and heterotrophic nutrition?',
      options: ['Autotrophs eat plants, heterotrophs eat animals', 'Autotrophs make their own food, heterotrophs depend on others for food', 'Autotrophs live in water, heterotrophs live on land', 'Autotrophs are animals, heterotrophs are plants'],
      correct: 1,
      explanation: 'Autotrophic organisms (like green plants) can synthesize their own food from simple inorganic substances, while heterotrophic organisms (like animals) depend on other organisms for their food requirements.'
    },
    {
      question: 'Which of the following is the correct equation for photosynthesis?',
      options: ['C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', '6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂', 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂', 'C₆H₁₂O₆ → 2C₃H₆O₃'],
      correct: 1,
      explanation: 'The correct equation for photosynthesis is 6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂. Carbon dioxide and water, in the presence of sunlight and chlorophyll, produce glucose and oxygen.'
    },
    {
      question: 'Where does aerobic respiration occur in a cell?',
      options: ['Nucleus', 'Cytoplasm', 'Mitochondria', 'Chloroplast'],
      correct: 2,
      explanation: 'Aerobic respiration occurs in the mitochondria, which are often called the "powerhouses of the cell" because they produce most of the ATP (energy) needed for cellular activities.'
    },
    {
      question: 'What is the main difference between aerobic and anaerobic respiration?',
      options: ['Aerobic produces more energy than anaerobic', 'Anaerobic occurs only in animals', 'Aerobic produces lactic acid', 'There is no difference'],
      correct: 0,
      explanation: 'Aerobic respiration produces significantly more energy (about 38 ATP molecules) compared to anaerobic respiration (only 2 ATP molecules) because glucose is completely oxidized in the presence of oxygen.'
    },
    {
      question: 'Which plant tissue is responsible for transporting food materials?',
      options: ['Xylem', 'Phloem', 'Cambium', 'Epidermis'],
      correct: 1,
      explanation: 'Phloem is responsible for transporting food materials (sugars) produced in the leaves to other parts of the plant. This process is called translocation and can occur in both upward and downward directions.'
    },
    {
      question: 'In the human circulatory system, which blood vessels carry blood away from the heart?',
      options: ['Veins', 'Capillaries', 'Arteries', 'Lymph vessels'],
      correct: 2,
      explanation: 'Arteries carry oxygenated blood away from the heart to various parts of the body. They have thick, muscular walls to withstand the high pressure of blood pumped by the heart.'
    },
    {
      question: 'What are the functional units of the kidneys called?',
      options: ['Neurons', 'Alveoli', 'Nephrons', 'Villi'],
      correct: 2,
      explanation: 'Nephrons are the functional units of the kidneys where filtration of blood and formation of urine takes place. Each kidney contains about a million nephrons.'
    },
    {
      question: 'Which waste product is removed by the lungs during exhalation?',
      options: ['Urea', 'Uric acid', 'Carbon dioxide', 'Bile pigments'],
      correct: 2,
      explanation: 'The lungs remove carbon dioxide, which is a waste product of cellular respiration. During exhalation, CO₂ is expelled from the body along with water vapor.'
    },
    {
      question: 'What happens during anaerobic respiration in human muscle cells?',
      options: ['Glucose is completely broken down to CO₂ and H₂O', 'Glucose is converted to lactic acid', 'Glucose is converted to ethanol', 'No energy is produced'],
      correct: 1,
      explanation: 'During intense exercise when oxygen is limited, muscle cells perform anaerobic respiration, converting glucose to lactic acid. Accumulation of lactic acid causes muscle fatigue and cramps.'
    },
    {
      question: 'Which of the following is NOT a method of excretion in plants?',
      options: ['Transpiration', 'Shedding of leaves', 'Release of oxygen during photosynthesis', 'Urination'],
      correct: 3,
      explanation: 'Urination is a method of excretion in animals, not plants. Plants excrete waste through transpiration (water loss), shedding of leaves (removal of accumulated wastes), and releasing oxygen as a byproduct of photosynthesis.'
    }
  ]
}

export default function LifeProcessesGrade10Module() {
  return (
    <ModuleLayout 
      module={lifeProcessesModule} 
      grade={10} 
      subject="Science" 
    />
  )
}