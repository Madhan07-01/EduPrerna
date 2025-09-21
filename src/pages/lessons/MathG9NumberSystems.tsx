import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Numbers are the foundation of mathematics. Different types of numbers help represent quantities accurately. The Number System includes natural numbers, whole numbers, integers, rational and irrational numbers, and real numbers.' },
  { title: '1. Natural Numbers (N)', content: 'Counting numbers: 1, 2, 3, … Smallest natural number is 1.' },
  { title: '2. Whole Numbers (W)', content: 'All natural numbers plus 0: 0, 1, 2, 3, …' },
  { title: '3. Integers (Z)', content: 'Positive and negative whole numbers, including 0: …, -3, -2, -1, 0, 1, 2, 3, …' },
  { title: '4. Rational Numbers (Q)', content: 'Can be expressed as p/q, q ≠ 0. Examples: 2/3, -4/5, 0.25.' },
  { title: '5. Irrational Numbers', content: 'Cannot be written as p/q. Decimal expansion is non-terminating, non-repeating. Examples: √2, π.' },
  { title: '6. Real Numbers (R)', content: 'Includes all rational and irrational numbers. Every point on the number line corresponds to a real number.' },
  { title: 'Important Properties', content: 'Density: Between any two real numbers, there is another real number. Decimal representation: Rational → terminating/repeating; Irrational → non-terminating/non-repeating.' },
  { title: 'Laws of Exponents (Real Numbers)', content: 'a^m × a^n = a^(m+n); a^m ÷ a^n = a^(m−n); (a^m)^n = a^(mn); a^0 = 1 (a ≠ 0); a^(−m) = 1/a^m.' },
  { title: 'Summary', content: 'The real number system unifies rational and irrational numbers with well-defined arithmetic and exponent rules.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Smallest set containing 0:', options: [
    { key: 'a', text: 'Natural' }, { key: 'b', text: 'Whole' }, { key: 'c', text: 'Integers' }, { key: 'd', text: 'Rational' }
  ], answer: 'b', explanation: 'Whole numbers include 0.' },
  { id: 'q2', question: 'Decimal expansion of a rational number is:', options: [
    { key: 'a', text: 'Terminating' }, { key: 'b', text: 'Terminating or repeating' }, { key: 'c', text: 'Non-repeating' }, { key: 'd', text: 'Cannot determine' }
  ], answer: 'b', explanation: 'Rational decimals terminate or repeat.' },
  { id: 'q3', question: 'Irrational number:', options: [
    { key: 'a', text: '22/7' }, { key: 'b', text: '0.1212…' }, { key: 'c', text: '√5' }, { key: 'd', text: '-3' }
  ], answer: 'c', explanation: '√5 is irrational.' },
  { id: 'q4', question: 'Every integer is:', options: [
    { key: 'a', text: 'Rational' }, { key: 'b', text: 'Irrational' }, { key: 'c', text: 'Real but not rational' }, { key: 'd', text: 'None' }
  ], answer: 'a', explanation: 'n = n/1 → rational.' },
  { id: 'q5', question: 'Value of 2^(−3):', options: [
    { key: 'a', text: '-8' }, { key: 'b', text: '8' }, { key: 'c', text: '1/8' }, { key: 'd', text: '-1/8' }
  ], answer: 'c', explanation: 'a^(−m) = 1/a^m.' },
  { id: 'q6', question: '√2 is:', options: [
    { key: 'a', text: 'Rational' }, { key: 'b', text: 'Irrational' }, { key: 'c', text: 'Whole' }, { key: 'd', text: 'Integer' }
  ], answer: 'b', explanation: 'Non-terminating non-repeating decimal.' },
  { id: 'q7', question: 'Terminating decimal:', options: [
    { key: 'a', text: '1/3' }, { key: 'b', text: '7/8' }, { key: 'c', text: '2/11' }, { key: 'd', text: '22/7' }
  ], answer: 'b', explanation: '7/8 = 0.875 terminates.' },
  { id: 'q8', question: 'Rational numbers between 1 and 2:', options: [
    { key: 'a', text: 'None' }, { key: 'b', text: 'One' }, { key: 'c', text: 'Two' }, { key: 'd', text: 'Infinitely many' }
  ], answer: 'd', explanation: 'Density of rationals.' },
  { id: 'q9', question: 'Product of two irrational numbers is:', options: [
    { key: 'a', text: 'Rational' }, { key: 'b', text: 'Irrational' }, { key: 'c', text: 'Either' }, { key: 'd', text: 'Whole' }
  ], answer: 'c', explanation: 'Example: √2·√2 = 2 (rational).' },
  { id: 'q10', question: 'True statement:', options: [
    { key: 'a', text: 'Every real number is rational' }, { key: 'b', text: 'Every rational is real' }, { key: 'c', text: 'Every irrational is rational' }, { key: 'd', text: 'Every integer is irrational' }
  ], answer: 'b', explanation: 'Rationals ⊂ Reals.' },
]

export default function MathG9NumberSystems() {
  return (
    <LessonModuleTemplate
      title="Number Systems"
      subject="Mathematics"
      grade={9}
      backLink="/lessons/Mathematics/9"
      lessonId="math-g9-number-systems"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
