import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const introProgrammingModule: LearningModule = {
  title: 'Introduction to Programming',
  introduction: 'Welcome to the fascinating world of programming! Have you ever wondered how your favorite apps work, how video games respond to your commands, or how websites display exactly what you\'re looking for? The answer lies in programming - the process of creating instructions that tell computers exactly what to do. Programming is like teaching a very smart but literal-minded robot to solve problems. In this module, you\'ll discover the fundamental concepts that power all software, from the calculator on your phone to the navigation system in a car. Get ready to unlock the power of computational thinking and learn how to make computers work for you!',
  concepts: [
    {
      title: 'What is a Program and Why Do We Need It?',
      content: 'A program is a set of step-by-step instructions that a computer follows to perform a specific task. Just as a recipe tells you how to bake a cake, a program tells a computer how to solve a problem or complete a task.',
      examples: [
        'Calculator app: A program that performs mathematical calculations',
        'Video game: A program that responds to player inputs and displays graphics',
        'Web browser: A program that retrieves and displays web pages',
        'Music player: A program that plays audio files and manages playlists',
        'GPS navigation: A program that calculates routes and provides directions',
        'Programs make computers useful by enabling them to perform specific functions'
      ]
    },
    {
      title: 'Low-Level Programming Languages',
      content: 'Low-level languages are closer to the computer\'s native language and provide detailed control over hardware. They are more difficult for humans to read but offer precise control and efficiency.',
      examples: [
        'Machine language: Consists of binary code (0s and 1s) that computers understand directly',
        'Example: 10110000 01100001 (represents specific computer instructions)',
        'Assembly language: Uses short words (mnemonics) instead of binary numbers',
        'Example: MOV AX, 5 (move the number 5 into register AX)',
        'Pros: Fast execution, direct hardware control, memory efficient',
        'Cons: Difficult to learn, time-consuming to write, error-prone, not portable'
      ]
    },
    {
      title: 'High-Level Programming Languages',
      content: 'High-level languages are designed to be closer to human language and mathematical notation. They hide complex hardware details and make programming more accessible to humans.',
      examples: [
        'Use English-like syntax: print("Hello World"), if (age > 18), for (i = 0; i < 10; i++)',
        'Examples: Python, Java, C++, JavaScript, Ruby, Swift',
        'Pros: Easy to learn and write, portable across different computers, faster development',
        'Cons: Slower execution than low-level languages, requires translation to machine code',
        'Most modern software applications are written in high-level languages',
        'Great for beginners and rapid application development'
      ]
    },
    {
      title: 'Features of a Good Programming Language',
      content: 'A good programming language should balance ease of use with functionality. The best languages make it easy to write correct programs while providing the power needed for complex applications.',
      examples: [
        'Simplicity: Easy to learn and use, with clear syntax',
        'Readability: Code that is easy to read and understand by other programmers',
        'Portability: Programs that can run on different types of computers',
        'Efficiency: Programs that execute quickly and use minimal resources',
        'Reliability: Language features that help prevent errors and bugs',
        'Extensibility: Ability to add new features and libraries',
        'Good error handling and debugging support'
      ]
    },
    {
      title: 'Variables - Storing Information in Programs',
      content: 'Variables are named storage locations that hold data which can change during program execution. Think of them as labeled boxes where you can store information and retrieve it later.',
      examples: [
        'Declaration: age = 15 (stores the number 15 in a variable named "age")',
        'Assignment: name = "Alex" (stores the text "Alex" in a variable named "name")',
        'Updating: age = age + 1 (increases the value in age by 1)',
        'Different types: number (15), text ("Hello"), boolean (true/false)',
        'Scope: Where in the program the variable can be accessed',
        'Variables make programs flexible and able to work with different data'
      ]
    },
    {
      title: 'Data Types - Classifying Information',
      content: 'Data types define what kind of value a variable can hold and what operations can be performed on it. Different types of data require different amounts of memory and support different operations.',
      examples: [
        'Integer: Whole numbers like 5, -3, 100 (supports +, -, *, / operations)',
        'Float/Double: Decimal numbers like 3.14, -2.5, 0.001',
        'String: Text like "Hello World", "Programming is fun!"',
        'Boolean: True or False values (used in logical operations)',
        'Array/List: Collections of multiple values like [1, 2, 3, 4]',
        'Choosing the right data type helps programs run efficiently and correctly'
      ]
    },
    {
      title: 'Operators - Performing Operations',
      content: 'Operators are symbols that perform operations on variables and values. They are the action words of programming, telling the computer what to do with the data.',
      examples: [
        'Arithmetic operators: + (addition), - (subtraction), * (multiplication), / (division)',
        'Example: total = price + tax (adds price and tax, stores result in total)',
        'Comparison operators: == (equal), != (not equal), > (greater), < (less)',
        'Example: if (age >= 18) (checks if age is 18 or greater)',
        'Logical operators: && (and), || (or), ! (not)',
        'Example: if (age >= 13 && age <= 19) (checks if age is between 13 and 19)'
      ]
    },
    {
      title: 'Input and Output - Communicating with Users',
      content: 'Input and output (I/O) allow programs to interact with users and the outside world. Input gets data from users, while output displays results or information.',
      examples: [
        'Input: Getting user information like name, age, or answers to questions',
        'Example: name = input("What is your name? ")',
        'Output: Displaying results, messages, or information to users',
        'Example: print("Hello, " + name + "! Welcome to programming!")',
        'File I/O: Reading from and writing to files on the computer',
        'Network I/O: Sending and receiving data over the internet',
        'I/O makes programs interactive and useful for real-world applications'
      ]
    },
    {
      title: 'Control Structures - Directing Program Flow',
      content: 'Control structures determine the order in which statements are executed in a program. They allow programs to make decisions and repeat actions based on conditions.',
      examples: [
        'Conditional statements (if/else): Execute different code based on conditions',
        'Example: if (temperature > 30) print("It\'s hot!") else print("It\'s comfortable")',
        'Loops (for/while): Repeat actions multiple times',
        'Example: for (i = 1; i <= 10; i++) print(i) (prints numbers 1 to 10)',
        'Switch/case: Choose between multiple options based on a value',
        'Control structures make programs smart and able to respond to different situations'
      ]
    },
    {
      title: 'Problem-Solving Steps in Programming',
      content: 'Programming is fundamentally about solving problems. Following a systematic approach helps break down complex problems into manageable steps that can be translated into code.',
      examples: [
        'Step 1: Understand the problem - What needs to be accomplished?',
        'Step 2: Plan the solution - Break the problem into smaller steps',
        'Step 3: Design the algorithm - Create a step-by-step procedure',
        'Step 4: Write the code - Translate the algorithm into a programming language',
        'Step 5: Test and debug - Run the program and fix any errors',
        'Step 6: Improve and optimize - Make the program better and more efficient',
        'This systematic approach works for any programming problem, big or small'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is a program in computer science?',
      options: ['A list of computer hardware components', 'A set of step-by-step instructions that a computer follows to perform a task', 'A type of computer virus', 'A programming language'],
      correct: 1,
      explanation: 'A program is a set of step-by-step instructions that a computer follows to perform a specific task, just like a recipe tells you how to bake a cake.'
    },
    {
      question: 'Which of the following is a characteristic of low-level programming languages?',
      options: ['Easy to learn and write', 'Close to human language', 'Provides detailed control over hardware', 'Portable across different computers'],
      correct: 2,
      explanation: 'Low-level languages are closer to the computer\'s native language and provide detailed control over hardware, but they are more difficult for humans to read and write.'
    },
    {
      question: 'What is an advantage of high-level programming languages?',
      options: ['They execute faster than low-level languages', 'They provide direct hardware control', 'They are easier for humans to read and write', 'They don\'t require translation'],
      correct: 2,
      explanation: 'High-level languages are designed to be closer to human language and mathematical notation, making them much easier for people to read, write, and understand.'
    },
    {
      question: 'Which feature is important for a good programming language?',
      options: ['Complexity for security', 'Readability for other programmers', 'Limited portability', 'Slow execution speed'],
      correct: 1,
      explanation: 'Readability is crucial for a good programming language because it allows other programmers to understand and maintain the code, making collaboration easier.'
    },
    {
      question: 'What is the primary purpose of a variable in programming?',
      options: ['To make the program run faster', 'To store data that can change during program execution', 'To create visual graphics', 'To connect to the internet'],
      correct: 1,
      explanation: 'Variables are named storage locations that hold data which can change during program execution, like labeled boxes where you can store and retrieve information.'
    },
    {
      question: 'Which data type would you use to store a person\'s name?',
      options: ['Integer', 'Boolean', 'String', 'Float'],
      correct: 2,
      explanation: 'Strings are used to store text data like names, sentences, or any sequence of characters. Integer stores whole numbers, Float stores decimal numbers, and Boolean stores true/false values.'
    },
    {
      question: 'What do comparison operators like > and < do in programming?',
      options: ['Perform mathematical calculations', 'Compare values to make decisions', 'Store data in variables', 'Display output to users'],
      correct: 1,
      explanation: 'Comparison operators like > (greater than), < (less than), == (equal to) are used to compare values and make decisions in programs, typically in conditional statements.'
    },
    {
      question: 'What is the main purpose of input/output (I/O) in programming?',
      options: ['To make programs execute faster', 'To allow programs to interact with users and the outside world', 'To store data permanently', 'To create loops in programs'],
      correct: 1,
      explanation: 'Input/output (I/O) allows programs to interact with users and the outside world - input gets data from users, while output displays results or information.'
    },
    {
      question: 'What do control structures like if/else statements allow programs to do?',
      options: ['Store more data', 'Execute different code based on conditions', 'Run faster', 'Use less memory'],
      correct: 1,
      explanation: 'Control structures like if/else statements allow programs to make decisions and execute different code based on specific conditions, making programs smart and responsive.'
    },
    {
      question: 'Which step in problem-solving should you do first when creating a program?',
      options: ['Write the code immediately', 'Test and debug the program', 'Understand the problem completely', 'Optimize for efficiency'],
      correct: 2,
      explanation: 'The first step in problem-solving is to understand the problem completely - what needs to be accomplished - before planning, designing, and writing any code.'
    }
  ]
}

export default function IntroProgrammingModule() {
  return (
    <ModuleLayout 
      module={introProgrammingModule} 
      grade={10} 
      subject="Computer Science" 
    />
  )
}