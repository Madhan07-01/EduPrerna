import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Firebase configuration (same as in firebaseConfig.ts)
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

async function createCourseStructure() {
  try {
    console.log('Creating Mathematics course structure...');
    
    // Create the mathematics document in courses collection
    const mathematicsDocRef = doc(db, 'courses', 'mathematics');
    
    // Set the mathematics document with initial data
    await setDoc(mathematicsDocRef, {
      name: 'Mathematics',
      description: 'Mathematics course content',
      createdAt: new Date(),
      initialized: true
    });
    
    console.log('✓ Created/updated mathematics document in courses collection');
    
    // Create the lesson_content_to_learn document in lessons sub-collection
    const lessonContentDocRef = doc(db, 'courses', 'mathematics', 'lessons', 'lesson_content_to_learn');
    
    // Set the lesson_content_to_learn document with initial data
    await setDoc(lessonContentDocRef, {
      initialized: true,
      createdAt: new Date(),
      description: 'Main container for all mathematics lesson content'
    });
    
    console.log('✓ Created/updated lesson_content_to_learn document in lessons sub-collection');
    
    console.log('\n✅ Mathematics course structure created successfully');
    console.log('Structure:');
    console.log('/courses');
    console.log('   /mathematics');
    console.log('      /lessons');
    console.log('         /lesson_content_to_learn');
    
  } catch (error) {
    console.error('❌ Error creating course structure:', (error as Error).message);
    process.exit(1);
  }
}

// Run the function
createCourseStructure().then(() => {
  console.log('Script completed successfully.');
  process.exit(0);
}).catch((error) => {
  console.error('Script failed with error:', error);
  process.exit(1);
});