import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const respirationCirculationModule: LearningModule = {
  title: 'Respiration and Circulation - Complete Module',
  introduction: 'Welcome to the amazing world of Respiration and Circulation! Have you ever wondered how the air you breathe reaches every cell in your body, or how your heart works tirelessly to keep you alive? These two vital life processes work together like a perfect team to deliver oxygen and nutrients while removing waste products. Understanding how you breathe and how your blood circulates will help you appreciate the incredible machine that is your body. Let\'s explore these fascinating processes that keep you healthy and active every single day!',
  concepts: [
    {
      title: 'Definition and Types of Respiration',
      content: 'Respiration is the process of breaking down food (mainly glucose) to release energy for all life activities. There are two main types of respiration: aerobic (with oxygen) and anaerobic (without oxygen). Every living cell in your body performs respiration to get the energy it needs to function.',
      examples: [
        'Aerobic respiration: Most efficient type that uses oxygen to completely break down glucose',
        'Equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP (energy)',
        'Anaerobic respiration: Occurs when oxygen is limited, produces less energy',
        'Example of anaerobic: When you exercise intensely, muscles may respire anaerobically causing fatigue',
        'Yeast fermentation: Anaerobic respiration used in making bread (produces CO₂) and alcohol',
        'All living organisms respire: Plants, animals, bacteria, and fungi all need energy from respiration'
      ]
    },
    {
      title: 'Components of Human Circulatory System - The Heart',
      content: 'The heart is a powerful muscular pump that beats about 100,000 times per day. It has four chambers: two atria (upper chambers) that receive blood, and two ventricles (lower chambers) that pump blood out. The heart works like two pumps in one, sending blood to the lungs and to the rest of the body.',
      examples: [
        'Right atrium: Receives deoxygenated blood from the body',
        'Right ventricle: Pumps blood to the lungs to pick up oxygen',
        'Left atrium: Receives oxygenated blood from the lungs',
        'Left ventricle: Strongest chamber, pumps oxygen-rich blood to the entire body',
        'Heart valves: One-way doors that prevent blood from flowing backward',
        'Average heart rate: 60-100 beats per minute in a healthy person at rest'
      ]
    },
    {
      title: 'Components of Human Circulatory System - Blood Vessels',
      content: 'Blood vessels are the highways of your circulatory system, carrying blood to every part of your body. There are three main types: arteries (carry blood away from heart), veins (carry blood back to heart), and capillaries (tiny vessels where gas exchange occurs).',
      examples: [
        'Arteries: Thick, muscular walls to handle high pressure blood from heart',
        'Major arteries: Aorta (largest), pulmonary artery (to lungs), carotid (to brain)',
        'Veins: Thinner walls with valves to prevent backflow of blood',
        'Major veins: Vena cava (largest), pulmonary veins (from lungs)',
        'Capillaries: Microscopic vessels where oxygen and nutrients pass to cells',
        'Blood pressure: Force of blood against artery walls (normal: 120/80 mmHg)'
      ]
    },
    {
      title: 'Components of Human Circulatory System - Blood Components',
      content: 'Blood is a liquid tissue made up of different components, each with specific functions. It consists of red blood cells, white blood cells, platelets, and plasma. Together, they transport materials, fight infections, and help with clotting.',
      examples: [
        'Red blood cells (RBCs): Contain hemoglobin to carry oxygen, make up 45% of blood',
        'White blood cells (WBCs): Fight infections and diseases, part of immune system',
        'Platelets: Help blood clot to stop bleeding when you get injured',
        'Plasma: Liquid portion (55% of blood) that carries nutrients, hormones, and waste',
        'Hemoglobin: Iron-containing protein that gives blood its red color and carries oxygen',
        'Blood volume: Average adult has about 5-6 liters of blood in their body'
      ]
    },
    {
      title: 'Pulmonary Circulation - Heart to Lungs',
      content: 'Pulmonary circulation is the pathway blood takes from the heart to the lungs and back. This shorter loop is specifically for gas exchange - picking up oxygen and getting rid of carbon dioxide. It\'s like a special delivery service between your heart and lungs.',
      examples: [
        'Step 1: Right ventricle pumps deoxygenated blood through pulmonary artery',
        'Step 2: Blood travels to lungs where CO₂ is removed and O₂ is picked up',
        'Step 3: Oxygenated blood returns to left atrium through pulmonary veins',
        'Gas exchange: Occurs in tiny air sacs called alveoli in the lungs',
        'Unique feature: Pulmonary arteries carry deoxygenated blood (unlike other arteries)',
        'Time taken: Blood completes pulmonary circulation in about 4-8 seconds'
      ]
    },
    {
      title: 'Systemic Circulation - Heart to Body',
      content: 'Systemic circulation is the larger pathway that carries oxygenated blood from the heart to all body tissues and returns deoxygenated blood back to the heart. This circulation delivers oxygen and nutrients while collecting waste products from every cell in your body.',
      examples: [
        'Step 1: Left ventricle pumps oxygenated blood through aorta (largest artery)',
        'Step 2: Blood travels through arteries to all body organs and tissues',
        'Step 3: In capillaries, oxygen and nutrients are delivered, waste is collected',
        'Step 4: Deoxygenated blood returns through veins to right atrium',
        'Complete journey: Takes about 20 seconds for blood to travel through entire body',
        'Delivery system: Brings oxygen, glucose, hormones, and removes CO₂, urea'
      ]
    },
    {
      title: 'Functions of Respiration in the Body',
      content: 'Respiration serves multiple vital functions beyond just breathing. It provides energy for all cellular activities, maintains proper gas levels in blood, helps regulate body temperature, and supports the immune system. Every function of your body depends on the energy produced by respiration.',
      examples: [
        'Energy production: Breaking down glucose provides ATP for muscle contraction, brain function',
        'Gas exchange: Brings in oxygen for cells, removes toxic carbon dioxide',
        'Temperature regulation: Heat produced during respiration helps maintain body temperature',
        'pH balance: Breathing rate adjusts to control acid levels in blood',
        'Waste removal: Eliminates CO₂ and water vapor through exhalation',
        'Support for other processes: Provides energy for digestion, growth, repair, reproduction'
      ]
    },
    {
      title: 'Functions of Circulation in the Body',
      content: 'The circulatory system is like a sophisticated transport network that keeps your body functioning smoothly. It delivers essential materials to cells, removes waste products, helps fight infections, regulates temperature, and maintains fluid balance throughout your body.',
      examples: [
        'Transport function: Carries oxygen, nutrients, hormones to every cell',
        'Waste removal: Transports CO₂ to lungs, urea to kidneys for elimination',
        'Immune protection: White blood cells patrol body to fight infections and diseases',
        'Temperature control: Blood distributes heat throughout body, helps cool through skin',
        'Healing and repair: Delivers materials needed for wound healing and tissue repair',
        'Communication: Hormones travel through blood to coordinate body functions'
      ]
    },
    {
      title: 'Integration of Respiration and Circulation',
      content: 'Respiration and circulation work together as an integrated system to sustain life. The respiratory system provides oxygen and removes carbon dioxide, while the circulatory system transports these gases throughout the body. Their coordination ensures every cell gets what it needs to survive.',
      examples: [
        'Perfect partnership: Lungs provide O₂ to blood, blood delivers O₂ to cells',
        'Waste coordination: Cells produce CO₂, blood carries it to lungs for removal',
        'Rate adjustment: Heart rate and breathing rate increase together during exercise',
        'Efficiency: Hemoglobin in blood maximizes oxygen transport capacity',
        'Emergency response: Both systems work faster when body needs more energy',
        'Health connection: Problems in one system affect the other (heart disease affects breathing)'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the main difference between aerobic and anaerobic respiration?',
      options: ['Aerobic uses glucose, anaerobic uses fats', 'Aerobic uses oxygen, anaerobic does not', 'Aerobic occurs in plants, anaerobic in animals', 'There is no difference'],
      correct: 1,
      explanation: 'Aerobic respiration requires oxygen and completely breaks down glucose to produce maximum energy, while anaerobic respiration occurs without oxygen and produces less energy.'
    },
    {
      question: 'Which chamber of the heart pumps blood to the lungs?',
      options: ['Right atrium', 'Left atrium', 'Right ventricle', 'Left ventricle'],
      correct: 2,
      explanation: 'The right ventricle pumps deoxygenated blood through the pulmonary artery to the lungs for gas exchange.'
    },
    {
      question: 'What is the function of red blood cells?',
      options: ['Fight infections', 'Help blood clot', 'Carry oxygen', 'Produce hormones'],
      correct: 2,
      explanation: 'Red blood cells contain hemoglobin, which binds to oxygen and transports it from the lungs to all body tissues.'
    },
    {
      question: 'Which blood vessels carry blood away from the heart?',
      options: ['Veins', 'Arteries', 'Capillaries', 'Lymph vessels'],
      correct: 1,
      explanation: 'Arteries are blood vessels that carry blood away from the heart to various parts of the body. They have thick, muscular walls to handle high pressure.'
    },
    {
      question: 'In pulmonary circulation, where does blood go after leaving the right ventricle?',
      options: ['To the brain', 'To the lungs', 'To the liver', 'To the kidneys'],
      correct: 1,
      explanation: 'In pulmonary circulation, blood travels from the right ventricle to the lungs for gas exchange, then returns to the left atrium.'
    },
    {
      question: 'What is the largest artery in the human body?',
      options: ['Pulmonary artery', 'Carotid artery', 'Aorta', 'Femoral artery'],
      correct: 2,
      explanation: 'The aorta is the largest artery in the human body. It carries oxygenated blood from the left ventricle to the rest of the body.'
    },
    {
      question: 'Which component of blood helps in clotting?',
      options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'],
      correct: 2,
      explanation: 'Platelets are small blood cells that help form clots to stop bleeding when blood vessels are injured.'
    },
    {
      question: 'What happens during gas exchange in the lungs?',
      options: ['Only oxygen enters blood', 'Only carbon dioxide leaves blood', 'Oxygen enters and carbon dioxide leaves blood', 'No gases are exchanged'],
      correct: 2,
      explanation: 'During gas exchange in the lungs, oxygen from inhaled air enters the blood while carbon dioxide from the blood is removed and exhaled.'
    },
    {
      question: 'Which system delivers oxygen from lungs to body tissues?',
      options: ['Respiratory system only', 'Circulatory system only', 'Both respiratory and circulatory systems', 'Digestive system'],
      correct: 2,
      explanation: 'Both systems work together: the respiratory system brings oxygen into the blood, and the circulatory system transports it to all body tissues.'
    },
    {
      question: 'What is the normal resting heart rate for a healthy person?',
      options: ['40-50 beats per minute', '60-100 beats per minute', '120-150 beats per minute', '200-250 beats per minute'],
      correct: 1,
      explanation: 'A normal resting heart rate for a healthy adult is typically between 60-100 beats per minute, with athletes often having lower rates.'
    }
  ]
}

export default function RespirationCirculationModule() {
  return (
    <ModuleLayout 
      module={respirationCirculationModule} 
      grade={7} 
      subject="Science" 
    />
  )
}