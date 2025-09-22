import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const realNumbersModule: LearningModule = {
  title: 'Real Numbers',
  introduction: 'Welcome to the fascinating world of Real Numbers! Numbers are the language of mathematics, and real numbers form the most comprehensive number system we use in everyday mathematics. From the ancient Greek mathematicians who discovered the mysteries of irrational numbers to modern applications in engineering and computer science, real numbers tell an incredible story of mathematical discovery and practical utility. Understanding real numbers deeply will give you powerful tools for algebra, geometry, and advanced mathematics. Get ready to explore the elegant patterns, fundamental theorems, and beautiful properties that make real numbers both practical and fascinating!',
  concepts: [
    {
      title: 'Euclid\'s Division Lemma - The Foundation of Number Theory',
      content: 'Euclid\'s Division Lemma is a fundamental result in number theory that formalizes the process of division with remainders. This ancient principle, dating back over 2000 years, still forms the basis of many modern algorithms.',
      examples: [
        'Statement: For any two positive integers a and b, there exist unique integers q and r such that a = bq + r, where 0 ≤ r < b',
        'Example: 17 = 5 × 3 + 2, where a=17, b=5, q=3, r=2',
        'Example: 25 = 7 × 3 + 4, where a=25, b=7, q=3, r=4',
        'Key insight: Every division can be written as (dividend) = (divisor) × (quotient) + (remainder)',
        'Applications: Finding HCF, proving mathematical theorems, computer algorithms'
      ]
    },
    {
      title: 'Using Euclid\'s Division Lemma to Find HCF',
      content: 'The Euclidean algorithm uses repeated application of the division lemma to find the Highest Common Factor (HCF) of two numbers efficiently. This method is much faster than factorization for large numbers.',
      examples: [
        'Algorithm: Apply division lemma repeatedly until remainder becomes 0',
        'Example: HCF of 56 and 72',
        'Step 1: 72 = 56 × 1 + 16',
        'Step 2: 56 = 16 × 3 + 8',
        'Step 3: 16 = 8 × 2 + 0',
        'Therefore, HCF(56, 72) = 8 (the last non-zero remainder)'
      ]
    },
    {
      title: 'The Fundamental Theorem of Arithmetic',
      content: 'The Fundamental Theorem of Arithmetic states that every integer greater than 1 can be expressed as a unique product of prime numbers. This uniqueness is what makes prime factorization so powerful in mathematics.',
      examples: [
        'Statement: Every integer > 1 has a unique prime factorization (except for order)',
        'Example: 60 = 2² × 3 × 5 (this is the only way to factor 60 into primes)',
        'Example: 84 = 2² × 3 × 7',
        'Uniqueness: No matter how you factor, you always get the same prime factors',
        'Applications: Finding HCF, LCM, solving Diophantine equations, cryptography'
      ]
    },
    {
      title: 'Finding HCF Using Prime Factorization',
      content: 'The Fundamental Theorem allows us to find HCF by taking the product of common prime factors with their lowest powers. This method is systematic and works well for moderate-sized numbers.',
      examples: [
        'Method: Find prime factorization of both numbers, then multiply common factors with lowest powers',
        'Example: HCF of 72 and 108',
        '72 = 2³ × 3²',
        '108 = 2² × 3³',
        'Common factors: 2² and 3² → HCF = 2² × 3² = 4 × 9 = 36'
      ]
    },
    {
      title: 'Finding LCM Using Prime Factorization',
      content: 'The LCM (Least Common Multiple) can be found using prime factorization by taking all prime factors with their highest powers. There\'s also a useful relationship between HCF and LCM.',
      examples: [
        'Method: Take all prime factors with their highest powers',
        'Example: LCM of 72 and 108',
        '72 = 2³ × 3²',
        '108 = 2² × 3³',
        'All factors with highest powers: 2³ and 3³ → LCM = 2³ × 3³ = 8 × 27 = 216',
        'Relationship: HCF × LCM = Product of the two numbers'
      ]
    },
    {
      title: 'Rational Numbers - Numbers That Can Be Expressed as Fractions',
      content: 'Rational numbers are numbers that can be expressed as the ratio of two integers where the denominator is not zero. They include integers, fractions, and decimals that either terminate or repeat.',
      examples: [
        'Definition: A rational number is any number that can be written as p/q where p, q are integers and q ≠ 0',
        'Examples: 3/4, -5/7, 0.25, 0.333..., 7 (which is 7/1)',
        'Properties: Closed under addition, subtraction, multiplication, and division (except by 0)',
        'Between any two rational numbers, there are infinitely many rational numbers',
        'Set notation: ℚ = {p/q : p, q ∈ ℤ, q ≠ 0}'
      ]
    },
    {
      title: 'Irrational Numbers - Numbers That Cannot Be Expressed as Fractions',
      content: 'Irrational numbers cannot be expressed as the ratio of two integers. Their decimal expansions are non-terminating and non-repeating, continuing forever without any pattern.',
      examples: [
        'Definition: Numbers that cannot be written as p/q where p, q are integers',
        'Examples: √2, √3, π, e, √5, golden ratio φ',
        'Properties: Non-terminating, non-repeating decimal expansions',
        'Discovery: The Pythagoreans discovered √2 is irrational around 500 BCE',
        'Proof technique: Often proved by contradiction (assume rational, derive contradiction)'
      ]
    },
    {
      title: 'Decimal Expansions of Rational Numbers',
      content: 'Rational numbers have two types of decimal expansions: terminating (ending) and non-terminating repeating (eventually periodic). The type depends on the prime factors of the denominator.',
      examples: [
        'Terminating decimals: 1/4 = 0.25, 3/8 = 0.375, 7/20 = 0.35',
        'Non-terminating repeating: 1/3 = 0.333..., 2/7 = 0.285714285714...',
        'Rule: A rational number p/q (in lowest terms) has terminating decimal if q = 2ᵐ × 5ⁿ',
        'If q has prime factors other than 2 and 5, the decimal repeats',
        'Notation: 0.333... = 0.3̄, 0.285714... = 0.285714̄'
      ]
    },
    {
      title: 'Properties of Real Numbers',
      content: 'Real numbers combine rational and irrational numbers to form a complete number system. Understanding their properties helps us work with equations, inequalities, and functions effectively.',
      examples: [
        'Real numbers = Rational numbers ∪ Irrational numbers',
        'Completeness: Every point on the number line corresponds to a real number',
        'Density: Between any two real numbers, there are infinitely many real numbers',
        'Arithmetic: Addition and multiplication are commutative, associative, and distributive',
        'Ordering: Real numbers can be arranged in order (< or > relationship)'
      ]
    },
    {
      title: 'Laws of Exponents for Real Numbers',
      content: 'The laws of exponents provide rules for simplifying expressions involving powers. These laws work for all real numbers and are essential for algebra and higher mathematics.',
      examples: [
        'Product rule: aᵐ × aⁿ = aᵐ⁺ⁿ',
        'Quotient rule: aᵐ ÷ aⁿ = aᵐ⁻ⁿ (a ≠ 0)',
        'Power rule: (aᵐ)ⁿ = aᵐⁿ',
        'Product to power: (ab)ⁿ = aⁿbⁿ',
        'Quotient to power: (a/b)ⁿ = aⁿ/bⁿ (b ≠ 0)',
        'Zero exponent: a⁰ = 1 (a ≠ 0)',
        'Negative exponent: a⁻ⁿ = 1/aⁿ (a ≠ 0)'
      ]
    }
  ],
  mcqs: [
    {
      question: 'According to Euclid\'s Division Lemma, if a = 23 and b = 7, what are the values of q and r?',
      options: ['q = 3, r = 2', 'q = 4, r = 5', 'q = 3, r = 4', 'q = 2, r = 9'],
      correct: 0,
      explanation: 'Using a = bq + r: 23 = 7 × 3 + 2, so q = 3 and r = 2. We can verify: 7 × 3 + 2 = 21 + 2 = 23, and 0 ≤ 2 < 7.'
    },
    {
      question: 'What is the HCF of 48 and 18 using the Euclidean algorithm?',
      options: ['6', '12', '9', '3'],
      correct: 0,
      explanation: 'Using Euclidean algorithm: 48 = 18 × 2 + 12, then 18 = 12 × 1 + 6, then 12 = 6 × 2 + 0. The last non-zero remainder is 6, so HCF(48, 18) = 6.'
    },
    {
      question: 'According to the Fundamental Theorem of Arithmetic, what is the prime factorization of 60?',
      options: ['2² × 3 × 5', '2 × 3² × 5', '2³ × 3 × 5', '2² × 3² × 5'],
      correct: 0,
      explanation: '60 = 4 × 15 = 4 × 3 × 5 = 2² × 3 × 5. This is the unique prime factorization of 60.'
    },
    {
      question: 'If the prime factorizations are 72 = 2³ × 3² and 48 = 2⁴ × 3, what is their LCM?',
      options: ['144', '288', '72', '48'],
      correct: 0,
      explanation: 'LCM takes the highest power of each prime factor: LCM = 2⁴ × 3² = 16 × 9 = 144.'
    },
    {
      question: 'Which of the following is a rational number?',
      options: ['√2', 'π', '0.363636...', '√3'],
      correct: 2,
      explanation: '0.363636... = 0.36̄ is a repeating decimal, which represents a rational number (36/99 = 4/11). The others (√2, π, √3) are irrational numbers.'
    },
    {
      question: 'Which statement about irrational numbers is correct?',
      options: ['They can be written as p/q where p, q are integers', 'Their decimal expansions terminate', 'Their decimal expansions are non-terminating and non-repeating', 'They include all negative numbers'],
      correct: 2,
      explanation: 'Irrational numbers have decimal expansions that are non-terminating and non-repeating. They cannot be expressed as fractions of integers.'
    },
    {
      question: 'The decimal expansion of 7/20 is:',
      options: ['Terminating', 'Non-terminating repeating', 'Non-terminating non-repeating', 'Cannot be determined'],
      correct: 0,
      explanation: '7/20 = 7/(2² × 5) = 0.35. Since the denominator has only factors of 2 and 5, the decimal expansion terminates.'
    },
    {
      question: 'A rational number p/q (in lowest terms) has a terminating decimal expansion if and only if:',
      options: ['q is odd', 'q is even', 'q has only 2 and 5 as prime factors', 'q is a perfect square'],
      correct: 2,
      explanation: 'A rational number in lowest terms has a terminating decimal if and only if the denominator has only 2 and 5 as prime factors (i.e., q = 2ᵐ × 5ⁿ).'
    },
    {
      question: 'Using the laws of exponents, what is (2³)² × 2⁻⁴?',
      options: ['2²', '2⁶', '2¹⁰', '2⁻¹⁰'],
      correct: 0,
      explanation: '(2³)² × 2⁻⁴ = 2⁶ × 2⁻⁴ = 2⁶⁻⁴ = 2². Using power rule: (aᵐ)ⁿ = aᵐⁿ, and product rule: aᵐ × aⁿ = aᵐ⁺ⁿ.'
    },
    {
      question: 'If HCF(a, b) = 12 and LCM(a, b) = 180, and a = 36, what is the value of b?',
      options: ['60', '45', '72', '90'],
      correct: 0,
      explanation: 'Using the relationship HCF × LCM = a × b: 12 × 180 = 36 × b, so 2160 = 36b, therefore b = 60.'
    }
  ]
}

export default function RealNumbersModule() {
  return (
    <ModuleLayout 
      module={realNumbersModule} 
      grade={10} 
      subject="Mathematics" 
    />
  )
}