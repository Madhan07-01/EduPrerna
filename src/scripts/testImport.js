"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var documentIdHelper_1 = require("../utils/documentIdHelper");
console.log('Testing import...');
var testId = (0, documentIdHelper_1.generateDocumentId)(6, 'Number System');
console.log('Generated ID:', testId);
