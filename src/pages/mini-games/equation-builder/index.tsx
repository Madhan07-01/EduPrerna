import { useNavigate, useSearchParams } from 'react-router-dom'
import EquationBuilderGame from './EquationBuilderGame'

export default function EquationBuilderPage(){
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const subject = params.get('subject') || 'mathematics'
  const grade = params.get('grade') || '9'
  const lesson = 'equation-builder'
  return (
    <EquationBuilderGame subject={subject} grade={grade} lesson={lesson} onBack={()=> navigate('/games')} />
  )
}
