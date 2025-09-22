import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const numberSystemsModule: LearningModule = {
  title: 'Number Systems',
  introduction: 'Welcome to the fascinating world of Number Systems! Numbers are like the building blocks of mathematics - they\'re everywhere around us, from counting your favorite songs to measuring the distance to stars. But did you know that numbers come in different families, each with their own special properties and characteristics? Just like how people belong to different communities, numbers belong to different systems that help us understand and work with them better. Get ready to explore this amazing numerical universe and discover how these number families work together to make mathematics both powerful and beautiful!',
  concepts: [
    {
      title: 'Natural Numbers - The Counting Champions',
      content: 'Natural numbers are the most basic numbers we use for counting. They start from 1 and go on forever: 1, 2, 3, 4, 5, ... These are the first numbers children learn and the foundation of all mathematics.',
      examples: [
        'Counting objects: 1 apple, 2 books, 3 friends, 4 pencils',
        'Set notation: N = {1, 2, 3, 4, 5, 6, ...}',
        'Used for: counting items, ranking positions, identifying quantities',
        'Natural numbers never include zero or negative numbers',
        'Examples in daily life: page numbers, house numbers, age in years'
      ]
    },
    {
      title: 'Whole Numbers - Natural Numbers Plus Zero',
      content: 'Whole numbers include all natural numbers plus zero. They represent the complete count of objects, including the possibility of having nothing at all. Think of zero as representing "empty" or "none".',
      examples: [
        'Set notation: W = {0, 1, 2, 3, 4, 5, 6, ...}',
        'Counting with zero: 0 cookies left, 1 cookie, 2 cookies, etc.',
        'Temperature readings: 0°C (freezing point), 1°C, 2°C, etc.',
        'Score in games: starting at 0 points, then 1, 2, 3 points',
        'Zero represents the absence of quantity but is still a number'
      ]
    },
    {
      title: 'Integers - Positive, Negative, and Zero',
      content: 'Integers include all whole numbers and their negative counterparts. They extend in both directions from zero on the number line, representing quantities that can be positive (above zero) or negative (below zero).',
      examples: [
        'Set notation: Z = {..., -3, -2, -1, 0, 1, 2, 3, ...}',
        'Temperature: -5°C (below freezing), 0°C (freezing), +10°C (above freezing)',
        'Elevation: -50m (below sea level), 0m (sea level), +100m (above sea level)',
        'Bank account: -$20 (debt), $0 (empty), +$50 (credit)',
        'Football yard lines: moving backwards (-5 yards) or forwards (+10 yards)'
      ]
    },
    {
      title: 'Rational Numbers - Numbers That Can Be Written as Fractions',
      content: 'Rational numbers are numbers that can be expressed as a fraction p/q, where p and q are integers and q ≠ 0. This includes all integers, fractions, and decimals that either terminate or repeat.',
      examples: [
        'Simple fractions: 1/2, 3/4, -2/5, 7/3',
        'Integers as fractions: 5 = 5/1, -3 = -3/1, 0 = 0/1',
        'Terminating decimals: 0.5 = 1/2, 0.75 = 3/4, 0.125 = 1/8',
        'Repeating decimals: 0.333... = 1/3, 0.666... = 2/3',
        'Mixed numbers: 2½ = 5/2, 3¼ = 13/4'
      ]
    },
    {
      title: 'Irrational Numbers - Numbers That Cannot Be Written as Simple Fractions',
      content: 'Irrational numbers cannot be expressed as a fraction of two integers. Their decimal representations are non-terminating and non-repeating, going on forever without any pattern.',
      examples: [
        'π (pi) ≈ 3.14159265... (ratio of circle circumference to diameter)',
        '√2 ≈ 1.41421356... (diagonal of a unit square)',
        '√3 ≈ 1.73205080... (cannot be simplified to a fraction)',
        'e ≈ 2.71828182... (Euler\'s number, used in advanced mathematics)',
        'Golden ratio φ ≈ 1.61803398... (found in nature and art)'
      ]
    },
    {
      title: 'Real Numbers - The Complete Number Family',
      content: 'Real numbers include both rational and irrational numbers. They represent all possible numbers that can be found on the number line, with no gaps between them. Every point on the number line corresponds to a real number.',
      examples: [
        'Real numbers = Rational numbers ∪ Irrational numbers',
        'Examples: -5, -1.5, 0, 0.5, 1, √2, π, 10',
        'Cover the entire number line with no gaps',
        'Used in measurements: length, weight, time, temperature',
        'Include all numbers we encounter in practical mathematics'
      ]
    },
    {
      title: 'Density Property - Numbers Are Packed Densely',
      content: 'The density property states that between any two real numbers, there are infinitely many other real numbers. No matter how close two numbers are, you can always find another number between them.',
      examples: [
        'Between 1 and 2: 1.5, 1.25, 1.75, 1.1, 1.9, etc.',
        'Between 0.1 and 0.2: 0.15, 0.11, 0.19, 0.125, etc.',
        'Even between 0.001 and 0.002: 0.0015, 0.0011, 0.0019',
        'This means the number line has no gaps - it\'s completely filled',
        'Helps explain why we can measure things to any desired precision'
      ]
    },
    {
      title: 'Decimal Representation of Numbers',
      content: 'Every real number can be represented as a decimal. Rational numbers have either terminating or repeating decimal representations, while irrational numbers have non-terminating, non-repeating decimals.',
      examples: [
        'Terminating: 1/4 = 0.25, 3/8 = 0.375, 7/20 = 0.35',
        'Repeating: 1/3 = 0.333..., 2/7 = 0.285714285714...',
        'Non-repeating: π = 3.14159..., √2 = 1.41421...',
        'Converting: To check if a fraction terminates, see if denominator has only factors of 2 and 5',
        'Notation: 0.333... can be written as 0.3̄ (bar over repeating digits)'
      ]
    },
    {
      title: 'Laws of Exponents for Real Numbers',
      content: 'Exponents follow specific laws that help us simplify expressions and solve problems. These rules work for all real numbers and make calculations much easier.',
      examples: [
        'Product rule: a^m × a^n = a^(m+n) → 2³ × 2² = 2⁵ = 32',
        'Quotient rule: a^m ÷ a^n = a^(m-n) → 3⁵ ÷ 3² = 3³ = 27',
        'Power rule: (a^m)^n = a^(mn) → (2³)² = 2⁶ = 64',
        'Zero exponent: a⁰ = 1 → 5⁰ = 1, (-3)⁰ = 1',
        'Negative exponent: a^(-n) = 1/a^n → 2^(-3) = 1/8'
      ]
    },
    {
      title: 'Visualization on the Number Line',
      content: 'The number line is a powerful tool for visualizing different number systems. Each point on the line represents a unique real number, and different number sets occupy specific regions or points.',
      examples: [
        'Natural numbers: dots at 1, 2, 3, 4, 5, ... (moving right)',
        'Whole numbers: includes the dot at 0, then 1, 2, 3, 4, ...',
        'Integers: dots extending in both directions: ..., -3, -2, -1, 0, 1, 2, 3, ...',
        'Rational numbers: densely packed throughout the line (fractions everywhere)',
        'Irrational numbers: fill in all the remaining gaps between rationals',
        'Real numbers: every single point on the continuous line'
      ]
    }
  ],
  mcqs: [
    {
      question: 'Which set of numbers does NOT include zero?',
      options: ['Natural numbers', 'Whole numbers', 'Integers', 'Rational numbers'],
      correct: 0,
      explanation: 'Natural numbers start from 1 and do not include zero. They are the basic counting numbers: 1, 2, 3, 4, 5, ...'
    },
    {
      question: 'What is the difference between whole numbers and natural numbers?',
      options: ['Whole numbers include negative numbers', 'Whole numbers include zero', 'Whole numbers include fractions', 'There is no difference'],
      correct: 1,
      explanation: 'Whole numbers include all natural numbers plus zero. So whole numbers are {0, 1, 2, 3, 4, ...} while natural numbers are {1, 2, 3, 4, ...}'
    },
    {
      question: 'Which of the following is an example of an integer that is NOT a whole number?',
      options: ['5', '0', '-3', '1'],
      correct: 2,
      explanation: '-3 is an integer (part of the set {..., -3, -2, -1, 0, 1, 2, 3, ...}) but not a whole number, since whole numbers only include 0 and positive integers.'
    },
    {
      question: 'Which number is rational?',
      options: ['π', '√2', '0.333...', '√5'],
      correct: 2,
      explanation: '0.333... = 1/3, which can be expressed as a fraction p/q where p and q are integers. This makes it a rational number. The others (π, √2, √5) are irrational.'
    },
    {
      question: 'What makes a number irrational?',
      options: ['It\'s negative', 'It cannot be expressed as a fraction p/q where p and q are integers', 'It\'s very large', 'It has a decimal point'],
      correct: 1,
      explanation: 'Irrational numbers cannot be expressed as a fraction of two integers. Their decimal representations are non-terminating and non-repeating.'
    },
    {
      question: 'What does the set of real numbers include?',
      options: ['Only rational numbers', 'Only irrational numbers', 'Both rational and irrational numbers', 'Only integers'],
      correct: 2,
      explanation: 'Real numbers include both rational and irrational numbers. They represent all possible numbers that can be found on the number line.'
    },
    {
      question: 'What does the density property of real numbers mean?',
      options: ['Numbers are heavy', 'Between any two real numbers, there are infinitely many other real numbers', 'Real numbers are closely packed', 'Numbers have weight'],
      correct: 1,
      explanation: 'The density property means that between any two real numbers, no matter how close, there are infinitely many other real numbers. This means there are no gaps on the number line.'
    },
    {
      question: 'Which decimal representation indicates an irrational number?',
      options: ['0.25', '0.333...', '3.14159...', '0.75'],
      correct: 2,
      explanation: '3.14159... (π) is non-terminating and non-repeating, which indicates an irrational number. The others either terminate or repeat, making them rational.'
    },
    {
      question: 'Using the laws of exponents, what is 2³ × 2⁴?',
      options: ['2⁷', '2¹²', '4⁷', '8⁴'],
      correct: 0,
      explanation: 'Using the product rule: a^m × a^n = a^(m+n), so 2³ × 2⁴ = 2^(3+4) = 2⁷ = 128.'
    },
    {
      question: 'On a number line, where would you find irrational numbers?',
      options: ['Only between integers', 'Only at specific marked points', 'Filling all the gaps between rational numbers', 'Only in negative regions'],
      correct: 2,
      explanation: 'Irrational numbers fill all the gaps between rational numbers on the number line. Together with rational numbers, they make up all real numbers and completely fill the number line.'
    }
  ]
}

export default function NumberSystemsModule() {
  return (
    <ModuleLayout 
      module={numberSystemsModule} 
      grade={9} 
      subject="Mathematics" 
    />
  )
}