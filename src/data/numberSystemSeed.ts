import { collection, doc, writeBatch } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

// Grade 6 Number System lesson seed data - Enhanced Version
export const numberSystemSeedData = {
  courseId: 'mathematics',
  lessonId: 'grade6_number_system',
  
  sections: [
    {
      id: 'intro',
      title: '🌟 Introduction to Numbers',
      contentHTML: `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 24px; border-radius: 12px; margin-bottom: 20px;">
          <h2 style="margin: 0 0 16px 0; font-size: 28px;">📘 EduPrerna Module – Number System (Grade 6)</h2>
          <p style="margin: 0; font-size: 18px; opacity: 0.9;">The foundation of all mathematics!</p>
        </div>
        
        <h3>🌟 Introduction</h3>
        <p>Numbers are part of our daily life — we use them to <strong>count, measure, and compare</strong>. Whether it's knowing the time, checking the temperature, or scoring marks in an exam, numbers are always there.</p>
        
        <p>But numbers come in different types: <strong>whole numbers, integers, fractions, and decimals</strong>. Together, these types form the <strong>Number System</strong> — the foundation of all mathematics.</p>
        
        <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
          <h4>🎯 What You'll Master:</h4>
          <ul>
            <li>Natural Numbers (N) - The counting numbers</li>
            <li>Whole Numbers (W) - Natural numbers + Zero</li>
            <li>Integers (Z) - Positive, negative, and zero</li>
            <li>Fractions - Parts of a whole</li>
            <li>Decimals - Another way to write fractions</li>
            <li>Number Line - Visualizing numbers</li>
            <li>Place Value System - Understanding positions</li>
          </ul>
        </div>
        
        <p><em>Let's begin this exciting journey through the world of numbers!</em></p>
      `,
      order: 0
    },
    {
      id: 'natural_numbers',
      title: '1. Natural Numbers (ℕ)',
      contentHTML: `
        <h3>1. Natural Numbers (ℕ)</h3>
        <p>These are the <strong><em>basic counting numbers</em></strong>: 1, 2, 3, 4, …</p>
        <p>We use them to <strong><em>count things</em></strong> like books, pens, or students.</p>
        
        <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 16px 0;">
          <h4>📚 Example:</h4>
          <p>There are <strong><em>5 oranges</em></strong> on the table.</p>
        </div>
        
        <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 16px 0;">
          <h4>⚠️ Important Note:</h4>
          <p>Natural numbers <strong><em>do not include zero</em></strong>.</p>
        </div>
        
        <h4>🔍 Key Facts:</h4>
        <ul>
          <li>Symbol: ℕ = {1, 2, 3, 4, 5, ...}</li>
          <li>Used for counting objects</li>
          <li>Always positive</li>
          <li>Go on forever (infinite)</li>
        </ul>
        
        <h4>🌍 Real-life Examples:</h4>
        <ul>
          <li>🍎 Number of apples in a basket</li>
          <li>👥 Students in your class</li>
          <li>📚 Books on a shelf</li>
          <li>⭐ Stars you can count in the sky</li>
        </ul>
      `,
      order: 1
    },
    {
      id: 'whole_numbers',
      title: '2. Whole Numbers (W)',
      contentHTML: `
        <h3>2. Whole Numbers (W)</h3>
        <p>Whole numbers = <strong><em>Natural numbers + Zero</em></strong>.</p>
        <p>So, <strong>W = {0, 1, 2, 3, …}</strong>.</p>
        
        <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 16px 0;">
          <h4>📚 Example:</h4>
          <p>Number of chocolates left in a box can be <strong><em>0</em></strong>.</p>
        </div>
        
        <p>Whole numbers are useful when we need to represent "nothing" (like 0 pencils).</p>
        
        <h4>🔍 Key Facts:</h4>
        <ul>
          <li>Symbol: W = {0, 1, 2, 3, 4, 5, ...}</li>
          <li>Includes all natural numbers PLUS zero</li>
          <li>Zero represents "nothing" or "empty"</li>
          <li>Zero is neither positive nor negative</li>
        </ul>
        
        <h4>🌍 Why Zero is Important:</h4>
        <ul>
          <li>🛍️ Empty shopping cart = 0 items</li>
          <li>💰 No money left = ₹0</li>
          <li>🌡️ Starting point on thermometer = 0°C</li>
          <li>📱 No messages = 0 notifications</li>
        </ul>
        
        <div style="background: #eff6ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h4>💡 Remember:</h4>
          <p>Every natural number is also a whole number, but not every whole number is a natural number (because of zero)!</p>
        </div>
      `,
      order: 2
    },
    {
      id: 'integers',
      title: '3. Integers (ℤ)',
      contentHTML: `
        <h3>3. Integers (ℤ)</h3>
        <p>Integers include <strong><em>positive numbers, negative numbers, and zero</em></strong>.</p>
        
        <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 16px 0;">
          <h4>📚 Example:</h4>
          <ul>
            <li><strong>+10</strong> = You gained 10 marks bonus.</li>
            <li><strong>-5</strong> = You lost 5 points in a game.</li>
            <li><strong>0</strong> = No change.</li>
          </ul>
        </div>
        
        <p>Integers are very useful in <strong><em>real life</em></strong>:</p>
        <ul>
          <li><strong>Temperature</strong> (–3°C, +30°C).</li>
          <li><strong>Bank accounts</strong> (–₹500 means you owe money).</li>
          <li><strong>Lifts in a building</strong> (Basement = –1, Ground = 0, First floor = +1).</li>
        </ul>
        
        <h4>🔍 Key Facts:</h4>
        <ul>
          <li>Symbol: ℤ = {..., -3, -2, -1, 0, 1, 2, 3, ...}</li>
          <li>Includes positive integers: 1, 2, 3, ...</li>
          <li>Includes negative integers: -1, -2, -3, ...</li>
          <li>Includes zero (which is neither positive nor negative)</li>
        </ul>
        
        <h4>🌍 More Real-world Examples:</h4>
        <ul>
          <li>🌡️ <strong>Weather:</strong> -5°C (freezing), +35°C (hot)</li>
          <li>🏢 <strong>Floors:</strong> -2 (basement), 0 (ground), +3 (third floor)</li>
          <li>💳 <strong>Money:</strong> -₹100 (debt), +₹500 (credit)</li>
          <li>⛰️ <strong>Altitude:</strong> -200m (below sea level), +8848m (Mount Everest)</li>
          <li>⏰ <strong>Time:</strong> -2 hours (2 hours ago), +3 hours (3 hours later)</li>
        </ul>
      `,
      order: 3
    },
    {
      id: 'fractions',
      title: '4. Fractions',
      contentHTML: `
        <h3>4. Fractions</h3>
        <p>A fraction represents a <strong><em>part of a whole</em></strong>.</p>
        <p>Written as <strong>a/b</strong> where <strong>a = numerator (part)</strong>, <strong>b = denominator (whole)</strong>.</p>
        
        <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 16px 0;">
          <h4>📚 Example:</h4>
          <ul>
            <li><strong>½</strong> → Half of a cake.</li>
            <li><strong>¾</strong> → Three slices out of four.</li>
          </ul>
        </div>
        
        <p>Fractions are widely used in:</p>
        <ul>
          <li><strong>Cooking</strong> (½ teaspoon of salt).</li>
          <li><strong>Time</strong> (¼ of an hour = 15 minutes).</li>
          <li><strong>Sharing</strong> (dividing a pizza among friends).</li>
        </ul>
        
        <h4>🔍 Understanding Parts:</h4>
        <ul>
          <li><strong>Numerator (top number):</strong> Parts we have</li>
          <li><strong>Denominator (bottom number):</strong> Total equal parts</li>
          <li><strong>Proper fraction:</strong> Numerator < Denominator (like ¾)</li>
          <li><strong>Improper fraction:</strong> Numerator ≥ Denominator (like 5/3)</li>
        </ul>
        
        <h4>🌍 Everyday Examples:</h4>
        <ul>
          <li>🍕 <strong>Pizza:</strong> 3/8 means 3 slices out of 8 total slices</li>
          <li>⏰ <strong>Time:</strong> ¼ hour = 15 minutes, ½ hour = 30 minutes</li>
          <li>📏 <strong>Measurement:</strong> ¾ meter = 75 centimeters</li>
          <li>🎂 <strong>Sharing:</strong> ½ cake means half the cake</li>
          <li>💧 <strong>Cooking:</strong> ⅓ cup of water</li>
          <li>📊 <strong>Results:</strong> 2/3 of students passed the test</li>
        </ul>
      `,
      order: 4
    },
    {
      id: 'decimals',
      title: '5. Decimals',
      contentHTML: `
        <h3>5. Decimals</h3>
        <p>Fractions can also be written using a <strong><em>dot (.)</em></strong>, called a decimal point.</p>
        
        <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 16px 0;">
          <h4>📚 Example:</h4>
          <ul>
            <li><strong>½ = 0.5</strong></li>
            <li><strong>¾ = 0.75</strong></li>
          </ul>
        </div>
        
        <p><strong>Real-life uses of decimals:</strong></p>
        <ul>
          <li><strong>Money</strong> (₹2.50).</li>
          <li><strong>Length</strong> (1.75 meters).</li>
          <li><strong>Marks</strong> (8.25 out of 10).</li>
        </ul>
        
        <h4>🔍 Key Facts:</h4>
        <ul>
          <li>Decimal point separates whole part from fractional part</li>
          <li>Each place after decimal: tenths, hundredths, thousandths...</li>
          <li>0.25 = 25/100 (twenty-five hundredths)</li>
          <li>0.5 = 5/10 = 1/2 (five tenths)</li>
        </ul>
        
        <h4>🌍 Common Examples:</h4>
        <ul>
          <li>💰 <strong>Money:</strong> ₹12.50 (12 rupees and 50 paise)</li>
          <li>📏 <strong>Measurement:</strong> 5.75 meters, 2.3 kilometers</li>
          <li>⚖️ <strong>Weight:</strong> 2.3 kilograms, 65.5 kg</li>
          <li>🌡️ <strong>Temperature:</strong> 36.5°C, 98.6°F</li>
          <li>⏱️ <strong>Time:</strong> 2.5 hours = 2 hours 30 minutes</li>
          <li>📊 <strong>Scores:</strong> 8.75 out of 10, 95.5%</li>
        </ul>
        
        <div style="background: #eff6ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h4>💡 Remember:</h4>
          <p>Decimals are just another way to write fractions - they represent the same values!</p>
        </div>
      `,
      order: 5
    },
    {
      id: 'number_line',
      title: 'Number Line',
      contentHTML: `
        <h3>Number Line: Numbers on a Line</h3>
        <p>A number line is a visual way to show numbers as points on a straight line. It helps us understand the order and relationship between numbers.</p>
        
        <div style="background: #eff6ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h4>🔍 How it works:</h4>
          <ul>
            <li>Numbers increase from left to right</li>
            <li>Zero is in the middle</li>
            <li>Positive numbers are to the right of zero</li>
            <li>Negative numbers are to the left of zero</li>
            <li>Equal spacing between consecutive integers</li>
          </ul>
        </div>
        
        <p><strong>Using the number line:</strong></p>
        <ul>
          <li>📍 Finding numbers: locate any number on the line</li>
          <li>📏 Comparing: numbers to the right are bigger</li>
          <li>➕ Adding: move right on the line</li>
          <li>➖ Subtracting: move left on the line</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0; font-family: monospace;">
          <strong>...  -3  -2  -1   0   1   2   3  ...</strong>
        </div>
      `,
      order: 6
    },
    {
      id: 'place_value',
      title: 'Place Value System',
      contentHTML: `
        <h3>Place Value System: Understanding Number Positions</h3>
        <p>The place value system helps us understand what each digit in a number represents based on its position.</p>
        
        <div style="background: #fef7ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h4>Example: 2,347</h4>
          <ul>
            <li><strong>2</strong> is in the thousands place (2,000)</li>
            <li><strong>3</strong> is in the hundreds place (300)</li>
            <li><strong>4</strong> is in the tens place (40)</li>
            <li><strong>7</strong> is in the ones place (7)</li>
          </ul>
          <p><strong>Total:</strong> 2,000 + 300 + 40 + 7 = 2,347</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h4>🔍 Key Facts:</h4>
          <ul>
            <li>Each position has 10 times the value of the position to its right</li>
            <li>This is called a base-10 or decimal system</li>
            <li>Place values: ones, tens, hundreds, thousands, ten thousands...</li>
            <li>Same system works for decimals: tenths, hundredths, thousandths...</li>
          </ul>
        </div>
        
        <p><strong>Why is this important?</strong></p>
        <ul>
          <li>💰 Understanding money: $1,234.56</li>
          <li>📏 Reading measurements: 12.34 meters</li>
          <li>🔢 Large numbers: 1,000,000 (one million)</li>
        </ul>
      `,
      order: 7
    }
  ],
  
  mcqs: [
    {
      id: 'q1',
      question: 'Which of these is a natural number?',
      options: ['0', '–2', '5', '4.5'],
      correctIndex: 2,
      explanation: 'Natural numbers are the basic counting numbers: 1, 2, 3, 4, 5... They do not include 0, negative numbers, or decimals.',
      order: 0
    },
    {
      id: 'q2',
      question: 'Whole numbers start from:',
      options: ['–1', '0', '1', '10'],
      correctIndex: 1,
      explanation: 'Whole numbers include all natural numbers plus zero, so they start from 0: {0, 1, 2, 3, 4, ...}',
      order: 1
    },
    {
      id: 'q3',
      question: 'Which of the following is an integer?',
      options: ['4.5', '–7', '½', '0.25'],
      correctIndex: 1,
      explanation: 'Integers include positive numbers, negative numbers, and zero. –7 is a negative integer. The other options are fractions or decimals.',
      order: 2
    },
    {
      id: 'q4',
      question: 'Which of the following is a fraction?',
      options: ['25', '–3', '¾', '0.5'],
      correctIndex: 2,
      explanation: '¾ is a fraction representing three parts out of four equal parts. It shows a part of a whole.',
      order: 3
    },
    {
      id: 'q5',
      question: 'The temperature changed from 5°C to –3°C. How much did it fall?',
      options: ['5°C', '8°C', '3°C', '2°C'],
      correctIndex: 1,
      explanation: 'From +5°C to –3°C: 5 – (–3) = 5 + 3 = 8°C. The temperature dropped by 8 degrees.',
      order: 4
    },
    {
      id: 'q6',
      question: 'What is ½ written as a decimal?',
      options: ['0.25', '0.5', '0.75', '1.5'],
      correctIndex: 1,
      explanation: '½ = 1 ÷ 2 = 0.5. Half of something is the same as 0.5 (five tenths).',
      order: 5
    },
    {
      id: 'q7',
      question: 'In the number 7,452, the digit at the hundreds place is:',
      options: ['5', '4', '2', '7'],
      correctIndex: 1,
      explanation: 'In 7,452: 7 is thousands, 4 is hundreds, 5 is tens, 2 is ones. So 4 is in the hundreds place.',
      order: 6
    },
    {
      id: 'q8',
      question: 'On a number line, which number is to the left of –1?',
      options: ['0', '–2', '1', '–0.5'],
      correctIndex: 1,
      explanation: 'On a number line, numbers decrease as you move left. –2 is to the left of –1, making it smaller.',
      order: 7
    },
    {
      id: 'q9',
      question: 'You ate 3 out of 8 equal slices of cake. What fraction of the cake did you eat?',
      options: ['3/8', '5/8', '8/3', '3/5'],
      correctIndex: 0,
      explanation: 'You ate 3 slices out of 8 total slices, so the fraction is 3/8 (three-eighths of the cake).',
      order: 8
    },
    {
      id: 'q10',
      question: 'Which is greater: 0.75 or ¾?',
      options: ['0.75', '¾', 'Both are equal', 'Cannot compare'],
      correctIndex: 2,
      explanation: '¾ = 3 ÷ 4 = 0.75. So 0.75 and ¾ represent exactly the same value - they are equal!',
      order: 9
    }
  ]
}

// Function to seed the Number System lesson data
export async function seedNumberSystemLesson() {
  try {
    const { courseId, lessonId, sections, mcqs } = numberSystemSeedData
    
    console.log('🌱 Starting to seed Number System lesson data...')
    
    const batch = writeBatch(db)
    
    // Add sections
    sections.forEach(section => {
      const sectionRef = doc(collection(db, `courses/${courseId}/lessons/${lessonId}/sections`), section.id)
      batch.set(sectionRef, section)
    })
    
    // Add MCQs
    mcqs.forEach(mcq => {
      const mcqRef = doc(collection(db, `courses/${courseId}/lessons/${lessonId}/mcqs`), mcq.id)
      batch.set(mcqRef, mcq)
    })
    
    await batch.commit()
    
    console.log('✅ Number System lesson seeded successfully!')
    console.log(`📚 Added ${sections.length} sections and ${mcqs.length} MCQs`)
    
    return {
      success: true,
      sectionsAdded: sections.length,
      mcqsAdded: mcqs.length
    }
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export default seedNumberSystemLesson