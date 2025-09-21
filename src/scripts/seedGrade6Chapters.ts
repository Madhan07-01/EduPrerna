import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAESRjN11EuOeLlkFlGGX5DNJoqbgHZl4",
  authDomain: "eduprerna-43718.firebaseapp.com",
  projectId: "eduprerna-43718",
  storageBucket: "eduprerna-43718.appspot.com",
  messagingSenderId: "75188580452",
  appId: "1:75188580452:web:bcefb1d76beac55e092f71",
  measurementId: "G-GD1YFQFHYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Chapter 1 - Number Systems
const chapter1Data = {
  title: "Chapter 1 - Number Systems",
  subtopics: [
    {
      title: "Introduction",
      content: `
        <h2>📘 EduPrerna Module – Number System (Grade 6)</h2>
        <h3>🌟 Introduction</h3>
        <p>Numbers are part of our daily life — we use them to count, measure, and compare. Whether it's knowing the time, checking the temperature, or scoring marks in an exam, numbers are always there.</p>
        <p>But numbers come in different types: whole numbers, integers, fractions, and decimals. Together, these types form the Number System — the foundation of all mathematics.</p>
      `
    },
    {
      title: "Core Concepts",
      content: `
        <h3>📖 Core Concepts</h3>
        
        <h4>1. Natural Numbers (N)</h4>
        <ul>
          <li>These are the <strong>basic counting numbers</strong>: 1, 2, 3, 4, …</li>
          <li>We use them to <strong>count things</strong> like books, pens, or students.</li>
          <li>Example: There are <strong>5 oranges</strong> on the table.</li>
          <li><strong>Important Note:</strong> Natural numbers <strong>do not include zero</strong>.</li>
        </ul>
        
        <hr>
        
        <h4>2. Whole Numbers (W)</h4>
        <ul>
          <li>Whole numbers = <strong>Natural numbers + Zero</strong>.</li>
          <li>So, W = {0, 1, 2, 3, …}.</li>
          <li>Example: Number of chocolates left in a box can be <strong>0</strong>.</li>
          <li>Whole numbers are useful when we need to represent "nothing" (like 0 pencils).</li>
        </ul>
        
        <hr>
        
        <h4>3. Integers (Z)</h4>
        <ul>
          <li>Integers include <strong>positive numbers, negative numbers, and zero</strong>.</li>
          <li>Example:
            <ul>
              <li>+10 = You gained 10 marks bonus.</li>
              <li>-5 = You lost 5 points in a game.</li>
              <li>0 = No change.</li>
            </ul>
          </li>
          <li>Integers are very useful in <strong>real life</strong>:
            <ul>
              <li>Temperature (–3°C, +30°C).</li>
              <li>Bank accounts (–₹500 means you owe money).</li>
              <li>Lifts in a building (Basement = –1, Ground = 0, First floor = +1).</li>
            </ul>
          </li>
        </ul>
        
        <hr>
        
        <h4>4. Fractions</h4>
        <ul>
          <li>A fraction represents a <strong>part of a whole</strong>.</li>
          <li>Written as a/b where a = numerator (part), b = denominator (whole).</li>
          <li>Example:
            <ul>
              <li>½ → Half of a cake.</li>
              <li>¾ → Three slices out of four.</li>
            </ul>
          </li>
          <li>Fractions are widely used in:
            <ul>
              <li>Cooking (½ teaspoon of salt).</li>
              <li>Time (¼ of an hour = 15 minutes).</li>
              <li>Sharing (dividing a pizza among friends).</li>
            </ul>
          </li>
        </ul>
        
        <hr>
        
        <h4>5. Decimals</h4>
        <ul>
          <li>Fractions can also be written using a <strong>dot (.)</strong>, called a decimal point.</li>
          <li>Example:
            <ul>
              <li>½ = 0.5</li>
              <li>¾ = 0.75</li>
            </ul>
          </li>
          <li>Real-life uses of decimals:
            <ul>
              <li>Money (₹2.50).</li>
              <li>Length (1.75 meters).</li>
              <li>Marks (8.25 out of 10).</li>
            </ul>
          </li>
        </ul>
        
        <hr>
        
        <h4>6. Number Line</h4>
        <ul>
          <li>A <strong>number line</strong> helps us visualize numbers.</li>
          <li>Zero is at the center, positive numbers go to the right, and negative numbers go to the left.</li>
          <li>Example: –3, –2, –1, 0, 1, 2, 3.</li>
          <li>Useful for addition, subtraction, and comparing numbers.</li>
        </ul>
        
        <hr>
        
        <h4>7. Place Value System</h4>
        <ul>
          <li>Every digit in a number has a <strong>place</strong> (ones, tens, hundreds, thousands).</li>
          <li>Example: In 4,562:
            <ul>
              <li>2 → Ones place.</li>
              <li>6 → Tens place.</li>
              <li>5 → Hundreds place.</li>
              <li>4 → Thousands place.</li>
            </ul>
          </li>
          <li>This system helps us read and write <strong>large numbers</strong>.</li>
        </ul>
      `
    }
  ],
  quiz: {
    questions: [
      {
        question: "Which of these is a natural number?",
        options: ["0", "–2", "5"],
        answer: "5",
        explanation: "Natural numbers are the basic counting numbers: 1, 2, 3, 4, … They start from 1 and do not include zero or negative numbers."
      },
      {
        question: "Whole numbers start from:",
        options: ["–1", "0", "1"],
        answer: "0",
        explanation: "Whole numbers include all natural numbers plus zero. So they start from 0: {0, 1, 2, 3, …}."
      },
      {
        question: "Which of the following is an integer?",
        options: ["4.5", "–7", "½"],
        answer: "–7",
        explanation: "Integers include positive numbers, negative numbers, and zero. They do not include fractions or decimals. –7 is a negative integer."
      },
      {
        question: "Which of the following is a fraction?",
        options: ["25", "–3", "¾"],
        answer: "¾",
        explanation: "A fraction represents a part of a whole and is written as a/b where a is the numerator and b is the denominator. ¾ is a fraction."
      },
      {
        question: "The temperature changed from 5°C to –3°C. How much did it fall?",
        options: ["5°C", "8°C", "3°C"],
        answer: "8°C",
        explanation: "To find the temperature fall, calculate the difference: 5 - (–3) = 5 + 3 = 8°C."
      },
      {
        question: "What is ½ written as a decimal?",
        options: ["0.25", "0.5", "0.75"],
        answer: "0.5",
        explanation: "½ is equal to 1 divided by 2, which equals 0.5 in decimal form."
      },
      {
        question: "In the number 7,452, the digit at the hundreds place is:",
        options: ["5", "4", "2"],
        answer: "4",
        explanation: "In the number 7,452: 2 is in the ones place, 5 is in the tens place, 4 is in the hundreds place, and 7 is in the thousands place."
      },
      {
        question: "On a number line, which number is to the left of –1?",
        options: ["0", "–2", "1"],
        answer: "–2",
        explanation: "On a number line, numbers decrease as we move to the left. Since –2 is less than –1, it is to the left of –1."
      },
      {
        question: "You ate 3 out of 8 equal slices of cake. What fraction of the cake did you eat?",
        options: ["3/8", "5/8", "8/3"],
        answer: "3/8",
        explanation: "If you ate 3 slices out of 8 total slices, the fraction is 3/8."
      },
      {
        question: "Which is greater?",
        options: ["0.75", "¾", "Both are equal"],
        answer: "Both are equal",
        explanation: "0.75 and ¾ are different representations of the same value. ¾ = 3÷4 = 0.75."
      }
    ]
  }
};

