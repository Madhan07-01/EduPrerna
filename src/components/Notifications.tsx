import { useState } from 'react'

type Notification = {
  id: string
  title: string
  message: string
  timestamp: string
  type: 'assignment' | 'exam' | 'event'
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Assignment Deadline',
      message: 'Math assignment due tomorrow at 11:59 PM',
      timestamp: '2023-11-25 10:30 AM',
      type: 'assignment'
    },
    {
      id: '2',
      title: 'Upcoming Exam',
      message: 'Science exam scheduled for next Monday',
      timestamp: '2023-11-23 02:15 PM',
      type: 'exam'
    },
    {
      id: '3',
      title: 'School Event',
      message: 'Annual sports day on December 5th',
      timestamp: '2023-11-20 09:45 AM',
      type: 'event'
    }
  ])
  
  const [newNotification, setNewNotification] = useState<Partial<Notification>>({
    title: '',
    message: '',
    type: 'assignment'
  })

  const handleAddNotification = () => {
    if (!newNotification.title || !newNotification.message) return
    
    const now = new Date()
    const formattedDate = now.toISOString().split('T')[0]
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    const notification: Notification = {
      id: Date.now().toString(),
      title: newNotification.title,
      message: newNotification.message,
      timestamp: `${formattedDate} ${formattedTime}`,
      type: newNotification.type as 'assignment' | 'exam' | 'event'
    }
    
    setNotifications([notification, ...notifications])
    setNewNotification({ title: '', message: '', type: 'assignment' })
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return '📝'
      case 'exam':
        return '📋'
      case 'event':
        return '🎉'
      default:
        return '📢'
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-slate-900/60 rounded-xl border border-gray-200 dark:border-slate-800 p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Send Quick Notification</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newNotification.title}
              onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
              placeholder="Notification title"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
              value={newNotification.message}
              onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
              rows={2}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
              placeholder="Notification details"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <select
              id="type"
              value={newNotification.type}
              onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value as any })}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
            >
              <option value="assignment">Assignment</option>
              <option value="exam">Exam</option>
              <option value="event">Event</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddNotification}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              Send Notification
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sent Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No notifications sent yet.</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="bg-white/80 dark:bg-slate-900/60 rounded-xl border border-gray-200 dark:border-slate-800 p-4 flex items-start"
              >
                <div className="text-2xl mr-3">{getTypeIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{notification.title}</h3>
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Sent on {notification.timestamp}
                  </p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}