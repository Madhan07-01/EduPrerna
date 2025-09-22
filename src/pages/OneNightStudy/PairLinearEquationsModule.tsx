import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const pairLinearEquationsModule: LearningModule = {
  title: 'Pair of Linear Equations in Two Variables',
  introduction: 'Welcome to the powerful world of Pair of Linear Equations in Two Variables! Have you ever wondered how businesses determine the perfect balance between production costs and selling prices? Or how engineers calculate the optimal dimensions for structures? The answer lies in solving systems of linear equations! This mathematical tool is everywhere around us - from mixing solutions in chemistry to planning budgets, from GPS navigation to computer graphics. Understanding how to work with pairs of linear equations gives you the ability to solve real-world problems involving multiple conditions and constraints. Get ready to master these elegant mathematical techniques that connect algebra with practical problem-solving!',
  concepts: [
    {
      title: 'Forms of Linear Equations in Two Variables',
      content: 'A linear equation in two variables represents a straight line when graphed. Understanding the different forms helps us work with these equations effectively and choose the most convenient form for different situations.',
      examples: [
        'Standard form: ax + by + c = 0, where a, b are not both zero',
        'Example: 2x + 3y - 6 = 0',
        'Slope-intercept form: y = mx + c, where m is slope and c is y-intercept',
        'Example: y = 2x + 3',
        'Intercept form: x/a + y/b = 1, where a and b are x and y intercepts',
        'Point-slope form: y - y₁ = m(x - x₁), using a point (x₁, y₁) and slope m'
      ]
    },
    {
      title: 'Understanding a Pair of Linear Equations',
      content: 'A pair of linear equations consists of two linear equations that we solve simultaneously to find common solutions. The solution represents the point where both lines intersect on a coordinate plane.',
      examples: [
        'General form: a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0',
        'Example pair: 2x + 3y = 6 and x - y = 1',
        'Solution: The values of x and y that satisfy both equations simultaneously',
        'Geometric meaning: The intersection point of two lines',
        'Applications: Finding optimal solutions in real-world problems with multiple constraints'
      ]
    },
    {
      title: 'Conditions for Consistency - Unique Solution',
      content: 'A pair of linear equations has a unique solution when the lines intersect at exactly one point. This happens when the lines have different slopes.',
      examples: [
        'Condition: a₁/a₂ ≠ b₁/b₂ (coefficients are not proportional)',
        'Example: 2x + 3y = 6 and x - y = 1',
        'Check: 2/1 ≠ 3/(-1) → 2 ≠ -3 ✓',
        'Geometric interpretation: Two non-parallel lines intersect at one point',
        'Real-world meaning: One optimal solution exists for the given constraints'
      ]
    },
    {
      title: 'Conditions for Consistency - Infinitely Many Solutions',
      content: 'A pair of linear equations has infinitely many solutions when the equations represent the same line. Every point on the line satisfies both equations.',
      examples: [
        'Condition: a₁/a₂ = b₁/b₂ = c₁/c₂ (all ratios equal)',
        'Example: 2x + 3y = 6 and 4x + 6y = 12',
        'Check: 2/4 = 3/6 = 6/12 → 1/2 = 1/2 = 1/2 ✓',
        'Geometric interpretation: Both equations represent the same line',
        'Real-world meaning: Multiple solutions exist, choose any point on the line'
      ]
    },
    {
      title: 'Conditions for Inconsistency - No Solution',
      content: 'A pair of linear equations has no solution when the lines are parallel but distinct. Parallel lines never intersect, so there\'s no common point.',
      examples: [
        'Condition: a₁/a₂ = b₁/b₂ ≠ c₁/c₂ (coefficient ratios equal, constant ratio different)',
        'Example: 2x + 3y = 6 and 4x + 6y = 15',
        'Check: 2/4 = 3/6 ≠ 6/15 → 1/2 = 1/2 ≠ 2/5 ✓',
        'Geometric interpretation: Two parallel lines that never meet',
        'Real-world meaning: No solution exists that satisfies both constraints'
      ]
    },
    {
      title: 'Graphical Method of Solution',
      content: 'The graphical method involves plotting both equations on the same coordinate plane. The intersection point (if it exists) gives the solution to the pair of equations.',
      examples: [
        'Step 1: Convert equations to y = mx + c form for easy plotting',
        'Step 2: Plot both lines on the same graph',
        'Step 3: Find the intersection point',
        'Example: For 2x + y = 6 and x - y = 0',
        'Line 1: y = -2x + 6, Line 2: y = x',
        'Intersection: (2, 2) is the solution'
      ]
    },
    {
      title: 'Substitution Method',
      content: 'The substitution method involves solving one equation for one variable and substituting this expression into the other equation. This reduces the system to one equation with one variable.',
      examples: [
        'Step 1: Solve one equation for one variable',
        'Step 2: Substitute this expression into the other equation',
        'Step 3: Solve the resulting equation',
        'Step 4: Find the other variable using back-substitution',
        'Example: x + y = 5 and 2x - y = 1',
        'From equation 1: y = 5 - x',
        'Substitute: 2x - (5 - x) = 1 → 3x = 6 → x = 2, y = 3'
      ]
    },
    {
      title: 'Elimination Method',
      content: 'The elimination method involves adding or subtracting the equations to eliminate one variable. This creates a single equation with one variable that can be easily solved.',
      examples: [
        'Step 1: Make coefficients of one variable equal (multiply if needed)',
        'Step 2: Add or subtract equations to eliminate that variable',
        'Step 3: Solve for the remaining variable',
        'Step 4: Back-substitute to find the other variable',
        'Example: 2x + 3y = 7 and 3x - 3y = 8',
        'Add equations: 5x = 15 → x = 3',
        'Substitute back: 2(3) + 3y = 7 → y = 1/3'
      ]
    },
    {
      title: 'Cross-Multiplication Method',
      content: 'The cross-multiplication method is a direct formula-based approach that works when equations are in standard form. It provides a quick way to find solutions without intermediate steps.',
      examples: [
        'For equations: a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0',
        'Formula: x/(b₁c₂ - b₂c₁) = y/(c₁a₂ - c₂a₁) = 1/(a₁b₂ - a₂b₁)',
        'Example: 2x + 3y - 6 = 0 and x - y + 1 = 0',
        'x/[3(1) - (-1)(−6)] = y/[(-6)(1) - (1)(2)] = 1/[2(-1) - 1(3)]',
        'x/(-3) = y/(-8) = 1/(-5) → x = 3/5, y = 8/5'
      ]
    },
    {
      title: 'Applications and Problem Solving',
      content: 'Pairs of linear equations solve many real-world problems involving two unknown quantities with given relationships. These applications demonstrate the practical power of algebraic methods.',
      examples: [
        'Age problems: Present and future ages with given relationships',
        'Money problems: Different denominations of coins or notes',
        'Speed and distance: Two vehicles traveling at different speeds',
        'Mixture problems: Combining solutions of different concentrations',
        'Geometry: Finding dimensions when perimeter and area conditions are given',
        'Economics: Supply and demand equilibrium points'
      ]
    }
  ],
  mcqs: [
    {
      question: 'Which of the following is the standard form of a linear equation in two variables?',
      options: ['y = mx + c', 'ax + by + c = 0', 'x/a + y/b = 1', 'y - y₁ = m(x - x₁)'],
      correct: 1,
      explanation: 'The standard form of a linear equation in two variables is ax + by + c = 0, where a and b are not both zero. This is the most general form.'
    },
    {
      question: 'For the pair of equations 3x + 2y = 6 and 6x + 4y = 12, what type of solution exists?',
      options: ['Unique solution', 'No solution', 'Infinitely many solutions', 'Cannot be determined'],
      correct: 2,
      explanation: 'Checking ratios: 3/6 = 2/4 = 6/12 = 1/2. Since all ratios are equal, the equations represent the same line, giving infinitely many solutions.'
    },
    {
      question: 'For the equations 2x + 3y = 6 and 4x + 6y = 15, what can we conclude?',
      options: ['Unique solution exists', 'Infinitely many solutions', 'No solution exists', 'The lines are perpendicular'],
      correct: 2,
      explanation: 'Checking ratios: 2/4 = 3/6 = 1/2, but 6/15 = 2/5. Since coefficient ratios are equal but constant ratio is different, the lines are parallel with no intersection - no solution exists.'
    },
    {
      question: 'Using substitution method for x + y = 5 and 2x - y = 1, what is the value of x?',
      options: ['1', '2', '3', '4'],
      correct: 1,
      explanation: 'From first equation: y = 5 - x. Substituting in second: 2x - (5 - x) = 1 → 2x - 5 + x = 1 → 3x = 6 → x = 2.'
    },
    {
      question: 'In the elimination method for 3x + 2y = 7 and 2x + 3y = 8, what should be done first?',
      options: ['Add the equations directly', 'Multiply first equation by 2 and second by 3', 'Multiply first equation by 3 and second by 2', 'Subtract the equations directly'],
      correct: 1,
      explanation: 'To eliminate x, we need equal coefficients. Multiply first equation by 2 (giving 6x) and second by 3 (giving 6x), then subtract to eliminate x.'
    },
    {
      question: 'What does the intersection point of two lines represent in the context of linear equations?',
      options: ['The slope of both lines', 'The y-intercept of both lines', 'The solution to the pair of equations', 'The midpoint of both lines'],
      correct: 2,
      explanation: 'The intersection point represents the solution to the pair of linear equations - the values of x and y that satisfy both equations simultaneously.'
    },
    {
      question: 'For consistent equations with unique solution, which condition must be satisfied?',
      options: ['a₁/a₂ = b₁/b₂', 'a₁/a₂ = b₁/b₂ = c₁/c₂', 'a₁/a₂ ≠ b₁/b₂', 'a₁/a₂ = b₁/b₂ ≠ c₁/c₂'],
      correct: 2,
      explanation: 'For a unique solution, the coefficient ratios must be unequal: a₁/a₂ ≠ b₁/b₂. This ensures the lines have different slopes and intersect at exactly one point.'
    },
    {
      question: 'Using elimination method for x + 2y = 5 and 3x - 2y = 7, what is the value of y?',
      options: ['1', '2', '3', '4'],
      correct: 0,
      explanation: 'Adding the equations: (x + 2y) + (3x - 2y) = 5 + 7 → 4x = 12 → x = 3. Substituting back: 3 + 2y = 5 → 2y = 2 → y = 1.'
    },
    {
      question: 'In the graphical method, parallel lines indicate:',
      options: ['Unique solution', 'Infinitely many solutions', 'No solution or infinitely many solutions', 'The equations are incorrect'],
      correct: 2,
      explanation: 'Parallel lines either never intersect (no solution) or are the same line (infinitely many solutions). The specific case depends on whether the lines are distinct or coincident.'
    },
    {
      question: 'Which method is most suitable when one variable has coefficient 1 in any equation?',
      options: ['Graphical method', 'Cross-multiplication method', 'Substitution method', 'Elimination method'],
      correct: 2,
      explanation: 'Substitution method is most suitable when one variable has coefficient 1, as it\'s easy to express that variable in terms of the other without fractions.'
    }
  ]
}

export default function PairLinearEquationsModule() {
  return (
    <ModuleLayout 
      module={pairLinearEquationsModule} 
      grade={10} 
      subject="Mathematics" 
    />
  )
}