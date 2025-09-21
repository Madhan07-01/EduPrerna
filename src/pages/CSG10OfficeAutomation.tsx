import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Office automation tools are software applications used to automate, organize, and manage office tasks efficiently. They save time, reduce errors, and increase productivity in schools, businesses, and offices.' },
  { title: '1. Word Processing', content: 'Create, edit, format, and print documents (MS Word, Google Docs). Features: text/paragraph formatting, spell/grammar check, tables, images, hyperlinks.' },
  { title: '2. Spreadsheets', content: 'Store data in rows/columns; perform calculations and analysis (MS Excel, Google Sheets). Features: formulas (SUM, AVERAGE), charts, sorting/filtering, conditional formatting, pivot tables.' },
  { title: '3. Presentation Software', content: 'Create slideshow presentations (PowerPoint, Google Slides). Features: slides, text/images/audio/video, transitions/animations, templates, presenter notes.' },
  { title: '4. Database Management', content: 'Store/manage data (MS Access, MySQL). Features: tables, relationships, queries (SQL), forms, reports, data validation.' },
  { title: '5. Email & Scheduling', content: 'Communication and planning (Outlook, Gmail, Google Calendar). Features: mail, contacts, tasks, events, reminders, collaborative scheduling.' },
  { title: '6. Advantages', content: 'Saves time, reduces errors, improves communication, enhances data management/analysis, facilitates collaboration.' },
  { title: 'Summary', content: 'Word, Excel, PowerPoint, Access, and email/scheduling tools cover core productivity: documents, analysis, presentations, databases, and communication.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Office automation tools are used to:', options: [
    { key: 'a', text: 'Automate and manage office tasks' }, { key: 'b', text: 'Play games' }, { key: 'c', text: 'Watch videos only' }, { key: 'd', text: 'None' }
  ], answer: 'a', explanation: 'They support office productivity tasks.' },
  { id: 'q2', question: 'Word processing software:', options: [
    { key: 'a', text: 'MS Excel' }, { key: 'b', text: 'MS Word' }, { key: 'c', text: 'PowerPoint' }, { key: 'd', text: 'MySQL' }
  ], answer: 'b', explanation: 'MS Word edits documents.' },
  { id: 'q3', question: 'Spreadsheet task:', options: [
    { key: 'a', text: 'Sending emails' }, { key: 'b', text: 'Creating charts' }, { key: 'c', text: 'Making slides' }, { key: 'd', text: 'Writing essays' }
  ], answer: 'b', explanation: 'Charts from tabular data.' },
  { id: 'q4', question: 'Presentation software:', options: [
    { key: 'a', text: 'Word' }, { key: 'b', text: 'Access' }, { key: 'c', text: 'PowerPoint' }, { key: 'd', text: 'Sheets' }
  ], answer: 'c', explanation: 'PowerPoint creates slideshows.' },
  { id: 'q5', question: 'Databases are used to:', options: [
    { key: 'a', text: 'Store/manage data' }, { key: 'b', text: 'Create animations' }, { key: 'c', text: 'Format text' }, { key: 'd', text: 'Send emails' }
  ], answer: 'a', explanation: 'DBMS stores structured data.' },
  { id: 'q6', question: 'Email & scheduling tool:', options: [
    { key: 'a', text: 'Word' }, { key: 'b', text: 'Outlook' }, { key: 'c', text: 'Excel' }, { key: 'd', text: 'PowerPoint' }
  ], answer: 'b', explanation: 'Outlook manages mail/events.' },
  { id: 'q7', question: 'Key advantage:', options: [
    { key: 'a', text: 'Increased manual work' }, { key: 'b', text: 'Reduced errors' }, { key: 'c', text: 'Entertainment' }, { key: 'd', text: 'More paper use' }
  ], answer: 'b', explanation: 'Automation lowers error rates.' },
  { id: 'q8', question: 'Excel sum for A1:A5:', options: [
    { key: 'a', text: '=SUM(A1:A5)' }, { key: 'b', text: '=TOTAL(A1:A5)' }, { key: 'c', text: '=ADD(A1:A5)' }, { key: 'd', text: '=SUMMATION(A1:A5)' }
  ], answer: 'a', explanation: 'Standard SUM formula.' },
  { id: 'q9', question: 'NOT an office automation tool:', options: [
    { key: 'a', text: 'Google Docs' }, { key: 'b', text: 'MS Access' }, { key: 'c', text: 'Adobe Photoshop' }, { key: 'd', text: 'MS PowerPoint' }
  ], answer: 'c', explanation: 'Photoshop is graphics editing.' },
  { id: 'q10', question: 'Slide movement effect called:', options: [
    { key: 'a', text: 'Animation' }, { key: 'b', text: 'Transition' }, { key: 'c', text: 'Chart' }, { key: 'd', text: 'Table' }
  ], answer: 'b', explanation: 'Transition between slides.' },
]

export default function CSG10OfficeAutomation() {
  return (
    <LessonModuleTemplate
      title="Office Automation Tools"
      subject="Computer Science"
      grade={10}
      backLink="/lessons/ComputerScience/10"
      lessonId="cs-g10-office-automation"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
