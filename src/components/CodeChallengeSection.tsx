import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { useAuth } from '../hooks/useAuth'

// Code Challenge Data for Grades 6-12
const CODE_DATA: Record<number, {topic: string, questions: {question: string, answer: string}[]}> = {
  6: { topic: 'Basic Concepts', questions: [
    { question: 'What is a variable?', answer: 'A container for data' },
    { question: 'What is 5 + 3?', answer: '8' },
    { question: 'Which keyword prints text in Python?', answer: 'print' }
  ]},
  7: { topic: 'Expressions', questions: [
    { question: 'Evaluate: (10 + 2) * 3', answer: '36' },
    { question: 'What is 15 % 4?', answer: '3' },
    { question: 'Which symbol means not equal?', answer: '!=' }
  ]},
  8: { topic: 'Loops & Logic', questions: [
    { question: 'Which loop runs a fixed number of times?', answer: 'for loop' },
    { question: 'What is true && false?', answer: 'false' },
    { question: 'Which keyword exits a loop?', answer: 'break' }
  ]},
  9: { topic: 'Code Reading', questions: [
    { question: 'What does x=5; if x>3: print("Hello") print?', answer: 'Hello' },
    { question: 'Final value of count: count=0; for i in range(3): count+=1', answer: '3' },
    { question: 'What are comments for?', answer: 'Explaining code' }
  ]},
  10: { topic: 'Debugging', questions: [
    { question: 'What is a syntax error?', answer: 'Grammar mistake in code' },
    { question: 'What does ReferenceError mean?', answer: 'Variable not defined' },
    { question: 'What is fixing errors called?', answer: 'Debugging' }
  ]},
  11: { topic: 'OOP Concepts', questions: [
    { question: 'What is an object?', answer: 'Instance of a class' },
    { question: 'What is inheritance?', answer: 'Child class uses parent class properties' },
    { question: 'What is a method?', answer: 'Function inside a class' }
  ]},
  12: { topic: 'Functions', questions: [
    { question: 'What keyword defines a function in Python?', answer: 'def' },
    { question: 'What is a function\'s return value?', answer: 'Its output' },
    { question: 'What is a parameter?', answer: 'A variable in a function definition' }
  ]}
}

// Firestore utilities for complete grade isolation
const saveCodeProgress = async (userId: string, grade: number, topicId: string, score: number, questionsAnswered: number) => {
  try {
    if (!userId || userId === 'anonymous') return
    await setDoc(doc(db, `game-progress/${userId}/code-challenge/${grade}/${topicId}`), {
      score, questionsAnswered, lastUpdated: new Date().toISOString(), grade, topicId
    }, { merge: true })
    console.log(`Code Challenge progress saved: Grade ${grade} - Score: ${score}/${questionsAnswered}`)
  } catch (error) {
    console.error('Error saving code progress:', error)
  }
}

const loadCodeProgress = async (userId: string, grade: number, topicId: string) => {
  try {
    if (!userId || userId === 'anonymous') return { score: 0, questionsAnswered: 0 }
    const docSnap = await getDoc(doc(db, `game-progress/${userId}/code-challenge/${grade}/${topicId}`))
    if (docSnap.exists()) {
      const data = docSnap.data()
      console.log(`Code Challenge progress loaded: Grade ${grade} - Score: ${data.score}/${data.questionsAnswered}`)
      return data
    }
    return { score: 0, questionsAnswered: 0 }
  } catch (error) {
    console.error('Error loading code progress:', error)
    return { score: 0, questionsAnswered: 0 }
  }
}

// Phaser Scenes with Progress Indicators
class CodeMainMenuScene extends Phaser.Scene {
  constructor() { super({ key: 'CodeMainMenuScene' }) }
  
