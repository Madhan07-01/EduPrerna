import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const lawsOfMotionModule: LearningModule = {
  title: 'Laws of Motion',
  introduction: 'Welcome to the fascinating world of Newton\'s Laws of Motion! These three fundamental principles, discovered by Sir Isaac Newton in the 17th century, explain why objects move the way they do. From the simple act of walking to the complex mechanics of spacecraft, everything follows these universal laws. Understanding these laws will help you comprehend the forces at work in everyday life and in advanced engineering applications. Get ready to explore how forces affect motion and discover the mathematical relationships that govern our physical world!',
  concepts: [
    {
      title: 'Definition and Unit of Force',
      content: 'Force is a push or pull that can change the state of motion of an object. It can make a stationary object move, stop a moving object, or change the direction of motion. Force is a vector quantity, meaning it has both magnitude and direction.',
      examples: [
        'Definition: Force is any interaction that, when unopposed, will change the motion of an object',
        'SI Unit: Newton (N) - Named after Sir Isaac Newton',
        '1 Newton = 1 kg × 1 m/s² (the force needed to accelerate 1 kg mass at 1 m/s²)',
        'Examples: Pushing a shopping cart (10-20N), gravitational force on 1kg object (9.8N)',
        'Measuring force: Using spring balances or force sensors in experiments'
      ]
    },
    {
      title: 'Newton\'s First Law of Motion - Law of Inertia',
      content: 'Newton\'s First Law states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. This property of objects to resist changes in their state of motion is called inertia.',
      examples: [
        'Statement: "An object continues in its state of rest or uniform motion in a straight line unless compelled to change that state by an external force"',
        'Real-life example: When a bus suddenly stops, passengers lurch forward due to their inertia',
        'Example: A book on a table remains at rest until you push it',
        'In space: A spacecraft continues moving at constant velocity even with engines off',
        'Application: Seat belts in cars prevent passengers from continuing forward motion during sudden stops'
      ]
    },
    {
      title: 'Newton\'s Second Law of Motion - F = ma',
      content: 'Newton\'s Second Law establishes the relationship between force, mass, and acceleration. It states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.',
      examples: [
        'Statement: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass"',
        'Mathematical formula: F = ma (Force = Mass × Acceleration)',
        'Example: Pushing an empty shopping cart vs. a full one - same force, different accelerations',
        'Car acceleration: More powerful engine (more force) = greater acceleration for same car (mass)',
        'Sports: Kicking a soccer ball harder (more force) = higher acceleration'
      ]
    },
    {
      title: 'Newton\'s Third Law of Motion - Action and Reaction',
      content: 'Newton\'s Third Law states that for every action, there is an equal and opposite reaction. These forces always act on different objects and occur simultaneously. The action and reaction forces are equal in magnitude but opposite in direction.',
      examples: [
        'Statement: "For every action, there is an equal and opposite reaction"',
        'Walking: You push the ground backward (action), ground pushes you forward (reaction)',
        'Rocket propulsion: Rocket pushes gases downward (action), gases push rocket upward (reaction)',
        'Swimming: You push water backward (action), water pushes you forward (reaction)',
        'Important note: Action and reaction forces act on different objects, so they don\'t cancel each other'
      ]
    },
    {
      title: 'Inertia and Its Relation to Mass',
      content: 'Inertia is the tendency of an object to resist changes in its state of motion. The greater the mass of an object, the greater its inertia. This means more massive objects are harder to start moving, stop, or change direction.',
      examples: [
        'Definition: Inertia is the resistance of any physical object to any change in its velocity',
        'Mass-inertia relationship: Direct proportion - more mass = more inertia',
        'Example: It\'s easier to push an empty bicycle than one with a person on it',
        'Truck vs. car: A heavy truck has more inertia than a small car, making it harder to start/stop',
        'Application: Heavy furniture is harder to move because of its greater inertia'
      ]
    },
    {
      title: 'Definition and Unit of Momentum',
      content: 'Momentum is a measurement involving mass in motion, capturing velocity. It\'s a vector quantity that describes the quantity of motion an object has. Momentum depends on both the mass and velocity of the object.',
      examples: [
        'Definition: Momentum is the product of an object\'s mass and its velocity',
        'Mathematical formula: p = mv (momentum = mass × velocity)',
        'SI Unit: kg⋅m/s (kilogram meter per second)',
        'Example: A truck moving at 20 m/s has more momentum than a bicycle at the same speed due to its greater mass',
        'Fast-moving bullet: Small mass but high velocity = significant momentum'
      ]
    },
    {
      title: 'Practical Applications of Laws of Motion',
      content: 'Newton\'s Laws of Motion have countless practical applications in our daily lives, technology, sports, and engineering. Understanding these applications helps us design better systems and predict how objects will behave.',
      examples: [
        'Vehicle safety: Airbags and crumple zones increase collision time to reduce force (F = Δp/Δt)',
        'Sports: Athletes lean forward when starting a race to apply greater force to the ground',
        'Space travel: Rockets work on Newton\'s Third Law - expelling gases creates forward thrust',
        'Construction: Engineers use force calculations to design stable buildings and bridges',
        'Everyday life: Tying shoelaces, hammering nails, and even walking all follow these laws'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the SI unit of force?',
      options: ['Joule (J)', 'Newton (N)', 'Watt (W)', 'Pascal (Pa)'],
      correct: 1,
      explanation: 'The SI unit of force is the Newton (N), named after Sir Isaac Newton. One Newton is defined as the force required to accelerate a mass of 1 kilogram at a rate of 1 meter per second squared.'
    },
    {
      question: 'Which law of motion is also known as the Law of Inertia?',
      options: ['Newton\'s Second Law', 'Newton\'s Third Law', 'Newton\'s First Law', 'Law of Conservation of Momentum'],
      correct: 2,
      explanation: 'Newton\'s First Law of Motion is also known as the Law of Inertia. It states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.'
    },
    {
      question: 'According to Newton\'s Second Law, what is the relationship between force, mass, and acceleration?',
      options: ['F = m/a', 'F = ma', 'F = a/m', 'F = m + a'],
      correct: 1,
      explanation: 'Newton\'s Second Law states that Force equals mass times acceleration (F = ma). This means that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.'
    },
    {
      question: 'What happens to the inertia of an object when its mass increases?',
      options: ['It decreases', 'It remains the same', 'It increases', 'It becomes zero'],
      correct: 2,
      explanation: 'Inertia is directly proportional to mass. As the mass of an object increases, its inertia also increases. This means that more massive objects have a greater tendency to resist changes in their state of motion.'
    },
    {
      question: 'Which of the following is the correct formula for momentum?',
      options: ['p = m/a', 'p = mv', 'p = ma', 'p = m + v'],
      correct: 1,
      explanation: 'Momentum (p) is calculated as the product of mass (m) and velocity (v), so p = mv. Momentum is a vector quantity that depends on both how much matter is moving and how fast it\'s moving.'
    },
    {
      question: 'According to Newton\'s Third Law, what is true about action and reaction forces?',
      options: ['They act on the same object', 'They are unequal in magnitude', 'They act on different objects', 'They cancel each other completely'],
      correct: 2,
      explanation: 'Newton\'s Third Law states that for every action, there is an equal and opposite reaction. These forces always act on different objects. While they are equal in magnitude and opposite in direction, they don\'t cancel each other because they act on different objects.'
    },
    {
      question: 'Why do passengers in a moving bus fall forward when the bus suddenly stops?',
      options: ['Due to gravity', 'Due to friction', 'Due to inertia', 'Due to momentum'],
      correct: 2,
      explanation: 'This happens due to inertia. When the bus is moving, passengers are also moving at the same speed. When the bus suddenly stops, the passengers\' bodies tend to continue moving forward due to their inertia, causing them to lurch forward.'
    },
    {
      question: 'Which of the following examples best demonstrates Newton\'s Third Law?',
      options: ['A ball rolling on the ground', 'A book lying on a table', 'A rocket launching into space', 'A car moving at constant speed'],
      correct: 2,
      explanation: 'A rocket launching into space is a perfect example of Newton\'s Third Law. The rocket pushes hot gases downward (action), and the gases push the rocket upward with an equal and opposite force (reaction), propelling the rocket forward.'
    },
    {
      question: 'If the mass of an object is doubled while the force acting on it remains constant, what happens to its acceleration?',
      options: ['It doubles', 'It halves', 'It remains the same', 'It quadruples'],
      correct: 1,
      explanation: 'According to Newton\'s Second Law (F = ma), if mass is doubled and force remains constant, acceleration must be halved to maintain the equality. Acceleration is inversely proportional to mass when force is constant.'
    },
    {
      question: 'Which quantity is a measure of the quantity of motion of a moving body?',
      options: ['Force', 'Energy', 'Momentum', 'Power'],
      correct: 2,
      explanation: 'Momentum is the measure of the quantity of motion of a moving body. It depends on both the mass of the object and its velocity. The greater the momentum, the harder it is to stop the object.'
    }
  ]
}

export default function LawsOfMotionModule() {
  return (
    <ModuleLayout 
      module={lawsOfMotionModule} 
      grade={11} 
      subject="Physics" 
    />
  )
}