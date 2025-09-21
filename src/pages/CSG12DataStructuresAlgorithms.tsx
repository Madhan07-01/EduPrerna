import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Data Structures and Algorithms (DSA) provide the foundation for efficient problem solving. Data structures organize data; algorithms process it. Mastery enables fast, scalable programs.' },
  { title: '1. Data Structures', content: 'Linear: Arrays (O(1) access), Linked Lists, Stacks (LIFO), Queues (FIFO).\nNon-linear: Trees (Binary Tree, BST, AVL), Graphs (directed, undirected, weighted).' },
  { title: '2. Algorithms', content: 'Searching: Linear (O(n)), Binary (O(log n)) on sorted arrays.\nSorting: Bubble/Selection/Insertion (O(n^2)), Merge/Quick (≈ O(n log n)).\nRecursion: Define base case; solve subproblems.' },
  { title: '3. Complexity', content: 'Time complexity: asymptotic runtime in Big-O. Space complexity: additional memory used. Optimize both where possible.' },
  { title: '4. Basic Operations Table (Typical)', content: 'Array: Insert/Delete O(n), Access O(1). Stack: Push/Pop O(1). Queue: Enqueue/Dequeue O(1). Linked List: Insert/Delete O(1) at head, Search O(n). BST avg: Insert/Delete/Search O(log n).' },
  { title: '5. Implementations', content: 'Binary search iterative; stack via arrays/lists; linked list node pointer references; DFS/BFS for graphs.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Which uses LIFO?', options: [
    { key: 'a', text: 'Queue' }, { key: 'b', text: 'Stack' }, { key: 'c', text: 'Array' }, { key: 'd', text: 'Graph' }
  ], answer: 'b', explanation: 'Stacks are Last-In-First-Out.' },
  { id: 'q2', question: 'Binary search requires:', options: [
    { key: 'a', text: 'Unsorted array' }, { key: 'b', text: 'Sorted array' }, { key: 'c', text: 'Linked list' }, { key: 'd', text: 'Stack' }
  ], answer: 'b', explanation: 'Binary search needs sorted order.' },
  { id: 'q3', question: 'Time complexity of Merge Sort:', options: [
    { key: 'a', text: 'O(n)' }, { key: 'b', text: 'O(n^2)' }, { key: 'c', text: 'O(n log n)' }, { key: 'd', text: 'O(log n)' }
  ], answer: 'c', explanation: 'Divide-and-conquer yields O(n log n).' },
  { id: 'q4', question: 'Which is hierarchical?', options: [
    { key: 'a', text: 'Array' }, { key: 'b', text: 'Tree' }, { key: 'c', text: 'Stack' }, { key: 'd', text: 'Queue' }
  ], answer: 'b', explanation: 'Trees represent hierarchies.' },
  { id: 'q5', question: 'In recursion, base case is:', options: [
    { key: 'a', text: 'Optional' }, { key: 'b', text: 'Mandatory' }, { key: 'c', text: 'Only for math' }, { key: 'd', text: 'Only for sorting' }
  ], answer: 'b', explanation: 'Ensures termination.' },
  { id: 'q6', question: 'Priority Queue principle:', options: [
    { key: 'a', text: 'FIFO' }, { key: 'b', text: 'LIFO' }, { key: 'c', text: 'Highest priority first' }, { key: 'd', text: 'Random access' }
  ], answer: 'c', explanation: 'Processes by priority.' },
  { id: 'q7', question: 'Non-linear structure among the following:', options: [
    { key: 'a', text: 'Queue' }, { key: 'b', text: 'Stack' }, { key: 'c', text: 'Graph' }, { key: 'd', text: 'Array' }
  ], answer: 'c', explanation: 'Graphs (and trees) are non-linear.' },
  { id: 'q8', question: 'Space complexity of iterative binary search:', options: [
    { key: 'a', text: 'O(1)' }, { key: 'b', text: 'O(n)' }, { key: 'c', text: 'O(log n)' }, { key: 'd', text: 'O(n log n)' }
  ], answer: 'a', explanation: 'Constant extra space.' },
  { id: 'q9', question: 'Stable, in-place sort:', options: [
    { key: 'a', text: 'Merge sort' }, { key: 'b', text: 'Quick sort' }, { key: 'c', text: 'Bubble sort' }, { key: 'd', text: 'Heap sort' }
  ], answer: 'c', explanation: 'Bubble sort is stable and in-place (though O(n^2)).' },
  { id: 'q10', question: 'Not a linear data structure:', options: [
    { key: 'a', text: 'Array' }, { key: 'b', text: 'Stack' }, { key: 'c', text: 'Graph' }, { key: 'd', text: 'Queue' }
  ], answer: 'c', explanation: 'Graph is non-linear.' },
]

export default function CSG12DataStructuresAlgorithms() {
  return (
    <LessonModuleTemplate
      title="Data Structures and Algorithms"
      subject="Computer Science"
      grade={12}
      backLink="/lessons/ComputerScience/12"
      lessonId="cs-g12-data-structures-algorithms"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
