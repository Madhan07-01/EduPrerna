import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const electricityModule: LearningModule = {
  title: 'Electricity',
  introduction: 'Welcome to the powerful world of Electricity! Electricity is the invisible force that powers our modern world - from the smartphone in your pocket to the streetlights that guide you home. Understanding electricity is like having a key to the most important technology of our time. In this module, we\'ll dive deep into the fundamental concepts that govern electric current, voltage, and resistance. You\'ll learn how to calculate power consumption, understand the behavior of circuits, and discover how electricity makes our daily lives possible. Get ready to master the principles that light up our world!',
  concepts: [
    {
      title: 'Electric Current - The Flow of Charge',
      content: 'Electric current is the rate of flow of electric charge through a conductor. It represents how much charge passes through a point in a circuit per unit time. Understanding current is fundamental to analyzing any electrical circuit.',
      examples: [
        'Definition: Current (I) = Charge (Q) ÷ Time (t)',
        'Unit: Ampere (A), where 1 A = 1 Coulomb/second',
        'Direction: Conventional current flows from positive to negative terminal',
        'Actual flow: Electrons flow from negative to positive (opposite direction)',
        'Measurement: Ammeter connected in series measures current',
        'Typical values: Flashlight (0.5A), household circuit (15-20A), lightning (thousands of A)'
      ]
    },
    {
      title: 'Voltage - Electrical Pressure',
      content: 'Voltage, also known as potential difference, is the electrical pressure that drives current through a circuit. It represents the energy per unit charge available to move electrons through a conductor.',
      examples: [
        'Definition: Voltage (V) = Energy (E) ÷ Charge (Q)',
        'Unit: Volt (V), where 1 V = 1 Joule/Coulomb',
        'Analogy: Like water pressure in pipes - higher pressure pushes more water',
        'Sources: Batteries, generators, power outlets provide voltage',
        'Measurement: Voltmeter connected in parallel measures voltage',
        'Typical values: AA battery (1.5V), car battery (12V), household outlet (120V in US, 230V in Europe)'
      ]
    },
    {
      title: 'Resistance - Opposition to Current Flow',
      content: 'Resistance is the property of a material that opposes the flow of electric current. It determines how much current will flow for a given voltage and is affected by material, length, and cross-sectional area.',
      examples: [
        'Definition: Resistance (R) = Voltage (V) ÷ Current (I) [from Ohm\'s Law]',
        'Unit: Ohm (Ω), named after Georg Simon Ohm',
        'Factors affecting resistance: Length (longer = more R), Area (wider = less R), Material (copper < rubber)',
        'Temperature effect: Resistance generally increases with temperature for metals',
        'Measurement: Ohmmeter measures resistance directly',
        'Typical values: Copper wire (very low), human body (1000-100,000Ω), air (very high)'
      ]
    },
    {
      title: 'Ohm\'s Law - The Fundamental Relationship',
      content: 'Ohm\'s Law states that the current through a conductor between two points is directly proportional to the voltage across the two points, provided temperature remains constant. This is the cornerstone of electrical circuit analysis.',
      examples: [
        'Formula: V = I × R, where V = voltage, I = current, R = resistance',
        'Derived forms: I = V/R and R = V/I',
        'Applications: Calculate unknown quantity when two are known',
        'Example: If V = 12V and R = 4Ω, then I = 12V ÷ 4Ω = 3A',
        'Limitations: Only applies to ohmic materials (metals at constant temperature)',
        'Non-ohmic devices: Diodes, LEDs, transistors don\'t follow Ohm\'s Law'
      ]
    },
    {
      title: 'Electric Power - Rate of Energy Transfer',
      content: 'Electric power is the rate at which electrical energy is transferred by an electric circuit. It tells us how fast electrical energy is being converted to other forms like heat, light, or mechanical energy.',
      examples: [
        'Definition: Power (P) = Energy (E) ÷ Time (t)',
        'Formula: P = V × I (Power = Voltage × Current)',
        'Derived formulas: P = I²R and P = V²/R (using Ohm\'s Law)',
        'Unit: Watt (W), where 1 W = 1 Joule/second',
        'Measurement: Wattmeter measures power directly',
        'Example: A 60W bulb uses 60 Joules of energy per second'
      ]
    },
    {
      title: 'Series Circuits - Single Path for Current',
      content: 'In a series circuit, all components are connected end-to-end, forming a single path for current flow. The same current flows through all components, but voltage is divided among them.',
      examples: [
        'Current: Same through all components (I_total = I₁ = I₂ = I₃)',
        'Voltage: Divided among components (V_total = V₁ + V₂ + V₃)',
        'Resistance: Add up (R_total = R₁ + R₂ + R₃)',
        'If one component fails, entire circuit stops working',
        'Applications: Christmas lights (old style), flashlights, some automotive circuits'
      ]
    },
    {
      title: 'Parallel Circuits - Multiple Paths for Current',
      content: 'In a parallel circuit, components are connected across the same two points, providing multiple paths for current flow. Voltage is the same across all branches, but current divides among them.',
      examples: [
        'Voltage: Same across all branches (V_total = V₁ = V₂ = V₃)',
        'Current: Divides among branches (I_total = I₁ + I₂ + I₃)',
        'Resistance: Reciprocal relationship (1/R_total = 1/R₁ + 1/R₂ + 1/R₃)',
        'If one component fails, others continue working',
        'Applications: House wiring, car electrical systems, electronic devices'
      ]
    },
    {
      title: 'Combination Circuits - Series and Parallel Together',
      content: 'Real-world circuits often combine series and parallel connections. These circuits require applying both series and parallel rules to different parts of the circuit.',
      examples: [
        'Analysis approach: Simplify step by step, combining series/parallel sections',
        'Example: Two resistors in parallel connected in series with a third resistor',
        'First calculate parallel resistance, then add series resistance',
        'Current and voltage vary in different parts of the circuit',
        'Household circuits often have combination configurations'
      ]
    },
    {
      title: 'Electrical Safety and Applications',
      content: 'Understanding electricity helps us use it safely and efficiently. Proper knowledge prevents accidents and enables effective use of electrical energy in daily life.',
      examples: [
        'Safety rules: Never touch exposed wires, keep electrical devices dry, use proper fuses',
        'Circuit protection: Fuses and circuit breakers prevent overcurrent damage',
        'Grounding: Provides safe path for fault currents to prevent electric shock',
        'Energy efficiency: LED bulbs use less power than incandescent bulbs for same light output',
        'Power calculations: Calculate electricity bills using P = VI and energy = power × time'
      ]
    },
    {
      title: 'Practical Applications of Electricity',
      content: 'Electricity powers countless devices and systems in our daily lives. Understanding electrical principles helps us appreciate and troubleshoot these technologies.',
      examples: [
        'Heating: Electric heaters, toasters, hair dryers convert electrical energy to heat',
        'Lighting: Incandescent, fluorescent, and LED bulbs convert electrical energy to light',
        'Motors: Convert electrical energy to mechanical energy (fans, washing machines)',
        'Electronics: Computers, smartphones, TVs use complex circuits for information processing',
        'Power distribution: Transformers step voltage up/down for efficient transmission'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the unit of electric current?',
      options: ['Volt (V)', 'Ohm (Ω)', 'Ampere (A)', 'Watt (W)'],
      correct: 2,
      explanation: 'The unit of electric current is the Ampere (A), which represents the flow of one Coulomb of charge per second.'
    },
    {
      question: 'According to Ohm\'s Law, what is the relationship between voltage (V), current (I), and resistance (R)?',
      options: ['V = I + R', 'V = I × R', 'V = I ÷ R', 'V = R ÷ I'],
      correct: 1,
      explanation: 'Ohm\'s Law states that Voltage = Current × Resistance, or V = I × R. This fundamental relationship applies to ohmic materials.'
    },
    {
      question: 'What is the formula for electric power?',
      options: ['P = V + I', 'P = V × I', 'P = V ÷ I', 'P = I ÷ V'],
      correct: 1,
      explanation: 'Electric power is calculated using P = V × I, where P is power in watts, V is voltage in volts, and I is current in amperes.'
    },
    {
      question: 'In a series circuit, how does the total resistance compare to individual resistances?',
      options: ['Total resistance is less than any individual resistance', 'Total resistance equals the largest individual resistance', 'Total resistance is the sum of all individual resistances', 'Total resistance is the average of all individual resistances'],
      correct: 2,
      explanation: 'In a series circuit, the total resistance is the sum of all individual resistances: R_total = R₁ + R₂ + R₃ + ...'
    },
    {
      question: 'In a parallel circuit, what is the same across all branches?',
      options: ['Current', 'Resistance', 'Voltage', 'Power'],
      correct: 2,
      explanation: 'In a parallel circuit, the voltage is the same across all branches because each branch is connected directly to the same two points of the power source.'
    },
    {
      question: 'If a 12V battery is connected to a 6Ω resistor, what is the current flowing through the circuit?',
      options: ['0.5A', '2A', '18A', '72A'],
      correct: 1,
      explanation: 'Using Ohm\'s Law: I = V/R = 12V ÷ 6Ω = 2A. The current is 2 amperes.'
    },
    {
      question: 'What happens to the total resistance when more resistors are added in parallel?',
      options: ['Total resistance increases', 'Total resistance decreases', 'Total resistance stays the same', 'Total resistance becomes zero'],
      correct: 1,
      explanation: 'When resistors are added in parallel, the total resistance decreases because there are more paths for current to flow, making it easier for current to pass through.'
    },
    {
      question: 'Which safety device protects a circuit by melting when current exceeds a safe limit?',
      options: ['Circuit breaker', 'Resistor', 'Capacitor', 'Fuse'],
      correct: 3,
      explanation: 'A fuse is a safety device that contains a thin wire that melts and breaks the circuit when current exceeds a predetermined safe limit, protecting the circuit from damage.'
    },
    {
      question: 'What is the power consumed by a device that operates at 120V and draws 2A of current?',
      options: ['60W', '120W', '240W', '480W'],
      correct: 2,
      explanation: 'Using the power formula: P = V × I = 120V × 2A = 240W. The device consumes 240 watts of power.'
    },
    {
      question: 'Why are household electrical outlets wired in parallel rather than series?',
      options: ['To save on wiring costs', 'To ensure each device gets full voltage and works independently', 'To reduce the total current in the house', 'To make the circuits simpler to install'],
      correct: 1,
      explanation: 'Household outlets are wired in parallel so that each device receives the full voltage from the power source and can operate independently. If one device fails or is turned off, others continue to work.'
    }
  ]
}

export default function ElectricityModule() {
  return (
    <ModuleLayout 
      module={electricityModule} 
      grade={10} 
      subject="Science" 
    />
  )
}