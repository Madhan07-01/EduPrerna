// Comprehensive Hardcoded Question Bank for Mini Games
// Organized by Subject → Grade → Lesson
// Each lesson contains exactly 15 questions (5 levels × 3 questions per level)

export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  difficulty: number
  explanation?: string
}

export interface EquationQuestion {
  id: number
  equation: string // Equation with blanks marked as _ or [blank]
  availableOptions: (string | number)[] // Options to drag into blanks
  difficulty: number
  // No more fixed blanks array - validation will be done by equation evaluation
}

export interface TargetQuestion {
  id: number
  question: string
  correctTarget: string
  targets: string[]
  difficulty: number
}

export interface LessonQuestions {
  [lesson: string]: Question[]
}

export interface GradeQuestions {
  [grade: string]: LessonQuestions
}

export interface SubjectQuestions {
  [subject: string]: GradeQuestions
}

// Mathematics Question Bank
const mathematicsQuestions: GradeQuestions = {
  'grade-6': {
    'Fractions': [
      { id: 1, question: 'What is 1/2 + 1/4?', options: ['1/4', '3/4', '1/6'], correctAnswer: 1, difficulty: 1 },
      { id: 2, question: 'What is 2/3 of 12?', options: ['6', '8', '4'], correctAnswer: 1, difficulty: 1 },
      { id: 3, question: 'Which is larger: 3/5 or 2/3?', options: ['3/5', '2/3', 'Equal'], correctAnswer: 1, difficulty: 1 },
      { id: 4, question: 'What is 3/4 - 1/2?', options: ['1/4', '1/2', '2/4'], correctAnswer: 0, difficulty: 2 },
      { id: 5, question: 'Convert 1.5 to a fraction', options: ['3/2', '1/2', '5/3'], correctAnswer: 0, difficulty: 2 },
      { id: 6, question: 'What is 2/5 + 1/5?', options: ['3/5', '3/10', '1/5'], correctAnswer: 0, difficulty: 2 },
      { id: 7, question: 'Simplify 6/8', options: ['3/4', '2/3', '4/6'], correctAnswer: 0, difficulty: 2 },
      { id: 8, question: 'What is 5/6 - 1/3?', options: ['1/2', '4/3', '2/6'], correctAnswer: 0, difficulty: 2 },
      { id: 9, question: 'Which fraction equals 0.25?', options: ['1/4', '1/3', '2/5'], correctAnswer: 0, difficulty: 2 },
      { id: 10, question: 'What is 1/3 × 2/5?', options: ['2/15', '3/8', '2/8'], correctAnswer: 0, difficulty: 3 },
      { id: 11, question: 'Convert 3/4 to decimal', options: ['0.75', '0.34', '0.43'], correctAnswer: 0, difficulty: 3 },
      { id: 12, question: 'What is the reciprocal of 2/3?', options: ['3/2', '2/3', '6'], correctAnswer: 0, difficulty: 3 },
      { id: 13, question: 'Which is smallest: 1/2, 1/3, or 1/4?', options: ['1/2', '1/3', '1/4'], correctAnswer: 2, difficulty: 3 },
      { id: 14, question: 'What is 4/5 + 1/10?', options: ['9/10', '5/15', '4/10'], correctAnswer: 0, difficulty: 3 },
      { id: 15, question: 'Divide 3/4 by 1/2', options: ['3/2', '3/8', '6/4'], correctAnswer: 0, difficulty: 3 }
    ],
    'Algebra Basics': [
      { id: 1, question: 'Solve: x + 5 = 8', options: ['x = 3', 'x = 4', 'x = 2'], correctAnswer: 0, difficulty: 1 },
      { id: 2, question: 'What is 2x when x = 4?', options: ['6', '8', '10'], correctAnswer: 1, difficulty: 1 },
      { id: 3, question: 'Solve: x - 7 = 12', options: ['x = 19', 'x = 5', 'x = -5'], correctAnswer: 0, difficulty: 1 },
      { id: 4, question: 'What is 3x + 2 when x = 2?', options: ['8', '7', '6'], correctAnswer: 0, difficulty: 2 },
      { id: 5, question: 'Solve: 4x = 20', options: ['x = 5', 'x = 4', 'x = 16'], correctAnswer: 0, difficulty: 2 },
      { id: 6, question: 'If a = b + 3 and b = 5, what is a?', options: ['8', '2', '15'], correctAnswer: 0, difficulty: 2 },
      { id: 7, question: 'Solve: x/3 = 4', options: ['x = 12', 'x = 7', 'x = 1'], correctAnswer: 0, difficulty: 2 },
      { id: 8, question: 'What is the value of 5x - 3 when x = 4?', options: ['17', '23', '13'], correctAnswer: 0, difficulty: 2 },
      { id: 9, question: 'Solve: 2x + 5 = 13', options: ['x = 4', 'x = 9', 'x = 6'], correctAnswer: 0, difficulty: 2 },
      { id: 10, question: 'If y = x² and x = 3, what is y?', options: ['9', '6', '12'], correctAnswer: 0, difficulty: 3 },
      { id: 11, question: 'Solve: 3(x - 2) = 12', options: ['x = 6', 'x = 4', 'x = 8'], correctAnswer: 0, difficulty: 3 },
      { id: 12, question: 'What is x if 2x - 8 = x + 2?', options: ['x = 10', 'x = 6', 'x = 4'], correctAnswer: 0, difficulty: 3 },
      { id: 13, question: 'Solve: 3x - 6 = 9', options: ['x = 5', 'x = 4', 'x = 3'], correctAnswer: 0, difficulty: 3 },
      { id: 14, question: 'If y = 2x + 1, what is y when x = 3?', options: ['7', '6', '8'], correctAnswer: 0, difficulty: 3 },
      { id: 15, question: 'Solve: 2(x + 3) = 14', options: ['x = 4', 'x = 5', 'x = 3'], correctAnswer: 0, difficulty: 3 }
    ],
    'Geometry Fundamentals': [
      { id: 1, question: 'How many sides does a triangle have?', options: ['2', '3', '4'], correctAnswer: 1, difficulty: 1 },
      { id: 2, question: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '360°'], correctAnswer: 1, difficulty: 1 },
      { id: 3, question: 'How many vertices does a cube have?', options: ['6', '8', '12'], correctAnswer: 1, difficulty: 1 },
      { id: 4, question: 'Area of a rectangle with length 5 and width 3?', options: ['8', '15', '16'], correctAnswer: 1, difficulty: 2 },
      { id: 5, question: 'What is the perimeter of a square with side 4?', options: ['8', '12', '16'], correctAnswer: 2, difficulty: 2 },
      { id: 6, question: 'How many edges does a rectangular prism have?', options: ['8', '10', '12'], correctAnswer: 2, difficulty: 2 },
      { id: 7, question: 'What is the perimeter of a rectangle 6×4?', options: ['20', '24', '10'], correctAnswer: 0, difficulty: 2 },
      { id: 8, question: 'Which angle is 90 degrees?', options: ['Acute', 'Right', 'Obtuse'], correctAnswer: 1, difficulty: 2 },
      { id: 9, question: 'How many faces does a pyramid have?', options: ['4', '5', '6'], correctAnswer: 1, difficulty: 2 },
      { id: 10, question: 'Which shape has 6 sides?', options: ['Pentagon', 'Hexagon', 'Octagon'], correctAnswer: 1, difficulty: 3 },
      { id: 11, question: 'What is the area of a circle with radius 3? (π = 3.14)', options: ['28.26', '18.84', '9.42'], correctAnswer: 0, difficulty: 3 },
      { id: 12, question: 'What is the circumference of a circle with radius 2? (π = 3.14)', options: ['12.56', '6.28', '4.14'], correctAnswer: 0, difficulty: 3 },
      { id: 13, question: 'Which shape has all equal sides?', options: ['Rectangle', 'Square', 'Parallelogram'], correctAnswer: 1, difficulty: 3 },
      { id: 14, question: 'What is the volume of a cube with side 3?', options: ['27', '18', '9'], correctAnswer: 0, difficulty: 3 },
      { id: 15, question: 'How many degrees in a full circle?', options: ['180°', '270°', '360°'], correctAnswer: 2, difficulty: 3 }
    ]
  }
}

