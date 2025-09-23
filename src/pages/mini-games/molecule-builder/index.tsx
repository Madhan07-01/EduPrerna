import { useNavigate, useSearchParams } from 'react-router-dom'
import MoleculeBuilder from './MoleculeBuilder'

export default function MoleculeBuilderPage(){
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const subject = params.get('subject') || 'chemistry'
  const grade = params.get('grade') || '9'
  const lesson = 'molecule-builder'
  return (
    <MoleculeBuilder subject={subject} grade={grade} lesson={lesson} onBack={()=> navigate('/games')} />
  )
}
