import { useState } from 'react'

type Message = {
  id: string
  sender: string
  content: string
  timestamp: string
  isTeacher: boolean
}

type Contact = {
  id: string
  name: string
  lastSeen: string
  unread: number
}

export default function Chat() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Class 10A Group', lastSeen: '2 min ago', unread: 2 },
    { id: '2', name: 'Rahul Sharma', lastSeen: '1 hour ago', unread: 0 },
    { id: '3', name: 'Priya Patel', lastSeen: 'Yesterday', unread: 1 },
    { id: '4', name: 'Amit Kumar', lastSeen: '2 days ago', unread: 0 },
  ])
  
  const [selectedContact, setSelectedContact] = useState<string>('1')
  
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      { id: '1', sender: 'You', content: 'Good morning everyone! Don\'t forget to submit your assignments by tomorrow.', timestamp: '9:00 AM', isTeacher: true },
      { id: '2', sender: 'Rahul Sharma', content: 'Yes, teacher. I\'ve already submitted mine.', timestamp: '9:05 AM', isTeacher: false },
      { id: '3', sender: 'Priya Patel', content: 'I\'ll submit mine by evening.', timestamp: '9:10 AM', isTeacher: false },
    ],
    '2': [
      { id: '1', sender: 'You', content: 'Rahul, how is your project coming along?', timestamp: '2:00 PM', isTeacher: true },
      { id: '2', sender: 'Rahul Sharma', content: 'It\'s going well, teacher. I\'m working on the final touches.', timestamp: '2:15 PM', isTeacher: false },
    ],
    '3': [
      { id: '1', sender: 'Priya Patel', content: 'Teacher, I had a question about the homework.', timestamp: 'Yesterday', isTeacher: false },
      { id: '2', sender: 'You', content: 'Sure, what\'s your question?', timestamp: 'Yesterday', isTeacher: true },
    ],
    '4': [
      { id: '1', sender: 'You', content: 'Amit, please see me after class tomorrow.', timestamp: '2 days ago', isTeacher: true },
      { id: '2', sender: 'Amit Kumar', content: 'Yes, teacher. Is everything okay?', timestamp: '2 days ago', isTeacher: false },
      { id: '3', sender: 'You', content: 'Yes, I just want to discuss your recent progress.', timestamp: '2 days ago', isTeacher: true },
    ],
  })
  
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTeacher: true
    }
    
    setMessages({
      ...messages,
      [selectedContact]: [...(messages[selectedContact] || []), message]
    })
    
    setNewMessage('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-[600px] bg-white/80 dark:bg-slate-900/60 rounded-xl border border-gray-200 dark:border-slate-800">
      {/* Contacts sidebar */}
      <div className="w-1/3 border-r border-gray-200 dark:border-slate-800">
        <div className="p-4 border-b border-gray-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chats</h2>
        </div>
        <div className="overflow-y-auto h-[calc(600px-64px)]">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              className={`p-4 cursor-pointer border-b border-gray-200 dark:border-slate-800 ${
                selectedContact === contact.id
                  ? 'bg-gray-100 dark:bg-slate-800'
                  : 'hover:bg-gray-50 dark:hover:bg-slate-900'
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-900 dark:text-white">{contact.name}</h3>
                {contact.unread > 0 && (
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-600 text-white text-xs">
                    {contact.unread}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{contact.lastSeen}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {contacts.find(c => c.id === selectedContact)?.name}
          </h2>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages[selectedContact]?.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isTeacher ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.isTeacher
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white'
                }`}
              >
                {!message.isTeacher && (
                  <p className="text-xs font-medium mb-1">{message.sender}</p>
                )}
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${message.isTeacher ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Message input */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          <div className="flex items-center">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white resize-none"
              placeholder="Type a message..."
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}