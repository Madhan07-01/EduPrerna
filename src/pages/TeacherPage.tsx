import TeacherDashboard from './TeacherDashboard'
import { useAuth } from '../hooks/useAuth'

export function TeacherPage() {
  const { profile } = useAuth()
  
  if (profile?.role === 'teacher') {
    return <TeacherDashboard />
  }
  
  return (
    <div className="text-sm text-slate-400">
      Teacher access only.
    </div>
  )
}

export default TeacherPage