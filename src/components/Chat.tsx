import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  sender: string
  text: string
  timestamp: string
  isOwnMessage: boolean
}

interface ChatUser {
  id: number
  name: string
  avatar: string
  isOnline: boolean
}

export default function Chat() {
  const [activeChat, setActiveChat] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [users] = useState<ChatUser[]>([
    { id: 1, name: 'Student Group A', avatar: '👥', isOnline: true },
    { id: 2, name: 'Student Group B', avatar: '👥', isOnline: false },
    { id: 3, name: 'John Smith', avatar: '👨‍🎓', isOnline: true },
    { id: 4, name: 'Emma Johnson', avatar: '👩‍🎓', isOnline: true },
    { id: 5, name: 'Michael Brown', avatar: '👨‍🎓', isOnline: false }
  ])

  const [messages, setMessages] = useState<Record<number, Message[]>>({
    1: [
      {
        id: 1,
        sender: 'Teacher',
        text: 'Good morning everyone! How are you all doing with the latest assignment?',
        timestamp: '09:30',
        isOwnMessage: true
      },
      {
        id: 2,
        sender: 'Alice',
        text: 'Good morning! I have a question about problem 3.',
        timestamp: '09:32',
        isOwnMessage: false
      },
      {
        id: 3,
        sender: 'Bob',
        text: 'Same here, it\'s a bit confusing.',
        timestamp: '09:33',
        isOwnMessage: false
      }
    ],
    3: [
      {
        id: 1,
        sender: 'John Smith',
        text: 'Hi teacher, could you help me with the homework?',
        timestamp: '14:15',
        isOwnMessage: false
      },
      {
        id: 2,
        sender: 'Teacher',
        text: 'Of course! What specific part are you struggling with?',
        timestamp: '14:20',
        isOwnMessage: true
      }
    ]
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, activeChat])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !activeChat) return

    const message: Message = {
      id: Date.now(),
      sender: 'Teacher',
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isOwnMessage: true
    }

    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), message]
    }))

    setNewMessage('')
  }

  const getActiveUser = () => users.find(user => user.id === activeChat)

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg h-96 flex">
      {/* Chat List Sidebar */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">💬 Chats</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => setActiveChat(user.id)}
              className={`w-full p-3 text-left border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${
                activeChat === user.id ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="text-2xl">{user.avatar}</span>
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user.isOnline ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getActiveUser()?.avatar}</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {getActiveUser()?.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {getActiveUser()?.isOnline ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(messages[activeChat] || []).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwnMessage
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    {!message.isOwnMessage && (
                      <div className="text-xs font-medium mb-1 opacity-75">
                        {message.sender}
                      </div>
                    )}
                    <div className="text-sm">{message.text}</div>
                    <div className={`text-xs mt-1 ${
                      message.isOwnMessage ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  )
}