// Physics Question Bank
const physicsQuestions: GradeQuestions = {
  'grade-8': {
    'Force and Motion': [
      { id: 1, question: 'What is force?', options: ['Push or pull', 'Speed only', 'Weight only'], correctAnswer: 0, difficulty: 1 },
      { id: 2, question: 'Unit of force is?', options: ['Meter', 'Newton', 'Kilogram'], correctAnswer: 1, difficulty: 1 },
      { id: 3, question: 'What causes motion?', options: ['Weight', 'Force', 'Color'], correctAnswer: 1, difficulty: 1 },
      { id: 4, question: 'Which is contact force?', options: ['Gravity', 'Friction', 'Magnetism'], correctAnswer: 1, difficulty: 2 },
      { id: 5, question: 'What is inertia?', options: ['Resistance to change', 'Speed', 'Weight'], correctAnswer: 0, difficulty: 2 },
      { id: 6, question: 'Newton\'s first law is about?', options: ['Inertia', 'Acceleration', 'Action-reaction'], correctAnswer: 0, difficulty: 2 },
      { id: 7, question: 'What is acceleration?', options: ['Change in velocity', 'Constant speed', 'Force only'], correctAnswer: 0, difficulty: 2 },
      { id: 8, question: 'Formula for speed?', options: ['Distance/Time', 'Time/Distance', 'Force*Mass'], correctAnswer: 0, difficulty: 2 },
      { id: 9, question: 'What is momentum?', options: ['Mass × Velocity', 'Force × Time', 'Speed only'], correctAnswer: 0, difficulty: 2 },
      { id: 10, question: 'Non-contact force example?', options: ['Friction', 'Gravity', 'Push'], correctAnswer: 1, difficulty: 3 },
      { id: 11, question: 'What increases friction?', options: ['Smooth surface', 'Rough surface', 'No contact'], correctAnswer: 1, difficulty: 3 },
      { id: 12, question: 'Action and reaction are?', options: ['Same direction', 'Opposite direction', 'No relation'], correctAnswer: 1, difficulty: 3 },
      { id: 13, question: 'What is uniform motion?', options: ['Constant velocity', 'Changing speed', 'No motion'], correctAnswer: 0, difficulty: 3 },
      { id: 14, question: 'SI unit of mass?', options: ['Newton', 'Kilogram', 'Meter'], correctAnswer: 1, difficulty: 3 },
      { id: 15, question: 'What is circular motion?', options: ['Straight line', 'Curved path', 'No movement'], correctAnswer: 1, difficulty: 3 }
    ],
    'Electricity and Circuits': [
      { id: 1, question: 'What is electric current?', options: ['Flow of electrons', 'Static charge', 'No movement'], correctAnswer: 0, difficulty: 1 },
      { id: 2, question: 'Unit of current?', options: ['Volt', 'Ampere', 'Ohm'], correctAnswer: 1, difficulty: 1 },
      { id: 3, question: 'What is voltage?', options: ['Current flow', 'Potential difference', 'Resistance'], correctAnswer: 1, difficulty: 1 },
      { id: 4, question: 'Which material conducts electricity?', options: ['Rubber', 'Copper', 'Wood'], correctAnswer: 1, difficulty: 2 },
      { id: 5, question: 'What is resistance?', options: ['Easy flow', 'Opposition to current', 'Speed of electrons'], correctAnswer: 1, difficulty: 2 },
      { id: 6, question: 'Symbol for battery?', options: ['—||—', '—|+|—', '—∼—'], correctAnswer: 1, difficulty: 2 },
      { id: 7, question: 'What closes a circuit?', options: ['Switch ON', 'Switch OFF', 'No switch'], correctAnswer: 0, difficulty: 2 },
      { id: 8, question: 'LED stands for?', options: ['Light Emitting Diode', 'Low Energy Device', 'Light Electric Display'], correctAnswer: 0, difficulty: 2 },
      { id: 9, question: 'Ohm\'s law relates?', options: ['V, I, R', 'P, E, T', 'F, M, A'], correctAnswer: 0, difficulty: 2 },
      { id: 10, question: 'Series circuit has?', options: ['Multiple paths', 'Single path', 'No path'], correctAnswer: 1, difficulty: 3 },
      { id: 11, question: 'Parallel circuit allows?', options: ['Single path only', 'Multiple paths', 'No current'], correctAnswer: 1, difficulty: 3 },
      { id: 12, question: 'What happens if one bulb fails in series?', options: ['All stop working', 'Others continue', 'No effect'], correctAnswer: 0, difficulty: 3 },
      { id: 13, question: 'Fuse is used for?', options: ['Decoration', 'Safety protection', 'Light source'], correctAnswer: 1, difficulty: 3 },
      { id: 14, question: 'AC current changes?', options: ['Never', 'Direction periodically', 'Speed only'], correctAnswer: 1, difficulty: 3 },
      { id: 15, question: 'DC current flows?', options: ['Both directions', 'One direction', 'No direction'], correctAnswer: 1, difficulty: 3 }
    ]
  },
  'grade-9': {
    'Gravitation': [
      { id: 1, question: 'What is gravity?', options: ['Push force', 'Pull force', 'No force'], correctAnswer: 1, difficulty: 1 },
      { id: 2, question: 'Who discovered law of gravitation?', options: ['Einstein', 'Newton', 'Galileo'], correctAnswer: 1, difficulty: 1 },
      { id: 3, question: 'Objects fall due to?', options: ['Air', 'Gravity', 'Light'], correctAnswer: 1, difficulty: 1 },
      { id: 4, question: 'Weight depends on?', options: ['Mass only', 'Gravity only', 'Both mass and gravity'], correctAnswer: 2, difficulty: 2 },
      { id: 5, question: 'Mass remains same everywhere but weight?', options: ['Changes', 'Remains same', 'Becomes zero'], correctAnswer: 0, difficulty: 2 },
      { id: 6, question: 'Value of g on Earth?', options: ['9.8 m/s²', '6.8 m/s²', '10.8 m/s²'], correctAnswer: 0, difficulty: 2 },
      { id: 7, question: 'What is free fall?', options: ['Forced motion', 'Motion under gravity only', 'No motion'], correctAnswer: 1, difficulty: 2 },
      { id: 8, question: 'Escape velocity from Earth?', options: ['11.2 km/s', '9.8 km/s', '15.2 km/s'], correctAnswer: 0, difficulty: 2 },
      { id: 9, question: 'What keeps Moon in orbit?', options: ['Air', 'Gravity', 'Magnetism'], correctAnswer: 1, difficulty: 2 },
      { id: 10, question: 'Tides are caused by?', options: ['Wind', 'Moon\'s gravity', 'Earth\'s rotation'], correctAnswer: 1, difficulty: 3 },
      { id: 11, question: 'Weight on Moon is __ of Earth weight', options: ['1/6', '1/4', '1/2'], correctAnswer: 0, difficulty: 3 },
      { id: 12, question: 'What is orbital velocity?', options: ['Escape velocity', 'Velocity to orbit', 'Landing velocity'], correctAnswer: 1, difficulty: 3 },
      { id: 13, question: 'Kepler\'s laws are about?', options: ['Planetary motion', 'Gravity only', 'Light'], correctAnswer: 0, difficulty: 3 },
      { id: 14, question: 'Gravitational constant G is?', options: ['Variable', 'Universal constant', 'Local constant'], correctAnswer: 1, difficulty: 3 },
      { id: 15, question: 'What is weightlessness?', options: ['No mass', 'No gravity effect felt', 'No motion'], correctAnswer: 1, difficulty: 3 }
    ]
  }
}

