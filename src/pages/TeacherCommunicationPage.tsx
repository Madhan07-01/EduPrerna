import { useState } from 'react'
import AnnouncementBoard from '../components/AnnouncementBoard'
import Chat from '../components/Chat'
import Notifications from '../components/Notifications'

export default function TeacherCommunicationPage() {
  const [activeTab, setActiveTab] = useState<'announcements' | 'chat' | 'notifications'>('announcements')

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Communication</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('announcements')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'announcements'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Announcements
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'chat'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Notifications
            </button>
          </nav>
        </div>
      </div>

      <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-6">
        {activeTab === 'announcements' && <AnnouncementBoard />}
        {activeTab === 'chat' && <Chat />}
        {activeTab === 'notifications' && <Notifications />}
      </div>
    </div>
  )
}