import { useNavigate, useSearchParams } from 'react-router-dom'
import ReactionTime from './ReactionTime'

export default function ReactionTimePage(){
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const subject = params.get('subject') || 'chemistry'
  const grade = params.get('grade') || '8'
  const lesson = params.get('lesson') || 'chemical-reactions'
  return (
    <ReactionTime subject={subject} grade={grade} lesson={lesson} onBack={() => navigate('/games')} />
  )
}
