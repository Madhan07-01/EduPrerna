import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const someBasicConceptsOfChemistryModule: LearningModule = {
  title: 'Some Basic Concepts of Chemistry',
  introduction: 'Welcome to the fascinating world of chemistry! Chemistry is the science that deals with the composition, structure, properties, and reactions of matter. Understanding the basic concepts of chemistry is crucial for grasping more advanced topics in this subject. In this module, we\'ll explore fundamental ideas like the mole concept, atomic and molecular masses, stoichiometry, and solution concentrations. These concepts form the foundation for all chemical calculations and help us understand how substances interact with each other. Get ready to dive into the microscopic world of atoms and molecules!',
  concepts: [
    {
      title: 'Definition and States of Matter',
      content: 'Matter is anything that has mass and occupies space. Everything around us - from the air we breathe to the water we drink, from our bodies to the books we read - is made up of matter. Matter exists in different physical states based on the arrangement and movement of its particles.',
      examples: [
        'Definition: Matter is anything that has mass and takes up space (volume)',
        'Three main states: Solid, liquid, and gas',
        'Solid state: Particles are closely packed and vibrate in fixed positions (e.g., ice, wood)',
        'Liquid state: Particles are close together but can move past each other (e.g., water, oil)',
        'Gaseous state: Particles are far apart and move freely in all directions (e.g., oxygen, steam)',
        'Additional states: Plasma (high energy state) and Bose-Einstein condensate (extremely low temperature state)'
      ]
    },
    {
      title: 'Distinction Between Atoms, Molecules, Elements, and Compounds',
      content: 'Understanding the difference between atoms, molecules, elements, and compounds is fundamental to chemistry. These terms describe different levels of organization of matter, from the smallest indivisible units to complex combinations of atoms.',
      examples: [
        'Atom: The smallest particle of an element that retains its chemical properties (e.g., hydrogen atom, carbon atom)',
        'Molecule: A group of two or more atoms bonded together (e.g., H₂O, O₂, CO₂)',
        'Element: A pure substance made of only one type of atom (e.g., oxygen, gold, carbon)',
        'Compound: A substance made of two or more different elements chemically combined (e.g., water H₂O, salt NaCl)',
        'Example: Water molecule (H₂O) contains 2 hydrogen atoms and 1 oxygen atom, making it a compound'
      ]
    },
    {
      title: 'Law of Conservation of Mass',
      content: 'The Law of Conservation of Mass is one of the fundamental laws of chemistry. It states that mass cannot be created or destroyed in a chemical reaction. The total mass of reactants equals the total mass of products in any chemical reaction.',
      examples: [
        'Statement: "Mass can neither be created nor destroyed in a chemical reaction"',
        'Example: When 2g of hydrogen reacts with 16g of oxygen, exactly 18g of water is formed',
        'Application: Balancing chemical equations relies on this law',
        'Real-life example: When wood burns, the mass of ash, smoke, and gases equals the original mass of wood and oxygen consumed',
        'Important note: In nuclear reactions, a small amount of mass can be converted to energy (E=mc²), but this is negligible in chemical reactions'
      ]
    },
    {
      title: 'The Mole Concept and Related Calculations',
      content: 'The mole is a fundamental unit in chemistry that allows us to count particles (atoms, molecules, ions) by weighing them. One mole contains exactly 6.022 × 10²³ particles, known as Avogadro\'s number.',
      examples: [
        'Definition: One mole is the amount of substance that contains as many particles as there are atoms in exactly 12g of carbon-12',
        'Avogadro\'s number: 6.022 × 10²³ particles per mole',
        'Molar mass: Mass of one mole of a substance (expressed in g/mol)',
        'Example: 1 mole of carbon atoms = 12g = 6.022 × 10²³ carbon atoms',
        'Calculation: If you have 2 moles of water (H₂O), you have 2 × 6.022 × 10²³ = 1.204 × 10²⁴ water molecules'
      ]
    },
    {
      title: 'Principles of Stoichiometry',
      content: 'Stoichiometry is the calculation of reactants and products in chemical reactions. It is based on the balanced chemical equation and the mole concept. Stoichiometry allows chemists to predict how much product will be formed from a given amount of reactants.',
      examples: [
        'Definition: The study of quantitative relationships between reactants and products in chemical reactions',
        'Based on: Law of Conservation of Mass and balanced chemical equations',
        'Example reaction: 2H₂ + O₂ → 2H₂O (2 moles of hydrogen react with 1 mole of oxygen to produce 2 moles of water)',
        'If you have 4g of hydrogen (2 moles), you need 32g of oxygen (1 mole) to completely react',
        'Real-world application: Calculating the amount of fuel needed for a rocket or the amount of product in industrial processes'
      ]
    },
    {
      title: 'Distinction Between Atomic and Molecular Mass',
      content: 'Atomic mass and molecular mass are measures of the mass of atoms and molecules respectively. Understanding the difference is crucial for chemical calculations and understanding the composition of substances.',
      examples: [
        'Atomic mass: Mass of a single atom of an element, expressed in atomic mass units (amu or u)',
        'Molecular mass: Sum of atomic masses of all atoms in a molecule',
        'Example: Atomic mass of hydrogen = 1u, atomic mass of oxygen = 16u',
        'Example: Molecular mass of water (H₂O) = (2 × 1) + 16 = 18u',
        'Note: Atomic mass is relative to 1/12th the mass of a carbon-12 atom'
      ]
    },
    {
      title: 'Difference Between Empirical and Molecular Formulas',
      content: 'Chemical formulas represent the composition of compounds. The empirical formula shows the simplest whole-number ratio of atoms, while the molecular formula shows the actual number of atoms of each element in a molecule.',
      examples: [
        'Empirical formula: Simplest whole-number ratio of atoms in a compound',
        'Molecular formula: Actual number of atoms of each element in a molecule',
        'Example: Glucose has molecular formula C₆H₁₂O₆ and empirical formula CH₂O',
        'Example: Hydrogen peroxide has molecular formula H₂O₂ and empirical formula HO',
        'Relationship: Molecular formula = n × (Empirical formula), where n is a whole number'
      ]
    },
    {
      title: 'Concept of Concentration of Solutions (Molarity)',
      content: 'Concentration describes how much solute is dissolved in a given amount of solvent or solution. Molarity is one of the most common ways to express concentration in chemistry.',
      examples: [
        'Definition: Molarity (M) = Number of moles of solute / Volume of solution in liters',
        'Unit: mol/L or M (molar)',
        'Example: A 1M solution of NaCl contains 1 mole (58.5g) of NaCl in 1 liter of solution',
        'Calculation: To make 0.5L of 2M NaCl solution, you need 1 mole (58.5g) of NaCl',
        'Application: Preparing medicines, chemical reactions, and laboratory experiments require precise concentrations'
      ]
    }
  ],
  mcqs: [
    {
      question: 'Which of the following is NOT a state of matter?',
      options: ['Solid', 'Liquid', 'Gas', 'Energy'],
      correct: 3,
      explanation: 'The three main states of matter are solid, liquid, and gas. Energy is not a state of matter but rather a property that matter can possess.'
    },
    {
      question: 'What is the fundamental difference between an element and a compound?',
      options: ['Elements are heavier than compounds', 'Compounds contain only one type of atom', 'Elements contain only one type of atom, while compounds contain two or more', 'Elements cannot be broken down, but compounds can'],
      correct: 2,
      explanation: 'An element is a pure substance made of only one type of atom (like oxygen or gold), while a compound is made of two or more different elements chemically combined (like water H₂O or salt NaCl).'
    },
    {
      question: 'According to the Law of Conservation of Mass:',
      options: ['Mass can be created but not destroyed', 'Mass can be destroyed but not created', 'Mass can neither be created nor destroyed', 'Mass decreases in all chemical reactions'],
      correct: 2,
      explanation: 'The Law of Conservation of Mass states that mass can neither be created nor destroyed in a chemical reaction. The total mass of reactants equals the total mass of products.'
    },
    {
      question: 'How many particles are present in one mole of any substance?',
      options: ['6.022 × 10²²', '6.022 × 10²³', '6.022 × 10²⁴', '12 × 10²³'],
      correct: 1,
      explanation: 'One mole of any substance contains exactly 6.022 × 10²³ particles, known as Avogadro\'s number. This is the same number of atoms found in exactly 12g of carbon-12.'
    },
    {
      question: 'What is stoichiometry primarily concerned with?',
      options: ['The color changes in chemical reactions', 'The speed of chemical reactions', 'The quantitative relationships between reactants and products', 'The energy changes in chemical reactions'],
      correct: 2,
      explanation: 'Stoichiometry is the study of quantitative relationships between reactants and products in chemical reactions. It allows us to calculate how much product will be formed from a given amount of reactants.'
    },
    {
      question: 'What is the molecular mass of water (H₂O)? (Atomic mass: H = 1u, O = 16u)',
      options: ['17u', '18u', '19u', '20u'],
      correct: 1,
      explanation: 'The molecular mass of water (H₂O) is calculated as: (2 × atomic mass of H) + (1 × atomic mass of O) = (2 × 1) + 16 = 18u.'
    },
    {
      question: 'What is the relationship between molecular formula and empirical formula?',
      options: ['They are always the same', 'Molecular formula is always simpler', 'Molecular formula = n × Empirical formula', 'Empirical formula is never used in calculations'],
      correct: 2,
      explanation: 'The molecular formula is related to the empirical formula by the equation: Molecular formula = n × (Empirical formula), where n is a whole number. For example, glucose has molecular formula C₆H₁₂O₆ and empirical formula CH₂O, where n = 6.'
    },
    {
      question: 'What is the molarity of a solution prepared by dissolving 1 mole of NaCl in 2 liters of water?',
      options: ['0.5M', '1.0M', '1.5M', '2.0M'],
      correct: 0,
      explanation: 'Molarity (M) = Number of moles of solute / Volume of solution in liters. Here, M = 1 mole / 2 L = 0.5M.'
    },
    {
      question: 'Which of the following represents the empirical formula of glucose (C₆H₁₂O₆)?',
      options: ['C₆H₁₂O₆', 'CH₂O', 'C₂H₄O₂', 'C₃H₆O₃'],
      correct: 1,
      explanation: 'The empirical formula shows the simplest whole-number ratio of atoms in a compound. For glucose C₆H₁₂O₆, dividing all subscripts by 6 gives the empirical formula CH₂O.'
    },
    {
      question: 'If 10g of hydrogen reacts completely with oxygen to form water, what will be the mass of water formed? (Assume oxygen is in excess)',
      options: ['10g', '18g', '90g', 'Cannot be determined without knowing the mass of oxygen'],
      correct: 3,
      explanation: 'According to the Law of Conservation of Mass, we need to know the mass of both reactants to determine the mass of products. Since we don\'t know how much oxygen reacted, we cannot determine the mass of water formed.'
    }
  ]
}

export default function SomeBasicConceptsOfChemistryModule() {
  return (
    <ModuleLayout 
      module={someBasicConceptsOfChemistryModule} 
      grade={11} 
      subject="Chemistry" 
    />
  )
}