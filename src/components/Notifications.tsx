import { useState } from 'react'

interface Notification {
  id: number
  title: string
  message: string
  type: 'assignment' | 'exam' | 'event' | 'general'
  date: string
  recipients: string
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Math Quiz Tomorrow",
      message: "Don't forget about the algebra quiz scheduled for tomorrow at 10 AM.",
      type: "exam",
      date: "2024-01-16",
      recipients: "Grade 8A"
    },
    {
      id: 2,
      title: "Science Project Due Date",
      message: "The environmental science project is due this Friday. Please submit your reports on time.",
      type: "assignment",
      date: "2024-01-15",
      recipients: "Grade 9B"
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      message: "Annual parent-teacher meeting scheduled for next week. More details will follow.",
      type: "event",
      date: "2024-01-14",
      recipients: "All Classes"
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'general' as Notification['type'],
    recipients: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newNotification: Notification = {
      id: Date.now(),
      title: formData.title,
      message: formData.message,
      type: formData.type,
      date: new Date().toISOString().split('T')[0],
      recipients: formData.recipients
    }
    
    setNotifications([newNotification, ...notifications])
    setFormData({
      title: '',
      message: '',
      type: 'general',
      recipients: ''
    })
    setShowForm(false)
    
    // In a real app, this would send the notification to students
    alert(`Notification "${formData.title}" sent to ${formData.recipients}!`)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this notification?')) {
      setNotifications(notifications.filter(notif => notif.id !== id))
    }
  }

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'assignment': return '📝'
      case 'exam': return '📋'
      case 'event': return '📅'
      case 'general': return '📢'
      default: return '📢'
    }
  }

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'assignment': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'exam': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'event': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'general': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">🔔 Quick Notifications</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          + Send Notification
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Send Quick Notification
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Notification title..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Notification['type'] })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="general">General</option>
                  <option value="assignment">Assignment</option>
                  <option value="exam">Exam/Quiz</option>
                  <option value="event">Event</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Recipients
              </label>
              <input
                type="text"
                value={formData.recipients}
                onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g., Grade 8A, All Classes, Grade 9B..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your notification message..."
                rows={3}
                required
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Send Notification
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sent Notifications</h3>
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No notifications sent yet.
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {notification.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        to {notification.recipients}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(notification.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
                >
                  Delete
                </button>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-3 ml-11">
                {notification.message}
              </p>
              
              <div className="text-sm text-gray-500 dark:text-gray-400 ml-11">
                Sent on {new Date(notification.date).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}