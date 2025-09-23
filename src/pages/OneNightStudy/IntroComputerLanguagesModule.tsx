import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const introComputerLanguagesModule: LearningModule = {
  title: 'Introduction to Computer Languages',
  introduction: 'Welcome to the exciting world of computer languages! Just like humans use different languages to communicate with each other, computers need special languages to understand what we want them to do. From the apps on your phone to the games you play, everything is created using computer languages. Get ready to discover how programmers "talk" to computers and create amazing digital experiences!',
  concepts: [
    {
      title: 'Fundamental Definition of a Computer Language',
      content: 'A computer language is a set of rules, symbols, and commands that humans use to communicate instructions to a computer. Think of it as a special vocabulary and grammar that helps us tell computers exactly what we want them to do.',
      examples: [
        'Like human languages (English, Spanish, French), computer languages have their own vocabulary and rules',
        'Commands like "print", "if", "while" tell the computer to perform specific actions',
        'Symbols like +, -, =, {} have special meanings in computer languages',
        'Just as you follow grammar rules in English, computer languages have syntax rules',
        'Examples of popular computer languages: Python, Java, JavaScript, C++, Scratch'
      ]
    },
    {
      title: 'Machine Language - The Computer\'s Native Language',
      content: 'Machine language is the most basic language that computers understand directly. It consists only of 0s and 1s (binary code) and is the only language the computer\'s processor can execute without translation.',
      examples: [
        'Written entirely in binary: 01001000 01100101 01101100 01101100 01101111',
        'Pros: Fastest execution, no translation needed, direct hardware control',
        'Cons: Extremely difficult for humans to read and write, time-consuming, error-prone',
        'Each type of processor has its own machine language',
        'Modern programmers rarely write in machine language directly'
      ]
    },
    {
      title: 'Assembly Language - A Step Up from Machine Code',
      content: 'Assembly language uses short words (mnemonics) instead of binary numbers to represent machine instructions. It\'s still very close to machine language but slightly more human-readable.',
      examples: [
        'Uses mnemonics like MOV (move), ADD (add), JMP (jump) instead of binary',
        'Example: MOV AX, 5 (move the number 5 into register AX)',
        'Pros: More readable than machine language, precise control over hardware',
        'Cons: Still very difficult, specific to each processor type, time-consuming',
        'Used mainly for system programming and embedded devices'
      ]
    },
    {
      title: 'High-Level Languages - Programming Made Easier',
      content: 'High-level languages are designed to be much closer to human language and mathematical notation. They hide the complex details of the computer hardware and make programming more accessible.',
      examples: [
        'Use English-like words: print("Hello World"), if (age > 18), while (true)',
        'Examples: Python, Java, C++, JavaScript, Swift, Scratch',
        'Pros: Easy to learn and write, portable across different computers, faster development',
        'Cons: Slower execution than machine/assembly, requires translation to machine code',
        'Most modern software is written in high-level languages'
      ]
    },
    {
      title: 'Programming Languages - Building Complete Applications',
      content: 'Programming languages are designed to create complete, standalone applications and software systems. They provide comprehensive tools for building complex programs from scratch.',
      examples: [
        'Used to build: Desktop applications, mobile apps, operating systems, games',
        'Examples: Java (Android apps), Swift (iOS apps), C++ (games), Python (web applications)',
        'Features: Strong structure, extensive libraries, complex data handling',
        'Require compilation or interpretation to run',
        'Can handle large, complex projects with thousands of lines of code'
      ]
    },
    {
      title: 'Scripting Languages - Automating Tasks and Quick Solutions',
      content: 'Scripting languages are designed to automate tasks and create quick solutions. They\'re often used to control other programs or perform specific tasks within larger systems.',
      examples: [
        'Used for: Automating repetitive tasks, web development, data processing, system administration',
        'Examples: JavaScript (web pages), Python (automation), PowerShell (Windows tasks)',
        'Features: Quick to write, interpreted rather than compiled, great for prototyping',
        'Often embedded within other applications (like JavaScript in web browsers)',
        'Excel macros and Google Apps Script are forms of scripting'
      ]
    },
    {
      title: 'Compilers - Translating Code Before Running',
      content: 'A compiler is a special program that translates your entire program from a high-level language into machine language before the program runs. It\'s like having a translator convert a whole book before you read it.',
      examples: [
        'Process: Write code → Compile → Create executable file → Run program',
        'Languages that use compilers: C++, Java, Swift, Go',
        'Advantages: Fast execution, optimized code, catches errors before running',
        'Disadvantages: Extra step needed, separate compilation for different computers',
        'The compiled program can run without the original source code'
      ]
    },
    {
      title: 'Interpreters - Translating Code While Running',
      content: 'An interpreter translates and executes your program line by line as it runs. It\'s like having a live translator who translates sentences as you speak them.',
      examples: [
        'Process: Write code → Run directly (interpreter translates on-the-fly)',
        'Languages that use interpreters: Python, JavaScript, Ruby, BASIC',
        'Advantages: No compilation step, interactive development, easier debugging',
        'Disadvantages: Slower execution, needs interpreter installed to run',
        'Great for learning and experimentation'
      ]
    },
    {
      title: 'Choosing the Right Language for the Job',
      content: 'Different computer languages are better suited for different types of projects. Understanding when to use each type helps programmers choose the most effective tool for their goals.',
      examples: [
        'Web development: JavaScript, HTML, CSS, PHP, Python',
        'Mobile apps: Swift (iOS), Java/Kotlin (Android), React Native',
        'Games: C++, C#, Unity (game engine), Unreal Engine',
        'Data science: Python, R, SQL, MATLAB',
        'Beginner-friendly: Scratch, Python, Alice, App Inventor'
      ]
    },
    {
      title: 'The Importance of Computer Languages in Our Digital World',
      content: 'Computer languages are the foundation of our digital world. They enable us to create all the technology we use daily and will continue to shape our future as technology advances.',
      examples: [
        'Enable creation of: Social media apps, video games, online shopping, educational tools',
        'Career opportunities: Software developer, web designer, data scientist, game developer',
        'Problem-solving skills: Logical thinking, breaking down complex problems, creativity',
        'Digital literacy: Understanding how technology works in our connected world',
        'Future innovation: AI, robotics, virtual reality, and technologies not yet invented'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is a computer language?',
      options: ['A way for computers to talk to each other', 'A set of rules and commands to communicate instructions to a computer', 'The physical wires inside a computer', 'A type of computer hardware'],
      correct: 1,
      explanation: 'A computer language is a set of rules, symbols, and commands that humans use to communicate instructions to a computer, similar to how we use human languages to communicate with each other.'
    },
    {
      question: 'Which language does the computer understand directly?',
      options: ['Python', 'Assembly language', 'Machine language', 'JavaScript'],
      correct: 2,
      explanation: 'Machine language, written in binary (0s and 1s), is the only language that computers can understand and execute directly without any translation.'
    },
    {
      question: 'What is the main advantage of high-level languages over machine language?',
      options: ['They run faster', 'They use less memory', 'They are easier for humans to read and write', 'They work only on specific computers'],
      correct: 2,
      explanation: 'High-level languages are designed to be closer to human language and mathematical notation, making them much easier for people to read, write, and understand compared to machine language.'
    },
    {
      question: 'Which of the following is an example of assembly language?',
      options: ['01001000 01100101', 'print("Hello World")', 'MOV AX, 5', 'if (age > 18)'],
      correct: 2,
      explanation: 'MOV AX, 5 is an assembly language instruction that uses mnemonics (short words) instead of binary numbers, making it more readable than machine language but still very close to hardware.'
    },
    {
      question: 'What is the main difference between programming and scripting languages?',
      options: ['Programming languages are newer', 'Scripting languages are only for websites', 'Programming languages build complete applications, scripting languages automate tasks', 'There is no difference'],
      correct: 2,
      explanation: 'Programming languages are designed to build complete, standalone applications, while scripting languages are typically used to automate tasks and create quick solutions within existing systems.'
    },
    {
      question: 'What does a compiler do?',
      options: ['Runs programs line by line', 'Translates entire program to machine language before running', 'Fixes errors in code automatically', 'Connects to the internet'],
      correct: 1,
      explanation: 'A compiler translates your entire program from a high-level language into machine language before the program runs, creating an executable file that can run independently.'
    },
    {
      question: 'What is an advantage of using an interpreter?',
      options: ['Programs run faster', 'No extra installation needed', 'Interactive development and easier debugging', 'Creates smaller file sizes'],
      correct: 2,
      explanation: 'Interpreters allow for interactive development and easier debugging because they translate and execute code line by line, making it easier to test and modify code quickly.'
    },
    {
      question: 'Which language would be best for a beginner to start learning programming?',
      options: ['Machine language', 'Assembly language', 'Python or Scratch', 'Binary code'],
      correct: 2,
      explanation: 'Python and Scratch are designed to be beginner-friendly with simple syntax and interactive features that make learning programming concepts easier for new students.'
    },
    {
      question: 'What type of projects would typically use JavaScript?',
      options: ['Operating systems', 'Web development', 'Assembly line robots', 'Machine language translation'],
      correct: 1,
      explanation: 'JavaScript is primarily used for web development to create interactive websites and web applications, making web pages dynamic and responsive to user actions.'
    },
    {
      question: 'Why are computer languages important in our digital world?',
      options: ['They make computers faster', 'They are only used by big companies', 'They enable creation of all digital technology we use', 'They replace human languages'],
      correct: 2,
      explanation: 'Computer languages are the foundation of our digital world, enabling the creation of all the technology we use daily - from mobile apps and games to social media and educational tools.'
    }
  ]
}

export default function IntroComputerLanguagesModule() {
  return (
    <ModuleLayout 
      module={introComputerLanguagesModule} 
      grade={8} 
      subject="Computer Science" 
    />
  )
}