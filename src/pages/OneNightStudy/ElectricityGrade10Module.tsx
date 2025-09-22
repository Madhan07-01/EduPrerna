import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const electricityModule: LearningModule = {
  title: 'Electricity',
  introduction: 'Welcome to the fascinating world of Electricity! As a 10th-grade student, you\'re ready to dive deep into understanding how electric current powers our modern world. From the phone in your pocket to the lights in your home, electricity is everywhere. In this module, we\'ll explore the fundamental concepts that govern electric current, voltage, and resistance. You\'ll master Ohm\'s Law, understand how to calculate electric power, and learn to analyze both series and parallel circuits. By the end of this module, you\'ll have a solid foundation in electrical principles that will serve you well in higher grades and in understanding the technology around you.',
  concepts: [
    {
      title: 'Electric Current - The Flow of Charge',
      content: 'Electric current is the rate at which electric charge flows through a conductor. Think of it like water flowing through a pipe - the more water that flows per second, the greater the current. Understanding current is essential for analyzing any electrical circuit.',
      examples: [
        'Definition: Current (I) = Charge (Q) ÷ Time (t)',
        'Unit: Ampere (A), where 1 A = 1 Coulomb of charge flowing per second',
        'Direction: Conventional current flows from positive to negative terminal',
        'Actual flow: Electrons flow from negative to positive (opposite to conventional current)',
        'Measurement: Ammeter is connected in series to measure current',
        'Typical values: Smartphone charging (1-2A), household circuit (15-20A), lightning (thousands of A)'
      ]
    },
    {
      title: 'Voltage - Electrical Pressure',
      content: 'Voltage, also known as potential difference, is the electrical pressure that drives current through a circuit. It represents the energy available to move each unit of charge through a conductor. Higher voltage means more "push" for the electric current.',
      examples: [
        'Definition: Voltage (V) = Energy (E) ÷ Charge (Q)',
        'Unit: Volt (V), where 1 V = 1 Joule of energy per Coulomb of charge',
        'Analogy: Like water pressure in pipes - higher pressure pushes more water',
        'Sources: Batteries, generators, and power outlets provide voltage',
        'Measurement: Voltmeter is connected in parallel to measure voltage',
        'Typical values: AA battery (1.5V), car battery (12V), household outlet (230V in India, 120V in US)'
      ]
    },
    {
      title: 'Resistance - Opposition to Current Flow',
      content: 'Resistance is the property of a material that opposes the flow of electric current. It determines how much current will flow for a given voltage. Different materials have different resistance properties, which is why some are good conductors and others are insulators.',
      examples: [
        'Definition: Resistance (R) = Voltage (V) ÷ Current (I) [from Ohm\'s Law]',
        'Unit: Ohm (Ω), named after Georg Simon Ohm',
        'Factors affecting resistance: Length (longer wire = more resistance), Cross-sectional area (wider wire = less resistance), Material type (copper < rubber)',
        'Temperature effect: Resistance of metals generally increases with temperature',
        'Measurement: Ohmmeter measures resistance directly',
        'Typical values: Copper wire (very low resistance), human body (1000-100,000Ω), air (very high resistance)'
      ]
    },
    {
      title: 'Ohm\'s Law - The Fundamental Relationship',
      content: 'Ohm\'s Law is one of the most important principles in electricity. It states that the current through a conductor between two points is directly proportional to the voltage across the two points, provided temperature remains constant. This law forms the foundation for analyzing electrical circuits.',
      examples: [
        'Formula: V = I × R, where V = voltage (volts), I = current (amperes), R = resistance (ohms)',
        'Derived forms: I = V/R and R = V/I',
        'Applications: Calculate unknown quantity when any two of V, I, R are known',
        'Example: If a 12V battery is connected to a 4Ω resistor, current I = V/R = 12V ÷ 4Ω = 3A',
        'Limitations: Only applies to ohmic materials (metals at constant temperature)',
        'Non-ohmic devices: Diodes, LEDs, and transistors don\'t follow Ohm\'s Law'
      ]
    },
    {
      title: 'Electric Power - Rate of Energy Transfer',
      content: 'Electric power is the rate at which electrical energy is transferred by an electric circuit. It tells us how fast electrical energy is being converted to other forms like heat, light, or mechanical energy. This is important for understanding energy consumption and efficiency.',
      examples: [
        'Definition: Power (P) = Energy (E) ÷ Time (t)',
        'Formula: P = V × I (Power = Voltage × Current)',
        'Derived formulas: P = I²R and P = V²/R (using Ohm\'s Law)',
        'Unit: Watt (W), where 1 W = 1 Joule of energy per second',
        'Measurement: Wattmeter measures power directly',
        'Example: A 100W bulb uses 100 Joules of energy per second'
      ]
    },
    {
      title: 'Series Circuits - Single Path for Current',
      content: 'In a series circuit, all components are connected end-to-end in a single path for current flow. This means the same current flows through all components, but the voltage is divided among them. If one component fails, the entire circuit stops working.',
      examples: [
        'Current: Same through all components (I_total = I₁ = I₂ = I₃)',
        'Voltage: Divided among components (V_total = V₁ + V₂ + V₃)',
        'Resistance: Add up (R_total = R₁ + R₂ + R₃)',
        'If one component fails (like a bulb burning out), entire circuit stops working',
        'Applications: Old-style Christmas lights, flashlights, some automotive circuits'
      ]
    },
    {
      title: 'Parallel Circuits - Multiple Paths for Current',
      content: 'In a parallel circuit, components are connected across the same two points, providing multiple paths for current flow. This means voltage is the same across all branches, but current divides among them. If one component fails, others continue working.',
      examples: [
        'Voltage: Same across all branches (V_total = V₁ = V₂ = V₃)',
        'Current: Divides among branches (I_total = I₁ + I₂ + I₃)',
        'Resistance: Reciprocal relationship (1/R_total = 1/R₁ + 1/R₂ + 1/R₃)',
        'If one component fails, others continue working independently',
        'Applications: House wiring, car electrical systems, electronic devices'
      ]
    },
    {
      title: 'Total Resistance Formulas - Series and Parallel',
      content: 'Calculating total resistance is crucial for analyzing complex circuits. The method depends on whether resistors are connected in series or parallel. These formulas help us determine how much current will flow in a circuit.',
      examples: [
        'Series circuits: R_total = R₁ + R₂ + R₃ + ... (just add them up)',
        'Parallel circuits: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃ + ... (add reciprocals)',
        'Example for series: Two 5Ω resistors in series = 5 + 5 = 10Ω total',
        'Example for parallel: Two 10Ω resistors in parallel = 1/R_total = 1/10 + 1/10 = 2/10, so R_total = 5Ω',
        'Special case: Two equal resistors in parallel = half the resistance of one',
        'Complex circuits: Break them into series and parallel sections step by step'
      ]
    },
    {
      title: 'Key Differences Between Series and Parallel Circuits',
      content: 'Understanding the differences between series and parallel circuits is essential for analyzing real-world electrical systems. Each configuration has distinct advantages and is used in different applications based on their characteristics.',
      examples: [
        'Current flow: Series - same current everywhere; Parallel - current divides among branches',
        'Voltage distribution: Series - voltage divides; Parallel - same voltage across all branches',
        'Failure impact: Series - one failure stops everything; Parallel - failures are isolated',
        'Resistance effect: Series - total resistance increases; Parallel - total resistance decreases',
        'Brightness of bulbs: Series - bulbs may be dimmer; Parallel - each bulb gets full voltage',
        'House wiring: Uses parallel circuits so appliances work independently'
      ]
    },
    {
      title: 'Common Applications of Electricity',
      content: 'Electricity has countless applications in our daily lives. Understanding these applications helps us appreciate the importance of electrical principles and use electricity safely and efficiently.',
      examples: [
        'Heating: Electric heaters, toasters, and hair dryers convert electrical energy to heat energy',
        'Lighting: Incandescent, fluorescent, and LED bulbs convert electrical energy to light energy',
        'Motors: Convert electrical energy to mechanical energy (fans, washing machines, electric cars)',
        'Electronics: Computers, smartphones, and TVs use complex circuits for information processing',
        'Power distribution: Transformers step voltage up for efficient transmission and step it down for safe use',
        'Safety systems: Circuit breakers and fuses protect against overcurrent, grounding prevents electric shocks'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the unit of electric current?',
      options: ['Volt (V)', 'Ohm (Ω)', 'Ampere (A)', 'Watt (W)'],
      correct: 2,
      explanation: 'The unit of electric current is the Ampere (A), which represents the flow of one Coulomb of charge per second. This is named after André-Marie Ampère, a French physicist who contributed significantly to the study of electromagnetism.'
    },
    {
      question: 'According to Ohm\'s Law, what is the relationship between voltage (V), current (I), and resistance (R)?',
      options: ['V = I + R', 'V = I × R', 'V = I ÷ R', 'V = R ÷ I'],
      correct: 1,
      explanation: 'Ohm\'s Law states that Voltage = Current × Resistance, or V = I × R. This fundamental relationship applies to ohmic materials like metals at constant temperature. You can rearrange this formula to find any unknown quantity if you know the other two.'
    },
    {
      question: 'What is the formula for electric power?',
      options: ['P = V + I', 'P = V × I', 'P = V ÷ I', 'P = I ÷ V'],
      correct: 1,
      explanation: 'Electric power is calculated using P = V × I, where P is power in watts, V is voltage in volts, and I is current in amperes. This formula tells us the rate at which electrical energy is being converted to other forms of energy.'
    },
    {
      question: 'In a series circuit, how does the total resistance compare to individual resistances?',
      options: ['Total resistance is less than any individual resistance', 'Total resistance equals the largest individual resistance', 'Total resistance is the sum of all individual resistances', 'Total resistance is the average of all individual resistances'],
      correct: 2,
      explanation: 'In a series circuit, the total resistance is the sum of all individual resistances: R_total = R₁ + R₂ + R₃ + ... This makes sense because the current has to pass through each resistor one after another, facing the opposition of each one.'
    },
    {
      question: 'In a parallel circuit, what is the same across all branches?',
      options: ['Current', 'Resistance', 'Voltage', 'Power'],
      correct: 2,
      explanation: 'In a parallel circuit, the voltage is the same across all branches because each branch is connected directly to the same two points of the power source. This is why household appliances all receive the same voltage (like 230V in India) regardless of how many are connected.'
    },
    {
      question: 'If a 12V battery is connected to a 6Ω resistor, what is the current flowing through the circuit?',
      options: ['0.5A', '2A', '18A', '72A'],
      correct: 1,
      explanation: 'Using Ohm\'s Law: I = V/R = 12V ÷ 6Ω = 2A. The current is 2 amperes. This shows how knowing any two of the three quantities (V, I, R) allows you to calculate the third using Ohm\'s Law.'
    },
    {
      question: 'What happens to the total resistance when more resistors are added in parallel?',
      options: ['Total resistance increases', 'Total resistance decreases', 'Total resistance stays the same', 'Total resistance becomes zero'],
      correct: 1,
      explanation: 'When resistors are added in parallel, the total resistance decreases because there are more paths for current to flow. Think of it like adding more lanes to a highway - traffic (current) can flow more easily, reducing the overall resistance.'
    },
    {
      question: 'Which safety device protects a circuit by melting when current exceeds a safe limit?',
      options: ['Circuit breaker', 'Resistor', 'Capacitor', 'Fuse'],
      correct: 3,
      explanation: 'A fuse is a safety device that contains a thin wire that melts and breaks the circuit when current exceeds a predetermined safe limit. This protects the circuit from damage due to overcurrent. Circuit breakers also provide protection but work differently - they trip (switch off) rather than melt.'
    },
    {
      question: 'What is the power consumed by a device that operates at 230V and draws 2A of current?',
      options: ['115W', '230W', '460W', '920W'],
      correct: 2,
      explanation: 'Using the power formula: P = V × I = 230V × 2A = 460W. The device consumes 460 watts of power. This is how electric companies calculate your electricity bill - they measure how much power your appliances use over time.'
    },
    {
      question: 'Why are household electrical outlets wired in parallel rather than series?',
      options: ['To save on wiring costs', 'To ensure each device gets full voltage and works independently', 'To reduce the total current in the house', 'To make the circuits simpler to install'],
      correct: 1,
      explanation: 'Household outlets are wired in parallel so that each device receives the full voltage from the power source and can operate independently. If outlets were wired in series, turning off one device would turn off all others, and each device would not receive the full voltage needed to operate properly.'
    }
  ]
}

export default function ElectricityGrade10Module() {
  return (
    <ModuleLayout 
      module={electricityModule} 
      grade={10} 
      subject="Science" 
    />
  )
}