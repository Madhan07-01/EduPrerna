import { useEffect, useRef, useState } from 'react'

// Lazy-load pdfjs only when the modal opens
let pdfjsLib: null | (typeof import('pdfjs-dist')) = null
let pdfjsWorkerImported = false

async function ensurePdfJs() {
  if (!pdfjsLib) {
    // Use root entry; compatible with pdfjs-dist@3
    // @ts-ignore - dynamic import at runtime
    pdfjsLib = await import('pdfjs-dist')
    if (!pdfjsWorkerImported) {
      // Prefer module worker with workerPort to avoid Vite ?url resolution issues
      try {
        // pdfjs-dist@3 ships an ESM worker at build/pdf.worker.mjs
        const worker = new Worker(new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url), { type: 'module' })
        // @ts-ignore
        pdfjsLib.GlobalWorkerOptions.workerPort = worker
      } catch (e) {
        // Fallback: classic worker js if mjs not available
        try {
          const worker = new Worker(new URL('pdfjs-dist/build/pdf.worker.js', import.meta.url))
          // @ts-ignore
          pdfjsLib.GlobalWorkerOptions.workerPort = worker
        } catch (e2) {
          // Final fallback: attempt to set workerSrc (may require server to serve the file)
          // @ts-ignore
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js'
        }
      }
      pdfjsWorkerImported = true
    }
  }
  return pdfjsLib
}

export default function PdfPreviewModal({ url, onClose }: { url: string; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pageCount, setPageCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        const pdfjs = await ensurePdfJs()
        // @ts-ignore getDocument present on pdfjs-dist default export in v3
        const loadingTask = (pdfjs as any).getDocument(url)
        const pdf = await loadingTask.promise
        if (cancelled) return
        setPageCount(pdf.numPages)
        const page = await pdf.getPage(1)
        if (cancelled) return
        const viewport = page.getViewport({ scale: 1.2 })
        const canvas = canvasRef.current!
        const context = canvas.getContext('2d')!
        canvas.height = viewport.height
        canvas.width = viewport.width
        const renderContext = { canvasContext: context, viewport }
        await page.render(renderContext).promise
      } catch (e: any) {
        console.error('pdf preview error', e)
        setError(e?.message || 'Failed to preview PDF. You can open it in a new tab.')
      } finally {
        setLoading(false)
      }
    }
    run()
    return () => { cancelled = true; document.removeEventListener('keydown', onKeyDown) }
  }, [url])

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center animate-fade-in" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-[min(92vw,900px)] max-h-[85vh] overflow-auto transform transition-all scale-100" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-slate-800">
          <div className="font-semibold">PDF Preview</div>
          <button className="text-sm" onClick={onClose}>Close ✕</button>
        </div>
        <div className="p-4">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          {error && (
            <div className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded p-3">
              {error}
              <div className="mt-2">
                <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open in new tab</a>
              </div>
            </div>
          )}
          {!loading && !error && (
            <div>
              <canvas ref={canvasRef} />
              {pageCount && <div className="text-xs text-gray-500 mt-2">Page 1 of {pageCount}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
