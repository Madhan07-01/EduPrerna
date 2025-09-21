import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Atoms are the fundamental units of matter. Atomic structure explains properties, bonding, spectra, and chemical behavior. Models evolved via key experiments.' },
  { title: '1. Historical Models', content: '• Dalton: indivisible atoms, combine in fixed ratios.\n• Thomson (plum pudding): electrons embedded in positive sphere.\n• Rutherford: tiny dense positive nucleus, electrons revolve; mostly empty space.\n• Bohr: electrons in quantized orbits; En = -13.6 eV / n^2.' },
  { title: '2. Subatomic Particles', content: 'Electron (e⁻, −1, 9.11×10^-31 kg, extranuclear) • Proton (p⁺, +1, 1.67×10^-27 kg, nucleus) • Neutron (n⁰, 0, 1.67×10^-27 kg, nucleus).\nZ (atomic number) = protons; A (mass number) = p + n. Isotopes: same Z, different A. Isobars: same A, different Z.' },
  { title: '3. Electronic Configuration', content: 'Shells/subshells/orbitals (s,p,d,f). Rules: Aufbau (fill lowest energy), Pauli (max 2 e⁻/orbital with opposite spins), Hund (maximize unpaired electrons). Example: O (Z=8): 1s² 2s² 2p⁴.' },
  { title: '4. Quantum Numbers', content: 'n (principal), l (azimuthal: 0=s,1=p,2=d,3=f), m_l (−l…+l), m_s (±1/2). They specify energy, shape, orientation, and spin.' },
  { title: '5. Atomic Mass & Isotopes', content: 'Relative atomic mass is weighted average over isotopes: A_r = Σ(fraction × isotope mass).' },
  { title: '6. Significance', content: 'Determines periodicity, bonding, magnetism, spectra; central to quantum chemistry.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Who proposed the nuclear model of atom?', options: [
    { key: 'a', text: 'Dalton' }, { key: 'b', text: 'Thomson' }, { key: 'c', text: 'Rutherford' }, { key: 'd', text: 'Bohr' }
  ], answer: 'c', explanation: 'Rutherford’s alpha-scattering experiment led to the nuclear model.' },
  { id: 'q2', question: 'Charge on electron is:', options: [
    { key: 'a', text: 'Positive' }, { key: 'b', text: 'Negative' }, { key: 'c', text: 'Neutral' }, { key: 'd', text: 'Both signs' }
  ], answer: 'b', explanation: 'Electrons are negatively charged.' },
  { id: 'q3', question: 'Atomic number Z represents:', options: [
    { key: 'a', text: 'Neutrons' }, { key: 'b', text: 'Protons' }, { key: 'c', text: 'Mass number' }, { key: 'd', text: 'Electrons only' }
  ], answer: 'b', explanation: 'Z = number of protons; in neutral atom equals electrons.' },
  { id: 'q4', question: 'Mass number A equals:', options: [
    { key: 'a', text: 'p × n' }, { key: 'b', text: 'p + n' }, { key: 'c', text: 'p − n' }, { key: 'd', text: 'electrons only' }
  ], answer: 'b', explanation: 'A is total nucleons.' },
  { id: 'q5', question: 'Which principle concerns opposite spins in same orbital?', options: [
    { key: 'a', text: 'Aufbau' }, { key: 'b', text: 'Hund' }, { key: 'c', text: 'Pauli Exclusion' }, { key: 'd', text: 'Bohr' }
  ], answer: 'c', explanation: 'Pauli exclusion: no two electrons share all four quantum numbers.' },
  { id: 'q6', question: 'Isotopes are:', options: [
    { key: 'a', text: 'Same Z, different A' }, { key: 'b', text: 'Same A, different Z' }, { key: 'c', text: 'Different elements' }, { key: 'd', text: 'Same mass' }
  ], answer: 'a', explanation: 'Isotopes differ in neutron count.' },
  { id: 'q7', question: 'Bohr model explains:', options: [
    { key: 'a', text: 'Electron diffraction' }, { key: 'b', text: 'Discrete energy levels' }, { key: 'c', text: 'Nuclear fission' }, { key: 'd', text: 'Spin-orbit coupling' }
  ], answer: 'b', explanation: 'Bohr introduced quantized orbits.' },
  { id: 'q8', question: 'O (Z=8) configuration is:', options: [
    { key: 'a', text: '1s² 2s² 2p⁴' }, { key: 'b', text: '1s² 2s² 2p⁶' }, { key: 'c', text: '1s² 2s¹ 2p⁵' }, { key: 'd', text: '1s² 2s² 2p²' }
  ], answer: 'a', explanation: 'Eight electrons fill to 2p⁴.' },
  { id: 'q9', question: 'Particles contributing most to atomic mass:', options: [
    { key: 'a', text: 'Electrons' }, { key: 'b', text: 'Protons' }, { key: 'c', text: 'Neutrons' }, { key: 'd', text: 'Both b and c' }
  ], answer: 'd', explanation: 'Protons and neutrons dominate mass.' },
  { id: 'q10', question: 'Hund’s rule states:', options: [
    { key: 'a', text: 'Fill lowest energy orbitals first' }, { key: 'b', text: 'Singly occupy orbitals before pairing' }, { key: 'c', text: 'Two electrons have opposite spins' }, { key: 'd', text: 'Energy is quantized' }
  ], answer: 'b', explanation: 'Maximize multiplicity before pairing.' },
]

export default function ChemG11StructureOfAtom() {
  return (
    <LessonModuleTemplate
      title="Structure of Atom"
      subject="Chemistry"
      grade={11}
      backLink="/lessons/Chemistry/11"
      lessonId="chem-g11-structure-of-atom"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
