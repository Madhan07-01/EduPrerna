import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const gravitationModule: LearningModule = {
  title: 'Gravitation',
  introduction: 'Welcome to the awe-inspiring world of Gravitation! From the apple that inspired Newton\'s greatest discovery to the satellites orbiting our planet, from the tides in our oceans to the dance of planets around the sun, gravitation is the universal force that shapes our cosmos! This invisible force governs everything from why we stay grounded on Earth to how galaxies spiral through space. Understanding gravitation helps us comprehend our place in the universe and enables us to send rockets to space, predict tides, and understand the motion of celestial bodies. Get ready to explore the force that binds the universe together and discover how this fundamental interaction affects every aspect of our existence!',
  concepts: [
    {
      title: 'Newton\'s Law of Universal Gravitation',
      content: 'Newton\'s Law of Universal Gravitation states that every particle in the universe attracts every other particle with a force that is directly proportional to the product of their masses and inversely proportional to the square of the distance between them.',
      examples: [
        'Statement: "Every object in the universe attracts every other object with gravitational force"',
        'Formula: F = G(m₁m₂)/r², where G is the gravitational constant',
        'G = 6.67 × 10⁻¹¹ N⋅m²/kg² (universal gravitational constant)',
        'Examples: Earth attracts moon, sun attracts planets, you attract this book',
        'Key insight: Gravitational force acts between ALL objects, but is only noticeable for very massive objects'
      ]
    },
    {
      title: 'Understanding the Gravitational Formula',
      content: 'The gravitational formula F = G(m₁m₂)/r² contains important relationships that help us understand how gravitational force depends on mass and distance between objects.',
      examples: [
        'F = gravitational force between two objects (measured in Newtons)',
        'm₁, m₂ = masses of the two objects (measured in kilograms)',
        'r = distance between centers of the objects (measured in meters)',
        'G = 6.67 × 10⁻¹¹ N⋅m²/kg² (same everywhere in universe)',
        'Double the mass → double the force; double the distance → force becomes 1/4'
      ]
    },
    {
      title: 'Acceleration due to Gravity (g)',
      content: 'Acceleration due to gravity (g) is the acceleration experienced by any object falling freely under Earth\'s gravitational influence. It has an approximate value of 9.8 m/s² on Earth\'s surface.',
      examples: [
        'Definition: g = acceleration due to gravity = 9.8 m/s² (approximately 10 m/s²)',
        'Meaning: Any falling object speeds up by 9.8 m/s every second',
        'Independent of mass: Feather and hammer fall at same rate in vacuum',
        'Formula derivation: g = GM/R² where M = Earth\'s mass, R = Earth\'s radius',
        'Applications: Free fall calculations, weight calculations, projectile motion'
      ]
    },
    {
      title: 'Mass vs Weight - Understanding the Difference',
      content: 'Mass and weight are often confused, but they are fundamentally different. Mass is the amount of matter in an object, while weight is the gravitational force acting on that object.',
      examples: [
        'Mass: Amount of matter in an object (measured in kg, constant everywhere)',
        'Weight: Gravitational force on an object (measured in Newtons, varies with location)',
        'Formula: Weight = mass × acceleration due to gravity (W = mg)',
        'Example: 50 kg person has weight = 50 × 9.8 = 490 N on Earth',
        'On moon: Same 50 kg mass, but weight = 50 × 1.6 = 80 N (moon\'s g = 1.6 m/s²)'
      ]
    },
    {
      title: 'Variation of g with Height',
      content: 'The acceleration due to gravity decreases as we move away from Earth\'s surface because gravitational force follows an inverse square law with distance.',
      examples: [
        'Formula: g_h = g(R/(R+h))² where h = height above surface, R = Earth\'s radius',
        'At sea level: g = 9.8 m/s²',
        'At 10 km altitude: g ≈ 9.77 m/s² (slightly less)',
        'At 400 km (ISS altitude): g ≈ 8.7 m/s² (about 11% less)',
        'Practical effect: Astronauts in orbit feel weightless but still experience gravity'
      ]
    },
    {
      title: 'Variation of g with Depth',
      content: 'As we go deeper into the Earth, the acceleration due to gravity decreases because only the mass below us contributes to the gravitational pull, while the mass above us pulls in the opposite direction.',
      examples: [
        'Formula: g_d = g(1 - d/R) where d = depth below surface, R = Earth\'s radius',
        'At Earth\'s surface: g = 9.8 m/s²',
        'At center of Earth: g = 0 m/s² (no net gravitational force)',
        'In mines: g slightly less than surface value',
        'Reason: Only the mass of Earth below you pulls you down'
      ]
    },
    {
      title: 'Free Fall Motion',
      content: 'Free fall is the motion of objects under the influence of gravity alone, without any other forces like air resistance. All objects in free fall have the same acceleration regardless of their mass.',
      examples: [
        'Definition: Motion under gravity alone (air resistance ignored)',
        'Key principle: All objects fall with same acceleration g = 9.8 m/s²',
        'Equations: v = gt, h = ½gt², v² = 2gh (starting from rest)',
        'Example: Object dropped from 20m height hits ground in 2 seconds',
        'Galileo\'s discovery: Heavy and light objects fall at same rate in vacuum'
      ]
    },
    {
      title: 'Projectile Motion and Free Fall',
      content: 'When objects are thrown or launched, they follow a curved path called projectile motion. The vertical component of this motion is free fall under gravity.',
      examples: [
        'Horizontal motion: Constant velocity (no horizontal forces)',
        'Vertical motion: Free fall with acceleration g downward',
        'Path: Parabolic curve combining horizontal and vertical motions',
        'Examples: Thrown ball, fired cannonball, water from fountain',
        'Key insight: Horizontal and vertical motions are independent'
      ]
    },
    {
      title: 'Basics of Orbital Motion',
      content: 'Orbital motion occurs when an object moves around another object due to gravitational attraction. The orbiting object is in continuous free fall but never hits the central object because of its horizontal velocity.',
      examples: [
        'Definition: Circular or elliptical motion around a massive object',
        'Examples: Moon around Earth, Earth around Sun, satellites around Earth',
        'Key principle: Gravitational force provides centripetal force for circular motion',
        'Orbital velocity: Speed needed to maintain stable orbit at given altitude',
        'Higher orbit = slower speed: ISS orbits faster than geostationary satellites'
      ]
    },
    {
      title: 'Applications and Phenomena of Gravitation',
      content: 'Gravitational effects are visible in many natural phenomena and technological applications, from ocean tides to space exploration.',
      examples: [
        'Tides: Moon\'s gravity pulls ocean water, creating high and low tides',
        'Satellite communication: Geostationary satellites stay above same Earth location',
        'Space exploration: Gravity assists help spacecraft reach distant planets',
        'GPS systems: Must account for weaker gravity at satellite altitude',
        'Planetary rings: Gravitational forces shape and maintain ring systems',
        'Black holes: Extreme gravity where escape velocity exceeds speed of light'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the approximate value of acceleration due to gravity on Earth\'s surface?',
      options: ['9.8 m/s²', '6.67 m/s²', '10.8 m/s²', '8.9 m/s²'],
      correct: 0,
      explanation: 'The acceleration due to gravity on Earth\'s surface is approximately 9.8 m/s². This means any freely falling object accelerates at this rate regardless of its mass.'
    },
    {
      question: 'According to Newton\'s Law of Universal Gravitation, what happens to the gravitational force if the distance between two objects is doubled?',
      options: ['Force becomes half', 'Force becomes one-fourth', 'Force doubles', 'Force remains the same'],
      correct: 1,
      explanation: 'According to F = G(m₁m₂)/r², gravitational force is inversely proportional to the square of distance. If distance doubles, force becomes (1/2)² = 1/4 of the original value.'
    },
    {
      question: 'What is the main difference between mass and weight?',
      options: ['Mass varies with location, weight is constant', 'Weight varies with location, mass is constant', 'Both are measured in kilograms', 'There is no difference'],
      correct: 1,
      explanation: 'Mass is the amount of matter in an object and remains constant everywhere. Weight is the gravitational force on an object (W = mg) and varies with the strength of gravity at different locations.'
    },
    {
      question: 'A 60 kg person has a weight of approximately how many Newtons on Earth?',
      options: ['60 N', '600 N', '588 N', '6000 N'],
      correct: 2,
      explanation: 'Weight = mass × g = 60 kg × 9.8 m/s² = 588 N. Weight is calculated by multiplying mass by the acceleration due to gravity.'
    },
    {
      question: 'What happens to the value of g as you go higher above Earth\'s surface?',
      options: ['It increases', 'It decreases', 'It remains constant', 'It becomes negative'],
      correct: 1,
      explanation: 'The value of g decreases with height because gravitational force follows an inverse square law. As distance from Earth\'s center increases, gravitational acceleration decreases.'
    },
    {
      question: 'In free fall motion, what is true about the acceleration of different objects?',
      options: ['Heavy objects fall faster', 'Light objects fall faster', 'All objects have the same acceleration', 'Acceleration depends on shape'],
      correct: 2,
      explanation: 'In free fall (ignoring air resistance), all objects have the same acceleration due to gravity (g = 9.8 m/s²) regardless of their mass, as demonstrated by Galileo.'
    },
    {
      question: 'What provides the centripetal force for a satellite orbiting Earth?',
      options: ['Air resistance', 'Gravitational force', 'Magnetic force', 'Rocket engines'],
      correct: 1,
      explanation: 'Gravitational force between Earth and the satellite provides the centripetal force needed to keep the satellite in circular or elliptical orbit around Earth.'
    },
    {
      question: 'At what location would the acceleration due to gravity be zero?',
      options: ['At Earth\'s surface', 'At the top of Mount Everest', 'At the center of Earth', 'In space'],
      correct: 2,
      explanation: 'At Earth\'s center, the gravitational forces from all directions cancel out, resulting in zero net gravitational acceleration. The mass of Earth is distributed equally in all directions around this point.'
    },
    {
      question: 'What causes ocean tides on Earth?',
      options: ['Earth\'s rotation', 'Solar heating', 'Moon\'s gravitational pull', 'Underwater earthquakes'],
      correct: 2,
      explanation: 'Ocean tides are primarily caused by the gravitational pull of the Moon on Earth\'s oceans. The Moon\'s gravity is stronger on the side of Earth facing the Moon, creating bulges of water (high tides).'
    },
    {
      question: 'If an object is dropped from rest and falls for 3 seconds, what is its final velocity? (Use g = 10 m/s² for simplicity)',
      options: ['10 m/s', '20 m/s', '30 m/s', '90 m/s'],
      correct: 2,
      explanation: 'Using the equation v = gt for free fall from rest: v = (10 m/s²)(3 s) = 30 m/s. The object gains 10 m/s of speed each second during free fall.'
    }
  ]
}

export default function GravitationModule() {
  return (
    <ModuleLayout 
      module={gravitationModule} 
      grade={9} 
      subject="Science" 
    />
  )
}