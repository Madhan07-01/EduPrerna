import { useNavigate, useSearchParams } from 'react-router-dom'
import GravityDrop from './gravity-drop'

export default function GravityDropPage(){
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const subject = params.get('subject') || 'physics'
  const grade = params.get('grade') || '9'
  const lesson = 'Gravity Drop'

  return (
    <GravityDrop
      subject={subject}
      grade={grade}
      lesson={lesson}
      onBack={() => navigate('/games')}
    />
  )
}
