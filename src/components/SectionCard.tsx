import type { ReactNode } from 'react'

export function SectionCard({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
      <div className="text-gray-900 dark:text-slate-100 font-semibold mb-2">{title}</div>
      <div className="text-gray-700 dark:text-slate-300 text-sm">{children}</div>
    </div>
  )
}

export default SectionCard 