import Phaser from 'phaser'

export class Grade7Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'Grade7Scene' })
  }

  preload(): void {
    // Preload any assets needed
  }

  create(): void {
    // Background
    this.add.rectangle(400, 300, 800, 600, 0xffffff)

    // Title
    this.add.text(400, 50, 'Grade 7 Mathematics', {
      fontSize: '28px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Motivational text
    this.add.text(400, 90, '🚀 Explore advanced concepts with interactive challenges! 🚀', {
      fontSize: '14px',
      color: '#7c3aed',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Grade 7 Math Topics
    const topics = [
      'Linear Equations',
      'Inequalities',
      'Geometry & Angles',
      'Surface Area & Volume',
      'Statistics & Probability',
      'Rational Numbers',
      'Proportional Relationships',
      'Scale & Similar Figures'
    ]

    this.createTopicButtons(topics)
    this.createBackButton()
  }

  createTopicButtons(topics: string[]): void {
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

      const button = this.add.rectangle(x, y, buttonWidth, buttonHeight, 0xf59e0b)
        .setInteractive()
        .setStrokeStyle(2, 0xd97706)

      this.add.text(x, y, topic, {
        fontSize: '12px',
        color: '#ffffff',
        fontFamily: 'Arial'
      }).setOrigin(0.5)

      button.on('pointerover', () => {
        button.setFillStyle(0xd97706)
        this.tweens.add({ targets: button, scaleX: 1.05, scaleY: 1.05, duration: 150 })
      })

      button.on('pointerout', () => {
        button.setFillStyle(0xf59e0b)
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

    this.add.text(400, 100, `${topic} - Grade 7`, {
      fontSize: '24px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    const contentArea = this.add.rectangle(400, 300, 600, 300, 0xfef3c7)
      .setStrokeStyle(3, 0xf59e0b, 1)

    this.add.text(400, 250, '🎯 Interactive Learning Zone', {
      fontSize: '20px',
      color: '#92400e',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 290, 'Advanced exercises and visual learning tools', {
      fontSize: '14px',
      color: '#a16207',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 330, '🏆 Achievement Animations & Rewards 🏆', {
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

    this.tweens.add({
      targets: contentArea,
      scaleX: 1.02,
      scaleY: 1.02,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })
  }

  update(): void {
    // Update logic for Grade 7 scene
  }
}