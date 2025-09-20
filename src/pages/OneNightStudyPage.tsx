import { useEffect, useMemo, useState } from 'react'

type Topic = {
  grade: number
  subject: string
  title: string
  bullets: string[]
}

const curatedTopics: Topic[] = [
  { grade: 6, subject: 'Mathematics', title: 'Fractions & Decimals', bullets: ['Simplify and compare fractions', 'Convert fractions ↔ decimals', 'Add/Subtract with LCM', 'Multiply/Divide fractions and decimals'] },
  { grade: 6, subject: 'Science', title: 'Food & Components', bullets: ['Carbohydrates, proteins, fats', 'Balanced diet basics', 'Deficiency diseases overview'] },
  { grade: 7, subject: 'Mathematics', title: 'Integers & Rational Numbers', bullets: ['Number line operations', 'Properties: commutative, associative', 'Rational number comparison'] },
  { grade: 7, subject: 'Science', title: 'Nutrition in Plants', bullets: ['Photosynthesis equation', 'Heterotrophic nutrition', 'Nitrogen fixation basics'] },
  { grade: 8, subject: 'Mathematics', title: 'Linear Equations in One Variable', bullets: ['Isolate variable technique', 'Transposition method', 'Word problems templates'] },
  { grade: 8, subject: 'Science', title: 'Force & Pressure', bullets: ['Contact vs non-contact forces', 'Pressure = Force/Area', 'Applications in fluids'] },
  { grade: 9, subject: 'Mathematics', title: 'Polynomials & Factorization', bullets: ['Degree and coefficient', 'Factor by grouping', 'Identities: a²−b², (a±b)²'] },
  { grade: 9, subject: 'Physics', title: 'Motion', bullets: ['Speed, velocity, acceleration', 's = ut + 1/2 at²', 'Distance-time graphs'] },
  { grade: 9, subject: 'Chemistry', title: 'Atoms & Molecules', bullets: ['Laws of chemical combination', 'Atomic and molecular mass', 'Mole concept basics'] },
  { grade: 9, subject: 'Biology', title: 'Tissues', bullets: ['Plant vs animal tissues', 'Meristematic vs permanent', 'Functions and examples'] },
  { grade: 10, subject: 'Mathematics', title: 'Quadratic Equations', bullets: ['Standard form ax²+bx+c=0', 'Discriminant Δ = b²−4ac', 'Roots: (-b±√Δ)/2a'] },
  { grade: 10, subject: 'Physics', title: 'Electricity', bullets: ['Ohm’s law V=IR', 'Series vs parallel', 'Power P=VI=I²R=V²/R'] },
  { grade: 10, subject: 'Chemistry', title: 'Chemical Reactions & Equations', bullets: ['Balancing equations', 'Types: combination, decomposition, displacement', 'Oxidation and reduction basics'] },
  { grade: 10, subject: 'Biology', title: 'Life Processes', bullets: ['Nutrition and respiration', 'Transport in plants and animals', 'Excretion overview'] },
  { grade: 11, subject: 'Physics', title: 'Kinematics & Vectors', bullets: ['Projectile components', 'Relative velocity basics', 'Vector addition and resolution'] },
  { grade: 11, subject: 'Chemistry', title: 'Thermodynamics', bullets: ['First law ΔU=Q−W', 'Enthalpy and entropy', 'Gibbs free energy ΔG=ΔH−TΔS'] },
  { grade: 11, subject: 'Mathematics', title: 'Relations & Functions', bullets: ['Domain, codomain, range', 'Types of relations', 'Function composition basics'] },
  { grade: 11, subject: 'Biology', title: 'Plant Physiology', bullets: ['Photosynthesis light and dark reactions', 'Transpiration and stomata', 'Mineral nutrition'] },
  { grade: 12, subject: 'Physics', title: 'Electrostatics', bullets: ['Coulomb’s law', 'Electric field lines', 'Capacitance C=Q/V'] },
  { grade: 12, subject: 'Chemistry', title: 'Chemical Kinetics', bullets: ['Rate laws and order', 'Arrhenius equation', 'Half-life for first order'] },
  { grade: 12, subject: 'Mathematics', title: 'Integration Basics', bullets: ['∫x^n dx formula', 'Substitution technique', 'Definite integral properties'] },
  { grade: 12, subject: 'Biology', title: 'Human Reproduction', bullets: ['Male and female reproductive systems', 'Gametogenesis', 'Menstrual cycle overview'] },
]

