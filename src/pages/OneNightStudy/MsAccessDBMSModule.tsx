import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const msAccessDBMSModule: LearningModule = {
  title: 'MS Access – A DBMS',
  introduction: 'Welcome to the world of Microsoft Access! MS Access is like having a powerful digital assistant that helps you organize, store, and manage information in a smart and efficient way. Think of it as a super-organized filing system that not only stores your data but also helps you find, analyze, and present it beautifully. Get ready to discover how this amazing tool makes database management easy and accessible for everyone!',
  concepts: [
    {
      title: 'Definition and Purpose of MS Access as an RDBMS',
      content: 'Microsoft Access is a Relational Database Management System (RDBMS) that helps users create, manage, and work with databases. It\'s designed to be user-friendly while providing powerful tools for organizing and analyzing data.',
      examples: [
        'RDBMS means it manages multiple related tables that work together',
        'Like a digital filing cabinet with smart connections between folders',
        'Purpose: Store data, organize information, create reports, manage relationships',
        'Examples: Student records system, library catalog, inventory management',
        'Makes database management accessible to non-programmers through visual interface'
      ]
    },
    {
      title: 'Tables – The Foundation of Data Storage',
      content: 'Tables in MS Access are like organized spreadsheets that store your data in rows and columns. They are the foundation where all your information lives, with each table focusing on one main topic.',
      examples: [
        'Student table: Stores student names, IDs, grades, contact information',
        'Book table: Contains book titles, authors, ISBN numbers, publication dates',
        'Columns define what type of information (Name, Age, Grade)',
        'Rows contain actual data (John Smith, 13, 8th Grade)',
        'Data types: Text (names), Number (ages), Date (birthdays), Yes/No (true/false)'
      ]
    },
    {
      title: 'Queries – Asking Questions and Finding Answers',
      content: 'Queries are like asking smart questions to your database. They help you find specific information, calculate totals, and filter data based on conditions you set.',
      examples: [
        'Find all students in 8th grade with grades above 90%',
        'Show all books published after 2020 by a specific author',
        'Calculate the average age of students in each grade',
        'Types: Select (find data), Update (change data), Delete (remove data)',
        'Can combine data from multiple tables to create comprehensive results'
      ]
    },
    {
      title: 'Forms – User-Friendly Data Entry and Viewing',
      content: 'Forms provide an easy and attractive way to enter, view, and edit data. Instead of working directly with tables, forms present information in a more user-friendly format.',
      examples: [
        'Student registration form: Easy input fields for name, address, phone',
        'Book checkout form: Simple interface for librarians to record loans',
        'Can include buttons, dropdown lists, and other interactive elements',
        'Prevents data entry errors by guiding users through proper formats',
        'Makes database accessible to people who aren\'t tech experts'
      ]
    },
    {
      title: 'Reports – Professional Data Presentation',
      content: 'Reports transform your data into professional-looking documents that can be printed or shared. They organize information in a clear, formatted way for easy reading and analysis.',
      examples: [
        'Student grade reports: Formatted transcripts with school letterhead',
        'Library overdue books report: Organized list with due dates and fines',
        'Inventory summary: Professional document showing stock levels',
        'Can include calculations, totals, charts, and graphs',
        'Automatically formats data for printing or digital sharing'
      ]
    },
    {
      title: 'Relationships – Connecting Related Information',
      content: 'Relationships in MS Access connect different tables together, allowing them to share information efficiently. This prevents data duplication and maintains consistency across your database.',
      examples: [
        'Student table connects to Grades table (one student, many grades)',
        'Author table connects to Books table (one author, many books)',
        'Customer table connects to Orders table (one customer, many orders)',
        'Types: One-to-One, One-to-Many, Many-to-Many relationships',
        'Referential integrity ensures data accuracy across connected tables'
      ]
    },
    {
      title: 'MS Access as a DBMS – Core Functionalities',
      content: 'MS Access fulfills all the essential functions of a Database Management System, providing tools for data definition, manipulation, control, and administration in an integrated package.',
      examples: [
        'Data Definition: Create and modify table structures, set data types',
        'Data Manipulation: Add, edit, delete, and query information',
        'Data Control: Set user permissions, backup and restore databases',
        'Data Administration: Maintain database performance and integrity',
        'User Interface: Provides forms, reports, and navigation tools'
      ]
    },
    {
      title: 'Advantages of Using MS Access',
      content: 'MS Access offers many benefits that make it an excellent choice for small to medium-sized database applications, especially for users who want powerful features without complex programming.',
      examples: [
        'User-friendly: Visual interface requires no programming knowledge',
        'Integrated: All database tools (tables, forms, reports) in one program',
        'Microsoft Office integration: Works seamlessly with Word, Excel, PowerPoint',
        'Cost-effective: Included with many Microsoft Office packages',
        'Templates available: Pre-built databases for common business needs',
        'Rapid development: Quick to create functional database applications',
        'Desktop application: No internet connection required to work'
      ]
    },
    {
      title: 'Disadvantages and Limitations of MS Access',
      content: 'While MS Access is powerful for many uses, it has limitations that make it less suitable for very large databases or applications requiring high-end performance.',
      examples: [
        'Size limitations: Database files limited to 2GB maximum',
        'Concurrent users: Performance degrades with many simultaneous users',
        'Windows only: Not available for Mac or Linux operating systems',
        'Scalability: Not suitable for enterprise-level applications',
        'Internet deployment: Limited web-based functionality compared to web databases',
        'Version compatibility: Older versions may not open newer database files',
        'Backup complexity: Manual backup processes required for data protection'
      ]
    },
    {
      title: 'Real-World Applications and Use Cases',
      content: 'MS Access is widely used in various industries and organizations for managing different types of information systems, from simple contact lists to complex business applications.',
      examples: [
        'Small businesses: Customer management, inventory tracking, invoicing',
        'Schools: Student records, grade management, library catalogs',
        'Healthcare: Patient records, appointment scheduling, medical inventory',
        'Non-profits: Donor management, volunteer coordination, event planning',
        'Personal use: Recipe collections, home inventory, hobby databases',
        'Departmental applications: Project tracking, employee databases',
        'Prototype development: Testing database concepts before enterprise deployment'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What does RDBMS stand for in relation to MS Access?',
      options: ['Relational Database Management System', 'Remote Database Management System', 'Rapid Database Management System', 'Registered Database Management System'],
      correct: 0,
      explanation: 'RDBMS stands for Relational Database Management System, which means MS Access manages multiple related tables that work together to organize and store data efficiently.'
    },
    {
      question: 'Which MS Access feature is used to store data in rows and columns?',
      options: ['Forms', 'Reports', 'Tables', 'Queries'],
      correct: 2,
      explanation: 'Tables are the foundation of MS Access databases, storing data in organized rows and columns, with each table focusing on one main topic or entity.'
    },
    {
      question: 'What is the primary purpose of Queries in MS Access?',
      options: ['To print data', 'To enter new data', 'To find and retrieve specific information', 'To backup the database'],
      correct: 2,
      explanation: 'Queries are used to find and retrieve specific information from the database by asking questions, filtering data, and combining information from multiple tables.'
    },
    {
      question: 'Which feature makes data entry more user-friendly in MS Access?',
      options: ['Tables', 'Forms', 'Reports', 'Relationships'],
      correct: 1,
      explanation: 'Forms provide a user-friendly interface for entering, viewing, and editing data, making the database accessible to users who aren\'t comfortable working directly with tables.'
    },
    {
      question: 'What is the main purpose of Reports in MS Access?',
      options: ['To store data', 'To find specific information', 'To create professional-looking documents for printing or sharing', 'To connect tables together'],
      correct: 2,
      explanation: 'Reports transform data into professional-looking documents that can be printed or shared, organizing information in a clear, formatted way for easy reading and analysis.'
    },
    {
      question: 'What do Relationships in MS Access accomplish?',
      options: ['They store data in tables', 'They connect different tables together', 'They create printed reports', 'They backup the database'],
      correct: 1,
      explanation: 'Relationships connect different tables together, allowing them to share information efficiently while preventing data duplication and maintaining consistency.'
    },
    {
      question: 'Which is an advantage of using MS Access?',
      options: ['Requires extensive programming knowledge', 'Limited to very small amounts of data', 'User-friendly visual interface', 'Available only on Mac computers'],
      correct: 2,
      explanation: 'One of the main advantages of MS Access is its user-friendly visual interface that requires no programming knowledge, making database management accessible to everyone.'
    },
    {
      question: 'What is a major limitation of MS Access?',
      options: ['It cannot create forms', 'Database files are limited to 2GB maximum', 'It cannot connect tables', 'It cannot create reports'],
      correct: 1,
      explanation: 'A major limitation of MS Access is that database files are limited to 2GB maximum, which makes it unsuitable for very large enterprise-level applications.'
    },
    {
      question: 'Which DBMS functionality does MS Access NOT provide?',
      options: ['Data Definition', 'Data Manipulation', 'Data Control', 'All functionalities are provided'],
      correct: 3,
      explanation: 'MS Access provides all core DBMS functionalities including Data Definition, Data Manipulation, Data Control, and Data Administration in an integrated package.'
    },
    {
      question: 'Which type of organization would benefit most from using MS Access?',
      options: ['Large multinational corporation with millions of records', 'Small business with customer and inventory management needs', 'Global bank with real-time transaction processing', 'International airline reservation system'],
      correct: 1,
      explanation: 'Small businesses with customer and inventory management needs would benefit most from MS Access, as it\'s designed for small to medium-sized database applications with moderate data volumes.'
    }
  ]
}

export default function MsAccessDBMSModule() {
  return (
    <ModuleLayout 
      module={msAccessDBMSModule} 
      grade={8} 
      subject="Computer Science" 
    />
  )
}