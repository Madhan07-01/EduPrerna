import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Electrostatics studies electric charges at rest: their forces, fields, and potentials. It underpins electricity and electronics.' },
  { title: '1. Electric Charge', content: 'Types: positive, negative. Unit: Coulomb (C). Elementary charge e = 1.602×10^-19 C. Conservation and quantization: q = n e.' },
  { title: '2. Coulomb\'s Law', content: 'Force between point charges: F = k |q1 q2| / r^2, direction along line joining charges (repulsive like, attractive unlike). Vector form uses 1/(4πϵ0).' },
  { title: '3. Electric Field (E)', content: 'E = F/q0; due to point charge Q: E = k |Q| / r^2 (radial). Superposition principle: vector sum of fields.' },
  { title: '4. Electric Potential (V)', content: 'Work per unit charge from infinity: V = k Q / r. Relation: E = −∇V.' },
  { title: '5. Capacitance (C)', content: 'C = Q/V (Farad). Series: 1/Cs = 1/C1 + 1/C2 + ...; Parallel: Cp = C1 + C2 + .... Energy: U = 1/2 C V^2.' },
  { title: '6. Gauss\'s Law', content: '∮ E·dA = Q_enclosed/ϵ0. Useful for high symmetry: sphere, infinite plane, cylinder.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'SI unit of electric charge is', options: [
    { key: 'a', text: 'Volt' }, { key: 'b', text: 'Coulomb' }, { key: 'c', text: 'Ampere' }, { key: 'd', text: 'Farad' }
  ], answer: 'b', explanation: 'Charge unit is Coulomb (C).' },
  { id: 'q2', question: 'If distance between two like charges is doubled, Coulomb force becomes', options: [
    { key: 'a', text: '1/2 of original' }, { key: 'b', text: '1/4 of original' }, { key: 'c', text: '2 times' }, { key: 'd', text: '4 times' }
  ], answer: 'b', explanation: 'F ∝ 1/r^2 ⇒ doubling r makes force quarter.' },
  { id: 'q3', question: 'Electric field lines originate from', options: [
    { key: 'a', text: 'Negative charge' }, { key: 'b', text: 'Positive charge' }, { key: 'c', text: 'Neutral body' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'By convention: from + to −.' },
  { id: 'q4', question: 'Electric potential is a', options: [
    { key: 'a', text: 'Vector' }, { key: 'b', text: 'Scalar' }, { key: 'c', text: 'Tensor' }, { key: 'd', text: 'Pseudovector' }
  ], answer: 'b', explanation: 'Potential is scalar; field is vector.' },
  { id: 'q5', question: 'Capacitance of a parallel plate capacitor increases with', options: [
    { key: 'a', text: 'Decreasing plate area' }, { key: 'b', text: 'Increasing separation' }, { key: 'c', text: 'Higher dielectric constant' }, { key: 'd', text: 'All of these' }
  ], answer: 'c', explanation: 'C ∝ ϵA/d ⇒ larger ϵ increases C; larger area increases, larger separation decreases.' },
  { id: 'q6', question: 'Gauss\'s law is most useful for', options: [
    { key: 'a', text: 'Any charge distribution' }, { key: 'b', text: 'Highly symmetric distributions' }, { key: 'c', text: 'Moving charges' }, { key: 'd', text: 'Capacitors only' }
  ], answer: 'b', explanation: 'Spherical, cylindrical, planar symmetry.' },
  { id: 'q7', question: 'Energy stored in a capacitor is', options: [
    { key: 'a', text: 'U = CV' }, { key: 'b', text: 'U = 1/2 C V^2' }, { key: 'c', text: 'U = Q/V' }, { key: 'd', text: 'U = 1/2 Q V^2' }
  ], answer: 'b', explanation: 'Standard formula: U = 1/2 C V^2.' },
  { id: 'q8', question: 'Coulomb\'s constant k ≈', options: [
    { key: 'a', text: '9×10^6' }, { key: 'b', text: '9×10^9' }, { key: 'c', text: '8.85×10^-12' }, { key: 'd', text: '1.6×10^-19' }
  ], answer: 'b', explanation: 'k ≈ 8.988×10^9 N·m^2/C^2.' },
  { id: 'q9', question: 'Work on an equipotential surface is', options: [
    { key: 'a', text: 'Maximum' }, { key: 'b', text: 'Zero' }, { key: 'c', text: 'Depends on path' }, { key: 'd', text: 'Infinite' }
  ], answer: 'b', explanation: 'No potential change ⇒ no work for electrostatic force.' },
  { id: 'q10', question: 'Electric field inside a conductor in electrostatic equilibrium is', options: [
    { key: 'a', text: 'Zero' }, { key: 'b', text: 'Maximum' }, { key: 'c', text: 'Constant nonzero' }, { key: 'd', text: 'Infinite' }
  ], answer: 'a', explanation: 'Charges reside on surface; interior field zero.' },
]

export default function PhyG12Electrostatics() {
  return (
    <LessonModuleTemplate
      title="Electrostatics"
      subject="Physics"
      grade={12}
      backLink="/lessons/Physics/12"
      lessonId="phy-g12-electrostatics"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