type FAQ = { q: string; a: string; grades?: number[] }
const faqBank: Record<string, FAQ[]> = {
  Mathematics: [
    { q: 'What formulae should I memorize for this chapter?', a: 'List core identities and standard results (e.g., quadratic formula, factoring identities, derivative/integral basics for higher grades).', grades: [9,10,11,12] },
    { q: 'How do I quickly check my answer?', a: 'Substitute the solution back into the original equation; for graphs, verify intercepts and slopes match expected values.' },
    { q: 'What are common mistakes to avoid?', a: 'Sign errors, wrong order of operations, and skipping unit checks in word problems are frequent pitfalls.' },
    { q: 'How to revise efficiently before exam?', a: 'Solve 3–5 mixed problems covering concepts from the bullet list; time yourself and review each step.' },
  ],
  Physics: [
    { q: 'Which equations are essential?', a: 'Keep a sheet of key relations (e.g., kinematics, electricity, optics); note variables and units for each.', grades: [9,10,11,12] },
    { q: 'How to approach numericals fast?', a: 'Write knowns/unknowns, pick the governing law, ensure units are in SI, then compute and sanity-check magnitudes.' },
    { q: 'How can I avoid conceptual traps?', a: 'Differentiate scalar vs vector, series vs parallel, and note directionality in field/force diagrams.' },
  ],
  Chemistry: [
    { q: 'What should I focus on last minute?', a: 'Balancing equations, reaction types, periodic trends, and quick mole-mass conversions.', grades: [9,10] },
    { q: 'Any tips for numerical accuracy?', a: 'Use atomic mass rounded consistently; clearly set up mole ratios before calculating products/reactants.' },
    { q: 'How do I structure definition answers?', a: 'State the core idea in one line, add a short example if relevant, and end with significance or application.' },
  ],
  Biology: [
    { q: 'What diagrams should I practice?', a: 'Labelled diagrams for tissues/organs, cycles (e.g., menstrual, photosynthesis) with 4–6 critical labels.', grades: [9,10,11,12] },
    { q: 'How to remember processes?', a: 'Convert steps into a 4–5 point flow; use mnemonics and understand “why” each step occurs.' },
    { q: 'What gets most weightage?', a: 'Clean labelled diagrams, definitions with examples, and stepwise explanations often fetch higher marks.' },
  ],
}

export default function OneNightStudyPage() {
  const [gradeFilter, setGradeFilter] = useState<number>(10)
  const [subjectFilter, setSubjectFilter] = useState<string>('all')
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
    try { localStorage.setItem('ons_reviewed', JSON.stringify(next)) } catch {}
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-3 md:items-end">
        <div>
          <div className="text-xs text-gray-600 dark:text-slate-400">Grade</div>
          <select value={gradeFilter as any} onChange={(e) => setGradeFilter(Number(e.target.value))} className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
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
          return (
            <div key={idx} className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">Grade {t.grade} • {t.subject}</div>
                  <div className="text-gray-900 dark:text-white font-semibold">{t.title}</div>
                </div>
                <button aria-label="Mark as reviewed" onClick={() => toggleReviewed(key)} className={`text-xs px-2 py-1 rounded-md border ${isReviewed ? 'bg-emerald-600 border-emerald-700 text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-slate-300'}`}>
                  {isReviewed ? 'Reviewed' : 'Mark reviewed'}
                </button>
              </div>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 dark:text-slate-300">
                {t.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
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