// Chapter 2 - Operations on Whole Numbers
const chapter2Data = {
  title: "Chapter 2 - Operations on Whole Numbers",
  subtopics: [
    {
      title: "Introduction",
      content: `
        <h2>📘 EduPrerna Module – Operations on Whole Numbers (Grade 6)</h2>
        <h3>🌟 Introduction</h3>
        <p>Whole numbers are numbers that start from 0 and go on without end: 0, 1, 2, 3, 4, …</p>
        <p>We use them for counting, measuring, and solving real-life problems. To work with them, we perform operations like addition, subtraction, multiplication, and division. These operations make numbers meaningful in daily life — from adding money, subtracting expenses, multiplying quantities, to dividing things equally.</p>
      `
    },
    {
      title: "Core Concepts",
      content: `
        <h3>📖 Core Concepts</h3>
        
        <h4>1. Addition of Whole Numbers</h4>
        <p>To combine or put together numbers.</p>
        <p>Example: 35 + 28 = 63.</p>
        <p>Properties of Addition:</p>
        <ul>
          <li><strong>Closure:</strong> Sum of two whole numbers is always a whole number.</li>
          <li><strong>Commutative:</strong> a + b = b + a.</li>
          <li><strong>Associative:</strong> (a + b) + c = a + (b + c).</li>
          <li><strong>Identity:</strong> a + 0 = a.</li>
        </ul>
        
        <h4>2. Subtraction of Whole Numbers</h4>
        <p>To find the difference between numbers.</p>
        <p>Example: 82 – 47 = 35.</p>
        <p>Properties of Subtraction:</p>
        <ul>
          <li><strong>Not commutative</strong> → a – b ≠ b – a.</li>
          <li><strong>Not associative.</strong></li>
          <li>If a ≥ b, then a – b is a whole number.</li>
        </ul>
        
        <h4>3. Multiplication of Whole Numbers</h4>
        <p>Repeated addition.</p>
        <p>Example: 12 × 5 = 60.</p>
        <p>Properties of Multiplication:</p>
        <ul>
          <li><strong>Closure:</strong> Product is always a whole number.</li>
          <li><strong>Commutative:</strong> a × b = b × a.</li>
          <li><strong>Associative:</strong> (a × b) × c = a × (b × c).</li>
          <li><strong>Identity:</strong> a × 1 = a.</li>
          <li><strong>Multiplication by zero:</strong> a × 0 = 0.</li>
        </ul>
        
        <h4>4. Division of Whole Numbers</h4>
        <p>Splitting into equal parts.</p>
        <p>Example: 20 ÷ 4 = 5.</p>
        <p>Properties of Division:</p>
        <ul>
          <li><strong>Not commutative.</strong></li>
          <li><strong>Not associative.</strong></li>
          <li>Division by zero is not defined.</li>
          <li>a ÷ 1 = a.</li>
        </ul>
        
        <h4>5. Order of Operations (BODMAS Rule)</h4>
        <p>Brackets → Orders (powers) → Division → Multiplication → Addition → Subtraction.</p>
        <p>Example: 15 – (3 × 2) + 4 = 15 – 6 + 4 = 13.</p>
      `
    }
  ],
  quiz: {
    questions: [
      {
        question: "Which of these is a whole number?",
        options: ["–4", "3.5", "0"],
        answer: "0",
        explanation: "Whole numbers start from 0 and include all natural numbers: {0, 1, 2, 3, …}. They do not include negative numbers or decimals."
      },
      {
        question: "45 + 27 = ?",
        options: ["62", "72", "73"],
        answer: "72",
        explanation: "Adding 45 and 27: 45 + 27 = 72."
      },
      {
        question: "Which property is shown by 23 + 0 = 23?",
        options: ["Commutative", "Identity", "Closure"],
        answer: "Identity",
        explanation: "The identity property of addition states that adding zero to any number gives the same number. Here, 23 + 0 = 23."
      },
      {
        question: "81 – 46 = ?",
        options: ["45", "35", "36"],
        answer: "35",
        explanation: "Subtracting 46 from 81: 81 - 46 = 35."
      },
      {
        question: "Which of these is true for subtraction?",
        options: ["a – b = b – a", "(a – b) – c = a – (b – c)", "a – b ≠ b – a"],
        answer: "a – b ≠ b – a",
        explanation: "Subtraction is not commutative, meaning the order matters. For example, 5 - 3 = 2, but 3 - 5 = -2. So a - b ≠ b - a."
      },
      {
        question: "12 × 9 = ?",
        options: ["101", "108", "109"],
        answer: "108",
        explanation: "Multiplying 12 by 9: 12 × 9 = 108."
      },
      {
        question: "Which property is shown by (4 × 5) × 2 = 4 × (5 × 2)?",
        options: ["Closure", "Associative", "Commutative"],
        answer: "Associative",
        explanation: "The associative property of multiplication states that the grouping of numbers does not change the product. (4 × 5) × 2 = 20 × 2 = 40, and 4 × (5 × 2) = 4 × 10 = 40."
      },
      {
        question: "0 × 245 = ?",
        options: ["1", "0", "245"],
        answer: "0",
        explanation: "Any number multiplied by zero equals zero. This is the multiplication property of zero."
      },
      {
        question: "56 ÷ 7 = ?",
        options: ["8", "9", "7"],
        answer: "8",
        explanation: "Dividing 56 by 7: 56 ÷ 7 = 8."
      },
      {
        question: "Apply BODMAS: 20 – (3 × 4) + 5 = ?",
        options: ["13", "17", "9"],
        answer: "13",
        explanation: "Using BODMAS rule: First solve brackets (3 × 4 = 12), then subtraction and addition from left to right: 20 - 12 + 5 = 8 + 5 = 13."
      }
    ]
  }
};

