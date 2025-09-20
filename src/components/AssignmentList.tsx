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

interface AssignmentListProps {
  assignments: Assignment[]
  onEdit: (assignment: Assignment) => void
  onDelete: (id: number) => void
  onView: (assignment: Assignment) => void
  onToggleStatus: (id: number) => void
}

export default function AssignmentList({ assignments, onEdit, onDelete, onView, onToggleStatus }: AssignmentListProps) {
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

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status === 'Active'
  }

  const getStatusBadge = (assignment: Assignment) => {
    const isOverdueAssignment = isOverdue(assignment.dueDate, assignment.status)
    
    if (isOverdueAssignment) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          Overdue
        </span>
      )
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        assignment.status === 'Active'
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      }`}>
        {assignment.status}
      </span>
    )
  }

  if (assignments.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          <span className="text-4xl">📝</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No assignments yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Create your first assignment to get started!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Assignment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Subject/Grade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Classes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-gray-700">
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {assignment.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                      {assignment.description}
                    </div>
                    {assignment.attachments.length > 0 && (
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        📎 {assignment.attachments.length} attachment(s)
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {assignment.subject}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Grade {assignment.grade}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`text-sm ${
                    isOverdue(assignment.dueDate, assignment.status)
                      ? 'text-red-600 dark:text-red-400 font-medium'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {formatDate(assignment.dueDate)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {assignment.classes.join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(assignment)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onView(assignment)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(assignment)}
                      className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onToggleStatus(assignment.id)}
                      className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 text-sm transition-colors"
                    >
                      {assignment.status === 'Active' ? 'Close' : 'Reopen'}
                    </button>
                    <button
                      onClick={() => onDelete(assignment.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}