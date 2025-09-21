import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'C++ is a general-purpose, high-level language created by Bjarne Stroustrup as an extension of C, adding object-oriented programming. It is used in systems, games, applications, and competitive programming.' },
  { title: '1. Basic Structure of a C++ Program', content: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}\n\n• <iostream>: I/O library\n• using namespace std;: use std identifiers without std:: prefix\n• main(): entry point\n• cout: output stream' },
  { title: '2. Variables and Data Types', content: 'Common types: int, float, double, char, bool.\nExample:\nint age = 18;\nfloat pi = 3.14f;\nchar grade = \u0027A\u0027;\nbool ok = true;' },
  { title: '3. Input and Output', content: 'Input with cin, output with cout.\nint x;\ncout << "Enter a number: ";\ncin >> x;\ncout << "You entered: " << x;' },
  { title: '4. Operators', content: 'Arithmetic: +, -, *, /, %\nRelational: ==, !=, <, >, <=, >=\nLogical: &&, ||, !\nAssignment: =, +=, -=, *=, /=' },
  { title: '5. Conditionals', content: 'if-else and switch-case for decision making.\nif (x > 0) { cout << "Positive"; } else { cout << "Non-positive"; }' },
  { title: '6. Loops', content: 'for, while, do-while for repetition.\nfor (int i=0;i<5;i++) cout << i << " ";' },
  { title: '7. Functions', content: 'Functions modularize code.\nint add(int a, int b) { return a + b; }\nint main(){ cout << add(5,3); }' },
  { title: '8. Comments', content: 'Single-line: // text\nMulti-line: /* text */' },
  { title: '9. Programming Methodology', content: 'Problem → Algorithm → Flowchart/Pseudocode → Code → Compile/Run → Test/Debug → Document.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Who developed C++?', options: [
    { key: 'a', text: 'Dennis Ritchie' }, { key: 'b', text: 'Bjarne Stroustrup' }, { key: 'c', text: 'James Gosling' }, { key: 'd', text: 'Guido van Rossum' }
  ], answer: 'b', explanation: 'Bjarne Stroustrup developed C++.' },
  { id: 'q2', question: 'Correct header for I/O is', options: [
    { key: 'a', text: '#include <stdio.h>' }, { key: 'b', text: '#include <conio.h>' }, { key: 'c', text: '#include <iostream>' }, { key: 'd', text: '#include <math.h>' }
  ], answer: 'c', explanation: '<iostream> provides std::cin and std::cout.' },
  { id: 'q3', question: 'Declare an integer variable', options: [
    { key: 'a', text: 'int x;' }, { key: 'b', text: 'integer x;' }, { key: 'c', text: 'x int;' }, { key: 'd', text: 'var x;' }
  ], answer: 'a', explanation: 'C++ uses type then name: int x;' },
  { id: 'q4', question: 'Single-line comment symbol', options: [
    { key: 'a', text: '/* */' }, { key: 'b', text: '#' }, { key: 'c', text: '//' }, { key: 'd', text: '@@' }
  ], answer: 'c', explanation: '// introduces a single-line comment.' },
  { id: 'q5', question: 'Not a loop in C++', options: [
    { key: 'a', text: 'for' }, { key: 'b', text: 'while' }, { key: 'c', text: 'do-while' }, { key: 'd', text: 'repeat-until' }
  ], answer: 'd', explanation: 'repeat-until is not standard C++.' },
  { id: 'q6', question: 'Output of cout << 5 + 3;', options: [
    { key: 'a', text: '53' }, { key: 'b', text: '8' }, { key: 'c', text: '5+3' }, { key: 'd', text: 'Error' }
  ], answer: 'b', explanation: '5 + 3 = 8.' },
  { id: 'q7', question: 'Equality operator is', options: [
    { key: 'a', text: '=' }, { key: 'b', text: '==' }, { key: 'c', text: '===' }, { key: 'd', text: '!=' }
  ], answer: 'b', explanation: '== compares equality; = assigns.' },
  { id: 'q8', question: 'Starting point of a C++ program', options: [
    { key: 'a', text: 'start()' }, { key: 'b', text: 'main()' }, { key: 'c', text: 'begin()' }, { key: 'd', text: 'init()' }
  ], answer: 'b', explanation: 'Execution begins at main().' },
  { id: 'q9', question: 'Floating-point type', options: [
    { key: 'a', text: 'int' }, { key: 'b', text: 'char' }, { key: 'c', text: 'float' }, { key: 'd', text: 'bool' }
  ], answer: 'c', explanation: 'float stores fractional values; double also does.' },
  { id: 'q10', question: 'Purpose of return 0; in main()', options: [
    { key: 'a', text: 'Exit the program successfully' }, { key: 'b', text: 'Print 0' }, { key: 'c', text: 'Start the program' }, { key: 'd', text: 'None' }
  ], answer: 'a', explanation: 'Conventionally indicates successful termination.' },
]

export default function CSG11IntroCPP() {
  return (
    <LessonModuleTemplate
      title="Introduction to C++"
      subject="Computer Science"
      grade={11}
      backLink="/lessons/ComputerScience/11"
      lessonId="cs-g11-intro-cpp"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