// Chapter 3 - Integers
const chapter3Data = {
  title: "Chapter 3 - Integers",
  subtopics: [
    {
      title: "Introduction",
      content: `
        <h2>Integers – Learning Module (Grade 6)</h2>
        <h3>Introduction</h3>
        <p>Integers are numbers that can be positive, negative, or zero. They do not include fractions or decimals. Integers help us represent quantities that have opposite directions or opposite values, such as gaining or losing money, rising above or falling below sea level, or temperature changes.</p>
        <p>Understanding integers is important because they are widely used in daily life, mathematics, and computer science.</p>
        <p>Examples of integers:</p>
        <ul>
          <li>Positive integers: 1, 2, 3, 10, 100</li>
          <li>Negative integers: -1, -2, -5, -50</li>
          <li>Zero: 0</li>
        </ul>
        <p>Note: Zero is neither positive nor negative.</p>
      `
    },
    {
      title: "Core Concepts",
      content: `
        <h3>Core Concepts</h3>
        
        <h4>1. Representation of Integers</h4>
        <ul>
          <li>Integers are represented on a number line.</li>
          <li>Positive integers are on the right side of zero.</li>
          <li>Negative integers are on the left side of zero.</li>
          <li>Zero is at the center.</li>
          <li>Example: -3  -2  -1   0   1   2   3</li>
        </ul>
        
        <h4>2. Comparing Integers</h4>
        <ul>
          <li>Positive numbers are always greater than negative numbers.</li>
          <li>Among positive numbers: bigger number → bigger value.</li>
          <li>Among negative numbers: bigger absolute value → smaller number.</li>
          <li>Examples:
            <ul>
              <li>5 > -3</li>
              <li>-2 > -5</li>
              <li>0 > -4</li>
            </ul>
          </li>
        </ul>
        
        <h4>3. Addition of Integers</h4>
        <p>Rules:</p>
        <ul>
          <li>Same signs → add absolute values, keep the sign.</li>
          <li>Example: 3 + 5 = 8, (-3) + (-5) = -8</li>
          <li>Different signs → subtract smaller absolute value from larger, take the sign of larger.</li>
          <li>Example: 7 + (-4) = 3, (-8) + 3 = -5</li>
        </ul>
        
        <h4>4. Subtraction of Integers</h4>
        <p>Subtraction can be rewritten as addition of the opposite.</p>
        <p>a - b = a + (-b)</p>
        <p>Examples:</p>
        <ul>
          <li>5 - 3 = 5 + (-3) = 2</li>
          <li>-2 - 4 = -2 + (-4) = -6</li>
        </ul>
        
        <h4>5. Multiplication of Integers</h4>
        <p>Rules:</p>
        <ul>
          <li>Same signs → positive result</li>
          <li>3 × 4 = 12, (-3) × (-4) = 12</li>
          <li>Different signs → negative result</li>
          <li>(-3) × 4 = -12, 3 × (-4) = -12</li>
        </ul>
        
        <h4>6. Division of Integers</h4>
        <p>Rules:</p>
        <ul>
          <li>Same signs → positive quotient</li>
          <li>Different signs → negative quotient</li>
        </ul>
        <p>Examples:</p>
        <ul>
          <li>12 ÷ 3 = 4, (-12) ÷ (-3) = 4</li>
          <li>(-12) ÷ 3 = -4, 12 ÷ (-3) = -4</li>
        </ul>
        
        <h4>7. Absolute Value</h4>
        <p>The absolute value of a number is its distance from 0 on the number line.</p>
        <p>Denoted as |a|</p>
        <p>Examples: |3| = 3, |-5| = 5</p>
      `
    }
  ],
  quiz: {
    questions: [
      {
        question: "Which of the following is a negative integer?",
        options: ["0", "5", "-8", "12"],
        answer: "-8",
        explanation: "Negative integers are numbers less than zero. Among the options, only -8 is negative."
      },
      {
        question: "What is the sum of -7 and 5?",
        options: ["12", "-2", "2", "-12"],
        answer: "-2",
        explanation: "To add integers with different signs, subtract the smaller absolute value from the larger one and take the sign of the number with the larger absolute value. |-7| = 7, |5| = 5. Since 7 > 5, we subtract: 7 - 5 = 2, and take the negative sign: -2."
      },
      {
        question: "Which integer is greater?",
        options: ["-3", "-7", "-1", "-5"],
        answer: "-1",
        explanation: "Among negative integers, the one with the smallest absolute value is the greatest. |-1| = 1, |-3| = 3, |-5| = 5, |-7| = 7. Since 1 is the smallest absolute value, -1 is the greatest."
      },
      {
        question: "Find: (-4) × 6 = ?",
        options: ["24", "-24", "10", "-10"],
        answer: "-24",
        explanation: "When multiplying integers with different signs, the result is negative. (-4) × 6 = -24."
      },
      {
        question: "Find: 15 ÷ (-3) = ?",
        options: ["5", "-5", "-45", "45"],
        answer: "-5",
        explanation: "When dividing integers with different signs, the result is negative. 15 ÷ (-3) = -5."
      },
      {
        question: "The absolute value of -12 is:",
        options: ["-12", "0", "12", "-1"],
        answer: "12",
        explanation: "The absolute value of a number is its distance from zero on the number line, which is always positive. |-12| = 12."
      },
      {
        question: "Which of the following integers is not negative?",
        options: ["-10", "-1", "0", "-7"],
        answer: "0",
        explanation: "Zero is neither positive nor negative. All other options are negative integers."
      },
      {
        question: "Evaluate: 8 - (-3) = ?",
        options: ["5", "11", "-11", "-5"],
        answer: "11",
        explanation: "Subtracting a negative number is the same as adding the positive counterpart. 8 - (-3) = 8 + 3 = 11."
      },
      {
        question: "Which of the following is true?",
        options: ["-8 > 5", "-3 < -7", "0 < -1", "-2 > -5"],
        answer: "-2 > -5",
        explanation: "Positive numbers are always greater than negative numbers, so -8 > 5 is false. Among negative numbers, the one with smaller absolute value is greater. |-3| = 3 and |-7| = 7, so -3 > -7, making -3 < -7 false. Zero is greater than any negative number, so 0 < -1 is false. |-2| = 2 and |-5| = 5, so -2 > -5 is true."
      },
      {
        question: "The sum of two integers with different signs is always:",
        options: ["Positive", "Negative", "Zero or sign of the number with bigger absolute value", "None of these"],
        answer: "Zero or sign of the number with bigger absolute value",
        explanation: "When adding integers with different signs, we subtract the smaller absolute value from the larger one and take the sign of the number with the larger absolute value. For example: 7 + (-4) = 3 (positive because |7| > |-4|), and (-8) + 3 = -5 (negative because |-8| > |3|). If the absolute values are equal, the sum is zero: 5 + (-5) = 0."
      }
    ]
  }
};

