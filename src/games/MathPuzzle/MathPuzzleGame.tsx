import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser'

// Mathematics topics and questions data
const MATHEMATICS_DATA = {
  6: {
    topics: ['Basic Arithmetic', 'Fractions', 'Decimals'],
    questions: {
      'Basic Arithmetic': [
        { question: '15 + 23 = ?', answer: 38, type: 'input' },
        { question: '45 - 17 = ?', answer: 28, type: 'input' },
        { question: '8 × 7 = ?', answer: 56, type: 'input' }
      ],
      'Fractions': [
        { question: 'What is 1/2 + 1/4?', answer: '3/4', type: 'input' },
        { question: 'What is 3/4 - 1/4?', answer: '1/2', type: 'input' },
        { question: 'What is 2/3 × 3/4?', answer: '1/2', type: 'input' }
      ],
      'Decimals': [
        { question: '0.5 + 0.3 = ?', answer: 0.8, type: 'input' },
        { question: '1.2 - 0.4 = ?', answer: 0.8, type: 'input' },
        { question: '0.5 × 0.6 = ?', answer: 0.3, type: 'input' }
      ]
    }
  },
  7: {
    topics: ['Integers', 'Rational Numbers', 'Algebraic Expressions'],
    questions: {
      'Integers': [
        { question: '(-15) + 8 = ?', answer: -7, type: 'input' },
        { question: '(-12) × (-4) = ?', answer: 48, type: 'input' },
        { question: '24 ÷ (-6) = ?', answer: -4, type: 'input' }
      ],
      'Rational Numbers': [
        { question: 'Convert 3/4 to decimal', answer: 0.75, type: 'input' },
        { question: '(-2/3) + (1/6) = ?', answer: '-1/2', type: 'input' },
        { question: '(3/5) ÷ (2/3) = ?', answer: '9/10', type: 'input' }
      ],
      'Algebraic Expressions': [
        { question: 'If x = 3, find 2x + 5', answer: 11, type: 'input' },
        { question: 'Simplify: 3a + 2a', answer: '5a', type: 'input' },
        { question: 'If y = 4, find y² - 3y', answer: 4, type: 'input' }
      ]
    }
  },
  8: {
    topics: ['Linear Equations', 'Quadrilaterals', 'Mensuration'],
    questions: {
      'Linear Equations': [
        { question: 'Solve: 2x + 3 = 11', answer: 4, type: 'input' },
        { question: 'Solve: 3x - 7 = 8', answer: 5, type: 'input' },
        { question: 'Solve: x/2 + 5 = 9', answer: 8, type: 'input' }
      ],
      'Quadrilaterals': [
        { question: 'Sum of angles in a quadrilateral?', answer: 360, type: 'input' },
        { question: 'Area of square with side 6 cm?', answer: 36, type: 'input' },
        { question: 'Perimeter of rectangle: length=8, width=5?', answer: 26, type: 'input' }
      ],
      'Mensuration': [
        { question: 'Volume of cube with side 4 cm?', answer: 64, type: 'input' },
        { question: 'Area of circle with radius 7 cm? (use π=22/7)', answer: 154, type: 'input' },
        { question: 'Surface area of cube with side 3 cm?', answer: 54, type: 'input' }
      ]
    }
  },
  9: {
    topics: ['Number Systems', 'Polynomials', 'Coordinate Geometry'],
    questions: {
      'Number Systems': [
        { question: 'Rationalize: 1/(√3 + 1)', answer: '(√3-1)/2', type: 'input' },
        { question: 'Find √(0.0625)', answer: 0.25, type: 'input' },
        { question: 'Express 0.̄6 as a fraction', answer: '2/3', type: 'input' }
      ],
      'Polynomials': [
        { question: 'Factor: x² - 5x + 6', answer: '(x-2)(x-3)', type: 'input' },
        { question: 'If p(x) = x² + 2x + 1, find p(2)', answer: 9, type: 'input' },
        { question: 'Degree of polynomial 3x⁴ + 2x² - 5?', answer: 4, type: 'input' }
      ],
      'Coordinate Geometry': [
        { question: 'Distance between (0,0) and (3,4)?', answer: 5, type: 'input' },
        { question: 'Midpoint of (2,3) and (4,7)?', answer: '(3,5)', type: 'input' },
        { question: 'In which quadrant is (-2,3)?', answer: 'II', type: 'input' }
      ]
    }
  },
  10: {
    topics: ['Real Numbers', 'Quadratic Equations', 'Arithmetic Progressions'],
    questions: {
      'Real Numbers': [
        { question: 'HCF of 12 and 18?', answer: 6, type: 'input' },
        { question: 'LCM of 15 and 25?', answer: 75, type: 'input' },
        { question: 'Is √2 + √3 rational?', answer: 'No', type: 'input' }
      ],
      'Quadratic Equations': [
        { question: 'Roots of x² - 5x + 6 = 0?', answer: '2,3', type: 'input' },
        { question: 'Discriminant of 2x² + 3x + 1 = 0?', answer: 1, type: 'input' },
        { question: 'Sum of roots of x² - 7x + 12 = 0?', answer: 7, type: 'input' }
      ],
      'Arithmetic Progressions': [
        { question: 'Common difference in 2,5,8,11,...?', answer: 3, type: 'input' },
        { question: '10th term of AP: a=2, d=3?', answer: 29, type: 'input' },
        { question: 'Sum of first 10 natural numbers?', answer: 55, type: 'input' }
      ]
    }
  },
  11: {
    topics: ['Sets', 'Trigonometric Functions', 'Permutations and Combinations'],
    questions: {
      'Sets': [
        { question: 'If A={1,2,3} and B={2,3,4}, find A∩B', answer: '{2,3}', type: 'input' },
        { question: 'Number of subsets of {a,b,c}?', answer: 8, type: 'input' },
        { question: 'If |A|=5, |B|=3, |A∩B|=2, find |A∪B|', answer: 6, type: 'input' }
      ],
      'Trigonometric Functions': [
        { question: 'sin²θ + cos²θ = ?', answer: 1, type: 'input' },
        { question: 'Value of sin(90°)?', answer: 1, type: 'input' },
        { question: 'Period of sin(x)?', answer: '2π', type: 'input' }
      ],
      'Permutations and Combinations': [
        { question: '5P2 = ?', answer: 20, type: 'input' },
        { question: '6C3 = ?', answer: 20, type: 'input' },
        { question: 'Number of ways to arrange MATH?', answer: 24, type: 'input' }
      ]
    }
  },
  12: {
    topics: ['Relations and Functions', 'Matrices', 'Integrals'],
    questions: {
      'Relations and Functions': [
        { question: 'Domain of f(x) = 1/x?', answer: 'R-{0}', type: 'input' },
        { question: 'If f(x) = 2x + 3, find f⁻¹(x)', answer: '(x-3)/2', type: 'input' },
        { question: 'Range of f(x) = x²?', answer: '[0,∞)', type: 'input' }
      ],
      'Matrices': [
        { question: 'Order of matrix [[1,2],[3,4],[5,6]]?', answer: '3×2', type: 'input' },
        { question: 'Determinant of [[2,3],[1,4]]?', answer: 5, type: 'input' },
        { question: 'If A is 2×3 and B is 3×4, order of AB?', answer: '2×4', type: 'input' }
      ],
      'Integrals': [
        { question: '∫x dx = ?', answer: 'x²/2 + C', type: 'input' },
        { question: '∫sin(x) dx = ?', answer: '-cos(x) + C', type: 'input' },
        { question: '∫₀¹ x dx = ?', answer: 0.5, type: 'input' }
      ]
    }
  }
}

