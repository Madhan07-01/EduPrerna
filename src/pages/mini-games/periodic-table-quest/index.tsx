import { useNavigate, useSearchParams } from 'react-router-dom'
import PeriodicTableQuest from './PeriodicTableQuest'

export default function PeriodicTableQuestPage(){
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const subject = params.get('subject') || 'chemistry'
  const grade = params.get('grade') || '9'
  const lesson = 'periodic-table-quest'
  return (
    <PeriodicTableQuest subject={subject} grade={grade} lesson={lesson} onBack={()=> navigate('/games')} />
  )
}
