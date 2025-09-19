import { useState } from 'react'

type Class = {
  id: string
  name: string
}

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

type CreateAssignmentProps = {
  onAssignmentCreate: (assignment: Assignment) => void
}

export default function CreateAssignment({ onAssignmentCreate }: CreateAssignmentProps) {
  const [assignment, setAssignment] = useState<Omit<Assignment, 'id' | 'status'>>({
    title: '',
    description: '',
    subject: '',
    grade: '',
    dueDate: '',
    classes: [],
    fileUrl: '',
    sendReminder: false
  })
  
  const [file, setFile] = useState<File | null>(null)
  
  // Mock classes data
  const classes: Class[] = [
    { id: '1', name: 'Class 10-A' },
    { id: '2', name: 'Class 10-B' },
    { id: '3', name: 'Class 9-A' },
    { id: '4', name: 'Class 9-B' },
    { id: '5', name: 'Class 8-A' }
  ]
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setAssignment(prev => ({ ...prev, [name]: value }))
  }
  
  const handleClassToggle = (classId: string) => {
    setAssignment(prev => {
      const isSelected = prev.classes.includes(classId)
      return {
        ...prev,
        classes: isSelected 
          ? prev.classes.filter(id => id !== classId)
          : [...prev.classes, classId]
      }
    })
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, you would upload the file to storage and get a URL
    // For this demo, we'll just use the file name as a placeholder
    const fileUrl = file ? URL.createObjectURL(file) : undefined
    
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      ...assignment,
      fileUrl,
      status: 'Active'
    }
    
    onAssignmentCreate(newAssignment)
    
    // Reset form
    setAssignment({
      title: '',
      description: '',
      subject: '',
      grade: '',
      dueDate: '',
      classes: [],
      fileUrl: '',
      sendReminder: false
    })
    setFile(null)
  }
  
  return (
    <div className="bg-white/80 dark:bg-slate-900/60 rounded-xl border border-gray-200 dark:border-slate-800 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Create New Assignment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Assignment Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={assignment.title}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject*
            </label>
            <select
              id="subject"
              name="subject"
              required
              value={assignment.subject}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
            >
              <option value="">Select Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Grade*
            </label>
            <select
              id="grade"
              name="grade"
              required
              value={assignment.grade}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
            >
              <option value="">Select Grade</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date*
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              required
              value={assignment.dueDate}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            value={assignment.description}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Assign to Classes*
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {classes.map(cls => (
              <div key={cls.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`class-${cls.id}`}
                  checked={assignment.classes.includes(cls.id)}
                  onChange={() => handleClassToggle(cls.id)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor={`class-${cls.id}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {cls.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Upload File (PDF, Doc, Images)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 dark:text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-medium
                      file:bg-emerald-50 file:text-emerald-700
                      dark:file:bg-emerald-900 dark:file:text-emerald-300
                      hover:file:bg-emerald-100 dark:hover:file:bg-emerald-800"
          />
          {file && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Selected file: {file.name}
            </p>
          )}
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="sendReminder"
            name="sendReminder"
            checked={assignment.sendReminder}
            onChange={(e) => setAssignment(prev => ({ ...prev, sendReminder: e.target.checked }))}
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
          />
          <label htmlFor="sendReminder" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Send notification reminder to students
          </label>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            Create Assignment
          </button>
        </div>
      </form>
    </div>
  )
}