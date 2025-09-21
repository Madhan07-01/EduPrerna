// New QUESTION_BANK for Math Runner Game - Grades 6-12
// Structure: grade -> lessons -> lesson name -> level -> questions array

export const QUESTION_BANK: Record<string, any> = {
  "grade6": {
    "lessons": {
      "Number System": {
        "1": ["5 + 3 = ?", "12 – 7 = ?", "3 × 4 = ?"],
        "2": ["15 ÷ 3 = ?", "18 – 9 = ?", "6 + 8 = ?"],
        "3": ["7 × 5 = ?", "24 ÷ 6 = ?", "20 – 13 = ?"],
        "4": ["12 × 2 = ?", "35 ÷ 7 = ?", "50 – 25 = ?"],
        "5": ["9 × 9 = ?", "64 ÷ 8 = ?", "100 – 75 = ?"]
      },
      "Fractions": {
        "1": ["1/2 + 1/4 = ?", "3/4 – 1/2 = ?", "2/3 × 3/4 = ?"],
        "2": ["5/6 – 1/3 = ?", "7/8 + 1/8 = ?", "3/5 ÷ 1/5 = ?"],
        "3": ["2/7 + 3/7 = ?", "5/9 – 2/9 = ?", "4/5 × 2/3 = ?"],
        "4": ["7/10 – 3/10 = ?", "1/2 ÷ 1/4 = ?", "3/8 + 5/8 = ?"],
        "5": ["11/12 – 7/12 = ?", "2/3 ÷ 1/6 = ?", "5/6 + 1/6 = ?"]
      },
      "Decimals": {
        "1": ["0.5 + 0.25 = ?", "1.2 – 0.7 = ?", "0.4 × 10 = ?"],
        "2": ["2.5 ÷ 0.5 = ?", "0.75 + 0.25 = ?", "3.6 – 1.2 = ?"],
        "3": ["0.2 × 5 = ?", "4.5 ÷ 1.5 = ?", "2.75 + 1.25 = ?"]
      },
      "Percentages": {
        "1": ["50% of 100 = ?", "25% of 200 = ?", "10% of 250 = ?"],
        "2": ["What is 20% of 150?", "75% of 80 = ?", "12% of 50 = ?"],
        "3": ["60 is what % of 120?", "15 is 30% of ?", "25% of 400 = ?"]
      }
    }
  },
  "grade7": {
    "lessons": {
      "Algebra (Simple Equations)": {
        "1": ["If x=4, 2x+3 = ?", "If x=5, x–2 = ?", "If x=3, 3x = ?"],
        "2": ["Solve x+5=10", "Solve 2x=12", "Solve x–7=8"],
        "3": ["Solve 3x=21", "Solve x/2=6", "Solve x+9=20"],
        "4": ["Solve 4x=32", "Solve 2x+5=15", "Solve x–10=12"],
        "5": ["Solve 5x=25", "Solve x/3=9", "Solve 2x–4=10"]
      },
      "Geometry (Angles)": {
        "1": ["A right angle = ?", "Straight line angle sum = ?", "Triangle angle sum = ?"],
        "2": ["Supplementary angles = ?", "Complementary angles = ?", "Full circle = ?"],
        "3": ["Each angle in equilateral triangle = ?", "Largest angle in right triangle = ?", "Exterior angle of triangle = ?"],
        "4": ["Angles in quadrilateral = ?", "Opposite angles of rectangle = ?", "Angle sum of pentagon = ?"],
        "5": ["Interior angle of hexagon = ?", "Angle sum of octagon = ?", "Exterior angle sum of polygon = ?"]
      }
    }
  },
  "grade8": {
    "lessons": {
      "Algebraic Expressions": {
        "1": ["Simplify 2x+3x", "Expand (x+2)²", "Expand (x+3)(x+2)"],
        "2": ["Factor x²+5x+6", "Factor x²–9", "Factor x²+7x+10"],
        "3": ["Simplify 3x+2x–x", "Expand (x+1)(x+4)", "Factor x²–4x"],
        "4": ["Expand (2x+3)(x+1)", "Simplify 5x+3–2x", "Factor x²+6x+8"],
        "5": ["Expand (x–2)(x–5)", "Simplify 7x–3x+4", "Factor x²–16"]
      },
      "Geometry (Triangles)": {
        "1": ["Triangle angle sum = ?", "Right triangle largest angle = ?", "Isosceles triangle equal sides = ?"],
        "2": ["Equilateral triangle each angle = ?", "Exterior angle of triangle = ?", "Median = line from ?"],
        "3": ["Altitude of triangle is ?", "Perpendicular bisector divides side into ?", "Orthocenter is point of ?"],
        "4": ["In ΔABC, if AB=AC → triangle type?", "Pythagoras theorem states?", "Hypotenuse is side opposite?"],
        "5": ["Area of triangle formula?", "Heron’s formula uses ?", "Triangle with all unequal sides = ?"]
      }
    }
  },
  "grade9": {
    "lessons": {
      "Polynomials": {
        "1": ["Degree of x²+3x+5 = ?", "Degree of constant 7 = ?", "Degree of x³+2 = ?"],
        "2": ["Zero of x–2 = ?", "Zero of x+5 = ?", "Zero of x²–9 = ?"],
        "3": ["Factor x²–4", "Factor x²+7x+10", "Factor x²–25"],
        "4": ["Expand (x+2)(x+3)", "Expand (x–4)(x–5)", "Expand (x+6)(x–2)"],
        "5": ["If x=2, value of x²+3x+1?", "If x=–1, value of x³+2?", "If x=0, value of 5x+7?"]
      },
      "Geometry (Circles)": {
        "1": ["Distance around circle = ?", "Longest chord = ?", "Line touching circle = ?"],
        "2": ["Radius is distance from center to ?", "Chord passing through center = ?", "Semicircle angle = ?"],
        "3": ["Tangent ⟂ radius at ?", "Equal chords subtend equal ?", "Two circles touching externally = ?"],
        "4": ["Area of circle formula?", "Circumference of circle?", "Diameter = 2 × ?"],
        "5": ["Arc length formula?", "Sector area formula?", "Central angle of full circle?"]
      }
    }
  },
  "grade10": {
    "lessons": {
      "Quadratic Equations": {
        "1": ["Standard form = ?", "Roots of x²–9=0?", "Roots of x²+4x+4=0?"],
        "2": ["Discriminant of x²–4x+3?", "Roots of x²–2x–15=0?", "Roots of x²+7x+10=0?"],
        "3": ["Solve x²–5x+6=0", "Solve x²+3x–10=0", "Solve x²–7x+12=0"],
        "4": ["Factorize x²–2x–8", "Factorize x²+10x+21", "Factorize x²–9x+20"],
        "5": ["If roots are equal → condition?", "If roots are real → condition?", "If roots are imaginary → condition?"]
      },
      "Mensuration (3D Geometry)": {
        "1": ["Volume of cube = ?", "Volume of cuboid = ?", "Volume of sphere = ?"],
        "2": ["TSA of cube = ?", "TSA of cuboid = ?", "TSA of sphere = ?"],
        "3": ["Volume of cone = ?", "Volume of cylinder = ?", "Volume of hemisphere = ?"],
        "4": ["CSA of cylinder = ?", "CSA of cone = ?", "CSA of hemisphere = ?"],
        "5": ["Diagonal of cube = ?", "Volume of pyramid = ?", "Volume of frustum = ?"]
      }
    }
  },
  "grade11": {
    "lessons": {
      "Sequences & Series": {
        "1": ["nth term of AP formula?", "Sum of n terms of AP formula?", "nth term of GP formula?"],
        "2": ["AP: 2,4,6… find 10th term?", "GP: 2,4,8… find 5th term?", "AP sum of first 20 terms with d=3?"],
        "3": ["Find S₁₀ for AP 3,7,11…", "Find 7th term of GP 3,6,12…", "Find S₅ for AP with a=5,d=2"],
        "4": ["Infinite GP sum formula?", "nth term of HP formula?", "S₁₅ of AP with a=4,d=2?"],
        "5": ["Sum of first n natural numbers?", "Sum of first n squares?", "Sum of first n cubes?"]
      },
      "Trigonometry": {
        "1": ["sin²θ+cos²θ=?", "tanθ=sinθ/?", "sec²θ–tan²θ=?"],
        "2": ["sin0°=?", "cos90°=?", "tan45°=?"],
        "3": ["sin30°=?", "cos60°=?", "tan60°=?"],
        "4": ["sin²45°=?", "cos²30°=?", "tan²45°=?"],
        "5": ["If sinθ=3/5, cosθ=?", "If cosθ=12/13, sinθ=?", "If tanθ=4/3, secθ=?"]
      }
    }
  },
  "grade12": {
    "lessons": {
      "Calculus (Integrals)": {
        "1": ["∫x dx=?", "∫2x dx=?", "∫cosx dx=?"],
        "2": ["∫sinx dx=?", "∫e^x dx=?", "∫1/x dx=?"],
        "3": ["∫3x² dx=?", "∫5 dx=?", "∫x³ dx=?"],
        "4": ["∫sec²x dx=?", "∫csc²x dx=?", "∫tanx dx=?"],
        "5": ["∫(2x+3) dx=?", "∫(x²+1) dx=?", "∫(x³+2x) dx=?"]
      },
      "Vectors & 3D Geometry": {
        "1": ["Magnitude of (3,4)?", "Dot product of (1,2)·(3,4)?", "Cross product of i×j=?"],
        "2": ["Angle between (1,0) and (0,1)?", "Projection of (2,3) on (1,0)?", "|a×b| = |a||b|sinθ → property?"],
        "3": ["Distance formula in 3D?", "Equation of sphere?", "Equation of plane?"],
        "4": ["Direction cosines of (1,1,1)?", "If a·b=0 → vectors are?", "If |a×b|=0 → vectors are?"],
        "5": ["Volume of parallelepiped = ?", "Scalar triple product formula?", "Equation of line in 3D?"]
      }
    }
  }
}

// Helper function to get questions for a specific grade, lesson, and level
export const getQuestionsForLevel = (grade: string, lesson: string, level: string): string[] => {
  const gradeKey = `grade${grade.replace('grade', '')}`
  return QUESTION_BANK[gradeKey]?.lessons?.[lesson]?.[level] || []
}

// Helper function to get all lessons for a grade
export const getLessonsForGrade = (grade: string): string[] => {
  const gradeKey = `grade${grade.replace('grade', '')}`
  return Object.keys(QUESTION_BANK[gradeKey]?.lessons || {})
}

// Helper function to check if a grade is supported
export const isGradeSupported = (grade: string): boolean => {
  const gradeKey = `grade${grade.replace('grade', '')}`
  return QUESTION_BANK.hasOwnProperty(gradeKey)
}