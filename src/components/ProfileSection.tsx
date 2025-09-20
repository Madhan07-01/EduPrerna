import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

// Basic Information Component
const BasicInformation = () => {
  const { t } = useLanguage()
  
  // Sample teacher data - in a real app, this would come from authentication context or API
  const teacherData = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@eduprerna.com",
    profilePicture: null // Placeholder for profile picture
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Basic Information</h2>
      
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <div className="w-24 h-24 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3">
            {teacherData.profilePicture ? (
              <img 
                src={teacherData.profilePicture} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <svg className="w-12 h-12 text-gray-400 dark:text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-slate-400 text-center">Profile Picture</p>
        </div>

        {/* Information Fields */}
        <div className="flex-1 space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <div className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white">
              {teacherData.name}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white">
              {teacherData.email}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Department
              </label>
              <div className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white">
                Mathematics & Science
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Employee ID
              </label>
              <div className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white">
                EMP-2024-001
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Account & Security Component
const AccountSecurity = () => {
  const { t } = useLanguage()
  
  // Change Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  // Update Email Form State
  const [emailForm, setEmailForm] = useState({
    newEmail: ''
  })

  // Loading states
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChangingPassword(true)
    
    // Validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!')
      setIsChangingPassword(false)
      return
    }
    
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!')
      setIsChangingPassword(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('Password changed successfully!')
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      alert('Failed to change password. Please try again.')
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingEmail(true)
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailForm.newEmail)) {
      alert('Please enter a valid email address!')
      setIsUpdatingEmail(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('Email update request sent! Please check your new email for verification.')
      setEmailForm({ newEmail: '' })
    } catch (error) {
      alert('Failed to update email. Please try again.')
    } finally {
      setIsUpdatingEmail(false)
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account & Security</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Change Password Form */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter current password"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter new password"
                required
                minLength={8}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm new password"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isChangingPassword}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {isChangingPassword ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>

        {/* Update Email Form */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Update Email</h3>
          <form onSubmit={handleEmailUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Email
              </label>
              <div className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white">
                sarah.johnson@eduprerna.com
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Email Address
              </label>
              <input
                type="email"
                value={emailForm.newEmail}
                onChange={(e) => setEmailForm(prev => ({ ...prev, newEmail: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter new email address"
                required
              />
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-medium">Note:</span> You will receive a verification email at your new address. Your current email will remain active until verification is complete.
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isUpdatingEmail}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {isUpdatingEmail ? 'Updating Email...' : 'Update Email'}
            </button>
          </form>
        </div>
      </div>

      {/* Security Tips */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">Security Tips:</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
          <li>• Use a strong password with at least 8 characters</li>
          <li>• Include uppercase, lowercase, numbers, and special characters</li>
          <li>• Don't reuse passwords from other accounts</li>
          <li>• Update your password regularly</li>
        </ul>
      </div>
    </div>
  )
}

// Main Profile Section Component
const ProfileSection = () => {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Profile Settings</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      <BasicInformation />
      <AccountSecurity />
    </div>
  )
}

export default ProfileSection