import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const introDatabaseModule: LearningModule = {
  title: 'Introduction to Database',
  introduction: 'Welcome to the amazing world of databases! Think of databases as super-organized digital filing cabinets that store and manage huge amounts of information. From your school\'s student records to your favorite social media app\'s user data, databases are working behind the scenes everywhere. Get ready to discover how these powerful tools help organize, store, and retrieve information quickly and efficiently!',
  concepts: [
    {
      title: 'Fundamental Definition and Purpose of a Database',
      content: 'A database is an organized collection of related information stored electronically in a computer system. It\'s designed to efficiently store, manage, and retrieve large amounts of data for various purposes.',
      examples: [
        'Like a digital library catalog that tracks all books, their locations, and availability',
        'Similar to a school\'s filing system for student records, grades, and attendance',
        'Purpose: Store data safely, find information quickly, avoid duplicate records',
        'Examples in daily life: Contact lists on phones, music libraries, online shopping carts',
        'Manages relationships between different pieces of information'
      ]
    },
    {
      title: 'Tables - The Foundation of Database Organization',
      content: 'Tables are the basic building blocks of databases. Think of a table like a spreadsheet with rows and columns that organize related information in a structured way.',
      examples: [
        'Student table: Contains all information about students in a school',
        'Book table: Stores details about every book in a library',
        'Product table: Keeps track of items in an online store',
        'Each table focuses on one main topic or entity',
        'Tables can be connected to share information between them'
      ]
    },
    {
      title: 'Rows and Records - Individual Data Entries',
      content: 'A row (also called a record) represents one complete entry in a table. Each row contains all the information about one specific item, person, or thing.',
      examples: [
        'In a Student table: One row = one student\'s complete information',
        'In a Book table: One row = one book\'s complete details',
        'Example student record: John Smith, Grade 8, Age 13, Student ID 12345',
        'Each row is unique and represents a single real-world entity',
        'A table can have thousands or millions of rows'
      ]
    },
    {
      title: 'Columns and Fields - Data Categories',
      content: 'A column (also called a field) represents one type of information stored about all entries in a table. Each column has a specific data type and purpose.',
      examples: [
        'Student table columns: Name, Grade, Age, Student_ID, Email',
        'Book table columns: Title, Author, ISBN, Publication_Year, Genre',
        'Each column stores the same type of data for all rows',
        'Data types: Text (names), Numbers (ages), Dates (birthdays), Yes/No (true/false)',
        'Column names should be descriptive and meaningful'
      ]
    },
    {
      title: 'Primary Key - The Unique Identifier',
      content: 'A primary key is a special column that uniquely identifies each row in a table. No two rows can have the same primary key value, ensuring each record is distinct.',
      examples: [
        'Student table: Student_ID (each student has a unique ID number)',
        'Book table: ISBN (International Standard Book Number - unique for each book)',
        'Product table: Product_Code (unique identifier for each item)',
        'Primary key rules: Must be unique, cannot be empty, should not change',
        'Helps connect information between different tables'
      ]
    },
    {
      title: 'Flat-File Databases - Simple Single-Table Storage',
      content: 'A flat-file database stores all information in a single table or file. It\'s the simplest type of database, like a single spreadsheet with rows and columns.',
      examples: [
        'Examples: Simple address book, basic inventory list, grade sheet',
        'Structure: All data in one table with no relationships to other tables',
        'Advantages: Simple to create and understand, good for small amounts of data',
        'Disadvantages: Data duplication, difficult to maintain as data grows',
        'Best for: Small personal projects, simple lists, basic record keeping'
      ]
    },
    {
      title: 'Relational Databases - Connected Information Systems',
      content: 'Relational databases use multiple connected tables that share information through relationships. This reduces duplication and makes data management more efficient.',
      examples: [
        'School system: Student table connects to Grades table and Classes table',
        'Library system: Books table connects to Authors table and Borrowers table',
        'Relationships: One student can have many grades, one author can write many books',
        'Advantages: Reduces duplication, maintains data consistency, handles complex queries',
        'Most common type used in businesses and organizations today'
      ]
    },
    {
      title: 'Distributed Databases - Information Across Multiple Locations',
      content: 'Distributed databases spread information across multiple computers or locations while appearing as a single database to users. This provides better performance and reliability.',
      examples: [
        'Social media platforms: User data stored across multiple data centers worldwide',
        'Banking systems: Account information distributed across regional servers',
        'Cloud databases: Data stored in multiple geographic locations for backup',
        'Advantages: Faster access, better reliability, handles massive amounts of data',
        'Used by large companies like Google, Facebook, Amazon'
      ]
    },
    {
      title: 'Main Advantages of Using Databases',
      content: 'Databases provide numerous benefits over traditional file storage methods, making them essential for managing information in our digital world.',
      examples: [
        'Data organization: Structured storage makes information easy to find',
        'Reduced duplication: Same information doesn\'t need to be stored multiple times',
        'Data integrity: Built-in rules prevent incorrect or inconsistent data',
        'Multiple user access: Many people can use the database simultaneously',
        'Security: Control who can see or modify different parts of the data',
        'Backup and recovery: Protect against data loss',
        'Scalability: Can grow to handle more data as needed'
      ]
    },
    {
      title: 'Common Examples of Database Software',
      content: 'Various database software systems are available for different needs, from simple personal use to enterprise-level applications serving millions of users.',
      examples: [
        'Microsoft Access: User-friendly desktop database for small businesses',
        'MySQL: Popular free database used by many websites and applications',
        'Oracle Database: Enterprise-level system for large corporations',
        'SQLite: Lightweight database used in mobile apps and small applications',
        'Microsoft SQL Server: Professional database for business applications',
        'MongoDB: Modern database for handling diverse types of data',
        'PostgreSQL: Advanced free database with powerful features'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is a database?',
      options: ['A computer program', 'An organized collection of related information stored electronically', 'A type of computer hardware', 'A way to connect to the internet'],
      correct: 1,
      explanation: 'A database is an organized collection of related information stored electronically in a computer system, designed to efficiently store, manage, and retrieve data.'
    },
    {
      question: 'In a database table, what does a row represent?',
      options: ['A type of data', 'One complete entry or record', 'A column header', 'A database name'],
      correct: 1,
      explanation: 'A row (also called a record) represents one complete entry in a table, containing all the information about one specific item, person, or thing.'
    },
    {
      question: 'What is the purpose of a primary key?',
      options: ['To sort the data', 'To uniquely identify each row in a table', 'To connect to the internet', 'To backup the database'],
      correct: 1,
      explanation: 'A primary key is a special column that uniquely identifies each row in a table, ensuring that no two rows have the same primary key value.'
    },
    {
      question: 'Which type of database stores all information in a single table?',
      options: ['Relational database', 'Distributed database', 'Flat-file database', 'Network database'],
      correct: 2,
      explanation: 'A flat-file database stores all information in a single table or file, making it the simplest type of database structure.'
    },
    {
      question: 'What is an advantage of relational databases over flat-file databases?',
      options: ['They are simpler to create', 'They reduce data duplication', 'They require less computer memory', 'They work without electricity'],
      correct: 1,
      explanation: 'Relational databases reduce data duplication by using multiple connected tables that share information through relationships, making data management more efficient.'
    },
    {
      question: 'In a Student table, which would be the best choice for a primary key?',
      options: ['Student Name', 'Student Age', 'Student ID', 'Student Grade'],
      correct: 2,
      explanation: 'Student ID would be the best primary key because each student has a unique ID number, while names can be duplicated and age/grade can change over time.'
    },
    {
      question: 'What type of database spreads information across multiple computers or locations?',
      options: ['Flat-file database', 'Relational database', 'Distributed database', 'Personal database'],
      correct: 2,
      explanation: 'Distributed databases spread information across multiple computers or locations while appearing as a single database to users.'
    },
    {
      question: 'Which is NOT a main advantage of using databases?',
      options: ['Data organization', 'Reduced duplication', 'Multiple user access', 'Requires no maintenance'],
      correct: 3,
      explanation: 'Databases require regular maintenance for optimal performance. The main advantages include data organization, reduced duplication, and multiple user access.'
    },
    {
      question: 'Which database software is commonly used for small business desktop applications?',
      options: ['Oracle Database', 'Microsoft Access', 'MongoDB', 'PostgreSQL'],
      correct: 1,
      explanation: 'Microsoft Access is a user-friendly desktop database software commonly used by small businesses for managing their data.'
    },
    {
      question: 'In a library database, if you have a Books table with columns Title, Author, ISBN, and Publication_Year, what does each column represent?',
      options: ['Different books', 'Different libraries', 'Different types of information about books', 'Different authors'],
      correct: 2,
      explanation: 'Each column represents a different type of information (field) stored about all books in the table - such as title, author, ISBN, and publication year.'
    }
  ]
}

export default function IntroDatabaseModule() {
  return (
    <ModuleLayout 
      module={introDatabaseModule} 
      grade={8} 
      subject="Computer Science" 
    />
  )
}