// Topic Selection Scene - Choose topic for selected grade
class TopicSelectionScene extends Phaser.Scene {
  private selectedGrade: string = '6'

  constructor() {
    super({ key: 'TopicSelectionScene' })
  }

  create() {
    // Get selected grade from registry
    this.selectedGrade = this.registry.get('selectedGrade') || '6'
    
    // Background
    this.add.rectangle(400, 300, 800, 600, 0xf0f8ff)

    // Title
    this.add.text(400, 80, `🎯 Grade ${this.selectedGrade} Topics`, {
      fontSize: '32px',
      color: '#1e40af',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Subtitle
    this.add.text(400, 130, 'Choose a mathematics topic to practice:', {
      fontSize: '18px',
      color: '#475569',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Get topics for selected grade
    const gradeData = MATHEMATICS_DATA[parseInt(this.selectedGrade) as keyof typeof MATHEMATICS_DATA]
    const topics = gradeData?.topics || []

    // Create topic buttons
    topics.forEach((topic, index) => {
      const y = 200 + (index * 80)
      
      // Button background
      const button = this.add.rectangle(400, y, 500, 60, 0x3b82f6)
        .setInteractive()
        .setStrokeStyle(3, 0x1e40af)

      // Button text
      this.add.text(400, y, topic, {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      }).setOrigin(0.5)

      // Button interactions
      button.on('pointerover', () => {
        button.setFillStyle(0x2563eb)
        this.tweens.add({ targets: button, scaleX: 1.05, scaleY: 1.05, duration: 200 })
      })

      button.on('pointerout', () => {
        button.setFillStyle(0x3b82f6)
        this.tweens.add({ targets: button, scaleX: 1, scaleY: 1, duration: 200 })
      })

      button.on('pointerdown', () => {
        this.registry.set('selectedTopic', topic)
        this.scene.start('GameScene')
      })
    })

    // Back button
    const backButton = this.add.rectangle(100, 550, 120, 40, 0x6b7280)
      .setInteractive()
      .setStrokeStyle(2, 0x374151)

    this.add.text(100, 550, 'Back', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    backButton.on('pointerover', () => backButton.setFillStyle(0x374151))
    backButton.on('pointerout', () => backButton.setFillStyle(0x6b7280))
    backButton.on('pointerdown', () => {
      this.scene.start('MainMenuScene')
    })
  }
}

// Main Menu Scene - Grade and Topic Selection
class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' })
  }

  create() {
    // Background
    this.add.rectangle(400, 300, 800, 600, 0xf0f8ff)

    // Title
    this.add.text(400, 100, '🧮 Math Puzzle Challenge', {
      fontSize: '36px',
      color: '#1e40af',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Subtitle
    this.add.text(400, 150, 'Choose your grade level to start!', {
      fontSize: '20px',
      color: '#475569',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Grade buttons
    const grades = ['6', '7', '8', '9', '10', '11', '12']
    grades.forEach((grade, index) => {
      const row = Math.floor(index / 4)
      const col = index % 4
      const x = 150 + (col * 150)
      const y = 230 + (row * 120)

      // Button background
      const button = this.add.rectangle(x, y, 120, 80, 0x3b82f6)
        .setInteractive()
        .setStrokeStyle(3, 0x1e40af)

      // Button text
      this.add.text(x, y, `Grade\n${grade}`, {
        fontSize: '18px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center'
      }).setOrigin(0.5)

      // Button interactions
      button.on('pointerover', () => {
        button.setFillStyle(0x2563eb)
        this.tweens.add({ targets: button, scaleX: 1.1, scaleY: 1.1, duration: 200 })
      })

      button.on('pointerout', () => {
        button.setFillStyle(0x3b82f6)
        this.tweens.add({ targets: button, scaleX: 1, scaleY: 1, duration: 200 })
      })

      button.on('pointerdown', () => {
        this.registry.set('selectedGrade', grade)
        this.scene.start('TopicSelectionScene')
      })
    })

    // Instructions
    this.add.text(400, 480, '🎨 Features:\n• Interactive math problems\n• Keyboard input support\n• Fun animations for correct answers\n• Instant feedback', {
      fontSize: '16px',
      color: '#64748b',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0.5)
  }
}

// Game Scene - The actual math puzzle game
class GameScene extends Phaser.Scene {
  private currentQuestion: { question: string; answer: any; type: string } | null = null
  private userInput: string = ''
  private inputText: Phaser.GameObjects.Text | null = null
  private questionText: Phaser.GameObjects.Text | null = null
  private feedbackText: Phaser.GameObjects.Text | null = null
  private selectedGrade: string = '6'
  private selectedTopic: string = ''
  private questionIndex: number = 0
  private availableQuestions: any[] = []

  constructor() {
    super({ key: 'GameScene' })
  }

  create() {
    // Get selected grade and topic from registry
    this.selectedGrade = this.registry.get('selectedGrade') || '6'
    this.selectedTopic = this.registry.get('selectedTopic') || ''
    
    // Get questions for selected grade and topic
    const gradeData = MATHEMATICS_DATA[parseInt(this.selectedGrade) as keyof typeof MATHEMATICS_DATA]
    this.availableQuestions = gradeData?.questions[this.selectedTopic as keyof typeof gradeData.questions] || []
    this.questionIndex = 0
    
    // Background
    this.add.rectangle(400, 300, 800, 600, 0xfef3c7)

    // Title
    this.add.text(400, 60, `🧠 Grade ${this.selectedGrade} - ${this.selectedTopic}`, {
      fontSize: '24px',
      color: '#92400e',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Progress indicator
    this.add.text(400, 100, `Question ${this.questionIndex + 1} of ${this.availableQuestions.length}`, {
      fontSize: '16px',
      color: '#b45309',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Question display area
    this.add.rectangle(400, 200, 500, 100, 0xffffff)
      .setStrokeStyle(3, 0xd97706)

    this.questionText = this.add.text(400, 200, '', {
      fontSize: '20px',
      color: '#1f2937',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5)

    // Input area
    this.add.text(400, 320, 'Your Answer:', {
      fontSize: '20px',
      color: '#374151',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.rectangle(400, 370, 300, 50, 0xffffff)
      .setStrokeStyle(3, 0x3b82f6)

    this.inputText = this.add.text(400, 370, '', {
      fontSize: '20px',
      color: '#1f2937',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Instructions
    this.add.text(400, 450, 'Type your answer and press ENTER', {
      fontSize: '16px',
      color: '#6b7280',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Feedback area
    this.feedbackText = this.add.text(400, 500, '', {
      fontSize: '24px',
      color: '#10b981',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Back button
    const backButton = this.add.rectangle(100, 550, 120, 40, 0x6b7280)
      .setInteractive()
      .setStrokeStyle(2, 0x374151)

    this.add.text(100, 550, 'Back', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    backButton.on('pointerover', () => backButton.setFillStyle(0x374151))
    backButton.on('pointerout', () => backButton.setFillStyle(0x6b7280))
    backButton.on('pointerdown', () => {
      this.scene.start('TopicSelectionScene')
    })

    // Next Question button
    const nextQuestionButton = this.add.rectangle(700, 550, 150, 40, 0x10b981)
      .setInteractive()
      .setStrokeStyle(2, 0x059669)

    this.add.text(700, 550, 'Next Question', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    nextQuestionButton.on('pointerover', () => nextQuestionButton.setFillStyle(0x059669))
    nextQuestionButton.on('pointerout', () => nextQuestionButton.setFillStyle(0x10b981))
    nextQuestionButton.on('pointerdown', () => {
      this.loadNextQuestion()
      this.clearInput()
    })

    // Enable keyboard input
    this.input.keyboard?.on('keydown', this.handleKeyPress, this)

    // Load first question
    this.loadCurrentQuestion()
  }

  private loadCurrentQuestion() {
    if (this.availableQuestions.length === 0) {
      this.questionText?.setText('No questions available for this topic.')
      return
    }

    if (this.questionIndex >= this.availableQuestions.length) {
      this.questionIndex = 0 // Loop back to first question
    }

    this.currentQuestion = this.availableQuestions[this.questionIndex]
    
    if (this.questionText && this.currentQuestion) {
      this.questionText.setText(this.currentQuestion.question)
    }

    // Update progress indicator
    const progressText = this.children.getByName('progressText')
    if (progressText) {
      (progressText as Phaser.GameObjects.Text).setText(`Question ${this.questionIndex + 1} of ${this.availableQuestions.length}`)
    }
  }

  private loadNextQuestion() {
    this.questionIndex++
    if (this.questionIndex >= this.availableQuestions.length) {
      this.questionIndex = 0 // Loop back to first question
    }
    this.loadCurrentQuestion()
  }

  private handleKeyPress(event: KeyboardEvent) {
    // Prevent default behavior for all handled keys
    event.preventDefault()
    
    if (event.key >= '0' && event.key <= '9') {
      // Add number to input
      this.userInput += event.key
      this.updateInputDisplay()
    } else if (event.key === '.' || event.key === '/' || event.key === '-' || event.key === '+' || event.key === '(' || event.key === ')' || event.key === '=' || event.key === '√' || event.key === 'π') {
      // Allow mathematical symbols
      this.userInput += event.key
      this.updateInputDisplay()
    } else if (event.key.match(/^[a-zA-Z]$/)) {
      // Allow single letters for algebraic answers
      this.userInput += event.key
      this.updateInputDisplay()
    } else if (event.key === 'Backspace') {
      // Remove last character
      this.userInput = this.userInput.slice(0, -1)
      this.updateInputDisplay()
    } else if (event.key === 'Enter') {
      // Check answer
      this.checkAnswer()
    } else if (event.key === ' ') {
      // Allow spaces
      this.userInput += ' '
      this.updateInputDisplay()
    } else if (event.key === '{' || event.key === '}' || event.key === ',' || event.key === ':') {
      // Allow set notation symbols
      this.userInput += event.key
      this.updateInputDisplay()
    }
    // Ignore all other keys (don't add them to input)
  }

  private updateInputDisplay() {
    if (this.inputText) {
      this.inputText.setText(this.userInput || '_')
    }
  }

  private clearInput() {
    this.userInput = ''
    this.updateInputDisplay()
    if (this.feedbackText) {
      this.feedbackText.setText('')
    }
  }

  private checkAnswer() {
    if (!this.currentQuestion || this.userInput === '') return

    let isCorrect = false
    const userAnswer = this.userInput.trim().toLowerCase()
    const correctAnswer = this.currentQuestion.answer.toString().toLowerCase()

    // Check different answer formats
    if (this.currentQuestion.type === 'input') {
      // Try exact match first
      isCorrect = userAnswer === correctAnswer
      
      // Try numeric comparison if both can be parsed as numbers
      if (!isCorrect) {
        const userNum = parseFloat(userAnswer)
        const correctNum = parseFloat(correctAnswer)
        if (!isNaN(userNum) && !isNaN(correctNum)) {
          isCorrect = Math.abs(userNum - correctNum) < 0.01 // Allow small floating point differences
        }
      }
      
      // Try removing spaces and special characters for text answers
      if (!isCorrect) {
        const cleanUser = userAnswer.replace(/[\s{}()]/g, '')
        const cleanCorrect = correctAnswer.replace(/[\s{}()]/g, '')
        isCorrect = cleanUser === cleanCorrect
      }
    }

    if (isCorrect) {
      this.showCorrectFeedback()
      this.playSuccessAnimation()
    } else {
      this.showIncorrectFeedback()
    }
  }

  private showCorrectFeedback() {
    if (this.feedbackText) {
      this.feedbackText.setText('✓ Excellent! Correct answer!')
      this.feedbackText.setColor('#10b981')
      
      // Celebration text animation
      this.tweens.add({
        targets: this.feedbackText,
        scaleX: 1.3,
        scaleY: 1.3,
        duration: 300,
        yoyo: true,
        ease: 'Power2'
      })
    }
  }

  private showIncorrectFeedback() {
    if (this.feedbackText && this.currentQuestion) {
      this.feedbackText.setText(`✗ Try again! Correct answer: ${this.currentQuestion.answer}`)
      this.feedbackText.setColor('#ef4444')
      
      // Shake animation
      this.tweens.add({
        targets: this.feedbackText,
        x: this.feedbackText.x + 10,
        duration: 100,
        yoyo: true,
        repeat: 3,
        ease: 'Power2'
      })
    }
  }

  private playSuccessAnimation() {
    // Flying balloons animation
    for (let i = 0; i < 6; i++) {
      const balloon = this.add.text(
        Phaser.Math.Between(100, 700),
        600,
        '🎈',
        { fontSize: '32px' }
      )

      this.tweens.add({
        targets: balloon,
        y: -50,
        x: balloon.x + Phaser.Math.Between(-100, 100),
        duration: Phaser.Math.Between(2000, 3000),
        ease: 'Power2',
        onComplete: () => balloon.destroy()
      })
    }

    // Confetti effect
    for (let i = 0; i < 12; i++) {
      const confetti = this.add.text(
        Phaser.Math.Between(200, 600),
        50,
        '🎊',
        { fontSize: '20px' }
      )

      this.tweens.add({
        targets: confetti,
        y: 600,
        x: confetti.x + Phaser.Math.Between(-150, 150),
        rotation: Phaser.Math.Between(0, Math.PI * 2),
        duration: Phaser.Math.Between(1500, 2500),
        ease: 'Power2',
        onComplete: () => confetti.destroy()
      })
    }

    // Stars burst effect
    const centerX = 400
    const centerY = 300
    for (let i = 0; i < 8; i++) {
      const star = this.add.text(centerX, centerY, '⭐', { fontSize: '24px' })
      const angle = (i / 8) * Math.PI * 2
      const distance = 150

      this.tweens.add({
        targets: star,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        alpha: 0,
        duration: 1000,
        ease: 'Power2',
        onComplete: () => star.destroy()
      })
    }
  }

  destroy() {
    // Clean up keyboard listeners
    if (this.input.keyboard) {
      this.input.keyboard.off('keydown', this.handleKeyPress, this)
    }
  }
}

const MathPuzzleGame: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && !gameRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: containerRef.current,
        backgroundColor: '#ffffff',
        scene: [MainMenuScene, TopicSelectionScene, GameScene],
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
          }
        },
        input: {
          keyboard: true
        }
      }

      gameRef.current = new Phaser.Game(config)
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 max-w-4xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🧮 Interactive Math Puzzle
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Choose your grade level and solve math problems with fun animations!
          </p>
        </div>
        
        <div 
          ref={containerRef} 
          className="border-4 border-blue-200 dark:border-blue-700 rounded-lg overflow-hidden shadow-lg"
          style={{ width: '800px', height: '600px', margin: '0 auto' }}
        />
        
        <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          🎮 Use keyboard to type answers • Press ENTER to submit • Click buttons to navigate
        </div>
      </div>
    </div>
  )
}

export default MathPuzzleGame