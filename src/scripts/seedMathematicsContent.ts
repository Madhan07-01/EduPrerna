// Add process type declaration
interface Process {
  exit: (code: number) => void;
}

declare var process: Process;

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

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

// Mapping of chapters to interactive components
const chapterToInteractiveMap: { [key: string]: string } = {
  "Relations and Functions": "relationGraph",
  "Inverse Trigonometric Functions": "unitCircle",
  "Matrices": "matrixPlayground",
  "Sets": "defaultCardFlow",
  "Relations & Functions": "relationGraph",
  "Trigonometric Functions": "unitCircle",
  "Real Numbers": "defaultCardFlow",
  "Polynomials": "defaultCardFlow",
  "Pair of Linear Equations in Two Variables": "defaultCardFlow"
};

// Function to determine the interactive component based on chapter title
function getInteractiveComponent(title: string): string {
  return chapterToInteractiveMap[title] || "defaultCardFlow";
}

// Function to transform content structure to Firestore document structure
function transformContentToFirestoreFormat(content: any, _chapterNumber: number): any {
  // For content with subtopics structure (grade 6-10)
  if (content.subtopics) {
    // Combine all subtopic contents into an introduction
    const introduction = content.subtopics.map((subtopic: any) => 
      `<h3>${subtopic.title}</h3>${subtopic.content}`
    ).join('');
    
    // Extract core concepts from subtopics (excluding introduction)
    const coreConcepts = content.subtopics.slice(1).map((subtopic: any) => ({
      heading: subtopic.title,
      details: subtopic.content
    }));
    
    // Transform quiz questions to match required format
    const quiz = {
      questions: content.quiz.questions.map((question: any) => ({
        question: question.question || question.text,
        options: question.options,
        answer: question.answer || question.correctAnswer,
        explanation: question.explanation,
        timer: 30,
        difficulty: "medium"
      }))
    };
    
    return {
      title: content.title,
      introduction: introduction,
      coreConcepts: coreConcepts,
      examples: [], // No examples in current content structure
      quiz: quiz,
      interactive: getInteractiveComponent(content.title)
    };
  }
  
  // For content with chapters structure (grade 11-12)
  if (content.chapters) {
    // Combine all chapter contents into an introduction
    const introduction = content.chapters.map((chapter: any) => 
      `<h3>${chapter.title}</h3>${chapter.content.map((item: any) => 
        item.type === 'text' ? `<p>${item.text}</p>` : 
        item.type === 'list' ? `<ul>${item.items.map((i: string) => `<li>${i}</li>`).join('')}</ul>` : ''
      ).join('')}`
    ).join('');
    
    // Extract core concepts from chapters
    const coreConcepts = content.chapters.map((chapter: any) => ({
      heading: chapter.title,
      details: chapter.content.map((item: any) => 
        item.type === 'text' ? `<p>${item.text}</p>` : 
        item.type === 'list' ? `<ul>${item.items.map((i: string) => `<li>${i}</li>`).join('')}</ul>` : ''
      ).join('')
    }));
    
    // Transform quiz questions to match required format
    const quiz = {
      questions: content.quiz.questions.map((question: any) => ({
        question: question.text,
        options: question.options,
        answer: question.options ? question.options[parseInt(question.correctAnswer) - 1] || question.correctAnswer : question.correctAnswer,
        explanation: question.explanation,
        timer: 30,
        difficulty: "medium"
      }))
    };
    
    return {
      title: content.title,
      introduction: introduction,
      coreConcepts: coreConcepts,
      examples: [], // No examples in current content structure
      quiz: quiz,
      interactive: getInteractiveComponent(content.title)
    };
  }
  
  return null;
}

// Function to seed content for a specific grade
async function seedGradeContent(grade: number) {
  console.log(`\nSeeding content for Grade ${grade}...`);
  
  const gradePath = path.join('src', 'content', 'mathematics', `grade${grade}`);
  
  // Check if grade directory exists
  if (!fs.existsSync(gradePath)) {
    console.log(`⚠️  Grade ${grade} directory not found, skipping...`);
    return;
  }
  
  // Read all chapter files in the grade directory
  const files = fs.readdirSync(gradePath);
  const chapterFiles = files.filter(file => file.endsWith('.json'));
  
  console.log(`Found ${chapterFiles.length} chapter files for Grade ${grade}`);
  
  // Process each chapter file
  for (const file of chapterFiles) {
    try {
      const filePath = path.join(gradePath, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      // Extract chapter number from filename
      const chapterMatch = file.match(/chapter(\d+)\.json/);
      let chapterNumber = 0;
      
      if (chapterMatch) {
        chapterNumber = parseInt(chapterMatch[1]);
      } else {
        // For grade 11-12 files with different naming
        if (file.includes('sets')) chapterNumber = 1;
        else if (file.includes('relations') && file.includes('functions')) chapterNumber = 1;
        else if (file.includes('inverse')) chapterNumber = 2;
        else if (file.includes('matrices')) chapterNumber = 3;
        else {
          console.log(`⚠️  Could not determine chapter number from filename: ${file}, skipping...`);
          continue;
        }
      }
      
      // Transform content to Firestore format
      const firestoreData = transformContentToFirestoreFormat(content, chapterNumber);
      
      if (!firestoreData) {
        console.log(`⚠️  Could not transform content for ${file}, skipping...`);
        continue;
      }
      
      // Create Firestore document
      const docRef = doc(db, 'courses', 'mathematics', 'lessons', 'lesson_content_to_learn', `grade${grade}`, `chapter${chapterNumber}`);
      await setDoc(docRef, firestoreData);
      
      console.log(`✓ Chapter ${chapterNumber} - "${content.title}" seeded successfully`);
    } catch (error) {
      console.error(`❌ Error seeding ${file}:`, (error as Error).message);
    }
  }
}

// Main seeding function
async function seedAllMathematicsContent() {
  try {
    console.log('🚀 Starting Mathematics Content Seeding Script...');
    console.log('==============================================');
    
    // Seed content for grades 6-12
    for (let grade = 6; grade <= 12; grade++) {
      await seedGradeContent(grade);
    }
    
    console.log('\n✅ All Mathematics content seeded successfully!');
    console.log('\nFirestore structure created:');
    console.log('/courses/mathematics/lessons/lesson_content_to_learn/');
    for (let grade = 6; grade <= 12; grade++) {
      console.log(`   └── grade${grade}/`);
      console.log(`       ├── chapter1`);
      console.log(`       ├── chapter2`);
      console.log(`       └── chapter3`);
    }
    
  } catch (error) {
    console.error('❌ Error in seeding process:', (error as Error).message);
    process.exit(1);
  }
}

// Run the seeding function
seedAllMathematicsContent().then(() => {
  console.log('\n🎉 Script completed successfully!');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Script failed with error:', error);
  process.exit(1);
});