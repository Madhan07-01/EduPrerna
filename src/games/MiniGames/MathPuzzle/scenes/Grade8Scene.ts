import Phaser from 'phaser'

export class Grade8Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'Grade8Scene' })
  }

  preload(): void {
    // Preload any assets needed
  }

  create(): void {
    this.add.rectangle(400, 300, 800, 600, 0xffffff)

    this.add.text(400, 50, 'Grade 8 Mathematics', {
      fontSize: '28px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 90, '🔥 Challenge yourself with complex problem solving! 🔥', {
      fontSize: '14px',
      color: '#7c3aed',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    const topics = [
      'Functions & Relations',
      'Systems of Equations',
      'Pythagorean Theorem',
      'Transformations',
      'Scientific Notation',
      'Exponents & Roots',
      'Slope & Linear Functions',
      'Congruence & Similarity'
    ]

    this.createTopicButtons(topics, 0xef4444, 0xdc2626)
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

    this.add.text(400, 100, `${topic} - Grade 8`, {
      fontSize: '24px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    const contentArea = this.add.rectangle(400, 300, 600, 300, 0xfef2f2)
      .setStrokeStyle(3, 0xef4444, 1)

    this.add.text(400, 250, '⚡ Advanced Problem Solving', {
      fontSize: '20px',
      color: '#991b1b',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 290, 'Interactive simulations and real-world applications', {
      fontSize: '14px',
      color: '#b91c1c',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.text(400, 330, '🎨 Dynamic Visualizations & Effects 🎨', {
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
    // Update logic for Grade 8 scene
  }
}