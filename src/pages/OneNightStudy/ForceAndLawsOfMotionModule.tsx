import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const forceAndLawsOfMotionModule: LearningModule = {
  title: 'Force and Laws of Motion',
  introduction: 'Welcome to the incredible world of Force and Laws of Motion! Every movement around you - from kicking a soccer ball to rockets launching into space, from walking on the ground to planets orbiting the sun - follows the same fundamental principles discovered by Sir Isaac Newton over 300 years ago! These laws govern everything in our universe, from the tiniest particles to massive galaxies. Understanding force and motion helps us comprehend why things move the way they do and enables us to predict and control motion in amazing ways. Get ready to discover the universal rules that govern all motion and learn how these principles shape our daily lives and the technology around us!',
  concepts: [
    {
      title: 'Definition and Unit of Force',
      content: 'Force is a push or pull that can change the motion, shape, or direction of an object. It\'s an invisible action that produces visible results and is fundamental to understanding how objects interact with each other.',
      examples: [
        'Definition: Force is any interaction that changes or tends to change the motion of an object',
        'Unit: Newton (N), named after Sir Isaac Newton',
        '1 Newton = force needed to accelerate 1 kg mass by 1 m/s²',
        'Examples: Pushing a door (50N), gravity on 1kg object (10N), car engine force (5000N)',
        'Force is a vector quantity - it has both magnitude and direction'
      ]
    },
    {
      title: 'Types of Force - Contact and Non-Contact',
      content: 'Forces can be classified into two main categories based on whether objects need to touch each other for the force to act. Understanding these types helps us analyze different situations involving forces.',
      examples: [
        'Contact forces: Require physical contact between objects',
        'Examples of contact forces: Friction, normal force, tension, applied force',
        'Non-contact forces: Act without physical contact (action at a distance)',
        'Examples of non-contact forces: Gravitational, magnetic, electrostatic forces',
        'Real-life: Pushing a cart (contact) vs Earth pulling moon (non-contact)'
      ]
    },
    {
      title: 'Newton\'s First Law - The Law of Inertia',
      content: 'Newton\'s First Law states that an object at rest stays at rest, and an object in motion stays in motion with constant velocity, unless acted upon by an external force. This is also known as the law of inertia.',
      examples: [
        'Statement: "Every object continues in its state of rest or uniform motion unless acted upon by external force"',
        'At rest example: Book on table stays put until you push it',
        'In motion example: Hockey puck slides on ice until friction stops it',
        'Car example: Passengers jerk forward when car brakes suddenly',
        'Space example: Spacecraft continues moving even with engines off'
      ]
    },
    {
      title: 'Inertia and Its Relation to Mass',
      content: 'Inertia is the tendency of an object to resist changes in its motion. The amount of inertia an object has depends directly on its mass - more massive objects have greater inertia.',
      examples: [
        'Definition: Inertia is the resistance of an object to change in its motion',
        'Mass-inertia relationship: Greater mass = greater inertia',
        'Heavy truck vs bicycle: Truck is harder to start moving and harder to stop',
        'Bowling ball vs tennis ball: Bowling ball resists motion changes more',
        'Applications: Seat belts protect us from our own inertia during accidents'
      ]
    },
    {
      title: 'Newton\'s Second Law - Force, Mass, and Acceleration',
      content: 'Newton\'s Second Law quantifies the relationship between force, mass, and acceleration. It tells us exactly how much acceleration results from applying a given force to a given mass.',
      examples: [
        'Statement: "The acceleration of an object is directly proportional to the net force and inversely proportional to mass"',
        'Formula: F = ma (Force = mass × acceleration)',
        'Example: Applying 20N force to 4kg object gives acceleration of 5 m/s²',
        'Same force, different masses: 10N on 2kg gives 5 m/s², on 5kg gives 2 m/s²',
        'Applications: Car engines, rocket propulsion, sports activities'
      ]
    },
    {
      title: 'Newton\'s Third Law - Action and Reaction',
      content: 'Newton\'s Third Law states that for every action, there is an equal and opposite reaction. These action-reaction pairs always act on different objects and occur simultaneously.',
      examples: [
        'Statement: "For every action, there is an equal and opposite reaction"',
        'Walking: You push ground backward, ground pushes you forward',
        'Rocket propulsion: Gases expelled downward, rocket pushed upward',
        'Swimming: Push water backward, water pushes you forward',
        'Key point: Action and reaction forces act on different objects, never cancel each other'
      ]
    },
    {
      title: 'Momentum - Quantity of Motion',
      content: 'Momentum is the quantity of motion an object possesses. It depends on both the mass and velocity of the object, making it a crucial concept for understanding collisions and interactions.',
      examples: [
        'Definition: Momentum = mass × velocity (p = mv)',
        'Unit: kg⋅m/s (kilogram meter per second)',
        'Example: 5kg object moving at 10 m/s has momentum of 50 kg⋅m/s',
        'Heavy truck vs small car at same speed: Truck has much greater momentum',
        'Momentum is conserved in collisions (total momentum before = total momentum after)'
      ]
    },
    {
      title: 'Conservation of Momentum',
      content: 'The law of conservation of momentum states that in a closed system with no external forces, the total momentum remains constant. This principle helps us analyze collisions and explosions.',
      examples: [
        'Law: "Total momentum before collision = Total momentum after collision"',
        'Billiard balls: Moving ball hits stationary ball, momentum transfers',
        'Car crash: Both cars\' momenta combine to determine final motion',
        'Rocket stages: When stage separates, momentum is conserved',
        'Applications: Understanding crashes, designing safety systems, space exploration'
      ]
    },
    {
      title: 'Practical Applications of Newton\'s Laws',
      content: 'Newton\'s laws have countless practical applications in our daily lives, technology, and scientific endeavors. Understanding these applications helps us see the relevance of physics in the real world.',
      examples: [
        'Transportation: Car safety features like airbags and crumple zones',
        'Sports: Understanding projectile motion in basketball, soccer kicks',
        'Space exploration: Rocket design and satellite orbital mechanics',
        'Safety: Seat belts and helmets protect against sudden deceleration',
        'Engineering: Bridge design considering forces and structural integrity'
      ]
    },
    {
      title: 'Real-World Problem Solving with Force and Motion',
      content: 'Applying Newton\'s laws to solve real-world problems involves identifying forces, analyzing motion, and using mathematical relationships to predict outcomes and design solutions.',
      examples: [
        'Crash safety: Designing cars to extend collision time (F = ma, reduce a by increasing time)',
        'Athletic performance: Optimizing force application in throwing, jumping, running',
        'Transportation efficiency: Reducing friction and air resistance for better fuel economy',
        'Construction: Calculating forces in building structures and machinery',
        'Medical applications: Understanding forces on bones and joints during movement'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the SI unit of force?',
      options: ['Kilogram (kg)', 'Newton (N)', 'Meter per second (m/s)', 'Joule (J)'],
      correct: 1,
      explanation: 'The SI unit of force is Newton (N), named after Sir Isaac Newton. One Newton is the force required to accelerate a 1 kg mass by 1 m/s².'
    },
    {
      question: 'Which of the following is an example of a non-contact force?',
      options: ['Friction', 'Tension', 'Gravitational force', 'Normal force'],
      correct: 2,
      explanation: 'Gravitational force is a non-contact force that acts between objects without them physically touching. Friction, tension, and normal force all require physical contact.'
    },
    {
      question: 'What does Newton\'s First Law of Motion state?',
      options: ['F = ma', 'For every action there is an equal and opposite reaction', 'An object at rest stays at rest unless acted upon by an external force', 'Momentum is conserved'],
      correct: 2,
      explanation: 'Newton\'s First Law (Law of Inertia) states that an object at rest stays at rest, and an object in motion stays in motion with constant velocity, unless acted upon by an external force.'
    },
    {
      question: 'What property of an object determines its inertia?',
      options: ['Velocity', 'Acceleration', 'Mass', 'Force'],
      correct: 2,
      explanation: 'Mass determines an object\'s inertia. Objects with greater mass have greater inertia and resist changes in motion more than objects with smaller mass.'
    },
    {
      question: 'According to Newton\'s Second Law, if you double the force applied to an object while keeping its mass constant, what happens to its acceleration?',
      options: ['It stays the same', 'It doubles', 'It halves', 'It quadruples'],
      correct: 1,
      explanation: 'According to F = ma, if force doubles and mass stays constant, acceleration must double to maintain the equality. Force and acceleration are directly proportional.'
    },
    {
      question: 'What is the formula for calculating momentum?',
      options: ['p = ma', 'p = mv', 'p = F/t', 'p = m/v'],
      correct: 1,
      explanation: 'Momentum (p) equals mass (m) times velocity (v), so p = mv. Momentum depends on both how massive an object is and how fast it\'s moving.'
    },
    {
      question: 'When you walk forward, what provides the force that pushes you forward?',
      options: ['Your muscles pushing your body', 'The air pushing you forward', 'The ground pushing back on your feet', 'Gravity pulling you forward'],
      correct: 2,
      explanation: 'When you walk, you push backward on the ground with your feet. By Newton\'s Third Law, the ground pushes forward on your feet with equal force, propelling you forward.'
    },
    {
      question: 'In a collision between two objects, what is conserved?',
      options: ['Only kinetic energy', 'Only momentum', 'Both momentum and kinetic energy', 'Neither momentum nor kinetic energy'],
      correct: 1,
      explanation: 'In all collisions, momentum is conserved (total momentum before = total momentum after). Kinetic energy is only conserved in perfectly elastic collisions, which are rare in real life.'
    },
    {
      question: 'A 2 kg object is accelerating at 5 m/s². What is the net force acting on it?',
      options: ['2.5 N', '7 N', '10 N', '0.4 N'],
      correct: 2,
      explanation: 'Using Newton\'s Second Law: F = ma = (2 kg)(5 m/s²) = 10 N. The net force is 10 Newtons in the direction of acceleration.'
    },
    {
      question: 'Which example best demonstrates Newton\'s Third Law?',
      options: ['A book resting on a table', 'A car speeding up', 'A rocket propelling upward by expelling gases downward', 'A ball rolling down a hill'],
      correct: 2,
      explanation: 'A rocket demonstrates Newton\'s Third Law perfectly: the rocket exerts a downward force on the expelled gases (action), and the gases exert an equal and opposite upward force on the rocket (reaction).'
    }
  ]
}

export default function ForceAndLawsOfMotionModule() {
  return (
    <ModuleLayout 
      module={forceAndLawsOfMotionModule} 
      grade={9} 
      subject="Science" 
    />
  )
}