// Computer Science Question Bank
const computerScienceQuestions: GradeQuestions = {
  'grade-6': {
    'Computer Basics': [
      { id: 1, question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Unit'], correctAnswer: 0, difficulty: 1 },
      { id: 2, question: 'Which device is used for input?', options: ['Monitor', 'Keyboard', 'Speaker'], correctAnswer: 1, difficulty: 1 },
      { id: 3, question: 'Which is an output device?', options: ['Mouse', 'Microphone', 'Printer'], correctAnswer: 2, difficulty: 1 },
      { id: 4, question: 'What is RAM?', options: ['Random Access Memory', 'Read Access Memory', 'Real Access Memory'], correctAnswer: 0, difficulty: 2 },
      { id: 5, question: 'Which is a storage device?', options: ['CPU', 'Hard Drive', 'RAM'], correctAnswer: 1, difficulty: 2 },
      { id: 6, question: 'What is software?', options: ['Physical parts', 'Programs and applications', 'Hardware components'], correctAnswer: 1, difficulty: 2 },
      { id: 7, question: 'Which file extension is for images?', options: ['.txt', '.jpg', '.exe'], correctAnswer: 1, difficulty: 2 },
      { id: 8, question: 'What is the brain of computer?', options: ['RAM', 'CPU', 'Hard Drive'], correctAnswer: 1, difficulty: 2 },
      { id: 9, question: 'Which is system software?', options: ['Games', 'Operating System', 'Calculator'], correctAnswer: 1, difficulty: 2 },
      { id: 10, question: 'What does GUI stand for?', options: ['Graphical User Interface', 'General User Interface', 'Global User Interface'], correctAnswer: 0, difficulty: 3 },
      { id: 11, question: 'What does WWW stand for?', options: ['World Wide Web', 'World Wide Work', 'World Web Wide'], correctAnswer: 0, difficulty: 3 },
      { id: 12, question: 'Which is a web browser?', options: ['Windows', 'Chrome', 'Excel'], correctAnswer: 1, difficulty: 3 },
      { id: 13, question: 'What is a byte?', options: ['8 bits', '4 bits', '16 bits'], correctAnswer: 0, difficulty: 3 },
      { id: 14, question: 'Which is programming language?', options: ['HTML', 'Python', 'PDF'], correctAnswer: 1, difficulty: 3 },
      { id: 15, question: 'What is virus?', options: ['Good software', 'Malicious program', 'Hardware part'], correctAnswer: 1, difficulty: 3 }
    ],
    'Programming Concepts': [
      { id: 1, question: 'What is an algorithm?', options: ['Computer part', 'Step-by-step solution', 'Programming language'], correctAnswer: 1, difficulty: 1 },
      { id: 2, question: 'What is a loop?', options: ['Repeated instructions', 'One-time instruction', 'Error in code'], correctAnswer: 0, difficulty: 1 },
      { id: 3, question: 'What is a variable?', options: ['Fixed value', 'Container for data', 'Programming error'], correctAnswer: 1, difficulty: 1 },
      { id: 4, question: 'What is debugging?', options: ['Creating bugs', 'Finding and fixing errors', 'Writing code'], correctAnswer: 1, difficulty: 2 },
      { id: 5, question: 'What is a function?', options: ['Reusable code block', 'Error message', 'Variable type'], correctAnswer: 0, difficulty: 2 },
      { id: 6, question: 'What is pseudocode?', options: ['Real programming', 'Plan in simple language', 'Complex algorithm'], correctAnswer: 1, difficulty: 2 },
      { id: 7, question: 'What is conditional statement?', options: ['Always true', 'If-then logic', 'Loop structure'], correctAnswer: 1, difficulty: 2 },
      { id: 8, question: 'What is input?', options: ['Output data', 'Data given to program', 'Error message'], correctAnswer: 1, difficulty: 2 },
      { id: 9, question: 'What is output?', options: ['Input data', 'Result from program', 'Program code'], correctAnswer: 1, difficulty: 2 },
      { id: 10, question: 'What is an array?', options: ['Single value', 'List of values', 'Programming error'], correctAnswer: 1, difficulty: 3 },
      { id: 11, question: 'What is object-oriented programming?', options: ['Linear programming', 'Programming with objects', 'Simple programming'], correctAnswer: 1, difficulty: 3 },
      { id: 12, question: 'What is recursion?', options: ['Function calling itself', 'Simple loop', 'Error handling'], correctAnswer: 0, difficulty: 3 },
      { id: 13, question: 'What is syntax?', options: ['Program logic', 'Language rules', 'Output result'], correctAnswer: 1, difficulty: 3 },
      { id: 14, question: 'What is a compiler?', options: ['Translator to machine code', 'Text editor', 'Debugging tool'], correctAnswer: 0, difficulty: 3 },
      { id: 15, question: 'What is an IDE?', options: ['Integrated Development Environment', 'Internet Data Exchange', 'Input Device Extension'], correctAnswer: 0, difficulty: 3 }
    ]
  },
  'grade-7': {
    'Logic and Problem Solving': [
      { id: 1, question: 'What is logical thinking?', options: ['Random thoughts', 'Structured reasoning', 'Emotional thinking'], correctAnswer: 1, difficulty: 1 },
      { id: 2, question: 'What is a flowchart?', options: ['Water flow diagram', 'Visual algorithm', 'Data table'], correctAnswer: 1, difficulty: 1 },
      { id: 3, question: 'True OR False equals?', options: ['Always False', 'Always True', 'Depends on values'], correctAnswer: 2, difficulty: 1 },
      { id: 4, question: 'What is problem decomposition?', options: ['Making problems bigger', 'Breaking into smaller parts', 'Solving completely'], correctAnswer: 1, difficulty: 2 },
      { id: 5, question: 'What is pattern recognition?', options: ['Creating patterns', 'Finding similarities', 'Random selection'], correctAnswer: 1, difficulty: 2 },
      { id: 6, question: 'True AND True equals?', options: ['True', 'False', 'Unknown'], correctAnswer: 0, difficulty: 2 },
      { id: 7, question: 'What is abstraction?', options: ['Making complex', 'Hiding unnecessary details', 'Showing everything'], correctAnswer: 1, difficulty: 2 },
      { id: 8, question: 'What is Boolean logic?', options: ['Complex math', 'True/False logic', 'Number system'], correctAnswer: 1, difficulty: 2 },
      { id: 9, question: 'What is iteration?', options: ['One time execution', 'Repeated execution', 'Final execution'], correctAnswer: 1, difficulty: 2 },
      { id: 10, question: 'NOT True equals?', options: ['True', 'False', 'Maybe'], correctAnswer: 1, difficulty: 3 },
      { id: 11, question: 'What is computational thinking?', options: ['Computer-like thinking', 'Human thinking only', 'No thinking'], correctAnswer: 0, difficulty: 3 },
      { id: 12, question: 'What is a truth table?', options: ['Facts table', 'Logic combinations', 'Data storage'], correctAnswer: 1, difficulty: 3 },
      { id: 13, question: 'XOR of True, True is?', options: ['True', 'False', 'Error'], correctAnswer: 1, difficulty: 3 },
      { id: 14, question: 'What is optimization?', options: ['Making worse', 'Making better/efficient', 'No change'], correctAnswer: 1, difficulty: 3 },
      { id: 15, question: 'What is heuristic?', options: ['Exact solution', 'Rule of thumb approach', 'Random method'], correctAnswer: 1, difficulty: 3 }
    ]
  }
}

// Export the question bank
export const QUESTION_BANK: SubjectQuestions = {
  mathematics: mathematicsQuestions,
  physics: physicsQuestions,
  'computer-science': computerScienceQuestions,
  chemistry: {
    'grade-9': {
      'Atoms and Molecules': [
        { id: 1, question: 'Smallest unit of matter?', options: ['Molecule', 'Atom', 'Element'], correctAnswer: 1, difficulty: 1 },
        { id: 2, question: 'Center of atom is?', options: ['Electron', 'Nucleus', 'Proton'], correctAnswer: 1, difficulty: 1 },
        { id: 3, question: 'Positive charge particle?', options: ['Electron', 'Neutron', 'Proton'], correctAnswer: 2, difficulty: 1 },
        { id: 4, question: 'Neutral particle in atom?', options: ['Proton', 'Neutron', 'Electron'], correctAnswer: 1, difficulty: 2 },
        { id: 5, question: 'Atomic number represents?', options: ['Protons', 'Neutrons', 'Electrons'], correctAnswer: 0, difficulty: 2 },
        { id: 6, question: 'What is molecule?', options: ['Single atom', 'Group of atoms', 'Ion only'], correctAnswer: 1, difficulty: 2 },
        { id: 7, question: 'H2O is example of?', options: ['Element', 'Compound', 'Mixture'], correctAnswer: 1, difficulty: 2 },
        { id: 8, question: 'Valency of oxygen?', options: ['1', '2', '3'], correctAnswer: 1, difficulty: 2 },
        { id: 9, question: 'Chemical symbol of gold?', options: ['Go', 'Au', 'Ag'], correctAnswer: 1, difficulty: 2 },
        { id: 10, question: 'What is ion?', options: ['Neutral atom', 'Charged particle', 'Molecule'], correctAnswer: 1, difficulty: 3 },
        { id: 11, question: 'Mass number is?', options: ['Protons only', 'Protons + Neutrons', 'Electrons only'], correctAnswer: 1, difficulty: 3 },
        { id: 12, question: 'Isotopes have same?', options: ['Mass number', 'Atomic number', 'Neutrons'], correctAnswer: 1, difficulty: 3 },
        { id: 13, question: 'Molecular formula of water?', options: ['H2O', 'HO2', 'H2O2'], correctAnswer: 0, difficulty: 3 },
        { id: 14, question: 'Chemical bond forms to?', options: ['Gain energy', 'Achieve stability', 'Lose mass'], correctAnswer: 1, difficulty: 3 },
        { id: 15, question: 'Avogadro number is?', options: ['6.022 × 10²³', '6.022 × 10²²', '6.022 × 10²⁴'], correctAnswer: 0, difficulty: 3 }
      ]
    }
  },
  biology: {
    'grade-7': {
      'Life Processes': [
        { id: 1, question: 'Process of making food in plants?', options: ['Respiration', 'Photosynthesis', 'Digestion'], correctAnswer: 1, difficulty: 1 },
        { id: 2, question: 'Organ for gas exchange?', options: ['Heart', 'Lungs', 'Kidney'], correctAnswer: 1, difficulty: 1 },
        { id: 3, question: 'Which gas is released in photosynthesis?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen'], correctAnswer: 1, difficulty: 1 },
        { id: 4, question: 'What do plants need for photosynthesis?', options: ['Only water', 'Sunlight, CO2, Water', 'Only sunlight'], correctAnswer: 1, difficulty: 2 },
        { id: 5, question: 'Basic unit of life?', options: ['Tissue', 'Cell', 'Organ'], correctAnswer: 1, difficulty: 2 },
        { id: 6, question: 'Process of breakdown of food?', options: ['Photosynthesis', 'Respiration', 'Excretion'], correctAnswer: 1, difficulty: 2 },
        { id: 7, question: 'Transportation in plants occurs through?', options: ['Stomata', 'Xylem and Phloem', 'Roots only'], correctAnswer: 1, difficulty: 2 },
        { id: 8, question: 'Waste removal is called?', options: ['Digestion', 'Excretion', 'Circulation'], correctAnswer: 1, difficulty: 2 },
        { id: 9, question: 'Heart pumps?', options: ['Air', 'Blood', 'Water'], correctAnswer: 1, difficulty: 2 },
        { id: 10, question: 'Chlorophyll is present in?', options: ['Roots', 'Chloroplasts', 'Mitochondria'], correctAnswer: 1, difficulty: 3 },
        { id: 11, question: 'Which is not a life process?', options: ['Growth', 'Reproduction', 'Burning'], correctAnswer: 2, difficulty: 3 },
        { id: 12, question: 'Stomata help in?', options: ['Photosynthesis', 'Gas exchange', 'Both'], correctAnswer: 2, difficulty: 3 },
        { id: 13, question: 'Energy currency of cell?', options: ['DNA', 'ATP', 'RNA'], correctAnswer: 1, difficulty: 3 },
        { id: 14, question: 'Which organ filters blood?', options: ['Lungs', 'Kidney', 'Liver'], correctAnswer: 1, difficulty: 3 },
        { id: 15, question: 'Reproduction ensures?', options: ['Growth', 'Survival of species', 'Energy'], correctAnswer: 1, difficulty: 3 }
      ]
    }
  }
}

