import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { useAuth } from '../../hooks/useAuth'
import { PhysicsQuizMenuScene, PhysicsQuizGameScene } from './PhysicsQuizScenes'

// Type definitions for Physics Quiz
type PhysicsQuestion = {
  id: string
  question: string
  type: 'multiple-choice' | 'input'
  options?: string[]
  correctAnswer: string | number
  explanation: string
}

type GradePhysicsData = {
  grade: number
  topics: string[]
  questions: PhysicsQuestion[]
}

// Physics Quiz Data for Grades 6-12
const PHYSICS_QUIZ_DATA: GradePhysicsData[] = [
  {
    grade: 6,
    topics: ['Measurement and Motion', 'Light, Shadows and Reflections', 'Electricity and Circuits', 'Fun with Magnets'],
    questions: [
      {
        id: 'g6q1',
        question: 'What is the SI unit of length?',
        type: 'multiple-choice',
        options: ['Meter', 'Centimeter', 'Kilometer', 'Inch'],
        correctAnswer: 0,
        explanation: 'The SI unit of length is meter (m).'
      },
      {
        id: 'g6q2',
        question: 'When light hits a mirror, what happens?',
        type: 'multiple-choice',
        options: ['It gets absorbed', 'It gets reflected', 'It disappears', 'It changes color'],
        correctAnswer: 1,
        explanation: 'Light gets reflected when it hits a mirror.'
      },
      {
        id: 'g6q3',
        question: 'What do opposite poles of magnets do?',
        type: 'multiple-choice',
        options: ['Repel each other', 'Attract each other', 'Stay neutral', 'Create sparks'],
        correctAnswer: 1,
        explanation: 'Opposite poles of magnets attract each other.'
      }
    ]
  },
  {
    grade: 7,
    topics: ['Motion and Time', 'Electric Current and Circuits', 'Heat', 'Light', 'Winds, Storms and Cyclones', 'Solar System'],
    questions: [
      {
        id: 'g7q1',
        question: 'What is the formula for speed?',
        type: 'input',
        correctAnswer: 'distance/time',
        explanation: 'Speed = Distance / Time'
      },
      {
        id: 'g7q2',
        question: 'Which planet is closest to the Sun?',
        type: 'multiple-choice',
        options: ['Venus', 'Earth', 'Mercury', 'Mars'],
        correctAnswer: 2,
        explanation: 'Mercury is the closest planet to the Sun.'
      },
      {
        id: 'g7q3',
        question: 'Heat flows from __ to __ objects.',
        type: 'input',
        correctAnswer: 'hot to cold',
        explanation: 'Heat always flows from hot objects to cold objects.'
      }
    ]
  },
  {
    grade: 8,
    topics: ['Force and Pressure', 'Friction', 'Sound', 'Chemical Effects of Electric Current', 'Some Natural Phenomena', 'Light', 'Stars and the Solar System'],
    questions: [
      {
        id: 'g8q1',
        question: 'What is the SI unit of force?',
        type: 'multiple-choice',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        correctAnswer: 1,
        explanation: 'The SI unit of force is Newton (N).'
      },
      {
        id: 'g8q2',
        question: 'Sound travels fastest in which medium?',
        type: 'multiple-choice',
        options: ['Air', 'Water', 'Steel', 'Vacuum'],
        correctAnswer: 2,
        explanation: 'Sound travels fastest in solids like steel.'
      },
      {
        id: 'g8q3',
        question: 'Friction always opposes __.',
        type: 'input',
        correctAnswer: 'motion',
        explanation: 'Friction always opposes motion between surfaces.'
      }
    ]
  },
  {
    grade: 9,
    topics: ['Motion', 'Force and Laws of Motion', 'Gravitation', 'Work and Energy', 'Sound', 'Matter in Our Surroundings', 'Structure of the Atom', 'The Universe'],
    questions: [
      {
        id: 'g9q1',
        question: 'What is Newton\'s first law of motion also called?',
        type: 'multiple-choice',
        options: ['Law of Action', 'Law of Inertia', 'Law of Acceleration', 'Law of Gravity'],
        correctAnswer: 1,
        explanation: 'Newton\'s first law is also called the Law of Inertia.'
      },
      {
        id: 'g9q2',
        question: 'The value of acceleration due to gravity on Earth is __ m/s².',
        type: 'input',
        correctAnswer: '9.8',
        explanation: 'The acceleration due to gravity on Earth is 9.8 m/s².'
      },
      {
        id: 'g9q3',
        question: 'Work is measured in which unit?',
        type: 'multiple-choice',
        options: ['Newton', 'Joule', 'Watt', 'Pascal'],
        correctAnswer: 1,
        explanation: 'Work is measured in Joules (J).'
      }
    ]
  },
  {
    grade: 10,
    topics: ['Light - Reflection and Refraction', 'Human Eye and Colourful World', 'Electricity', 'Magnetic Effects of Electric Current', 'Sources of Energy', 'Our Environment'],
    questions: [
      {
        id: 'g10q1',
        question: 'The bending of light when it passes from one medium to another is called __.',
        type: 'input',
        correctAnswer: 'refraction',
        explanation: 'The bending of light is called refraction.'
      },
      {
        id: 'g10q2',
        question: 'What is the unit of electric current?',
        type: 'multiple-choice',
        options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
        correctAnswer: 1,
        explanation: 'The unit of electric current is Ampere (A).'
      },
      {
        id: 'g10q3',
        question: 'Which type of energy is stored in fossil fuels?',
        type: 'multiple-choice',
        options: ['Kinetic Energy', 'Chemical Energy', 'Nuclear Energy', 'Solar Energy'],
        correctAnswer: 1,
        explanation: 'Fossil fuels store chemical energy.'
      }
    ]
  },
  {
    grade: 11,
    topics: ['Physical World and Measurement', 'Kinematics', 'Laws of Motion', 'Work, Energy and Power', 'Motion of System of Particles and Rigid Body', 'Gravitation', 'Properties of Bulk Matter', 'Thermodynamics', 'Behaviour of Perfect Gas', 'Oscillations and Waves'],
    questions: [
      {
        id: 'g11q1',
        question: 'The rate of change of velocity is called __.',
        type: 'input',
        correctAnswer: 'acceleration',
        explanation: 'Acceleration is the rate of change of velocity.'
      },
      {
        id: 'g11q2',
        question: 'What is the unit of power?',
        type: 'multiple-choice',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        correctAnswer: 2,
        explanation: 'The unit of power is Watt (W).'
      },
      {
        id: 'g11q3',
        question: 'In simple harmonic motion, the restoring force is proportional to __.',
        type: 'input',
        correctAnswer: 'displacement',
        explanation: 'In SHM, restoring force is proportional to displacement.'
      }
    ]
  },
  {
    grade: 12,
    topics: ['Electrostatics', 'Current Electricity', 'Magnetic Effects of Current and Magnetism', 'Electromagnetic Induction and Alternating Currents', 'Electromagnetic Waves', 'Optics', 'Dual Nature of Matter and Radiation', 'Atoms and Nuclei', 'Electronic Devices', 'Communication Systems'],
    questions: [
      {
        id: 'g12q1',
        question: 'What is the unit of electric field?',
        type: 'multiple-choice',
        options: ['N/C', 'C/N', 'V/m', 'Both A and C'],
        correctAnswer: 3,
        explanation: 'Electric field unit is N/C or V/m (both are equivalent).'
      },
      {
        id: 'g12q2',
        question: 'The phenomenon of electromagnetic induction was discovered by __.',
        type: 'input',
        correctAnswer: 'faraday',
        explanation: 'Electromagnetic induction was discovered by Michael Faraday.'
      },
      {
        id: 'g12q3',
        question: 'The dual nature of matter was proposed by __.',
        type: 'input',
        correctAnswer: 'de broglie',
        explanation: 'The dual nature of matter was proposed by Louis de Broglie.'
      }
    ]
  }
]

