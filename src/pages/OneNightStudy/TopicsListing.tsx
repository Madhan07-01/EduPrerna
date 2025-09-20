import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Topic } from './types'

type FAQ = { q: string; a: string; grades?: number[] }

const curatedTopics: Topic[] = [
  { grade: 6, subject: 'Mathematics', title: 'Integers - Complete Module', bullets: ['Definition and representation', 'Absolute value concept', 'Comparing and ordering', 'All four operations', 'Properties and rules'] },
  { grade: 6, subject: 'Mathematics', title: 'Fractions & Decimals', bullets: ['Simplify and compare fractions', 'Convert fractions ↔ decimals', 'Add/Subtract with LCM', 'Multiply/Divide fractions and decimals'] },
  { grade: 6, subject: 'Science', title: 'Electricity and Circuits - Complete Module', bullets: ['Definition of electricity and current', 'Circuit components and functions', 'Series vs parallel circuits', 'Conductors vs insulators', 'Electrical safety rules'] },
  { grade: 6, subject: 'Science', title: 'Our Body and Health - Complete Module', bullets: ['Human body systems overview', 'Health and hygiene importance', 'Balanced diet and nutrients', 'Disease prevention basics', 'Daily health practices'] },
  { grade: 6, subject: 'Computer Science', title: 'Word Processor – Tabular Presentation - Complete Module', bullets: ['Table components: rows, columns, cells', 'Creating and inserting tables', 'Merging and splitting cells', 'Formatting and styling tables', 'Advantages of tabular presentation'] },
  { grade: 7, subject: 'Mathematics', title: 'Fractions and Decimals - Complete Module', bullets: ['Types of fractions: proper, improper, mixed, like, unlike', 'Addition and subtraction rules', 'Multiplication and division techniques', 'Decimal place values and operations', 'Converting between fractions and decimals'] },
  { grade: 7, subject: 'Science', title: 'Motion and Time - Complete Module', bullets: ['Definition of motion and reference points', 'Uniform vs non-uniform motion', 'Distance vs displacement', 'Speed formula and calculations', 'Time measurement and units', 'Motion graphs interpretation', 'Measuring instruments for motion'] },
  { grade: 7, subject: 'Science', title: 'Electric Current and Circuits - Complete Module', bullets: ['Electric current definition and formula', 'Voltage and resistance concepts', 'Circuit components and functions', 'Series vs parallel circuits', 'Switches and safety devices', 'Conductors vs insulators'] },
  { grade: 7, subject: 'Science', title: 'Heat - Complete Module', bullets: ['Heat vs temperature definition', 'Conduction, convection, radiation', 'Effects: expansion and state changes', 'Temperature measurement basics', 'Specific heat capacity introduction', 'Heat conductors vs insulators'] },
  { grade: 7, subject: 'Science', title: 'Life Processes - Complete Module', bullets: ['Nutrition: autotrophic vs heterotrophic', 'Respiration: aerobic vs anaerobic', 'Transportation in plants and humans', 'Excretion in plants and humans', 'Reproduction: asexual vs sexual', 'Homeostasis concept'] },
  { grade: 7, subject: 'Science', title: 'Nutrition in Animals and Plants - Complete Module', bullets: ['Photosynthesis process and requirements', 'Plant nutrition types: autotrophic, parasitic, insectivorous', 'Animal diet types: herbivores, carnivores, omnivores', 'Human digestive system overview', 'Nutrition in insects and Amoeba', 'Overall importance of nutrition'] },
  { grade: 7, subject: 'Science', title: 'Respiration and Circulation - Complete Module', bullets: ['Aerobic vs anaerobic respiration types', 'Heart chambers and blood pumping', 'Blood vessels: arteries, veins, capillaries', 'Blood components and their functions', 'Pulmonary vs systemic circulation', 'Integration of breathing and blood flow'] },
  { grade: 7, subject: 'Computer Science', title: 'Microsoft PowerPoint - Complete Module', bullets: ['Slide components and structure', 'Adding text, images, shapes, and charts', 'Design themes and backgrounds', 'Transitions and animations', 'Slide Show and Presenter View', 'File formats and saving options'] },
]

const faqBank: Record<string, FAQ[]> = {
  Mathematics: [
    { q: 'What formulae should I memorize for this chapter?', a: 'List core identities and standard results (e.g., quadratic formula, factoring identities, derivative/integral basics for higher grades).', grades: [9,10,11,12] },
    { q: 'How do I quickly check my answer?', a: 'Substitute the solution back into the original equation; for graphs, verify intercepts and slopes match expected values.' },
    { q: 'What are common mistakes to avoid?', a: 'Sign errors, wrong order of operations, and skipping unit checks in word problems are frequent pitfalls.' },
    { q: 'How to revise efficiently before exam?', a: 'Solve 3–5 mixed problems covering concepts from the bullet list; time yourself and review each step.' },
  ],
  Science: [
    { q: 'Which equations are essential?', a: 'Keep a sheet of key relations (e.g., kinematics, electricity, optics); note variables and units for each.', grades: [9,10,11,12] },
    { q: 'How to approach numericals fast?', a: 'Write knowns/unknowns, pick the governing law, ensure units are in SI, then compute and sanity-check magnitudes.' },
    { q: 'How can I avoid conceptual traps?', a: 'Differentiate scalar vs vector, series vs parallel, and note directionality in field/force diagrams.' },
  ],
  'Computer Science': [
    { q: 'How do I practice coding concepts?', a: 'Use online platforms like Scratch (for beginners), CodePen, or repl.it; solve small problems daily and gradually increase complexity.', grades: [6,7,8] },
    { q: 'What programming language should I start with?', a: 'For beginners, Python or JavaScript are excellent choices due to readable syntax and wide application. Block-based languages like Scratch are perfect for grades 6-7.' },
    { q: 'How to debug effectively?', a: 'Use print statements to track variable values, read error messages carefully, test small code sections, and use debugging tools in your IDE.' },
    { q: 'How to prepare for programming assessments?', a: 'Practice implementing algorithms from scratch, review common data structures, and solve problems with time constraints to build speed and accuracy.', grades: [9,10,11,12] },
  ],
}

