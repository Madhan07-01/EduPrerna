import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const forcePressureModule: LearningModule = {
  title: 'Force and Pressure',
  introduction: 'Welcome to the fascinating world of Force and Pressure! Every day, you experience forces and pressure without even realizing it - when you push a door, walk on the ground, or even breathe. Forces make things move, stop, or change direction, while pressure explains why a sharp knife cuts better than a blunt one. Get ready to discover the science behind these everyday phenomena and understand how they shape our world!',
  concepts: [
    {
      title: 'Definition and Nature of Force',
      content: 'Force is a push or pull that can change the motion, shape, or direction of an object. It\'s an invisible action that produces visible results. Forces are everywhere around us, making things happen in our daily lives.',
      examples: [
        'When you push a book across a table, you apply force',
        'Kicking a football changes its direction - that\'s force in action',
        'Pulling a door handle to open it demonstrates force',
        'A magnet attracting iron pins shows magnetic force',
        'Your weight pressing down on a chair is gravitational force'
      ]
    },
    {
      title: 'Formula and Unit of Force',
      content: 'Force follows a mathematical relationship with mass and acceleration. The standard unit helps scientists measure and compare forces accurately across different situations and experiments.',
      examples: [
        'Formula: Force = Mass × Acceleration (F = m × a)',
        'SI Unit: Newton (N), named after Sir Isaac Newton',
        'Example calculation: 2 kg mass accelerating at 5 m/s² = 10 N force',
        '1 Newton = force needed to accelerate 1 kg mass by 1 m/s²',
        'Common forces: Walking (150 N), Opening door (50 N), Lifting book (10 N)'
      ]
    },
    {
      title: 'Contact Forces - Direct Touch Required',
      content: 'Contact forces occur when objects physically touch each other. The force is transmitted through direct contact between surfaces, and stops immediately when contact is broken.',
      examples: [
        'Friction force: When you rub your hands together or walk on ground',
        'Normal force: Chair supporting your weight when you sit',
        'Tension force: Rope pulling a bucket up from a well',
        'Applied force: Pushing a cart in a supermarket',
        'Spring force: Mattress pushing back when you lie down'
      ]
    },
    {
      title: 'Non-Contact Forces - Action at a Distance',
      content: 'Non-contact forces can act on objects without physical touch. These forces work through invisible fields that extend through space, allowing objects to influence each other from a distance.',
      examples: [
        'Gravitational force: Earth pulling objects downward (your weight)',
        'Magnetic force: Magnet attracting iron objects without touching',
        'Electrostatic force: Rubbed balloon sticking to wall',
        'Nuclear force: Holds particles together inside atoms',
        'Examples: Falling apple, compass needle pointing north, lightning'
      ]
    },
    {
      title: 'Definition and Nature of Pressure',
      content: 'Pressure is the force applied per unit area. It explains why some objects with the same force can have very different effects depending on how that force is distributed over an area.',
      examples: [
        'A sharp knife cuts easily because force is concentrated on small area',
        'Wide tires distribute car weight over larger area, reducing pressure',
        'Lying on a bed of nails: weight spread over many points',
        'High heels create more pressure than flat shoes on same surface',
        'Thumbtack point concentrates force to pierce bulletin board'
      ]
    },
    {
      title: 'Formula and Unit of Pressure',
      content: 'Pressure has a simple mathematical relationship with force and area. Understanding this formula helps explain many everyday phenomena and engineering applications.',
      examples: [
        'Formula: Pressure = Force ÷ Area (P = F/A)',
        'SI Unit: Pascal (Pa), where 1 Pa = 1 N/m²',
        'Example: 100 N force on 2 m² area = 50 Pa pressure',
        'Larger area = lower pressure (snow shoes vs regular shoes)',
        'Common pressures: Atmospheric (101,325 Pa), Bicycle tire (200,000 Pa)'
      ]
    },
    {
      title: 'Inverse Relationship Between Pressure and Area',
      content: 'When force remains constant, pressure and area have an inverse relationship. As area increases, pressure decreases, and vice versa. This principle explains many design choices in engineering and nature.',
      examples: [
        'Wide foundation distributes building weight, preventing sinking',
        'Snowshoes spread body weight over larger area to walk on snow',
        'Sharp knife edge (small area) creates high pressure for cutting',
        'Camel\'s wide feet prevent sinking in sand',
        'Wide tires on heavy trucks reduce road pressure and damage'
      ]
    },
    {
      title: 'Practical Applications of Force in Daily Life',
      content: 'Forces are fundamental to countless activities in our daily lives. Understanding forces helps us use tools more effectively and explains how machines make work easier.',
      examples: [
        'Levers: Crowbar uses force multiplication to lift heavy objects',
        'Wheels and axles: Bicycles convert pedaling force into motion',
        'Inclined planes: Ramps reduce force needed to move objects upward',
        'Sports: Tennis racket increases force on ball, javelin throw uses body force',
        'Transportation: Car engines create force to overcome friction and air resistance'
      ]
    },
    {
      title: 'Practical Applications of Pressure in Daily Life',
      content: 'Pressure applications surround us in technology, nature, and everyday tools. Many ingenious inventions use pressure principles to solve practical problems.',
      examples: [
        'Hydraulic systems: Car brakes multiply force using liquid pressure',
        'Atmospheric pressure: Drinking through straw, suction cups working',
        'Blood pressure: Heart pumps blood through circulatory system',
        'Weather systems: High and low pressure areas create wind and storms',
        'Kitchen tools: Pressure cookers cook food faster using steam pressure'
      ]
    },
    {
      title: 'Force and Pressure in Technology and Engineering',
      content: 'Modern technology cleverly uses force and pressure principles to create amazing machines and solve complex problems. Engineers constantly apply these concepts in innovative ways.',
      examples: [
        'Airplane wings: Air pressure difference creates lift force',
        'Submarine design: Strong hull withstands enormous water pressure',
        'Pneumatic tools: Compressed air provides powerful force for construction',
        'Dam construction: Engineers calculate water pressure on dam walls',
        'Space technology: Rockets use force from burning fuel to escape gravity'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the correct formula for calculating force?',
      options: ['F = m ÷ a', 'F = m + a', 'F = m × a', 'F = a ÷ m'],
      correct: 2,
      explanation: 'The correct formula for force is F = m × a (Force = Mass × Acceleration). This means force equals mass multiplied by acceleration, as stated in Newton\'s Second Law of Motion.'
    },
    {
      question: 'What is the SI unit of force?',
      options: ['Pascal', 'Joule', 'Newton', 'Watt'],
      correct: 2,
      explanation: 'The SI unit of force is Newton (N), named after Sir Isaac Newton. One Newton is the force required to accelerate a 1 kg mass by 1 m/s².'
    },
    {
      question: 'Which of the following is an example of a contact force?',
      options: ['Gravitational force', 'Magnetic force', 'Friction force', 'Electrostatic force'],
      correct: 2,
      explanation: 'Friction force is a contact force because it occurs when two surfaces are in direct physical contact. The other options are non-contact forces that can act at a distance.'
    },
    {
      question: 'Which force can act without objects touching each other?',
      options: ['Friction', 'Normal force', 'Gravitational force', 'Tension'],
      correct: 2,
      explanation: 'Gravitational force is a non-contact force that can act without objects touching. Earth pulls objects downward even when they\'re not touching the ground, like a falling apple.'
    },
    {
      question: 'What is the correct formula for pressure?',
      options: ['P = F × A', 'P = F + A', 'P = F ÷ A', 'P = A ÷ F'],
      correct: 2,
      explanation: 'The correct formula for pressure is P = F ÷ A (Pressure = Force ÷ Area). Pressure is the force applied per unit area.'
    },
    {
      question: 'What is the SI unit of pressure?',
      options: ['Newton', 'Pascal', 'Meter', 'Kilogram'],
      correct: 1,
      explanation: 'The SI unit of pressure is Pascal (Pa). One Pascal equals one Newton per square meter (1 Pa = 1 N/m²).'
    },
    {
      question: 'If the area increases while force remains constant, what happens to pressure?',
      options: ['Pressure increases', 'Pressure decreases', 'Pressure remains same', 'Pressure becomes zero'],
      correct: 1,
      explanation: 'When area increases while force remains constant, pressure decreases. This is because P = F/A, so as the denominator (area) increases, pressure decreases. This is why snowshoes prevent sinking in snow.'
    },
    {
      question: 'Why does a sharp knife cut better than a blunt knife?',
      options: ['Sharp knife has more force', 'Sharp knife has less area, creating higher pressure', 'Sharp knife is made of better material', 'Sharp knife moves faster'],
      correct: 1,
      explanation: 'A sharp knife cuts better because it has a very small contact area, which creates higher pressure for the same applied force (P = F/A). Higher pressure makes cutting easier.'
    },
    {
      question: 'Which is an example of pressure application in daily life?',
      options: ['Using a bicycle', 'Drinking through a straw', 'Throwing a ball', 'Reading a book'],
      correct: 1,
      explanation: 'Drinking through a straw uses atmospheric pressure. When you suck air out of the straw, atmospheric pressure pushes the liquid up into your mouth.'
    },
    {
      question: 'Calculate the pressure when a 20 N force is applied over an area of 4 m².',
      options: ['80 Pa', '5 Pa', '24 Pa', '16 Pa'],
      correct: 1,
      explanation: 'Using the formula P = F/A: Pressure = 20 N ÷ 4 m² = 5 Pa (Pascal). When force is divided by area, we get pressure in Pascals.'
    }
  ]
}

export default function ForcePressureModule() {
  return (
    <ModuleLayout 
      module={forcePressureModule} 
      grade={8} 
      subject="Science" 
    />
  )
}