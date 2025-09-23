import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const fractionsDecimalsModule: LearningModule = {
  title: 'Fractions & Decimals',
  introduction: 'Welcome to the exciting world of fractions and decimals! These are different ways to represent parts of a whole or numbers between whole numbers. Think of fractions like slices of pizza and decimals like measurements on a ruler. By the end of this module, you\'ll be a pro at working with both!',
  concepts: [
    {
      title: 'Understanding Fractions',
      content: 'A fraction represents parts of a whole. It has two parts: the numerator (top number) shows how many parts we have, and the denominator (bottom number) shows how many equal parts make up the whole.',
      examples: [
        '3/4 means 3 parts out of 4 equal parts (like 3 slices of a pizza cut into 4 pieces)',
        '1/2 means 1 part out of 2 equal parts (half of something)',
        '5/8 means 5 parts out of 8 equal parts',
        'Proper fractions: numerator < denominator (like 2/3, 4/5)',
        'Improper fractions: numerator ≥ denominator (like 5/3, 7/4)'
      ]
    },
    {
      title: 'Simplifying Fractions',
      content: 'Simplifying fractions means reducing them to their lowest terms by dividing both the numerator and denominator by their greatest common factor (GCF).',
      examples: [
        '6/8 = 3/4 (divide both by 2)',
        '12/16 = 3/4 (divide both by 4)',
        '15/20 = 3/4 (divide both by 5)',
        '8/12 = 2/3 (divide both by 4)',
        'Always look for the largest number that divides both parts evenly'
      ]
    },
    {
      title: 'Comparing Fractions',
      content: 'To compare fractions, we can convert them to have the same denominator (common denominator) or convert them to decimals.',
      examples: [
        'Compare 1/3 and 1/4: 1/3 = 4/12, 1/4 = 3/12, so 1/3 > 1/4',
        'Compare 2/5 and 3/7: 2/5 = 14/35, 3/7 = 15/35, so 3/7 > 2/5',
        'Compare 3/4 and 5/6: 3/4 = 9/12, 5/6 = 10/12, so 5/6 > 3/4',
        'When denominators are the same, compare numerators',
        'Cross multiply: for a/b and c/d, if a×d > b×c, then a/b > c/d'
      ]
    },
    {
      title: 'Converting Fractions to Decimals',
      content: 'To convert a fraction to a decimal, divide the numerator by the denominator. Some fractions give terminating decimals, others give repeating decimals.',
      examples: [
        '1/2 = 1 ÷ 2 = 0.5 (terminating)',
        '1/4 = 1 ÷ 4 = 0.25 (terminating)',
        '3/8 = 3 ÷ 8 = 0.375 (terminating)',
        '1/3 = 1 ÷ 3 = 0.333... (repeating)',
        '2/3 = 2 ÷ 3 = 0.666... (repeating)'
      ]
    },
    {
      title: 'Converting Decimals to Fractions',
      content: 'To convert a decimal to a fraction, write it as a fraction with a power of 10 as the denominator, then simplify.',
      examples: [
        '0.5 = 5/10 = 1/2',
        '0.25 = 25/100 = 1/4',
        '0.75 = 75/100 = 3/4',
        '0.125 = 125/1000 = 1/8',
        'For repeating decimals: 0.333... = 1/3, 0.666... = 2/3'
      ]
    },
    {
      title: 'Adding and Subtracting Fractions Using LCM',
      content: 'To add or subtract fractions, find the Least Common Multiple (LCM) of the denominators to create equivalent fractions, then add or subtract the numerators.',
      examples: [
        '1/4 + 1/6: LCM of 4 and 6 is 12. 1/4 = 3/12, 1/6 = 2/12, so 3/12 + 2/12 = 5/12',
        '3/5 - 1/3: LCM of 5 and 3 is 15. 3/5 = 9/15, 1/3 = 5/15, so 9/15 - 5/15 = 4/15',
        '2/3 + 1/4: LCM of 3 and 4 is 12. 2/3 = 8/12, 1/4 = 3/12, so 8/12 + 3/12 = 11/12',
        'Same denominators: 2/7 + 3/7 = 5/7',
        'Always simplify your final answer if possible'
      ]
    },
    {
      title: 'Multiplying Fractions',
      content: 'To multiply fractions, multiply the numerators together and multiply the denominators together. Then simplify if possible.',
      examples: [
        '2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2',
        '1/2 × 4/5 = (1×4)/(2×5) = 4/10 = 2/5',
        '3/7 × 2/9 = (3×2)/(7×9) = 6/63 = 2/21',
        'Cross-cancel before multiplying: 2/3 × 9/4 = (2×9)/(3×4) = 18/12 = 3/2',
        'Multiplying by a whole number: 3/4 × 2 = 3/4 × 2/1 = 6/4 = 3/2'
      ]
    },
    {
      title: 'Dividing Fractions',
      content: 'To divide fractions, multiply by the reciprocal (flip the second fraction). Remember: "Keep, Change, Flip".',
      examples: [
        '1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2',
        '3/4 ÷ 2/3 = 3/4 × 3/2 = 9/8',
        '2/5 ÷ 1/3 = 2/5 × 3/1 = 6/5',
        '5/6 ÷ 2/9 = 5/6 × 9/2 = 45/12 = 15/4',
        'Dividing by a whole number: 3/4 ÷ 2 = 3/4 × 1/2 = 3/8'
      ]
    },
    {
      title: 'Operations with Decimals',
      content: 'Adding, subtracting, multiplying, and dividing decimals follows specific rules about decimal point placement.',
      examples: [
        'Adding: 2.5 + 1.3 = 3.8 (line up decimal points)',
        'Subtracting: 5.7 - 2.4 = 3.3 (line up decimal points)',
        'Multiplying: 2.5 × 1.2 = 3.0 (count total decimal places)',
        'Dividing: 6.4 ÷ 1.6 = 4.0 (move decimal points to make divisor whole)',
        'Always check your decimal point placement!'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is 8/12 simplified to its lowest terms?',
      options: ['4/6', '2/3', '6/9', '1/2'],
      correct: 1,
      explanation: '8/12 can be simplified by dividing both numerator and denominator by their GCF, which is 4. 8÷4 = 2 and 12÷4 = 3, so 8/12 = 2/3.'
    },
    {
      question: 'Which fraction is greater: 3/5 or 2/3?',
      options: ['3/5', '2/3', 'They are equal', 'Cannot be determined'],
      correct: 1,
      explanation: 'To compare, find a common denominator. 3/5 = 9/15 and 2/3 = 10/15. Since 10 > 9, we have 2/3 > 3/5.'
    },
    {
      question: 'What is 3/4 converted to a decimal?',
      options: ['0.25', '0.5', '0.75', '0.8'],
      correct: 2,
      explanation: 'To convert 3/4 to a decimal, divide 3 by 4: 3 ÷ 4 = 0.75.'
    },
    {
      question: 'What is 0.6 as a fraction in lowest terms?',
      options: ['6/10', '3/5', '6/9', '2/3'],
      correct: 1,
      explanation: '0.6 = 6/10. To simplify, divide both by their GCF of 2: 6÷2 = 3 and 10÷2 = 5, so 0.6 = 3/5.'
    },
    {
      question: 'What is 1/3 + 1/4?',
      options: ['2/7', '1/6', '7/12', '5/12'],
      correct: 2,
      explanation: 'Find the LCM of 3 and 4, which is 12. Convert: 1/3 = 4/12 and 1/4 = 3/12. Then add: 4/12 + 3/12 = 7/12.'
    },
    {
      question: 'What is 2/3 × 3/4?',
      options: ['5/7', '6/12', '1/2', '5/12'],
      correct: 2,
      explanation: 'Multiply fractions by multiplying numerators and denominators: (2×3)/(3×4) = 6/12 = 1/2.'
    },
    {
      question: 'What is 1/2 ÷ 1/4?',
      options: ['1/8', '1/6', '2', '4'],
      correct: 2,
      explanation: 'To divide fractions, multiply by the reciprocal: 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2.'
    },
    {
      question: 'What is 2.5 + 1.75?',
      options: ['3.25', '4.25', '4.2', '3.75'],
      correct: 1,
      explanation: 'Line up the decimal points: 2.50 + 1.75 = 4.25.'
    },
    {
      question: 'What is 0.8 × 0.5?',
      options: ['0.4', '0.04', '4.0', '1.3'],
      correct: 0,
      explanation: 'Multiply as whole numbers: 8 × 5 = 40. Count decimal places: 0.8 has 1, 0.5 has 1, total is 2. So 40 becomes 0.40 = 0.4.'
    },
    {
      question: 'What is 6.4 ÷ 1.6?',
      options: ['4', '0.4', '40', '0.04'],
      correct: 0,
      explanation: 'Move the decimal point in both numbers one place to make the divisor whole: 64 ÷ 16 = 4.'
    }
  ]
}

export default function FractionsDecimalsModule() {
  return (
    <ModuleLayout 
      module={fractionsDecimalsModule} 
      grade={6} 
      subject="Mathematics" 
    />
  )
}