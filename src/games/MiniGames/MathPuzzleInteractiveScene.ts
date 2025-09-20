import Phaser from 'phaser'

interface Question {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface GradeTopics {
  [grade: string]: {
    [topic: string]: Question[]
  }
}

export class MathPuzzleInteractiveScene extends Phaser.Scene {
  private currentGrade: string = '6'
  private currentTopic: string = ''
  private currentQuestionIndex: number = 0
  private questions: Question[] = []
  private score: number = 0
  private particles: Phaser.GameObjects.Particles.ParticleEmitter | null = null

  private gradeTopics: GradeTopics = {
    '6': {
      'Fractions & Decimals': [
        {
          question: 'What is 1/2 + 1/4?',
          options: ['1/6', '3/4', '2/6', '1/3'],
          correctAnswer: 1,
          explanation: '1/2 = 2/4, so 2/4 + 1/4 = 3/4'
        },
        {
          question: 'Convert 0.75 to a fraction:',
          options: ['3/4', '7/10', '75/100', '3/5'],
          correctAnswer: 0,
          explanation: '0.75 = 75/100 = 3/4 when simplified'
        },
        {
          question: 'Which is larger: 2/3 or 0.6?',
          options: ['2/3', '0.6', 'They are equal', 'Cannot tell'],
          correctAnswer: 0,
          explanation: '2/3 = 0.666... which is greater than 0.6'
        }
      ],
      'Ratios & Proportions': [
        {
          question: 'If 3 apples cost $6, how much do 5 apples cost?',
          options: ['$8', '$10', '$12', '$15'],
          correctAnswer: 1,
          explanation: 'Set up proportion: 3/6 = 5/x, so x = $10'
        },
        {
          question: 'What is the ratio 12:8 in simplest form?',
          options: ['6:4', '3:2', '24:16', '4:3'],
          correctAnswer: 1,
          explanation: 'Divide both by 4: 12÷4 = 3, 8÷4 = 2'
        }
      ]
    },
    '7': {
      'Linear Equations': [
        {
          question: 'Solve for x: 2x + 5 = 13',
          options: ['x = 4', 'x = 6', 'x = 8', 'x = 9'],
          correctAnswer: 0,
          explanation: '2x = 13 - 5 = 8, so x = 4'
        },
        {
          question: 'If y = 3x + 2, what is y when x = 4?',
          options: ['12', '14', '16', '18'],
          correctAnswer: 1,
          explanation: 'y = 3(4) + 2 = 12 + 2 = 14'
        }
      ],
      'Inequalities': [
        {
          question: 'Solve: x + 3 > 7',
          options: ['x > 4', 'x > 10', 'x < 4', 'x = 4'],
          correctAnswer: 0,
          explanation: 'Subtract 3 from both sides: x > 7 - 3 = 4'
        }
      ]
    },
    '8': {
      'Pythagorean Theorem': [
        {
          question: 'In a right triangle with legs 3 and 4, what is the hypotenuse?',
          options: ['5', '6', '7', '8'],
          correctAnswer: 0,
          explanation: 'c² = 3² + 4² = 9 + 16 = 25, so c = 5'
        },
        {
          question: 'Is a triangle with sides 5, 12, 13 a right triangle?',
          options: ['Yes', 'No', 'Cannot tell', 'Need more info'],
          correctAnswer: 0,
          explanation: '5² + 12² = 25 + 144 = 169 = 13²'
        }
      ]
    },
    '9': {
      'Number Systems': [
        {
          question: 'What is the decimal expansion of 1/7?',
          options: ['0.142857... (repeating)', '0.14', '0.1428', '0.15'],
          correctAnswer: 0,
          explanation: '1/7 = 0.142857142857... which repeats the pattern 142857'
        },
        {
          question: 'Which of these is an irrational number?',
          options: ['√16', '√9', '√2', '√25'],
          correctAnswer: 2,
          explanation: '√2 cannot be expressed as a fraction and has infinite non-repeating decimals'
        }
      ],
      'Polynomials': [
        {
          question: 'If x² - 5x + 6 = 0, what are the roots?',
          options: ['1 and 6', '2 and 3', '-2 and -3', '5 and 1'],
          correctAnswer: 1,
          explanation: 'Factoring: (x-2)(x-3) = 0, so x = 2 or x = 3'
        },
        {
          question: 'What is the degree of polynomial 3x⁴ + 2x² - 5?',
          options: ['2', '3', '4', '5'],
          correctAnswer: 2,
          explanation: 'The highest power of x is 4, so the degree is 4'
        }
      ],
      'Probability': [
        {
          question: 'A coin is tossed once. Probability of getting heads?',
          options: ['1/4', '1/2', '3/4', '1'],
          correctAnswer: 1,
          explanation: 'There are 2 equally likely outcomes (H,T), so P(H) = 1/2'
        },
        {
          question: 'A die is rolled. What is P(even number)?',
          options: ['1/6', '1/3', '1/2', '2/3'],
          correctAnswer: 2,
          explanation: 'Even numbers: 2,4,6. So P(even) = 3/6 = 1/2'
        }
      ]
    },
    '10': {
      'Quadratic Equations': [
        {
          question: 'Solve: x² - 4x - 5 = 0',
          options: ['x = 5 or x = -1', 'x = 4 or x = 5', 'x = -4 or x = 1', 'x = 2 or x = -5'],
          correctAnswer: 0,
          explanation: 'Factoring: (x-5)(x+1) = 0, so x = 5 or x = -1'
        },
        {
          question: 'What is the discriminant of x² + 2x + 1 = 0?',
          options: ['0', '4', '-4', '1'],
          correctAnswer: 0,
          explanation: 'Discriminant = b² - 4ac = 2² - 4(1)(1) = 4 - 4 = 0'
        }
      ],
      'Introduction to Trigonometry': [
        {
          question: 'sin²θ + cos²θ = ?',
          options: ['0', '1', '2', 'sin θ cos θ'],
          correctAnswer: 1,
          explanation: 'This is the fundamental trigonometric identity: sin²θ + cos²θ = 1'
        },
        {
          question: 'What is sin 30°?',
          options: ['1/2', '√3/2', '√2/2', '1'],
          correctAnswer: 0,
          explanation: 'sin 30° = 1/2 (standard trigonometric value)'
        }
      ],
      'Statistics': [
        {
          question: 'Mean of 5, 10, 15, 20, 25?',
          options: ['12', '15', '18', '20'],
          correctAnswer: 1,
          explanation: 'Mean = (5+10+15+20+25)/5 = 75/5 = 15'
        },
        {
          question: 'What is the median of 3, 7, 5, 9, 1?',
          options: ['3', '5', '7', '9'],
          correctAnswer: 1,
          explanation: 'Arranging in order: 1, 3, 5, 7, 9. The median is the middle value: 5'
        }
      ]
    },
    '11': {
      'Sets': [
        {
          question: 'If A={1,2,3}, B={2,3,4}, what is A∩B?',
          options: ['{1,4}', '{2,3}', '{1,2,3,4}', '{}'],
          correctAnswer: 1,
          explanation: 'A∩B contains elements common to both sets: {2,3}'
        },
        {
          question: 'If A={1,2}, how many subsets does A have?',
          options: ['2', '3', '4', '5'],
          correctAnswer: 2,
          explanation: 'Number of subsets = 2^n = 2^2 = 4: {}, {1}, {2}, {1,2}'
        }
      ],
      'Binomial Theorem': [
        {
          question: 'Expand (x+y)²',
          options: ['x²+y²', 'x²+2xy+y²', 'x²+xy+y²', '2x²+2y²'],
          correctAnswer: 1,
          explanation: '(x+y)² = x² + 2xy + y² using binomial expansion'
        },
        {
          question: 'What is the coefficient of x²y³ in (x+y)⁵?',
          options: ['5', '10', '15', '20'],
          correctAnswer: 1,
          explanation: 'Using ⁵C₂ = 5!/(2!3!) = 10'
        }
      ],
      'Sequences and Series': [
        {
          question: 'Next term in 2, 4, 8, 16...?',
          options: ['24', '30', '32', '36'],
          correctAnswer: 2,
          explanation: 'This is a geometric sequence with ratio 2: 16 × 2 = 32'
        },
        {
          question: 'Sum of first 5 terms of arithmetic sequence 3, 7, 11, 15, ...?',
          options: ['45', '50', '55', '60'],
          correctAnswer: 2,
          explanation: 'Sum = n/2[2a + (n-1)d] = 5/2[6 + 4×4] = 5/2 × 22 = 55'
        }
      ]
    },
    '12': {
      'Matrices': [
        {
          question: 'If A=[[1,2],[3,4]], what is det(A)?',
          options: ['-2', '2', '10', '0'],
          correctAnswer: 0,
          explanation: 'det(A) = (1)(4) - (2)(3) = 4 - 6 = -2'
        },
        {
          question: 'What is the order of matrix [[1,2,3],[4,5,6]]?',
          options: ['2×3', '3×2', '2×2', '3×3'],
          correctAnswer: 0,
          explanation: 'Matrix has 2 rows and 3 columns, so order is 2×3'
        }
      ],
      'Application of Derivatives': [
        {
          question: 'd/dx (x²) = ?',
          options: ['x', '2x', 'x²', '2'],
          correctAnswer: 1,
          explanation: 'Using power rule: d/dx (x^n) = nx^(n-1), so d/dx (x²) = 2x'
        },
        {
          question: 'What is the derivative of sin x?',
          options: ['cos x', '-cos x', 'sin x', '-sin x'],
          correctAnswer: 0,
          explanation: 'The derivative of sin x is cos x'
        }
      ],
      'Probability': [
        {
          question: 'If a die is rolled, probability of even number?',
          options: ['1/6', '1/3', '1/2', '2/3'],
          correctAnswer: 2,
          explanation: 'Even numbers: 2,4,6. So P(even) = 3/6 = 1/2'
        },
        {
          question: 'Two coins are tossed. P(both heads)?',
          options: ['1/4', '1/2', '1/3', '3/4'],
          correctAnswer: 0,
          explanation: 'P(HH) = P(H) × P(H) = 1/2 × 1/2 = 1/4'
        }
      ]
    }
  }

  constructor() {
    super({ key: 'MathPuzzleInteractiveScene' })
  }

  preload(): void {
    // Create simple graphics for particles
    this.load.image('spark', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
  }

  create(): void {
    this.showGradeSelection()
  }

  showGradeSelection(): void {
    this.children.removeAll()
    
    // Background
    this.add.rectangle(175, 200, 350, 400, 0xffffff)

    // Title
    this.add.text(175, 50, '🧮 Math Puzzle', {
      fontSize: '20px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(175, 75, 'Choose your grade:', {
      fontSize: '14px',
      color: '#6b7280',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Grade buttons (smaller layout)
    const grades = Object.keys(this.gradeTopics)
    grades.forEach((grade, index) => {
      const row = Math.floor(index / 2)
      const col = index % 2
      const x = 130 + (col * 90)
      const y = 120 + (row * 50)

      const button = this.add.rectangle(x, y, 70, 40, 0x3b82f6)
        .setInteractive()
        .setStrokeStyle(2, 0x1e40af)

      this.add.text(x, y, `Grade ${grade}`, {
        fontSize: '12px',
        color: '#ffffff',
        fontFamily: 'Arial',
        align: 'center'
      }).setOrigin(0.5)

      button.on('pointerover', () => {
        button.setFillStyle(0x2563eb)
        this.tweens.add({ targets: button, scaleX: 1.05, scaleY: 1.05, duration: 200 })
      })

      button.on('pointerout', () => {
        button.setFillStyle(0x3b82f6)
        this.tweens.add({ targets: button, scaleX: 1, scaleY: 1, duration: 200 })
      })

      button.on('pointerdown', () => {
        this.currentGrade = grade
        this.showTopicSelection()
      })
    })

    // Instructions
    this.add.text(175, 270, '🎯 Select grade to start!\nEarn points for correct answers!', {
      fontSize: '12px',
      color: '#374151',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0.5)
  }

  showTopicSelection(): void {
    this.children.removeAll()
    
    // Background
    this.add.rectangle(175, 200, 350, 400, 0xffffff)

    // Title
    this.add.text(175, 40, `Grade ${this.currentGrade} Topics`, {
      fontSize: '18px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Topic buttons
    const topics = Object.keys(this.gradeTopics[this.currentGrade])
    topics.forEach((topic, index) => {
      const y = 90 + (index * 60)
      
      const button = this.add.rectangle(175, y, 300, 45, 0x10b981)
        .setInteractive()
        .setStrokeStyle(2, 0x059669)

      this.add.text(175, y, topic, {
        fontSize: '13px',
        color: '#ffffff',
        fontFamily: 'Arial'
      }).setOrigin(0.5)

      button.on('pointerover', () => {
        button.setFillStyle(0x059669)
        this.tweens.add({ targets: button, scaleX: 1.05, scaleY: 1.05, duration: 150 })
      })

      button.on('pointerout', () => {
        button.setFillStyle(0x10b981)
        this.tweens.add({ targets: button, scaleX: 1, scaleY: 1, duration: 150 })
      })

      button.on('pointerdown', () => {
        this.currentTopic = topic
        this.questions = this.gradeTopics[this.currentGrade][topic]
        this.currentQuestionIndex = 0
        this.score = 0
        this.showQuestion()
      })
    })

    // Back button
    this.createBackButton(() => this.showGradeSelection())
  }

  showQuestion(): void {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.showResults()
      return
    }

    this.children.removeAll()
    
    // Background
    this.add.rectangle(175, 200, 350, 400, 0xffffff)

    const question = this.questions[this.currentQuestionIndex]

    // Progress
    this.add.text(175, 30, `Q${this.currentQuestionIndex + 1}/${this.questions.length} | Score: ${this.score}`, {
      fontSize: '12px',
      color: '#6b7280',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Topic
    this.add.text(175, 50, this.currentTopic, {
      fontSize: '14px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Question
    this.add.text(175, 100, question.question, {
      fontSize: '13px',
      color: '#1f2937',
      fontFamily: 'Arial',
      align: 'center',
      wordWrap: { width: 300 }
    }).setOrigin(0.5)

    // Answer options (vertical layout for small space)
    question.options.forEach((option, index) => {
      const y = 150 + index * 45

      const button = this.add.rectangle(175, y, 280, 35, 0xf3f4f6)
        .setInteractive()
        .setStrokeStyle(2, 0xd1d5db)

      this.add.text(175, y, option, {
        fontSize: '12px',
        color: '#1f2937',
        fontFamily: 'Arial'
      }).setOrigin(0.5)

      button.on('pointerover', () => {
        button.setFillStyle(0xe5e7eb)
      })

      button.on('pointerout', () => {
        button.setFillStyle(0xf3f4f6)
      })

      button.on('pointerdown', () => {
        this.handleAnswer(index, button)
      })
    })

    // Back button
    this.createBackButton(() => this.showTopicSelection())
  }

  handleAnswer(selectedIndex: number, button: Phaser.GameObjects.Rectangle): void {
    const question = this.questions[this.currentQuestionIndex]
    const isCorrect = selectedIndex === question.correctAnswer

    if (isCorrect) {
      this.score += 10
      button.setFillStyle(0x10b981) // Green for correct
      this.showCorrectAnimation()
      
      // Show motivational text
      const motivationalTexts = [
        'Awesome! 🌟',
        'Great! 🎉',
        'Perfect! 💫',
        'Nice! ⭐'
      ]
      const randomText = motivationalTexts[Math.floor(Math.random() * motivationalTexts.length)]
      
      const successText = this.add.text(175, 320, randomText, {
        fontSize: '16px',
        color: '#10b981',
        fontFamily: 'Arial'
      }).setOrigin(0.5)

      this.tweens.add({
        targets: successText,
        scaleX: 1.2,
        scaleY: 1.2,
        alpha: 0,
        duration: 2000,
        ease: 'Power2'
      })

    } else {
      button.setFillStyle(0xef4444) // Red for incorrect
      
      // Show encouraging hint
      this.add.text(175, 320, `Hint: ${question.explanation}`, {
        fontSize: '10px',
        color: '#f59e0b',
        fontFamily: 'Arial',
        wordWrap: { width: 280 },
        align: 'center'
      }).setOrigin(0.5)
    }

    // Continue to next question after delay
    this.time.delayedCall(3000, () => {
      this.currentQuestionIndex++
      this.showQuestion()
    })
  }

  showCorrectAnimation(): void {
    // Create balloon animation (smaller area)
    for (let i = 0; i < 3; i++) {
      const balloon = this.add.text(
        Phaser.Math.Between(50, 300),
        400,
        '🎈',
        { fontSize: '16px' }
      )

      this.tweens.add({
        targets: balloon,
        y: -20,
        x: balloon.x + Phaser.Math.Between(-50, 50),
        duration: Phaser.Math.Between(1500, 2000),
        ease: 'Power2',
        onComplete: () => balloon.destroy()
      })
    }

    // Create confetti effect (smaller)
    for (let i = 0; i < 5; i++) {
      const confetti = this.add.text(
        Phaser.Math.Between(100, 250),
        30,
        '🎊',
        { fontSize: '12px' }
      )

      this.tweens.add({
        targets: confetti,
        y: 400,
        x: confetti.x + Phaser.Math.Between(-100, 100),
        rotation: Phaser.Math.Between(0, Math.PI * 2),
        duration: Phaser.Math.Between(1000, 1500),
        ease: 'Power2',
        onComplete: () => confetti.destroy()
      })
    }

    // Boom effect (smaller)
    const boom = this.add.text(175, 200, '💥', {
      fontSize: '24px'
    }).setOrigin(0.5)

    this.tweens.add({
      targets: boom,
      scaleX: 2,
      scaleY: 2,
      alpha: 0,
      duration: 1000,
      ease: 'Power2',
      onComplete: () => boom.destroy()
    })
  }

  showResults(): void {
    this.children.removeAll()
    
    // Background
    this.add.rectangle(175, 200, 350, 400, 0xffffff)

    const percentage = Math.round((this.score / (this.questions.length * 10)) * 100)
    
    // Results
    this.add.text(175, 80, '🎯 Quiz Complete!', {
      fontSize: '18px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(175, 120, `Score: ${this.score}/${this.questions.length * 10}`, {
      fontSize: '16px',
      color: '#3b82f6',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(175, 145, `${percentage}%`, {
      fontSize: '14px',
      color: '#6b7280',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Performance message
    let message = ''
    if (percentage >= 90) message = '🌟 Outstanding!'
    else if (percentage >= 70) message = '🎉 Great job!'
    else if (percentage >= 50) message = '👍 Good effort!'
    else message = '💪 Keep learning!'

    this.add.text(175, 180, message, {
      fontSize: '14px',
      color: '#10b981',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0.5)

    // Action buttons
    const tryAgainButton = this.add.rectangle(175, 240, 120, 35, 0x3b82f6)
      .setInteractive()
      .setStrokeStyle(2, 0x1e40af)

    this.add.text(175, 240, 'Try Again', {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    tryAgainButton.on('pointerdown', () => {
      this.currentQuestionIndex = 0
      this.score = 0
      this.showQuestion()
    })

    const newTopicButton = this.add.rectangle(175, 285, 120, 35, 0x10b981)
      .setInteractive()
      .setStrokeStyle(2, 0x059669)

    this.add.text(175, 285, 'New Topic', {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    newTopicButton.on('pointerdown', () => {
      this.showTopicSelection()
    })

    // Back button
    this.createBackButton(() => this.showGradeSelection())
  }

  createBackButton(callback: () => void): void {
    const backButton = this.add.rectangle(80, 360, 80, 30, 0x6b7280)
      .setInteractive()
      .setStrokeStyle(2, 0x4b5563)

    this.add.text(80, 360, 'Back', {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    backButton.on('pointerover', () => backButton.setFillStyle(0x4b5563))
    backButton.on('pointerout', () => backButton.setFillStyle(0x6b7280))
    backButton.on('pointerdown', callback)
  }

  update(): void {
    // Update logic if needed
  }
}