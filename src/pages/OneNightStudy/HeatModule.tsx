import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const heatModule: LearningModule = {
  title: 'Heat - Complete Module',
  introduction: 'Welcome to the amazing world of Heat! Have you ever wondered why ice melts on a hot day, or how your food gets cooked in the oven? Heat is all around us, affecting everything from the weather to the way we prepare our meals. Understanding heat helps us make sense of everyday phenomena and keeps us safe around hot objects. Get ready to discover the fascinating science behind this invisible form of energy that plays such an important role in our daily lives!',
  concepts: [
    {
      title: 'Definition of Heat and Its Relation to Temperature',
      content: 'Heat and temperature are related but different concepts. Heat is the energy that flows from a hotter object to a cooler one, while temperature measures how hot or cold something is. Think of heat as the "energy in motion" and temperature as the "hotness level."',
      examples: [
        'Heat is energy transfer: flows from hot tea to your cooler hands',
        'Temperature measures hotness: 37°C for normal body temperature',
        'Heat flows until thermal equilibrium: hot and cold objects reach same temperature',
        'Units: Heat measured in Joules (J) or calories, temperature in Celsius (°C)',
        'Example: A large pot of warm water has more heat than a small cup of hot water',
        'Heat always flows from higher temperature to lower temperature regions'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the main difference between heat and temperature?',
      options: ['They are the same thing', 'Heat is energy transfer, temperature measures hotness', 'Heat is cold, temperature is hot', 'There is no difference'],
      correct: 1,
      explanation: 'Heat is the energy that flows from a hotter object to a cooler one, while temperature is a measure of how hot or cold something is.'
    }
  ]
}

export default function HeatModule() {
  return (
    <ModuleLayout 
      module={heatModule} 
      grade={7} 
      subject="Science" 
    />
  )
}