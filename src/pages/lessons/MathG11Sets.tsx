import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'The concept of sets forms the foundation of modern mathematics. A set is a well-defined collection of distinct objects (elements). Sets help represent groups of numbers, symbols, or real-life objects in a structured way.' },
  { title: '1. Representation of Sets', content: '• Roster/Tabular Form: Listing elements, e.g., A = {2,4,6,8}.\n• Set-builder Form: Using properties, e.g., A = { x : x is an even natural number less than 10 }.' },
  { title: '2. Types of Sets', content: '• Finite / Infinite\n• Null/Empty set (∅): no elements\n• Singleton: one element\n• Equal sets: identical elements\n• Subset: A ⊆ B means every element of A is in B\n• Power Set P(A): set of all subsets\n• Universal Set U: all objects under consideration' },
  { title: '3. Venn Diagrams', content: 'Circles represent sets and their relationships (union, intersection, difference) inside a universal rectangle.' },
  { title: '4. Set Operations', content: '• Union A ∪ B: elements in A or B or both\n• Intersection A ∩ B: elements common to both\n• Difference A − B: in A not in B\n• Complement A′: in U but not in A' },
  { title: '5. Properties of Operations', content: '• Commutative: A ∪ B = B ∪ A, A ∩ B = B ∩ A\n• Associative: (A ∪ B) ∪ C = A ∪ (B ∪ C)\n• Distributive: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)\n• De Morgan’s Laws: (A ∪ B)′ = A′ ∩ B′; (A ∩ B)′ = A′ ∪ B′' },
  { title: '6. Cardinality', content: 'Number of elements in a set. For finite sets, n(A) denotes count. For union: n(A ∪ B) = n(A) + n(B) − n(A ∩ B).' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Which of the following is a null set?', options: [
    { key: 'a', text: '{0}' }, { key: 'b', text: '{}' }, { key: 'c', text: '{x : x^2 = 4}' }, { key: 'd', text: '{1,2,3}' }
  ], answer: 'b', explanation: 'The empty set is denoted by {} or ∅ and has no elements.' },
  { id: 'q2', question: 'If A = {1,2,3}, how many elements does P(A) have?', options: [
    { key: 'a', text: '3' }, { key: 'b', text: '6' }, { key: 'c', text: '8' }, { key: 'd', text: '9' }
  ], answer: 'c', explanation: 'Power set size is 2^n = 2^3 = 8.' },
  { id: 'q3', question: 'If U = {1,2,3,4,5}, A = {1,2,3}, then A′ is:', options: [
    { key: 'a', text: '{1,2,3}' }, { key: 'b', text: '{4,5}' }, { key: 'c', text: '{2,3,4,5}' }, { key: 'd', text: '{5}' }
  ], answer: 'b', explanation: 'Complement are the elements in U not in A → {4,5}.' },
  { id: 'q4', question: 'Which statement is true?', options: [
    { key: 'a', text: 'A ∪ ∅ = A' }, { key: 'b', text: 'A ∩ ∅ = A' }, { key: 'c', text: 'A ∩ U = ∅' }, { key: 'd', text: 'A ∪ U = ∅' }
  ], answer: 'a', explanation: 'Union with empty set gives A; intersection with empty set is ∅; A ∩ U = A; A ∪ U = U.' },
  { id: 'q5', question: 'If A = {2,4,6}, B = {4,6,8}, then A ∩ B is:', options: [
    { key: 'a', text: '{2,4,6,8}' }, { key: 'b', text: '{2,8}' }, { key: 'c', text: '{4,6}' }, { key: 'd', text: '{2,4}' }
  ], answer: 'c', explanation: 'Common elements are 4 and 6.' },
  { id: 'q6', question: 'Which pair are equal sets?', options: [
    { key: 'a', text: '{1,2,3} and {3,2,1}' }, { key: 'b', text: '{a,b} and {a,b,c}' }, { key: 'c', text: '{0} and ∅' }, { key: 'd', text: '{2,4,6} and {x: x is even and < 6}' }
  ], answer: 'a', explanation: 'Order doesn’t matter; same elements → equal sets.' },
  { id: 'q7', question: 'If A ⊆ B and B ⊆ A, then:', options: [
    { key: 'a', text: 'A = B' }, { key: 'b', text: 'A ⊂ B' }, { key: 'c', text: 'B ⊂ A' }, { key: 'd', text: 'None' }
  ], answer: 'a', explanation: 'Mutual inclusion implies equality.' },
  { id: 'q8', question: 'The complement of the universal set U is:', options: [
    { key: 'a', text: 'U' }, { key: 'b', text: '∅' }, { key: 'c', text: "U'" }, { key: 'd', text: 'Undefined' }
  ], answer: 'b', explanation: 'Elements not in the whole universe is empty.' },
  { id: 'q9', question: 'Which of the following is NOT a set?', options: [
    { key: 'a', text: 'The set of vowels in English alphabet' }, { key: 'b', text: 'The set of natural numbers less than 10' }, { key: 'c', text: 'The set of all intelligent students in class' }, { key: 'd', text: 'The set of prime numbers' }
  ], answer: 'c', explanation: '“Intelligent” is vague; not well-defined.' },
  { id: 'q10', question: 'If A = {1,2}, B = {2,3}, then A ∪ B is:', options: [
    { key: 'a', text: '{1,2,3}' }, { key: 'b', text: '{1,3}' }, { key: 'c', text: '{2}' }, { key: 'd', text: '{1,2}' }
  ], answer: 'a', explanation: 'Union collects all elements without duplication.' },
]

export default function MathG11Sets() {
  return (
    <LessonModuleTemplate
      title="Sets"
      subject="Mathematics"
      grade={11}
      backLink="/lessons/Mathematics/11"
      lessonId="math-g11-sets"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
