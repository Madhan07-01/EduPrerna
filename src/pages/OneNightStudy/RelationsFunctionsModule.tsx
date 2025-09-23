import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const relationsFunctionsModule: LearningModule = {
  title: 'Relations and Functions',
  introduction: 'Welcome to the exciting world of Relations and Functions! In mathematics, relations and functions help us understand how different quantities are connected and how one quantity depends on another. Think of a function as a special kind of machine - you put something in (input), and it gives you something out (output) based on a specific rule. Relations and functions are everywhere around us: the relationship between students and their roll numbers, the connection between time and distance when traveling, or even the link between the amount of ingredients and the number of cookies you can bake. In this module, we\'ll explore the mathematical foundations of these concepts, learn how to represent them, and understand their properties. Get ready to discover how mathematics helps us model real-world relationships!',
  concepts: [
    {
      title: 'Cartesian Product of Sets',
      content: 'The Cartesian product of two sets A and B is the set of all ordered pairs (a, b) where a ∈ A and b ∈ B. It is denoted by A × B and represents all possible combinations of elements from both sets.',
      examples: [
        'If A = {1, 2} and B = {3, 4}, then A × B = {(1,3), (1,4), (2,3), (2,4)}',
        'If A = {a, b} and B = {1, 2, 3}, then A × B = {(a,1), (a,2), (a,3), (b,1), (b,2), (b,3)}',
        'Number of elements: If n(A) = m and n(B) = n, then n(A × B) = m × n',
        'A × B ≠ B × A in general (order matters in ordered pairs)',
        'A × A = A² = {(a₁, a₂) : a₁, a₂ ∈ A}',
        'R × R = Set of all points in the Cartesian plane (coordinate geometry connection)'
      ]
    },
    {
      title: 'Definition of a Relation',
      content: 'A relation R from set A to set B is a subset of the Cartesian product A × B. It defines how elements from set A are related to elements from set B. Relations can be represented using roster form, set-builder form, arrow diagrams, or Cartesian graphs.',
      examples: [
        'If A = {1, 2, 3} and B = {4, 5}, then R = {(1,4), (2,5), (3,4)} is a relation from A to B',
        'Domain: Set of all first elements in ordered pairs of R',
        'Co-domain: Set B (the second set in the relation)',
        'Range: Set of all second elements in ordered pairs of R',
        'Example: For R = {(1,4), (2,5), (3,4)}, Domain = {1,2,3}, Co-domain = {4,5}, Range = {4,5}',
        'Empty relation: R = ∅ (no elements are related)'
      ]
    },
    {
      title: 'Types of Relations - Empty, Universal, and Identity',
      content: 'Relations can be classified based on their properties. Empty relations have no related elements, universal relations relate all elements, and identity relations relate each element to itself.',
      examples: [
        'Empty relation: R = ∅ ⊆ A × A (no element is related to any element)',
        'Universal relation: R = A × A (every element is related to every element)',
        'Identity relation: R = {(a,a) : a ∈ A} (each element is related to itself only)',
        'Example: If A = {1, 2}, Empty = {}, Universal = {(1,1),(1,2),(2,1),(2,2)}, Identity = {(1,1),(2,2)}',
        'Trivial relations: Empty and universal relations are called trivial relations',
        'Void relation: Another name for empty relation'
      ]
    },
    {
      title: 'Types of Relations - Reflexive, Symmetric, and Transitive',
      content: 'Relations can have special properties: reflexive (every element is related to itself), symmetric (if a is related to b, then b is related to a), and transitive (if a is related to b and b is related to c, then a is related to c).',
      examples: [
        'Reflexive: (a,a) ∈ R for all a ∈ A',
        'Symmetric: If (a,b) ∈ R, then (b,a) ∈ R',
        'Transitive: If (a,b) ∈ R and (b,c) ∈ R, then (a,c) ∈ R',
        'Example: On set A = {1,2,3}, R = {(1,1),(2,2),(3,3),(1,2),(2,1)} is reflexive and symmetric',
        'Example: R = {(1,1),(2,2),(3,3),(1,2),(2,3),(1,3)} is reflexive and transitive',
        'Example: R = {(1,1),(2,2),(3,3)} is reflexive, symmetric, and transitive'
      ]
    },
    {
      title: 'Types of Relations - Equivalence Relation',
      content: 'An equivalence relation is a relation that is reflexive, symmetric, and transitive simultaneously. Equivalence relations partition a set into disjoint subsets called equivalence classes.',
      examples: [
        'Definition: R is equivalence if it is reflexive, symmetric, and transitive',
        'Example: "Is equal to" on the set of real numbers',
        'Example: "Has the same birthday as" on the set of people',
        'Example: "Is parallel to" on the set of lines in a plane',
        'Equivalence class: [a] = {x : (x,a) ∈ R} (set of all elements related to a)',
        'Partition: Equivalence classes form a partition of the set (no overlap, cover entire set)'
      ]
    },
    {
      title: 'Definition of a Function',
      content: 'A function f from set A to set B is a special type of relation where every element in A is associated with exactly one element in B. Functions are denoted by f: A → B, where A is the domain and B is the co-domain.',
      examples: [
        'Every element in domain A must have an image in B',
        'No element in A can have more than one image in B',
        'Some elements in B may not be images of any element in A',
        'Example: f = {(1,2), (2,3), (3,4)} from A = {1,2,3} to B = {2,3,4,5} is a function',
        'Example: f = {(1,2), (1,3), (2,4)} is NOT a function (1 has two images)',
        'Functions can be represented as f(x) = y or y = f(x)'
      ]
    },
    {
      title: 'Components of a Function - Domain, Co-domain, and Range',
      content: 'Every function has three important components: domain (set of input values), co-domain (set of possible output values), and range (set of actual output values). Understanding these components is crucial for working with functions.',
      examples: [
        'Domain: Set of all input values (first elements in ordered pairs)',
        'Co-domain: Set of all possible output values (the second set in f: A → B)',
        'Range: Set of all actual output values (second elements in ordered pairs)',
        'Example: f: R → R defined by f(x) = x², Domain = R, Co-domain = R, Range = [0,∞)',
        'Range ⊆ Co-domain (range is always a subset of co-domain)',
        'Example: f = {(1,2), (2,3), (3,2)} has Domain = {1,2,3}, Co-domain = {2,3}, Range = {2,3}'
      ]
    },
    {
      title: 'Types of Functions - One-One (Injective)',
      content: 'A function is one-one (injective) if different elements in the domain have different images in the co-domain. No two elements in the domain map to the same element in the co-domain.',
      examples: [
        'Definition: f is one-one if f(a₁) = f(a₂) implies a₁ = a₂',
        'Horizontal line test: A function is one-one if every horizontal line intersects its graph at most once',
        'Example: f(x) = 2x + 1 is one-one (linear functions with non-zero slope)',
        'Example: f(x) = x² is NOT one-one on R (f(2) = f(-2) = 4)',
        'Example: f(x) = x³ is one-one on R',
        'One-one functions have inverse functions (under certain conditions)'
      ]
    },
    {
      title: 'Types of Functions - Onto (Surjective)',
      content: 'A function is onto (surjective) if every element in the co-domain is the image of at least one element in the domain. The range equals the co-domain for onto functions.',
      examples: [
        'Definition: f: A → B is onto if for every b ∈ B, there exists a ∈ A such that f(a) = b',
        'Range = Co-domain for onto functions',
        'Example: f: R → R defined by f(x) = x³ is onto',
        'Example: f: R → R defined by f(x) = x² is NOT onto (negative numbers have no pre-image)',
        'Example: f: R → [0,∞) defined by f(x) = x² IS onto',
        'Onto functions "cover" the entire co-domain'
      ]
    },
    {
      title: 'Types of Functions - Bijective and Inverse Functions',
      content: 'A function is bijective if it is both one-one and onto. Bijective functions have inverses, which "reverse" the action of the original function. Composition of functions combines two functions to create a new function.',
      examples: [
        'Bijective: Function that is both injective (one-one) and surjective (onto)',
        'Example: f: R → R defined by f(x) = 2x + 3 is bijective',
        'Inverse function: f⁻¹: B → A such that f⁻¹(f(x)) = x and f(f⁻¹(y)) = y',
        'Condition for inverse: Function must be bijective (one-one and onto)',
        'Composition: (f∘g)(x) = f(g(x)) and (g∘f)(x) = g(f(x))',
        'Example: If f(x) = 2x and g(x) = x + 1, then (f∘g)(x) = f(g(x)) = f(x+1) = 2(x+1) = 2x + 2'
      ]
    }
  ],
  mcqs: [
    {
      question: 'If A = {1, 2} and B = {3, 4, 5}, what is A × B?',
      options: ['{(1,3), (1,4), (1,5)}', '{(1,3), (1,4), (1,5), (2,3), (2,4), (2,5)}', '{(3,1), (4,1), (5,1), (3,2), (4,2), (5,2)}', '{(1,2), (3,4), (5,6)}'],
      correct: 1,
      explanation: 'The Cartesian product A × B contains all ordered pairs (a,b) where a ∈ A and b ∈ B. So A × B = {(1,3), (1,4), (1,5), (2,3), (2,4), (2,5)}. Note that the order matters: the first element comes from A, the second from B.'
    },
    {
      question: 'What is the defining characteristic of a function?',
      options: ['Every element in the domain can have multiple images', 'Every element in the domain has exactly one image', 'Some elements in the domain have no images', 'Elements in the co-domain must have pre-images'],
      correct: 1,
      explanation: 'A function is a special type of relation where every element in the domain is associated with exactly one element in the co-domain. This is the key difference between a general relation and a function.'
    },
    {
      question: 'Which of the following relations on set A = {1, 2, 3} is reflexive?',
      options: ['{(1,2), (2,3), (3,1)}', '{(1,1), (2,2)}', '{(1,1), (2,2), (3,3), (1,2), (2,1)}', '{(1,2), (2,1)}'],
      correct: 2,
      explanation: 'A relation is reflexive if every element is related to itself, meaning (a,a) must be in the relation for all a ∈ A. Option 3 contains (1,1), (2,2), and (3,3), making it reflexive.'
    },
    {
      question: 'What is an equivalence relation?',
      options: ['A relation that is only reflexive', 'A relation that is reflexive and symmetric', 'A relation that is reflexive, symmetric, and transitive', 'A relation that is symmetric and transitive'],
      correct: 2,
      explanation: 'An equivalence relation must satisfy all three properties: reflexive (every element is related to itself), symmetric (if a is related to b, then b is related to a), and transitive (if a is related to b and b is related to c, then a is related to c).'
    },
    {
      question: 'What is the difference between co-domain and range of a function?',
      options: ['There is no difference', 'Range is a subset of co-domain', 'Co-domain is a subset of range', 'Range and co-domain are always equal'],
      correct: 1,
      explanation: 'The co-domain is the set of all possible output values, while the range is the set of actual output values. The range is always a subset of the co-domain. For example, if f: R → R is defined by f(x) = x², the co-domain is R but the range is [0,∞).'
    },
    {
      question: 'What does it mean for a function to be one-one (injective)?',
      options: ['Different elements in domain have the same image', 'Every element in co-domain has a pre-image', 'Different elements in domain have different images', 'The function covers the entire co-domain'],
      correct: 2,
      explanation: 'A function is one-one (injective) if different elements in the domain have different images in the co-domain. In other words, if f(a₁) = f(a₂), then a₁ = a₂. This means no two different inputs can produce the same output.'
    },
    {
      question: 'When is a function considered onto (surjective)?',
      options: ['When it is one-one', 'When every element in the co-domain is the image of at least one element in the domain', 'When the domain equals the co-domain', 'When it has an inverse'],
      correct: 1,
      explanation: 'A function is onto (surjective) if every element in the co-domain is the image of at least one element in the domain. This means the range equals the co-domain, and every possible output value is actually achieved by some input.'
    },
    {
      question: 'What condition must be satisfied for a function to have an inverse?',
      options: ['It must be one-one', 'It must be onto', 'It must be both one-one and onto', 'It must be defined on real numbers'],
      correct: 2,
      explanation: 'A function has an inverse if and only if it is bijective, meaning it is both one-one (injective) and onto (surjective). Only bijective functions have inverses because they establish a perfect one-to-one correspondence between the domain and co-domain.'
    },
    {
      question: 'If f(x) = 2x + 3 and g(x) = x - 1, what is (f∘g)(x)?',
      options: ['2x + 1', '2x + 2', '2x - 1', '2x + 5'],
      correct: 0,
      explanation: 'The composition (f∘g)(x) means f(g(x)). First we apply g: g(x) = x - 1. Then we apply f to this result: f(g(x)) = f(x - 1) = 2(x - 1) + 3 = 2x - 2 + 3 = 2x + 1.'
    },
    {
      question: 'Which of the following is NOT a type of relation?',
      options: ['Reflexive', 'Symmetric', 'Transitive', 'Continuous'],
      correct: 3,
      explanation: 'Reflexive, symmetric, and transitive are all properties that relations can have. "Continuous" is a property of functions, not relations. A relation can be reflexive (every element is related to itself), symmetric (if a is related to b, then b is related to a), or transitive (if a is related to b and b is related to c, then a is related to c).'
    },
    {
      question: 'What is the domain of the function f(x) = √(x - 2)?',
      options: ['All real numbers', 'x ≥ 2', 'x > 2', 'x ≤ 2'],
      correct: 1,
      explanation: 'For the function f(x) = √(x - 2) to be defined, the expression under the square root must be non-negative. So we need x - 2 ≥ 0, which means x ≥ 2. Therefore, the domain is all real numbers greater than or equal to 2.'
    }
  ]
}

export default function RelationsFunctionsModule() {
  return (
    <ModuleLayout 
      module={relationsFunctionsModule} 
      grade={11} 
      subject="Mathematics" 
    />
  )
}
