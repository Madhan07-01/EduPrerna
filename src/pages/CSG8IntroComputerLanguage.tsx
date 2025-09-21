import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Computers cannot understand human languages. To make them perform tasks, we communicate using computer languages, which are formal sets of instructions that the computer can execute. Learning computer languages is the first step toward programming and software development.' },
  { title: '1. What is a Computer Language?', content: 'A formal language comprising instructions for the computer. Example: print("Hello, World!") in Python displays a message on the screen.' },
  { title: '2. Types of Computer Languages', content: 'Machine Language: Binary code (0s and 1s), directly understood by the computer. Assembly Language: Uses mnemonics, requires an assembler. High-Level Language: Human-readable syntax; requires compiler/interpreter. Examples: Python, C, Java, C++.' },
  { title: '3. Programming vs Scripting Languages', content: 'Programming Languages: Used to write software/applications (Java, C++). Scripting Languages: Automate tasks (Python, JavaScript).' },
  { title: '4. Compiler vs Interpreter', content: 'Compiler: Converts entire program to machine code before execution (e.g., C, C++). Interpreter: Executes code line by line (e.g., Python).' },
  { title: '5. Importance', content: 'Enables human-computer communication; facilitates software development; automates tasks; supports AI, robotics, data science, and innovation.' },
  { title: 'Summary', content: 'Computer languages provide a structured way to instruct computers. From low-level (machine/assembly) to high-level (Python/Java), translators like compilers/interpreters execute our code.' }
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'A computer language is:', options: [
    { key: 'a', text: 'A language humans speak' }, { key: 'b', text: 'A language used to communicate with computers' }, { key: 'c', text: 'Only English' }, { key: 'd', text: 'Only C++' }
  ], answer: 'b', explanation: 'Computer languages let us instruct computers.' },
  { id: 'q2', question: 'Which is a low-level language?', options: [
    { key: 'a', text: 'Python' }, { key: 'b', text: 'Assembly Language' }, { key: 'c', text: 'Java' }, { key: 'd', text: 'C++' }
  ], answer: 'b', explanation: 'Assembly is closer to hardware than high-level languages.' },
  { id: 'q3', question: 'Which of the following is binary code?', options: [
    { key: 'a', text: '101010' }, { key: 'b', text: 'print("Hello")' }, { key: 'c', text: 'MOV A, 5' }, { key: 'd', text: 'int x = 5;' }
  ], answer: 'a', explanation: 'Binary uses 0s and 1s.' },
  { id: 'q4', question: 'Which language is easiest for humans to understand?', options: [
    { key: 'a', text: 'Machine Language' }, { key: 'b', text: 'Assembly Language' }, { key: 'c', text: 'High-Level Language' }, { key: 'd', text: 'Binary Language' }
  ], answer: 'c', explanation: 'High-level languages are human-readable.' },
  { id: 'q5', question: 'Python is an example of:', options: [
    { key: 'a', text: 'Low-Level Language' }, { key: 'b', text: 'High-Level Language' }, { key: 'c', text: 'Assembly Language' }, { key: 'd', text: 'None' }
  ], answer: 'b', explanation: 'Python is high-level.' },
  { id: 'q6', question: 'A compiler:', options: [
    { key: 'a', text: 'Executes code line by line' }, { key: 'b', text: 'Converts entire program to machine code' }, { key: 'c', text: 'Is not needed for high-level languages' }, { key: 'd', text: 'Only works with Python' }
  ], answer: 'b', explanation: 'Compilers translate the whole program before running.' },
  { id: 'q7', question: 'Assembly language requires a:', options: [
    { key: 'a', text: 'Interpreter' }, { key: 'b', text: 'Compiler' }, { key: 'c', text: 'Assembler' }, { key: 'd', text: 'Browser' }
  ], answer: 'c', explanation: 'An assembler converts assembly to machine code.' },
  { id: 'q8', question: 'Which language is used to automate tasks?', options: [
    { key: 'a', text: 'Programming Language' }, { key: 'b', text: 'Scripting Language' }, { key: 'c', text: 'Binary Language' }, { key: 'd', text: 'Assembly Language' }
  ], answer: 'b', explanation: 'Scripting languages like Python/JS automate tasks.' },
  { id: 'q9', question: 'Main advantage of high-level language:', options: [
    { key: 'a', text: 'Difficult to learn' }, { key: 'b', text: 'Slow execution' }, { key: 'c', text: 'Easy to read and write' }, { key: 'd', text: 'Needs no translation' }
  ], answer: 'c', explanation: 'They are designed for human readability/productivity.' },
  { id: 'q10', question: 'Which of these is a programming language?', options: [
    { key: 'a', text: 'Python' }, { key: 'b', text: 'English' }, { key: 'c', text: 'Hindi' }, { key: 'd', text: '101010' }
  ], answer: 'a', explanation: 'Python is a high-level programming language.' },
]

export default function CSG8IntroComputerLanguage() {
  return (
    <LessonModuleTemplate
      title="Introduction to Computer Language"
      subject="Computer Science"
      grade={8}
      backLink="/lessons/ComputerScience/8"
      lessonId="cs-g8-intro-computer-language"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
