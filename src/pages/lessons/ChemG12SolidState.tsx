import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Solids have fixed shape and volume due to closely packed particles with strong intermolecular forces. Solid-state concepts are key to crystallography, materials, and electronics.' },
  { title: '1. Types of Solids', content: '• Crystalline: long-range order, sharp melting point (NaCl, diamond, quartz).\n• Amorphous: short-range order, soften over a range (glass, rubber, plastic).' },
  { title: '2. Crystal Lattice & Unit Cell', content: 'Lattice: periodic 3D arrangement. Unit cell: smallest repeating unit. Atoms per cell: SC=1, BCC=2, FCC=4. Packing efficiency: SC~52%, BCC~68%, FCC~74%.' },
  { title: '3. Crystal Systems', content: 'Seven systems: Cubic, Tetragonal, Orthorhombic, Hexagonal, Monoclinic, Triclinic, Rhombohedral.' },
  { title: '4. Types of Crystals', content: '• Ionic (NaCl): hard, brittle, high MP, conduct when molten/aqueous.\n• Covalent (diamond, Si): hard, very high MP, poor conductors (graphite conducts).\n• Metallic (Cu, Fe): malleable, ductile, good conductors.\n• Molecular (I2, ice): soft, low MP (van der Waals/H-bonds).' },
  { title: '5. Crystal Defects', content: '• Point: vacancy, interstitial, substitutional (Schottky, Frenkel in ionic).\n• Line: edge/screw dislocations.\n• Plane: grain boundaries. Defects affect strength, conductivity.' },
  { title: '6. Packing & Density', content: 'Coordination number: SC=6, BCC=8, FCC=12. Unit-cell density: ρ = (Z·M)/(N_A·a^3). Edge length: SC a=2r; BCC a=4r/√3; FCC a=4r/√2.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Solid without sharp melting point is', options: [
    { key: 'a', text: 'Diamond' }, { key: 'b', text: 'NaCl' }, { key: 'c', text: 'Glass' }, { key: 'd', text: 'Iodine' }
  ], answer: 'c', explanation: 'Amorphous solids (e.g., glass) soften over a range.' },
  { id: 'q2', question: 'Packing efficiency of FCC is about', options: [
    { key: 'a', text: '52%' }, { key: 'b', text: '68%' }, { key: 'c', text: '74%' }, { key: 'd', text: '60%' }
  ], answer: 'c', explanation: 'FCC/CCP has highest of the three: ~74%.' },
  { id: 'q3', question: 'Diamond is a', options: [
    { key: 'a', text: 'Molecular crystal' }, { key: 'b', text: 'Ionic crystal' }, { key: 'c', text: 'Covalent crystal' }, { key: 'd', text: 'Metallic crystal' }
  ], answer: 'c', explanation: '3D covalent network.' },
  { id: 'q4', question: 'Coordination number (SC) equals', options: [
    { key: 'a', text: '6' }, { key: 'b', text: '8' }, { key: 'c', text: '12' }, { key: 'd', text: '4' }
  ], answer: 'a', explanation: 'Each atom touches 6 neighbors in SC.' },
  { id: 'q5', question: 'Ionic solids generally are', options: [
    { key: 'a', text: 'Soft and ductile' }, { key: 'b', text: 'Conductors in solid state' }, { key: 'c', text: 'Brittle, high melting' }, { key: 'd', text: 'Highly malleable' }
  ], answer: 'c', explanation: 'Ionic solids: hard, brittle, high MP; conduct when molten/aq.' },
  { id: 'q6', question: 'Edge length of BCC in terms of r is', options: [
    { key: 'a', text: '2r' }, { key: 'b', text: '4r/√3' }, { key: 'c', text: '4r/√2' }, { key: 'd', text: 'r' }
  ], answer: 'b', explanation: 'Body diagonal = 4r = √3 a ⇒ a = 4r/√3.' },
  { id: 'q7', question: 'A point defect is', options: [
    { key: 'a', text: 'Vacancy' }, { key: 'b', text: 'Edge dislocation' }, { key: 'c', text: 'Grain boundary' }, { key: 'd', text: 'Screw dislocation' }
  ], answer: 'a', explanation: 'Line and plane defects are dislocations and boundaries.' },
  { id: 'q8', question: 'Amorphous solids are called', options: [
    { key: 'a', text: 'True solids' }, { key: 'b', text: 'Pseudo solids' }, { key: 'c', text: 'Ionic solids' }, { key: 'd', text: 'Covalent solids' }
  ], answer: 'b', explanation: 'They lack long-range order.' },
  { id: 'q9', question: 'Coordination number for FCC is', options: [
    { key: 'a', text: '6' }, { key: 'b', text: '8' }, { key: 'c', text: '12' }, { key: 'd', text: '4' }
  ], answer: 'c', explanation: 'FCC/CCP CN = 12.' },
  { id: 'q10', question: 'Stoichiometry in ionic solids follows', options: [
    { key: 'a', text: 'Mass' }, { key: 'b', text: 'Charge neutrality' }, { key: 'c', text: 'Density' }, { key: 'd', text: 'Solubility' }
  ], answer: 'b', explanation: 'Formula ensures total positive = total negative charge.' },
]

export default function ChemG12SolidState() {
  return (
    <LessonModuleTemplate
      title="Solid State"
      subject="Chemistry"
      grade={12}
      backLink="/lessons/Chemistry/12"
      lessonId="chem-g12-solid-state"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
