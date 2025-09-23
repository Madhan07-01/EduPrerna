import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const electricityCircuitsModule: LearningModule = {
  title: 'Electricity and Circuits',
  introduction: 'Welcome to the electrifying world of electricity and circuits! Electricity is all around us - from the lights in your room to your smartphone. Understanding how electricity works and how circuits carry it safely will help you appreciate the amazing technology we use every day. Get ready to become an electricity expert!',
  concepts: [
    {
      title: 'What is Electricity?',
      content: 'Electricity is a form of energy caused by the movement of tiny particles called electrons. When electrons move through materials, they create an electric current that can power our devices and light our homes.',
      examples: [
        'Lightning is a natural form of electricity in the sky',
        'Static electricity makes your hair stand up when you rub a balloon on it',
        'Electric current flows through wires like water flows through pipes',
        'Electrons are so small you can\'t see them, but millions move through wires every second',
        'Electric current is measured in units called amperes (amps)'
      ]
    },
    {
      title: 'Electric Current and How It Flows',
      content: 'Electric current is the flow of electrons through a conductor. For current to flow, electrons need a complete path to travel from one place to another and back again.',
      examples: [
        'Current flows from positive to negative terminals in a circuit',
        'Think of current like water flowing through a garden hose',
        'The stronger the current, the more electrons are flowing',
        'Current needs a complete loop (circuit) to keep flowing',
        'If the path is broken, current stops flowing (like turning off a switch)'
      ]
    },
    {
      title: 'Circuit Components and Their Functions',
      content: 'Circuits are made up of different components that each have special jobs. Understanding these parts helps us build and fix electrical devices.',
      examples: [
        'Battery: Provides the electrical energy (like a power source)',
        'Wires: Carry the electric current from place to place',
        'Light bulb: Uses electrical energy to produce light and heat',
        'Switch: Controls whether current can flow or not',
        'Resistor: Controls how much current flows through the circuit'
      ]
    },
    {
      title: 'Series Circuits',
      content: 'A series circuit has only one path for electric current to flow. All components are connected in a single line, like cars on a train track.',
      examples: [
        'Christmas lights often use series circuits (old-style ones)',
        'If one bulb burns out, all bulbs go dark',
        'Current is the same throughout the entire circuit',
        'Adding more bulbs makes all bulbs dimmer',
        'Only one switch controls the entire circuit'
      ]
    },
    {
      title: 'Parallel Circuits',
      content: 'A parallel circuit has multiple paths for electric current to flow. Each component has its own separate branch, like lanes on a highway.',
      examples: [
        'House wiring uses parallel circuits',
        'If one bulb burns out, others stay bright',
        'Each branch can be controlled by its own switch',
        'Adding more bulbs doesn\'t make others dimmer',
        'Each device gets the full voltage from the power source'
      ]
    },
    {
      title: 'Conductors vs Insulators',
      content: 'Materials can be classified based on how well they allow electricity to flow through them. This property determines how we use them in electrical applications.',
      examples: [
        'Conductors: Copper wire, aluminum, gold, silver, water with salt',
        'Insulators: Rubber, plastic, glass, wood, pure water',
        'Wire coating is made of plastic (insulator) for safety',
        'Metal parts of plugs conduct electricity to devices',
        'Never touch exposed wires - the metal conducts electricity!'
      ]
    },
    {
      title: 'Electrical Safety Rules',
      content: 'Electricity can be dangerous if not handled properly. Following safety rules protects us from electric shock and prevents fires.',
      examples: [
        'Never put metal objects in electrical outlets',
        'Keep electrical devices away from water',
        'Don\'t touch electrical wires with wet hands',
        'Unplug devices by pulling the plug, not the cord',
        'Tell an adult if you see damaged electrical cords or outlets'
      ]
    },
    {
      title: 'Voltage and Electrical Pressure',
      content: 'Voltage is like electrical pressure that pushes electrons through a circuit. Higher voltage means more force pushing the electrons along.',
      examples: [
        'Batteries have different voltages: AA battery (1.5V), car battery (12V)',
        'House outlets provide 120V in North America',
        'Voltage is measured in volts (V)',
        'Think of voltage like water pressure in pipes',
        'Higher voltage can push current through materials that resist flow'
      ]
    },
    {
      title: 'Resistance and Controlling Current',
      content: 'Resistance is how much a material opposes the flow of electric current. Different materials and components have different amounts of resistance.',
      examples: [
        'Thin wires have more resistance than thick wires',
        'Long wires have more resistance than short wires',
        'Resistance is measured in ohms (Ω)',
        'Light bulb filaments have high resistance to produce heat and light',
        'Resistors are used to control how much current flows'
      ]
    },
    {
      title: 'Real-World Applications',
      content: 'Understanding electricity and circuits helps us appreciate the technology around us and how electrical devices work in our daily lives.',
      examples: [
        'Flashlights use simple series circuits with batteries and bulbs',
        'Car headlights use parallel circuits so one bulb failure doesn\'t affect others',
        'Computer circuits use millions of tiny switches called transistors',
        'Solar panels convert sunlight into electrical energy',
        'Electric motors convert electrical energy into mechanical motion'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What causes electricity?',
      options: ['Movement of protons', 'Movement of electrons', 'Movement of neutrons', 'Movement of atoms'],
      correct: 1,
      explanation: 'Electricity is caused by the movement of electrons, which are tiny negatively charged particles that flow through conductors to create electric current.'
    },
    {
      question: 'Which component provides electrical energy in a simple circuit?',
      options: ['Light bulb', 'Wire', 'Battery', 'Switch'],
      correct: 2,
      explanation: 'A battery provides the electrical energy in a circuit. It converts chemical energy into electrical energy to power the circuit components.'
    },
    {
      question: 'In a series circuit, what happens if one light bulb burns out?',
      options: ['Other bulbs get brighter', 'Other bulbs stay the same', 'All bulbs go out', 'Only half the bulbs go out'],
      correct: 2,
      explanation: 'In a series circuit, there is only one path for current to flow. If one bulb burns out, it breaks the circuit and all bulbs go out.'
    },
    {
      question: 'Which type of circuit is used in house wiring?',
      options: ['Series circuit', 'Parallel circuit', 'Mixed circuit', 'No circuit'],
      correct: 1,
      explanation: 'House wiring uses parallel circuits so that each device can be controlled independently and if one device fails, others continue to work.'
    },
    {
      question: 'Which material is a good conductor of electricity?',
      options: ['Rubber', 'Plastic', 'Copper', 'Glass'],
      correct: 2,
      explanation: 'Copper is an excellent conductor of electricity, which is why it is commonly used in electrical wires to carry current safely and efficiently.'
    },
    {
      question: 'What should you never put in an electrical outlet?',
      options: ['Plastic objects', 'Wooden objects', 'Metal objects', 'Paper objects'],
      correct: 2,
      explanation: 'Never put metal objects in electrical outlets because metals are conductors and can cause dangerous electric shock or short circuits.'
    },
    {
      question: 'What is voltage?',
      options: ['The speed of electrons', 'The electrical pressure that pushes electrons', 'The number of electrons', 'The size of electrons'],
      correct: 1,
      explanation: 'Voltage is the electrical pressure or force that pushes electrons through a circuit, similar to how water pressure pushes water through pipes.'
    },
    {
      question: 'Which safety rule should you follow with electrical devices?',
      options: ['Use them near water', 'Touch them with wet hands', 'Keep them away from water', 'Pull cords to unplug them'],
      correct: 2,
      explanation: 'Keep electrical devices away from water because water can conduct electricity and cause dangerous electric shock.'
    },
    {
      question: 'What does a switch do in a circuit?',
      options: ['Provides energy', 'Stores energy', 'Controls whether current flows', 'Increases voltage'],
      correct: 2,
      explanation: 'A switch controls whether electric current can flow through a circuit by opening or closing the electrical path.'
    },
    {
      question: 'In a parallel circuit, what happens when you add more light bulbs?',
      options: ['All bulbs get dimmer', 'All bulbs get brighter', 'The brightness stays the same', 'The circuit stops working'],
      correct: 2,
      explanation: 'In a parallel circuit, each bulb has its own path to the power source, so adding more bulbs doesn\'t affect the brightness of existing bulbs.'
    }
  ]
}

export default function ElectricityCircuitsModule() {
  return (
    <ModuleLayout 
      module={electricityCircuitsModule} 
      grade={6} 
      subject="Science" 
    />
  )
}