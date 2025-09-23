import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const computerFundamentalsModule: LearningModule = {
  title: 'Computer Fundamentals',
  introduction: 'Welcome to the fascinating world of Computer Fundamentals! In today\'s digital age, understanding how computers work is as essential as knowing how to read and write. Every device you use - from smartphones to laptops to gaming consoles - operates on the same fundamental principles. In this module, we\'ll explore the building blocks of computer systems, understand how hardware and software work together, and learn about the amazing capabilities and limitations of these incredible machines. By the end of this module, you\'ll have a solid foundation for understanding all the technology around you and be better prepared for advanced computer science topics. Get ready to discover what makes computers tick!',
  concepts: [
    {
      title: 'Key Components of a Computer System - Hardware and Software',
      content: 'A computer system consists of two main components: hardware (the physical parts) and software (the instructions that tell the hardware what to do). Think of hardware as your body and software as your brain - both are essential for the system to function properly.',
      examples: [
        'Hardware: Physical components like keyboard, monitor, processor, memory chips',
        'Software: Programs and applications like Microsoft Word, Google Chrome, games',
        'Hardware without software is like a body without a brain - it can\'t do anything useful',
        'Software without hardware is like a brain without a body - it has nowhere to run',
        'Example: When you type on a keyboard (hardware), a word processor (software) processes the input and displays it on your screen (hardware)',
        'Both components must work together for a computer system to be functional'
      ]
    },
    {
      title: 'Types of Hardware - Input Devices',
      content: 'Input devices allow users to enter data and commands into a computer system. These devices convert physical actions (typing, clicking, speaking) into digital signals that the computer can understand.',
      examples: [
        'Keyboard: Enters text, numbers, and commands using keys',
        'Mouse: Controls cursor movement and clicks on graphical interfaces',
        'Microphone: Converts sound into digital audio input',
        'Scanner: Converts physical documents and images into digital format',
        'Touchscreen: Allows direct interaction by touching the display surface',
        'Webcam: Captures video input for communication and recording'
      ]
    },
    {
      title: 'Types of Hardware - Output Devices',
      content: 'Output devices present processed information from the computer to the user. They convert digital data into forms that humans can understand, such as text, images, sounds, or physical movements.',
      examples: [
        'Monitor/Display: Shows visual output like text, images, and videos',
        'Printer: Produces physical copies of digital documents',
        'Speakers: Convert digital audio signals into sound we can hear',
        'Headphones: Provide private audio output directly to ears',
        'Projector: Displays computer output on large screens for presentations',
        'Actuators: Create physical movement (used in robotics and 3D printers)'
      ]
    },
    {
      title: 'Types of Hardware - Storage Devices',
      content: 'Storage devices save data and programs for long-term use. Unlike memory (RAM), storage devices retain information even when the computer is turned off, making them essential for preserving work and system files.',
      examples: [
        'Hard Disk Drive (HDD): Traditional storage with large capacity but slower access',
        'Solid State Drive (SSD): Faster storage using flash memory with no moving parts',
        'USB Flash Drive: Portable storage for transferring files between computers',
        'Optical Discs: CDs, DVDs, and Blu-ray discs for media and software distribution',
        'Cloud Storage: Remote servers accessed via internet for backup and sharing',
        'Memory Cards: Small storage devices used in cameras, phones, and other devices'
      ]
    },
    {
      title: 'Types of Hardware - Processing Units',
      content: 'Processing units are the "brains" of the computer that execute instructions and perform calculations. The Central Processing Unit (CPU) is the primary processor, while specialized processors handle specific tasks.',
      examples: [
        'Central Processing Unit (CPU): Executes program instructions and performs calculations',
        'Graphics Processing Unit (GPU): Handles complex visual calculations for gaming and design',
        'Memory (RAM): Temporary storage for data and programs currently in use',
        'Motherboard: Connects all components and allows them to communicate',
        'Cache Memory: Ultra-fast temporary storage built into the processor',
        'Arithmetic Logic Unit (ALU): Performs mathematical and logical operations'
      ]
    },
    {
      title: 'Types of Hardware - Communication Devices',
      content: 'Communication devices enable computers to connect with other computers and devices, forming networks that allow sharing of data and resources across local and global distances.',
      examples: [
        'Network Interface Card (NIC): Connects computers to local networks via Ethernet cables',
        'Wireless Adapter: Enables Wi-Fi connections without physical cables',
        'Modem: Converts digital signals to analog for telephone line transmission',
        'Router: Directs data traffic between different networks',
        'Bluetooth Adapter: Enables short-range wireless connections to peripherals',
        'Network Switch: Connects multiple devices within a local network'
      ]
    },
    {
      title: 'Types of Software - System Software',
      content: 'System software manages and operates computer hardware and provides a platform for running application software. These programs run in the background to ensure the computer functions properly.',
      examples: [
        'Operating System (OS): Manages hardware resources and provides user interface (Windows, macOS, Linux)',
        'Device Drivers: Enable communication between OS and hardware components',
        'Firmware: Low-level software embedded in hardware devices',
        'Utilities: Tools for system maintenance like disk cleanup, antivirus software',
        'BIOS/UEFI: Initializes hardware during boot process',
        'System Monitoring Tools: Track performance and resource usage'
      ]
    },
    {
      title: 'Types of Software - Application Software',
      content: 'Application software performs specific tasks for users, from productivity tools to entertainment. These programs are what most people think of when they hear "software" and are designed to help users accomplish goals.',
      examples: [
        'Word Processors: Create and edit text documents (Microsoft Word, Google Docs)',
        'Web Browsers: Access and view websites (Chrome, Firefox, Safari)',
        'Media Players: Play audio and video files (VLC, iTunes, Windows Media Player)',
        'Games: Entertainment software with interactive elements',
        'Graphics Software: Create and edit images (Photoshop, GIMP)',
        'Communication Apps: Enable messaging and video calls (WhatsApp, Zoom, Skype)'
      ]
    },
    {
      title: 'Types of Software - Programming Software',
      content: 'Programming software provides tools for developers to create, debug, and maintain other software. These tools translate human-readable code into machine-executable instructions.',
      examples: [
        'Text Editors: Write and edit code (Visual Studio Code, Sublime Text)',
        'Integrated Development Environments (IDEs): Complete development platforms (Eclipse, Xcode)',
        'Compilers: Translate high-level programming languages to machine code',
        'Debuggers: Help find and fix errors in programs',
        'Version Control Systems: Track changes to code over time (Git)',
        'Interpreters: Execute code line-by-line without compilation'
      ]
    },
    {
      title: 'Basic Computer Operations - Input, Processing, Storage, Output, Control',
      content: 'All computer operations follow a fundamental cycle: Input (receiving data), Processing (manipulating data), Storage (saving data), Output (presenting results), and Control (managing the entire process). This cycle is the foundation of how computers work.',
      examples: [
        'Input: Typing a document in Microsoft Word using a keyboard',
        'Processing: CPU calculating font formatting and spell-checking as you type',
        'Storage: Automatically saving your document to hard drive',
        'Output: Displaying formatted text on your monitor screen',
        'Control: Operating system managing multiple programs and hardware resources',
        'Example cycle: Pressing "A" key → Keyboard sends signal → CPU processes key press → Character stored in RAM → Letter "A" displayed on screen'
      ]
    },
    {
      title: 'Characteristics of Computers',
      content: 'Computers have specific characteristics that make them powerful tools for processing information. Understanding these characteristics helps explain both the capabilities and limitations of computer systems.',
      examples: [
        'Speed: Computers can perform millions of operations per second',
        'Accuracy: Computers perform calculations with perfect precision (assuming correct input)',
        'Diligence: Computers never get tired or make mistakes due to fatigue',
        'Versatility: Same hardware can run countless different software applications',
        'Reliability: Consistent performance with proper maintenance',
        'Limitations: Cannot think creatively, make value judgments, or learn from experience like humans'
      ]
    },
    {
      title: 'Memory Hierarchy',
      content: 'The memory hierarchy organizes different types of computer memory based on speed, cost, and capacity. Faster memory is more expensive and has less capacity, while slower memory is cheaper and has more capacity.',
      examples: [
        'Registers: Fastest memory, built into CPU, very small capacity (bytes to kilobytes)',
        'Cache Memory: Extremely fast, located on or near CPU, small capacity (kilobytes to megabytes)',
        'Main Memory (RAM): Fast access, volatile storage, moderate capacity (gigabytes)',
        'Secondary Storage: Slower but permanent storage, large capacity (terabytes)',
        'Off-line Storage: Slowest access, removable media like USB drives and optical discs',
        'Example access times: Registers (1ns), Cache (10ns), RAM (100ns), SSD (100μs), HDD (10ms)'
      ]
    }
  ],
  mcqs: [
    {
      question: 'Which of the following best describes the relationship between hardware and software?',
      options: ['Hardware is more important than software', 'Software can function without hardware', 'Hardware and software must work together to function', 'Hardware is just for decoration'],
      correct: 2,
      explanation: 'Hardware and software must work together for a computer system to function properly. Hardware provides the physical components, while software provides the instructions. Neither can function effectively without the other.'
    },
    {
      question: 'Which of these is an example of an input device?',
      options: ['Monitor', 'Printer', 'Keyboard', 'Speaker'],
      correct: 2,
      explanation: 'A keyboard is an input device because it allows users to enter data and commands into the computer. Monitors and speakers are output devices, while printers are output devices that produce physical copies.'
    },
    {
      question: 'What is the primary function of storage devices?',
      options: ['Process data quickly', 'Display information to users', 'Retain data when computer is turned off', 'Convert digital signals to analog'],
      correct: 2,
      explanation: 'Storage devices retain data and programs even when the computer is turned off, unlike RAM which loses data when power is removed. This makes them essential for preserving work and system files.'
    },
    {
      question: 'Which component is considered the "brain" of the computer?',
      options: ['Monitor', 'Keyboard', 'Central Processing Unit (CPU)', 'Printer'],
      correct: 2,
      explanation: 'The Central Processing Unit (CPU) is considered the "brain" of the computer because it executes program instructions and performs calculations, making all other components work together.'
    },
    {
      question: 'What type of software manages hardware resources and provides a user interface?',
      options: ['Application software', 'Programming software', 'Operating system', 'Utility software'],
      correct: 2,
      explanation: 'An operating system (like Windows, macOS, or Linux) is system software that manages hardware resources and provides a platform for running other software, including the user interface.'
    },
    {
      question: 'Which of the following is an example of application software?',
      options: ['Windows 10', 'Device driver', 'Microsoft Word', 'BIOS'],
      correct: 2,
      explanation: 'Microsoft Word is application software because it performs specific tasks for users (creating and editing documents). Windows 10 is an operating system, device drivers are system software, and BIOS is firmware.'
    },
    {
      question: 'What is the correct order of the basic computer operations cycle?',
      options: ['Input → Storage → Processing → Output → Control', 'Input → Processing → Storage → Output → Control', 'Processing → Input → Storage → Output → Control', 'Storage → Input → Processing → Output → Control'],
      correct: 1,
      explanation: 'The correct order is Input → Processing → Storage → Output → Control. First, data is entered (input), then manipulated (processing), saved (storage), presented (output), and the entire process is managed (control).'
    },
    {
      question: 'Which characteristic makes computers different from humans in terms of work performance?',
      options: ['Creativity', 'Speed and accuracy', 'Emotional intelligence', 'Learning ability'],
      correct: 1,
      explanation: 'Computers excel in speed and accuracy, performing millions of operations per second with perfect precision (assuming correct input). Humans, while creative and emotionally intelligent, cannot match computer speed and accuracy.'
    },
    {
      question: 'In the memory hierarchy, which type of memory is the fastest but has the smallest capacity?',
      options: ['Hard Disk Drive', 'RAM', 'Cache Memory', 'Registers'],
      correct: 3,
      explanation: 'Registers are the fastest type of memory with the smallest capacity. They are built directly into the CPU and provide the quickest access to data that the processor is currently working with.'
    },
    {
      question: 'Which of these is NOT a communication device?',
      options: ['Network Interface Card', 'Router', 'Modem', 'Graphics Card'],
      correct: 3,
      explanation: 'A graphics card (GPU) is a processing unit that handles visual calculations, not a communication device. Network Interface Cards, routers, and modems all enable computers to connect and communicate with other devices.'
    }
  ]
}

export default function ComputerFundamentalsModule() {
  return (
    <ModuleLayout 
      module={computerFundamentalsModule} 
      grade={11} 
      subject="Computer Science" 
    />
  )
}