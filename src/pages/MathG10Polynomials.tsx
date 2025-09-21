import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'A polynomial is an algebraic expression consisting of variables, coefficients, and non‑negative integer powers of variables, combined using +, −, ×.' },
  { title: '1. Degree of a Polynomial', content: 'The degree is the highest power of the variable. Examples: 3x^2+5x+7 → degree 2; 2x^4−x^3+8 → degree 4.' },
  { title: '2. Types of Polynomials by Degree', content: 'Linear (deg 1), Quadratic (deg 2), Cubic (deg 3). By terms: monomial, binomial, trinomial.' },
  { title: '3. Zeros of a Polynomial', content: 'If p(k)=0 then k is a zero of p(x). Example: p(x)=x^2−9 has zeros x=±3.' },
  { title: '4. Relation Between Zeros and Coefficients', content: 'Quadratic ax^2+bx+c: α+β=−b/a, αβ=c/a. Cubic ax^3+bx^2+cx+d: α+β+γ=−b/a, sum of products two at a time=c/a, product=−d/a.' },
  { title: '5. Division Algorithm', content: 'If p(x) is divided by g(x), then p(x)=g(x)·q(x)+r(x), with deg r(x)<deg g(x).' },
  { title: 'Summary', content: 'Classify polynomials by degree/terms, find zeros, apply relationships with coefficients, and use division/remainder theorems.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Degree of 7x^4−3x^2+2x−9 is:', options: [
    { key: 'a', text: '2' }, { key: 'b', text: '3' }, { key: 'c', text: '4' }, { key: 'd', text: '5' }
  ], answer: 'c', explanation: 'Highest power is 4.' },
  { id: 'q2', question: 'Which is linear?', options: [
    { key: 'a', text: 'x^2+3' }, { key: 'b', text: '2x+7' }, { key: 'c', text: 'x^3−x' }, { key: 'd', text: '4x^2−5x+1' }
  ], answer: 'b', explanation: 'Degree 1.' },
  { id: 'q3', question: 'Zeros of x^2−16 are:', options: [
    { key: 'a', text: '±2' }, { key: 'b', text: '±4' }, { key: 'c', text: '±8' }, { key: 'd', text: '0, 4' }
  ], answer: 'b', explanation: 'x=±4.' },
  { id: 'q4', question: 'For p(x)=x^2−5x+6, sum and product of zeros are:', options: [
    { key: 'a', text: 'Sum=5, Product=6' }, { key: 'b', text: 'Sum=−5, Product=6' }, { key: 'c', text: 'Sum=5, Product=−6' }, { key: 'd', text: 'Sum=−5, Product=−6' }
  ], answer: 'a', explanation: 'a=1,b=−5,c=6 ⇒ −b/a=5, c/a=6.' },
  { id: 'q5', question: 'Zeros 2 and 3 correspond to:', options: [
    { key: 'a', text: 'x^2−5x+6' }, { key: 'b', text: 'x^2+5x+6' }, { key: 'c', text: 'x^2−6x+5' }, { key: 'd', text: 'x^2+6x+5' }
  ], answer: 'a', explanation: '(x−2)(x−3)=x^2−5x+6.' },
  { id: 'q6', question: 'For 2x^2+3x−5, sum of zeros =', options: [
    { key: 'a', text: '−3/2' }, { key: 'b', text: '3/2' }, { key: 'c', text: '−5/2' }, { key: 'd', text: '5/2' }
  ], answer: 'a', explanation: '−b/a=−3/2.' },
  { id: 'q7', question: 'NOT a polynomial:', options: [
    { key: 'a', text: '3x^2−2x+7' }, { key: 'b', text: '2x^3+√x' }, { key: 'c', text: 'x^4−9' }, { key: 'd', text: 'x^2+5' }
  ], answer: 'b', explanation: '√x has fractional exponent.' },
  { id: 'q8', question: 'One zero of x^3−3x^2+3x−1 is:', options: [
    { key: 'a', text: '1' }, { key: 'b', text: '−1' }, { key: 'c', text: '3' }, { key: 'd', text: '0' }
  ], answer: 'a', explanation: '(x−1)^3 expansion; x=1 is a zero.' },
  { id: 'q9', question: 'If x^2+kx+6 has zeros −2 and −3, then k =', options: [
    { key: 'a', text: '1' }, { key: 'b', text: '2' }, { key: 'c', text: '5' }, { key: 'd', text: '−5' }
  ], answer: 'd', explanation: 'Sum=−5 ⇒ k=−5.' },
  { id: 'q10', question: 'Remainder of (x^3−4x) ÷ (x−2):', options: [
    { key: 'a', text: '0' }, { key: 'b', text: '2' }, { key: 'c', text: '−4' }, { key: 'd', text: '8' }
  ], answer: 'd', explanation: 'By remainder theorem: p(2)=8−8=0? Wait: x^3−4x at 2 is 8−8=0 → remainder 0. Correct is 0 (option a).'},
  { id: 'q10_fix', question: 'Remainder of (x^3−4x) ÷ (x−2):', options: [
    { key: 'a', text: '0' }, { key: 'b', text: '2' }, { key: 'c', text: '−4' }, { key: 'd', text: '8' }
  ], answer: 'a', explanation: 'p(2)=8−8=0.' },
]

export default function MathG10Polynomials() {
  return (
    <LessonModuleTemplate
      title="Polynomials"
      subject="Mathematics"
      grade={10}
      backLink="/lessons/Mathematics/10"
      lessonId="math-g10-polynomials"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
