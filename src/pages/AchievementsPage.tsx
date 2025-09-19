import { useLanguage } from '../contexts/LanguageContext'
import { SectionCard } from '../components/SectionCard'

export function AchievementsPage() {
  const { t } = useLanguage()
  
  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">{t('achievements.title')}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['First Steps', 'Week Warrior', 'Math Master', 'Physics Pro', 'Chemistry Champion', 'Biology Boss', 'Quiz Champion', 'Knowledge Seeker'].map(
          (b) => (
            <SectionCard key={b} title={b}>
              Not earned yet
            </SectionCard>
          ),
        )}
      </div>
    </div>
  )
}

export default AchievementsPage