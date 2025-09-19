import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

type Resource = {
  id: string
  fileName: string
  uploadedDate: string
  lessonInfo: string
  subjectInfo: string
  fileType: string
}

export default function TeacherResourcesPage() {
  const { t } = useLanguage()
  const [subject, setSubject] = useState<string>('')
  const [grade, setGrade] = useState<string>('')
  const [lesson, setLesson] = useState<string>('')
  
  // Mock data for resources
  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      fileName: 'Algebra Basics.pdf',
      uploadedDate: '2023-10-15',
      lessonInfo: 'Introduction to Algebra',
      subjectInfo: 'Mathematics',
      fileType: 'PDF'
    },
    {
      id: '2',
      fileName: 'Chemical Reactions.pptx',
      uploadedDate: '2023-10-10',
      lessonInfo: 'Types of Reactions',
      subjectInfo: 'Chemistry',
      fileType: 'PPT'
    },
    {
      id: '3',
      fileName: 'Programming Fundamentals.docx',
      uploadedDate: '2023-10-05',
      lessonInfo: 'Introduction to Programming',
      subjectInfo: 'Computer Science',
      fileType: 'DOC'
    }
  ])

  const subjects = ['Mathematics', 'Computer Science', 'Physics', 'Chemistry', 'Biology']
  const grades = ['6', '7', '8', '9', '10', '11', '12']
  const lessons = [
    'Introduction to Algebra', 
    'Linear Equations', 
    'Types of Reactions', 
    'Introduction to Programming',
    'Data Structures'
  ]

  const handleUpload = () => {
    // Upload functionality would be implemented here
    alert('Upload functionality will be implemented here')
  }

  const handleDelete = (id: string) => {
    setResources(resources.filter(resource => resource.id !== id))
  }

  const handleEdit = (id: string) => {
    // Edit functionality would be implemented here
    alert(`Edit resource with ID: ${id}`)
  }

  const handleView = (id: string) => {
    // View functionality would be implemented here
    alert(`View resource with ID: ${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Resources 📚</h1>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subject
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
          >
            <option value="">All Subjects</option>
            {subjects.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Grade
          </label>
          <select
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
          >
            <option value="">All Grades</option>
            {grades.map((g) => (
              <option key={g} value={g}>Grade {g}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lesson" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Lesson
          </label>
          <select
            id="lesson"
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
          >
            <option value="">All Lessons</option>
            {lessons.map((les) => (
              <option key={les} value={les}>{les}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Upload Button */}
      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
        >
          Upload Resource
        </button>
      </div>

      {/* Resources Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                File Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Uploaded Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Lesson/Subject Info
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {resources.map((resource) => (
              <tr key={resource.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {resource.fileName}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{resource.uploadedDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{resource.lessonInfo}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{resource.subjectInfo}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleView(resource.id)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(resource.id)}
                    className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(resource.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}