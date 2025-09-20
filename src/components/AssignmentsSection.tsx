import { useState } from 'react'
import CreateAssignment from './CreateAssignment'
import AssignmentList from './AssignmentList'
import SubmissionTracker from './SubmissionTracker'

interface Assignment {
  id: number
  title: string
  description: string
  subject: string
  grade: string
  dueDate: string
  classes: string[]
  attachments: File[]
  status: 'Active' | 'Closed'
  sendReminder: boolean
}

export default function AssignmentsSection() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: "Algebra Worksheet Chapter 5",
      description: "Complete exercises 1-20 from the algebra textbook. Show all work and explain your reasoning for word problems.",
      subject: "Mathematics",
      grade: "8",
      dueDate: "2024-01-20T23:59",
      classes: ["8A", "8B"],
      attachments: [],
      status: "Active",
      sendReminder: true
    },
    {
      id: 2,
      title: "Science Lab Report - Chemical Reactions",
      description: "Write a detailed lab report on the chemical reactions experiment we conducted last week. Include observations, data analysis, and conclusions.",
      subject: "Chemistry",
      grade: "9",
      dueDate: "2024-01-25T15:00",
      classes: ["9A"],
      attachments: [],
      status: "Active",
      sendReminder: false
    },
    {
      id: 3,
      title: "History Essay - World War I",
      description: "Write a 1000-word essay on the causes and consequences of World War I. Use at least 3 reliable sources.",
      subject: "History",
      grade: "10",
      dueDate: "2024-01-15T23:59",
      classes: ["10A", "10B"],
      attachments: [],
      status: "Closed",
      sendReminder: true
    }
  ])

  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null)
  const [viewingSubmissions, setViewingSubmissions] = useState<Assignment | null>(null)
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'submissions'>('list')

  const handleCreateAssignment = (assignmentData: Omit<Assignment, 'id' | 'status'>) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: Date.now(),
      status: 'Active'
    }
    
    setAssignments([newAssignment, ...assignments])
    setCurrentView('list')
    
    // Simulate sending reminder if requested
    if (assignmentData.sendReminder) {
      alert(`Assignment "${assignmentData.title}" created and reminder sent to ${assignmentData.classes.join(', ')}!`)
    } else {
      alert(`Assignment "${assignmentData.title}" created successfully!`)
    }
  }

  const handleEditAssignment = (assignmentData: Omit<Assignment, 'id' | 'status'>) => {
    if (editingAssignment) {
      const updatedAssignment: Assignment = {
        ...assignmentData,
        id: editingAssignment.id,
        status: editingAssignment.status
      }
      
      setAssignments(assignments.map(assignment => 
        assignment.id === editingAssignment.id ? updatedAssignment : assignment
      ))
      
      setEditingAssignment(null)
      setCurrentView('list')
      alert(`Assignment "${assignmentData.title}" updated successfully!`)
    }
  }

  const handleDeleteAssignment = (id: number) => {
    const assignment = assignments.find(a => a.id === id)
    if (assignment && confirm(`Are you sure you want to delete "${assignment.title}"?`)) {
      setAssignments(assignments.filter(assignment => assignment.id !== id))
    }
  }

  const handleEditClick = (assignment: Assignment) => {
    setEditingAssignment(assignment)
    setCurrentView('create')
  }

  const handleViewSubmissions = (assignment: Assignment) => {
    setViewingSubmissions(assignment)
    setCurrentView('submissions')
  }

  const handleToggleStatus = (id: number) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === id 
        ? { ...assignment, status: assignment.status === 'Active' ? 'Closed' : 'Active' }
        : assignment
    ))
  }

  const handleCreateNew = () => {
    setEditingAssignment(null)
    setCurrentView('create')
  }

  const handleCancel = () => {
    setEditingAssignment(null)
    setCurrentView('list')
  }

  const handleCloseSubmissions = () => {
    setViewingSubmissions(null)
    setCurrentView('list')
  }

  const getStats = () => {
    const active = assignments.filter(a => a.status === 'Active').length
    const closed = assignments.filter(a => a.status === 'Closed').length
    const overdue = assignments.filter(a => 
      a.status === 'Active' && new Date(a.dueDate) < new Date()
    ).length
    
    return { active, closed, overdue, total: assignments.length }
  }

  const stats = getStats()

  // Render based on current view
  if (currentView === 'create') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            📝 {editingAssignment ? 'Edit Assignment' : 'Create Assignment'}
          </h1>
        </div>
        <CreateAssignment
          onSubmit={editingAssignment ? handleEditAssignment : handleCreateAssignment}
          onCancel={handleCancel}
          editingAssignment={editingAssignment}
        />
      </div>
    )
  }

  if (currentView === 'submissions' && viewingSubmissions) {
    return (
      <SubmissionTracker
        assignment={viewingSubmissions}
        onClose={handleCloseSubmissions}
      />
    )
  }

  // Default list view
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Assignments 📝</h1>
        <button
          onClick={handleCreateNew}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          + Create Assignment
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.total}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Assignments</div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.active}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {stats.overdue}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Overdue</div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {stats.closed}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Closed</div>
        </div>
      </div>

      {/* Assignment List */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Assignment List
        </h2>
        <AssignmentList
          assignments={assignments}
          onEdit={handleEditClick}
          onDelete={handleDeleteAssignment}
          onView={handleViewSubmissions}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  )
}