// no React import needed with automatic runtime
import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import CommunicationSection from '../components/CommunicationSection'
import AssignmentsSection from '../components/AssignmentsSection'
import AnalyticsSection from '../components/AnalyticsSection'
import TeacherActivityFeed from '../components/TeacherActivityFeed'
import ProfileSection from '../components/ProfileSection'
import TeacherDriveManager from '../components/TeacherDriveManager'
import GeneralSettings from '../components/GeneralSettings'
import ContextualUploadForm from '../components/ContextualUploadForm'
import ResourceListTable from '../components/ResourceListTable'
import TeacherDriveManagePage from './TeacherDriveManagePage'
import TeacherResourcesPage from './TeacherResourcesPage'
import ResourceFilter from '../components/ResourceFilter'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

// Enhanced Resources section component with modular upload form
const ResourcesSection = () => {
  const [resources, setResources] = useState([
    { id: 1, name: 'Mathematics Basics.pdf', uploadDate: '2023-10-15', lessonInfo: 'Mathematics / Grade 8 / Algebra', type: 'pdf' },
    { id: 2, name: 'Physics Formulas.ppt', uploadDate: '2023-10-10', lessonInfo: 'Physics / Grade 10 / Mechanics', type: 'ppt' },
    { id: 3, name: 'Chemistry Lab Guide.docx', uploadDate: '2023-09-28', lessonInfo: 'Chemistry / Grade 9 / Chemical Reactions', type: 'doc' }
  ])
  
  const [filteredResources, setFilteredResources] = useState(resources)

  const handleResourceUploaded = (newResource: any) => {
    const updatedResources = [...resources, newResource]
    setResources(updatedResources)
    setFilteredResources(updatedResources)
  }

  const handleDeleteResource = (id: number) => {
    const updatedResources = resources.filter(resource => resource.id !== id)
    setResources(updatedResources)
    setFilteredResources(updatedResources)
  }

  const handleFilterChange = (filters: { subject: string; grade: string; lesson: string }) => {
    let filtered = resources
    
    if (filters.subject) {
      filtered = filtered.filter(resource => 
        resource.lessonInfo.toLowerCase().includes(filters.subject.toLowerCase())
      )
    }
    
    if (filters.grade) {
      filtered = filtered.filter(resource => 
        resource.lessonInfo.toLowerCase().includes(`grade ${filters.grade.toLowerCase()}`)
      )
    }
    
    if (filters.lesson) {
      filtered = filtered.filter(resource => 
        resource.lessonInfo.toLowerCase().includes(filters.lesson.toLowerCase())
      )
    }
    
    setFilteredResources(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Resources 📚</h1>
        <div className="flex items-center gap-3">
          <a href="/teacher/resources/manage" className="text-sm text-blue-600 dark:text-blue-400 underline">Manage Drive Mappings</a>
          <div className="text-sm text-gray-500 dark:text-gray-400">Manage your teaching resources</div>
        </div>
      </div>
      
      {/* Contextual Upload Form */}
      <ContextualUploadForm onResourceUploaded={handleResourceUploaded} />
      
      {/* Resource Filter */}
      <ResourceFilter onFilterChange={handleFilterChange} />
      
      {/* Resource List Table */}
      <ResourceListTable 
        resources={filteredResources} 
        onDeleteResource={handleDeleteResource} 
      />
    </div>
  )
}

// Enhanced Dashboard component with interactive features
const DashboardSection = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()

  // Chart data for Total Students circular chart
  const studentsChartData = {
    datasets: [{
      data: [45, 35, 45], // Grade distribution
      backgroundColor: [
        '#3B82F6', // Blue
        '#10B981', // Green
        '#F59E0B'  // Amber
      ],
      borderWidth: 0,
      cutout: '70%'
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  }

  // Sample data for Recent Activity table
  const recentActivity = [
    {
      id: 1,
      student: "Alex Johnson",
      activity: "viewed 'Algebra Basics'",
      timestamp: "10 min ago",
      course: "Mathematics"
    },
    {
      id: 2,
      student: "Maria Chen",
      activity: "started 'Photosynthesis Quiz'",
      timestamp: "15 min ago",
      course: "Biology"
    },
    {
      id: 3,
      student: "David Smith",
      activity: "submitted 'Newton Laws HW'",
      timestamp: "25 min ago",
      course: "Physics"
    },
    {
      id: 4,
      student: "Sarah Wilson",
      activity: "completed 'Chemical Reactions'",
      timestamp: "30 min ago",
      course: "Chemistry"
    },
    {
      id: 5,
      student: "John Davis",
      activity: "viewed 'Calculus Introduction'",
      timestamp: "45 min ago",
      course: "Mathematics"
    }
  ]

  // Sample alerts data
  const alerts = [
    {
      id: 1,
      message: "Low Score: Alex Johnson (Chemistry Quiz)",
      type: "warning"
    },
    {
      id: 2,
      message: "Inactive: Maria S: last login 5 days ago",
      type: "warning"
    },
    {
      id: 3,
      message: "Missing HW: Newton Laws Assignment",
      type: "warning"
    },
    {
      id: 4,
      message: "Grade Deadline: Chemistry Test - Due Today",
      type: "urgent"
    }
  ]

  const handleQuizScoreClick = () => {
    navigate('/teacher/analytics')
  }

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">{t('teacher.title')}</div>
      
      {/* Enhanced Summary Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Students Card with Circular Chart */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
          <div className="text-gray-700 dark:text-slate-300 text-sm mb-2">Total Students</div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">125</div>
            <div className="w-12 h-12 relative">
              <Doughnut data={studentsChartData} options={chartOptions} />
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1"></span>Grade 6: 45
            <br />
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>Grade 7: 35
            <br />
            <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-1"></span>Grade 10: 45
          </div>
        </div>

        {/* Active Today Card */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
          <div className="text-gray-700 dark:text-slate-300 text-sm">Active Today</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">48</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">↗ +12% from yesterday</div>
        </div>

        {/* Lessons Completed Card */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
          <div className="text-gray-700 dark:text-slate-300 text-sm">Lessons Completed</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">890</div>
          <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">This month</div>
        </div>

        {/* Avg Quiz Score Card with Clickable Link */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
          <div className="text-gray-700 dark:text-slate-300 text-sm">Avg Quiz Score</div>
          <button 
            onClick={handleQuizScoreClick}
            className="text-2xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
          >
            78%
          </button>
          <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">Due this week</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Overview - Recent Activity Table */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6">
          <div className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4">Student Overview - Recent Activity</div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Student</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Activity</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Timestamp</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Course</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity) => (
                  <tr key={activity.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-2 text-sm text-gray-900 dark:text-white font-medium">{activity.student}</td>
                    <td className="py-3 px-2 text-sm text-gray-700 dark:text-gray-300">{activity.activity}</td>
                    <td className="py-3 px-2 text-sm text-gray-500 dark:text-gray-400">{activity.timestamp}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        activity.course === 'Mathematics' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        activity.course === 'Biology' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        activity.course === 'Physics' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                        activity.course === 'Chemistry' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                      }`}>
                        {activity.course}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Today's Activity Feed */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6">
          <div className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4">Today's Activity</div>
          <TeacherActivityFeed />
        </div>

        {/* Alerts Section */}
        <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6">
          <div className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4">Alerts</div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 dark:text-gray-200">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              View all alerts →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Settings Section Component
const SettingsSection = () => {
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Customize your dashboard preferences
        </div>
      </div>
      
      <GeneralSettings />
      
      {/* Future settings sections can be added here */}
      <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">More Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Additional settings will be available in future updates.</p>
      </div>
    </div>
  )
}

export default function TeacherDashboard() {
  return (
    <div className="p-6 overflow-auto">
      <Routes>
        <Route index element={<DashboardSection />} />
        <Route path="assignments" element={<AssignmentsSection />} />
        <Route path="resources" element={<TeacherResourcesPage />} />
        <Route path="resources/manage" element={<TeacherDriveManagePage />} />
        <Route path="communication" element={<CommunicationSection />} />
        <Route path="analytics" element={<AnalyticsSection />} />
        <Route path="profile" element={<ProfileSection />} />
        <Route path="drive" element={<TeacherDriveManager />} />
        <Route path="settings" element={<SettingsSection />} />
      </Routes>
    </div>
  )
}


