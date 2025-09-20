import Phaser from 'phaser'

// Physics Quiz Data Types (imported from main file)
type PhysicsQuestion = {
  id: string
  question: string
  type: 'multiple-choice' | 'input'
  options?: string[]
  correctAnswer: string | number
  explanation: string
}

// Import quiz data (this will be passed from the main component)
declare const PHYSICS_QUIZ_DATA: Array<{
  grade: number
  topics: string[]
  questions: PhysicsQuestion[]
}>

// Physics Quiz Main Menu Scene
export class PhysicsQuizMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PhysicsQuizMenuScene' })
  }

  create() {
    const { width, height } = this.scale
    
    // Background
    this.add.rectangle(width/2, height/2, width, height, 0x1e3a8a)
    
    // Title
    this.add.text(width/2, 40, '⚡ Physics Quiz', {
      fontSize: '24px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, 65, 'Select Your Grade (6-12)', {
      fontSize: '14px', color: '#dbeafe', fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Grade selection cards
    const grades = [6, 7, 8, 9, 10, 11, 12]
    
    grades.forEach((grade, index) => {
      const col = index % 4
      const row = Math.floor(index / 4)
      const x = 70 + col * 90
      const y = 120 + row * 90
      
      // Grade card
      const card = this.add.rectangle(x, y, 80, 80, 0x3b82f6)
        .setInteractive()
        .setStrokeStyle(2, 0x60a5fa)
      
      // Enhanced hover effects
      card.on('pointerover', () => {
        card.setFillStyle(0x60a5fa)
        this.input.setDefaultCursor('pointer')
        this.tweens.add({
          targets: card,
          scaleX: 1.1,
          scaleY: 1.1,
          duration: 200,
          ease: 'Power2.easeOut'
        })
      })
      
      card.on('pointerout', () => {
        card.setFillStyle(0x3b82f6)
        this.input.setDefaultCursor('default')
        this.tweens.add({
          targets: card,
          scaleX: 1,
          scaleY: 1,
          duration: 200,
          ease: 'Power2.easeOut'
        })
      })
      
      // Grade text
      this.add.text(x, y - 15, `Grade ${grade}`, {
        fontSize: '16px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5)
      
      // Question count
      this.add.text(x, y + 5, '3 Questions', {
        fontSize: '10px', color: '#dbeafe', fontFamily: 'Arial'
      }).setOrigin(0.5)
      
      this.add.text(x, y + 15, 'Start', {
        fontSize: '10px', color: '#dbeafe', fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5)
      
      card.on('pointerdown', () => {
        this.registry.set('selectedGrade', grade)
        this.scene.start('PhysicsQuizGameScene')
      })
    })
  }
}

// Physics Quiz Game Scene
export class PhysicsQuizGameScene extends Phaser.Scene {
  private currentQuestionIndex: number = 0
  private score: number = 0
  private timer: number = 30
  private userInput: string = ''
  private selectedOption: number = -1
  private isAnswered: boolean = false
  private questions: PhysicsQuestion[] = []
  private timerEvent: Phaser.Time.TimerEvent | null = null
  private timerText: Phaser.GameObjects.Text | null = null
  private inputText: Phaser.GameObjects.Text | null = null
  private scoreText: Phaser.GameObjects.Text | null = null
  private currentGrade: number = 0
  private optionButtons: Phaser.GameObjects.Rectangle[] = []
  private optionTexts: Phaser.GameObjects.Text[] = []
  private questionContainer: Phaser.GameObjects.Container | null = null
  private feedbackText: Phaser.GameObjects.Text | null = null
  private resultContainer: Phaser.GameObjects.Container | null = null

  constructor() {
    super({ key: 'PhysicsQuizGameScene' })
  }

  preload() {
    // Create simple audio tones for physics quiz
    this.load.audio('physicsCorrect', ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
    this.load.audio('physicsIncorrect', ['data:audio/wav;base64,UklGRkIEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YR4EAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
  }

  create() {
    const { width, height } = this.scale
    this.currentGrade = this.registry.get('selectedGrade') as number
    
    // Get quiz data from registry (passed from React component)
    const allQuizData = this.registry.get('physicsQuizData') as typeof PHYSICS_QUIZ_DATA
    const gradeData = allQuizData?.find(g => g.grade === this.currentGrade)
    
    if (!gradeData) {
      this.scene.start('PhysicsQuizMenuScene')
      return
    }
    
    this.questions = gradeData.questions
    
    // Complete state reset
    this.currentQuestionIndex = 0
    this.timer = 30
    this.isAnswered = false
    this.userInput = ''
    this.selectedOption = -1
    this.score = 0
    
    // Ensure complete scene isolation
    this.children.removeAll()
    
    this.add.rectangle(width/2, height/2, width, height, 0xeaf6ff)
    
    // Back button
    const backButton = this.add.rectangle(50, 30, 80, 30, 0x6b7280).setInteractive()
    this.add.text(50, 30, '← Back', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5)
    backButton.on('pointerdown', () => {
      this.cleanup()
      this.scene.start('PhysicsQuizMenuScene')
    })
    
    // Header
    this.add.text(width/2, 40, `⚡ Physics Quiz - Grade ${this.currentGrade}`, {
      fontSize: '18px', color: '#1e40af', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    // Progress indicator
    this.scoreText = this.add.text(width - 80, 40, `Score: ${this.score}/${this.questions.length}`, {
      fontSize: '16px', color: '#1e40af', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.timerText = this.add.text(width/2, 70, `Time: ${this.timer}s`, {
      fontSize: '18px', color: '#dc2626', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.input.keyboard?.on('keydown', this.handleKeyPress, this)
    this.displayQuestion()
  }

  displayQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.showResults()
      return
    }

    // Clear previous question completely before showing new one
    this.clearCurrentQuestion()

    const { width, height } = this.scale
    const question = this.questions[this.currentQuestionIndex]
    
    this.isAnswered = false
    this.userInput = ''
    this.selectedOption = -1
    this.optionButtons = []
    this.optionTexts = []

    // Create a container for all question elements
    this.questionContainer = this.add.container(0, 0)

    // Question text
    const questionText = this.add.text(width/2, height * 0.25, question.question, {
      fontSize: '16px', color: '#1f2937', fontStyle: 'bold',
      wordWrap: { width: width - 60 }, align: 'center'
    }).setOrigin(0.5)
    this.questionContainer.add(questionText)

    if (question.type === 'multiple-choice') {
      this.displayMultipleChoice(question)
    } else {
      this.displayInputQuestion(question)
    }

    this.timer = 30
    this.startTimer()
  }

  clearCurrentQuestion() {
    // Clear question container and all its elements
    if (this.questionContainer) {
      this.questionContainer.destroy(true)
      this.questionContainer = null
    }
    
    // Clear feedback text
    if (this.feedbackText) {
      this.feedbackText.destroy()
      this.feedbackText = null
    }
    
    // Clear result container if it exists
    if (this.resultContainer) {
      this.resultContainer.destroy(true)
      this.resultContainer = null
    }
    
    // Clear timer event
    if (this.timerEvent) {
      this.timerEvent.remove(false)
      this.timerEvent = null
    }
    
    // Reset arrays
    this.optionButtons = []
    this.optionTexts = []
    
    // Clear any elements with questionElement tag (backup cleanup)
    this.children.list.forEach(child => {
      if ((child as any).questionElement) {
        child.destroy()
      }
    })
  }

  displayMultipleChoice(question: PhysicsQuestion) {
    const { width, height } = this.scale
    
    question.options?.forEach((option, index) => {
      const y = height * 0.4 + index * 50
      
      const button = this.add.rectangle(width/2, y, 280, 40, 0xffffff)
        .setStrokeStyle(2, 0x3b82f6)
        .setInteractive()
      
      const text = this.add.text(width/2, y, option, {
        fontSize: '13px', color: '#1f2937', fontFamily: 'Arial'
      }).setOrigin(0.5)
      
      // Add to question container
      if (this.questionContainer) {
        this.questionContainer.add([button, text])
      }
      
      this.optionButtons.push(button)
      this.optionTexts.push(text)
      
      button.on('pointerover', () => {
        if (!this.isAnswered) {
          button.setFillStyle(0xdbeafe)
          this.input.setDefaultCursor('pointer')
        }
      })
      
      button.on('pointerout', () => {
        if (!this.isAnswered && this.selectedOption !== index) {
          button.setFillStyle(0xffffff)
          this.input.setDefaultCursor('default')
        }
      })
      
      button.on('pointerdown', () => {
        if (!this.isAnswered) {
          this.selectOption(index)
        }
      })
    })
    
    // Submit button for multiple choice
    const submitButton = this.add.rectangle(width/2, height * 0.75, 100, 30, 0x22c55e)
      .setInteractive()
    const submitText = this.add.text(width/2, height * 0.75, 'Submit', {
      fontSize: '12px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    // Add to question container
    if (this.questionContainer) {
      this.questionContainer.add([submitButton, submitText])
    }
    
    submitButton.on('pointerdown', () => this.checkAnswer())
  }

  displayInputQuestion(question: PhysicsQuestion) {
    const { width, height } = this.scale
    
    // Input area
    const inputLabel = this.add.text(width/2, height * 0.45, 'Type your answer:', {
      fontSize: '14px', color: '#374151'
    }).setOrigin(0.5)

    const inputBox = this.add.rectangle(width/2, height * 0.55, 350, 40, 0xffffff)
      .setStrokeStyle(3, 0x3b82f6)

    this.inputText = this.add.text(width/2, height * 0.55, '|', {
      fontSize: '16px', color: '#1f2937'
    }).setOrigin(0.5)

    const enterHint = this.add.text(width/2, height * 0.65, 'Press ENTER to submit', {
      fontSize: '12px', color: '#6b7280'
    }).setOrigin(0.5)
    
    // Add to question container
    if (this.questionContainer) {
      this.questionContainer.add([inputLabel, inputBox, this.inputText, enterHint])
    }
  }

  selectOption(index: number) {
    // Clear previous selection
    this.optionButtons.forEach((btn, i) => {
      if (i !== index) {
        btn.setFillStyle(0xffffff)
      }
    })
    
    // Highlight selected option
    this.optionButtons[index].setFillStyle(0x93c5fd)
    this.selectedOption = index
  }

  startTimer() {
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timer--
        if (this.timerText) this.timerText.setText(`Time: ${this.timer}s`)
        if (this.timer <= 10 && this.timerText) this.timerText.setColor('#dc2626')
        if (this.timer <= 0) this.timeUp()
      },
      loop: true
    })
  }

  handleKeyPress = (event: KeyboardEvent) => {
    const question = this.questions[this.currentQuestionIndex]
    if (this.isAnswered || question.type !== 'input') return
    
    if (event.key === 'Enter') {
      this.checkAnswer()
    } else if (event.key === 'Backspace') {
      this.userInput = this.userInput.slice(0, -1)
      this.updateInputDisplay()
    } else if (event.key.length === 1) {
      this.userInput += event.key
      this.updateInputDisplay()
    }
  }

  updateInputDisplay() {
    if (this.inputText) this.inputText.setText(this.userInput || '|')
  }

  checkAnswer() {
    if (this.isAnswered) return
    
    const question = this.questions[this.currentQuestionIndex]
    let isCorrect = false
    
    if (question.type === 'multiple-choice') {
      if (this.selectedOption === -1) return
      isCorrect = this.selectedOption === question.correctAnswer
    } else {
      if (!this.userInput.trim()) return
      const userAnswer = this.userInput.toLowerCase().trim()
      const correctAnswer = (question.correctAnswer as string).toLowerCase().trim()
      isCorrect = userAnswer === correctAnswer || userAnswer.includes(correctAnswer)
    }
    
    this.isAnswered = true
    this.timerEvent?.remove()

    if (isCorrect) {
      this.score++
      try {
        this.sound.play('physicsCorrect', { volume: 0.3 })
      } catch (e) {
        console.log('Audio not available')
      }
      this.showCorrectFeedback()
      
      // Trigger celebration animation on every correct answer
      this.triggerPerfectScoreAnimation()
    } else {
      try {
        this.sound.play('physicsIncorrect', { volume: 0.3 })
      } catch (e) {
        console.log('Audio not available')
      }
      this.showIncorrectFeedback(question.explanation)
    }

    if (this.scoreText) this.scoreText.setText(`Score: ${this.score}/${this.questions.length}`)
    this.time.delayedCall(2000, () => this.showNextButton())
  }

  timeUp() {
    if (this.isAnswered) return
    this.isAnswered = true
    this.timerEvent?.remove()

    const { width, height } = this.scale
    this.add.text(width/2, height * 0.8, "⏰ Time's up!", {
      fontSize: '16px', color: '#dc2626', fontStyle: 'bold'
    }).setOrigin(0.5).setData('questionElement', true)

    this.time.delayedCall(2000, () => this.showNextButton())
  }

  showCorrectFeedback() {
    const { width, height } = this.scale
    
    // Clear any existing feedback
    if (this.feedbackText) {
      this.feedbackText.destroy()
    }
    
    // Create feedback container
    const feedbackContainer = this.add.container(0, 0)
    
    // "Awesome Job!" text with scaling animation
    const awesomeText = this.add.text(width/2, height * 0.75, 'Awesome Job!', {
      fontSize: '18px', color: '#1e40af', fontStyle: 'bold'
    }).setOrigin(0.5)
    feedbackContainer.add(awesomeText)
    
    // Checkmark
    const correctText = this.add.text(width/2, height * 0.8, '✅ Correct!', {
      fontSize: '16px', color: '#22c55e', fontStyle: 'bold'
    }).setOrigin(0.5)
    feedbackContainer.add(correctText)

    // Store reference for cleanup
    this.feedbackText = feedbackContainer as any

    // "Awesome Job!" scaling animation
    this.tweens.add({
      targets: awesomeText,
      scaleX: 1.5,
      scaleY: 1.5,
      alpha: 0,
      duration: 2000,
      ease: 'Power2.easeOut'
    })
    
    // Checkmark animation
    this.tweens.add({
      targets: correctText,
      scaleX: 1.3,
      scaleY: 1.3,
      duration: 200,
      yoyo: true,
      repeat: 1,
      ease: 'Bounce.easeOut'
    })
    
    // Balloon emojis floating upward (6-10 balloons)
    const balloonCount = 6 + Math.floor(Math.random() * 5) // 6-10 balloons
    for (let i = 0; i < balloonCount; i++) {
      const balloon = this.add.text(
        width/2 + (Math.random() - 0.5) * 120,
        height * 0.8 + Math.random() * 40,
        '🎈',
        { fontSize: '20px' }
      ).setOrigin(0.5)
      feedbackContainer.add(balloon)
      
      this.tweens.add({
        targets: balloon,
        y: balloon.y - 100 - Math.random() * 50,
        x: balloon.x + (Math.random() - 0.5) * 60,
        alpha: 0,
        duration: 2000,
        ease: 'Power2.easeOut'
      })
    }
    
    // Clean up feedback after animations complete
    this.time.delayedCall(2000, () => {
      if (feedbackContainer) {
        feedbackContainer.destroy(true)
      }
      this.feedbackText = null
    })
  }

  showIncorrectFeedback(explanation: string) {
    const { width, height } = this.scale
    
    const incorrectText = this.add.text(width/2, height * 0.8, '❌ Try Again!', {
      fontSize: '16px', color: '#dc2626', fontStyle: 'bold'
    }).setOrigin(0.5).setData('questionElement', true)

    const explanationText = this.add.text(width/2, height * 0.85, explanation, {
      fontSize: '10px', color: '#6b7280', wordWrap: { width: width - 40 }, align: 'center'
    }).setOrigin(0.5).setData('questionElement', true)
    
    // Shake animation
    this.tweens.add({
      targets: incorrectText,
      x: incorrectText.x - 10,
      duration: 100,
      yoyo: true,
      repeat: 3,
      ease: 'Power2.easeInOut'
    })
  }

  showNextButton() {
    const { width, height } = this.scale
    
    const nextButton = this.add.rectangle(width/2, height * 0.9, 100, 30, 0x3b82f6).setInteractive().setData('questionElement', true)
    const buttonText = this.currentQuestionIndex < this.questions.length - 1 ? 'Next Question' : 'Results'
    
    this.add.text(width/2, height * 0.9, buttonText, {
      fontSize: '12px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5).setData('questionElement', true)

    nextButton.on('pointerdown', () => {
      this.currentQuestionIndex++
      this.displayQuestion()
    })
  }

  showResults() {
    const { width, height } = this.scale
    const percentage = Math.round((this.score / this.questions.length) * 100)
    const isPerfectScore = this.score === this.questions.length

    // Clear current question container completely before showing results
    this.clearCurrentQuestion()

    // Create dedicated results container positioned at the bottom
    this.resultContainer = this.add.container(0, 0)

    // Results background panel at bottom of screen
    const resultsBg = this.add.rectangle(width/2, height * 0.85, width - 20, height * 0.25, 0x1e40af, 0.1)
      .setStrokeStyle(2, 0x3b82f6)
    this.resultContainer.add(resultsBg)

    const titleText = this.add.text(width/2, height * 0.75, '🏆 Physics Quiz Complete!', {
      fontSize: '16px', color: '#1e40af', fontStyle: 'bold'
    }).setOrigin(0.5)
    this.resultContainer.add(titleText)

    const scoreText = this.add.text(width/2, height * 0.8, `Score: ${this.score}/${this.questions.length} (${percentage}%)`, {
      fontSize: '14px', color: '#1f2937'
    }).setOrigin(0.5)
    this.resultContainer.add(scoreText)
    
    let message = ''
    if (percentage >= 90) message = '⚡ Outstanding! Physics Master! 🌟'
    else if (percentage >= 70) message = '🎉 Great Work! Science Star! 💫'
    else if (percentage >= 50) message = '💪 Good Job! Keep Learning! 📚'
    else message = '🔬 Keep Exploring! Practice Makes Perfect! 🧪'
    
    const messageText = this.add.text(width/2, height * 0.85, message, {
      fontSize: '11px', color: '#6b7280', align: 'center', wordWrap: { width: width - 40 }
    }).setOrigin(0.5)
    this.resultContainer.add(messageText)

    const tryAgainButton = this.add.rectangle(width/2 - 50, height * 0.92, 80, 25, 0x22c55e).setInteractive()
    const tryAgainText = this.add.text(width/2 - 50, height * 0.92, 'Try Again', {
      fontSize: '10px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5)
    this.resultContainer.add([tryAgainButton, tryAgainText])

    const backButton = this.add.rectangle(width/2 + 50, height * 0.92, 80, 25, 0x6b7280).setInteractive()
    const backText = this.add.text(width/2 + 50, height * 0.92, 'Grade Menu', {
      fontSize: '10px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5)
    this.resultContainer.add([backButton, backText])

    // Perfect score balloon animation
    if (isPerfectScore) {
      this.triggerPerfectScoreAnimation()
    }

    tryAgainButton.on('pointerdown', () => this.restartGame())
    backButton.on('pointerdown', () => {
      this.cleanup()
      this.scene.start('PhysicsQuizMenuScene')
    })
  }

  triggerPerfectScoreAnimation() {
    const { width, height } = this.scale
    
    // Create balloon animation container
    const balloonContainer = this.add.container(0, 0)
    
    // Add "Awesome Job!" text that scales up and fades out over 2 seconds
    const awesomeText = this.add.text(width/2, height * 0.4, 'Awesome Job!', {
      fontSize: '24px', color: '#1e40af', fontStyle: 'bold'
    }).setOrigin(0.5)
    balloonContainer.add(awesomeText)
    
    // Scale and fade animation for text - 2 seconds total
    this.tweens.add({
      targets: awesomeText,
      scaleX: 1.5,
      scaleY: 1.5,
      alpha: 0,
      duration: 2000,
      ease: 'Power2.easeOut'
    })
    
    // Create 6-10 balloon emojis
    const balloonCount = 6 + Math.floor(Math.random() * 5)
    for (let i = 0; i < balloonCount; i++) {
      const balloon = this.add.text(
        width/2 + (Math.random() - 0.5) * 200,
        height * 0.6 + Math.random() * 50,
        '🎈',
        { fontSize: '24px' }
      ).setOrigin(0.5)
      balloonContainer.add(balloon)
      
      // Float upward animation - 2 seconds total
      this.tweens.add({
        targets: balloon,
        y: balloon.y - 150 - Math.random() * 100,
        x: balloon.x + (Math.random() - 0.5) * 80,
        alpha: 0,
        rotation: (Math.random() - 0.5) * 0.5,
        duration: 2000,
        ease: 'Power2.easeOut'
      })
    }
    
    // Clean up after 2 seconds (per memory specification)
    this.time.delayedCall(2000, () => {
      if (balloonContainer) {
        balloonContainer.destroy(true)
      }
    })
  }

  restartGame() {
    this.cleanup()
    this.currentQuestionIndex = 0
    this.score = 0
    this.timer = 30
    this.isAnswered = false
    this.userInput = ''
    this.selectedOption = -1
    
    if (this.scoreText) this.scoreText.setText(`Score: ${this.score}/${this.questions.length}`)
    this.displayQuestion()
  }

  cleanup() {
    // Clear current question completely
    this.clearCurrentQuestion()
    
    // Remove keyboard listener
    if (this.input.keyboard) {
      this.input.keyboard.off('keydown', this.handleKeyPress, this)
    }
  }
}