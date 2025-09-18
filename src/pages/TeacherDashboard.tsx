// no React import needed with automatic runtime
import { useLanguage } from '../contexts/LanguageContext'

export default function TeacherDashboard() {
  const { t } = useLanguage()
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-white dark:text-white text-gray-900">{t('teacher.title')}</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Total Students', 'Active Today', 'Lessons Completed', 'Avg Quiz Score'].map((m, i) => (
          <div key={m} className="rounded-xl border border-slate-800 dark:border-slate-800 border-gray-200 bg-slate-900/60 dark:bg-slate-900/60 bg-white/80 p-4">
            <div className="text-slate-300 dark:text-slate-300 text-gray-700 text-sm">{m}</div>
            <div className="text-2xl font-semibold text-white dark:text-white text-gray-900">{i === 3 ? '0%' : '0'}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-slate-800 dark:border-slate-800 border-gray-200 bg-slate-900/60 dark:bg-slate-900/60 bg-white/80 p-4">
        <div className="text-slate-200 dark:text-slate-200 text-gray-800 font-semibold mb-2">Student Overview</div>
        <div className="text-slate-300 dark:text-slate-300 text-gray-700 text-sm">No data yet</div>
      </div>
    </div>
  )
}


