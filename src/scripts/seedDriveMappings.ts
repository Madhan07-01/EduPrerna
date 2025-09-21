/*
Seed Drive mappings for Grade 6 → Chapter 1 PDF (Number System.pdf)

Usage (option A: already uploaded file, you know the FILE_ID):
  node -r esbuild-register src/scripts/seedDriveMappings.ts --project <FIREBASE_PROJECT_ID> --fileId <FILE_ID>

Usage (option B: upload local PDF to Drive then seed Firestore):
  node -r esbuild-register src/scripts/seedDriveMappings.ts --project <FIREBASE_PROJECT_ID> --uploadPath "./assets/Number System.pdf" --folderId <DRIVE_FOLDER_ID>

Required env (for Firebase Admin):
  GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json (service account with Firestore access)

Optional env (for Drive upload):
  GOOGLE_DRIVE_CREDENTIALS=./driveServiceAccount.json (or reuse GOOGLE_APPLICATION_CREDENTIALS if same)

Install (one-time):
  npm i -D esbuild-register
  npm i firebase-admin googleapis yargs
*/

import fs from 'node:fs'
import path from 'node:path'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs'
import admin from 'firebase-admin'
import { google } from 'googleapis'

async function ensureFirebase(projectId?: string) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId,
    })
  }
  return admin.firestore()
}

async function uploadToDrive(filePath: string, folderId?: string) {
  // Authenticate using application default credentials (service account)
  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/drive.file'] })
  const drive = google.drive({ version: 'v3', auth })

  const fileName = path.basename(filePath)
  const fileMetadata: any = {
    name: fileName,
  }
  if (folderId) fileMetadata.parents = [folderId]

  const media = {
    mimeType: 'application/pdf',
    body: fs.createReadStream(filePath),
  }

  const res = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id,name',
  })
  const fileId = res.data.id
  if (!fileId) throw new Error('Failed to upload to Drive: missing fileId')

  // Make sure file is downloadable (anyone with link)
  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    })
  } catch (e) {
    // Non-fatal
    console.warn('Warning: could not set public permission on file. Ensure link sharing is enabled in Drive.', e)
  }

  return { fileId }
}

function directDownloadUrl(fileId: string) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

async function seedMapping(db: admin.firestore.Firestore, fileId: string) {
  const gradeKey = 'grade6'
  const ref = db.collection('driveMappings').doc(gradeKey)
  const snap = await ref.get()
  const data = (snap.exists ? snap.data() : {}) || {}
  const next = {
    ...data,
    1: {
      ...(data?.[1] || {}),
      pdf: fileId,
    },
  }
  await ref.set(next, { merge: true })
  return next
}

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option('project', { type: 'string', demandOption: false, describe: 'Firebase projectId (optional if provided by ADC)' })
    .option('fileId', { type: 'string', demandOption: false, describe: 'Existing Google Drive FILE_ID for Number System.pdf' })
    .option('uploadPath', { type: 'string', demandOption: false, describe: 'Local path to Number System.pdf to upload' })
    .option('folderId', { type: 'string', demandOption: false, describe: 'Google Drive folder ID to upload into' })
    .help()
    .parseAsync()

  const { project, fileId, uploadPath, folderId } = argv as any

  if (!fileId && !uploadPath) {
    console.error('Provide either --fileId <FILE_ID> or --uploadPath "./path/to/Number System.pdf"')
    process.exit(1)
  }

  const db = await ensureFirebase(project)

  let theFileId = fileId as string
  if (!theFileId && uploadPath) {
    if (!fs.existsSync(uploadPath)) {
      console.error(`uploadPath does not exist: ${uploadPath}`)
      process.exit(1)
    }
    console.log('Uploading to Google Drive...', uploadPath)
    const res = await uploadToDrive(uploadPath, folderId)
    theFileId = res.fileId
    console.log('Uploaded. File ID:', theFileId)
    console.log('Direct download link:', directDownloadUrl(theFileId))
  }

  console.log('Seeding Firestore mapping for grade6 chapter 1 (pdf)...')
  const result = await seedMapping(db, theFileId)
  console.log('Mapping saved to driveMappings/grade6:', JSON.stringify(result, null, 2))

  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
