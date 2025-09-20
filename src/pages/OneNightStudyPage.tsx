import { useEffect, useMemo, useState } from 'react'

type Topic = {
  grade: number
  subject: string
  title: string
  bullets: string[]
}

type MCQ = {
  question: string
  options: string[]
  correct: number
  explanation: string
}

type LearningModule = {
  title: string
  introduction: string
  concepts: {
    title: string
    content: string
    examples: string[]
  }[]
  mcqs: MCQ[]
}

const integersModule: LearningModule = {
  title: 'Integers',
  introduction: 'Welcome to the world of integers! Integers are whole numbers that can be positive, negative, or zero. They help us understand quantities that can go in opposite directions, like temperature above and below freezing, or money earned and spent.',
  concepts: [
    {
      title: 'Representation on a Number Line',
      content: 'A number line helps us visualize integers. Zero is in the middle, positive numbers go to the right, and negative numbers go to the left.',
      examples: [
        'Draw a horizontal line with arrows on both ends',
        'Mark zero (0) in the middle',
        'Mark positive numbers to the right: 1, 2, 3, 4...',
        'Mark negative numbers to the left: -1, -2, -3, -4...',
        'The distance between any two consecutive integers is always 1 unit'
      ]
    },
    {
      title: 'Absolute Value',
      content: 'The absolute value of a number is its distance from zero on the number line, regardless of direction. It\'s always positive or zero.',
      examples: [
        '|5| = 5 (5 units from zero)',
        '|-5| = 5 (5 units from zero)',
        '|0| = 0 (zero is at zero)',
        '|-10| = 10 (10 units from zero)',
        'Think of it as "how far" without caring about direction'
      ]
    },
    {
      title: 'Comparing and Ordering Integers',
      content: 'When comparing integers, remember: numbers to the right on the number line are greater than numbers to the left.',
      examples: [
        '5 > 3 (5 is to the right of 3)',
        '-2 > -5 (-2 is to the right of -5)',
        '0 > -3 (0 is to the right of -3)',
        'Ordering from least to greatest: -5, -2, 0, 3, 5',
        'Ordering from greatest to least: 5, 3, 0, -2, -5'
      ]
    },
    {
      title: 'Operations on Integers - Addition',
      content: 'Adding integers: Same signs add and keep the sign, different signs subtract and keep the sign of the larger number.',
      examples: [
        'Same signs: 5 + 3 = 8, -5 + (-3) = -8',
        'Different signs: 5 + (-3) = 2, -5 + 3 = -2',
        'With zero: 5 + 0 = 5, -5 + 0 = -5',
        'Real example: Temperature rose 3°C from -2°C: -2 + 3 = 1°C'
      ]
    },
    {
      title: 'Operations on Integers - Subtraction',
      content: 'Subtracting integers: Change subtraction to addition of the opposite, then follow addition rules.',
      examples: [
        '5 - 3 = 5 + (-3) = 2',
        '5 - (-3) = 5 + 3 = 8',
        '-5 - 3 = -5 + (-3) = -8',
        '-5 - (-3) = -5 + 3 = -2',
        'Real example: Temperature dropped 4°C from 2°C: 2 - 4 = 2 + (-4) = -2°C'
      ]
    },
    {
      title: 'Operations on Integers - Multiplication',
      content: 'Multiplying integers: Same signs give positive, different signs give negative.',
      examples: [
        'Same signs: 3 × 4 = 12, (-3) × (-4) = 12',
        'Different signs: 3 × (-4) = -12, (-3) × 4 = -12',
        'With zero: 5 × 0 = 0, (-5) × 0 = 0',
        'Real example: Losing 3 points per wrong answer for 4 wrong answers: (-3) × 4 = -12 points'
      ]
    },
    {
      title: 'Operations on Integers - Division',
      content: 'Dividing integers: Same signs give positive, different signs give negative.',
      examples: [
        'Same signs: 12 ÷ 3 = 4, (-12) ÷ (-3) = 4',
        'Different signs: 12 ÷ (-3) = -4, (-12) ÷ 3 = -4',
        'With zero: 0 ÷ 5 = 0 (but 5 ÷ 0 is undefined!)',
        'Real example: Sharing -15 points equally among 3 people: (-15) ÷ 3 = -5 points each'
      ]
    },
    {
      title: 'Properties of Integer Operations',
      content: 'Integers follow important properties that make calculations easier.',
      examples: [
        'Commutative Property: 3 + 5 = 5 + 3, 3 × 5 = 5 × 3',
        'Associative Property: (2 + 3) + 4 = 2 + (3 + 4)',
        'Distributive Property: 3 × (2 + 4) = 3 × 2 + 3 × 4',
        'Identity Property: 5 + 0 = 5, 5 × 1 = 5',
        'These properties work with negative numbers too!'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the absolute value of -7?',
      options: ['-7', '7', '0', '14'],
      correct: 1,
      explanation: 'The absolute value of -7 is 7 because it is 7 units away from zero on the number line, regardless of direction.'
    },
    {
      question: 'Which is greater: -5 or -2?',
      options: ['-5', '-2', 'They are equal', 'Cannot be determined'],
      correct: 1,
      explanation: '-2 is greater than -5 because -2 is to the right of -5 on the number line.'
    },
    {
      question: 'What is 8 + (-3)?',
      options: ['11', '5', '-5', '-11'],
      correct: 1,
      explanation: '8 + (-3) = 5. When adding integers with different signs, subtract the smaller absolute value from the larger one and keep the sign of the number with the larger absolute value.'
    },
    {
      question: 'What is (-4) × 6?',
      options: ['24', '-24', '10', '-10'],
      correct: 1,
      explanation: '(-4) × 6 = -24. When multiplying integers with different signs, the result is negative.'
    },
    {
      question: 'What is 15 ÷ (-3)?',
      options: ['5', '-5', '45', '-45'],
      correct: 1,
      explanation: '15 ÷ (-3) = -5. When dividing integers with different signs, the result is negative.'
    }
  ]
}

// Comprehensive Fractions and Decimals Learning Module for 6th Grade
const fractionsDecimalsModule: LearningModule = {
  title: 'Fractions and Decimals',
  introduction: 'Welcome to the world of fractions and decimals! These are important number forms that help us represent parts of a whole. Whether you\'re sharing a pizza, measuring ingredients for a recipe, or calculating discounts while shopping, fractions and decimals are everywhere in our daily lives. Let\'s learn how to work with them!',
  concepts: [
    {
      title: 'Understanding Fractions',
      content: 'A fraction represents a part of a whole. It has two parts: the numerator (top number) shows how many parts we have, and the denominator (bottom number) shows the total number of equal parts the whole is divided into.',
      examples: [
        'In the fraction 3/4, the numerator is 3 and the denominator is 4',
        'This means we have 3 out of 4 equal parts',
        'Real-life example: 3/4 of a pizza means you have 3 slices when the whole pizza is cut into 4 equal slices',
        'Types of fractions: proper (numerator < denominator, like 2/3), improper (numerator ≥ denominator, like 5/3), and mixed numbers (whole number with proper fraction, like 1 2/3)'
      ]
    },
    {
      title: 'Converting Fractions to Decimals',
      content: 'To convert a fraction to a decimal, divide the numerator by the denominator. This helps us work with fractions in calculator form.',
      examples: [
        '1/2 = 1 ÷ 2 = 0.5',
        '3/4 = 3 ÷ 4 = 0.75',
        '1/4 = 1 ÷ 4 = 0.25',
        '2/5 = 2 ÷ 5 = 0.4',
        'Some fractions create repeating decimals: 1/3 = 0.333... (write as 0.3̄)'
      ]
    },
    {
      title: 'Converting Decimals to Fractions',
      content: 'To convert a decimal to a fraction, use the place value. The decimal places tell us the denominator.',
      examples: [
        '0.5 = 5/10 = 1/2 (simplified)',
        '0.25 = 25/100 = 1/4 (simplified)',
        '0.75 = 75/100 = 3/4 (simplified)',
        '0.125 = 125/1000 = 1/8 (simplified)',
        'Always simplify by finding the greatest common factor'
      ]
    },
    {
      title: 'Adding and Subtracting Fractions',
      content: 'To add or subtract fractions, they must have the same denominator. If they don\'t, find the least common multiple (LCM) of the denominators.',
      examples: [
        'Same denominators: 1/4 + 2/4 = 3/4',
        'Different denominators: 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2',
        'Subtraction: 3/4 - 1/4 = 2/4 = 1/2',
        'With different denominators: 2/3 - 1/6 = 4/6 - 1/6 = 3/6 = 1/2',
        'Always simplify your final answer'
      ]
    },
    {
      title: 'Multiplying Fractions',
      content: 'To multiply fractions, multiply the numerators together and multiply the denominators together. Then simplify if possible.',
      examples: [
        '1/2 × 1/3 = 1/6',
        '2/3 × 3/4 = 6/12 = 1/2',
        '1/4 × 2/5 = 2/20 = 1/10',
        'With whole numbers: 3 × 1/4 = 3/1 × 1/4 = 3/4',
        'Cross-canceling can make multiplication easier: 2/3 × 3/8 = 1/4'
      ]
    },
    {
      title: 'Dividing Fractions',
      content: 'To divide fractions, multiply by the reciprocal (flip) of the second fraction. Remember: "flip and multiply"!',
      examples: [
        '1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2',
        '3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 1 1/2',
        '2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6',
        'Dividing by a whole number: 1/3 ÷ 2 = 1/3 × 1/2 = 1/6',
        'Think of it as "how many groups of the second fraction fit into the first?"'
      ]
    },
    {
      title: 'Working with Decimals',
      content: 'Decimals represent fractions with denominators of 10, 100, 1000, etc. Understanding place value is key to working with decimals.',
      examples: [
        'Place values: 0.5 (tenths), 0.25 (hundredths), 0.125 (thousandths)',
        'Adding decimals: 0.5 + 0.25 = 0.75 (line up decimal points)',
        'Subtracting decimals: 0.8 - 0.3 = 0.5',
        'Multiplying decimals: 0.5 × 0.4 = 0.20 = 0.2',
        'Dividing decimals: 0.8 ÷ 0.4 = 2'
      ]
    },
    {
      title: 'Comparing Fractions and Decimals',
      content: 'To compare fractions and decimals, convert them to the same form or use cross multiplication for fractions.',
      examples: [
        'Convert to decimals: 1/2 = 0.5, 3/5 = 0.6, so 3/5 > 1/2',
        'Convert to fractions: 0.25 = 1/4, 0.3 = 3/10, so 3/10 > 1/4',
        'Cross multiplication: to compare 2/3 and 3/4, check 2×4 vs 3×3: 8 > 9, so 3/4 > 2/3',
        'Using common denominators: 1/3 vs 1/4 → 4/12 vs 3/12, so 1/3 > 1/4',
        'Number line visualization helps understand relative sizes'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is 1/2 as a decimal?',
      options: ['0.2', '0.5', '0.25', '2.0'],
      correct: 1,
      explanation: '1/2 = 1 ÷ 2 = 0.5. When you divide 1 by 2, you get 0.5.'
    },
    {
      question: 'What is 0.75 as a fraction in simplest form?',
      options: ['75/100', '3/4', '7/10', '15/20'],
      correct: 1,
      explanation: '0.75 = 75/100. To simplify, divide both numerator and denominator by 25: 75÷25 = 3, 100÷25 = 4, so 3/4.'
    },
    {
      question: 'What is 1/4 + 1/2?',
      options: ['1/6', '2/6', '3/4', '1/3'],
      correct: 2,
      explanation: 'To add 1/4 + 1/2, convert to common denominator: 1/4 + 2/4 = 3/4.'
    },
    {
      question: 'What is 2/3 × 1/4?',
      options: ['2/12', '1/6', '3/7', '8/12'],
      correct: 1,
      explanation: 'To multiply fractions: 2/3 × 1/4 = (2×1)/(3×4) = 2/12 = 1/6.'
    },
    {
      question: 'What is 1/2 ÷ 1/4?',
      options: ['1/8', '1/6', '2', '4'],
      correct: 2,
      explanation: 'To divide fractions, multiply by the reciprocal: 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2.'
    },
    {
      question: 'Which is larger: 2/3 or 0.6?',
      options: ['2/3', '0.6', 'They are equal', 'Cannot determine'],
      correct: 0,
      explanation: '2/3 = 0.667... and 0.6 = 0.600, so 2/3 is larger than 0.6.'
    },
    {
      question: 'What is 3.5 + 2.25?',
      options: ['5.75', '5.7', '6.75', '5.25'],
      correct: 0,
      explanation: 'Line up decimal points: 3.50 + 2.25 = 5.75.'
    },
    {
      question: 'Which fraction is equivalent to 0.4?',
      options: ['1/4', '2/5', '4/10', 'Both B and C'],
      correct: 3,
      explanation: '0.4 = 4/10 = 2/5 (simplified). Both 2/5 and 4/10 represent 0.4.'
    },
    {
      question: 'What is 3/4 - 1/3?',
      options: ['2/1', '5/12', '1/2', '2/7'],
      correct: 1,
      explanation: 'Convert to common denominator 12: 3/4 = 9/12, 1/3 = 4/12. So 9/12 - 4/12 = 5/12.'
    },
    {
      question: 'What is 0.25 × 4?',
      options: ['0.1', '1', '2.5', '10'],
      correct: 1,
      explanation: '0.25 × 4 = 1. You can think of this as 1/4 × 4 = 4/4 = 1.'
    }
  ]
};

// Word Processor Tabular Presentation Learning Module for 6th Grade
const wordProcessorTablesModule: LearningModule = {
  title: 'Word Processor – Tabular Presentation',
  introduction: 'Welcome to the exciting world of tables in word processors! Tables are like digital organizing tools that help us arrange information in neat rows and columns, just like a well-organized classroom or library. Whether you\'re creating a class schedule, organizing your favorite books, or presenting sports scores, tables make information easy to read and understand. Let\'s discover how to create and work with tables!',
  concepts: [
    {
      title: 'What is a Table?',
      content: 'A table is a way to organize information using rows and columns. Think of it like a grid where each box (called a cell) can hold different pieces of information. Tables help us compare and organize data clearly.',
      examples: [
        'A table has rows (horizontal lines) and columns (vertical lines)',
        'Where a row and column meet, we get a cell - like a box to put information',
        'Example: A class schedule table has days as columns and time periods as rows',
        'Each cell contains specific information, like "Math" or "Science"',
        'Tables make it easy to find information quickly'
      ]
    },
    {
      title: 'Why Do We Use Tables?',
      content: 'Tables are super helpful for organizing and presenting information in a clear way. They make it easy to compare data and find specific information quickly.',
      examples: [
        'Class schedules showing subjects for different days',
        'Price lists for items in a store',
        'Sports team statistics and scores',
        'Comparing features of different products',
        'Organizing contact information for friends and family'
      ]
    },
    {
      title: 'Creating a Table',
      content: 'Creating a table in a word processor is easy! Most word processors have a special button or menu option for tables. You can choose how many rows and columns you want.',
      examples: [
        'Click on the "Table" option in the menu or toolbar',
        'Select "Insert Table" from the dropdown menu',
        'Choose the number of rows and columns you need',
        'Click "OK" or "Insert" to create your table',
        'Your empty table will appear in your document, ready to fill with information'
      ]
    },
    {
      title: 'Adding Content to Tables',
      content: 'Once you have your table, you can add text, numbers, or other content to each cell. Just click on a cell and start typing! You can move between cells using the Tab key or arrow keys.',
      examples: [
        'Click on a cell to select it and type your information',
        'Press Tab to move to the next cell',
        'Press Shift+Tab to move to the previous cell',
        'Use arrow keys to navigate between cells',
        'You can copy and paste content into cells too'
      ]
    },
    {
      title: 'Editing Table Structure',
      content: 'Sometimes you need to change your table after you\'ve created it. You might need more rows or columns, or you might want to combine cells or split them apart.',
      examples: [
        'Insert row: Right-click and select "Insert" then "Row Above" or "Row Below"',
        'Insert column: Right-click and select "Insert" then "Column Left" or "Column Right"',
        'Delete row/column: Right-click and select "Delete Rows" or "Delete Columns"',
        'Merge cells: Select multiple cells, right-click, and select "Merge Cells"',
        'Split cells: Select a cell, right-click, and select "Split Cells"'
      ]
    },
    {
      title: 'Merging and Splitting Cells',
      content: 'Sometimes you need bigger cells for headings or to organize your information better. You can merge cells (combine them) or split them (divide into smaller cells).',
      examples: [
        'To merge cells: Select multiple cells, right-click, and choose "Merge Cells"',
        'Merged cells are great for table titles or headings that need to span multiple columns',
        'To split a cell: Right-click on a cell and choose "Split Cell"',
        'You can split cells into more rows or columns',
        'This is useful when you need to add more detailed information in a specific part of your table'
      ]
    },
    {
      title: 'Formatting Tables',
      content: 'Make your tables look great by adding colors, borders, and changing text styles. Most word processors let you customize how your table looks.',
      examples: [
        'Add borders to make cells stand out',
        'Change background colors for headers or important cells',
        'Make header text bold or a different color',
        'Adjust column width by dragging the column edges',
        'Change text alignment (left, center, right) within cells'
      ]
    },
    {
      title: 'Advantages of Using Tables',
      content: 'Tables have many benefits that make them perfect for organizing and presenting information in school projects and reports.',
      examples: [
        'Makes information easy to read and understand',
        'Helps compare data quickly',
        'Keeps information organized and neat',
        'Saves space compared to writing everything in paragraphs',
        'Makes your work look professional and well-organized'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the intersection of a row and column in a table called?',
      options: ['Grid', 'Box', 'Cell', 'Square'],
      correct: 2,
      explanation: 'A cell is the box or space where a row and column intersect in a table. This is where you put your information.'
    },
    {
      question: 'Which direction do rows run in a table?',
      options: ['Top to bottom', 'Left to right', 'Diagonally', 'In circles'],
      correct: 1,
      explanation: 'Rows run horizontally from left to right across the table.'
    },
    {
      question: 'Which direction do columns run in a table?',
      options: ['Left to right', 'Top to bottom', 'Diagonally', 'In zigzags'],
      correct: 1,
      explanation: 'Columns run vertically from top to bottom in a table.'
    },
    {
      question: 'Which key can you press to move to the next cell in a table?',
      options: ['Enter', 'Space', 'Tab', 'Shift'],
      correct: 2,
      explanation: 'The Tab key moves your cursor to the next cell in a table. This makes it easy to fill in your table quickly.'
    },
    {
      question: 'What happens when you merge cells in a table?',
      options: ['The cells get deleted', 'The cells become one larger cell', 'The cells change color', 'The cells get smaller'],
      correct: 1,
      explanation: 'When you merge cells, multiple cells combine to become one larger cell that spans multiple rows or columns.'
    },
    {
      question: 'Which of these would be BEST to present in a table?',
      options: ['A long story', 'A poem', 'Weekly test scores for students', 'A letter to a friend'],
      correct: 2,
      explanation: 'Weekly test scores for students is perfect for a table because you can organize scores by student name and test date, making it easy to compare and find information.'
    },
    {
      question: 'What is the first step to create a table in most word processors?',
      options: ['Save the document', 'Click on the Table option in the menu', 'Turn off the computer', 'Delete all text'],
      correct: 1,
      explanation: 'To create a table, you first need to click on the Table option in the menu or toolbar, which will show you table creation options.'
    },
    {
      question: 'How can you make table headers stand out?',
      options: ['Delete them', 'Make them bold or add background color', 'Make the text very small', 'Remove all borders'],
      correct: 1,
      explanation: 'You can make headers stand out by formatting them differently, such as making the text bold or adding a background color to those cells.'
    },
    {
      question: 'What is an advantage of using tables to present information?',
      options: ['They make information harder to find', 'They use more paper than paragraphs', 'They make information easier to read and compare', 'They can only contain numbers'],
      correct: 2,
      explanation: 'Tables make information easier to read and compare because they organize data in a structured format with rows and columns.'
    },
    {
      question: 'What can you put in a table cell?',
      options: ['Only numbers', 'Only text', 'Only pictures', 'Text, numbers, or pictures'],
      correct: 3,
      explanation: 'Table cells are versatile and can contain text, numbers, or even pictures, making them useful for many different types of information.'
    }
  ]
};

// Electricity and Circuits Learning Module for 6th Grade
const electricityCircuitsModule: LearningModule = {
  title: 'Electricity and Circuits',
  introduction: 'Welcome to the amazing world of electricity! Electricity is all around us - from the lights in your room to the computer you use. It\'s like an invisible helper that powers our modern world. Understanding electricity and circuits will help you see how many things work and keep you safe around electrical devices. Let\'s explore this fascinating topic together!',
  concepts: [
    {
      title: 'What is Electricity?',
      content: 'Electricity is a form of energy that results from the movement of tiny particles called electrons. Electric current is the flow of these electrons through materials, just like water flowing through a pipe.',
      examples: [
        'Electricity is created when electrons move from one place to another',
        'Electric current is measured in units called amperes (amps)',
        'Think of electricity like water flowing through pipes - the water is like electrons, and the pipes are like wires',
        'Lightning is a natural form of electricity where electrons jump through the air',
        'Static electricity happens when electrons build up in one place, like when you rub a balloon on your hair'
      ]
    },
    {
      title: 'Components of an Electric Circuit',
      content: 'An electric circuit is a complete path that allows electricity to flow. It has four main components that work together to make electricity useful.',
      examples: [
        'Source: Provides the electrical energy (like a battery or power outlet)',
        'Conductor: Allows electricity to flow through it (like copper wires)',
        'Load: Uses the electrical energy to do work (like a light bulb or motor)',
        'Switch: Controls whether electricity can flow or not (like a light switch)',
        'All components must be connected in a complete loop for electricity to flow'
      ]
    },
    {
      title: 'Series Circuits',
      content: 'In a series circuit, all components are connected in a single path, one after another. The same electric current flows through each component.',
      examples: [
        'Components are connected like links in a chain',
        'If one component breaks, the whole circuit stops working',
        'Christmas lights often use series circuits - if one bulb burns out, all lights go off',
        'The brightness of bulbs decreases as you add more bulbs to the circuit',
        'Current is the same everywhere in a series circuit'
      ]
    },
    {
      title: 'Parallel Circuits',
      content: 'In a parallel circuit, components are connected on separate branches. Each component has its own path for electricity to flow.',
      examples: [
        'Each component is connected on its own separate branch',
        'If one component breaks, the others continue to work',
        'House wiring uses parallel circuits - if one light burns out, others stay on',
        'Each bulb gets the full voltage and shines at full brightness',
        'Different branches can have different amounts of current'
      ]
    },
    {
      title: 'Conductors vs Insulators',
      content: 'Materials can be classified based on how well they allow electricity to flow through them. This property is very important for safety and circuit design.',
      examples: [
        'Conductors: Allow electricity to flow easily (copper, aluminum, gold, silver)',
        'Insulators: Do not allow electricity to flow easily (rubber, plastic, glass, wood)',
        'Wires are made of conductors (copper) covered with insulators (plastic coating)',
        'Our body can conduct electricity, which is why we need to be careful',
        'Air is usually an insulator, but lightning can jump through it'
      ]
    },
    {
      title: 'Electrical Safety Rules',
      content: 'Electricity can be dangerous if not handled properly. Following safety rules protects us from electric shock, burns, and fires.',
      examples: [
        'Never touch electrical outlets or switches with wet hands',
        'Don\'t put metal objects into electrical outlets',
        'Unplug devices by pulling the plug, not the cord',
        'Tell an adult immediately if you see damaged wires or sparks',
        'Stay away from power lines and electrical substations',
        'Use electrical devices only as they were designed to be used'
      ]
    },
    {
      title: 'How Circuits Work in Daily Life',
      content: 'Electric circuits are everywhere in our daily lives, making our modern lifestyle possible. Understanding them helps us use technology better.',
      examples: [
        'Your home has many parallel circuits for different rooms and appliances',
        'Flashlights use simple series circuits with batteries, switch, and bulb',
        'Cars have complex circuits for lights, radio, air conditioning, and engine control',
        'Mobile phones have tiny, complex circuits with millions of components',
        'Even simple toys often contain basic circuits for lights or sounds'
      ]
    },
    {
      title: 'Fun Facts About Electricity',
      content: 'Electricity has many interesting properties and plays amazing roles in nature and technology.',
      examples: [
        'Electric eels can generate up to 600 volts of electricity for defense',
        'Your brain uses electrical signals to control your body',
        'The heart beats using electrical impulses that doctors can measure',
        'Solar panels convert sunlight directly into electricity',
        'Some fish can sense electrical fields to navigate and hunt'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is electric current?',
      options: ['The speed of light', 'The flow of electrons through a material', 'The amount of heat produced', 'The brightness of a bulb'],
      correct: 1,
      explanation: 'Electric current is the flow of electrons through a material, like water flowing through a pipe.'
    },
    {
      question: 'Which component provides electrical energy in a circuit?',
      options: ['Switch', 'Wire', 'Source (like a battery)', 'Load'],
      correct: 2,
      explanation: 'The source, such as a battery or power outlet, provides the electrical energy that powers the circuit.'
    },
    {
      question: 'In a series circuit, what happens if one bulb burns out?',
      options: ['Other bulbs get brighter', 'Other bulbs stay the same', 'All bulbs stop working', 'Only half the bulbs stop working'],
      correct: 2,
      explanation: 'In a series circuit, all components are connected in one path, so if one component fails, the entire circuit stops working.'
    },
    {
      question: 'Which type of circuit is used in house wiring?',
      options: ['Series circuit', 'Parallel circuit', 'Both equally', 'Neither'],
      correct: 1,
      explanation: 'House wiring uses parallel circuits so that each appliance can work independently - if one device breaks, others continue to work.'
    },
    {
      question: 'Which of these is a good conductor of electricity?',
      options: ['Rubber', 'Plastic', 'Copper', 'Glass'],
      correct: 2,
      explanation: 'Copper is an excellent conductor of electricity, which is why it\'s commonly used in electrical wires.'
    },
    {
      question: 'Which of these is an insulator?',
      options: ['Aluminum', 'Gold', 'Rubber', 'Silver'],
      correct: 2,
      explanation: 'Rubber is an insulator that does not allow electricity to flow easily, which is why it\'s used to cover electrical wires for safety.'
    },
    {
      question: 'What should you never do with electrical outlets?',
      options: ['Use them to power devices', 'Turn them off with switches', 'Touch them with wet hands', 'Keep them clean'],
      correct: 2,
      explanation: 'Never touch electrical outlets with wet hands because water makes your body a better conductor, increasing the risk of electric shock.'
    },
    {
      question: 'What controls whether electricity flows in a circuit?',
      options: ['Wire', 'Battery', 'Switch', 'Light bulb'],
      correct: 2,
      explanation: 'A switch controls whether electricity can flow in a circuit by opening or closing the electrical path.'
    },
    {
      question: 'In a parallel circuit, each component receives:',
      options: ['Half the voltage', 'No voltage', 'The full voltage', 'Double voltage'],
      correct: 2,
      explanation: 'In a parallel circuit, each component is connected directly to the source, so each receives the full voltage.'
    },
    {
      question: 'What makes lightning possible?',
      options: ['Rain falling', 'Electrons jumping through air', 'Wind blowing', 'Clouds moving'],
      correct: 1,
      explanation: 'Lightning occurs when electrons build up in clouds and then jump through the air to the ground, creating a massive electrical discharge.'
    }
  ]
};

// Our Body and Health Learning Module for 6th Grade
const bodyHealthModule: LearningModule = {
  title: 'Our Body and Health',
  introduction: 'Welcome to the incredible journey of discovering your amazing body! Your body is like a super-advanced machine with many systems working together 24/7 to keep you alive, healthy, and active. From the food you eat to the air you breathe, every part of your body has an important job. Let\'s explore how to take care of this wonderful machine and keep it running at its best!',
  concepts: [
    {
      title: 'Human Body Systems Overview',
      content: 'Your body has several amazing systems that work together like a perfect team. Each system has a special job, but they all depend on each other to keep you healthy.',
      examples: [
        'Digestive System: Breaks down food and absorbs nutrients for energy',
        'Circulatory System: Pumps blood to carry oxygen and nutrients throughout your body',
        'Respiratory System: Takes in oxygen and removes carbon dioxide from your body',
        'Excretory System: Removes waste products from your body',
        'Nervous System: Controls your body and helps you think, feel, and react',
        'Skeletal System: Provides structure, protects organs, and helps you move'
      ]
    },
    {
      title: 'The Importance of Good Health and Hygiene',
      content: 'Good health means your body systems are working well together. Good hygiene helps prevent diseases and keeps you feeling fresh and confident.',
      examples: [
        'Brush your teeth twice daily to prevent tooth decay and gum disease',
        'Wash your hands regularly, especially before eating and after using the bathroom',
        'Take regular baths or showers to keep your skin clean and healthy',
        'Keep your nails clean and trimmed to prevent bacteria buildup',
        'Wear clean clothes and change them regularly',
        'Get enough sleep (8-10 hours) to help your body rest and repair itself'
      ]
    },
    {
      title: 'Balanced Diet and Nutrients',
      content: 'A balanced diet provides all the nutrients your body needs to grow, repair itself, and have energy. Think of nutrients as the fuel and building materials for your body.',
      examples: [
        'Carbohydrates: Provide quick energy (rice, bread, fruits)',
        'Proteins: Build and repair muscles and tissues (meat, fish, beans, eggs)',
        'Fats: Provide long-lasting energy and help absorb vitamins (nuts, oils, dairy)',
        'Vitamins: Help your body function properly (fruits, vegetables)',
        'Minerals: Keep bones, teeth, and blood healthy (milk, leafy greens)',
        'Water: Helps all body processes and keeps you hydrated (drink 6-8 glasses daily)'
      ]
    },
    {
      title: 'Understanding Diseases and Prevention',
      content: 'Diseases happen when something goes wrong in your body systems. Many diseases can be prevented by making healthy choices and following good hygiene practices.',
      examples: [
        'Infectious diseases spread from person to person (cold, flu) - prevent with handwashing and covering coughs',
        'Lifestyle diseases develop from poor habits (obesity, diabetes) - prevent with healthy diet and exercise',
        'Deficiency diseases occur when you don\'t get enough nutrients (scurvy from lack of Vitamin C)',
        'Vaccinations help prevent serious diseases by teaching your immune system to fight them',
        'Regular checkups help doctors catch problems early when they\'re easier to treat'
      ]
    },
    {
      title: 'Digestive System Deep Dive',
      content: 'Your digestive system is like a food processing factory that breaks down everything you eat into tiny nutrients your body can use.',
      examples: [
        'Mouth: Teeth chew food, saliva begins breaking it down',
        'Stomach: Acid and enzymes break food down further',
        'Small intestine: Most nutrients are absorbed into your bloodstream here',
        'Large intestine: Water is absorbed and waste is formed',
        'The whole process takes about 24-72 hours from eating to elimination'
      ]
    },
    {
      title: 'Circulatory System Basics',
      content: 'Your circulatory system is like a delivery service that brings oxygen and nutrients to every cell in your body and takes away waste.',
      examples: [
        'Heart: A powerful muscle that pumps blood throughout your body',
        'Blood vessels: Arteries carry blood away from heart, veins bring it back',
        'Blood: Carries oxygen, nutrients, and waste products',
        'Your heart beats about 100,000 times per day',
        'Exercise makes your heart stronger and more efficient'
      ]
    },
    {
      title: 'Respiratory System Function',
      content: 'Your respiratory system is responsible for bringing oxygen into your body and removing carbon dioxide, which is a waste product.',
      examples: [
        'Nose/Mouth: Air enters and is filtered and warmed',
        'Lungs: Oxygen enters blood, carbon dioxide is removed',
        'You breathe about 20,000 times per day without thinking about it',
        'Exercise increases your breathing rate to get more oxygen',
        'Clean air is important - avoid smoking and pollution when possible'
      ]
    },
    {
      title: 'Staying Healthy Every Day',
      content: 'Health is not just about avoiding sickness - it\'s about feeling energetic, happy, and ready to enjoy life every day.',
      examples: [
        'Exercise regularly: At least 60 minutes of activity daily',
        'Eat a variety of colorful fruits and vegetables',
        'Drink plenty of water throughout the day',
        'Get enough sleep and maintain a regular sleep schedule',
        'Manage stress through hobbies, friends, and relaxation',
        'Stay positive and laugh often - it\'s good for your health!'
      ]
    }
  ],
  mcqs: [
    {
      question: 'Which system is responsible for breaking down food?',
      options: ['Circulatory system', 'Digestive system', 'Respiratory system', 'Nervous system'],
      correct: 1,
      explanation: 'The digestive system breaks down food into nutrients that your body can absorb and use for energy and growth.'
    },
    {
      question: 'What does the circulatory system transport throughout the body?',
      options: ['Only oxygen', 'Only nutrients', 'Oxygen, nutrients, and waste products', 'Only waste products'],
      correct: 2,
      explanation: 'The circulatory system transports oxygen, nutrients, and waste products throughout the body via the bloodstream.'
    },
    {
      question: 'How many hours of sleep do 6th graders need each night?',
      options: ['4-5 hours', '6-7 hours', '8-10 hours', '12-14 hours'],
      correct: 2,
      explanation: '6th graders need 8-10 hours of sleep each night for proper growth, learning, and health.'
    },
    {
      question: 'Which nutrient provides quick energy for the body?',
      options: ['Proteins', 'Carbohydrates', 'Vitamins', 'Minerals'],
      correct: 1,
      explanation: 'Carbohydrates provide quick energy for the body and are found in foods like rice, bread, and fruits.'
    },
    {
      question: 'What is the main function of proteins in our diet?',
      options: ['Provide energy', 'Build and repair tissues', 'Help digest food', 'Store water'],
      correct: 1,
      explanation: 'Proteins are essential for building and repairing muscles, tissues, and other body structures.'
    },
    {
      question: 'Which practice helps prevent the spread of infectious diseases?',
      options: ['Eating more vegetables', 'Washing hands regularly', 'Sleeping longer', 'Drinking more water'],
      correct: 1,
      explanation: 'Washing hands regularly is one of the most effective ways to prevent the spread of infectious diseases like colds and flu.'
    },
    {
      question: 'What percentage of the human body is made up of water?',
      options: ['About 30%', 'About 45%', 'About 60%', 'About 80%'],
      correct: 2,
      explanation: 'About 60% of the human body is made up of water, which is why staying hydrated is so important for health.'
    },
    {
      question: 'Which system controls your thinking and reactions?',
      options: ['Digestive system', 'Nervous system', 'Circulatory system', 'Skeletal system'],
      correct: 1,
      explanation: 'The nervous system, including the brain and nerves, controls thinking, emotions, and reactions to the environment.'
    },
    {
      question: 'What is the best way to strengthen your heart?',
      options: ['Eat more sugar', 'Exercise regularly', 'Sleep more', 'Watch more TV'],
      correct: 1,
      explanation: 'Regular exercise strengthens the heart muscle and improves overall cardiovascular health.'
    },
    {
      question: 'Which of these foods is rich in calcium for strong bones?',
      options: ['Candy', 'Milk and dairy products', 'Chips', 'Soda'],
      correct: 1,
      explanation: 'Milk and dairy products are rich in calcium, which is essential for building and maintaining strong bones and teeth.'
    }
  ]
};

const curatedTopics: Topic[] = [
  { grade: 6, subject: 'Mathematics', title: 'Integers - Complete Module', bullets: ['Definition and representation', 'Absolute value concept', 'Comparing and ordering', 'All four operations', 'Properties and rules'] },
  { grade: 6, subject: 'Mathematics', title: 'Fractions & Decimals', bullets: ['Simplify and compare fractions', 'Convert fractions ↔ decimals', 'Add/Subtract with LCM', 'Multiply/Divide fractions and decimals'] },
  { grade: 6, subject: 'Science', title: 'Electricity and Circuits - Complete Module', bullets: ['Definition of electricity and current', 'Circuit components and functions', 'Series vs parallel circuits', 'Conductors vs insulators', 'Electrical safety rules'] },
  { grade: 6, subject: 'Science', title: 'Our Body and Health - Complete Module', bullets: ['Human body systems overview', 'Health and hygiene importance', 'Balanced diet and nutrients', 'Disease prevention basics', 'Daily health practices'] },
  { grade: 6, subject: 'Computer Science', title: 'Word Processor – Tabular Presentation - Complete Module', bullets: ['Table components: rows, columns, cells', 'Creating and inserting tables', 'Merging and splitting cells', 'Formatting and styling tables', 'Advantages of tabular presentation'] },
  { grade: 7, subject: 'Mathematics', title: 'Integers & Rational Numbers', bullets: ['Number line operations', 'Properties: commutative, associative', 'Rational number comparison'] },
  { grade: 7, subject: 'Science', title: 'Nutrition in Plants', bullets: ['Photosynthesis equation', 'Heterotrophic nutrition', 'Nitrogen fixation basics'] },
  { grade: 7, subject: 'Computer Science', title: 'Data & Variables', bullets: ['Data types', 'Variables and constants', 'Input/output operations', 'Simple data structures'] },
  { grade: 8, subject: 'Mathematics', title: 'Linear Equations in One Variable', bullets: ['Isolate variable technique', 'Transposition method', 'Word problems templates'] },
  { grade: 8, subject: 'Science', title: 'Force & Pressure', bullets: ['Contact vs non-contact forces', 'Pressure = Force/Area', 'Applications in fluids'] },
  { grade: 8, subject: 'Computer Science', title: 'Control Structures', bullets: ['Conditional statements', 'Loops and iterations', 'Basic functions', 'Program flow'] },
  { grade: 9, subject: 'Mathematics', title: 'Polynomials & Factorization', bullets: ['Degree and coefficient', 'Factor by grouping', 'Identities: a²−b², (a±b)²'] },
  { grade: 9, subject: 'Physics', title: 'Motion', bullets: ['Speed, velocity, acceleration', 's = ut + 1/2 at²', 'Distance-time graphs'] },
  { grade: 9, subject: 'Chemistry', title: 'Atoms & Molecules', bullets: ['Laws of chemical combination', 'Atomic and molecular mass', 'Mole concept basics'] },
  { grade: 9, subject: 'Biology', title: 'Tissues', bullets: ['Plant vs animal tissues', 'Meristematic vs permanent', 'Functions and examples'] },
  { grade: 9, subject: 'Computer Science', title: 'Introduction to Algorithms', bullets: ['Algorithm design', 'Pseudocode basics', 'Flowcharts', 'Time complexity introduction'] },
  { grade: 10, subject: 'Mathematics', title: 'Quadratic Equations', bullets: ['Standard form ax²+bx+c=0', 'Discriminant Δ = b²−4ac', 'Roots: (-b±√Δ)/2a'] },
  { grade: 10, subject: 'Physics', title: 'Electricity', bullets: ['Ohm\'s law V=IR', 'Series vs parallel', 'Power P=VI=I²R=V²/R'] },
  { grade: 10, subject: 'Chemistry', title: 'Chemical Reactions & Equations', bullets: ['Balancing equations', 'Types: combination, decomposition, displacement', 'Oxidation and reduction basics'] },
  { grade: 10, subject: 'Biology', title: 'Life Processes', bullets: ['Nutrition and respiration', 'Transport in plants and animals', 'Excretion overview'] },
  { grade: 10, subject: 'Computer Science', title: 'Data Structures', bullets: ['Arrays and lists', 'Stacks and queues', 'Basic searching algorithms', 'Introduction to sorting'] },
  { grade: 11, subject: 'Physics', title: 'Kinematics & Vectors', bullets: ['Projectile components', 'Relative velocity basics', 'Vector addition and resolution'] },
  { grade: 11, subject: 'Chemistry', title: 'Thermodynamics', bullets: ['First law ΔU=Q−W', 'Enthalpy and entropy', 'Gibbs free energy ΔG=ΔH−TΔS'] },
  { grade: 11, subject: 'Mathematics', title: 'Relations & Functions', bullets: ['Domain, codomain, range', 'Types of relations', 'Function composition basics'] },
  { grade: 11, subject: 'Biology', title: 'Plant Physiology', bullets: ['Photosynthesis light and dark reactions', 'Transpiration and stomata', 'Mineral nutrition'] },
  { grade: 11, subject: 'Computer Science', title: 'Object-Oriented Programming', bullets: ['Classes and objects', 'Inheritance and polymorphism', 'Encapsulation', 'Abstract classes and interfaces'] },
  { grade: 12, subject: 'Physics', title: 'Electrostatics', bullets: ['Coulomb\'s law', 'Electric field lines', 'Capacitance C=Q/V'] },
  { grade: 12, subject: 'Chemistry', title: 'Chemical Kinetics', bullets: ['Rate laws and order', 'Arrhenius equation', 'Half-life for first order'] },
  { grade: 12, subject: 'Mathematics', title: 'Integration Basics', bullets: ['∫x^n dx formula', 'Substitution technique', 'Definite integral properties'] },
  { grade: 12, subject: 'Biology', title: 'Human Reproduction', bullets: ['Male and female reproductive systems', 'Gametogenesis', 'Menstrual cycle overview'] },
  { grade: 12, subject: 'Computer Science', title: 'Advanced Programming Concepts', bullets: ['Database connectivity', 'Web development basics', 'API integration', 'Cybersecurity fundamentals'] },
]

type FAQ = { q: string; a: string; grades?: number[] }
const faqBank: Record<string, FAQ[]> = {
  Mathematics: [
    { q: 'What formulae should I memorize for this chapter?', a: 'List core identities and standard results (e.g., quadratic formula, factoring identities, derivative/integral basics for higher grades).', grades: [9,10,11,12] },
    { q: 'How do I quickly check my answer?', a: 'Substitute the solution back into the original equation; for graphs, verify intercepts and slopes match expected values.' },
    { q: 'What are common mistakes to avoid?', a: 'Sign errors, wrong order of operations, and skipping unit checks in word problems are frequent pitfalls.' },
    { q: 'How to revise efficiently before exam?', a: 'Solve 3–5 mixed problems covering concepts from the bullet list; time yourself and review each step.' },
  ],
  Physics: [
    { q: 'Which equations are essential?', a: 'Keep a sheet of key relations (e.g., kinematics, electricity, optics); note variables and units for each.', grades: [9,10,11,12] },
    { q: 'How to approach numericals fast?', a: 'Write knowns/unknowns, pick the governing law, ensure units are in SI, then compute and sanity-check magnitudes.' },
    { q: 'How can I avoid conceptual traps?', a: 'Differentiate scalar vs vector, series vs parallel, and note directionality in field/force diagrams.' },
  ],
  Chemistry: [
    { q: 'What should I focus on last minute?', a: 'Balancing equations, reaction types, periodic trends, and quick mole-mass conversions.', grades: [9,10] },
    { q: 'Any tips for numerical accuracy?', a: 'Use atomic mass rounded consistently; clearly set up mole ratios before calculating products/reactants.' },
    { q: 'How do I structure definition answers?', a: 'State the core idea in one line, add a short example if relevant, and end with significance or application.' },
  ],
  Biology: [
    { q: 'What diagrams should I practice?', a: 'Labelled diagrams for tissues/organs, cycles (e.g., menstrual, photosynthesis) with 4–6 critical labels.', grades: [9,10,11,12] },
    { q: 'How to remember processes?', a: 'Convert steps into a 4–5 point flow; use mnemonics and understand “why” each step occurs.' },
    { q: 'What gets most weightage?', a: 'Clean labelled diagrams, definitions with examples, and stepwise explanations often fetch higher marks.' },
  ],
  'Computer Science': [
    { q: 'How do I practice coding concepts?', a: 'Use online platforms like Scratch (for beginners), CodePen, or repl.it; solve small problems daily and gradually increase complexity.', grades: [6,7,8] },
    { q: 'What programming language should I start with?', a: 'For beginners, Python or JavaScript are excellent choices due to readable syntax and wide application. Block-based languages like Scratch are perfect for grades 6-7.' },
    { q: 'How to debug effectively?', a: 'Use print statements to track variable values, read error messages carefully, test small code sections, and use debugging tools in your IDE.' },
    { q: 'How to prepare for programming assessments?', a: 'Practice implementing algorithms from scratch, review common data structures, and solve problems with time constraints to build speed and accuracy.', grades: [9,10,11,12] },
  ],
}

export default function OneNightStudyPage() {
  const [gradeFilter, setGradeFilter] = useState<number>(6)
  const [subjectFilter, setSubjectFilter] = useState<string>('Mathematics')
  const [showIntegersModule, setShowIntegersModule] = useState<boolean>(false)
  const [showFractionsDecimalsModule, setShowFractionsDecimalsModule] = useState<boolean>(false)
  const [showWordProcessorTablesModule, setShowWordProcessorTablesModule] = useState<boolean>(false)
  const [showElectricityCircuitsModule, setShowElectricityCircuitsModule] = useState<boolean>(false)
  const [showBodyHealthModule, setShowBodyHealthModule] = useState<boolean>(false)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showAnswers, setShowAnswers] = useState<boolean>(false)
  const [reviewed, setReviewed] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ons_reviewed')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const subjects = useMemo(() => Array.from(new Set(curatedTopics.map(t => t.subject))), [])

  useEffect(() => {
    if (subjectFilter !== 'all' && !subjects.includes(subjectFilter) && subjects.length > 0) {
      setSubjectFilter('all')
    }
  }, [subjects, subjectFilter])

  const filtered = useMemo(() => curatedTopics.filter(t => {
    const gradeOk = t.grade === gradeFilter
    const subjectOk = subjectFilter === 'all' ? true : t.subject === subjectFilter
    return gradeOk && subjectOk
  }), [gradeFilter, subjectFilter])

  const subjectOptions = useMemo(() => ['all', ...subjects], [subjects])

  const faqsForSelection: FAQ[] = useMemo(() => {
    if (subjectFilter === 'all') return []
    const bank = faqBank[subjectFilter] || []
    return bank.filter(f => !f.grades || f.grades.includes(gradeFilter)).slice(0, 5)
  }, [subjectFilter, gradeFilter])

  const toggleReviewed = (key: string) => {
    const next = { ...reviewed, [key]: !reviewed[key] }
    setReviewed(next)
    try { localStorage.setItem('ons_reviewed', JSON.stringify(next)) } catch (error) {
      console.error('Failed to save review status to localStorage:', error)
    }
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }))
  }

  const calculateScore = () => {
    let correct = 0
    const currentModule = showIntegersModule ? integersModule : 
                         showWordProcessorTablesModule ? wordProcessorTablesModule : 
                         showElectricityCircuitsModule ? electricityCircuitsModule :
                         showBodyHealthModule ? bodyHealthModule :
                         fractionsDecimalsModule
    currentModule.mcqs.forEach((mcq, index) => {
      if (selectedAnswers[index] === mcq.correct) {
        correct++
      }
    })
    return correct
  }

  const resetMCQs = () => {
    setSelectedAnswers({})
    setShowAnswers(false)
  }

  const startIntegersModule = () => {
    setShowIntegersModule(true)
    setShowFractionsDecimalsModule(false)
    setShowWordProcessorTablesModule(false)
    setShowElectricityCircuitsModule(false)
    setShowBodyHealthModule(false)
    resetMCQs()
  }

  const startFractionsDecimalsModule = () => {
    setShowFractionsDecimalsModule(true)
    setShowIntegersModule(false)
    setShowWordProcessorTablesModule(false)
    setShowElectricityCircuitsModule(false)
    setShowBodyHealthModule(false)
    resetMCQs()
  }

  const startWordProcessorTablesModule = () => {
    setShowWordProcessorTablesModule(true)
    setShowIntegersModule(false)
    setShowFractionsDecimalsModule(false)
    setShowElectricityCircuitsModule(false)
    setShowBodyHealthModule(false)
    resetMCQs()
  }

  const startElectricityCircuitsModule = () => {
    setShowElectricityCircuitsModule(true)
    setShowIntegersModule(false)
    setShowFractionsDecimalsModule(false)
    setShowWordProcessorTablesModule(false)
    setShowBodyHealthModule(false)
    resetMCQs()
  }

  const startBodyHealthModule = () => {
    setShowBodyHealthModule(true)
    setShowIntegersModule(false)
    setShowFractionsDecimalsModule(false)
    setShowWordProcessorTablesModule(false)
    setShowElectricityCircuitsModule(false)
    resetMCQs()
  }

  const backToTopics = () => {
    setShowIntegersModule(false)
    setShowFractionsDecimalsModule(false)
    setShowWordProcessorTablesModule(false)
    setShowElectricityCircuitsModule(false)
    setShowBodyHealthModule(false)
    resetMCQs()
  }

  // Show Integers Module if selected
  if (showIntegersModule) {
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={backToTopics}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Topics
          </button>
          <div className="text-sm text-gray-500 dark:text-slate-500">Grade 6 • Mathematics</div>
        </div>

        {/* Module Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{integersModule.title}</h1>
          <p className="text-lg text-gray-600 dark:text-slate-400">Complete Learning Module</p>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-3">📚 Introduction</h2>
          <p className="text-blue-800 dark:text-blue-400 leading-relaxed">{integersModule.introduction}</p>
        </div>

        {/* Core Concepts */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🎯 Core Concepts</h2>
          {integersModule.concepts.map((concept, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{concept.title}</h3>
              <p className="text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">{concept.content}</p>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Examples:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  {concept.examples.map((example, exIndex) => (
                    <li key={exIndex} className="text-gray-600 dark:text-slate-400">{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* MCQ Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Practice Questions</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
              >
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
              </button>
              <button
                onClick={resetMCQs}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {integersModule.mcqs.map((mcq, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Question {index + 1}: {mcq.question}
              </h3>
              <div className="space-y-2">
                {mcq.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      checked={selectedAnswers[index] === optionIndex}
                      onChange={() => handleAnswerSelect(index, optionIndex)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className={`text-gray-700 dark:text-slate-300 ${
                      showAnswers && optionIndex === mcq.correct ? 'font-semibold text-green-600 dark:text-green-400' : ''
                    }`}>
                      {option}
                    </span>
                    {showAnswers && optionIndex === mcq.correct && (
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    )}
                  </label>
                ))}
              </div>
              {showAnswers && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Explanation:</h4>
                  <p className="text-green-700 dark:text-green-400">{mcq.explanation}</p>
                </div>
              )}
            </div>
          ))}

          {/* Score Display */}
          {Object.keys(selectedAnswers).length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Progress</h3>
              <p className="text-gray-700 dark:text-slate-300">
                You've answered {Object.keys(selectedAnswers).length} out of {integersModule.mcqs.length} questions.
                {showAnswers && (
                  <span className="block mt-2">
                    Score: {calculateScore()}/{integersModule.mcqs.length} ({Math.round((calculateScore() / integersModule.mcqs.length) * 100)}%)
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
  
  // Show Word Processor Tables Module if selected
  if (showWordProcessorTablesModule && !showIntegersModule && !showFractionsDecimalsModule && !showElectricityCircuitsModule && !showBodyHealthModule) {
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={backToTopics}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Topics
          </button>
          <div className="text-sm text-gray-500 dark:text-slate-500">Grade 6 • Computer Science</div>
        </div>

        {/* Module Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{wordProcessorTablesModule.title}</h1>
          <p className="text-lg text-gray-600 dark:text-slate-400">Complete Learning Module</p>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-3">📚 Introduction</h2>
          <p className="text-blue-800 dark:text-blue-400 leading-relaxed">{wordProcessorTablesModule.introduction}</p>
        </div>

        {/* Core Concepts */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🎯 Core Concepts</h2>
          {wordProcessorTablesModule.concepts.map((concept, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{concept.title}</h3>
              <p className="text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">{concept.content}</p>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Examples:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  {concept.examples.map((example, exIndex) => (
                    <li key={exIndex} className="text-gray-600 dark:text-slate-400">{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* MCQ Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Practice Questions</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
              >
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
              </button>
              <button
                onClick={resetMCQs}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {wordProcessorTablesModule.mcqs.map((mcq, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Question {index + 1}: {mcq.question}
              </h3>
              <div className="space-y-2">
                {mcq.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      checked={selectedAnswers[index] === optionIndex}
                      onChange={() => handleAnswerSelect(index, optionIndex)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className={`text-gray-700 dark:text-slate-300 ${
                      showAnswers && optionIndex === mcq.correct ? 'font-semibold text-green-600 dark:text-green-400' : ''
                    }`}>
                      {option}
                    </span>
                    {showAnswers && optionIndex === mcq.correct && (
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    )}
                  </label>
                ))}
              </div>
              {showAnswers && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Explanation:</h4>
                  <p className="text-green-700 dark:text-green-400">{mcq.explanation}</p>
                </div>
              )}
            </div>
          ))}

          {/* Score Display */}
          {Object.keys(selectedAnswers).length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Progress</h3>
              <p className="text-gray-700 dark:text-slate-300">
                You've answered {Object.keys(selectedAnswers).length} out of {wordProcessorTablesModule.mcqs.length} questions.
                {showAnswers && (
                  <span className="block mt-2">
                    Score: {calculateScore()}/{wordProcessorTablesModule.mcqs.length} ({Math.round((calculateScore() / wordProcessorTablesModule.mcqs.length) * 100)}%)
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
  
  // Show Fractions and Decimals Module if selected
  if (showFractionsDecimalsModule && !showIntegersModule && !showWordProcessorTablesModule && !showElectricityCircuitsModule && !showBodyHealthModule) {
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={backToTopics}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Topics
          </button>
          <div className="text-sm text-gray-500 dark:text-slate-500">Grade 6 • Mathematics</div>
        </div>

        {/* Module Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{fractionsDecimalsModule.title}</h1>
          <p className="text-lg text-gray-600 dark:text-slate-400">Complete Learning Module</p>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-3">📚 Introduction</h2>
          <p className="text-blue-800 dark:text-blue-400 leading-relaxed">{fractionsDecimalsModule.introduction}</p>
        </div>

        {/* Core Concepts */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🎯 Core Concepts</h2>
          {fractionsDecimalsModule.concepts.map((concept, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{concept.title}</h3>
              <p className="text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">{concept.content}</p>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Examples:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  {concept.examples.map((example, exIndex) => (
                    <li key={exIndex} className="text-gray-600 dark:text-slate-400">{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* MCQ Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Practice Questions</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
              >
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
              </button>
              <button
                onClick={resetMCQs}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {fractionsDecimalsModule.mcqs.map((mcq, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Question {index + 1}: {mcq.question}
              </h3>
              <div className="space-y-2">
                {mcq.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      checked={selectedAnswers[index] === optionIndex}
                      onChange={() => handleAnswerSelect(index, optionIndex)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className={`text-gray-700 dark:text-slate-300 ${
                      showAnswers && optionIndex === mcq.correct ? 'font-semibold text-green-600 dark:text-green-400' : ''
                    }`}>
                      {option}
                    </span>
                    {showAnswers && optionIndex === mcq.correct && (
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    )}
                  </label>
                ))}
              </div>
              {showAnswers && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Explanation:</h4>
                  <p className="text-green-700 dark:text-green-400">{mcq.explanation}</p>
                </div>
              )}
            </div>
          ))}

          {/* Score Display */}
          {Object.keys(selectedAnswers).length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Progress</h3>
              <p className="text-gray-700 dark:text-slate-300">
                You've answered {Object.keys(selectedAnswers).length} out of {fractionsDecimalsModule.mcqs.length} questions.
                {showAnswers && (
                  <span className="block mt-2">
                    Score: {calculateScore()}/{fractionsDecimalsModule.mcqs.length} ({Math.round((calculateScore() / fractionsDecimalsModule.mcqs.length) * 100)}%)
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Show Electricity and Circuits Module if selected
  if (showElectricityCircuitsModule && !showIntegersModule && !showFractionsDecimalsModule && !showWordProcessorTablesModule && !showBodyHealthModule) {
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={backToTopics}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Topics
          </button>
          <div className="text-sm text-gray-500 dark:text-slate-500">Grade 6 • Science</div>
        </div>

        {/* Module Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{electricityCircuitsModule.title}</h1>
          <p className="text-lg text-gray-600 dark:text-slate-400">Complete Learning Module</p>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-3">📚 Introduction</h2>
          <p className="text-blue-800 dark:text-blue-400 leading-relaxed">{electricityCircuitsModule.introduction}</p>
        </div>

        {/* Core Concepts */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🎯 Core Concepts</h2>
          {electricityCircuitsModule.concepts.map((concept, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{concept.title}</h3>
              <p className="text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">{concept.content}</p>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Examples:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  {concept.examples.map((example, exIndex) => (
                    <li key={exIndex} className="text-gray-600 dark:text-slate-400">{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* MCQ Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Practice Questions</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
              >
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
              </button>
              <button
                onClick={resetMCQs}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {electricityCircuitsModule.mcqs.map((mcq, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Question {index + 1}: {mcq.question}
              </h3>
              <div className="space-y-2">
                {mcq.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      checked={selectedAnswers[index] === optionIndex}
                      onChange={() => handleAnswerSelect(index, optionIndex)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className={`text-gray-700 dark:text-slate-300 ${
                      showAnswers && optionIndex === mcq.correct ? 'font-semibold text-green-600 dark:text-green-400' : ''
                    }`}>
                      {option}
                    </span>
                    {showAnswers && optionIndex === mcq.correct && (
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    )}
                  </label>
                ))}
              </div>
              {showAnswers && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Explanation:</h4>
                  <p className="text-green-700 dark:text-green-400">{mcq.explanation}</p>
                </div>
              )}
            </div>
          ))}

          {/* Score Display */}
          {Object.keys(selectedAnswers).length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Progress</h3>
              <p className="text-gray-700 dark:text-slate-300">
                You've answered {Object.keys(selectedAnswers).length} out of {electricityCircuitsModule.mcqs.length} questions.
                {showAnswers && (
                  <span className="block mt-2">
                    Score: {calculateScore()}/{electricityCircuitsModule.mcqs.length} ({Math.round((calculateScore() / electricityCircuitsModule.mcqs.length) * 100)}%)
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Show Our Body and Health Module if selected
  if (showBodyHealthModule && !showIntegersModule && !showFractionsDecimalsModule && !showWordProcessorTablesModule && !showElectricityCircuitsModule) {
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={backToTopics}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Topics
          </button>
          <div className="text-sm text-gray-500 dark:text-slate-500">Grade 6 • Science</div>
        </div>

        {/* Module Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{bodyHealthModule.title}</h1>
          <p className="text-lg text-gray-600 dark:text-slate-400">Complete Learning Module</p>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-3">📚 Introduction</h2>
          <p className="text-blue-800 dark:text-blue-400 leading-relaxed">{bodyHealthModule.introduction}</p>
        </div>

        {/* Core Concepts */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🎯 Core Concepts</h2>
          {bodyHealthModule.concepts.map((concept, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{concept.title}</h3>
              <p className="text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">{concept.content}</p>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">Examples:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  {concept.examples.map((example, exIndex) => (
                    <li key={exIndex} className="text-gray-600 dark:text-slate-400">{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* MCQ Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Practice Questions</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
              >
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
              </button>
              <button
                onClick={resetMCQs}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {bodyHealthModule.mcqs.map((mcq, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Question {index + 1}: {mcq.question}
              </h3>
              <div className="space-y-2">
                {mcq.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      checked={selectedAnswers[index] === optionIndex}
                      onChange={() => handleAnswerSelect(index, optionIndex)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className={`text-gray-700 dark:text-slate-300 ${
                      showAnswers && optionIndex === mcq.correct ? 'font-semibold text-green-600 dark:text-green-400' : ''
                    }`}>
                      {option}
                    </span>
                    {showAnswers && optionIndex === mcq.correct && (
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    )}
                  </label>
                ))}
              </div>
              {showAnswers && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Explanation:</h4>
                  <p className="text-green-700 dark:text-green-400">{mcq.explanation}</p>
                </div>
              )}
            </div>
          ))}

          {/* Score Display */}
          {Object.keys(selectedAnswers).length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Progress</h3>
              <p className="text-gray-700 dark:text-slate-300">
                You've answered {Object.keys(selectedAnswers).length} out of {bodyHealthModule.mcqs.length} questions.
                {showAnswers && (
                  <span className="block mt-2">
                    Score: {calculateScore()}/{bodyHealthModule.mcqs.length} ({Math.round((calculateScore() / bodyHealthModule.mcqs.length) * 100)}%)
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-3 md:items-end">
        <div>
          <div className="text-xs text-gray-600 dark:text-slate-400">Grade</div>
          <select value={gradeFilter} onChange={(e) => setGradeFilter(Number(e.target.value))} className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
            {[6,7,8,9,10,11,12].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <div className="text-xs text-gray-600 dark:text-slate-400">Subject</div>
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
            {subjectOptions.map(s => <option key={s} value={s}>{s === 'all' ? 'All' : s}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t, idx) => {
          const key = `${t.grade}-${t.subject}-${t.title}`
          const isReviewed = reviewed[key]
          const isIntegersModule = t.title === 'Integers - Complete Module'
          const isFractionsDecimalsModule = t.title === 'Fractions and Decimals - Complete Module'
          
          return (
            <div key={idx} className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">Grade {t.grade} • {t.subject}</div>
                  <div className="text-gray-900 dark:text-white font-semibold">{t.title}</div>
                </div>
                <button aria-label="Mark as reviewed" onClick={() => toggleReviewed(key)} className={`text-xs px-2 py-1 rounded-md border ${isReviewed ? 'bg-emerald-600 border-emerald-700 text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-slate-300'}`}>
                  {isReviewed ? 'Reviewed' : 'Mark reviewed'}
                </button>
              </div>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 dark:text-slate-300">
                {t.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              
              {/* Special button for Integers module */}
              {isIntegersModule && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={startIntegersModule}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>🚀</span>
                    <span>Start Complete Learning Module</span>
                  </button>
                  <p className="text-xs text-gray-500 dark:text-slate-400 text-center mt-2">
                    Interactive lessons + MCQs + Self-checking
                  </p>
                </div>
              )}
              
              {/* Special button for Word Processor Tables module */}
              {t.title === 'Word Processor – Tabular Presentation - Complete Module' && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={startWordProcessorTablesModule}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>🚀</span>
                    <span>Start Complete Learning Module</span>
                  </button>
                  <p className="text-xs text-gray-500 dark:text-slate-400 text-center mt-2">
                    Interactive lessons + MCQs + Self-checking
                  </p>
                </div>
              )}
              
              {/* Special button for Fractions and Decimals module */}
              {isFractionsDecimalsModule && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={startFractionsDecimalsModule}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>🚀</span>
                    <span>Start Complete Learning Module</span>
                  </button>
                  <p className="text-xs text-gray-500 dark:text-slate-400 text-center mt-2">
                    Interactive lessons + MCQs + Self-checking
                  </p>
                </div>
              )}

              {/* Special button for Electricity and Circuits module */}
              {t.title === 'Electricity and Circuits - Complete Module' && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={startElectricityCircuitsModule}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>🚀</span>
                    <span>Start Complete Learning Module</span>
                  </button>
                  <p className="text-xs text-gray-500 dark:text-slate-400 text-center mt-2">
                    Interactive lessons + MCQs + Self-checking
                  </p>
                </div>
              )}

              {/* Special button for Our Body and Health module */}
              {t.title === 'Our Body and Health - Complete Module' && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={startBodyHealthModule}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>🚀</span>
                    <span>Start Complete Learning Module</span>
                  </button>
                  <p className="text-xs text-gray-500 dark:text-slate-400 text-center mt-2">
                    Interactive lessons + MCQs + Self-checking
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
        <div className="text-gray-900 dark:text-white font-semibold mb-2">FAQs</div>
        {subjectFilter === 'all' ? (
          <div className="text-sm text-gray-700 dark:text-slate-300">Select a subject to view grade-specific FAQs.</div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-slate-800">
            {faqsForSelection.map((f, i) => (
              <details key={i} className="py-2">
                <summary className="cursor-pointer text-sm font-medium text-gray-800 dark:text-slate-200">{f.q}</summary>
                <div className="mt-1 text-sm text-gray-700 dark:text-slate-300">{f.a}</div>
              </details>
            ))}
            {faqsForSelection.length === 0 && (
              <div className="text-sm text-gray-700 dark:text-slate-300 py-2">FAQs will appear here for the selected grade and subject.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


