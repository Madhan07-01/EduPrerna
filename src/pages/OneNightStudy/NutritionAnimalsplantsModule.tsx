import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const nutritionAnimalsplantsModule: LearningModule = {
  title: 'Nutrition in Animals and Plants',
  introduction: 'Welcome to the fascinating world of nutrition in living organisms! Just like you need food to grow and stay healthy, all living things - from tiny bacteria to giant trees - need nutrition to survive. We\'ll explore how plants make their own food through photosynthesis and how different animals have amazing ways to find and digest their meals. Get ready to discover the incredible diversity of life and nutrition!',
  concepts: [
    {
      title: 'Photosynthesis Process and Requirements',
      content: 'Photosynthesis is the amazing process by which plants make their own food using sunlight, carbon dioxide, and water. This process not only feeds the plant but also produces oxygen that all animals need to breathe.',
      examples: [
        'Equation: 6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂ (glucose + oxygen)',
        'Chlorophyll in leaves captures sunlight energy for the process',
        'Stomata (tiny pores) in leaves take in CO₂ and release O₂',
        'Roots absorb water and minerals from soil',
        'Plants store extra glucose as starch in roots, stems, and seeds'
      ]
    },
    {
      title: 'Plant Nutrition Types: Autotrophic, Parasitic, and Insectivorous',
      content: 'While most plants make their own food, some have evolved special ways to get nutrition. Understanding these different strategies shows the amazing adaptability of plant life.',
      examples: [
        'Autotrophic plants: Green plants that make food through photosynthesis (most trees, flowers, grass)',
        'Parasitic plants: Get nutrients from other plants (mistletoe, dodder, rafflesia)',
        'Insectivorous plants: Trap and digest insects for extra nutrients (Venus flytrap, pitcher plant, sundew)',
        'Saprophytic plants: Get nutrients from dead organic matter (some orchids, Indian pipe)',
        'Symbiotic plants: Partner with fungi or bacteria for nutrients (legumes with nitrogen-fixing bacteria)'
      ]
    },
    {
      title: 'Animal Diet Types: Herbivores, Carnivores, and Omnivores',
      content: 'Animals are classified based on what they eat. Each type has special adaptations that help them find, catch, and digest their preferred food sources.',
      examples: [
        'Herbivores: Eat only plants (cows, horses, rabbits, deer, koalas)',
        'Carnivores: Eat only meat (lions, tigers, sharks, eagles, snakes)',
        'Omnivores: Eat both plants and animals (humans, bears, pigs, crows, raccoons)',
        'Insectivores: Specialize in eating insects (anteaters, many birds, frogs)',
        'Filter feeders: Strain food from water (whales, flamingos, clams)'
      ]
    },
    {
      title: 'Human Digestive System Overview',
      content: 'The human digestive system is like a sophisticated food processing factory that breaks down food into nutrients our body can use for energy, growth, and repair.',
      examples: [
        'Mouth: Teeth chew food, saliva begins starch digestion',
        'Esophagus: Muscular tube that pushes food to stomach',
        'Stomach: Acidic environment breaks down proteins and kills bacteria',
        'Small intestine: Most digestion and nutrient absorption occurs here',
        'Large intestine: Absorbs water and forms waste for elimination'
      ]
    },
    {
      title: 'Specialized Digestive Adaptations in Animals',
      content: 'Different animals have evolved unique digestive systems perfectly suited to their diets. These adaptations show how form follows function in nature.',
      examples: [
        'Ruminants (cows, sheep): Four-chambered stomach to digest cellulose with bacteria help',
        'Birds: Gizzard with small stones to grind food since they have no teeth',
        'Carnivores: Short intestines and strong stomach acid for meat digestion',
        'Herbivores: Long intestines and special bacteria to break down plant cellulose',
        'Filter feeders: Baleen plates or gills to strain tiny organisms from water'
      ]
    },
    {
      title: 'Nutrition in Insects and Small Organisms',
      content: 'Insects and other small organisms have fascinating feeding strategies. Despite their size, they play crucial roles in ecosystems and have incredibly diverse diets.',
      examples: [
        'Bees: Collect nectar and pollen, convert nectar to honey for storage',
        'Butterflies: Long proboscis to sip nectar from deep flowers',
        'Mosquitoes: Females need blood for egg production, males eat plant nectar',
        'Ants: Some farm fungi, others hunt, some eat plant secretions',
        'Spiders: Inject digestive enzymes into prey and suck out liquified nutrients'
      ]
    },
    {
      title: 'Nutrition in Amoeba and Single-Celled Organisms',
      content: 'Single-celled organisms like amoeba have simple but effective ways to obtain and digest food. Their processes are the foundation for understanding nutrition in all life.',
      examples: [
        'Amoeba: Engulfs food particles through pseudopodia (false feet)',
        'Food vacuoles: Temporary digestive chambers inside the cell',
        'Phagocytosis: Process of surrounding and engulfing food particles',
        'Pinocytosis: "Cell drinking" - taking in liquid nutrients',
        'Waste elimination: Undigested material expelled through cell membrane'
      ]
    },
    {
      title: 'Symbiotic Relationships in Nutrition',
      content: 'Many organisms form partnerships where both benefit nutritionally. These relationships show how cooperation in nature helps organisms survive and thrive.',
      examples: [
        'Lichens: Fungi and algae living together - fungi provide shelter, algae provide food',
        'Mycorrhizae: Fungi and plant roots - fungi help absorb nutrients, plants provide sugar',
        'Nitrogen-fixing bacteria: Live in legume roots, provide nitrogen in exchange for sugar',
        'Gut bacteria: Help animals digest food in exchange for shelter and nutrients',
        'Cleaner fish: Eat parasites off larger fish, getting food while providing cleaning service'
      ]
    },
    {
      title: 'Nutrient Cycles in Ecosystems',
      content: 'Nutrients constantly cycle through ecosystems, moving from soil to plants to animals and back again. Understanding these cycles shows how all life is connected.',
      examples: [
        'Carbon cycle: Plants absorb CO₂, animals eat plants, decomposers release CO₂ back',
        'Nitrogen cycle: Bacteria fix nitrogen, plants absorb it, animals eat plants, decomposers return nitrogen to soil',
        'Decomposers: Bacteria and fungi break down dead organisms, recycling nutrients',
        'Food chains: Energy and nutrients flow from producers to consumers',
        'Soil formation: Weathered rock plus organic matter creates nutrient-rich growing medium'
      ]
    },
    {
      title: 'Overall Importance of Nutrition in Life',
      content: 'Nutrition is fundamental to all life processes. Understanding nutrition helps us appreciate the interconnectedness of all living things and the importance of maintaining healthy ecosystems.',
      examples: [
        'Energy transfer: Nutrition moves energy from sun through all living organisms',
        'Growth and development: Proper nutrition essential for all organisms to reach their potential',
        'Reproduction: Well-nourished organisms are more successful at reproducing',
        'Disease resistance: Good nutrition helps organisms fight off infections and diseases',
        'Ecosystem balance: Proper nutrition relationships maintain stable, healthy environments'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the main product that plants make during photosynthesis?',
      options: ['Oxygen', 'Carbon dioxide', 'Glucose', 'Water'],
      correct: 2,
      explanation: 'During photosynthesis, plants make glucose (sugar) as their main food product. Oxygen is released as a byproduct that we breathe.'
    },
    {
      question: 'Which type of plant gets nutrients by trapping and digesting insects?',
      options: ['Parasitic plants', 'Autotrophic plants', 'Insectivorous plants', 'Saprophytic plants'],
      correct: 2,
      explanation: 'Insectivorous plants like Venus flytraps and pitcher plants trap and digest insects to get extra nutrients, especially nitrogen.'
    },
    {
      question: 'What type of animal eats both plants and meat?',
      options: ['Herbivore', 'Carnivore', 'Omnivore', 'Insectivore'],
      correct: 2,
      explanation: 'Omnivores eat both plants and animals. Humans, bears, and pigs are examples of omnivores.'
    },
    {
      question: 'Where does most digestion and nutrient absorption occur in humans?',
      options: ['Stomach', 'Large intestine', 'Small intestine', 'Mouth'],
      correct: 2,
      explanation: 'The small intestine is where most digestion is completed and nutrients are absorbed into the bloodstream.'
    },
    {
      question: 'What special adaptation do ruminants like cows have for digesting grass?',
      options: ['Very sharp teeth', 'Four-chambered stomach', 'Extra long tongue', 'Special saliva'],
      correct: 1,
      explanation: 'Ruminants have a four-chambered stomach that allows bacteria to help break down cellulose in grass and other plants.'
    },
    {
      question: 'How does an amoeba obtain its food?',
      options: ['Through photosynthesis', 'By engulfing food particles', 'By absorbing nutrients through roots', 'By filter feeding'],
      correct: 1,
      explanation: 'Amoeba engulfs food particles using pseudopodia (false feet) in a process called phagocytosis.'
    },
    {
      question: 'What do bees collect from flowers for nutrition?',
      options: ['Only pollen', 'Only nectar', 'Both nectar and pollen', 'Only water'],
      correct: 2,
      explanation: 'Bees collect both nectar (which they convert to honey) and pollen from flowers. Both provide essential nutrients.'
    },
    {
      question: 'In a lichen, what does the algae provide to the fungus?',
      options: ['Shelter', 'Water', 'Food through photosynthesis', 'Protection from predators'],
      correct: 2,
      explanation: 'In the symbiotic relationship of lichens, algae provide food through photosynthesis while fungi provide shelter and protection.'
    },
    {
      question: 'What is the role of decomposers in nutrient cycles?',
      options: ['They produce oxygen', 'They break down dead organisms and recycle nutrients', 'They provide shelter for animals', 'They fix nitrogen from the air'],
      correct: 1,
      explanation: 'Decomposers like bacteria and fungi break down dead organisms, returning nutrients to the soil for plants to use again.'
    },
    {
      question: 'Which of these is NOT a requirement for photosynthesis?',
      options: ['Sunlight', 'Carbon dioxide', 'Glucose', 'Water'],
      correct: 2,
      explanation: 'Glucose is a PRODUCT of photosynthesis, not a requirement. The requirements are sunlight, carbon dioxide, and water.'
    }
  ]
}

export default function NutritionAnimalsplantsModule() {
  return (
    <ModuleLayout 
      module={nutritionAnimalsplantsModule} 
      grade={7} 
      subject="Science" 
    />
  )
}