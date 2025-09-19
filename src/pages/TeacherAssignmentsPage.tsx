import { useState } from 'react'
import CreateAssignment from '../components/CreateAssignment'
import AssignmentList from '../components/AssignmentList'
import SubmissionTracker from '../components/SubmissionTracker'

type Assignment = {
  id: string
  title: string
  description: string
  subject: string
  grade: string
  dueDate: string
  classes: string[]
  fileUrl?: string
  status: 'Active' | 'Closed'
  sendReminder: boolean
}

export default function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [viewMode, setViewMode] = useState<'list' | 'submissions'>('list')
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  
  const handleCreateAssignment = (assignment: Assignment) => {
    setAssignments([assignment, ...assignments])
    
    if (assignment.sendReminder) {
      // In a real app, this would trigger a notification to students
      console.log(`Notification sent for assignment: ${assignment.title}`)
      
      // Show a toast notification (mock)
      alert(`Reminder notification sent to students for: ${assignment.title}`)
    }
  }
  
  const handleViewSubmissions = (assignmentId: string) => {
    const assignment = assignments.find(a => a.id === assignmentId)
    if (assignment) {
      setSelectedAssignment(assignment)
      setViewMode('submissions')
    }
  }
  
  const handleEditAssignment = (assignment: Assignment) => {
    // In a real app, this would open an edit form
    // For this demo, we'll just show an alert
    alert(`Edit assignment: ${assignment.title}`)
  }
  
  const handleDeleteAssignment = (assignmentId: string) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(a => a.id !== assignmentId))
    }
  }
  
  const handleStatusChange = (assignmentId: string, status: 'Active' | 'Closed') => {
    setAssignments(assignments.map(a => 
      a.id === assignmentId ? { ...a, status } : a
    ))
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Assignments</h1>
      
      {viewMode === 'list' ? (
        <div className="space-y-8">
          <CreateAssignment onAssignmentCreate={handleCreateAssignment} />
          
          <AssignmentList 
            assignments={assignments}
            onViewSubmissions={handleViewSubmissions}
            onEditAssignment={handleEditAssignment}
            onDeleteAssignment={handleDeleteAssignment}
            onStatusChange={handleStatusChange}
          />
        </div>
      ) : (
        selectedAssignment && (
          <SubmissionTracker 
            assignmentId={selectedAssignment.id}
            assignmentTitle={selectedAssignment.title}
            onBack={() => setViewMode('list')}
          />
        )
      )}
    </div>
  )
}