import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Programming is the process of writing instructions (a program) that a computer follows to perform tasks. It helps us solve problems efficiently and build software, games, websites, and apps.' },
  { title: '1. What is a Program?', content: 'A sequence of instructions written to perform a specific task, e.g., add two numbers, print Hello World, sort marks.' },
  { title: '2. Programming Languages', content: 'Formal languages used to write programs. Low-level (Assembly) are closer to machine code; High-level (Python, C, Java) are human-friendly and portable.' },
  { title: '3. Features of a Good Language', content: 'Readable, efficient, portable, supports debugging and error detection.' },
  { title: '4. Basic Programming Concepts', content: `Variables: named storage, e.g., age = 15.\nData types: integer, float, string, boolean.\nOperators: arithmetic (+ − * /), relational (== != > <), logical (and or not).\nI/O: input() to read; print() to display.\nControl structures: if/elif/else; loops (for, while).` },
  { title: '5. Problem Solving Steps', content: 'Understand → Plan (algorithm/flowchart) → Code → Test & Debug → Run.' },
  { title: 'Summary', content: 'Programming uses languages and constructs (variables, types, operators, control flow) to translate solutions into executable steps.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Programming is the process of:', options: [
    { key: 'a', text: 'Playing games' }, { key: 'b', text: 'Writing instructions for a computer' }, { key: 'c', text: 'Drawing pictures' }, { key: 'd', text: 'Browsing the internet' }
  ], answer: 'b', explanation: 'Programs are instruction sequences for computers.' },
  { id: 'q2', question: 'A high‑level language is:', options: [
    { key: 'a', text: 'Assembly' }, { key: 'b', text: 'Machine code' }, { key: 'c', text: 'Python' }, { key: 'd', text: 'Binary' }
  ], answer: 'c', explanation: 'Python is high‑level.' },
  { id: 'q3', question: 'A variable is used to:', options: [
    { key: 'a', text: 'Store data' }, { key: 'b', text: 'Perform calculations' }, { key: 'c', text: 'Print output' }, { key: 'd', text: 'Compile a program' }
  ], answer: 'a', explanation: 'Variables hold values.' },
  { id: 'q4', question: 'Which is an arithmetic operator?', options: [
    { key: 'a', text: '==' }, { key: 'b', text: '+' }, { key: 'c', text: 'and' }, { key: 'd', text: 'or' }
  ], answer: 'b', explanation: '+ adds numbers.' },
  { id: 'q5', question: 'Keyword used for decision‑making:', options: [
    { key: 'a', text: 'for' }, { key: 'b', text: 'while' }, { key: 'c', text: 'if' }, { key: 'd', text: 'print' }
  ], answer: 'c', explanation: 'if creates branches.' },
  { id: 'q6', question: 'Output of: num=5; print(num+3)', options: [
    { key: 'a', text: '5' }, { key: 'b', text: '3' }, { key: 'c', text: '8' }, { key: 'd', text: '53' }
  ], answer: 'c', explanation: '5 + 3 = 8.' },
  { id: 'q7', question: 'Which is not a data type?', options: [
    { key: 'a', text: 'Integer' }, { key: 'b', text: 'String' }, { key: 'c', text: 'Loop' }, { key: 'd', text: 'Boolean' }
  ], answer: 'c', explanation: 'Loop is a control structure.' },
  { id: 'q8', question: 'First step in problem‑solving:', options: [
    { key: 'a', text: 'Write the program' }, { key: 'b', text: 'Understand the problem' }, { key: 'c', text: 'Execute the program' }, { key: 'd', text: 'Test and debug' }
  ], answer: 'b', explanation: 'Always define the problem first.' },
  { id: 'q9', question: 'A loop is used to:', options: [
    { key: 'a', text: 'Store multiple values' }, { key: 'b', text: 'Repeat code multiple times' }, { key: 'c', text: 'Compare values' }, { key: 'd', text: 'Display output' }
  ], answer: 'b', explanation: 'Loops repeat a block.' },
  { id: 'q10', question: 'Correct statement about high‑level languages:', options: [
    { key: 'a', text: 'All are machine‑dependent' }, { key: 'b', text: 'They are easy for humans to understand' }, { key: 'c', text: 'A variable cannot store a string' }, { key: 'd', text: 'Loops cannot repeat tasks' }
  ], answer: 'b', explanation: 'Designed for readability/portability.' },
]

export default function CSG10IntroProgramming() {
  return (
    <LessonModuleTemplate
      title="Introduction to Programming"
      subject="Computer Science"
      grade={10}
      backLink="/lessons/ComputerScience/10"
      lessonId="cs-g10-intro-programming"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
