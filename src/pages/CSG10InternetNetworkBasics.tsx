import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Computer networks and the Internet enable devices to communicate and share data worldwide. Knowing the basics helps with communication, online learning, cloud services, and cybersecurity.' },
  { title: '1. Computer Network', content: 'A group of interconnected computers that share resources (data, software, hardware). Types: LAN (building), MAN (city), WAN (wide area/Internet), PAN (personal devices via Bluetooth, etc.).' },
  { title: '2. Internet', content: 'A global network of networks using standard protocols. Provides access to websites, email, social media, banking, and cloud services.' },
  { title: '3. IP Address and Domain Name', content: 'IP: unique numeric address for a device (e.g., 192.168.0.1). Domain name: human‑readable website name (e.g., example.com). DNS maps domain names to IP addresses.' },
  { title: '4. Web Browsers and Websites', content: 'Browser: software to access the web (Chrome, Firefox, Edge). Website: collection of web pages accessible by a URL from a server.' },
  { title: '5. Protocols', content: 'Rules for communication. Common protocols: HTTP/HTTPS (web), FTP (file transfer), SMTP/POP3/IMAP (email).' },
  { title: '6. Advantages of Networks and Internet', content: 'Easy communication, resource sharing, information access, online collaboration/cloud storage, e‑learning, e‑commerce.' },
  { title: '7. Safety and Security', content: 'Use strong passwords, avoid oversharing personal info, install antivirus/firewall, be cautious of phishing/malware, keep systems updated.' },
  { title: 'Summary', content: 'Networks connect devices locally and globally; the Internet uses protocols and DNS to route data; safe practices protect users and data.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'A network of computers connected to share resources is called:', options: [
    { key: 'a', text: 'Internet' }, { key: 'b', text: 'Database' }, { key: 'c', text: 'Computer Network' }, { key: 'd', text: 'Operating System' }
  ], answer: 'c', explanation: 'A computer network shares resources.' },
  { id: 'q2', question: 'LAN stands for:', options: [
    { key: 'a', text: 'Local Access Network' }, { key: 'b', text: 'Large Area Network' }, { key: 'c', text: 'Local Area Network' }, { key: 'd', text: 'Long Area Network' }
  ], answer: 'c', explanation: 'LAN connects within a building/campus.' },
  { id: 'q3', question: 'The Internet is an example of:', options: [
    { key: 'a', text: 'LAN' }, { key: 'b', text: 'WAN' }, { key: 'c', text: 'PAN' }, { key: 'd', text: 'MAN' }
  ], answer: 'b', explanation: 'A wide area network of networks.' },
  { id: 'q4', question: 'A unique numerical address for a device is called:', options: [
    { key: 'a', text: 'URL' }, { key: 'b', text: 'IP Address' }, { key: 'c', text: 'Domain Name' }, { key: 'd', text: 'Protocol' }
  ], answer: 'b', explanation: 'IP is the numeric address.' },
  { id: 'q5', question: 'System that converts domain names to IPs:', options: [
    { key: 'a', text: 'DNS' }, { key: 'b', text: 'HTTP' }, { key: 'c', text: 'FTP' }, { key: 'd', text: 'SMTP' }
  ], answer: 'a', explanation: 'DNS resolves names to numbers.' },
  { id: 'q6', question: 'Which is a web browser?', options: [
    { key: 'a', text: 'Google Chrome' }, { key: 'b', text: 'Wikipedia' }, { key: 'c', text: 'Gmail' }, { key: 'd', text: 'Yahoo' }
  ], answer: 'a', explanation: 'Chrome is a browser; Wikipedia is a site.' },
  { id: 'q7', question: 'Secure web protocol:', options: [
    { key: 'a', text: 'HTTP' }, { key: 'b', text: 'HTTPS' }, { key: 'c', text: 'FTP' }, { key: 'd', text: 'SMTP' }
  ], answer: 'b', explanation: 'HTTPS adds TLS security.' },
  { id: 'q8', question: 'A PAN connects:', options: [
    { key: 'a', text: 'Devices in a building' }, { key: 'b', text: 'Devices in a city' }, { key: 'c', text: 'Personal devices like phone and laptop' }, { key: 'd', text: 'Devices worldwide' }
  ], answer: 'c', explanation: 'PAN is for personal device interconnect.' },
  { id: 'q9', question: 'Advantage of the Internet:', options: [
    { key: 'a', text: 'Resource sharing' }, { key: 'b', text: 'Easy communication' }, { key: 'c', text: 'Information access' }, { key: 'd', text: 'All of the above' }
  ], answer: 'd', explanation: 'All are advantages.' },
  { id: 'q10', question: 'Safe online practice:', options: [
    { key: 'a', text: 'Share passwords' }, { key: 'b', text: 'Ignore antivirus' }, { key: 'c', text: 'Use strong passwords and update regularly' }, { key: 'd', text: 'Click all links in emails' }
  ], answer: 'c', explanation: 'Strong passwords and updates improve security.' },
]

export default function CSG10InternetNetworkBasics() {
  return (
    <LessonModuleTemplate
      title="Internet and Network Basics"
      subject="Computer Science"
      grade={10}
      backLink="/lessons/ComputerScience/10"
      lessonId="cs-g10-internet-network-basics"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
