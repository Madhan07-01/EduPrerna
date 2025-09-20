import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser'

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
    const grades = ['6', '7', '8']
    grades.forEach((grade, index) => {
      const x = 250 + (index * 150)
      const y = 250

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
        this.scene.start('GameScene')
      })
    })

    // Instructions
    this.add.text(400, 400, '🎨 Features:\n• Interactive math problems\n• Keyboard input support\n• Fun animations for correct answers\n• Instant feedback', {
      fontSize: '16px',
      color: '#64748b',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0.5)
  }
}

// Game Scene - The actual math puzzle game
class GameScene extends Phaser.Scene {
  private currentQuestion: { question: string; answer: number } | null = null
  private userInput: string = ''
  private inputText: Phaser.GameObjects.Text | null = null
  private questionText: Phaser.GameObjects.Text | null = null
  private feedbackText: Phaser.GameObjects.Text | null = null
  private selectedGrade: string = '6'

  constructor() {
    super({ key: 'GameScene' })
  }

  create() {
    // Get selected grade from registry
    this.selectedGrade = this.registry.get('selectedGrade') || '6'
    
    // Background
    this.add.rectangle(400, 300, 800, 600, 0xfef3c7)

    // Title
    this.add.text(400, 80, `🧮 Grade ${this.selectedGrade} Math Puzzle`, {
      fontSize: '28px',
      color: '#92400e',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Question display area
    this.add.rectangle(400, 200, 400, 100, 0xffffff)
      .setStrokeStyle(3, 0xd97706)

    this.questionText = this.add.text(400, 200, '', {
      fontSize: '32px',
      color: '#1f2937',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Input area
    this.add.text(400, 320, 'Your Answer:', {
      fontSize: '20px',
      color: '#374151',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    this.add.rectangle(400, 370, 200, 50, 0xffffff)
      .setStrokeStyle(3, 0x3b82f6)

    this.inputText = this.add.text(400, 370, '', {
      fontSize: '24px',
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
      this.scene.start('MainMenuScene')
    })

    // New Question button
    const newQuestionButton = this.add.rectangle(700, 550, 150, 40, 0x10b981)
      .setInteractive()
      .setStrokeStyle(2, 0x059669)

    this.add.text(700, 550, 'New Question', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    newQuestionButton.on('pointerover', () => newQuestionButton.setFillStyle(0x059669))
    newQuestionButton.on('pointerout', () => newQuestionButton.setFillStyle(0x10b981))
    newQuestionButton.on('pointerdown', () => {
      this.generateNewQuestion()
      this.clearInput()
    })

    // Enable keyboard input
    this.input.keyboard?.on('keydown', this.handleKeyPress, this)

    // Generate first question
    this.generateNewQuestion()
  }

  private generateNewQuestion() {
    const grade = parseInt(this.selectedGrade)
    let num1: number, num2: number, operation: string, answer: number

    // Generate questions based on grade level
    switch (grade) {
      case 6:
        num1 = Phaser.Math.Between(1, 20)
        num2 = Phaser.Math.Between(1, 20)
        operation = Phaser.Math.Between(0, 1) === 0 ? '+' : '-'
        if (operation === '-' && num1 < num2) [num1, num2] = [num2, num1] // Avoid negative results
        answer = operation === '+' ? num1 + num2 : num1 - num2
        break
      case 7:
        num1 = Phaser.Math.Between(1, 50)
        num2 = Phaser.Math.Between(1, 50)
        const ops = ['+', '-', '*']
        operation = ops[Phaser.Math.Between(0, 2)]
        if (operation === '*') {
          num1 = Phaser.Math.Between(1, 12)
          num2 = Phaser.Math.Between(1, 12)
        }
        if (operation === '-' && num1 < num2) [num1, num2] = [num2, num1]
        answer = operation === '+' ? num1 + num2 : operation === '-' ? num1 - num2 : num1 * num2
        break
      case 8:
      default:
        num1 = Phaser.Math.Between(1, 100)
        num2 = Phaser.Math.Between(1, 100)
        const allOps = ['+', '-', '*']
        operation = allOps[Phaser.Math.Between(0, 2)]
        if (operation === '*') {
          num1 = Phaser.Math.Between(1, 15)
          num2 = Phaser.Math.Between(1, 15)
        }
        if (operation === '-' && num1 < num2) [num1, num2] = [num2, num1]
        answer = operation === '+' ? num1 + num2 : operation === '-' ? num1 - num2 : num1 * num2
        break
    }

    this.currentQuestion = {
      question: `${num1} ${operation} ${num2} = ?`,
      answer: answer
    }

    if (this.questionText) {
      this.questionText.setText(this.currentQuestion.question)
    }
  }

  private handleKeyPress(event: KeyboardEvent) {
    if (event.key >= '0' && event.key <= '9') {
      // Add number to input
      this.userInput += event.key
      this.updateInputDisplay()
    } else if (event.key === 'Backspace') {
      // Remove last character
      this.userInput = this.userInput.slice(0, -1)
      this.updateInputDisplay()
    } else if (event.key === 'Enter') {
      // Check answer
      this.checkAnswer()
    }
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

    const userAnswer = parseInt(this.userInput)
    const isCorrect = userAnswer === this.currentQuestion.answer

    if (isCorrect) {
      this.showCorrectFeedback()
      this.playSuccessAnimation()
    } else {
      this.showIncorrectFeedback()
    }
  }

  private showCorrectFeedback() {
    if (this.feedbackText) {
      this.feedbackText.setText('✓ Correct! Well done!')
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
    if (this.feedbackText) {
      this.feedbackText.setText('✗ Try Again!')
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
        scene: [MainMenuScene, GameScene],
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