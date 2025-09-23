import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const trigonometricFunctionsModule: LearningModule = {
  title: 'Trigonometric Functions',
  introduction: 'Welcome to the fascinating world of Trigonometric Functions! Trigonometry, which literally means "triangle measurement," is one of the most practical branches of mathematics with applications in engineering, physics, architecture, astronomy, and even music. In this module, we\'ll explore how angles and ratios are connected, understand the six fundamental trigonometric functions, and learn how to work with them in different quadrants. You\'ll discover how these functions repeat in patterns (periodicity), how to graph them, and how to find inverse values. By the end of this module, you\'ll have a solid foundation for advanced mathematics and real-world problem-solving. Get ready to unlock the power of triangles and circular motion!',
  concepts: [
    {
      title: 'Measurement of Angles - Degrees and Radians',
      content: 'Angles can be measured in two primary units: degrees and radians. A degree is 1/360 of a full rotation, while a radian is the angle subtended at the center of a circle by an arc equal in length to the radius. Understanding both units is crucial for trigonometry.',
      examples: [
        'Full rotation: 360° = 2π radians',
        'Right angle: 90° = π/2 radians',
        'Straight angle: 180° = π radians',
        'Conversion formula: Degrees = Radians × (180°/π), Radians = Degrees × (π/180°)',
        'Example: Convert 45° to radians: 45° × (π/180°) = π/4 radians',
        'Example: Convert π/3 radians to degrees: π/3 × (180°/π) = 60°'
      ]
    },
    {
      title: 'Unit Circle Definition of Trigonometric Functions',
      content: 'The unit circle (a circle with radius 1 centered at the origin) provides a powerful way to define all six trigonometric functions for any angle. For an angle θ in standard position, the coordinates of the point where the terminal side intersects the unit circle are (cos θ, sin θ).',
      examples: [
        'For point P(x,y) on unit circle at angle θ: sin θ = y, cos θ = x',
        'tan θ = sin θ/cos θ = y/x (when cos θ ≠ 0)',
        'csc θ = 1/sin θ = 1/y (when sin θ ≠ 0)',
        'sec θ = 1/cos θ = 1/x (when cos θ ≠ 0)',
        'cot θ = cos θ/sin θ = x/y (when sin θ ≠ 0)',
        'At θ = 0°: P(1,0), so sin 0° = 0, cos 0° = 1, tan 0° = 0'
      ]
    },
    {
      title: 'Signs of Trigonometric Functions - ASTC Rule',
      content: 'The signs of trigonometric functions depend on which quadrant the angle terminates in. The ASTC rule (All Students Take Calculus) helps remember which functions are positive in each quadrant: All positive in QI, Sine in QII, Tangent in QIII, Cosine in QIV.',
      examples: [
        'Quadrant I (0° to 90°): All functions positive (A in ASTC)',
        'Quadrant II (90° to 180°): Only sine and cosecant positive (S in ASTC)',
        'Quadrant III (180° to 270°): Only tangent and cotangent positive (T in ASTC)',
        'Quadrant IV (270° to 360°): Only cosine and secant positive (C in ASTC)',
        'Example: sin 150° > 0 (QII), cos 150° < 0 (QII), tan 150° < 0 (QII)',
        'Example: sin 225° < 0 (QIII), cos 225° < 0 (QIII), tan 225° > 0 (QIII)'
      ]
    },
    {
      title: 'Key Trigonometric Identities',
      content: 'Trigonometric identities are equations that are true for all values of the variable. They are essential tools for simplifying expressions and solving equations. The fundamental identities form the foundation for all other trigonometric relationships.',
      examples: [
        'Pythagorean identities: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = csc²θ',
        'Reciprocal identities: csc θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ',
        'Quotient identities: tan θ = sin θ/cos θ, cot θ = cos θ/sin θ',
        'Even-Odd identities: cos(-θ) = cos θ (even), sin(-θ) = -sin θ (odd), tan(-θ) = -tan θ (odd)',
        'Example: Prove (1 + sin θ)(1 - sin θ) = cos²θ using (a+b)(a-b) = a² - b² and sin²θ + cos²θ = 1',
        'Example: Simplify tan θ cos θ = (sin θ/cos θ) × cos θ = sin θ'
      ]
    },
    {
      title: 'Periodicity of Trigonometric Functions',
      content: 'Trigonometric functions are periodic, meaning their values repeat at regular intervals. The period is the length of one complete cycle. Understanding periodicity helps in graphing and solving trigonometric equations.',
      examples: [
        'sin θ and cos θ have period 2π (360°)',
        'tan θ and cot θ have period π (180°)',
        'sec θ and csc θ have period 2π (360°)',
        'For function f(θ) = sin(Bθ), period = 2π/B',
        'Example: sin(2θ) has period 2π/2 = π',
        'Example: cos(θ/3) has period 2π/(1/3) = 6π'
      ]
    },
    {
      title: 'Graphs of Trigonometric Functions',
      content: 'The graphs of trigonometric functions reveal their periodic nature and help visualize their behavior. Each function has a characteristic wave pattern that can be transformed through amplitude changes, period changes, and shifts.',
      examples: [
        'y = sin x: Amplitude = 1, Period = 2π, Range = [-1, 1]',
        'y = cos x: Amplitude = 1, Period = 2π, Range = [-1, 1], Phase shift of π/2 from sine',
        'y = tan x: Period = π, Vertical asymptotes at x = π/2 + nπ (where n is integer)',
        'y = A sin(Bx + C) + D: A = amplitude, 2π/B = period, C/B = phase shift, D = vertical shift',
        'Example: y = 2sin(3x) has amplitude 2 and period 2π/3',
        'Example: y = cos(x - π/4) is cosine shifted right by π/4'
      ]
    },
    {
      title: 'Inverse Trigonometric Functions - Principal Values',
      content: 'Inverse trigonometric functions "undo" the action of trigonometric functions. However, since trigonometric functions are not one-to-one over their entire domain, we restrict their domains to define inverses. The principal values are the range-restricted outputs of inverse functions.',
      examples: [
        'y = sin⁻¹x (arcsin x): Domain [-1,1], Range [-π/2, π/2]',
        'y = cos⁻¹x (arccos x): Domain [-1,1], Range [0, π]',
        'y = tan⁻¹x (arctan x): Domain R, Range (-π/2, π/2)',
        'Example: sin⁻¹(1/2) = π/6 because sin(π/6) = 1/2 and π/6 is in [-π/2, π/2]',
        'Example: cos⁻¹(-1/2) = 2π/3 because cos(2π/3) = -1/2 and 2π/3 is in [0, π]',
        'Example: tan⁻¹(1) = π/4 because tan(π/4) = 1 and π/4 is in (-π/2, π/2)'
      ]
    },
    {
      title: 'Domain and Range of Trigonometric Functions',
      content: 'Understanding the domain and range of trigonometric functions is essential for solving equations and graphing. The domain refers to valid input values, while the range refers to possible output values.',
      examples: [
        'sin x and cos x: Domain = R, Range = [-1, 1]',
        'tan x: Domain = R - {(2n+1)π/2 | n ∈ Z}, Range = R',
        'sec x: Domain = R - {(2n+1)π/2 | n ∈ Z}, Range = (-∞, -1] ∪ [1, ∞)',
        'csc x: Domain = R - {nπ | n ∈ Z}, Range = (-∞, -1] ∪ [1, ∞)',
        'cot x: Domain = R - {nπ | n ∈ Z}, Range = R',
        'Example: sin⁻¹x: Domain = [-1, 1], Range = [-π/2, π/2]'
      ]
    },
    {
      title: 'Trigonometric Equations and Solutions',
      content: 'Trigonometric equations involve trigonometric functions and can have infinite solutions due to periodicity. Principal solutions are those within one period, while general solutions include all possible solutions using the periodic nature.',
      examples: [
        'To solve sin x = a: Find principal solutions in [0, 2π), then add 2nπ for all integers n',
        'Example: Solve sin x = 1/2. Principal solutions: x = π/6, 5π/6. General: x = π/6 + 2nπ, 5π/6 + 2nπ',
        'To solve cos x = a: Find principal solutions in [0, 2π), then add 2nπ for all integers n',
        'Example: Solve cos x = -1/2. Principal solutions: x = 2π/3, 4π/3. General: x = 2π/3 + 2nπ, 4π/3 + 2nπ',
        'For tan x = a: Principal solution in (-π/2, π/2), general: x = principal + nπ',
        'Example: Solve tan x = 1. Principal solution: x = π/4. General: x = π/4 + nπ'
      ]
    },
    {
      title: 'Applications of Trigonometric Functions',
      content: 'Trigonometric functions model periodic phenomena in nature and technology. From sound waves to tides, from alternating current to harmonic motion, trigonometry helps us understand and predict cyclical behavior.',
      examples: [
        'Simple harmonic motion: displacement = A cos(ωt + φ)',
        'Sound waves: pressure = A sin(2πft + φ) where f is frequency',
        'Alternating current: I = I₀ sin(2πft) where I₀ is peak current',
        'Tides: height = A cos(πt/6) + B where A and B are constants',
        'Sunrise/sunset times: modeled using sinusoidal functions',
        'Example: If a Ferris wheel has diameter 40m and completes one revolution in 2 minutes, height = 20 + 20sin(πt) where t is in minutes'
      ]
    }
  ],
  mcqs: [
    {
      question: 'Convert 120° to radians:',
      options: ['π/3', '2π/3', '3π/4', '5π/6'],
      correct: 1,
      explanation: 'To convert degrees to radians, multiply by π/180°. So 120° × (π/180°) = 120π/180 = 2π/3 radians.'
    },
    {
      question: 'Which of the following is NOT a trigonometric function?',
      options: ['sine', 'cosine', 'tangent', 'parabola'],
      correct: 3,
      explanation: 'Sine, cosine, and tangent are trigonometric functions. Parabola is a type of curve or graph, not a trigonometric function.'
    },
    {
      question: 'In which quadrant are sine and cosine both negative?',
      options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
      correct: 2,
      explanation: 'Using the ASTC rule: All positive in QI, Sine positive in QII, Tangent positive in QIII, Cosine positive in QIV. In Quadrant III, both sine and cosine are negative, but tangent (sine/cosine) is positive.'
    },
    {
      question: 'What is the period of the function y = sin(4x)?',
      options: ['π/2', 'π', '2π', '4π'],
      correct: 0,
      explanation: 'For a function of the form y = sin(Bx), the period is 2π/B. Here B = 4, so the period is 2π/4 = π/2.'
    },
    {
      question: 'Which identity is NOT correct?',
      options: ['sin²θ + cos²θ = 1', '1 + tan²θ = sec²θ', '1 + cot²θ = csc²θ', 'sin²θ - cos²θ = 1'],
      correct: 3,
      explanation: 'The first three are fundamental Pythagorean identities. The fourth is incorrect; the correct identity would be sin²θ - cos²θ = -cos(2θ) or sin²θ - cos²θ = 1 - 2cos²θ, but not equal to 1.'
    },
    {
      question: 'What is the range of the function y = 3sin(x) + 2?',
      options: ['[-1, 1]', '[2, 3]', '[-1, 5]', '[1, 5]'],
      correct: 2,
      explanation: 'The basic sine function has range [-1, 1]. Multiplying by 3 stretches this to [-3, 3]. Adding 2 shifts it up by 2 units, making the range [-3+2, 3+2] = [-1, 5].'
    },
    {
      question: 'What is the principal value of sin⁻¹(-1/2)?',
      options: ['-π/6', 'π/6', '5π/6', '7π/6'],
      correct: 0,
      explanation: 'The principal value of sin⁻¹(x) is in the range [-π/2, π/2]. Since sin(-π/6) = -1/2 and -π/6 is in [-π/2, π/2], the principal value is -π/6.'
    },
    {
      question: 'Which function has vertical asymptotes?',
      options: ['sin x', 'cos x', 'tan x', 'All of the above'],
      correct: 2,
      explanation: 'The tangent function has vertical asymptotes where cosine equals zero (since tan x = sin x/cos x). These occur at x = π/2 + nπ for integer values of n. Sine and cosine functions do not have vertical asymptotes.'
    },
    {
      question: 'What is the domain of the function y = sec(x)?',
      options: ['All real numbers', 'x ≠ nπ/2 where n is an integer', 'x ≠ nπ where n is an integer', 'x ≠ (2n+1)π/2 where n is an integer'],
      correct: 3,
      explanation: 'Since sec(x) = 1/cos(x), it is undefined where cos(x) = 0. Cosine equals zero at x = π/2, 3π/2, 5π/2, etc., which can be written as x = (2n+1)π/2 where n is an integer.'
    },
    {
      question: 'If sin θ = 3/5 and θ is in Quadrant II, what is cos θ?',
      options: ['4/5', '-4/5', '3/4', '-3/4'],
      correct: 1,
      explanation: 'Using the Pythagorean identity sin²θ + cos²θ = 1, we have (3/5)² + cos²θ = 1. This gives 9/25 + cos²θ = 1, so cos²θ = 16/25. Therefore cos θ = ±4/5. Since θ is in Quadrant II, cosine is negative, so cos θ = -4/5.'
    }
  ]
}

export default function TrigonometricFunctionsModule() {
  return (
    <ModuleLayout 
      module={trigonometricFunctionsModule} 
      grade={11} 
      subject="Mathematics" 
    />
  )
}