import { useEffect, useMemo, useState } from 'react'
import { collection, deleteField, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import { db, storage } from '../firebase/firebaseConfig'
import { useToast } from './ToastProvider'
import { ref as storageRefFromURL, deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { driveDirectDownloadUrl } from '../data/driveFiles'

function isStorageUrl(url: string) {
  return typeof url === 'string' && url.startsWith('https://') && url.includes('firebasestorage.googleapis.com')
}

type FlatMap = Record<string, string>

type Row = {
  gradeKey: string
  chapter: 1|2|3
  kind: 'pdf'|'zip'
  url: string
  updatedAt?: any
}

export default function TeacherMappingsTable() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [editing, setEditing] = useState<{ gradeKey: string; chapter: 1|2|3; kind: 'pdf'|'zip' } | null>(null)
  const [editValue, setEditValue] = useState('')
  const [deleteAsk, setDeleteAsk] = useState<{ gradeKey: string; chapter: 1|2|3; kind: 'pdf'|'zip'; url: string } | null>(null)
  const [deleteStorage, setDeleteStorage] = useState(false)
  const toast = useToast()
  const [bulkGrade, setBulkGrade] = useState('grade6')
  const [bulkUseManual, setBulkUseManual] = useState(false)
  const [bulkManual, setBulkManual] = useState('')
  const [bulkUploading, setBulkUploading] = useState(false)

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return rows
    return rows.filter(r => r.gradeKey.includes(q) || String(r.chapter) === q || r.kind.includes(q))
  }, [rows, filter])

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const snap = await getDocs(collection(db, 'driveMappings'))
        const list: Row[] = []
        for (const d of snap.docs) {
          const gradeKey = d.id
          const data = d.data() as FlatMap
          for (const key of Object.keys(data)) {
            const m = key.match(/^(\d+)\.(pdf|zip)$/)
            if (!m) continue
            const chapter = parseInt(m[1], 10) as 1|2|3
            const kind = m[2] as 'pdf'|'zip'
            list.push({ gradeKey, chapter, kind, url: data[key], updatedAt: (data as any).updatedAt })
          }
        }
        setRows(list.sort((a, b) => a.gradeKey.localeCompare(b.gradeKey) || a.chapter - b.chapter || a.kind.localeCompare(b.kind)))
      } catch (e) {
        console.error(e)
        toast.error('Failed to load drive mappings')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [toast])

  const beginEdit = (r: Row) => {
    setEditing({ gradeKey: r.gradeKey, chapter: r.chapter, kind: r.kind })
    setEditValue(r.url)
  }

  const saveEdit = async () => {
    if (!editing) return
    try {
      const flatKey = `${editing.chapter}.${editing.kind}`
      let value = editValue.trim()
      value = driveDirectDownloadUrl(value) // normalize drive IDs
      await setDoc(doc(db, 'driveMappings', editing.gradeKey), { [flatKey]: value, updatedAt: serverTimestamp() }, { merge: true })
      toast.success('Mapping updated')
      setEditing(null)
      setRows((rows) => rows.map(r => (r.gradeKey === editing.gradeKey && r.chapter === editing.chapter && r.kind === editing.kind) ? { ...r, url: value } : r))
    } catch (e) {
      console.error(e)
      toast.error('Failed to save mapping')
    }
  }

  const confirmDelete = (r: Row) => {
    setDeleteAsk({ gradeKey: r.gradeKey, chapter: r.chapter, kind: r.kind, url: r.url })
    setDeleteStorage(false)
  }

  const doDelete = async () => {
    if (!deleteAsk) return
    try {
      const flatKey = `${deleteAsk.chapter}.${deleteAsk.kind}`
      await setDoc(doc(db, 'driveMappings', deleteAsk.gradeKey), { [flatKey]: deleteField(), updatedAt: serverTimestamp() }, { merge: true })
      if (deleteStorage && isStorageUrl(deleteAsk.url)) {
        try {
          const r = storageRefFromURL(storage, deleteAsk.url)
          await deleteObject(r)
        } catch (e) {
          console.warn('Storage delete failed (non-fatal):', e)
        }
      }
      toast.success('Mapping deleted')
      setRows((rows) => rows.filter(r => !(r.gradeKey === deleteAsk.gradeKey && r.chapter === deleteAsk.chapter && r.kind === deleteAsk.kind)))
      setDeleteAsk(null)
    } catch (e) {
      console.error(e)
      toast.error('Failed to delete mapping')
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded border p-3 bg-white dark:bg-slate-900">
        <div className="font-medium mb-2">Bulk Upload Bundle</div>
        <div className="text-xs text-gray-600 dark:text-slate-400 mb-3">Upload one PDF/ZIP or paste Drive FILE_ID/URL and map it to Chapters 1, 2, and 3 for the selected grade.</div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <label className="text-xs">Grade</label>
          <select className="text-xs border rounded px-2 py-1" value={bulkGrade} onChange={(e) => setBulkGrade(e.target.value)}>
            {['grade6','grade7','grade8','grade9','grade10','grade11','grade12'].map(g => (<option key={g} value={g}>{g}</option>))}
          </select>
          <label className="text-xs inline-flex items-center gap-1"><input type="checkbox" checked={bulkUseManual} onChange={(e) => setBulkUseManual(e.target.checked)} /> Paste Drive FILE_ID/URL</label>
        </div>
        {!bulkUseManual && (
          <input type="file" accept=".pdf,.zip" onChange={async (e) => {
            if (!e.target.files || e.target.files.length === 0) return
            const file = e.target.files[0]
            setBulkUploading(true)
            try {
              const kind = file.name.toLowerCase().endsWith('.zip') ? 'zip' : (file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : null)
              if (!kind) { toast.info('⚠️ File must be PDF or ZIP.'); return }
              const storagePath = `teacher_uploads/${bulkGrade}/bundle/${Date.now()}_${file.name}`
              const r = ref(storage, storagePath)
              await uploadBytes(r, file)
              const url = await getDownloadURL(r)
              const updates: any = { updatedAt: serverTimestamp() }
              updates[`1.${kind}`] = url
              updates[`2.${kind}`] = url
              updates[`3.${kind}`] = url
              await setDoc(doc(db, 'driveMappings', bulkGrade), updates, { merge: true })
              toast.success(`Bundle mapped to ${bulkGrade} → Chapters 1,2,3 (${kind.toUpperCase()})`)
            } catch (e) {
              console.error(e)
              toast.error('Failed to upload bundle')
            } finally {
              setBulkUploading(false)
              e.target.value = ''
            }
          }} />
        )}
        {bulkUseManual && (
          <div className="flex items-center gap-2">
            <input className="flex-1 border rounded px-2 py-1 text-sm" placeholder="Paste Drive FILE_ID or Full URL" value={bulkManual} onChange={(e) => setBulkManual(e.target.value)} />
            <button disabled={!bulkManual || bulkUploading} className="px-3 py-1 rounded bg-blue-600 text-white text-sm disabled:opacity-60" onClick={async () => {
              if (!bulkManual.trim()) return
              setBulkUploading(true)
              try {
                const url = driveDirectDownloadUrl(bulkManual.trim())
                const kind: 'pdf'|'zip' = url.toLowerCase().includes('.zip') ? 'zip' : 'pdf'
                const updates: any = { updatedAt: serverTimestamp() }
                updates['1.'+kind] = url
                updates['2.'+kind] = url
                updates['3.'+kind] = url
                await setDoc(doc(db, 'driveMappings', bulkGrade), updates, { merge: true })
                toast.success(`Bundle mapped to ${bulkGrade} → Chapters 1,2,3 (${kind.toUpperCase()})`)
                setBulkManual('')
              } catch (e) {
                console.error(e)
                toast.error('Failed to save manual bundle')
              } finally {
                setBulkUploading(false)
              }
            }}>Map</button>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Manage Mappings</div>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter by grade or chapter" className="border rounded px-2 py-1 text-sm" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2">Grade</th>
                <th className="text-left py-2 px-2">Chapter</th>
                <th className="text-left py-2 px-2">Type</th>
                <th className="text-left py-2 px-2">URL</th>
                <th className="text-left py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={`${r.gradeKey}-${r.chapter}-${r.kind}`} className="border-b hover:bg-gray-50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-2">{r.gradeKey}</td>
                  <td className="py-2 px-2">{r.chapter}</td>
                  <td className="py-2 px-2 uppercase">{r.kind}</td>
                  <td className="py-2 px-2 max-w-[360px] truncate"><a className="text-blue-600 underline" href={r.url} target="_blank" rel="noreferrer">{r.url}</a></td>
                  <td className="py-2 px-2">
                    <button className="text-blue-600 mr-3" onClick={() => beginEdit(r)}>Edit</button>
                    <button className="text-rose-600 mr-3" onClick={() => confirmDelete(r)}>Delete</button>
                    <a className="text-gray-600" href={r.url} target="_blank" rel="noreferrer">Open</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="p-3 border rounded bg-white dark:bg-slate-900">
          <div className="text-sm mb-2">Edit {editing.gradeKey} → Chapter {editing.chapter} ({editing.kind.toUpperCase()})</div>
          <input className="w-full border rounded px-2 py-1 text-sm" value={editValue} onChange={(e) => setEditValue(e.target.value)} placeholder="Paste URL or Drive FILE_ID" />
          <div className="mt-2 flex items-center gap-2">
            <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm" onClick={saveEdit}>Save</button>
            <button className="px-3 py-1 rounded text-sm" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}

      {deleteAsk && (
        <div className="p-3 border rounded bg-white dark:bg-slate-900">
          <div className="text-sm">Delete mapping {deleteAsk.gradeKey} → Chapter {deleteAsk.chapter} ({deleteAsk.kind.toUpperCase()})?</div>
          {isStorageUrl(deleteAsk.url) && (
            <label className="mt-2 flex items-center gap-2 text-xs"><input type="checkbox" checked={deleteStorage} onChange={(e) => setDeleteStorage(e.target.checked)} /> Also delete Storage object</label>
          )}
          <div className="mt-2 flex items-center gap-2">
            <button className="px-3 py-1 rounded bg-rose-600 text-white text-sm" onClick={doDelete}>Delete</button>
            <button className="px-3 py-1 rounded text-sm" onClick={() => setDeleteAsk(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
