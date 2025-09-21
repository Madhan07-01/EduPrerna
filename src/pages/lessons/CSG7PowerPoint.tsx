import LessonModuleTemplate, { type TemplateSection, type TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Microsoft PowerPoint is a presentation software used to create slideshows. It combines text, images, audio, video, charts, and animations to make presentations visually appealing and effective.' },
  { title: '1. Slides', content: 'A slide is a single page in a presentation. Each slide can contain text, images, tables, charts, and multimedia.' },
  { title: '2. Creating a Presentation', content: 'Open PowerPoint → choose Blank Presentation or Template. Add slides using New Slide. Choose layouts such as Title Slide, Title and Content, Two Content, etc.' },
  { title: '3. Editing Slides', content: 'Add and format text (font, size, color, bold, italic, underline). Insert images (Insert → Pictures), shapes, charts, and tables.' },
  { title: '4. Slide Design', content: 'Themes provide pre-designed color and font styles. Background can be a color, gradient, or image. Slide Master customizes the layout/styles for all slides.' },
  { title: '5. Transitions and Animations', content: 'Slide Transition is the effect between slides. Animation is the effect applied to text/objects. Types include Entrance, Emphasis, Exit, and Motion Path.' },
  { title: '6. Slide Show View', content: 'Start presentation via Slide Show → From Beginning. Navigate using arrow keys or mouse. Presenter View shows notes for the presenter.' },
  { title: '7. Saving and Exporting', content: 'Save as .pptx or export as .pdf. You can also export slides as images or videos.' },
  { title: 'Summary', content: 'PowerPoint presentations are built with slides. Use layouts, design, transitions, animations, and slide show tools. Save/export to share your work.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'A single page in PowerPoint is called:', options: [
    { key: 'a', text: 'Slide' }, { key: 'b', text: 'Document' }, { key: 'c', text: 'Sheet' }, { key: 'd', text: 'Page' }
  ], answer: 'a', explanation: 'Each page in a presentation is a slide.' },
  { id: 'q2', question: 'Tab to insert a picture:', options: [
    { key: 'a', text: 'Home' }, { key: 'b', text: 'Insert' }, { key: 'c', text: 'Design' }, { key: 'd', text: 'Slide Show' }
  ], answer: 'b', explanation: 'Use the Insert tab to add pictures.' },
  { id: 'q3', question: 'Feature to change effect between slides:', options: [
    { key: 'a', text: 'Animation' }, { key: 'b', text: 'Transition' }, { key: 'c', text: 'Theme' }, { key: 'd', text: 'Layout' }
  ], answer: 'b', explanation: 'Transitions control how one slide changes to the next.' },
  { id: 'q4', question: 'Ctrl + M is used to:', options: [
    { key: 'a', text: 'Delete slide' }, { key: 'b', text: 'Add new slide' }, { key: 'c', text: 'Save' }, { key: 'd', text: 'Open' }
  ], answer: 'b', explanation: 'Ctrl + M inserts a new slide.' },
  { id: 'q5', question: 'View showing notes for each slide:', options: [
    { key: 'a', text: 'Slide Sorter' }, { key: 'b', text: 'Normal' }, { key: 'c', text: 'Presenter View' }, { key: 'd', text: 'Notes Page' }
  ], answer: 'c', explanation: 'Presenter View shows speaker notes and tools.' },
  { id: 'q6', question: 'File format to save PowerPoint:', options: [
    { key: 'a', text: '.docx' }, { key: 'b', text: '.pptx' }, { key: 'c', text: '.xlsx' }, { key: 'd', text: '.txt' }
  ], answer: 'b', explanation: '.pptx is the default PowerPoint format.' },
  { id: 'q7', question: 'Feature to add effects to text/objects:', options: [
    { key: 'a', text: 'Theme' }, { key: 'b', text: 'Animation' }, { key: 'c', text: 'Transition' }, { key: 'd', text: 'Layout' }
  ], answer: 'b', explanation: 'Animations are applied to objects on a slide.' },
  { id: 'q8', question: 'To change overall design/colors:', options: [
    { key: 'a', text: 'Theme' }, { key: 'b', text: 'Layout' }, { key: 'c', text: 'Slide Sorter' }, { key: 'd', text: 'Animation' }
  ], answer: 'a', explanation: 'Themes control colors and fonts across slides.' },
  { id: 'q9', question: 'Tab to insert a chart:', options: [
    { key: 'a', text: 'Home' }, { key: 'b', text: 'Insert' }, { key: 'c', text: 'Design' }, { key: 'd', text: 'Review' }
  ], answer: 'b', explanation: 'Charts are inserted from the Insert tab.' },
  { id: 'q10', question: 'Which is NOT a type of animation?', options: [
    { key: 'a', text: 'Entrance' }, { key: 'b', text: 'Motion Path' }, { key: 'c', text: 'Exit' }, { key: 'd', text: 'Slide Sorter' }
  ], answer: 'd', explanation: 'Slide Sorter is a view, not an animation type.' },
]

export default function CSG7PowerPoint() {
  return (
    <LessonModuleTemplate
      title="Microsoft PowerPoint"
      subject="Computer Science"
      grade={7}
      backLink="/lessons/ComputerScience/7"
      lessonId="cs-g7-powerpoint"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
