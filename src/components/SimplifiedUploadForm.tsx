import { useContext, useState } from 'react'
import { db, storage } from '../firebase/firebaseConfig'
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useToast } from './ToastProvider'
import { driveDirectDownloadUrl } from '../data/driveFiles'
import { AuthContext } from '../contexts/AuthContext'

interface SimplifiedUploadFormProps {
  onResourceUploaded: (newResource: any) => void
}

const SimplifiedUploadForm = ({ onResourceUploaded }: SimplifiedUploadFormProps) => {
  const authCtx = useContext(AuthContext)
  const [selectedGrade, setSelectedGrade] = useState('')
  const [selectedChapter, setSelectedChapter] = useState('')
  const [manualIdOrUrl, setManualIdOrUrl] = useState('')
  const [useManual, setUseManual] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const toast = useToast()

  // Available grades (6-12)
  const availableGrades = [6, 7, 8, 9, 10, 11, 12]
  
  // Available chapters (1-3)
  const availableChapters = [1, 2, 3]

  // Check if all selections are made
  const isTeacher = (authCtx?.profile?.role === 'teacher' || authCtx?.profile?.role === 'admin')
  const isUploadEnabled = !!isTeacher && !!selectedGrade && !!selectedChapter

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isUploadEnabled || !e.target.files || e.target.files.length === 0) {
      return
    }

    const file = e.target.files[0]
    const fileExtension = file.name.split('.').pop()?.toLowerCase()

    // Only allow PDF or ZIP files
    if (!['pdf', 'zip'].includes(fileExtension || '')) {
      toast.info('⚠️ File must be PDF or ZIP for this upload.')
      return
    }

    setIsUploading(true)
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
      
      // Get grade and chapter numbers
      const gradeNum = parseInt(selectedGrade, 10)
      const chapterNum = parseInt(selectedChapter, 10)

      // Either use manual ID/URL, or upload to Firebase Storage
      let url: string
      if (useManual && manualIdOrUrl.trim()) {
        const raw = manualIdOrUrl.trim()
        // Accept full URL or Drive FILE_ID; normalize with driveDirectDownloadUrl
        url = driveDirectDownloadUrl(raw)
      } else {
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
          details: { pathHint: 'driveMappings' }
        })
      } catch (logErr) {
        console.warn('Failed to log activity event', logErr)
      }

      // Create new resource object for the UI table (optional)
      const newResource = {
        id: Date.now(),
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        lessonInfo: `Grade ${gradeNum} → Chapter ${chapterNum}`,
        type: kind
      }
      onResourceUploaded(newResource)

      // Reset form and input
      setSelectedGrade('')
      setSelectedChapter('')
      setManualIdOrUrl('')
      setUseManual(false)
      e.target.value = ''

      // Success toast
      toast.success(`✅ File mapped to Grade ${gradeNum} → Chapter ${chapterNum} (${kind.toUpperCase()}).`)
    } catch (err: any) {
      console.error('Upload/mapping failed', err)
      if (err?.code === 'permission-denied') {
        toast.error('🚫 Upload failed: Insufficient permissions. Please check teacher role.')
      } else {
        toast.error('Failed to upload and map file. Please try again.')
      }
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6 mb-6 shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="mr-2">📁</span>
        Upload Resource
      </h2>
      
      {/* Simplified Selection Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Grade Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Grade <span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
          >
            <option value="">Select Grade</option>
            {availableGrades.map(grade => (
              <option key={grade} value={grade}>Grade {grade}</option>
            ))}
          </select>
        </div>

        {/* Chapter Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Chapter <span className="text-red-500">*</span>
          </label>
          <select 
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            disabled={!selectedGrade}
          >
            <option value="">Select Chapter</option>
            {availableChapters.map(chapter => (
              <option key={chapter} value={chapter}>Chapter {chapter}</option>
            ))}
          </select>
        </div>

        {/* Manual Input */}
        {useManual && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Google Drive FILE_ID or URL <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Paste Google Drive FILE_ID or Full URL"
              value={manualIdOrUrl}
              onChange={(e) => setManualIdOrUrl(e.target.value)}
            />
          </div>
        )}

        {/* Upload Button */}
        <div className={useManual ? "md:col-span-4" : ""}>
          <label 
            htmlFor="simplified-file-upload" 
            className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium cursor-pointer transition-all transform hover:scale-105 ${
              isUploadEnabled && !isUploading
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md' 
                : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            }`}
          >
            {isUploading ? (
              <>
                <span className="mr-2">⏳</span>
                Uploading...
              </>
            ) : (
              <>
                <span className="mr-2">📁</span>
                Upload Resource
              </>
            )}
          </label>
          <input 
            id="simplified-file-upload" 
            type="file" 
            className="hidden" 
            onChange={handleFileUpload}
            accept=".pdf,.zip"
            disabled={!isUploadEnabled || isUploading}
          />
          <div className="mt-2 flex items-center gap-2">
            <input 
              type="checkbox" 
              id="use-manual" 
              checked={useManual} 
              onChange={(e) => setUseManual(e.target.checked)} 
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="use-manual" className="text-sm text-gray-700 dark:text-gray-300">
              Paste Drive FILE_ID or URL instead
            </label>
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center">📋 Select grade and chapter to enable upload</span>
          <span>•</span>
          <span className="flex items-center">📁 Supported formats: PDF, ZIP</span>
        </div>
        {!isUploadEnabled && (
          <div className="mt-2 text-amber-600 dark:text-amber-400 flex items-center">
            ⚠️ Please select Grade and Chapter before uploading
          </div>
        )}
        {selectedGrade && !selectedChapter && (
          <div className="mt-2 text-blue-600 dark:text-blue-400 flex items-center">
            💡 Now select a chapter for Grade {selectedGrade}
          </div>
        )}
      </div>

      {/* Selection Preview */}
      {(selectedGrade || selectedChapter) && (
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg animate-fade-in">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-medium">Current Selection:</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {selectedGrade && <span className="inline-flex items-center bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium animate-pulse-slow">
                <span className="mr-1">📚</span> Grade {selectedGrade}
              </span>}
              {selectedChapter && <span className="inline-flex items-center bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs font-medium animate-pulse-slow">
                <span className="mr-1">📖</span> Chapter {selectedChapter}
              </span>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SimplifiedUploadForm