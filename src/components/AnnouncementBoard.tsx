import { useState } from 'react'

interface Announcement {
  id: number
  title: string
  description: string
  date: string
  author: string
}

export default function AnnouncementBoard() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Welcome to the new semester!",
      description: "Welcome back students! We're excited to start this new semester with you all. Please make sure to check your schedules and required materials.",
      date: "2024-01-15",
      author: "Ms. Johnson"
    },
    {
      id: 2,
      title: "Assignment Deadline Reminder",
      description: "Don't forget that the Math assignment is due this Friday. Please submit your work through the portal.",
      date: "2024-01-12",
      author: "Mr. Smith"
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      // Edit existing announcement
      setAnnouncements(announcements.map(ann => 
        ann.id === editingId 
          ? { ...ann, title: formData.title, description: formData.description }
          : ann
      ))
      setEditingId(null)
    } else {
      // Add new announcement
      const newAnnouncement: Announcement = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        date: new Date().toISOString().split('T')[0],
        author: "Teacher" // In real app, this would come from auth context
      }
      setAnnouncements([newAnnouncement, ...announcements])
    }
    
    setFormData({ title: '', description: '' })
    setShowForm(false)
  }

  const handleEdit = (announcement: Announcement) => {
    setFormData({
      title: announcement.title,
      description: announcement.description
    })
    setEditingId(announcement.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(ann => ann.id !== id))
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ title: '', description: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">📢 Announcements</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          + New Announcement
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {editingId ? 'Edit Announcement' : 'Create New Announcement'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter announcement title..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter announcement details..."
                rows={4}
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                {editingId ? 'Update' : 'Post'} Announcement
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No announcements yet. Create your first announcement!
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {announcement.title}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {announcement.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>By {announcement.author}</span>
                <span>{new Date(announcement.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}