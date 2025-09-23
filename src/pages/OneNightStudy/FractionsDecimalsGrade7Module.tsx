import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const fractionsDecimalsGrade7Module: LearningModule = {
  title: 'Fractions and Decimals',
  introduction: 'Welcome to the comprehensive world of fractions and decimals for 7th grade! Building on what you learned before, we\'ll now explore more advanced concepts like different types of fractions, complex operations, and real-world applications. These skills are essential for algebra, geometry, and everyday problem-solving. Let\'s master these concepts together!',
  concepts: [
    {
      title: 'Types of Fractions: Proper, Improper, Mixed, Like, and Unlike',
      content: 'Understanding different types of fractions helps us choose the best methods for solving problems. Each type has unique characteristics and uses in mathematics.',
      examples: [
        'Proper fractions: numerator < denominator (3/5, 7/8, 2/9)',
        'Improper fractions: numerator ≥ denominator (5/3, 8/5, 11/4)',
        'Mixed numbers: whole number + proper fraction (2¾, 1⅝, 5⅓)',
        'Like fractions: same denominators (2/7, 3/7, 5/7)',
        'Unlike fractions: different denominators (1/3, 2/5, 3/8)'
      ]
    },
    {
      title: 'Converting Between Improper Fractions and Mixed Numbers',
      content: 'Converting between these forms is essential for fraction operations. Improper fractions are better for calculations, while mixed numbers are easier to visualize.',
      examples: [
        'Improper to mixed: 11/4 = 2¾ (divide: 11 ÷ 4 = 2 remainder 3)',
        'Mixed to improper: 3⅖ = 17/5 (multiply: 3 × 5 + 2 = 17)',
        '13/6 = 2⅙ (13 ÷ 6 = 2 remainder 1)',
        '4⅔ = 14/3 (4 × 3 + 2 = 14)',
        'Always check your work by converting back!'
      ]
    },
    {
      title: 'Addition and Subtraction Rules for Fractions',
      content: 'Adding and subtracting fractions requires finding common denominators. The key is making denominators the same while keeping fractions equivalent.',
      examples: [
        'Like fractions: 3/8 + 2/8 = 5/8 (add numerators, keep denominator)',
        'Unlike fractions: 1/3 + 1/4 = 4/12 + 3/12 = 7/12',
        'Mixed numbers: 2⅓ + 1¼ = 2 4/12 + 1 3/12 = 3 7/12',
        'Subtraction: 5/6 - 2/9 = 15/18 - 4/18 = 11/18',
        'Sometimes you need to borrow: 3¼ - 1¾ = 2 5/4 - 1¾ = 1½'
      ]
    },
    {
      title: 'Multiplication Techniques for Fractions',
      content: 'Multiplying fractions is straightforward: multiply numerators together and denominators together. Simplifying before multiplying can make calculations easier.',
      examples: [
        'Basic multiplication: 2/3 × 4/5 = 8/15',
        'Cross-canceling: 2/3 × 9/4 = 2×9/3×4 = 18/12 = 3/2',
        'With whole numbers: 3 × 2/7 = 6/7',
        'Mixed numbers: 2½ × 1⅓ = 5/2 × 4/3 = 20/6 = 3⅓',
        'Cross-cancel first: 6/8 × 4/9 = 6×4/8×9 = 24/72 = 1/3'
      ]
    },
    {
      title: 'Division Techniques for Fractions',
      content: 'Dividing fractions uses the "multiply by reciprocal" rule. Flip the second fraction and multiply instead of dividing.',
      examples: [
        'Basic division: 3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8',
        'With whole numbers: 6 ÷ 2/3 = 6 × 3/2 = 18/2 = 9',
        'Mixed numbers: 2¼ ÷ 1½ = 9/4 ÷ 3/2 = 9/4 × 2/3 = 18/12 = 3/2',
        'Remember: "Keep, Change, Flip" (keep first, change ÷ to ×, flip second)',
        'Check: 3/2 × 3/2 should equal 9/4 (which equals 2¼) ✓'
      ]
    },
    {
      title: 'Decimal Place Values and Operations',
      content: 'Understanding decimal place values is crucial for accurate calculations. Each position has a specific value that\'s ten times smaller than the position to its left.',
      examples: [
        'Place values: 123.456 = 1 hundred + 2 tens + 3 ones + 4 tenths + 5 hundredths + 6 thousandths',
        'Adding decimals: 12.45 + 7.8 = 12.45 + 7.80 = 20.25',
        'Subtracting: 15.6 - 8.27 = 15.60 - 8.27 = 7.33',
        'Multiplying: 2.5 × 1.6 = 4.0 (count decimal places: 1 + 1 = 2)',
        'Dividing: 8.4 ÷ 2.1 = 84 ÷ 21 = 4 (move decimals to make divisor whole)'
      ]
    },
    {
      title: 'Converting Between Fractions and Decimals',
      content: 'Converting between fractions and decimals is essential for choosing the best form for calculations and comparisons.',
      examples: [
        'Fraction to decimal: 3/8 = 3 ÷ 8 = 0.375',
        'Decimal to fraction: 0.625 = 625/1000 = 5/8 (simplify by dividing by 125)',
        'Terminating decimals: 1/4 = 0.25, 3/5 = 0.6, 7/8 = 0.875',
        'Repeating decimals: 1/3 = 0.333..., 2/3 = 0.666..., 1/6 = 0.1666...',
        'Mixed numbers: 2¾ = 2.75, 1⅝ = 1.625'
      ]
    },
    {
      title: 'Comparing and Ordering Fractions and Decimals',
      content: 'Comparing fractions and decimals requires converting to a common form or finding equivalent forms with the same denominators.',
      examples: [
        'Convert to decimals: Compare 3/4 and 0.8 → 0.75 and 0.8 → 0.8 > 0.75',
        'Common denominators: 2/3 vs 3/4 → 8/12 vs 9/12 → 3/4 > 2/3',
        'Cross multiplication: For a/b vs c/d, if a×d > b×c, then a/b > c/d',
        'Ordering: 0.3, 1/4, 0.35, 2/5 → 0.25, 0.3, 0.35, 0.4 → 1/4, 0.3, 0.35, 2/5',
        'Use number lines to visualize comparisons'
      ]
    },
    {
      title: 'Real-World Applications and Problem Solving',
      content: 'Fractions and decimals appear everywhere in real life. Understanding when and how to use them helps solve practical problems.',
      examples: [
        'Cooking: Recipe calls for 2¾ cups flour, but you want to make 1½ times the recipe',
        'Shopping: Item costs $24.95, with 15% discount and 8.5% tax',
        'Sports: Basketball player makes 7 out of 12 free throws. What\'s the percentage?',
        'Construction: Board is 8⅜ feet long, need to cut pieces that are 2¾ feet each',
        'Time: Movie is 2.25 hours long, started at 7:40 PM, when does it end?'
      ]
    },
    {
      title: 'Error Prevention and Checking Strategies',
      content: 'Developing good habits for checking work and avoiding common mistakes leads to more accurate results and better understanding.',
      examples: [
        'Always simplify fractions to lowest terms: 6/8 = 3/4',
        'Line up decimal points when adding or subtracting',
        'Count decimal places carefully when multiplying',
        'Convert mixed numbers to improper fractions before multiplying or dividing',
        'Check answers by estimating: 3/4 × 8 should be close to 6'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What type of fraction is 13/5?',
      options: ['Proper fraction', 'Improper fraction', 'Mixed number', 'Like fraction'],
      correct: 1,
      explanation: '13/5 is an improper fraction because the numerator (13) is greater than the denominator (5). It can be converted to the mixed number 2⅗.'
    },
    {
      question: 'Convert 4⅔ to an improper fraction.',
      options: ['12/3', '14/3', '16/3', '18/3'],
      correct: 1,
      explanation: 'To convert 4⅔ to improper: multiply whole number by denominator and add numerator: (4 × 3) + 2 = 12 + 2 = 14, so 14/3.'
    },
    {
      question: 'What is 2/3 + 3/4?',
      options: ['5/7', '5/12', '17/12', '6/12'],
      correct: 2,
      explanation: 'Find LCD of 3 and 4, which is 12. Convert: 2/3 = 8/12 and 3/4 = 9/12. Add: 8/12 + 9/12 = 17/12 = 1 5/12.'
    },
    {
      question: 'What is 2/5 × 3/7?',
      options: ['5/12', '6/35', '6/12', '5/35'],
      correct: 1,
      explanation: 'Multiply fractions by multiplying numerators and denominators: (2 × 3)/(5 × 7) = 6/35.'
    },
    {
      question: 'What is 3/4 ÷ 2/3?',
      options: ['6/12', '9/8', '6/7', '2/3'],
      correct: 1,
      explanation: 'To divide fractions, multiply by the reciprocal: 3/4 ÷ 2/3 = 3/4 × 3/2 = 9/8 = 1⅛.'
    },
    {
      question: 'What is 0.75 as a fraction in lowest terms?',
      options: ['75/100', '3/4', '15/20', '6/8'],
      correct: 1,
      explanation: '0.75 = 75/100. Simplify by dividing both by 25: 75 ÷ 25 = 3 and 100 ÷ 25 = 4, so 3/4.'
    },
    {
      question: 'What is 5/8 as a decimal?',
      options: ['0.625', '0.58', '0.68', '0.588'],
      correct: 0,
      explanation: 'Divide the numerator by denominator: 5 ÷ 8 = 0.625.'
    },
    {
      question: 'Which is greater: 3/5 or 0.65?',
      options: ['3/5', '0.65', 'They are equal', 'Cannot determine'],
      correct: 1,
      explanation: 'Convert 3/5 to decimal: 3 ÷ 5 = 0.6. Since 0.65 > 0.6, then 0.65 > 3/5.'
    },
    {
      question: 'What is 4.25 × 1.6?',
      options: ['6.8', '6.4', '5.85', '6.0'],
      correct: 0,
      explanation: 'Multiply: 425 × 16 = 6800. Count decimal places: 2 + 1 = 3, so place decimal to get 6.800 = 6.8.'
    },
    {
      question: 'A recipe calls for 2¾ cups of flour. If you want to make 1½ times the recipe, how much flour do you need?',
      options: ['3¼ cups', '4⅛ cups', '4¼ cups', '3⅛ cups'],
      correct: 1,
      explanation: 'Convert to improper fractions: 2¾ = 11/4 and 1½ = 3/2. Multiply: 11/4 × 3/2 = 33/8 = 4⅛ cups.'
    }
  ]
}

export default function FractionsDecimalsGrade7Module() {
  return (
    <ModuleLayout 
      module={fractionsDecimalsGrade7Module} 
      grade={7} 
      subject="Mathematics" 
    />
  )
}