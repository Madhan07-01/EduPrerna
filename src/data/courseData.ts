export interface Lesson {
  id: string;
  title: string;
  description?: string;
  duration?: string;
}

export interface SubjectData {
  [grade: number]: Lesson[];
}

export interface CourseData {
  [subject: string]: SubjectData;
}

export const subjects = [
  'Mathematics',
  'Physics', 
  'Chemistry',
  'Computer Science',
  'Biology'
] as const;

export const grades = [6, 7, 8, 9, 10, 11, 12] as const;

export const courseData: CourseData = {
  Mathematics: {
    6: [{ id: 'math-6-1', title: 'Coming Soon', description: 'Mathematics lessons will be available soon' }],
    7: [{ id: 'math-7-1', title: 'Coming Soon', description: 'Mathematics lessons will be available soon' }],
    8: [{ id: 'math-8-1', title: 'Coming Soon', description: 'Mathematics lessons will be available soon' }],
    9: [{ id: 'math-9-1', title: 'Coming Soon', description: 'Mathematics lessons will be available soon' }],
    10: [{ id: 'math-10-1', title: 'Coming Soon', description: 'Mathematics lessons will be available soon' }],
    11: [{ id: 'math-11-1', title: 'Coming Soon', description: 'Mathematics lessons will be available soon' }],
    12: [{ id: 'math-12-1', title: 'Coming Soon', description: 'Mathematics lessons will be available soon' }]
  },
  
  Physics: {
    6: [
      { id: 'phy-6-1', title: 'Fun with Magnets', description: 'Introduction to magnetism and magnetic properties', duration: '20 min' },
      { id: 'phy-6-2', title: 'Light, Shadows and Reflections', description: 'Understanding light behavior and reflection', duration: '25 min' },
      { id: 'phy-6-3', title: 'Electricity and Circuits', description: 'Basic electrical concepts and simple circuits', duration: '30 min' }
    ],
    7: [
      { id: 'phy-7-1', title: 'Heat and Temperature', description: 'Understanding thermal concepts and measurement', duration: '25 min' },
      { id: 'phy-7-2', title: 'Acids, Bases and Salts', description: 'Introduction to chemical properties', duration: '30 min' },
      { id: 'phy-7-3', title: 'Physical and Chemical Changes', description: 'Distinguishing between different types of changes', duration: '20 min' },
      { id: 'phy-7-4', title: 'Weather, Climate and Adaptations', description: 'Environmental physics concepts', duration: '35 min' }
    ],
    8: [
      { id: 'phy-8-1', title: 'Force and Pressure', description: 'Understanding forces and their effects', duration: '30 min' },
      { id: 'phy-8-2', title: 'Friction', description: 'Study of friction and its applications', duration: '25 min' },
      { id: 'phy-8-3', title: 'Sound', description: 'Properties and behavior of sound waves', duration: '35 min' },
      { id: 'phy-8-4', title: 'Chemical Effects of Electric Current', description: 'Electrochemistry basics', duration: '40 min' }
    ],
    9: [
      { id: 'phy-9-1', title: 'Motion', description: 'Laws of motion and kinematics', duration: '45 min' },
      { id: 'phy-9-2', title: 'Force and Laws of Motion', description: 'Newton\'s laws and their applications', duration: '50 min' },
      { id: 'phy-9-3', title: 'Gravitation', description: 'Universal gravitation and planetary motion', duration: '40 min' },
      { id: 'phy-9-4', title: 'Work and Energy', description: 'Energy conservation and work-energy theorem', duration: '45 min' },
      { id: 'phy-9-5', title: 'Sound', description: 'Advanced sound concepts and wave properties', duration: '35 min' }
    ],
    10: [
      { id: 'phy-10-1', title: 'Light - Reflection and Refraction', description: 'Advanced optics and lens systems', duration: '50 min' },
      { id: 'phy-10-2', title: 'Human Eye and Colourful World', description: 'Vision and color perception', duration: '40 min' },
      { id: 'phy-10-3', title: 'Electricity', description: 'Current, voltage, and electrical circuits', duration: '55 min' },
      { id: 'phy-10-4', title: 'Magnetic Effects of Electric Current', description: 'Electromagnetism and its applications', duration: '45 min' }
    ],
    11: [
      { id: 'phy-11-1', title: 'Physical World', description: 'Introduction to physics and scientific method', duration: '30 min' },
      { id: 'phy-11-2', title: 'Units and Measurements', description: 'Physical quantities and measurement systems', duration: '40 min' },
      { id: 'phy-11-3', title: 'Motion in a Straight Line', description: 'One-dimensional kinematics', duration: '50 min' },
      { id: 'phy-11-4', title: 'Motion in a Plane', description: 'Two-dimensional motion and projectiles', duration: '55 min' },
      { id: 'phy-11-5', title: 'Laws of Motion', description: 'Advanced mechanics and force analysis', duration: '60 min' },
      { id: 'phy-11-6', title: 'Work, Energy and Power', description: 'Energy transformations and conservation', duration: '50 min' }
    ],
    12: [
      { id: 'phy-12-1', title: 'Electric Charges and Fields', description: 'Electrostatics and electric field theory', duration: '60 min' },
      { id: 'phy-12-2', title: 'Electrostatic Potential and Capacitance', description: 'Electric potential and capacitor systems', duration: '55 min' },
      { id: 'phy-12-3', title: 'Current Electricity', description: 'Advanced electrical circuit analysis', duration: '50 min' },
      { id: 'phy-12-4', title: 'Moving Charges and Magnetism', description: 'Magnetic fields and charged particle motion', duration: '60 min' },
      { id: 'phy-12-5', title: 'Magnetism and Matter', description: 'Magnetic properties of materials', duration: '45 min' },
      { id: 'phy-12-6', title: 'Electromagnetic Induction', description: 'Faraday\'s law and electromagnetic applications', duration: '55 min' }
    ]
  },

  Chemistry: {
    6: [
      { id: 'chem-6-1', title: 'Food: Where Does it Come From?', description: 'Understanding food sources and nutrition', duration: '25 min' },
      { id: 'chem-6-2', title: 'Components of Food', description: 'Nutrients and their functions', duration: '30 min' },
      { id: 'chem-6-3', title: 'Fibre to Fabric', description: 'Natural and synthetic fibers', duration: '35 min' }
    ],
    7: [
      { id: 'chem-7-1', title: 'Acids, Bases and Salts', description: 'Basic chemical properties and reactions', duration: '40 min' },
      { id: 'chem-7-2', title: 'Physical and Chemical Changes', description: 'Types of changes in matter', duration: '30 min' },
      { id: 'chem-7-3', title: 'Weather, Climate and Adaptations', description: 'Chemical aspects of environmental science', duration: '35 min' }
    ],
    8: [
      { id: 'chem-8-1', title: 'Synthetic Fibres and Plastics', description: 'Polymer chemistry and materials', duration: '35 min' },
      { id: 'chem-8-2', title: 'Materials: Metals and Non-Metals', description: 'Classification and properties of elements', duration: '45 min' },
      { id: 'chem-8-3', title: 'Coal and Petroleum', description: 'Fossil fuels and hydrocarbon chemistry', duration: '40 min' },
      { id: 'chem-8-4', title: 'Combustion and Flame', description: 'Chemical reactions and energy release', duration: '30 min' }
    ],
    9: [
      { id: 'chem-9-1', title: 'Matter in Our Surroundings', description: 'States of matter and particle theory', duration: '40 min' },
      { id: 'chem-9-2', title: 'Is Matter Around Us Pure?', description: 'Mixtures, compounds, and elements', duration: '45 min' },
      { id: 'chem-9-3', title: 'Atoms and Molecules', description: 'Atomic structure and chemical bonding', duration: '50 min' },
      { id: 'chem-9-4', title: 'Structure of the Atom', description: 'Subatomic particles and atomic models', duration: '45 min' }
    ],
    10: [
      { id: 'chem-10-1', title: 'Chemical Reactions and Equations', description: 'Balancing equations and reaction types', duration: '50 min' },
      { id: 'chem-10-2', title: 'Acids, Bases and Salts', description: 'Advanced acid-base chemistry', duration: '45 min' },
      { id: 'chem-10-3', title: 'Metals and Non-metals', description: 'Periodic trends and chemical properties', duration: '55 min' },
      { id: 'chem-10-4', title: 'Carbon and its Compounds', description: 'Organic chemistry fundamentals', duration: '60 min' }
    ],
    11: [
      { id: 'chem-11-1', title: 'Some Basic Concepts of Chemistry', description: 'Mole concept and stoichiometry', duration: '55 min' },
      { id: 'chem-11-2', title: 'Structure of Atom', description: 'Quantum mechanics and atomic orbitals', duration: '60 min' },
      { id: 'chem-11-3', title: 'Classification of Elements', description: 'Periodic table and periodic properties', duration: '50 min' },
      { id: 'chem-11-4', title: 'Chemical Bonding', description: 'Ionic, covalent, and metallic bonding', duration: '65 min' },
      { id: 'chem-11-5', title: 'States of Matter', description: 'Gas laws and kinetic theory', duration: '45 min' }
    ],
    12: [
      { id: 'chem-12-1', title: 'The Solid State', description: 'Crystal structures and solid properties', duration: '50 min' },
      { id: 'chem-12-2', title: 'Solutions', description: 'Colligative properties and solution chemistry', duration: '55 min' },
      { id: 'chem-12-3', title: 'Electrochemistry', description: 'Redox reactions and electrochemical cells', duration: '60 min' },
      { id: 'chem-12-4', title: 'Chemical Kinetics', description: 'Reaction rates and mechanisms', duration: '55 min' },
      { id: 'chem-12-5', title: 'Surface Chemistry', description: 'Adsorption and catalysis', duration: '45 min' }
    ]
  },

  Biology: {
    6: [
      { id: 'bio-6-1', title: 'Food: Where Does it Come From?', description: 'Plant and animal sources of food', duration: '25 min' },
      { id: 'bio-6-2', title: 'Components of Food', description: 'Nutrients and balanced diet', duration: '30 min' },
      { id: 'bio-6-3', title: 'Getting to Know Plants', description: 'Plant structure and function', duration: '35 min' },
      { id: 'bio-6-4', title: 'Body Movements', description: 'Human and animal locomotion', duration: '30 min' }
    ],
    7: [
      { id: 'bio-7-1', title: 'Nutrition in Plants', description: 'Photosynthesis and plant nutrition', duration: '40 min' },
      { id: 'bio-7-2', title: 'Nutrition in Animals', description: 'Digestive systems and feeding habits', duration: '35 min' },
      { id: 'bio-7-3', title: 'Transportation in Animals and Plants', description: 'Circulatory and transport systems', duration: '45 min' },
      { id: 'bio-7-4', title: 'Respiration in Organisms', description: 'Breathing and cellular respiration', duration: '40 min' }
    ],
    8: [
      { id: 'bio-8-1', title: 'Crop Production and Management', description: 'Agricultural practices and crop improvement', duration: '40 min' },
      { id: 'bio-8-2', title: 'Microorganisms', description: 'Bacteria, viruses, and their applications', duration: '35 min' },
      { id: 'bio-8-3', title: 'Reproduction in Animals', description: 'Animal reproductive systems', duration: '45 min' },
      { id: 'bio-8-4', title: 'Reaching the Age of Adolescence', description: 'Human development and puberty', duration: '30 min' }
    ],
    9: [
      { id: 'bio-9-1', title: 'The Fundamental Unit of Life', description: 'Cell structure and organelles', duration: '45 min' },
      { id: 'bio-9-2', title: 'Tissues', description: 'Plant and animal tissue systems', duration: '40 min' },
      { id: 'bio-9-3', title: 'Diversity in Living Organisms', description: 'Classification and biodiversity', duration: '50 min' },
      { id: 'bio-9-4', title: 'Why Do We Fall Ill?', description: 'Health, disease, and immunity', duration: '35 min' }
    ],
    10: [
      { id: 'bio-10-1', title: 'Life Processes', description: 'Fundamental biological processes', duration: '55 min' },
      { id: 'bio-10-2', title: 'Control and Coordination', description: 'Nervous and hormonal systems', duration: '50 min' },
      { id: 'bio-10-3', title: 'How Do Organisms Reproduce?', description: 'Reproductive strategies and mechanisms', duration: '45 min' },
      { id: 'bio-10-4', title: 'Heredity and Evolution', description: 'Genetics and evolutionary biology', duration: '55 min' }
    ],
    11: [
      { id: 'bio-11-1', title: 'The Living World', description: 'Characteristics and classification of life', duration: '40 min' },
      { id: 'bio-11-2', title: 'Biological Classification', description: 'Taxonomic hierarchy and systematics', duration: '50 min' },
      { id: 'bio-11-3', title: 'Plant Kingdom', description: 'Diversity and evolution of plants', duration: '60 min' },
      { id: 'bio-11-4', title: 'Animal Kingdom', description: 'Animal diversity and classification', duration: '65 min' },
      { id: 'bio-11-5', title: 'Morphology of Flowering Plants', description: 'Plant anatomy and structure', duration: '55 min' }
    ],
    12: [
      { id: 'bio-12-1', title: 'Reproduction in Organisms', description: 'Sexual and asexual reproduction', duration: '50 min' },
      { id: 'bio-12-2', title: 'Sexual Reproduction in Flowering Plants', description: 'Plant reproductive biology', duration: '55 min' },
      { id: 'bio-12-3', title: 'Human Reproduction', description: 'Human reproductive system and development', duration: '60 min' },
      { id: 'bio-12-4', title: 'Reproductive Health', description: 'Family planning and reproductive disorders', duration: '45 min' },
      { id: 'bio-12-5', title: 'Principles of Inheritance and Variation', description: 'Mendelian genetics and chromosomal basis', duration: '65 min' }
    ]
  },

  'Computer Science': {
    6: [{ id: 'cs-6-1', title: 'Coming Soon', description: 'Computer Science lessons will be available soon' }],
    7: [{ id: 'cs-7-1', title: 'Coming Soon', description: 'Computer Science lessons will be available soon' }],
    8: [{ id: 'cs-8-1', title: 'Coming Soon', description: 'Computer Science lessons will be available soon' }],
    9: [{ id: 'cs-9-1', title: 'Coming Soon', description: 'Computer Science lessons will be available soon' }],
    10: [{ id: 'cs-10-1', title: 'Coming Soon', description: 'Computer Science lessons will be available soon' }],
    11: [{ id: 'cs-11-1', title: 'Coming Soon', description: 'Computer Science lessons will be available soon' }],
    12: [{ id: 'cs-12-1', title: 'Coming Soon', description: 'Computer Science lessons will be available soon' }]
  }
};

export const getSubjectLessons = (subject: string, grade: number): Lesson[] => {
  return courseData[subject]?.[grade] || [];
};

export const getLessonById = (lessonId: string): Lesson | null => {
  for (const subject of Object.keys(courseData)) {
    for (const grade of Object.keys(courseData[subject])) {
      const lessons = courseData[subject][parseInt(grade)];
      const lesson = lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
  }
  return null;
};