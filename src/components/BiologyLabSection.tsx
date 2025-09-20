import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { useAuth } from '../hooks/useAuth'

// Type definitions
type Question = {
  question: string
  answer: string
}

type GradeData = {
  topic: string
  questions: Question[]
}

// Biology Lab Data for Grades 6-12
const BIOLOGY_DATA: Record<number, GradeData> = {
  6: { topic: 'Plant Cells', questions: [
    { question: 'What is the rigid outer layer that protects plant cells?', answer: 'Cell wall' },
    { question: 'Which organelle performs photosynthesis?', answer: 'Chloroplast' },
    { question: 'Which structure controls cell activities?', answer: 'Nucleus' }
  ]},
  7: { topic: 'Animal Classification', questions: [
    { question: 'A jellyfish belongs to which group?', answer: 'Cnidaria' },
    { question: 'Which vertebrates lay eggs with shells?', answer: 'Reptiles' },
    { question: 'What do we call animals that eat plants and meat?', answer: 'Omnivores' }
  ]},
  8: { topic: 'Human Body Systems', questions: [
    { question: 'Which organ pumps blood?', answer: 'Heart' },
    { question: 'Which organ filters blood?', answer: 'Kidney' },
    { question: 'Which system digests food?', answer: 'Digestive system' }
  ]},
  9: { topic: 'Digestive System', questions: [
    { question: 'Where does nutrient absorption occur?', answer: 'Small intestine' },
    { question: 'Which organ produces bile?', answer: 'Liver' },
    { question: 'Which tube connects throat to stomach?', answer: 'Esophagus' }
  ]},
  10: { topic: 'Photosynthesis', questions: [
    { question: 'Which gas is needed in photosynthesis?', answer: 'Carbon dioxide' },
    { question: 'What is the energy source for photosynthesis?', answer: 'Sunlight' },
    { question: 'Which pigment captures light?', answer: 'Chlorophyll' }
  ]},
  11: { topic: 'DNA Structure', questions: [
    { question: 'What are DNA building blocks called?', answer: 'Nucleotides' },
    { question: 'What forms DNA\'s backbone?', answer: 'Sugar and phosphate' },
    { question: 'What bonds hold DNA strands?', answer: 'Hydrogen bonds' }
  ]},
  12: { topic: 'Cell Division', questions: [
    { question: 'What division creates haploid cells?', answer: 'Meiosis' },
    { question: 'Which mitosis phase aligns chromosomes?', answer: 'Metaphase' },
    { question: 'What is cytoplasm division called?', answer: 'Cytokinesis' }
  ]}
}

// Firestore utility functions for complete grade isolation
const getBiologyProgressPath = (userId: string, grade: number, topicId: string) => {
  return `game-progress/${userId}/biology-lab/${grade}/${topicId}`
}

const saveBiologyProgress = async (userId: string, grade: number, topicId: string, score: number, questionsAnswered: number) => {
  try {
    if (!userId || userId === 'anonymous') return
    const docPath = getBiologyProgressPath(userId, grade, topicId)
    await setDoc(doc(db, docPath), {
      score,
      questionsAnswered,
      lastUpdated: new Date().toISOString(),
      grade,
      topicId
    }, { merge: true })
    console.log(`Biology Lab progress saved: Grade ${grade} - Score: ${score}/${questionsAnswered}`)
  } catch (error) {
    console.error('Error saving biology progress:', error)
  }
}

const loadBiologyProgress = async (userId: string, grade: number, topicId: string) => {
  try {
    if (!userId || userId === 'anonymous') return { score: 0, questionsAnswered: 0 }
    const docPath = getBiologyProgressPath(userId, grade, topicId)
    const docSnap = await getDoc(doc(db, docPath))
    if (docSnap.exists()) {
      const data = docSnap.data()
      return data
    }
    return { score: 0, questionsAnswered: 0 }
  } catch (error) {
    console.error('Error loading biology progress:', error)
    return { score: 0, questionsAnswered: 0 }
  }
}