export default function TopicsListing() {
  const navigate = useNavigate()
  const [gradeFilter, setGradeFilter] = useState<number>(6)
  const [subjectFilter, setSubjectFilter] = useState<string>('Mathematics')
  const [reviewed, setReviewed] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ons_reviewed')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const subjects = useMemo(() => Array.from(new Set(curatedTopics.map(t => t.subject))), [])

  useEffect(() => {
    if (subjectFilter !== 'all' && !subjects.includes(subjectFilter) && subjects.length > 0) {
      setSubjectFilter('all')
    }
  }, [subjects, subjectFilter])

  const filtered = useMemo(() => curatedTopics.filter(t => {
    const gradeOk = t.grade === gradeFilter
    const subjectOk = subjectFilter === 'all' ? true : t.subject === subjectFilter
    return gradeOk && subjectOk
  }), [gradeFilter, subjectFilter])

  const subjectOptions = useMemo(() => ['all', ...subjects], [subjects])

  const faqsForSelection: FAQ[] = useMemo(() => {
    if (subjectFilter === 'all') return []
    const bank = faqBank[subjectFilter] || []
    return bank.filter(f => !f.grades || f.grades.includes(gradeFilter)).slice(0, 5)
  }, [subjectFilter, gradeFilter])

  const toggleReviewed = (key: string) => {
    const next = { ...reviewed, [key]: !reviewed[key] }
    setReviewed(next)
    try { localStorage.setItem('ons_reviewed', JSON.stringify(next)) } catch (error) {
      console.error('Failed to save review status to localStorage:', error)
    }
  }

  const getModuleRoute = (title: string) => {
    const routes: Record<string, string> = {
      'Integers - Complete Module': 'integers',
      'Microsoft PowerPoint - Complete Module': 'powerpoint',
      'Motion and Time - Complete Module': 'motion-time',
      'Respiration and Circulation - Complete Module': 'respiration-circulation',
      'Heat - Complete Module': 'heat',
      'Life Processes - Complete Module': 'life-processes',
      // Add more mappings as needed
    }
    return routes[title] || 'integers' // fallback
  }

  const handleModuleClick = (title: string) => {
    const route = getModuleRoute(title)
    navigate(`/onestudy/${route}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-3 md:items-end">
        <div>
          <div className="text-xs text-gray-600 dark:text-slate-400">Grade</div>
          <select value={gradeFilter} onChange={(e) => setGradeFilter(Number(e.target.value))} className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
            {[6,7,8,9,10,11,12].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <div className="text-xs text-gray-600 dark:text-slate-400">Subject</div>
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
            {subjectOptions.map(s => <option key={s} value={s}>{s === 'all' ? 'All' : s}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t, idx) => {
          const key = `${t.grade}-${t.subject}-${t.title}`
          const isReviewed = reviewed[key]
          const hasRoute = ['Integers - Complete Module', 'Microsoft PowerPoint - Complete Module', 'Motion and Time - Complete Module', 'Respiration and Circulation - Complete Module', 'Heat - Complete Module', 'Life Processes - Complete Module'].includes(t.title)
          
          return (
            <div key={idx} className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">Grade {t.grade} • {t.subject}</div>
                  <div className="text-gray-900 dark:text-white font-semibold">{t.title}</div>
                </div>
                <button 
                  aria-label="Mark as reviewed" 
                  onClick={() => toggleReviewed(key)} 
                  className={`text-xs px-2 py-1 rounded-md border ${isReviewed ? 'bg-emerald-600 border-emerald-700 text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-slate-300'}`}
                >
                  {isReviewed ? 'Reviewed' : 'Mark reviewed'}
                </button>
              </div>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 dark:text-slate-300">
                {t.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              
              {/* Launch button for available modules */}
              {hasRoute && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => handleModuleClick(t.title)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>🚀</span>
                    <span>Start Complete Learning Module</span>
                  </button>
                  <p className="text-xs text-gray-500 dark:text-slate-400 text-center mt-2">
                    Interactive lessons + MCQs + Self-checking
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
        <div className="text-gray-900 dark:text-white font-semibold mb-2">FAQs</div>
        {subjectFilter === 'all' ? (
          <div className="text-sm text-gray-700 dark:text-slate-300">Select a subject to view grade-specific FAQs.</div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-slate-800">
            {faqsForSelection.map((f, i) => (
              <details key={i} className="py-2">
                <summary className="cursor-pointer text-sm font-medium text-gray-800 dark:text-slate-200">{f.q}</summary>
                <div className="mt-1 text-sm text-gray-700 dark:text-slate-300">{f.a}</div>
              </details>
            ))}
            {faqsForSelection.length === 0 && (
              <div className="text-sm text-gray-700 dark:text-slate-300 py-2">FAQs will appear here for the selected grade and subject.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}