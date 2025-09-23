import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const motionModule: LearningModule = {
  title: 'Motion',
  introduction: 'Welcome to the fascinating world of Motion! Every moment of your life involves motion - from the beating of your heart to the planets orbiting the sun, from walking to school to rockets launching into space. Motion is everywhere around us, and understanding it helps us comprehend how our universe works! Whether it\'s a sprinter racing to the finish line, a car navigating through traffic, or a satellite orbiting Earth, the principles of motion govern all these amazing phenomena. Get ready to discover the science behind every movement and learn how physicists describe and predict motion with mathematical precision and elegance!',
  concepts: [
    {
      title: 'Types of Motion - Uniform and Non-Uniform',
      content: 'Motion can be classified based on how an object\'s speed changes over time. Understanding these types helps us analyze and predict how objects move in different situations.',
      examples: [
        'Uniform motion: Object covers equal distances in equal time intervals',
        'Example of uniform motion: A car moving at constant 60 km/h on a straight highway',
        'Non-uniform motion: Object covers unequal distances in equal time intervals',
        'Example of non-uniform motion: A car accelerating from rest or braking to stop',
        'Real-life: Most motion in nature is non-uniform (falling objects, walking, sports)'
      ]
    },
    {
      title: 'Distance vs Displacement - Path vs Position Change',
      content: 'Distance and displacement are related but fundamentally different concepts. Distance tells us how far an object traveled, while displacement tells us how far the object is from its starting point.',
      examples: [
        'Distance: Total length of path traveled (always positive, scalar quantity)',
        'Displacement: Shortest distance between initial and final positions (vector quantity)',
        'Example: Walking 100m east, then 60m west → Distance = 160m, Displacement = 40m east',
        'Round trip: Walk 50m to store and back → Distance = 100m, Displacement = 0m',
        'Displacement can be zero even when distance is not zero!'
      ]
    },
    {
      title: 'Speed vs Velocity - Rate vs Direction',
      content: 'Speed and velocity both describe how fast an object moves, but velocity also includes information about the direction of motion. This distinction is crucial in physics.',
      examples: [
        'Speed: Distance traveled per unit time (scalar) = Total distance / Total time',
        'Velocity: Displacement per unit time (vector) = Displacement / Time',
        'Example: Car travels 200km in 2 hours → Speed = 100 km/h',
        'Velocity example: Moving 50m north in 10s → Velocity = 5 m/s north',
        'Average vs instantaneous: Average considers total journey, instantaneous is at specific moment'
      ]
    },
    {
      title: 'Acceleration - The Rate of Change of Velocity',
      content: 'Acceleration describes how quickly an object\'s velocity changes. It occurs when an object speeds up, slows down, or changes direction, making it fundamental to understanding motion.',
      examples: [
        'Definition: Acceleration = Change in velocity / Time taken',
        'Formula: a = (v - u) / t, where v = final velocity, u = initial velocity',
        'Units: m/s² (meters per second squared)',
        'Positive acceleration: Object speeding up in direction of motion',
        'Negative acceleration (deceleration): Object slowing down',
        'Example: Car accelerates from 0 to 30 m/s in 10s → a = 3 m/s²'
      ]
    },
    {
      title: 'First Equation of Motion - Velocity-Time Relationship',
      content: 'The first equation of motion relates final velocity, initial velocity, acceleration, and time. It\'s one of the most fundamental equations in physics for analyzing motion.',
      examples: [
        'Equation: v = u + at',
        'Where: v = final velocity, u = initial velocity, a = acceleration, t = time',
        'Example: Car starts from rest (u = 0) with acceleration 2 m/s² for 5s',
        'Solution: v = 0 + (2)(5) = 10 m/s',
        'Use when: You know initial velocity, acceleration, and time'
      ]
    },
    {
      title: 'Second Equation of Motion - Position-Time Relationship',
      content: 'The second equation of motion relates displacement to initial velocity, acceleration, and time. It helps us find where an object will be at any given time.',
      examples: [
        'Equation: s = ut + ½at²',
        'Where: s = displacement, u = initial velocity, a = acceleration, t = time',
        'Example: Object with initial velocity 10 m/s and acceleration 2 m/s² after 3s',
        'Solution: s = (10)(3) + ½(2)(3)² = 30 + 9 = 39m',
        'Use when: You need to find displacement and know initial velocity, acceleration, and time'
      ]
    },
    {
      title: 'Third Equation of Motion - Velocity-Displacement Relationship',
      content: 'The third equation of motion connects final velocity, initial velocity, acceleration, and displacement without involving time. It\'s particularly useful when time is unknown.',
      examples: [
        'Equation: v² = u² + 2as',
        'Where: v = final velocity, u = initial velocity, a = acceleration, s = displacement',
        'Example: Car accelerates from 5 m/s to unknown speed over 100m with acceleration 1 m/s²',
        'Solution: v² = (5)² + 2(1)(100) = 25 + 200 = 225, so v = 15 m/s',
        'Use when: Time is not known or needed in the problem'
      ]
    },
    {
      title: 'Distance-Time Graphs - Visualizing Motion',
      content: 'Distance-time graphs provide a visual representation of how an object\'s position changes over time. The shape and slope of these graphs tell us important information about the motion.',
      examples: [
        'Horizontal line: Object at rest (no change in position)',
        'Straight sloped line: Uniform motion (constant speed)',
        'Steep slope: High speed, gentle slope: low speed',
        'Curved line: Non-uniform motion (changing speed)',
        'Slope of distance-time graph = speed of the object'
      ]
    },
    {
      title: 'Velocity-Time Graphs - Understanding Acceleration',
      content: 'Velocity-time graphs show how an object\'s velocity changes over time. They provide insights into acceleration and help us calculate displacement from the area under the curve.',
      examples: [
        'Horizontal line: Constant velocity (zero acceleration)',
        'Straight sloped line: Constant acceleration',
        'Positive slope: Positive acceleration (speeding up)',
        'Negative slope: Negative acceleration (slowing down)',
        'Area under velocity-time graph = displacement of the object'
      ]
    },
    {
      title: 'Relative Motion - Motion Depends on Reference Frame',
      content: 'Relative motion describes how the motion of one object appears when observed from another moving object. Understanding relative motion is crucial for analyzing real-world scenarios.',
      examples: [
        'Same direction: Relative velocity = v₁ - v₂ (appears slower)',
        'Opposite direction: Relative velocity = v₁ + v₂ (appears faster)',
        'Example: Car A at 80 km/h, Car B at 60 km/h in same direction → Relative velocity = 20 km/h',
        'Train example: Person walking at 5 km/h in train moving at 100 km/h → Speed relative to ground = 105 km/h',
        'Reference frame matters: Moon orbits Earth, but both orbit Sun'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What characterizes uniform motion?',
      options: ['Object changes direction frequently', 'Object covers equal distances in equal time intervals', 'Object accelerates constantly', 'Object moves in a circle'],
      correct: 1,
      explanation: 'Uniform motion is characterized by an object covering equal distances in equal time intervals, meaning it maintains constant speed in a straight line.'
    },
    {
      question: 'What is the main difference between distance and displacement?',
      options: ['Distance is always larger than displacement', 'Distance is a vector, displacement is a scalar', 'Distance is total path length, displacement is shortest distance between start and end points', 'There is no difference'],
      correct: 2,
      explanation: 'Distance is the total length of the path traveled (scalar), while displacement is the shortest distance between initial and final positions (vector).'
    },
    {
      question: 'A car travels 100 km north and then 60 km south. What are the distance and displacement?',
      options: ['Distance = 160 km, Displacement = 40 km north', 'Distance = 40 km, Displacement = 160 km', 'Distance = 160 km, Displacement = 160 km', 'Distance = 40 km, Displacement = 40 km'],
      correct: 0,
      explanation: 'Distance is the total path traveled: 100 + 60 = 160 km. Displacement is the net change in position: 100 - 60 = 40 km north.'
    },
    {
      question: 'What is the key difference between speed and velocity?',
      options: ['Speed is faster than velocity', 'Velocity includes direction, speed does not', 'Speed is measured in km/h, velocity in m/s', 'Speed is for cars, velocity is for planes'],
      correct: 1,
      explanation: 'Velocity includes both magnitude and direction (vector quantity), while speed only indicates how fast an object is moving (scalar quantity).'
    },
    {
      question: 'A car accelerates from 10 m/s to 30 m/s in 4 seconds. What is its acceleration?',
      options: ['5 m/s²', '10 m/s²', '20 m/s²', '2.5 m/s²'],
      correct: 0,
      explanation: 'Using a = (v - u)/t: a = (30 - 10)/4 = 20/4 = 5 m/s². Acceleration is the change in velocity divided by time taken.'
    },
    {
      question: 'Which equation of motion relates velocity, acceleration, and time?',
      options: ['s = ut + ½at²', 'v² = u² + 2as', 'v = u + at', 'a = (v - u)/t'],
      correct: 2,
      explanation: 'The first equation of motion, v = u + at, directly relates final velocity (v), initial velocity (u), acceleration (a), and time (t).'
    },
    {
      question: 'An object starts from rest and accelerates at 3 m/s² for 4 seconds. What distance does it cover?',
      options: ['12 m', '24 m', '6 m', '48 m'],
      correct: 1,
      explanation: 'Using s = ut + ½at² with u = 0 (starts from rest): s = 0 + ½(3)(4)² = ½(3)(16) = 24 m.'
    },
    {
      question: 'In a distance-time graph, what does the slope represent?',
      options: ['Acceleration', 'Displacement', 'Speed', 'Force'],
      correct: 2,
      explanation: 'The slope of a distance-time graph represents speed. A steeper slope indicates higher speed, while a horizontal line indicates the object is at rest.'
    },
    {
      question: 'In a velocity-time graph, what does the area under the curve represent?',
      options: ['Acceleration', 'Speed', 'Displacement', 'Distance'],
      correct: 2,
      explanation: 'The area under a velocity-time graph represents displacement. This is a fundamental principle in kinematics for analyzing motion graphically.'
    },
    {
      question: 'Two cars are moving in the same direction at 80 km/h and 60 km/h respectively. What is the relative velocity of the faster car with respect to the slower one?',
      options: ['140 km/h', '20 km/h', '80 km/h', '60 km/h'],
      correct: 1,
      explanation: 'For objects moving in the same direction, relative velocity = v₁ - v₂ = 80 - 60 = 20 km/h. The faster car appears to move at 20 km/h relative to the slower one.'
    }
  ]
}

export default function MotionModule() {
  return (
    <ModuleLayout 
      module={motionModule} 
      grade={9} 
      subject="Science" 
    />
  )
}