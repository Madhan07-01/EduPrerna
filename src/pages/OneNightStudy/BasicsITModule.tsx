import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const basicsITModule: LearningModule = {
  title: 'Basics of Information Technology',
  introduction: 'Welcome to the exciting world of Information Technology! Every day, you interact with amazing technological marvels - from smartphones that connect you to friends across the globe to computers that help you learn, create, and explore. Information Technology is like having superpowers that let you access infinite knowledge, communicate instantly with anyone, and solve problems in ways previous generations could only dream of! From the games you play to the apps you use, from online learning to social media, IT surrounds you and shapes your world. Get ready to discover how these incredible technologies work and how you can use them safely and effectively to unlock your potential!',
  concepts: [
    {
      title: 'Computer System Components - Hardware and Software',
      content: 'A computer system is like a team where hardware and software work together to perform amazing tasks. Hardware consists of physical components you can touch, while software includes programs and instructions that tell the hardware what to do.',
      examples: [
        'Hardware examples: Monitor (screen), keyboard, mouse, CPU (processor), memory (RAM), storage (hard drive)',
        'Software examples: Operating system (Windows, macOS), applications (Word, games), web browsers (Chrome, Firefox)',
        'Think of hardware as the body and software as the brain and thoughts',
        'Without software, hardware is like a car without a driver',
        'Both work together: software needs hardware to run, hardware needs software to function'
      ]
    },
    {
      title: 'Types of Computers - Size and Purpose Variety',
      content: 'Computers come in many shapes and sizes, each designed for specific purposes and users. From tiny embedded computers to massive supercomputers, there\'s a computer type for every need and application.',
      examples: [
        'Personal Computers (PCs): Desktop and laptop computers for individual use',
        'Mobile devices: Smartphones, tablets - computers you carry everywhere',
        'Servers: Powerful computers that serve data to many users simultaneously',
        'Supercomputers: Extremely fast computers for complex scientific calculations',
        'Embedded computers: Hidden in cars, appliances, toys, and medical devices',
        'Mainframes: Large computers used by big organizations for critical operations'
      ]
    },
    {
      title: 'Data vs Information - Raw Material vs Finished Product',
      content: 'Data and information are related but different concepts. Data consists of raw facts and figures, while information is processed data that has meaning and context. Understanding this difference is crucial in the digital age.',
      examples: [
        'Data: 25, 30, 28, 35, 22 (just numbers without context)',
        'Information: "Test scores: 25, 30, 28, 35, 22 - Average: 28, Highest: 35"',
        'Data: "John, 16, Mumbai, Cricket" (isolated facts)',
        'Information: "John is a 16-year-old student from Mumbai who plays cricket"',
        'Data becomes information when it\'s organized, processed, and given meaning'
      ]
    },
    {
      title: 'Computer Networks - Connecting the Digital World',
      content: 'Computer networks allow computers to communicate and share resources with each other. They form the backbone of our connected world, enabling everything from email to online gaming.',
      examples: [
        'Local Area Network (LAN): Computers connected in a school or home',
        'Wide Area Network (WAN): Networks spanning large geographical areas',
        'Wi-Fi networks: Wireless connections for laptops, phones, tablets',
        'Network benefits: Share files, printers, internet connection, communicate',
        'Real examples: School computer lab, home Wi-Fi, office networks'
      ]
    },
    {
      title: 'The Internet - The Global Information Highway',
      content: 'The Internet is a massive global network of interconnected computers that allows worldwide communication and information sharing. It\'s like a digital superhighway connecting billions of devices worldwide.',
      examples: [
        'What it enables: Websites, email, social media, online shopping, streaming',
        'Key services: World Wide Web (WWW), email, file transfer, messaging',
        'Internet vs Web: Internet is the infrastructure, Web is one service on it',
        'Global reach: Connects people, businesses, and organizations worldwide',
        'Evolution: From simple text to videos, virtual reality, and smart devices'
      ]
    },
    {
      title: 'IT Applications in Education - Learning Revolution',
      content: 'Information Technology has transformed education, making learning more interactive, accessible, and personalized. Digital tools have opened up new possibilities for students and teachers alike.',
      examples: [
        'Online learning platforms: Khan Academy, Coursera, educational apps',
        'Digital classrooms: Interactive whiteboards, tablets, educational software',
        'Research tools: Online libraries, databases, Wikipedia, educational videos',
        'Communication: Email with teachers, online discussions, virtual meetings',
        'Skills development: Coding, digital art, multimedia presentations'
      ]
    },
    {
      title: 'IT Applications in Healthcare - Saving Lives Through Technology',
      content: 'Information Technology in healthcare helps doctors diagnose diseases, manage patient records, and provide better treatment. It\'s revolutionizing how medical care is delivered worldwide.',
      examples: [
        'Electronic Health Records (EHR): Digital patient files accessible to doctors',
        'Medical imaging: X-rays, MRI, CT scans stored and analyzed digitally',
        'Telemedicine: Remote consultations through video calls',
        'Health apps: Fitness trackers, medication reminders, symptom checkers',
        'Medical research: Computers help develop new medicines and treatments'
      ]
    },
    {
      title: 'IT Applications in Business and Commerce',
      content: 'Businesses use Information Technology to operate efficiently, reach customers, and compete in the global marketplace. IT has revolutionized how companies work and interact with customers.',
      examples: [
        'E-commerce: Online shopping platforms like Amazon, Flipkart',
        'Digital payments: Credit cards, mobile wallets, online banking',
        'Customer service: Chatbots, help desk systems, online support',
        'Business operations: Inventory management, accounting software, databases',
        'Marketing: Social media advertising, email campaigns, data analytics'
      ]
    },
    {
      title: 'Cyber Safety - Protecting Yourself Online',
      content: 'Cyber safety involves protecting yourself, your information, and your devices from online threats. Just like you learn safety rules for the physical world, you need digital safety skills for the online world.',
      examples: [
        'Strong passwords: Use unique, complex passwords for different accounts',
        'Personal information: Don\'t share address, phone number, or school details online',
        'Stranger danger: Be cautious with unknown people online, just like in real life',
        'Suspicious links: Don\'t click on unknown links or download suspicious files',
        'Privacy settings: Control who can see your social media posts and information'
      ]
    },
    {
      title: 'Digital Citizenship and Ethics - Being Responsible Online',
      content: 'Digital citizenship means being a responsible, respectful, and ethical user of technology. It involves understanding your rights and responsibilities in the digital world.',
      examples: [
        'Respect others: No cyberbullying, hate speech, or harassment online',
        'Intellectual property: Don\'t copy others\' work, respect copyrights',
        'Digital footprint: Remember that what you post online can be permanent',
        'Credible sources: Verify information before sharing, avoid spreading fake news',
        'Balance: Maintain healthy balance between online and offline activities',
        'Help others: Support friends who face online problems or threats'
      ]
    }
  ],
  mcqs: [
    {
      question: 'Which of the following is an example of computer hardware?',
      options: ['Microsoft Word', 'Windows Operating System', 'Keyboard', 'Web browser'],
      correct: 2,
      explanation: 'Hardware refers to physical components you can touch. A keyboard is a physical input device, while the other options are software programs.'
    },
    {
      question: 'What type of computer is typically used for scientific calculations requiring enormous processing power?',
      options: ['Smartphone', 'Laptop', 'Supercomputer', 'Tablet'],
      correct: 2,
      explanation: 'Supercomputers are designed for complex scientific calculations requiring enormous processing power, such as weather forecasting and space research.'
    },
    {
      question: 'What is the main difference between data and information?',
      options: ['Data is digital, information is analog', 'Data is processed facts, information is raw facts', 'Data is raw facts, information is processed data with meaning', 'There is no difference'],
      correct: 2,
      explanation: 'Data consists of raw facts and figures, while information is processed data that has been organized and given meaning and context.'
    },
    {
      question: 'What does LAN stand for in computer networking?',
      options: ['Large Area Network', 'Local Area Network', 'Limited Access Network', 'Long Access Network'],
      correct: 1,
      explanation: 'LAN stands for Local Area Network, which connects computers in a small geographical area like a home, office, or school.'
    },
    {
      question: 'Which of the following is NOT a service provided by the Internet?',
      options: ['World Wide Web', 'Email', 'File transfer', 'Electricity generation'],
      correct: 3,
      explanation: 'The Internet provides digital services like the World Wide Web, email, and file transfer. Electricity generation is a physical infrastructure service, not an Internet service.'
    },
    {
      question: 'How has IT transformed education?',
      options: ['Made learning more expensive', 'Eliminated the need for teachers', 'Made learning more interactive and accessible', 'Reduced the importance of books'],
      correct: 2,
      explanation: 'IT has made learning more interactive and accessible through online platforms, digital tools, and educational software, enhancing rather than replacing traditional education.'
    },
    {
      question: 'What is telemedicine?',
      options: ['Medicine delivered by telephone', 'Remote medical consultations using technology', 'Television programs about health', 'Medical equipment repair'],
      correct: 1,
      explanation: 'Telemedicine refers to remote medical consultations and healthcare services delivered through technology like video calls and digital communication.'
    },
    {
      question: 'Which is an example of e-commerce?',
      options: ['Watching videos online', 'Sending emails', 'Online shopping', 'Playing games'],
      correct: 2,
      explanation: 'E-commerce refers to commercial transactions conducted online, such as buying and selling products through websites like Amazon or Flipkart.'
    },
    {
      question: 'What is the most important rule for creating strong passwords?',
      options: ['Use your name and birthday', 'Use the same password for all accounts', 'Use unique, complex passwords for different accounts', 'Share passwords with friends'],
      correct: 2,
      explanation: 'Strong cyber safety requires using unique, complex passwords for different accounts to prevent unauthorized access if one account is compromised.'
    },
    {
      question: 'What does digital citizenship involve?',
      options: ['Only using computers for entertainment', 'Being responsible and ethical online', 'Avoiding all social media', 'Using technology without any rules'],
      correct: 1,
      explanation: 'Digital citizenship involves being a responsible, respectful, and ethical user of technology, understanding your rights and responsibilities in the digital world.'
    }
  ]
}

export default function BasicsITModule() {
  return (
    <ModuleLayout 
      module={basicsITModule} 
      grade={9} 
      subject="Computer Science" 
    />
  )
}