import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Reproduction ensures continuity of species. In flowering plants and humans, sexual reproduction involves specialized structures, fertilization, and development; asexual reproduction also occurs in plants.' },
  { title: '1. Flowering Plants: Reproduction Types', content: '• Asexual: vegetative propagation, apomixis; offspring genetically identical.\n• Sexual: fusion of male (pollen) and female (ovule) gametes → variation.' },
  { title: '2. Structure of Flower', content: 'Male: stamen (anther forms pollen, filament).\nFemale: carpel/pistil (stigma, style, ovary with ovules). Other parts: petals, sepals.' },
  { title: '3. Pollination & Fertilization', content: 'Pollination = transfer of pollen to stigma (self vs cross; agents: wind, insects, water, animals). Double fertilization: one sperm + egg → zygote; another + two polar nuclei → endosperm. Ovary → fruit; ovule → seed.' },
  { title: '4. Seed Dispersal', content: 'By wind, water, animals (zoochory), or mechanical (explosive) dispersal; ensures spread and reduced competition.' },
  { title: '5. Human Reproduction: Systems', content: 'Male: testes (sperm, testosterone); ducts (epididymis, vas deferens, ejaculatory); glands (seminal vesicle, prostate, bulbourethral).\nFemale: ovaries (ova, estrogen, progesterone), fallopian tubes (fertilization), uterus (implantation, development), vagina (birth canal).' },
  { title: '6. Menstrual Cycle & Fertilization', content: 'Cycle ≈ 28 days: menstrual → follicular (FSH) → ovulatory (LH surge) → luteal (progesterone). Fertilization in fallopian tube → zygote → embryo → implantation in uterus.' },
  { title: '7. Pregnancy & Parturition', content: 'Gestation ≈ 9 months; stages: zygote → morula → blastocyst → embryo → fetus. Parturition coordinated by oxytocin, prostaglandins.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Male gametes in flowering plants are contained in', options: [
    { key: 'a', text: 'Pollen grains' }, { key: 'b', text: 'Ovules' }, { key: 'c', text: 'Seeds' }, { key: 'd', text: 'Anthers' }
  ], answer: 'a', explanation: 'Pollen grains carry the male gametes (sperm cells).' },
  { id: 'q2', question: 'Double fertilization is characteristic of', options: [
    { key: 'a', text: 'Gymnosperms' }, { key: 'b', text: 'Bryophytes' }, { key: 'c', text: 'Angiosperms' }, { key: 'd', text: 'Algae' }
  ], answer: 'c', explanation: 'Angiosperms exhibit double fertilization (zygote + endosperm).' },
  { id: 'q3', question: 'Fertilization in humans occurs in the', options: [
    { key: 'a', text: 'Ovary' }, { key: 'b', text: 'Uterus' }, { key: 'c', text: 'Fallopian tube' }, { key: 'd', text: 'Vagina' }
  ], answer: 'c', explanation: 'Typically in the ampulla region of the fallopian tube.' },
  { id: 'q4', question: 'Hormone responsible for ovulation is primarily', options: [
    { key: 'a', text: 'FSH' }, { key: 'b', text: 'LH' }, { key: 'c', text: 'Progesterone' }, { key: 'd', text: 'Estrogen' }
  ], answer: 'b', explanation: 'LH surge induces ovulation.' },
  { id: 'q5', question: 'Seed dispersal by animals is called', options: [
    { key: 'a', text: 'Anemochory' }, { key: 'b', text: 'Hydrochory' }, { key: 'c', text: 'Zoochory' }, { key: 'd', text: 'Autochory' }
  ], answer: 'c', explanation: 'Zoochory = by animals.' },
  { id: 'q6', question: 'Male accessory glands collectively produce', options: [
    { key: 'a', text: 'Testosterone' }, { key: 'b', text: 'Semen' }, { key: 'c', text: 'Sperms' }, { key: 'd', text: 'Ovum' }
  ], answer: 'b', explanation: 'Semen = spermatozoa + seminal plasma from glands.' },
  { id: 'q7', question: 'Ovary develops into a', options: [
    { key: 'a', text: 'Seed' }, { key: 'b', text: 'Fruit' }, { key: 'c', text: 'Flower' }, { key: 'd', text: 'Pollen' }
  ], answer: 'b', explanation: 'Ovary wall becomes fruit wall (pericarp).' },
  { id: 'q8', question: 'Corpus luteum mainly secretes', options: [
    { key: 'a', text: 'Estrogen' }, { key: 'b', text: 'Progesterone' }, { key: 'c', text: 'LH' }, { key: 'd', text: 'FSH' }
  ], answer: 'b', explanation: 'Progesterone prepares/maintains endometrium.' },
  { id: 'q9', question: 'Double fertilization produces', options: [
    { key: 'a', text: 'Only embryo' }, { key: 'b', text: 'Only endosperm' }, { key: 'c', text: 'Embryo and endosperm' }, { key: 'd', text: 'Seed coat' }
  ], answer: 'c', explanation: 'Zygote → embryo; second fusion → endosperm.' },
  { id: 'q10', question: 'Human gestation period is approximately', options: [
    { key: 'a', text: '6 months' }, { key: 'b', text: '9 months' }, { key: 'c', text: '12 months' }, { key: 'd', text: '3 months' }
  ], answer: 'b', explanation: 'About 40 weeks ≈ 9 months.' },
]

export default function BioG12Reproduction() {
  return (
    <LessonModuleTemplate
      title="Reproduction (Flowering Plants and Humans)"
      subject="Biology"
      grade={12}
      backLink="/lessons/Biology/12"
      lessonId="bio-g12-reproduction"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
