/**
 * Generates a document ID for a lesson based on grade and title
 * @param grade - The grade level (6-12)
 * @param lessonTitle - The title of the lesson
 * @returns A formatted document ID suitable for Firestore
 */
export function generateDocumentId(grade: number, lessonTitle: string): string {
  // Convert title to lowercase and replace spaces with hyphens
  const formattedTitle = lessonTitle.toLowerCase().replace(/\s+/g, '-');
  // Remove special characters except hyphens
  const cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
  return `grade-${grade}-${cleanTitle}`;
}

/**
 * Generates possible alternative document IDs for a lesson
 * @param grade - The grade level (6-12)
 * @param lessonTitle - The title of the lesson
 * @returns An array of possible document IDs
 */
export function generatePossibleDocumentIds(grade: number, lessonTitle: string): string[] {
  const ids: string[] = [];
  
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
 * @param grade - The grade level (6-12)
 * @param lessonTitle - The title of the lesson
 * @returns A fallback document ID
 */
export function generateFallbackDocumentId(grade: number, lessonTitle: string): string {
  // Use a simple format as fallback
  const formattedTitle = lessonTitle.toLowerCase().replace(/\s+/g, '-');
  const cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
  return `${grade}_${cleanTitle}`;
}