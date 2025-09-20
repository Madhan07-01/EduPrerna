import { useState } from 'react'
import AnnouncementBoard from '../components/AnnouncementBoard'
import Chat from '../components/Chat'
import Notifications from '../components/Notifications'

type CommunicationTab = 'announcements' | 'chat' | 'notifications'

export default function CommunicationSection() {
  const [activeTab, setActiveTab] = useState<CommunicationTab>('announcements')

  const tabs = [
    { id: 'announcements', label: 'Announcements', icon: '📢' },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'notifications', label: 'Quick Notifications', icon: '🔔' }
  ]

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'announcements':
        return <AnnouncementBoard />
      case 'chat':
        return <Chat />
      case 'notifications':
        return <Notifications />
      default:
        return <AnnouncementBoard />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Communication Hub 💬</h1>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CommunicationTab)}
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
    </div>
  )
}