import { useAuth } from '../hooks/useAuth'
import SimplifiedUploadForm from '../components/SimplifiedUploadForm'
import TeacherMappingsTable from '../components/TeacherMappingsTable'

export default function TeacherResourcesPage() {
  const { profile } = useAuth()
  const isTeacher = profile?.role === 'teacher' || profile?.role === 'admin'

  if (!isTeacher) {
    return <div className="text-sm text-slate-400">Teacher/Admin access only.</div>
  }

  const handleResourceUploaded = (newResource: any) => {
    // This function can be used to update the UI or trigger a refresh
    console.log('Resource uploaded:', newResource)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">📚 Resource Manager</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">Upload and manage learning resources</div>
      </div>
      
      {/* Simplified Upload Form */}
      <SimplifiedUploadForm onResourceUploaded={handleResourceUploaded} />
      
      {/* Existing Mappings Table */}
      <TeacherMappingsTable />
    </div>
  )
}