import { useEffect, useMemo, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import type { DriveGradeEntry, GradeKey } from '../data/driveFiles'

export default function TeacherDriveManager() {
  const grades = useMemo(() => [6,7,8,9,10,11,12] as const, [])
  const [grade, setGrade] = useState<number>(6)
  const [mapping, setMapping] = useState<DriveGradeEntry>({ 1: {}, 2: {}, 3: {} })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const load = async (g: number) => {
    try {
      setLoading(true)
      setMessage(null)
      const key = (`grade${g}`) as GradeKey
      const ref = doc(db, 'driveMappings', key)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setMapping(snap.data() as DriveGradeEntry)
      } else {
        setMapping({ 1: {}, 2: {}, 3: {} })
      }
    } catch (e: any) {
      setMessage(e?.message || 'Failed to load mapping')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(grade)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grade])

  const save = async () => {
    try {
      setLoading(true)
      setMessage(null)
      const key = (`grade${grade}`) as GradeKey
      const ref = doc(db, 'driveMappings', key)
      await setDoc(ref, mapping, { merge: true })
      setMessage('Saved!')
    } catch (e: any) {
      setMessage(e?.message || 'Failed to save mapping')
    } finally {
      setLoading(false)
    }
  }

  const setField = (chapter: 1|2|3, field: 'pdf'|'zip', value: string) => {
    setMapping((m) => ({ ...m, [chapter]: { ...(m[chapter] || {}), [field]: value } }))
  }
  const setBundleField = (field: 'pdf'|'zip', value: string) => {
    setMapping((m) => ({ ...m, bundle: { ...(m.bundle || {}), [field]: value } }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Drive Mappings</div>
        <div className="text-sm text-gray-500">Edit Google Drive file IDs per grade and chapter</div>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm">Grade</label>
        <select value={grade} onChange={(e) => setGrade(parseInt(e.target.value))} className="border rounded px-2 py-1">
          {grades.map((g) => (<option key={g} value={g}>Grade {g}</option>))}
        </select>
        <button onClick={() => load(grade)} className="text-sm px-3 py-1 rounded border">Refresh</button>
      </div>

      {/* Whole-grade bundle */}
      <div className="border rounded p-3 space-y-2">
        <div className="font-semibold">Whole-Grade Bundle</div>
        <div className="text-xs text-gray-500">Upload a combined PDF/ZIP containing all subjects for the selected grade. Paste the FILE IDs here.</div>
        <div className="space-y-1">
          <label className="block text-xs text-gray-500">Bundle PDF File ID</label>
          <input
            value={(mapping.bundle as any)?.pdf || ''}
            onChange={(e) => setBundleField('pdf', e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="e.g. 1AbCDeF..."
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs text-gray-500">Bundle ZIP File ID</label>
          <input
            value={(mapping.bundle as any)?.zip || ''}
            onChange={(e) => setBundleField('zip', e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="e.g. 1XyZ987..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[1,2,3].map((ch) => (
          <div key={ch} className="border rounded p-3 space-y-2">
            <div className="font-medium">Chapter {ch}</div>
            <div className="space-y-1">
              <label className="block text-xs text-gray-500">PDF File ID</label>
              <input
                value={(mapping[ch as 1|2|3] as any)?.pdf || ''}
                onChange={(e) => setField(ch as 1|2|3, 'pdf', e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
                placeholder="e.g. 1AbCDeF..."
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs text-gray-500">ZIP File ID</label>
              <input
                value={(mapping[ch as 1|2|3] as any)?.zip || ''}
                onChange={(e) => setField(ch as 1|2|3, 'zip', e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
                placeholder="e.g. 1XyZ987..."
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button onClick={save} disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-60">Save Mappings</button>
        {message && <div className="text-sm text-gray-600">{message}</div>}
      </div>

      <div className="text-xs text-gray-500">
        Paste Google Drive FILE IDs from the shared links. The app will convert them into direct download URLs.
      </div>
    </div>
  )
}
