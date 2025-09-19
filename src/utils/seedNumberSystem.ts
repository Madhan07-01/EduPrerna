import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import type { Lesson } from '../types/lesson';

// Complete Number System lesson data
const numberSystemLessonData: Omit<Lesson, 'createdAt' | 'updatedAt'> = {
  id: 'numberSystem_grade6',
  title: 'Number System',
  grade: 6,
  subject: 'Mathematics',
  description: 'Understanding the foundation of all mathematics - the Number System',
  sections: [
    {
      id: 'introduction',
      title: '🌟 Introduction',
      content: `
        <h2>📘 EduPrerna Module – Number System (Grade 6)</h2>
        <p>Numbers are part of our daily life — we use them to <strong>count, measure, and compare</strong>. Whether it's knowing the time, checking the temperature, or scoring marks in an exam, numbers are always there.</p>
        <p>But numbers come in different types: <strong>whole numbers, integers, fractions, and decimals</strong>. Together, these types form the <strong>Number System</strong> — the foundation of all mathematics.</p>
        <p><em>Let's explore this fascinating world of numbers!</em></p>
      `,
      mcqs: [], // No MCQs for introduction
      order: 0
    },
    {
      id: 'naturalNumbers',
      title: '1. Natural Numbers (ℕ)',
      content: `
        <h3>Natural Numbers (ℕ)</h3>
        <ul>
          <li>These are the <strong><em>basic counting numbers</em></strong>: 1, 2, 3, 4, …</li>
          <li>We use them to <strong><em>count things</em></strong> like books, pens, or students.</li>
          <li><strong>Example:</strong> There are <em>5 oranges</em> on the table.</li>
          <li><strong><em>Important Note:</em></strong> Natural numbers <em>do not include zero</em>.</li>
        </ul>
      `,
      mcqs: [
        {
          id: 'nat_q1',
          question: 'Which of these is a natural number?',
          options: ['0', '–2', '5'],
          correctAnswer: 2,
          explanation: 'Natural numbers are counting numbers: 1, 2, 3, 4, 5... They do not include 0 or negative numbers.'
        },
        {
          id: 'nat_q2',
          question: 'Natural numbers start from:',
          options: ['0', '1', '–1'],
          correctAnswer: 1,
          explanation: 'Natural numbers start from 1 and continue: 1, 2, 3, 4, 5...'
        },
        {
          id: 'nat_q3',
          question: 'How many natural numbers are there between 1 and 5?',
          options: ['3', '4', '5'],
          correctAnswer: 0,
          explanation: 'Between 1 and 5 (excluding 1 and 5): 2, 3, 4. So there are 3 natural numbers.'
        }
      ],
      order: 1
    },
    {
      id: 'wholeNumbers',
      title: '2. Whole Numbers (W)',
      content: `
        <h3>Whole Numbers (W)</h3>
        <ul>
          <li>Whole numbers = <strong><em>Natural numbers + Zero</em></strong>.</li>
          <li>So, <strong>W = {0, 1, 2, 3, …}</strong>.</li>
          <li><strong>Example:</strong> Number of chocolates left in a box can be <em>0</em>.</li>
          <li>Whole numbers are useful when we need to represent "nothing" (like 0 pencils).</li>
        </ul>
      `,
      mcqs: [
        {
          id: 'whole_q1',
          question: 'Whole numbers start from:',
          options: ['–1', '0', '1'],
          correctAnswer: 1,
          explanation: 'Whole numbers include all natural numbers plus zero, so they start from 0.'
        },
        {
          id: 'whole_q2',
          question: 'Which is NOT a whole number?',
          options: ['0', '5', '–3'],
          correctAnswer: 2,
          explanation: 'Whole numbers are 0, 1, 2, 3, 4... Negative numbers are not whole numbers.'
        },
        {
          id: 'whole_q3',
          question: 'The smallest whole number is:',
          options: ['0', '1', '–1'],
          correctAnswer: 0,
          explanation: 'Zero (0) is the smallest whole number.'
        }
      ],
      order: 2
    },
    {
      id: 'integers',
      title: '3. Integers (ℤ)',
      content: `
        <h3>Integers (ℤ)</h3>
        <ul>
          <li>Integers include <strong><em>positive numbers, negative numbers, and zero</em></strong>.</li>
          <li><strong>Example:</strong>
            <ul>
              <li>+10 = You gained 10 marks bonus.</li>
              <li>-5 = You lost 5 points in a game.</li>
              <li>0 = No change.</li>
            </ul>
          </li>
          <li>Integers are useful in:
            <ul>
              <li><strong>Temperature</strong> (–3°C, +30°C)</li>
              <li><strong>Bank accounts</strong> (–₹500 means you owe money)</li>
              <li><strong>Lifts in a building</strong> (Basement = –1, Ground = 0, First floor = +1)</li>
            </ul>
          </li>
        </ul>
      `,
      mcqs: [
        {
          id: 'int_q1',
          question: 'Which of the following is an integer?',
          options: ['4.5', '–7', '½'],
          correctAnswer: 1,
          explanation: 'Integers include positive numbers, negative numbers, and zero. –7 is a negative integer.'
        },
        {
          id: 'int_q2',
          question: 'The temperature changed from 5°C to –3°C. How much did it fall?',
          options: ['5°C', '8°C', '3°C'],
          correctAnswer: 1,
          explanation: 'From +5°C to –3°C: 5 – (–3) = 5 + 3 = 8°C fall.'
        },
        {
          id: 'int_q3',
          question: 'On a number line, which number is to the left of –1?',
          options: ['0', '–2', '1'],
          correctAnswer: 1,
          explanation: 'On a number line, numbers decrease as you move left. –2 is to the left of –1.'
        }
      ],
      order: 3
    },
    {
      id: 'fractions',
      title: '4. Fractions',
      content: `
        <h3>Fractions</h3>
        <ul>
          <li>A fraction represents a <strong><em>part of a whole</em></strong>.</li>
          <li>Written as a/b where a = numerator (part), b = denominator (whole).</li>
          <li><strong>Example:</strong>
            <ul>
              <li>½ → Half of a cake.</li>
              <li>¾ → Three slices out of four.</li>
            </ul>
          </li>
          <li>Fractions are used in:
            <ul>
              <li><strong>Cooking</strong> (½ teaspoon of salt)</li>
              <li><strong>Time</strong> (¼ of an hour = 15 minutes)</li>
              <li><strong>Sharing</strong> (dividing a pizza among friends)</li>
            </ul>
          </li>
        </ul>
      `,
      mcqs: [
        {
          id: 'frac_q1',
          question: 'Which of the following is a fraction?',
          options: ['25', '–3', '¾'],
          correctAnswer: 2,
          explanation: '¾ is a fraction representing three parts out of four equal parts.'
        },
        {
          id: 'frac_q2',
          question: 'You ate 3 out of 8 equal slices of cake. What fraction did you eat?',
          options: ['3/8', '5/8', '8/3'],
          correctAnswer: 0,
          explanation: 'You ate 3 slices out of 8 total slices, so the fraction is 3/8.'
        },
        {
          id: 'frac_q3',
          question: 'In the fraction 3/4, what is the denominator?',
          options: ['3', '4', '7'],
          correctAnswer: 1,
          explanation: 'In a fraction a/b, the denominator is the bottom number. In 3/4, the denominator is 4.'
        }
      ],
      order: 4
    },
    {
      id: 'decimals',
      title: '5. Decimals',
      content: `
        <h3>Decimals</h3>
        <ul>
          <li>Fractions can also be written using a <strong><em>dot (.)</em></strong>, called a decimal point.</li>
          <li><strong>Example:</strong>
            <ul>
              <li>½ = 0.5</li>
              <li>¾ = 0.75</li>
            </ul>
          </li>
          <li><strong>Real-life uses:</strong>
            <ul>
              <li><strong>Money</strong> (₹2.50)</li>
              <li><strong>Length</strong> (1.75 meters)</li>
              <li><strong>Marks</strong> (8.25 out of 10)</li>
            </ul>
          </li>
        </ul>
      `,
      mcqs: [
        {
          id: 'dec_q1',
          question: 'What is ½ written as a decimal?',
          options: ['0.25', '0.5', '0.75'],
          correctAnswer: 1,
          explanation: '½ = 1 ÷ 2 = 0.5'
        },
        {
          id: 'dec_q2',
          question: 'Which is greater: 0.75 or ¾?',
          options: ['0.75', '¾', 'Both are equal'],
          correctAnswer: 2,
          explanation: '¾ = 3 ÷ 4 = 0.75, so both are equal!'
        },
        {
          id: 'dec_q3',
          question: 'What is 1/4 as a decimal?',
          options: ['0.14', '0.25', '0.4'],
          correctAnswer: 1,
          explanation: '1/4 = 1 ÷ 4 = 0.25'
        }
      ],
      order: 5
    },
    {
      id: 'numberLine',
      title: '6. Number Line',
      content: `
        <h3>Number Line</h3>
        <ul>
          <li>A <strong><em>number line</em></strong> helps us visualize numbers.</li>
          <li>Zero is at the center, positive numbers go to the right, and negative numbers go to the left.</li>
          <li><strong>Example:</strong> –3, –2, –1, 0, 1, 2, 3.</li>
          <li>Useful for addition, subtraction, and comparing numbers.</li>
          <li>The farther right a number is, the greater it is.</li>
        </ul>
      `,
      mcqs: [
        {
          id: 'line_q1',
          question: 'On a number line, positive numbers are to the:',
          options: ['Left of zero', 'Right of zero', 'Above zero'],
          correctAnswer: 1,
          explanation: 'On a horizontal number line, positive numbers are to the right of zero.'
        },
        {
          id: 'line_q2',
          question: 'Which number is greater: –2 or –5?',
          options: ['–2', '–5', 'Both are equal'],
          correctAnswer: 0,
          explanation: 'On a number line, –2 is to the right of –5, so –2 is greater.'
        },
        {
          id: 'line_q3',
          question: 'What number comes between –1 and 1 on the number line?',
          options: ['2', '0', '–2'],
          correctAnswer: 1,
          explanation: 'Zero (0) is between –1 and 1 on the number line.'
        }
      ],
      order: 6
    },
    {
      id: 'placeValue',
      title: '7. Place Value System',
      content: `
        <h3>Place Value System</h3>
        <ul>
          <li>Every digit in a number has a <strong><em>place</em></strong> (ones, tens, hundreds, thousands).</li>
          <li><strong>Example:</strong> In 4,562:
            <ul>
              <li>2 → Ones place</li>
              <li>6 → Tens place</li>
              <li>5 → Hundreds place</li>
              <li>4 → Thousands place</li>
            </ul>
          </li>
          <li>Helps read and write <strong><em>large numbers</em></strong>.</li>
          <li>Each place is 10 times the place to its right.</li>
        </ul>
      `,
      mcqs: [
        {
          id: 'place_q1',
          question: 'In the number 7,452, the digit at the hundreds place is:',
          options: ['5', '4', '2'],
          correctAnswer: 1,
          explanation: 'In 7,452: 7 is thousands, 4 is hundreds, 5 is tens, 2 is ones.'
        },
        {
          id: 'place_q2',
          question: 'What is the place value of 8 in 1,847?',
          options: ['Ones', 'Tens', 'Hundreds'],
          correctAnswer: 2,
          explanation: 'In 1,847: 1 is thousands, 8 is hundreds, 4 is tens, 7 is ones.'
        },
        {
          id: 'place_q3',
          question: 'How do you write "three thousand four hundred twenty-one" in numbers?',
          options: ['3,421', '3,412', '3,241'],
          correctAnswer: 0,
          explanation: 'Three thousand (3,000) + four hundred (400) + twenty-one (21) = 3,421'
        }
      ],
      order: 7
    }
  ]
};