// Equation Builder Question Bank
export const EQUATION_QUESTION_BANK: Record<string, Record<string, Record<string, EquationQuestion[]>>> = {
  mathematics: {
    'grade-6': {
      'Fractions': [
        { id: 1, equation: '_ + _ = 8', availableOptions: [2, 3, 5, 7, 4, 6], difficulty: 1 },
        { id: 2, equation: '_ - _ = 4', availableOptions: [1, 2, 3, 7, 8, 5], difficulty: 1 },
        { id: 3, equation: '_ × _ = 12', availableOptions: [2, 3, 4, 6, 5, 1], difficulty: 1 },
        { id: 4, equation: '_ + _ = 10', availableOptions: [2, 4, 6, 8, 3, 5], difficulty: 2 },
        { id: 5, equation: '_ × _ = 15', availableOptions: [2, 3, 5, 7, 4, 6], difficulty: 2 },
        { id: 6, equation: '_ - _ = 2', availableOptions: [1, 2, 3, 5, 6, 4], difficulty: 2 },
        { id: 7, equation: '_ ÷ _ = 3', availableOptions: [2, 3, 6, 9, 4, 5], difficulty: 2 },
        { id: 8, equation: '_ + _ = 9', availableOptions: [2, 4, 5, 7, 3, 6], difficulty: 2 },
        { id: 9, equation: '_ × _ = 18', availableOptions: [2, 3, 6, 9, 4, 5], difficulty: 2 },
        { id: 10, equation: '_ - _ = 5', availableOptions: [3, 5, 7, 8, 9, 6], difficulty: 3 },
        { id: 11, equation: '_ × _ = 20', availableOptions: [2, 4, 5, 8, 6, 3], difficulty: 3 },
        { id: 12, equation: '_ ÷ _ = 4', availableOptions: [3, 4, 6, 12, 8, 2], difficulty: 3 },
        { id: 13, equation: '_ + _ = 15', availableOptions: [5, 6, 7, 8, 9, 4], difficulty: 3 },
        { id: 14, equation: '_ - _ = 6', availableOptions: [4, 6, 8, 10, 12, 5], difficulty: 3 },
        { id: 15, equation: '_ × _ = 24', availableOptions: [3, 4, 6, 8, 5, 7], difficulty: 3 }
      ],
      'Algebra Basics': [
        { id: 1, equation: 'x + _ = 12', availableOptions: [3, 4, 5, 6, 7, 8], difficulty: 1 },
        { id: 2, equation: '_ - x = 8', availableOptions: [12, 13, 14, 15, 16, 17], difficulty: 1 },
        { id: 3, equation: '_ × 3 = 21', availableOptions: [5, 6, 7, 8, 9, 10], difficulty: 1 },
        { id: 4, equation: 'x + _ = 20', availableOptions: [6, 7, 8, 9, 10, 11], difficulty: 2 },
        { id: 5, equation: '_ - 3x = 9', availableOptions: [18, 21, 24, 27, 30, 33], difficulty: 2 },
        { id: 6, equation: '2x + _ = 16', availableOptions: [2, 3, 4, 5, 6, 7], difficulty: 2 },
        { id: 7, equation: '_ ÷ x = 5', availableOptions: [20, 22, 25, 28, 30, 32], difficulty: 2 },
        { id: 8, equation: 'x² - _ = 16', availableOptions: [6, 7, 8, 9, 10, 11], difficulty: 2 },
        { id: 9, equation: '_ + 2x = 18', availableOptions: [6, 7, 8, 9, 10, 11], difficulty: 2 },
        { id: 10, equation: '3x - _ = 12', availableOptions: [4, 5, 6, 7, 8, 9], difficulty: 3 },
        { id: 11, equation: '_ + x² = 34', availableOptions: [7, 8, 9, 10, 11, 12], difficulty: 3 },
        { id: 12, equation: 'x³ + _ = 35', availableOptions: [6, 7, 8, 9, 10, 11], difficulty: 3 },
        { id: 13, equation: '_ - 4x = 8', availableOptions: [24, 26, 28, 30, 32, 34], difficulty: 3 },
        { id: 14, equation: '5x + _ = 35', availableOptions: [8, 9, 10, 11, 12, 13], difficulty: 3 },
        { id: 15, equation: '_ ÷ (x-1) = 6', availableOptions: [24, 27, 30, 33, 36, 39], difficulty: 3 }
      ]
    },
    'grade-10': {
      'Quadratic Equations': [
        { id: 1, equation: 'x² + _x + 12 = 0', availableOptions: [4, 5, 6, 7, 8, 9], difficulty: 1 },
        { id: 2, equation: 'x² - _ = 0', availableOptions: [9, 16, 25, 36, 49, 64], difficulty: 1 },
        { id: 3, equation: '_ + x² = 13', availableOptions: [2, 3, 4, 5, 6, 7], difficulty: 1 },
        { id: 4, equation: 'x² + 6x + _ = 0', availableOptions: [5, 8, 9, 10, 12, 15], difficulty: 2 },
        { id: 5, equation: '2x² - _ = 0', availableOptions: [8, 18, 32, 50, 72, 98], difficulty: 2 },
        { id: 6, equation: 'x² - _x + 20 = 0', availableOptions: [8, 9, 10, 11, 12, 13], difficulty: 2 },
        { id: 7, equation: '_ - 4x² = -36', availableOptions: [0, 4, 8, 12, 16, 20], difficulty: 2 },
        { id: 8, equation: 'x² + 2x - _ = 0', availableOptions: [8, 15, 24, 35, 48, 63], difficulty: 2 },
        { id: 9, equation: '3x² + _x + 3 = 0', availableOptions: [4, 5, 6, 7, 8, 9], difficulty: 2 },
        { id: 10, equation: 'x² - 10x + _ = 0', availableOptions: [16, 21, 25, 30, 36, 42], difficulty: 3 },
        { id: 11, equation: '_x² + 8x + 12 = 0', availableOptions: [1, 2, 3, 4, 5, 6], difficulty: 3 },
        { id: 12, equation: 'x² + _x - 56 = 0', availableOptions: [1, 3, 5, 7, 9, 11], difficulty: 3 },
        { id: 13, equation: '4x² - _x + 1 = 0', availableOptions: [2, 3, 4, 5, 6, 7], difficulty: 3 },
        { id: 14, equation: 'x² + 12x + _ = 0', availableOptions: [27, 32, 35, 36, 40, 45], difficulty: 3 },
        { id: 15, equation: '_x² - 18x + 81 = 0', availableOptions: [1, 2, 3, 4, 5, 6], difficulty: 3 }
      ]
    },
    'grade-12': {
      'Calculus': [
        { id: 1, equation: '∫ cos x dx = _', availableOptions: ['sin x + C', 'cos x + C', '-sin x + C', 'tan x + C', 'x + C', '1 + C'], difficulty: 1 },
        { id: 2, equation: '∫ _ dx = x + C', availableOptions: ['1', 'x', 'x²', '2x', '0', 'C'], difficulty: 1 },
        { id: 3, equation: 'd/dx (x²) = _', availableOptions: ['x', '2x', 'x²', '2', '1', '0'], difficulty: 1 },
        { id: 4, equation: '∫ 2x dx = _', availableOptions: ['x² + C', '2x² + C', 'x + C', '2x + C', 'x³ + C', '2 + C'], difficulty: 2 },
        { id: 5, equation: 'd/dx (sin x) = _', availableOptions: ['cos x', '-cos x', 'sin x', '-sin x', 'tan x', '1'], difficulty: 2 },
        { id: 6, equation: '∫ _ dx = ln|x| + C', availableOptions: ['1/x', 'x', '1', 'ln x', 'e^x', 'x²'], difficulty: 2 },
        { id: 7, equation: 'd/dx (e^x) = _', availableOptions: ['e^x', 'x*e^x', 'e', 'x', '1', 'ln x'], difficulty: 2 },
        { id: 8, equation: '∫ x² dx = _', availableOptions: ['x³/3 + C', 'x² + C', '2x + C', 'x³ + C', '3x² + C', 'x/3 + C'], difficulty: 2 },
        { id: 9, equation: 'd/dx (ln x) = _', availableOptions: ['1/x', 'x', '1', 'ln x', 'e^x', '0'], difficulty: 2 },
        { id: 10, equation: '∫ e^x dx = _', availableOptions: ['e^x + C', 'x*e^x + C', 'e^x/x + C', 'ln(e^x) + C', 'x + C', 'e + C'], difficulty: 3 },
        { id: 11, equation: 'd/dx (x^n) = _', availableOptions: ['n*x^(n-1)', 'x^n', 'n*x^n', 'x^(n-1)', 'n*x', 'x^(n+1)'], difficulty: 3 },
        { id: 12, equation: '∫ sin x dx = _', availableOptions: ['-cos x + C', 'cos x + C', 'sin x + C', '-sin x + C', 'tan x + C', '1 + C'], difficulty: 3 },
        { id: 13, equation: 'd/dx (tan x) = _', availableOptions: ['sec² x', 'cos² x', 'sin² x', 'tan² x', '1', 'sec x'], difficulty: 3 },
        { id: 14, equation: '∫ _ dx = -cos x + C', availableOptions: ['sin x', 'cos x', '-sin x', '-cos x', 'tan x', '1'], difficulty: 3 },
        { id: 15, equation: 'd/dx (cos x) = _', availableOptions: ['-sin x', 'sin x', 'cos x', '-cos x', 'tan x', '0'], difficulty: 3 }
      ]
    }
  },
  physics: {
    'grade-8': {
      'Electricity and Circuits': [
        { id: 1, equation: 'V = I × _', availableOptions: ['R', 'P', 'W', 'Q', 'F', 'C'], difficulty: 1 },
        { id: 2, equation: 'P = _ × I', availableOptions: ['V', 'R', 'W', 'Q', 'F', 'C'], difficulty: 1 },
        { id: 3, equation: 'I = _ ÷ R', availableOptions: ['V', 'P', 'W', 'Q', 'F', 'C'], difficulty: 1 },
        { id: 4, equation: 'R = _ ÷ I', availableOptions: ['V', 'P', 'W', 'Q', 'F', 'C'], difficulty: 2 },
        { id: 5, equation: 'P = I² × _', availableOptions: ['R', 'V', 'W', 'Q', 'F', 'C'], difficulty: 2 },
        { id: 6, equation: 'W = P × _', availableOptions: ['t', 'V', 'R', 'Q', 'F', 'C'], difficulty: 2 },
        { id: 7, equation: 'Q = I × _', availableOptions: ['t', 'V', 'R', 'P', 'F', 'C'], difficulty: 2 },
        { id: 8, equation: 'E = _ × Q', availableOptions: ['V', 'I', 'R', 'P', 'F', 'C'], difficulty: 2 },
        { id: 9, equation: 'F = k × _', availableOptions: ['q₁q₂/r²', 'q₁+q₂', 'r²', 'q₁×q₂', 'r', 'k'], difficulty: 2 },
        { id: 10, equation: 'C = Q ÷ _', availableOptions: ['V', 'I', 'R', 'P', 'F', 't'], difficulty: 3 },
        { id: 11, equation: 'Rtotal = R₁ + R₂ + _', availableOptions: ['R₃', 'R₁R₂', '1/R₃', 'R₁-R₂', 'R₁×R₂', '2R₃'], difficulty: 3 },
        { id: 12, equation: '1/Rtotal = 1/R₁ + 1/R₂ + _', availableOptions: ['1/R₃', 'R₃', 'R₁R₂', 'R₁+R₂', 'R₁×R₂', '2/R₃'], difficulty: 3 },
        { id: 13, equation: 'η = (Pout ÷ _) × 100%', availableOptions: ['Pin', 'Pout', 'Ptotal', 'Ploss', 'V', 'I'], difficulty: 3 },
        { id: 14, equation: 'τ = R × _', availableOptions: ['C', 'L', 'V', 'I', 'P', 'W'], difficulty: 3 },
        { id: 15, equation: 'XL = 2π × f × _', availableOptions: ['L', 'C', 'R', 'f', 'π', 'ω'], difficulty: 3 }
      ]
    }
  },
  'computer-science': {
    'grade-7': {
      'Logic and Problem Solving': [
        { id: 1, equation: '_ AND 1 = 0', availableOptions: [0, 1, 'True', 'False', 'X', 'Y'], difficulty: 1 },
        { id: 2, equation: '1 OR _ = 1', availableOptions: [0, 1, 'True', 'False', 'X', 'Y'], difficulty: 1 },
        { id: 3, equation: 'NOT _ = 0', availableOptions: [0, 1, 'True', 'False', 'X', 'Y'], difficulty: 1 },
        { id: 4, equation: '_ XOR 1 = 0', availableOptions: [0, 1, 'True', 'False', 'X', 'Y'], difficulty: 2 },
        { id: 5, equation: '(A AND B) OR _ = 1', availableOptions: ['A', 'B', 'C', 'D', '0', '1'], difficulty: 2 },
        { id: 6, equation: 'NOT(A OR _) = NOT A AND NOT B', availableOptions: ['A', 'B', 'C', 'D', '0', '1'], difficulty: 2 },
        { id: 7, equation: 'A AND (B OR _) = (A AND B) OR (A AND C)', availableOptions: ['A', 'B', 'C', 'D', 'E', 'F'], difficulty: 2 },
        { id: 8, equation: '_ NAND B = NOT(A AND B)', availableOptions: ['A', 'B', 'C', 'D', '0', '1'], difficulty: 2 },
        { id: 9, equation: 'A NOR _ = NOT(A OR B)', availableOptions: ['A', 'B', 'C', 'D', '0', '1'], difficulty: 2 },
        { id: 10, equation: '(A XOR B) XOR _ = A XOR (B XOR C)', availableOptions: ['A', 'B', 'C', 'D', 'E', 'F'], difficulty: 3 },
        { id: 11, equation: 'A → B = _ OR B', availableOptions: ['A', 'NOT A', 'B', 'NOT B', 'C', 'D'], difficulty: 3 },
        { id: 12, equation: 'A ↔ B = (A → B) AND (_→ A)', availableOptions: ['A', 'B', 'NOT A', 'NOT B', 'C', 'D'], difficulty: 3 },
        { id: 13, equation: '∀x P(x) = P(a) AND P(b) AND _', availableOptions: ['P(a)', 'P(b)', 'P(c)', 'P(x)', 'Q(x)', 'R(x)'], difficulty: 3 },
        { id: 14, equation: '∃x P(x) = P(a) OR P(b) OR _', availableOptions: ['P(a)', 'P(b)', 'P(c)', 'P(x)', 'Q(x)', 'R(x)'], difficulty: 3 },
        { id: 15, equation: 'while(condition) { _ }', availableOptions: ['statement', 'condition', 'loop', 'break', 'continue', 'return'], difficulty: 3 }
      ]
    }
  }
}

