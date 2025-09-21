import { useNavigate, useSearchParams } from 'react-router-dom'
import CircuitConnect from './circuit-connect.tsx'

export default function CircuitConnectPage(){
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const subject = params.get('subject') || 'physics'
  const grade = params.get('grade') || '9'
  const lesson = 'Circuit Connect'

  return (
    <CircuitConnect
      subject={subject}
      grade={grade}
      lesson={lesson}
      onBack={() => navigate('/games')}
    />
  )
}
