import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'The periodic table arranges elements by atomic number, revealing periodic trends in properties such as atomic radius, ionization energy, and electronegativity.' },
  { title: '1. Early Classification', content: '• Dobereiner’s Triads: groups of three with middle atomic mass ≈ average of others.\n• Newlands’ Octaves: every 8th element similar; limited to light elements.' },
  { title: '2. Mendeleev’s Periodic Table', content: 'Arranged by increasing atomic mass; predicted undiscovered elements. Some anomalies occurred due to mass-based order.' },
  { title: '3. Modern Periodic Table', content: 'Arranged by increasing atomic number (Z). 7 periods, 18 groups; metals, nonmetals, metalloids; s-, p-, d-, f-blocks.' },
  { title: '4. Periodic Law', content: 'Properties of elements are periodic functions of their atomic numbers (Moseley).' },
  { title: '5. Periodic Trends', content: '• Atomic radius: decreases across period, increases down group.\n• Ionization energy: increases across, decreases down.\n• Electron affinity: more negative across, less negative down.\n• Electronegativity: increases across, decreases down.\n• Metallic character: decreases across, increases down.' },
  { title: '6. s, p, d, f Blocks', content: 's: ns^1–2 (alkali/alkaline earth). p: ns^2 np^1–6 (Groups 13–18). d: (n−1)d^1–10 ns^1–2 (transition). f: (n−2)f^1–14 (lanth/actinide).' },
  { title: '7. Significance', content: 'Predicts reactivity and bonding; organizes chemical knowledge for education and industry.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Modern periodic table is based on:', options: [
    { key: 'a', text: 'Atomic mass' }, { key: 'b', text: 'Atomic number' }, { key: 'c', text: 'Density' }, { key: 'd', text: 'Valency' }
  ], answer: 'b', explanation: 'Moseley’s atomic number-based arrangement.' },
  { id: 'q2', question: 'Dobereiner’s Triads used:', options: [
    { key: 'a', text: 'Atomic number' }, { key: 'b', text: 'Atomic mass' }, { key: 'c', text: 'Electron configuration' }, { key: 'd', text: 'Ionization energy' }
  ], answer: 'b', explanation: 'Triads grouped by mass and properties.' },
  { id: 'q3', question: 'Highest electronegativity in a period tends to be:', options: [
    { key: 'a', text: 'Na' }, { key: 'b', text: 'Cl' }, { key: 'c', text: 'Mg' }, { key: 'd', text: 'Al' }
  ], answer: 'b', explanation: 'Halogens near the end (excluding noble gases) are highly electronegative.' },
  { id: 'q4', question: 'Ionization energy:', options: [
    { key: 'a', text: 'Increases down a group' }, { key: 'b', text: 'Decreases across a period' }, { key: 'c', text: 'Decreases down a group' }, { key: 'd', text: 'Remains constant' }
  ], answer: 'c', explanation: 'Electrons farther from nucleus are easier to remove.' },
  { id: 'q5', question: 'Atomic radius:', options: [
    { key: 'a', text: 'Increases across a period' }, { key: 'b', text: 'Decreases down a group' }, { key: 'c', text: 'Decreases across a period' }, { key: 'd', text: 'Remains same' }
  ], answer: 'c', explanation: 'Effective nuclear charge increases across a period.' },
  { id: 'q6', question: 'Group 18 elements are:', options: [
    { key: 'a', text: 'Alkali metals' }, { key: 'b', text: 'Noble gases' }, { key: 'c', text: 'Halogens' }, { key: 'd', text: 'Transition metals' }
  ], answer: 'b', explanation: 'Group 18 are inert noble gases.' },
  { id: 'q7', question: 'Transition metals belong to:', options: [
    { key: 'a', text: 's-block' }, { key: 'b', text: 'p-block' }, { key: 'c', text: 'd-block' }, { key: 'd', text: 'f-block' }
  ], answer: 'c', explanation: 'Transition metals are d-block elements.' },
  { id: 'q8', question: 'Metallic character:', options: [
    { key: 'a', text: 'Decreases down a group' }, { key: 'b', text: 'Increases across a period' }, { key: 'c', text: 'Decreases across a period' }, { key: 'd', text: 'Increases up a group' }
  ], answer: 'c', explanation: 'Metals on the left; nonmetals on the right of a period.' },
  { id: 'q9', question: 'Law of octaves proposed by:', options: [
    { key: 'a', text: 'Mendeleev' }, { key: 'b', text: 'Newlands' }, { key: 'c', text: 'Moseley' }, { key: 'd', text: 'Dobereiner' }
  ], answer: 'b', explanation: 'Newlands arranged by mass; every 8th similar.' },
  { id: 'q10', question: 'Electron affinity becomes more negative:', options: [
    { key: 'a', text: 'Down a group' }, { key: 'b', text: 'Across a period' }, { key: 'c', text: 'Both' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Across a period, atoms more eager to gain electrons (with exceptions).' },
]

export default function ChemG11ClassificationPeriodicity() {
  return (
    <LessonModuleTemplate
      title="Classification of Elements and Periodicity in Properties"
      subject="Chemistry"
      grade={11}
      backLink="/lessons/Chemistry/11"
      lessonId="chem-g11-classification-periodicity"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
