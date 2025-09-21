import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Magnetic effects of current and magnetism cover fields produced by currents, forces on charges and conductors, torque on loops, materials (dia/para/ferromagnetic), and Earth’s magnetism.' },
  { title: '1. Magnetic Field', content: 'Region where magnetic force acts. Unit: Tesla (T). Direction by right-hand rule for current-carrying conductors.' },
  { title: '2. Biot–Savart Law', content: 'd\u03B2B = (\u03BC0/4\u03C0) (I d\u2192l \u00D7 r\u005E)/r^2. Long straight wire: B = \u03BC0 I / (2\u03C0 r). Circular loop (center): B = \u03BC0 I / (2R).' },
  { title: '3. Ampere’s Circuital Law', content: '\u222F B\u22C5dl = \u03BC0 I_enclosed. Solenoid: B = \u03BC0 n I (inside). Toroid: B = (\u03BC0 N I) / (2\u03C0 r).' },
  { title: '4. Lorentz Force', content: 'On charge: \u2192F = q (\u2192v \u00D7 \u2192B). On wire: \u2192F = I (\u2192L \u00D7 \u2192B). Directions by right-hand rule; force \u22A5 to v and B.' },
  { title: '5. Torque on Current Loop', content: 'Magnetic moment \u2192m = I \u2192A. Torque \u03C4 = m B sin\u03B8. Basis for galvanometers and motors.' },
  { title: '6. Magnetism of Materials', content: 'Diamagnetic (\u03C7 < 0, weakly repelled), Paramagnetic (\u03C7 > 0, weakly attracted), Ferromagnetic (large \u03C7 > 0, retain magnetism). Curie temperature: above it ferromagnets lose magnetism.' },
  { title: '7. Earth’s Magnetism', content: 'Earth acts like a magnet. Declination (angle between geographic and magnetic north) and inclination (dip angle with horizontal).'},
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Field around a long straight current-carrying wire is', options: [
    { key: 'a', text: 'Radial' }, { key: 'b', text: 'Circular around wire' }, { key: 'c', text: 'Along the wire' }, { key: 'd', text: 'Zero' }
  ], answer: 'b', explanation: 'Concentric circles around the wire by right-hand rule.' },
  { id: 'q2', question: 'Lorentz force on charge is', options: [
    { key: 'a', text: 'q v B parallel to v' }, { key: 'b', text: 'q (\u2192v \u00D7 \u2192B) perpendicular to v and B' }, { key: 'c', text: 'q v/B' }, { key: 'd', text: 'Zero always' }
  ], answer: 'b', explanation: 'Cross product yields \u22A5 to v and B.' },
  { id: 'q3', question: 'Torque on a current loop is maximum when plane of loop is', options: [
    { key: 'a', text: 'Parallel to B' }, { key: 'b', text: 'Perpendicular to B' }, { key: 'c', text: 'At 45\u00B0' }, { key: 'd', text: 'Any orientation' }
  ], answer: 'a', explanation: 'Maximum when \u03B8 = 90\u00B0 between \u2192m and \u2192B; loop\'s plane parallel to B makes \u2192A normal \u22A5 B.' },
  { id: 'q4', question: 'Unit of magnetic field (B) is', options: [
    { key: 'a', text: 'Tesla' }, { key: 'b', text: 'Weber' }, { key: 'c', text: 'Ampere' }, { key: 'd', text: 'Coulomb' }
  ], answer: 'a', explanation: 'Magnetic flux density measured in Tesla.' },
  { id: 'q5', question: 'Biot–Savart law is used to compute', options: [
    { key: 'a', text: 'Electrostatic field' }, { key: 'b', text: 'Magnetic field due to current element' }, { key: 'c', text: 'Force on charge' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'It gives B due to current elements.' },
  { id: 'q6', question: 'Field inside an ideal long solenoid is', options: [
    { key: 'a', text: 'Zero' }, { key: 'b', text: 'Uniform' }, { key: 'c', text: 'Decreases with length' }, { key: 'd', text: 'Highly non-uniform' }
  ], answer: 'b', explanation: 'Approximately uniform inside long solenoid.' },
  { id: 'q7', question: 'Diamagnetic materials are', options: [
    { key: 'a', text: 'Strongly attracted to B' }, { key: 'b', text: 'Weakly repelled by B' }, { key: 'c', text: 'Strongly repelled' }, { key: 'd', text: 'Unaffected' }
  ], answer: 'b', explanation: 'Diamagnets are weakly repelled (\u03C7 < 0).' },
  { id: 'q8', question: 'Earth\'s magnetic field originates mainly due to', options: [
    { key: 'a', text: 'Magnetic rocks' }, { key: 'b', text: 'Molten iron motion in outer core' }, { key: 'c', text: 'Compass alignment' }, { key: 'd', text: 'Solar wind' }
  ], answer: 'b', explanation: 'Geodynamo effect in the outer core.' },
  { id: 'q9', question: 'Force on a wire in uniform B is zero when wire is', options: [
    { key: 'a', text: 'Perpendicular to B' }, { key: 'b', text: 'Parallel to B' }, { key: 'c', text: 'In circular loop' }, { key: 'd', text: 'Moving' }
  ], answer: 'b', explanation: 'F = ILB sin\u03B8; \u03B8 = 0 \u2192 F = 0.' },
  { id: 'q10', question: 'Magnetic moment of a current loop m equals', options: [
    { key: 'a', text: 'I/A' }, { key: 'b', text: 'IA' }, { key: 'c', text: 'IB' }, { key: 'd', text: 'I/B' }
  ], answer: 'b', explanation: 'm = I A (area vector magnitude).'},
]

export default function PhyG12MagneticEffects() {
  return (
    <LessonModuleTemplate
      title="Magnetic Effects of Current and Magnetism"
      subject="Physics"
      grade={12}
      backLink="/lessons/Physics/12"
      lessonId="phy-g12-magnetic-effects"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
