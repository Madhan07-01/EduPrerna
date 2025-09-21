import { useTranslation } from 'react-i18next'

// TransText: drop-in component to translate inline strings using the string itself as the key.
// Usage: <TransText>Start Lesson</TransText>
// Optionally: <TransText i18nKey="startLesson" />
export default function TransText({ children, i18nKey, values }: { children?: string; i18nKey?: string; values?: Record<string, any> }) {
  const { t } = useTranslation()
  const key = i18nKey || (typeof children === 'string' ? children : '')
  if (!key) return null
  return t(key, { defaultValue: typeof children === 'string' ? children : key, ...values }) as unknown as JSX.Element
}
