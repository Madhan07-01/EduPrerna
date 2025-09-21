// Config for Google Drive file IDs per grade
// Update these IDs to match your Drive files. If an entry is missing, the button will be disabled.
type GradeNum = 6|7|8|9|10|11|12
export type GradeKey = `grade${GradeNum}`

export type ChapterEntry = {
  pdf?: string
  zip?: string
}

export type DriveGradeEntry = {
  // Chapters 1-3 per requirement; extend as needed
  1?: ChapterEntry
  2?: ChapterEntry
  3?: ChapterEntry
  // Optional whole-grade bundle (all subjects/resources together)
  bundle?: ChapterEntry
}

// Fill in the Google Drive FILE IDs for each chapter's PDF and ZIP.
// Example: grade6: { 1: { pdf: 'FILE_ID', zip: 'FILE_ID' }, 2: { ... }, 3: { ... } }
export const driveFiles: Record<GradeKey, DriveGradeEntry> = {
  grade6: { 1: {}, 2: {}, 3: {} },
  grade7: { 1: {}, 2: {}, 3: {} },
  grade8: { 1: {}, 2: {}, 3: {} },
  grade9: { 1: {}, 2: {}, 3: {} },
  grade10: { 1: {}, 2: {}, 3: {} },
  grade11: { 1: {}, 2: {}, 3: {} },
  grade12: { 1: {}, 2: {}, 3: {} },
}

export function driveDirectDownloadUrl(id: string) {
  if (!id) return ''
  if (id.startsWith('http://') || id.startsWith('https://')) return id
  return `https://drive.google.com/uc?export=download&id=${id}`
}
