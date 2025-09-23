import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const electricCurrentCircuitsModule: LearningModule = {
  title: 'Electric Current and Circuits',
  introduction: 'Welcome to the fascinating world of electric current and circuits! Building on your basic understanding of electricity, we\'ll now dive deeper into how electric current flows, what controls it, and how we can build useful circuits. These concepts are the foundation of all electronic devices around us - from smartphones to computers to electric cars. Get ready to become an electrical engineer!',
  concepts: [
    {
      title: 'Electric Current Definition and Formula',
      content: 'Electric current is the flow of electric charge (electrons) through a conductor. It\'s measured in amperes (A) and represents how much charge passes through a point in a circuit per second.',
      examples: [
        'Current (I) = Charge (Q) ÷ Time (t), measured in amperes (A)',
        'If 10 coulombs of charge flow past a point in 2 seconds, current = 10÷2 = 5A',
        'Conventional current flows from positive to negative terminal',
        'Electron flow is actually from negative to positive (opposite direction)',
        'Current in household circuits is typically 10-20 amperes'
      ]
    },
    {
      title: 'Voltage and Electrical Potential Difference',
      content: 'Voltage is the electrical pressure that pushes current through a circuit. It\'s the potential difference between two points and is measured in volts (V).',
      examples: [
        'Voltage is like water pressure in pipes - higher pressure pushes more water',
        'AA battery provides 1.5V, car battery provides 12V, house outlet provides 120V (US)',
        'Voltage determines how much current can flow through a resistance',
        'Without voltage difference, no current flows (like flat battery)',
        'Multimeters measure voltage by connecting across two points'
      ]
    },
    {
      title: 'Resistance and Ohm\'s Law',
      content: 'Resistance opposes the flow of electric current. Ohm\'s Law describes the relationship between voltage, current, and resistance: V = I × R.',
      examples: [
        'Ohm\'s Law: Voltage = Current × Resistance (V = I × R)',
        'If V = 12V and R = 4Ω, then I = V÷R = 12÷4 = 3A',
        'If I = 2A and R = 6Ω, then V = I×R = 2×6 = 12V',
        'If V = 9V and I = 1.5A, then R = V÷I = 9÷1.5 = 6Ω',
        'Materials with high resistance (insulators) limit current flow'
      ]
    },
    {
      title: 'Circuit Components and Their Functions',
      content: 'Circuits contain various components, each with specific functions. Understanding these components helps us analyze and build circuits effectively.',
      examples: [
        'Battery/Power source: Provides voltage to drive current through circuit',
        'Resistors: Control current flow and convert electrical energy to heat',
        'Switches: Open or close the circuit to control current flow',
        'Wires/Conductors: Provide low-resistance path for current',
        'Light bulbs: Convert electrical energy to light and heat (act as resistors)'
      ]
    },
    {
      title: 'Series Circuits - Single Path Design',
      content: 'In series circuits, components are connected in a single path. Current flows through each component one after another, and the same current flows through all components.',
      examples: [
        'Current is the same throughout: I₁ = I₂ = I₃ = I_total',
        'Voltage divides among components: V_total = V₁ + V₂ + V₃',
        'Total resistance adds up: R_total = R₁ + R₂ + R₃',
        'If one component fails, entire circuit stops working',
        'Christmas lights (old style) often use series circuits'
      ]
    },
    {
      title: 'Parallel Circuits - Multiple Path Design',
      content: 'In parallel circuits, components are connected across multiple paths. Each component has its own branch, and voltage across each branch is the same.',
      examples: [
        'Voltage is same across all branches: V₁ = V₂ = V₃ = V_total',
        'Current divides among branches: I_total = I₁ + I₂ + I₃',
        'Total resistance: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃',
        'If one component fails, others continue working',
        'House wiring uses parallel circuits for independent control'
      ]
    },
    {
      title: 'Switches and Circuit Control',
      content: 'Switches are essential components that control current flow in circuits. Different types of switches provide various control mechanisms.',
      examples: [
        'Open switch: Breaks the circuit, no current flows (like a drawbridge up)',
        'Closed switch: Completes the circuit, current flows freely',
        'SPST (Single Pole Single Throw): Simple on/off switch',
        'SPDT (Single Pole Double Throw): Can connect to two different paths',
        'Push-button switches: Momentary contact (doorbell, computer power button)'
      ]
    },
    {
      title: 'Safety Devices and Protection',
      content: 'Electrical safety devices protect circuits and people from dangerous conditions like overcurrent, short circuits, and electrical shock.',
      examples: [
        'Fuses: Melt and break circuit when current exceeds safe limit',
        'Circuit breakers: Automatically switch off during overload, can be reset',
        'GFCI outlets: Detect ground faults and shut off power quickly',
        'Surge protectors: Protect against voltage spikes from lightning',
        'Proper grounding: Provides safe path for fault currents'
      ]
    },
    {
      title: 'Conductors vs Insulators in Circuits',
      content: 'Understanding material properties is crucial for circuit design. Conductors allow current flow while insulators prevent it.',
      examples: [
        'Good conductors: Copper, aluminum, silver, gold (used in wires)',
        'Good insulators: Rubber, plastic, glass, ceramic, air (used for safety)',
        'Wire coating: Plastic insulation prevents accidental contact',
        'Semiconductor materials: Silicon, germanium (controlled conductivity)',
        'Superconductors: Zero resistance at very low temperatures'
      ]
    },
    {
      title: 'Real-World Applications and Problem Solving',
      content: 'Electric circuits are everywhere in modern life. Understanding circuit principles helps us troubleshoot problems and design solutions.',
      examples: [
        'Automotive circuits: Car electrical systems use 12V DC circuits',
        'Home wiring: 120V AC parallel circuits with circuit breakers',
        'Electronic devices: Complex circuits with integrated circuits (ICs)',
        'Troubleshooting: Use multimeters to measure voltage, current, resistance',
        'Energy efficiency: LED lights use less current than incandescent bulbs'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the unit of electric current?',
      options: ['Volt (V)', 'Ampere (A)', 'Ohm (Ω)', 'Watt (W)'],
      correct: 1,
      explanation: 'Electric current is measured in amperes (A), which represents the amount of charge flowing past a point per second.'
    },
    {
      question: 'According to Ohm\'s Law, if voltage increases and resistance stays the same, what happens to current?',
      options: ['Current decreases', 'Current increases', 'Current stays the same', 'Current becomes zero'],
      correct: 1,
      explanation: 'According to Ohm\'s Law (V = I × R), if voltage increases and resistance stays constant, current must increase proportionally.'
    },
    {
      question: 'In a series circuit with three resistors, how does the current compare through each resistor?',
      options: ['Current is different through each resistor', 'Current is highest through the first resistor', 'Current is the same through all resistors', 'Current is zero through all resistors'],
      correct: 2,
      explanation: 'In a series circuit, there is only one path for current to flow, so the same current flows through all components.'
    },
    {
      question: 'In a parallel circuit, what is the same across all branches?',
      options: ['Current', 'Resistance', 'Voltage', 'Power'],
      correct: 2,
      explanation: 'In a parallel circuit, each branch is connected directly to the power source, so voltage is the same across all branches.'
    },
    {
      question: 'Using Ohm\'s Law, calculate the current when voltage is 12V and resistance is 4Ω.',
      options: ['3A', '8A', '16A', '48A'],
      correct: 0,
      explanation: 'Using Ohm\'s Law: I = V/R = 12V ÷ 4Ω = 3A.'
    },
    {
      question: 'What happens to the total resistance when resistors are connected in series?',
      options: ['Total resistance decreases', 'Total resistance increases', 'Total resistance stays the same', 'Total resistance becomes zero'],
      correct: 1,
      explanation: 'In series circuits, total resistance equals the sum of individual resistances: R_total = R₁ + R₂ + R₃, so it increases.'
    },
    {
      question: 'Which safety device automatically breaks a circuit when current exceeds a safe limit and can be reset?',
      options: ['Fuse', 'Circuit breaker', 'Resistor', 'Switch'],
      correct: 1,
      explanation: 'A circuit breaker automatically opens when current exceeds the safe limit and can be reset, unlike a fuse which must be replaced.'
    },
    {
      question: 'What type of material is used for wire coating to prevent electrical shock?',
      options: ['Conductor', 'Insulator', 'Semiconductor', 'Superconductor'],
      correct: 1,
      explanation: 'Wire coating is made of insulating materials like plastic or rubber to prevent accidental contact with the conducting wire.'
    },
    {
      question: 'In household wiring, why are outlets connected in parallel rather than series?',
      options: ['To save money', 'So each device gets full voltage and works independently', 'To reduce current flow', 'To increase resistance'],
      correct: 1,
      explanation: 'Parallel connection ensures each device receives full voltage and can operate independently - if one device fails, others continue working.'
    },
    {
      question: 'If a 6V battery is connected to a circuit with total resistance of 2Ω, what is the current flow?',
      options: ['3A', '4A', '8A', '12A'],
      correct: 0,
      explanation: 'Using Ohm\'s Law: I = V/R = 6V ÷ 2Ω = 3A.'
    }
  ]
}

export default function ElectricCurrentCircuitsModule() {
  return (
    <ModuleLayout 
      module={electricCurrentCircuitsModule} 
      grade={7} 
      subject="Science" 
    />
  )
}