// MCQ Question Bank for Geometry Shooter
export const GEOMETRY_MCQ_BANK: Record<string, Record<string, Record<string, Question[]>>> = {
  mathematics: {
    'grade-6': {
      'Geometry Fundamentals': [
        { id: 1, question: 'How many sides does a triangle have?', options: ['2', '3', '4', '5'], correctAnswer: 1, difficulty: 1 },
        { id: 2, question: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], correctAnswer: 1, difficulty: 1 },
        { id: 3, question: 'A right angle measures how many degrees?', options: ['45°', '90°', '180°', '360°'], correctAnswer: 1, difficulty: 1 },
        { id: 4, question: 'How many vertices does a square have?', options: ['3', '4', '5', '6'], correctAnswer: 1, difficulty: 2 },
        { id: 5, question: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correctAnswer: 1, difficulty: 2 },
        { id: 6, question: 'How many sides does a pentagon have?', options: ['4', '5', '6', '7'], correctAnswer: 1, difficulty: 2 },
        { id: 7, question: 'Which shape has all sides equal?', options: ['Rectangle', 'Square', 'Triangle', 'Circle'], correctAnswer: 1, difficulty: 2 },
        { id: 8, question: 'How many faces does a cube have?', options: ['4', '6', '8', '12'], correctAnswer: 1, difficulty: 2 },
        { id: 9, question: 'An obtuse angle is greater than?', options: ['30°', '60°', '90°', '120°'], correctAnswer: 2, difficulty: 2 },
        { id: 10, question: 'How many sides does an octagon have?', options: ['6', '7', '8', '9'], correctAnswer: 2, difficulty: 3 },
        { id: 11, question: 'What is a polygon with 10 sides called?', options: ['Nonagon', 'Decagon', 'Dodecagon', 'Hendecagon'], correctAnswer: 1, difficulty: 3 },
        { id: 12, question: 'How many edges does a triangular prism have?', options: ['6', '9', '12', '15'], correctAnswer: 1, difficulty: 3 },
        { id: 13, question: 'A straight angle measures?', options: ['90°', '180°', '270°', '360°'], correctAnswer: 1, difficulty: 3 },
        { id: 14, question: 'How many diagonals does a rectangle have?', options: ['1', '2', '3', '4'], correctAnswer: 1, difficulty: 3 },
        { id: 15, question: 'Which has no vertices?', options: ['Triangle', 'Square', 'Circle', 'Pentagon'], correctAnswer: 2, difficulty: 3 }
      ]
    },
    'grade-7': {
      'Triangles and Angles': [
        { id: 1, question: 'In an isosceles triangle, how many sides are equal?', options: ['1', '2', '3', '0'], correctAnswer: 1, difficulty: 1 },
        { id: 2, question: 'What type of triangle has all angles less than 90°?', options: ['Right', 'Acute', 'Obtuse', 'Scalene'], correctAnswer: 1, difficulty: 1 },
        { id: 3, question: 'An exterior angle of a triangle equals?', options: ['Sum of two interior angles', 'Sum of all interior angles', 'One interior angle', 'Half of interior angle'], correctAnswer: 0, difficulty: 1 },
        { id: 4, question: 'In a right triangle, the side opposite to right angle is?', options: ['Base', 'Height', 'Hypotenuse', 'Median'], correctAnswer: 2, difficulty: 2 },
        { id: 5, question: 'If two angles of a triangle are 60° and 70°, the third angle is?', options: ['40°', '50°', '60°', '70°'], correctAnswer: 1, difficulty: 2 },
        { id: 6, question: 'A triangle with sides 3, 4, 5 is?', options: ['Equilateral', 'Isosceles', 'Right', 'Obtuse'], correctAnswer: 2, difficulty: 2 },
        { id: 7, question: 'Vertical angles are?', options: ['Equal', 'Supplementary', 'Complementary', 'Different'], correctAnswer: 0, difficulty: 2 },
        { id: 8, question: 'Adjacent angles on a straight line are?', options: ['Equal', 'Vertical', 'Supplementary', 'Complementary'], correctAnswer: 2, difficulty: 2 },
        { id: 9, question: 'In an equilateral triangle, each angle is?', options: ['30°', '45°', '60°', '90°'], correctAnswer: 2, difficulty: 2 },
        { id: 10, question: 'The sum of complementary angles is?', options: ['90°', '180°', '270°', '360°'], correctAnswer: 0, difficulty: 3 },
        { id: 11, question: 'In triangle ABC, if angle A = 90°, then BC is called?', options: ['Base', 'Height', 'Hypotenuse', 'Median'], correctAnswer: 2, difficulty: 3 },
        { id: 12, question: 'If angles of a triangle are in ratio 1:2:3, the angles are?', options: ['30°, 60°, 90°', '20°, 40°, 120°', '45°, 90°, 45°', '60°, 60°, 60°'], correctAnswer: 0, difficulty: 3 },
        { id: 13, question: 'The angle bisector of an angle divides it into?', options: ['Three equal parts', 'Two equal parts', 'Four equal parts', 'Unequal parts'], correctAnswer: 1, difficulty: 3 },
        { id: 14, question: 'Linear pair of angles sum up to?', options: ['90°', '180°', '270°', '360°'], correctAnswer: 1, difficulty: 3 },
        { id: 15, question: 'Alternate interior angles are?', options: ['Equal', 'Supplementary', 'Complementary', 'Vertical'], correctAnswer: 0, difficulty: 3 }
      ]
    },
    'grade-10': {
      'Circles and Mensuration': [
        { id: 1, question: 'Area of a circle with radius r is?', options: ['πr²', '2πr', '2r', 'πd'], correctAnswer: 0, difficulty: 1 },
        { id: 2, question: 'Circumference of a circle with radius r is?', options: ['πr²', '2πr', 'πr', 'r²'], correctAnswer: 1, difficulty: 1 },
        { id: 3, question: 'Diameter is how many times the radius?', options: ['1', '2', '3', '4'], correctAnswer: 1, difficulty: 1 },
        { id: 4, question: 'Area of a rectangle with length l and breadth b is?', options: ['l + b', '2(l + b)', 'lb', '2lb'], correctAnswer: 2, difficulty: 2 },
        { id: 5, question: 'Perimeter of a square with side a is?', options: ['a²', '4a', '2a', 'a/4'], correctAnswer: 1, difficulty: 2 },
        { id: 6, question: 'Volume of a cube with side a is?', options: ['a²', 'a³', '6a²', '4a'], correctAnswer: 1, difficulty: 2 },
        { id: 7, question: 'Area of a triangle with base b and height h is?', options: ['bh', 'bh/2', '2bh', 'b + h'], correctAnswer: 1, difficulty: 2 },
        { id: 8, question: 'Surface area of a sphere with radius r is?', options: ['4πr²', '2πr²', 'πr²', '4πr³'], correctAnswer: 0, difficulty: 2 },
        { id: 9, question: 'Volume of a cylinder with radius r and height h is?', options: ['πr²h', '2πrh', 'πrh', 'πr²h/3'], correctAnswer: 0, difficulty: 2 },
        { id: 10, question: 'Area of a trapezium with parallel sides a, b and height h is?', options: ['(a + b)h', '(a + b)h/2', 'abh', 'ah + bh'], correctAnswer: 1, difficulty: 3 },
        { id: 11, question: 'Volume of a cone with radius r and height h is?', options: ['πr²h', 'πr²h/3', '2πr²h', 'πr²h/2'], correctAnswer: 1, difficulty: 3 },
        { id: 12, question: 'Area of a rhombus with diagonals d₁ and d₂ is?', options: ['d₁d₂', 'd₁d₂/2', '2d₁d₂', 'd₁ + d₂'], correctAnswer: 1, difficulty: 3 },
        { id: 13, question: 'Lateral surface area of a cylinder with radius r and height h is?', options: ['πr²h', '2πrh', 'πrh', '4πr²'], correctAnswer: 1, difficulty: 3 },
        { id: 14, question: 'Area of sector with central angle θ (in radians) and radius r is?', options: ['θr²/2', 'θr²', '2θr²', 'θr'], correctAnswer: 0, difficulty: 3 },
        { id: 15, question: 'Volume of a sphere with radius r is?', options: ['4πr³', '4πr³/3', '2πr³', 'πr³'], correctAnswer: 1, difficulty: 3 }
      ]
    }
  }
}

