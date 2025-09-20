import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const lifeProcessesModule: LearningModule = {
  title: 'Life Processes - Complete Module',
  introduction: 'Welcome to the amazing world of Life Processes! Have you ever wondered what makes you alive? Life processes are the essential activities that all living organisms must perform to stay alive and healthy. These include getting food and energy, breathing, moving materials around the body, removing waste, and creating new life. Understanding these processes helps us appreciate how complex and wonderful our bodies are, and how all living things are connected. Let\'s explore the fascinating mechanisms that keep every living thing functioning!',
  concepts: [
    {
      title: 'Nutrition - How Living Things Get Food and Energy',
      content: 'Nutrition is the process by which living organisms obtain and use food to get energy for all their life activities. Different organisms have developed different ways to get their food, leading to two main types of nutrition.',
      examples: [
        'Autotrophic nutrition: Organisms make their own food (like plants through photosynthesis)',
        'Heterotrophic nutrition: Organisms depend on others for food (like animals eating plants/other animals)',
        'Examples of autotrophs: Green plants, algae, some bacteria that use sunlight or chemicals',
        'Examples of heterotrophs: Humans, animals, fungi, most bacteria',
        'Food provides energy (ATP) and raw materials for growth, repair, and maintenance',
        'All nutrition ultimately depends on energy from the sun captured by autotrophs'
      ]
    },
    {
      title: 'Respiration - How Living Things Get Energy from Food',
      content: 'Respiration is the process where living organisms break down food molecules to release energy for all cellular activities. This happens in every living cell and is essential for life.',
      examples: [
        'Aerobic respiration: Uses oxygen to completely break down glucose (most efficient)',
        'Anaerobic respiration: Occurs without oxygen when oxygen is limited (less efficient)',
        'Equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP (energy)',
        'ATP: The energy currency used by all cells for their activities',
        'Examples: Muscle cells respire to contract, brain cells to think, plant cells to grow',
        'Even plants respire 24/7, though they photosynthesize only during daylight'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the main difference between autotrophic and heterotrophic nutrition?',
      options: ['Autotrophs eat meat, heterotrophs eat plants', 'Autotrophs make their own food, heterotrophs depend on others', 'Autotrophs are animals, heterotrophs are plants', 'There is no difference'],
      correct: 1,
      explanation: 'Autotrophic organisms (like plants) can make their own food using simple substances, while heterotrophic organisms (like animals) must obtain food from other organisms.'
    },
    {
      question: 'Which type of respiration is more efficient at producing energy?',
      options: ['Anaerobic respiration', 'Aerobic respiration', 'Both are equally efficient', 'Neither produces energy'],
      correct: 1,
      explanation: 'Aerobic respiration is much more efficient because it completely breaks down glucose using oxygen, producing much more ATP than anaerobic respiration.'
    }
  ]
}

export default function LifeProcessesModule() {
  return (
    <ModuleLayout 
      module={lifeProcessesModule} 
      grade={7} 
      subject="Science" 
    />
  )
}