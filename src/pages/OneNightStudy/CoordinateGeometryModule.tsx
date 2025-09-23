import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const coordinateGeometryModule: LearningModule = {
  title: 'Coordinate Geometry',
  introduction: 'Welcome to the fascinating world of Coordinate Geometry! Imagine having a magical map where you can locate any point precisely using just two numbers - that\'s exactly what coordinate geometry gives us! Just like GPS helps you navigate to any location on Earth using coordinates, coordinate geometry helps us navigate the mathematical world with precision and elegance. From designing video games to planning cities, from creating computer graphics to solving real-world problems, coordinate geometry is the bridge between algebra and geometry. Get ready to discover how numbers and shapes dance together in perfect harmony on the coordinate plane!',
  concepts: [
    {
      title: 'The Cartesian Plane - Your Mathematical Map',
      content: 'The Cartesian plane is a two-dimensional surface formed by two perpendicular number lines that intersect at a point called the origin. It\'s named after René Descartes and provides a systematic way to locate any point using coordinates.',
      examples: [
        'X-axis: The horizontal number line extending left and right',
        'Y-axis: The vertical number line extending up and down',
        'Origin: The point (0, 0) where the x-axis and y-axis intersect',
        'Think of it like a city grid: streets run horizontally, avenues run vertically',
        'The axes divide the plane into four regions called quadrants'
      ]
    },
    {
      title: 'Coordinates - The Address of Every Point',
      content: 'Every point on the Cartesian plane has a unique address called coordinates, written as (x, y). The first number (x) tells us how far to move horizontally from the origin, and the second number (y) tells us how far to move vertically.',
      examples: [
        'Point (3, 2): Move 3 units right, then 2 units up',
        'Point (-4, 1): Move 4 units left, then 1 unit up',
        'Point (0, -3): Stay at origin horizontally, move 3 units down',
        'Point (5, 0): Move 5 units right, stay at origin vertically',
        'The order matters: (3, 2) is different from (2, 3)!'
      ]
    },
    {
      title: 'The Four Quadrants - Neighborhoods of the Plane',
      content: 'The coordinate plane is divided into four quadrants by the x and y axes. Each quadrant has a unique combination of positive and negative coordinate signs, helping us quickly identify the location of points.',
      examples: [
        'Quadrant I (top-right): Both x and y are positive (+, +)',
        'Quadrant II (top-left): x is negative, y is positive (-, +)',
        'Quadrant III (bottom-left): Both x and y are negative (-, -)',
        'Quadrant IV (bottom-right): x is positive, y is negative (+, -)',
        'Remember: Quadrants are numbered counterclockwise starting from the top-right'
      ]
    },
    {
      title: 'Signs of Coordinates in Each Quadrant',
      content: 'Understanding the signs of coordinates in each quadrant helps us quickly determine where a point lies and solve problems efficiently. The signs follow a predictable pattern based on the quadrant location.',
      examples: [
        'Quadrant I examples: (2, 3), (5, 1), (10, 7) - all positive',
        'Quadrant II examples: (-3, 4), (-1, 2), (-8, 5) - negative x, positive y',
        'Quadrant III examples: (-2, -3), (-6, -1), (-4, -9) - all negative',
        'Quadrant IV examples: (4, -2), (7, -5), (1, -8) - positive x, negative y',
        'Points on axes: (3, 0) on x-axis, (0, -4) on y-axis'
      ]
    },
    {
      title: 'Distance Formula - Measuring the Space Between Points',
      content: 'The Distance Formula helps us find the exact distance between any two points on the coordinate plane. It\'s based on the Pythagorean theorem and works like finding the hypotenuse of a right triangle.',
      examples: [
        'Formula: d = √[(x₂-x₁)² + (y₂-y₁)²]',
        'Distance between (1, 2) and (4, 6): d = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5',
        'Distance between (-2, 1) and (3, -2): d = √[(3-(-2))² + (-2-1)²] = √[25 + 9] = √34',
        'Think of it as the straight-line distance between two points',
        'Always gives a positive result (distance cannot be negative)'
      ]
    },
    {
      title: 'Midpoint Formula - Finding the Center Point',
      content: 'The Midpoint Formula helps us find the exact middle point between any two given points. It\'s like finding the balance point or the center of a line segment connecting two points.',
      examples: [
        'Formula: Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)',
        'Midpoint of (2, 4) and (8, 10): ((2+8)/2, (4+10)/2) = (5, 7)',
        'Midpoint of (-3, 1) and (5, -7): ((-3+5)/2, (1+(-7))/2) = (1, -3)',
        'Think of it as averaging the x-coordinates and y-coordinates separately',
        'Very useful in geometry for finding centers of shapes'
      ]
    },
    {
      title: 'Section Formula - Dividing Line Segments',
      content: 'The Section Formula helps us find the coordinates of a point that divides a line segment in a given ratio. It\'s like finding where to cut a rope to get specific proportions.',
      examples: [
        'Formula for ratio m:n: P = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n))',
        'Point dividing (1, 2) and (7, 8) in ratio 2:1: ((2×7+1×1)/(2+1), (2×8+1×2)/(2+1)) = (5, 6)',
        'For internal division: both parts of ratio are positive',
        'For external division: one part of ratio is negative',
        'Special case: midpoint is when ratio is 1:1'
      ]
    },
    {
      title: 'Understanding Ratios in Section Formula',
      content: 'When a point divides a line segment, the ratio tells us how the segment is split. Understanding this concept helps us solve many geometric problems involving proportional divisions.',
      examples: [
        'Ratio 2:3 means the first part is 2 units and second part is 3 units',
        'If total length is 10, ratio 2:3 gives parts of length 4 and 6',
        'Point closer to first endpoint has larger second ratio number',
        'Point closer to second endpoint has larger first ratio number',
        'Equal ratios (1:1) always give the midpoint'
      ]
    },
    {
      title: 'Condition for Collinearity - When Points Line Up',
      content: 'Three points are collinear if they all lie on the same straight line. We can check this using the area formula for triangles - if three points are collinear, they form a triangle with zero area.',
      examples: [
        'Area formula: Area = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|',
        'For collinear points: Area = 0',
        'Points (1, 2), (3, 4), and (5, 6) are collinear because they give area = 0',
        'Alternative: Check if slope between any two pairs is equal',
        'Real-life example: Three cities on the same highway are collinear'
      ]
    },
    {
      title: 'Real-World Applications of Coordinate Geometry',
      content: 'Coordinate geometry isn\'t just theoretical - it\'s everywhere in our modern world! From GPS navigation to computer graphics, from architecture to data analysis, coordinates help us solve practical problems.',
      examples: [
        'GPS and Maps: Every location has latitude and longitude coordinates',
        'Computer Graphics: Every pixel on screen has (x, y) coordinates',
        'Architecture: Building plans use coordinate systems for precise measurements',
        'Video Games: Characters move through coordinate-based virtual worlds',
        'Data Analysis: Scatter plots use coordinates to show relationships',
        'Robotics: Robots navigate using coordinate systems'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What are the coordinates of the origin in the Cartesian plane?',
      options: ['(1, 1)', '(0, 0)', '(-1, -1)', '(1, 0)'],
      correct: 1,
      explanation: 'The origin is the point where the x-axis and y-axis intersect, which is at coordinates (0, 0). It\'s the starting point for all coordinate measurements.'
    },
    {
      question: 'In which quadrant does the point (-3, 4) lie?',
      options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
      correct: 1,
      explanation: 'Point (-3, 4) has a negative x-coordinate and positive y-coordinate. This combination (-, +) places it in Quadrant II (top-left).'
    },
    {
      question: 'What are the signs of coordinates in Quadrant III?',
      options: ['(+, +)', '(-, +)', '(-, -)', '(+, -)'],
      correct: 2,
      explanation: 'Quadrant III is the bottom-left region where both x and y coordinates are negative, so the signs are (-, -).'
    },
    {
      question: 'What is the distance between points (0, 0) and (3, 4)?',
      options: ['5', '7', '12', '25'],
      correct: 0,
      explanation: 'Using the distance formula: d = √[(3-0)² + (4-0)²] = √[9 + 16] = √25 = 5. This is a classic 3-4-5 right triangle.'
    },
    {
      question: 'What is the midpoint of the line segment joining (2, 6) and (8, 2)?',
      options: ['(5, 4)', '(4, 5)', '(6, 8)', '(10, 8)'],
      correct: 0,
      explanation: 'Using the midpoint formula: ((2+8)/2, (6+2)/2) = (10/2, 8/2) = (5, 4). We average the x-coordinates and y-coordinates separately.'
    },
    {
      question: 'If a point divides the line segment joining (1, 3) and (7, 9) in the ratio 2:1, what are its coordinates?',
      options: ['(5, 7)', '(4, 6)', '(3, 5)', '(6, 8)'],
      correct: 0,
      explanation: 'Using section formula: ((2×7+1×1)/(2+1), (2×9+1×3)/(2+1)) = ((14+1)/3, (18+3)/3) = (15/3, 21/3) = (5, 7).'
    },
    {
      question: 'Which formula is used to check if three points are collinear?',
      options: ['Distance formula', 'Midpoint formula', 'Area of triangle formula', 'Section formula'],
      correct: 2,
      explanation: 'To check collinearity, we use the area of triangle formula. If three points are collinear, they form a triangle with zero area.'
    },
    {
      question: 'In the coordinate (x, y), what does the first number represent?',
      options: ['Vertical distance from origin', 'Horizontal distance from origin', 'Distance from y-axis', 'Distance from x-axis'],
      correct: 1,
      explanation: 'In coordinates (x, y), the first number (x) represents the horizontal distance from the origin - how far to move left or right.'
    },
    {
      question: 'If points A(1, 2), B(3, 4), and C(5, 6) are given, what can you conclude?',
      options: ['They form a right triangle', 'They are collinear', 'They form an equilateral triangle', 'They are in different quadrants'],
      correct: 1,
      explanation: 'These points are collinear because they all lie on the same straight line. You can verify this by checking that the area of triangle ABC equals zero.'
    },
    {
      question: 'What is the distance between points (a, b) and (a, c) where b ≠ c?',
      options: ['|c - b|', '|a - b|', '|a - c|', '√[(a-b)² + (c-a)²]'],
      correct: 0,
      explanation: 'Since both points have the same x-coordinate (a), they lie on a vertical line. The distance is simply the absolute difference of their y-coordinates: |c - b|.'
    }
  ]
}

export default function CoordinateGeometryModule() {
  return (
    <ModuleLayout 
      module={coordinateGeometryModule} 
      grade={9} 
      subject="Mathematics" 
    />
  )
}