// Helper function to get MCQ questions for Geometry Shooter
export const getGeometryMCQForLesson = (subject: string, grade: string, lesson: string): Question[] => {
  return GEOMETRY_MCQ_BANK[subject]?.[grade]?.[lesson] || []
}

// Target Shooting Question Bank (for Geometry Shooter)
export const TARGET_QUESTION_BANK: Record<string, Record<string, Record<string, TargetQuestion[]>>> = {
  mathematics: {
    'grade-6': {
      'Geometry Fundamentals': [
        { id: 1, question: 'Shoot the triangle!', correctTarget: '🔺', targets: ['🔺', '🔴', '🟦', '⭐'], difficulty: 1 },
        { id: 2, question: 'Find the circle!', correctTarget: '🔴', targets: ['🔺', '🔴', '🟦', '⭐'], difficulty: 1 },
        { id: 3, question: 'Shoot the square!', correctTarget: '🟦', targets: ['🔺', '🔴', '🟦', '⭐'], difficulty: 1 },
        { id: 4, question: 'Find the star!', correctTarget: '⭐', targets: ['🔺', '🔴', '🟦', '⭐'], difficulty: 2 },
        { id: 5, question: 'Shoot the pentagon!', correctTarget: '⬟', targets: ['⬟', '🔴', '🟦', '⭐'], difficulty: 2 },
        { id: 6, question: 'Find the hexagon!', correctTarget: '⬢', targets: ['🔺', '⬢', '🟦', '⭐'], difficulty: 2 },
        { id: 7, question: 'Shoot the rectangle!', correctTarget: '▭', targets: ['▭', '🔴', '🟦', '⭐'], difficulty: 2 },
        { id: 8, question: 'Find the heart!', correctTarget: '❤️', targets: ['🔺', '❤️', '🟦', '⭐'], difficulty: 2 },
        { id: 9, question: 'Shoot the oval!', correctTarget: '🥚', targets: ['🔺', '🥚', '🟦', '⭐'], difficulty: 2 },
        { id: 10, question: 'Find the diamond!', correctTarget: '💎', targets: ['💎', '🔴', '🟦', '⭐'], difficulty: 3 },
        { id: 11, question: 'Shoot the octagon!', correctTarget: '🛑', targets: ['🔺', '🔴', '🛑', '⭐'], difficulty: 3 },
        { id: 12, question: 'Find the rhombus!', correctTarget: '🔶', targets: ['🔺', '🔶', '🟦', '⭐'], difficulty: 3 },
        { id: 13, question: 'Shoot the trapezoid!', correctTarget: '🔸', targets: ['🔸', '🔴', '🟦', '⭐'], difficulty: 3 },
        { id: 14, question: 'Find the parallelogram!', correctTarget: '▱', targets: ['▱', '🔴', '🟦', '⭐'], difficulty: 3 },
        { id: 15, question: 'Shoot the kite shape!', correctTarget: '🪁', targets: ['🪁', '🔴', '🟦', '⭐'], difficulty: 3 }
      ]
    }
  },
  physics: {
    'grade-8': {
      'Electricity and Circuits': [
        { id: 1, question: 'Shoot the resistor symbol!', correctTarget: '🔳', targets: ['🔳', '🔋', '💡', '⚡'], difficulty: 1 },
        { id: 2, question: 'Find the battery!', correctTarget: '🔋', targets: ['🔳', '🔋', '💡', '⚡'], difficulty: 1 },
        { id: 3, question: 'Shoot the bulb!', correctTarget: '💡', targets: ['🔳', '🔋', '💡', '⚡'], difficulty: 1 },
        { id: 4, question: 'Find the conductor!', correctTarget: '🔗', targets: ['🔳', '🔗', '🚫', '⚡'], difficulty: 2 },
        { id: 5, question: 'Shoot the insulator!', correctTarget: '🚫', targets: ['🔳', '🔗', '🚫', '⚡'], difficulty: 2 },
        { id: 6, question: 'Find the switch (ON)!', correctTarget: '🔛', targets: ['🔛', '🔴', '🟢', '⚡'], difficulty: 2 },
        { id: 7, question: 'Shoot the voltmeter!', correctTarget: '📏', targets: ['📏', '🔋', '💡', '⚡'], difficulty: 2 },
        { id: 8, question: 'Find the ammeter!', correctTarget: '⚖️', targets: ['📏', '⚖️', '💡', '⚡'], difficulty: 2 },
        { id: 9, question: 'Shoot the fuse!', correctTarget: '🔥', targets: ['🔥', '🔋', '💡', '⚡'], difficulty: 2 },
        { id: 10, question: 'Find the LED!', correctTarget: '🔦', targets: ['💡', '🔦', '🔋', '⚡'], difficulty: 3 },
        { id: 11, question: 'Shoot the capacitor!', correctTarget: '🪣', targets: ['🪣', '🔋', '💡', '⚡'], difficulty: 3 },
        { id: 12, question: 'Find the diode!', correctTarget: '➡️', targets: ['➡️', '🔋', '💡', '⚡'], difficulty: 3 },
        { id: 13, question: 'Shoot the transistor!', correctTarget: '🔺', targets: ['🔺', '🔋', '💡', '⚡'], difficulty: 3 },
        { id: 14, question: 'Find the variable resistor!', correctTarget: '🎚️', targets: ['🎚️', '🔋', '💡', '⚡'], difficulty: 3 },
        { id: 15, question: 'Shoot the transformer!', correctTarget: '🔄', targets: ['🔄', '🔋', '💡', '⚡'], difficulty: 3 }
      ]
    }
  },
  chemistry: {
    'grade-9': {
      'Periodic Table': [
        { id: 1, question: 'Shoot hydrogen!', correctTarget: 'H', targets: ['H', 'He', 'Li', 'Be'], difficulty: 1 },
        { id: 2, question: 'Find helium!', correctTarget: 'He', targets: ['H', 'He', 'Li', 'Be'], difficulty: 1 },
        { id: 3, question: 'Shoot oxygen!', correctTarget: 'O', targets: ['O', 'N', 'C', 'F'], difficulty: 1 },
        { id: 4, question: 'Find sodium!', correctTarget: 'Na', targets: ['Na', 'K', 'Li', 'Mg'], difficulty: 2 },
        { id: 5, question: 'Shoot chlorine!', correctTarget: 'Cl', targets: ['Cl', 'Br', 'I', 'F'], difficulty: 2 },
        { id: 6, question: 'Find carbon!', correctTarget: 'C', targets: ['C', 'Si', 'N', 'O'], difficulty: 2 },
        { id: 7, question: 'Shoot iron!', correctTarget: 'Fe', targets: ['Fe', 'Cu', 'Zn', 'Ag'], difficulty: 2 },
        { id: 8, question: 'Find gold!', correctTarget: 'Au', targets: ['Au', 'Ag', 'Cu', 'Pt'], difficulty: 2 },
        { id: 9, question: 'Shoot silver!', correctTarget: 'Ag', targets: ['Ag', 'Au', 'Cu', 'Pt'], difficulty: 2 },
        { id: 10, question: 'Find a noble gas!', correctTarget: 'Ne', targets: ['Ne', 'Na', 'Mg', 'Al'], difficulty: 3 },
        { id: 11, question: 'Shoot an alkali metal!', correctTarget: 'K', targets: ['K', 'Ca', 'Mg', 'Al'], difficulty: 3 },
        { id: 12, question: 'Find a halogen!', correctTarget: 'Br', targets: ['Br', 'Kr', 'Sr', 'Rb'], difficulty: 3 },
        { id: 13, question: 'Shoot a transition metal!', correctTarget: 'Ni', targets: ['Ni', 'Na', 'Ne', 'N'], difficulty: 3 },
        { id: 14, question: 'Find a metalloid!', correctTarget: 'Si', targets: ['Si', 'S', 'P', 'Cl'], difficulty: 3 },
        { id: 15, question: 'Shoot the heaviest!', correctTarget: 'U', targets: ['U', 'Pb', 'Au', 'Hg'], difficulty: 3 }
      ]
    }
  },
  biology: {
    'grade-7': {
      'Nutrition and Health': [
        { id: 1, question: 'Shoot carbohydrates!', correctTarget: '🍞', targets: ['🍞', '🥩', '🥛', '🥕'], difficulty: 1 },
        { id: 2, question: 'Find proteins!', correctTarget: '🥩', targets: ['🍞', '🥩', '🥛', '🥕'], difficulty: 1 },
        { id: 3, question: 'Shoot vitamins!', correctTarget: '🥕', targets: ['🍞', '🥩', '🥛', '🥕'], difficulty: 1 },
        { id: 4, question: 'Find source of calcium!', correctTarget: '🥛', targets: ['🍞', '🥩', '🥛', '🥕'], difficulty: 2 },
        { id: 5, question: 'Shoot iron source!', correctTarget: '🥬', targets: ['🥬', '🥩', '🥛', '🥕'], difficulty: 2 },
        { id: 6, question: 'Find vitamin C!', correctTarget: '🍊', targets: ['🍊', '🥩', '🥛', '🥕'], difficulty: 2 },
        { id: 7, question: 'Shoot roughage!', correctTarget: '🥗', targets: ['🥗', '🥩', '🥛', '🍞'], difficulty: 2 },
        { id: 8, question: 'Find healthy fats!', correctTarget: '🥑', targets: ['🥑', '🥩', '🥛', '🍞'], difficulty: 2 },
        { id: 9, question: 'Shoot energy food!', correctTarget: '🍯', targets: ['🍯', '🥗', '🥛', '🥕'], difficulty: 2 },
        { id: 10, question: 'Find body building food!', correctTarget: '🥚', targets: ['🥚', '🍞', '🥛', '🥕'], difficulty: 3 },
        { id: 11, question: 'Shoot vitamin A!', correctTarget: '🥕', targets: ['🥕', '🥩', '🥛', '🍞'], difficulty: 3 },
        { id: 12, question: 'Find vitamin D source!', correctTarget: '🐟', targets: ['🐟', '🥩', '🥛', '🍞'], difficulty: 3 },
        { id: 13, question: 'Shoot antioxidants!', correctTarget: '🫐', targets: ['🫐', '🥩', '🥛', '🍞'], difficulty: 3 },
        { id: 14, question: 'Find probiotics!', correctTarget: '🥨', targets: ['🥨', '🥩', '🥛', '🍞'], difficulty: 3 },
        { id: 15, question: 'Shoot complete protein!', correctTarget: '🍳', targets: ['🍳', '🍞', '🥛', '🥕'], difficulty: 3 }
      ]
    }
  }
}

