import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'A database is an organized collection of data that can be easily accessed, managed, and updated. Examples include school records, phone contacts, online inventories, and social media data.' },
  { title: '1. What is a Database?', content: 'A systematic collection of related data. Example: School database stores student names, roll numbers, grades, attendance.' },
  { title: '2. Components', content: 'Tables: rows (records) and columns (fields). Fields: single data attribute (e.g., Name). Records: complete row for one item. Primary Key: uniquely identifies each record (e.g., Roll Number).' },
  { title: '3. Types of Databases', content: 'Flat-file: Single table/file. Relational: Multiple related tables connected using keys. Distributed: Data across multiple locations accessed as one.' },
  { title: '4. Advantages', content: 'Efficient storage/retrieval. Easy updates. Supports multiple users and sharing. Reduces redundancy and improves consistency.' },
  { title: '5. Examples of Database Software', content: 'Microsoft Access, MySQL, Oracle, SQLite, PostgreSQL.' },
  { title: 'Summary', content: 'Databases store and organize related data. Tables, fields, records, and primary keys are core. Relational databases link tables with keys. Many DBMS options exist.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'A database is:', options: [
    { key: 'a', text: 'Collection of unrelated data' }, { key: 'b', text: 'Structured collection of related data' }, { key: 'c', text: 'Only numbers' }, { key: 'd', text: 'Only text' }
  ], answer: 'b', explanation: 'Databases store related data in a structured way.' },
  { id: 'q2', question: 'The rows in a table are called:', options: [
    { key: 'a', text: 'Fields' }, { key: 'b', text: 'Records' }, { key: 'c', text: 'Columns' }, { key: 'd', text: 'Keys' }
  ], answer: 'b', explanation: 'Rows are records; columns are fields.' },
  { id: 'q3', question: 'The columns in a table are called:', options: [
    { key: 'a', text: 'Records' }, { key: 'b', text: 'Tables' }, { key: 'c', text: 'Fields' }, { key: 'd', text: 'Rows' }
  ], answer: 'c', explanation: 'Fields are column headings like Name, Age.' },
  { id: 'q4', question: 'Which uniquely identifies a record?', options: [
    { key: 'a', text: 'Field' }, { key: 'b', text: 'Primary Key' }, { key: 'c', text: 'Column Name' }, { key: 'd', text: 'Table Name' }
  ], answer: 'b', explanation: 'Primary key uniquely identifies each record.' },
  { id: 'q5', question: 'In a student database, “Roll Number” is usually:', options: [
    { key: 'a', text: 'Field' }, { key: 'b', text: 'Record' }, { key: 'c', text: 'Primary Key' }, { key: 'd', text: 'Table' }
  ], answer: 'c', explanation: 'Roll number uniquely identifies a student.' },
  { id: 'q6', question: 'Database storing data in a single table:', options: [
    { key: 'a', text: 'Relational' }, { key: 'b', text: 'Flat-file' }, { key: 'c', text: 'Distributed' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Flat-file keeps everything in one table/file.' },
  { id: 'q7', question: 'Tables in a relational database are linked using:', options: [
    { key: 'a', text: 'Columns' }, { key: 'b', text: 'Keys' }, { key: 'c', text: 'Records' }, { key: 'd', text: 'Rows' }
  ], answer: 'b', explanation: 'Primary/foreign keys relate tables.' },
  { id: 'q8', question: 'Which is NOT database software?', options: [
    { key: 'a', text: 'MySQL' }, { key: 'b', text: 'Microsoft Access' }, { key: 'c', text: 'Oracle' }, { key: 'd', text: 'Microsoft Word' }
  ], answer: 'd', explanation: 'Word is a word processor, not DBMS.' },
  { id: 'q9', question: 'A record represents:', options: [
    { key: 'a', text: 'One column' }, { key: 'b', text: 'One row' }, { key: 'c', text: 'Entire database' }, { key: 'd', text: 'A field' }
  ], answer: 'b', explanation: 'A record is a row of related field values.' },
  { id: 'q10', question: 'Advantage of databases:', options: [
    { key: 'a', text: 'Data harder to find' }, { key: 'b', text: 'Efficient storage' }, { key: 'c', text: 'Cannot modify' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Databases store and retrieve data efficiently.' },
]

export default function CSG8IntroDatabase() {
  return (
    <LessonModuleTemplate
      title="Introduction to Database"
      subject="Computer Science"
      grade={8}
      backLink="/lessons/ComputerScience/8"
      lessonId="cs-g8-intro-database"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
