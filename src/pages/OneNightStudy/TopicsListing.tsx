import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Topic } from './types'

type FAQ = { q: string; a: string; grades?: number[] }

const curatedTopics: Topic[] = [
  { grade: 6, subject: 'Mathematics', title: 'Integers - Complete Module', bullets: ['Definition and representation', 'Absolute value concept', 'Comparing and ordering', 'All four operations', 'Properties and rules'] },
  { grade: 6, subject: 'Mathematics', title: 'Fractions & Decimals', bullets: ['Simplify and compare fractions', 'Convert fractions ↔ decimals', 'Add/Subtract with LCM', 'Multiply/Divide fractions and decimals'] },
  { grade: 6, subject: 'Science', title: 'Electricity and Circuits - Complete Module', bullets: ['Definition of electricity and current', 'Circuit components and functions', 'Series vs parallel circuits', 'Conductors vs insulators', 'Electrical safety rules'] },
  { grade: 6, subject: 'Science', title: 'Our Body and Health - Complete Module', bullets: ['Human body systems overview', 'Health and hygiene importance', 'Balanced diet and nutrients', 'Disease prevention basics', 'Daily health practices'] },
  { grade: 6, subject: 'Computer Science', title: 'Word Processor – Tabular Presentation - Complete Module', bullets: ['Table components: rows, columns, cells', 'Creating and inserting tables', 'Merging and splitting cells', 'Formatting and styling tables', 'Advantages of tabular presentation'] },
  { grade: 7, subject: 'Mathematics', title: 'Fractions and Decimals - Complete Module', bullets: ['Types of fractions: proper, improper, mixed, like, unlike', 'Addition and subtraction rules', 'Multiplication and division techniques', 'Decimal place values and operations', 'Converting between fractions and decimals'] },
  { grade: 7, subject: 'Science', title: 'Motion and Time - Complete Module', bullets: ['Definition of motion and reference points', 'Uniform vs non-uniform motion', 'Distance vs displacement', 'Speed formula and calculations', 'Time measurement and units', 'Motion graphs interpretation', 'Measuring instruments for motion'] },
  { grade: 7, subject: 'Science', title: 'Electric Current and Circuits - Complete Module', bullets: ['Electric current definition and formula', 'Voltage and resistance concepts', 'Circuit components and functions', 'Series vs parallel circuits', 'Switches and safety devices', 'Conductors vs insulators'] },
  { grade: 7, subject: 'Science', title: 'Heat - Complete Module', bullets: ['Heat vs temperature definition', 'Conduction, convection, radiation', 'Effects: expansion and state changes', 'Temperature measurement basics', 'Specific heat capacity introduction', 'Heat conductors vs insulators'] },
  { grade: 7, subject: 'Science', title: 'Life Processes - Complete Module', bullets: ['Nutrition: autotrophic vs heterotrophic', 'Respiration: aerobic vs anaerobic', 'Transportation in plants and humans', 'Excretion in plants and humans', 'Reproduction: asexual vs sexual', 'Homeostasis concept'] },
  { grade: 7, subject: 'Science', title: 'Nutrition in Animals and Plants - Complete Module', bullets: ['Photosynthesis process and requirements', 'Plant nutrition types: autotrophic, parasitic, insectivorous', 'Animal diet types: herbivores, carnivores, omnivores', 'Human digestive system overview', 'Nutrition in insects and Amoeba', 'Overall importance of nutrition'] },
  { grade: 7, subject: 'Science', title: 'Respiration and Circulation - Complete Module', bullets: ['Aerobic vs anaerobic respiration types', 'Heart chambers and blood pumping', 'Blood vessels: arteries, veins, capillaries', 'Blood components and their functions', 'Pulmonary vs systemic circulation', 'Integration of breathing and blood flow'] },
  { grade: 7, subject: 'Computer Science', title: 'Microsoft PowerPoint - Complete Module', bullets: ['Slide components and structure', 'Adding text, images, shapes, and charts', 'Design themes and backgrounds', 'Transitions and animations', 'Slide Show and Presenter View', 'File formats and saving options'] },
  { grade: 8, subject: 'Mathematics', title: 'Rational Numbers - Complete Module', bullets: ['Definition and examples of rational numbers', 'Fundamental properties (closure, commutative, associative, distributive)', 'Representing rational numbers on number line', 'Standard form of rational numbers', 'Comparing rational numbers', 'Addition, subtraction, multiplication, and division operations'] },
  { grade: 8, subject: 'Mathematics', title: 'Linear Equations - Complete Module', bullets: ['Definition of linear equations in one and two variables', 'Steps for solving linear equations in one variable', 'Graphical representation of linear equations in two variables', 'Properties of linear equations (number of solutions)', 'Practical applications in word problems'] },
  { grade: 8, subject: 'Mathematics', title: 'Understanding Quadrilaterals - Complete Module', bullets: ['Definition of polygons and quadrilaterals', 'Types of quadrilaterals and their properties', 'Angle Sum Property of quadrilaterals', 'Properties of diagonals for each type', 'Classification and identification methods'] },
  { grade: 8, subject: 'Computer Science', title: 'Introduction to Computer Languages - Complete Module', bullets: ['Fundamental definition of computer languages', 'Types of languages: machine, assembly, high-level', 'Programming vs scripting languages', 'Compiler vs interpreter differences', 'Importance in our digital world'] },
  { grade: 8, subject: 'Computer Science', title: 'Introduction to Database - Complete Module', bullets: ['Fundamental definition and purpose of databases', 'Key components: tables, rows/records, columns/fields, primary key', 'Types of databases: flat-file, relational, distributed', 'Main advantages of using databases', 'Common examples of database software'] },
  { grade: 8, subject: 'Computer Science', title: 'MS Access – A DBMS - Complete Module', bullets: ['MS Access as a Relational Database Management System (RDBMS)', 'Key features: Tables, Queries, Forms, Reports, Relationships', 'DBMS functionalities and core capabilities', 'Main advantages and disadvantages of using MS Access', 'Practical applications in database management'] },
  { grade: 8, subject: 'Science', title: 'Force and Pressure - Complete Module', bullets: ['Definition, unit, and formula for force', 'Contact vs non-contact forces with examples', 'Definition, unit, and formula for pressure', 'Relationship between force, area, and pressure', 'Practical applications in daily life and technology'] },
  { grade: 8, subject: 'Science', title: 'Friction - Complete Module', bullets: ['Fundamental definition of friction', 'Types of friction: static, kinetic, rolling, fluid', 'Factors affecting friction and its advantages/disadvantages', 'Methods for reducing and increasing friction', 'Real-world applications and examples'] },
  { grade: 8, subject: 'Science', title: 'Sound - Complete Module', bullets: ['Definition of sound and medium dependence', 'Vibration as the source of sound production', 'Sound characteristics: pitch, loudness, quality', 'Sound propagation as longitudinal waves', 'Sound reflection, echo, and SONAR applications'] },
  { grade: 8, subject: 'Science', title: 'Cell Structure and Function - Complete Module', bullets: ['Definition of cell and unicellular vs multicellular organisms', 'Prokaryotic vs eukaryotic cell types', 'Key organelles: nucleus, mitochondria, chloroplasts, ribosomes', 'Differences between plant and animal cells', 'Overall importance of cells to living organisms'] },
  { grade: 8, subject: 'Science', title: 'Tissues in Plants and Animals - Complete Module', bullets: ['Definition of tissue and its role in organisms', 'Plant tissues: meristematic and permanent types', 'Animal tissues: epithelial, connective, muscular, nervous', 'Examples of different tissue sub-types', 'Overall importance of tissues in living organisms'] },
  { grade: 9, subject: 'Mathematics', title: 'Number Systems - Complete Module', bullets: ['Natural Numbers, Whole Numbers, and Integers definitions', 'Rational vs Irrational Numbers and key differences', 'Real Numbers as collection of rational and irrational', 'Number properties: Density Property and decimal representation', 'Laws of Exponents for real numbers and number line visualization'] },
  { grade: 9, subject: 'Mathematics', title: 'Polynomials - Complete Module', bullets: ['Definition of polynomial with variables, coefficients, and degree', 'Types of polynomials by terms and degree classification', 'Concept of zero of a polynomial and finding methods', 'Remainder Theorem for polynomial division', 'Factor Theorem and its applications in factoring'] },
  { grade: 9, subject: 'Mathematics', title: 'Coordinate Geometry - Complete Module', bullets: ['Cartesian plane components: x-axis, y-axis, origin', 'Coordinate representation and meaning of points', 'Four quadrants and coordinate signs in each', 'Distance Formula and Midpoint Formula applications', 'Section Formula and collinearity condition'] },
  { grade: 9, subject: 'Computer Science', title: 'Basics of Information Technology - Complete Module', bullets: ['Computer system components: hardware and software', 'Different types of computers and their purposes', 'Distinction between data and information', 'Computer networks and Internet overview', 'IT applications and cyber safety introduction'] },
  { grade: 9, subject: 'Computer Science', title: 'Cyber Safety - Complete Module', bullets: ['Common cyber threats: malware, phishing, cyberbullying, hacking', 'Password safety and strong password creation', 'Safe browsing and secure website recognition', 'Social media safety and data protection practices', 'Email safety and online etiquette (netiquette)'] },
  { grade: 9, subject: 'Science', title: 'Motion - Complete Module', bullets: ['Types of motion: uniform and non-uniform', 'Distance vs displacement and speed vs velocity', 'Definition and calculation of acceleration', 'Three equations of motion for uniformly accelerated motion', 'Motion graphs interpretation and relative motion concept'] },
  { grade: 9, subject: 'Science', title: 'Force and Laws of Motion - Complete Module', bullets: ['Definition, unit, and types of force', 'Newton\'s Three Laws of Motion with real-life examples', 'Concept of inertia and its relation to mass', 'Definition and unit of momentum', 'Practical applications of motion laws'] },
  { grade: 9, subject: 'Science', title: 'Gravitation - Complete Module', bullets: ['Newton\'s Law of Universal Gravitation and formula', 'Acceleration due to gravity (g) and its value on Earth', 'Distinction between mass and weight', 'Variation of g with height and depth', 'Free fall motion and basics of orbital motion'] },
  { grade: 9, subject: 'Science', title: 'The Fundamental Unit of Life – Cell Theory - Complete Module', bullets: ['Historical figures in cell discovery', 'Three main tenets of Cell Theory and modern extensions', 'Distinction between prokaryotic and eukaryotic cells', 'Structure and function of cell components and organelles', 'Cell significance to life processes and cell division overview'] },
  { grade: 10, subject: 'Mathematics', title: 'Real Numbers - Complete Module', bullets: ['Euclid\'s Division Lemma and its application in finding HCF', 'Fundamental Theorem of Arithmetic for HCF and LCM', 'Distinction between rational and irrational numbers', 'Types of decimal expansions of rational numbers', 'Laws of Exponents for real numbers'] },
  { grade: 10, subject: 'Mathematics', title: 'Pair of Linear Equations in Two Variables - Complete Module', bullets: ['Forms of linear equations in two variables', 'Conditions for consistency: unique, infinitely many, or no solutions', 'Graphical method of solving linear equations', 'Algebraic methods: substitution, elimination, cross-multiplication', 'Real-world applications and problem-solving techniques'] },
  { grade: 10, subject: 'Mathematics', title: 'Polynomials (Advanced) - Complete Module', bullets: ['Definition and degree of polynomials', 'Classification by degree and number of terms', 'Zeros of polynomials and their geometric meaning', 'Relationship between zeros and coefficients for quadratic and cubic polynomials', 'Division Algorithm, long division, and synthetic division methods'] },
  { grade: 10, subject: 'Computer Science', title: 'Introduction to Programming - Complete Module', bullets: ['Definition and role of programs in computing', 'Low-level vs high-level programming languages', 'Features of good programming languages', 'Basic programming concepts: variables, data types, operators', 'Input/output operations and control structures', 'Systematic problem-solving approach in programming'] },
  { grade: 10, subject: 'Computer Science', title: 'Office Automation Tools - Complete Module', bullets: ['Purpose and definition of office automation tools', 'Key features of word processing software', 'Key features of spreadsheet software', 'Key features of presentation software', 'Key features of database management software', 'Key features of email and scheduling tools', 'Integration, collaboration, and security features'] },
  { grade: 10, subject: 'Computer Science', title: 'Internet and Network Basics - Complete Module', bullets: ['Definition and types of computer networks', 'Fundamental concept of the Internet and its key features', 'Distinction between IP addresses and domain names', 'Roles of web browsers and websites', 'Common network protocols', 'Network hardware components', 'Main advantages of networks and the Internet'] },
  { grade: 10, subject: 'Science', title: 'Light – Reflection and Refraction - Complete Module', bullets: ['Fundamental principles and laws of reflection', 'Distinction between regular and diffuse reflection', 'Types of mirrors (plane, concave, convex) and their uses', 'Fundamental principles and laws of refraction (including Snell\'s Law)', 'Types of lenses (convex, concave) and their uses', 'Concept of Total Internal Reflection (TIR) and its applications'] },
  { grade: 10, subject: 'Science', title: 'Human Eye and Colourful World - Complete Module', bullets: ['Structure and function of the human eye', 'Common defects of vision (Myopia, Hypermetropia, etc.) and their corrections', 'Key phenomena of light including dispersion and scattering', 'Atmospheric refraction and natural optical phenomena', 'Mechanism of color perception in humans', 'Applications of optical principles in daily life'] },
  { grade: 10, subject: 'Science', title: 'Electricity - Complete Module', bullets: ['Definitions and units of electric current, voltage, and resistance', 'Ohm\'s Law and its relation between V, I, and R', 'Formula and unit for electric power', 'Key differences and total resistance formulas for series and parallel circuits', 'Common applications of electricity'] },
  { grade: 10, subject: 'Science', title: 'Life Processes (Advanced) - Complete Module', bullets: ['Nutrition, including autotrophic and heterotrophic types', 'Respiration, including aerobic and anaerobic types', 'Transportation in both plants and humans', 'Excretion in both plants and humans'] },
  { grade: 10, subject: 'Science', title: 'Control and Coordination - Complete Module', bullets: ['Control and coordination in animals, covering the nervous and endocrine systems', 'The key components and functions of the nervous system (neurons, synapse, reflex action, voluntary action)', 'The key components and functions of the endocrine system (glands and hormones)', 'Control and coordination in plants, focusing on plant hormones and tropisms'] },
  { grade: 10, subject: 'Science', title: 'Heredity and Evolution - Complete Module', bullets: ['The definitions of heredity and evolution', 'The fundamental units of heredity: genes and chromosomes', 'An overview of Mendel\'s Laws and the concepts of dominant and recessive traits', 'The basic principles and mechanisms of evolution, including natural selection and speciation', 'The evidence for evolution (fossils, homologous/analogous structures)'] },
  { grade: 11, subject: 'Mathematics', title: 'Sets - Complete Module', bullets: ['The fundamental definition and representation of sets', 'The different types of sets (finite, infinite, null, subset, power set, universal set)', 'The use of Venn diagrams', 'The basic set operations (union, intersection, difference, complement) and their properties', 'The concept of cardinality of a set'] },
  { grade: 11, subject: 'Mathematics', title: 'Relations and Functions - Complete Module', bullets: ['The Cartesian product of sets', 'The definition and various types of relations (empty, universal, reflexive, symmetric, transitive, and equivalence)', 'The definition of a function and its components (domain, codomain, range)', 'The key types of functions (one-one, onto, bijective)', 'The composition of functions', 'The condition for the existence of an inverse of a function'] },
  { grade: 11, subject: 'Mathematics', title: 'Trigonometric Functions - Complete Module', bullets: ['The measurement of angles in degrees and radians', 'The definitions of the six trigonometric functions using the unit circle', 'The signs of trigonometric functions in the four quadrants (ASTC Rule)', 'Key trigonometric identities', 'The periodicity of trigonometric functions', 'The graphs of trigonometric functions', 'The principal values of inverse trigonometric functions'] },
  { grade: 11, subject: 'Computer Science', title: 'Computer Fundamentals - Complete Module', bullets: ['The key components of a computer system (hardware and software)', 'The different types of hardware (input, output, storage, processing, communication)', 'The different types of software (system, application, programming)', 'The basic computer operations (input, processing, storage, output, control)', 'The characteristics of computers', 'The memory hierarchy'] },
  { grade: 11, subject: 'Computer Science', title: 'Programming Methodology with Python - Complete Module', bullets: ['The basics of Python syntax, variables, and data types', 'How to perform Input and Output operations', 'The use of different operators (arithmetic, comparison, logical, assignment)', 'The application of conditional statements (if-elif-else)', 'The use of loops (for, while)', 'The creation and use of functions', 'The key data structures (List, Tuple, Dictionary, Set)', 'Basic file handling operations', 'Methods for error handling (try-except)', 'The systematic steps in programming methodology'] },
  // Sample topics for Biology, Physics, and Chemistry for grade 11
  { grade: 11, subject: 'Biology', title: 'Cell Biology - Complete Module', bullets: ['Cell structure and organelles', 'Cell membrane and transport', 'Cell division and cycle', 'Cellular respiration and photosynthesis', 'Cell communication and signaling'] },
  { grade: 11, subject: 'Physics', title: 'Mechanics - Complete Module', bullets: ['Kinematics and motion in one and two dimensions', 'Newton\'s laws of motion', 'Work, energy, and power', 'Momentum and collisions', 'Circular motion and gravitation'] },
  { grade: 11, subject: 'Chemistry', title: 'Atomic Structure - Complete Module', bullets: ['Atomic models and theories', 'Subatomic particles and their properties', 'Electronic configuration', 'Periodic table and periodic properties', 'Chemical bonding and molecular structure'] },
  // New module for Physical World and Measurement
  { grade: 11, subject: 'Physics', title: 'Physical World and Measurement - Complete Module', bullets: ['The scope and excitement of physics', 'Fundamental and derived physical quantities', 'SI units and measurement standards', 'Types of measurement instruments', 'Accuracy, precision, and errors in measurement', 'Dimensional analysis and its applications'] },
  // Sample topics for Biology, Physics, and Chemistry for grade 12
  { grade: 12, subject: 'Biology', title: 'Genetics and Evolution - Complete Module', bullets: ['Mendelian genetics and inheritance patterns', 'Chromosomal basis of inheritance', 'DNA structure and replication', 'Gene expression and regulation', 'Evolutionary mechanisms and evidence'] },
  { grade: 12, subject: 'Physics', title: 'Electromagnetism - Complete Module', bullets: ['Electric fields and Gauss\'s law', 'Electric potential and capacitance', 'Current electricity and Ohm\'s law', 'Magnetic effects of current', 'Electromagnetic induction and AC'] },
  { grade: 12, subject: 'Chemistry', title: 'Organic Chemistry - Complete Module', bullets: ['Hydrocarbons and their classification', 'Alcohols, phenols, and ethers', 'Aldehydes, ketones, and carboxylic acids', 'Amines and diazonium salts', 'Biomolecules and polymers'] },
]

