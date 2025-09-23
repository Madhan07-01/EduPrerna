import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const ourBodyHealthModule: LearningModule = {
  title: 'Our Body and Health',
  introduction: 'Welcome to the amazing journey of understanding your own body and how to keep it healthy! Your body is like a incredible machine with many systems working together every single day. Learning about your body and health will help you make smart choices to stay strong, energetic, and happy throughout your life!',
  concepts: [
    {
      title: 'Human Body Systems Overview',
      content: 'Your body is made up of different systems that work together like teams. Each system has special jobs to keep you alive and healthy.',
      examples: [
        'Skeletal System: 206 bones that give your body shape and protect organs',
        'Muscular System: Over 600 muscles that help you move and stay strong',
        'Circulatory System: Heart and blood vessels that carry nutrients around your body',
        'Respiratory System: Lungs that help you breathe and get oxygen',
        'Digestive System: Stomach and intestines that break down food for energy'
      ]
    },
    {
      title: 'The Heart and Circulatory System',
      content: 'Your heart is an amazing muscle that pumps blood throughout your body 24/7. It delivers oxygen and nutrients to every part of your body and removes waste products.',
      examples: [
        'Your heart beats about 100,000 times per day',
        'Blood carries oxygen from your lungs to your muscles and brain',
        'Arteries carry blood away from your heart to your body',
        'Veins bring blood back to your heart from your body',
        'Regular exercise makes your heart stronger, just like any other muscle'
      ]
    },
    {
      title: 'The Respiratory System and Breathing',
      content: 'Your lungs help you breathe in oxygen that your body needs and breathe out carbon dioxide that your body doesn\'t need. This happens automatically, even when you\'re sleeping!',
      examples: [
        'You breathe about 20,000 times per day without thinking about it',
        'Your lungs have tiny air sacs called alveoli where oxygen enters your blood',
        'Deep breathing exercises can help you relax and feel better',
        'When you exercise, you breathe faster to get more oxygen',
        'Clean air is important for healthy lungs'
      ]
    },
    {
      title: 'The Digestive System and Nutrition',
      content: 'Your digestive system breaks down food into nutrients that your body can use for energy, growth, and repair. It\'s like a food processing factory inside you!',
      examples: [
        'Digestion starts in your mouth when you chew and mix food with saliva',
        'Your stomach uses acid to break down food into smaller pieces',
        'Small intestine absorbs nutrients from food into your bloodstream',
        'Large intestine removes waste and excess water from your body',
        'The whole digestion process takes about 24-72 hours'
      ]
    },
    {
      title: 'Health and Hygiene Importance',
      content: 'Good hygiene habits help prevent germs from making you sick and keep your body clean and healthy. These simple habits make a big difference!',
      examples: [
        'Wash your hands with soap for 20 seconds, especially before eating',
        'Brush your teeth twice daily to prevent cavities and gum disease',
        'Take regular baths or showers to keep your skin clean',
        'Cover your mouth when you cough or sneeze to prevent spreading germs',
        'Keep your nails clean and trimmed to avoid collecting dirt and bacteria'
      ]
    },
    {
      title: 'Balanced Diet and Nutrients',
      content: 'A balanced diet gives your body all the nutrients it needs to grow strong and stay healthy. Different foods provide different types of nutrients your body needs.',
      examples: [
        'Proteins (meat, fish, beans): Help build and repair muscles',
        'Carbohydrates (bread, rice, pasta): Give you energy for daily activities',
        'Fats (nuts, oils): Provide energy and help absorb vitamins',
        'Vitamins and minerals (fruits, vegetables): Keep your body systems working well',
        'Water: Helps all body systems work properly - drink 6-8 glasses daily'
      ]
    },
    {
      title: 'Physical Exercise and Fitness',
      content: 'Regular physical activity keeps your body strong, improves your mood, and helps prevent many health problems. Exercise is like medicine for your body!',
      examples: [
        'Aim for at least 60 minutes of physical activity every day',
        'Activities like running, swimming, and biking strengthen your heart',
        'Strength exercises like push-ups and climbing build muscle',
        'Flexibility exercises like stretching keep your joints healthy',
        'Team sports and games make exercise fun while building social skills'
      ]
    },
    {
      title: 'Sleep and Rest',
      content: 'Getting enough quality sleep is crucial for your physical and mental health. While you sleep, your body repairs itself and your brain processes what you learned during the day.',
      examples: [
        '6th graders need about 9-11 hours of sleep each night',
        'During sleep, your body releases growth hormones to help you grow',
        'Sleep helps your immune system fight off infections',
        'Good sleep improves your memory, concentration, and mood',
        'Create a bedtime routine: no screens 1 hour before bed, keep room cool and dark'
      ]
    },
    {
      title: 'Disease Prevention Basics',
      content: 'Many diseases can be prevented by making healthy choices and following good hygiene practices. Prevention is always better than treatment!',
      examples: [
        'Vaccinations protect you from serious diseases like measles and flu',
        'Eating fruits and vegetables boosts your immune system',
        'Regular handwashing prevents many infectious diseases',
        'Avoiding tobacco and harmful substances protects your lungs and health',
        'Regular check-ups with doctors help catch problems early'
      ]
    },
    {
      title: 'Daily Health Practices',
      content: 'Small daily habits add up to make a big difference in your overall health and well-being. These practices become easier when you make them part of your routine.',
      examples: [
        'Start your day with a healthy breakfast to fuel your brain and body',
        'Drink water throughout the day instead of sugary drinks',
        'Take breaks from screens to rest your eyes and stretch your body',
        'Practice good posture when sitting and standing to protect your spine',
        'Manage stress through deep breathing, talking to friends, or doing hobbies you enjoy'
      ]
    }
  ],
  mcqs: [
    {
      question: 'How many bones are in the human skeletal system?',
      options: ['150', '206', '300', '400'],
      correct: 1,
      explanation: 'The human skeletal system has 206 bones that provide structure, protect organs, and work with muscles to help you move.'
    },
    {
      question: 'What is the main job of the circulatory system?',
      options: ['Help you breathe', 'Digest food', 'Carry nutrients and oxygen throughout the body', 'Help you think'],
      correct: 2,
      explanation: 'The circulatory system\'s main job is to carry nutrients and oxygen throughout your body via blood pumped by your heart.'
    },
    {
      question: 'About how many times does your heart beat per day?',
      options: ['50,000', '75,000', '100,000', '125,000'],
      correct: 2,
      explanation: 'Your heart beats approximately 100,000 times per day, pumping blood to deliver oxygen and nutrients throughout your body.'
    },
    {
      question: 'Where does digestion begin?',
      options: ['In your stomach', 'In your mouth', 'In your small intestine', 'In your large intestine'],
      correct: 1,
      explanation: 'Digestion begins in your mouth when you chew food and mix it with saliva, which starts breaking down the food.'
    },
    {
      question: 'How long should you wash your hands with soap?',
      options: ['5 seconds', '10 seconds', '20 seconds', '30 seconds'],
      correct: 2,
      explanation: 'You should wash your hands with soap for at least 20 seconds to effectively remove germs and prevent illness.'
    },
    {
      question: 'Which nutrient group helps build and repair muscles?',
      options: ['Carbohydrates', 'Proteins', 'Fats', 'Vitamins'],
      correct: 1,
      explanation: 'Proteins help build and repair muscles. Good sources include meat, fish, beans, eggs, and nuts.'
    },
    {
      question: 'How much physical activity should 6th graders get daily?',
      options: ['30 minutes', '45 minutes', '60 minutes', '90 minutes'],
      correct: 2,
      explanation: 'Sixth graders should aim for at least 60 minutes of physical activity every day to stay healthy and strong.'
    },
    {
      question: 'How many hours of sleep do 6th graders need each night?',
      options: ['6-8 hours', '7-9 hours', '9-11 hours', '10-12 hours'],
      correct: 2,
      explanation: 'Sixth graders need about 9-11 hours of sleep each night for proper growth, learning, and health.'
    },
    {
      question: 'What happens to your body during sleep?',
      options: ['Nothing important', 'Only your brain rests', 'Your body repairs itself and releases growth hormones', 'Only your muscles rest'],
      correct: 2,
      explanation: 'During sleep, your body repairs itself, releases growth hormones, and your brain processes information from the day.'
    },
    {
      question: 'Which is the best way to prevent many infectious diseases?',
      options: ['Taking vitamins', 'Regular handwashing', 'Eating more protein', 'Sleeping extra hours'],
      correct: 1,
      explanation: 'Regular handwashing with soap is one of the most effective ways to prevent many infectious diseases by removing germs.'
    }
  ]
}

export default function OurBodyHealthModule() {
  return (
    <ModuleLayout 
      module={ourBodyHealthModule} 
      grade={6} 
      subject="Science" 
    />
  )
}