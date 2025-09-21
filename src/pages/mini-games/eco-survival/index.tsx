import { useNavigate, useSearchParams } from 'react-router-dom'
import EcoSurvival from './eco-survival'

export default function EcoSurvivalPage(){
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const subject = params.get('subject') || 'biology'
  const grade = params.get('grade') || '8'
  const lesson = 'Eco Survival'

  return (
    <EcoSurvival
      subject={subject}
      grade={grade}
      lesson={lesson}
      onBack={() => navigate('/games')}
    />
  )
}
