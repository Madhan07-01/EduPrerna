import Phaser from 'phaser'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export class Grade12Scene extends Phaser.Scene {
  private score: number = 0
  private currentQuestionIndex: number = 0
  private currentTopic: string = ''
  private timer: Phaser.Time.TimerEvent | null = null
  private timeLeft: number = 30

  // Grade 12 question banks by topic
  private readonly questionBanks: { [topic: string]: Question[] } = {
    'Matrices': [
      {
        id: 'm1',
        question: 'If A=[[1,2],[3,4]], what is det(A)?',
        options: ['-2', '2', '10', '0'],
        correctAnswer: 0,
        explanation: 'det(A) = (1)(4) - (2)(3) = 4 - 6 = -2'
      },
      {
        id: 'm2',
        question: 'What is the order of matrix [[1,2,3],[4,5,6]]?',
        options: ['2×3', '3×2', '2×2', '3×3'],
        correctAnswer: 0,
        explanation: 'Matrix has 2 rows and 3 columns, so order is 2×3'
      }
    ],
    'Application of Derivatives': [
      {
        id: 'ad1',
        question: 'd/dx (x²) = ?',
        options: ['x', '2x', 'x²', '2'],
        correctAnswer: 1,
        explanation: 'Using power rule: d/dx (x^n) = nx^(n-1), so d/dx (x²) = 2x'
      },
      {
        id: 'ad2',
        question: 'What is the derivative of sin x?',
        options: ['cos x', '-cos x', 'sin x', '-sin x'],
        correctAnswer: 0,
        explanation: 'The derivative of sin x is cos x'
      }
    ],
    'Probability': [
      {
        id: 'p1',
        question: 'If a die is rolled, probability of even number?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correctAnswer: 2,
        explanation: 'Even numbers: 2,4,6. So P(even) = 3/6 = 1/2'
      },
      {
        id: 'p2',
        question: 'Two coins are tossed. P(both heads)?',
        options: ['1/4', '1/2', '1/3', '3/4'],
        correctAnswer: 0,
        explanation: 'P(HH) = P(H) × P(H) = 1/2 × 1/2 = 1/4'
      }
    ]
  }

  constructor() {
    super({ key: 'Grade12Scene' })
  }

  preload(): void {
    // Preload any assets needed
  }

  create(): void {
    this.add.rectangle(400, 300, 800, 600, 0xffffff)

    this.add.text(400, 50, 'Grade 12 Mathematics (Pre-Calculus)', {
      fontSize: '28px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 90, '🎯 Prepare for advanced mathematics and calculus! 🎯', {
      fontSize: '14px',
      color: '#7c3aed',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    const topics = [
      'Relations and Functions',
      'Inverse Trigonometric Functions',
      'Matrices',
      'Determinants',
      'Continuity and Differentiability',
      'Application of Derivatives',
      'Integrals',
      'Application of Integrals',
      'Differential Equations',
      'Vector Algebra',
      'Three-dimensional Geometry',
      'Linear Programming',
      'Probability'
    ]

    this.createTopicButtons(topics, 0x059669, 0x047857)
    this.createBackButton()
  }

  createTopicButtons(topics: string[], primaryColor: number, hoverColor: number): void {
    const buttonWidth = 180
    const buttonHeight = 50
    const cols = 2
    const startX = 400 - ((cols * buttonWidth + (cols - 1) * 20) / 2) + (buttonWidth / 2)
    const startY = 150

    topics.forEach((topic, index) => {
      const col = index % cols
      const row = Math.floor(index / cols)
      const x = startX + (col * (buttonWidth + 20))
      const y = startY + (row * (buttonHeight + 15))

      const button = this.add.rectangle(x, y, buttonWidth, buttonHeight, primaryColor)
        .setInteractive()
        .setStrokeStyle(2, hoverColor)

      this.add.text(x, y, topic, {
        fontSize: '12px',
        color: '#ffffff',
        fontFamily: 'Arial'
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
        this.showTopicPlaceholder(topic)
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

  showTopicPlaceholder(topic: string): void {
    this.children.removeAll()
    this.add.rectangle(400, 300, 800, 600, 0xffffff)

    this.add.text(400, 100, `${topic} - Grade 12`, {
      fontSize: '24px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    const contentArea = this.add.rectangle(400, 300, 600, 300, 0xecfdf5)
      .setStrokeStyle(3, 0x059669, 1)

    this.add.text(400, 250, '🚀 Advanced Mathematical Thinking', {
      fontSize: '20px',
      color: '#064e3b',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 290, 'Pre-calculus concepts and university preparation', {
      fontSize: '14px',
      color: '#065f46',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 330, '🎓 College-Ready Mathematics & Simulations 🎓', {
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

    // Add some visual flair for the final grade
    this.tweens.add({
      targets: contentArea,
      rotation: 0.02,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })
  }

  update(): void {
    // Update logic for Grade 12 scene
  }
}