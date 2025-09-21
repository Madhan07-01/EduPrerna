import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getLessonsForSubjectAndGrade, type Subject, type Grade } from '../data/lessonsData';
import { SectionCard } from '../components/SectionCard';
import { useAuth } from '../hooks/useAuth';
import { loadLessonContent, type LessonContent } from '../utils/lessonContentLoader';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { playSound, showConfetti, showShakeEffect } from '../utils/animations';

// Define types for our quiz structure
interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface Quiz {
  questions: Question[];
}

// Define types for gamification data
interface GamificationData {
  points: number;
  streak: number;
  badges: string[];
  lastActivityDate: string;
}

export function QuizPage() {
  const { subject, grade, lesson } = useParams<{ subject: string; grade: string; lesson: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({}); // Track which explanations to show
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [showFeedback, setShowFeedback] = useState<{correct: boolean, message: string} | null>(null);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<number, boolean>>({});
  const [usedHints, setUsedHints] = useState<Record<number, boolean>>({});
  const [gamificationData, setGamificationData] = useState<GamificationData>({
    points: 0,
    streak: 0,
    badges: [],
    lastActivityDate: ''
  });
  const [questionOrder, setQuestionOrder] = useState<number[]>([]); // For randomizing questions
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const quizCardRef = useRef<HTMLDivElement>(null);

  // Parse URL params
  const subjectParam = subject as Subject;
  const gradeParam = parseInt(grade || '6') as Grade;
  const lessonIndex = parseInt(lesson || '1') - 1;

  // Get lessons for this subject and grade
  const lessons = getLessonsForSubjectAndGrade(subjectParam, gradeParam);
  const currentLesson = lessons[lessonIndex];

  // Fetch gamification data
  useEffect(() => {
    const fetchGamificationData = async () => {
      if (!currentUser) return;
      
      try {
        const gamificationDoc = doc(db, 'users', currentUser.uid, 'gamification', 'data');
        const gamificationSnap = await getDoc(gamificationDoc);
        
        if (gamificationSnap.exists()) {
          setGamificationData(gamificationSnap.data() as GamificationData);
        }
      } catch (err) {
        console.error('Error fetching gamification data:', err);
      }
    };
    
    fetchGamificationData();
  }, [currentUser]);

  // Timer effect
  useEffect(() => {
    if (!quizSubmitted && lessonContent) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Time's up, move to next question or submit quiz
            handleTimeUp();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestionIndex, quizSubmitted, lessonContent]);

  // Fetch quiz content
  useEffect(() => {
    const fetchQuizContent = async () => {
      if (!currentLesson) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // For Mathematics lessons, try to load from Firestore first, then fallback to local
        if (subjectParam === 'Mathematics' && gradeParam >= 6 && gradeParam <= 12) {
          try {
            // Try to load quiz from Firestore
            const quizDoc = doc(db, 'courses', 'mathematics', 'lessons', `${gradeParam}`, `chapter${lessonIndex + 1}`);
            const docSnap = await getDoc(quizDoc);
            
            if (docSnap.exists()) {
              const data = docSnap.data();
              // Ensure the quiz data has the correct structure
              if (data.quiz && Array.isArray(data.quiz.questions)) {
                setLessonContent({
                  title: data.title || `Chapter ${lessonIndex + 1} Quiz`,
                  subtopics: data.subtopics || [],
                  quiz: {
                    questions: data.quiz.questions.map((q: any) => ({
                      question: q.question,
                      options: Array.isArray(q.options) ? q.options : [],
                      answer: q.answer || '',
                      explanation: q.explanation || ''
                    }))
                  }
                } as LessonContent);
              } else {
                // Fallback to local content for Grade 6 chapters 1-3
                if (gradeParam === 6 && lessonIndex >= 0 && lessonIndex <= 2) {
                  const content = loadLessonContent(lessonIndex + 1);
                  if (content) {
                    setLessonContent(content);
                  } else {
                    setError('Quiz content not found');
                  }
                } else {
                  setError('Quiz not available for this lesson yet');
                }
              }
            } else {
              // Fallback to local content for Grade 6 chapters 1-3
              if (gradeParam === 6 && lessonIndex >= 0 && lessonIndex <= 2) {
                const content = loadLessonContent(lessonIndex + 1, 6);
                if (content) {
                  setLessonContent(content);
                } else {
                  setError('Quiz content not found');
                }
              } else if (gradeParam === 7 && lessonIndex >= 0 && lessonIndex <= 2) {
                // Fallback to local content for Grade 7 chapters 1-3
                const content = loadLessonContent(lessonIndex + 1, 7);
                if (content) {
                  setLessonContent(content);
                } else {
                  setError('Quiz content not found');
                }
              } else {
                setError('Quiz not available for this lesson yet');
              }

            }
          } catch (firestoreError) {
            console.error('Error fetching from Firestore:', firestoreError);
            // Fallback to local content for Grade 6 chapters 1-3
            if (gradeParam === 6 && lessonIndex >= 0 && lessonIndex <= 2) {
              const content = loadLessonContent(lessonIndex + 1, 6);
              if (content) {
                setLessonContent(content);
              } else {
                setError('Quiz content not found');
              }
            } else if (gradeParam === 7 && lessonIndex >= 0 && lessonIndex <= 2) {
              // Fallback to local content for Grade 7 chapters 1-3
              const content = loadLessonContent(lessonIndex + 1, 7);
              if (content) {
                setLessonContent(content);
              } else {
                setError('Quiz content not found');
              }
            } else {
              setError('Quiz not available for this lesson yet');
            }
          }
        } else {
          // For other subjects/grades, try local content first
          if (subjectParam === 'Mathematics' && gradeParam === 6 && lessonIndex >= 0 && lessonIndex <= 2) {
            const content = loadLessonContent(lessonIndex + 1, 6);
            if (content) {
              setLessonContent(content);
            } else {
              setError('Quiz content not found');
            }
          } else if (subjectParam === 'Mathematics' && gradeParam === 7 && lessonIndex >= 0 && lessonIndex <= 2) {
            // Try local content for Grade 7 chapters 1-3
            const content = loadLessonContent(lessonIndex + 1, 7);
            if (content) {
              setLessonContent(content);
            } else {
              setError('Quiz content not found');
            }
          } else {
            // For other subjects/grades, show placeholder content
            setError('Quiz not available for this lesson yet');
          }
        }
      } catch (err) {
        console.error('Error fetching quiz content:', err);
        setError('Failed to load quiz content');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizContent();
  }, [subjectParam, gradeParam, lessonIndex, currentLesson]);

  // Initialize question order when lesson content is loaded
  useEffect(() => {
    if (lessonContent && lessonContent.quiz) {
      // Create an array of question indices
      const indices = lessonContent.quiz.questions.map((_, index) => index);
      // Shuffle the indices for randomization
      const shuffled = [...indices].sort(() => Math.random() - 0.5);
      setQuestionOrder(shuffled);
    }
  }, [lessonContent]);

  const getSubjectIcon = (subject: Subject) => {
    const icons = {
      Mathematics: '🧮',
      Physics: '⚡',
      Chemistry: '🧪',
      ComputerScience: '💻',
      Biology: '🧬'
    };
    return icons[subject] || '📚';
  };

  const getSubjectColor = (subject: Subject) => {
    const colors = {
      Mathematics: 'from-blue-500 to-indigo-600',
      Physics: 'from-purple-500 to-pink-600', 
      Chemistry: 'from-green-500 to-teal-600',
      ComputerScience: 'from-gray-600 to-slate-700',
      Biology: 'from-orange-500 to-red-600'
    };
    return colors[subject] || 'from-blue-500 to-purple-600';
  };

  const formatSubjectName = (subject: Subject) => {
    return subject === 'ComputerScience' ? 'Computer Science' : subject;
  };

  const handleTimeUp = () => {
    // Show time's up feedback
    setShowFeedback({
      correct: false,
      message: "⏰ Time's up! Moving to the next question."
    });
    
    // Play sound effect
    playSound('incorrect');
    
    // Show shake effect
    if (quizCardRef.current) {
      showShakeEffect(quizCardRef.current.id);
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      setShowFeedback(null);
      if (lessonContent && currentQuestionIndex < lessonContent.quiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        handleSubmitQuiz();
      }
    }, 2000);
  };

  const handleAnswerSelect = (option: string) => {
    if (quizSubmitted || showFeedback) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: option
    }));

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Check if answer is correct
    if (lessonContent) {
      const currentQuestion = lessonContent.quiz.questions[questionOrder[currentQuestionIndex]];
      const isCorrect = option === currentQuestion.answer;
      
      // Play sound effect
      playSound(isCorrect ? 'correct' : 'incorrect');
      
      // Show animation effect
      if (isCorrect) {
        showConfetti();
      } else if (quizCardRef.current) {
        showShakeEffect(quizCardRef.current.id);
      }
      
      // Show immediate feedback
      setShowFeedback({
        correct: isCorrect,
        message: isCorrect 
          ? "✅ Well done! You got it right." 
          : `❌ Not quite, the correct answer is ${currentQuestion.answer}.`
      });

      // Move to next question after a delay
      setTimeout(() => {
        setShowFeedback(null);
        if (currentQuestionIndex < lessonContent.quiz.questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setTimeLeft(30); // Reset timer
        } else {
          handleSubmitQuiz();
        }
      }, 2000);
    }
  };

  const handleHint = () => {
    if (lessonContent && !usedHints[currentQuestionIndex]) {
      const currentQuestion = lessonContent.quiz.questions[questionOrder[currentQuestionIndex]];
      setUsedHints(prev => ({ ...prev, [currentQuestionIndex]: true }));
      
      // Play sound effect
      playSound('hint');
      
      // Show hint feedback
      setShowFeedback({
        correct: false,
        message: `💡 Hint: The answer is related to "${currentQuestion.answer.substring(0, 1)}..."`
      });
      
      // Hide hint after a delay
      setTimeout(() => {
        setShowFeedback(null);
      }, 3000);
    }
  };

  const toggleBookmark = () => {
    const newBookmarkState = !bookmarkedQuestions[currentQuestionIndex];
    setBookmarkedQuestions(prev => ({
      ...prev,
      [currentQuestionIndex]: newBookmarkState
    }));
    
    // Play sound effect
    playSound('bookmark');
  };

  const handleNextQuestion = () => {
    if (lessonContent && currentQuestionIndex < lessonContent.quiz.questions.length - 1) {
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(30); // Reset timer
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      setCurrentQuestionIndex(prev => prev - 1);
      setTimeLeft(30); // Reset timer
    }
  };

  const toggleExplanation = (index: number) => {
    setShowExplanation(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!lessonContent || !currentUser) return;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Calculate score
    let correctAnswers = 0;
    lessonContent.quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / lessonContent.quiz.questions.length) * 100);
    setScore(finalScore);
    setQuizSubmitted(true);
    
    // Play sound effect based on score
    playSound(finalScore >= 80 ? 'correct' : 'incorrect');
    
    // Show confetti for high scores
    if (finalScore >= 80) {
      showConfetti();
    }
    
    // Update gamification data
    try {
      const today = new Date().toISOString().split('T')[0];
      let newPoints = gamificationData.points;
      let newStreak = gamificationData.streak;
      let newBadges = [...gamificationData.badges];
      
      // Award points for quiz completion
      newPoints += Math.floor(finalScore / 10) * 5; // 5 points per 10% score
      
      // Check if streak continues
      if (gamificationData.lastActivityDate !== today) {
        if (gamificationData.lastActivityDate === new Date(Date.now() - 86400000).toISOString().split('T')[0]) {
          // Consecutive day, increase streak
          newStreak += 1;
        } else {
          // Break in streak, reset to 1
          newStreak = 1;
        }
      }
      
      // Award badges for achievements
      if (finalScore >= 80 && !newBadges.includes('Quiz Master')) {
        newBadges.push('Quiz Master');
      }
      
      if (newStreak >= 7 && !newBadges.includes('7-Day Streak')) {
        newBadges.push('7-Day Streak');
      }
      
      // Update gamification data
      const updatedGamificationData = {
        points: newPoints,
        streak: newStreak,
        badges: newBadges,
        lastActivityDate: today
      };
      
      setGamificationData(updatedGamificationData);
      
      // Save to Firestore
      const gamificationDoc = doc(db, 'users', currentUser.uid, 'gamification', 'data');
      await setDoc(gamificationDoc, updatedGamificationData);
    } catch (err) {
      console.error('Error updating gamification data:', err);
    }
    
    // Save quiz result to Firestore
    try {
      const quizResult = {
        userId: currentUser.uid,
        subject: subjectParam,
        grade: gradeParam,
        lesson: lessonIndex + 1,
        lessonTitle: currentLesson,
        score: finalScore,
        totalQuestions: lessonContent.quiz.questions.length,
        correctAnswers,
        timestamp: new Date().toISOString(),
        selectedAnswers
      };
      
      // Save to Firestore
      const resultDoc = doc(db, 'users', currentUser.uid, 'progress', `quiz_${subjectParam}_${gradeParam}_${lesson}`);
      await setDoc(resultDoc, quizResult);
      
      console.log('Quiz result saved successfully to Firestore');
    } catch (err) {
      console.error('Error saving quiz result to Firestore:', err);
      // Fallback to localStorage
      try {
        const quizResult = {
          userId: currentUser.uid,
          subject: subjectParam,
          grade: gradeParam,
          lesson: lessonIndex + 1,
          lessonTitle: currentLesson,
          score: finalScore,
          totalQuestions: lessonContent.quiz.questions.length,
          correctAnswers,
          timestamp: new Date().toISOString(),
          selectedAnswers
        };
        
        const resultsKey = `quizResults_${subjectParam}_${gradeParam}_${lesson}`;
        localStorage.setItem(resultsKey, JSON.stringify(quizResult));
        console.log('Quiz result saved to localStorage as fallback');
      } catch (localStorageErr) {
        console.error('Error saving quiz result to localStorage:', localStorageErr);
      }
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setScore(0);
    setShowExplanation({});
    setTimeLeft(30);
    setBookmarkedQuestions({});
    setUsedHints({});
    setShowFeedback(null);
    
    // Create new randomized question order
    if (lessonContent && lessonContent.quiz) {
      const indices = lessonContent.quiz.questions.map((_, index) => index);
      const shuffled = [...indices].sort(() => Math.random() - 0.5);
      setQuestionOrder(shuffled);
    }
    
    // Restart timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleBackToLessons = () => {
    navigate(`/lessons/${subjectParam}/${gradeParam}`);
  };

  if (!currentLesson) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Lesson Not Found</h2>
        <p className="text-gray-600 dark:text-slate-400 mb-6">
          The lesson you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to={`/lessons/${subjectParam}/${gradeParam}`}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          ← Back to Lessons
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600 dark:text-slate-400">Loading quiz content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Not Available</h2>
        <p className="text-gray-600 dark:text-slate-400 mb-6">
          {error}
        </p>
        <div className="space-y-4">
          <Link
            to={`/lesson/${subjectParam}/${gradeParam}/${lesson}`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            ← Back to Lesson
          </Link>
          <button
            onClick={handleBackToLessons}
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ml-4"
          >
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  // If we have quiz content, display it
  if (lessonContent && lessonContent.quiz && questionOrder.length > 0) {
    const currentQuestion = lessonContent.quiz.questions[questionOrder[currentQuestionIndex]];
    const isLastQuestion = currentQuestionIndex === lessonContent.quiz.questions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;
    const selectedAnswer = selectedAnswers[currentQuestionIndex];
    
    // Calculate progress
    const progress = Math.round(((currentQuestionIndex + 1) / lessonContent.quiz.questions.length) * 100);

    // Render circular progress timer
    const renderTimer = () => {
      const radius = 20;
      const circumference = 2 * Math.PI * radius;
      const progressOffset = circumference - (timeLeft / 30) * circumference;
      
      return (
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="25"
              cy="25"
              r={radius}
              stroke={timeLeft <= 5 ? "#ef4444" : "#3b82f6"}
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
            {timeLeft}
          </div>
        </div>
      );
    };

    if (quizSubmitted) {
      return (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-slate-400">
            <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Courses</Link>
            <span>→</span>
            <Link to={`/lessons/${subjectParam}/${gradeParam}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {formatSubjectName(subjectParam)} Grade {gradeParam}
            </Link>
            <span>→</span>
            <span className="font-medium">Quiz Results</span>
          </div>
          
          {/* Gamification Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{gamificationData.points}</div>
              <div className="text-sm text-gray-600 dark:text-slate-400">Points</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{gamificationData.streak} 🔥</div>
              <div className="text-sm text-gray-600 dark:text-slate-400">Day Streak</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{gamificationData.badges.length}</div>
              <div className="text-sm text-gray-600 dark:text-slate-400">Badges</div>
            </div>
          </div>
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className={`inline-block p-6 rounded-2xl bg-gradient-to-br ${getSubjectColor(subjectParam)} text-white mb-4`}>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-4xl">🎯</span>
                <div className="text-left">
                  <h1 className="text-2xl font-bold">Quiz Results</h1>
                  <p className="text-lg opacity-90">{lessonContent.title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 text-center shadow-lg">
            <div className="text-6xl mb-6">
              {score >= 80 ? '🎉' : score >= 60 ? '👍' : '📚'}
            </div>
            
            <div className="space-y-3 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Score: {score}%
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-400">
                {score >= 80 
                  ? currentLesson.includes('Integers') 
                    ? '🌟 Outstanding! You are an Integers Champion!' 
                    : currentLesson.includes('Fractions') 
                      ? '🌟 Outstanding! You are a Fraction & Decimal Master!' 
                      : '🌟 Outstanding! You are a Data Wizard!'
                  : score >= 60 
                    ? '👏 Good job! You understood most of the material.' 
                    : '📖 Keep studying! Review the lesson content and try again.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 mb-8">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {Object.keys(selectedAnswers).filter(key => 
                    selectedAnswers[parseInt(key)] === lessonContent.quiz.questions[parseInt(key)].answer
                  ).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-slate-400">Correct</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {lessonContent.quiz.questions.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-slate-400">Total Questions</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleRetakeQuiz}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Retake Quiz
              </button>
              <button
                onClick={handleBackToLessons}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                Back to Lessons
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-slate-400">
          <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Courses</Link>
          <span>→</span>
          <Link to={`/lessons/${subjectParam}/${gradeParam}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {formatSubjectName(subjectParam)} Grade {gradeParam}
          </Link>
          <span>→</span>
          <span className="font-medium">Quiz</span>
        </div>
        
        {/* Gamification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{gamificationData.points}</div>
            <div className="text-sm text-gray-600 dark:text-slate-400">Points</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{gamificationData.streak} 🔥</div>
            <div className="text-sm text-gray-600 dark:text-slate-400">Day Streak</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{gamificationData.badges.length}</div>
            <div className="text-sm text-gray-600 dark:text-slate-400">Badges</div>
          </div>
        </div>
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className={`inline-block p-6 rounded-2xl bg-gradient-to-br ${getSubjectColor(subjectParam)} text-white mb-4`}>
            <div className="flex items-center justify-center space-x-4">
              <span className="text-4xl">{getSubjectIcon(subjectParam)}</span>
              <div className="text-left">
                <h1 className="text-2xl font-bold">{lessonContent.title}</h1>
                <p className="text-lg opacity-90">Quiz Challenge</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timer and Progress */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {renderTimer()}
            <span className="text-sm text-gray-600 dark:text-slate-400">seconds left</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleBookmark}
              className={`p-2 rounded-full ${bookmarkedQuestions[currentQuestionIndex] ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'text-gray-500 hover:text-yellow-500'}`}
              title="Bookmark question"
            >
              {bookmarkedQuestions[currentQuestionIndex] ? '🔖' : '📑'}
            </button>
            
            <button 
              onClick={handleHint}
              disabled={usedHints[currentQuestionIndex]}
              className={`p-2 rounded-full ${usedHints[currentQuestionIndex] ? 'text-gray-400' : 'text-blue-500 hover:text-blue-700'}`}
              title="Get hint"
            >
              💡
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right text-sm text-gray-600 dark:text-slate-400 mb-6">
          Question {currentQuestionIndex + 1} of {lessonContent.quiz.questions.length}
        </div>

        {/* Feedback Message */}
        {showFeedback && (
          <div className={`p-4 rounded-lg mb-6 text-center ${
            showFeedback.correct 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
          }`}>
            {showFeedback.message}
          </div>
        )}

        {/* Quiz Content Card */}
        <div 
          ref={quizCardRef}
          id="quiz-card"
          className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                onClick={() => handleAnswerSelect(option)}
                disabled={quizSubmitted || showFeedback !== null}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800'
                } ${
                  quizSubmitted && option === currentQuestion.answer
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                    : ''
                } ${
                  quizSubmitted && selectedAnswer === option && option !== currentQuestion.answer
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                    : ''
                }`}
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                    selectedAnswer === option
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 dark:border-slate-600'
                  } ${
                    quizSubmitted && option === currentQuestion.answer
                      ? 'border-green-500 bg-green-500 text-white'
                      : ''
                  } ${
                    quizSubmitted && selectedAnswer === option && option !== currentQuestion.answer
                      ? 'border-red-500 bg-red-500 text-white'
                      : ''
                  }`}>
                    {String.fromCharCode(65 + optionIndex)}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation Section */}
          {quizSubmitted && (
            <div className="mt-4 mb-6">
              <button
                onClick={() => toggleExplanation(currentQuestionIndex)}
                className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                <span className="mr-2">💡</span>
                {showExplanation[currentQuestionIndex] ? 'Hide Explanation' : 'Show Explanation'}
                <svg 
                  className={`w-5 h-5 ml-2 transform transition-transform ${
                    showExplanation[currentQuestionIndex] ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showExplanation[currentQuestionIndex] && currentQuestion.explanation && (
                <div className="mt-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-800 dark:text-blue-200">
                    <span className="font-semibold">Explanation:</span> {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Correct Answer Feedback */}
          {quizSubmitted && selectedAnswer !== currentQuestion.answer && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 mb-6">
              <p className="text-green-800 dark:text-green-200">
                <span className="font-semibold">Correct Answer:</span> {currentQuestion.answer}
              </p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              onClick={handlePreviousQuestion}
              disabled={isFirstQuestion || showFeedback !== null}
              className={`px-4 py-2 rounded-lg ${
                isFirstQuestion
                  ? 'bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              ← Previous
            </button>
            
            {isLastQuestion ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={!selectedAnswer || showFeedback !== null}
                className={`px-4 py-2 rounded-lg ${
                  selectedAnswer
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 dark:bg-slate-700 dark:text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer || showFeedback !== null}
                className={`px-4 py-2 rounded-lg ${
                  selectedAnswer
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 dark:bg-slate-700 dark:text-slate-400 cursor-not-allowed'
                }`}
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6">
          <Link
            to={`/lessons/${subjectParam}/${gradeParam}`}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            ← Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  // Fallback to original placeholder content
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-slate-400">
        <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Courses</Link>
        <span>→</span>
        <Link to={`/lessons/${subjectParam}/${gradeParam}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {formatSubjectName(subjectParam)} Grade {gradeParam}
        </Link>
        <span>→</span>
        <span className="font-medium">Quiz</span>
      </div>

      {/* Development Status */}
      <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-2xl">🛠️</span>
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Development In Progress</h3>
        </div>
        <p className="text-yellow-700 dark:text-yellow-400 text-sm">
          We're actively working on creating interactive content for <strong>{currentLesson}</strong>. 
          This will include detailed explanations, practice questions, and comprehensive study materials.
        </p>
      </div>
    </div>
  );
}

export default QuizPage;
