import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'A Database Management System (DBMS) stores, manages, and retrieves data efficiently. SQL is the standard language for relational databases. Used in almost every domain: finance, e-commerce, healthcare, social networks.' },
  { title: '1. DBMS Features', content: 'Data independence, efficient access, security, integrity, concurrency control, recovery.' },
  { title: '2. Tables (Relations)', content: 'Data stored in rows (tuples) and columns (attributes). Example: Students(RollNo, Name, Age, Grade).' },
  { title: '3. SQL – DDL', content: 'CREATE/ALTER/DROP define and modify schema.\nCREATE TABLE Students (RollNo INT PRIMARY KEY, Name VARCHAR(50), Age INT, Grade CHAR(1));\nALTER TABLE Students ADD Address VARCHAR(100);\nDROP TABLE Students;' },
  { title: '4. SQL – DML', content: 'INSERT/UPDATE/DELETE manipulate data.\nINSERT INTO Students (RollNo,Name,Age,Grade) VALUES (104,\'David\',18,\'B\');\nUPDATE Students SET Grade=\'A\' WHERE RollNo=102;\nDELETE FROM Students WHERE RollNo=103;' },
  { title: '5. SQL – Querying', content: 'SELECT retrieves data; WHERE filters; ORDER BY sorts.\nSELECT Name, Grade FROM Students WHERE Age=17 ORDER BY Name;\nSELECT * FROM Students;' },
  { title: '6. Aggregates', content: 'COUNT, SUM, AVG, MIN, MAX summarize data.\nSELECT COUNT(*) FROM Students;\nSELECT AVG(Age) FROM Students;' },
  { title: '7. Joins', content: 'INNER JOIN: matching rows; LEFT/RIGHT JOIN: include non-matching from one side.\nSELECT S.Name, M.Score FROM Students S INNER JOIN Marks M ON S.RollNo = M.RollNo;' },
  { title: '8. Constraints', content: 'PRIMARY KEY (unique, not null), FOREIGN KEY (referential integrity), NOT NULL, UNIQUE.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Command to remove a table is:', options: [
    { key: 'a', text: 'DELETE' }, { key: 'b', text: 'DROP' }, { key: 'c', text: 'REMOVE' }, { key: 'd', text: 'TRUNCATE' }
  ], answer: 'b', explanation: 'DROP removes schema and data. TRUNCATE clears data only.' },
  { id: 'q2', question: 'Which is a DML command?', options: [
    { key: 'a', text: 'CREATE' }, { key: 'b', text: 'INSERT' }, { key: 'c', text: 'ALTER' }, { key: 'd', text: 'DROP' }
  ], answer: 'b', explanation: 'INSERT/UPDATE/DELETE are DML; CREATE/ALTER/DROP are DDL.' },
  { id: 'q3', question: 'Clause to filter records:', options: [
    { key: 'a', text: 'ORDER BY' }, { key: 'b', text: 'GROUP BY' }, { key: 'c', text: 'WHERE' }, { key: 'd', text: 'HAVING' }
  ], answer: 'c', explanation: 'WHERE filters rows before grouping.' },
  { id: 'q4', question: 'PRIMARY KEY enforces:', options: [
    { key: 'a', text: 'Unique & not null' }, { key: 'b', text: 'Only unique' }, { key: 'c', text: 'Only not null' }, { key: 'd', text: 'No constraint' }
  ], answer: 'a', explanation: 'PK uniquely identifies rows and disallows NULLs.' },
  { id: 'q5', question: 'Function returning row count:', options: [
    { key: 'a', text: 'SUM()' }, { key: 'b', text: 'COUNT()' }, { key: 'c', text: 'AVG()' }, { key: 'd', text: 'MAX()' }
  ], answer: 'b', explanation: 'COUNT aggregates rows.' },
  { id: 'q6', question: 'Join that returns only matches:', options: [
    { key: 'a', text: 'LEFT JOIN' }, { key: 'b', text: 'RIGHT JOIN' }, { key: 'c', text: 'INNER JOIN' }, { key: 'd', text: 'FULL OUTER JOIN' }
  ], answer: 'c', explanation: 'INNER JOIN includes only matching pairs.' },
  { id: 'q7', question: 'Sort ascending:', options: [
    { key: 'a', text: 'ORDER BY ASC' }, { key: 'b', text: 'SORT BY ASC' }, { key: 'c', text: 'SORT ASC' }, { key: 'd', text: 'ORDER ASC' }
  ], answer: 'a', explanation: 'Standard SQL uses ORDER BY ... ASC.' },
  { id: 'q8', question: 'Add a column:', options: [
    { key: 'a', text: 'ALTER TABLE' }, { key: 'b', text: 'UPDATE TABLE' }, { key: 'c', text: 'MODIFY TABLE' }, { key: 'd', text: 'CHANGE TABLE' }
  ], answer: 'a', explanation: 'ALTER TABLE ... ADD COLUMN ...' },
  { id: 'q9', question: 'Remove only data (not structure):', options: [
    { key: 'a', text: 'DELETE' }, { key: 'b', text: 'DROP' }, { key: 'c', text: 'TRUNCATE' }, { key: 'd', text: 'REMOVE' }
  ], answer: 'c', explanation: 'TRUNCATE removes rows; table schema remains.' },
  { id: 'q10', question: 'Relational databases store data in:', options: [
    { key: 'a', text: 'Arrays' }, { key: 'b', text: 'Linked lists' }, { key: 'c', text: 'Tables' }, { key: 'd', text: 'Trees' }
  ], answer: 'c', explanation: 'Tables = relations (rows & columns).' },
]

export default function CSG12DBMSSQL() {
  return (
    <LessonModuleTemplate
      title="Database Management Systems (SQL)"
      subject="Computer Science"
      grade={12}
      backLink="/lessons/ComputerScience/12"
      lessonId="cs-g12-dbms-sql"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
