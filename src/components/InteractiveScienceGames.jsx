import React, { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { getAuth, signInWithCustomToken } from 'firebase/auth'

// Firebase configuration using global variables
const firebaseConfig = window.__firebase_config || {
  apiKey: "demo-key",
  authDomain: "demo.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

// Biology Lab Data for Grades 6-12
const BIOLOGY_DATA = {
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

// Code Challenge Data for Grades 6-12
const CODE_DATA = {
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

// Firestore utility functions for Biology Lab
const saveBiologyProgress = async (userId, grade, topicId, score, questionsAnswered) => {
  try {
    if (!userId || userId === 'anonymous') return
    await setDoc(doc(db, `game-progress/${userId}/biology-lab/${grade}/${topicId}`), {
      score, questionsAnswered, lastUpdated: new Date().toISOString(), grade, topicId
    }, { merge: true })
    console.log(`Biology Lab progress saved: Grade ${grade} - Score: ${score}/${questionsAnswered}`)
  } catch (error) {
    console.error('Error saving biology progress:', error)
  }
}

const loadBiologyProgress = async (userId, grade, topicId) => {
  try {
    if (!userId || userId === 'anonymous') return { score: 0, questionsAnswered: 0 }
    const docSnap = await getDoc(doc(db, `game-progress/${userId}/biology-lab/${grade}/${topicId}`))
    if (docSnap.exists()) {
      return docSnap.data()
    }
    return { score: 0, questionsAnswered: 0 }
  } catch (error) {
    console.error('Error loading biology progress:', error)
    return { score: 0, questionsAnswered: 0 }
  }
}

// Firestore utility functions for Code Challenge
const saveCodeProgress = async (userId, grade, topicId, score, questionsAnswered) => {
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

const loadCodeProgress = async (userId, grade, topicId) => {
  try {
    if (!userId || userId === 'anonymous') return { score: 0, questionsAnswered: 0 }
    const docSnap = await getDoc(doc(db, `game-progress/${userId}/code-challenge/${grade}/${topicId}`))
    if (docSnap.exists()) {
      return docSnap.data()
    }
    return { score: 0, questionsAnswered: 0 }
  } catch (error) {
    console.error('Error loading code progress:', error)
    return { score: 0, questionsAnswered: 0 }
  }
}

// Main Menu Scene
class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' })
  }

  create() {
    const { width, height } = this.scale
    
    this.add.rectangle(width/2, height/2, width, height, 0x1e293b)
    
    this.add.text(width/2, 50, '🎮 Interactive Science Games', {
      fontSize: '18px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, 80, 'Choose Your Adventure!', {
      fontSize: '12px', color: '#94a3b8', fontFamily: 'Arial'
    }).setOrigin(0.5)
    
    // Biology Lab Button
    const biologyButton = this.add.rectangle(width/2, height/2 - 40, 250, 60, 0x065f46)
      .setInteractive()
      .setStrokeStyle(3, 0x22c55e)
    
    biologyButton.on('pointerover', () => {
      biologyButton.setFillStyle(0x16a34a)
      this.tweens.add({
        targets: biologyButton, scaleX: 1.05, scaleY: 1.05, duration: 200
      })
    })
    
    biologyButton.on('pointerout', () => {
      biologyButton.setFillStyle(0x065f46)
      this.tweens.add({
        targets: biologyButton, scaleX: 1, scaleY: 1, duration: 200
      })
    })
    
    this.add.text(width/2, height/2 - 50, '🔬 Enter Biology Lab', {
      fontSize: '14px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, height/2 - 30, 'Explore life sciences through interactive experiments', {
      fontSize: '10px', color: '#d1fae5', fontFamily: 'Arial'
    }).setOrigin(0.5)
    
    biologyButton.on('pointerdown', () => {
      this.scene.start('BiologyMainMenuScene')
    })
    
    // Code Challenge Button
    const codeButton = this.add.rectangle(width/2, height/2 + 40, 250, 60, 0x581c87)
      .setInteractive()
      .setStrokeStyle(3, 0x8b5cf6)
    
    codeButton.on('pointerover', () => {
      codeButton.setFillStyle(0x7c3aed)
      this.tweens.add({
        targets: codeButton, scaleX: 1.05, scaleY: 1.05, duration: 200
      })
    })
    
    codeButton.on('pointerout', () => {
      codeButton.setFillStyle(0x581c87)
      this.tweens.add({
        targets: codeButton, scaleX: 1, scaleY: 1, duration: 200
      })
    })
    
    this.add.text(width/2, height/2 + 30, '💻 Start Code Challenge', {
      fontSize: '14px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, height/2 + 50, 'Master programming through interactive challenges', {
      fontSize: '10px', color: '#e9d5ff', fontFamily: 'Arial'
    }).setOrigin(0.5)
    
    codeButton.on('pointerdown', () => {
      this.scene.start('CodeMainMenuScene')
    })
  }
}

// Biology Lab Phaser Scenes
class BiologyMainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BiologyMainMenuScene' })
  }

  preload() {
    // Create simple audio data URLs for feedback sounds
    this.load.audio('biologyCorrect', ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
    this.load.audio('biologyIncorrect', ['data:audio/wav;base64,UklGRkIEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YR4EAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
  }

  async create() {
    const { width, height } = this.scale
    const userId = this.registry.get('userId') || 'demo-user'
    
    this.add.rectangle(width/2, height/2, width, height, 0x065f46)
    this.add.text(width/2, 40, '🔬 Biology Lab', {
      fontSize: '24px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, 65, 'Select Your Grade (6-12)', {
      fontSize: '14px', color: '#d1fae5', fontFamily: 'Arial'
    }).setOrigin(0.5)

    const grades = [6, 7, 8, 9, 10, 11, 12]
    
    for (let i = 0; i < grades.length; i++) {
      const grade = grades[i]
      const gradeData = BIOLOGY_DATA[grade]
      const col = i % 4
      const row = Math.floor(i / 4)
      const x = 60 + col * 80
      const y = 120 + row * 80
      
      const topicId = gradeData.topic.toLowerCase().replace(/\s+/g, '-')
      const progress = await loadBiologyProgress(userId, grade, topicId)
      
      const card = this.add.rectangle(x, y, 70, 70, 0x16a34a)
        .setInteractive()
        .setStrokeStyle(2, progress.score > 0 ? 0x22c55e : 0x94a3b8)
      
      card.on('pointerover', () => {
        card.setFillStyle(0x22c55e)
        this.tweens.add({
          targets: card, scaleX: 1.1, scaleY: 1.1, duration: 200, ease: 'Power2.easeOut'
        })
      })
      
      card.on('pointerout', () => {
        card.setFillStyle(0x16a34a)
        this.tweens.add({
          targets: card, scaleX: 1, scaleY: 1, duration: 200, ease: 'Power2.easeOut'
        })
      })
      
      this.add.text(x, y - 20, `Grade ${grade}`, {
        fontSize: '12px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5)
      
      this.add.text(x, y - 5, gradeData.topic, {
        fontSize: '8px', color: '#d1fae5', fontFamily: 'Arial',
        wordWrap: { width: 65 }, align: 'center'
      }).setOrigin(0.5)
      
      const progressText = progress.score > 0 ? `${progress.score}/${gradeData.questions.length}` : 'Start'
      this.add.text(x, y + 15, progressText, {
        fontSize: '8px', color: progress.score > 0 ? '#22c55e' : '#d1fae5', 
        fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5)
      
      if (progress.score === gradeData.questions.length) {
        this.add.text(x, y + 25, '✅', { fontSize: '10px', color: '#22c55e' }).setOrigin(0.5)
      }
      
      card.on('pointerdown', () => {
        this.registry.set('selectedGrade', grade)
        this.scene.start('BiologyGameScene')
      })
    }
    
    // Back button
    const backButton = this.add.rectangle(50, 30, 80, 30, 0x6b7280).setInteractive()
    this.add.text(50, 30, '← Back', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5)
    backButton.on('pointerdown', () => {
      this.scene.start('MainMenuScene')
    })
  }
}

class BiologyGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BiologyGameScene' })
    this.currentQuestionIndex = 0
    this.score = 0
    this.userInput = ''
    this.isAnswered = false
    this.questions = []
    this.timerEvent = null
    this.inputText = null
    this.scoreText = null
    this.userId = ''
    this.grade = 0
    this.topicId = ''
  }

  async create() {
    const { width, height } = this.scale
    const selectedGrade = this.registry.get('selectedGrade')
    const gradeData = BIOLOGY_DATA[selectedGrade]
    this.questions = gradeData.questions
    this.userId = this.registry.get('userId') || 'demo-user'
    this.grade = selectedGrade
    this.topicId = gradeData.topic.toLowerCase().replace(/\s+/g, '-')
    
    const progress = await loadBiologyProgress(this.userId, this.grade, this.topicId)
    this.score = progress.score || 0
    
    this.add.rectangle(width/2, height/2, width, height, 0xf0fdf4)
    
    const backButton = this.add.rectangle(50, 30, 80, 30, 0x6b7280).setInteractive()
    this.add.text(50, 30, '← Back', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5)
    backButton.on('pointerdown', () => {
      this.cleanup()
      this.scene.start('BiologyMainMenuScene')
    })
    
    this.add.text(width/2, 40, `🔬 Biology Lab - Grade ${selectedGrade}`, {
      fontSize: '14px', color: '#15803d', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.scoreText = this.add.text(width - 50, 40, `Score: ${this.score}/${this.questions.length}`, {
      fontSize: '12px', color: '#15803d', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.input.keyboard?.on('keydown', this.handleKeyPress, this)
    this.displayQuestion()
  }

  displayQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.showResults()
      return
    }

    const { width, height } = this.scale
    const question = this.questions[this.currentQuestionIndex]
    
    this.isAnswered = false
    this.userInput = ''

    this.children.list.forEach(child => {
      if (child.questionElement) child.destroy()
    })

    this.add.text(width/2, height * 0.3, question.question, {
      fontSize: '12px', color: '#1f2937', fontStyle: 'bold',
      wordWrap: { width: width - 40 }, align: 'center'
    }).setOrigin(0.5).setData('questionElement', true)

    this.add.text(width/2, height * 0.5, 'Type your answer:', {
      fontSize: '10px', color: '#374151'
    }).setOrigin(0.5).setData('questionElement', true)

    this.add.rectangle(width/2, height * 0.6, 250, 30, 0xffffff)
      .setStrokeStyle(2, 0x22c55e).setData('questionElement', true)

    this.inputText = this.add.text(width/2, height * 0.6, '|', {
      fontSize: '12px', color: '#1f2937'
    }).setOrigin(0.5).setData('questionElement', true)

    this.add.text(width/2, height * 0.7, 'Press ENTER to submit', {
      fontSize: '10px', color: '#6b7280'
    }).setOrigin(0.5).setData('questionElement', true)
  }

  handleKeyPress = (event) => {
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

  showCorrectFeedback() {
    const { width, height } = this.scale
    
    const motivationalText = this.add.text(width/2, height * 0.75, 'Awesome Job!', {
      fontSize: '14px', color: '#15803d', fontStyle: 'bold'
    }).setOrigin(0.5).setData('questionElement', true)
    
    const correctText = this.add.text(width/2, height * 0.8, '✅ Correct!', {
      fontSize: '18px', color: '#15803d', fontStyle: 'bold'
    }).setOrigin(0.5).setData('questionElement', true)

    this.tweens.add({
      targets: correctText, scaleX: 1.3, scaleY: 1.3, duration: 200,
      yoyo: true, repeat: 1, ease: 'Bounce.easeOut'
    })
    
    // Confetti effect
    for (let i = 0; i < 10; i++) {
      const confetti = this.add.rectangle(
        width/2 + (Math.random() - 0.5) * 80, height * 0.8, 3, 3, 0x22c55e
      ).setData('questionElement', true)
      
      this.tweens.add({
        targets: confetti,
        x: confetti.x + (Math.random() - 0.5) * 150,
        y: confetti.y + Math.random() * 80 + 40,
        rotation: Math.random() * Math.PI * 2,
        alpha: 0, duration: 800 + Math.random() * 400, ease: 'Power2.easeOut'
      })
    }
  }

  showIncorrectFeedback(correctAnswer) {
    const { width, height } = this.scale
    
    this.add.text(width/2, height * 0.75, 'Try Again', {
      fontSize: '14px', color: '#dc2626', fontStyle: 'bold'
    }).setOrigin(0.5).setData('questionElement', true)
    
    this.add.text(width/2, height * 0.8, '❌ Incorrect!', {
      fontSize: '16px', color: '#dc2626', fontStyle: 'bold'
    }).setOrigin(0.5).setData('questionElement', true)

    this.add.text(width/2, height * 0.85, `Answer: ${correctAnswer}`, {
      fontSize: '12px', color: '#6b7280'
    }).setOrigin(0.5).setData('questionElement', true)
  }

  showNextButton() {
    const { width, height } = this.scale
    
    const nextButton = this.add.rectangle(width/2, height * 0.9, 100, 30, 0x22c55e)
      .setInteractive().setData('questionElement', true)
    const buttonText = this.currentQuestionIndex < this.questions.length - 1 ? 'Next' : 'Results'
    
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

    this.children.list.forEach(child => {
      if (child.questionElement) child.destroy()
    })

    this.add.text(width/2, height * 0.3, '🏆 Lab Complete!', {
      fontSize: '18px', color: '#15803d', fontStyle: 'bold'
    }).setOrigin(0.5)

    this.add.text(width/2, height * 0.45, `Score: ${this.score}/${this.questions.length} (${percentage}%)`, {
      fontSize: '14px', color: '#1f2937'
    }).setOrigin(0.5)

    const backButton = this.add.rectangle(width/2, height * 0.75, 120, 30, 0x6b7280).setInteractive()
    this.add.text(width/2, height * 0.75, 'Back to Grades', {
      fontSize: '10px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5)

    backButton.on('pointerdown', () => {
      this.cleanup()
      this.scene.start('BiologyMainMenuScene')
    })
  }

  cleanup() {
    if (this.timerEvent) {
      this.timerEvent.remove()
      this.timerEvent = null
    }
    if (this.input.keyboard) {
      this.input.keyboard.off('keydown', this.handleKeyPress, this)
    }
  }
}

// Code Challenge Scenes
class CodeMainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CodeMainMenuScene' })
  }

  preload() {
    this.load.audio('codeCorrect', ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
    this.load.audio('codeIncorrect', ['data:audio/wav;base64,UklGRkIEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YR4EAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
  }

  async create() {
    const { width, height } = this.scale
    const userId = this.registry.get('userId') || 'demo-user'
    
    this.add.rectangle(width/2, height/2, width, height, 0x581c87)
    this.add.text(width/2, 40, '💻 Code Challenge', {
      fontSize: '24px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, 65, 'Select Your Grade (6-12)', {
      fontSize: '14px', color: '#e9d5ff', fontFamily: 'Arial'
    }).setOrigin(0.5)

    const grades = [6, 7, 8, 9, 10, 11, 12]
    
    for (let i = 0; i < grades.length; i++) {
      const grade = grades[i]
      const gradeData = CODE_DATA[grade]
      const col = i % 4
      const row = Math.floor(i / 4)
      const x = 60 + col * 80
      const y = 120 + row * 80
      
      const topicId = gradeData.topic.toLowerCase().replace(/\s+/g, '-')
      const progress = await loadCodeProgress(userId, grade, topicId)
      
      const card = this.add.rectangle(x, y, 70, 70, 0x7c3aed)
        .setInteractive()
        .setStrokeStyle(2, progress.score > 0 ? 0x8b5cf6 : 0x94a3b8)
      
      card.on('pointerover', () => {
        card.setFillStyle(0x8b5cf6)
        this.tweens.add({
          targets: card, scaleX: 1.1, scaleY: 1.1, duration: 200, ease: 'Power2.easeOut'
        })
      })
      
      card.on('pointerout', () => {
        card.setFillStyle(0x7c3aed)
        this.tweens.add({
          targets: card, scaleX: 1, scaleY: 1, duration: 200, ease: 'Power2.easeOut'
        })
      })
      
      this.add.text(x, y - 20, `Grade ${grade}`, {
        fontSize: '12px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5)
      
      this.add.text(x, y - 5, gradeData.topic, {
        fontSize: '8px', color: '#e9d5ff', fontFamily: 'Arial',
        wordWrap: { width: 65 }, align: 'center'
      }).setOrigin(0.5)
      
      const progressText = progress.score > 0 ? `${progress.score}/${gradeData.questions.length}` : 'Start'
      this.add.text(x, y + 15, progressText, {
        fontSize: '8px', color: progress.score > 0 ? '#8b5cf6' : '#e9d5ff',
        fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5)
      
      if (progress.score === gradeData.questions.length) {
        this.add.text(x, y + 25, '✅', { fontSize: '10px', color: '#8b5cf6' }).setOrigin(0.5)
      }
      
      card.on('pointerdown', () => {
        this.registry.set('selectedGrade', grade)
        this.scene.start('CodeGameScene')
      })
    }
    
    const backButton = this.add.rectangle(50, 30, 80, 30, 0x6b7280).setInteractive()
    this.add.text(50, 30, '← Back', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5)
    backButton.on('pointerdown', () => {
      this.scene.start('MainMenuScene')
    })
  }
}

class CodeGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CodeGameScene' })
    this.currentQuestionIndex = 0
    this.score = 0
    this.userInput = ''
    this.isAnswered = false
    this.questions = []
    this.inputText = null
    this.scoreText = null
    this.userId = ''
    this.grade = 0
    this.topicId = ''
  }

  async create() {
    const { width, height } = this.scale
    const selectedGrade = this.registry.get('selectedGrade')
    const gradeData = CODE_DATA[selectedGrade]
    this.questions = gradeData.questions
    this.userId = this.registry.get('userId') || 'demo-user'
    this.grade = selectedGrade
    this.topicId = gradeData.topic.toLowerCase().replace(/\s+/g, '-')
    
    const progress = await loadCodeProgress(this.userId, this.grade, this.topicId)
    this.score = progress.score || 0
    
    this.add.rectangle(width/2, height/2, width, height, 0xfaf5ff)
    
    const backButton = this.add.rectangle(50, 30, 80, 30, 0x6b7280).setInteractive()
    this.add.text(50, 30, '← Back', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5)
    backButton.on('pointerdown', () => {
      this.cleanup()
      this.scene.start('CodeMainMenuScene')
    })
    
    this.add.text(width/2, 40, `💻 Code Challenge - Grade ${selectedGrade}`, {
      fontSize: '14px', color: '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.scoreText = this.add.text(width - 50, 40, `Score: ${this.score}/${this.questions.length}`, {
      fontSize: '12px', color: '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.input.keyboard?.on('keydown', this.handleKeyPress, this)
    this.displayQuestion()
  }

  displayQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.showResults()
      return
    }

    const { width, height } = this.scale
    const question = this.questions[this.currentQuestionIndex]
    
    this.isAnswered = false
    this.userInput = ''

    this.children.list.forEach(child => {
      if (child.questionElement) child.destroy()
    })

    this.add.text(width/2, height * 0.3, question.question, {
      fontSize: '12px', color: '#1f2937', fontStyle: 'bold',
      wordWrap: { width: width - 40 }, align: 'center'
    }).setOrigin(0.5).setData('questionElement', true)

    this.add.text(width/2, height * 0.5, 'Type your answer:', {
      fontSize: '10px', color: '#374151'
    }).setOrigin(0.5).setData('questionElement', true)

    this.add.rectangle(width/2, height * 0.6, 250, 30, 0xffffff)
      .setStrokeStyle(2, 0x8b5cf6).setData('questionElement', true)

    this.inputText = this.add.text(width/2, height * 0.6, '|', {
      fontSize: '12px', color: '#1f2937'
    }).setOrigin(0.5).setData('questionElement', true)

    this.add.text(width/2, height * 0.7, 'Press ENTER to submit', {
      fontSize: '10px', color: '#6b7280'
    }).setOrigin(0.5).setData('questionElement', true)
  }

  handleKeyPress = (event) => {
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

  showCorrectFeedback() {
    const { width, height } = this.scale
    
    const motivationalText = this.add.text(width/2, height * 0.75, 'Awesome Job!', {
      fontSize: '14px', color: '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5).setData('questionElement', true)
    
    const correctText = this.add.text(width/2, height * 0.8, '✅ Correct!', {
      fontSize: '18px', color: '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5).setData('questionElement', true)

    this.tweens.add({
      targets: correctText, scaleX: 1.3, scaleY: 1.3, duration: 200,
      yoyo: true, repeat: 1, ease: 'Bounce.easeOut'
    })
    
    for (let i = 0; i < 10; i++) {
      const confetti = this.add.rectangle(
        width/2 + (Math.random() - 0.5) * 80, height * 0.8, 3, 3, 0x8b5cf6
      ).setData('questionElement', true)
      
      this.tweens.add({
        targets: confetti,
        x: confetti.x + (Math.random() - 0.5) * 150,
        y: confetti.y + Math.random() * 80 + 40,
        rotation: Math.random() * Math.PI * 2,
        alpha: 0, duration: 800 + Math.random() * 400, ease: 'Power2.easeOut'
      })
    }
  }

  showIncorrectFeedback(correctAnswer) {
    const { width, height } = this.scale
    
    this.add.text(width/2, height * 0.75, 'Try Again', {
      fontSize: '14px', color: '#dc2626', fontStyle: 'bold'
    }).setOrigin(0.5).setData('questionElement', true)
    
    this.add.text(width/2, height * 0.8, '❌ Incorrect!', {
      fontSize: '16px', color: '#dc2626', fontStyle: 'bold'
    }).setOrigin(0.5).setData('questionElement', true)

    this.add.text(width/2, height * 0.85, `Answer: ${correctAnswer}`, {
      fontSize: '12px', color: '#6b7280'
    }).setOrigin(0.5).setData('questionElement', true)
  }

  showNextButton() {
    const { width, height } = this.scale
    
    const nextButton = this.add.rectangle(width/2, height * 0.9, 100, 30, 0x8b5cf6)
      .setInteractive().setData('questionElement', true)
    const buttonText = this.currentQuestionIndex < this.questions.length - 1 ? 'Next' : 'Results'
    
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

    this.children.list.forEach(child => {
      if (child.questionElement) child.destroy()
    })

    this.add.text(width/2, height * 0.3, '🏆 Challenge Complete!', {
      fontSize: '18px', color: '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5)

    this.add.text(width/2, height * 0.45, `Score: ${this.score}/${this.questions.length} (${percentage}%)`, {
      fontSize: '14px', color: '#1f2937'
    }).setOrigin(0.5)

    const backButton = this.add.rectangle(width/2, height * 0.75, 120, 30, 0x6b7280).setInteractive()
    this.add.text(width/2, height * 0.75, 'Back to Grades', {
      fontSize: '10px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5)

    backButton.on('pointerdown', () => {
      this.cleanup()
      this.scene.start('CodeMainMenuScene')
    })
  }

  cleanup() {
    if (this.input.keyboard) {
      this.input.keyboard.off('keydown', this.handleKeyPress, this)
    }
  }
}

// Main React Component
const InteractiveScienceGames = () => {
  const gameRef = useRef(null)
  const containerRef = useRef(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (window.__initial_auth_token) {
          const userCredential = await signInWithCustomToken(auth, window.__initial_auth_token)
          setCurrentUser(userCredential.user)
        } else {
          setCurrentUser({ uid: 'demo-user', email: 'demo@example.com' })
        }
      } catch (error) {
        console.log('Auth initialization failed, using demo mode:', error)
        setCurrentUser({ uid: 'demo-user', email: 'demo@example.com' })
      } finally {
        setIsLoading(false)
      }
    }
    initAuth()
  }, [])

  useEffect(() => {
    if (containerRef.current && !gameRef.current && currentUser && !isLoading) {
      const config = {
        type: Phaser.AUTO,
        width: 350,
        height: 400,
        parent: containerRef.current,
        backgroundColor: '#1e293b',
        scene: [MainMenuScene, BiologyMainMenuScene, BiologyGameScene, CodeMainMenuScene, CodeGameScene],
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
        input: { keyboard: true },
        physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } }
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
  }, [currentUser, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎮 Interactive Science Games</h2>
          <p className="text-gray-600 text-sm mb-6">Loading your personalized gaming experience...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎮 Interactive Science Games</h2>
          <p className="text-gray-600 text-sm mb-6">Please log in to access the games and track your progress.</p>
          <div className="animate-pulse bg-gray-200 h-4 rounded mb-4"></div>
          <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🎮 Interactive Science Games</h2>
          <p className="text-gray-600">Explore Biology and Code through hands-on learning!</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Biology Lab
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              Code Challenge
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Progress tracking
            </span>
          </div>
        </div>
        
        <div 
          ref={containerRef} 
          className="border-4 border-slate-200 rounded-xl overflow-hidden shadow-lg bg-slate-100"
          style={{ width: '350px', height: '400px', margin: '0 auto', maxWidth: '100%' }}
        />
        
        <div className="text-center mt-4 space-y-2">
          <div className="text-sm text-gray-500">
            🎮 Interactive games • 🔬 Biology Lab • 💻 Code Challenge
          </div>
          <div className="text-xs text-gray-400">
            Built with Phaser.js & Firebase • Grades 6-12 Available
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveScienceGames
