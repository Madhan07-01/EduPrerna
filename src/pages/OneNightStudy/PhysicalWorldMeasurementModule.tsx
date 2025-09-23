import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const physicalWorldMeasurementModule: LearningModule = {
  title: 'Physical World and Measurement',
  introduction: 'Welcome to the fascinating world of Physics! Physics is the fundamental science that helps us understand how everything in the universe works - from the smallest atoms to the largest galaxies. In this module, we\'ll explore the scope and excitement of physics, and dive deep into one of its most essential aspects: measurement. Without accurate measurement, there would be no science! You\'ll learn about fundamental and derived quantities, SI units, measurement instruments, and how to handle errors in experiments. This knowledge will be the foundation for all your future studies in physics. Get ready to discover how physicists measure and understand our world!',
  concepts: [
    {
      title: 'The Scope and Excitement of Physics',
      content: 'Physics is the study of nature and natural phenomena at all scales. It seeks to understand the fundamental laws that govern everything in the universe. From subatomic particles to cosmic structures, physics provides the framework for understanding how things work. The scope of physics is incredibly vast, covering areas like mechanics, thermodynamics, electromagnetism, optics, and modern physics.',
      examples: [
        'Mechanics: Study of motion and forces (cars, rockets, planets)',
        'Thermodynamics: Study of heat and temperature (engines, refrigerators)',
        'Electromagnetism: Study of electric and magnetic fields (motors, generators, communication)',
        'Optics: Study of light and vision (cameras, telescopes, microscopes)',
        'Modern Physics: Study of atomic and nuclear phenomena (lasers, semiconductors, quantum mechanics)',
        'Interdisciplinary applications: Biophysics, astrophysics, geophysics',
        'Technology development: MRI machines, smartphones, GPS systems'
      ]
    },
    {
      title: 'Physical Quantities and Units',
      content: 'In physics, we measure various physical quantities to understand and describe natural phenomena. These quantities are classified as fundamental or derived. The International System of Units (SI) provides a standardized way to express measurements, ensuring consistency across the scientific community.',
      examples: [
        'Fundamental Quantities: Base quantities that cannot be expressed in terms of other quantities',
        'Seven SI Fundamental Quantities: Length (meter), Mass (kilogram), Time (second), Electric current (ampere), Thermodynamic temperature (kelvin), Amount of substance (mole), Luminous intensity (candela)',
        'Derived Quantities: Quantities expressed in terms of fundamental quantities',
        'Examples of Derived Quantities: Area (length²), Volume (length³), Speed (length/time), Force (mass × acceleration)',
        'SI Units: The modern form of the metric system, used globally in science and industry',
        'Advantages of SI Units: Coherence, decimal system, universal acceptance'
      ]
    },
    {
      title: 'Measurement Instruments and Their Uses',
      content: 'Accurate measurement is crucial in physics. Different instruments are used to measure various physical quantities with appropriate precision. Understanding these instruments and their limitations is essential for conducting reliable experiments.',
      examples: [
        'Length Measurement: Rulers (mm precision), Vernier calipers (0.01mm precision), Screw gauge (0.001mm precision)',
        'Mass Measurement: Beam balances, digital balances with varying precision',
        'Time Measurement: Stopwatches, digital timers, atomic clocks (extremely precise)',
        'Temperature Measurement: Thermometers (mercury, digital, infrared)',
        'Electric Current Measurement: Ammeters (analog and digital)',
        'Voltage Measurement: Voltmeters (analog and digital)',
        'Specialized Instruments: Spectrometers, oscilloscopes, pressure gauges',
        'Choosing Instruments: Match instrument precision to required accuracy'
      ]
    },
    {
      title: 'Accuracy, Precision, and Errors',
      content: 'No measurement is perfectly accurate. Understanding the difference between accuracy and precision, and knowing how to identify and minimize errors, is crucial for good experimental work. Errors can be systematic or random, and each type requires different approaches to minimize their impact.',
      examples: [
        'Accuracy: How close a measurement is to the true value',
        'Precision: How consistent repeated measurements are with each other',
        'Systematic Errors: Consistent errors due to instrument defects or flawed techniques (zero error, calibration issues)',
        'Random Errors: Unpredictable variations due to environmental factors (temperature fluctuations, vibrations)',
        'Least Count Error: Error associated with the smallest measurement an instrument can make',
        'Error Reduction: Taking multiple readings, calibrating instruments, controlling environment',
        'Significant Figures: Rules for expressing measurement precision in calculations'
      ]
    },
    {
      title: 'Dimensional Analysis and Its Applications',
      content: 'Dimensional analysis is a powerful tool that uses the dimensions (units) of physical quantities to check the correctness of equations and to derive relationships between physical quantities. It\'s based on the principle that only quantities with the same dimensions can be added or subtracted.',
      examples: [
        'Dimensions: Expressing physical quantities in terms of fundamental quantities [M], [L], [T], [A], [K], [mol], [cd]',
        'Example Dimensions: Speed [LT⁻¹], Force [MLT⁻²], Energy [ML²T⁻²]',
        'Principle of Homogeneity: All terms in an equation must have the same dimensions',
        'Checking Equations: Verifying if s = ut + ½at² is dimensionally correct',
        'Deriving Formulas: Finding relationships between variables using dimensional analysis',
        'Limitations: Cannot determine dimensionless constants, cannot detect plus/minus signs'
      ]
    },
    {
      title: 'Standards of Measurement for Length, Mass, and Time',
      content: 'The definitions of fundamental units have evolved over time to become more precise and universally reproducible. Modern definitions are based on fundamental physical constants, making them more stable and accurate than earlier definitions based on physical artifacts.',
      examples: [
        'Length (meter): Originally defined by a platinum-iridium rod, now defined as distance light travels in vacuum in 1/299,792,458 second',
        'Mass (kilogram): Originally defined by a platinum-iridium cylinder, now defined by fixing Planck constant at 6.62607015×10⁻³⁴ Js',
        'Time (second): Originally defined by Earth\'s rotation, now defined by 9,192,631,770 oscillations of cesium-133 atom',
        'Advantages of Modern Definitions: Based on fundamental constants, universally reproducible, extremely stable',
        'Practical Standards: Using these definitions to calibrate measurement instruments'
      ]
    }
  ],
  mcqs: [
    {
      question: 'Which of the following is NOT a fundamental quantity in the SI system?',
      options: ['Length', 'Mass', 'Force', 'Time'],
      correct: 2,
      explanation: 'Force is a derived quantity, expressed as mass times acceleration (MLT⁻²). Length, mass, and time are fundamental quantities in the SI system.'
    },
    {
      question: 'What is the SI unit of luminous intensity?',
      options: ['Lumen', 'Candela', 'Lux', 'Watt'],
      correct: 1,
      explanation: 'The SI unit of luminous intensity is candela (cd). It measures the perceived power of light in a specific direction.'
    },
    {
      question: 'Which instrument provides the highest precision for measuring length?',
      options: ['Meter scale', 'Vernier caliper', 'Screw gauge', 'Measuring tape'],
      correct: 2,
      explanation: 'A screw gauge (also called micrometer screw gauge) can measure length up to 0.001 mm precision, which is higher than vernier caliper (0.01 mm) and meter scale (1 mm).'
    },
    {
      question: 'What is the difference between accuracy and precision?',
      options: ['They are the same thing', 'Accuracy refers to consistency, precision refers to closeness to true value', 'Accuracy refers to closeness to true value, precision refers to consistency', 'Accuracy is about instruments, precision is about methods'],
      correct: 2,
      explanation: 'Accuracy refers to how close a measurement is to the true value, while precision refers to how consistent repeated measurements are with each other.'
    },
    {
      question: 'Which of the following errors can be minimized by taking multiple readings?',
      options: ['Zero error', 'Calibration error', 'Random error', 'Systematic error'],
      correct: 2,
      explanation: 'Random errors can be minimized by taking multiple readings and calculating the average. Systematic errors like zero error and calibration error require instrument correction.'
    },
    {
      question: 'What is the dimensional formula for force?',
      options: ['[MLT⁻²]', '[MLT⁻¹]', '[ML²T⁻²]', '[M²LT⁻²]'],
      correct: 0,
      explanation: 'Force = mass × acceleration. Acceleration has dimensions [LT⁻²], so force has dimensions [M] × [LT⁻²] = [MLT⁻²].'
    },
    {
      question: 'The modern definition of the meter is based on:',
      options: ['A platinum-iridium rod', 'The wavelength of krypton-86 radiation', 'Distance light travels in a specific time', 'The Earth\'s circumference'],
      correct: 2,
      explanation: 'The meter is defined as the distance traveled by light in vacuum during a time interval of 1/299,792,458 of a second.'
    },
    {
      question: 'How many significant figures are in the number 0.00450?',
      options: ['6', '5', '3', '2'],
      correct: 2,
      explanation: 'In 0.00450, the leading zeros are not significant, but the trailing zero after the decimal point is significant. So there are 3 significant figures: 4, 5, and 0.'
    },
    {
      question: 'Which of the following is a systematic error?',
      options: ['Parallax error', 'Temperature fluctuations', 'Vibrations', 'Zero error'],
      correct: 3,
      explanation: 'Zero error is a systematic error because it consistently affects all measurements in the same way. Parallax error, temperature fluctuations, and vibrations are typically random errors.'
    },
    {
      question: 'What is the principle of homogeneity of dimensions?',
      options: ['All terms in an equation must have the same dimensions', 'Dimensions must be homogeneous', 'Only similar quantities can be added', 'Dimensions can be converted'],
      correct: 0,
      explanation: 'The principle of homogeneity states that all terms in a physical equation must have the same dimensions, ensuring the equation is dimensionally consistent.'
    }
  ]
}

export default function PhysicalWorldMeasurementModule() {
  return (
    <ModuleLayout 
      module={physicalWorldMeasurementModule} 
      grade={11} 
      subject="Physics" 
    />
  )
}