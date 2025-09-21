import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Relations are subsets of Cartesian products that associate elements of two sets. Functions are special relations that map each element of the domain to exactly one element of the codomain. In Grade 12, we extend to equivalence relations, bijections, composition, inverses, and binary operations.' },
  { title: '1. Relations', content: 'A relation R from A to B is any subset of A×B. On a set A, special properties:\n• Reflexive: (a,a) ∈ R ∀ a∈A\n• Symmetric: (a,b)∈R ⇒ (b,a)∈R\n• Transitive: (a,b),(b,c)∈R ⇒ (a,c)∈R\n• Equivalence relation: reflexive + symmetric + transitive' },
  { title: '2. Functions', content: 'f: A→B is a relation with exactly one image in B for each a∈A.\n• Injective (one-one), Surjective (onto), Bijective (both).\n• Range ⊆ B; Domain = A; Codomain = B.' },
  { title: '3. Composition', content: 'If f: A→B and g: B→C, then (g∘f)(x) = g(f(x)) is from A→C. Composition is associative.' },
  { title: '4. Invertible Functions', content: 'f has an inverse f^{-1}: B→A if and only if f is bijective. Then f^{-1}(f(x)) = x and f(f^{-1}(y)) = y.' },
  { title: '5. Binary Operations', content: 'A binary operation on A is a mapping *: A×A → A (e.g., addition on integers). May have properties like associativity, identity, inverse, commutativity, closure.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'R = {(a,b): a−b is divisible by 3} on Z is:', options: [
    { key: 'a', text: 'Only symmetric' }, { key: 'b', text: 'Only reflexive' }, { key: 'c', text: 'Equivalence relation' }, { key: 'd', text: 'None' }
  ], answer: 'c', explanation: 'Congruence mod 3 is reflexive, symmetric, and transitive.' },
  { id: 'q2', question: 'If f(x)=x^2 on R, f is:', options: [
    { key: 'a', text: 'One-one only' }, { key: 'b', text: 'Onto only' }, { key: 'c', text: 'Bijective' }, { key: 'd', text: 'Neither one-one nor onto (R→R)' }
  ], answer: 'd', explanation: 'x^2 is not injective over R and range is R_{\u2265 0} ≠ R.' },
  { id: 'q3', question: 'For f(x)=2x+1 and g(x)=x^2, (g∘f)(x) =', options: [
    { key: 'a', text: '2x^2 + 1' }, { key: 'b', text: '(2x+1)^2' }, { key: 'c', text: '4x^2 + 1' }, { key: 'd', text: 'x^2 + 2x + 1' }
  ], answer: 'b', explanation: 'g(f(x)) = (2x+1)^2.' },
  { id: 'q4', question: 'Inverse of f(x)=3x+5 is:', options: [
    { key: 'a', text: '(x-5)/3' }, { key: 'b', text: '(x+5)/3' }, { key: 'c', text: '3x-5' }, { key: 'd', text: '3/x - 5' }
  ], answer: 'a', explanation: 'Solve y=3x+5 ⇒ x=(y−5)/3.' },
  { id: 'q5', question: 'A bijective function is:', options: [
    { key: 'a', text: 'One-one only' }, { key: 'b', text: 'Onto only' }, { key: 'c', text: 'Both one-one and onto' }, { key: 'd', text: 'None' }
  ], answer: 'c', explanation: 'Bijective = injective + surjective.' },
  { id: 'q6', question: 'If f: A→B and g: B→C, then g∘f maps:', options: [
    { key: 'a', text: 'A → C' }, { key: 'b', text: 'C → A' }, { key: 'c', text: 'B → A' }, { key: 'd', text: 'C → B' }
  ], answer: 'a', explanation: 'Composition yields A to C.' },
  { id: 'q7', question: 'Which is a binary operation on R?', options: [
    { key: 'a', text: 'Division (÷)' }, { key: 'b', text: 'Subtraction (−)' }, { key: 'c', text: 'Square root (√)' }, { key: 'd', text: 'log' }
  ], answer: 'b', explanation: 'Subtraction maps R×R→R. Division not closed at 0; √ and log are unary.' },
  { id: 'q8', question: 'Number of reflexive relations on a set of 3 elements is:', options: [
    { key: 'a', text: '2^6' }, { key: 'b', text: '2^9' }, { key: 'c', text: '2^3' }, { key: 'd', text: '3!' }
  ], answer: 'a', explanation: 'Total pairs=9; 3 diagonal pairs forced; free pairs=6 ⇒ 2^6.' },
  { id: 'q9', question: 'f(x)=x^3 on R is:', options: [
    { key: 'a', text: 'One-one but not onto' }, { key: 'b', text: 'Onto but not one-one' }, { key: 'c', text: 'Bijective' }, { key: 'd', text: 'Neither' }
  ], answer: 'c', explanation: 'Strictly increasing and onto R.' },
  { id: 'q10', question: 'An equivalence relation partitions a set into:', options: [
    { key: 'a', text: 'Subsets' }, { key: 'b', text: 'Disjoint subsets (classes)' }, { key: 'c', text: 'Power set' }, { key: 'd', text: 'Cartesian products' }
  ], answer: 'b', explanation: 'Equivalence classes form a partition.' },
]

export default function MathG12RelationsFunctions() {
  return (
    <LessonModuleTemplate
      title="Relations and Functions"
      subject="Mathematics"
      grade={12}
      backLink="/lessons/Mathematics/12"
      lessonId="math-g12-relations-functions"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
