import type { Course, Subject } from './types'

const subjects: Subject[] = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']

const baseTitles: Record<Subject, string[]> = {
  Mathematics: ['Algebra Basics', 'Linear Equations', 'Fractions & Decimals', 'Geometry Essentials', 'Trigonometry Intro', 'Probability', 'Statistics Basics', 'Quadratic Functions', 'Number Theory', 'Graphs & Functions', 'Inequalities', 'Polynomials', 'Sequences'],
  Physics: ['Motion & Forces', 'Electric Circuits', 'Waves & Sound', 'Light & Optics', 'Heat & Thermodynamics', 'Magnetism', 'Energy & Work', 'Modern Physics', 'Nuclear Physics', 'Electromagnetism', 'Fluid Mechanics', 'Rotational Motion'],
  Chemistry: ['Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'Acids & Bases', 'Organic Chemistry Intro', 'Stoichiometry', 'Chemical Reactions', 'Thermochemistry', 'Solutions', 'Electrochemistry', 'Kinetics', 'Equilibrium'],
  Biology: ['Cell Structure', 'Plant vs Animal Cells', 'Human Body Systems', 'Genetics', 'Evolution', 'Ecology', 'Microorganisms', 'Reproduction', 'Photosynthesis', 'Respiration', 'Homeostasis', 'Immunity'],
  'Computer Science': ['Programming Basics', 'Algorithms Intro', 'Web Development', 'Data Structures', 'Database Basics', 'Networking', 'Operating Systems', 'Cybersecurity Basics', 'AI & ML Intro', 'Python Projects', 'Version Control', 'Software Testing'],
}

function randomDesc(subject: Subject, title: string) {
  return `${subject} course on ${title}. Learn concepts with examples, practice problems, and quizzes.`
}

export function generateCourses(): Course[] {
  const courses: Course[] = []
  for (const subject of subjects) {
    for (let grade: 6 | 7 | 8 | 9 | 10 | 11 | 12 = 6; grade <= 12; grade = (grade + 1) as 6 | 7 | 8 | 9 | 10 | 11 | 12) {
      const titles = baseTitles[subject]
      for (let i = 0; i < 10; i++) {
        const base = titles[i % titles.length]
        const title = `${base} (G${grade})`
        const courseId = `${subject.substring(0,3).toUpperCase()}-${grade}-${i+1}`
        const modules = Array.from({ length: 6 }, (_, m) => `${title} • Module ${m + 1}`)
        const progress = Math.floor(Math.random() * 101)
        courses.push({ courseId, subject, grade, title, description: randomDesc(subject, base), modules, progress })
      }
    }
  }
  return courses
}