// Biology Lab Main Menu Scene with Progress Indicators
class BiologyMainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BiologyMainMenuScene' })
  }

  async create() {
    const { width, height } = this.scale
    const userId = this.registry.get('userId') || 'anonymous'
    
    // Clear any previous scene data to ensure complete isolation
    this.registry.remove('selectedGrade')
    this.registry.remove('currentScore')
    this.registry.remove('currentQuestionIndex')
    
    // Background
    this.add.rectangle(width/2, height/2, width, height, 0x065f46)
    
    // Title
    this.add.text(width/2, 40, '🔬 Biology Lab', {
      fontSize: '24px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, 65, 'Select Your Grade (6-12)', {
      fontSize: '14px', color: '#d1fae5', fontFamily: 'Arial'
    }).setOrigin(0.5)

    // Grade cards with progress loading
    const grades = [6, 7, 8, 9, 10, 11, 12]
    
    // Load progress for all grades asynchronously
    const gradeProgressPromises = grades.map(async (grade) => {
      const gradeData = BIOLOGY_DATA[grade]
      const topicId = gradeData.topic.toLowerCase().replace(/\s+/g, '-')
      const progress = await loadBiologyProgress(userId, grade, topicId)
      return { grade, progress, gradeData }
    })
    
    const gradeProgresses = await Promise.all(gradeProgressPromises)
    
    gradeProgresses.forEach(({ grade, progress, gradeData }, index) => {
      const col = index % 4
      const row = Math.floor(index / 4)
      const x = 60 + col * 80
      const y = 120 + row * 80
      
      // Grade card with progress-based styling
      const card = this.add.rectangle(x, y, 70, 70, 0x16a34a)
        .setInteractive()
        .setStrokeStyle(2, progress.score > 0 ? 0x22c55e : 0x94a3b8)
      
      // Enhanced hover effects
      card.on('pointerover', () => {
        card.setFillStyle(0x22c55e)
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
        card.setFillStyle(0x16a34a)
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
      this.add.text(x, y - 20, `Grade ${grade}`, {
        fontSize: '12px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5)
      
      // Topic text
      this.add.text(x, y - 5, gradeData.topic, {
        fontSize: '8px', color: '#d1fae5', fontFamily: 'Arial',
        wordWrap: { width: 65 }, align: 'center'
      }).setOrigin(0.5)
      
      // Progress indicator
      const progressText = progress.score > 0 ? `${progress.score}/${gradeData.questions.length}` : 'Start'
      const progressColor = progress.score > 0 ? '#22c55e' : '#d1fae5'
      
      this.add.text(x, y + 15, progressText, {
        fontSize: '8px', color: progressColor, fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5)
      
      // Completion indicator
      if (progress.score === gradeData.questions.length) {
        this.add.text(x, y + 25, '✅', {
          fontSize: '10px', color: '#22c55e'
        }).setOrigin(0.5)
      }
      
      card.on('pointerdown', () => {
        // Ensure complete state reset for grade isolation
        this.registry.set('selectedGrade', grade)
        this.registry.remove('currentScore')
        this.registry.remove('currentQuestionIndex')
        this.scene.start('BiologyTopicScene')
      })
    })
  }
}

// Biology Lab Topic Scene
class BiologyTopicScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BiologyTopicScene' })
  }

  async create() {
    const { width, height } = this.scale
    const selectedGrade = this.registry.get('selectedGrade') as number
    const gradeData = BIOLOGY_DATA[selectedGrade]
    const userId = this.registry.get('userId') || 'anonymous'
    
    this.add.rectangle(width/2, height/2, width, height, 0x064e3b)
    
    // Back button
    const backButton = this.add.rectangle(50, 30, 80, 30, 0x6b7280).setInteractive()
    this.add.text(50, 30, '← Back', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5)
    backButton.on('pointerdown', () => this.scene.start('BiologyMainMenuScene'))
    
    // Title
    this.add.text(width/2, 50, `Grade ${selectedGrade}: ${gradeData.topic}`, {
      fontSize: '18px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    // Load progress
    const topicId = gradeData.topic.toLowerCase().replace(/\s+/g, '-')
    const progress = await loadBiologyProgress(userId, selectedGrade, topicId)
    
    // Topic card
    const topicCard = this.add.rectangle(width/2, height/2, 280, 120, 0x16a34a)
      .setInteractive()
      .setStrokeStyle(3, progress.score > 0 ? 0x22c55e : 0x94a3b8)
    
    // Hover effect
    topicCard.on('pointerover', () => {
      topicCard.setFillStyle(0x22c55e)
      this.tweens.add({
        targets: topicCard,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 200
      })
    })
    
    topicCard.on('pointerout', () => {
      topicCard.setFillStyle(0x16a34a)
      this.tweens.add({
        targets: topicCard,
        scaleX: 1,
        scaleY: 1,
        duration: 200
      })
    })
    
    // Topic content
    this.add.text(width/2, height/2 - 25, '🔬 ' + gradeData.topic, {
      fontSize: '16px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, height/2, `${gradeData.questions.length} Questions`, {
      fontSize: '12px', color: '#d1fae5', fontFamily: 'Arial'
    }).setOrigin(0.5)
    
    const progressText = progress.score > 0 ? `Progress: ${progress.score}/${gradeData.questions.length}` : 'Not Started'
    this.add.text(width/2, height/2 + 20, progressText, {
      fontSize: '12px', color: progress.score > 0 ? '#22c55e' : '#d1fae5', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, height/2 + 40, 'Click to Start!', {
      fontSize: '10px', color: '#a7f3d0', fontFamily: 'Arial'
    }).setOrigin(0.5)
    
    topicCard.on('pointerdown', () => {
      this.scene.start('BiologyGameScene')
    })
  }
}

// Biology Lab Game Scene
class BiologyGameScene extends Phaser.Scene {
  private currentQuestionIndex: number = 0
  private score: number = 0
  private timer: number = 30
  private userInput: string = ''
  private isAnswered: boolean = false
  private questions: Question[] = []
  private timerEvent: Phaser.Time.TimerEvent | null = null
  private timerText: Phaser.GameObjects.Text | null = null
  private inputText: Phaser.GameObjects.Text | null = null
  private scoreText: Phaser.GameObjects.Text | null = null
  private userId: string = ''
  private grade: number = 0
  private topicId: string = ''
  private questionContainer: Phaser.GameObjects.Container | null = null
  private feedbackText: Phaser.GameObjects.Text | null = null
  private resultContainer: Phaser.GameObjects.Container | null = null

  constructor() {
    super({ key: 'BiologyGameScene' })
  }

  preload() {
    // Create simple audio tones
    this.load.audio('biologyCorrect', ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
    this.load.audio('biologyIncorrect', ['data:audio/wav;base64,UklGRkIEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YR4EAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
  }

  async create() {
    const { width, height } = this.scale
    const selectedGrade = this.registry.get('selectedGrade') as number
    const gradeData = BIOLOGY_DATA[selectedGrade]
    this.questions = gradeData.questions
    
    // Complete state reset for grade isolation
    this.currentQuestionIndex = 0
    this.timer = 30
    this.isAnswered = false
    this.userInput = ''
    
    // Set up identifiers for Firestore
    this.userId = this.registry.get('userId') || 'anonymous'
    this.grade = selectedGrade
    this.topicId = gradeData.topic.toLowerCase().replace(/\s+/g, '-')
    
    // Load existing progress for THIS specific grade only
    const progress = await loadBiologyProgress(this.userId, this.grade, this.topicId)
    this.score = progress.score || 0
    
    // Ensure complete scene isolation - clear all previous elements
    this.children.removeAll()
    
    this.add.rectangle(width/2, height/2, width, height, 0xf0fdf4)
    
    // Back button with grade isolation
    const backButton = this.add.rectangle(50, 30, 80, 30, 0x6b7280).setInteractive()
    this.add.text(50, 30, '← Back', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5)
    backButton.on('pointerdown', () => {
      this.cleanup()
      // Clear grade-specific data when going back
      this.registry.remove('currentScore')
      this.registry.remove('currentQuestionIndex')
      this.scene.start('BiologyTopicScene')
    })
    
    // Header with grade-specific information
    this.add.text(width/2, 40, `🔬 Biology Lab - Grade ${selectedGrade}`, {
      fontSize: '18px', color: '#15803d', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, 60, gradeData.topic, {
      fontSize: '14px', color: '#15803d'
    }).setOrigin(0.5)
    
    // Progress indicator specific to this grade
    this.scoreText = this.add.text(width - 80, 40, `Score: ${this.score}/${this.questions.length}`, {
      fontSize: '16px', color: '#15803d', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.timerText = this.add.text(width/2, 80, `Time: ${this.timer}s`, {
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

    // Create a container for all question elements
    this.questionContainer = this.add.container(0, 0)

    // Question text
    const questionText = this.add.text(width/2, height * 0.3, question.question, {
      fontSize: '16px', color: '#1f2937', fontStyle: 'bold',
      wordWrap: { width: width - 60 }, align: 'center'
    }).setOrigin(0.5)
    this.questionContainer.add(questionText)

    // Input area
    const inputLabel = this.add.text(width/2, height * 0.5, 'Type your answer:', {
      fontSize: '14px', color: '#374151'
    }).setOrigin(0.5)
    this.questionContainer.add(inputLabel)

    const inputBox = this.add.rectangle(width/2, height * 0.6, 350, 40, 0xffffff)
      .setStrokeStyle(3, 0x22c55e)
    this.questionContainer.add(inputBox)

    this.inputText = this.add.text(width/2, height * 0.6, '|', {
      fontSize: '16px', color: '#1f2937'
    }).setOrigin(0.5)
    this.questionContainer.add(this.inputText)

    const enterHint = this.add.text(width/2, height * 0.7, 'Press ENTER to submit', {
      fontSize: '12px', color: '#6b7280'
    }).setOrigin(0.5)
    this.questionContainer.add(enterHint)

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
    
    // Clear any elements with questionElement tag (backup cleanup)
    this.children.list.forEach(child => {
      if ((child as any).questionElement) {
        child.destroy()
      }
    })
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
    if (this.isAnswered) return
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

  async checkAnswer() {
    if (this.isAnswered || !this.userInput.trim()) return
    this.isAnswered = true
    this.timerEvent?.remove()

    const question = this.questions[this.currentQuestionIndex]
    const isCorrect = this.userInput.toLowerCase().trim() === question.answer.toLowerCase().trim()

    if (isCorrect) {
      this.score++
      try {
        this.sound.play('biologyCorrect', { volume: 0.3 })
      } catch (e) {
        console.log('Audio not available')
      }
      this.showCorrectFeedback()
      
      // Trigger celebration animation on every correct answer
      this.triggerPerfectScoreAnimation()
      
      await saveBiologyProgress(this.userId, this.grade, this.topicId, this.score, this.currentQuestionIndex + 1)
    } else {
      try {
        this.sound.play('biologyIncorrect', { volume: 0.3 })
      } catch (e) {
        console.log('Audio not available')
      }
      this.showIncorrectFeedback(question.answer)
    }

    if (this.scoreText) this.scoreText.setText(`Score: ${this.score}/${this.questions.length}`)
    this.time.delayedCall(2000, () => this.showNextButton())
  }

  timeUp() {
    if (this.isAnswered) return
    this.isAnswered = true
    this.timerEvent?.remove()

    const { width, height } = this.scale
    
    // Clear any existing feedback
    if (this.feedbackText) {
      this.feedbackText.destroy()
    }
    
    // Create timeout feedback
    const timeupContainer = this.add.container(0, 0)
    
    const timeupText = this.add.text(width/2, height * 0.8, "⏰ Time's up!", {
      fontSize: '16px', color: '#dc2626', fontStyle: 'bold'
    }).setOrigin(0.5)
    timeupContainer.add(timeupText)
    
    // Store reference for cleanup
    this.feedbackText = timeupContainer as any

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
      fontSize: '18px', color: '#15803d', fontStyle: 'bold'
    }).setOrigin(0.5)
    feedbackContainer.add(awesomeText)
    
    // Checkmark
    const correctText = this.add.text(width/2, height * 0.8, '✅ Correct!', {
      fontSize: '16px', color: '#15803d', fontStyle: 'bold'
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

  showIncorrectFeedback(correctAnswer: string) {
    const { width, height } = this.scale
    
    // Clear any existing feedback
    if (this.feedbackText) {
      this.feedbackText.destroy()
    }
    
    // Create feedback container
    const feedbackContainer = this.add.container(0, 0)
    
    const incorrectText = this.add.text(width/2, height * 0.8, '❌ Incorrect!', {
      fontSize: '16px', color: '#dc2626', fontStyle: 'bold'
    }).setOrigin(0.5)
    feedbackContainer.add(incorrectText)

    const answerText = this.add.text(width/2, height * 0.85, `Answer: ${correctAnswer}`, {
      fontSize: '12px', color: '#6b7280'
    }).setOrigin(0.5)
    feedbackContainer.add(answerText)
    
    // Store reference for cleanup
    this.feedbackText = feedbackContainer as any
  }

  showNextButton() {
    const { width, height } = this.scale
    
    // Create next button in question container if it exists
    const nextButton = this.add.rectangle(width/2, height * 0.9, 100, 30, 0x22c55e).setInteractive()
    const buttonText = this.currentQuestionIndex < this.questions.length - 1 ? 'Next' : 'Results'
    
    const buttonTextObj = this.add.text(width/2, height * 0.9, buttonText, {
      fontSize: '12px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5)

    // Add to question container if it exists
    if (this.questionContainer) {
      this.questionContainer.add([nextButton, buttonTextObj])
    }

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
    const resultsBg = this.add.rectangle(width/2, height * 0.85, width - 20, height * 0.25, 0x15803d, 0.1)
      .setStrokeStyle(2, 0x22c55e)
    this.resultContainer.add(resultsBg)

    const titleText = this.add.text(width/2, height * 0.75, '🏆 Lab Complete!', {
      fontSize: '16px', color: '#15803d', fontStyle: 'bold'
    }).setOrigin(0.5)
    this.resultContainer.add(titleText)

    const scoreText = this.add.text(width/2, height * 0.8, `Score: ${this.score}/${this.questions.length} (${percentage}%)`, {
      fontSize: '14px', color: '#1f2937'
    }).setOrigin(0.5)
    this.resultContainer.add(scoreText)
    
    let message = ''
    if (percentage >= 90) message = 'Outstanding! 🌟'
    else if (percentage >= 70) message = 'Great Work! 🎉'
    else if (percentage >= 50) message = 'Good Job! 💪'
    else message = 'Keep Learning! 📚'
    
    const messageText = this.add.text(width/2, height * 0.85, message, {
      fontSize: '11px', color: '#6b7280'
    }).setOrigin(0.5)
    this.resultContainer.add(messageText)

    const tryAgainButton = this.add.rectangle(width/2 - 50, height * 0.92, 80, 25, 0x22c55e).setInteractive()
    const tryAgainText = this.add.text(width/2 - 50, height * 0.92, 'Try Again', {
      fontSize: '10px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5)
    this.resultContainer.add([tryAgainButton, tryAgainText])

    const backButton = this.add.rectangle(width/2 + 50, height * 0.92, 80, 25, 0x6b7280).setInteractive()
    const backText = this.add.text(width/2 + 50, height * 0.92, 'Topic Menu', {
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
      this.scene.start('BiologyTopicScene')
    })
  }

  triggerPerfectScoreAnimation() {
    const { width, height } = this.scale
    
    // Create balloon animation container
    const balloonContainer = this.add.container(0, 0)
    
    // Add "Awesome Job!" text that scales up and fades out over 2 seconds
    const awesomeText = this.add.text(width/2, height * 0.4, 'Awesome Job!', {
      fontSize: '24px', color: '#15803d', fontStyle: 'bold'
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

  async restartGame() {
    this.cleanup()
    this.currentQuestionIndex = 0
    this.score = 0
    this.timer = 30
    this.isAnswered = false
    this.userInput = ''
    
    if (this.userId && this.userId !== 'anonymous') {
      await saveBiologyProgress(this.userId, this.grade, this.topicId, 0, 0)
    }
    
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

// React Component
const BiologyLabSection: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { currentUser } = useAuth()
  const [showQuiz, setShowQuiz] = React.useState(false)
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [timer, setTimer] = React.useState(30)
  const [userAnswer, setUserAnswer] = React.useState('')
  const [score, setScore] = React.useState(0)
  const [feedback, setFeedback] = React.useState('')
  const [showInteractiveEffect, setShowInteractiveEffect] = React.useState(false)
  const [isAnswered, setIsAnswered] = React.useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Quiz questions
  const quizQuestions = [
    { question: 'What is the powerhouse of the cell?', answer: 'mitochondria' },
    { question: 'Which gas do plants absorb during photosynthesis?', answer: 'carbon dioxide' },
    { question: 'What is the basic unit of life?', answer: 'cell' },
    { question: 'Which organ pumps blood throughout the human body?', answer: 'heart' },
    { question: 'What type of blood cells fight infection?', answer: 'white blood cells' },
    { question: 'What is the green pigment in plants called?', answer: 'chlorophyll' },
    { question: 'Which organ filters waste from the blood?', answer: 'kidney' },
    { question: 'What is the largest organ in the human body?', answer: 'skin' },
    { question: 'Which part of the brain controls balance?', answer: 'cerebellum' },
    { question: 'What is the study of living organisms called?', answer: 'biology' }
  ]

  // Timer effect
  React.useEffect(() => {
    if (showQuiz && timer > 0 && !isAnswered) {
      timerRef.current = setTimeout(() => {
        setTimer(timer - 1)
      }, 1000)
    } else if (timer === 0 && !isAnswered) {
      handleTimeUp()
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [timer, showQuiz, isAnswered])

  const startQuiz = () => {
    setShowQuiz(true)
    setCurrentQuestion(0)
    setScore(0)
    setTimer(30)
    setUserAnswer('')
    setFeedback('')
    setIsAnswered(false)
  }

  const handleTimeUp = () => {
    setIsAnswered(true)
    setFeedback('⏰ Time\'s up! Try the next question.')
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  const handleSubmit = () => {
    if (!userAnswer.trim() || isAnswered) return
    
    setIsAnswered(true)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    
    const correct = userAnswer.toLowerCase().trim() === quizQuestions[currentQuestion].answer.toLowerCase()
    
    if (correct) {
      setScore(score + 1)
      // Motivational messages as per memory specifications
      const motivationalMessages = [
        '🎉 Awesome Job! Biology Master!',
        '✨ Excellent Discovery!',
        '🌟 Outstanding! Science Star!',
        '🔬 Lab Expert! Well done!',
        '💡 Brilliant Answer!',
        '🏆 Perfect! Keep it up!'
      ]
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
      setFeedback(randomMessage)
      setShowInteractiveEffect(true)
      // Create confetti effect
      createConfetti()
      setTimeout(() => setShowInteractiveEffect(false), 2000)
    } else {
      setFeedback(`❌ Try Again! The correct answer is: ${quizQuestions[currentQuestion].answer}`)
      // Shake animation
      const inputElement = document.getElementById('quiz-input')
      if (inputElement) {
        inputElement.classList.add('shake-animation')
        setTimeout(() => inputElement.classList.remove('shake-animation'), 600)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      // Complete question clearing - reset all states
      setCurrentQuestion(currentQuestion + 1)
      setTimer(30)
      setUserAnswer('')
      setFeedback('')
      setIsAnswered(false)
      setShowInteractiveEffect(false)
    } else {
      // Quiz completed with celebration
      const finalPercentage = Math.round((score / quizQuestions.length) * 100)
      let completionMessage = ''
      if (finalPercentage >= 90) completionMessage = '🏆 Outstanding Performance! Biology Master! 🌟'
      else if (finalPercentage >= 70) completionMessage = '🎉 Excellent Work! Great Job! 💪'
      else if (finalPercentage >= 50) completionMessage = '👍 Good Effort! Keep Learning! 📚'
      else completionMessage = '🌱 Keep Growing! Practice Makes Perfect! 💚'
      
      setFeedback(`${completionMessage} Final Score: ${score}/${quizQuestions.length} (${finalPercentage}%)`)
    }
  }

  const createConfetti = () => {
    // Create bubbles/confetti effect
    const container = document.getElementById('quiz-container')
    if (!container) return
    
    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement('div')
      bubble.className = 'confetti-bubble'
      bubble.style.position = 'absolute'
      bubble.style.width = '10px'
      bubble.style.height = '10px'
      bubble.style.borderRadius = '50%'
      bubble.style.backgroundColor = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 4)]
      bubble.style.left = Math.random() * 100 + '%'
      bubble.style.top = '50%'
      bubble.style.animation = 'bubble-float 2s ease-out forwards'
      bubble.style.zIndex = '1000'
      
      container.appendChild(bubble)
      
      setTimeout(() => {
        if (container.contains(bubble)) {
          container.removeChild(bubble)
        }
      }, 2000)
    }
  }

  const resetQuiz = () => {
    setShowQuiz(false)
    setCurrentQuestion(0)
    setScore(0)
    setTimer(30)
    setUserAnswer('')
    setFeedback('')
    setIsAnswered(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">🔬 Biology Lab</h1>
          <p className="text-gray-600 text-sm mb-6">Please log in to access the Biology Lab and track your progress.</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (containerRef.current && !gameRef.current && currentUser && !showQuiz) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 600,
        height: 500,
        parent: containerRef.current,
        backgroundColor: '#065f46',
        scene: [BiologyMainMenuScene, BiologyTopicScene, BiologyGameScene],
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
        input: { keyboard: true }
      }
      gameRef.current = new Phaser.Game(config)
      gameRef.current.registry.set('userId', currentUser.uid)
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [currentUser, showQuiz])

  // Quiz Component
  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <style>{`
          @keyframes bubble-float {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-100px) scale(0);
              opacity: 0;
            }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          
          .shake-animation {
            animation: shake 0.6s ease-in-out;
          }
          
          .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
          }
          
          .next-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          }
          
          .quiz-input:focus {
            outline: none;
            border-color: #22c55e;
            box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
          }
          
          @media (max-width: 768px) {
            .quiz-container {
              width: 95% !important;
              padding: 1.5rem !important;
            }
          }
        `}</style>
        
        <div 
          id="quiz-container"
          className="quiz-container mx-auto relative"
          style={{
            width: '90%',
            maxWidth: '1000px',
            backgroundColor: '#eaffea',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            padding: '2.5rem',
            minHeight: '400px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🔬 Biology Lab Quiz</h1>
            <div className="flex justify-between items-center mt-6">
              <div className="text-lg font-semibold text-gray-700">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </div>
              <div 
                className="text-xl font-bold"
                style={{ color: timer <= 10 ? '#dc2626' : '#dc2626' }}
              >
                ⏱️ {timer}s
              </div>
            </div>
          </div>
          
          {/* Question */}
          <div className="mb-8">
            <div className="text-xl font-semibold text-gray-800 mb-6 text-center leading-relaxed">
              {quizQuestions[currentQuestion].question}
            </div>
          </div>
          
          {/* Input Field */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3 text-lg">
              Your Answer:
            </label>
            <input
              id="quiz-input"
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              disabled={isAnswered}
              className="quiz-input w-full px-4 py-3 text-lg border-2 border-green-300 rounded-lg transition-all duration-200"
              placeholder="Type your answer here..."
              style={{
                backgroundColor: isAnswered ? '#f3f4f6' : '#ffffff',
                borderColor: isAnswered ? '#d1d5db' : '#22c55e'
              }}
            />
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleSubmit}
              disabled={!userAnswer.trim() || isAnswered}
              className="submit-btn flex-1 py-3 px-6 text-white font-semibold rounded-lg transition-all duration-200"
              style={{
                backgroundColor: (!userAnswer.trim() || isAnswered) ? '#9ca3af' : '#22c55e',
                cursor: (!userAnswer.trim() || isAnswered) ? 'not-allowed' : 'pointer',
                transform: 'translateY(0)',
                boxShadow: '0 4px 15px rgba(34, 197, 94, 0.2)'
              }}
            >
              Submit Answer
            </button>
            
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="next-btn flex-1 py-3 px-6 text-white font-semibold rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: '#3b82f6',
                  transform: 'translateY(0)',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)'
                }}
              >
                {currentQuestion + 1 < quizQuestions.length ? 'Next Question' : 'View Results'}
              </button>
            )}
          </div>
          
          {/* Feedback */}
          {feedback && (
            <div className="text-center mb-6">
              <div 
                className={`text-lg font-semibold p-4 rounded-lg ${
                  feedback.includes('Correct') 
                    ? 'bg-green-100 text-green-800' 
                    : feedback.includes('Time') 
                    ? 'bg-yellow-100 text-yellow-800'
                    : feedback.includes('Complete')
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {feedback}
              </div>
            </div>
          )}
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>Score: {score}/{quizQuestions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Exit Quiz Button */}
          <div className="text-center">
            <button
              onClick={resetQuiz}
              className="py-2 px-6 text-gray-600 hover:text-gray-800 font-medium underline transition-colors duration-200"
            >
              ← Back to Lab
            </button>
          </div>
          
          {/* Interactive Effect Overlay */}
          {showInteractiveEffect && (
            <div 
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
              style={{ zIndex: 999 }}
            >
              <div className="text-6xl animate-bounce">🎉</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔬 Biology Lab</h1>
          <p className="text-gray-600">Explore life sciences through interactive experiments!</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              30-second timers
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Grade-specific topics
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              Progress tracking
            </span>
          </div>
        </div>
        
        {/* Quiz Button */}
        <div className="text-center mb-6">
          <button
            onClick={startQuiz}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🧪 Start Interactive Quiz
          </button>
        </div>
        
        <div 
          ref={containerRef} 
          className="border-4 border-green-200 rounded-xl overflow-hidden shadow-lg bg-green-100"
          style={{ width: '600px', height: '500px', margin: '0 auto', maxWidth: '100%' }}
        />
        
        <div className="text-center mt-4 space-y-2">
          <div className="text-sm text-gray-500">
            🎮 Type answers • ⏱️ 30 seconds per question • 🧬 Biology mastery
          </div>
          <div className="text-xs text-gray-400">
            Built with Phaser.js & Firebase • Grades 6-12 Available
          </div>
        </div>
      </div>
    </div>
  )
}

export default BiologyLabSection