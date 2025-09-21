"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocumentId = generateDocumentId;
exports.generatePossibleDocumentIds = generatePossibleDocumentIds;
exports.generateFallbackDocumentId = generateFallbackDocumentId;
/**
 * Generates a document ID for a lesson based on grade and title
 * @param grade - The grade level (6-12)
 * @param lessonTitle - The title of the lesson
 * @returns A formatted document ID suitable for Firestore
 */
function generateDocumentId(grade, lessonTitle) {
    // Convert title to lowercase and replace spaces with hyphens
    var formattedTitle = lessonTitle.toLowerCase().replace(/\s+/g, '-');
    // Remove special characters except hyphens
    var cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
    return "grade-".concat(grade, "-").concat(cleanTitle);
}
/**
 * Generates possible alternative document IDs for a lesson
 * @param grade - The grade level (6-12)
 * @param lessonTitle - The title of the lesson
 * @returns An array of possible document IDs
 */
function generatePossibleDocumentIds(grade, lessonTitle) {
    var ids = [];
    // Standard format
    ids.push(generateDocumentId(grade, lessonTitle));
    // Alternative formats that might exist in the database
    var formattedTitle = lessonTitle.toLowerCase().replace(/\s+/g, '-');
    var cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
    // Format without "grade-" prefix
    ids.push("".concat(grade, "-").concat(cleanTitle));
    // Format with "chapter-" prefix
    ids.push("chapter-".concat(grade, "-").concat(cleanTitle));
    // Format with just the clean title
    ids.push(cleanTitle);
    // Format with grade number at the end
    ids.push("".concat(cleanTitle, "-grade-").concat(grade));
    return ids;
}
/**
 * Generates a fallback document ID when others are not found
 * @param grade - The grade level (6-12)
 * @param lessonTitle - The title of the lesson
 * @returns A fallback document ID
 */
function generateFallbackDocumentId(grade, lessonTitle) {
    // Use a simple format as fallback
    var formattedTitle = lessonTitle.toLowerCase().replace(/\s+/g, '-');
    var cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
    return "".concat(grade, "_").concat(cleanTitle);
}
