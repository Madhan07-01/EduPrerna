import { useState } from 'react'

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

interface Submission {
  id: number
  assignmentId: number
  studentName: string
  studentId: string
  submissionDate: string
  status: 'Submitted' | 'Late' | 'Reviewed' | 'Graded'
  grade?: string
  feedback?: string
  attachments: string[]
}

interface SubmissionTrackerProps {
  assignment: Assignment
  onClose: () => void
}

export default function SubmissionTracker({ assignment, onClose }: SubmissionTrackerProps) {
  // Mock submission data - in real app, this would come from API
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 1,
      assignmentId: assignment.id,
      studentName: 'Alice Johnson',
      studentId: 'STU001',
      submissionDate: '2024-01-15T10:30:00',
      status: 'Submitted',
      attachments: ['alice_assignment.pdf']
    },
    {
      id: 2,
      assignmentId: assignment.id,
      studentName: 'Bob Smith',
      studentId: 'STU002',
      submissionDate: '2024-01-16T14:20:00',
      status: 'Late',
      attachments: ['bob_work.docx']
    },
    {
      id: 3,
      assignmentId: assignment.id,
      studentName: 'Carol Davis',
      studentId: 'STU003',
      submissionDate: '2024-01-14T09:15:00',
      status: 'Graded',
      grade: 'A',
      feedback: 'Excellent work!',
      attachments: ['carol_project.pdf', 'carol_notes.txt']
    }
  ])

  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [gradeInput, setGradeInput] = useState('')
  const [feedbackInput, setFeedbackInput] = useState('')

  // Mock list of students who haven't submitted
  const allStudents = [
    'Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 
    'Emma Brown', 'Frank Miller', 'Grace Lee', 'Henry Taylor'
  ]
  
  const submittedStudents = submissions.map(s => s.studentName)
  const notSubmittedStudents = allStudents.filter(student => 
    !submittedStudents.includes(student)
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (submission: Submission) => {
    const colors = {
      'Submitted': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Late': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Reviewed': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Graded': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[submission.status]}`}>
        {submission.status}
      </span>
    )
  }

  const handleGradeSubmission = (submissionId: number) => {
    if (!gradeInput.trim()) {
      alert('Please enter a grade')
      return
    }

    setSubmissions(submissions.map(sub => 
      sub.id === submissionId 
        ? { 
            ...sub, 
            status: 'Graded' as const,
            grade: gradeInput,
            feedback: feedbackInput 
          }
        : sub
    ))

    setSelectedSubmission(null)
    setGradeInput('')
    setFeedbackInput('')
    alert('Grade submitted successfully!')
  }

  const markAsReviewed = (submissionId: number) => {
    setSubmissions(submissions.map(sub => 
      sub.id === submissionId 
        ? { ...sub, status: 'Reviewed' as const }
        : sub
    ))
  }

  const openGradingModal = (submission: Submission) => {
    setSelectedSubmission(submission)
    setGradeInput(submission.grade || '')
    setFeedbackInput(submission.feedback || '')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            📊 Submission Tracker
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {assignment.title} - {assignment.subject} (Grade {assignment.grade})
          </p>
        </div>
        <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
        >
          Close
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {submissions.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Submissions</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {submissions.filter(s => s.status === 'Graded').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Graded</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {submissions.filter(s => s.status === 'Late').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Late Submissions</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {notSubmittedStudents.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Not Submitted</div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Submissions</h3>
        </div>
        
        {submissions.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No submissions yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-gray-700">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {submission.studentName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {submission.studentId}
                        </div>
                        {submission.attachments.length > 0 && (
                          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            📎 {submission.attachments.length} file(s)
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {formatDate(submission.submissionDate)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(submission)}
                    </td>
                    <td className="px-6 py-4">
                      {submission.grade && (
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {submission.grade}
                        </div>
                      )}
                      {submission.feedback && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {submission.feedback}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {submission.status !== 'Graded' && (
                          <>
                            <button
                              onClick={() => openGradingModal(submission)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm transition-colors"
                            >
                              Grade
                            </button>
                            {submission.status !== 'Reviewed' && (
                              <button
                                onClick={() => markAsReviewed(submission.id)}
                                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm transition-colors"
                              >
                                Mark Reviewed
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Not Submitted Students */}
      {notSubmittedStudents.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Students Who Haven't Submitted ({notSubmittedStudents.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {notSubmittedStudents.map((student, index) => (
              <div key={index} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 px-3 py-2 rounded">
                {student}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grading Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Grade Submission - {selectedSubmission.studentName}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Grade
                </label>
                <input
                  type="text"
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., A, B+, 85%, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Feedback (Optional)
                </label>
                <textarea
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Optional feedback for the student..."
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleGradeSubmission(selectedSubmission.id)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Submit Grade
              </button>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}