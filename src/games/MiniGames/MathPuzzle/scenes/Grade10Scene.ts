import Phaser from 'phaser'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export class Grade10Scene extends Phaser.Scene {
  private score: number = 0
  private currentQuestionIndex: number = 0
  private currentTopic: string = ''
  private timer: Phaser.Time.TimerEvent | null = null
  private timeLeft: number = 30

  // Grade 10 question banks by topic
  private readonly questionBanks: { [topic: string]: Question[] } = {
    'Quadratic Equations': [
      {
        id: 'qe1',
        question: 'Solve: x² - 4x - 5 = 0',
        options: ['x = 5 or x = -1', 'x = 4 or x = 5', 'x = -4 or x = 1', 'x = 2 or x = -5'],
        correctAnswer: 0,
        explanation: 'Factoring: (x-5)(x+1) = 0, so x = 5 or x = -1'
      },
      {
        id: 'qe2',
        question: 'What is the discriminant of x² + 2x + 1 = 0?',
        options: ['0', '4', '-4', '1'],
        correctAnswer: 0,
        explanation: 'Discriminant = b² - 4ac = 2² - 4(1)(1) = 4 - 4 = 0'
      }
    ],
    'Introduction to Trigonometry': [
      {
        id: 't1',
        question: 'sin²θ + cos²θ = ?',
        options: ['0', '1', '2', 'sin θ cos θ'],
        correctAnswer: 1,
        explanation: 'This is the fundamental trigonometric identity: sin²θ + cos²θ = 1'
      },
      {
        id: 't2',
        question: 'What is sin 30°?',
        options: ['1/2', '√3/2', '√2/2', '1'],
        correctAnswer: 0,
        explanation: 'sin 30° = 1/2 (standard trigonometric value)'
      }
    ],
    'Statistics': [
      {
        id: 's1',
        question: 'Mean of 5, 10, 15, 20, 25?',
        options: ['12', '15', '18', '20'],
        correctAnswer: 1,
        explanation: 'Mean = (5+10+15+20+25)/5 = 75/5 = 15'
      },
      {
        id: 's2',
        question: 'What is the median of 3, 7, 5, 9, 1?',
        options: ['3', '5', '7', '9'],
        correctAnswer: 1,
        explanation: 'Arranging in order: 1, 3, 5, 7, 9. The median is the middle value: 5'
      }
    ]
  }

  constructor() {
    super({ key: 'Grade10Scene' })
  }

  preload(): void {
    // Create simple colored shapes for animations
    this.load.image('balloon', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
  }

  create(): void {
    this.add.rectangle(400, 300, 800, 600, 0xffffff)

    this.add.text(400, 50, 'Grade 10 Mathematics', {
      fontSize: '28px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 90, '📐 Master advanced mathematical concepts! 📐', {
      fontSize: '14px',
      color: '#06b6d4',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Updated Grade 10 topics based on requirements
    const topics = [
      'Real Numbers',
      'Polynomials',
      'Pair of Linear Equations in Two Variables',
      'Quadratic Equations',
      'Arithmetic Progressions',
      'Triangles',
      'Coordinate Geometry',
      'Introduction to Trigonometry',
      'Circles',
      'Constructions',
      'Areas Related to Circles',
      'Surface Areas and Volumes',
      'Statistics',
      'Probability'
    ]

    this.createTopicButtons(topics, 0x06b6d4, 0x0891b2)
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

    this.add.text(400, 100, `${topic} - Grade 10`, {
      fontSize: '24px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    const contentArea = this.add.rectangle(400, 300, 600, 300, 0xecfeff)
      .setStrokeStyle(3, 0x06b6d4, 1)

    this.add.text(400, 250, '🔍 Geometric Exploration', {
      fontSize: '20px',
      color: '#0c4a6e',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 290, 'Interactive geometric constructions and proofs', {
      fontSize: '14px',
      color: '#0e7490',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 330, '📏 3D Visualization & Interactive Tools 📏', {
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
    // Update logic for Grade 10 scene
  }
}