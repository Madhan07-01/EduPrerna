import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const humanEyeColourfulWorldModule: LearningModule = {
  title: 'Human Eye and Colourful World',
  introduction: 'Welcome to the amazing world of the Human Eye and Colourful World! Have you ever wondered how you can see the brilliant blue sky, the vibrant rainbow after a storm, or why stars seem to twinkle at night? The answers lie in understanding how our incredible eyes work and how light interacts with our atmosphere. The human eye is nature\'s most sophisticated optical instrument, capable of detecting millions of colors and adapting to different lighting conditions. At the same time, the colorful world around us is created by fascinating phenomena like dispersion, scattering, and refraction of light. Get ready to explore the wonderful mechanisms that allow us to perceive the visual beauty of our world!',
  concepts: [
    {
      title: 'Structure and Function of the Human Eye',
      content: 'The human eye is a complex optical system that captures light and converts it into electrical signals for the brain to interpret. Each part plays a crucial role in forming clear images of the world around us.',
      examples: [
        'Cornea: Transparent front layer that provides most of the eye\'s focusing power by refracting light',
        'Iris: Colored muscular ring that controls the size of the pupil, regulating light entry',
        'Pupil: Opening in the iris that expands and contracts to control light amount',
        'Lens: Flexible biconvex structure that fine-tunes focus by changing shape (accommodation)',
        'Retina: Light-sensitive layer containing rods (for brightness) and cones (for color) at the back of the eye',
        'Optic nerve: Bundle of nerve fibers that carries visual signals from retina to the brain',
        'Ciliary muscles: Muscles that change lens shape for focusing on near and distant objects'
      ]
    },
    {
      title: 'Power of Accommodation - How Eyes Focus',
      content: 'The eye\'s ability to focus on objects at different distances is called accommodation. This remarkable feature allows us to switch focus between nearby and distant objects seamlessly.',
      examples: [
        'Near vision: Ciliary muscles contract, lens becomes more curved (thicker) for increased focusing power',
        'Distant vision: Ciliary muscles relax, lens becomes flatter (thinner) for decreased focusing power',
        'Normal eye: Can focus on objects from 25 cm (near point) to infinity (far point)',
        'Elasticity of lens decreases with age, reducing accommodation ability',
        'Young eyes can adjust focus quickly; older eyes take longer to switch between distances',
        'This mechanism works similarly to adjusting a camera lens for sharp images'
      ]
    },
    {
      title: 'Myopia (Short-sightedness) - Seeing Nearby Clearly',
      content: 'Myopia is a common vision defect where distant objects appear blurry, but nearby objects can be seen clearly. It occurs when the eye focuses light in front of the retina instead of on it.',
      examples: [
        'Cause: Elongated eyeball or overly curved cornea/lens',
        'Symptoms: Difficulty seeing distant objects like road signs or classroom boards',
        'Correction: Concave (diverging) lens with negative power',
        'How correction works: Concave lens diverges light rays before entering eye, moving image back onto retina',
        'Example calculation: If far point is 50 cm, lens power = -2.0 D (P = 1/f, f = -0.5 m)',
        'Prevention: Proper lighting while reading, regular eye check-ups, limiting screen time'
      ]
    },
    {
      title: 'Hypermetropia (Long-sightedness) - Seeing Distantly Clearly',
      content: 'Hypermetropia is a vision defect where nearby objects appear blurry, but distant objects can be seen clearly. It occurs when the eye focuses light behind the retina instead of on it.',
      examples: [
        'Cause: Shortened eyeball or insufficiently curved cornea/lens',
        'Symptoms: Difficulty reading books or seeing nearby objects clearly',
        'Correction: Convex (converging) lens with positive power',
        'How correction works: Convex lens converges light rays before entering eye, moving image forward onto retina',
        'Example calculation: If near point is 50 cm instead of 25 cm, lens power = +2.0 D',
        'Often present from birth but may not cause problems until middle age'
      ]
    },
    {
      title: 'Presbyopia and Other Vision Defects',
      content: 'As we age, our eyes undergo changes that affect vision. Presbyopia is the most common age-related vision problem, along with other less common defects.',
      examples: [
        'Presbyopia: Age-related loss of lens elasticity, making it hard to focus on nearby objects',
        'Correction: Bifocal or progressive lenses (upper part for distance, lower for reading)',
        'Astigmatism: Irregular curvature of cornea or lens causing distorted vision at all distances',
        'Correction: Cylindrical lenses to compensate for uneven curvature',
        'Cataract: Clouding of the lens, causing blurred vision',
        'Treatment: Surgical removal and artificial lens implantation'
      ]
    },
    {
      title: 'Dispersion of Light - Creating Rainbows',
      content: 'Dispersion is the phenomenon where white light splits into its component colors when passing through a transparent medium. This occurs because different colors travel at different speeds in the medium.',
      examples: [
        'Cause: Different wavelengths of light have different refractive indices in the same medium',
        'Order of colors: Violet, Indigo, Blue, Green, Yellow, Orange, Red (VIBGYOR)',
        'Violet bends most (shortest wavelength), Red bends least (longest wavelength)',
        'Natural example: Rainbow formation when sunlight passes through water droplets',
        'Artificial example: White light passing through a glass prism',
        'Application: Spectrometers for analyzing light from stars and chemical substances'
      ]
    },
    {
      title: 'Scattering of Light - Why Sky is Blue',
      content: 'Scattering occurs when light interacts with particles in the atmosphere. The amount of scattering depends on the wavelength of light and the size of the particles.',
      examples: [
        'Rayleigh scattering: Occurs when particles are much smaller than light wavelength (gas molecules)',
        'Effect: Shorter wavelengths (blue/violet) scatter more than longer wavelengths (red)',
        'Why sky is blue: Blue light from sun scatters in all directions by air molecules',
        'Why sunsets are red: Sunlight travels longer path through atmosphere, blue light scattered away, red light reaches observer',
        'Mie scattering: Occurs with larger particles (dust, water droplets), scatters all colors equally',
        'Why clouds are white: All colors scattered equally by water droplets'
      ]
    },
    {
      title: 'Atmospheric Refraction - Twinkling Stars and Apparent Position',
      content: 'Atmospheric refraction occurs when light bends as it passes through layers of air with different densities. This phenomenon explains several interesting natural observations.',
      examples: [
        'Twinkling of stars: Light from stars passes through turbulent atmosphere layers of varying density',
        'Apparent star position: Stars appear slightly higher in the sky than their actual position',
        'Early sunrise and delayed sunset: Sun visible 2 minutes before actual sunrise and 2 minutes after actual sunset',
        'Flattened sun: Sun appears flattened at sunrise/sunset due to differential refraction',
        'Mirages: Light from sky bends upward in hot air layers, creating illusion of water on roads',
        'Shimmering of distant objects: Heat waves cause air density variations that make objects appear to shimmer'
      ]
    },
    {
      title: 'Color Perception in Humans - How We See Colors',
      content: 'Human color vision depends on specialized cells in the retina called cones. Our perception of color is a complex process involving these cells and the brain.',
      examples: [
        'Three types of cones: Sensitive to short (blue), medium (green), and long (red) wavelengths',
        'Trichromatic theory: All colors perceived as combinations of red, green, and blue responses',
        'Color mixing: Red + Green = Yellow, Red + Blue = Magenta, Green + Blue = Cyan',
        'Complementary colors: Colors that combine to produce white light (red & cyan, green & magenta, blue & yellow)',
        'Color blindness: Deficiency in one or more cone types, most commonly red-green color blindness',
        'Rods vs cones: Rods for night vision (no color), cones for daylight and color vision'
      ]
    },
    {
      title: 'Natural Phenomena and Optical Effects',
      content: 'Many beautiful natural phenomena are explained by the interaction of light with matter in our atmosphere. Understanding these effects helps us appreciate nature\'s optical wonders.',
      examples: [
        'Rainbow formation: Combination of dispersion and internal reflection in water droplets',
        'Secondary rainbow: Two internal reflections creating reversed color order and fainter appearance',
        'Halos and coronas: Diffraction and interference of light by ice crystals or water droplets',
        'Blue hour and golden hour: Atmospheric scattering effects during sunrise and sunset',
        'Green flash: Refraction effect causing brief green color at sunset/sunrise',
        'Red-eye effect in photos: Light from flash reflecting off blood vessels in the retina'
      ]
    }
  ],
  mcqs: [
    {
      question: 'Which part of the eye changes its shape to focus on objects at different distances?',
      options: ['Cornea', 'Iris', 'Lens', 'Retina'],
      correct: 2,
      explanation: 'The lens changes its shape through the action of ciliary muscles to focus on objects at different distances. This process is called accommodation.'
    },
    {
      question: 'What causes the sky to appear blue during the day?',
      options: ['Reflection of ocean color', 'Absorption of blue light by atmosphere', 'Scattering of blue light by air molecules', 'Emission of blue light by air molecules'],
      correct: 2,
      explanation: 'The sky appears blue due to Rayleigh scattering, where shorter blue wavelengths of sunlight are scattered more than longer wavelengths by tiny air molecules in the atmosphere.'
    },
    {
      question: 'Which vision defect is corrected using a concave lens?',
      options: ['Hypermetropia', 'Presbyopia', 'Myopia', 'Astigmatism'],
      correct: 2,
      explanation: 'Myopia (short-sightedness) is corrected using a concave (diverging) lens, which spreads out light rays before they enter the eye, moving the focal point back onto the retina.'
    },
    {
      question: 'What is the correct order of colors in a rainbow from outer to inner edge?',
      options: ['VIBGYOR', 'ROYGBIV', 'Red to Violet', 'Blue to Red'],
      correct: 0,
      explanation: 'The order of colors in a rainbow from outer to inner edge is Violet, Indigo, Blue, Green, Yellow, Orange, Red (VIBGYOR). Violet bends the most and appears on the inner edge.'
    },
    {
      question: 'Which part of the eye controls the amount of light entering?',
      options: ['Cornea', 'Lens', 'Pupil', 'Retina'],
      correct: 2,
      explanation: 'The pupil controls the amount of light entering the eye by adjusting its size. In bright light, the pupil constricts (becomes smaller), and in dim light, it dilates (becomes larger).'
    },
    {
      question: 'Why do stars appear to twinkle?',
      options: ['They are actually blinking', 'Atmospheric refraction', 'Reflection from moonlight', 'Light pollution'],
      correct: 1,
      explanation: 'Stars twinkle due to atmospheric refraction. As starlight passes through Earth\'s turbulent atmosphere, it gets bent by air layers of varying density, causing the apparent position and brightness to fluctuate.'
    },
    {
      question: 'What happens to the lens when viewing a nearby object?',
      options: ['It becomes flatter', 'It becomes more curved', 'It moves backward', 'It changes color'],
      correct: 1,
      explanation: 'When viewing a nearby object, the ciliary muscles contract, causing the lens to become more curved (thicker) to increase its focusing power for near vision.'
    },
    {
      question: 'Which type of lens is used to correct hypermetropia?',
      options: ['Concave lens', 'Convex lens', 'Cylindrical lens', 'Bifocal lens'],
      correct: 1,
      explanation: 'Hypermetropia (long-sightedness) is corrected using a convex (converging) lens, which brings light rays together before they enter the eye, moving the focal point forward onto the retina.'
    },
    {
      question: 'What causes dispersion of white light through a prism?',
      options: ['Different colors have different speeds in the prism', 'Prism absorbs some colors', 'Prism emits different colors', 'Light reflects off prism surface'],
      correct: 0,
      explanation: 'Dispersion occurs because different colors of light have different wavelengths and therefore travel at different speeds through the same medium, causing them to refract at slightly different angles.'
    },
    {
      question: 'Which cells in the retina are responsible for color vision?',
      options: ['Rods', 'Cones', 'Iris cells', 'Cornea cells'],
      correct: 1,
      explanation: 'Cones are the photoreceptor cells in the retina responsible for color vision and function best in bright light. There are three types of cones sensitive to red, green, and blue light.'
    }
  ]
}

export default function HumanEyeColourfulWorldModule() {
  return (
    <ModuleLayout 
      module={humanEyeColourfulWorldModule} 
      grade={10} 
      subject="Science" 
    />
  )
}