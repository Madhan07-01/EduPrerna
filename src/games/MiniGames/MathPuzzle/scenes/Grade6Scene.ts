import Phaser from 'phaser'

export class Grade6Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'Grade6Scene' })
  }

  preload(): void {
    // Preload any assets needed
  }

  create(): void {
    // Background
    this.add.rectangle(400, 300, 800, 600, 0xffffff)

    // Title
    this.add.text(400, 50, 'Grade 6 Mathematics', {
      fontSize: '28px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Motivational text
    this.add.text(400, 90, '🎯 Master these topics to unlock amazing animations! 🎯', {
      fontSize: '14px',
      color: '#7c3aed',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Grade 6 Math Topics
    const topics = [
      'Fractions & Decimals',
      'Ratios & Proportions',
      'Integers',
      'Basic Geometry',
      'Data & Statistics',
      'Algebraic Expressions',
      'Measurement',
      'Probability'
    ]

    const buttonWidth = 180
    const buttonHeight = 50
    const cols = 2
    const rows = Math.ceil(topics.length / cols)
    const startX = 400 - ((cols * buttonWidth + (cols - 1) * 20) / 2) + (buttonWidth / 2)
    const startY = 150

    topics.forEach((topic, index) => {
      const col = index % cols
      const row = Math.floor(index / cols)
      const x = startX + (col * (buttonWidth + 20))
      const y = startY + (row * (buttonHeight + 15))

      // Topic button
      const button = this.add.rectangle(x, y, buttonWidth, buttonHeight, 0x10b981)
        .setInteractive()
        .setStrokeStyle(2, 0x059669)

      // Button text
      const buttonText = this.add.text(x, y, topic, {
        fontSize: '12px',
        color: '#ffffff',
        fontFamily: 'Arial'
      }).setOrigin(0.5)

      // Button interactions
      button.on('pointerover', () => {
        button.setFillStyle(0x059669)
        this.tweens.add({
          targets: [button, buttonText],
          scaleX: 1.05,
          scaleY: 1.05,
          duration: 150,
          ease: 'Power2'
        })
      })

      button.on('pointerout', () => {
        button.setFillStyle(0x10b981)
        this.tweens.add({
          targets: [button, buttonText],
          scaleX: 1,
          scaleY: 1,
          duration: 150,
          ease: 'Power2'
        })
      })

      button.on('pointerdown', () => {
        this.showTopicPlaceholder(topic)
      })
    })

    // Back button
    const backButton = this.add.rectangle(100, 550, 120, 40, 0x6b7280)
      .setInteractive()
      .setStrokeStyle(2, 0x4b5563)

    this.add.text(100, 550, 'Back to Menu', {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    backButton.on('pointerover', () => {
      backButton.setFillStyle(0x4b5563)
    })

    backButton.on('pointerout', () => {
      backButton.setFillStyle(0x6b7280)
    })

    backButton.on('pointerdown', () => {
      this.scene.start('MainMenuScene')
    })
  }

  showTopicPlaceholder(topic: string): void {
    // Clear existing content
    this.children.removeAll()

    // Background
    this.add.rectangle(400, 300, 800, 600, 0xffffff)

    // Topic title
    this.add.text(400, 100, `${topic} - Grade 6`, {
      fontSize: '24px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Placeholder content area
    const contentArea = this.add.rectangle(400, 300, 600, 300, 0xf3f4f6)
      .setStrokeStyle(3, 0xd1d5db, 1)

    // Placeholder text
    this.add.text(400, 250, '🎮 Mini-Game Content Area', {
      fontSize: '20px',
      color: '#6b7280',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 290, 'Interactive lessons and exercises will appear here', {
      fontSize: '14px',
      color: '#9ca3af',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Animation placeholder areas
    this.add.text(400, 330, '🎈 Space for Balloons & Confetti Animations 🎊', {
      fontSize: '12px',
      color: '#7c3aed',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 350, '⭐ Reward System & Progress Tracking ⭐', {
      fontSize: '12px',
      color: '#f59e0b',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Back button
    const backButton = this.add.rectangle(400, 500, 150, 40, 0x3b82f6)
      .setInteractive()
      .setStrokeStyle(2, 0x1e40af)

    this.add.text(400, 500, 'Back to Topics', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    backButton.on('pointerover', () => {
      backButton.setFillStyle(0x2563eb)
    })

    backButton.on('pointerout', () => {
      backButton.setFillStyle(0x3b82f6)
    })

    backButton.on('pointerdown', () => {
      this.scene.restart()
    })

    // Sample animation effect
    this.tweens.add({
      targets: contentArea,
      alpha: 0.8,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })
  }

  update(): void {
    // Update logic for Grade 6 scene
  }
}