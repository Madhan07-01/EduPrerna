// no React import needed with automatic runtime
import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import TeacherSidebar from '../components/TeacherSidebar'
import CommunicationSection from '../components/CommunicationSection'
import AssignmentsSection from '../components/AssignmentsSection'
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom'

// Resource section component
const ResourcesSection = () => {
  const [subject, setSubject] = useState('')
  const [grade, setGrade] = useState('')
  const [lesson, setLesson] = useState('')
  const [resources, setResources] = useState([
    { id: 1, name: 'Mathematics Basics.pdf', uploadDate: '2023-10-15', lessonInfo: 'Mathematics / Grade 8 / Algebra', type: 'pdf' },
    { id: 2, name: 'Physics Formulas.ppt', uploadDate: '2023-10-10', lessonInfo: 'Physics / Grade 10 / Mechanics', type: 'ppt' },
    { id: 3, name: 'Chemistry Lab Guide.docx', uploadDate: '2023-09-28', lessonInfo: 'Chemistry / Grade 9 / Chemical Reactions', type: 'doc' }
  ])

  const subjects = ['Mathematics', 'Computer Science', 'Physics', 'Chemistry', 'Biology']
  const grades = ['6', '7', '8', '9', '10', '11', '12']
  const lessons = ['Algebra', 'Geometry', 'Calculus', 'Programming', 'Mechanics', 'Chemical Reactions', 'Ecology']

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would handle file upload to a server
    console.log('File upload:', e.target.files)
    alert('File upload functionality would be implemented here')
  }

  const handleDelete = (id: number) => {
    setResources(resources.filter(resource => resource.id !== id))
  }

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf': return '📄';
      case 'ppt': return '📊';
      case 'doc': return '📝';
      case 'img': return '🖼️';
      case 'video': return '🎬';
      case 'link': return '🔗';
      default: return '📄';
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Resources 📚</h1>
        <div>
          <label htmlFor="file-upload" className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded cursor-pointer">
            Upload Resource
          </label>
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            onChange={handleFileUpload}
            accept=".pdf,.ppt,.pptx,.doc,.docx,.jpg,.jpeg,.png,.mp4,.webm,.url"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
          <select 
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            {subjects.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grade</label>
          <select 
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">All Grades</option>
            {grades.map(g => (
              <option key={g} value={g}>Grade {g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lesson</label>
          <select 
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
          >
            <option value="">All Lessons</option>
            {lessons.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-lg">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-800">
              <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">File Name</th>
              <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Uploaded Date</th>
              <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Lesson/Subject Info</th>
              <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map(resource => (
              <tr key={resource.id} className="border-t border-gray-200 dark:border-gray-800">
                <td className="py-3 px-4 text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <span className="mr-2">{getFileIcon(resource.type)}</span>
                    {resource.name}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{resource.uploadDate}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{resource.lessonInfo}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => handleDelete(resource.id)}
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

// Dashboard component with stats
const DashboardSection = () => {
  const { t } = useLanguage()
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">{t('teacher.title')}</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Total Students', 'Active Today', 'Lessons Completed', 'Avg Quiz Score'].map((m, i) => (
          <div key={m} className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
            <div className="text-gray-700 dark:text-slate-300 text-sm">{m}</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{i === 3 ? '0%' : '0'}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
        <div className="text-gray-800 dark:text-slate-200 font-semibold mb-2">Student Overview</div>
        <div className="text-gray-700 dark:text-slate-300 text-sm">No data yet</div>
      </div>
    </div>
  )
}

// Placeholder components for other sections
// AssignmentsSection is now imported from components
const ExamsSection = () => <div className="text-2xl font-semibold text-gray-900 dark:text-white">Exams/Quizzes Section</div>
// CommunicationSection is now imported from components
const AnalyticsSection = () => <div className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics & Reports Section</div>
const SettingsSection = () => <div className="text-2xl font-semibold text-gray-900 dark:text-white">Settings Section</div>

export default function TeacherDashboard() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      <TeacherSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<DashboardSection />} />
          <Route path="/assignments" element={<AssignmentsSection />} />
          <Route path="/exams" element={<ExamsSection />} />
          <Route path="/resources" element={<ResourcesSection />} />
          <Route path="/communication" element={<CommunicationSection />} />
          <Route path="/analytics" element={<AnalyticsSection />} />
          <Route path="/settings" element={<SettingsSection />} />
          <Route path="*" element={<Navigate to="/teacher" replace />} />
        </Routes>
      </main>
    </div>
  )
}


