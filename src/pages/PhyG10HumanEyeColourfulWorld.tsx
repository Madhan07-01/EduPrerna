import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'The human eye is a natural optical instrument. Light entering the eye is refracted and focused on the retina to form images. The colourful world arises from dispersion, scattering and other light–matter interactions.' },
  { title: '1. Structure of Human Eye', content: `Cornea: refracts light;\nPupil: opening controlling light amount;\nIris: coloured diaphragm adjusting pupil;\nLens: focuses light on retina;\nRetina: light‑sensitive layer with rods (brightness) and cones (colour);\nOptic nerve: sends signals to brain;\nCiliary muscles: change lens shape for accommodation.` },
  { title: '2. Defects of Vision and Corrections', content: `Myopia (short‑sighted): image before retina → concave (−) lens.\nHypermetropia (long‑sighted): image behind retina → convex (+) lens.\nPresbyopia: aging, reduced accommodation → reading glasses (convex).\nAstigmatism: irregular curvature → cylindrical lens.\nPower P (D) = 100 / f(cm).` },
  { title: '3. Colourful World', content: `White light = VIBGYOR.\nDispersion: splitting by prism (rainbow formation).\nScattering: shorter wavelengths scatter more → blue sky; red at sunrise/sunset.\nAtmospheric refraction: twinkling of stars, apparent shifting of objects.` },
  { title: '4. Important Points', content: 'Eye lens is biconvex; refraction occurs at cornea and lens; dispersion produces spectrum; scattering depends on wavelength (Rayleigh scattering).' },
  { title: 'Summary', content: 'Eye optics + colour phenomena explain vision, rainbows, blue sky and twinkling. Vision defects are corrected using appropriate lenses.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'The eye lens is:', options: [
    { key: 'a', text: 'Concave' }, { key: 'b', text: 'Convex' }, { key: 'c', text: 'Cylindrical' }, { key: 'd', text: 'Plane' }
  ], answer: 'b', explanation: 'The eye uses a biconvex lens.' },
  { id: 'q2', question: 'Myopia is corrected by:', options: [
    { key: 'a', text: 'Convex lens' }, { key: 'b', text: 'Concave lens' }, { key: 'c', text: 'Cylindrical lens' }, { key: 'd', text: 'No lens' }
  ], answer: 'b', explanation: 'Diverging lens shifts focus backward.' },
  { id: 'q3', question: 'Hypermetropia occurs when image forms:', options: [
    { key: 'a', text: 'Before retina' }, { key: 'b', text: 'On retina' }, { key: 'c', text: 'Behind retina' }, { key: 'd', text: 'At lens' }
  ], answer: 'c', explanation: 'Convex lens helps focus on retina.' },
  { id: 'q4', question: 'Part controlling light entering the eye:', options: [
    { key: 'a', text: 'Lens' }, { key: 'b', text: 'Pupil' }, { key: 'c', text: 'Retina' }, { key: 'd', text: 'Cornea' }
  ], answer: 'b', explanation: 'Pupil size is adjusted by iris.' },
  { id: 'q5', question: 'Dispersion of light is produced by a:', options: [
    { key: 'a', text: 'Mirror' }, { key: 'b', text: 'Prism' }, { key: 'c', text: 'Convex lens' }, { key: 'd', text: 'Concave lens' }
  ], answer: 'b', explanation: 'Prism splits white light.' },
  { id: 'q6', question: 'Blue colour of sky is due to:', options: [
    { key: 'a', text: 'Reflection' }, { key: 'b', text: 'Refraction' }, { key: 'c', text: 'Dispersion' }, { key: 'd', text: 'Scattering' }
  ], answer: 'd', explanation: 'Short wavelengths scatter more.' },
  { id: 'q7', question: 'Rainbow formation involves:', options: [
    { key: 'a', text: 'Reflection only' }, { key: 'b', text: 'Refraction and dispersion' }, { key: 'c', text: 'Scattering only' }, { key: 'd', text: 'Absorption' }
  ], answer: 'b', explanation: 'Refraction/dispersion in droplets plus internal reflection.' },
  { id: 'q8', question: 'Twinkling of stars is due to:', options: [
    { key: 'a', text: 'Scattering' }, { key: 'b', text: 'Atmospheric refraction' }, { key: 'c', text: 'Dispersion' }, { key: 'd', text: 'Diffraction' }
  ], answer: 'b', explanation: 'Refractive index variations cause apparent shift.' },
  { id: 'q9', question: 'Cones in retina detect:', options: [
    { key: 'a', text: 'Brightness only' }, { key: 'b', text: 'Colour' }, { key: 'c', text: 'Movement' }, { key: 'd', text: 'Depth' }
  ], answer: 'b', explanation: 'Cones are colour receptors.' },
  { id: 'q10', question: 'Lens power unit is:', options: [
    { key: 'a', text: 'Meter' }, { key: 'b', text: 'Dioptre' }, { key: 'c', text: 'Candela' }, { key: 'd', text: 'Newton' }
  ], answer: 'b', explanation: 'P (D) = 1/f(m).' },
]

export default function PhyG10HumanEyeColourfulWorld() {
  return (
    <LessonModuleTemplate
      title="Human Eye and Colourful World"
      subject="Physics"
      grade={10}
      backLink="/lessons/Physics/10"
      lessonId="phy-g10-human-eye-colourful-world"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
