import React, { useState } from 'react'

interface Element {
  symbol: string
  name: string
  atomicNumber: number
  color: string
}

interface Compound {
  formula: string
  name: string
  elements: { symbol: string; count: number }[]
}

const ChemistryLabGame: React.FC = () => {
  const [selectedElements, setSelectedElements] = useState<Element[]>([])
  const [targetCompound, setTargetCompound] = useState<Compound | null>(null)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [showCelebration, setShowCelebration] = useState(false)

  const elements: Element[] = [
    { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, color: '#FF6B6B' },
    { symbol: 'O', name: 'Oxygen', atomicNumber: 8, color: '#4ECDC4' },
    { symbol: 'C', name: 'Carbon', atomicNumber: 6, color: '#45B7D1' },
    { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, color: '#96CEB4' },
    { symbol: 'Na', name: 'Sodium', atomicNumber: 11, color: '#FFEAA7' },
    { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, color: '#DDA0DD' },
    { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, color: '#98D8C8' },
    { symbol: 'S', name: 'Sulfur', atomicNumber: 16, color: '#FFD93D' }
  ]

  const compounds: Compound[] = [
    {
      formula: 'H₂O',
      name: 'Water',
      elements: [{ symbol: 'H', count: 2 }, { symbol: 'O', count: 1 }]
    },
    {
      formula: 'CO₂',
      name: 'Carbon Dioxide',
      elements: [{ symbol: 'C', count: 1 }, { symbol: 'O', count: 2 }]
    },
    {
      formula: 'NaCl',
      name: 'Sodium Chloride (Salt)',
      elements: [{ symbol: 'Na', count: 1 }, { symbol: 'Cl', count: 1 }]
    },
    {
      formula: 'NH₃',
      name: 'Ammonia',
      elements: [{ symbol: 'N', count: 1 }, { symbol: 'H', count: 3 }]
    },
    {
      formula: 'CH₄',
      name: 'Methane',
      elements: [{ symbol: 'C', count: 1 }, { symbol: 'H', count: 4 }]
    },
    {
      formula: 'CaCl₂',
      name: 'Calcium Chloride',
      elements: [{ symbol: 'Ca', count: 1 }, { symbol: 'Cl', count: 2 }]
    },
    {
      formula: 'H₂SO₄',
      name: 'Sulfuric Acid',
      elements: [{ symbol: 'H', count: 2 }, { symbol: 'S', count: 1 }, { symbol: 'O', count: 4 }]
    }
  ]

  const getRandomCompound = (): Compound => {
    const availableCompounds = compounds.slice(0, Math.min(compounds.length, currentLevel + 2))
    return availableCompounds[Math.floor(Math.random() * availableCompounds.length)]
  }

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setCurrentLevel(1)
    setFeedback('')
    setSelectedElements([])
    setTargetCompound(getRandomCompound())
    setShowCelebration(false)
  }

  const addElement = (element: Element) => {
    setSelectedElements(prev => [...prev, element])
  }

  const removeElement = (index: number) => {
    setSelectedElements(prev => prev.filter((_, i) => i !== index))
  }

  const clearElements = () => {
    setSelectedElements([])
  }

  const checkCompound = () => {
    if (!targetCompound) return

    // Count selected elements
    const elementCounts: { [key: string]: number } = {}
    selectedElements.forEach(element => {
      elementCounts[element.symbol] = (elementCounts[element.symbol] || 0) + 1
    })

    // Check if matches target compound
    const targetCounts: { [key: string]: number } = {}
    targetCompound.elements.forEach(({ symbol, count }) => {
      targetCounts[symbol] = count
    })

    const isCorrect = 
      Object.keys(elementCounts).length === Object.keys(targetCounts).length &&
      Object.keys(targetCounts).every(symbol => 
        elementCounts[symbol] === targetCounts[symbol]
      )

    if (isCorrect) {
      setScore(score + currentLevel * 10)
      setFeedback(`Correct! You created ${targetCompound.name} (${targetCompound.formula})! 🧪✨`)
      
      // Trigger celebration for every correct answer
      triggerPerfectScoreCelebration()
      
      setTimeout(() => {
        setCurrentLevel(prev => prev + 1)
        setSelectedElements([])
        setTargetCompound(getRandomCompound())
        setFeedback('')
      }, 2000)
    } else {
      setFeedback('Incorrect combination. Try again!')
      setTimeout(() => setFeedback(''), 2000)
    }
  }

  const triggerPerfectScoreCelebration = () => {
    setShowCelebration(true)
    
    // Hide celebration after 2 seconds (per memory specification)
    setTimeout(() => {
      setShowCelebration(false)
    }, 2000)
  }

  const getCurrentFormula = (): string => {
    const elementCounts: { [key: string]: number } = {}
    selectedElements.forEach(element => {
      elementCounts[element.symbol] = (elementCounts[element.symbol] || 0) + 1
    })

    return Object.entries(elementCounts)
      .map(([symbol, count]) => count === 1 ? symbol : `${symbol}₂₃₄₅₆₇₈₉`.charAt(count - 1) === '₂' ? `${symbol}₂` : `${symbol}${count}`)
      .join('')
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🧪 Chemistry Lab
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Create chemical compounds by combining elements! Match the target formula to score points.
          </p>
          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            Start Lab
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chemistry Lab</h1>
            <div className="flex gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl font-semibold">
                Level: {currentLevel}
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold">
                Score: {score}
              </div>
            </div>
          </div>

          {targetCompound && (
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Target Compound:</h2>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {targetCompound.formula} - {targetCompound.name}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Elements:</h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {elements.map((element) => (
                <button
                  key={element.symbol}
                  onClick={() => addElement(element)}
                  className="aspect-square flex flex-col items-center justify-center rounded-xl font-bold text-white transition-all duration-200 transform hover:scale-110 shadow-lg"
                  style={{ backgroundColor: element.color }}
                  title={element.name}
                >
                  <div className="text-lg">{element.symbol}</div>
                  <div className="text-xs">{element.atomicNumber}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Compound:</h3>
            <div className="min-h-16 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedElements.map((element, index) => (
                  <button
                    key={index}
                    onClick={() => removeElement(index)}
                    className="w-12 h-12 rounded-lg font-bold text-white transition-all duration-200 transform hover:scale-110"
                    style={{ backgroundColor: element.color }}
                    title={`${element.name} - Click to remove`}
                  >
                    {element.symbol}
                  </button>
                ))}
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                Formula: {getCurrentFormula() || 'Select elements to create a compound'}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={checkCompound}
              disabled={selectedElements.length === 0}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Check Compound
            </button>
            <button
              onClick={clearElements}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Clear
            </button>
          </div>

          {feedback && (
            <div className={`mt-6 text-center text-lg font-medium p-4 rounded-xl ${
              feedback.includes('Correct') 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
            }`}>
              {feedback}
            </div>
          )}
          
          {/* Perfect Score Celebration */}
          {showCelebration && (
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{ pointerEvents: 'none' }}>
              <div className="text-center relative">
                {/* AWESOME JOB Message - centered and prominent */}
                <div 
                  className="text-6xl font-black mb-8"
                  style={{
                    color: '#ff6b6b',
                    textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
                    animation: 'scaleAndFade 2s ease-out forwards'
                  }}
                >
                  AWESOME JOB!
                </div>
                
                {/* 6-10 Balloon Emojis floating upward */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  {Array.from({ length: 6 + Math.floor(Math.random() * 5) }, (_, i) => (
                    <div
                      key={i}
                      className="text-5xl absolute"
                      style={{
                        left: `${10 + (i * 12)}%`,
                        top: '100px',
                        animation: `balloonFloat 2s ease-out forwards`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    >
                      🎈
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scaleAndFade {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            50% {
              transform: scale(1.2);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
          
          @keyframes balloonFloat {
            0% {
              transform: translateY(0px);
              opacity: 1;
            }
            100% {
              transform: translateY(-400px);
              opacity: 0;
            }
          }
        `
      }} />
    </div>
  )
}

export default ChemistryLabGame