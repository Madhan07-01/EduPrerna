import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const wordProcessorTabularModule: LearningModule = {
  title: 'Word Processor – Tabular Presentation',
  introduction: 'Welcome to the exciting world of tables in word processors! Tables are like organized containers that help us present information clearly and neatly. Think of them like organizing your school supplies in different boxes - everything has its own place! By the end of this module, you\'ll be a master at creating and formatting beautiful tables.',
  concepts: [
    {
      title: 'Understanding Tables and Their Components',
      content: 'A table is made up of rows (horizontal lines) and columns (vertical lines) that create boxes called cells. Tables help organize information in a structured way, making it easy to read and understand.',
      examples: [
        'Rows run horizontally (left to right) like lines of text',
        'Columns run vertically (up and down) like pillars',
        'Cells are the individual boxes where rows and columns meet',
        'Example: A class schedule has rows for time periods and columns for days',
        'Example: A student grade sheet has rows for subjects and columns for test scores'
      ]
    },
    {
      title: 'Creating and Inserting Tables',
      content: 'Most word processors make it easy to create tables. You can specify how many rows and columns you need, and the program will create the table structure for you.',
      examples: [
        'Go to Insert → Table in the menu',
        'Choose the number of rows and columns you need',
        'Click to create the table in your document',
        'Start with a simple 3x3 table for practice',
        'You can always add more rows and columns later'
      ]
    },
    {
      title: 'Adding Content to Tables',
      content: 'Once you have a table, you can click in any cell to add text, numbers, or even pictures. Use the Tab key to move to the next cell, or click directly on the cell you want to edit.',
      examples: [
        'Click in a cell and start typing',
        'Press Tab to move to the next cell',
        'Press Shift+Tab to move to the previous cell',
        'You can add text, numbers, dates, or symbols',
        'Each cell can hold different types of information'
      ]
    },
    {
      title: 'Merging and Splitting Cells',
      content: 'Sometimes you need to combine cells or divide them. Merging joins multiple cells into one larger cell, while splitting divides one cell into multiple smaller cells.',
      examples: [
        'Merge cells to create headers that span multiple columns',
        'Example: Merge top row cells for a title like "Monthly Budget"',
        'Split cells when you need more space in one area',
        'Select the cells you want to merge, then choose Merge Cells',
        'Use Split Cells when you need to divide information further'
      ]
    },
    {
      title: 'Formatting Table Appearance',
      content: 'You can make your tables look professional by changing colors, borders, fonts, and alignment. Good formatting makes information easier to read and more attractive.',
      examples: [
        'Change border thickness and color for better visibility',
        'Add background colors to headers or important rows',
        'Adjust text alignment (left, center, right) in cells',
        'Change font size and style for headers',
        'Use bold text for important information'
      ]
    },
    {
      title: 'Adjusting Row Heights and Column Widths',
      content: 'You can resize rows and columns to fit your content perfectly. This helps ensure all information is visible and the table looks balanced.',
      examples: [
        'Drag column borders to make columns wider or narrower',
        'Drag row borders to make rows taller or shorter',
        'Double-click borders to auto-fit content',
        'Use uniform row heights for a neat appearance',
        'Make important columns wider to accommodate more text'
      ]
    },
    {
      title: 'Adding and Deleting Rows and Columns',
      content: 'Tables are flexible - you can add or remove rows and columns as needed. This lets you adjust your table structure without starting over.',
      examples: [
        'Right-click on a row or column to see options',
        'Choose "Insert Row Above/Below" to add rows',
        'Choose "Insert Column Left/Right" to add columns',
        'Select "Delete Row" or "Delete Column" to remove them',
        'Plan your table size, but don\'t worry - you can always modify it'
      ]
    },
    {
      title: 'Table Styles and Themes',
      content: 'Many word processors offer pre-designed table styles that instantly make your table look professional. These themes apply coordinated colors, borders, and formatting.',
      examples: [
        'Browse available table styles in the design menu',
        'Choose styles that match your document\'s purpose',
        'Professional styles for business documents',
        'Colorful styles for school projects and presentations',
        'You can modify styles after applying them'
      ]
    },
    {
      title: 'Advantages of Tabular Presentation',
      content: 'Tables offer many benefits over regular text when presenting structured information. They make data easier to read, compare, and understand at a glance.',
      examples: [
        'Easy comparison: Quickly compare different items side by side',
        'Clear organization: Information is neatly arranged and structured',
        'Space efficient: Fits more information in less space',
        'Professional appearance: Makes documents look polished',
        'Perfect for schedules, budgets, grade reports, and data lists'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What are the three main components of a table?',
      options: ['Rows, columns, and borders', 'Rows, columns, and cells', 'Headers, data, and footers', 'Text, numbers, and symbols'],
      correct: 1,
      explanation: 'The three main components of a table are rows (horizontal lines), columns (vertical lines), and cells (the boxes where rows and columns intersect).'
    },
    {
      question: 'Which key can you press to move to the next cell in a table?',
      options: ['Enter', 'Space', 'Tab', 'Shift'],
      correct: 2,
      explanation: 'The Tab key moves you to the next cell in a table. This is a quick way to navigate through cells when entering data.'
    },
    {
      question: 'What does "merging cells" mean?',
      options: ['Deleting cells from the table', 'Combining multiple cells into one larger cell', 'Copying content from one cell to another', 'Moving cells to a different position'],
      correct: 1,
      explanation: 'Merging cells means combining two or more adjacent cells into one larger cell. This is often used to create headers that span multiple columns.'
    },
    {
      question: 'What is the best way to make column widths fit the content automatically?',
      options: ['Manually drag each border', 'Double-click on the column border', 'Delete and recreate the table', 'Use the space bar'],
      correct: 1,
      explanation: 'Double-clicking on a column border automatically adjusts the width to fit the content in that column perfectly.'
    },
    {
      question: 'Which of these is NOT an advantage of using tables?',
      options: ['Easy comparison of information', 'Professional appearance', 'Takes up more space than regular text', 'Clear organization of data'],
      correct: 2,
      explanation: 'Tables actually save space compared to regular text when presenting structured data. They organize information efficiently and make it easier to read.'
    },
    {
      question: 'How do you typically access table insertion options in a word processor?',
      options: ['File → New', 'Edit → Copy', 'Insert → Table', 'Format → Font'],
      correct: 2,
      explanation: 'Table insertion options are typically found under Insert → Table in most word processors. This opens options to specify rows and columns.'
    },
    {
      question: 'What should you do first when planning a table?',
      options: ['Choose colors and borders', 'Decide how many rows and columns you need', 'Add all the text content', 'Apply a table style'],
      correct: 1,
      explanation: 'Before creating a table, you should plan how many rows and columns you need based on the information you want to organize.'
    },
    {
      question: 'Which formatting option would make a table header stand out?',
      options: ['Making the text smaller', 'Using light gray text', 'Making the text bold and adding background color', 'Removing all borders'],
      correct: 2,
      explanation: 'Bold text and background color help headers stand out and clearly identify what information is in each column or section.'
    },
    {
      question: 'What happens when you split a cell?',
      options: ['The cell is deleted', 'The cell is copied', 'The cell is divided into multiple smaller cells', 'The cell moves to a different location'],
      correct: 2,
      explanation: 'Splitting a cell divides it into multiple smaller cells, allowing you to organize information in more detail within that space.'
    },
    {
      question: 'Tables are most useful for presenting which type of information?',
      options: ['Long paragraphs of text', 'Structured data that can be compared', 'Single words or phrases', 'Images and pictures only'],
      correct: 1,
      explanation: 'Tables excel at presenting structured data that benefits from organization and comparison, such as schedules, budgets, grades, or lists with multiple categories.'
    }
  ]
}

export default function WordProcessorTabularModule() {
  return (
    <ModuleLayout 
      module={wordProcessorTabularModule} 
      grade={6} 
      subject="Computer Science" 
    />
  )
}