import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { LessonService } from '../services/lessonService';
import { seedIntegersLesson, checkIntegersLessonExists } from '../utils/seedIntegers';
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

// Main IntegersLesson Component
const IntegersLesson: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, { answer: number; isCorrect: boolean }>>({});
  const [showMCQResults, setShowMCQResults] = useState(false);

  const lessonId = 'integers_grade7';

  useEffect(() => {
    loadLesson();
  }, [currentUser]);

  const loadLesson = async () => {
    try {
      setLoading(true);
      
      // Check if lesson exists, if not seed it
      const exists = await checkIntegersLessonExists(lessonId);
      if (!exists) {
        setSeeding(true);
        await seedIntegersLesson();
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
            {seeding ? '🌱 Setting up Integers lesson data...' : 'Loading lesson...'}
          </p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Lesson Not Available</h2>
          <p className="text-gray-600 mb-6">The Integers lesson could not be loaded.</p>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            ← Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const currentSection = lesson.sections[currentSectionIndex];
  const progressPercentage = lesson.sections.length > 0 
    ? Math.round(((currentSectionIndex + 1) / lesson.sections.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Courses
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">{lesson.title}</h1>
              <p className="text-sm text-gray-600">Grade {lesson.grade} • Mathematics</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Progress</div>
              <div className="text-lg font-semibold text-blue-600">{progressPercentage}%</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Section Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold text-gray-800 mb-4">Sections</h3>
              <div className="space-y-2">
                {lesson.sections.map((section, index) => {
                  const isCompleted = progress?.completedSections.includes(section.id) || false;
                  const isCurrent = index === currentSectionIndex;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => goToSection(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        isCurrent 
                          ? 'bg-blue-100 border-2 border-blue-300 text-blue-800' 
                          : isCompleted
                          ? 'bg-green-50 hover:bg-green-100 text-green-800'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          isCompleted ? 'bg-green-500 text-white' : 
                          isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {isCompleted ? '✓' : index + 1}
                        </div>
                        <span className="text-sm font-medium">{section.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSectionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentSection.title}</h2>
                <div 
                  className="prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentSection.content }}
                />
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <button
                    onClick={goToPreviousSection}
                    disabled={currentSectionIndex === 0}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  
                  <span className="text-sm text-gray-600">
                    {currentSectionIndex + 1} of {lesson.sections.length}
                  </span>
                  
                  <button
                    onClick={goToNextSection}
                    disabled={currentSectionIndex === lesson.sections.length - 1}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Sidebar - MCQs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold text-gray-800 mb-4">
                Practice Questions {currentSection.mcqs.length > 0 && `(${currentSection.mcqs.length})`}
              </h3>
              
              {currentSection.mcqs.length > 0 ? (
                <div className="space-y-4">
                  {currentSection.mcqs.map((mcq) => (
                    <MCQComponent
                      key={mcq.id}
                      mcq={mcq}
                      onAnswer={handleMCQAnswer}
                      showResult={showMCQResults}
                      selectedAnswer={mcqAnswers[mcq.id]?.answer}
                    />
                  ))}
                  
                  {showMCQResults && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">📊 Section Results</h4>
                      <p className="text-sm text-blue-700">
                        You scored {Object.values(mcqAnswers).filter(ans => ans.isCorrect).length} out of {currentSection.mcqs.length} questions correctly!
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No practice questions for this section.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegersLesson;