import { useNavigate, useSearchParams } from 'react-router-dom'
import CodeBreaker from './codebreaker.tsx'

export default function CodeBreakerPage(){
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const subject = params.get('subject') || 'cs'
  const grade = params.get('grade') || '9'
  const lesson = 'Code Breaker'

  return (
    <CodeBreaker
      subject={subject}
      grade={grade}
      lesson={lesson}
      onBack={() => navigate('/games')}
    />
  )
}
