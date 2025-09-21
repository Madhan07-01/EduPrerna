import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type Toast = {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
  actionLabel?: string
  onAction?: () => void
}

const ToastContext = createContext<{
  toasts: Toast[]
  push: (t: Omit<Toast, 'id'>) => void
  remove: (id: string) => void
  success: (message: string, opts?: Partial<Omit<Toast, 'id' | 'message' | 'type'>>) => void
  error: (message: string, opts?: Partial<Omit<Toast, 'id' | 'message' | 'type'>>) => void
  info: (message: string, opts?: Partial<Omit<Toast, 'id' | 'message' | 'type'>>) => void
} | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const remove = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    const toast: Toast = { id, ...t }
    setToasts((arr) => {
      const next = [toast, ...arr]
      return next.slice(0, 3)
    })
    setTimeout(() => remove(id), 4000)
  }, [remove])

  const success = useCallback((message: string, opts?: any) => push({ type: 'success', message, ...(opts || {}) }), [push])
  const error = useCallback((message: string, opts?: any) => push({ type: 'error', message, ...(opts || {}) }), [push])
  const info = useCallback((message: string, opts?: any) => push({ type: 'info', message, ...(opts || {}) }), [push])

  const value = useMemo(() => ({ toasts, push, remove, success, error, info }), [toasts, push, remove, success, error, info])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={remove} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed z-[1000] bottom-4 right-4 space-y-2">
      {toasts.map((t) => (
        <div key={t.id} className={`shadow-lg rounded-md px-4 py-3 text-sm flex items-center gap-3 border ${
          t.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
          t.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <div className="flex-1">{t.message}</div>
          {t.actionLabel && (
            <button className="text-xs underline" onClick={() => { t.onAction?.(); onRemove(t.id) }}>{t.actionLabel}</button>
          )}
          <button className="text-xs" onClick={() => onRemove(t.id)}>✕</button>
        </div>
      ))}
    </div>
  )
}
