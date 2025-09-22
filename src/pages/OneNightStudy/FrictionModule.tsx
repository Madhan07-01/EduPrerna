import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const frictionModule: LearningModule = {
  title: 'Friction',
  introduction: 'Welcome to the amazing world of Friction! Have you ever wondered why you can walk without slipping, why car brakes work, or why rubbing your hands together makes them warm? The answer is friction - a force that\'s both your friend and sometimes your challenge. Friction is everywhere around you, helping you grip things, stopping vehicles safely, and even allowing you to write with a pencil. Get ready to discover this incredible force that makes so many things in your daily life possible!',
  concepts: [
    {
      title: 'Fundamental Definition of Friction',
      content: 'Friction is a force that opposes motion when two surfaces are in contact with each other. It always acts in the opposite direction to the movement or intended movement of an object. Think of friction as nature\'s way of providing resistance between touching surfaces.',
      examples: [
        'When you walk, friction between your shoes and ground prevents slipping',
        'Rubbing your hands together creates friction that produces heat',
        'A book sliding across a table gradually slows down due to friction',
        'Car tires grip the road surface through friction to enable movement',
        'Friction always opposes motion - it never helps objects move faster'
      ]
    },
    {
      title: 'Static Friction - The Force That Prevents Movement',
      content: 'Static friction is the friction force that acts on objects that are not moving relative to each other. It prevents objects from starting to move and can vary in strength up to a maximum value before motion begins.',
      examples: [
        'A heavy box sitting on the floor stays put due to static friction',
        'Your pencil doesn\'t slide off a tilted desk because of static friction',
        'A car parked on a hill doesn\'t roll down due to static friction',
        'When you try to push a heavy object, static friction resists until you push hard enough',
        'Maximum static friction is usually greater than kinetic friction'
      ]
    },
    {
      title: 'Kinetic Friction - The Force During Movement',
      content: 'Kinetic friction, also called sliding friction, occurs when two surfaces are sliding past each other. It\'s usually less than static friction, which is why it\'s often easier to keep something moving than to start it moving.',
      examples: [
        'A book sliding across a table experiences kinetic friction',
        'Ice skating involves kinetic friction between skates and ice',
        'Sledding down a hill - the sled experiences kinetic friction with snow',
        'Erasing with a rubber eraser uses kinetic friction to remove pencil marks',
        'Kinetic friction remains roughly constant while objects are moving'
      ]
    },
    {
      title: 'Rolling Friction - The Gentle Resistance',
      content: 'Rolling friction occurs when a round object rolls over a surface. It\'s much smaller than static or kinetic friction, which is why wheels and balls are so useful for transportation and reducing effort.',
      examples: [
        'Bicycle wheels rolling on pavement experience rolling friction',
        'A basketball bouncing and rolling on the court',
        'Ball bearings in machines reduce friction by converting sliding to rolling',
        'Rolling a barrel is easier than dragging it due to lower rolling friction',
        'Car wheels are designed to minimize rolling friction for better fuel efficiency'
      ]
    },
    {
      title: 'Fluid Friction - Resistance in Liquids and Gases',
      content: 'Fluid friction, also called drag, occurs when objects move through liquids or gases. The faster the movement, the greater the fluid friction becomes. This type of friction is very important in designing vehicles and sports equipment.',
      examples: [
        'Swimming through water - you feel resistance from fluid friction',
        'Airplanes are designed with streamlined shapes to reduce air friction',
        'Parachutes use air friction to slow down falling objects',
        'Fish have streamlined bodies to move efficiently through water',
        'Cars have aerodynamic designs to reduce fuel consumption from air resistance'
      ]
    },
    {
      title: 'Factors Affecting Friction - What Makes the Difference',
      content: 'Several factors determine how much friction exists between two surfaces. Understanding these factors helps us predict and control friction in different situations.',
      examples: [
        'Surface roughness: Rough surfaces create more friction than smooth ones',
        'Normal force: Heavier objects press down more, creating more friction',
        'Type of materials: Rubber on concrete has more friction than ice on ice',
        'Area of contact doesn\'t affect friction (surprising but true!)',
        'Temperature can affect friction - cold tires have less grip than warm ones'
      ]
    },
    {
      title: 'Advantages of Friction - Our Helpful Friend',
      content: 'Friction provides many benefits that make our daily life possible and safe. Without friction, many simple tasks would become impossible or extremely dangerous.',
      examples: [
        'Walking and running - friction prevents us from slipping',
        'Vehicle brakes - friction stops cars, bikes, and trains safely',
        'Writing and drawing - friction between pencil and paper creates marks',
        'Holding objects - friction helps us grip things in our hands',
        'Nail and screw holding power - friction keeps them in place',
        'Lighting matches - friction creates the spark to start fire'
      ]
    },
    {
      title: 'Disadvantages of Friction - When It Becomes a Problem',
      content: 'While friction is often helpful, it can also cause problems by wasting energy, creating wear and tear, and making some tasks more difficult than necessary.',
      examples: [
        'Energy loss in machines - friction converts useful energy to waste heat',
        'Wear and tear - friction gradually damages moving parts',
        'Increased fuel consumption - cars use more fuel to overcome friction',
        'Heat generation - excessive friction can cause overheating and damage',
        'Reduced efficiency - friction makes machines work harder than necessary',
        'Difficulty in movement - heavy objects are hard to move due to friction'
      ]
    },
    {
      title: 'Methods for Reducing Friction - Making Things Smoother',
      content: 'Engineers and scientists have developed many clever ways to reduce friction when it\'s unwanted. These methods help machines work more efficiently and last longer.',
      examples: [
        'Lubrication: Oil and grease reduce friction between moving parts',
        'Ball bearings: Replace sliding friction with rolling friction',
        'Smooth surfaces: Polishing surfaces reduces roughness and friction',
        'Streamlining: Aerodynamic shapes reduce air friction',
        'Magnetic levitation: Magnets eliminate contact friction completely',
        'Teflon coating: Non-stick surfaces for cookware and machinery'
      ]
    },
    {
      title: 'Methods for Increasing Friction - When We Need More Grip',
      content: 'Sometimes we need more friction for safety and effectiveness. There are several practical ways to increase friction when and where we need it most.',
      examples: [
        'Tire treads: Grooved patterns increase friction between tires and road',
        'Sandpaper: Rough surface increases friction for sanding wood',
        'Salt on icy roads: Increases friction to prevent vehicles from slipping',
        'Rubber soles: Shoes with rubber soles provide better grip',
        'Chalk for gymnastics: Athletes use chalk to increase grip on equipment',
        'Anti-slip mats: Textured surfaces prevent slipping in bathrooms'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the fundamental definition of friction?',
      options: ['A force that helps objects move faster', 'A force that opposes motion between two surfaces in contact', 'A force that only acts on moving objects', 'A force that only exists in liquids'],
      correct: 1,
      explanation: 'Friction is a force that opposes motion when two surfaces are in contact with each other. It always acts in the opposite direction to the movement or intended movement.'
    },
    {
      question: 'Which type of friction prevents a stationary object from starting to move?',
      options: ['Kinetic friction', 'Static friction', 'Rolling friction', 'Fluid friction'],
      correct: 1,
      explanation: 'Static friction is the friction force that acts on objects that are not moving relative to each other. It prevents objects from starting to move until the applied force exceeds the maximum static friction.'
    },
    {
      question: 'What type of friction occurs when you slide a book across a table?',
      options: ['Static friction', 'Rolling friction', 'Kinetic friction', 'Fluid friction'],
      correct: 2,
      explanation: 'Kinetic friction (also called sliding friction) occurs when two surfaces are sliding past each other, like a book sliding across a table surface.'
    },
    {
      question: 'Which type of friction is generally the smallest?',
      options: ['Static friction', 'Kinetic friction', 'Rolling friction', 'All are equal'],
      correct: 2,
      explanation: 'Rolling friction is generally much smaller than static or kinetic friction, which is why wheels are so useful for transportation as they require less effort to move objects.'
    },
    {
      question: 'What type of friction do airplanes experience when flying through air?',
      options: ['Static friction', 'Kinetic friction', 'Rolling friction', 'Fluid friction'],
      correct: 3,
      explanation: 'Fluid friction (also called drag) occurs when objects move through liquids or gases. Airplanes experience air resistance, which is a type of fluid friction.'
    },
    {
      question: 'Which factor does NOT affect the amount of friction between two surfaces?',
      options: ['Surface roughness', 'Normal force (weight)', 'Area of contact', 'Type of materials'],
      correct: 2,
      explanation: 'Surprisingly, the area of contact does not affect friction. Friction depends on surface roughness, normal force, and material types, but not on how large the contact area is.'
    },
    {
      question: 'Which of the following is an advantage of friction?',
      options: ['It wastes energy in machines', 'It causes wear and tear', 'It allows us to walk without slipping', 'It reduces fuel efficiency'],
      correct: 2,
      explanation: 'Friction allows us to walk without slipping by providing grip between our shoes and the ground. This is one of the many beneficial aspects of friction in daily life.'
    },
    {
      question: 'What is a major disadvantage of friction in machinery?',
      options: ['It helps parts stay together', 'It converts useful energy to waste heat', 'It prevents slipping', 'It improves efficiency'],
      correct: 1,
      explanation: 'A major disadvantage of friction in machinery is that it converts useful mechanical energy into waste heat, reducing the efficiency of machines and causing energy loss.'
    },
    {
      question: 'Which method is commonly used to reduce friction in machine parts?',
      options: ['Adding sand', 'Using rough surfaces', 'Lubrication with oil', 'Increasing pressure'],
      correct: 2,
      explanation: 'Lubrication with oil or grease is a common method to reduce friction between moving machine parts by creating a smooth layer between surfaces.'
    },
    {
      question: 'Why do car tires have treaded patterns?',
      options: ['To make them look attractive', 'To reduce rolling friction', 'To increase friction with the road', 'To make them lighter'],
      correct: 2,
      explanation: 'Car tires have treaded patterns to increase friction with the road surface, providing better grip for acceleration, braking, and turning, especially in wet conditions.'
    }
  ]
}

export default function FrictionModule() {
  return (
    <ModuleLayout 
      module={frictionModule} 
      grade={8} 
      subject="Science" 
    />
  )
}