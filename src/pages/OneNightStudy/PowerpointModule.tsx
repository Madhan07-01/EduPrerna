import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const powerpointModule: LearningModule = {
  title: 'Microsoft PowerPoint - Complete Module',
  introduction: 'Welcome to the exciting world of Microsoft PowerPoint! PowerPoint is like having your own personal presentation studio right on your computer. Whether you\'re presenting a school project, sharing your vacation photos, or creating a story about your favorite hobby, PowerPoint helps you communicate your ideas in a visual and engaging way. Think of it as your digital canvas where you can combine text, images, colors, and even animations to make presentations that wow your audience. Let\'s dive in and discover how to create amazing presentations!',
  concepts: [
    {
      title: 'Understanding Presentation Components - Slides',
      content: 'A presentation is made up of slides, which are like digital pages or cards that you can flip through. Each slide can contain different types of content to help tell your story or share information.',
      examples: [
        'Slides are the building blocks of your presentation - think of them like pages in a digital book',
        'Title slides introduce your presentation topic and your name',
        'Content slides contain the main information, pictures, or data you want to share',
        'Conclusion slides summarize your key points',
        'You can have as many slides as you need - typically 5-15 slides for a school presentation',
        'Each slide should focus on one main idea to keep your audience engaged'
      ]
    },
    {
      title: 'Creating and Adding Content to Your Presentation',
      content: 'PowerPoint makes it easy to add different types of content to your slides. You can combine text, images, shapes, and charts to create engaging presentations that capture your audience\'s attention.',
      examples: [
        'Adding Text: Click in text boxes and type your content - use bullet points for lists',
        'Inserting Images: Go to Insert > Pictures to add photos from your computer or online',
        'Drawing Shapes: Use Insert > Shapes to add circles, rectangles, arrows, and more',
        'Creating Charts: Insert > Chart lets you make bar graphs, pie charts, and line graphs',
        'Keep text large enough to read (at least 24-point font for content)',
        'Use high-quality images that relate to your topic'
      ]
    },
    {
      title: 'Editing and Formatting Your Content',
      content: 'Once you\'ve added content to your slides, you can edit and format it to make it look professional and appealing. PowerPoint offers many tools to customize your text and objects.',
      examples: [
        'Change font styles, sizes, and colors using the Home tab',
        'Make text bold, italic, or underlined for emphasis',
        'Align text left, center, or right depending on your design',
        'Resize images and shapes by dragging the corner handles',
        'Move objects around your slide by clicking and dragging them',
        'Use the Format tab when objects are selected for more customization options'
      ]
    },
    {
      title: 'Design Features - Themes and Backgrounds',
      content: 'PowerPoint\'s design features help make your presentation look professional and visually appealing. Themes provide coordinated colors, fonts, and layouts that work well together.',
      examples: [
        'Themes: Go to Design tab to choose from pre-made color and font combinations',
        'Background styles: Customize your slide backgrounds with colors, gradients, or patterns',
        'Choose themes that match your topic (formal for serious topics, colorful for fun topics)',
        'Consistency is key - use the same theme throughout your presentation',
        'Avoid busy backgrounds that make text hard to read',
        'Designer tool (if available) suggests layout improvements for your content'
      ]
    },
    {
      title: 'Adding Transitions Between Slides',
      content: 'Transitions are the visual effects that occur when you move from one slide to the next. They help create smooth flow and keep your audience engaged during your presentation.',
      examples: [
        'Access transitions through the Transitions tab in the ribbon',
        'Popular transitions: Fade, Push, Wipe, and Reveal work well for most presentations',
        'Preview transitions by clicking on them in the gallery',
        'Set transition duration (1-2 seconds is usually perfect)',
        'Apply the same transition to all slides for consistency',
        'Avoid flashy transitions that might distract from your content'
      ]
    },
    {
      title: 'Animations for Individual Objects',
      content: 'Animations make individual objects on your slides appear, move, or disappear in interesting ways. They can help emphasize important points and control the timing of information delivery.',
      examples: [
        'Select an object, then go to Animations tab to choose effects',
        'Entrance animations: Fade In, Fly In, Zoom - make objects appear',
        'Emphasis animations: Pulse, Grow/Shrink - draw attention to objects',
        'Exit animations: Fade Out, Fly Out - make objects disappear',
        'Use Animation Pane to control the order and timing of multiple animations',
        'Keep animations simple and purposeful - they should enhance, not distract'
      ]
    },
    {
      title: 'Slide Show View and Presentation Mode',
      content: 'Slide Show View is how your audience will see your presentation. It displays your slides full-screen without the PowerPoint editing interface, creating a professional presentation experience.',
      examples: [
        'Press F5 or click Slide Show tab > From Beginning to start your presentation',
        'Use arrow keys, space bar, or mouse clicks to advance slides',
        'Press Esc key to exit Slide Show mode and return to editing',
        'Practice your presentation multiple times in Slide Show mode',
        'Check that all text is readable and images are clear in full-screen mode',
        'Use slide show to time your presentation and make adjustments'
      ]
    },
    {
      title: 'Presenter View - Your Secret Presentation Tool',
      content: 'Presenter View is a special mode that shows you additional information while presenting, including speaker notes, upcoming slides, and presentation controls. It\'s like having a personal assistant during your presentation!',
      examples: [
        'Shows your current slide to the audience while giving you extra information',
        'Displays speaker notes that only you can see - great for remembering key points',
        'Preview of the next slide helps you prepare smooth transitions',
        'Built-in timer helps you keep track of presentation length',
        'Laser pointer and pen tools for highlighting important information',
        'Available when you connect your computer to a projector or second monitor'
      ]
    },
    {
      title: 'Saving Your Presentation in Different Formats',
      content: 'PowerPoint allows you to save your presentation in various file formats depending on how you plan to use or share it. Different formats serve different purposes.',
      examples: [
        '.pptx - Standard PowerPoint format, keeps all editing capabilities',
        '.pdf - Creates a document version that anyone can view, great for sharing',
        '.jpg/.png - Saves individual slides as image files',
        '.mp4 - Exports your presentation as a video with timings and narration',
        'PowerPoint Show (.ppsx) - Opens directly in presentation mode',
        'Always keep a .pptx version so you can make future edits'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What are the basic building blocks of a PowerPoint presentation?',
      options: ['Pages', 'Slides', 'Sheets', 'Documents'],
      correct: 1,
      explanation: 'Slides are the basic building blocks of a PowerPoint presentation. Each slide is like a digital page that can contain text, images, and other content.'
    },
    {
      question: 'Which tab would you use to add pictures to your presentation?',
      options: ['Home', 'Insert', 'Design', 'Animations'],
      correct: 1,
      explanation: 'The Insert tab contains tools for adding content like pictures, shapes, charts, and other objects to your slides.'
    },
    {
      question: 'What is the purpose of using themes in PowerPoint?',
      options: ['To add animations', 'To provide coordinated colors and fonts', 'To insert pictures', 'To create charts'],
      correct: 1,
      explanation: 'Themes provide coordinated colors, fonts, and layouts that work well together, making your presentation look professional and visually appealing.'
    },
    {
      question: 'What are transitions in PowerPoint?',
      options: ['Effects between individual objects', 'Visual effects when moving between slides', 'Background colors', 'Font styles'],
      correct: 1,
      explanation: 'Transitions are visual effects that occur when you move from one slide to the next, helping create smooth flow in your presentation.'
    },
    {
      question: 'Which type of animation would you use to make text appear on a slide?',
      options: ['Exit animation', 'Emphasis animation', 'Entrance animation', 'Motion path'],
      correct: 2,
      explanation: 'Entrance animations (like Fade In or Fly In) are used to make objects appear on a slide in an interesting way.'
    },
    {
      question: 'How do you start a presentation in Slide Show mode?',
      options: ['Press Ctrl+S', 'Press F5', 'Press Alt+Tab', 'Press Ctrl+P'],
      correct: 1,
      explanation: 'Pressing F5 starts your presentation from the beginning in Slide Show mode, displaying slides full-screen to your audience.'
    },
    {
      question: 'What is a key benefit of Presenter View?',
      options: ['It makes slides bigger', 'It shows speaker notes that only you can see', 'It adds more animations', 'It changes slide themes'],
      correct: 1,
      explanation: 'Presenter View shows speaker notes that only the presenter can see, along with other helpful tools like a timer and preview of the next slide.'
    },
    {
      question: 'Which file format keeps all editing capabilities in PowerPoint?',
      options: ['.pdf', '.jpg', '.pptx', '.mp4'],
      correct: 2,
      explanation: '.pptx is the standard PowerPoint format that preserves all editing capabilities, allowing you to make changes to your presentation later.'
    },
    {
      question: 'What should you consider when choosing a background for your slides?',
      options: ['It should be as colorful as possible', 'It should make text easy to read', 'It should have many patterns', 'It should change on every slide'],
      correct: 1,
      explanation: 'The most important consideration for slide backgrounds is that they should make your text easy to read and not distract from your content.'
    },
    {
      question: 'What is the recommended font size for slide content?',
      options: ['12 points', '18 points', 'At least 24 points', '36 points'],
      correct: 2,
      explanation: 'Content text should be at least 24 points to ensure it\'s large enough for your audience to read easily, even from the back of the room.'
    }
  ]
}

export default function PowerpointModule() {
  return (
    <ModuleLayout 
      module={powerpointModule} 
      grade={7} 
      subject="Computer Science" 
    />
  )
}