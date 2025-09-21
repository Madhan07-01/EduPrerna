import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Office tools are software applications to create, manage, and present information. They are essential in education, business, administration, and personal productivity.' },
  { title: '1. Word Processor', content: 'Create, edit, format, print documents (MS Word, Google Docs). Features: text formatting, alignment, bullets, tables, spell check.' },
  { title: '2. Spreadsheet Software', content: 'Organize data in rows/columns and perform calculations (MS Excel). Features: formulas, charts, filtering, conditional formatting.' },
  { title: '3. Presentation Software', content: 'Create slides for visual presentations (PowerPoint, Google Slides). Features: slides, text/images, animations, presenter notes.' },
  { title: '4. Database Software', content: 'Store and manage large data (MS Access, MySQL). Features: tables, queries, forms, reports.' },
  { title: '5. Common Uses', content: 'Education: assignments, reports. Business: invoices, spreadsheets. Administration: record keeping. Personal: letters, budgets.' },
  { title: 'Summary', content: 'Word, Excel, PowerPoint, and Access cover core productivity: documents, analysis, presentations, and data management.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'MS Word is:', options: [
    { key: 'a', text: 'Spreadsheet' }, { key: 'b', text: 'Word processor' }, { key: 'c', text: 'Presentation' }, { key: 'd', text: 'Database' }
  ], answer: 'b', explanation: 'Word processors handle documents.' },
  { id: 'q2', question: 'Excel data is organized in:', options: [
    { key: 'a', text: 'Slides' }, { key: 'b', text: 'Tables' }, { key: 'c', text: 'Cells, rows, columns' }, { key: 'd', text: 'Forms' }
  ], answer: 'c', explanation: 'Spreadsheets use cells in rows/columns.' },
  { id: 'q3', question: 'Create slides using:', options: [
    { key: 'a', text: 'Word' }, { key: 'b', text: 'PowerPoint' }, { key: 'c', text: 'Excel' }, { key: 'd', text: 'Access' }
  ], answer: 'b', explanation: 'Presentation software creates slides.' },
  { id: 'q4', question: 'Database software is used to:', options: [
    { key: 'a', text: 'Make charts only' }, { key: 'b', text: 'Store/manage data' }, { key: 'c', text: 'Write letters' }, { key: 'd', text: 'Play games' }
  ], answer: 'b', explanation: 'DBMSs manage structured data.' },
  { id: 'q5', question: 'Word processor feature:', options: [
    { key: 'a', text: 'Slide transitions' }, { key: 'b', text: 'Cell formulas' }, { key: 'c', text: 'Paragraph alignment' }, { key: 'd', text: 'Table queries' }
  ], answer: 'c', explanation: 'Alignment is a document feature.' },
  { id: 'q6', question: 'Charts in Excel are used for:', options: [
    { key: 'a', text: 'Writing text' }, { key: 'b', text: 'Visual data' }, { key: 'c', text: 'Slides' }, { key: 'd', text: 'Permanent storage' }
  ], answer: 'b', explanation: 'Charts visualize data.' },
  { id: 'q7', question: 'Presenter notes are a feature of:', options: [
    { key: 'a', text: 'Word' }, { key: 'b', text: 'Spreadsheet' }, { key: 'c', text: 'Presentation' }, { key: 'd', text: 'Database' }
  ], answer: 'c', explanation: 'Notes assist presenters during slideshows.' },
  { id: 'q8', question: 'Templates in office tools are:', options: [
    { key: 'a', text: 'Encryption tools' }, { key: 'b', text: 'Pre-designed formats' }, { key: 'c', text: 'Program runners' }, { key: 'd', text: 'Browsers' }
  ], answer: 'b', explanation: 'Templates speed up document creation.' },
  { id: 'q9', question: 'Access forms are primarily used to:', options: [
    { key: 'a', text: 'Display or input data' }, { key: 'b', text: 'Calculate only' }, { key: 'c', text: 'Create slides' }, { key: 'd', text: 'Write letters' }
  ], answer: 'a', explanation: 'Forms provide data entry/display.' },
  { id: 'q10', question: 'Conditional formatting is associated with:', options: [
    { key: 'a', text: 'Word' }, { key: 'b', text: 'Spreadsheets' }, { key: 'c', text: 'Presentation' }, { key: 'd', text: 'Database' }
  ], answer: 'b', explanation: 'It formats cells based on conditions in spreadsheets.' },
]

export default function CSG9OfficeTools() {
  return (
    <LessonModuleTemplate
      title="Office Tools"
      subject="Computer Science"
      grade={9}
      backLink="/lessons/ComputerScience/9"
      lessonId="cs-g9-office-tools"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
