import LessonModuleTemplate, { type TemplateSection, type TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Microsoft Word is a word processor used to create, edit, and format documents. Editing text improves accuracy, readability, and presentation for assignments, letters, and reports.' },
  { title: '1. Selecting Text', content: 'Click and drag to select; Double-click selects a word; Triple-click selects a paragraph; Shift + Arrow keys selects using keyboard.' },
  { title: '2. Cutting, Copying, and Pasting Text', content: 'Cut (Ctrl + X) removes text; Copy (Ctrl + C) duplicates text; Paste (Ctrl + V) inserts at cursor. Example: Cut a sentence and paste elsewhere.' },
  { title: '3. Deleting Text', content: 'Backspace deletes before cursor; Delete deletes after cursor; Selecting text + Delete removes the selection.' },
  { title: '4. Undo and Redo', content: 'Undo (Ctrl + Z) reverses last action; Redo (Ctrl + Y) repeats the action that was undone.' },
  { title: '5. Find and Replace', content: 'Find (Ctrl + F) searches for text; Replace (Ctrl + H) replaces matches with new text. Example: Replace all instances of “colour” with “color”.' },
  { title: '6. Formatting Text', content: 'Change Font Type & Size (e.g., Arial, Times New Roman); Bold (Ctrl + B), Italic (Ctrl + I), Underline (Ctrl + U); Font Color and Highlighting.' },
  { title: '7. Aligning Text', content: 'Left Align (Ctrl + L), Right Align (Ctrl + R), Center Align (Ctrl + E), Justify (Ctrl + J).' },
  { title: '8. Inserting and Editing Lists', content: 'Bulleted List adds bullets; Numbered List adds numbers; Multilevel List creates hierarchical lists with sub-points.' },
  { title: 'Summary', content: 'Efficient editing in Word includes selecting, moving, deleting, undo/redo, find/replace, formatting, alignment, and lists. Shortcuts speed up work.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Shortcut to copy text?', options: [
    { key: 'a', text: 'Ctrl + X' }, { key: 'b', text: 'Ctrl + C' }, { key: 'c', text: 'Ctrl + V' }, { key: 'd', text: 'Ctrl + Z' }
  ], answer: 'b', explanation: 'Ctrl + C copies the selection.' },
  { id: 'q2', question: 'Shortcut to undo last action?', options: [
    { key: 'a', text: 'Ctrl + Y' }, { key: 'b', text: 'Ctrl + Z' }, { key: 'c', text: 'Ctrl + X' }, { key: 'd', text: 'Ctrl + C' }
  ], answer: 'b', explanation: 'Ctrl + Z is Undo.' },
  { id: 'q3', question: 'To select a word, you should:', options: [
    { key: 'a', text: 'Single-click' }, { key: 'b', text: 'Double-click' }, { key: 'c', text: 'Triple-click' }, { key: 'd', text: 'Click and drag' }
  ], answer: 'b', explanation: 'Double-click selects a word; triple-click selects a paragraph.' },
  { id: 'q4', question: 'Shortcut to make text bold?', options: [
    { key: 'a', text: 'Ctrl + B' }, { key: 'b', text: 'Ctrl + I' }, { key: 'c', text: 'Ctrl + U' }, { key: 'd', text: 'Ctrl + L' }
  ], answer: 'a', explanation: 'Ctrl + B toggles Bold.' },
  { id: 'q5', question: 'Which key deletes text after the cursor?', options: [
    { key: 'a', text: 'Backspace' }, { key: 'b', text: 'Delete' }, { key: 'c', text: 'Enter' }, { key: 'd', text: 'Tab' }
  ], answer: 'b', explanation: 'Delete removes the character ahead of the cursor.' },
  { id: 'q6', question: 'Command to replace text?', options: [
    { key: 'a', text: 'Ctrl + F' }, { key: 'b', text: 'Ctrl + H' }, { key: 'c', text: 'Ctrl + R' }, { key: 'd', text: 'Ctrl + E' }
  ], answer: 'b', explanation: 'Ctrl + H opens Find and Replace dialog with Replace active.' },
  { id: 'q7', question: 'Shortcut to center align text?', options: [
    { key: 'a', text: 'Ctrl + L' }, { key: 'b', text: 'Ctrl + R' }, { key: 'c', text: 'Ctrl + E' }, { key: 'd', text: 'Ctrl + J' }
  ], answer: 'c', explanation: 'Ctrl + E centers text.' },
  { id: 'q8', question: 'List with bullets is called?', options: [
    { key: 'a', text: 'Numbered list' }, { key: 'b', text: 'Bulleted list' }, { key: 'c', text: 'Multilevel list' }, { key: 'd', text: 'Paragraph list' }
  ], answer: 'b', explanation: 'Bulleted lists use symbols instead of numbers.' },
  { id: 'q9', question: 'Highlighting changes:', options: [
    { key: 'a', text: 'Text color' }, { key: 'b', text: 'Background color' }, { key: 'c', text: 'Font type' }, { key: 'd', text: 'Text alignment' }
  ], answer: 'b', explanation: 'Highlight applies a background color to the text area.' },
  { id: 'q10', question: 'Ctrl + V is used for:', options: [
    { key: 'a', text: 'Cut' }, { key: 'b', text: 'Copy' }, { key: 'c', text: 'Paste' }, { key: 'd', text: 'Undo' }
  ], answer: 'c', explanation: 'Ctrl + V pastes from the clipboard.' },
]

export default function CSG7WordEditing() {
  return (
    <LessonModuleTemplate
      title="Editing Text in Microsoft Word"
      subject="Computer Science"
      grade={7}
      backLink="/lessons/ComputerScience/7"
      lessonId="cs-g7-word-editing"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
