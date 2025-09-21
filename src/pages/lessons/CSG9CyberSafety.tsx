import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Cyber Safety is the practice of protecting yourself, devices, and data while using the internet. Awareness of cyber threats and safe online behavior is essential in today’s digital world.' },
  { title: '1. Cyber Threats', content: 'Malware (viruses, worms, trojans), Phishing (fake emails/messages), Cyberbullying (harassment), Hacking (unauthorized access).' },
  { title: '2. Password Safety', content: 'Use strong passwords with letters, numbers, symbols; avoid reuse; change regularly; enable multi-factor authentication where possible.' },
  { title: '3. Safe Browsing', content: 'Visit trusted HTTPS websites; avoid unknown links/pop-ups; keep browsers, OS, and antivirus updated.' },
  { title: '4. Social Media Safety', content: 'Keep profiles private; limit personal info; think before posting; report/block harassment; beware of impersonation.' },
  { title: '5. Data Protection', content: 'Back up files; use antivirus and firewall; encrypt sensitive files; lock devices; avoid public Wi‑Fi for sensitive tasks.' },
  { title: '6. Email Safety', content: 'Do not open suspicious attachments; recognize phishing patterns; verify links/URLs before clicking; beware of urgency/bait messages.' },
  { title: '7. Online Etiquette (Netiquette)', content: 'Be polite and respectful; avoid spreading rumors; give credit; respect privacy and community guidelines.' },
  { title: 'Summary', content: 'Stay safe by using strong passwords, updating software, verifying sources, protecting data, and practicing respectful behavior online.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Cyber safety is important to:', options: [
    { key: 'a', text: 'Protect data' }, { key: 'b', text: 'Play games' }, { key: 'c', text: 'Increase followers' }, { key: 'd', text: 'None' }
  ], answer: 'a', explanation: 'Primary aim is to protect data and users.' },
  { id: 'q2', question: 'Type of malware:', options: [
    { key: 'a', text: 'Firewall' }, { key: 'b', text: 'Virus' }, { key: 'c', text: 'Antivirus' }, { key: 'd', text: 'Router' }
  ], answer: 'b', explanation: 'Virus is malicious software.' },
  { id: 'q3', question: 'Phishing is:', options: [
    { key: 'a', text: 'Game' }, { key: 'b', text: 'Trick emails' }, { key: 'c', text: 'Social media trend' }, { key: 'd', text: 'Antivirus' }
  ], answer: 'b', explanation: 'Phishing uses deceptive messages to steal info.' },
  { id: 'q4', question: 'Strong passwords include:', options: [
    { key: 'a', text: 'Numbers' }, { key: 'b', text: 'Letters' }, { key: 'c', text: 'Letters, numbers, symbols' }, { key: 'd', text: 'Symbols' }
  ], answer: 'c', explanation: 'Use a mix for strength.' },
  { id: 'q5', question: 'Safe browsing practice:', options: [
    { key: 'a', text: 'Click unknown links' }, { key: 'b', text: 'HTTPS websites' }, { key: 'c', text: 'Untrusted downloads' }, { key: 'd', text: 'Ignore updates' }
  ], answer: 'b', explanation: 'HTTPS indicates encryption/authentication.' },
  { id: 'q6', question: 'Cyberbullying means:', options: [
    { key: 'a', text: 'Helping online' }, { key: 'b', text: 'Harassment' }, { key: 'c', text: 'Posting funny videos' }, { key: 'd', text: 'Gaming' }
  ], answer: 'b', explanation: 'Bullying via digital platforms.' },
  { id: 'q7', question: 'Before clicking email link:', options: [
    { key: 'a', text: 'Ignore' }, { key: 'b', text: 'Hover URL' }, { key: 'c', text: 'Click immediately' }, { key: 'd', text: 'Forward' }
  ], answer: 'b', explanation: 'Hover to check destination.' },
  { id: 'q8', question: 'File protection:', options: [
    { key: 'a', text: 'Leave unprotected' }, { key: 'b', text: 'Encrypt/backup' }, { key: 'c', text: 'Share passwords' }, { key: 'd', text: 'Public drive' }
  ], answer: 'b', explanation: 'Encryption and backups protect data.' },
  { id: 'q9', question: 'Netiquette refers to:', options: [
    { key: 'a', text: 'Online politeness' }, { key: 'b', text: 'Install antivirus' }, { key: 'c', text: 'Gaming' }, { key: 'd', text: 'Share passwords' }
  ], answer: 'a', explanation: 'Netiquette is online etiquette.' },
  { id: 'q10', question: 'Reporting suspicious content is:', options: [
    { key: 'a', text: 'Optional' }, { key: 'b', text: 'Dangerous' }, { key: 'c', text: 'Safe practice' }, { key: 'd', text: 'Illegal' }
  ], answer: 'c', explanation: 'Reporting helps keep platforms safe.' },
]

export default function CSG9CyberSafety() {
  return (
    <LessonModuleTemplate
      title="Cyber Safety"
      subject="Computer Science"
      grade={9}
      backLink="/lessons/ComputerScience/9"
      lessonId="cs-g9-cyber-safety"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
