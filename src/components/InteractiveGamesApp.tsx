import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { doc, setDoc, getDoc, increment } from 'firebase/firestore'
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

type GameType = {
  title: string
  grades: Record<number, GradeData>
}

type GameDataType = Record<'biology-lab' | 'code-challenge', GameType>

// Firestore utility functions for grade-isolated data storage
const getTopicDocPath = (userId: string, gameType: string, grade: number, topicId: string) => {
  return `game-progress/${userId}/grades/${gameType}/${grade}/${topicId}`
}

const saveProgress = async (userId: string, gameType: string, grade: number, topicId: string, score: number, questionsAnswered: number) => {
  try {
    if (!userId || userId === 'anonymous') {
      console.log('User not authenticated, skipping Firestore save')
      return
    }
    const docPath = getTopicDocPath(userId, gameType, grade, topicId)
    await setDoc(doc(db, docPath), {
      score,
      questionsAnswered,
      lastUpdated: new Date().toISOString(),
      gameType,
      grade,
      topicId
    }, { merge: true })
    console.log(`Progress saved: ${gameType} Grade ${grade} - Score: ${score}/${questionsAnswered}`)
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

const loadProgress = async (userId: string, gameType: string, grade: number, topicId: string) => {
  try {
    if (!userId || userId === 'anonymous') {
      console.log('User not authenticated, using default progress')
      return { score: 0, questionsAnswered: 0 }
    }
    const docPath = getTopicDocPath(userId, gameType, grade, topicId)
    const docSnap = await getDoc(doc(db, docPath))
    if (docSnap.exists()) {
      const data = docSnap.data()
      console.log(`Progress loaded: ${gameType} Grade ${grade} - Score: ${data.score}/${data.questionsAnswered}`)
      return data
    }
    return { score: 0, questionsAnswered: 0 }
  } catch (error) {
    console.error('Error loading progress:', error)
    return { score: 0, questionsAnswered: 0 }
  }
}

// Game Data - Biology and Code Challenge questions for all grades (6-12)
const GAME_DATA: GameDataType = {
  'biology-lab': {
    title: '🔬 Interactive Biology Lab',
    grades: {
      6: { topic: 'Plant Cells', questions: [
        { question: 'What is the rigid outer layer of a plant cell that provides support and protection?', answer: 'cell wall' },
        { question: 'What organelle is responsible for photosynthesis in a plant cell?', answer: 'chloroplast' },
        { question: 'What is the large central sac that stores water and nutrients in a mature plant cell?', answer: 'vacuole' }
      ]},
      7: { topic: 'Animal Classification', questions: [
        { question: 'What class of vertebrates has a backbone and lays eggs with a shell?', answer: 'reptiles' },
        { question: 'What group of animals includes jellyfish and corals?', answer: 'cnidaria' },
        { question: 'What term is used for an animal that eats both plants and animals?', answer: 'omnivore' }
      ]},
      8: { topic: 'Human Body Systems', questions: [
        { question: 'What system is responsible for breaking down food and absorbing nutrients?', answer: 'digestive system' },
        { question: 'What organ in the human body filters blood and produces urine?', answer: 'kidney' },
        { question: 'What is the main function of the circulatory system?', answer: 'transport blood' }
      ]},
      9: { topic: 'Digestive System', questions: [
        { question: 'In which part of the digestive system does most nutrient absorption occur?', answer: 'small intestine' },
        { question: 'What organ produces bile to help with fat digestion?', answer: 'liver' },
        { question: 'What is the muscular tube that connects the pharynx to the stomach?', answer: 'esophagus' }
      ]},
      10: { topic: 'Photosynthesis', questions: [
        { question: 'What gas is a primary reactant in photosynthesis?', answer: 'carbon dioxide' },
        { question: 'What is the main source of energy for the process of photosynthesis?', answer: 'sunlight' },
        { question: 'What is the name of the green pigment that absorbs light energy?', answer: 'chlorophyll' }
      ]},
      11: { topic: 'DNA Structure', questions: [
        { question: 'What two components make up the backbone of a DNA molecule?', answer: 'sugar and phosphate' },
        { question: 'What are the four nitrogenous bases found in DNA?', answer: 'adenine, thymine, cytosine, guanine' },
        { question: 'What type of bond holds the two strands of a DNA double helix together?', answer: 'hydrogen bond' }
      ]},
      12: { topic: 'Cell Division', questions: [
        { question: 'What is the process of cell division that results in four haploid cells?', answer: 'meiosis' },
        { question: 'What phase of mitosis is characterized by the alignment of chromosomes at the cell\'s center?', answer: 'metaphase' },
        { question: 'What is the name for the division of the cytoplasm during cell division?', answer: 'cytokinesis' }
      ]}
    }
  },
  'code-challenge': {
    title: '💻 Interactive Code Challenge',
    grades: {
      6: { topic: 'Basic Concepts', questions: [
        { question: 'What is the result of 5 + 3 in a programming language?', answer: '8' },
        { question: 'What is the keyword used to display text on the screen?', answer: 'print' },
        { question: 'What is a variable?', answer: 'a container for data' }
      ]},
      7: { topic: 'Expressions', questions: [
        { question: 'Evaluate the expression: (10 + 2) * 3', answer: '36' },
        { question: 'What is the value of 15 % 4?', answer: '3' },
        { question: 'What is the operator for not equal to?', answer: '!=' }
      ]},
      8: { topic: 'Loops & Logic', questions: [
        { question: 'What type of loop repeats a block of code a specific number of times?', answer: 'for loop' },
        { question: 'What is the result of `true && false`?', answer: 'false' },
        { question: 'What is the keyword used to stop a loop immediately?', answer: 'break' }
      ]},
      9: { topic: 'Code Reading', questions: [
        { question: 'What will this code print? `x = 5; if x > 3: print("Hello")`', answer: 'Hello' },
        { question: 'What is the final value of `count`? `count = 0; for i in range(3): count += 1`', answer: '3' },
        { question: 'What is the purpose of a comment in code?', answer: 'to explain code' }
      ]},
      10: { topic: 'Debugging', questions: [
        { question: 'What is a syntax error?', answer: 'a grammar mistake in code' },
        { question: 'What does a "ReferenceError" typically mean?', answer: 'a variable is not defined' },
        { question: 'What is the process of finding and fixing errors in code?', answer: 'debugging' }
      ]},
      11: { topic: 'OOP Concepts', questions: [
        { question: 'What is an object?', answer: 'an instance of a class' },
        { question: 'What concept allows a child class to inherit properties from a parent class?', answer: 'inheritance' },
        { question: 'What is a method?', answer: 'a function inside a class' }
      ]},
      12: { topic: 'Functions', questions: [
        { question: 'What keyword is used to define a function in Python?', answer: 'def' },
        { question: 'What is a function\'s return value?', answer: 'the output of a function' },
        { question: 'What is a parameter?', answer: 'a variable in a function definition' }
      ]}
    }
  }
}

// Main Menu Scene
class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' })
  }

  create() {
    const { width, height } = this.scale
    this.add.rectangle(width/2, height/2, width, height, 0x1f2937)
    
    this.add.text(width/2, height * 0.2, 'Interactive Learning Games', {
      fontSize: '28px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)

    const games = [
      { key: 'biology-lab', title: '🔬 Biology Lab', color: 0x22c55e },
      { key: 'code-challenge', title: '💻 Code Challenge', color: 0x8b5cf6 }
    ]

    games.forEach((game, index) => {
      const y = height * 0.4 + index * 100
      const button = this.add.rectangle(width/2, y, 300, 60, game.color).setInteractive()
      this.add.text(width/2, y, game.title, {
        fontSize: '20px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5)

      button.on('pointerdown', () => {
        this.registry.set('selectedGame', game.key)
        this.scene.start('GradeSelectionScene')
      })
    })
  }
}

// Grade Selection Scene with Individual Progress Loading
class GradeSelectionScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GradeSelectionScene' })
  }

  async create() {
    const { width, height } = this.scale
    const selectedGame = this.registry.get('selectedGame') as 'biology-lab' | 'code-challenge'
    const gameData = GAME_DATA[selectedGame]
    const userId = this.registry.get('userId') || 'anonymous'
    
    this.add.rectangle(width/2, height/2, width, height, selectedGame === 'biology-lab' ? 0x064e3b : 0x581c87)

    const backButton = this.add.rectangle(80, 50, 100, 40, 0x6b7280).setInteractive()
    this.add.text(80, 50, '← Back', { fontSize: '14px', color: '#ffffff' }).setOrigin(0.5)
    backButton.on('pointerdown', () => this.scene.start('MainMenuScene'))

    this.add.text(width/2, height * 0.15, gameData.title, {
      fontSize: '20px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold'
    }).setOrigin(0.5)

    this.add.text(width/2, height * 0.25, 'Select Grade (6-12)', {
      fontSize: '14px', color: '#ffffff', fontFamily: 'Arial'
    }).setOrigin(0.5)

    const grades = Object.keys(gameData.grades).map(Number)
    
    // Load progress for all grades asynchronously
    const gradeProgressPromises = grades.map(async (grade) => {
      const gradeData = gameData.grades[grade]
      const topicId = gradeData.topic.toLowerCase().replace(/\s+/g, '-')
      const progress = await loadProgress(userId, selectedGame, grade, topicId)
      return { grade, progress, gradeData }
    })
    
    const gradeProgresses = await Promise.all(gradeProgressPromises)
    
    gradeProgresses.forEach(({ grade, progress, gradeData }, index) => {
      const col = index % 4
      const row = Math.floor(index / 4)
      const x = width/2 - 120 + col * 80
      const y = height * 0.4 + row * 80
      
      // Create grade button with hover effects
      const button = this.add.rectangle(x, y, 70, 70, 0xffffff)
        .setInteractive()
        .setStrokeStyle(2, progress.score > 0 ? 0x22c55e : 0x94a3b8)
      
      // Add hover effects
      button.on('pointerover', () => {
        button.setFillStyle(0xf3f4f6)
        this.input.setDefaultCursor('pointer')
      })
      
      button.on('pointerout', () => {
        button.setFillStyle(0xffffff)
        this.input.setDefaultCursor('default')
      })
      
      // Grade number
      this.add.text(x, y - 15, `Grade ${grade}`, {
        fontSize: '12px', color: '#1f2937', fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5)
      
      // Topic name
      this.add.text(x, y, gradeData.topic, {
        fontSize: '8px', color: '#4b5563', fontFamily: 'Arial',
        wordWrap: { width: 65 }, align: 'center'
      }).setOrigin(0.5)
      
      // Progress indicator
      const progressText = progress.score > 0 ? `${progress.score}/${gradeData.questions.length}` : 'Not Started'
      const progressColor = progress.score > 0 ? '#22c55e' : '#9ca3af'
      
      this.add.text(x, y + 20, progressText, {
        fontSize: '8px', color: progressColor, fontFamily: 'Arial', fontStyle: 'bold'
      }).setOrigin(0.5)

      button.on('pointerdown', () => {
        this.registry.set('selectedGrade', grade)
        // Clear any existing progress from memory to ensure isolation
        this.registry.set('currentScore', 0)
        this.registry.set('currentQuestionIndex', 0)
        this.scene.start('GameScene')
      })
    })
  }
}

// Game Scene with Timer and Firestore Integration
class GameScene extends Phaser.Scene {
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
  private questionText: Phaser.GameObjects.Text | null = null
  private userId: string = ''
  private gameType: string = ''
  private grade: number = 0
  private topicId: string = ''

  constructor() {
    super({ key: 'GameScene' })
  }

  preload() {
    // Create simple audio tones for positive and negative feedback
    this.load.audio('correctSound', ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
    this.load.audio('incorrectSound', ['data:audio/wav;base64,UklGRkIEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YR4EAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCESFzPLNeSs='])
  }

  async create() {
    const { width, height } = this.scale
    const selectedGame = this.registry.get('selectedGame') as 'biology-lab' | 'code-challenge'
    const selectedGrade = this.registry.get('selectedGrade') as number
    const gameData = GAME_DATA[selectedGame]
    const gradeData = gameData.grades[selectedGrade]
    this.questions = gradeData.questions
    
    // Reset all game state for grade isolation
    this.currentQuestionIndex = 0
    this.timer = 30
    this.isAnswered = false
    this.userInput = ''
    
    // Set up game identifiers for Firestore
    this.userId = this.registry.get('userId') || 'anonymous'
    this.gameType = selectedGame
    this.grade = selectedGrade
    this.topicId = gradeData.topic.toLowerCase().replace(/\s+/g, '-')
    
    // Load existing progress from Firestore for THIS specific grade only
    const progress = await loadProgress(this.userId, this.gameType, this.grade, this.topicId)
    this.score = progress.score || 0
    
    // Clear the scene completely to prevent any cross-grade interference
    this.children.removeAll()
    
    this.add.rectangle(width/2, height/2, width, height, selectedGame === 'biology-lab' ? 0xf0fdf4 : 0xfaf5ff)

    const backButton = this.add.rectangle(80, 50, 100, 40, 0x6b7280).setInteractive()
    this.add.text(80, 50, '← Back', { fontSize: '14px', color: '#ffffff' }).setOrigin(0.5)
    backButton.on('pointerdown', () => {
      this.cleanup()
      this.scene.start('GradeSelectionScene')
    })

    this.add.text(width/2, 60, `${gameData.title} - Grade ${selectedGrade}`, {
      fontSize: '16px', color: selectedGame === 'biology-lab' ? '#15803d' : '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, 80, gradeData.topic, {
      fontSize: '12px', color: selectedGame === 'biology-lab' ? '#15803d' : '#7c3aed'
    }).setOrigin(0.5)

    this.scoreText = this.add.text(width - 80, 50, `Score: ${this.score}/${this.questions.length}`, {
      fontSize: '12px', color: selectedGame === 'biology-lab' ? '#15803d' : '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5)

    this.timerText = this.add.text(width/2, 100, `Time: ${this.timer}s`, {
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

    const { width, height } = this.scale
    const selectedGame = this.registry.get('selectedGame')
    const question = this.questions[this.currentQuestionIndex]
    
    this.isAnswered = false
    this.userInput = ''

    this.children.list.forEach(child => {
      if ((child as any).questionElement) child.destroy()
    })

    this.questionText = this.add.text(width/2, height * 0.3, question.question, {
      fontSize: '16px', color: '#1f2937', fontStyle: 'bold',
      wordWrap: { width: width - 50 }, align: 'center'
    }).setOrigin(0.5);
    (this.questionText as any).questionElement = true

    const typeText = this.add.text(width/2, height * 0.5, 'Type your answer:', {
      fontSize: '14px', color: '#374151'
    }).setOrigin(0.5);
    (typeText as any).questionElement = true

    const inputBox = this.add.rectangle(width/2, height * 0.6, 300, 40, 0xffffff)
      .setStrokeStyle(2, selectedGame === 'biology-lab' ? 0x22c55e : 0x8b5cf6);
    (inputBox as any).questionElement = true

    this.inputText = this.add.text(width/2, height * 0.6, '|', {
      fontSize: '14px', color: '#1f2937'
    }).setOrigin(0.5);
    (this.inputText as any).questionElement = true

    const submitText = this.add.text(width/2, height * 0.7, 'Press ENTER to submit', {
      fontSize: '12px', color: '#6b7280'
    }).setOrigin(0.5);
    (submitText as any).questionElement = true

    this.timer = 30
    this.startTimer()
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
      // Play positive sound
      try {
        this.sound.play('correctSound', { volume: 0.3 })
      } catch (e) {
        console.log('Audio not available')
      }
      this.showCorrectFeedback()
      
      // Save progress to Firestore
      await saveProgress(this.userId, this.gameType, this.grade, this.topicId, this.score, this.currentQuestionIndex + 1)
    } else {
      // Play negative sound
      try {
        this.sound.play('incorrectSound', { volume: 0.3 })
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
    const timeUpText = this.add.text(width/2, height * 0.8, "⏰ Time's up!", {
      fontSize: '20px', color: '#dc2626', fontStyle: 'bold'
    }).setOrigin(0.5);
    (timeUpText as any).questionElement = true

    this.time.delayedCall(2000, () => this.showNextButton())
  }

  showCorrectFeedback() {
    const { width, height } = this.scale
    const selectedGame = this.registry.get('selectedGame')
    const selectedGrade = this.registry.get('selectedGrade')
    
    // Motivational messages based on game type
    const motivationalMessages = {
      'biology-lab': ['Awesome Job!', 'Biology Master!', 'Science Star!', 'Brilliant Discovery!', 'Lab Expert!'],
      'code-challenge': ['Coding Genius!', 'Programming Pro!', 'Logic Master!', 'Code Warrior!', 'Debug Hero!']
    }
    
    const messages = motivationalMessages[selectedGame as 'biology-lab' | 'code-challenge']
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    
    // Create motivational text with enhanced animation
    const motivationalText = this.add.text(width/2, height * 0.75, randomMessage, {
      fontSize: '18px', color: selectedGame === 'biology-lab' ? '#15803d' : '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5);
    (motivationalText as any).questionElement = true
    
    // Create checkmark with enhanced animation
    const correctText = this.add.text(width/2, height * 0.8, '✅ Correct!', {
      fontSize: '24px', color: selectedGame === 'biology-lab' ? '#15803d' : '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5);
    (correctText as any).questionElement = true

    // Add bouncing animation
    this.tweens.add({
      targets: correctText,
      scaleX: 1.3,
      scaleY: 1.3,
      duration: 200,
      yoyo: true,
      repeat: 1,
      ease: 'Bounce.easeOut'
    })
    
    // Add floating animation for motivational text
    this.tweens.add({
      targets: motivationalText,
      y: height * 0.7,
      alpha: 0.8,
      duration: 500,
      ease: 'Power2.easeOut'
    })
    
    // Create confetti effect simulation with colored rectangles
    for (let i = 0; i < 15; i++) {
      const confetti = this.add.rectangle(
        width/2 + (Math.random() - 0.5) * 100,
        height * 0.8,
        4, 4,
        selectedGame === 'biology-lab' ? (Math.random() > 0.5 ? 0x22c55e : 0x15803d) : (Math.random() > 0.5 ? 0x8b5cf6 : 0x7c3aed)
      );
      (confetti as any).questionElement = true
      
      this.tweens.add({
        targets: confetti,
        x: confetti.x + (Math.random() - 0.5) * 200,
        y: confetti.y + Math.random() * 100 + 50,
        rotation: Math.random() * Math.PI * 2,
        alpha: 0,
        duration: 1000 + Math.random() * 500,
        ease: 'Power2.easeOut'
      })
    }
  }

  showIncorrectFeedback(correctAnswer: string) {
    const { width, height } = this.scale
    const incorrectText = this.add.text(width/2, height * 0.8, '❌ Incorrect!', {
      fontSize: '20px', color: '#dc2626', fontStyle: 'bold'
    }).setOrigin(0.5);
    (incorrectText as any).questionElement = true

    const answerText = this.add.text(width/2, height * 0.85, `Answer: ${correctAnswer}`, {
      fontSize: '14px', color: '#6b7280'
    }).setOrigin(0.5);
    (answerText as any).questionElement = true
  }

  showNextButton() {
    const { width, height } = this.scale
    const selectedGame = this.registry.get('selectedGame')
    const nextButton = this.add.rectangle(width/2, height * 0.9, 120, 35, 
      selectedGame === 'biology-lab' ? 0x22c55e : 0x8b5cf6).setInteractive();
    (nextButton as any).questionElement = true

    const buttonText = this.currentQuestionIndex < this.questions.length - 1 ? 'Next' : 'Results'
    const buttonTextObj = this.add.text(width/2, height * 0.9, buttonText, {
      fontSize: '14px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);
    (buttonTextObj as any).questionElement = true

    nextButton.on('pointerdown', () => {
      this.currentQuestionIndex++
      this.displayQuestion()
    })
  }

  showResults() {
    const { width, height } = this.scale
    const selectedGame = this.registry.get('selectedGame')
    const selectedGrade = this.registry.get('selectedGrade')
    const percentage = Math.round((this.score / this.questions.length) * 100)

    this.children.list.forEach(child => {
      if ((child as any).questionElement) child.destroy()
    })

    // Grade-specific completion messages
    const completionEmojis = {
      'biology-lab': '🔬',
      'code-challenge': '💻'
    }
    
    const gradeMessages = {
      6: 'Foundation Builder!',
      7: 'Knowledge Explorer!', 
      8: 'Concept Master!',
      9: 'Advanced Learner!',
      10: 'Subject Expert!',
      11: 'Academic Achiever!',
      12: 'Graduation Ready!'
    }

    this.add.text(width/2, height * 0.2, `${completionEmojis[selectedGame as 'biology-lab' | 'code-challenge']} Grade ${selectedGrade} Complete!`, {
      fontSize: '18px', color: selectedGame === 'biology-lab' ? '#15803d' : '#7c3aed', fontStyle: 'bold'
    }).setOrigin(0.5)
    
    this.add.text(width/2, height * 0.3, gradeMessages[selectedGrade as keyof typeof gradeMessages], {
      fontSize: '14px', color: selectedGame === 'biology-lab' ? '#15803d' : '#7c3aed'
    }).setOrigin(0.5)

    this.add.text(width/2, height * 0.45, `Score: ${this.score}/${this.questions.length} (${percentage}%)`, {
      fontSize: '16px', color: '#1f2937'
    }).setOrigin(0.5)
    
    // Performance message
    let performanceMessage = ''
    if (percentage >= 90) performanceMessage = 'Outstanding Performance! 🎆'
    else if (percentage >= 70) performanceMessage = 'Great Job! 🎉'
    else if (percentage >= 50) performanceMessage = 'Good Effort! 💪'
    else performanceMessage = 'Keep Practicing! 📚'
    
    this.add.text(width/2, height * 0.55, performanceMessage, {
      fontSize: '12px', color: '#6b7280'
    }).setOrigin(0.5)

    const tryAgainButton = this.add.rectangle(width/2 - 60, height * 0.75, 100, 35, 
      selectedGame === 'biology-lab' ? 0x22c55e : 0x8b5cf6).setInteractive()
    this.add.text(width/2 - 60, height * 0.75, 'Try Again', {
      fontSize: '12px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5)

    const gradeMenuButton = this.add.rectangle(width/2 + 60, height * 0.75, 100, 35, 0x6b7280).setInteractive()
    this.add.text(width/2 + 60, height * 0.75, 'Grade Menu', {
      fontSize: '12px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5)

    tryAgainButton.on('pointerdown', () => this.restartGame())
    gradeMenuButton.on('pointerdown', () => {
      this.cleanup()
      this.scene.start('GradeSelectionScene')
    })
  }

  async restartGame() {
    this.cleanup()
    
    // Reset all state for this specific grade
    this.currentQuestionIndex = 0
    this.score = 0
    this.timer = 30
    this.isAnswered = false
    this.userInput = ''
    
    // Clear any saved progress for this specific grade/topic only
    if (this.userId && this.userId !== 'anonymous') {
      try {
        await saveProgress(this.userId, this.gameType, this.grade, this.topicId, 0, 0)
        console.log(`Progress reset for Grade ${this.grade} ${this.gameType}`)
      } catch (error) {
        console.error('Error resetting progress:', error)
      }
    }
    
    // Update score display
    if (this.scoreText) this.scoreText.setText(`Score: ${this.score}/${this.questions.length}`)
    
    this.displayQuestion()
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

// React Component
const InteractiveGamesApp: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { currentUser } = useAuth()

  // Show loading state if user is not authenticated
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-5xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Required
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            Please log in to access the Interactive Learning Games and track your progress.
          </p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
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
        backgroundColor: '#1f2937',
        scene: [MainMenuScene, GradeSelectionScene, GameScene],
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
        input: { keyboard: true }
      }
      gameRef.current = new Phaser.Game(config)
      
      // Pass user data to the game registry
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Interactive Learning Games
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Master Biology and Programming through fun, timed challenges! Your progress is automatically saved.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              30-second timer per question
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Isolated progress tracking
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              Cloud-saved scores
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              Audio feedback
            </span>
          </div>
        </div>
        
        <div 
          ref={containerRef} 
          className="border-4 border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-700"
          style={{ width: '350px', height: '400px', margin: '0 auto', maxWidth: '100%' }}
        />
        
        <div className="text-center mt-6 space-y-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            🎮 Use keyboard to type answers • ⏱️ 30 seconds per question • 📊 Firestore progress tracking • 🔊 Audio feedback
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Built with Phaser.js, React & Firebase • Isolated scoring per game/grade • Responsive design
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveGamesApp