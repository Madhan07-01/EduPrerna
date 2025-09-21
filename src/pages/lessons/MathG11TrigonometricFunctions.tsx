import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Trigonometry studies relationships between angles and sides of triangles, extended via the unit circle to define trigonometric functions for all real numbers. These functions are fundamental in geometry, physics, engineering, and calculus.' },
  { title: '1. Angles and Radians', content: 'Angles measured in degrees (°) and radians (rad). 180° = π radians. Conversion: radians = (π/180) × degrees.' },
  { title: '2. Unit Circle Definitions', content: 'On the unit circle, for point P(x, y) at angle θ: sinθ = y, cosθ = x, tanθ = y/x (x≠0), cotθ = x/y (y≠0), secθ = 1/x, cscθ = 1/y.' },
  { title: '3. Signs by Quadrant (ASTC)', content: 'I: All positive; II: sin, csc positive; III: tan, cot positive; IV: cos, sec positive.' },
  { title: '4. Identities', content: 'sin^2θ + cos^2θ = 1; 1 + tan^2θ = sec^2θ; 1 + cot^2θ = csc^2θ.' },
  { title: '5. Periodicity', content: 'sinθ, cosθ: period 2π; tanθ, cotθ: period π.' },
  { title: '6. Graphs & Principal Values', content: 'Sine/cosine bounded in [-1,1]. Tangent/cotangent have vertical asymptotes. Principal values: sin^{-1}x ∈ [-π/2, π/2], cos^{-1}x ∈ [0, π], tan^{-1}x ∈ (-π/2, π/2).' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Convert 150° to radians.', options: [
    { key: 'a', text: '2π/3' }, { key: 'b', text: '3π/4' }, { key: 'c', text: '5π/6' }, { key: 'd', text: 'π' }
  ], answer: 'c', explanation: '150° × (π/180) = 5π/6.' },
  { id: 'q2', question: 'If sinθ = 3/5 in Quadrant I, then cosθ =', options: [
    { key: 'a', text: '3/5' }, { key: 'b', text: '4/5' }, { key: 'c', text: '5/3' }, { key: 'd', text: '1/5' }
  ], answer: 'b', explanation: 'cosθ = √(1 − sin^2θ) = √(1 − 9/25) = 4/5 (positive in QI).' },
  { id: 'q3', question: 'Which identity is true?', options: [
    { key: 'a', text: 'sin^2θ + cos^2θ = 0' }, { key: 'b', text: 'tan^2θ + 1 = sec^2θ' }, { key: 'c', text: 'cot^2θ + 1 = sec^2θ' }, { key: 'd', text: 'sinθ = 1/cosθ' }
  ], answer: 'b', explanation: 'Pythagorean identity for tangent: 1 + tan^2θ = sec^2θ.' },
  { id: 'q4', question: 'The period of tan x is', options: [
    { key: 'a', text: '2π' }, { key: 'b', text: 'π' }, { key: 'c', text: 'π/2' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'tan(x + π) = tan x.' },
  { id: 'q5', question: 'If cosθ = −12/13 in Quadrant II, then sinθ =', options: [
    { key: 'a', text: '5/13' }, { key: 'b', text: '−5/13' }, { key: 'c', text: '12/13' }, { key: 'd', text: '−12/13' }
  ], answer: 'a', explanation: 'sinθ = +√(1 − cos^2θ) = √(1 − 144/169) = 5/13 (positive in QII).' },
  { id: 'q6', question: 'sin 225° equals', options: [
    { key: 'a', text: '−√2/2' }, { key: 'b', text: '√2/2' }, { key: 'c', text: '−1' }, { key: 'd', text: '0' }
  ], answer: 'a', explanation: '225° = 180° + 45° in QIII, sin negative: −√2/2.' },
  { id: 'q7', question: 'Which is not defined?', options: [
    { key: 'a', text: 'tan(π/2)' }, { key: 'b', text: 'cos(π/2)' }, { key: 'c', text: 'sin(π)' }, { key: 'd', text: 'tan(π)' }
  ], answer: 'a', explanation: 'tan(π/2) undefined as cos(π/2) = 0.' },
  { id: 'q8', question: 'Principal value of sin^{-1}(−1/2) is', options: [
    { key: 'a', text: 'π/6' }, { key: 'b', text: '−π/6' }, { key: 'c', text: '5π/6' }, { key: 'd', text: '−5π/6' }
  ], answer: 'b', explanation: 'sin^{-1} range is [−π/2, π/2].' },
  { id: 'q9', question: 'If sin A = cos B, then A + B =', options: [
    { key: 'a', text: '90°' }, { key: 'b', text: '180°' }, { key: 'c', text: '270°' }, { key: 'd', text: '360°' }
  ], answer: 'a', explanation: 'sin A = cos(90° − A) ⇒ B = 90° − A ⇒ A + B = 90°.' },
  { id: 'q10', question: 'Range of y = sin x is', options: [
    { key: 'a', text: 'R' }, { key: 'b', text: '[−1, 1]' }, { key: 'c', text: '(0, ∞)' }, { key: 'd', text: '(−∞, 0)' }
  ], answer: 'b', explanation: 'Sine is bounded between −1 and 1.' },
]

export default function MathG11TrigonometricFunctions() {
  return (
    <LessonModuleTemplate
      title="Trigonometric Functions"
      subject="Mathematics"
      grade={11}
      backLink="/lessons/Mathematics/11"
      lessonId="math-g11-trigonometric-functions"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
