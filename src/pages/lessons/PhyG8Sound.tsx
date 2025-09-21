import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Sound is a type of energy produced by vibrations. It travels through a medium and allows hearing, communication, and sensing the environment.' },
  { title: '1. What is Sound?', content: 'Vibrations traveling through a medium (solid, liquid, gas). Cannot travel in vacuum. Speed: ~343 m/s (air), ~1482 m/s (water), ~5960 m/s (steel).' },
  { title: '2. Production of Sound', content: 'Produced by vibrating objects (guitar strings, drums, vocal cords). Frequency of vibration affects pitch; amplitude affects loudness.' },
  { title: '3. Characteristics', content: 'Pitch depends on frequency; loudness on amplitude; quality/timbre distinguishes sources with same pitch and loudness.' },
  { title: '4. Propagation', content: 'Mechanical longitudinal waves; particles vibrate along the direction of wave travel; needs a medium.' },
  { title: '5. Reflection of Sound (Echo)', content: 'Sound reflects from surfaces → echo. Used in SONAR, ultrasound, and architectural acoustics.' },
  { title: '6. Applications', content: 'Communication (speech, phones), medical imaging (ultrasound), navigation (SONAR), music (instruments).' },
  { title: 'Summary', content: 'Sound is vibration energy transmitted as longitudinal waves in a medium. Key ideas: pitch, loudness, timbre, echoes, and applications.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Sound is produced by:', options: [
    { key: 'a', text: 'Heat' }, { key: 'b', text: 'Light' }, { key: 'c', text: 'Vibrations' }, { key: 'd', text: 'Pressure' }
  ], answer: 'c', explanation: 'Vibrating bodies produce sound.' },
  { id: 'q2', question: 'Sound cannot travel in:', options: [
    { key: 'a', text: 'Air' }, { key: 'b', text: 'Water' }, { key: 'c', text: 'Steel' }, { key: 'd', text: 'Vacuum' }
  ], answer: 'd', explanation: 'No medium → no sound propagation.' },
  { id: 'q3', question: 'Speed highest in:', options: [
    { key: 'a', text: 'Air' }, { key: 'b', text: 'Water' }, { key: 'c', text: 'Steel' }, { key: 'd', text: 'Vacuum' }
  ], answer: 'c', explanation: 'Sound travels fastest in solids (steel > water > air).' },
  { id: 'q4', question: 'Pitch depends on:', options: [
    { key: 'a', text: 'Amplitude' }, { key: 'b', text: 'Frequency' }, { key: 'c', text: 'Medium' }, { key: 'd', text: 'Distance' }
  ], answer: 'b', explanation: 'Higher frequency → higher pitch.' },
  { id: 'q5', question: 'Loudness depends on:', options: [
    { key: 'a', text: 'Frequency' }, { key: 'b', text: 'Wavelength' }, { key: 'c', text: 'Amplitude' }, { key: 'd', text: 'Medium' }
  ], answer: 'c', explanation: 'Greater amplitude → louder sound.' },
  { id: 'q6', question: 'Echo is an example of:', options: [
    { key: 'a', text: 'Absorption' }, { key: 'b', text: 'Reflection' }, { key: 'c', text: 'Transmission' }, { key: 'd', text: 'Diffraction' }
  ], answer: 'b', explanation: 'Echo is reflected sound.' },
  { id: 'q7', question: 'Sound waves are:', options: [
    { key: 'a', text: 'Transverse' }, { key: 'b', text: 'Longitudinal' }, { key: 'c', text: 'Electromagnetic' }, { key: 'd', text: 'Light waves' }
  ], answer: 'b', explanation: 'Sound propagates as longitudinal pressure waves.' },
  { id: 'q8', question: 'Ultrasound used in:', options: [
    { key: 'a', text: 'Cooking' }, { key: 'b', text: 'Medical imaging' }, { key: 'c', text: 'Electricity' }, { key: 'd', text: 'Soundproofing' }
  ], answer: 'b', explanation: 'Ultrasound helps image soft tissues.' },
  { id: 'q9', question: 'Lowest pitch:', options: [
    { key: 'a', text: 'Dog barking' }, { key: 'b', text: 'Cat meowing' }, { key: 'c', text: 'Bass drum' }, { key: 'd', text: 'Flute' }
  ], answer: 'c', explanation: 'Bass drum produces lower frequencies.' },
  { id: 'q10', question: 'Sound travels fastest in:', options: [
    { key: 'a', text: 'Solids' }, { key: 'b', text: 'Liquids' }, { key: 'c', text: 'Gases' }, { key: 'd', text: 'Vacuum' }
  ], answer: 'a', explanation: 'Due to stronger particle interactions in solids.' },
]

export default function PhyG8Sound() {
  return (
    <LessonModuleTemplate
      title="Sound"
      subject="Physics"
      grade={8}
      backLink="/lessons/Physics/8"
      lessonId="phy-g8-sound"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
