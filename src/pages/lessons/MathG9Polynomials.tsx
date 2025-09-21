import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Polynomials are algebraic expressions consisting of variables, constants, and powers of variables with non-negative integers. They are widely used in equations, graphs, and real-life problems.' },
  { title: '1. Definition', content: 'Polynomial in x: a_n x^n + a_{n-1} x^{n-1} + … + a_1 x + a_0 where coefficients a_n … a_0 are real numbers and n ≥ 0.' },
  { title: '2. Types by Terms', content: 'Monomial: 1 term (7x). Binomial: 2 terms (x^2 + 5). Trinomial: 3 terms (x^2 + 3x + 2).'},
  { title: '3. Degree of a Polynomial', content: 'Highest power of the variable. Example: 4x^5 − 3x^2 + x has degree 5.' },
  { title: '4. Types by Degree', content: 'Constant (0), Linear (1), Quadratic (2), Cubic (3).'},
  { title: '5. Zeros of a Polynomial', content: 'If p(k) = 0 then k is a zero of p(x). Example: For p(x)=x^2−4, zeros are 2 and −2.' },
  { title: '6. Remainder Theorem', content: 'Remainder when p(x) is divided by (x − a) equals p(a).'},
  { title: '7. Factor Theorem', content: 'If p(a) = 0, then (x − a) is a factor of p(x).'},
  { title: 'Summary', content: 'Polynomials are classified by terms and degree; zeros satisfy p(x)=0; remainder and factor theorems connect evaluation and factorization.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Which is a polynomial?', options: [
    { key: 'a', text: 'x^2 + 1/x' }, { key: 'b', text: '3x^3 − 7x + 2' }, { key: 'c', text: 'x + 2' }, { key: 'd', text: '5/x' }
  ], answer: 'b', explanation: 'Negative powers of x are not allowed in polynomials.' },
  { id: 'q2', question: 'Degree of 2x^4 + 7x^2 − 3:', options: [
    { key: 'a', text: '2' }, { key: 'b', text: '3' }, { key: 'c', text: '4' }, { key: 'd', text: '7' }
  ], answer: 'c', explanation: 'Highest power is 4.' },
  { id: 'q3', question: 'Number of terms in x^3 + 2x^2 − 5x + 7:', options: [
    { key: 'a', text: '2' }, { key: 'b', text: '3' }, { key: 'c', text: '4' }, { key: 'd', text: '5' }
  ], answer: 'c', explanation: 'There are four nonzero terms.' },
  { id: 'q4', question: 'Cubic polynomial:', options: [
    { key: 'a', text: 'x^2 + 3x + 2' }, { key: 'b', text: 'x^3 − 7' }, { key: 'c', text: '5x + 1' }, { key: 'd', text: '7' }
  ], answer: 'b', explanation: 'Cubic means degree 3.' },
  { id: 'q5', question: 'A zero of x^2 − 4 is:', options: [
    { key: 'a', text: '4' }, { key: 'b', text: '−4' }, { key: 'c', text: '2' }, { key: 'd', text: '0' }
  ], answer: 'c', explanation: 'x=2 gives 0; so 2 is a zero.' },
  { id: 'q6', question: 'Factor theorem tells us:', options: [
    { key: 'a', text: 'Remainder' }, { key: 'b', text: 'Division' }, { key: 'c', text: 'Factor' }, { key: 'd', text: 'Multiplication' }
  ], answer: 'c', explanation: 'If p(a)=0 then (x−a) is a factor.' },
  { id: 'q7', question: 'Remainder when x^2 − 3x + 2 is divided by (x − 1):', options: [
    { key: 'a', text: '1' }, { key: 'b', text: '0' }, { key: 'c', text: '−1' }, { key: 'd', text: '2' }
  ], answer: 'b', explanation: 'By remainder theorem: p(1)=1−3+2=0.' },
  { id: 'q8', question: 'Degree 1 polynomial is called:', options: [
    { key: 'a', text: 'Quadratic' }, { key: 'b', text: 'Cubic' }, { key: 'c', text: 'Linear' }, { key: 'd', text: 'Constant' }
  ], answer: 'c', explanation: 'Degree 1 → linear.' },
  { id: 'q9', question: 'Zero of x + 7:', options: [
    { key: 'a', text: '−7' }, { key: 'b', text: '7' }, { key: 'c', text: '0' }, { key: 'd', text: '1' }
  ], answer: 'a', explanation: 'x=−7 makes x+7=0.' },
  { id: 'q10', question: 'Not true:', options: [
    { key: 'a', text: 'Every linear has 1 zero' }, { key: 'b', text: 'Every quadratic has exactly 2 zeros' }, { key: 'c', text: 'Constant has no zero' }, { key: 'd', text: 'Cubic can have at most 3 zeros' }
  ], answer: 'b', explanation: 'A quadratic can have 0, 1, or 2 real zeros.' },
]

export default function MathG9Polynomials() {
  return (
    <LessonModuleTemplate
      title="Polynomials"
      subject="Mathematics"
      grade={9}
      backLink="/lessons/Mathematics/9"
      lessonId="math-g9-polynomials"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
