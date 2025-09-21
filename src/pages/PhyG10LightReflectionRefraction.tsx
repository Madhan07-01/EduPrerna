import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Light travels in straight lines and enables vision. It exhibits reflection, refraction, and dispersion. This lesson focuses on reflection and refraction, fundamental to mirrors, lenses, and optical instruments.' },
  { title: '1. Reflection of Light', content: `Reflection: light bounces back from a surface.\nKey terms: incident ray, reflected ray, normal, angle of incidence (i), angle of reflection (r).\nLaws: (1) i = r; (2) incident ray, reflected ray and normal are coplanar.\nTypes: regular (smooth → clear image), diffuse (rough → scattered).\nMirrors: plane (virtual, same size), concave (converging; real/virtual), convex (diverging; always virtual, smaller).` },
  { title: '2. Refraction of Light', content: `Refraction: bending of light when it passes between media due to speed change.\nKey terms: refracted ray, angle of refraction, refractive index n = c/v.\nSnell’s law: sin i / sin r = constant (n).\nLenses: convex (converging; real/virtual images), concave (diverging; virtual images).\nEffects: apparent depth, optical instruments, dispersion (spectrum).` },
  { title: '3. Total Internal Reflection (TIR)', content: `Occurs for light from denser → rarer medium, when incidence angle > critical angle; light reflects entirely inside.\nApplications: optical fibres, periscopes, binoculars.` },
  { title: 'Summary', content: 'Reflection obeys i = r; refraction follows Snell’s law. Mirror/lens behavior stems from these laws. TIR enables fibre optics and instruments.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'The angle of incidence equals the angle of reflection according to the:', options: [
    { key: 'a', text: 'Law of Refraction' }, { key: 'b', text: 'Law of Reflection' }, { key: 'c', text: 'Snell’s Law' }, { key: 'd', text: 'Newton’s Law' }
  ], answer: 'b', explanation: 'First law of reflection.' },
  { id: 'q2', question: 'A convex mirror always forms:', options: [
    { key: 'a', text: 'Real, inverted image' }, { key: 'b', text: 'Virtual, upright, smaller image' }, { key: 'c', text: 'Real, magnified image' }, { key: 'd', text: 'No image' }
  ], answer: 'b', explanation: 'Convex mirrors diverge rays.' },
  { id: 'q3', question: 'Refraction occurs because:', options: [
    { key: 'a', text: 'Surface smoothness' }, { key: 'b', text: 'Speed of light changes in media' }, { key: 'c', text: 'Absorption of light' }, { key: 'd', text: 'Energy loss' }
  ], answer: 'b', explanation: 'Velocity change bends light.' },
  { id: 'q4', question: 'Diverging lens:', options: [
    { key: 'a', text: 'Convex' }, { key: 'b', text: 'Concave' }, { key: 'c', text: 'Plane' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Concave lenses diverge rays.' },
  { id: 'q5', question: 'TIR occurs when light travels:', options: [
    { key: 'a', text: 'From rarer to denser, any angle' }, { key: 'b', text: 'From denser to rarer, at or beyond critical angle' }, { key: 'c', text: 'Only in mirrors' }, { key: 'd', text: 'Only in vacuum' }
  ], answer: 'b', explanation: 'TIR requires denser → rarer and i ≥ critical angle.' },
  { id: 'q6', question: 'Apparent depth in water is:', options: [
    { key: 'a', text: 'Greater than real depth' }, { key: 'b', text: 'Equal to real depth' }, { key: 'c', text: 'Less than real depth' }, { key: 'd', text: 'Unrelated' }
  ], answer: 'c', explanation: 'Refraction makes objects appear shallower.' },
  { id: 'q7', question: 'Focal length sign for concave mirror is:', options: [
    { key: 'a', text: 'Positive' }, { key: 'b', text: 'Negative' }, { key: 'c', text: 'Zero' }, { key: 'd', text: 'Infinite' }
  ], answer: 'b', explanation: 'By mirror sign conventions (real focus in front negative).' },
  { id: 'q8', question: 'Snell’s law written as:', options: [
    { key: 'a', text: 'i = r' }, { key: 'b', text: 'n = sin i / sin r' }, { key: 'c', text: 'v = fλ' }, { key: 'd', text: 'n = c/λ' }
  ], answer: 'b', explanation: 'n = sin i / sin r (for given pair of media).' },
  { id: 'q9', question: 'Plane mirror image is:', options: [
    { key: 'a', text: 'Real and inverted' }, { key: 'b', text: 'Virtual and upright' }, { key: 'c', text: 'Virtual and inverted' }, { key: 'd', text: 'Real and magnified' }
  ], answer: 'b', explanation: 'Virtual, erect, same size.' },
  { id: 'q10', question: 'Optical fibres operate using:', options: [
    { key: 'a', text: 'Refraction' }, { key: 'b', text: 'Diffuse reflection' }, { key: 'c', text: 'Total internal reflection' }, { key: 'd', text: 'Dispersion' }
  ], answer: 'c', explanation: 'Guided by repeated TIR.' },
]

export default function PhyG10LightReflectionRefraction() {
  return (
    <LessonModuleTemplate
      title="Light – Reflection and Refraction"
      subject="Physics"
      grade={10}
      backLink="/lessons/Physics/10"
      lessonId="phy-g10-light-reflection-refraction"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
