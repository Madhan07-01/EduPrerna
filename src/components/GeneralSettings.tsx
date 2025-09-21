import { useState, useEffect } from 'react'

const GeneralSettings = () => {
  
  // Theme state - get from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })
  
  // Language state - get from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  // Available languages - only English, Hindi, and Odia
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' }
  ]

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', language)
    // In a real app, this would trigger language context update
  }, [language])

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">General Preferences</h2>
      
      <div className="space-y-8">
        {/* Theme Switch */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Theme Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose between light and dark theme for the dashboard interface
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${theme === 'light' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                ☀️ Light
              </span>
              <button
                onClick={handleThemeToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={theme === 'dark'}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                🌙 Dark
              </span>
            </div>
          </div>
        </div>

        {/* Language Selector */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Interface Language</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select your preferred language for the dashboard interface
          </p>
          <div className="max-w-md">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Current: {languages.find(lang => lang.code === language)?.flag} {languages.find(lang => lang.code === language)?.name}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Settings are automatically saved when changed
            </div>
            <button
              onClick={() => {
                // In a real app, this would sync settings to server
                alert('Settings have been saved successfully!')
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              💾 Save All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralSettings