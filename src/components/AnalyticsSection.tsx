import { useState } from 'react'
import DashboardCharts from './DashboardCharts'
import StudentReports from './StudentReports'
import FeedbackVisualization from './FeedbackVisualization'
import ExportSharing from './ExportSharing'

type AnalyticsTab = 'overview' | 'reports' | 'feedback' | 'export'

export default function AnalyticsSection() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('overview')

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
    { id: 'reports', label: 'Student Reports', icon: '📋' },
    { id: 'feedback', label: 'Feedback Analysis', icon: '💬' },
    { id: 'export', label: 'Export & Share', icon: '📤' }
  ]

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardCharts />
      case 'reports':
        return <StudentReports />
      case 'feedback':
        return <FeedbackVisualization />
      case 'export':
        return <ExportSharing />
      default:
        return <DashboardCharts />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics & Reports 📈</h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AnalyticsTab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderActiveComponent()}
      </div>

      {/* Quick Access Footer */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border border-emerald-200 dark:border-slate-700 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Quick Actions</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Access frequently used features</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('export')}
              className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-1 px-3 rounded text-xs hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              📊 Generate Report
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-1 px-3 rounded text-xs hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              💬 View Feedback
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-1 px-3 rounded text-xs hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              📋 Student Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}