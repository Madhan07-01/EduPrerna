import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser'

// Biology Lab Main Menu Scene
class BiologyLabMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BiologyLabMenuScene' })
  }

  create() {
    // Background with lab-like gradient
    this.add.rectangle(400, 300, 800, 600, 0xe8f5e8)

    // Title
    this.add.text(400, 80, '🔬 Biology Lab', {
      fontSize: '40px',
      color: '#15803d',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Subtitle
    this.add.text(400, 130, 'Explore Life Sciences Through Interactive Experiments!', {
      fontSize: '18px',
      color: '#166534',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Grade selection buttons
    const grades = [
      { grade: '6', topic: 'Plant Cells', color: 0x22c55e },
      { grade: '7', topic: 'Animal Classification', color: 0x16a34a },
      { grade: '8', topic: 'Human Body Systems', color: 0x15803d },
      { grade: '9', topic: 'Digestive System', color: 0x14532d },
      { grade: '10', topic: 'Photosynthesis', color: 0x052e16 },
      { grade: '11', topic: 'DNA Structure', color: 0x166534 },
      { grade: '12', topic: 'Cell Division', color: 0x15803d }
    ]

    // Create grade buttons in a grid
    grades.forEach((gradeInfo, index) => {
      const row = Math.floor(index / 3)
      const col = index % 3
      const x = 200 + col * 200
      const y = 220 + row * 120

      // Button container
      const button = this.add.rectangle(x, y, 180, 100, gradeInfo.color)
        .setInteractive()
        .setStrokeStyle(3, 0x14532d)

      // Grade text
      this.add.text(x, y - 20, `Grade ${gradeInfo.grade}`, {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      }).setOrigin(0.5)

      // Topic text
      this.add.text(x, y + 15, gradeInfo.topic, {
        fontSize: '14px',
        color: '#f0fdf4',
        fontFamily: 'Arial'
      }).setOrigin(0.5)

      // Button interactions
      button.on('pointerover', () => {
        button.setFillStyle(0x166534)
        this.tweens.add({ targets: button, scaleX: 1.05, scaleY: 1.05, duration: 200 })
      })

      button.on('pointerout', () => {
        button.setFillStyle(gradeInfo.color)
        this.tweens.add({ targets: button, scaleX: 1, scaleY: 1, duration: 200 })
      })

      button.on('pointerdown', () => {
        this.registry.set('selectedGrade', gradeInfo.grade)
        this.registry.set('selectedTopic', gradeInfo.topic)
        this.scene.start('BiologyLabGameScene')
      })
    })

    // Instructions
    this.add.text(400, 520, '🧪 Click on a grade to start your biology experiment!', {
      fontSize: '16px',
      color: '#374151',
      fontFamily: 'Arial'
    }).setOrigin(0.5)
  }
}

// Biology Lab Game Scene
class BiologyLabGameScene extends Phaser.Scene {
  private selectedGrade: string = '6'
  private selectedTopic: string = 'Plant Cells'
  private currentQuestion: any = null
  private questionIndex: number = 0
  private score: number = 0
  private questions: any[] = []

  constructor() {
    super({ key: 'BiologyLabGameScene' })
  }

  create() {
    this.selectedGrade = this.registry.get('selectedGrade') || '6'
    this.selectedTopic = this.registry.get('selectedTopic') || 'Plant Cells'

    // Background
    this.add.rectangle(400, 300, 800, 600, 0xf0fdf4)

    // Header
    this.add.text(400, 50, `🔬 Grade ${this.selectedGrade} - ${this.selectedTopic}`, {
      fontSize: '24px',
      color: '#15803d',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Initialize questions based on grade
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

    backButton.on('pointerover', () => backButton.setFillStyle(0x374151))
    backButton.on('pointerout', () => backButton.setFillStyle(0x6b7280))
    backButton.on('pointerdown', () => {
      this.scene.start('BiologyLabMenuScene')
    })

    // Score display
    this.add.text(720, 50, `Score: ${this.score}`, {
      fontSize: '18px',
      color: '#15803d',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)
  }

  private initializeQuestions() {
    const questionSets: { [key: string]: any[] } = {
      '6': [
        {
          question: 'Which part controls what enters and leaves the plant cell?',
          options: ['Cell Wall', 'Cell Membrane', 'Nucleus', 'Cytoplasm'],
          correct: 1,
          explanation: 'The cell membrane controls what substances can enter or leave the cell.'
        },
        {
          question: 'What gives plant cells their rigid structure?',
          options: ['Cytoplasm', 'Nucleus', 'Cell Wall', 'Vacuole'],
          correct: 2,
          explanation: 'The cell wall provides structural support and protection to plant cells.'
        }
      ],
      '7': [
        {
          question: 'Which of these animals is a vertebrate?',
          options: ['Jellyfish', 'Spider', 'Fish', 'Octopus'],
          correct: 2,
          explanation: 'Fish have a backbone (vertebral column), making them vertebrates.'
        },
        {
          question: 'Insects belong to which group?',
          options: ['Vertebrates', 'Invertebrates', 'Mammals', 'Reptiles'],
          correct: 1,
          explanation: 'Insects do not have a backbone, so they are invertebrates.'
        }
      ],
      '8': [
        {
          question: 'What is the main function of the heart?',
          options: ['Digest food', 'Pump blood', 'Filter air', 'Store nutrients'],
          correct: 1,
          explanation: 'The heart pumps blood throughout the body, delivering oxygen and nutrients.'
        },
        {
          question: 'Which organ is responsible for filtering blood?',
          options: ['Liver', 'Lungs', 'Kidneys', 'Stomach'],
          correct: 2,
          explanation: 'The kidneys filter waste products from the blood to form urine.'
        }
      ],
      '9': [
        {
          question: 'Where does most nutrient absorption occur?',
          options: ['Stomach', 'Large intestine', 'Small intestine', 'Esophagus'],
          correct: 2,
          explanation: 'The small intestine is where most nutrients are absorbed into the bloodstream.'
        },
        {
          question: 'What enzyme breaks down starch in the mouth?',
          options: ['Pepsin', 'Amylase', 'Lipase', 'Trypsin'],
          correct: 1,
          explanation: 'Amylase in saliva begins breaking down starch into simpler sugars.'
        }
      ],
      '10': [
        {
          question: 'What gas do plants absorb for photosynthesis?',
          options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
          correct: 2,
          explanation: 'Plants absorb carbon dioxide from the air to use in photosynthesis.'
        },
        {
          question: 'Where in the plant cell does photosynthesis occur?',
          options: ['Nucleus', 'Chloroplasts', 'Mitochondria', 'Vacuole'],
          correct: 1,
          explanation: 'Chloroplasts contain chlorophyll and are the sites of photosynthesis.'
        }
      ],
      '11': [
        {
          question: 'DNA is made up of which basic units?',
          options: ['Amino acids', 'Nucleotides', 'Fatty acids', 'Glucose'],
          correct: 1,
          explanation: 'DNA is composed of nucleotides, each containing a base, sugar, and phosphate.'
        },
        {
          question: 'How many strands make up the DNA double helix?',
          options: ['1', '2', '3', '4'],
          correct: 1,
          explanation: 'DNA has a double helix structure with two complementary strands.'
        }
      ],
      '12': [
        {
          question: 'During which phase of meiosis do homologous chromosomes pair up?',
          options: ['Prophase I', 'Metaphase I', 'Anaphase I', 'Telophase I'],
          correct: 0,
          explanation: 'During Prophase I, homologous chromosomes pair up in a process called synapsis.'
        },
        {
          question: 'How many daughter cells result from meiosis?',
          options: ['2', '4', '6', '8'],
          correct: 1,
          explanation: 'Meiosis produces four haploid daughter cells from one diploid parent cell.'
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

    // Clear previous question
    this.children.removeAll()
    
    // Recreate header and back button
    this.add.rectangle(400, 300, 800, 600, 0xf0fdf4)
    
    this.add.text(400, 50, `🔬 Grade ${this.selectedGrade} - ${this.selectedTopic}`, {
      fontSize: '24px',
      color: '#15803d',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    const backButton = this.add.rectangle(80, 50, 100, 40, 0x6b7280)
      .setInteractive()
      .setStrokeStyle(2, 0x374151)

    this.add.text(80, 50, '← Back', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    backButton.on('pointerover', () => backButton.setFillStyle(0x374151))
    backButton.on('pointerout', () => backButton.setFillStyle(0x6b7280))
    backButton.on('pointerdown', () => {
      this.scene.start('BiologyLabMenuScene')
    })

    this.add.text(720, 50, `Score: ${this.score}`, {
      fontSize: '18px',
      color: '#15803d',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    this.currentQuestion = this.questions[this.questionIndex]

    // Question number
    this.add.text(400, 120, `Question ${this.questionIndex + 1} of ${this.questions.length}`, {
      fontSize: '16px',
      color: '#6b7280',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Question text
    this.add.text(400, 180, this.currentQuestion.question, {
      fontSize: '20px',
      color: '#1f2937',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      wordWrap: { width: 700 },
      align: 'center'
    }).setOrigin(0.5)

    // Answer options
    this.currentQuestion.options.forEach((option: string, index: number) => {
      const y = 280 + index * 60
      const optionButton = this.add.rectangle(400, y, 600, 50, 0xffffff)
        .setInteractive()
        .setStrokeStyle(2, 0x22c55e)

      this.add.text(400, y, `${String.fromCharCode(65 + index)}. ${option}`, {
        fontSize: '16px',
        color: '#1f2937',
        fontFamily: 'Arial'
      }).setOrigin(0.5)

      optionButton.on('pointerover', () => {
        optionButton.setFillStyle(0xf0fdf4)
      })

      optionButton.on('pointerout', () => {
        optionButton.setFillStyle(0xffffff)
      })

      optionButton.on('pointerdown', () => {
        this.checkAnswer(index)
      })
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

    // Move to next question after delay
    this.time.delayedCall(2500, () => {
      this.questionIndex++
      this.displayQuestion()
    })
  }

  private showCorrectFeedback() {
    // Success message
    const successText = this.add.text(400, 520, '✓ Correct! Well done!', {
      fontSize: '24px',
      color: '#15803d',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Explanation
    this.add.text(400, 550, this.currentQuestion.explanation, {
      fontSize: '14px',
      color: '#374151',
      fontFamily: 'Arial',
      wordWrap: { width: 600 },
      align: 'center'
    }).setOrigin(0.5)

    // Bubble animation
    for (let i = 0; i < 8; i++) {
      const bubble = this.add.circle(
        Phaser.Math.Between(100, 700),
        600,
        Phaser.Math.Between(10, 20),
        0x22c55e,
        0.7
      )

      this.tweens.add({
        targets: bubble,
        y: -50,
        x: bubble.x + Phaser.Math.Between(-50, 50),
        alpha: 0,
        duration: Phaser.Math.Between(1500, 2500),
        ease: 'Power2',
        onComplete: () => bubble.destroy()
      })
    }

    // Particle effect
    for (let i = 0; i < 12; i++) {
      const particle = this.add.text(
        400 + Phaser.Math.Between(-50, 50),
        300 + Phaser.Math.Between(-50, 50),
        '✨',
        { fontSize: '20px' }
      )

      this.tweens.add({
        targets: particle,
        x: particle.x + Phaser.Math.Between(-100, 100),
        y: particle.y + Phaser.Math.Between(-100, 100),
        alpha: 0,
        scaleX: 0,
        scaleY: 0,
        duration: 1000,
        ease: 'Power2',
        onComplete: () => particle.destroy()
      })
    }
  }

  private showIncorrectFeedback() {
    const errorText = this.add.text(400, 520, '✗ Try Again!', {
      fontSize: '24px',
      color: '#dc2626',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Explanation
    this.add.text(400, 550, this.currentQuestion.explanation, {
      fontSize: '14px',
      color: '#374151',
      fontFamily: 'Arial',
      wordWrap: { width: 600 },
      align: 'center'
    }).setOrigin(0.5)

    // Shake animation
    this.tweens.add({
      targets: errorText,
      x: errorText.x + 10,
      duration: 100,
      yoyo: true,
      repeat: 3,
      ease: 'Power2'
    })
  }

  private showResults() {
    this.children.removeAll()
    this.add.rectangle(400, 300, 800, 600, 0xf0fdf4)

    const percentage = Math.round((this.score / (this.questions.length * 10)) * 100)

    this.add.text(400, 200, '🏆 Lab Experiment Complete!', {
      fontSize: '32px',
      color: '#15803d',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    this.add.text(400, 270, `Final Score: ${this.score}/${this.questions.length * 10} (${percentage}%)`, {
      fontSize: '24px',
      color: '#166534',
      fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Performance message
    let message = ''
    if (percentage >= 90) message = '🌟 Excellent work! You\'re a biology expert!'
    else if (percentage >= 70) message = '🎉 Great job! Keep exploring biology!'
    else if (percentage >= 50) message = '👍 Good effort! Study more and try again!'
    else message = '💪 Keep learning! Biology is fascinating!'

    this.add.text(400, 330, message, {
      fontSize: '18px',
      color: '#374151',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0.5)

    // Return to menu button
    const menuButton = this.add.rectangle(400, 450, 200, 50, 0x22c55e)
      .setInteractive()
      .setStrokeStyle(2, 0x16a34a)

    this.add.text(400, 450, 'Return to Lab Menu', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    menuButton.on('pointerdown', () => {
      this.scene.start('BiologyLabMenuScene')
    })
  }
}

const BiologyLabGame: React.FC = () => {
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
        scene: [BiologyLabMenuScene, BiologyLabGameScene],
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
          }
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
            🔬 Interactive Biology Lab
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore life sciences through hands-on experiments and interactive learning!
          </p>
        </div>
        
        <div 
          ref={containerRef} 
          className="border-4 border-green-200 dark:border-green-700 rounded-lg overflow-hidden shadow-lg"
          style={{ width: '800px', height: '600px', margin: '0 auto' }}
        />
        
        <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          🧪 Click to select answers • Interactive biology experiments • Fun learning experience
        </div>
      </div>
    </div>
  )
}

export default BiologyLabGame