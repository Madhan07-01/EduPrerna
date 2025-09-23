import { useNavigate, useSearchParams } from 'react-router-dom'
import MathRunner from './math-runner'

export default function MathRunnerPage(){
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const subject = params.get('subject') || 'math'
  const grade = params.get('grade') || '8'
  const lesson = params.get('lesson') || undefined

  return (
    <MathRunner
      subject={subject}
      grade={grade}
      lesson={lesson}
      onBack={() => navigate('/games')}
    />
  )
}
