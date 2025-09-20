import Phaser from 'phaser'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export class Grade9Scene extends Phaser.Scene {
  private score: number = 0
  private currentQuestionIndex: number = 0
  private currentTopic: string = ''
  private timer: Phaser.Time.TimerEvent | null = null
  private timeLeft: number = 30
  private balloons: Phaser.GameObjects.Image[] = []
  private confetti: Phaser.GameObjects.Image[] = []

  // Grade 9 question banks by topic
  private readonly questionBanks: { [topic: string]: Question[] } = {
    'Number Systems': [
      {
        id: 'ns1',
        question: 'What is the decimal expansion of 1/7?',
        options: ['0.142857... (repeating)', '0.14', '0.1428', '0.15'],
        correctAnswer: 0,
        explanation: '1/7 = 0.142857142857... which repeats the pattern 142857'
      },
      {
        id: 'ns2',
        question: 'Which of these is an irrational number?',
        options: ['√16', '√9', '√2', '√25'],
        correctAnswer: 2,
        explanation: '√2 cannot be expressed as a fraction and has infinite non-repeating decimals'
      }
    ],
    'Polynomials': [
      {
        id: 'p1',
        question: 'If x² - 5x + 6 = 0, what are the roots?',
        options: ['1 and 6', '2 and 3', '-2 and -3', '5 and 1'],
        correctAnswer: 1,
        explanation: 'Factoring: (x-2)(x-3) = 0, so x = 2 or x = 3'
      },
      {
        id: 'p2',
        question: 'What is the degree of polynomial 3x⁴ + 2x² - 5?',
        options: ['2', '3', '4', '5'],
        correctAnswer: 2,
        explanation: 'The highest power of x is 4, so the degree is 4'
      }
    ],
    'Probability': [
      {
        id: 'pr1',
        question: 'A coin is tossed once. Probability of getting heads?',
        options: ['1/4', '1/2', '3/4', '1'],
        correctAnswer: 1,
        explanation: 'There are 2 equally likely outcomes (H,T), so P(H) = 1/2'
      },
      {
        id: 'pr2',
        question: 'A die is rolled. What is P(even number)?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correctAnswer: 2,
        explanation: 'Even numbers: 2,4,6. So P(even) = 3/6 = 1/2'
      }
    ]
  }

  constructor() {
    super({ key: 'Grade9Scene' })
  }

  preload(): void {
    // Create simple colored shapes for animations
    this.load.image('balloon', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
  }

  create(): void {
    this.add.rectangle(400, 300, 800, 600, 0xffffff)

    this.add.text(400, 50, 'Grade 9 Mathematics', {
      fontSize: '28px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 90, '🧠 Master fundamental mathematical concepts! 🧠', {
      fontSize: '14px',
      color: '#8b5cf6',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Updated Grade 9 topics based on requirements
    const topics = [
      'Number Systems',
      'Polynomials',
      'Coordinate Geometry',
      'Linear Equations in Two Variables',
      'Introduction to Euclidean Geometry',
      'Lines and Angles',
      'Triangles',
      'Quadrilaterals',
      'Circles',
      'Constructions',
      'Heron\'s Formula',
      'Surface Areas and Volumes',
      'Statistics',
      'Probability'
    ]

    this.createTopicButtons(topics, 0x8b5cf6, 0x7c3aed)
    this.createBackButton()
  }

  createTopicButtons(topics: string[], primaryColor: number, hoverColor: number): void {
    const buttonWidth = 170
    const buttonHeight = 45
    const cols = 3
    const spacing = 15
    const startX = 400 - (((cols * buttonWidth) + ((cols - 1) * spacing)) / 2) + (buttonWidth / 2)
    const startY = 140

    topics.forEach((topic, index) => {
      const col = index % cols
      const row = Math.floor(index / cols)
      const x = startX + (col * (buttonWidth + spacing))
      const y = startY + (row * (buttonHeight + 12))

      const button = this.add.rectangle(x, y, buttonWidth, buttonHeight, primaryColor)
        .setInteractive()
        .setStrokeStyle(2, hoverColor)

      this.add.text(x, y, topic, {
        fontSize: '10px',
        color: '#ffffff',
        fontFamily: 'Arial',
        wordWrap: { width: buttonWidth - 10 }
      }).setOrigin(0.5)

      button.on('pointerover', () => {
        button.setFillStyle(hoverColor)
        this.tweens.add({ targets: button, scaleX: 1.05, scaleY: 1.05, duration: 150 })
      })

      button.on('pointerout', () => {
        button.setFillStyle(primaryColor)
        this.tweens.add({ targets: button, scaleX: 1, scaleY: 1, duration: 150 })
      })

      button.on('pointerdown', () => {
        this.startQuestions(topic)
      })
    })
  }

  createBackButton(): void {
    const backButton = this.add.rectangle(100, 550, 120, 40, 0x6b7280)
      .setInteractive()
      .setStrokeStyle(2, 0x4b5563)

    this.add.text(100, 550, 'Back to Menu', {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    backButton.on('pointerover', () => backButton.setFillStyle(0x4b5563))
    backButton.on('pointerout', () => backButton.setFillStyle(0x6b7280))
    backButton.on('pointerdown', () => this.scene.start('MainMenuScene'))
  }

  startQuestions(topic: string): void {
    // Only start questions if we have a question bank for this topic
    if (!this.questionBanks[topic]) {
      this.showTopicPlaceholder(topic)
      return
    }

    this.currentTopic = topic
    this.currentQuestionIndex = 0
    this.score = 0
    this.showQuestion()
  }

  showQuestion(): void {
    const questions = this.questionBanks[this.currentTopic]
    if (!questions || this.currentQuestionIndex >= questions.length) {
      this.showResults()
      return
    }

    this.children.removeAll()
    this.add.rectangle(400, 300, 800, 600, 0xffffff)

    const question = questions[this.currentQuestionIndex]

    // Header
    this.add.text(400, 50, `${this.currentTopic} - Grade 9`, {
      fontSize: '20px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Score and question counter
    this.add.text(100, 100, `Score: ${this.score}`, {
      fontSize: '16px',
      color: '#059669',
      fontFamily: 'Arial'
    })

    this.add.text(700, 100, `Q${this.currentQuestionIndex + 1}/${questions.length}`, {
      fontSize: '16px',
      color: '#6b7280',
      fontFamily: 'Arial'
    }).setOrigin(1, 0)

    // Timer
    this.timeLeft = 30
    const timerText = this.add.text(400, 100, `Time: ${this.timeLeft}s`, {
      fontSize: '16px',
      color: '#dc2626',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.timer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeLeft--
        timerText.setText(`Time: ${this.timeLeft}s`)
        if (this.timeLeft <= 0) {
          this.timer?.destroy()
          this.showWrongAnswer('Time\'s up! Try again.')
        }
      },
      repeat: 29
    })

    // Question
    this.add.text(400, 160, question.question, {
      fontSize: '18px',
      color: '#1f2937',
      fontFamily: 'Arial',
      wordWrap: { width: 700 }
    }).setOrigin(0.5)

    // Answer options
    question.options.forEach((option, index) => {
      const y = 220 + (index * 60)
      const button = this.add.rectangle(400, y, 600, 50, 0x8b5cf6)
        .setInteractive()
        .setStrokeStyle(2, 0x7c3aed)

      this.add.text(400, y, `${String.fromCharCode(65 + index)}. ${option}`, {
        fontSize: '14px',
        color: '#ffffff',
        fontFamily: 'Arial'
      }).setOrigin(0.5)

      button.on('pointerover', () => {
        button.setFillStyle(0x7c3aed)
      })

      button.on('pointerout', () => {
        button.setFillStyle(0x8b5cf6)
      })

      button.on('pointerdown', () => {
        this.timer?.destroy()
        if (index === question.correctAnswer) {
          this.showCorrectAnswer(question.explanation)
        } else {
          this.showWrongAnswer(question.explanation)
        }
      })
    })

    // Back button
    this.createQuestionBackButton()
  }

  showCorrectAnswer(explanation: string): void {
    this.score++
    this.children.removeAll()
    this.add.rectangle(400, 300, 800, 600, 0xf0fdf4)

    // Success animation
    this.add.text(400, 150, 'Awesome Job! 🎉', {
      fontSize: '32px',
      color: '#059669',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 200, '+1 Point!', {
      fontSize: '24px',
      color: '#10b981',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 280, explanation, {
      fontSize: '16px',
      color: '#374151',
      fontFamily: 'Arial',
      wordWrap: { width: 600 }
    }).setOrigin(0.5)

    // Balloon animation
    this.createBalloonAnimation()
    
    // Confetti animation
    this.createConfettiAnimation()

    // Continue button
    const continueButton = this.add.rectangle(400, 450, 200, 50, 0x059669)
      .setInteractive()
      .setStrokeStyle(2, 0x047857)

    this.add.text(400, 450, 'Continue', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    continueButton.on('pointerdown', () => {
      this.currentQuestionIndex++
      this.showQuestion()
    })
  }

  showWrongAnswer(explanation: string): void {
    this.children.removeAll()
    this.add.rectangle(400, 300, 800, 600, 0xfef2f2)

    // Shake animation for wrong answer
    const wrongText = this.add.text(400, 150, 'Try Again! 💪', {
      fontSize: '32px',
      color: '#dc2626',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Gentle shake animation
    this.tweens.add({
      targets: wrongText,
      x: 410,
      duration: 100,
      yoyo: true,
      repeat: 3,
      ease: 'Power2'
    })

    this.add.text(400, 200, 'Don\'t give up!', {
      fontSize: '18px',
      color: '#ef4444',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 280, explanation, {
      fontSize: '16px',
      color: '#374151',
      fontFamily: 'Arial',
      wordWrap: { width: 600 }
    }).setOrigin(0.5)

    // Retry button
    const retryButton = this.add.rectangle(400, 450, 200, 50, 0xdc2626)
      .setInteractive()
      .setStrokeStyle(2, 0xb91c1c)

    this.add.text(400, 450, 'Try Again', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    retryButton.on('pointerdown', () => {
      this.showQuestion()
    })
  }

  showResults(): void {
    this.children.removeAll()
    this.add.rectangle(400, 300, 800, 600, 0xffffff)

    const percentage = Math.round((this.score / this.questionBanks[this.currentTopic].length) * 100)
    
    this.add.text(400, 150, `${this.currentTopic} Complete!`, {
      fontSize: '28px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 200, `Final Score: ${this.score}/${this.questionBanks[this.currentTopic].length}`, {
      fontSize: '20px',
      color: '#059669',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 240, `${percentage}% Correct`, {
      fontSize: '18px',
      color: '#6b7280',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    if (percentage >= 80) {
      this.add.text(400, 280, '🏆 Excellent Work! 🏆', {
        fontSize: '20px',
        color: '#f59e0b',
        fontFamily: 'Arial'
      }).setOrigin(0.5)
      this.createConfettiAnimation()
    } else if (percentage >= 60) {
      this.add.text(400, 280, '👍 Good Job! Keep practicing!', {
        fontSize: '18px',
        color: '#3b82f6',
        fontFamily: 'Arial'
      }).setOrigin(0.5)
    } else {
      this.add.text(400, 280, '📚 Keep studying and try again!', {
        fontSize: '18px',
        color: '#ef4444',
        fontFamily: 'Arial'
      }).setOrigin(0.5)
    }

    // Navigation buttons
    const backButton = this.add.rectangle(300, 400, 150, 50, 0x6b7280)
      .setInteractive()
      .setStrokeStyle(2, 0x4b5563)

    this.add.text(300, 400, 'Back to Topics', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    const retryButton = this.add.rectangle(500, 400, 150, 50, 0x8b5cf6)
      .setInteractive()
      .setStrokeStyle(2, 0x7c3aed)

    this.add.text(500, 400, 'Try Again', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    backButton.on('pointerdown', () => this.scene.restart())
    retryButton.on('pointerdown', () => this.startQuestions(this.currentTopic))
  }

  createQuestionBackButton(): void {
    const backButton = this.add.rectangle(100, 550, 120, 40, 0x6b7280)
      .setInteractive()
      .setStrokeStyle(2, 0x4b5563)

    this.add.text(100, 550, 'Back to Topics', {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    backButton.on('pointerdown', () => {
      this.timer?.destroy()
      this.scene.restart()
    })
  }

  createBalloonAnimation(): void {
    // Create balloon effect
    for (let i = 0; i < 5; i++) {
      const balloon = this.add.circle(
        300 + (i * 50), 
        500, 
        20, 
        [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24, 0xf0932b][i]
      )
      
      this.tweens.add({
        targets: balloon,
        y: 50,
        duration: 2000 + (i * 200),
        ease: 'Power2',
        onComplete: () => balloon.destroy()
      })

      this.tweens.add({
        targets: balloon,
        x: balloon.x + Phaser.Math.Between(-50, 50),
        duration: 2000 + (i * 200),
        ease: 'Sine.easeInOut'
      })
    }
  }

  createConfettiAnimation(): void {
    // Create confetti effect
    for (let i = 0; i < 15; i++) {
      const confettiPiece = this.add.rectangle(
        Phaser.Math.Between(200, 600),
        50,
        8,
        8,
        [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24, 0xf0932b, 0xee5a24][Phaser.Math.Between(0, 5)]
      )

      this.tweens.add({
        targets: confettiPiece,
        y: 550,
        rotation: Phaser.Math.Between(0, 6),
        duration: Phaser.Math.Between(2000, 4000),
        ease: 'Power2',
        onComplete: () => confettiPiece.destroy()
      })

      this.tweens.add({
        targets: confettiPiece,
        x: confettiPiece.x + Phaser.Math.Between(-100, 100),
        duration: Phaser.Math.Between(2000, 4000),
        ease: 'Sine.easeInOut'
      })
    }
  }

  showTopicPlaceholder(topic: string): void {
    this.children.removeAll()
    this.add.rectangle(400, 300, 800, 600, 0xffffff)

    this.add.text(400, 100, `${topic} - Grade 9`, {
      fontSize: '24px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    const contentArea = this.add.rectangle(400, 300, 600, 300, 0xf3e8ff)
      .setStrokeStyle(3, 0x8b5cf6, 1)

    this.add.text(400, 250, '🎓 Grade 9 Mathematics', {
      fontSize: '20px',
      color: '#5b21b6',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 290, 'Interactive questions coming soon for this topic!', {
      fontSize: '14px',
      color: '#6d28d9',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 330, '🌟 Progress tracking & Rewards 🌟', {
      fontSize: '12px',
      color: '#7c3aed',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    const backButton = this.add.rectangle(400, 500, 150, 40, 0x3b82f6)
      .setInteractive()
      .setStrokeStyle(2, 0x1e40af)

    this.add.text(400, 500, 'Back to Topics', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    backButton.on('pointerdown', () => this.scene.restart())
  }

  update(): void {
    // Update logic for Grade 9 scene
  }
}