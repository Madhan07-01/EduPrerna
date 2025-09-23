import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const lightReflectionRefractionModule: LearningModule = {
  title: 'Light – Reflection and Refraction',
  introduction: 'Welcome to the fascinating world of Light – Reflection and Refraction! Light is one of the most fundamental and intriguing phenomena in physics. Have you ever wondered why you can see your reflection in a mirror, how a magnifying glass makes objects appear larger, or why a straw looks bent when placed in a glass of water? These everyday observations are governed by the principles of reflection and refraction of light. Understanding these concepts will not only explain the optical illusions you experience daily but also help you comprehend how sophisticated instruments like telescopes, microscopes, cameras, and fiber optic cables work. Get ready to explore the amazing behavior of light and discover how it shapes our visual world!',
  concepts: [
    {
      title: 'Fundamental Principles of Reflection',
      content: 'Reflection is the phenomenon where light bounces back when it strikes a surface. The laws of reflection govern how light behaves when it encounters different surfaces, determining the direction of the reflected rays.',
      examples: [
        'First Law: The incident ray, reflected ray, and normal all lie in the same plane',
        'Second Law: The angle of incidence equals the angle of reflection (∠i = ∠r)',
        'Normal: An imaginary line perpendicular to the reflecting surface at the point of incidence',
        'Incident ray: The incoming light ray that strikes the surface',
        'Reflected ray: The light ray that bounces back from the surface',
        'Angles are measured with respect to the normal, not the surface itself'
      ]
    },
    {
      title: 'Regular vs Diffuse Reflection',
      content: 'The nature of reflection depends on the surface properties. Regular reflection occurs on smooth surfaces, while diffuse reflection happens on rough surfaces, leading to different visual experiences.',
      examples: [
        'Regular reflection: Occurs on smooth, polished surfaces like mirrors or calm water',
        'Example: Clear reflection of yourself in a mirror due to parallel reflected rays',
        'Diffuse reflection: Occurs on rough, irregular surfaces like paper or walls',
        'Example: Light scattering in all directions when hitting a book page, allowing you to read from any angle',
        'Both types follow the laws of reflection at the microscopic level',
        'Diffuse reflection enables us to see non-luminous objects from different angles'
      ]
    },
    {
      title: 'Plane Mirrors - Flat Reflection Surfaces',
      content: 'Plane mirrors are flat reflective surfaces that produce virtual images with specific characteristics. These mirrors are commonly used in daily life and have predictable image properties.',
      examples: [
        'Image characteristics: Virtual, erect, same size as object, laterally inverted',
        'Image distance: Equal to object distance from the mirror',
        'Uses: Bathroom mirrors, dressing tables, periscopes in submarines',
        'Lateral inversion: Left-right reversal (your right hand appears as left in mirror)',
        'Virtual image: Cannot be projected on a screen, appears to be behind the mirror',
        'Field of view: Limited to the mirror\'s size and position'
      ]
    },
    {
      title: 'Spherical Mirrors - Curved Reflection Surfaces',
      content: 'Spherical mirrors have curved reflecting surfaces and are of two types: concave (converging) and convex (diverging). Each type produces different types of images with unique applications.',
      examples: [
        'Concave mirrors: Silvered on the inner surface, converge light rays',
        'Convex mirrors: Silvered on the outer surface, diverge light rays',
        'Center of curvature (C): Center of the sphere of which mirror is a part',
        'Principal axis: Straight line passing through pole and center of curvature',
        'Focus (F): Point where parallel rays converge (concave) or appear to diverge from (convex)',
        'Focal length (f): Distance between pole and focus, f = R/2 (R = radius of curvature)'
      ]
    },
    {
      title: 'Concave Mirrors - Converging Light',
      content: 'Concave mirrors curve inward and converge parallel light rays to a focal point. They can produce both real and virtual images depending on the object\'s position, making them versatile optical devices.',
      examples: [
        'Real images: Formed when light rays actually meet, can be projected on screens',
        'Virtual images: Formed when light rays appear to meet, cannot be projected',
        'Uses: Shaving mirrors (magnified virtual images), satellite dishes, headlights',
        'Image types: Real and inverted when object is beyond focus, virtual and erect when object is between focus and mirror',
        'Applications in telescopes and solar concentrators for energy collection',
        'Medical instruments like ear and eye examination tools'
      ]
    },
    {
      title: 'Convex Mirrors - Diverging Light',
      content: 'Convex mirrors curve outward and diverge parallel light rays. They always produce virtual, erect, and diminished images, providing a wide field of view which makes them valuable for safety applications.',
      examples: [
        'Image characteristics: Always virtual, erect, and smaller than the object',
        'Field of view: Much wider than plane mirrors, shows large area',
        'Uses: Rear-view mirrors in vehicles, security mirrors in stores, street corners',
        'Applications: Passenger side mirrors in cars (show "Objects in mirror are closer than they appear")',
        'Safety applications: Surveillance in parking lots and blind corners',
        'Always forms diminished images regardless of object position'
      ]
    },
    {
      title: 'Fundamental Principles of Refraction',
      content: 'Refraction is the bending of light when it passes from one medium to another with different optical densities. This phenomenon occurs because light travels at different speeds in different materials.',
      examples: [
        'Cause: Change in speed of light as it moves between media of different optical densities',
        'Optically denser medium: Light travels slower (e.g., glass, water)',
        'Optically rarer medium: Light travels faster (e.g., air, vacuum)',
        'When light goes from rarer to denser: Bends toward normal',
        'When light goes from denser to rarer: Bends away from normal',
        'Refractive index: Ratio of speed of light in vacuum to speed in medium'
      ]
    },
    {
      title: 'Snell\'s Law - Mathematical Description of Refraction',
      content: 'Snell\'s Law quantitatively describes the relationship between the angles of incidence and refraction when light passes between two different media. This fundamental law is essential for understanding optical instruments.',
      examples: [
        'Formula: n₁sin(∠i) = n₂sin(∠r), where n₁ and n₂ are refractive indices',
        'n₁sin(∠i) = n₂sin(∠r) can also be written as sin(∠i)/sin(∠r) = n₂/n₁',
        'Absolute refractive index: n = speed of light in vacuum/speed in medium',
        'Relative refractive index: n₂₁ = n₂/n₁ = speed in medium 1/speed in medium 2',
        'Example: Light going from air (n₁=1) to water (n₂=1.33) bends toward normal',
        'Applications: Designing lenses, prisms, and optical fibers'
      ]
    },
    {
      title: 'Types of Lenses - Refracting Optical Elements',
      content: 'Lenses are transparent optical devices that refract light to converge or diverge light rays. They are classified based on their shape and the effect they have on light rays.',
      examples: [
        'Convex lenses (converging): Thicker at center, thinner at edges',
        'Concave lenses (diverging): Thinner at center, thicker at edges',
        'Optical center: Central point through which light passes without deviation',
        'Principal axis: Line passing through centers of curvature of lens surfaces',
        'Focus: Point where parallel rays converge (convex) or appear to diverge from (concave)',
        'Focal length: Distance between optical center and focus'
      ]
    },
    {
      title: 'Total Internal Reflection and Applications',
      content: 'Total internal reflection occurs when light traveling in a denser medium strikes the boundary with a rarer medium at an angle greater than the critical angle, causing all light to be reflected back into the denser medium.',
      examples: [
        'Critical angle: Angle of incidence in denser medium for which angle of refraction is 90°',
        'Condition: Light must travel from denser to rarer medium, and angle of incidence > critical angle',
        'Applications: Optical fibers for telecommunications and medical endoscopes',
        'Mirage formation in hot deserts due to air layers of different temperatures',
        'Brilliance of diamonds due to multiple internal reflections',
        'Prism-based periscopes and binoculars for enhanced viewing'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What are the two laws of reflection?',
      options: ['Light travels in straight lines and bends at surfaces', 'Angle of incidence equals angle of reflection and all rays lie in same plane', 'Light is fastest in vacuum and slower in materials', 'Reflection only occurs on mirrors'],
      correct: 1,
      explanation: 'The two laws of reflection are: 1) The angle of incidence equals the angle of reflection (∠i = ∠r), and 2) The incident ray, reflected ray, and normal all lie in the same plane.'
    },
    {
      question: 'What is the main difference between regular and diffuse reflection?',
      options: ['Regular reflection occurs on rough surfaces, diffuse on smooth', 'Regular reflection produces clear images, diffuse scatters light', 'Regular reflection is stronger than diffuse', 'There is no difference'],
      correct: 1,
      explanation: 'Regular reflection occurs on smooth surfaces and produces clear images with parallel reflected rays, while diffuse reflection occurs on rough surfaces and scatters light in various directions.'
    },
    {
      question: 'What type of image is always formed by a plane mirror?',
      options: ['Real and inverted', 'Virtual and erect', 'Real and magnified', 'Virtual and inverted'],
      correct: 1,
      explanation: 'A plane mirror always forms a virtual, erect image that is the same size as the object and appears to be behind the mirror at the same distance as the object is in front of it.'
    },
    {
      question: 'Which type of mirror converges parallel light rays to a point?',
      options: ['Plane mirror', 'Convex mirror', 'Concave mirror', 'Both convex and concave'],
      correct: 2,
      explanation: 'A concave mirror converges parallel light rays to a focal point, which is why it\'s called a converging mirror. Convex mirrors diverge light rays.'
    },
    {
      question: 'What happens to light when it travels from air into water?',
      options: ['It speeds up and bends away from the normal', 'It slows down and bends toward the normal', 'It maintains the same speed', 'It stops completely'],
      correct: 1,
      explanation: 'When light travels from air (rarer medium) into water (denser medium), it slows down and bends toward the normal due to refraction.'
    },
    {
      question: 'What does Snell\'s Law describe?',
      options: ['The reflection of light from mirrors', 'The relationship between angles of incidence and refraction', 'The speed of light in vacuum', 'The formation of images by lenses'],
      correct: 1,
      explanation: 'Snell\'s Law describes the relationship between the angles of incidence and refraction when light passes between two different media: n₁sin(∠i) = n₂sin(∠r).'
    },
    {
      question: 'What is the main characteristic of a convex lens?',
      options: ['It diverges light rays', 'It is thinner at the center', 'It converges light rays', 'It always forms virtual images'],
      correct: 2,
      explanation: 'A convex lens is thicker at the center and thinner at the edges, which causes it to converge parallel light rays to a focal point, hence it\'s called a converging lens.'
    },
    {
      question: 'Under what conditions does total internal reflection occur?',
      options: ['Light travels from rarer to denser medium at any angle', 'Light travels from denser to rarer medium at angle greater than critical angle', 'Light hits a mirror at 90 degrees', 'Light passes through a lens'],
      correct: 1,
      explanation: 'Total internal reflection occurs when light travels from a denser medium to a rarer medium and the angle of incidence is greater than the critical angle for that pair of media.'
    },
    {
      question: 'What is one application of total internal reflection?',
      options: ['Making mirrors', 'Creating rainbows', 'Optical fibers for telecommunications', 'Magnifying glasses'],
      correct: 2,
      explanation: 'Optical fibers use total internal reflection to transmit light signals over long distances with minimal loss, making them essential for modern telecommunications and internet infrastructure.'
    },
    {
      question: 'If the angle of incidence is 30° and the angle of reflection is also 30°, which law does this demonstrate?',
      options: ['Law of refraction', 'First law of reflection', 'Second law of reflection', 'Law of optical density'],
      correct: 2,
      explanation: 'This demonstrates the second law of reflection, which states that the angle of incidence equals the angle of reflection (∠i = ∠r).'
    }
  ]
}

export default function LightReflectionRefractionModule() {
  return (
    <ModuleLayout 
      module={lightReflectionRefractionModule} 
      grade={10} 
      subject="Science" 
    />
  )
}