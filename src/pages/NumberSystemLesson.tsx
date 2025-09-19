import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { LessonService } from '../services/lessonService';
import { seedNumberSystemLesson, checkLessonExists } from '../utils/seedNumberSystem';
import type { Lesson, MCQ, LessonProgress } from '../types/lesson';

// MCQ Component
interface MCQComponentProps {
  mcq: MCQ;
  onAnswer: (mcqId: string, selectedAnswer: number, isCorrect: boolean) => void;
  disabled?: boolean;
  showResult?: boolean;
  selectedAnswer?: number;
}

const MCQComponent: React.FC<MCQComponentProps> = ({ 
  mcq, 
  onAnswer, 
  disabled = false, 
  showResult = false, 
  selectedAnswer 
}) => {
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState<number | null>(selectedAnswer ?? null);

  const handleAnswerSelect = (answerIndex: number) => {
    if (disabled) return;
    
    setLocalSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === mcq.correctAnswer;
    onAnswer(mcq.id, answerIndex, isCorrect);
  };

  const getOptionStyle = (index: number) => {
    let baseStyle = "w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ";
    
    if (showResult && localSelectedAnswer !== null) {
      if (index === mcq.correctAnswer) {
        baseStyle += "bg-green-100 border-green-500 text-green-800";
      } else if (index === localSelectedAnswer && index !== mcq.correctAnswer) {
        baseStyle += "bg-red-100 border-red-500 text-red-800";
      } else {
        baseStyle += "bg-gray-100 border-gray-300 text-gray-600";
      }
    } else if (localSelectedAnswer === index) {
      baseStyle += "bg-blue-100 border-blue-500 text-blue-800";
    } else {
      baseStyle += "bg-white border-gray-300 text-gray-800 hover:bg-gray-50";
    }
    
    return baseStyle;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h4 className="font-semibold text-gray-800 mb-3">{mcq.question}</h4>
      <div className="space-y-2">
        {mcq.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={disabled}
            className={getOptionStyle(index)}
          >
            <span className="font-medium">{String.fromCharCode(97 + index)}) </span>
            {option}
          </button>
        ))}
      </div>
      {showResult && mcq.explanation && (
        <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
          <p className="text-sm text-blue-800">
            <strong>Explanation:</strong> {mcq.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

// Main NumberSystemLesson Component
const NumberSystemLesson: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, { answer: number; isCorrect: boolean }>>({});
  const [showMCQResults, setShowMCQResults] = useState(false);

  const lessonId = 'numberSystem_grade6';

  useEffect(() => {
    loadLesson();
  }, [currentUser]);

  const loadLesson = async () => {
    try {
      setLoading(true);
      
      // Check if lesson exists, if not seed it
      const exists = await checkLessonExists(lessonId);
      if (!exists) {
        setSeeding(true);
        await seedNumberSystemLesson();
        setSeeding(false);
      }

      // Load lesson data
      const lessonData = await LessonService.getLessonById(lessonId);
      if (lessonData) {
        setLesson(lessonData);
        
        // Sort sections by order
        lessonData.sections.sort((a, b) => a.order - b.order);
        
        // Load user progress if logged in
        if (currentUser) {
          const userProgress = await LessonService.getLessonProgress(currentUser.uid, lessonId);
          if (userProgress) {
            setProgress(userProgress);
            setCurrentSectionIndex(userProgress.currentSection);
          } else {
            // Initialize progress
            await LessonService.initializeLessonProgress(currentUser.uid, lessonId);
            const newProgress = await LessonService.getLessonProgress(currentUser.uid, lessonId);
            setProgress(newProgress);
          }
        }
      }
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMCQAnswer = async (mcqId: string, selectedAnswer: number, isCorrect: boolean) => {
    setMcqAnswers(prev => ({
      ...prev,
      [mcqId]: { answer: selectedAnswer, isCorrect }
    }));

    // Auto-show results after answering all MCQs in current section
    const currentSection = lesson?.sections[currentSectionIndex];
    if (currentSection) {
      const answeredCount = Object.keys(mcqAnswers).filter(id => 
        currentSection.mcqs.some(mcq => mcq.id === id)
      ).length + 1; // +1 for the current answer

      if (answeredCount === currentSection.mcqs.length) {
        setShowMCQResults(true);
        
        // Calculate score for this section
        const sectionMcqIds = currentSection.mcqs.map(mcq => mcq.id);
        const correctAnswers = sectionMcqIds.filter(id => {
          const answer = id === mcqId ? { answer: selectedAnswer, isCorrect } : mcqAnswers[id];
          return answer?.isCorrect;
        }).length;

        // Save score to Firestore
        if (currentUser) {
          await LessonService.recordMCQScore(
            currentUser.uid,
            lessonId,
            currentSection.id,
            correctAnswers,
            currentSection.mcqs.length
          );
        }
      }
    }
  };

  const goToNextSection = async () => {
    if (!lesson || currentSectionIndex >= lesson.sections.length - 1) return;

    const newIndex = currentSectionIndex + 1;
    setCurrentSectionIndex(newIndex);
    setMcqAnswers({});
    setShowMCQResults(false);

    // Update progress in Firestore
    if (currentUser) {
      await LessonService.updateCurrentSection(currentUser.uid, lessonId, newIndex);
      await LessonService.markSectionCompleted(currentUser.uid, lessonId, lesson.sections[currentSectionIndex].id);
    }
  };

  const goToPreviousSection = async () => {
    if (currentSectionIndex <= 0) return;

    const newIndex = currentSectionIndex - 1;
    setCurrentSectionIndex(newIndex);
    setMcqAnswers({});
    setShowMCQResults(false);

    // Update progress in Firestore
    if (currentUser) {
      await LessonService.updateCurrentSection(currentUser.uid, lessonId, newIndex);
    }
  };

  const goToSection = async (sectionIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
    setMcqAnswers({});
    setShowMCQResults(false);

    // Update progress in Firestore
    if (currentUser) {
      await LessonService.updateCurrentSection(currentUser.uid, lessonId, sectionIndex);
    }
  };

  if (loading || seeding) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {seeding ? '🌱 Setting up lesson data...' : 'Loading lesson...'}
          </p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Lesson not found</h2>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const currentSection = lesson.sections[currentSectionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
              <p className="text-gray-600">Grade {lesson.grade} • {lesson.subject}</p>
            </div>
            <div className="text-sm text-gray-500">
              Section {currentSectionIndex + 1} of {lesson.sections.length}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Section Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6">
              <h3 className="font-semibold text-gray-800 mb-4">Sections</h3>
              <div className="space-y-2">
                {lesson.sections.map((section, index) => {
                  const isCompleted = progress?.completedSections.includes(section.id);
                  const isCurrent = index === currentSectionIndex;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => goToSection(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        isCurrent
                          ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                          : isCompleted
                          ? 'bg-green-50 border border-green-200 text-green-800'
                          : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                          isCompleted ? 'bg-green-500 text-white' : 
                          isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {isCompleted ? '✓' : index + 1}
                        </span>
                        <span className="text-sm font-medium">{section.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSectionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentSection.title}</h2>
                <div 
                  className="prose max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: currentSection.content }}
                />
                
                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <button
                    onClick={goToPreviousSection}
                    disabled={currentSectionIndex === 0}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                  >
                    ← Previous
                  </button>
                  
                  <span className="text-sm text-gray-500">
                    {currentSectionIndex + 1} / {lesson.sections.length}
                  </span>
                  
                  <button
                    onClick={goToNextSection}
                    disabled={currentSectionIndex === lesson.sections.length - 1}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Sidebar - MCQs */}
          <div className="lg:col-span-1">
            {currentSection.mcqs.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Practice Questions ({currentSection.mcqs.length})
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {currentSection.mcqs.map((mcq) => (
                    <MCQComponent
                      key={mcq.id}
                      mcq={mcq}
                      onAnswer={handleMCQAnswer}
                      disabled={showMCQResults}
                      showResult={showMCQResults}
                      selectedAnswer={mcqAnswers[mcq.id]?.answer}
                    />
                  ))}
                </div>
                
                {showMCQResults && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">
                      Score: {Object.values(mcqAnswers).filter(a => a.isCorrect).length} / {currentSection.mcqs.length}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberSystemLesson;