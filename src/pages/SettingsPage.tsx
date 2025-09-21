import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../hooks/useAuth'
import { SectionCard } from '../components/SectionCard'

export function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const { signOutUser } = useAuth()
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">{t('settings.title')}</div>
      <SectionCard title={t('settings.appearance')}>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{t('settings.darkMode')}</div>
            <div className="text-xs text-gray-600 dark:text-slate-400">Switch between light and dark themes</div>
          </div>
          <button
            aria-label={t('settings.darkMode')}
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </SectionCard>
      <SectionCard title={t('settings.language')}>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{t('settings.appLanguage')}</div>
            <div className="text-xs text-gray-600 dark:text-slate-400">Choose your preferred language</div>
          </div>
          <select
            aria-label={t('settings.appLanguage')}
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'or')}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1 text-sm"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="or">ଓଡ଼ିଆ</option>
          </select>
        </div>
      </SectionCard>
      <SectionCard title={t('settings.offline')}>
        <div className="font-medium">{t('settings.enableOffline')}</div>
        <div className="h-2 bg-gray-200 dark:bg-slate-800 rounded mt-3 w-full">
          <div className="h-2 bg-indigo-500 rounded w-4/5"></div>
        </div>
      </SectionCard>
      <SectionCard title={t('settings.account')}>
        <button onClick={signOutUser} className="rounded-md bg-rose-600 text-white px-3 py-2 text-sm">{t('settings.signOut')}</button>
      </SectionCard>
    </div>
  )
}

export default SettingsPage