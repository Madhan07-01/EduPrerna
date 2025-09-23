import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const rationalNumbersModule: LearningModule = {
  title: 'Rational Numbers',
  introduction: 'Welcome to the exciting world of rational numbers! These special numbers are all around us - from fractions in cooking recipes to decimals in sports statistics. Rational numbers include all the numbers you can write as fractions, and they follow amazing mathematical rules that make calculations predictable and beautiful. Get ready to master these fundamental building blocks of algebra!',
  concepts: [
    {
      title: 'Definition and Examples of Rational Numbers',
      content: 'A rational number is any number that can be expressed as a fraction p/q, where p and q are integers and q ≠ 0. The word "rational" comes from "ratio," which means a comparison between two quantities.',
      examples: [
        'Positive fractions: 3/4, 7/5, 15/8 (all rational numbers)',
        'Negative fractions: -2/3, -5/7, -11/4 (all rational numbers)',
        'Whole numbers: 5 = 5/1, -3 = -3/1, 0 = 0/1 (all rational)',
        'Decimals that terminate: 0.25 = 1/4, 0.75 = 3/4',
        'Decimals that repeat: 0.333... = 1/3, 0.666... = 2/3'
      ]
    },
    {
      title: 'Identifying Non-Rational (Irrational) Numbers',
      content: 'Not all numbers are rational! Irrational numbers cannot be written as simple fractions. Understanding what makes a number irrational helps us better appreciate rational numbers.',
      examples: [
        'Square roots of non-perfect squares: √2, √3, √5 (cannot be written as fractions)',
        'π (pi) ≈ 3.14159... (decimal never repeats or terminates)',
        'e ≈ 2.71828... (Euler\'s number, used in advanced mathematics)',
        'Non-repeating, non-terminating decimals are irrational',
        'Perfect square roots ARE rational: √4 = 2 = 2/1, √9 = 3 = 3/1'
      ]
    },
    {
      title: 'Fundamental Properties of Rational Numbers',
      content: 'Rational numbers follow four important properties that make mathematical operations predictable and reliable. These properties are the foundation of algebra.',
      examples: [
        'Closure: Adding/multiplying rational numbers always gives a rational number',
        'Commutative: a + b = b + a and a × b = b × a (order doesn\'t matter)',
        'Associative: (a + b) + c = a + (b + c) and (a × b) × c = a × (b × c)',
        'Distributive: a × (b + c) = (a × b) + (a × c)',
        'These properties work for all rational numbers, positive and negative'
      ]
    },
    {
      title: 'Representing Rational Numbers on a Number Line',
      content: 'Number lines help us visualize rational numbers and understand their relationships. Every rational number has a unique position on the number line.',
      examples: [
        'Mark zero in the center, positive numbers to the right, negative to the left',
        'Divide each unit into equal parts to show fractions: 1/2 is halfway between 0 and 1',
        'Mixed numbers: 2¾ is between 2 and 3, specifically 3/4 of the way from 2 to 3',
        'Negative fractions: -1/2 is halfway between -1 and 0',
        'Decimals: 1.25 = 1¼ is 1/4 of the way from 1 to 2'
      ]
    },
    {
      title: 'Standard Form of a Rational Number',
      content: 'The standard form of a rational number is p/q where p and q have no common factors other than 1, and q is positive. This is the simplest way to write any rational number.',
      examples: [
        'Simplify by finding GCD: 12/18 = 2/3 (divide both by 6)',
        'Make denominator positive: 3/(-4) = -3/4 (move negative to numerator)',
        'Standard form of -15/-20 = 15/20 = 3/4 (both steps applied)',
        'Whole numbers: 7 = 7/1 (already in standard form)',
        'Zero: 0 = 0/1 (standard form of zero)'
      ]
    },
    {
      title: 'Comparing Rational Numbers',
      content: 'To compare rational numbers, we can use several methods depending on the situation. The key is to make meaningful comparisons between numerators and denominators.',
      examples: [
        'Same denominators: Compare numerators directly (2/5 < 3/5)',
        'Cross multiplication: For a/b and c/d, if a×d < b×c, then a/b < c/d',
        'Convert to decimals: 3/4 = 0.75 and 4/5 = 0.8, so 3/4 < 4/5',
        'Common denominators: 2/3 = 8/12 and 3/4 = 9/12, so 2/3 < 3/4',
        'Number line: Numbers to the right are always greater'
      ]
    },
    {
      title: 'Addition and Subtraction of Rational Numbers',
      content: 'Adding and subtracting rational numbers requires finding common denominators. The sign rules for integers also apply to rational numbers.',
      examples: [
        'Same denominators: 2/7 + 3/7 = 5/7, 5/8 - 2/8 = 3/8',
        'Different denominators: 1/3 + 1/4 = 4/12 + 3/12 = 7/12',
        'Mixed numbers: 2⅓ + 1¼ = 2 4/12 + 1 3/12 = 3 7/12',
        'Subtracting: 3/5 - 2/3 = 9/15 - 10/15 = -1/15',
        'Adding negatives: -2/3 + (-1/4) = -8/12 + (-3/12) = -11/12'
      ]
    },
    {
      title: 'Multiplication of Rational Numbers',
      content: 'Multiplying rational numbers is straightforward: multiply numerators together and denominators together. Signs follow the same rules as integer multiplication.',
      examples: [
        'Basic multiplication: 2/3 × 4/5 = 8/15',
        'Cross-canceling: 6/8 × 4/9 = (6×4)/(8×9) = 24/72 = 1/3',
        'With whole numbers: 3 × 2/5 = 6/5 = 1⅕',
        'Negative numbers: (-2/3) × (4/5) = -8/15',
        'Two negatives: (-3/4) × (-2/7) = 6/28 = 3/14'
      ]
    },
    {
      title: 'Division of Rational Numbers',
      content: 'Dividing rational numbers means multiplying by the reciprocal. The reciprocal of a/b is b/a. Remember: "Keep, Change, Flip."',
      examples: [
        'Basic division: 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6',
        'Dividing by whole number: 3/4 ÷ 2 = 3/4 × 1/2 = 3/8',
        'Whole number divided by fraction: 6 ÷ 2/3 = 6 × 3/2 = 18/2 = 9',
        'With negatives: (-4/5) ÷ (2/3) = (-4/5) × (3/2) = -12/10 = -6/5',
        'Mixed numbers: 2½ ÷ 1¼ = 5/2 ÷ 5/4 = 5/2 × 4/5 = 20/10 = 2'
      ]
    },
    {
      title: 'Real-World Applications and Problem Solving',
      content: 'Rational numbers appear everywhere in real life. Understanding how to work with them helps solve practical problems involving measurements, money, time, and proportions.',
      examples: [
        'Cooking: Recipe calls for ¾ cup flour, but you want to make 1⅓ times the recipe',
        'Sports: Basketball player makes 7 out of 12 free throws = 7/12 ≈ 58.3%',
        'Money: You spend 2/5 of your allowance on lunch and 1/4 on a movie',
        'Time: It takes 2¾ hours to complete a project, you\'ve worked for 1⅝ hours',
        'Measurements: Board is 8⅝ feet long, you need pieces that are 2¼ feet each'
      ]
    }
  ],
  mcqs: [
    {
      question: 'Which of the following is NOT a rational number?',
      options: ['-3/4', '√16', '√7', '0.25'],
      correct: 2,
      explanation: '√7 is irrational because 7 is not a perfect square. √16 = 4 is rational, -3/4 is rational, and 0.25 = 1/4 is rational.'
    },
    {
      question: 'What is the standard form of -12/18?',
      options: ['-12/18', '-2/3', '2/-3', '12/-18'],
      correct: 1,
      explanation: 'To find standard form, simplify by dividing both numerator and denominator by their GCD (6): -12÷6 = -2 and 18÷6 = 3, giving -2/3.'
    },
    {
      question: 'Which property is demonstrated by: 2/3 + 4/5 = 4/5 + 2/3?',
      options: ['Closure property', 'Commutative property', 'Associative property', 'Distributive property'],
      correct: 1,
      explanation: 'The commutative property states that changing the order of addition doesn\'t change the result: a + b = b + a.'
    },
    {
      question: 'Compare 3/4 and 5/6. Which is correct?',
      options: ['3/4 > 5/6', '3/4 < 5/6', '3/4 = 5/6', 'Cannot be determined'],
      correct: 1,
      explanation: 'Using cross multiplication: 3×6 = 18 and 4×5 = 20. Since 18 < 20, we have 3/4 < 5/6.'
    },
    {
      question: 'What is 2/5 + 3/7?',
      options: ['5/12', '5/35', '29/35', '1/35'],
      correct: 2,
      explanation: 'Find LCD of 5 and 7, which is 35. Convert: 2/5 = 14/35 and 3/7 = 15/35. Add: 14/35 + 15/35 = 29/35.'
    },
    {
      question: 'What is (-2/3) × (4/5)?',
      options: ['8/15', '-8/15', '6/8', '-6/8'],
      correct: 1,
      explanation: 'Multiply numerators and denominators: (-2×4)/(3×5) = -8/15. Negative times positive equals negative.'
    },
    {
      question: 'What is 3/4 ÷ 2/3?',
      options: ['6/12', '9/8', '2/12', '1/2'],
      correct: 1,
      explanation: 'To divide, multiply by the reciprocal: 3/4 ÷ 2/3 = 3/4 × 3/2 = 9/8.'
    },
    {
      question: 'On a number line, where would you place -3/2?',
      options: ['Between -2 and -1', 'Between -1 and 0', 'Between 0 and 1', 'Between 1 and 2'],
      correct: 0,
      explanation: '-3/2 = -1.5, which is exactly halfway between -2 and -1 on the number line.'
    },
    {
      question: 'Which rational number equals 0.6?',
      options: ['6/10', '3/5', '60/100', 'All of the above'],
      correct: 3,
      explanation: 'All are correct: 6/10 = 3/5 = 60/100 = 0.6. These are all equivalent fractions representing the same rational number.'
    },
    {
      question: 'What is 2¾ - 1⅝?',
      options: ['1⅛', '1⅝', '1⅜', '1¼'],
      correct: 0,
      explanation: 'Convert to improper fractions: 2¾ = 11/4 and 1⅝ = 13/8. Find common denominator: 22/8 - 13/8 = 9/8 = 1⅛.'
    }
  ]
}

export default function RationalNumbersModule() {
  return (
    <ModuleLayout 
      module={rationalNumbersModule} 
      grade={8} 
      subject="Mathematics" 
    />
  )
}