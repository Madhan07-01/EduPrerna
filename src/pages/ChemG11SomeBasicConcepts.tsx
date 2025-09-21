import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Chemistry studies the composition, structure, properties, and changes of matter. These basic concepts support stoichiometry, reactions, and quantitative chemistry used in labs and industry.' },
  { title: '1. Matter', content: 'Anything with mass and volume. States: solid, liquid, gas. Properties: physical (e.g., MP, density) and chemical (reactivity).' },
  { title: '2. Atoms and Molecules', content: 'Atom: smallest unit retaining chemical identity. Molecule: two or more atoms chemically bonded. Element: same kind of atoms. Compound: different elements in fixed ratio.' },
  { title: '3. Chemical Reactions', content: 'Reactants transform into products. Examples: Combustion: C + O2 → CO2. Neutralization: HCl + NaOH → NaCl + H2O.' },
  { title: '4. Law of Conservation of Mass', content: 'In a chemical reaction, total mass of reactants equals total mass of products.' },
  { title: '5. Mole Concept', content: '1 mole = 6.022×10^23 entities (Avogadro number). Molar mass (g/mol). n = mass/M.' },
  { title: '6. Stoichiometry', content: 'Quantitative relationships from balanced equations to compute amounts of reactants/products.' },
  { title: '7. Atomic and Molecular Mass', content: 'Atomic mass unit (u). Molecular mass = sum of atomic masses in a molecule.' },
  { title: '8. Empirical vs Molecular Formula', content: 'Empirical: simplest whole-number ratio. Molecular: actual numbers of atoms of each element.' },
  { title: '9. Concentration of Solutions', content: 'Molarity (M) = moles of solute / litre of solution.' },
  { title: '10. Significance', content: 'Enables quantitative analysis, process design, and research calculations.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Chemistry is the study of:', options: [
    { key: 'a', text: 'Stars and planets' }, { key: 'b', text: 'Matter and its changes' }, { key: 'c', text: 'Living organisms' }, { key: 'd', text: 'Electrical circuits' }
  ], answer: 'b', explanation: 'Chemistry focuses on matter and transformations.' },
  { id: 'q2', question: 'The smallest particle of an element is:', options: [
    { key: 'a', text: 'Molecule' }, { key: 'b', text: 'Atom' }, { key: 'c', text: 'Compound' }, { key: 'd', text: 'Proton' }
  ], answer: 'b', explanation: 'An atom retains chemical identity of element.' },
  { id: 'q3', question: 'Which of the following is a compound?', options: [
    { key: 'a', text: 'O2' }, { key: 'b', text: 'H2O' }, { key: 'c', text: 'He' }, { key: 'd', text: 'N2' }
  ], answer: 'b', explanation: 'Water has two elements in fixed proportion.' },
  { id: 'q4', question: 'Law of Conservation of Mass states:', options: [
    { key: 'a', text: 'Mass increases' }, { key: 'b', text: 'Mass decreases' }, { key: 'c', text: 'Mass of reactants = mass of products' }, { key: 'd', text: 'None' }
  ], answer: 'c', explanation: 'Total mass remains constant in reactions.' },
  { id: 'q5', question: 'Avogadro number is:', options: [
    { key: 'a', text: '6.022×10^22' }, { key: 'b', text: '6.022×10^23' }, { key: 'c', text: '3.14×10^23' }, { key: 'd', text: '1.602×10^-19' }
  ], answer: 'b', explanation: 'Avogadro constant NA = 6.022×10^23 mol^-1.' },
  { id: 'q6', question: 'Molar mass of water (H2O) is:', options: [
    { key: 'a', text: '16 g/mol' }, { key: 'b', text: '18 g/mol' }, { key: 'c', text: '10 g/mol' }, { key: 'd', text: '20 g/mol' }
  ], answer: 'b', explanation: '2×1 + 16 = 18 g/mol.' },
  { id: 'q7', question: 'Empirical formula represents:', options: [
    { key: 'a', text: 'Exact numbers of atoms' }, { key: 'b', text: 'Simplest whole-number ratio' }, { key: 'c', text: 'Molar mass' }, { key: 'd', text: 'Solution volume' }
  ], answer: 'b', explanation: 'Empirical is simplest ratio.' },
  { id: 'q8', question: 'Number of moles equals:', options: [
    { key: 'a', text: 'Mass × Molar mass' }, { key: 'b', text: 'Mass / Molar mass' }, { key: 'c', text: 'Molar mass / Mass' }, { key: 'd', text: 'Mass + Molar mass' }
  ], answer: 'b', explanation: 'n = m/M.' },
  { id: 'q9', question: 'A chemical reaction involves:', options: [
    { key: 'a', text: 'Only physical changes' }, { key: 'b', text: 'Formation of new substances' }, { key: 'c', text: 'No energy change' }, { key: 'd', text: 'Only bond breaking' }
  ], answer: 'b', explanation: 'Products have new chemical identities.' },
  { id: 'q10', question: 'Molarity is defined as:', options: [
    { key: 'a', text: 'Moles per kg of solvent' }, { key: 'b', text: 'Moles per litre of solution' }, { key: 'c', text: 'Mass per volume' }, { key: 'd', text: 'Volume per mole' }
  ], answer: 'b', explanation: 'M = n / V(L).' },
]

export default function ChemG11SomeBasicConcepts() {
  return (
    <LessonModuleTemplate
      title="Some Basic Concepts of Chemistry"
      subject="Chemistry"
      grade={11}
      backLink="/lessons/Chemistry/11"
      lessonId="chem-g11-some-basic-concepts"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