async function seedGrade6Chapters() {
  try {
    console.log('Seeding Grade 6 chapters with subtopics and quizzes...');
    
    // Seed Chapter 1
    const chapter1Ref = doc(db, 'courses', 'mathematics', 'lessons', 'lesson_content_to_learn', 'grade6', 'chapter1');
    await setDoc(chapter1Ref, chapter1Data);
    console.log('✓ Chapter 1 - Number Systems seeded successfully');
    
    // Seed Chapter 2
    const chapter2Ref = doc(db, 'courses', 'mathematics', 'lessons', 'lesson_content_to_learn', 'grade6', 'chapter2');
    await setDoc(chapter2Ref, chapter2Data);
    console.log('✓ Chapter 2 - Operations on Whole Numbers seeded successfully');
    
    // Seed Chapter 3
    const chapter3Ref = doc(db, 'courses', 'mathematics', 'lessons', 'lesson_content_to_learn', 'grade6', 'chapter3');
    await setDoc(chapter3Ref, chapter3Data);
    console.log('✓ Chapter 3 - Integers seeded successfully');
    
    console.log('\n✅ All Grade 6 chapters seeded successfully with subtopics and quizzes!');
    console.log('Structure created:');
    console.log('/courses/mathematics/lessons/lesson_content_to_learn/grade6/');
    console.log('   ├── chapter1 (with subtopics and quiz)');
    console.log('   ├── chapter2 (with subtopics and quiz)');
    console.log('   └── chapter3 (with subtopics and quiz)');
    
  } catch (error) {
    console.error('❌ Error seeding Grade 6 chapters:', (error as Error).message);
    process.exit(1);
  }
}

// Run the seeding function
seedGrade6Chapters().then(() => {
  console.log('Script completed successfully.');
  process.exit(0);
}).catch((error) => {
  console.error('Script failed with error:', error);
  process.exit(1);
});