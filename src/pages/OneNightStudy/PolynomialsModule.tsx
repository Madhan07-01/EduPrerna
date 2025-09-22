import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const polynomialsModule: LearningModule = {
  title: 'Polynomials',
  introduction: 'Welcome to the exciting world of Polynomials! Think of polynomials as mathematical expressions that are like building blocks made of variables and numbers. Just as you can build amazing structures with different types of blocks, you can create powerful mathematical expressions using polynomials. From calculating the area of complex shapes to predicting patterns in real life, polynomials are everywhere around us! Whether it\'s the path of a basketball through the air or the growth of your savings account, polynomials help us understand and solve amazing problems. Get ready to master these mathematical powerhouses and discover how they make complex calculations simple and elegant!',
  concepts: [
    {
      title: 'Definition of a Polynomial and Key Terms',
      content: 'A polynomial is a mathematical expression consisting of variables, coefficients, and exponents, where the exponents are non-negative integers. Think of it as a mathematical recipe with specific ingredients that follow certain rules.',
      examples: [
        'Example: 3x² + 5x - 7 is a polynomial',
        'Variable: The letter (like x, y, z) that represents an unknown value',
        'Coefficient: The number in front of the variable (3 and 5 in the example above)',
        'Constant term: The number without a variable (-7 in the example)',
        'Exponent: The power to which the variable is raised (2 in x²)',
        'Terms: Each part separated by + or - signs (3x², 5x, and -7 are three terms)'
      ]
    },
    {
      title: 'Degree of a Polynomial',
      content: 'The degree of a polynomial is the highest power (exponent) of the variable in the expression. It tells us the most important characteristic of the polynomial and helps determine its behavior.',
      examples: [
        'In 4x³ + 2x² - x + 5, the degree is 3 (highest exponent)',
        'In 7x² - 3x + 1, the degree is 2',
        'In 5x + 8, the degree is 1',
        'In 9 (constant), the degree is 0',
        'The degree helps us understand how the polynomial behaves for large values'
      ]
    },
    {
      title: 'Types of Polynomials Based on Number of Terms',
      content: 'Polynomials are classified based on how many terms they contain. Just like we classify vehicles as bicycles, tricycles, or cars based on wheels, we classify polynomials based on terms.',
      examples: [
        'Monomial: One term only → 5x², -3y, 7, 2x³',
        'Binomial: Exactly two terms → 3x + 5, x² - 4, 2y + 7',
        'Trinomial: Exactly three terms → x² + 3x + 2, 2y² - y + 1',
        'Polynomial: General term for expressions with one or more terms',
        'Real-life example: Monomial could represent simple interest, binomial could represent profit equation'
      ]
    },
    {
      title: 'Types of Polynomials Based on Degree',
      content: 'Polynomials are also classified by their degree, which determines their complexity and the shape of their graphs. Each type has specific characteristics and applications.',
      examples: [
        'Linear polynomial (degree 1): 2x + 3, -5y + 7 → forms straight lines',
        'Quadratic polynomial (degree 2): x² + 4x + 3, 2y² - y + 1 → forms parabolas',
        'Cubic polynomial (degree 3): x³ + 2x² - x + 5 → has more complex curves',
        'Constant polynomial (degree 0): 5, -2, 10 → horizontal lines',
        'Applications: Linear for simple relationships, quadratic for projectile motion'
      ]
    },
    {
      title: 'Zero of a Polynomial - Where the Magic Happens',
      content: 'A zero of a polynomial is a value of the variable that makes the entire polynomial equal to zero. It\'s like finding the exact spot where a function crosses the x-axis.',
      examples: [
        'For p(x) = x - 3, the zero is x = 3 because p(3) = 3 - 3 = 0',
        'For p(x) = x² - 4, the zeros are x = 2 and x = -2',
        'To find zeros, set the polynomial equal to zero and solve',
        'Zeros are also called roots or solutions of the polynomial',
        'Real-life meaning: Zeros represent break-even points, intersection points, or equilibrium states'
      ]
    },
    {
      title: 'Finding Zeros by Factoring',
      content: 'One of the most powerful methods to find zeros is factoring, which means breaking down the polynomial into simpler parts that multiply together. It\'s like reverse-engineering a complex machine into its basic components.',
      examples: [
        'x² - 5x + 6 = (x - 2)(x - 3), so zeros are x = 2 and x = 3',
        'x² - 9 = (x - 3)(x + 3), so zeros are x = 3 and x = -3',
        'x² + 7x + 12 = (x + 3)(x + 4), so zeros are x = -3 and x = -4',
        'When factored as (x - a)(x - b) = 0, then x = a or x = b',
        'Factoring makes complex polynomials much easier to understand and solve'
      ]
    },
    {
      title: 'The Remainder Theorem - A Shortcut to Division',
      content: 'The Remainder Theorem provides a quick way to find the remainder when dividing a polynomial by (x - a). It states that when p(x) is divided by (x - a), the remainder equals p(a).',
      examples: [
        'To find remainder when x³ + 2x² - 5x + 1 is divided by (x - 2), calculate p(2)',
        'p(2) = 2³ + 2(2²) - 5(2) + 1 = 8 + 8 - 10 + 1 = 7',
        'So the remainder is 7, without doing long division!',
        'This theorem saves time and reduces calculation errors',
        'Very useful for checking if a number is a zero of the polynomial'
      ]
    },
    {
      title: 'The Factor Theorem - Finding Factors Made Easy',
      content: 'The Factor Theorem is closely related to the Remainder Theorem. It states that (x - a) is a factor of polynomial p(x) if and only if p(a) = 0. This gives us a powerful tool for factoring.',
      examples: [
        'If p(x) = x³ - 6x² + 11x - 6 and p(1) = 0, then (x - 1) is a factor',
        'Check: p(1) = 1 - 6 + 11 - 6 = 0 ✓, so (x - 1) is indeed a factor',
        'If p(a) = 0, then both: a is a zero AND (x - a) is a factor',
        'This helps us factor polynomials systematically',
        'Very useful for solving higher degree polynomial equations'
      ]
    },
    {
      title: 'Applying the Factor Theorem Step by Step',
      content: 'The Factor Theorem can be used systematically to factor polynomials completely. By testing possible values and using the theorem, we can break down complex polynomials into simpler factors.',
      examples: [
        'For p(x) = x³ - 7x + 6, test p(1): 1 - 7 + 6 = 0, so (x - 1) is a factor',
        'Test p(2): 8 - 14 + 6 = 0, so (x - 2) is also a factor',
        'Test p(-3): -27 + 21 + 6 = 0, so (x + 3) is also a factor',
        'Therefore: x³ - 7x + 6 = (x - 1)(x - 2)(x + 3)',
        'This method helps solve equations like x³ - 7x + 6 = 0 easily'
      ]
    },
    {
      title: 'Real-World Applications of Polynomials',
      content: 'Polynomials aren\'t just abstract math - they appear everywhere in real life! From physics to economics, from engineering to biology, polynomials help us model and solve practical problems.',
      examples: [
        'Physics: Height of projectile = -16t² + 64t + 80 (quadratic)',
        'Economics: Profit = -2x² + 100x - 800 (finding break-even points)',
        'Engineering: Volume calculations for irregular shapes',
        'Computer graphics: Curves and animations using polynomial equations',
        'Medicine: Dosage calculations and drug concentration over time',
        'Architecture: Designing arches and curved structures'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the degree of the polynomial 5x³ + 2x² - 7x + 1?',
      options: ['1', '2', '3', '4'],
      correct: 2,
      explanation: 'The degree of a polynomial is the highest power of the variable. In 5x³ + 2x² - 7x + 1, the highest power is 3 (in the term 5x³).'
    },
    {
      question: 'Which of the following is a binomial?',
      options: ['5x³', '3x² + 2x - 1', '7x - 4', '2x² + 3x + 1 + 5x'],
      correct: 2,
      explanation: 'A binomial has exactly two terms. 7x - 4 has two terms: 7x and -4. The first option is a monomial, the second and fourth are trinomials (or can be simplified to trinomials).'
    },
    {
      question: 'What is a zero of the polynomial p(x) = x² - 9?',
      options: ['x = 0', 'x = 3', 'x = 9', 'x = -9'],
      correct: 1,
      explanation: 'A zero makes the polynomial equal to zero. For p(x) = x² - 9, when x = 3: p(3) = 3² - 9 = 9 - 9 = 0. Note that x = -3 is also a zero, but it\'s not among the options.'
    },
    {
      question: 'According to the Remainder Theorem, what is the remainder when x³ + 2x - 5 is divided by (x - 1)?',
      options: ['-2', '0', '2', '3'],
      correct: 0,
      explanation: 'By the Remainder Theorem, the remainder equals p(1). So p(1) = 1³ + 2(1) - 5 = 1 + 2 - 5 = -2.'
    },
    {
      question: 'If p(2) = 0 for polynomial p(x), what can we conclude using the Factor Theorem?',
      options: ['(x + 2) is a factor', '(x - 2) is a factor', 'x = 2 is not a zero', 'The polynomial has no factors'],
      correct: 1,
      explanation: 'By the Factor Theorem, if p(a) = 0, then (x - a) is a factor. Since p(2) = 0, we know that (x - 2) is a factor of p(x).'
    },
    {
      question: 'What type of polynomial is 4x² - 3x + 7 based on the number of terms?',
      options: ['Monomial', 'Binomial', 'Trinomial', 'Quadrinomial'],
      correct: 2,
      explanation: 'This polynomial has three terms: 4x², -3x, and +7. A polynomial with exactly three terms is called a trinomial.'
    },
    {
      question: 'What is the coefficient of x² in the polynomial 3x³ - 5x² + 2x - 1?',
      options: ['3', '-5', '2', '-1'],
      correct: 1,
      explanation: 'The coefficient is the number in front of the variable term. In the term -5x², the coefficient of x² is -5.'
    },
    {
      question: 'If (x - 3) is a factor of polynomial p(x), what must be true?',
      options: ['p(3) = 3', 'p(3) = 0', 'p(0) = 3', 'p(-3) = 0'],
      correct: 1,
      explanation: 'By the Factor Theorem, if (x - a) is a factor of p(x), then p(a) = 0. Since (x - 3) is a factor, p(3) must equal 0.'
    },
    {
      question: 'What is the degree of a constant polynomial like p(x) = 7?',
      options: ['0', '1', '7', 'Undefined'],
      correct: 0,
      explanation: 'A constant polynomial has no variable terms, so it can be written as 7x⁰. Since x⁰ = 1, the highest power is 0, making the degree 0.'
    },
    {
      question: 'Which method would be most efficient to check if x = 4 is a zero of p(x) = x³ - 2x² - 5x + 6?',
      options: ['Graph the polynomial', 'Use long division', 'Calculate p(4)', 'Factor completely first'],
      correct: 2,
      explanation: 'To check if x = 4 is a zero, simply substitute x = 4 into the polynomial and see if p(4) = 0. This is the most direct and efficient method.'
    }
  ]
}

export default function PolynomialsModule() {
  return (
    <ModuleLayout 
      module={polynomialsModule} 
      grade={9} 
      subject="Mathematics" 
    />
  )
}