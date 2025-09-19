import { collection, doc, writeBatch } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

// Seed data for Number System lesson
export const numberSystemSeedData = {
  courseId: 'mathematics',
  lessonId: 'number-system',
  
  sections: [
    {
      id: 'intro',
      title: 'Introduction to Numbers',
      content: `Numbers are everywhere around us! From counting objects to measuring distances, numbers help us understand and describe the world.

In this lesson, we'll explore different types of numbers and how they're organized in what we call the "Number System."

Think of the number system as a big family tree where each type of number has its own special place and purpose.`,
      order: 0
    },
    {
      id: 'natural-numbers',
      title: 'Natural Numbers',
      content: `Natural numbers are the counting numbers we use every day: 1, 2, 3, 4, 5...

These are the first numbers we learn as children because they help us count things like toys, fingers, or candies.

<strong>Key Points:</strong>
• Natural numbers start from 1
• They go on forever (infinite)
• We use them for counting
• Symbol: ℕ = {1, 2, 3, 4, 5, ...}`,
      order: 1
    },
    {
      id: 'whole-numbers',
      title: 'Whole Numbers',
      content: `Whole numbers are natural numbers plus zero: 0, 1, 2, 3, 4, 5...

Zero was added to represent "nothing" or "no quantity." It might seem simple, but zero is one of the most important discoveries in mathematics!

<strong>Key Points:</strong>
• Whole numbers include 0
• They include all natural numbers
• Symbol: W = {0, 1, 2, 3, 4, 5, ...}
• Zero is neither positive nor negative`,
      order: 2
    },
    {
      id: 'integers',
      title: 'Integers',
      content: `Integers include positive numbers, negative numbers, and zero: ...-3, -2, -1, 0, 1, 2, 3...

Negative numbers help us represent quantities below zero, like temperatures below freezing or depths below sea level.

<strong>Key Points:</strong>
• Positive integers: 1, 2, 3, ...
• Negative integers: -1, -2, -3, ...
• Zero is neither positive nor negative
• Symbol: ℤ = {..., -3, -2, -1, 0, 1, 2, 3, ...}`,
      order: 3
    },
    {
      id: 'fractions',
      title: 'Fractions',
      content: `Fractions represent parts of a whole. They're written as a/b where 'a' is the numerator and 'b' is the denominator.\\n\\nThink of a pizza cut into equal slices - fractions help us describe how many slices we have!\\n\\n<strong>Key Points:</strong>\\n• Numerator: top number (parts we have)\\n• Denominator: bottom number (total parts)\\n• Examples: 1/2, 3/4, 7/8\\n• Can be proper (numerator < denominator) or improper (numerator ≥ denominator)`,
      order: 4
    },
    {
      id: 'decimals',
      title: 'Decimals',
      content: `Decimals are another way to write fractions, especially parts of 10, 100, 1000, etc.

Decimal numbers use a decimal point to separate the whole number part from the fractional part.

<strong>Key Points:</strong>
• 0.5 = 1/2
• 0.25 = 1/4
• 0.75 = 3/4
• Each place value after the decimal represents tenths, hundredths, thousandths...
• Examples: 3.14, 0.25, 12.567`,
      order: 5
    },
    {
      id: 'number-line',
      title: 'Number Line',
      content: `A number line is a visual way to show numbers as points on a straight line. It helps us understand the order and relationship between numbers.

<strong>How it works:</strong>
• Numbers increase from left to right
• Zero is in the middle
• Positive numbers are to the right of zero
• Negative numbers are to the left of zero
• Equal spacing between consecutive integers`,
      order: 6
    },
    {
      id: 'place-value',
      title: 'Place Value System',
      content: `The place value system helps us understand what each digit in a number represents based on its position.

For example, in the number 2,347:
• 2 is in the thousands place (2,000)
• 3 is in the hundreds place (300)
• 4 is in the tens place (40)
• 7 is in the ones place (7)

<strong>Key Points:</strong>
• Each position has 10 times the value of the position to its right
• This is called a base-10 or decimal system
• Place values: ones, tens, hundreds, thousands, ten thousands...`,
      order: 7
    }
  ],
  
  mcqs: [
    {
      id: 'mcq-1',
      question: 'Which of the following is NOT a natural number?',
      options: ['1', '5', '0', '10'],
      correctAnswer: 2,
      explanation: 'Natural numbers start from 1, so 0 is not a natural number. 0 is included in whole numbers.',
      order: 0
    },
    {
      id: 'mcq-2',
      question: 'What is the symbol used to represent whole numbers?',
      options: ['ℕ', 'W', 'ℤ', 'ℚ'],
      correctAnswer: 1,
      explanation: 'W represents whole numbers. ℕ represents natural numbers, ℤ represents integers, and ℚ represents rational numbers.',
      order: 1
    },
    {
      id: 'mcq-3',
      question: 'Which number set includes negative numbers?',
      options: ['Natural numbers', 'Whole numbers', 'Integers', 'None of these'],
      correctAnswer: 2,
      explanation: 'Integers include positive numbers, negative numbers, and zero. Natural and whole numbers only include non-negative values.',
      order: 2
    },
    {
      id: 'mcq-4',
      question: 'In the fraction 3/4, what is the denominator?',
      options: ['3', '4', '7', '3/4'],
      correctAnswer: 1,
      explanation: 'In a fraction a/b, the denominator is the bottom number (b). So in 3/4, the denominator is 4.',
      order: 3
    },
    {
      id: 'mcq-5',
      question: 'What decimal is equivalent to the fraction 1/4?',
      options: ['0.14', '0.25', '0.4', '0.5'],
      correctAnswer: 1,
      explanation: '1/4 = 1 ÷ 4 = 0.25. You can also think of it as 25/100 or 25 hundredths.',
      order: 4
    },
    {
      id: 'mcq-6',
      question: 'On a number line, which direction do positive numbers go from zero?',
      options: ['Left', 'Right', 'Up', 'Down'],
      correctAnswer: 1,
      explanation: 'On a horizontal number line, positive numbers are located to the right of zero, and negative numbers are to the left.',
      order: 5
    },
    {
      id: 'mcq-7',
      question: 'In the number 5,247, what is the place value of the digit 2?',
      options: ['Ones', 'Tens', 'Hundreds', 'Thousands'],
      correctAnswer: 2,
      explanation: 'In 5,247, the digit 2 is in the hundreds place, representing 200.',
      order: 6
    },
    {
      id: 'mcq-8',
      question: 'Which of these is an improper fraction?',
      options: ['1/2', '3/4', '5/3', '2/5'],
      correctAnswer: 2,
      explanation: 'An improper fraction has a numerator greater than or equal to the denominator. 5/3 is improper because 5 > 3.',
      order: 7
    },
    {
      id: 'mcq-9',
      question: 'What type of number is -7?',
      options: ['Natural number', 'Whole number', 'Positive integer', 'Negative integer'],
      correctAnswer: 3,
      explanation: '-7 is a negative integer. It\'s not a natural number or whole number (which are non-negative), and it\'s not positive.',
      order: 8
    },
    {
      id: 'mcq-10',
      question: 'In our number system, what base do we use?',
      options: ['Base 2', 'Base 8', 'Base 10', 'Base 16'],
      correctAnswer: 2,
      explanation: 'We use base 10 (decimal system) where each place value is 10 times the place value to its right.',
      order: 9
    }
  ]
}

