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
    
    this.add.rectangle(width/2, height/2, width, height, 0x1e40af)
    
    this.add.text(width/2, 50, '🎮 Mini-Games', {
      fontSize: '24px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, 80, 'Choose Your Game Adventure!', {
      fontSize: '12px', color: '#bfdbfe', fontFamily: 'Arial'
    }).setOrigin(0.5)
    
    // Biology Lab Section
    const biologyButton = this.add.rectangle(width/2, 140, 280, 40, 0x059669)
      .setInteractive()
      .setStrokeStyle(2, 0x10b981)
    
    biologyButton.on('pointerover', () => {
      biologyButton.setFillStyle(0x10b981)
      this.tweens.add({
        targets: biologyButton, scaleX: 1.05, scaleY: 1.05, duration: 200
      })
    })
    
    biologyButton.on('pointerout', () => {
      biologyButton.setFillStyle(0x059669)
      this.tweens.add({
        targets: biologyButton, scaleX: 1, scaleY: 1, duration: 200
      })
    })
    
    this.add.text(width/2, 140, '🔬 Enter Biology Lab', {
      fontSize: '14px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    biologyButton.on('pointerdown', () => {
      this.scene.start('BiologyMainMenuScene')
    })
    
    // Code Challenge Section
    const codeButton = this.add.rectangle(width/2, 190, 280, 40, 0x7c3aed)
      .setInteractive()
      .setStrokeStyle(2, 0x8b5cf6)
    
    codeButton.on('pointerover', () => {
      codeButton.setFillStyle(0x8b5cf6)
      this.tweens.add({
        targets: codeButton, scaleX: 1.05, scaleY: 1.05, duration: 200
      })
    })
    
    codeButton.on('pointerout', () => {
      codeButton.setFillStyle(0x7c3aed)
      this.tweens.add({
        targets: codeButton, scaleX: 1, scaleY: 1, duration: 200
      })
    })
    
    this.add.text(width/2, 190, '💻 Start Code Challenge', {
      fontSize: '14px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    codeButton.on('pointerdown', () => {
      this.scene.start('CodeMainMenuScene')
    })
    
    // Math Puzzle (Coming Soon)
    const mathButton = this.add.rectangle(width/2, 240, 280, 40, 0x6b7280)
      .setInteractive()
      .setStrokeStyle(2, 0x9ca3af)
    
    this.add.text(width/2, 240, '🧮 Math Puzzle (Coming Soon)', {
      fontSize: '14px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    mathButton.on('pointerover', () => {
      mathButton.setFillStyle(0x9ca3af)
    })
    
    mathButton.on('pointerout', () => {
      mathButton.setFillStyle(0x6b7280)
    })
    
    // Physics Simulator (Coming Soon)
    const physicsButton = this.add.rectangle(width/2, 290, 280, 40, 0x6b7280)
      .setInteractive()
      .setStrokeStyle(2, 0x9ca3af)
    
    this.add.text(width/2, 290, '⚡ Physics Simulator (Coming Soon)', {
      fontSize: '14px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    physicsButton.on('pointerover', () => {
      physicsButton.setFillStyle(0x9ca3af)
    })
    
    physicsButton.on('pointerout', () => {
      physicsButton.setFillStyle(0x6b7280)
    })
    
    // Chemistry Lab (Coming Soon)
    const chemButton = this.add.rectangle(width/2, 340, 280, 40, 0x6b7280)
      .setInteractive()
      .setStrokeStyle(2, 0x9ca3af)
    
    this.add.text(width/2, 340, '🧪 Chemistry Lab (Coming Soon)', {
      fontSize: '14px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    chemButton.on('pointerover', () => {
      chemButton.setFillStyle(0x9ca3af)
    })
    
    chemButton.on('pointerout', () => {
      chemButton.setFillStyle(0x6b7280)
    })
  }
}

// Biology Lab Phaser Scenes
class BiologyMainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BiologyMainMenuScene' })
  }

  preload() {
    this.load.audio('biologyCorrect', ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
    this.load.audio('biologyIncorrect', ['data:audio/wav;base64,UklGRkIEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YR4EAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
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
      const x = 60 + col * 70
      const y = 120 + row * 80
      
      const topicId = gradeData.topic.toLowerCase().replace(/\s+/g, '-')
      const progress = await loadBiologyProgress(userId, grade, topicId)
      
      const card = this.add.rectangle(x, y, 60, 60, 0x16a34a)
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
      
      this.add.text(x, y - 15, `Grade ${grade}`, {
        fontSize: '10px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5)
      
      this.add.text(x, y, gradeData.topic, {
        fontSize: '7px', color: '#d1fae5', fontFamily: 'Arial',
        wordWrap: { width: 55 }, align: 'center'
      }).setOrigin(0.5)
      
      const progressText = progress.score > 0 ? `${progress.score}/${gradeData.questions.length}` : 'Start'
      this.add.text(x, y + 15, progressText, {
        fontSize: '7px', color: progress.score > 0 ? '#22c55e' : '#d1fae5', 
        fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5)
      
      if (progress.score === gradeData.questions.length) {
        this.add.text(x, y + 25, '✅', { fontSize: '8px', color: '#22c55e' }).setOrigin(0.5)
      }
      
      card.on('pointerdown', () => {
        this.registry.set('selectedGrade', grade)
        this.scene.start('BiologyGameScene')
      })
    }
    
    // Back button
    const backButton = this.add.rectangle(50, 30, 80, 25, 0x6b7280).setInteractive()
    this.add.text(50, 30, '← Back', { fontSize: '10px', color: '#ffffff' }).setOrigin(0.5)
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
    
    const backButton = this.add.rectangle(50, 25, 70, 20, 0x6b7280).setInteractive()
    this.add.text(50, 25, '← Back', { fontSize: '10px', color: '#ffffff' }).setOrigin(0.5)
    backButton.on('pointerdown', () => {
      this.cleanup()
      this.scene.start('BiologyMainMenuScene')
    })
    
    this.add.text(width/2, 35, `🔬 Biology Lab - Grade ${selectedGrade}`, {
      fontSize: '12px', color: '#15803d', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.scoreText = this.add.text(width - 40, 35, `Score: ${this.score}/${this.questions.length}`, {
      fontSize: '10px', color: '#15803d', fontStyle: 'bold'
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

    this.add.text(width/2, height * 0.25, question.question, {
      fontSize: '11px', color: '#1f2937', fontStyle: 'bold',
      wordWrap: { width: width - 30 }, align: 'center'
    }).setOrigin(0.5).setData('questionElement', true)

    this.add.text(width/2, height * 0.45, 'Type your answer:', {
      fontSize: '9px', color: '#374151'
    }).setOrigin(0.5).setData('questionElement', true)

    this.add.rectangle(width/2, height * 0.55, 220, 25, 0xffffff)
      .setStrokeStyle(2, 0x22c55e).setData('questionElement', true)

    this.inputText = this.add.text(width/2, height * 0.55, '|', {
      fontSize: '10px', color: '#1f2937'
    }).setOrigin(0.5).setData('questionElement', true)

    this.add.text(width/2, height * 0.65, 'Press ENTER to submit', {
      fontSize: '8px', color: '#6b7280'
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
      fontSize: '12px', color: '#15803d', fontStyle: 'bold'
    }).setOrigin(0.5).setData('questionElement', true)
    
    const correctText = this.add.text(width/2, height * 0.8, '