import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function DashboardCharts() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'semester'>('month')

  // Mock data for Student Performance Overview
  const performanceData = {
    labels: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'],
    datasets: [
      {
        label: 'Average Grade (%)',
        data: [85, 78, 82, 79, 88],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 2,
      },
    ],
  }

  // Mock data for Class Participation
  const participationData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Announcements Read',
        data: [85, 92, 78, 95],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Chat Messages',
        data: [45, 38, 52, 41],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Assignment Submissions',
        data: [78, 85, 72, 88],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
      },
    ],
  }

  // Mock data for Engagement Distribution
  const engagementData = {
    labels: ['Highly Engaged', 'Moderately Engaged', 'Low Engagement'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(156, 163, 175)', // gray-400
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgb(156, 163, 175)',
          padding: 20,
        },
      },
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">📊 Dashboard Charts</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Timeframe:</label>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as 'week' | 'month' | 'semester')}
            className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Performance Overview */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Student Performance Overview
          </h3>
          <div className="h-80">
            <Bar data={performanceData} options={chartOptions} />
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Average performance across all subjects for {selectedTimeframe}
          </div>
        </div>

        {/* Class Participation Trends */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Class Participation Trends
          </h3>
          <div className="h-80">
            <Line data={participationData} options={chartOptions} />
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Student engagement metrics over time
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Distribution */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Student Engagement
          </h3>
          <div className="h-64">
            <Doughnut data={engagementData} options={doughnutOptions} />
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">127</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
            <div className="mt-2">
              <span className="text-green-600 dark:text-green-400 text-sm">+5.2%</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">vs last month</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">83.2%</p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
            <div className="mt-2">
              <span className="text-green-600 dark:text-green-400 text-sm">+2.1%</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">vs last month</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Assignments Submitted</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">89%</p>
              </div>
              <div className="text-3xl">📝</div>
            </div>
            <div className="mt-2">
              <span className="text-yellow-600 dark:text-yellow-400 text-sm">-1.3%</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">vs last month</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Today</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">84</p>
              </div>
              <div className="text-3xl">🔥</div>
            </div>
            <div className="mt-2">
              <span className="text-green-600 dark:text-green-400 text-sm">+12.5%</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">vs yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}