import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const integersModule: LearningModule = {
  title: 'Integers',
  introduction: 'Welcome to the world of integers! Integers are whole numbers that can be positive, negative, or zero. They help us understand quantities that can go in opposite directions, like temperature above and below freezing, or money earned and spent.',
  concepts: [
    {
      title: 'Representation on a Number Line',
      content: 'A number line helps us visualize integers. Zero is in the middle, positive numbers go to the right, and negative numbers go to the left.',
      examples: [
        'Draw a horizontal line with arrows on both ends',
        'Mark zero (0) in the middle',
        'Mark positive numbers to the right: 1, 2, 3, 4...',
        'Mark negative numbers to the left: -1, -2, -3, -4...',
        'The distance between any two consecutive integers is always 1 unit'
      ]
    },
    {
      title: 'Absolute Value',
      content: 'The absolute value of a number is its distance from zero on the number line, regardless of direction. It\'s always positive or zero.',
      examples: [
        '|5| = 5 (5 units from zero)',
        '|-5| = 5 (5 units from zero)',
        '|0| = 0 (zero is at zero)',
        '|-10| = 10 (10 units from zero)',
        'Think of it as "how far" without caring about direction'
      ]
    },
    {
      title: 'Comparing and Ordering Integers',
      content: 'When comparing integers, remember: numbers to the right on the number line are greater than numbers to the left.',
      examples: [
        '5 > 3 (5 is to the right of 3)',
        '-2 > -5 (-2 is to the right of -5)',
        '0 > -3 (0 is to the right of -3)',
        'Ordering from least to greatest: -5, -2, 0, 3, 5',
        'Ordering from greatest to least: 5, 3, 0, -2, -5'
      ]
    },
    {
      title: 'Operations on Integers - Addition',
      content: 'Adding integers: Same signs add and keep the sign, different signs subtract and keep the sign of the larger number.',
      examples: [
        'Same signs: 5 + 3 = 8, -5 + (-3) = -8',
        'Different signs: 5 + (-3) = 2, -5 + 3 = -2',
        'With zero: 5 + 0 = 5, -5 + 0 = -5',
        'Real example: Temperature rose 3°C from -2°C: -2 + 3 = 1°C'
      ]
    },
    {
      title: 'Operations on Integers - Subtraction',
      content: 'Subtracting integers: Change subtraction to addition of the opposite, then follow addition rules.',
      examples: [
        '5 - 3 = 5 + (-3) = 2',
        '5 - (-3) = 5 + 3 = 8',
        '-5 - 3 = -5 + (-3) = -8',
        '-5 - (-3) = -5 + 3 = -2',
        'Real example: Temperature dropped 4°C from 2°C: 2 - 4 = 2 + (-4) = -2°C'
      ]
    },
    {
      title: 'Operations on Integers - Multiplication',
      content: 'Multiplying integers: Same signs give positive, different signs give negative.',
      examples: [
        'Same signs: 3 × 4 = 12, (-3) × (-4) = 12',
        'Different signs: 3 × (-4) = -12, (-3) × 4 = -12',
        'With zero: 5 × 0 = 0, (-5) × 0 = 0',
        'Real example: Losing 3 points per wrong answer for 4 wrong answers: (-3) × 4 = -12 points'
      ]
    },
    {
      title: 'Operations on Integers - Division',
      content: 'Dividing integers: Same signs give positive, different signs give negative.',
      examples: [
        'Same signs: 12 ÷ 3 = 4, (-12) ÷ (-3) = 4',
        'Different signs: 12 ÷ (-3) = -4, (-12) ÷ 3 = -4',
        'With zero: 0 ÷ 5 = 0 (but 5 ÷ 0 is undefined!)',
        'Real example: Sharing -15 points equally among 3 people: (-15) ÷ 3 = -5 points each'
      ]
    },
    {
      title: 'Properties of Integer Operations',
      content: 'Integers follow important properties that make calculations easier.',
      examples: [
        'Commutative Property: 3 + 5 = 5 + 3, 3 × 5 = 5 × 3',
        'Associative Property: (2 + 3) + 4 = 2 + (3 + 4)',
        'Distributive Property: 3 × (2 + 4) = 3 × 2 + 3 × 4',
        'Identity Property: 5 + 0 = 5, 5 × 1 = 5',
        'These properties work with negative numbers too!'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the absolute value of -7?',
      options: ['-7', '7', '0', '14'],
      correct: 1,
      explanation: 'The absolute value of -7 is 7 because it is 7 units away from zero on the number line, regardless of direction.'
    },
    {
      question: 'Which is greater: -5 or -2?',
      options: ['-5', '-2', 'They are equal', 'Cannot be determined'],
      correct: 1,
      explanation: '-2 is greater than -5 because -2 is to the right of -5 on the number line.'
    },
    {
      question: 'What is 8 + (-3)?',
      options: ['11', '5', '-5', '-11'],
      correct: 1,
      explanation: '8 + (-3) = 5. When adding integers with different signs, subtract the smaller absolute value from the larger one and keep the sign of the number with the larger absolute value.'
    },
    {
      question: 'What is (-4) × 6?',
      options: ['24', '-24', '10', '-10'],
      correct: 1,
      explanation: '(-4) × 6 = -24. When multiplying integers with different signs, the result is negative.'
    },
    {
      question: 'What is 15 ÷ (-3)?',
      options: ['5', '-5', '45', '-45'],
      correct: 1,
      explanation: '15 ÷ (-3) = -5. When dividing integers with different signs, the result is negative.'
    }
  ]
}

export default function IntegersModule() {
  return (
    <ModuleLayout 
      module={integersModule} 
      grade={6} 
      subject="Mathematics" 
    />
  )
}