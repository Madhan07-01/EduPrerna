import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const inverseTrigonometricFunctionsModule: LearningModule = {
  title: 'Inverse Trigonometric Functions',
  introduction: 'Welcome to the world of Inverse Trigonometric Functions! In earlier classes, you learned about trigonometric functions like sine, cosine, and tangent, which take an angle as input and give a ratio as output. Now we\'ll explore their inverses - functions that take a ratio as input and give an angle as output. These functions are essential in calculus, physics, engineering, and many areas of mathematics. Understanding inverse trigonometric functions will help you solve complex equations, evaluate integrals, and model real-world phenomena. Get ready to dive deep into these fascinating functions and discover their unique properties!',
  concepts: [
    {
      title: 'Definitions and Need for Inverse Trigonometric Functions',
      content: 'Inverse trigonometric functions "undo" the action of trigonometric functions. However, since trigonometric functions are periodic and not one-to-one over their entire domain, we must restrict their domains to define meaningful inverses. Each inverse function corresponds to a specific branch of its original function.',
      examples: [
        'Definition: If sin θ = x, then θ = sin⁻¹x (arcsine of x)',
        'Definition: If cos θ = x, then θ = cos⁻¹x (arccosine of x)',
        'Definition: If tan θ = x, then θ = tan⁻¹x (arctangent of x)',
        'Need for restriction: sin(0) = 0, sin(π) = 0, sin(2π) = 0, etc., so without restriction, sin⁻¹(0) would have multiple values',
        'Principal values: We define specific ranges for inverse functions to ensure they are one-to-one',
        'Notation: sin⁻¹x is also written as arcsin x, cos⁻¹x as arccos x, tan⁻¹x as arctan x'
      ]
    },
    {
      title: 'Principal Value Branches',
      content: 'To make inverse trigonometric functions single-valued, we define principal value branches - specific ranges of output values. These ranges ensure that each input corresponds to exactly one output, making the functions well-defined.',
      examples: [
        'y = sin⁻¹x (arcsin x): Domain [-1,1], Principal Value Range [-π/2, π/2]',
        'y = cos⁻¹x (arccos x): Domain [-1,1], Principal Value Range [0, π]',
        'y = tan⁻¹x (arctan x): Domain R (all real numbers), Principal Value Range (-π/2, π/2)',
        'y = cot⁻¹x (arccot x): Domain R, Principal Value Range (0, π)',
        'y = sec⁻¹x (arcsec x): Domain R - (-1,1), Principal Value Range [0, π] - {π/2}',
        'y = csc⁻¹x (arccsc x): Domain R - (-1,1), Principal Value Range [-π/2, π/2] - {0}',
        'Example: sin⁻¹(1/2) = π/6 (not 5π/6) because π/6 is in the principal range [-π/2, π/2]'
      ]
    },
    {
      title: 'Key Properties and Identities',
      content: 'Inverse trigonometric functions satisfy several important properties and identities that are useful for simplifying expressions and solving equations. These relationships help connect different inverse functions and establish connections with their original trigonometric counterparts.',
      examples: [
        'Reciprocal identities: sin⁻¹(1/x) = csc⁻¹x, cos⁻¹(1/x) = sec⁻¹x, tan⁻¹(1/x) = cot⁻¹x (for x > 0)',
        'Negative angle identities: sin⁻¹(-x) = -sin⁻¹x, cos⁻¹(-x) = π - cos⁻¹x, tan⁻¹(-x) = -tan⁻¹x',
        'Complementary angle identities: sin⁻¹x + cos⁻¹x = π/2, tan⁻¹x + cot⁻¹x = π/2',
        'Addition formulas: tan⁻¹x + tan⁻¹y = tan⁻¹((x+y)/(1-xy)) when xy < 1',
        'Example: sin⁻¹(√3/2) + cos⁻¹(√3/2) = π/3 + π/6 = π/2 (confirming sin⁻¹x + cos⁻¹x = π/2)',
        'Example: tan⁻¹(1) + tan⁻¹(2) + tan⁻¹(3) = π (using addition formulas)'
      ]
    },
    {
      title: 'Symmetry and Relationships Between Functions',
      content: 'Inverse trigonometric functions exhibit interesting symmetry properties and relationships with each other. Understanding these connections helps in simplifying complex expressions and solving problems more efficiently.',
      examples: [
        'Symmetry: sin⁻¹(-x) = -sin⁻¹x (odd function), cos⁻¹(-x) = π - cos⁻¹x (not odd or even)',
        'tan⁻¹(-x) = -tan⁻¹x (odd function), cot⁻¹(-x) = π - cot⁻¹x',
        'Relationship: cos⁻¹x = π/2 - sin⁻¹x (complementary relationship)',
        'Relationship: cot⁻¹x = π/2 - tan⁻¹x (complementary relationship)',
        'Example: sin⁻¹(1/√2) = π/4 and cos⁻¹(1/√2) = π/4, so sin⁻¹(1/√2) + cos⁻¹(1/√2) = π/2',
        'Example: tan⁻¹(1) = π/4 and cot⁻¹(1) = π/4, so tan⁻¹(1) + cot⁻¹(1) = π/2'
      ]
    },
    {
      title: 'Graphs of Inverse Trigonometric Functions',
      content: 'The graphs of inverse trigonometric functions are reflections of their corresponding trigonometric functions over the line y = x. These graphs help visualize the domain, range, and behavior of these functions, including their asymptotes and symmetry properties.',
      examples: [
        'y = sin⁻¹x: Domain [-1,1], Range [-π/2, π/2], Increasing function, Passes through origin',
        'y = cos⁻¹x: Domain [-1,1], Range [0, π], Decreasing function, Passes through (1,0) and (-1,π)',
        'y = tan⁻¹x: Domain R, Range (-π/2, π/2), Increasing function, Horizontal asymptotes at y = ±π/2',
        'Reflection property: The graph of y = sin⁻¹x is the reflection of y = sin x (restricted to [-π/2, π/2]) over y = x',
        'Asymptotes: tan⁻¹x has horizontal asymptotes at y = π/2 and y = -π/2',
        'Symmetry: sin⁻¹x is symmetric about origin (odd function), cos⁻¹x is not symmetric'
      ]
    },
    {
      title: 'Relationship to Original Trigonometric Functions',
      content: 'Inverse trigonometric functions and their original counterparts satisfy specific composition relationships. These relationships are fundamental to understanding how these functions interact and are crucial for solving equations involving both types of functions.',
      examples: [
        'Composition: sin(sin⁻¹x) = x for x ∈ [-1,1], but sin⁻¹(sinx) = x only for x ∈ [-π/2, π/2]',
        'Composition: cos(cos⁻¹x) = x for x ∈ [-1,1], but cos⁻¹(cosx) = x only for x ∈ [0, π]',
        'Composition: tan(tan⁻¹x) = x for all real x, but tan⁻¹(tanx) = x only for x ∈ (-π/2, π/2)',
        'Example: sin(sin⁻¹(1/2)) = 1/2, but sin⁻¹(sin(5π/6)) = sin⁻¹(1/2) = π/6 ≠ 5π/6',
        'Example: cos⁻¹(cos(3π/4)) = cos⁻¹(-√2/2) = 3π/4 (since 3π/4 is in [0, π])',
        'Important note: The composition relationships only hold when the input is in the appropriate domain'
      ]
    },
    {
      title: 'Evaluating and Simplifying Expressions',
      content: 'Evaluating expressions involving inverse trigonometric functions often requires using identities, properties, and sometimes trigonometric substitutions. Simplification techniques help convert complex expressions into more manageable forms.',
      examples: [
        'Direct evaluation: sin⁻¹(1/2) = π/6, cos⁻¹(0) = π/2, tan⁻¹(1) = π/4',
        'Using identities: tan⁻¹(1/2) + tan⁻¹(1/3) = tan⁻¹((1/2 + 1/3)/(1 - (1/2)(1/3))) = tan⁻¹(1) = π/4',
        'Simplification: sin⁻¹(cosx) = π/2 - x for x ∈ [0, π]',
        'Simplification: cos⁻¹(sinx) = π/2 - x for x ∈ [-π/2, π/2]',
        'Example: Simplify tan⁻¹(2) + tan⁻¹(3) = π - tan⁻¹(1) = π - π/4 = 3π/4',
        'Example: Evaluate sin⁻¹(sin(7π/6)) = sin⁻¹(-1/2) = -π/6 (principal value)'
      ]
    },
    {
      title: 'Practical Applications',
      content: 'Inverse trigonometric functions have numerous applications in mathematics, physics, engineering, and other fields. They appear in integration, geometry problems, wave analysis, and many real-world scenarios involving angles and ratios.',
      examples: [
        'Integration: ∫(1/(1+x²))dx = tan⁻¹x + C, ∫(1/√(1-x²))dx = sin⁻¹x + C',
        'Geometry: Finding angles in triangles when sides are known',
        'Physics: Calculating phase angles in wave equations and oscillations',
        'Engineering: Determining angles in structural analysis and mechanical systems',
        'Navigation: Calculating bearings and angles in navigation problems',
        'Example: In a right triangle with opposite side 3 and adjacent side 4, the angle = tan⁻¹(3/4)'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the principal value range of y = sin⁻¹x?',
      options: ['[0, π]', '[-π/2, π/2]', '(-π/2, π/2)', '[0, π] - {π/2}'],
      correct: 1,
      explanation: 'The principal value range of y = sin⁻¹x is [-π/2, π/2]. This range is chosen to make the function one-to-one and ensure that every value in the domain [-1,1] corresponds to exactly one angle in this range.'
    },
    {
      question: 'Which of the following is the domain of y = tan⁻¹x?',
      options: ['[-1, 1]', 'R - (-1, 1)', 'R', '[0, π]'],
      correct: 2,
      explanation: 'The domain of y = tan⁻¹x is all real numbers (R). Unlike sine and cosine inverses which are limited to [-1,1], the tangent function can take any real value, so its inverse can accept any real number as input.'
    },
    {
      question: 'What is the value of sin⁻¹(-1/2)?',
      options: ['π/6', '-π/6', '5π/6', '-5π/6'],
      correct: 1,
      explanation: 'We need to find the angle in the principal range [-π/2, π/2] whose sine is -1/2. Since sin(-π/6) = -1/2 and -π/6 is in [-π/2, π/2], sin⁻¹(-1/2) = -π/6.'
    },
    {
      question: 'Which identity is correct?',
      options: ['sin⁻¹x + cos⁻¹x = π', 'sin⁻¹x + cos⁻¹x = π/2', 'sin⁻¹x + cos⁻¹x = 0', 'sin⁻¹x + cos⁻¹x = 1'],
      correct: 1,
      explanation: 'The complementary angle identity states that sin⁻¹x + cos⁻¹x = π/2 for all x in the domain [-1,1]. This is because sine and cosine are cofunctions, and their angles are complementary.'
    },
    {
      question: 'What is the range of y = cos⁻¹x?',
      options: ['[-π/2, π/2]', '(-π/2, π/2)', '[0, π]', 'R'],
      correct: 2,
      explanation: 'The principal value range of y = cos⁻¹x is [0, π]. This range is chosen so that the function is one-to-one and covers all possible output values for the domain [-1,1].'
    },
    {
      question: 'Which of the following functions is odd?',
      options: ['sin⁻¹x', 'cos⁻¹x', 'sec⁻¹x', 'cot⁻¹x'],
      correct: 0,
      explanation: 'A function f(x) is odd if f(-x) = -f(x). For inverse sine: sin⁻¹(-x) = -sin⁻¹x, which satisfies the condition for an odd function. The other inverse trigonometric functions do not satisfy this property.'
    },
    {
      question: 'What is the value of tan⁻¹(1) + cot⁻¹(1)?',
      options: ['π/2', 'π', 'π/4', '0'],
      correct: 0,
      explanation: 'Using the complementary angle identity: tan⁻¹x + cot⁻¹x = π/2. Therefore, tan⁻¹(1) + cot⁻¹(1) = π/2. We can verify: tan⁻¹(1) = π/4 and cot⁻¹(1) = π/4, so their sum is π/2.'
    },
    {
      question: 'Which function has horizontal asymptotes?',
      options: ['sin⁻¹x', 'cos⁻¹x', 'tan⁻¹x', 'sec⁻¹x'],
      correct: 2,
      explanation: 'The function y = tan⁻¹x has horizontal asymptotes at y = π/2 and y = -π/2. As x approaches ∞, tan⁻¹x approaches π/2, and as x approaches -∞, tan⁻¹x approaches -π/2. The other inverse trigonometric functions do not have horizontal asymptotes.'
    },
    {
      question: 'What is sin⁻¹(sin(5π/6)) equal to?',
      options: ['5π/6', 'π/6', '-π/6', 'π/3'],
      correct: 1,
      explanation: 'Since 5π/6 is not in the principal range of sin⁻¹x (which is [-π/2, π/2]), we need to find an equivalent angle in that range. sin(5π/6) = sin(π - 5π/6) = sin(π/6) = 1/2. Since π/6 is in [-π/2, π/2], sin⁻¹(sin(5π/6)) = sin⁻¹(1/2) = π/6.'
    },
    {
      question: 'Which of the following is NOT a property of inverse trigonometric functions?',
      options: ['sin⁻¹(-x) = -sin⁻¹x', 'cos⁻¹(-x) = π - cos⁻¹x', 'tan⁻¹(x) + tan⁻¹(y) = tan⁻¹((x+y)/(1-xy)) for all x,y', 'sin⁻¹x + cos⁻¹x = π/2'],
      correct: 2,
      explanation: 'The addition formula tan⁻¹(x) + tan⁻¹(y) = tan⁻¹((x+y)/(1-xy)) is only valid when xy < 1. If xy ≥ 1, the formula requires adjustments by adding or subtracting π. The other properties listed are always true.'
    }
  ]
}

export default function InverseTrigonometricFunctionsModule() {
  return (
    <ModuleLayout 
      module={inverseTrigonometricFunctionsModule} 
      grade={12} 
      subject="Mathematics" 
    />
  )
}