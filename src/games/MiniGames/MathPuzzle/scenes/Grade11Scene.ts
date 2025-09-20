import Phaser from 'phaser'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export class Grade11Scene extends Phaser.Scene {
  private score: number = 0
  private currentQuestionIndex: number = 0
  private currentTopic: string = ''
  private timer: Phaser.Time.TimerEvent | null = null
  private timeLeft: number = 30

  // Grade 11 question banks by topic
  private readonly questionBanks: { [topic: string]: Question[] } = {
    'Sets': [
      {
        id: 's1',
        question: 'If A={1,2,3}, B={2,3,4}, what is A∩B?',
        options: ['{1,4}', '{2,3}', '{1,2,3,4}', '{}'],
        correctAnswer: 1,
        explanation: 'A∩B contains elements common to both sets: {2,3}'
      },
      {
        id: 's2',
        question: 'If A={1,2}, how many subsets does A have?',
        options: ['2', '3', '4', '5'],
        correctAnswer: 2,
        explanation: 'Number of subsets = 2^n = 2^2 = 4: {}, {1}, {2}, {1,2}'
      }
    ],
    'Binomial Theorem': [
      {
        id: 'bt1',
        question: 'Expand (x+y)²',
        options: ['x²+y²', 'x²+2xy+y²', 'x²+xy+y²', '2x²+2y²'],
        correctAnswer: 1,
        explanation: '(x+y)² = x² + 2xy + y² using binomial expansion'
      },
      {
        id: 'bt2',
        question: 'What is the coefficient of x²y³ in (x+y)⁵?',
        options: ['5', '10', '15', '20'],
        correctAnswer: 1,
        explanation: 'Using ⁵C₂ = 5!/(2!3!) = 10'
      }
    ],
    'Sequences and Series': [
      {
        id: 'ss1',
        question: 'Next term in 2, 4, 8, 16...?',
        options: ['24', '30', '32', '36'],
        correctAnswer: 2,
        explanation: 'This is a geometric sequence with ratio 2: 16 × 2 = 32'
      },
      {
        id: 'ss2',
        question: 'Sum of first 5 terms of arithmetic sequence 3, 7, 11, 15, ...?',
        options: ['45', '50', '55', '60'],
        correctAnswer: 2,
        explanation: 'Sum = n/2[2a + (n-1)d] = 5/2[6 + 4×4] = 5/2 × 22 = 55'
      }
    ]
  }

  constructor() {
    super({ key: 'Grade11Scene' })
  }

  preload(): void {
    // Create simple colored shapes for animations
    this.load.image('balloon', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
  }

  create(): void {
    this.add.rectangle(400, 300, 800, 600, 0xffffff)

    this.add.text(400, 50, 'Grade 11 Mathematics', {
      fontSize: '28px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 90, '🔬 Explore advanced mathematical concepts! 🔬', {
      fontSize: '14px',
      color: '#ec4899',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Updated Grade 11 topics based on requirements
    const topics = [
      'Sets',
      'Relations and Functions',
      'Trigonometric Functions',
      'Principle of Mathematical Induction',
      'Complex Numbers and Quadratic Equations',
      'Linear Inequalities',
      'Permutations and Combinations',
      'Binomial Theorem',
      'Sequences and Series',
      'Straight Lines',
      'Conic Sections',
      'Introduction to Three-dimensional Geometry',
      'Limits and Derivatives',
      'Mathematical Reasoning',
      'Statistics',
      'Probability'
    ]

    this.createTopicButtons(topics, 0xec4899, 0xdb2777)
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

    this.add.text(400, 100, `${topic} - Grade 11`, {
      fontSize: '24px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    const contentArea = this.add.rectangle(400, 300, 600, 300, 0xfdf2f8)
      .setStrokeStyle(3, 0xec4899, 1)

    this.add.text(400, 250, '⚗️ Advanced Mathematics Lab', {
      fontSize: '20px',
      color: '#9d174d',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 290, 'Complex functions and advanced problem solving', {
      fontSize: '14px',
      color: '#be185d',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 330, '📊 Interactive Graphing & Data Analysis 📊', {
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
    // Update logic for Grade 11 scene
  }
}