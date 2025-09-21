import LessonModuleTemplate from './templates/LessonModuleTemplate'
import type { TemplateSection, TemplateMCQ } from './templates/LessonModuleTemplate'

const sections: TemplateSection[] = [
  { title: 'Introduction', content: 'Biology and Human Welfare applies biological knowledge to human health, food security, environment, and sustainable development.' },
  { title: '1. Human Health and Disease', content: 'Health: physical, mental, social well-being.\nDiseases: infectious (pathogens: bacteria, viruses, fungi, protozoa) vs non-infectious (diabetes, cancer, CVD).\nTransmission: air, water, vectors, contact.\nImmunity: active (natural/vaccines) vs passive (maternal antibodies). Vaccines: live-attenuated, inactivated, subunit, toxoid.' },
  { title: '2. Strategies for Food Production', content: 'Crop improvement: hybridization, tissue culture, genetic engineering (GM traits: pest resistance, yield).\nMicrobes in agriculture: Rhizobium (N-fixation), decomposers, biopesticides (Bt).' },
  { title: '3. Microbes in Human Welfare', content: 'Industry: fermentation (alcohol, bread, cheese), antibiotics.\nMedicine: insulin (recombinant), vaccines.\nEnvironment: bioremediation (oil spills, sewage treatment).' },
  { title: '4. Environmental Issues & Biodiversity', content: 'Waste management: reduce–reuse–recycle.\nPollution control: air/water/soil mitigation.\nBiodiversity conservation: protected areas, endangered species, wetlands.' },
  { title: '5. Sustainable Practices', content: 'Organic farming, Integrated Pest Management (IPM), afforestation, conservation of natural resources.' },
]

const mcqs: TemplateMCQ[] = [
  { id: 'q1', question: 'Malaria is caused by a', options: [
    { key: 'a', text: 'Bacterium' }, { key: 'b', text: 'Virus' }, { key: 'c', text: 'Protozoan' }, { key: 'd', text: 'Fungus' }
  ], answer: 'c', explanation: 'Plasmodium (protozoan) causes malaria.' },
  { id: 'q2', question: 'Polio vaccine (OPV) is an example of', options: [
    { key: 'a', text: 'Live-attenuated vaccine' }, { key: 'b', text: 'Inactivated vaccine' }, { key: 'c', text: 'Subunit vaccine' }, { key: 'd', text: 'Toxoid' }
  ], answer: 'a', explanation: 'Oral polio vaccine is live-attenuated.' },
  { id: 'q3', question: 'Microbe commonly used in bioremediation is', options: [
    { key: 'a', text: 'Rhizobium' }, { key: 'b', text: 'Pseudomonas' }, { key: 'c', text: 'E. coli' }, { key: 'd', text: 'Streptococcus' }
  ], answer: 'b', explanation: 'Pseudomonas spp. degrade pollutants.' },
  { id: 'q4', question: 'Nitrogen fixation in legume root nodules is by', options: [
    { key: 'a', text: 'Azotobacter' }, { key: 'b', text: 'Rhizobium' }, { key: 'c', text: 'Clostridium' }, { key: 'd', text: 'Nitrosomonas' }
  ], answer: 'b', explanation: 'Symbiotic Rhizobium fixes nitrogen.' },
  { id: 'q5', question: 'A non-communicable disease is', options: [
    { key: 'a', text: 'Tuberculosis' }, { key: 'b', text: 'Diabetes' }, { key: 'c', text: 'Malaria' }, { key: 'd', text: 'Typhoid' }
  ], answer: 'b', explanation: 'Diabetes is metabolic and non-infectious.' },
  { id: 'q6', question: 'Golden Rice is enriched with', options: [
    { key: 'a', text: 'Iron' }, { key: 'b', text: 'Vitamin A (β-carotene)' }, { key: 'c', text: 'Vitamin D' }, { key: 'd', text: 'Calcium' }
  ], answer: 'b', explanation: 'Biofortified with β-carotene (provitamin A).' },
  { id: 'q7', question: 'Passive immunity is provided by', options: [
    { key: 'a', text: 'Vaccination' }, { key: 'b', text: 'Maternal antibodies' }, { key: 'c', text: 'Antibiotics' }, { key: 'd', text: 'WBC count' }
  ], answer: 'b', explanation: 'Antibodies transferred from mother (e.g., via milk).' },
  { id: 'q8', question: 'IPM stands for', options: [
    { key: 'a', text: 'Integrated Pest Management' }, { key: 'b', text: 'Internal Pathogen Monitoring' }, { key: 'c', text: 'Insect Pest Mitigation' }, { key: 'd', text: 'Insect Population Management' }
  ], answer: 'a', explanation: 'IPM integrates biological, cultural, and chemical controls.' },
  { id: 'q9', question: 'Biopesticide example is', options: [
    { key: 'a', text: 'DDT' }, { key: 'b', text: 'Bacillus thuringiensis (Bt)' }, { key: 'c', text: 'Glyphosate' }, { key: 'd', text: 'Atrazine' }
  ], answer: 'b', explanation: 'Bt produces insecticidal proteins.' },
  { id: 'q10', question: 'Afforestation contributes to', options: [
    { key: 'a', text: 'Reducing soil erosion' }, { key: 'b', text: 'Maintaining biodiversity' }, { key: 'c', text: 'CO2 sequestration' }, { key: 'd', text: 'All of the above' }
  ], answer: 'd', explanation: 'Forests protect soil, biodiversity, and carbon balance.' },
]

export default function BioG12BiologyHumanWelfare() {
  return (
    <LessonModuleTemplate
      title="Biology and Human Welfare"
      subject="Biology"
      grade={12}
      backLink="/lessons/Biology/12"
      lessonId="bio-g12-biology-human-welfare"
      sections={sections}
      mcqs={mcqs}
      progressTable="user_progress"
      storePercent={true}
    />
  )
}
