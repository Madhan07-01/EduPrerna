import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const soundModule: LearningModule = {
  title: 'Sound',
  introduction: 'Welcome to the wonderful world of Sound! Every moment of your life is filled with sounds - your favorite music, friends\' voices, birds chirping, or even the gentle hum of a fan. But have you ever wondered how these sounds reach your ears? Sound is an amazing form of energy that travels through the air and other materials, bringing the world to life around you. Get ready to discover the science behind every sound you hear and learn how this invisible force connects you to everything around you!',
  concepts: [
    {
      title: 'Fundamental Definition of Sound and Medium Dependence',
      content: 'Sound is a form of energy that travels as vibrations through different materials called mediums. Unlike light, sound cannot travel through empty space - it absolutely needs a medium like air, water, or solid materials to move from one place to another.',
      examples: [
        'Sound travels through air when you hear someone speaking',
        'Sound travels through water - whales can communicate across vast ocean distances',
        'Sound travels through solids - you can hear footsteps through the floor',
        'In outer space, there is no sound because there\'s no air or other medium',
        'Astronauts cannot hear each other speak in space without radio communication'
      ]
    },
    {
      title: 'Vibration - The Source of All Sound',
      content: 'All sounds are produced by vibrations. When an object vibrates, it moves back and forth rapidly, pushing and pulling the air molecules around it. These vibrations create sound waves that travel to our ears.',
      examples: [
        'Guitar strings vibrate when plucked, creating musical notes',
        'Your vocal cords vibrate when you speak or sing',
        'A drum skin vibrates when hit, producing drum beats',
        'Tuning fork vibrates to produce a pure musical tone',
        'Speaker cones vibrate to reproduce music and voices from electronic devices'
      ]
    },
    {
      title: 'Pitch - How High or Low a Sound Is',
      content: 'Pitch is how high or low a sound appears to our ears. It depends on the frequency of vibrations - how many times per second the object vibrates. Higher frequency means higher pitch, and lower frequency means lower pitch.',
      examples: [
        'A bird\'s chirp has high pitch due to high frequency vibrations',
        'An elephant\'s trumpet has low pitch due to low frequency vibrations',
        'Women typically have higher-pitched voices than men',
        'Frequency is measured in Hertz (Hz) - vibrations per second',
        'Humans can hear frequencies from about 20 Hz to 20,000 Hz'
      ]
    },
    {
      title: 'Loudness - How Strong or Soft a Sound Is',
      content: 'Loudness is how strong or soft a sound appears to our ears. It depends on the amplitude of vibrations - how far the vibrating object moves back and forth. Greater amplitude means louder sound, and smaller amplitude means softer sound.',
      examples: [
        'A whisper has small amplitude, creating a soft sound',
        'Shouting has large amplitude, creating a loud sound',
        'Volume control on devices changes the amplitude of sound waves',
        'Loudness is measured in decibels (dB)',
        'Normal conversation is about 60 dB, while rock concerts can reach 110 dB'
      ]
    },
    {
      title: 'Quality (Timbre) - What Makes Sounds Unique',
      content: 'Quality or timbre is what makes the same musical note sound different when played on different instruments. It depends on the combination of different frequencies that mix together to create the overall sound.',
      examples: [
        'Middle C sounds different on a piano than on a guitar',
        'You can recognize your friend\'s voice among many others',
        'A violin and flute playing the same note sound distinctly different',
        'Quality helps us distinguish between different musical instruments',
        'Overtones and harmonics create the unique quality of each sound'
      ]
    },
    {
      title: 'Sound as Longitudinal Waves',
      content: 'Sound travels as longitudinal waves, where air molecules vibrate back and forth in the same direction as the wave travels. This creates areas of compression (where molecules are squeezed together) and rarefaction (where molecules are spread apart).',
      examples: [
        'Think of a slinky spring being pushed and pulled - that\'s how sound moves',
        'Compressions are like crowded areas where air molecules bunch up',
        'Rarefactions are like empty spaces where air molecules spread out',
        'These pressure changes travel through the air to reach our ears',
        'Unlike water waves, sound waves don\'t move up and down but push and pull'
      ]
    },
    {
      title: 'Reflection of Sound - When Sound Bounces Back',
      content: 'Sound waves can bounce off surfaces just like a ball bounces off a wall. This reflection of sound creates echoes and has many practical applications in technology and nature.',
      examples: [
        'Shouting in a large empty room creates an echo',
        'Mountain climbers hear their voices echo off distant cliffs',
        'Hard surfaces like walls reflect sound better than soft surfaces',
        'Concert halls are designed to control sound reflection for better acoustics',
        'Bats use sound reflection to navigate and hunt in the dark'
      ]
    },
    {
      title: 'Echo - Hearing Reflected Sound',
      content: 'An echo occurs when reflected sound reaches our ears separately from the original sound. For us to hear a distinct echo, the reflected sound must return at least 0.1 seconds after the original sound.',
      examples: [
        'Clapping hands in a large tunnel produces a clear echo',
        'Shouting across a valley and hearing your voice return',
        'The minimum distance for echo is about 17 meters from the reflecting surface',
        'Multiple reflections can create multiple echoes',
        'Soft materials like carpets and curtains absorb sound and reduce echoes'
      ]
    },
    {
      title: 'SONAR - Sound Navigation and Ranging',
      content: 'SONAR is a technology that uses sound waves to detect objects underwater. It works by sending out sound pulses and measuring how long it takes for the echoes to return, calculating distance and location.',
      examples: [
        'Ships use SONAR to measure ocean depth and avoid underwater obstacles',
        'Submarines use SONAR for navigation and detection',
        'Fishing boats use SONAR to locate schools of fish',
        'Marine biologists use SONAR to study ocean floor and marine life',
        'Medical ultrasound is a form of SONAR used to see inside the human body'
      ]
    },
    {
      title: 'Practical Applications of Sound in Daily Life and Technology',
      content: 'Sound technology surrounds us in countless ways, making our lives easier, safer, and more enjoyable. From entertainment to medical diagnosis, sound applications continue to grow and evolve.',
      examples: [
        'Music systems and headphones for entertainment',
        'Telephone and mobile communication using sound waves',
        'Medical ultrasound for seeing babies before birth',
        'Hearing aids to help people with hearing difficulties',
        'Sound alarms for fire safety and security systems',
        'Microphones and speakers for public address systems',
        'Sound-based distance sensors in modern cars for parking assistance'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What does sound need to travel from one place to another?',
      options: ['Light', 'A medium (like air or water)', 'Electricity', 'Empty space'],
      correct: 1,
      explanation: 'Sound needs a medium like air, water, or solid materials to travel. Unlike light, sound cannot travel through empty space because it requires molecules to vibrate and carry the sound waves.'
    },
    {
      question: 'What is the source of all sound?',
      options: ['Light waves', 'Vibrations', 'Electrical energy', 'Heat'],
      correct: 1,
      explanation: 'All sounds are produced by vibrations. When an object vibrates, it moves back and forth rapidly, creating sound waves that travel through a medium to reach our ears.'
    },
    {
      question: 'What determines the pitch of a sound?',
      options: ['Amplitude', 'Frequency', 'Volume', 'Quality'],
      correct: 1,
      explanation: 'Pitch is determined by frequency - how many vibrations occur per second. Higher frequency creates higher pitch sounds, while lower frequency creates lower pitch sounds.'
    },
    {
      question: 'What determines the loudness of a sound?',
      options: ['Frequency', 'Quality', 'Amplitude', 'Pitch'],
      correct: 2,
      explanation: 'Loudness is determined by amplitude - how far the vibrating object moves back and forth. Greater amplitude creates louder sounds, while smaller amplitude creates softer sounds.'
    },
    {
      question: 'What is the quality or timbre of sound?',
      options: ['How loud the sound is', 'How high or low the sound is', 'What makes sounds unique and recognizable', 'How fast the sound travels'],
      correct: 2,
      explanation: 'Quality or timbre is what makes sounds unique and recognizable. It\'s why the same musical note sounds different on different instruments and why you can recognize different voices.'
    },
    {
      question: 'How does sound travel through air?',
      options: ['As transverse waves moving up and down', 'As longitudinal waves with compressions and rarefactions', 'As circular waves', 'As electromagnetic waves'],
      correct: 1,
      explanation: 'Sound travels as longitudinal waves through air, creating alternating areas of compression (where air molecules are squeezed together) and rarefaction (where air molecules are spread apart).'
    },
    {
      question: 'What happens when sound waves hit a hard surface?',
      options: ['They disappear', 'They get absorbed completely', 'They reflect back', 'They become light'],
      correct: 2,
      explanation: 'When sound waves hit a hard surface, they reflect back, bouncing off the surface. This reflection of sound can create echoes and is used in technologies like SONAR.'
    },
    {
      question: 'What is the minimum time gap needed to hear a distinct echo?',
      options: ['0.01 seconds', '0.1 seconds', '1 second', '10 seconds'],
      correct: 1,
      explanation: 'For us to hear a distinct echo, the reflected sound must return at least 0.1 seconds after the original sound. This corresponds to a minimum distance of about 17 meters from the reflecting surface.'
    },
    {
      question: 'What does SONAR stand for?',
      options: ['Sound Only Navigation and Ranging', 'Sound Navigation and Ranging', 'Solar Navigation and Ranging', 'Signal Navigation and Ranging'],
      correct: 1,
      explanation: 'SONAR stands for Sound Navigation and Ranging. It\'s a technology that uses sound waves to detect objects underwater by measuring the time it takes for sound echoes to return.'
    },
    {
      question: 'Which application uses sound waves to see inside the human body?',
      options: ['X-ray', 'MRI scan', 'Ultrasound', 'CT scan'],
      correct: 2,
      explanation: 'Ultrasound uses sound waves to see inside the human body. It\'s commonly used to monitor babies during pregnancy and for various medical diagnoses, working like SONAR but for medical purposes.'
    }
  ]
}

export default function SoundModule() {
  return (
    <ModuleLayout 
      module={soundModule} 
      grade={8} 
      subject="Science" 
    />
  )
}