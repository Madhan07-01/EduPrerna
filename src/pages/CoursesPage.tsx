import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubjects, getGrades, type Subject, type Grade } from '../data/lessonsData'
import { useTranslation } from 'react-i18next'

export function CoursesPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [selectedGrade, setSelectedGrade] = useState<Grade>(6)

  const subjects = getSubjects()
  const grades = getGrades()

  const handleStartLearning = () => {
    if (selectedSubject) {
      navigate(`/lessons/${selectedSubject}/${selectedGrade}`)
    }
  }

  // Map course subject to STEM umbrella for Supabase challenges
  const mapToStemSubject = (subject: Subject | null): 'Mathematics' | 'Science' | 'Technology' | null => {
    if (!subject) return null
    if (subject === 'Mathematics') return 'Mathematics'
    if (subject === 'ComputerScience') return 'Technology'
    // Physics, Chemistry, Biology -> Science
    if (subject === 'Physics' || subject === 'Chemistry' || subject === 'Biology') return 'Science'
    return null
  }

  const handlePlayStem = () => {
    const stem = mapToStemSubject(selectedSubject)
    if (stem) {
      navigate(`/challenge?grade=${selectedGrade}&subject=${encodeURIComponent(stem)}`)
    }
  }

  const getSubjectIcon = (subject: Subject) => {
    const icons = {
      Mathematics: '🧮',
      Physics: '⚡',
      Chemistry: '🧪',
      ComputerScience: '💻',
      Biology: '🧬'
    }
    return icons[subject] || '📚'
  }

  const getSubjectColor = (subject: Subject) => {
    const colors = {
      Mathematics: 'from-blue-500 to-indigo-600',
      Physics: 'from-purple-500 to-pink-600', 
      Chemistry: 'from-green-500 to-teal-600',
      ComputerScience: 'from-gray-600 to-slate-700',
      Biology: 'from-orange-500 to-red-600'
    }
    return colors[subject] || 'from-blue-500 to-purple-600'
  }

  const formatSubjectName = (subject: Subject) => {
    return subject === 'ComputerScience' ? 'Computer Science' : subject
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t('courses.chooseSubject', { defaultValue: 'Choose Your Subject' })}</h1>
        <p className="text-xl text-gray-600 dark:text-slate-400">
          {t('courses.selectSubjectAndGrade', { defaultValue: 'Select a subject and grade to start your learning journey' })}
        </p>
      </div>

      {/* 5 Big Subject Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`group relative p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
              selectedSubject === subject
                ? 'ring-4 ring-blue-400 shadow-2xl scale-105'
                : 'hover:shadow-xl'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${getSubjectColor(subject)} rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity`} />
            <div className="relative text-center text-white space-y-4">
              <div className="text-5xl">{getSubjectIcon(subject)}</div>
              <h3 className="text-xl font-bold">{formatSubjectName(subject)}</h3>
              <p className="text-sm opacity-90">
                {t('courses.gradeReady', { defaultValue: 'Grade {{grade}} Ready', grade: selectedGrade })}
              </p>
              {selectedSubject === subject && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Grade Selection */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('courses.selectYourGrade', { defaultValue: 'Select Your Grade' })}</h2>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`p-4 rounded-xl font-semibold transition-all duration-200 ${
                  selectedGrade === grade
                    ? 'bg-blue-600 text-white shadow-lg transform scale-110'
                    : 'bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-400 hover:scale-105'
                }`}
              >
                <div className="text-2xl mb-1">📚</div>
                <div className="text-sm">{t('grade', { defaultValue: 'Grade' })}</div>
                <div className="text-xl font-bold">{grade}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Start Learning Button */}
      <div className="text-center">
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleStartLearning}
            disabled={!selectedSubject}
            className={`px-12 py-4 rounded-2xl text-xl font-bold transition-all duration-300 transform ${
              selectedSubject
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105'
                : 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-400 cursor-not-allowed'
            }`}
          >
            {selectedSubject 
              ? t('courses.startLearningCta', { defaultValue: '🚀 Start Learning {{subject}} - Grade {{grade}}', subject: formatSubjectName(selectedSubject), grade: selectedGrade })
              : t('courses.selectSubjectToContinue', { defaultValue: '👆 Select a Subject to Continue' })
            }
          </button>

          <button
            onClick={handlePlayStem}
            disabled={!mapToStemSubject(selectedSubject)}
            className={`px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform ${
              mapToStemSubject(selectedSubject)
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow hover:shadow-lg hover:scale-105'
                : 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-400 cursor-not-allowed'
            }`}
          >
            {t('courses.playStemDaily', { defaultValue: '🎮 Play STEM Daily Challenge' })}
          </button>
        </div>
      </div>

      {/* Subject Stats */}
      {selectedSubject && (
        <div className="max-w-4xl mx-auto">
          <div className={`p-6 rounded-2xl bg-gradient-to-r ${getSubjectColor(selectedSubject)} text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{getSubjectIcon(selectedSubject)}</div>
                <div>
                  <h3 className="text-2xl font-bold">{formatSubjectName(selectedSubject)}</h3>
                  <p className="opacity-90">{t('courses.gradeCurriculum', { defaultValue: 'Grade {{grade}} Curriculum', grade: selectedGrade })}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{t('courses.ready', { defaultValue: 'Ready!' })}</div>
                <div className="text-sm opacity-90">{t('courses.clickStartToBegin', { defaultValue: 'Click Start Learning to begin' })}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
        <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">{t('courses.trackProgress', { defaultValue: 'Track Progress' })}</h3>
          <p className="text-blue-700 dark:text-blue-400 text-sm">
            {t('courses.trackProgressDesc', { defaultValue: 'Monitor your learning journey with detailed progress tracking' })}
          </p>
        </div>
        
        <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">{t('courses.interactiveLearning', { defaultValue: 'Interactive Learning' })}</h3>
          <p className="text-green-700 dark:text-green-400 text-sm">
            {t('courses.interactiveLearningDesc', { defaultValue: 'Engage with MCQs, quizzes, and interactive content' })}
          </p>
        </div>
        
        <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2">{t('courses.richContent', { defaultValue: 'Rich Content' })}</h3>
          <p className="text-purple-700 dark:text-purple-400 text-sm">
            {t('courses.richContentDesc', { defaultValue: 'Access comprehensive study materials and resources' })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CoursesPage