// Function to seed the data to Firestore
export async function seedNumberSystemLesson() {
  try {
    const { courseId, lessonId, sections, mcqs } = numberSystemSeedData
    
    console.log('Starting to seed Number System lesson data...')
    
    // Create a batch for efficient writes
    const batch = writeBatch(db)
    
    // Add sections
    console.log('Adding sections...')
    for (const section of sections) {
      const sectionRef = doc(collection(db, `courses/${courseId}/lessons/${lessonId}/sections`), section.id)
      batch.set(sectionRef, section)
    }
    
    // Add MCQs
    console.log('Adding MCQs...')
    for (const mcq of mcqs) {
      const mcqRef = doc(collection(db, `courses/${courseId}/lessons/${lessonId}/mcqs`), mcq.id)
      batch.set(mcqRef, mcq)
    }
    
    // Commit the batch
    await batch.commit()
    
    console.log('✅ Number System lesson data seeded successfully!')
    console.log(`📚 Added ${sections.length} sections and ${mcqs.length} MCQs`)
    
    return {
      success: true,
      sectionsAdded: sections.length,
      mcqsAdded: mcqs.length
    }
  } catch (error: unknown) {
    console.error('❌ Error seeding data:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Function to clear existing lesson data (useful for re-seeding)
export async function clearNumberSystemLesson() {
  try {
    console.log('Clearing existing Number System lesson data...')
    
    // This would require reading all documents first, then deleting them
    // For simplicity, we'll just log that it would be implemented
    console.log('⚠️ Clear function would be implemented for production use')
    
    return { success: true }
  } catch (error: unknown) {
    console.error('❌ Error clearing data:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
  }
}

// Export the seed function for use in development
export default seedNumberSystemLesson