import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Relations show how elements of one set associate with elements of another (subsets of Cartesian product). A function is a special relation where each domain element maps to exactly one codomain element.' },
  { title: '1. Cartesian Product', content: 'For sets A and B, A×B = { (a,b) : a ∈ A, b ∈ B }. If A has m elements and B has n elements, then |A×B| = m·n.' },
  { title: '2. Relations', content: 'A relation R from A to B is any subset of A×B. On a set A, common properties: Reflexive, Symmetric, Transitive. Equivalence relation = Reflexive + Symmetric + Transitive.' },
  { title: '3. Functions', content: 'A function f: A → B maps every a ∈ A to a unique b ∈ B. Domain = A, Codomain = B, Range ⊆ B.' },
  { title: '4. Types of Functions', content: '• Injective (one-one) • Surjective (onto) • Bijective (both). Special: Constant function, Identity function (f(x) = x).' },
  { title: '5. Composition and Inverse', content: 'Composition (g∘f)(x) = g(f(x)) if f: A→B and g: B→C. A function has inverse iff it is bijective.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'If A = {1,2}, B = {a,b}, then |A×B| =', options: [
    { key: 'a', text: '2' }, { key: 'b', text: '4' }, { key: 'c', text: '6' }, { key: 'd', text: '8' }
  ], answer: 'b', explanation: '|A×B| = |A|·|B| = 2·2 = 4.' },
  { id: 'q2', question: 'Which of the following is NOT a function R→R?', options: [
    { key: 'a', text: 'f(x) = x^2' }, { key: 'b', text: 'f(x) = x + 1' }, { key: 'c', text: 'f(x) = 3' }, { key: 'd', text: 'f(x) = ±\u221Ax' }
  ], answer: 'd', explanation: '±√x assigns two values for x>0; not single-valued.' },
  { id: 'q3', question: 'Domain of f(x) = 1/(x−2) is', options: [
    { key: 'a', text: 'R' }, { key: 'b', text: 'R − {0}' }, { key: 'c', text: 'R − {2}' }, { key: 'd', text: 'R^+' }
  ], answer: 'c', explanation: 'x = 2 makes denominator zero.' },
  { id: 'q4', question: 'R = { (a,a) : a ∈ A } on A is', options: [
    { key: 'a', text: 'Reflexive only' }, { key: 'b', text: 'Symmetric only' }, { key: 'c', text: 'Equivalence' }, { key: 'd', text: 'None' }
  ], answer: 'c', explanation: 'It is reflexive, symmetric, and transitive.' },
  { id: 'q5', question: 'For f(x) = 2x + 3 on R, f is', options: [
    { key: 'a', text: 'One-one only' }, { key: 'b', text: 'Onto only' }, { key: 'c', text: 'Bijective' }, { key: 'd', text: 'Neither' }
  ], answer: 'c', explanation: 'Linear with nonzero slope → bijective over R→R.' },
  { id: 'q6', question: 'Number of relations from a set with 3 elements to a set with 2 elements is', options: [
    { key: 'a', text: '6' }, { key: 'b', text: '8' }, { key: 'c', text: '64' }, { key: 'd', text: '16' }
  ], answer: 'c', explanation: 'Total pairs = 3·2 = 6; number of subsets = 2^6 = 64.' },
  { id: 'q7', question: 'f(x) = x^3 on R is', options: [
    { key: 'a', text: 'One-one but not onto' }, { key: 'b', text: 'Onto but not one-one' }, { key: 'c', text: 'Bijective' }, { key: 'd', text: 'Neither' }
  ], answer: 'c', explanation: 'Strictly increasing over R and surjective onto R.' },
  { id: 'q8', question: 'If f(x) = 2x+1, g(x) = x^2, then (g∘f)(x) =', options: [
    { key: 'a', text: '(2x+1)^2' }, { key: 'b', text: '2x^2+1' }, { key: 'c', text: '4x^2+1' }, { key: 'd', text: '2(x+1)^2' }
  ], answer: 'a', explanation: 'g(f(x)) = (2x+1)^2.' },
  { id: 'q9', question: 'If f(x) = 3x − 4, then f^{-1}(x) =', options: [
    { key: 'a', text: '(x+4)/3' }, { key: 'b', text: '(x-4)/3' }, { key: 'c', text: '3x+4' }, { key: 'd', text: '3/(x-4)' }
  ], answer: 'a', explanation: 'Solve y = 3x − 4 ⇒ x = (y + 4)/3. Replace y with x to get f^{-1}(x) = (x + 4)/3.' },
  { id: 'q10', question: 'The identity function on R is', options: [
    { key: 'a', text: 'f(x)=0' }, { key: 'b', text: 'f(x)=1' }, { key: 'c', text: 'f(x)=x' }, { key: 'd', text: 'f(x)=x^2' }
  ], answer: 'c', explanation: 'Identity returns input unchanged: f(x) = x.' },
]

export default function MathG11RelationsFunctions() {
  return (
    <LessonModuleTemplate
      title="Relations and Functions"
      subject="Mathematics"
      grade={11}
      backLink="/lessons/Mathematics/11"
      lessonId="math-g11-relations-functions"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
