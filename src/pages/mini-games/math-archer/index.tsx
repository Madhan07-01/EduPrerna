import { useNavigate, useSearchParams } from 'react-router-dom'
import MathArcher from './math-archer'

export default function MathArcherPage(){
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const subject = params.get('subject') || 'math'
  const grade = params.get('grade') || '8'
  const lesson = 'Math Archer'

  return (
    <MathArcher
      subject={subject}
      grade={grade}
      lesson={lesson}
      onBack={() => navigate('/games')}
    />
  )
}
