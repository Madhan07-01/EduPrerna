import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MCQ } from './types'

export function useModuleMCQ() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showAnswers, setShowAnswers] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }))
  }

  const calculateScore = (mcqs: MCQ[]) => {
    let correct = 0
    mcqs.forEach((mcq, index) => {
      if (selectedAnswers[index] === mcq.correct) {
        correct++
      }
    })
    return correct
  }

  const resetMCQs = () => {
    setSelectedAnswers({})
    setShowAnswers(false)
  }

  const backToTopics = () => {
    navigate('/onestudy')
  }

  return {
    selectedAnswers,
    showAnswers,
    setShowAnswers,
    handleAnswerSelect,
    calculateScore,
    resetMCQs,
    backToTopics
  }
}