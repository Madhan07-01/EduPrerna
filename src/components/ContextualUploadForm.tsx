import { useContext, useState } from 'react'
import { db, storage } from '../firebase/firebaseConfig'
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useToast } from './ToastProvider'
import { driveDirectDownloadUrl } from '../data/driveFiles'

import { getSubjects, getGrades, getLessons } from '../data/curriculumData'
import type { Subject, Grade, Lesson } from '../data/curriculumData'
import { AuthContext } from '../contexts/AuthContext'

interface ContextualUploadFormProps {
  onResourceUploaded: (newResource: any) => void
}

const ContextualUploadForm = ({ onResourceUploaded }: ContextualUploadFormProps) => {
  const authCtx = useContext(AuthContext)
  const [selectedSubject, setSelectedSubject] = useState<Subject | ''>('')
  const [selectedGrade, setSelectedGrade] = useState<Grade | ''>('')
  const [selectedLesson, setSelectedLesson] = useState<Lesson | ''>('')
  const [manualIdOrUrl, setManualIdOrUrl] = useState('')
  const [useManual, setUseManual] = useState(false)
  const toast = useToast()

  // Get available options based on current selections
  const availableSubjects = getSubjects()
  const availableGrades = selectedSubject ? getGrades(selectedSubject) : []
  const availableLessons = selectedSubject && selectedGrade ? getLessons(selectedSubject, selectedGrade) : []

  // Check if all three dropdowns have selections
  const isTeacher = (authCtx?.profile?.role === 'teacher' || authCtx?.profile?.role === 'admin')
  const isUploadEnabled = !!isTeacher && !!selectedSubject && !!selectedGrade && !!selectedLesson

  // Handle subject change - reset grade and lesson
  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value as Subject)
    setSelectedGrade('')
    setSelectedLesson('')
  }

  // Handle grade change - reset lesson
  const handleGradeChange = (value: string) => {
    setSelectedGrade(value)
    setSelectedLesson('')
  }

  // Handle lesson change
  const handleLessonChange = (value: string) => {
    setSelectedLesson(value)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    try {
      if (!isTeacher) {
        toast.error('🚫 Upload failed: Insufficient permissions. Please check teacher role.')
        return
      }
      const uid = authCtx?.currentUser?.uid
      if (!uid) {
        toast.error('🚫 Upload failed: Not signed in.')
        return
      }
      // Derive grade number and chapter number
      const gradeNum = parseInt(String(selectedGrade), 10)
      // selectedLesson may be like 'Chapter 1' or 'Lesson 1' → extract digits
      const lessonStr = String(selectedLesson)
      const chMatch = lessonStr.match(/(\d+)/)
      const chapterNum = chMatch ? parseInt(chMatch[1], 10) : 1

      // Either use manual ID/URL, or upload to Firebase Storage
      let url: string
      if (useManual && manualIdOrUrl.trim()) {
        const raw = manualIdOrUrl.trim()
        // Accept full URL or Drive FILE_ID; normalize with driveDirectDownloadUrl
        url = driveDirectDownloadUrl(raw)
      } else {
        if (!['pdf','zip'].includes(fileExtension || '')) {
          toast.info('⚠️ File must be PDF or ZIP for this slot.')
          return
        }
        // Include user namespace to align with security rules best practice
        const path = `teacher_uploads/${uid}/grade${gradeNum}/chapter${chapterNum}/${Date.now()}_${file.name}`
        const storageRef = ref(storage, path)
        await uploadBytes(storageRef, file)
        url = await getDownloadURL(storageRef)
      }

      // Determine mapping key and kind (pdf/zip)
      const kind = (fileExtension === 'zip') ? 'zip' : 'pdf'
      const gradeKey = `grade${gradeNum}`
      const mapRef = doc(db, 'driveMappings', gradeKey)
      const flatKey = `${chapterNum}.${kind}` // e.g., '1.pdf'
      await setDoc(mapRef, { [flatKey]: url }, { merge: true })

      // Log activity event for teacher uploads
      try {
        const day = new Date().toISOString().split('T')[0]
        const eventsCol = collection(db, 'activity', day, 'events')
        await addDoc(eventsCol, {
          type: 'upload',
          grade: String(gradeNum),
          chapter: String(chapterNum),
          fileType: kind,
          uploadedBy: uid,
          createdAt: serverTimestamp(),
          source: 'teacherUpload',
          details: { subject: selectedSubject, lesson: selectedLesson, pathHint: 'driveMappings' }
        })
      } catch (logErr) {
        console.warn('Failed to log activity event', logErr)
      }

      // Create new resource object for the UI table (optional)
      const newResource = {
        id: Date.now(),
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        lessonInfo: `${selectedSubject} / Grade ${gradeNum} / Chapter ${chapterNum}`,
        type: fileType
      }
      onResourceUploaded(newResource)

      // Reset form and input
      setSelectedSubject('')
      setSelectedGrade('')
      setSelectedLesson('')
      e.target.value = ''

      // Success toast
      toast.success(`File mapped to Grade ${gradeNum} → Chapter ${chapterNum} (${kind.toUpperCase()}).`)
    } catch (err: any) {
      console.error('Upload/mapping failed', err)
      if (err?.code === 'permission-denied') {
        toast.error('🚫 Upload failed: Insufficient permissions. Please check teacher role.')
      } else {
        toast.error('Failed to upload and map file. Please try again.')
      }
    }
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
            onChange={(e) => handleSubjectChange(e.target.value)}
          >
            <option value="">Select Subject</option>
            {availableSubjects.map(subject => (
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
            onChange={(e) => handleGradeChange(e.target.value)}
            disabled={!selectedSubject}
          >
            <option value="">Select Grade</option>
            {availableGrades.map(grade => (
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
            onChange={(e) => handleLessonChange(e.target.value)}
            disabled={!selectedGrade}
          >
            <option value="">Select Lesson</option>
            {availableLessons.map(lesson => (
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
            accept=".pdf,.zip"
            disabled={!isUploadEnabled}
          />
          <div className="mt-2 flex items-center gap-2">
            <input type="checkbox" id="use-manual" checked={useManual} onChange={(e) => setUseManual(e.target.checked)} />
            <label htmlFor="use-manual" className="text-xs">Paste Drive FILE_ID or URL instead of upload</label>
          </div>
          {useManual && (
            <input
              className="mt-2 w-full border rounded px-2 py-1 text-sm"
              placeholder="Paste Google Drive FILE_ID or Full URL"
              value={manualIdOrUrl}
              onChange={(e) => setManualIdOrUrl(e.target.value)}
            />
          )}
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
        {selectedSubject && !selectedGrade && (
          <div className="mt-2 text-blue-600 dark:text-blue-400">
            💡 Now select a grade for {selectedSubject}
          </div>
        )}
        {selectedSubject && selectedGrade && !selectedLesson && (
          <div className="mt-2 text-blue-600 dark:text-blue-400">
            💡 Now select a lesson from Grade {selectedGrade} {selectedSubject}
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