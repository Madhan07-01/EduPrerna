import { useState } from 'react'

type Submission = {
  id: string
  studentId: string
  studentName: string
  assignmentId: string
  submissionDate: string
  fileUrl?: string
  status: 'Pending' | 'Reviewed' | 'Graded'
  grade?: string
  feedback?: string
}

type SubmissionTrackerProps = {
  assignmentId: string
  assignmentTitle: string
  onBack: () => void
}

export default function SubmissionTracker({ 
  assignmentId, 
  assignmentTitle,
  onBack 
}: SubmissionTrackerProps) {
  // Mock submissions data
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: '1',
      studentId: 's1',
      studentName: 'Rahul Sharma',
      assignmentId,
      submissionDate: '2023-11-20T14:30:00',
      fileUrl: '#',
      status: 'Pending'
    },
    {
      id: '2',
      studentId: 's2',
      studentName: 'Priya Patel',
      assignmentId,
      submissionDate: '2023-11-21T09:15:00',
      fileUrl: '#',
      status: 'Pending'
    },
    {
      id: '3',
      studentId: 's3',
      studentName: 'Amit Kumar',
      assignmentId,
      submissionDate: '2023-11-19T16:45:00',
      fileUrl: '#',
      status: 'Pending'
    }
  ])

  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [feedback, setFeedback] = useState('')
  const [grade, setGrade] = useState('')

  const handleReview = (submission: Submission) => {
    setSelectedSubmission(submission)
    setFeedback(submission.feedback || '')
    setGrade(submission.grade || '')
  }

  const handleSaveReview = () => {
    if (!selectedSubmission) return

    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === selectedSubmission.id) {
        return {
          ...sub,
          status: grade ? 'Graded' as const : 'Reviewed' as const,
          grade: grade || undefined,
          feedback
        }
      }
      return sub
    })

    setSubmissions(updatedSubmissions)
    setSelectedSubmission(null)
    setFeedback('')
    setGrade('')
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Assignments
          </button>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-2">
            Submissions for: {assignmentTitle}
          </h2>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-slate-900/60 rounded-xl border border-gray-200 dark:border-slate-800 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Student Submissions</h3>
        
        {submissions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No submissions received yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Grade
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{submission.studentName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{formatDate(submission.submissionDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${submission.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : submission.status === 'Reviewed'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {submission.grade || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleReview(submission)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        {submission.status === 'Pending' ? 'Review' : 'Edit Review'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedSubmission && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Review Submission - {selectedSubmission.studentName}
              </h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Grade (optional)
                </label>
                <input
                  type="text"
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="e.g., A, B, 90%, etc."
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveReview}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Save Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}