  async create() {
    const { width, height } = this.scale
    const userId = this.registry.get('userId') || 'anonymous'
    
    // Clear any previous scene data to ensure complete isolation
    this.registry.remove('selectedGrade')
    this.registry.remove('currentScore')
    this.registry.remove('currentQuestionIndex')
    
    this.add.rectangle(width/2, height/2, width, height, 0x581c87)
    this.add.text(width/2, 40, '💻 Code Challenge', {fontSize: '24px', color: '#ffffff', fontStyle: 'bold'}).setOrigin(0.5)
    this.add.text(width/2, 65, 'Select Your Grade (6-12)', {fontSize: '14px', color: '#e9d5ff'}).setOrigin(0.5)

    const grades = [6, 7, 8, 9, 10, 11, 12]
    
    // Load progress for all grades asynchronously
    const gradeProgressPromises = grades.map(async (grade) => {
      const gradeData = CODE_DATA[grade]
      const topicId = gradeData.topic.toLowerCase().replace(/\s+/g, '-')
      const progress = await loadCodeProgress(userId, grade, topicId)
      return { grade, progress, gradeData }
    })
    
    const gradeProgresses = await Promise.all(gradeProgressPromises)
    
    gradeProgresses.forEach(({ grade, progress, gradeData }, index) => {
      const col = index % 4, row = Math.floor(index / 4)
      const x = 60 + col * 80, y = 120 + row * 80
      const card = this.add.rectangle(x, y, 70, 70, 0x7c3aed).setInteractive().setStrokeStyle(2, progress.score > 0 ? 0x8b5cf6 : 0x94a3b8)
      
      card.on('pointerover', () => { 
        card.setFillStyle(0x8b5cf6)
        this.input.setDefaultCursor('pointer')
        this.tweens.add({targets: card, scaleX: 1.1, scaleY: 1.1, duration: 200, ease: 'Power2.easeOut'}) 
      })
      card.on('pointerout', () => { 
        card.setFillStyle(0x7c3aed)
        this.input.setDefaultCursor('default')
        this.tweens.add({targets: card, scaleX: 1, scaleY: 1, duration: 200, ease: 'Power2.easeOut'}) 
      })
      
      this.add.text(x, y - 20, `Grade ${grade}`, {fontSize: '12px', color: '#ffffff', fontStyle: 'bold'}).setOrigin(0.5)
      this.add.text(x, y - 5, gradeData.topic, {fontSize: '8px', color: '#e9d5ff', wordWrap: {width: 65}, align: 'center'}).setOrigin(0.5)
      
      // Progress indicator
      const progressText = progress.score > 0 ? `${progress.score}/${gradeData.questions.length}` : 'Start'
      const progressColor = progress.score > 0 ? '#8b5cf6' : '#e9d5ff'
      
      this.add.text(x, y + 15, progressText, {fontSize: '8px', color: progressColor, fontStyle: 'bold'}).setOrigin(0.5)
      
      // Completion indicator
      if (progress.score === gradeData.questions.length) {
        this.add.text(x, y + 25, '✅', {fontSize: '10px', color: '#8b5cf6'}).setOrigin(0.5)
      }
      
      card.on('pointerdown', () => { 
        // Ensure complete state reset for grade isolation
        this.registry.set('selectedGrade', grade)
        this.registry.remove('currentScore')
        this.registry.remove('currentQuestionIndex')
        this.scene.start('CodeTopicScene') 
      })
    })
  }
}

class CodeTopicScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CodeTopicScene' })
  }

  async create() {
    const { width, height } = this.scale
    const selectedGrade = this.registry.get('selectedGrade') as number
    const gradeData = CODE_DATA[selectedGrade]
    const userId = this.registry.get('userId') || 'anonymous'
    
    this.add.rectangle(width/2, height/2, width, height, 0x4c1d95)
    
    // Back button
    const backButton = this.add.rectangle(50, 30, 80, 30, 0x6b7280).setInteractive()
    this.add.text(50, 30, '← Back', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5)
    backButton.on('pointerdown', () => this.scene.start('CodeMainMenuScene'))
    
    // Title
    this.add.text(width/2, 50, `Grade ${selectedGrade}: ${gradeData.topic}`, {
      fontSize: '18px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    // Load progress
    const topicId = gradeData.topic.toLowerCase().replace(/\s+/g, '-')
    const progress = await loadCodeProgress(userId, selectedGrade, topicId)
    
    // Topic card
    const topicCard = this.add.rectangle(width/2, height/2, 280, 120, 0x7c3aed)
      .setInteractive()
      .setStrokeStyle(3, progress.score > 0 ? 0x8b5cf6 : 0x94a3b8)
    
    // Hover effect
    topicCard.on('pointerover', () => {
      topicCard.setFillStyle(0x8b5cf6)
      this.tweens.add({
        targets: topicCard,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 200
      })
    })
    
    topicCard.on('pointerout', () => {
      topicCard.setFillStyle(0x7c3aed)
      this.tweens.add({
        targets: topicCard,
        scaleX: 1,
        scaleY: 1,
        duration: 200
      })
    })
    
    // Topic content
    this.add.text(width/2, height/2 - 25, '💻 ' + gradeData.topic, {
      fontSize: '16px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, height/2, `${gradeData.questions.length} Questions`, {
      fontSize: '12px', color: '#e9d5ff', fontFamily: 'Arial'
    }).setOrigin(0.5)
    
    const progressText = progress.score > 0 ? `Progress: ${progress.score}/${gradeData.questions.length}` : 'Not Started'
    this.add.text(width/2, height/2 + 20, progressText, {
      fontSize: '12px', color: progress.score > 0 ? '#8b5cf6' : '#e9d5ff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, height/2 + 40, 'Click to Start!', {
      fontSize: '10px', color: '#c4b5fd', fontFamily: 'Arial'
    }).setOrigin(0.5)
    
    topicCard.on('pointerdown', () => {
      this.scene.start('CodeGameScene')
    })
  }
}

// Enhanced Code Challenge Game Scene with Complete Grade Isolation
class CodeGameScene extends Phaser.Scene {
  private currentQuestionIndex: number = 0
  private score: number = 0
  private timer: number = 30
  private userInput: string = ''
  private isAnswered: boolean = false
  private questions: {question: string, answer: string}[] = []
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
    super({ key: 'CodeGameScene' })
  }

  preload() {
    // Create simple audio tones for feedback
    this.load.audio('codeCorrect', ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
    this.load.audio('codeIncorrect', ['data:audio/wav;base64,UklGRkIEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YR4EAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
  }

  async create() {
    const { width, height } = this.scale
    const selectedGrade = this.registry.get('selectedGrade') as number
    const gradeData = CODE_DATA[selectedGrade]
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
    const progress = await loadCodeProgress(this.userId, this.grade, this.topicId)
    this.score = progress.score || 0
    
    // Ensure complete scene isolation - clear all previous elements
    this.children.removeAll()
    
    this.add.rectangle(width/2, height/2, width, height, 0xfaf5ff)
    
    // Back button with grade isolation
    const backButton = this.add.rectangle(50, 30, 80, 30, 0x6b7280).setInteractive()
    this.add.text(50, 30, '← Back', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5)
    backButton.on('pointerdown', () => {
      this.cleanup()
      // Clear grade-specific data when going back
      this.registry.remove('currentScore')
      this.registry.remove('currentQuestionIndex')
      this.scene.start('CodeTopicScene')
    })
    
    // Header with grade-specific information
    this.add.text(width/2, 40, `💻 Code Challenge - Grade ${selectedGrade}`, {
      fontSize: '14px', color: '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, 58, gradeData.topic, {
      fontSize: '12px', color: '#7c3aed'
    }).setOrigin(0.5)
    
    // Progress indicator specific to this grade
    this.scoreText = this.add.text(width - 50, 40, `Score: ${this.score}/${this.questions.length}`, {
      fontSize: '12px', color: '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.timerText = this.add.text(width/2, 80, `Time: ${this.timer}s`, {
      fontSize: '14px', color: '#dc2626', fontStyle: 'bold'
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
      fontSize: '12px', color: '#1f2937', fontStyle: 'bold',
      wordWrap: { width: width - 40 }, align: 'center'
    }).setOrigin(0.5)
    this.questionContainer.add(questionText)

    // Input area
    const inputLabel = this.add.text(width/2, height * 0.5, 'Type your answer:', {
      fontSize: '10px', color: '#374151'
    }).setOrigin(0.5)
    this.questionContainer.add(inputLabel)

    const inputBox = this.add.rectangle(width/2, height * 0.6, 250, 30, 0xffffff)
      .setStrokeStyle(2, 0x8b5cf6)
    this.questionContainer.add(inputBox)

    this.inputText = this.add.text(width/2, height * 0.6, '|', {
      fontSize: '12px', color: '#1f2937'
    }).setOrigin(0.5)
    this.questionContainer.add(this.inputText)

    const enterHint = this.add.text(width/2, height * 0.7, 'Press ENTER to submit', {
      fontSize: '10px', color: '#6b7280'
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
        this.sound.play('codeCorrect', { volume: 0.3 })
      } catch (e) {
        console.log('Audio not available')
      }
      this.showCorrectFeedback()
      
      // Trigger celebration animation on every correct answer
      this.triggerPerfectScoreAnimation()
      
      await saveCodeProgress(this.userId, this.grade, this.topicId, this.score, this.currentQuestionIndex + 1)
    } else {
      try {
        this.sound.play('codeIncorrect', { volume: 0.3 })
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
      fontSize: '18px', color: '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5)
    feedbackContainer.add(awesomeText)
    
    // Checkmark
    const correctText = this.add.text(width/2, height * 0.8, '✅ Correct!', {
      fontSize: '16px', color: '#7c3aed', fontStyle: 'bold'
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
    const nextButton = this.add.rectangle(width/2, height * 0.9, 100, 30, 0x8b5cf6).setInteractive()
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
    const resultsBg = this.add.rectangle(width/2, height * 0.85, width - 20, height * 0.25, 0x7c3aed, 0.1)
      .setStrokeStyle(2, 0x8b5cf6)
    this.resultContainer.add(resultsBg)

    const titleText = this.add.text(width/2, height * 0.75, '🏆 Challenge Complete!', {
      fontSize: '16px', color: '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5)
    this.resultContainer.add(titleText)

    const scoreText = this.add.text(width/2, height * 0.8, `Score: ${this.score}/${this.questions.length} (${percentage}%)`, {
      fontSize: '14px', color: '#1f2937'
    }).setOrigin(0.5)
    this.resultContainer.add(scoreText)
    
    let message = ''
    if (percentage >= 90) message = 'Outstanding Coder! 🌟'
    else if (percentage >= 70) message = 'Great Programming! 🎉'
    else if (percentage >= 50) message = 'Good Logic! 💪'
    else message = 'Keep Coding! 💻'
    
    const messageText = this.add.text(width/2, height * 0.85, message, {
      fontSize: '11px', color: '#6b7280'
    }).setOrigin(0.5)
    this.resultContainer.add(messageText)

    const tryAgainButton = this.add.rectangle(width/2 - 50, height * 0.92, 80, 25, 0x8b5cf6).setInteractive()
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
      this.scene.start('CodeTopicScene')
    })
  }

  triggerPerfectScoreAnimation() {
    const { width, height } = this.scale
    
    // Create balloon animation container
    const balloonContainer = this.add.container(0, 0)
    
    // Add "Awesome Job!" text that scales up and fades out over 2 seconds
    const awesomeText = this.add.text(width/2, height * 0.4, 'Awesome Job!', {
      fontSize: '24px', color: '#7c3aed', fontStyle: 'bold'
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
      await saveCodeProgress(this.userId, this.grade, this.topicId, 0, 0)
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
const CodeChallengeSection: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { currentUser } = useAuth()

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">💻 Code Challenge</h1>
          <p className="text-gray-600 text-sm mb-6">Please log in to access the Code Challenge and track your progress.</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (containerRef.current && !gameRef.current && currentUser) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 350,
        height: 400,
        parent: containerRef.current,
        backgroundColor: '#581c87',
        scene: [CodeMainMenuScene, CodeTopicScene, CodeGameScene],
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
  }, [currentUser])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">💻 Code Challenge</h1>
          <p className="text-gray-600">Master programming through interactive challenges!</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              30-second timers
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Grade-specific topics
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Progress tracking
            </span>
          </div>
        </div>
        
        <div 
          ref={containerRef} 
          className="border-4 border-purple-200 rounded-xl overflow-hidden shadow-lg bg-purple-100"
          style={{ width: '350px', height: '400px', margin: '0 auto', maxWidth: '100%' }}
        />
        
        <div className="text-center mt-4 space-y-2">
          <div className="text-sm text-gray-500">
            🎮 Type answers • ⏱️ 30 seconds per question • 💻 Programming mastery
          </div>
          <div className="text-xs text-gray-400">
            Built with Phaser.js & Firebase • Grades 6-12 Available
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeChallengeSection