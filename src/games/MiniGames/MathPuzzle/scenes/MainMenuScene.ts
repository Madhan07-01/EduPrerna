import Phaser from 'phaser'

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' })
  }

  preload(): void {
    // Create simple colored rectangles for buttons
    this.load.image('button', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
  }

  create(): void {
    // Background
    this.add.rectangle(400, 300, 800, 600, 0xffffff)

    // Title
    this.add.text(400, 100, 'Math Puzzle Mini-Games', {
      fontSize: '32px',
      color: '#1f2937',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Subtitle
    this.add.text(400, 150, 'Choose your grade level to start learning!', {
      fontSize: '18px',
      color: '#6b7280',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Motivational text
    this.add.text(400, 200, '🌟 Solve puzzles to unlock fun animations and rewards! 🌟', {
      fontSize: '16px',
      color: '#7c3aed',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Grade buttons in a grid layout
    const grades = [6, 7, 8, 9, 10, 11, 12]
    const buttonWidth = 100
    const buttonHeight = 50
    const spacing = 20
    const startX = 400 - (((grades.length * buttonWidth) + ((grades.length - 1) * spacing)) / 2) + (buttonWidth / 2)

    grades.forEach((grade, index) => {
      const x = startX + (index * (buttonWidth + spacing))
      const y = 350

      // Button background
      const button = this.add.rectangle(x, y, buttonWidth, buttonHeight, 0x3b82f6)
        .setInteractive()
        .setStrokeStyle(2, 0x1e40af)

      // Button text
      const buttonText = this.add.text(x, y, `Grade ${grade}`, {
        fontSize: '14px',
        color: '#ffffff',
        fontFamily: 'Arial'
      }).setOrigin(0.5)

      // Button hover effects
      button.on('pointerover', () => {
        button.setFillStyle(0x2563eb)
        this.tweens.add({
          targets: button,
          scaleX: 1.1,
          scaleY: 1.1,
          duration: 200,
          ease: 'Power2'
        })
      })

      button.on('pointerout', () => {
        button.setFillStyle(0x3b82f6)
        this.tweens.add({
          targets: button,
          scaleX: 1,
          scaleY: 1,
          duration: 200,
          ease: 'Power2'
        })
      })

      button.on('pointerdown', () => {
        this.scene.start(`Grade${grade}Scene`)
      })
    })

    // Instructions
    this.add.text(400, 450, 'Click on any grade to explore math topics!', {
      fontSize: '16px',
      color: '#374151',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Back button placeholder for future navigation
    const backButton = this.add.rectangle(100, 550, 120, 40, 0x6b7280)
      .setInteractive()
      .setStrokeStyle(2, 0x4b5563)

    this.add.text(100, 550, 'Main Menu', {
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
  }

  update(): void {
    // Update logic can be added here if needed
  }
}