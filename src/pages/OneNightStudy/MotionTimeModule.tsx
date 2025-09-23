import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const motionTimeModule: LearningModule = {
  title: 'Motion and Time - Complete Module',
  introduction: 'Welcome to the fascinating world of Motion and Time! Every moment of your life involves motion - from the beating of your heart to the rotation of Earth around the Sun. Motion is everywhere around us, and understanding it helps us make sense of the world we live in. Whether you\'re watching a car drive by, a bird flying overhead, or even just walking to school, you\'re observing the principles of motion in action. Let\'s explore how objects move, how we measure motion, and how time plays a crucial role in understanding movement!',
  concepts: [
    {
      title: 'Understanding Motion and Reference Points',
      content: 'Motion is the change in position of an object with respect to time and relative to a reference point. An object appears to be in motion or at rest depending on the observer\'s frame of reference.',
      examples: [
        'A passenger in a moving train appears stationary to other passengers but moving to someone on the platform',
        'The Moon appears to move across the sky, but actually Earth is rotating',
        'Choose reference points wisely: a tree, building, or stationary landmark',
        'Motion is relative: what appears moving to one observer may appear stationary to another',
        'Rest and motion are relative terms - no object is absolutely at rest or in motion',
        'Reference frame: coordinate system from which motion is observed and measured'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What determines whether an object is in motion or at rest?',
      options: ['The speed of the object', 'The reference point chosen', 'The size of the object', 'The weight of the object'],
      correct: 1,
      explanation: 'Motion is relative and depends on the reference point or frame of reference chosen by the observer.'
    }
  ]
}

export default function MotionTimeModule() {
  return (
    <ModuleLayout 
      module={motionTimeModule} 
      grade={7} 
      subject="Science" 
    />
  )
}