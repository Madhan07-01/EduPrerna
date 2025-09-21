import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Rational numbers are numbers that can be expressed as a fraction p/q where p and q are integers and q ≠ 0. They represent parts of a whole, ratios, or values between integers and are used widely in daily life.' },
  { title: '1. Definition', content: 'A rational number can be written as p/q where p and q are integers and q ≠ 0. Examples: 2/3, -7/4, 0, 5, -11/9.' },
  { title: '2. Properties', content: 'Closure: closed under +, −, × (not always ÷ by 0). Commutative: a + b = b + a and a × b = b × a. Associative: (a + b) + c = a + (b + c). Distributive: a × (b + c) = a × b + a × c.' },
  { title: '3. Number Line Representation', content: 'Rational numbers are plotted like fractions on the number line. Negative rationals are to the left of 0.' },
  { title: '4. Standard Form', content: 'Denominator positive; numerator & denominator coprime (no common factor other than 1). Reduce fractions to standard form.' },
  { title: '5. Comparison', content: 'Use a common denominator (or decimal equivalent) to compare sizes of two rational numbers.' },
  { title: '6. Operations', content: 'Addition/Subtraction: convert to common denominator first. Multiplication: multiply numerators and denominators. Division: multiply by the reciprocal of the divisor.' },
  { title: 'Summary', content: 'Rational numbers are fractions with integer numerator/denominator (denominator ≠ 0). They have standard algebraic properties and can be compared/operated via common techniques.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Which of the following is a rational number?', options: [
    { key: 'a', text: '2' }, { key: 'b', text: 'π' }, { key: 'c', text: '−7/3' }, { key: 'd', text: 'None' }
  ], answer: 'c', explanation: '−7/3 is a ratio of integers with nonzero denominator.' },
  { id: 'q2', question: 'The standard form of −15/35 is:', options: [
    { key: 'a', text: '15/35' }, { key: 'b', text: '3/7' }, { key: 'c', text: '−3/7' }, { key: 'd', text: '7/15' }
  ], answer: 'c', explanation: 'Divide by 5: −15/35 = −3/7 with positive denominator.' },
  { id: 'q3', question: 'Property shown by 2/3 + 4/5 = 4/5 + 2/3 is:', options: [
    { key: 'a', text: 'Closure' }, { key: 'b', text: 'Commutative' }, { key: 'c', text: 'Associative' }, { key: 'd', text: 'Distributive' }
  ], answer: 'b', explanation: 'a + b = b + a is the commutative property.' },
  { id: 'q4', question: 'Reciprocal of −7/9 is:', options: [
    { key: 'a', text: '7/9' }, { key: 'b', text: '−9/7' }, { key: 'c', text: '−7/9' }, { key: 'd', text: '9/7' }
  ], answer: 'b', explanation: 'Flip numerator/denominator and keep sign: −9/7.' },
  { id: 'q5', question: 'Which is NOT a rational number?', options: [
    { key: 'a', text: '0.5' }, { key: 'b', text: '−11/7' }, { key: 'c', text: '5' }, { key: 'd', text: '√2' }
  ], answer: 'd', explanation: '√2 is irrational (cannot be expressed as p/q).' },
  { id: 'q6', question: 'Sum of 3/4 + 5/6 is:', options: [
    { key: 'a', text: '8/10' }, { key: 'b', text: '19/12' }, { key: 'c', text: '23/24' }, { key: 'd', text: '1/2' }
  ], answer: 'b', explanation: 'LCM 12 → 9/12 + 10/12 = 19/12.' },
  { id: 'q7', question: 'On the number line, −5/8 lies between:', options: [
    { key: 'a', text: '−1 and 0' }, { key: 'b', text: '0 and 1' }, { key: 'c', text: '−2 and −1' }, { key: 'd', text: '1 and 2' }
  ], answer: 'a', explanation: '−0.625 is between −1 and 0.' },
  { id: 'q8', question: 'Which is greater: 7/12 or 5/8?', options: [
    { key: 'a', text: '7/12' }, { key: 'b', text: '5/8' }, { key: 'c', text: 'Equal' }, { key: 'd', text: 'Cannot compare' }
  ], answer: 'b', explanation: '7/12 ≈ 0.583, 5/8 = 0.625; thus 5/8 is greater.' },
  { id: 'q9', question: 'Product of 2/3 × −9/4 is:', options: [
    { key: 'a', text: '−3/2' }, { key: 'b', text: '3/2' }, { key: 'c', text: '−18/12' }, { key: 'd', text: '−9/8' }
  ], answer: 'a', explanation: '(2×−9)/(3×4) = −18/12 = −3/2.' },
  { id: 'q10', question: 'Result of 5/9 ÷ 10/27 is:', options: [
    { key: 'a', text: '3/2' }, { key: 'b', text: '5/27' }, { key: 'c', text: '9/10' }, { key: 'd', text: '27/50' }
  ], answer: 'a', explanation: '5/9 × 27/10 = 135/90 = 3/2.' },
]

export default function MathG8RationalNumbers() {
  return (
    <LessonModuleTemplate
      title="Rational Numbers"
      subject="Mathematics"
      grade={8}
      backLink="/lessons/Mathematics/8"
      lessonId="math-g8-rational-numbers"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
