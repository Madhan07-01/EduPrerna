import { useState } from 'react'

interface ContextualUploadFormProps {
  onResourceUploaded: (newResource: any) => void
}

const ContextualUploadForm = ({ onResourceUploaded }: ContextualUploadFormProps) => {
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')
  const [selectedLesson, setSelectedLesson] = useState('')

  const subjects = ['Mathematics', 'Computer Science', 'Physics', 'Chemistry', 'Biology']
  const grades = ['6', '7', '8', '9', '10', '11', '12']
  const lessons = ['Algebra', 'Geometry', 'Calculus', 'Programming', 'Mechanics', 'Chemical Reactions', 'Ecology']

  // Check if all three dropdowns have selections
  const isUploadEnabled = selectedSubject && selectedGrade && selectedLesson

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isUploadEnabled || !e.target.files || e.target.files.length === 0) {
      return
    }

    const file = e.target.files[0]
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    
    // Determine file type for icon
    let fileType = 'doc'
    if (['pdf'].includes(fileExtension || '')) fileType = 'pdf'
    else if (['ppt', 'pptx'].includes(fileExtension || '')) fileType = 'ppt'
    else if (['doc', 'docx'].includes(fileExtension || '')) fileType = 'doc'
    else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '')) fileType = 'img'
    else if (['mp4', 'webm', 'avi'].includes(fileExtension || '')) fileType = 'video'
    else if (['url', 'link'].includes(fileExtension || '')) fileType = 'link'

    // Create new resource
    const newResource = {
      id: Date.now(), // Simple ID generation
      name: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      lessonInfo: `${selectedSubject} / Grade ${selectedGrade} / ${selectedLesson}`,
      type: fileType
    }

    // Call parent callback to add resource
    onResourceUploaded(newResource)

    // Reset form
    setSelectedSubject('')
    setSelectedGrade('')
    setSelectedLesson('')
    
    // Clear file input
    e.target.value = ''

    // Show success message
    alert(`Successfully uploaded "${file.name}" for ${selectedSubject} - Grade ${selectedGrade} - ${selectedLesson}`)
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload New Resource</h2>
      
      {/* Contextual Selection Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Subject Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* Grade Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Grade <span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
          >
            <option value="">Select Grade</option>
            {grades.map(grade => (
              <option key={grade} value={grade}>Grade {grade}</option>
            ))}
          </select>
        </div>

        {/* Lesson Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Lesson <span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
          >
            <option value="">Select Lesson</option>
            {lessons.map(lesson => (
              <option key={lesson} value={lesson}>{lesson}</option>
            ))}
          </select>
        </div>

        {/* Upload Button */}
        <div>
          <label 
            htmlFor="contextual-file-upload" 
            className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium cursor-pointer transition-colors ${
              isUploadEnabled 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            }`}
          >
            <span className="mr-2">📁</span>
            Upload Resource
          </label>
          <input 
            id="contextual-file-upload" 
            type="file" 
            className="hidden" 
            onChange={handleFileUpload}
            accept=".pdf,.ppt,.pptx,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.webm,.avi,.url"
            disabled={!isUploadEnabled}
          />
        </div>
      </div>

      {/* Helper Text */}
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <span>📋 Select all three fields to enable upload</span>
          <span>•</span>
          <span>📁 Supported formats: PDF, PPT, DOC, Images, Videos</span>
        </div>
        {!isUploadEnabled && (
          <div className="mt-2 text-amber-600 dark:text-amber-400">
            ⚠️ Please select Subject, Grade, and Lesson before uploading
          </div>
        )}
      </div>

      {/* Selection Preview */}
      {(selectedSubject || selectedGrade || selectedLesson) && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-medium">Current Selection:</span>
            <div className="mt-1">
              {selectedSubject && <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded mr-2 text-xs">{selectedSubject}</span>}
              {selectedGrade && <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded mr-2 text-xs">Grade {selectedGrade}</span>}
              {selectedLesson && <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded mr-2 text-xs">{selectedLesson}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContextualUploadForm