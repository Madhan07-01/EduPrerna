# Firestore Seeding Scripts

This directory contains scripts for seeding content into Firestore for the EduPrerna application.

## Available Scripts

### Seed Mathematics Content
Populates all mathematics content for Grades 6-12 into Firestore.

```bash
npm run seed-mathematics
```

This script will:
- Read JSON content files from `src/content/mathematics/grade{N}/`
- Transform the content to match the required Firestore document structure
- Seed the content into Firestore at the path: `/courses/mathematics/lessons/lesson_content_to_learn/grade{N}/chapter{M}`

### Verify Seeded Content
Verifies that the mathematics content has been properly seeded into Firestore.

```bash
npm run verify-seeded-content
```

## Document Structure

Each chapter document in Firestore follows this structure:

```json
{
  "title": "Chapter Name",
  "introduction": "Introductory explanation of the chapter",
  "coreConcepts": [
    {
      "heading": "Concept Title",
      "details": "Detailed explanation of the concept"
    }
  ],
  "examples": [
    {
      "question": "Worked example text",
      "solution": "Step-by-step solution"
    }
  ],
  "quiz": {
    "questions": [
      {
        "question": "MCQ Question text",
        "options": ["Option1", "Option2", "Option3", "Option4"],
        "answer": "Correct Answer",
        "explanation": "Reason why this answer is correct",
        "timer": 30,
        "difficulty": "easy"
      }
    ]
  },
  "interactive": "relationGraph | unitCircle | matrixPlayground | defaultCardFlow"
}
```

## Content Mapping

The script automatically maps chapters to interactive components based on chapter titles:

- "Relations and Functions" → "relationGraph"
- "Inverse Trigonometric Functions" → "unitCircle"
- "Matrices" → "matrixPlayground"
- "Sets" → "defaultCardFlow"
- All other chapters → "defaultCardFlow"

## Adding New Content

To add new content:
1. Create JSON files in the appropriate grade directory: `src/content/mathematics/grade{N}/`
2. Follow the existing JSON structure in the content files
3. Run the seeding script: `npm run seed-mathematics`

## Troubleshooting

If you encounter issues:
1. Ensure you have the correct Firebase credentials in the script
2. Check that the content JSON files are properly formatted
3. Verify that the Firestore database is accessible