const faqBank: Record<string, FAQ[]> = {
  Mathematics: [
    { q: 'What formulae should I memorize for this chapter?', a: 'List core identities and standard results (e.g., quadratic formula, factoring identities, derivative/integral basics for higher grades).', grades: [9,10,11,12] },
    { q: 'How do I quickly check my answer?', a: 'Substitute the solution back into the original equation; for graphs, verify intercepts and slopes match expected values.' },
    { q: 'What are common mistakes to avoid?', a: 'Sign errors, wrong order of operations, and skipping unit checks in word problems are frequent pitfalls.' },
    { q: 'How to revise efficiently before exam?', a: 'Solve 3–5 mixed problems covering concepts from the bullet list; time yourself and review each step.' },
  ],
  Science: [
    { q: 'Which equations are essential?', a: 'Keep a sheet of key relations (e.g., kinematics, electricity, optics); note variables and units for each.', grades: [9,10,11,12] },
    { q: 'How to approach numericals fast?', a: 'Write knowns/unknowns, pick the governing law, ensure units are in SI, then compute and sanity-check magnitudes.' },
    { q: 'How can I avoid conceptual traps?', a: 'Differentiate scalar vs vector, series vs parallel, and note directionality in field/force diagrams.' },
  ],
  'Computer Science': [
    { q: 'How do I practice coding concepts?', a: 'Use online platforms like Scratch (for beginners), CodePen, or repl.it; solve small problems daily and gradually increase complexity.', grades: [6,7,8] },
    { q: 'What programming language should I start with?', a: 'For beginners, Python or JavaScript are excellent choices due to readable syntax and wide application. Block-based languages like Scratch are perfect for grades 6-7.' },
    { q: 'How to debug effectively?', a: 'Use print statements to track variable values, read error messages carefully, test small code sections, and use debugging tools in your IDE.' },
    { q: 'How to prepare for programming assessments?', a: 'Practice implementing algorithms from scratch, review common data structures, and solve problems with time constraints to build speed and accuracy.', grades: [9,10,11,12] },
  ],
  Biology: [
    { q: 'How to memorize biological processes?', a: 'Use diagrams, flowcharts, and mnemonics; relate concepts to real-life examples.', grades: [11,12] },
    { q: 'What diagrams should I practice?', a: 'Focus on cell structures, organ systems, and life cycle diagrams; label all parts accurately.' },
    { q: 'How to approach genetics problems?', a: 'Understand inheritance patterns, use Punnett squares, and practice pedigree analysis.' },
  ],
  Physics: [
    { q: 'Which formulas should I memorize?', a: 'Create a formula sheet with units; focus on kinematics, dynamics, and electromagnetism equations.', grades: [11,12] },
    { q: 'How to solve numerical problems?', a: 'Identify given data, choose the right formula, check units, and verify answers logically.' },
    { q: 'How to understand concepts better?', a: 'Relate physics to daily experiences, use visualizations, and solve concept-based questions.' },
    { q: 'What are the key concepts in measurement?', a: 'Focus on fundamental quantities, SI units, dimensional analysis, and error handling.', grades: [11] },
  ],
  Chemistry: [
    { q: 'How to master organic chemistry?', a: 'Learn functional groups, reaction mechanisms, and practice naming compounds.', grades: [11,12] },
    { q: 'What are common calculation errors?', a: 'Check stoichiometry, units, and significant figures; balance equations properly.' },
    { q: 'How to remember chemical reactions?', a: 'Group reactions by type, practice regularly, and understand the underlying principles.' },
  ],
}

