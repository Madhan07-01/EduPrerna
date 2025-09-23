import type React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'hi' | 'or'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    'app.title': 'EDUPRERNA',
    'app.subtitle': 'Gamified STEM Learning',
    'nav.dashboard': 'Dashboard',
    'nav.courses': 'Courses',
    'nav.achievements': 'Achievements',
    'nav.profile': 'Profile',
    'nav.teacher': 'Teacher Dashboard',
    'nav.settings': 'Settings',
    'nav.quiz': 'Quick Quiz',
    'nav.challenge': 'Daily Challenge',
    'nav.games': 'Mini-Games',
    'nav.miniGames': 'All Mini-Games',
    'nav.oneNightStudy': 'One Night Study',
    'nav.download': 'Download Grade',
    'welcome.title': 'Welcome back, Learner! 👋',
    'welcome.subtitle': 'Every expert was once a beginner!',
    'ready.title': 'Ready to Learn?',
    'ready.subtitle': 'Continue your STEM journey!',
    'stats.xp': 'Total XP',
    'stats.badges': 'Badges',
    'stats.level': 'Level',
    'stats.streak': 'Day Streak',
    'courses.title': 'Your Courses',
    'courses.explore': 'Explore STEM Courses',
    'achievements.title': 'Your Achievements',
    'profile.title': 'Profile',
    'teacher.title': 'Teacher Dashboard',
    'settings.title': 'Settings',
    'settings.appearance': 'Appearance',
    'settings.language': 'Language',
    'settings.notifications': 'Notifications',
    'settings.offline': 'Offline Learning',
    'settings.account': 'Account',
    'settings.darkMode': 'Dark Mode',
    'settings.appLanguage': 'App Language',
    'settings.learningReminders': 'Learning Reminders',
    'settings.enableOffline': 'Enable Offline Mode',
    'settings.signOut': 'Sign Out',
    'footer.motto': 'Learn • Play • Achieve',
  },
  hi: {
    'app.title': 'एडुप्रेरणा',
    'app.subtitle': 'गेमिफाइड स्टेम लर्निंग',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.courses': 'कोर्स',
    'nav.achievements': 'उपलब्धियां',
    'nav.profile': 'प्रोफाइल',
    'nav.teacher': 'शिक्षक डैशबोर्ड',
    'nav.settings': 'सेटिंग्स',
    'nav.quiz': 'त्वरित क्विज',
    'nav.challenge': 'दैनिक चुनौती',
    'nav.games': 'मिनी-गेम्स',
    'nav.miniGames': 'सभी मिनी-गेम्स',
    'nav.oneNightStudy': 'वन नाइट स्टडी',
    'nav.download': 'ग्रेड डाउनलोड',
    'welcome.title': 'वापस स्वागत है, छात्र! 👋',
    'welcome.subtitle': 'हर विशेषज्ञ कभी शुरुआती था!',
    'ready.title': 'सीखने के लिए तैयार?',
    'ready.subtitle': 'अपनी स्टेम यात्रा जारी रखें!',
    'stats.xp': 'कुल एक्सपी',
    'stats.badges': 'बैज',
    'stats.level': 'स्तर',
    'stats.streak': 'दिन स्ट्रीक',
    'courses.title': 'आपके कोर्स',
    'courses.explore': 'स्टेम कोर्स एक्सप्लोर करें',
    'achievements.title': 'आपकी उपलब्धियां',
    'profile.title': 'प्रोफाइल',
    'teacher.title': 'शिक्षक डैशबोर्ड',
    'settings.title': 'सेटिंग्स',
    'settings.appearance': 'रूप',
    'settings.language': 'भाषा',
    'settings.notifications': 'सूचनाएं',
    'settings.offline': 'ऑफलाइन लर्निंग',
    'settings.account': 'खाता',
    'settings.darkMode': 'डार्क मोड',
    'settings.appLanguage': 'ऐप भाषा',
    'settings.learningReminders': 'सीखने की याददाश्त',
    'settings.enableOffline': 'ऑफलाइन मोड सक्षम करें',
    'settings.signOut': 'साइन आउट',
    'footer.motto': 'सीखें • खेलें • हासिल करें',
  },
  or: {
    'app.title': 'ଏଡୁପ୍ରେରଣା',
    'app.subtitle': 'ଗେମିଫାଇଡ୍ ଷ୍ଟେମ୍ ଲର୍ନିଂ',
    'nav.dashboard': 'ଡ୍ୟାସବୋର୍ଡ',
    'nav.courses': 'କୋର୍ସ',
    'nav.achievements': 'ଅଭିବୃଦ୍ଧି',
    'nav.profile': 'ପ୍ରୋଫାଇଲ',
    'nav.teacher': 'ଶିକ୍ଷକ ଡ୍ୟାସବୋର୍ଡ',
    'nav.settings': 'ସେଟିଂ',
    'nav.quiz': 'ଦ୍ରୁତ କ୍ୱିଜ୍',
    'nav.challenge': 'ଦୈନିକ ଚ୍ୟାଲେଞ୍ଜ',
    'nav.games': 'ମିନି-ଗେମ୍',
    'nav.miniGames': 'ସମସ୍ତ ମିନି-ଗେମ୍',
    'nav.oneNightStudy': '୧ ରାତିର ପଢ଼ା',
    'nav.download': 'ଗ୍ରେଡ୍ ଡାଉନଲୋଡ୍',
    'welcome.title': 'ପୁନର୍ବାର ସ୍ୱାଗତ, ଛାତ୍ର! 👋',
    'welcome.subtitle': 'ପ୍ରତ୍ୟେକ ବିଶେଷଜ୍ଞ ଥରେ ଆରମ୍ଭକାରୀ ଥିଲେ!',
    'ready.title': 'ଶିଖିବାକୁ ପ୍ରସ୍ତୁତ?',
    'ready.subtitle': 'ଆପଣଙ୍କର ଷ୍ଟେମ୍ ଯାତ୍ରା ଜାରି ରଖନ୍ତୁ!',
    'stats.xp': 'ମୋଟ ଏକ୍ସପି',
    'stats.badges': 'ବ୍ୟଜ୍',
    'stats.level': 'ସ୍ତର',
    'stats.streak': 'ଦିନ ସ୍ଟ୍ରିକ୍',
    'courses.title': 'ଆପଣଙ୍କର କୋର୍ସ',
    'courses.explore': 'ଷ୍ଟେମ୍ କୋର୍ସ ଏକ୍ସପ୍ଲୋର୍ କରନ୍ତୁ',
    'achievements.title': 'ଆପଣଙ୍କର ଅଭିବୃଦ୍ଧି',
    'profile.title': 'ପ୍ରୋଫାଇଲ',
    'teacher.title': 'ଶିକ୍ଷକ ଡ୍ୟାସବୋର୍ଡ',
    'settings.title': 'ସେଟିଂ',
    'settings.appearance': 'ଦୃଶ୍ୟ',
    'settings.language': 'ଭାଷା',
    'settings.notifications': 'ବିଜ୍ଞପ୍ତି',
    'settings.offline': 'ଅଫଲାଇନ୍ ଲର୍ନିଂ',
    'settings.account': 'ଖାତା',
    'settings.darkMode': 'ଡାର୍କ୍ ମୋଡ୍',
    'settings.appLanguage': 'ଆପ୍ ଭାଷା',
    'settings.learningReminders': 'ଶିଖିବା ରିମାଇଣ୍ଡର୍',
    'settings.enableOffline': 'ଅଫଲାଇନ୍ ମୋଡ୍ ସକ୍ଷମ କରନ୍ତୁ',
    'settings.signOut': 'ସାଇନ୍ ଆଉଟ୍',
    'footer.motto': 'ଶିଖନ୍ତୁ • ଖେଳନ୍ତୁ • ହାସଲ କରନ୍ତୁ',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved as Language) || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
