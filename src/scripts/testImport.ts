import { generateDocumentId } from '../utils/documentIdHelper';

console.log('Testing import...');
const testId = generateDocumentId(6, 'Number System');
console.log('Generated ID:', testId);