export default function TopicsListing() {
  const navigate = useNavigate()
  const [gradeFilter, setGradeFilter] = useState<number>(6)
  const [subjectFilter, setSubjectFilter] = useState<string>('Mathematics')
  const [reviewed, setReviewed] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ons_reviewed')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const subjects = useMemo(() => Array.from(new Set(curatedTopics.map(t => t.subject))), [])

  useEffect(() => {
    if (subjectFilter !== 'all' && !subjects.includes(subjectFilter) && subjects.length > 0) {
      setSubjectFilter('all')
    }
  }, [subjects, subjectFilter])

  const filtered = useMemo(() => curatedTopics.filter(t => {
    const gradeOk = t.grade === gradeFilter
    const subjectOk = subjectFilter === 'all' ? true : t.subject === subjectFilter
    return gradeOk && subjectOk
  }), [gradeFilter, subjectFilter])

  // Modified to show different subjects for grades 11 and 12
  const subjectOptions = useMemo(() => {
    // For grades 11 and 12, replace Science with Biology, Physics, and Chemistry
    if (gradeFilter === 11 || gradeFilter === 12) {
      // Get all subjects for the current grade
      const gradeSubjects = Array.from(new Set(curatedTopics.filter(t => t.grade === gradeFilter).map(t => t.subject)));
      
      // If Science exists for this grade, replace it with Biology, Physics, and Chemistry
      // But since we confirmed there are no Science topics for grades 11-12, 
      // we just ensure Biology, Physics, and Chemistry are included
      const requiredSubjects = ['Biology', 'Physics', 'Chemistry'];
      const allSubjects = [...gradeSubjects];
      
      // Add any missing required subjects
      for (const subject of requiredSubjects) {
        if (!allSubjects.includes(subject)) {
          allSubjects.push(subject);
        }
      }
      
      return ['all', ...allSubjects];
    }
    // For other grades, show all subjects including Science
    const gradeSubjects = Array.from(new Set(curatedTopics.filter(t => t.grade === gradeFilter).map(t => t.subject)));
    return ['all', ...gradeSubjects];
  }, [gradeFilter]);

  const faqsForSelection: FAQ[] = useMemo(() => {
    if (subjectFilter === 'all') return []
    const bank = faqBank[subjectFilter] || []
    return bank.filter(f => !f.grades || f.grades.includes(gradeFilter)).slice(0, 5)
  }, [subjectFilter, gradeFilter])

  const toggleReviewed = (key: string) => {
    const next = { ...reviewed, [key]: !reviewed[key] }
    setReviewed(next)
    try { localStorage.setItem('ons_reviewed', JSON.stringify(next)) } catch (error) {
      console.error('Failed to save review status to localStorage:', error)
    }
  }

  const getModuleRoute = (title: string) => {
    const routes: Record<string, string> = {
      'Integers - Complete Module': 'integers',
      'Fractions & Decimals': 'fractions-decimals',
      'Fractions and Decimals - Complete Module': 'fractions-decimals-grade7',
      'Electricity and Circuits - Complete Module': 'electricity-circuits',
      'Electric Current and Circuits - Complete Module': 'electric-current-circuits',
      'Our Body and Health - Complete Module': 'our-body-health',
      'Microsoft PowerPoint - Complete Module': 'powerpoint',
      'Word Processor – Tabular Presentation - Complete Module': 'word-processor-tabular',
      'Motion and Time - Complete Module': 'motion-time',
      'Respiration and Circulation - Complete Module': 'respiration-circulation',
      'Heat - Complete Module': 'heat',
      'Life Processes - Complete Module': 'life-processes',
      'Nutrition in Animals and Plants - Complete Module': 'nutrition-animals-plants',
      'Rational Numbers - Complete Module': 'rational-numbers',
      'Linear Equations - Complete Module': 'linear-equations',
      'Understanding Quadrilaterals - Complete Module': 'understanding-quadrilaterals',
      'Introduction to Computer Languages - Complete Module': 'intro-computer-languages',
      'Introduction to Database - Complete Module': 'intro-database',
      'MS Access – A DBMS - Complete Module': 'ms-access-dbms',
      'Force and Pressure - Complete Module': 'force-pressure',
      'Friction - Complete Module': 'friction',
      'Sound - Complete Module': 'sound',
      'Cell Structure and Function - Complete Module': 'cell-structure-function',
      'Tissues in Plants and Animals - Complete Module': 'tissues',
      'Number Systems - Complete Module': 'number-systems',
      'Polynomials - Complete Module': 'polynomials',
      'Coordinate Geometry - Complete Module': 'coordinate-geometry',
      'Basics of Information Technology - Complete Module': 'basics-it',
      'Cyber Safety - Complete Module': 'cyber-safety',
      'Motion - Complete Module': 'motion',
      'Force and Laws of Motion - Complete Module': 'force-laws-motion',
      'Gravitation - Complete Module': 'gravitation',
      'The Fundamental Unit of Life – Cell Theory - Complete Module': 'cell-theory',
      'Real Numbers - Complete Module': 'real-numbers',
      'Pair of Linear Equations in Two Variables - Complete Module': 'pair-linear-equations',
      'Polynomials (Advanced) - Complete Module': 'polynomials-grade10',
      'Introduction to Programming - Complete Module': 'intro-programming',
      'Office Automation Tools - Complete Module': 'office-automation',
      'Internet and Network Basics - Complete Module': 'internet-network-basics',
      'Light – Reflection and Refraction - Complete Module': 'light-reflection-refraction',
      'Human Eye and Colourful World - Complete Module': 'human-eye-colourful-world',
      'Electricity - Complete Module': 'electricity-grade10',
      'Life Processes (Advanced) - Complete Module': 'life-processes-grade10',
      'Control and Coordination - Complete Module': 'control-coordination',
      'Heredity and Evolution - Complete Module': 'heredity-evolution',
      'Sets - Complete Module': 'sets',
      'Relations and Functions - Complete Module': 'relations-functions',
      'Trigonometric Functions - Complete Module': 'trigonometric-functions',
      'Computer Fundamentals - Complete Module': 'computer-fundamentals',
      'Programming Methodology with Python - Complete Module': 'programming-methodology-python',
      // New routes for Biology, Physics, and Chemistry topics
      'Cell Biology - Complete Module': 'cell-biology',
      'Mechanics - Complete Module': 'mechanics',
      'Atomic Structure - Complete Module': 'atomic-structure',
      'Genetics and Evolution - Complete Module': 'genetics-evolution',
      'Electromagnetism - Complete Module': 'electromagnetism',
      'Organic Chemistry - Complete Module': 'organic-chemistry',
      // New route for Physical World and Measurement module
      'Physical World and Measurement - Complete Module': 'physical-world-measurement',
      // Add more mappings as needed
    }
    return routes[title] || 'integers' // fallback
  }

  const handleModuleClick = (title: string) => {
    const route = getModuleRoute(title)
    navigate(`/onestudy/${route}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-3 md:items-end">
        <div>
          <div className="text-xs text-gray-600 dark:text-slate-400">Grade</div>
          <select value={gradeFilter} onChange={(e) => setGradeFilter(Number(e.target.value))} className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
            {[6,7,8,9,10,11,12].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <div className="text-xs text-gray-600 dark:text-slate-400">Subject</div>
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
            {subjectOptions.map(s => <option key={s} value={s}>{s === 'all' ? 'All' : s}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t, idx) => {
          const key = `${t.grade}-${t.subject}-${t.title}`
          const isReviewed = reviewed[key]
          const hasRoute = ['Integers - Complete Module', 'Fractions & Decimals', 'Fractions and Decimals - Complete Module', 'Electricity and Circuits - Complete Module', 'Electric Current and Circuits - Complete Module', 'Our Body and Health - Complete Module', 'Microsoft PowerPoint - Complete Module', 'Word Processor – Tabular Presentation - Complete Module', 'Motion and Time - Complete Module', 'Respiration and Circulation - Complete Module', 'Heat - Complete Module', 'Life Processes - Complete Module', 'Nutrition in Animals and Plants - Complete Module', 'Rational Numbers - Complete Module', 'Linear Equations - Complete Module', 'Understanding Quadrilaterals - Complete Module', 'Introduction to Computer Languages - Complete Module', 'Introduction to Database - Complete Module', 'MS Access – A DBMS - Complete Module', 'Force and Pressure - Complete Module', 'Friction - Complete Module', 'Sound - Complete Module', 'Cell Structure and Function - Complete Module', 'Tissues in Plants and Animals - Complete Module', 'Number Systems - Complete Module', 'Polynomials - Complete Module', 'Coordinate Geometry - Complete Module', 'Basics of Information Technology - Complete Module', 'Cyber Safety - Complete Module', 'Motion - Complete Module', 'Force and Laws of Motion - Complete Module', 'Gravitation - Complete Module', 'The Fundamental Unit of Life – Cell Theory - Complete Module', 'Real Numbers - Complete Module', 'Pair of Linear Equations in Two Variables - Complete Module', 'Polynomials (Advanced) - Complete Module', 'Introduction to Programming - Complete Module', 'Office Automation Tools - Complete Module', 'Internet and Network Basics - Complete Module', 'Light – Reflection and Refraction - Complete Module', 'Human Eye and Colourful World - Complete Module', 'Electricity - Complete Module', 'Life Processes (Advanced) - Complete Module', 'Control and Coordination - Complete Module', 'Heredity and Evolution - Complete Module', 'Sets - Complete Module', 'Relations and Functions - Complete Module', 'Trigonometric Functions - Complete Module', 'Computer Fundamentals - Complete Module', 'Programming Methodology with Python - Complete Module', 'Cell Biology - Complete Module', 'Mechanics - Complete Module', 'Atomic Structure - Complete Module', 'Genetics and Evolution - Complete Module', 'Electromagnetism - Complete Module', 'Organic Chemistry - Complete Module', 'Physical World and Measurement - Complete Module'].includes(t.title)
          
          return (
            <div key={idx} className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">Grade {t.grade} • {t.subject}</div>
                  <div className="text-gray-900 dark:text-white font-semibold">{t.title}</div>
                </div>
                <button 
                  aria-label="Mark as reviewed" 
                  onClick={() => toggleReviewed(key)} 
                  className={`text-xs px-2 py-1 rounded-md border ${isReviewed ? 'bg-emerald-600 border-emerald-700 text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-slate-300'}`}
                >
                  {isReviewed ? 'Reviewed' : 'Mark reviewed'}
                </button>
              </div>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 dark:text-slate-300">
                {t.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              
              {/* Launch button for available modules */}
              {hasRoute && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => handleModuleClick(t.title)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>🚀</span>
                    <span>Start Complete Learning Module</span>
                  </button>
                  <p className="text-xs text-gray-500 dark:text-slate-400 text-center mt-2">
                    Interactive lessons + MCQs + Self-checking
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
        <div className="text-gray-900 dark:text-white font-semibold mb-2">FAQs</div>
        {subjectFilter === 'all' ? (
          <div className="text-sm text-gray-700 dark:text-slate-300">Select a subject to view grade-specific FAQs.</div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-slate-800">
            {faqsForSelection.map((f, i) => (
              <details key={i} className="py-2">
                <summary className="cursor-pointer text-sm font-medium text-gray-800 dark:text-slate-200">{f.q}</summary>
                <div className="mt-1 text-sm text-gray-700 dark:text-slate-300">{f.a}</div>
              </details>
            ))}
            {faqsForSelection.length === 0 && (
              <div className="text-sm text-gray-700 dark:text-slate-300 py-2">FAQs will appear here for the selected grade and subject.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}