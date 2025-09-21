import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    // Persist choice (i18next language detector also stores this by default)
    try { localStorage.setItem('i18nextLng', lng) } catch {}
  }

  const current = i18n.resolvedLanguage || i18n.language || 'en'

  const Btn = ({ code, label }: { code: string, label: string }) => (
    <button
      onClick={() => changeLanguage(code)}
      className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors ${
        current?.startsWith(code)
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-transparent text-gray-700 dark:text-slate-300 border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800'
      }`}
      aria-pressed={current?.startsWith(code)}
    >
      {label}
    </button>
  )

  return (
    <div className="flex items-center gap-2" aria-label="Language Switcher">
      <Btn code="en" label="English" />
      <Btn code="hi" label="हिंदी" />
      <Btn code="or" label="ଓଡ଼ିଆ" />
    </div>
  )
}
