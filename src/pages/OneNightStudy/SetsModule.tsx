import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const setsModule: LearningModule = {
  title: 'Sets',
  introduction: 'Welcome to the fascinating world of Sets! Sets are one of the most fundamental concepts in mathematics, serving as the building blocks for almost all mathematical theories. Think of a set as a collection of well-defined objects, just like how your backpack contains a collection of school supplies. In this module, we\'ll explore how mathematicians organize and work with collections of objects, learn about different types of sets, and discover powerful tools like Venn diagrams that help us visualize relationships between sets. Understanding sets will not only strengthen your mathematical foundation but also enhance your logical thinking skills. Get ready to dive into this essential mathematical concept!',
  concepts: [
    {
      title: 'Definition and Representation of Sets',
      content: 'A set is a well-defined collection of distinct objects, called elements or members. Sets are usually denoted by capital letters, and their elements are listed within curly braces { }. The concept of sets helps us organize and categorize mathematical objects systematically.',
      examples: [
        'Set notation: A = {1, 2, 3, 4, 5} (set of first five natural numbers)',
        'Elements: The objects in a set (1, 2, 3, 4, 5 are elements of set A)',
        'Membership: 3 ∈ A (3 belongs to set A), 6 ∉ A (6 does not belong to set A)',
        'Roster form: Listing all elements {a, e, i, o, u} (vowels in English alphabet)',
        'Set-builder form: {x : x is a vowel in English alphabet} (describing the property)',
        'Empty set representation: {} or ∅ (set with no elements)'
      ]
    },
    {
      title: 'Types of Sets - Finite and Infinite Sets',
      content: 'Sets can be classified based on the number of elements they contain. Finite sets have a countable number of elements, while infinite sets have an uncountable number of elements that go on indefinitely.',
      examples: [
        'Finite set: A = {1, 2, 3, 4, 5} (exactly 5 elements)',
        'Finite set: B = {x : x is a month in a year} (exactly 12 elements)',
        'Infinite set: N = {1, 2, 3, 4, 5, ...} (natural numbers, goes on forever)',
        'Infinite set: Z = {..., -2, -1, 0, 1, 2, ...} (integers, extends infinitely in both directions)',
        'Empty set: {} or ∅ (contains no elements)',
        'Singleton set: {5} (contains exactly one element)'
      ]
    },
    {
      title: 'Types of Sets - Empty (Null) Set',
      content: 'An empty set, also called a null set or void set, is a set that contains no elements. It is represented by {} or ∅. The empty set is unique and is a subset of every set.',
      examples: [
        'Empty set: {} or ∅ (no elements at all)',
        'Examples: {x : x is a natural number between 3 and 4} = {}',
        'Examples: {x : x² = -1, x is a real number} = {}',
        'Cardinality: n(∅) = 0 (empty set has zero elements)',
        'Subset property: ∅ ⊆ A for any set A',
        'Important: {∅} is not empty - it contains one element (the empty set itself)'
      ]
    },
    {
      title: 'Types of Sets - Subset and Superset',
      content: 'A set A is a subset of set B if every element of A is also an element of B. This relationship is denoted as A ⊆ B. If A is a subset of B and A ≠ B, then A is a proper subset of B, denoted as A ⊂ B.',
      examples: [
        'Subset: If A = {1, 2} and B = {1, 2, 3, 4}, then A ⊆ B',
        'Proper subset: If A = {1, 2} and B = {1, 2, 3, 4}, then A ⊂ B',
        'Every set is a subset of itself: A ⊆ A',
        'Empty set is subset of every set: ∅ ⊆ A for any set A',
        'Number of subsets: If set A has n elements, it has 2ⁿ subsets',
        'Example: {a, b} has 4 subsets: {}, {a}, {b}, {a, b}'
      ]
    },
    {
      title: 'Types of Sets - Power Set',
      content: 'The power set of a set A is the set of all possible subsets of A, including the empty set and A itself. If A has n elements, then its power set has 2ⁿ elements.',
      examples: [
        'If A = {a, b}, then P(A) = { {}, {a}, {b}, {a, b} }',
        'If B = {1, 2, 3}, then P(B) = { {}, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3} }',
        'Cardinality: If n(A) = n, then n(P(A)) = 2ⁿ',
        'Power set of empty set: P(∅) = { {} } (has one element, which is the empty set)',
        'Power set always contains at least one element (the empty set)',
        'Example: Set with 3 elements has 2³ = 8 subsets in its power set'
      ]
    },
    {
      title: 'Types of Sets - Universal Set',
      content: 'A universal set is a set that contains all objects under consideration in a particular context. All other sets in that context are subsets of the universal set. It is usually denoted by U.',
      examples: [
        'If we\'re studying natural numbers, U = {1, 2, 3, 4, ...}',
        'If we\'re studying letters, U = {a, b, c, ..., x, y, z}',
        'In Venn diagrams, universal set is represented by a rectangle',
        'All sets in a problem are subsets of the universal set',
        'Example: If A = {1, 2, 3} and B = {3, 4, 5}, we might choose U = {1, 2, 3, 4, 5}',
        'Choice of universal set depends on the context of the problem'
      ]
    },
    {
      title: 'Venn Diagrams - Visualizing Set Relationships',
      content: 'Venn diagrams are graphical representations of sets and their relationships. They use overlapping circles within a rectangle (representing the universal set) to show how sets intersect, are disjoint, or are subsets of each other.',
      examples: [
        'Universal set: Rectangle enclosing all circles',
        'Sets: Circles within the rectangle',
        'Intersection: Overlapping regions of circles',
        'Disjoint sets: Non-overlapping circles',
        'Subset: One circle completely inside another',
        'Complement: Region inside rectangle but outside the circle'
      ]
    },
    {
      title: 'Basic Set Operations - Union',
      content: 'The union of two sets A and B is the set of all elements that belong to either A or B or both. It is denoted by A ∪ B and read as "A union B". The union operation combines all elements from both sets without repetition.',
      examples: [
        'Definition: A ∪ B = {x : x ∈ A or x ∈ B}',
        'Example: If A = {1, 2, 3} and B = {3, 4, 5}, then A ∪ B = {1, 2, 3, 4, 5}',
        'Properties: A ∪ B = B ∪ A (commutative), A ∪ A = A (idempotent)',
        'Identity: A ∪ ∅ = A, A ∪ U = U',
        'Subset property: If A ⊆ B, then A ∪ B = B',
        'Three sets: A ∪ B ∪ C = {x : x ∈ A or x ∈ B or x ∈ C}'
      ]
    },
    {
      title: 'Basic Set Operations - Intersection',
      content: 'The intersection of two sets A and B is the set of all elements that belong to both A and B. It is denoted by A ∩ B and read as "A intersection B". The intersection operation finds common elements between sets.',
      examples: [
        'Definition: A ∩ B = {x : x ∈ A and x ∈ B}',
        'Example: If A = {1, 2, 3} and B = {3, 4, 5}, then A ∩ B = {3}',
        'Properties: A ∩ B = B ∩ A (commutative), A ∩ A = A (idempotent)',
        'Identity: A ∩ ∅ = ∅, A ∩ U = A',
        'Disjoint sets: If A ∩ B = ∅, sets A and B are disjoint',
        'Subset property: If A ⊆ B, then A ∩ B = A'
      ]
    },
    {
      title: 'Basic Set Operations - Difference and Complement',
      content: 'The difference of sets A and B (A - B) is the set of elements that belong to A but not to B. The complement of a set A (A\') is the set of all elements in the universal set that do not belong to A.',
      examples: [
        'Difference: A - B = {x : x ∈ A and x ∉ B}',
        'Example: If A = {1, 2, 3, 4} and B = {3, 4, 5}, then A - B = {1, 2}',
        'Complement: A\' = {x : x ∈ U and x ∉ A} or A\' = U - A',
        'Example: If U = {1, 2, 3, 4, 5} and A = {1, 2}, then A\' = {3, 4, 5}',
        'Properties: A - A = ∅, A - ∅ = A, ∅\' = U, U\' = ∅',
        'Relationship: (A\')\' = A (complement of complement is the original set)'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the correct definition of a set?',
      options: ['A random collection of numbers', 'A well-defined collection of distinct objects', 'A group of similar shapes', 'A collection of only even numbers'],
      correct: 1,
      explanation: 'A set is a well-defined collection of distinct objects, called elements or members. "Well-defined" means we can determine exactly which objects belong to the set and which do not.'
    },
    {
      question: 'Which of the following represents the set of first five even natural numbers in roster form?',
      options: ['{2, 4, 6, 8, 10}', '{1, 2, 3, 4, 5}', '{0, 2, 4, 6, 8}', '{2, 4, 6, 8, 10, 12}'],
      correct: 0,
      explanation: 'The first five even natural numbers are 2, 4, 6, 8, and 10. In roster form, we list all elements within curly braces, so the set is {2, 4, 6, 8, 10}.'
    },
    {
      question: 'What is the difference between a finite set and an infinite set?',
      options: ['Finite sets have even numbers, infinite sets have odd numbers', 'Finite sets have a countable number of elements, infinite sets have uncountable elements', 'Finite sets are small, infinite sets are large', 'There is no difference'],
      correct: 1,
      explanation: 'Finite sets have a countable number of elements (you can count them all), while infinite sets have an uncountable number of elements that go on indefinitely. For example, {1, 2, 3} is finite, but {1, 2, 3, 4, ...} is infinite.'
    },
    {
      question: 'What is an empty set?',
      options: ['A set containing zero', 'A set with no elements', 'A set containing one element', 'A set that is very small'],
      correct: 1,
      explanation: 'An empty set, also called a null set, is a set that contains no elements. It is represented by {} or ∅. For example, the set of natural numbers between 3 and 4 is empty since there are no natural numbers between 3 and 4.'
    },
    {
      question: 'If A = {1, 2} and B = {1, 2, 3, 4}, which statement is true?',
      options: ['A is not a subset of B', 'A is a proper subset of B', 'B is a subset of A', 'A and B are equal sets'],
      correct: 1,
      explanation: 'A is a proper subset of B (A ⊂ B) because every element of A is also in B, but B contains elements (3 and 4) that are not in A. We write this as A ⊂ B.'
    },
    {
      question: 'What is the power set of A = {a, b}?',
      options: ['{a, b}', '{ {}, {a}, {b} }', '{ {}, {a}, {b}, {a, b} }', '{ {a}, {b}, {a, b} }'],
      correct: 2,
      explanation: 'The power set of A contains all possible subsets of A, including the empty set and A itself. The subsets of {a, b} are: {}, {a}, {b}, and {a, b}. So P(A) = { {}, {a}, {b}, {a, b} }.'
    },
    {
      question: 'In a Venn diagram, what does the overlapping region of two circles represent?',
      options: ['Union of sets', 'Difference of sets', 'Intersection of sets', 'Complement of sets'],
      correct: 2,
      explanation: 'In a Venn diagram, the overlapping region of two circles represents the intersection of sets, which contains elements that belong to both sets. The union would be the entire area covered by both circles.'
    },
    {
      question: 'If A = {1, 2, 3} and B = {3, 4, 5}, what is A ∪ B?',
      options: ['{3}', '{1, 2, 3, 4, 5}', '{1, 2}', '{4, 5}'],
      correct: 1,
      explanation: 'The union A ∪ B contains all elements that belong to either A or B or both. So A ∪ B = {1, 2, 3, 4, 5}. Note that we don\'t repeat the common element 3.'
    },
    {
      question: 'If A = {1, 2, 3} and B = {3, 4, 5}, what is A ∩ B?',
      options: ['{1, 2, 3, 4, 5}', '{1, 2}', '{3}', '{4, 5}'],
      correct: 2,
      explanation: 'The intersection A ∩ B contains only elements that belong to both A and B. The only common element between A and B is 3, so A ∩ B = {3}.'
    },
    {
      question: 'If U = {1, 2, 3, 4, 5} and A = {1, 2}, what is A\' (complement of A)?',
      options: ['{1, 2}', '{3, 4, 5}', '{1, 2, 3, 4, 5}', '{}'],
      correct: 1,
      explanation: 'The complement of A (A\') contains all elements in the universal set U that do not belong to A. Since U = {1, 2, 3, 4, 5} and A = {1, 2}, the complement A\' = {3, 4, 5}.'
    }
  ]
}

export default function SetsModule() {
  return (
    <ModuleLayout 
      module={setsModule} 
      grade={11} 
      subject="Mathematics" 
    />
  )
}