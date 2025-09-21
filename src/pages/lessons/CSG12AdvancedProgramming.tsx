import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Advanced programming concepts go beyond basic syntax to cover OOP, recursion, modular design, file and exception handling, and algorithmic thinking for writing efficient, maintainable software.' },
  { title: '1. Object-Oriented Programming (OOP)', content: 'Classes/Objects encapsulate data and behavior.\n• Encapsulation: bundle state + methods\n• Inheritance: derive new types\n• Polymorphism: same interface, different behaviors\n• Abstraction: hide implementation, expose interface' },
  { title: '2. Recursion', content: 'Functions calling themselves with a base case. Used in divide & conquer, trees, backtracking (factorial, Fibonacci, traversals). Ensure termination and manageable space complexity.' },
  { title: '3. Data Structures (Overview)', content: 'Linear: arrays/lists, stacks (LIFO), queues (FIFO).\nNon-linear: trees, graphs. Choice affects algorithm complexity.' },
  { title: '4. File Handling', content: 'Persist and retrieve program data. Patterns: open–use–close. Modes: read, write, append. Ensure error handling and resource cleanup.' },
  { title: '5. Exception Handling', content: 'Handle runtime errors gracefully (try/catch or try/except). Create robust flows; avoid crashes; log diagnostics.' },
  { title: '6. Modular Programming', content: 'Decompose code into modules/functions. Benefits: reusability, testability, readability, collaboration.' },
  { title: '7. Algorithms', content: 'Search (linear, binary), sort (bubble, selection, insertion, merge, quick), complexity analysis (time/space).' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Which is NOT an OOP feature?', options: [
    { key: 'a', text: 'Encapsulation' }, { key: 'b', text: 'Inheritance' }, { key: 'c', text: 'Recursion' }, { key: 'd', text: 'Polymorphism' }
  ], answer: 'c', explanation: 'Recursion is a programming technique, not a core OOP pillar.' },
  { id: 'q2', question: 'In recursion, the base case is:', options: [
    { key: 'a', text: 'Optional' }, { key: 'b', text: 'Mandatory' }, { key: 'c', text: 'Replaced by loops' }, { key: 'd', text: 'Only for math problems' }
  ], answer: 'b', explanation: 'Base case ensures termination.' },
  { id: 'q3', question: 'Which follows LIFO?', options: [
    { key: 'a', text: 'Queue' }, { key: 'b', text: 'Stack' }, { key: 'c', text: 'Array' }, { key: 'd', text: 'Graph' }
  ], answer: 'b', explanation: 'Stacks are Last-In-First-Out.' },
  { id: 'q4', question: 'What does try/except (or try/catch) do?', options: [
    { key: 'a', text: 'Speeds up the code' }, { key: 'b', text: 'Handles runtime errors gracefully' }, { key: 'c', text: 'Optimizes memory' }, { key: 'd', text: 'Encrypts files' }
  ], answer: 'b', explanation: 'Exceptions are caught and handled to keep programs robust.' },
  { id: 'q5', question: 'Divide-and-conquer is used in:', options: [
    { key: 'a', text: 'Bubble sort' }, { key: 'b', text: 'Merge sort' }, { key: 'c', text: 'Selection sort' }, { key: 'd', text: 'Insertion sort' }
  ], answer: 'b', explanation: 'Merge sort divides, conquers, and merges.' },
  { id: 'q6', question: 'Which is a non-linear structure?', options: [
    { key: 'a', text: 'Array' }, { key: 'b', text: 'Stack' }, { key: 'c', text: 'Graph' }, { key: 'd', text: 'Queue' }
  ], answer: 'c', explanation: 'Graphs and trees are non-linear.' },
  { id: 'q7', question: 'File mode "r" stands for:', options: [
    { key: 'a', text: 'Reading' }, { key: 'b', text: 'Writing' }, { key: 'c', text: 'Appending' }, { key: 'd', text: 'Random' }
  ], answer: 'a', explanation: 'Open file for reading only.' },
  { id: 'q8', question: 'Which keyword imports modules (Python)?', options: [
    { key: 'a', text: 'include' }, { key: 'b', text: 'import' }, { key: 'c', text: 'require' }, { key: 'd', text: 'module' }
  ], answer: 'b', explanation: 'Python uses the import keyword.' },
  { id: 'q9', question: 'Modular programming yields code that is:', options: [
    { key: 'a', text: 'Longer and harder to test' }, { key: 'b', text: 'Reusable and easier to test' }, { key: 'c', text: 'Obfuscated' }, { key: 'd', text: 'Slower' }
  ], answer: 'b', explanation: 'Modularity improves reuse and testing.' },
  { id: 'q10', question: 'Polymorphism includes:', options: [
    { key: 'a', text: 'Function overloading/overriding' }, { key: 'b', text: 'Only inheritance' }, { key: 'c', text: 'Only recursion' }, { key: 'd', text: 'Only file handling' }
  ], answer: 'a', explanation: 'Polymorphism allows same interface with different implementations.' },
]

export default function CSG12AdvancedProgramming() {
  return (
    <LessonModuleTemplate
      title="Advanced Programming Concepts"
      subject="Computer Science"
      grade={12}
      backLink="/lessons/ComputerScience/12"
      lessonId="cs-g12-advanced-programming"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
