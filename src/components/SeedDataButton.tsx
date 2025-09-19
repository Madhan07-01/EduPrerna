import { useState } from 'react'
import { motion } from 'framer-motion'
import { seedNumberSystemLesson } from '../data/seedData'

export function SeedDataButton() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleSeedData = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const result = await seedNumberSystemLesson()
      
      if (result.success) {
        setResult(`✅ Successfully seeded ${result.sectionsAdded} sections and ${result.mcqsAdded} MCQs!`)
      } else {
        setResult(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      setResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        🌱 Seed Lesson Data
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Click to populate the Firestore database with Number System lesson content.
      </p>
      
      <motion.button
        onClick={handleSeedData}
        disabled={loading}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
        whileHover={!loading ? { scale: 1.05 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
      >
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
            Seeding...
          </>
        ) : (
          <>
            🌱 Seed Data
          </>
        )}
      </motion.button>
      
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
        >
          <p className="text-sm text-gray-900 dark:text-white">{result}</p>
        </motion.div>
      )}
    </div>
  )
}

export default SeedDataButton