// React Component for Physics Simulator
const PhysicsSimulatorGame: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { currentUser } = useAuth()

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">⚡ Physics Simulator</h1>
          <p className="text-gray-600 text-sm mb-6">Please log in to access the Physics Quiz and track your progress.</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (containerRef.current && !gameRef.current && currentUser) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 600,
        height: 500,
        parent: containerRef.current,
        backgroundColor: '#1e3a8a',
        scene: [PhysicsQuizMenuScene, PhysicsQuizGameScene],
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
        input: { keyboard: true },
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
          }
        }
      }
      gameRef.current = new Phaser.Game(config)
      gameRef.current.registry.set('userId', currentUser.uid)
      gameRef.current.registry.set('physicsQuizData', PHYSICS_QUIZ_DATA)
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [currentUser])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">⚡ Physics Simulator</h1>
          <p className="text-gray-600">Interactive Physics Quiz for Grades 6-12!</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              30-second timers
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Multiple choice & input
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              Fun animations
            </span>
          </div>
        </div>
        
        <div 
          ref={containerRef} 
          className="border-4 border-blue-200 rounded-xl overflow-hidden shadow-lg bg-blue-100"
          style={{ 
            width: '600px', 
            height: '500px', 
            margin: '0 auto', 
            maxWidth: '100%',
            backgroundColor: '#eaf6ff'
          }}
        />
        
        <div className="text-center mt-4 space-y-2">
          <div className="text-sm text-gray-500">
            ⚡ Physics mastery • 🔬 Interactive learning • 🎯 Grade-specific content
          </div>
          <div className="text-xs text-gray-400">
            Built with Phaser.js • Grades 6-12 Available • 3 Questions per Grade
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhysicsSimulatorGame