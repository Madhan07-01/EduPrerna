import { useNavigate, useSearchParams } from 'react-router-dom'
import MagnetMania from './magnet-mania'

export default function MagnetManiaPage(){
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const subject = params.get('subject') || 'physics'
  const grade = params.get('grade') || '8'
  const lesson = 'Magnet Mania'

  return (
    <MagnetMania
      subject={subject}
      grade={grade}
      lesson={lesson}
      onBack={() => navigate('/games')}
    />
  )
}
