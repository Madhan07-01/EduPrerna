import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'A computer is an electronic device that processes data into meaningful information under the control of software, using physical components called hardware.' },
  { title: '1. Hardware', content: 'Tangible components.\n• Input devices: Keyboard, Mouse, Scanner, Microphone, Webcam\n• Output devices: Monitor, Printer, Speakers, Projector\n• Storage devices:\n  - Primary (RAM, Cache) – temporary, fast\n  - Secondary (HDD, SSD, USB) – non-volatile\n• Processing devices: CPU (ALU + CU)\n  - ALU: Arithmetic & logic\n  - CU: Controls operations\n• Communication devices: NICs, Modems, Routers' },
  { title: '2. Software', content: 'Intangible set of instructions that directs hardware.\n• System software: Operating systems (Windows, Linux, macOS), Utilities (Antivirus, Disk cleanup)\n• Application software: Word processors, Spreadsheets, Browsers, Games\n• Programming software: Compilers, Interpreters, IDEs' },
  { title: '3. Basic Computer Operations', content: 'Input → Processing → Storage → Output → Control. OS and control units coordinate resources and tasks.' },
  { title: '4. Characteristics of Computers', content: 'Speed, Accuracy, Automation, Multitasking, Large Storage & Fast Retrieval.' },
  { title: '5. Memory Hierarchy', content: 'Registers (fastest) → Cache → RAM (volatile) → Secondary storage (HDD/SSD, non-volatile). Lower latency upward, higher capacity downward.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Which of the following is an input device?', options: [
    { key: 'a', text: 'Monitor' }, { key: 'b', text: 'Keyboard' }, { key: 'c', text: 'Printer' }, { key: 'd', text: 'Speaker' }
  ], answer: 'b', explanation: 'Keyboard is used to input data.' },
  { id: 'q2', question: 'Which CPU part performs arithmetic and logical operations?', options: [
    { key: 'a', text: 'Control Unit' }, { key: 'b', text: 'ALU' }, { key: 'c', text: 'Cache' }, { key: 'd', text: 'RAM' }
  ], answer: 'b', explanation: 'The ALU executes arithmetic and logic operations.' },
  { id: 'q3', question: 'Which of the following is system software?', options: [
    { key: 'a', text: 'MS Word' }, { key: 'b', text: 'Antivirus' }, { key: 'c', text: 'Chrome Browser' }, { key: 'd', text: 'Adobe Photoshop' }
  ], answer: 'b', explanation: 'Utilities like antivirus are system software; OS is the primary system software.' },
  { id: 'q4', question: 'Which storage is volatile?', options: [
    { key: 'a', text: 'HDD' }, { key: 'b', text: 'SSD' }, { key: 'c', text: 'RAM' }, { key: 'd', text: 'Flash drive' }
  ], answer: 'c', explanation: 'RAM loses content when power is off.' },
  { id: 'q5', question: 'An operating system is used to:', options: [
    { key: 'a', text: 'Create graphics' }, { key: 'b', text: 'Manage hardware and software' }, { key: 'c', text: 'Write essays' }, { key: 'd', text: 'Store web pages' }
  ], answer: 'b', explanation: 'OS manages resources and provides a platform for applications.' },
  { id: 'q6', question: 'Which is a communication device?', options: [
    { key: 'a', text: 'Mouse' }, { key: 'b', text: 'Router' }, { key: 'c', text: 'Monitor' }, { key: 'd', text: 'Printer' }
  ], answer: 'b', explanation: 'Routers direct traffic between networks.' },
  { id: 'q7', question: 'Secondary storage is mainly used for:', options: [
    { key: 'a', text: 'Temporary storage' }, { key: 'b', text: 'Permanent storage' }, { key: 'c', text: 'Processing' }, { key: 'd', text: 'Input' }
  ], answer: 'b', explanation: 'Secondary devices store data non-volatilely.' },
  { id: 'q8', question: 'Which is application software?', options: [
    { key: 'a', text: 'Windows' }, { key: 'b', text: 'MS Excel' }, { key: 'c', text: 'Linux' }, { key: 'd', text: 'Antivirus' }
  ], answer: 'b', explanation: 'MS Excel is an application for spreadsheets.' },
  { id: 'q9', question: 'The brain of the computer is:', options: [
    { key: 'a', text: 'RAM' }, { key: 'b', text: 'ALU' }, { key: 'c', text: 'CPU' }, { key: 'd', text: 'Motherboard' }
  ], answer: 'c', explanation: 'CPU controls computation and coordination.' },
  { id: 'q10', question: 'Which characteristic enables multiple tasks simultaneously?', options: [
    { key: 'a', text: 'Accuracy' }, { key: 'b', text: 'Multitasking' }, { key: 'c', text: 'Speed' }, { key: 'd', text: 'Storage' }
  ], answer: 'b', explanation: 'Multitasking allows concurrent task handling (time-sliced).' },
]

export default function CSG11ComputerFundamentals() {
  return (
    <LessonModuleTemplate
      title="Computer Fundamentals (hardware, software)"
      subject="Computer Science"
      grade={11}
      backLink="/lessons/ComputerScience/11"
      lessonId="cs-g11-computer-fundamentals"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
