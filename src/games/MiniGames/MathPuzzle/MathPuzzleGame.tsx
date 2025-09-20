import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import {
  MainMenuScene,
  Grade6Scene,
  Grade7Scene,
  Grade8Scene,
  Grade9Scene,
  Grade10Scene,
  Grade11Scene,
  Grade12Scene
} from './scenes/index.js'

const MathPuzzleGame: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'math-puzzle-container',
      backgroundColor: '#ffffff',
      scene: [
        MainMenuScene,
        Grade6Scene,
        Grade7Scene,
        Grade8Scene,
        Grade9Scene,
        Grade10Scene,
        Grade11Scene,
        Grade12Scene
      ],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false
        }
      }
    }

    gameRef.current = new Phaser.Game(config)

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-5xl mx-auto pt-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🧮 Math Puzzle Mini-Games
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
            Choose your grade level and explore interactive math lessons!
          </p>
          <div className="flex justify-center">
            <div 
              id="math-puzzle-container" 
              className="border-4 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
              style={{ width: '800px', height: '600px' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MathPuzzleGame