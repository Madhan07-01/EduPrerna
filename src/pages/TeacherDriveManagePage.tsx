import { useAuth } from '../hooks/useAuth'
import TeacherMappingsTable from '../components/TeacherMappingsTable'

export default function TeacherDriveManagePage() {
  const { profile } = useAuth()
  const isTeacher = profile?.role === 'teacher' || profile?.role === 'admin'

  if (!isTeacher) {
    return <div className="text-sm text-slate-400">Teacher/Admin access only.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">🗂️ Manage Drive Mappings</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">Edit and delete existing resource mappings</div>
      </div>
      
      {/* Existing Mappings Table */}
      <TeacherMappingsTable />
    </div>
  )
}