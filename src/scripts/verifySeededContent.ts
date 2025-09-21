import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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

// Function to verify a specific document
async function verifyDocument(grade: number, chapter: number) {
  try {
    const docRef = doc(db, 'courses', 'mathematics', 'lessons', 'lesson_content_to_learn', `grade${grade}`, `chapter${chapter}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(`\n✅ Grade ${grade} Chapter ${chapter} exists:`);
      console.log(`  Title: ${data.title}`);
      console.log(`  Introduction length: ${data.introduction?.length || 0} characters`);
      console.log(`  Core concepts: ${data.coreConcepts?.length || 0}`);
      console.log(`  Quiz questions: ${data.quiz?.questions?.length || 0}`);
      console.log(`  Interactive component: ${data.interactive}`);
      return true;
    } else {
      console.log(`\n❌ Grade ${grade} Chapter ${chapter} does not exist`);
      return false;
    }
  } catch (error) {
    console.error(`\n💥 Error verifying Grade ${grade} Chapter ${chapter}:`, (error as Error).message);
    return false;
  }
}

// Main verification function
async function verifySeededContent() {
  console.log('🔍 Verifying seeded mathematics content...\n');
  
  let successCount = 0;
  let totalCount = 0;
  
  // Check a few representative documents
  const documentsToCheck = [
    { grade: 6, chapter: 1 },
    { grade: 6, chapter: 2 },
    { grade: 6, chapter: 3 },
    { grade: 10, chapter: 1 },
    { grade: 10, chapter: 2 },
    { grade: 10, chapter: 3 },
    { grade: 11, chapter: 1 },
    { grade: 11, chapter: 2 },
    { grade: 11, chapter: 3 },
    { grade: 12, chapter: 1 },
    { grade: 12, chapter: 2 },
    { grade: 12, chapter: 3 }
  ];
  
  for (const { grade, chapter } of documentsToCheck) {
    totalCount++;
    const success = await verifyDocument(grade, chapter);
    if (success) successCount++;
  }
  
  console.log(`\n📊 Verification complete: ${successCount}/${totalCount} documents verified successfully`);
  
  if (successCount === totalCount) {
    console.log('🎉 All checked documents are properly seeded!');
  } else {
    console.log('⚠️  Some documents may be missing or have issues.');
  }
}

// Run verification
verifySeededContent().catch(console.error);