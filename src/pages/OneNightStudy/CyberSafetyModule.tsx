import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const cyberSafetyModule: LearningModule = {
  title: 'Cyber Safety',
  introduction: 'Welcome to the crucial world of Cyber Safety! In today\'s digital age, the internet is like a vast city with amazing opportunities and wonderful experiences, but just like any city, it also has some unsafe neighborhoods and potential dangers. Learning cyber safety is like learning traffic rules for the digital highway - it keeps you safe while you explore, learn, and have fun online! From protecting your personal information to recognizing online threats, cyber safety skills are your digital armor. These skills will help you confidently navigate the online world, protect yourself and others, and become a responsible digital citizen. Get ready to become a cyber safety expert!',
  concepts: [
    {
      title: 'Common Cyber Threats - Understanding the Digital Dangers',
      content: 'Cyber threats are malicious activities designed to harm users, steal information, or disrupt computer systems. Understanding these threats is the first step in protecting yourself from them.',
      examples: [
        'Malware: Malicious software like viruses, worms, and spyware that damage computers',
        'Phishing: Fake emails or websites that trick you into giving personal information',
        'Cyberbullying: Using digital platforms to harass, threaten, or embarrass others',
        'Hacking: Unauthorized access to computers or accounts to steal or damage data',
        'Identity theft: Criminals stealing personal information to impersonate victims'
      ]
    },
    {
      title: 'Malware - The Digital Infection',
      content: 'Malware is malicious software designed to damage, disrupt, or gain unauthorized access to computer systems. Like biological viruses, digital malware can spread and cause significant harm to your devices and data.',
      examples: [
        'Viruses: Attach to files and spread when files are shared or opened',
        'Worms: Self-replicating programs that spread through networks',
        'Trojans: Disguised as legitimate software but contain malicious code',
        'Spyware: Secretly monitors your activities and steals information',
        'Ransomware: Locks your files and demands payment to unlock them',
        'Prevention: Use antivirus software, avoid suspicious downloads'
      ]
    },
    {
      title: 'Phishing - The Art of Digital Deception',
      content: 'Phishing is a cybercrime where attackers disguise themselves as trustworthy entities to steal sensitive information like passwords, credit card numbers, or personal details. It\'s like digital fishing - criminals cast fake bait to catch unsuspecting victims.',
      examples: [
        'Email phishing: Fake emails from "banks" asking for account details',
        'Website phishing: Fake websites that look like real login pages',
        'SMS phishing (Smishing): Fake text messages with malicious links',
        'Social media phishing: Fake posts or messages requesting personal info',
        'Warning signs: Urgent language, suspicious links, grammar errors, unexpected requests'
      ]
    },
    {
      title: 'Cyberbullying - Digital Harassment and Its Impact',
      content: 'Cyberbullying involves using digital technologies to repeatedly harm, threaten, or embarrass someone. It can happen 24/7 and reach a wide audience, making it particularly harmful and persistent.',
      examples: [
        'Forms: Harassment through messages, posting embarrassing content, spreading rumors',
        'Platforms: Social media, gaming platforms, messaging apps, email',
        'Effects: Depression, anxiety, low self-esteem, poor academic performance',
        'Prevention: Block bullies, save evidence, report to platforms and authorities',
        'Response: Don\'t retaliate, seek help from trusted adults, support victims'
      ]
    },
    {
      title: 'Password Safety - Your First Line of Defense',
      content: 'Strong passwords are like strong locks on your digital doors. They protect your accounts from unauthorized access and keep your personal information safe from cybercriminals.',
      examples: [
        'Strong password characteristics: 12+ characters, mix of letters, numbers, symbols',
        'Good example: "MyD0g@L0ves2Run!" - long, complex, memorable',
        'Bad examples: "password123", "yourname", "123456", common dictionary words',
        'Unique passwords: Different password for each account',
        'Password managers: Tools that generate and store strong passwords safely',
        'Two-factor authentication: Extra security layer requiring phone or email verification'
      ]
    },
    {
      title: 'Safe Browsing - Navigating the Web Securely',
      content: 'Safe browsing involves being cautious about which websites you visit and how you interact with online content. It helps protect you from malicious websites and downloads.',
      examples: [
        'Secure websites: Look for HTTPS (lock icon) in the address bar',
        'Trusted sources: Use well-known, reputable websites for downloads',
        'Suspicious signs: Pop-up warnings, too-good-to-be-true offers, grammar errors',
        'Safe downloads: Only download from official app stores and verified sites',
        'Browser settings: Enable pop-up blockers and safe browsing features',
        'Regular updates: Keep browser and security software up to date'
      ]
    },
    {
      title: 'Social Media Safety - Protecting Your Digital Reputation',
      content: 'Social media platforms are great for connecting with friends and sharing experiences, but they also present unique safety challenges. Learning to use them safely protects both your privacy and reputation.',
      examples: [
        'Privacy settings: Control who can see your posts, photos, and personal information',
        'Think before posting: Remember that online content can be permanent',
        'Friend/follower management: Only connect with people you know in real life',
        'Location sharing: Turn off location services to protect your whereabouts',
        'Personal information: Don\'t share full name, address, phone number, school details',
        'Reporting: Use platform tools to report inappropriate content or harassment'
      ]
    },
    {
      title: 'Data Protection - Safeguarding Your Digital Identity',
      content: 'Your personal data is valuable to both legitimate companies and cybercriminals. Understanding how to protect your data helps maintain your privacy and prevents identity theft.',
      examples: [
        'Personal data types: Name, address, phone, email, photos, location, browsing habits',
        'Data collection: Websites and apps collect data through cookies, forms, tracking',
        'Privacy policies: Read them to understand how your data is used',
        'Minimal sharing: Only provide necessary information when signing up',
        'Regular cleanup: Delete old accounts and remove personal info from unused services',
        'Backup important data: Keep copies of important files in secure locations'
      ]
    },
    {
      title: 'Email Safety - Secure Communication Practices',
      content: 'Email is a common target for cybercriminals. Learning safe email practices helps protect you from phishing, malware, and other email-based threats.',
      examples: [
        'Sender verification: Check sender addresses carefully for misspellings',
        'Suspicious attachments: Don\'t open unexpected attachments or files',
        'Link caution: Hover over links to see real destination before clicking',
        'Personal info: Never share passwords, SSN, or financial info via email',
        'Spam management: Use spam filters and don\'t reply to suspicious emails',
        'Secure email: Use reputable email providers with good security features'
      ]
    },
    {
      title: 'Online Etiquette (Netiquette) - Being Respectful Online',
      content: 'Netiquette refers to the proper and polite way to behave online. Good digital citizenship involves treating others with respect and following community guidelines in digital spaces.',
      examples: [
        'Respectful communication: Use polite language, avoid ALL CAPS (shouting)',
        'Think before posting: Consider how your words might affect others',
        'Privacy respect: Don\'t share others\' personal information or photos without permission',
        'Citation: Give credit when sharing others\' work or ideas',
        'Community rules: Follow guidelines on forums, social media, and gaming platforms',
        'Constructive feedback: Offer helpful criticism rather than personal attacks',
        'Cultural sensitivity: Be aware that online communities include people from diverse backgrounds'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is malware?',
      options: ['A type of hardware component', 'Malicious software designed to harm computers', 'A social media platform', 'A secure website protocol'],
      correct: 1,
      explanation: 'Malware is malicious software designed to damage, disrupt, or gain unauthorized access to computer systems. It includes viruses, worms, trojans, and spyware.'
    },
    {
      question: 'Which of the following is a sign of a phishing email?',
      options: ['Professional formatting', 'Urgent requests for personal information', 'Emails from known contacts', 'Clear sender identification'],
      correct: 1,
      explanation: 'Phishing emails often use urgent language to pressure recipients into quickly providing personal information without thinking carefully about the request.'
    },
    {
      question: 'What makes a password strong?',
      options: ['Using your birth date', 'Being easy to remember', 'Having 12+ characters with letters, numbers, and symbols', 'Using the same password everywhere'],
      correct: 2,
      explanation: 'Strong passwords have 12 or more characters and include a mix of uppercase letters, lowercase letters, numbers, and symbols to make them difficult to guess or crack.'
    },
    {
      question: 'How can you identify a secure website?',
      options: ['It has many pop-up ads', 'It has HTTPS and a lock icon in the address bar', 'It asks for personal information immediately', 'It has bright colors and animations'],
      correct: 1,
      explanation: 'Secure websites use HTTPS protocol (shown by a lock icon in the address bar) which encrypts data transmission between your browser and the website.'
    },
    {
      question: 'What is cyberbullying?',
      options: ['Learning about cyber security', 'Using technology to harm or harass others', 'A type of computer game', 'Creating strong passwords'],
      correct: 1,
      explanation: 'Cyberbullying involves using digital technologies like social media, messaging, or gaming platforms to repeatedly harm, threaten, or embarrass someone.'
    },
    {
      question: 'Which social media safety practice is most important?',
      options: ['Posting everything publicly', 'Accepting all friend requests', 'Adjusting privacy settings to control who sees your content', 'Sharing your location constantly'],
      correct: 2,
      explanation: 'Adjusting privacy settings to control who can see your content is crucial for protecting your personal information and maintaining safety on social media platforms.'
    },
    {
      question: 'What should you do if you receive a suspicious email attachment?',
      options: ['Open it immediately', 'Forward it to friends', 'Don\'t open it and verify with the sender through another method', 'Save it to your computer'],
      correct: 2,
      explanation: 'Never open suspicious email attachments. Instead, verify with the sender through a different communication method to confirm they actually sent the email.'
    },
    {
      question: 'What is two-factor authentication?',
      options: ['Using two passwords', 'An extra security layer requiring a second verification method', 'Having two email accounts', 'Using two different browsers'],
      correct: 1,
      explanation: 'Two-factor authentication adds an extra security layer by requiring a second form of verification (like a text message code) in addition to your password.'
    },
    {
      question: 'Which behavior demonstrates good netiquette?',
      options: ['Using ALL CAPS in messages', 'Sharing others\' private photos without permission', 'Being respectful and polite in online communications', 'Ignoring community guidelines'],
      correct: 2,
      explanation: 'Good netiquette involves being respectful and polite in online communications, just as you would be in face-to-face interactions.'
    },
    {
      question: 'What should you do if you encounter cyberbullying?',
      options: ['Ignore it completely', 'Fight back with similar behavior', 'Block the bully, save evidence, and report to authorities', 'Share the bullying content with others'],
      correct: 2,
      explanation: 'The best response to cyberbullying is to block the bully, save evidence of the harassment, and report it to platform administrators and trusted adults.'
    }
  ]
}

export default function CyberSafetyModule() {
  return (
    <ModuleLayout 
      module={cyberSafetyModule} 
      grade={9} 
      subject="Computer Science" 
    />
  )
}