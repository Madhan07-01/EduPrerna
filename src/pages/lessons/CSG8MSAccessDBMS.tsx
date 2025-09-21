import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'MS Access is a relational DBMS by Microsoft. It helps store, manage, and retrieve data efficiently without advanced programming skills. Commonly used in schools, offices, and small businesses.' },
  { title: '1. Features of MS Access', content: 'Tables: store data in rows/columns. Queries: retrieve/filter data. Forms: easy data entry. Reports: structured output. Relationships: link tables with keys. Macros/Modules: automate tasks.' },
  { title: '2. MS Access as a DBMS', content: 'Data Storage → Tables. Data Retrieval → Queries. Data Manipulation → Forms. Reports → Structured print/export. Relationships → Primary/Foreign Keys. Security → User permissions.' },
  { title: '3. Example: Student Database', content: 'Table: Students (Roll No, Name, Class, Age). Query: Students with marks > 90. Form: Data entry for a student. Report: List of top scorers.' },
  { title: '4. Advantages', content: 'User-friendly; integrates with MS Office; efficient management of related tables; customizable reports.' },
  { title: '5. Disadvantages', content: 'Not for very large databases; limited multi-user support; performance issues with complex queries.' },
  { title: 'Summary', content: 'MS Access is a user-friendly DBMS to build small to medium relational databases using tables, queries, forms, reports, and relationships.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'MS Access is a:', options: [
    { key: 'a', text: 'Word Processor' }, { key: 'b', text: 'Spreadsheet' }, { key: 'c', text: 'DBMS' }, { key: 'd', text: 'Presentation Software' }
  ], answer: 'c', explanation: 'It is a database management system.' },
  { id: 'q2', question: 'Data is stored in:', options: [
    { key: 'a', text: 'Forms' }, { key: 'b', text: 'Tables' }, { key: 'c', text: 'Queries' }, { key: 'd', text: 'Reports' }
  ], answer: 'b', explanation: 'Tables hold data rows/columns.' },
  { id: 'q3', question: 'Feature to filter/retrieve specific data:', options: [
    { key: 'a', text: 'Table' }, { key: 'b', text: 'Query' }, { key: 'c', text: 'Form' }, { key: 'd', text: 'Report' }
  ], answer: 'b', explanation: 'Queries retrieve filtered data.' },
  { id: 'q4', question: 'Primary Key is used to:', options: [
    { key: 'a', text: 'Delete data' }, { key: 'b', text: 'Identify each record' }, { key: 'c', text: 'Sort alphabetically' }, { key: 'd', text: 'Format table' }
  ], answer: 'b', explanation: 'Primary key uniquely identifies rows.' },
  { id: 'q5', question: 'Feature for data entry:', options: [
    { key: 'a', text: 'Forms' }, { key: 'b', text: 'Queries' }, { key: 'c', text: 'Tables' }, { key: 'd', text: 'Reports' }
  ], answer: 'a', explanation: 'Forms provide user-friendly input.' },
  { id: 'q6', question: 'Tables are linked using:', options: [
    { key: 'a', text: 'Primary & Foreign Key' }, { key: 'b', text: 'Fields only' }, { key: 'c', text: 'Queries' }, { key: 'd', text: 'Forms' }
  ], answer: 'a', explanation: 'Relationships use keys.' },
  { id: 'q7', question: 'Advantage of MS Access:', options: [
    { key: 'a', text: 'Difficult to use' }, { key: 'b', text: 'Cannot generate reports' }, { key: 'c', text: 'Integration with MS Office' }, { key: 'd', text: 'Cannot store data' }
  ], answer: 'c', explanation: 'It integrates well with other Office apps.' },
  { id: 'q8', question: 'MS Access suitable for:', options: [
    { key: 'a', text: 'Enterprise-level databases' }, { key: 'b', text: 'Small to medium databases' }, { key: 'c', text: 'Only text files' }, { key: 'd', text: 'Only images' }
  ], answer: 'b', explanation: 'Best for smaller-scale solutions.' },
  { id: 'q9', question: 'Reports in MS Access are used to:', options: [
    { key: 'a', text: 'Enter data' }, { key: 'b', text: 'Display structured data' }, { key: 'c', text: 'Delete tables' }, { key: 'd', text: 'Create queries' }
  ], answer: 'b', explanation: 'Reports format data for viewing/printing.' },
  { id: 'q10', question: 'NOT a component of MS Access:', options: [
    { key: 'a', text: 'Table' }, { key: 'b', text: 'Query' }, { key: 'c', text: 'Slide' }, { key: 'd', text: 'Form' }
  ], answer: 'c', explanation: 'Slides are in presentation software.' },
]

export default function CSG8MSAccessDBMS() {
  return (
    <LessonModuleTemplate
      title="MS Access as a DBMS"
      subject="Computer Science"
      grade={8}
      backLink="/lessons/ComputerScience/8"
      lessonId="cs-g8-ms-access-dbms"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
