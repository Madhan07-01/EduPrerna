// src/pages/DailyStemChallenge.tsx
// Screen that loads the daily STEM challenge from Supabase based on grade & subject
// and runs the appropriate Phaser scene. Firebase auth remains untouched.

import { useMemo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PhaserGameCanvas from '../components/PhaserGameCanvas'
import ArithmeticShooterScene from '../games/ArithmeticShooterScene'
import PlaceholderScene from '../games/PlaceholderScene'
import NumberPatternsScene from '../games/NumberPatternsScene'
import MazeMathScene from '../games/MazeMathScene'
import PeriodicMatchScene from '../games/PeriodicMatchScene'
import BodySystemsScene from '../games/BodySystemsScene'
import PhysicsConceptsScene from '../games/PhysicsConceptsScene'
import CodeDebugScene from '../games/CodeDebugScene'
import AlgorithmMazeScene from '../games/AlgorithmMazeScene'
import CircuitPuzzleScene from '../games/CircuitPuzzleScene'
import { fetchDailyChallenge, type Challenge, type Subject } from '../services/supabaseGames'

const SUBJECTS: Subject[] = ['Mathematics', 'Science', 'Technology', 'Engineering']

function isSubject(x: string): x is Subject {
  return (SUBJECTS as string[]).includes(x)
}

export default function DailyStemChallenge() {
  const params = useParams()
  const subjectParam = (params.subject || '').trim()
  const gradeParam = Number(params.grade)

  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const validSubject: Subject | null = isSubject(subjectParam)
    ? (subjectParam as Subject)
    : null
  const validGrade = Number.isFinite(gradeParam) ? gradeParam : NaN

  useEffect(() => {
    if (!validSubject || !Number.isFinite(validGrade)) {
      setError('Invalid subject or grade')
      return
    }
    setLoading(true)
    fetchDailyChallenge(validGrade, validSubject)
      .then((c) => setChallenge(c))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [validGrade, validSubject])

  const scene = useMemo(() => {
    if (!challenge) return null
    switch (challenge.game_type) {
      case 'arithmetic_shooter':
        return ArithmeticShooterScene
      case 'number_patterns':
        return NumberPatternsScene
      case 'maze_math':
        return MazeMathScene
      case 'periodic_match':
        return PeriodicMatchScene
      case 'body_systems':
        return BodySystemsScene
      case 'physics_concepts':
        return PhysicsConceptsScene
      case 'code_debug':
        return CodeDebugScene
      case 'algorithm_maze':
        return AlgorithmMazeScene
      case 'circuit_puzzle':
        return CircuitPuzzleScene
      // TODO: add more scenes here for other game types
      default:
        return PlaceholderScene
    }
  }, [challenge])

  if (!validSubject || !Number.isFinite(validGrade)) {
    return <div className="text-red-600">Invalid subject or grade in URL.</div>
  }
  if (loading) return <div>Loading daily challenge…</div>
  if (error) return <div className="text-red-600">Error: {error}</div>
  if (!challenge || !scene) return <div>No challenge available for today.</div>

  const sceneData = {
    challenge_id: challenge.id,
    grade: challenge.grade,
    subject: challenge.subject,
    config: challenge.config,
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{challenge.title}</h1>
      <PhaserGameCanvas scene={scene} width={900} height={600} sceneData={sceneData} />
    </div>
  )
}
