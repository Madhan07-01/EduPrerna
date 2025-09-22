import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const controlCoordinationModule: LearningModule = {
  title: 'Control and Coordination',
  introduction: 'Welcome to the fascinating world of Control and Coordination! Have you ever wondered how you instantly pull your hand away from a hot stove, or how a plant grows toward sunlight? These amazing responses are possible because of control and coordination systems in living organisms. In animals, this function is performed by the nervous system and endocrine system working together. In plants, which lack a nervous system, specialized chemical messengers called plant hormones coordinate responses. Understanding these systems will help you appreciate how living organisms respond to their environment and maintain balance in their bodies.',
  concepts: [
    {
      title: 'Control and Coordination in Animals - An Overview',
      content: 'Control and coordination in animals is the ability to detect changes in the environment and respond appropriately. This function is essential for survival as it helps organisms adapt to changing conditions, find food, avoid danger, and reproduce. Two systems work together to achieve this: the nervous system (fast responses) and the endocrine system (slower but longer-lasting responses).',
      examples: [
        'Nervous system: Provides rapid responses through electrical signals (e.g., pulling hand from hot object)',
        'Endocrine system: Produces slower but sustained responses through chemical messengers (hormones)',
        'Integration: Both systems work together to coordinate complex responses',
        'Example: When frightened, nervous system triggers immediate response (fight or flight), endocrine system releases adrenaline for sustained response',
        'Feedback mechanisms: Both systems use feedback to maintain body balance (homeostasis)',
        'Adaptation: These systems help animals adapt to environmental changes'
      ]
    },
    {
      title: 'The Nervous System - Structure and Function',
      content: 'The nervous system is a complex network of specialized cells called neurons that transmit electrical and chemical signals throughout the body. It consists of the central nervous system (brain and spinal cord) and the peripheral nervous system (nerves that extend throughout the body).',
      examples: [
        'Central Nervous System (CNS): Brain and spinal cord that process information',
        'Peripheral Nervous System (PNS): Nerves that connect CNS to rest of the body',
        'Brain: Control center with specialized regions for different functions (cerebrum, cerebellum, medulla)',
        'Spinal cord: Highway for nerve impulses between brain and body, also handles reflexes',
        'Nerves: Bundles of nerve fibers that carry signals to and from CNS',
        'Functions: Controls voluntary and involuntary actions, processes sensory information, coordinates responses'
      ]
    },
    {
      title: 'Neurons - The Basic Units of the Nervous System',
      content: 'Neurons are specialized cells that transmit nerve impulses (electrical signals) throughout the nervous system. Each neuron has a cell body, dendrites, and an axon. The unique structure of neurons allows them to receive, process, and transmit information efficiently.',
      examples: [
        'Cell body: Contains nucleus and cytoplasm, integrates incoming signals',
        'Dendrites: Branch-like extensions that receive signals from other neurons',
        'Axon: Long fiber that carries signals away from cell body to other neurons or muscles',
        'Myelin sheath: Fatty layer around axon that speeds up signal transmission',
        'Nerve impulse: Electrical signal that travels along neuron at speeds up to 120 m/s',
        'Resting potential: Neuron maintains electrical charge difference across membrane when not transmitting'
      ]
    },
    {
      title: 'Synapse - Connection Between Neurons',
      content: 'A synapse is the junction between two neurons where nerve impulses are transmitted from one neuron to another. Since neurons do not physically touch each other, signals must be converted from electrical to chemical form to cross the synaptic gap.',
      examples: [
        'Synaptic gap: Tiny space between neurons where signals must cross',
        'Neurotransmitters: Chemical messengers released by presynaptic neuron',
        'Receptors: Specialized proteins on postsynaptic neuron that bind neurotransmitters',
        'Signal transmission: Electrical impulse → chemical neurotransmitter → electrical impulse',
        'Examples of neurotransmitters: Acetylcholine (muscle control), dopamine (pleasure), serotonin (mood)',
        'Synaptic delay: Brief pause as chemical transmission occurs (makes reflexes slightly slower)'
      ]
    },
    {
      title: 'Reflex Action - Automatic Rapid Response',
      content: 'Reflex action is an automatic, involuntary response to a stimulus that bypasses the brain for faster reaction. Reflexes protect the body from harm and maintain basic functions without conscious thought.',
      examples: [
        'Reflex arc: Pathway involving receptor, sensory neuron, interneuron, motor neuron, effector',
        'Knee-jerk reflex: Tap below knee causes leg to kick out (tests spinal cord function)',
        'Withdrawal reflex: Pulling hand from hot object without thinking',
        'Pupillary reflex: Pupils constrict in bright light, dilate in dim light',
        'Salivary reflex: Mouth waters at sight/smell of food',
        'Importance: Provides rapid protection and maintains vital functions'
      ]
    },
    {
      title: 'Voluntary Action - Conscious Control',
      content: 'Voluntary actions are movements that we consciously decide to perform. These actions involve the brain and require processing of sensory information, decision-making, and coordination of multiple muscle groups.',
      examples: [
        'Pathway: Sensory input → brain processing → decision → motor output → muscle movement',
        'Examples: Walking, talking, writing, playing musical instruments',
        'Cerebral cortex: Brain region responsible for conscious thought and voluntary actions',
        'Motor planning: Brain coordinates multiple muscles for smooth, purposeful movement',
        'Learning: Voluntary actions improve with practice as neural pathways strengthen',
        'Complexity: More complex than reflexes, involving multiple brain regions'
      ]
    },
    {
      title: 'The Endocrine System - Chemical Coordination',
      content: 'The endocrine system consists of glands that produce and secrete hormones directly into the bloodstream. Hormones are chemical messengers that regulate various body functions including growth, metabolism, reproduction, and stress responses.',
      examples: [
        'Hormones: Chemical messengers that travel through blood to target organs',
        'Glands: Specialized organs that produce and secrete hormones',
        'Target cells: Cells with specific receptors for each hormone',
        'Feedback mechanisms: Hormone levels are regulated by negative feedback loops',
        'Slow but sustained: Hormonal responses are slower than nervous responses but last longer',
        'Integration: Works with nervous system to coordinate body functions'
      ]
    },
    {
      title: 'Key Endocrine Glands and Their Hormones',
      content: 'The endocrine system includes several glands that produce different hormones with specific functions. These glands work together to maintain homeostasis and coordinate long-term body processes.',
      examples: [
        'Pituitary gland: "Master gland" that controls other endocrine glands (growth hormone, TSH, FSH, LH)',
        'Thyroid gland: Produces thyroxine for metabolism regulation',
        'Pancreas: Produces insulin and glucagon for blood sugar control',
        'Adrenal glands: Produce adrenaline for stress response and aldosterone for salt balance',
        'Gonads: Testes (testosterone) and ovaries (estrogen, progesterone) for reproduction',
        'Pineal gland: Produces melatonin for sleep-wake cycle regulation'
      ]
    },
    {
      title: 'Control and Coordination in Plants - Plant Hormones',
      content: 'Plants lack a nervous system but can still respond to environmental stimuli through chemical messengers called plant hormones (phytohormones). These hormones coordinate growth, development, and responses to environmental changes.',
      examples: [
        'Auxins: Promote cell elongation, responsible for phototropism and gravitropism',
        'Gibberellins: Stimulate stem elongation and seed germination',
        'Cytokinins: Promote cell division and delay aging in leaves',
        'Abscisic acid (ABA): Inhibits growth, promotes dormancy, helps plants cope with stress',
        'Ethylene: Promotes fruit ripening and leaf fall',
        'Transport: Unlike animal hormones, plant hormones can move in multiple directions'
      ]
    },
    {
      title: 'Plant Tropisms - Directional Growth Responses',
      content: 'Tropisms are directional growth responses of plants to external stimuli. These responses help plants optimize their position for light absorption, water uptake, and nutrient acquisition.',
      examples: [
        'Phototropism: Growth toward or away from light (stems positive, roots negative)',
        'Geotropism/Gravitropism: Growth in response to gravity (roots positive, stems negative)',
        'Hydrotropism: Growth toward water (roots show positive hydrotropism)',
        'Chemotropism: Growth toward or away from chemicals (pollen tubes grow toward ovules)',
        'Thigmotropism: Growth in response to touch (tendrils coil around supports)',
        'Mechanism: Uneven distribution of auxins causes differential growth rates on opposite sides'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is the main difference between the nervous system and endocrine system?',
      options: ['Nervous system uses electrical signals, endocrine uses chemical signals', 'Nervous system is slower, endocrine is faster', 'Nervous system affects only muscles, endocrine affects only glands', 'There is no difference'],
      correct: 0,
      explanation: 'The nervous system transmits information through electrical impulses that travel quickly along neurons, while the endocrine system uses chemical messengers (hormones) that travel through the bloodstream to target organs. Nervous responses are fast but short-lived, while hormonal responses are slower but more sustained.'
    },
    {
      question: 'Which part of a neuron receives signals from other neurons?',
      options: ['Axon', 'Cell body', 'Myelin sheath', 'Dendrites'],
      correct: 3,
      explanation: 'Dendrites are the branched extensions of a neuron that receive signals from other neurons. The cell body integrates these signals, and the axon carries signals away to other neurons or effector organs.'
    },
    {
      question: 'What is a synapse?',
      options: ['A type of neuron', 'The gap between two neurons where signals are transmitted', 'A hormone-producing gland', 'A reflex pathway'],
      correct: 1,
      explanation: 'A synapse is the junction between two neurons where nerve impulses are transmitted from one neuron to another. Since neurons do not physically touch, signals must be converted from electrical to chemical form to cross the synaptic gap using neurotransmitters.'
    },
    {
      question: 'What is a reflex action?',
      options: ['A voluntary movement that requires thinking', 'An involuntary, automatic response that bypasses the brain', 'A hormone released during stress', 'A type of plant hormone'],
      correct: 1,
      explanation: 'A reflex action is an involuntary and nearly instantaneous movement in response to a stimulus. It bypasses the brain and is processed at the spinal cord level for faster response, protecting the body from potential harm.'
    },
    {
      question: 'Which of the following is NOT a characteristic of voluntary actions?',
      options: ['They involve the brain', 'They are consciously controlled', 'They bypass the brain for faster response', 'They require processing of sensory information'],
      correct: 2,
      explanation: 'Voluntary actions are consciously controlled movements that involve the brain for processing sensory information and making decisions. Reflex actions, not voluntary actions, bypass the brain for faster response.'
    },
    {
      question: 'What is the function of hormones in the endocrine system?',
      options: ['To transmit electrical signals', 'To act as chemical messengers that regulate body functions', 'To receive signals from other neurons', 'To protect the brain from injury'],
      correct: 1,
      explanation: 'Hormones are chemical messengers produced by endocrine glands that travel through the bloodstream to target organs, where they regulate various body functions such as growth, metabolism, reproduction, and stress responses.'
    },
    {
      question: 'Which plant hormone is responsible for promoting cell elongation and causing phototropism?',
      options: ['Gibberellins', 'Cytokinins', 'Abscisic acid', 'Auxins'],
      correct: 3,
      explanation: 'Auxins are plant hormones that promote cell elongation and are responsible for phototropism (growth toward light). They are distributed unevenly in response to light, causing the plant to bend toward the light source.'
    },
    {
      question: 'What type of tropism causes plant roots to grow downward into the soil?',
      options: ['Phototropism', 'Thigmotropism', 'Geotropism (Gravitropism)', 'Chemotropism'],
      correct: 2,
      explanation: 'Geotropism (also called gravitropism) is the growth response of plants to gravity. Roots show positive geotropism by growing downward into the soil, while stems show negative geotropism by growing upward away from the soil.'
    },
    {
      question: 'Which gland is known as the "master gland" of the endocrine system?',
      options: ['Thyroid gland', 'Pancreas', 'Pituitary gland', 'Adrenal glands'],
      correct: 2,
      explanation: 'The pituitary gland is known as the "master gland" because it produces hormones that control the functions of other endocrine glands. It secretes growth hormone, TSH, FSH, LH, and several other hormones that regulate various body processes.'
    },
    {
      question: 'What is the main function of dendrites in a neuron?',
      options: ['To carry signals away from the cell body', 'To protect the neuron', 'To receive signals from other neurons', 'To produce neurotransmitters'],
      correct: 2,
      explanation: 'Dendrites are the branched extensions of a neuron that receive signals from other neurons. The axon carries signals away from the cell body, while dendrites receive signals from other neurons and transmit them toward the cell body.'
    }
  ]
}

export default function ControlCoordinationModule() {
  return (
    <ModuleLayout 
      module={controlCoordinationModule} 
      grade={10} 
      subject="Science" 
    />
  )
}