// Helper function to get questions for a specific lesson
export const getQuestionsForLesson = (subject: string, grade: string, lesson: string): Question[] => {
  return QUESTION_BANK[subject]?.[grade]?.[lesson] || []
}

// Helper function to get equation questions for a specific lesson
export const getEquationQuestionsForLesson = (subject: string, grade: string, lesson: string): EquationQuestion[] => {
  return EQUATION_QUESTION_BANK[subject]?.[grade]?.[lesson] || []
}

// Helper function to get target questions for a specific lesson
export const getTargetQuestionsForLesson = (subject: string, grade: string, lesson: string): TargetQuestion[] => {
  return TARGET_QUESTION_BANK[subject]?.[grade]?.[lesson] || []
}

// Helper function to get questions for a specific level (3 questions per level)
export const getQuestionsForLevel = (questions: Question[], level: number): Question[] => {
  const startIndex = (level - 1) * 3
  return questions.slice(startIndex, startIndex + 3)
}

export const getEquationQuestionsForLevel = (questions: EquationQuestion[], level: number): EquationQuestion[] => {
  const startIndex = (level - 1) * 3
  return questions.slice(startIndex, startIndex + 3)
}

export const getTargetQuestionsForLevel = (questions: TargetQuestion[], level: number): TargetQuestion[] => {
  const startIndex = (level - 1) * 3
  return questions.slice(startIndex, startIndex + 3)
}