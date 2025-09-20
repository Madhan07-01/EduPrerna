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
    'grade-10': ['Advanced Python', 'Algorithms', 'Computer Networks', 'Database Management', 'Mobile Development'],
    'grade-11': ['Data Science', 'Machine Learning', 'Web Frameworks', 'System Design', 'Ethics in Computing'],
    'grade-12': ['Advanced Algorithms', 'Distributed Systems', 'Computer Graphics', 'Artificial Intelligence', 'Project Management']
  },
  physics: {
    'grade-6': ['Motion and Measurement', 'Light Shadows Reflections', 'Electricity and Circuits', 'Fun with Magnets', 'Water'],
    'grade-7': ['Heat', 'Acids Bases and Salts', 'Physical and Chemical Changes', 'Weather Climate Water', 'Winds Storms Cyclones'],
    'grade-8': ['Force and Motion', 'Friction', 'Sound', 'Chemical Effects of Electric Current', 'Light'],
    'grade-9': ['Motion', 'Force and Laws of Motion', 'Gravitation', 'Work and Energy', 'Sound'],
    'grade-10': ['Light Reflection Refraction', 'Human Eye', 'Electricity', 'Magnetic Effects', 'Sources of Energy'],
    'grade-11': ['Units and Measurements', 'Kinematics', 'Laws of Motion', 'Work Energy Power', 'Rotational Motion'],
    'grade-12': ['Electric Charges Fields', 'Current Electricity', 'Magnetic Effects', 'Electromagnetic Induction', 'Alternating Current']
  },
  chemistry: {
    'grade-6': ['Food Components', 'Acids and Bases', 'Physical and Chemical Changes', 'Getting to Know Plants', 'Body Movements'],
    'grade-7': ['Acids Bases and Salts', 'Physical and Chemical Changes', 'Weather Climate Water', 'Soil', 'Respiration in Organisms'],
    'grade-8': ['Synthetic Fibres and Plastics', 'Metals and Non-metals', 'Coal and Petroleum', 'Combustion and Flame', 'Pollution of Air Water'],
    'grade-9': ['Matter in Our Surroundings', 'Is Matter Around Us Pure', 'Atoms and Molecules', 'Structure of Atom', 'Natural Resources'],
    'grade-10': ['Chemical Reactions and Equations', 'Acids Bases and Salts', 'Metals and Non-metals', 'Carbon and its Compounds', 'Life Processes'],
    'grade-11': ['Some Basic Concepts', 'Structure of Atom', 'Classification of Elements', 'Chemical Bonding', 'States of Matter'],
    'grade-12': ['Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry']
  },
  biology: {
    'grade-6': ['Food Components', 'Getting to Know Plants', 'Body Movements', 'Living Organisms', 'Motion and Measurement'],
    'grade-7': ['Nutrition in Plants', 'Nutrition in Animals', 'Respiration in Organisms', 'Transportation in Animals Plants', 'Reproduction in Plants'],
    'grade-8': ['Crop Production Management', 'Microorganisms', 'Conservation of Plants Animals', 'Cell Structure Function', 'Reproduction in Animals'],
    'grade-9': ['Life Processes', 'Control and Coordination', 'How do Organisms Reproduce', 'Heredity and Evolution', 'Natural Resource Management'],
    'grade-10': ['Life Processes', 'Control and Coordination', 'How do Organisms Reproduce', 'Heredity and Evolution', 'Management of Natural Resources'],
    'grade-11': ['Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom', 'Morphology of Flowering Plants'],
    'grade-12': ['Reproduction in Organisms', 'Sexual Reproduction', 'Human Reproduction', 'Reproductive Health', 'Principles of Inheritance']
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