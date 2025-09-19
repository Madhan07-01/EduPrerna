import { useState } from 'react'

type Announcement = {
  id: string
  title: string
  description: string
  date: string
}

export default function AnnouncementBoard() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'End of Term Exams',
      description: 'End of term exams will begin on December 15th. Please ensure all coursework is submitted by December 10th.',
      date: '2023-11-25'
    },
    {
      id: '2',
      title: 'Parent-Teacher Meeting',
      description: 'Parent-teacher meetings are scheduled for next Friday. Please check your email for your assigned time slot.',
      date: '2023-11-20'
    }
  ])
  
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    title: '',
    description: ''
  })
  
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.description) return
    
    const announcement: Announcement = {
      id: Date.now().toString(),
      title: newAnnouncement.title,
      description: newAnnouncement.description,
      date: new Date().toISOString().split('T')[0]
    }
    
    setAnnouncements([announcement, ...announcements])
    setNewAnnouncement({ title: '', description: '' })
  }

  const handleEditAnnouncement = (id: string) => {
    const announcement = announcements.find(a => a.id === id)
    if (!announcement) return
    
    setNewAnnouncement({
      title: announcement.title,
      description: announcement.description
    })
    setEditingId(id)
  }

  const handleUpdateAnnouncement = () => {
    if (!editingId || !newAnnouncement.title || !newAnnouncement.description) return
    
    setAnnouncements(announcements.map(a => 
      a.id === editingId 
        ? { 
            ...a, 
            title: newAnnouncement.title as string, 
            description: newAnnouncement.description as string 
          } 
        : a
    ))
    
    setNewAnnouncement({ title: '', description: '' })
    setEditingId(null)
  }

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id))
  }

  const handleCancelEdit = () => {
    setNewAnnouncement({ title: '', description: '' })
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-slate-900/60 rounded-xl border border-gray-200 dark:border-slate-800 p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {editingId ? 'Edit Announcement' : 'Post New Announcement'}
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
              placeholder="Announcement title"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={newAnnouncement.description}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
              rows={3}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
              placeholder="Announcement details"
            />
          </div>
          <div className="flex justify-end space-x-2">
            {editingId && (
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              onClick={editingId ? handleUpdateAnnouncement : handleAddAnnouncement}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              {editingId ? 'Update' : 'Post'}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Announcements</h2>
        {announcements.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No announcements yet.</p>
        ) : (
          announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className="bg-white/80 dark:bg-slate-900/60 rounded-xl border border-gray-200 dark:border-slate-800 p-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{announcement.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditAnnouncement(announcement.id)}
                    className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Posted on {announcement.date}
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{announcement.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}