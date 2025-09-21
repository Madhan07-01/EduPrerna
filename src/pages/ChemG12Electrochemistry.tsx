import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Electrochemistry studies interconversion of chemical and electrical energy: redox reactions, electrochemical cells, electrode potentials, Nernst equation, electrolysis, batteries, and corrosion.' },
  { title: '1. Redox Reactions', content: 'Oxidation = loss of electrons; Reduction = gain of electrons. Oxidizing agent gets reduced; reducing agent gets oxidized. Track via oxidation numbers.' },
  { title: '2. Electrochemical Cells', content: 'Galvanic (voltaic) cell: spontaneous chemical → electrical (e.g., Daniell cell). Electrolytic cell: non-spontaneous, driven by external source (electrolysis).' },
  { title: '3. Cell Notation', content: 'Zn(s) | Zn^2+(aq) || Cu^2+(aq) | Cu(s). Anode: oxidation (Zn → Zn^2+ + 2e^-). Cathode: reduction (Cu^2+ + 2e^- → Cu). Electrons flow anode → cathode; conventional current opposite.' },
  { title: '4. Electrode & Cell Potential', content: 'Standard electrode potential E° vs SHE (E°=0 V). Cell potential: E°_cell = E°_cathode − E°_anode. Positive E°_cell ⇒ spontaneous.' },
  { title: '5. Nernst Equation', content: 'E_cell = E°_cell − (0.0591/n) log Q at 25°C, where n = electrons transferred, Q = reaction quotient. Accounts for non-standard conditions.' },
  { title: '6. Electrolysis & Faraday’s Laws', content: 'First: mass ∝ charge passed; Second: mass ∝ equivalent weight. Q = I t. m = (Q M)/(n F); F ≈ 96500 C/mol.' },
  { title: '7. Batteries & Corrosion', content: 'Primary: non-rechargeable; Secondary: rechargeable (lead–acid, Li-ion); Fuel cells: continuous reactant feed. Corrosion: metal oxidation; prevent by coatings/galvanization/sacrificial anode.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'In a galvanic cell, oxidation occurs at the', options: [
    { key: 'a', text: 'Cathode' }, { key: 'b', text: 'Anode' }, { key: 'c', text: 'Both' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Anode is site of oxidation; cathode is reduction.' },
  { id: 'q2', question: 'Faraday constant F is approximately', options: [
    { key: 'a', text: '96500 C/mol' }, { key: 'b', text: '9650 C/mol' }, { key: 'c', text: '1 F' }, { key: 'd', text: '1.6×10^-19 C' }
  ], answer: 'a', explanation: 'F ≈ 96485 C per mol of electrons.' },
  { id: 'q3', question: 'Standard hydrogen electrode (SHE) potential equals', options: [
    { key: 'a', text: '1 V' }, { key: 'b', text: '0 V' }, { key: 'c', text: '-1 V' }, { key: 'd', text: 'Depends on pH' }
  ], answer: 'b', explanation: 'By convention, E°(SHE) = 0 V.' },
  { id: 'q4', question: 'Nernst equation is used to compute', options: [
    { key: 'a', text: 'Reaction rate' }, { key: 'b', text: 'Cell potential at non-standard conditions' }, { key: 'c', text: 'Mass deposited' }, { key: 'd', text: 'Solubility' }
  ], answer: 'b', explanation: 'It relates potential to concentrations/activities.' },
  { id: 'q5', question: 'Mass deposited in electrolysis depends on', options: [
    { key: 'a', text: 'Equivalent weight' }, { key: 'b', text: 'Charge passed' }, { key: 'c', text: 'Number of electrons n' }, { key: 'd', text: 'All of the above' }
  ], answer: 'd', explanation: 'm = (Q M)/(n F): depends on M, Q, n.' },
  { id: 'q6', question: 'If E°_cell > 0, the reaction is', options: [
    { key: 'a', text: 'Non-spontaneous' }, { key: 'b', text: 'Spontaneous' }, { key: 'c', text: 'At equilibrium' }, { key: 'd', text: 'Impossible' }
  ], answer: 'b', explanation: 'Positive E°_cell indicates spontaneity (ΔG° < 0).' },
  { id: 'q7', question: 'Electrolytic cell converts', options: [
    { key: 'a', text: 'Chemical → Electrical' }, { key: 'b', text: 'Electrical → Chemical' }, { key: 'c', text: 'Both' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'External power drives non-spontaneous reactions.' },
  { id: 'q8', question: 'Cathode in electrolysis is the', options: [
    { key: 'a', text: 'Positive electrode' }, { key: 'b', text: 'Negative electrode' }, { key: 'c', text: 'Neutral' }, { key: 'd', text: 'Current source' }
  ], answer: 'b', explanation: 'Electrons enter solution at cathode (reduction).'},
  { id: 'q9', question: 'Corrosion prevention includes', options: [
    { key: 'a', text: 'Painting' }, { key: 'b', text: 'Galvanization' }, { key: 'c', text: 'Sacrificial anode' }, { key: 'd', text: 'All of the above' }
  ], answer: 'd', explanation: 'All methods reduce/redirect oxidation.' },
  { id: 'q10', question: 'In a dry cell, the cathode is typically', options: [
    { key: 'a', text: 'Zn' }, { key: 'b', text: 'MnO2' }, { key: 'c', text: 'Graphite (C)' }, { key: 'd', text: 'Pb' }
  ], answer: 'c', explanation: 'Graphite rod acts as cathode; MnO2 is depolarizer; Zn container is anode.' },
]

export default function ChemG12Electrochemistry() {
  return (
    <LessonModuleTemplate
      title="Electrochemistry"
      subject="Chemistry"
      grade={12}
      backLink="/lessons/Chemistry/12"
      lessonId="chem-g12-electrochemistry"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
