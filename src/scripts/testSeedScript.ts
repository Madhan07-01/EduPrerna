import * as fs from 'fs';
import * as path from 'path';

// Test function to verify content reading
function testContentReading() {
  console.log('Testing content reading...\n');
  
  // Test reading a grade 10 chapter
  const grade10Path = path.join('src', 'content', 'mathematics', 'grade10', 'chapter1.json');
  if (fs.existsSync(grade10Path)) {
    const content = JSON.parse(fs.readFileSync(grade10Path, 'utf-8'));
    console.log('Grade 10 Chapter 1:');
    console.log('- Title:', content.title);
    console.log('- Subtopics:', content.subtopics.length);
    console.log('- Quiz questions:', content.quiz.questions.length);
    console.log('\n');
  } else {
    console.log('Grade 10 Chapter 1 not found\n');
  }
  
  // Test reading a grade 12 chapter
  const grade12Path = path.join('src', 'content', 'mathematics', 'grade12', 'relations-and-functions.json');
  if (fs.existsSync(grade12Path)) {
    const content = JSON.parse(fs.readFileSync(grade12Path, 'utf-8'));
    console.log('Grade 12 Relations and Functions:');
    console.log('- Title:', content.title);
    console.log('- Chapters:', content.chapters.length);
    console.log('- Quiz questions:', content.quiz.questions.length);
    console.log('\n');
  } else {
    console.log('Grade 12 Relations and Functions not found\n');
  }
}

testContentReading();