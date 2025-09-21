import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'A computer follows instructions to perform tasks but cannot understand human language. We use programming languages to communicate with computers. A programming language is a special language used to give instructions to a computer to perform a specific task. Different programming languages are used for different types of applications.' },
  { title: '1. Types of Programming Languages', content: `Low-Level Languages: close to machine code; difficult for humans to read.\n• Machine Language → Only 0s and 1s (e.g., 10101010).\n• Assembly Language → Uses symbols/mnemonics (e.g., MOV A, B).\n\nHigh-Level Languages: easier for humans to understand (e.g., Python, Java, C, C++).\nPrograms written in high-level languages must be converted into machine language using:\n• Compiler → Converts the whole program at once.\n• Interpreter → Converts and executes one instruction at a time.` },
  { title: '2. Characteristics of a Good Programming Language', content: 'Easy to learn and use; Portable (runs on different systems); Efficient (fast execution); Clear syntax (reduces errors); Versatile (solves many problems).' },
  { title: '3. Programming Concepts', content: `Variables → Store data in memory (e.g., age = 12).\nData Types → Integer (5), Float (3.14), String ("Hello"), Boolean (True/False).\nOperators → Arithmetic: +, -, *, /; Comparison: ==, !=, >, <; Logical: AND, OR, NOT.\nControl Statements → if, else, elif; Loops → for, while.\nFunctions → Group of instructions performing a task. Example:\n\n  def greet():\n      print("Hello!")\n  greet()` },
  { title: '4. Popular Programming Languages', content: `Python → Web development, data science; easy to learn.\nJava → Android apps, large projects.\nC / C++ → System software, games.\nJavaScript → Websites and web applications.\nScratch → Visual programming for beginners.` },
  { title: 'Summary', content: 'Programming languages let us instruct computers. High-level languages are human-friendly and need compilers/interpreters. Key ideas: variables, data types, operators, control flow, functions. Many languages exist for different uses (Python, Java, C/C++, JavaScript, Scratch).'}
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Which of the following is a high-level programming language?', options: [
    { key: 'a', text: 'Machine Language' }, { key: 'b', text: 'Assembly Language' }, { key: 'c', text: 'Python' }, { key: 'd', text: 'Binary Code' }
  ], answer: 'c', explanation: 'Python is a high-level language; machine and assembly are low-level.' },
  { id: 'q2', question: 'Which converts a whole program into machine code at once?', options: [
    { key: 'a', text: 'Interpreter' }, { key: 'b', text: 'Compiler' }, { key: 'c', text: 'Editor' }, { key: 'd', text: 'Debugger' }
  ], answer: 'b', explanation: 'Compilers translate the entire program in one go.' },
  { id: 'q3', question: 'Which data type stores text?', options: [
    { key: 'a', text: 'Integer' }, { key: 'b', text: 'Float' }, { key: 'c', text: 'String' }, { key: 'd', text: 'Boolean' }
  ], answer: 'c', explanation: 'Strings store sequences of characters.' },
  { id: 'q4', question: 'Which operator is used to check equality?', options: [
    { key: 'a', text: '=' }, { key: 'b', text: '==' }, { key: 'c', text: '!=' }, { key: 'd', text: '>' }
  ], answer: 'b', explanation: '== checks equality; = is assignment.' },
  { id: 'q5', question: 'if and else are examples of:', options: [
    { key: 'a', text: 'Loops' }, { key: 'b', text: 'Variables' }, { key: 'c', text: 'Conditional Statements' }, { key: 'd', text: 'Data Types' }
  ], answer: 'c', explanation: 'They control flow based on conditions.' },
  { id: 'q6', question: 'What is the output of the function below?\\n\\n  def greet():\\n      print("Hi")\\n  greet()', options: [
    { key: 'a', text: 'Nothing' }, { key: 'b', text: 'Hi' }, { key: 'c', text: 'greet' }, { key: 'd', text: 'Error' }
  ], answer: 'b', explanation: 'Calling greet() prints Hi.' },
  { id: 'q7', question: 'Which language is mainly used for Android app development?', options: [
    { key: 'a', text: 'Python' }, { key: 'b', text: 'Java' }, { key: 'c', text: 'C' }, { key: 'd', text: 'Scratch' }
  ], answer: 'b', explanation: 'Java (and Kotlin) are widely used for Android.' },
  { id: 'q8', question: 'Which of these is a visual programming language for beginners?', options: [
    { key: 'a', text: 'C++' }, { key: 'b', text: 'Java' }, { key: 'c', text: 'Scratch' }, { key: 'd', text: 'JavaScript' }
  ], answer: 'c', explanation: 'Scratch uses drag-and-drop blocks.' },
  { id: 'q9', question: 'Which of the following is a loop?', options: [
    { key: 'a', text: 'if' }, { key: 'b', text: 'while' }, { key: 'c', text: 'print' }, { key: 'd', text: 'def' }
  ], answer: 'b', explanation: 'while repeats a block while a condition holds.' },
  { id: 'q10', question: 'What is a variable?', options: [
    { key: 'a', text: 'A type of loop' }, { key: 'b', text: 'A container to store data' }, { key: 'c', text: 'A function' }, { key: 'd', text: 'An operator' }
  ], answer: 'b', explanation: 'Variables store values in memory.' }
]

export default function CSG7ProgrammingLanguages() {
  return (
    <LessonModuleTemplate
      title="Programming Languages"
      subject="Computer Science"
      grade={7}
      backLink="/lessons/ComputerScience/7"
      lessonId="cs-g7-programming-languages"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
