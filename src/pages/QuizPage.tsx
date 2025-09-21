import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getLessonsForSubjectAndGrade, type Subject, type Grade } from '../data/lessonsData';
import { useAuth } from '../hooks/useAuth';
import { loadLessonContent, type LessonContent, isOldFormat, isNewFormat } from '../utils/lessonContentLoader';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { showConfetti, playSound, showShakeEffect } from '../utils/animations';
import { awardXPAndStreak, describeBadge } from '../services/gamification';
import { logActivity } from '../services/activity';
import { useBadgeQueue } from '../contexts/BadgeContext';


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
  const { queueBadge } = useBadgeQueue();

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
                // Fallback to local content for Grade 6-11 chapters 1-3
                if (gradeParam >= 6 && gradeParam <= 11 && lessonIndex >= 0 && lessonIndex <= 2) {
                  const content = loadLessonContent(lessonIndex + 1, gradeParam);
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
              // Fallback to local content for Grade 6-11 chapters 1-3
              if (gradeParam >= 6 && gradeParam <= 11 && lessonIndex >= 0 && lessonIndex <= 2) {
                const content = loadLessonContent(lessonIndex + 1, gradeParam);
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
            // Fallback to local content for Grade 6-11 chapters 1-3
            if (gradeParam >= 6 && gradeParam <= 11 && lessonIndex >= 0 && lessonIndex <= 2) {
              const content = loadLessonContent(lessonIndex + 1, gradeParam);
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
          if (subjectParam === 'Mathematics' && gradeParam >= 6 && gradeParam <= 11 && lessonIndex >= 0 && lessonIndex <= 2) {
            const content = loadLessonContent(lessonIndex + 1, gradeParam);
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

  // Check if answer is correct
  const checkAnswer = (option: string) => {
    if (!lessonContent) return false;
    
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return false;
    
    // Handle old format
    if (isOldFormat(lessonContent)) {
      return option === (currentQuestion as any).answer;
    }
    // Handle new format
    else if (isNewFormat(lessonContent)) {
      return option === (currentQuestion as any).correctAnswer;
    }
    
    return false;
  };

  const handleOptionSelect = (option: string) => {
    if (showFeedback || !lessonContent) return;
    
    // Store selected answer
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: option
    }));
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Check if answer is correct
    const isCorrect = checkAnswer(option);
    
    // Play sound effect
    playSound(isCorrect ? 'correct' : 'incorrect');
    
    // Show animation effect
    if (isCorrect) {
      showConfetti();
    } else if (quizCardRef.current) {
      showShakeEffect(quizCardRef.current.id);
    }
    
    // Show immediate feedback
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      let correctAnswerText = '';
      if (isOldFormat(lessonContent)) {
        correctAnswerText = (currentQuestion as any).answer;
      } else if (isNewFormat(lessonContent)) {
        correctAnswerText = (currentQuestion as any).correctAnswer;
      }
      
      setShowFeedback({
        correct: isCorrect,
        message: isCorrect 
          ? "✅ Well done! You got it right." 
          : `❌ Not quite, the correct answer is ${correctAnswerText}.`
      });
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      setShowFeedback(null);
      if (lessonContent && currentQuestionIndex < getTotalQuestions() - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeLeft(30); // Reset timer
      } else {
        handleSubmitQuiz();
      }
    }, 2000);
  };

  const handleHint = () => {
    if (lessonContent && !usedHints[currentQuestionIndex]) {
      const currentQuestion = getCurrentQuestion();
      if (!currentQuestion) return;
      
      setUsedHints(prev => ({ ...prev, [currentQuestionIndex]: true }));
      
      // Play sound effect
      playSound('hint');
      
      // Show hint feedback
      let correctAnswerText = '';
      if (lessonContent && isOldFormat(lessonContent)) {
        correctAnswerText = (currentQuestion as any).answer;
      } else if (lessonContent && isNewFormat(lessonContent)) {
        correctAnswerText = (currentQuestion as any).correctAnswer;
      }
      
      setShowFeedback({
        correct: false,
        message: `💡 Hint: The answer is related to "${correctAnswerText.substring(0, 1)}..."`
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
    if (lessonContent && currentQuestionIndex < getTotalQuestions() - 1) {
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
    const totalQuestions = getTotalQuestions();
    
    for (let i = 0; i < totalQuestions; i++) {
      const question = lessonContent.quiz.questions[questionOrder[i]];
      let correctAnswer = '';
      
      if (lessonContent && isOldFormat(lessonContent)) {
        correctAnswer = (question as any).answer;
      } else if (lessonContent && isNewFormat(lessonContent)) {
        correctAnswer = (question as any).correctAnswer;
      }
      
      if (selectedAnswers[i] === correctAnswer) {
        correctAnswers++;
      }
    }
    
    const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
    setQuizSubmitted(true);
    
    // Play sound effect based on score
    playSound(finalScore >= 80 ? 'correct' : 'incorrect');
    
    // Show confetti for high scores
    if (finalScore >= 80) {
      showConfetti();
    }
    
    // Update gamification via service: award XP based on score and update streak; queue earned badges
    try {
      const deltaXP = Math.floor(finalScore / 10) * 5; // 5 XP per 10% score
      const res = await awardXPAndStreak(currentUser.uid, deltaXP);
      setGamificationData((prev) => ({
        points: res.newXP,
        streak: res.newStreak,
        badges: Array.from(new Set([...(prev.badges || []), ...res.earnedBadges])),
        lastActivityDate: new Date().toISOString().split('T')[0]
      }));
      if (res.earnedBadges.length > 0) {
        res.earnedBadges.map((id) => describeBadge(id)).forEach((b) => queueBadge(b));
      }
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
        totalQuestions: totalQuestions,
        correctAnswers,
        timestamp: new Date().toISOString(),
        selectedAnswers
      };
      
      // Save to Firestore
      const resultDoc = doc(db, 'users', currentUser.uid, 'progress', `quiz_${subjectParam}_${gradeParam}_${lesson}`);
      await setDoc(resultDoc, quizResult);
      
      // Log activity for teacher analytics
      try {
        await logActivity({ uid: currentUser.uid, type: 'quiz_completed', grade: gradeParam, lesson: lessonIndex + 1, subject: subjectParam, score: finalScore })
      } catch {}

      console.log('Quiz result saved successfully to Firestore');
    } catch (err) {
      console.error('Error saving quiz result to Firestore:', err);
      // Fallback to localStorage
      localStorage.setItem(`quizResult_${subjectParam}_${gradeParam}_${lesson}`, JSON.stringify({
        userId: currentUser.uid,
        subject: subjectParam,
        grade: gradeParam,
        lesson: lessonIndex + 1,
        lessonTitle: currentLesson,
        score: finalScore,
        totalQuestions: totalQuestions,
        correctAnswers,
        timestamp: new Date().toISOString(),
        selectedAnswers
      }));
    }
  };



  const handleBackToLessons = () => {
    navigate(`/lessons/${subjectParam}/${gradeParam}`);
  };

  // Helper function to get current question based on format
  const getCurrentQuestion = () => {
    if (!lessonContent) return null;
    
    const questions = lessonContent.quiz.questions;
    if (questionOrder.length > currentQuestionIndex) {
      return questions[questionOrder[currentQuestionIndex]];
    }
    return null;
  };

  // Helper function to get total questions based on format
  const getTotalQuestions = () => {
    if (!lessonContent) return 0;
    return lessonContent.quiz.questions.length;
  };

  // Helper function to get question text based on format
  const getQuestionText = (question: any) => {
    if (lessonContent && isOldFormat(lessonContent)) {
      return question.question;
    } else if (lessonContent && isNewFormat(lessonContent)) {
      return question.text;
    }
    return '';
  };

  // Helper function to get question options based on format
  const getQuestionOptions = (question: any) => {
    return question.options;
  };

  // Helper function to get question explanation based on format
  const getQuestionExplanation = (question: any) => {
    if (lessonContent && isOldFormat(lessonContent)) {
      return question.explanation;
    } else if (lessonContent && isNewFormat(lessonContent)) {
      return question.explanation;
    }
    return '';
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

  if (lessonContent) {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❓</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Questions Found</h2>
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            This quiz doesn't have any questions yet.
          </p>
          <Link
            to={`/lessons/${subjectParam}/${gradeParam}/${lesson}`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            ← Back to Lesson
          </Link>
        </div>
      );
    }

    // Calculate progress percentage
    const progressPercentage = Math.round(((currentQuestionIndex + 1) / getTotalQuestions()) * 100);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-slate-400 mb-6">
          <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Courses</Link>
          <span>→</span>
          <Link to={`/lessons/${subjectParam}/${gradeParam}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {formatSubjectName(subjectParam)} Grade {gradeParam}
          </Link>
          <span>→</span>
          <Link to={`/lessons/${subjectParam}/${gradeParam}/${lesson}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Lesson {lesson}
          </Link>
          <span>→</span>
          <span className="font-medium">Quiz</span>
        </div>
        
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
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
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{timeLeft}</div>
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
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-right text-sm text-gray-600 dark:text-slate-400 mb-6">
          Question {currentQuestionIndex + 1} of {getTotalQuestions()}
        </div>

        {/* Quiz Content Card */}
        <div 
          ref={quizCardRef}
          id="quiz-card"
          className={`bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-lg transition-all duration-300 ${
            showFeedback && !showFeedback.correct ? 'animate-shake' : ''
          }`}
        >
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-slate-400 mb-1">
              <span>Question {currentQuestionIndex + 1} of {getTotalQuestions()}</span>
              <span>{timeLeft}s</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {getQuestionText(currentQuestion)}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {getQuestionOptions(currentQuestion).map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                disabled={showFeedback !== null}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedAnswers[currentQuestionIndex] === option
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-700'
                } ${
                  showFeedback && checkAnswer(option)
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : ''
                } ${
                  showFeedback && selectedAnswers[currentQuestionIndex] === option && !checkAnswer(option)
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : ''
                } ${
                  showFeedback ? 'cursor-default' : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 flex-shrink-0 ${
                    selectedAnswers[currentQuestionIndex] === option
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 dark:border-slate-500'
                  } ${
                    showFeedback && checkAnswer(option)
                      ? 'border-green-500 bg-green-500 text-white'
                      : ''
                  } ${
                    showFeedback && selectedAnswers[currentQuestionIndex] === option && !checkAnswer(option)
                      ? 'border-red-500 bg-red-500 text-white'
                      : ''
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-gray-900 dark:text-slate-200">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-lg mb-6 ${
              showFeedback.correct 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <p className="font-medium text-gray-900 dark:text-white">{showFeedback.message}</p>
            </div>
          )}

          {/* Explanation */}
          {showExplanation[currentQuestionIndex] && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Explanation:</h3>
              <p className="text-gray-800 dark:text-slate-300">
                {getQuestionExplanation(currentQuestion)}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => toggleExplanation(currentQuestionIndex)}
              className="px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300 rounded-lg transition-colors"
            >
              {showExplanation[currentQuestionIndex] ? 'Hide Explanation' : 'Show Explanation'}
            </button>
            
            <button
              onClick={handleHint}
              disabled={usedHints[currentQuestionIndex] || showFeedback !== null}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                usedHints[currentQuestionIndex] || showFeedback !== null
                  ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed'
                  : 'bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
              }`}
            >
              💡 Hint {usedHints[currentQuestionIndex] ? '(Used)' : ''}
            </button>
            
            <button
              onClick={toggleBookmark}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                bookmarkedQuestions[currentQuestionIndex]
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
                  : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300'
              }`}
            >
              {bookmarkedQuestions[currentQuestionIndex] ? '🔖 Bookmarked' : '🔖 Bookmark'}
            </button>
            
            <div className="flex-1"></div>
            
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePreviousQuestion}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300 rounded-lg transition-colors"
              >
                ← Previous
              </button>
            )}
            
            {currentQuestionIndex < getTotalQuestions() - 1 && (
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6">
          <Link
            to={`/lessons/${subjectParam}/${gradeParam}/${lesson}`}
            className="inline-flex items-center px-4 py-2 text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            ← Back to Lesson
          </Link>
          
          <button
            onClick={handleSubmitQuiz}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Submit Quiz
          </button>
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
