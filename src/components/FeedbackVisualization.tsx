import { useState } from 'react'
import { Pie, Bar } from 'react-chartjs-2'

interface FeedbackData {
  id: string
  category: 'teaching' | 'content' | 'engagement' | 'assignments' | 'overall'
  sentiment: 'positive' | 'neutral' | 'negative'
  rating: number
  comment: string
  date: string
  anonymous: boolean
}

export default function FeedbackVisualization() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'semester'>('month')

  // Mock feedback data
  const feedbackData: FeedbackData[] = [
    {
      id: 'FB001',
      category: 'teaching',
      sentiment: 'positive',
      rating: 9,
      comment: 'Very clear explanations and helpful examples',
      date: '2024-01-15',
      anonymous: true
    },
    {
      id: 'FB002',
      category: 'content',
      sentiment: 'positive',
      rating: 8,
      comment: 'Course material is well-structured and comprehensive',
      date: '2024-01-14',
      anonymous: true
    },
    {
      id: 'FB003',
      category: 'assignments',
      sentiment: 'neutral',
      rating: 6,
      comment: 'Assignments could be more challenging',
      date: '2024-01-13',
      anonymous: true
    },
    {
      id: 'FB004',
      category: 'engagement',
      sentiment: 'positive',
      rating: 9,
      comment: 'Interactive sessions are great!',
      date: '2024-01-12',
      anonymous: false
    },
    {
      id: 'FB005',
      category: 'overall',
      sentiment: 'negative',
      rating: 4,
      comment: 'Need more practical examples',
      date: '2024-01-11',
      anonymous: true
    },
    {
      id: 'FB006',
      category: 'teaching',
      sentiment: 'positive',
      rating: 10,
      comment: 'Excellent teaching methodology',
      date: '2024-01-10',
      anonymous: true
    },
    {
      id: 'FB007',
      category: 'content',
      sentiment: 'neutral',
      rating: 7,
      comment: 'Good content but could be updated',
      date: '2024-01-09',
      anonymous: true
    }
  ]

  const categories = ['teaching', 'content', 'engagement', 'assignments', 'overall']

  // Filter feedback based on category
  const filteredFeedback = selectedCategory === 'all' 
    ? feedbackData 
    : feedbackData.filter(fb => fb.category === selectedCategory)

  // Calculate sentiment distribution
  const sentimentCounts = filteredFeedback.reduce((acc, feedback) => {
    acc[feedback.sentiment] = (acc[feedback.sentiment] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sentimentData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [
          sentimentCounts.positive || 0,
          sentimentCounts.neutral || 0,
          sentimentCounts.negative || 0
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',  // green
          'rgba(245, 158, 11, 0.8)',  // yellow
          'rgba(239, 68, 68, 0.8)',   // red
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

  // Calculate category-wise ratings
  const categoryRatings = categories.map(category => {
    const categoryFeedback = feedbackData.filter(fb => fb.category === category)
    const avgRating = categoryFeedback.length > 0 
      ? categoryFeedback.reduce((sum, fb) => sum + fb.rating, 0) / categoryFeedback.length
      : 0
    return avgRating
  })

  const categoryData = {
    labels: categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
    datasets: [
      {
        label: 'Average Rating',
        data: categoryRatings,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
      },
    ],
  }

  const pieOptions = {
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

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
        beginAtZero: true,
        max: 10,
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
    },
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900'
      case 'neutral': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900'
      case 'negative': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900'
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '😊'
      case 'neutral': return '😐'
      case 'negative': return '😞'
      default: return '🤔'
    }
  }

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating / 2)
    const halfStar = rating % 2 >= 1
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
    
    return (
      <>
        {'⭐'.repeat(fullStars)}
        {halfStar && '⭐'}
        {'☆'.repeat(emptyStars)}
      </>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">💬 Student Feedback Analysis</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Period:</label>
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
      </div>

      {/* Feedback Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredFeedback.length}</p>
            </div>
            <div className="text-3xl">📝</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(filteredFeedback.reduce((sum, fb) => sum + fb.rating, 0) / filteredFeedback.length || 0).toFixed(1)}
              </p>
            </div>
            <div className="text-3xl">⭐</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Positive Feedback</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {((sentimentCounts.positive || 0) / filteredFeedback.length * 100 || 0).toFixed(0)}%
              </p>
            </div>
            <div className="text-3xl">😊</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">87%</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Sentiment Distribution
          </h3>
          <div className="h-80">
            <Pie data={sentimentData} options={pieOptions} />
          </div>
        </div>

        {/* Category Ratings */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Average Ratings by Category
          </h3>
          <div className="h-80">
            <Bar data={categoryData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Recent Feedback Comments */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Feedback Comments</h3>
        </div>
        
        <div className="p-6 space-y-4">
          {filteredFeedback.slice(0, 5).map((feedback) => (
            <div key={feedback.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(feedback.sentiment)}`}>
                    {getSentimentIcon(feedback.sentiment)} {feedback.sentiment}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">{getRatingStars(feedback.rating)}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">({feedback.rating}/10)</span>
                </div>
              </div>
              
              <p className="text-gray-900 dark:text-white mb-2">{feedback.comment}</p>
              
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{feedback.anonymous ? 'Anonymous' : 'Named'} feedback</span>
                <span>{new Date(feedback.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}