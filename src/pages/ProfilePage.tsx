import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../hooks/useAuth'
import { SectionCard } from '../components/SectionCard'
import { useTranslation } from 'react-i18next'

export function ProfilePage() {
  const { t } = useLanguage()
  const { t: tI18n } = useTranslation()
  const { currentUser, profile } = useAuth()
  const name = profile?.name ?? currentUser?.displayName ?? currentUser?.email ?? 'User'
  
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-gradient-to-tr from-indigo-600 to-fuchsia-600 p-6 text-white">
        <div className="text-xl font-bold">{name}</div>
        <div className="text-sm">{tI18n('grade', { defaultValue: 'Grade' })} 6 • {tI18n('language', { defaultValue: 'Language' })}: {tI18n('english', { defaultValue: 'English' })}</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { labelKey: 'stats.xp', value: '0' },
          { labelKey: 'stats.badges', value: '0' },
          { labelKey: 'stats.streak', value: '1' },
          { labelKey: 'stats.courses', value: '0' },
        ].map((s) => (
          <SectionCard key={s.labelKey} title={t(s.labelKey)}>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{s.value}</div>
          </SectionCard>
        ))}
      </div>
      <SectionCard title={tI18n('profile.learningHistory', { defaultValue: 'Learning History' })}>
        {tI18n('profile.startJourney', { defaultValue: 'Start your learning journey' })}
      </SectionCard>
    </div>
  )
}

export default ProfilePage