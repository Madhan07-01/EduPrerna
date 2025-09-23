import { useNavigate, useSearchParams } from 'react-router-dom'
import LogicBuilder from './logic-builder'

export default function LogicBuilderPage(){
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const subject = params.get('subject') || 'cs'
  const grade = params.get('grade') || '9'
  const lesson = 'Logic Builder'

  return (
    <LogicBuilder
      subject={subject}
      grade={grade}
      lesson={lesson}
      onBack={() => navigate('/games')}
    />
  )
}
