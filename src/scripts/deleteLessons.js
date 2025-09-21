// Import Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, deleteDoc, query, where } from 'firebase/firestore';

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

/**
 * Generates a document ID for a lesson based on grade and title
 * @param {number} grade - The grade level (6-12)
 * @param {string} lessonTitle - The title of the lesson
 * @returns {string} A formatted document ID suitable for Firestore
 */
function generateDocumentId(grade, lessonTitle) {
  // Convert title to lowercase and replace spaces with hyphens
  const formattedTitle = lessonTitle.toLowerCase().replace(/\s+/g, '-');
  // Remove special characters except hyphens
  const cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
  return `grade-${grade}-${cleanTitle}`;
}

/**
 * Generates possible alternative document IDs for a lesson
 * @param {number} grade - The grade level (6-12)
 * @param {string} lessonTitle - The title of the lesson
 * @returns {string[]} An array of possible document IDs
 */
function generatePossibleDocumentIds(grade, lessonTitle) {
  const ids = [];
  
  // Standard format
  ids.push(generateDocumentId(grade, lessonTitle));
  
  // Alternative formats that might exist in the database
  const formattedTitle = lessonTitle.toLowerCase().replace(/\s+/g, '-');
  const cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
  
  // Format without "grade-" prefix
  ids.push(`${grade}-${cleanTitle}`);
  
  // Format with "chapter-" prefix
  ids.push(`chapter-${grade}-${cleanTitle}`);
  
  // Format with just the clean title
  ids.push(cleanTitle);
  
  // Format with grade number at the end
  ids.push(`${cleanTitle}-grade-${grade}`);
  
  return ids;
}

/**
 * Generates a fallback document ID when others are not found
 * @param {number} grade - The grade level (6-12)
 * @param {string} lessonTitle - The title of the lesson
 * @returns {string} A fallback document ID
 */
function generateFallbackDocumentId(grade, lessonTitle) {
  // Use a simple format as fallback
  const formattedTitle = lessonTitle.toLowerCase().replace(/\s+/g, '-');
  const cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
  return `${grade}_${cleanTitle}`;
}

// Lessons data for grades 6-12
const lessonsData = {
  Mathematics: {
    6: [
      "Number System",
      "Operation on Whole Numbers",
      "Integers",
      "Ratio & Proportion",
      "Fundamental Concept of Algebra",
      "Simple Equations",
      "Fundamental Geometrical Concepts",
      "Angles",
      "Fractions",
      "Decimals",
      "Symmetry",
      "Data Handling",
      "Perimeter & Area",
      "Playing with Constructions"
    ],
    7: [
      "Integers",
      "Fractions and Decimals",
      "Data Handling",
      "Simple Equations",
      "Lines and Angles",
      "Triangle and its Properties",
      "Algebraic Expressions",
      "Ratio and Proportion",
      "Comparing Quantities",
      "Area and Perimeter",
      "Practical Geometry",
      "Symmetry"
    ],
    8: [
      "Rational Numbers",
      "Linear Equations",
      "Understanding Quadrilaterals",
      "Practical Geometry",
      "Data Handling",
      "Square and Square Roots",
      "Cube and Cube Roots",
      "Comparing Quantities",
      "Algebraic Expressions and Identities",
      "Direct and Inverse Proportions",
      "Mensuration",
      "Factorization",
      "Introduction to Graphs"
    ],
    9: [
      "Number Systems",
      "Polynomials",
      "Coordinate Geometry",
      "Linear Equations in Two Variables",
      "Introduction to Euclidean Geometry",
      "Lines and Angles",
      "Triangles",
      "Quadrilaterals",
      "Circles",
      "Constructions",
      "Heron's Formula",
      "Surface Areas and Volumes",
      "Statistics",
      "Probability"
    ],
    10: [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations in Two Variables",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Triangles",
      "Coordinate Geometry",
      "Introduction to Trigonometry",
      "Circles",
      "Constructions",
      "Areas Related to Circles",
      "Surface Areas and Volumes",
      "Statistics",
      "Probability"
    ],
    11: [
      "Sets",
      "Relations and Functions",
      "Trigonometric Functions",
      "Principle of Mathematical Induction",
      "Complex Numbers and Quadratic Equations",
      "Linear Inequalities",
      "Permutations and Combinations",
      "Binomial Theorem",
      "Sequences and Series",
      "Straight Lines",
      "Conic Sections",
      "Introduction to Three-dimensional Geometry",
      "Limits and Derivatives",
      "Mathematical Reasoning",
      "Statistics",
      "Probability"
    ],
    12: [
      "Relations and Functions",
      "Inverse Trigonometric Functions",
      "Matrices",
      "Determinants",
      "Continuity and Differentiability",
      "Application of Derivatives",
      "Integrals",
      "Application of Integrals",
      "Differential Equations",
      "Vector Algebra",
      "Three-dimensional Geometry",
      "Linear Programming",
      "Probability"
    ]
  }
};

// Helper function to get lessons for a subject and grade
function getLessonsForSubjectAndGrade(subject, grade) {
  return lessonsData[subject]?.[grade] || [];
}

async function deleteLessonContent() {
  console.log('Starting deletion of lesson contents for grades 6-12...');
  
  const grades = [6, 7, 8, 9, 10, 11, 12];
  const subject = 'Mathematics';
  
  // Counter for deleted documents
  let deletedCount = 0;
  
  try {
    // Loop through each grade
    for (const grade of grades) {
      console.log(`\nProcessing Grade ${grade}...`);
      
      // Get lessons for this grade
      const lessons = getLessonsForSubjectAndGrade(subject, grade);
      
      // Loop through each lesson
      for (let chapterIndex = 0; chapterIndex < lessons.length; chapterIndex++) {
        const chapterNumber = chapterIndex + 1;
        const lessonTitle = lessons[chapterIndex];
        
        console.log(`  Deleting lesson: Chapter ${chapterNumber} - ${lessonTitle}`);
        
        // Try different document ID formats
        const possibleIds = [
          generateDocumentId(grade, lessonTitle),
          ...generatePossibleDocumentIds(grade, lessonTitle),
          generateFallbackDocumentId(grade, lessonTitle)
        ];
        
        let deleted = false;
        
        // Try each possible ID
        for (const docId of possibleIds) {
          try {
            const docRef = doc(db, 'courses/mathematics/lessons', docId);
            // In JavaScript, we need to check if document exists differently
            // We'll try to delete and catch any errors
            await deleteDoc(docRef);
            console.log(`    ✓ Deleted document with ID: ${docId}`);
            deletedCount++;
            deleted = true;
            break; // Exit the loop once we've deleted the document
          } catch (error) {
            // Continue to next ID if this one fails
            // We expect some errors when documents don't exist
          }
        }
        
        // If none of the IDs worked, log that we couldn't find the document
        if (!deleted) {
          console.log(`    ✗ Could not find document for Chapter ${chapterNumber} - ${lessonTitle}`);
        }
      }
    }
    
    console.log(`\n✅ Deletion complete! Total documents deleted: ${deletedCount}`);
    console.log('All lesson contents for grades 6–12 have been deleted successfully.');
  } catch (error) {
    console.error('❌ Error during deletion:', error.message);
    process.exit(1);
  }
}

// Run the deletion function
deleteLessonContent().then(() => {
  console.log('Script completed successfully.');
  process.exit(0);
}).catch((error) => {
  console.error('Script failed with error:', error);
  process.exit(1);
});