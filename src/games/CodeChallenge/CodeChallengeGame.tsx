import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser'

// Code Challenge Main Menu Scene
class CodeChallengeMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CodeChallengeMenuScene' })
  }

  create() {
    // Background with coding theme
    this.add.rectangle(400, 300, 800, 600, 0x1e1b26)

    // Title
    this.add.text(400, 80, '💻 Code Challenge', {
      fontSize: '40px',
      color: '#00d4aa',
      fontFamily: 'Courier New, monospace',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Subtitle
    this.add.text(400, 130, 'Master Programming Through Interactive Challenges!', {
      fontSize: '18px',
      color: '#7c3aed',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Grade selection buttons
    const grades = [
      { grade: '6', topic: 'Basic Concepts', color: 0x8b5cf6 },
      { grade: '7', topic: 'Expressions', color: 0x7c3aed },
      { grade: '8', topic: 'Loops & Logic', color: 0x6d28d9 },
      { grade: '9', topic: 'Code Reading', color: 0x5b21b6 },
      { grade: '10', topic: 'Debugging', color: 0x4c1d95 },
      { grade: '11', topic: 'OOP Concepts', color: 0x3730a3 },
      { grade: '12', topic: 'Functions', color: 0x312e81 }
    ]

    grades.forEach((gradeInfo, index) => {
      const row = Math.floor(index / 3)
      const col = index % 3
      const x = 200 + col * 200
      const y = 220 + row * 120

      const button = this.add.rectangle(x, y, 180, 100, gradeInfo.color)
        .setInteractive()
        .setStrokeStyle(3, 0x1e1b26)

      this.add.text(x, y - 20, `Grade ${gradeInfo.grade}`, {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Courier New, monospace',
        fontStyle: 'bold'
      }).setOrigin(0.5)

      this.add.text(x, y + 15, gradeInfo.topic, {
        fontSize: '14px',
        color: '#e5e7eb',
        fontFamily: 'Arial'
      }).setOrigin(0.5)

      button.on('pointerover', () => {
        button.setFillStyle(0x00d4aa)
        this.tweens.add({ targets: button, scaleX: 1.05, scaleY: 1.05, duration: 200 })
      })

      button.on('pointerout', () => {
        button.setFillStyle(gradeInfo.color)
        this.tweens.add({ targets: button, scaleX: 1, scaleY: 1, duration: 200 })
      })

      button.on('pointerdown', () => {
        this.registry.set('selectedGrade', gradeInfo.grade)
        this.registry.set('selectedTopic', gradeInfo.topic)
        this.scene.start('CodeChallengeGameScene')
      })
    })
  }
}

// Code Challenge Game Scene
class CodeChallengeGameScene extends Phaser.Scene {
  private selectedGrade: string = '6'
  private currentQuestion: any = null
  private questionIndex: number = 0
  private score: number = 0
  private questions: any[] = []

  constructor() {
    super({ key: 'CodeChallengeGameScene' })
  }

  create() {
    this.selectedGrade = this.registry.get('selectedGrade') || '6'
    
    this.add.rectangle(400, 300, 800, 600, 0x111827)
    
    this.add.text(400, 50, `💻 Grade ${this.selectedGrade} Code Challenge`, {
      fontSize: '24px',
      color: '#00d4aa',
      fontFamily: 'Courier New, monospace',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    this.initializeQuestions()
    this.displayQuestion()

    // Back button
    const backButton = this.add.rectangle(80, 50, 100, 40, 0x6b7280)
      .setInteractive()
      .setStrokeStyle(2, 0x374151)

    this.add.text(80, 50, '← Back', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    backButton.on('pointerdown', () => {
      this.scene.start('CodeChallengeMenuScene')
    })
  }

  private initializeQuestions() {
    const questionSets: { [key: string]: any[] } = {
      '6': [
        {
          question: 'What is a variable?',
          options: ['A container for data', 'A type of loop', 'A function', 'An error'],
          correct: 0
        },
        {
          question: 'Which symbol assigns a value?',
          options: ['==', '=', '!=', '++'],
          correct: 1
        }
      ],
      '7': [
        {
          question: 'What is 5 + 3 * 2?',
          options: ['16', '11', '13', '10'],
          correct: 1
        }
      ],
      '8': [
        {
          question: 'Complete: for(int i=0; i<5; i++){ ____ }',
          options: ['i++', 'System.out.println(i)', 'break', 'continue'],
          correct: 1
        }
      ]
    }

    this.questions = questionSets[this.selectedGrade] || questionSets['6']
  }

  private displayQuestion() {
    if (this.questionIndex >= this.questions.length) {
      this.showResults()
      return
    }

    this.children.removeAll()
    this.add.rectangle(400, 300, 800, 600, 0x111827)
    
    const backButton = this.add.rectangle(80, 50, 100, 40, 0x6b7280)
      .setInteractive()
    this.add.text(80, 50, '← Back', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)
    backButton.on('pointerdown', () => this.scene.start('CodeChallengeMenuScene'))

    this.currentQuestion = this.questions[this.questionIndex]

    this.add.text(400, 150, this.currentQuestion.question, {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Courier New, monospace',
      wordWrap: { width: 700 },
      align: 'center'
    }).setOrigin(0.5)

    this.currentQuestion.options.forEach((option: string, index: number) => {
      const y = 250 + index * 60
      const optionButton = this.add.rectangle(400, y, 600, 50, 0x374151)
        .setInteractive()
        .setStrokeStyle(2, 0x7c3aed)

      this.add.text(400, y, `${String.fromCharCode(65 + index)}. ${option}`, {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Courier New, monospace'
      }).setOrigin(0.5)

      optionButton.on('pointerover', () => optionButton.setFillStyle(0x4b5563))
      optionButton.on('pointerout', () => optionButton.setFillStyle(0x374151))
      optionButton.on('pointerdown', () => this.checkAnswer(index))
    })
  }

  private checkAnswer(selectedIndex: number) {
    const isCorrect = selectedIndex === this.currentQuestion.correct

    if (isCorrect) {
      this.score += 10
      this.showCorrectFeedback()
    } else {
      this.showIncorrectFeedback()
    }

    this.time.delayedCall(2000, () => {
      this.questionIndex++
      this.displayQuestion()
    })
  }

  private showCorrectFeedback() {
    this.add.text(400, 520, '✓ Correct! Great coding!', {
      fontSize: '24px',
      color: '#00d4aa',
      fontFamily: 'Courier New, monospace',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Confetti animation
    for (let i = 0; i < 8; i++) {
      const confetti = this.add.text(
        Phaser.Math.Between(200, 600),
        100,
        '🎉',
        { fontSize: '24px' }
      )

      this.tweens.add({
        targets: confetti,
        y: 500,
        x: confetti.x + Phaser.Math.Between(-100, 100),
        rotation: Math.PI * 2,
        duration: 1500,
        ease: 'Power2',
        onComplete: () => confetti.destroy()
      })
    }
  }

  private showIncorrectFeedback() {
    const errorText = this.add.text(400, 520, '✗ Try Again!', {
      fontSize: '24px',
      color: '#ef4444',
      fontFamily: 'Courier New, monospace',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    this.tweens.add({
      targets: errorText,
      x: errorText.x + 10,
      duration: 100,
      yoyo: true,
      repeat: 3
    })
  }

  private showResults() {
    this.children.removeAll()
    this.add.rectangle(400, 300, 800, 600, 0x111827)

    const percentage = Math.round((this.score / (this.questions.length * 10)) * 100)

    this.add.text(400, 200, '🏆 Challenge Complete!', {
      fontSize: '32px',
      color: '#00d4aa',
      fontFamily: 'Courier New, monospace',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    this.add.text(400, 270, `Score: ${this.score}/${this.questions.length * 10} (${percentage}%)`, {
      fontSize: '24px',
      color: '#7c3aed',
      fontFamily: 'Courier New, monospace'
    }).setOrigin(0.5)

    const menuButton = this.add.rectangle(400, 400, 200, 50, 0x8b5cf6)
      .setInteractive()

    this.add.text(400, 400, 'Back to Menu', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    menuButton.on('pointerdown', () => this.scene.start('CodeChallengeMenuScene'))
  }
}

const CodeChallengeGame: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && !gameRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: containerRef.current,
        backgroundColor: '#111827',
        scene: [CodeChallengeMenuScene, CodeChallengeGameScene]
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
            💻 Interactive Code Challenge
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Master programming concepts through fun, interactive challenges!
          </p>
        </div>
        
        <div 
          ref={containerRef} 
          className="border-4 border-purple-200 dark:border-purple-700 rounded-lg overflow-hidden shadow-lg"
          style={{ width: '800px', height: '600px', margin: '0 auto' }}
        />
        
        <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          ⌨️ Click to select answers • Interactive coding challenges • Learn by doing
        </div>
      </div>
    </div>
  )
}

export default CodeChallengeGame