import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const understandingQuadrilateralsModule: LearningModule = {
  title: 'Understanding Quadrilaterals',
  introduction: 'Welcome to the fascinating world of quadrilaterals! These four-sided shapes are everywhere around us - from the rectangular screens you use to the square tiles on floors. Understanding quadrilaterals will help you recognize patterns, solve geometric problems, and appreciate the mathematical beauty in everyday objects. Get ready to explore the amazing properties that make each type of quadrilateral unique!',
  concepts: [
    {
      title: 'Definition of Polygons and Quadrilaterals',
      content: 'A polygon is a closed figure made up of straight line segments. A quadrilateral is a special type of polygon that has exactly four sides, four vertices (corners), and four angles.',
      examples: [
        'Polygon examples: Triangle (3 sides), quadrilateral (4 sides), pentagon (5 sides)',
        'Quadrilateral requirements: Must be closed, have exactly 4 straight sides',
        'Real-world quadrilaterals: Windows, doors, books, picture frames, tablets',
        'Vertices are the corner points where two sides meet',
        'Each side connects two consecutive vertices'
      ]
    },
    {
      title: 'Angle Sum Property of Quadrilaterals',
      content: 'One of the most important properties of quadrilaterals is that the sum of all four interior angles is always 360°. This property holds true for any quadrilateral, regardless of its shape or size.',
      examples: [
        'Formula: ∠A + ∠B + ∠C + ∠D = 360° (for any quadrilateral ABCD)',
        'Example: If three angles are 90°, 120°, and 80°, the fourth angle is 360° - (90° + 120° + 80°) = 70°',
        'This property helps us find unknown angles in quadrilaterals',
        'Works for all types: squares, rectangles, parallelograms, trapeziums, etc.',
        'Can be proven by dividing any quadrilateral into two triangles'
      ]
    },
    {
      title: 'Parallelograms - Properties and Characteristics',
      content: 'A parallelogram is a quadrilateral where opposite sides are parallel and equal in length. This creates several important properties that make parallelograms very useful in geometry.',
      examples: [
        'Opposite sides are parallel: AB || DC and AD || BC',
        'Opposite sides are equal: AB = DC and AD = BC',
        'Opposite angles are equal: ∠A = ∠C and ∠B = ∠D',
        'Adjacent angles are supplementary: ∠A + ∠B = 180°',
        'Diagonals bisect each other (cut each other in half)'
      ]
    },
    {
      title: 'Rectangles - Special Parallelograms',
      content: 'A rectangle is a special type of parallelogram where all four angles are right angles (90°). This additional property gives rectangles unique characteristics while maintaining all parallelogram properties.',
      examples: [
        'All angles are 90°: ∠A = ∠B = ∠C = ∠D = 90°',
        'Opposite sides are equal and parallel (parallelogram property)',
        'Diagonals are equal in length: AC = BD',
        'Diagonals bisect each other at the center',
        'Common examples: Books, computer screens, doors, windows'
      ]
    },
    {
      title: 'Squares - The Most Regular Quadrilateral',
      content: 'A square is a special rectangle where all sides are equal in length. It combines the properties of both rectangles and rhombuses, making it the most regular quadrilateral.',
      examples: [
        'All sides are equal: AB = BC = CD = DA',
        'All angles are 90° (rectangle property)',
        'Diagonals are equal and bisect each other',
        'Diagonals are perpendicular to each other',
        'Examples: Chess boards, square tiles, Post-it notes, dice faces'
      ]
    },
    {
      title: 'Rhombus - Equal Sides, Special Properties',
      content: 'A rhombus is a parallelogram with all four sides equal in length. While the angles may not be 90°, the equal sides create special properties, especially with the diagonals.',
      examples: [
        'All sides are equal: AB = BC = CD = DA',
        'Opposite angles are equal (parallelogram property)',
        'Diagonals bisect each other at right angles (perpendicular)',
        'Diagonals bisect the vertex angles',
        'Examples: Diamond shapes, some floor tiles, kite-like shapes'
      ]
    },
    {
      title: 'Trapezium (Trapezoid) - One Pair of Parallel Sides',
      content: 'A trapezium has exactly one pair of parallel sides called bases. The other two sides are called legs. This creates unique properties different from parallelograms.',
      examples: [
        'One pair of parallel sides: AB || CD (bases)',
        'The other two sides (legs) are not parallel: AD and BC',
        'Angles between parallel sides and legs are supplementary',
        'Isosceles trapezium: legs are equal, base angles are equal',
        'Examples: Roof shapes, certain table tops, road signs'
      ]
    },
    {
      title: 'Kites - Two Pairs of Adjacent Equal Sides',
      content: 'A kite is a quadrilateral with two pairs of adjacent sides that are equal in length. This creates a distinctive shape with special diagonal properties.',
      examples: [
        'Two pairs of adjacent equal sides: AB = AD and CB = CD',
        'One diagonal bisects the other at right angles',
        'The axis of symmetry passes through two opposite vertices',
        'One pair of opposite angles are equal',
        'Examples: Flying kites, certain decorative shapes, some roof designs'
      ]
    },
    {
      title: 'Properties of Diagonals in Different Quadrilaterals',
      content: 'Each type of quadrilateral has unique diagonal properties. Understanding these helps identify and classify quadrilaterals and solve geometric problems.',
      examples: [
        'Parallelogram: Diagonals bisect each other',
        'Rectangle: Diagonals are equal and bisect each other',
        'Square: Diagonals are equal, bisect each other, and are perpendicular',
        'Rhombus: Diagonals bisect each other at right angles',
        'Kite: One diagonal bisects the other at right angles'
      ]
    },
    {
      title: 'Identifying and Classifying Quadrilaterals',
      content: 'To identify a quadrilateral type, look for key properties like parallel sides, equal sides, angle measures, and diagonal relationships. This systematic approach helps classify any quadrilateral correctly.',
      examples: [
        'Start with basic properties: Are any sides parallel? Are any sides equal?',
        'Check angles: Are any angles 90°? Are opposite angles equal?',
        'Examine diagonals: Are they equal? Do they bisect each other? Are they perpendicular?',
        'Use the most specific classification: A square is also a rectangle and rhombus',
        'Practice with real objects: Identify quadrilaterals in your environment'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the sum of all interior angles in any quadrilateral?',
      options: ['180°', '270°', '360°', '450°'],
      correct: 2,
      explanation: 'The sum of all interior angles in any quadrilateral is always 360°. This is a fundamental property that applies to all four-sided polygons.'
    },
    {
      question: 'Which property is true for ALL parallelograms?',
      options: ['All angles are 90°', 'All sides are equal', 'Opposite sides are parallel', 'Diagonals are equal'],
      correct: 2,
      explanation: 'In all parallelograms, opposite sides are parallel. This is the defining property of a parallelogram. Not all parallelograms have 90° angles or equal sides.'
    },
    {
      question: 'What makes a rectangle different from a general parallelogram?',
      options: ['Opposite sides are equal', 'Diagonals bisect each other', 'All angles are 90°', 'Opposite angles are equal'],
      correct: 2,
      explanation: 'A rectangle is a parallelogram with all angles equal to 90°. This additional property distinguishes rectangles from general parallelograms.'
    },
    {
      question: 'In a rhombus, what is special about the diagonals?',
      options: ['They are equal in length', 'They bisect each other at right angles', 'They are parallel to the sides', 'They have the same length as the sides'],
      correct: 1,
      explanation: 'In a rhombus, the diagonals bisect each other at right angles (perpendicular). This is a unique property of rhombuses.'
    },
    {
      question: 'How many pairs of parallel sides does a trapezium have?',
      options: ['0', '1', '2', '3'],
      correct: 1,
      explanation: 'A trapezium (trapezoid) has exactly one pair of parallel sides. If it had two pairs, it would be a parallelogram.'
    },
    {
      question: 'Which quadrilateral has ALL the following properties: all sides equal, all angles 90°, diagonals equal and perpendicular?',
      options: ['Rectangle', 'Rhombus', 'Square', 'Parallelogram'],
      correct: 2,
      explanation: 'A square has all sides equal, all angles 90°, and diagonals that are equal and perpendicular. It combines properties of both rectangles and rhombuses.'
    },
    {
      question: 'In a kite, which statement about the sides is correct?',
      options: ['All sides are equal', 'Opposite sides are equal', 'Two pairs of adjacent sides are equal', 'No sides are equal'],
      correct: 2,
      explanation: 'In a kite, there are two pairs of adjacent (consecutive) sides that are equal in length. This is the defining property of a kite.'
    },
    {
      question: 'If three angles of a quadrilateral are 85°, 95°, and 110°, what is the fourth angle?',
      options: ['60°', '70°', '80°', '90°'],
      correct: 1,
      explanation: 'Sum of angles = 360°. Fourth angle = 360° - (85° + 95° + 110°) = 360° - 290° = 70°.'
    },
    {
      question: 'Which property is unique to squares and does NOT apply to rectangles?',
      options: ['All angles are 90°', 'Diagonals are equal', 'All sides are equal', 'Opposite sides are parallel'],
      correct: 2,
      explanation: 'All sides being equal is unique to squares. Rectangles have all angles 90° and equal diagonals, but not necessarily equal sides.'
    },
    {
      question: 'What type of quadrilateral is formed when you connect the midpoints of any quadrilateral?',
      options: ['Rectangle', 'Rhombus', 'Parallelogram', 'Square'],
      correct: 2,
      explanation: 'When you connect the midpoints of the sides of any quadrilateral, you always get a parallelogram. This is known as Varignon\'s theorem.'
    }
  ]
}

export default function UnderstandingQuadrilateralsModule() {
  return (
    <ModuleLayout 
      module={understandingQuadrilateralsModule} 
      grade={8} 
      subject="Mathematics" 
    />
  )
}