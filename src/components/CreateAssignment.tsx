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

interface CreateAssignmentProps {
  onSubmit: (assignment: Omit<Assignment, 'id' | 'status'>) => void
  onCancel: () => void
  editingAssignment?: Assignment | null
}

export default function CreateAssignment({ onSubmit, onCancel, editingAssignment }: CreateAssignmentProps) {
  const [formData, setFormData] = useState({
    title: editingAssignment?.title || '',
    description: editingAssignment?.description || '',
    subject: editingAssignment?.subject || '',
    grade: editingAssignment?.grade || '',
    dueDate: editingAssignment?.dueDate || '',
    classes: editingAssignment?.classes || [],
    sendReminder: editingAssignment?.sendReminder || false
  })
  
  const [attachments, setAttachments] = useState<File[]>([])
  const [selectedClasses, setSelectedClasses] = useState<string[]>(editingAssignment?.classes || [])

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Physics', 'Chemistry', 'Biology', 'Computer Science']
  const grades = ['6', '7', '8', '9', '10', '11', '12']
  const availableClasses = ['6A', '6B', '7A', '7B', '8A', '8B', '9A', '9B', '10A', '10B', '11A', '11B', '12A', '12B']

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setAttachments(prev => [...prev, ...newFiles])
    }
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch(extension) {
      case 'pdf': return '📄'
      case 'doc': case 'docx': return '📝'
      case 'jpg': case 'jpeg': case 'png': return '🖼️'
      case 'txt': return '📋'
      default: return '📎'
    }
  }

  const removeFile = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleClassToggle = (className: string) => {
    setSelectedClasses(prev => 
      prev.includes(className) 
        ? prev.filter(c => c !== className)
        : [...prev, className]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedClasses.length === 0) {
      alert('Please select at least one class')
      return
    }

    onSubmit({
      ...formData,
      classes: selectedClasses,
      attachments
    })
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        {editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title and Subject Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assignment Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter assignment title..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subject *
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grade and Due Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Grade *
            </label>
            <select
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            >
              <option value="">Select Grade</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>Grade {grade}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Due Date *
            </label>
            <input
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter assignment description..."
            rows={4}
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Attachments
          </label>
          <div className="flex items-center gap-4">
            <label className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded cursor-pointer transition-colors">
              📎 Upload Files
              <input
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                onChange={handleFileUpload}
              />
            </label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Supported: PDF, DOC, Images
            </span>
          </div>
          
          {attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📄</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Class Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Assign to Classes *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {availableClasses.map(className => (
              <label key={className} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedClasses.includes(className)}
                  onChange={() => handleClassToggle(className)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{className}</span>
              </label>
            ))}
          </div>
          {selectedClasses.length > 0 && (
            <div className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
              Selected: {selectedClasses.join(', ')}
            </div>
          )}
        </div>

        {/* Send Reminder */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="sendReminder"
            checked={formData.sendReminder}
            onChange={(e) => setFormData({ ...formData, sendReminder: e.target.checked })}
            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="sendReminder" className="text-sm text-gray-700 dark:text-gray-300">
            Send notification reminder to students
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md transition-colors"
          >
            {editingAssignment ? 'Update' : 'Create'} Assignment
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}