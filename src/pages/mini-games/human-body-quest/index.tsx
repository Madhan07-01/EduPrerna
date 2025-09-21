import { useNavigate, useSearchParams } from 'react-router-dom'
import HumanBodyQuest from './human-body-quest'

export default function HumanBodyQuestPage(){
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const subject = params.get('subject') || 'biology'
  const grade = params.get('grade') || '8'
  const lesson = 'Human Body Quest'

  return (
    <HumanBodyQuest
      subject={subject}
      grade={grade}
      lesson={lesson}
      onBack={() => navigate('/games')}
    />
  )
}
