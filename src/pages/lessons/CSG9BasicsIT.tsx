import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Information Technology (IT) is the study, design, development, and management of computer-based information systems. It combines hardware, software, networks, and data to process, store, and transmit information efficiently across education, healthcare, banking, business, and communication.' },
  { title: '1. Computer System Components', content: `Hardware (physical): Input (keyboard, mouse, scanner), Output (monitor, printer, speakers), CPU (processes instructions). Memory: Primary (RAM/ROM) for temporary/permanent storage; Secondary (HDD/SSD) for long-term storage.\nSoftware (programs): System software → Operating systems (Windows, Linux, macOS); Application software → MS Word, Excel, browsers, media players.` },
  { title: '2. Types of Computers', content: 'Supercomputers (research, simulations), Mainframes (enterprise processing), PCs (home/office), Laptops (portable), Mobile devices (smartphones, tablets).' },
  { title: '3. Data and Information', content: 'Data: raw facts (25, "John"). Information: processed data with meaning ("John scored 25 marks"). Data Processing: converting raw data into useful information via software/hardware.' },
  { title: '4. Networks and Internet', content: 'LAN: within a building/campus. WAN: across cities/countries (Internet). Internet enables communication, data transfer, web services (email, web apps).' },
  { title: '5. IT Applications', content: 'Education (e-learning), Healthcare (EHR, telemedicine), Banking (online banking, ATMs), Business (e-commerce, inventory), Government (e-services, digital governance).' },
  { title: 'Summary', content: 'IT integrates hardware, software, networks, and data to transform information flow. It impacts nearly every sector with efficiency and connectivity.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Primary memory:', options: [
    { key: 'a', text: 'Hard disk' }, { key: 'b', text: 'RAM' }, { key: 'c', text: 'USB drive' }, { key: 'd', text: 'Printer' }
  ], answer: 'b', explanation: 'RAM is primary memory.' },
  { id: 'q2', question: 'Brain of the computer:', options: [
    { key: 'a', text: 'Input' }, { key: 'b', text: 'CPU' }, { key: 'c', text: 'Monitor' }, { key: 'd', text: 'Storage' }
  ], answer: 'b', explanation: 'CPU controls processing.' },
  { id: 'q3', question: 'MS Word is:', options: [
    { key: 'a', text: 'System software' }, { key: 'b', text: 'Application software' }, { key: 'c', text: 'Hardware' }, { key: 'd', text: 'Network' }
  ], answer: 'b', explanation: 'Word is an application.' },
  { id: 'q4', question: 'Network covering large area:', options: [
    { key: 'a', text: 'LAN' }, { key: 'b', text: 'WAN' }, { key: 'c', text: 'PAN' }, { key: 'd', text: 'MAN' }
  ], answer: 'b', explanation: 'WAN spans cities/countries.' },
  { id: 'q5', question: 'Processed meaningful data is:', options: [
    { key: 'a', text: 'Input' }, { key: 'b', text: 'Output' }, { key: 'c', text: 'Information' }, { key: 'd', text: 'Software' }
  ], answer: 'c', explanation: 'Information = processed data.' },
  { id: 'q6', question: 'NOT an input device:', options: [
    { key: 'a', text: 'Keyboard' }, { key: 'b', text: 'Mouse' }, { key: 'c', text: 'Printer' }, { key: 'd', text: 'Scanner' }
  ], answer: 'c', explanation: 'Printers are output devices.' },
  { id: 'q7', question: 'Supercomputers used for:', options: [
    { key: 'a', text: 'Browsing' }, { key: 'b', text: 'Gaming' }, { key: 'c', text: 'Research' }, { key: 'd', text: 'Word processing' }
  ], answer: 'c', explanation: 'Research/simulations need supercomputers.' },
  { id: 'q8', question: 'Safe cyber practice:', options: [
    { key: 'a', text: 'Sharing passwords' }, { key: 'b', text: 'Downloading unknown files' }, { key: 'c', text: 'Strong passwords' }, { key: 'd', text: 'Clicking phishing links' }
  ], answer: 'c', explanation: 'Strong, unique passwords are safer.' },
  { id: 'q9', question: 'Portable computer:', options: [
    { key: 'a', text: 'Mainframe' }, { key: 'b', text: 'Laptop' }, { key: 'c', text: 'Supercomputer' }, { key: 'd', text: 'Server' }
  ], answer: 'b', explanation: 'Laptops are portable.' },
  { id: 'q10', question: 'System software:', options: [
    { key: 'a', text: 'Chrome' }, { key: 'b', text: 'Linux' }, { key: 'c', text: 'MS Excel' }, { key: 'd', text: 'Photoshop' }
  ], answer: 'b', explanation: 'Operating systems are system software.' },
]

export default function CSG9BasicsIT() {
  return (
    <LessonModuleTemplate
      title="Basics of Information Technology"
      subject="Computer Science"
      grade={9}
      backLink="/lessons/ComputerScience/9"
      lessonId="cs-g9-basics-it"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
