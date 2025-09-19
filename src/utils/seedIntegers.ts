import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import type { Lesson } from '../types/lesson';

// Complete Integers lesson data for Grade 7
const integersLessonData: Omit<Lesson, 'createdAt' | 'updatedAt'> = {
  id: 'integers_grade7',
  title: 'Learning Module – Integers',
  grade: 7,
  subject: 'Mathematics',
  description: 'Understanding integers, their operations, and real-world applications',
  sections: [
    {
      id: 'introduction',
      title: '🌟 Introduction',
      content: `
        <h2>📘 Learning Module – Integers (Grade 7)</h2>
        <p>In mathematics, we often deal with numbers greater than zero, like 1, 2, 3, etc., which are called <strong>natural numbers</strong>.</p>
        <p>However, in real life, we also encounter numbers that are <strong>less than zero</strong>. For example:</p>
        <ul>
          <li>The temperature in some places can be <strong>–5 °C</strong>.</li>
          <li>In a game, if you lose 10 points, your score may become <strong>negative</strong>.</li>
          <li>When withdrawing money from a bank, your account balance might drop below zero, showing <strong>negative balance</strong>.</li>
        </ul>
        <p>To handle such situations, we use <strong><em>integers</em></strong>.</p>
        <p><strong>Integers include both positive numbers, negative numbers, and zero.</strong></p>
      `,
      mcqs: [], // No MCQs for introduction
      order: 0
    },
    {
      id: 'definition',
      title: '1. Definition of Integers',
      content: `
        <h3>Definition of Integers</h3>
        <ul>
          <li>Integers are the set of <strong>whole numbers and their negatives</strong>.</li>
          <li>Written as:<br><strong>Integers = {..., –4, –3, –2, –1, 0, 1, 2, 3, 4, ...}</strong></li>
          <li><strong>Zero (0)</strong> is <em>neither positive nor negative</em>.</li>
        </ul>
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
          <h4 class="font-semibold text-blue-800 dark:text-blue-300">Key Points:</h4>
          <ul class="mt-2 text-blue-700 dark:text-blue-400">
            <li>✓ Positive integers: +1, +2, +3, ...</li>
            <li>✓ Negative integers: –1, –2, –3, ...</li>
            <li>✓ Zero: 0 (neither positive nor negative)</li>
          </ul>
        </div>
      `,
      mcqs: [
        {
          id: 'def_q1',
          question: 'Which of the following is an integer?',
          options: ['3.5', '–2', '2/3', '√5'],
          correctAnswer: 1,
          explanation: '–2 is an integer because integers include all positive numbers, negative numbers, and zero. The other options are not integers: 3.5 is a decimal, 2/3 is a fraction, and √5 is an irrational number.'
        },
        {
          id: 'def_q2',
          question: 'Which number is greater?',
          options: ['–7', '–4', 'Both are equal', 'Cannot compare'],
          correctAnswer: 1,
          explanation: '–4 is greater than –7. Among negative numbers, the one closer to zero is always greater.'
        },
        {
          id: 'def_q3',
          question: 'The opposite of –8 is:',
          options: ['–8', '0', '+8', '–1'],
          correctAnswer: 2,
          explanation: 'The opposite of –8 is +8. Opposite integers are the same distance from zero but on different sides of the number line.'
        }
      ],
      order: 1
    },
    {
      id: 'numberLine',
      title: '2. Number Line Representation',
      content: `
        <h3>Number Line Representation</h3>
        <ul>
          <li>Integers can be shown on a <strong>number line</strong>.</li>
          <li><strong>To the right of 0</strong> → positive integers.</li>
          <li><strong>To the left of 0</strong> → negative integers.</li>
          <li>The <em>further right</em> a number is, the <strong>greater</strong> it is.</li>
          <li><strong>Example:</strong> On the number line, +3 > –2 because +3 lies to the right of –2.</li>
        </ul>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
          <p class="text-center font-mono text-lg">
            ← ... –5  –4  –3  –2  –1  <span class="font-bold text-red-600">0</span>  +1  +2  +3  +4  +5 ... →
          </p>
          <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            Negative ← → Positive
          </p>
        </div>
      `,
      mcqs: [
        {
          id: 'line_q1',
          question: 'The sum of (+9) and (–6) is:',
          options: ['+15', '–3', '+3', '–15'],
          correctAnswer: 2,
          explanation: '(+9) + (–6) = +3. When adding integers with different signs, subtract the smaller absolute value from the larger and keep the sign of the larger absolute value.'
        },
        {
          id: 'line_q2',
          question: 'The result of (–5) – (–2) is:',
          options: ['–7', '–3', '+3', '+7'],
          correctAnswer: 1,
          explanation: '(–5) – (–2) = (–5) + (+2) = –3. Subtracting a negative number is the same as adding its positive.'
        },
        {
          id: 'line_q3',
          question: 'Which of the following is true?',
          options: ['–3 > +2', '–2 < –5', '–7 < –2', '+4 < 0'],
          correctAnswer: 2,
          explanation: '–7 < –2 is true. Among negative numbers, the one closer to zero is greater. –2 is closer to zero than –7, so –7 < –2.'
        }
      ],
      order: 2
    },
    {
      id: 'comparing',
      title: '3. Comparing Integers',
      content: `
        <h3>Comparing Integers</h3>
        <ul>
          <li><strong>Positive numbers</strong> are always greater than <strong>negative numbers</strong>.</li>
          <li>Among <strong>positive integers</strong>, the larger value is greater (e.g., 7 > 3).</li>
          <li>Among <strong>negative integers</strong>, the one with a smaller absolute value is greater (e.g., –2 > –5).</li>
        </ul>
        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-4">
          <h4 class="font-semibold text-green-800 dark:text-green-300">Comparison Rules:</h4>
          <ul class="mt-2 text-green-700 dark:text-green-400">
            <li>✓ Any positive number > 0 > any negative number</li>
            <li>✓ For positive: 7 > 3 > 1</li>
            <li>✓ For negative: –1 > –3 > –7</li>
          </ul>
        </div>
      `,
      mcqs: [
        {
          id: 'comp_q1',
          question: '(–12) ÷ (+3) = ?',
          options: ['–36', '–4', '+4', '+36'],
          correctAnswer: 1,
          explanation: '(–12) ÷ (+3) = –4. When dividing integers with different signs, the result is negative.'
        },
        {
          id: 'comp_q2',
          question: 'The product of (–6) × (–5) is:',
          options: ['–30', '+30', '–1', '+11'],
          correctAnswer: 1,
          explanation: '(–6) × (–5) = +30. When multiplying two negative numbers, the result is positive.'
        },
        {
          id: 'comp_q3',
          question: 'If |x| = 9, then x can be:',
          options: ['+9 only', '–9 only', '+9 or –9', '0'],
          correctAnswer: 2,
          explanation: 'If |x| = 9, then x can be either +9 or –9, because the absolute value of both +9 and –9 is 9.'
        }
      ],
      order: 3
    },
    {
      id: 'operations',
      title: '4. Operations with Integers',
      content: `
        <h3>Operations with Integers</h3>
        
        <h4><strong>(a) Addition</strong></h4>
        <ul>
          <li><strong>Same sign</strong> → add absolute values, keep sign.</li>
          <li><strong>Different signs</strong> → subtract smaller absolute value from larger, keep sign of larger.</li>
        </ul>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>(+7) + (+3) = +10</li>
          <li>(–8) + (–4) = –12</li>
          <li>(+9) + (–5) = +4</li>
        </ul>

        <h4><strong>(b) Subtraction</strong></h4>
        <ul>
          <li>Change sign of second number, then add.</li>
        </ul>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>(+7) – (+3) = (+7) + (–3) = +4</li>
          <li>(–5) – (+4) = (–5) + (–4) = –9</li>
          <li>(–6) – (–2) = (–6) + (+2) = –4</li>
        </ul>

        <h4><strong>(c) Multiplication & Division</strong></h4>
        <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-4">
          <h5 class="font-semibold text-yellow-800 dark:text-yellow-300">Rules:</h5>
          <ul class="mt-2 text-yellow-700 dark:text-yellow-400">
            <li>• (+) × (+) = +</li>
            <li>• (–) × (–) = +</li>
            <li>• (+) × (–) = –</li>
            <li>• (–) × (+) = –</li>
          </ul>
        </div>
      `,
      mcqs: [
        {
          id: 'ops_q1',
          question: 'On a number line, which number is farthest to the left?',
          options: ['–10', '–3', '0', '+5'],
          correctAnswer: 0,
          explanation: '–10 is farthest to the left on a number line. The smaller the number, the further left it appears.'
        },
        {
          id: 'ops_q2',
          question: 'What is (–4) + (+7)?',
          options: ['+11', '–11', '+3', '–3'],
          correctAnswer: 2,
          explanation: '(–4) + (+7) = +3. When adding integers with different signs, subtract the smaller absolute value (4) from the larger (7) and keep the sign of the larger absolute value (+).'
        },
        {
          id: 'ops_q3',
          question: 'The result of (+8) × (–2) is:',
          options: ['+16', '–16', '+6', '–6'],
          correctAnswer: 1,
          explanation: '(+8) × (–2) = –16. When multiplying a positive and negative integer, the result is always negative.'
        }
      ],
      order: 4
    },
    {
      id: 'absoluteValue',
      title: '5. Absolute Value',
      content: `
        <h3>Absolute Value</h3>
        <ul>
          <li>The <strong>absolute value</strong> of an integer is its <em>distance from zero</em> on the number line, always positive.</li>
          <li><strong>Symbol:</strong> |x| (vertical bars around the number)</li>
          <li><strong>Examples:</strong>
            <ul>
              <li>|+5| = 5</li>
              <li>|–7| = 7</li>
              <li>|0| = 0</li>
            </ul>
          </li>
        </ul>
        <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mt-4">
          <h4 class="font-semibold text-purple-800 dark:text-purple-300">Remember:</h4>
          <p class="mt-2 text-purple-700 dark:text-purple-400">
            Absolute value is always non-negative (≥ 0). It tells us "how far" a number is from zero, regardless of direction.
          </p>
        </div>
      `,
      mcqs: [
        {
          id: 'abs_q1',
          question: 'What is |–15|?',
          options: ['–15', '+15', '0', '30'],
          correctAnswer: 1,
          explanation: '|–15| = +15 (or simply 15). The absolute value of –15 is 15, which represents the distance from –15 to 0 on the number line.'
        },
        {
          id: 'abs_q2',
          question: 'Which statement is true?',
          options: ['|–6| = –6', '|+4| = –4', '|–8| = |+8|', '|0| = –1'],
          correctAnswer: 2,
          explanation: '|–8| = |+8| is true. Both –8 and +8 are 8 units away from zero, so their absolute values are equal: |–8| = 8 and |+8| = 8.'
        },
        {
          id: 'abs_q3',
          question: 'If |a| = 12, what are the possible values of a?',
          options: ['+12 only', '–12 only', '+12 and –12', '0 and 12'],
          correctAnswer: 2,
          explanation: 'If |a| = 12, then a can be either +12 or –12, because both numbers are 12 units away from zero on the number line.'
        }
      ],
      order: 5
    }
  ]
};

// Check if lesson exists
export async function checkIntegersLessonExists(lessonId: string): Promise<boolean> {
  try {
    const lessonRef = doc(db, 'lessons', lessonId);
    const lessonSnap = await getDoc(lessonRef);
    return lessonSnap.exists();
  } catch (error) {
    console.error('Error checking lesson existence:', error);
    return false;
  }
}

// Seed the Integers lesson
export async function seedIntegersLesson(): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('🌱 Starting to seed Integers lesson...');
    
    const lessonRef = doc(collection(db, 'lessons'), integersLessonData.id);
    const lessonDataWithTimestamp: Lesson = {
      ...integersLessonData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(lessonRef, lessonDataWithTimestamp, { merge: true });
    
    console.log('✅ Successfully seeded Integers lesson');
    return { success: true };
  } catch (error) {
    console.error('❌ Error seeding Integers lesson:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export { integersLessonData };