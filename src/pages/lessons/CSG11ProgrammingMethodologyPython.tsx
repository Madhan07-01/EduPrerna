import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Programming is the process of creating instructions a computer can execute. Python is a high-level, interpreted language valued for readability and versatility. Programming methodology covers problem understanding, algorithm design, coding, testing, debugging, and documentation.' },
  { title: '1. Python Basics', content: '• Clean syntax with indentation\n• Variables: x = 5\n• Data types: int, float, complex, str, list, tuple, dict, set, bool' },
  { title: '2. Input and Output', content: '• Input: name = input("Enter your name: ")\n• Output: print("Hello", name)' },
  { title: '3. Operators', content: 'Arithmetic: + − * / // % **\nComparison: == != > < >= <=\nLogical: and or not\nAssignment: = += −= *= /=' },
  { title: '4. Conditionals', content: 'if-elif-else to branch logic based on conditions.' },
  { title: '5. Loops', content: 'for over ranges/iterables; while for condition-based repetition.' },
  { title: '6. Functions', content: 'Reusable blocks defined with def. Parameters and return values enable modularity.' },
  { title: '7. Data Structures', content: 'List (mutable), Tuple (immutable), Dict (key-value), Set (unique elements).' },
  { title: '8. File Handling', content: 'open("file.txt", "r"), read(), write(), close()' },
  { title: '9. Error Handling', content: 'Use try-except to handle runtime errors robustly.' },
  { title: '10. Methodology Steps', content: 'Problem → Algorithm → Code → Test → Debug → Document.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Which of the following is a valid Python variable?', options: [
    { key: 'a', text: '1var' }, { key: 'b', text: 'var_1' }, { key: 'c', text: 'var-1' }, { key: 'd', text: '@var' }
  ], answer: 'b', explanation: 'Variables cannot start with digits or contain hyphens/@.' },
  { id: 'q2', question: 'What is the output of print(3**2)?', options: [
    { key: 'a', text: '5' }, { key: 'b', text: '6' }, { key: 'c', text: '9' }, { key: 'd', text: '8' }
  ], answer: 'c', explanation: '** is exponentiation: 3^2 = 9.' },
  { id: 'q3', question: 'Which keyword defines a function?', options: [
    { key: 'a', text: 'func' }, { key: 'b', text: 'define' }, { key: 'c', text: 'def' }, { key: 'd', text: 'function' }
  ], answer: 'c', explanation: 'Python uses def to define functions.' },
  { id: 'q4', question: 'Given x = 5, what prints?', options: [
    { key: 'a', text: '5' }, { key: 'b', text: 'Positive' }, { key: 'c', text: 'Negative' }, { key: 'd', text: 'Error' }
  ], answer: 'b', explanation: 'x>0 so the if-branch runs.' },
  { id: 'q5', question: 'Which is a mutable type?', options: [
    { key: 'a', text: 'Tuple' }, { key: 'b', text: 'String' }, { key: 'c', text: 'List' }, { key: 'd', text: 'int' }
  ], answer: 'c', explanation: 'Lists are mutable; tuples/strings/ints are immutable.' },
  { id: 'q6', question: 'Take input from a user using', options: [
    { key: 'a', text: 'scanf()' }, { key: 'b', text: 'cin >>' }, { key: 'c', text: 'input()' }, { key: 'd', text: 'read()' }
  ], answer: 'c', explanation: 'input() reads a line as string in Python.' },
  { id: 'q7', question: 'Output of for i in range(3): print(i)?', options: [
    { key: 'a', text: '0 1 2' }, { key: 'b', text: '1 2 3' }, { key: 'c', text: '0 1 2 3' }, { key: 'd', text: '1 2' }
  ], answer: 'a', explanation: 'range(3) yields 0,1,2.' },
  { id: 'q8', question: 'Used for error handling in Python:', options: [
    { key: 'a', text: 'catch' }, { key: 'b', text: 'try-except' }, { key: 'c', text: 'throw' }, { key: 'd', text: 'error' }
  ], answer: 'b', explanation: 'try-except handles exceptions.' },
  { id: 'q9', question: 'Open a file for writing:', options: [
    { key: 'a', text: 'open("file.txt", "r")' }, { key: 'b', text: 'open("file.txt", "w")' }, { key: 'c', text: 'open("file.txt", "rw")' }, { key: 'd', text: 'open("file.txt")' }
  ], answer: 'b', explanation: 'Mode "w" opens for writing (overwrites). "a" appends.' },
  { id: 'q10', question: 'First step in methodology:', options: [
    { key: 'a', text: 'Coding' }, { key: 'b', text: 'Debugging' }, { key: 'c', text: 'Problem Understanding' }, { key: 'd', text: 'Testing' }
  ], answer: 'c', explanation: 'Understand the problem before designing and coding.' },
]

export default function CSG11ProgrammingMethodologyPython() {
  return (
    <LessonModuleTemplate
      title="Programming Methodology (Python)"
      subject="Computer Science"
      grade={11}
      backLink="/lessons/ComputerScience/11"
      lessonId="cs-g11-programming-methodology-python"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
