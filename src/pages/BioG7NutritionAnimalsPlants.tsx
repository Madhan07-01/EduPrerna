import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Nutrition is how living organisms obtain food, energy, and nutrients for growth, repair, and survival. Plants produce their own food, while animals depend on plants or other animals. Understanding nutrition shows how energy flows in nature.' },
  { title: '1. Nutrition in Plants', content: 'Mostly autotrophs: make food via photosynthesis — 6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂. Types: Autotrophic (most green plants) and Heterotrophic (depend on others). Parasitic plants: Cuscuta; Insectivorous: Venus flytrap.' },
  { title: '2. Nutrition in Animals', content: 'Animals are heterotrophs. Types: Herbivores (eat plants), Carnivores (eat animals), Omnivores (eat both), Detritivores (decaying matter).' },
  { title: '3. Human Digestive System', content: 'Mouth (chewing, saliva) → Esophagus → Stomach (proteins) → Small intestine (digestion & absorption) → Large intestine (water absorption). Liver & Pancreas secrete bile and enzymes.' },
  { title: '4. Nutrition in Simple Animals and Insects', content: 'Insects use proboscis or mandibles. Amoeba ingests food by phagocytosis.' },
  { title: '5. Importance of Nutrition', content: 'Provides energy, supports growth & tissue repair, maintains health & immunity.' },
  { title: 'Summary', content: 'Plants mostly autotrophic; animals heterotrophic. Human digestion processes food for absorption. Nutrition fuels energy, growth, and health.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Plants that make their own food are called:', options: [
    { key: 'a', text: 'Heterotrophs' }, { key: 'b', text: 'Autotrophs' }, { key: 'c', text: 'Carnivores' }, { key: 'd', text: 'Omnivores' }
  ], answer: 'b', explanation: 'Autotrophs synthesize food via photosynthesis.' },
  { id: 'q2', question: 'Photosynthesis requires:', options: [
    { key: 'a', text: 'CO₂, H₂O, Sunlight' }, { key: 'b', text: 'O₂, Water, Soil' }, { key: 'c', text: 'CO₂, O₂, Sugar' }, { key: 'd', text: 'Water, Soil, Minerals' }
  ], answer: 'a', explanation: 'CO₂ + H₂O + Sunlight are essential inputs.' },
  { id: 'q3', question: 'Parasitic plant:', options: [
    { key: 'a', text: 'Cuscuta' }, { key: 'b', text: 'Rose' }, { key: 'c', text: 'Mango' }, { key: 'd', text: 'Grass' }
  ], answer: 'a', explanation: 'Cuscuta derives nutrients from a host plant.' },
  { id: 'q4', question: 'Animals that eat both plants and animals:', options: [
    { key: 'a', text: 'Herbivores' }, { key: 'b', text: 'Carnivores' }, { key: 'c', text: 'Omnivores' }, { key: 'd', text: 'Detritivores' }
  ], answer: 'c', explanation: 'Humans and bears are omnivores.' },
  { id: 'q5', question: 'Human stomach digests mainly:', options: [
    { key: 'a', text: 'Carbohydrates' }, { key: 'b', text: 'Proteins' }, { key: 'c', text: 'Fats' }, { key: 'd', text: 'Vitamins' }
  ], answer: 'b', explanation: 'Pepsin acts on proteins in the stomach.' },
  { id: 'q6', question: 'Small intestine is important for:', options: [
    { key: 'a', text: 'Chewing food' }, { key: 'b', text: 'Absorption of nutrients' }, { key: 'c', text: 'Storage of waste' }, { key: 'd', text: 'Producing saliva' }
  ], answer: 'b', explanation: 'Most nutrient absorption occurs in the small intestine.' },
  { id: 'q7', question: 'Amoeba ingests food by:', options: [
    { key: 'a', text: 'Photosynthesis' }, { key: 'b', text: 'Phagocytosis' }, { key: 'c', text: 'Chewing' }, { key: 'd', text: 'Biting' }
  ], answer: 'b', explanation: 'Amoeba engulfs food particles by phagocytosis.' },
  { id: 'q8', question: 'Detritivores feed on:', options: [
    { key: 'a', text: 'Plants' }, { key: 'b', text: 'Animals' }, { key: 'c', text: 'Decaying matter' }, { key: 'd', text: 'Water' }
  ], answer: 'c', explanation: 'They consume dead and decaying matter.' },
  { id: 'q9', question: 'Liver and pancreas secrete:', options: [
    { key: 'a', text: 'Hormones only' }, { key: 'b', text: 'Enzymes and bile' }, { key: 'c', text: 'Water and salts' }, { key: 'd', text: 'Blood' }
  ], answer: 'b', explanation: 'Liver produces bile; pancreas secretes enzymes.' },
  { id: 'q10', question: 'Insectivorous plants obtain food from:', options: [
    { key: 'a', text: 'Soil' }, { key: 'b', text: 'Sunlight only' }, { key: 'c', text: 'Insects' }, { key: 'd', text: 'Water' }
  ], answer: 'c', explanation: 'They trap and digest insects to supplement nutrients.' },
]

export default function BioG7NutritionAnimalsPlants() {
  return (
    <LessonModuleTemplate
      title="Nutrition in Animals and Plants"
      subject="Biology"
      grade={7}
      backLink="/lessons/Biology/7"
      lessonId="bio-g7-nutrition-animals-plants"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
