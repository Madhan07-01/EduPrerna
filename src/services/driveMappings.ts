import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import type { DriveGradeEntry, GradeKey } from '../data/driveFiles'

function normalizeMapping(raw: any): DriveGradeEntry | null {
  if (!raw || typeof raw !== 'object') return null
  // If already in nested shape with numeric keys or bundle, return as-is
  if (raw['1'] || raw['2'] || raw['3'] || raw.bundle) return raw as DriveGradeEntry
  // Support flat: {'1.pdf': 'ID', '1.zip': 'ID', ...}
  const out: DriveGradeEntry = { 1: {}, 2: {}, 3: {} }
  for (const key of Object.keys(raw)) {
    const m = key.match(/^(\d+)\.(pdf|zip)$/)
    if (m) {
      const ch = parseInt(m[1], 10) as 1|2|3
      const kind = m[2] as 'pdf'|'zip'
      out[ch] = { ...(out[ch] || {}), [kind]: raw[key] }
    }
  }
  return out
}

// Firestore document shape under:
// 1) driveMappingsLang/{lang}/grades/{gradeKey}
// 2) driveMappings/{gradeKey} (fallback)
// { 1: { pdf: 'id', zip: 'id' }, 2: { ... }, 3: { ... } }
export async function getDriveGradeMapping(grade: number, lang?: string): Promise<DriveGradeEntry | null> {
  try {
    const gradeKey = (`grade${grade}`) as GradeKey
    if (lang) {
      const refLang = doc(db, 'driveMappingsLang', lang, 'grades', gradeKey)
      const snapLang = await getDoc(refLang)
      if (snapLang.exists()) return normalizeMapping(snapLang.data())
    }
    const ref = doc(db, 'driveMappings', gradeKey)
    const snap = await getDoc(ref)
    if (snap.exists()) return normalizeMapping(snap.data())
    return null
  } catch (e) {
    console.warn('getDriveGradeMapping failed', e)
    return null
  }
}
