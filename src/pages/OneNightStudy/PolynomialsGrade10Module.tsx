import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const polynomialsGrade10Module: LearningModule = {
  title: 'Polynomials',
  introduction: 'Welcome to the advanced world of Polynomials for Grade 10! Have you ever wondered how mathematicians can predict the behavior of complex curves, or how engineers design roller coasters with perfect loops and turns? The secret lies in polynomials! These powerful mathematical expressions are like the DNA of algebra - they contain all the information needed to understand curves, solve equations, and model real-world phenomena. From calculating the trajectory of rockets to optimizing business profits, from designing computer graphics to predicting population growth, polynomials are the mathematical tools that make it all possible. In this module, you\'ll master not just the basics, but the deep relationships between zeros and coefficients that unlock the true power of polynomial mathematics. Get ready to discover the elegant patterns that govern these mathematical masterpieces!',
  concepts: [
    {
      title: 'Definition and Basic Structure of Polynomials',
      content: 'A polynomial is an algebraic expression consisting of variables and coefficients, where variables have non-negative integer exponents. Understanding the anatomy of polynomials is crucial for mastering advanced algebraic concepts.',
      examples: [
        'General form: aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀',
        'Example: 3x⁴ - 5x³ + 2x² - 7x + 1',
        'Terms: Individual parts separated by + or - (3x⁴, -5x³, 2x², -7x, 1)',
        'Coefficients: Numbers multiplying variables (3, -5, 2, -7, 1)',
        'Leading coefficient: Coefficient of highest degree term (3 in above example)',
        'Constant term: Term without variable (1 in above example)'
      ]
    },
    {
      title: 'Degree of a Polynomial and Its Significance',
      content: 'The degree of a polynomial is the highest power of the variable and determines many important properties including the maximum number of zeros, the end behavior of graphs, and the complexity of solutions.',
      examples: [
        'In 2x⁵ - 3x³ + x - 4, the degree is 5',
        'In 7x² + 3x - 1, the degree is 2',
        'In 5x + 8, the degree is 1 (linear)',
        'In -3 (constant), the degree is 0',
        'Zero polynomial has degree -∞ by convention',
        'Higher degree → more complex behavior and more possible zeros'
      ]
    },
    {
      title: 'Classification of Polynomials by Degree',
      content: 'Each degree of polynomial has special names and characteristics. Understanding these classifications helps predict behavior and choose appropriate solution methods.',
      examples: [
        'Constant polynomial (degree 0): 5, -2, 100 → horizontal lines',
        'Linear polynomial (degree 1): 2x + 3, -x + 5 → straight lines',
        'Quadratic polynomial (degree 2): x² - 4x + 3, 2x² + x - 1 → parabolas',
        'Cubic polynomial (degree 3): x³ - 2x² + x - 1 → S-shaped curves',
        'Quartic polynomial (degree 4): x⁴ - 3x² + 2 → W-shaped curves',
        'Each type has specific applications and solution techniques'
      ]
    },
    {
      title: 'Zeros of a Polynomial - The Foundation',
      content: 'A zero (or root) of a polynomial p(x) is a value α such that p(α) = 0. Zeros are fundamental because they tell us where the polynomial graph crosses the x-axis and help us factor the polynomial.',
      examples: [
        'For p(x) = x² - 5x + 6, find zeros by solving x² - 5x + 6 = 0',
        'Factoring: (x - 2)(x - 3) = 0, so zeros are x = 2 and x = 3',
        'For p(x) = x³ - 6x² + 11x - 6, zeros are x = 1, 2, 3',
        'Geometric meaning: Points where graph intersects x-axis',
        'A polynomial of degree n can have at most n real zeros',
        'Zeros help us write factored form: p(x) = a(x - r₁)(x - r₂)...(x - rₙ)'
      ]
    },
    {
      title: 'Relationship Between Zeros and Coefficients - Quadratic Polynomials',
      content: 'For quadratic polynomials ax² + bx + c, there are beautiful relationships between the zeros and coefficients that provide shortcuts for solving and understanding these equations.',
      examples: [
        'For ax² + bx + c with zeros α and β:',
        'Sum of zeros: α + β = -b/a',
        'Product of zeros: αβ = c/a',
        'Example: x² - 5x + 6 has zeros 2 and 3',
        'Check: Sum = 2 + 3 = 5 = -(-5)/1 ✓',
        'Check: Product = 2 × 3 = 6 = 6/1 ✓',
        'These relationships help verify solutions and form equations from given zeros'
      ]
    },
    {
      title: 'Relationship Between Zeros and Coefficients - Cubic Polynomials',
      content: 'For cubic polynomials ax³ + bx² + cx + d with zeros α, β, and γ, there are three fundamental relationships that connect the zeros to the coefficients.',
      examples: [
        'For ax³ + bx² + cx + d with zeros α, β, γ:',
        'Sum of zeros: α + β + γ = -b/a',
        'Sum of products taken two at a time: αβ + βγ + αγ = c/a',
        'Product of zeros: αβγ = -d/a',
        'Example: x³ - 6x² + 11x - 6 with zeros 1, 2, 3',
        'Sum: 1 + 2 + 3 = 6 = -(-6)/1 ✓',
        'Sum of products: 1×2 + 2×3 + 1×3 = 11 = 11/1 ✓',
        'Product: 1×2×3 = 6 = -(-6)/1 ✓'
      ]
    },
    {
      title: 'Division Algorithm for Polynomials',
      content: 'The Division Algorithm states that for any polynomial f(x) and non-zero polynomial g(x), there exist unique polynomials q(x) and r(x) such that f(x) = g(x)×q(x) + r(x), where degree of r(x) < degree of g(x).',
      examples: [
        'Format: Dividend = Divisor × Quotient + Remainder',
        'f(x) = g(x) × q(x) + r(x)',
        'Example: Divide x³ + 2x² - 5x + 2 by x + 1',
        'Result: x³ + 2x² - 5x + 2 = (x + 1)(x² + x - 6) + 8',
        'Here: Quotient = x² + x - 6, Remainder = 8',
        'If remainder = 0, then g(x) is a factor of f(x)'
      ]
    },
    {
      title: 'Long Division of Polynomials - Step by Step',
      content: 'Long division of polynomials follows the same process as arithmetic long division. We divide term by term, multiply back, subtract, and repeat until the remainder has lower degree than the divisor.',
      examples: [
        'Divide 2x³ + 3x² - 5x + 1 by x + 2:',
        'Step 1: 2x³ ÷ x = 2x² (first term of quotient)',
        'Step 2: Multiply: 2x²(x + 2) = 2x³ + 4x²',
        'Step 3: Subtract: (2x³ + 3x²) - (2x³ + 4x²) = -x²',
        'Step 4: Bring down next term: -x² - 5x',
        'Continue process until remainder degree < divisor degree',
        'Final result: 2x² - x - 3 with remainder 7'
      ]
    },
    {
      title: 'Synthetic Division - An Efficient Shortcut',
      content: 'Synthetic division is a streamlined method for dividing polynomials by linear factors of the form (x - a). It requires less writing and reduces calculation errors while giving the same results as long division.',
      examples: [
        'Use only when dividing by (x - a) form',
        'Example: Divide x³ - 6x² + 11x - 6 by (x - 2)',
        'Write coefficients: 1, -6, 11, -6',
        'Use a = 2 in synthetic division setup',
        'Bring down first coefficient: 1',
        'Multiply and add pattern: 1×2 + (-6) = -4, then -4×2 + 11 = 3, etc.',
        'Result: x² - 4x + 3 with remainder 0'
      ]
    },
    {
      title: 'Applications and Problem Solving with Polynomials',
      content: 'Polynomials model countless real-world situations. Understanding how to set up, solve, and interpret polynomial equations is crucial for applying mathematics to practical problems.',
      examples: [
        'Projectile motion: Height h(t) = -16t² + 64t + 80',
        'Business: Profit P(x) = -x² + 50x - 400 (finding break-even)',
        'Geometry: Volume of box V(x) = x(10-2x)(8-2x)',
        'Physics: Displacement s(t) = t³ - 6t² + 9t + 2',
        'Economics: Revenue R(x) = x(100 - 2x) = 100x - 2x²',
        'Engineering: Stress analysis using cubic and quartic polynomials'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the degree of the polynomial 4x³ - 2x⁵ + 7x² - 3x + 1?',
      options: ['3', '4', '5', '6'],
      correct: 2,
      explanation: 'The degree of a polynomial is the highest power of the variable. In this polynomial, the highest power is 5 (from the term -2x⁵), so the degree is 5.'
    },
    {
      question: 'For the quadratic polynomial 3x² - 7x + 2, what is the sum of its zeros?',
      options: ['7/3', '-7/3', '2/3', '-2/3'],
      correct: 0,
      explanation: 'For a quadratic ax² + bx + c, the sum of zeros = -b/a. Here a = 3, b = -7, so sum = -(-7)/3 = 7/3.'
    },
    {
      question: 'If the zeros of the cubic polynomial x³ - 6x² + 11x - 6 are 1, 2, and 3, what is the product of the zeros?',
      options: ['6', '-6', '11', '-11'],
      correct: 0,
      explanation: 'For a cubic ax³ + bx² + cx + d, the product of zeros = -d/a. Here a = 1, d = -6, so product = -(-6)/1 = 6. We can verify: 1 × 2 × 3 = 6.'
    },
    {
      question: 'When x³ + 2x² - 5x + 2 is divided by (x + 1), what is the remainder according to the Remainder Theorem?',
      options: ['0', '10', '-10', '8'],
      correct: 3,
      explanation: 'By the Remainder Theorem, remainder = p(-1) = (-1)³ + 2(-1)² - 5(-1) + 2 = -1 + 2 + 5 + 2 = 8.'
    },
    {
      question: 'What type of polynomial is 2x⁴ - 3x² + 1 based on its degree?',
      options: ['Linear', 'Quadratic', 'Cubic', 'Quartic'],
      correct: 3,
      explanation: 'The highest power in 2x⁴ - 3x² + 1 is 4, making it a degree 4 polynomial. A degree 4 polynomial is called a quartic polynomial.'
    },
    {
      question: 'If (x - 3) is a factor of polynomial p(x) = x³ - 6x² + 11x - 6, what is p(3)?',
      options: ['0', '3', '6', '-6'],
      correct: 0,
      explanation: 'By the Factor Theorem, if (x - a) is a factor of p(x), then p(a) = 0. Since (x - 3) is a factor, p(3) must equal 0.'
    },
    {
      question: 'For the polynomial 2x² - 8x + 6, what is the product of its zeros?',
      options: ['3', '-3', '4', '-4'],
      correct: 0,
      explanation: 'For a quadratic ax² + bx + c, the product of zeros = c/a. Here a = 2, c = 6, so product = 6/2 = 3.'
    },
    {
      question: 'In the division algorithm f(x) = g(x) × q(x) + r(x), what must be true about the remainder r(x)?',
      options: ['r(x) = 0 always', 'degree of r(x) < degree of g(x)', 'degree of r(x) = degree of g(x)', 'r(x) is always constant'],
      correct: 1,
      explanation: 'In polynomial division, the remainder r(x) must have a degree less than the degree of the divisor g(x). This is a fundamental requirement of the division algorithm.'
    },
    {
      question: 'Which method would be most efficient to divide x³ - 8x² + 19x - 12 by (x - 3)?',
      options: ['Long division', 'Synthetic division', 'Factoring', 'Remainder theorem only'],
      correct: 1,
      explanation: 'Synthetic division is the most efficient method when dividing by a linear factor of the form (x - a). It requires fewer steps and less writing than long division.'
    },
    {
      question: 'If a cubic polynomial has zeros at x = -2, x = 1, and x = 4, what is the sum of all three zeros?',
      options: ['3', '-3', '7', '-7'],
      correct: 0,
      explanation: 'The sum of zeros is simply (-2) + 1 + 4 = 3. This can also be found using the relationship: sum of zeros = -b/a for the cubic form ax³ + bx² + cx + d.'
    }
  ]
}

export default function PolynomialsGrade10Module() {
  return (
    <ModuleLayout 
      module={polynomialsGrade10Module} 
      grade={10} 
      subject="Mathematics" 
    />
  )
}