// Function to seed the Number System lesson into Firestore
export async function seedNumberSystemLesson(): Promise<void> {
  try {
    console.log('🌱 Starting to seed Number System lesson...');
    
    const lessonRef = doc(collection(db, 'lessons'), numberSystemLessonData.id);
    
    const lessonDataWithTimestamp: Lesson = {
      ...numberSystemLessonData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await setDoc(lessonRef, lessonDataWithTimestamp, { merge: true });
    
    console.log('✅ Number System lesson seeded successfully!');
    console.log(`📚 Lesson ID: ${numberSystemLessonData.id}`);
    console.log(`📖 Sections: ${numberSystemLessonData.sections.length}`);
    console.log(`❓ Total MCQs: ${numberSystemLessonData.sections.reduce((total, section) => total + section.mcqs.length, 0)}`);
    
  } catch (error) {
    console.error('❌ Error seeding Number System lesson:', error);
    throw error;
  }
}

// Function to check if lesson exists
export async function checkLessonExists(lessonId: string): Promise<boolean> {
  try {
    const lessonRef = doc(db, 'lessons', lessonId);
    const lessonSnap = await import('firebase/firestore').then(({ getDoc }) => getDoc(lessonRef));
    return lessonSnap.exists();
  } catch (error) {
    console.error('Error checking lesson existence:', error);
    return false;
  }
}