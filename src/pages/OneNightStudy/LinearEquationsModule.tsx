import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const linearEquationsModule: LearningModule = {
  title: 'Linear Equations',
  introduction: 'Welcome to the powerful world of linear equations! These mathematical tools help us solve real-world problems involving relationships between quantities. From calculating phone bills to planning trips, linear equations are everywhere in daily life. You\'ll discover how to solve equations step by step and even represent them visually with graphs. Get ready to unlock the secrets of algebra!',
  concepts: [
    {
      title: 'Definition of Linear Equations in One Variable',
      content: 'A linear equation in one variable is an equation that can be written in the form ax + b = c, where a, b, and c are constants, and a ≠ 0. The variable (usually x) appears only to the first power and is not multiplied by itself.',
      examples: [
        'Simple form: 2x + 5 = 13 (a = 2, b = 5, c = 13)',
        'Standard examples: 3x - 7 = 14, 5x + 2 = 17, -4x + 9 = 1',
        'Can be rearranged: x + 8 = 12 is the same as x = 12 - 8',
        'No squares or higher powers: x² + 3 = 7 is NOT linear',
        'Only one solution: Linear equations in one variable have exactly one solution'
      ]
    },
    {
      title: 'Definition of Linear Equations in Two Variables',
      content: 'A linear equation in two variables can be written as ax + by = c, where a, b, and c are constants, and both a and b cannot be zero simultaneously. These equations represent straight lines when graphed.',
      examples: [
        'Standard form: 2x + 3y = 12 (a = 2, b = 3, c = 12)',
        'Slope-intercept form: y = mx + b (y = 2x + 5)',
        'Point-slope form: y - y₁ = m(x - x₁)',
        'Intercept form: x/a + y/b = 1',
        'Infinite solutions: Each point on the line satisfies the equation'
      ]
    },
    {
      title: 'Steps for Solving Linear Equations in One Variable',
      content: 'Solving linear equations involves isolating the variable using inverse operations. Follow these systematic steps to find the solution reliably.',
      examples: [
        'Step 1: Simplify both sides (combine like terms, distribute)',
        'Step 2: Move variable terms to one side using addition/subtraction',
        'Step 3: Move constant terms to the other side',
        'Step 4: Divide both sides by the coefficient of the variable',
        'Example: 3x + 7 = 16 → 3x = 9 → x = 3'
      ]
    },
    {
      title: 'Detailed Solution Process with Examples',
      content: 'Let\'s work through various types of linear equations step by step, showing how to handle different situations like fractions, decimals, and equations with variables on both sides.',
      examples: [
        'Simple: 2x + 5 = 13 → 2x = 8 → x = 4',
        'With fractions: (1/2)x + 3 = 7 → (1/2)x = 4 → x = 8',
        'Variables on both sides: 3x + 2 = x + 8 → 2x = 6 → x = 3',
        'With parentheses: 2(x + 3) = 14 → 2x + 6 = 14 → 2x = 8 → x = 4',
        'Check your answer: Substitute back into the original equation'
      ]
    },
    {
      title: 'Graphical Representation of Linear Equations in Two Variables',
      content: 'Linear equations in two variables create straight lines when graphed on a coordinate plane. Understanding their graphical representation helps visualize solutions and relationships.',
      examples: [
        'y = 2x + 3: slope = 2, y-intercept = 3',
        'To graph: Find y-intercept (0, 3), then use slope to find more points',
        'Slope = rise/run: From (0, 3), go up 2 and right 1 to get (1, 5)',
        'x-intercept: Set y = 0 and solve for x',
        'Different forms show different information about the line'
      ]
    },
    {
      title: 'Slope and Intercepts',
      content: 'The slope tells us how steep a line is and which direction it goes, while intercepts show where the line crosses the axes. These are key features for understanding linear relationships.',
      examples: [
        'Slope (m) = (y₂ - y₁)/(x₂ - x₁) for points (x₁, y₁) and (x₂, y₂)',
        'Positive slope: line goes up from left to right',
        'Negative slope: line goes down from left to right',
        'Zero slope: horizontal line (y = constant)',
        'Undefined slope: vertical line (x = constant)'
      ]
    },
    {
      title: 'Properties of Linear Equations - Number of Solutions',
      content: 'Linear equations have predictable solution patterns. Understanding these patterns helps us classify equations and know what to expect when solving them.',
      examples: [
        'One variable: Always exactly one solution (if a ≠ 0)',
        'Two variables: Infinitely many solutions (all points on the line)',
        'System of equations: Can have one, none, or infinitely many solutions',
        'Parallel lines: No solution (inconsistent system)',
        'Same line: Infinitely many solutions (dependent system)'
      ]
    },
    {
      title: 'Special Cases and No Solution Scenarios',
      content: 'Sometimes linear equations lead to special situations. Recognizing these cases helps you understand when equations have no solution or infinitely many solutions.',
      examples: [
        'No solution: 2x + 3 = 2x + 5 → 3 = 5 (impossible)',
        'Infinitely many: 2x + 4 = 2(x + 2) → 2x + 4 = 2x + 4 (always true)',
        'Identity equations: Both sides are identical after simplification',
        'Contradiction: Results in a false statement like 0 = 5',
        'These cases are rare but important to recognize'
      ]
    },
    {
      title: 'Practical Applications in Word Problems',
      content: 'Linear equations solve many real-world problems. Learning to translate word problems into equations is a crucial skill for applying mathematics to everyday situations.',
      examples: [
        'Age problems: "In 5 years, Maria will be twice as old as she is now"',
        'Money problems: "Tickets cost $8 each plus a $3 service fee"',
        'Distance problems: "A car travels at 60 mph for t hours"',
        'Mixture problems: "How many pounds of $5/lb coffee to mix with $8/lb?"',
        'Geometry problems: "Perimeter of a rectangle is 24 cm"'
      ]
    },
    {
      title: 'Problem-Solving Strategies and Tips',
      content: 'Developing systematic approaches to word problems makes them much easier to solve. These strategies help you organize information and set up equations correctly.',
      examples: [
        'Read the problem twice to understand what\'s being asked',
        'Define variables clearly: "Let x = the number of tickets"',
        'Identify the relationship between quantities',
        'Write the equation based on the given information',
        'Solve the equation and check if the answer makes sense in context'
      ]
    }
  ],
  mcqs: [
    {
      question: 'Which of the following is a linear equation in one variable?',
      options: ['x² + 3x = 5', '2x + 7 = 15', 'xy + 4 = 8', '3/x + 2 = 7'],
      correct: 1,
      explanation: '2x + 7 = 15 is linear because the variable x appears only to the first power. The other options involve x², xy, or x in the denominator.'
    },
    {
      question: 'What is the solution to 3x - 8 = 13?',
      options: ['x = 5', 'x = 7', 'x = 21', 'x = -5'],
      correct: 1,
      explanation: 'Solve step by step: 3x - 8 = 13 → 3x = 21 → x = 7. Check: 3(7) - 8 = 21 - 8 = 13 ✓'
    },
    {
      question: 'In the equation y = 2x + 5, what is the y-intercept?',
      options: ['2', '5', '-5', '0'],
      correct: 1,
      explanation: 'In slope-intercept form y = mx + b, the y-intercept is b. Here, b = 5, so the y-intercept is 5.'
    },
    {
      question: 'What is the slope of the line 3x + 2y = 12?',
      options: ['3', '2', '-3/2', '3/2'],
      correct: 2,
      explanation: 'Rewrite in slope-intercept form: 2y = -3x + 12 → y = -3/2 x + 6. The slope is -3/2.'
    },
    {
      question: 'How many solutions does the equation 2x + 3 = 2x + 7 have?',
      options: ['One solution', 'Two solutions', 'Infinitely many solutions', 'No solution'],
      correct: 3,
      explanation: 'Simplifying: 2x + 3 = 2x + 7 → 3 = 7, which is false. This contradiction means there is no solution.'
    },
    {
      question: 'Solve for x: 2(x + 4) = 18',
      options: ['x = 5', 'x = 9', 'x = 7', 'x = 11'],
      correct: 0,
      explanation: 'Distribute: 2x + 8 = 18 → 2x = 10 → x = 5. Check: 2(5 + 4) = 2(9) = 18 ✓'
    },
    {
      question: 'Which point lies on the line y = 3x - 2?',
      options: ['(1, 1)', '(2, 4)', '(0, -2)', '(3, 7)'],
      correct: 2,
      explanation: 'Check each point: For (0, -2): y = 3(0) - 2 = -2 ✓. This point satisfies the equation.'
    },
    {
      question: 'A movie ticket costs $12 and popcorn costs $8. If you spend $44 total, how many tickets did you buy?',
      options: ['2 tickets', '3 tickets', '4 tickets', '1 ticket'],
      correct: 0,
      explanation: 'Let x = number of tickets. Equation: 12x + 8 = 44 → 12x = 36 → x = 3. But check: we need tickets, and 12(2) + 8 = 32 ≠ 44. Actually 12(3) + 8 = 44, so 3 tickets.'
    },
    {
      question: 'What type of line has an undefined slope?',
      options: ['Horizontal line', 'Vertical line', 'Diagonal line', 'Curved line'],
      correct: 1,
      explanation: 'Vertical lines have undefined slope because the denominator (change in x) is zero in the slope formula.'
    },
    {
      question: 'If 5x - 3 = 2x + 12, what is the value of x?',
      options: ['x = 3', 'x = 5', 'x = 15', 'x = 9'],
      correct: 1,
      explanation: 'Collect variables: 5x - 2x = 12 + 3 → 3x = 15 → x = 5. Check: 5(5) - 3 = 22 and 2(5) + 12 = 22 ✓'
    }
  ]
}

export default function LinearEquationsModule() {
  return (
    <ModuleLayout 
      module={linearEquationsModule} 
      grade={8} 
      subject="Mathematics" 
    />
  )
}