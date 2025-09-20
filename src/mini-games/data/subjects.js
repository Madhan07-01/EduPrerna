// Mini Games subject and lesson data
export const subjectLessonMapping = {
  mathematics: {
    'grade-6': ['Fractions', 'Algebra Basics', 'Geometry Fundamentals', 'Decimals', 'Percentages'],
    'grade-7': ['Linear Equations', 'Ratios & Proportions', 'Area & Perimeter', 'Integers', 'Data Handling'],
    'grade-8': ['Quadratic Equations', 'Triangles', 'Mensuration', 'Factorization', 'Graphs'],
    'grade-9': ['Polynomials', 'Coordinate Geometry', 'Trigonometry Basics', 'Statistics', 'Probability'],
    'grade-10': ['Real Numbers', 'Arithmetic Progressions', 'Circles', 'Surface Areas', 'Trigonometry'],
    'grade-11': ['Sets & Functions', 'Limits & Derivatives', 'Mathematical Reasoning', 'Statistics', 'Probability'],
    'grade-12': ['Relations & Functions', 'Calculus', 'Vectors', 'Three Dimensional Geometry', 'Linear Programming']
  },
  'computer-science': {
    'grade-6': ['Computer Basics', 'Introduction to Programming', 'Scratch Programming', 'Digital Citizenship', 'Basic Algorithms'],
    'grade-7': ['HTML Basics', 'CSS Fundamentals', 'Logo Programming', 'Internet Safety', 'Problem Solving'],
    'grade-8': ['JavaScript Basics', 'Web Development', 'Database Concepts', 'Networking Basics', 'Cybersecurity'],
    'grade-9': ['Python Programming', 'Data Structures', 'Object-Oriented Programming', 'Software Engineering', 'AI Basics'],
    'grade-10': ['Advanced Python', 'Algorithms', 'Database Management', 'Computer Networks', 'Ethics in Computing'],
    'grade-11': ['C++ Programming', 'Data Structures & Algorithms', 'Computer Graphics', 'Operating Systems', 'Web Technologies'],
    'grade-12': ['Advanced Programming', 'Database Systems', 'Computer Networks', 'Software Engineering', 'Artificial Intelligence']
  },
  physics: {
    'grade-6': ['Simple Machines', 'Light & Shadows', 'Magnetism', 'Electricity Basics', 'Motion & Measurement'],
    'grade-7': ['Heat & Temperature', 'Acids & Bases', 'Physical & Chemical Changes', 'Weather & Climate', 'Nutrition in Plants'],
    'grade-8': ['Force & Pressure', 'Friction', 'Sound', 'Chemical Effects of Electric Current', 'Light'],
    'grade-9': ['Motion', 'Force & Laws of Motion', 'Gravitation', 'Work & Energy', 'Sound'],
    'grade-10': ['Light Reflection & Refraction', 'Human Eye', 'Electricity', 'Magnetic Effects', 'Sources of Energy'],
    'grade-11': ['Physical World', 'Units & Measurements', 'Motion in Straight Line', 'Motion in Plane', 'Laws of Motion'],
    'grade-12': ['Electric Charges & Fields', 'Electrostatic Potential', 'Current Electricity', 'Moving Charges', 'Magnetism']
  },
  chemistry: {
    'grade-6': ['Sorting Materials', 'Separation of Substances', 'Changes Around Us', 'Getting to Know Plants', 'Body Movements'],
    'grade-7': ['Acids, Bases & Salts', 'Physical & Chemical Changes', 'Weather, Climate & Adaptations', 'Soil', 'Respiration in Organisms'],
    'grade-8': ['Synthetic Fibres & Plastics', 'Metals & Non-metals', 'Coal & Petroleum', 'Combustion & Flame', 'Natural Resources'],
    'grade-9': ['Matter in Our Surroundings', 'Is Matter Around Us Pure', 'Atoms & Molecules', 'Structure of Atom', 'Cell'],
    'grade-10': ['Chemical Reactions & Equations', 'Acids, Bases & Salts', 'Metals & Non-metals', 'Carbon & Its Compounds', 'Periodic Classification'],
    'grade-11': ['Some Basic Concepts', 'Structure of Atom', 'Classification of Elements', 'Chemical Bonding', 'States of Matter'],
    'grade-12': ['Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry']
  },
  biology: {
    'grade-6': ['Food & Its Components', 'Getting to Know Plants', 'Body Movements', 'Living Organisms', 'Motion & Measurement'],
    'grade-7': ['Nutrition in Plants', 'Nutrition in Animals', 'Fibre to Fabric', 'Heat', 'Acids, Bases & Salts'],
    'grade-8': ['Crop Production', 'Microorganisms', 'Synthetic Fibres', 'Metals & Non-metals', 'Coal & Petroleum'],
    'grade-9': ['Fundamental Unit of Life', 'Tissues', 'Diversity in Living Organisms', 'Why Do We Fall Ill', 'Natural Resources'],
    'grade-10': ['Life Processes', 'Control & Coordination', 'How Do Organisms Reproduce', 'Heredity & Evolution', 'Our Environment'],
    'grade-11': ['Diversity in Living World', 'Structural Organisation', 'Cell Structure & Function', 'Plant Physiology', 'Human Physiology'],
    'grade-12': ['Reproduction', 'Genetics & Evolution', 'Biology & Human Welfare', 'Biotechnology', 'Ecology & Environment']
  }
}

// Helper function to get lessons for a specific subject and grade
export const getLessonsForSubjectAndGrade = (subject, grade) => {
  return subjectLessonMapping[subject]?.[grade] || []
}

// Helper function to convert subject/game names to URL-friendly format
export const toKebabCase = (str) => {
  return str.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

// Helper function to convert kebab-case back to original format
export const fromKebabCase = (str) => {
  return str.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Helper function to format subject name for display
export const formatSubjectName = (subject) => {
  const subjectMap = {
    'mathematics': 'Mathematics',
    'computer-science': 'Computer Science',
    'physics': 'Physics',
    'chemistry': 'Chemistry',
    'biology': 'Biology'
  }
  return subjectMap[subject] || subject
}