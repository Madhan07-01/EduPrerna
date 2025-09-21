import { useState, useEffect, useRef } from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';
import { getLessonsForSubjectAndGrade, type Subject, type Grade } from '../data/lessonsData';
import { useAuth } from '../hooks/useAuth';
import { loadLessonContent, type LessonContent, isOldFormat, isNewFormat } from '../utils/lessonContentLoader';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { awardXPAndStreak, describeBadge, type QueuedBadge } from '../services/gamification';
import { useBadgeQueue } from '../contexts/BadgeContext';

import { 
  NumberLine, 
  FractionVisualizer, 
  IntegerOperations,
  DecimalPlaceValue,
  BarGraph,
  Pictograph,
  CoinToss,
  DiceRoll,
  RationalNumberWheel,
  BalanceScale,
  QuadrilateralBuilder,
  NumberSystemVisualization,
  PolynomialGraph,
  CoordinateGeometry,
  PrimeFactorizationTree,
  EuclidsAlgorithmVisualizer,
  PolynomialDivision,
  LinearEquationsGraph,
  VennDiagram,
  RelationGraph,
  UnitCircle
} from '../components/InteractiveLearning';

// Define types for our lesson content structure
interface SubtopicProgress {
  [key: number]: boolean;
}

// Define types for gamification data
interface GamificationData {
  points: number;
  streak: number;
  badges: string[];
  lastActivityDate: string;
}

export function LessonDetailPage() {
  const { subject, grade, lesson } = useParams<{ subject: string; grade: string; lesson: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedSubtopics, setCompletedSubtopics] = useState<SubtopicProgress>({});
  const [activeSubtopic, setActiveSubtopic] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [pendingBadges, setPendingBadges] = useState<QueuedBadge[]>([]);
  const { queueBadge } = useBadgeQueue();
  const [gamificationData, setGamificationData] = useState<GamificationData>({
    points: 0,
    streak: 0,
    badges: [],
    lastActivityDate: ''
  });
  const contentRef = useRef<HTMLDivElement>(null);

  // Parse URL params
  const subjectParam = subject as Subject;
  const gradeParam = parseInt(grade || '6') as Grade;
  const lessonIndex = parseInt(lesson || '1') - 1;

  // Get lessons for this subject and grade
  const lessons = getLessonsForSubjectAndGrade(subjectParam, gradeParam);
  const currentLesson = lessons[lessonIndex];

  // Fetch lesson progress and gamification data from Firestore
  useEffect(() => {
    const fetchLessonProgress = async () => {
      if (!currentUser || !currentLesson) return;
      
      try {
        // Fetch gamification data
        const gamificationDoc = doc(db, 'users', currentUser.uid, 'gamification', 'data');
        const gamificationSnap = await getDoc(gamificationDoc);
        
        if (gamificationSnap.exists()) {
          setGamificationData(gamificationSnap.data() as GamificationData);
        }
        
        // Fetch lesson progress
        const progressKey = `lessonProgress_${subjectParam}_${gradeParam}_${lesson}`;
        const savedProgress = localStorage.getItem(progressKey);
        
        if (savedProgress) {
          const progressData = JSON.parse(savedProgress);
          setCompletedSubtopics(progressData.completedSubtopics || {});
          setActiveSubtopic(progressData.lastViewedSubtopic || 0);
        }
      } catch (err) {
        console.error('Error fetching lesson progress:', err);
      }
    };
    
    fetchLessonProgress();
  }, [currentUser, currentLesson, subjectParam, gradeParam, lesson]);

  // Fetch lesson content
  useEffect(() => {
    const fetchLessonContent = async () => {
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
            // Try to load from Firestore
            const lessonDoc = doc(db, 'courses', 'mathematics', 'lessons', `${gradeParam}`, `chapter${lessonIndex + 1}`);
            const docSnap = await getDoc(lessonDoc);
            
            if (docSnap.exists()) {
              const data = docSnap.data();
              setLessonContent({
                title: data.title,
                subtopics: data.subtopics,
                quiz: data.quiz
              } as LessonContent);
            } else {
              // Fallback to local content for Grade 6-12 chapters 1-3
              if (gradeParam >= 6 && gradeParam <= 12 && lessonIndex >= 0 && lessonIndex <= 2) {
                const content = loadLessonContent(lessonIndex + 1, gradeParam);
                if (content) {
                  setLessonContent(content);
                } else {
                  setError('Lesson content not found');
                }
              } else {
                setError('Content not available for this lesson yet');
              }
            }
          } catch (firestoreError) {
            console.error('Error fetching from Firestore:', firestoreError);
            // Fallback to local content for Grade 6-12 chapters 1-3
            if (gradeParam >= 6 && gradeParam <= 12 && lessonIndex >= 0 && lessonIndex <= 2) {
              const content = loadLessonContent(lessonIndex + 1, gradeParam);
              if (content) {
                setLessonContent(content);
              } else {
                setError('Lesson content not found');
              }
            } else {
              setError('Content not available for this lesson yet');
            }
          }
        } else {
          // For other subjects/grades, show placeholder content
          setError('Content not available for this lesson yet');
        }
      } catch (err) {
        console.error('Error fetching lesson content:', err);
        setError('Failed to load lesson content');
      } finally {
        setLoading(false);
      }
    };

    fetchLessonContent();
  }, [subjectParam, gradeParam, lessonIndex, currentLesson]);

  // Save progress and gamification data to Firestore
  const saveProgress = async (subtopicIndex: number, completed: boolean = false) => {
    if (!currentUser || !currentLesson) return;
    
    try {
      const progressKey = `lessonProgress_${subjectParam}_${gradeParam}_${lesson}`;
      
      // Update completed subtopics
      const updatedCompleted = { ...completedSubtopics };
      if (completed) {
        updatedCompleted[subtopicIndex] = true;
        setCompletedSubtopics(updatedCompleted);
      }
      
      const progressData = {
        userId: currentUser.uid,
        subject: subjectParam,
        grade: gradeParam,
        lesson: lessonIndex + 1,
        lessonTitle: currentLesson,
        lastViewedSubtopic: subtopicIndex,
        completedSubtopics: updatedCompleted,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem(progressKey, JSON.stringify(progressData));
      
      // Update gamification via service if completing a subtopic
      if (completed) {
        const res = await awardXPAndStreak(currentUser.uid, 10);
        setGamificationData((prev) => ({
          points: res.newXP,
          streak: res.newStreak,
          badges: Array.from(new Set([...(prev.badges || []), ...res.earnedBadges])),
          lastActivityDate: new Date().toISOString().split('T')[0]
        }));
        if (res.earnedBadges.length > 0) {
          const earned = res.earnedBadges.map((id) => describeBadge(id));
          // Delay showing if lesson not completed screen yet
          setPendingBadges((pb) => [...pb, ...earned]);
        }
      }
    } catch (err) {
      console.error('Error saving lesson progress:', err);
    }
  };

  // When completion screen is shown, flush queued badge popups
  useEffect(() => {
    if (showCompletion && pendingBadges.length > 0) {
      pendingBadges.forEach((b) => queueBadge(b));
      setPendingBadges([]);
    }
  }, [showCompletion, pendingBadges, queueBadge]);

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

  const handleSubtopicComplete = (index: number) => {
    setCompletedSubtopics(prev => ({
      ...prev,
      [index]: true
    }));
    saveProgress(index, true);
  };

  const handleNextSubtopic = () => {
    if (lessonContent && isOldFormat(lessonContent) && activeSubtopic < lessonContent.subtopics.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        handleSubtopicComplete(activeSubtopic);
        setActiveSubtopic(prev => prev + 1);
        saveProgress(activeSubtopic + 1);
        setIsTransitioning(false);
      }, 300);
    } else if (lessonContent && isOldFormat(lessonContent) && activeSubtopic === lessonContent.subtopics.length - 1) {
      // Last topic completed, show completion screen
      handleSubtopicComplete(activeSubtopic);
      setShowCompletion(true);
    }
  };

  const handlePreviousSubtopic = () => {
    if (activeSubtopic > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSubtopic(prev => prev - 1);
        saveProgress(activeSubtopic - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleStartQuiz = () => {
    // Mark all subtopics as completed
    if (lessonContent && isOldFormat(lessonContent)) {
      const allCompleted: Record<number, boolean> = {};
      lessonContent.subtopics.forEach((_, index) => {
        allCompleted[index] = true;
      });
      setCompletedSubtopics(allCompleted);
    }
    
    // Save progress
    saveProgress(activeSubtopic, true);
    
    // Navigate to quiz page
    navigate(`/quiz/${subjectParam}/${gradeParam}/${lesson}`);
  };

  const handleContinueLearning = () => {
    setShowCompletion(false);
  };

  // Function to extract key points from content
  const extractKeyPoints = (content: string) => {
    // This is a simplified implementation - in a real app, you might want to parse the HTML more thoroughly
    const keyPoints: string[] = [];
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Extract bold text as key points
    const boldElements = tempDiv.querySelectorAll('strong, b');
    boldElements.forEach(el => {
      keyPoints.push(el.textContent || '');
    });
    
    // Extract list items as key points
    const listItems = tempDiv.querySelectorAll('li');
    listItems.forEach(li => {
      keyPoints.push(li.textContent || '');
    });
    
    return keyPoints.filter(point => point.trim() !== '');
  };

  // Function to check if content contains specific math concepts
  const containsMathConcept = (content: string, concept: string) => {
    const lowerContent = content.toLowerCase();
    return lowerContent.includes(concept);
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
        <p className="text-gray-600 dark:text-slate-400">Loading lesson content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Content Not Available</h2>
        <p className="text-gray-600 dark:text-slate-400 mb-6">
          {error}
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

  // If we have lesson content, display it
  if (lessonContent) {
    // Handle old format (Grades 6-11)
    if (isOldFormat(lessonContent)) {
      const isLastSubtopic = activeSubtopic === lessonContent.subtopics.length - 1;
      const progressPercentage = Math.round(((activeSubtopic + 1) / lessonContent.subtopics.length) * 100);
      const keyPoints = extractKeyPoints(lessonContent.subtopics[activeSubtopic].content);
      const currentContent = lessonContent.subtopics[activeSubtopic].content;

      // Show completion screen if needed
      if (showCompletion) {
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
              <span className="font-medium">Lesson {lesson}</span>
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
                  <span className="text-4xl">{getSubjectIcon(subjectParam)}</span>
                  <div className="text-left">
                    <h1 className="text-2xl font-bold">{lessonContent.title}</h1>
                    <p className="text-lg opacity-90">{formatSubjectName(subjectParam)} • Grade {gradeParam} • Lesson {lesson}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Completion Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 text-center shadow-lg">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Great job finishing {lessonContent.title}!</h2>
              <p className="text-gray-600 dark:text-slate-300 mb-8">
                You've completed all topics in this lesson. Ready to test your knowledge with a quiz?
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={handleStartQuiz}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Quiz →
                </button>
                <button
                  onClick={handleContinueLearning}
                  className="px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Review Lesson
                </button>
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
            <span className="font-medium">Lesson {lesson}</span>
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
                  <p className="text-lg opacity-90">{formatSubjectName(subjectParam)} • Grade {gradeParam} • Lesson {lesson}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-gray-600 dark:text-slate-400">
            Topic {activeSubtopic + 1} of {lessonContent.subtopics.length}
          </div>

          {/* Main Content Card */}
          <div 
            ref={contentRef}
            className={`bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-lg transition-all duration-300 ease-in-out ${
              isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
            }`}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {lessonContent.subtopics[activeSubtopic].title}
            </h2>
            
            {/* Key Points Section */}
            {keyPoints.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                  <span className="mr-2">🔑</span> Key Points
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {keyPoints.map((point, index) => (
                    <li key={index} className="text-blue-700 dark:text-blue-300">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div 
              className="prose prose-lg dark:prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: currentContent }}
            />
            
            {/* Interactive Learning Aids */}
            <div className="mt-8 space-y-6">
              {/* Number Line Visualization */}
              {containsMathConcept(currentContent, 'number line') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Number Line</h3>
                  <NumberLine />
                </div>
              )}
              
              {/* Fraction Visualization */}
              {containsMathConcept(currentContent, 'fraction') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Fraction Visualizer</h3>
                  <FractionVisualizer />
                </div>
              )}
              
              {/* Integer Operations */}
              {containsMathConcept(currentContent, 'integer') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Integer Operations</h3>
                  <IntegerOperations />
                </div>
              )}
              
              {/* Decimal Place Value */}
              {containsMathConcept(currentContent, 'decimal') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Decimal Place Value</h3>
                  <DecimalPlaceValue />
                </div>
              )}
              
              {/* Data Handling - Bar Graph */}
              {containsMathConcept(currentContent, 'bar graph') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Bar Graph</h3>
                  <BarGraph />
                </div>
              )}
              
              {/* Data Handling - Pictograph */}
              {containsMathConcept(currentContent, 'pictograph') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Pictograph</h3>
                  <Pictograph />
                </div>
              )}
              
              {/* Probability - Coin Toss */}
              {containsMathConcept(currentContent, 'probability') && containsMathConcept(currentContent, 'coin') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Coin Toss</h3>
                  <CoinToss />
                </div>
              )}
              
              {/* Probability - Dice Roll */}
              {containsMathConcept(currentContent, 'probability') && containsMathConcept(currentContent, 'dice') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Dice Roll</h3>
                  <DiceRoll />
                </div>
              )}
              
              {/* Rational Numbers - Number Wheel */}
              {containsMathConcept(currentContent, 'rational') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Rational Number Wheel</h3>
                  <RationalNumberWheel />
                </div>
              )}
              
              {/* Linear Equations - Balance Scale */}
              {containsMathConcept(currentContent, 'linear equation') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Balance Scale</h3>
                  <BalanceScale />
                </div>
              )}
              
              {/* Quadrilaterals - Shape Builder */}
              {containsMathConcept(currentContent, 'quadrilateral') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Quadrilateral Builder</h3>
                  <QuadrilateralBuilder />
                </div>
              )}
              
              {/* Grade 9 Number Systems - Number System Visualization */}
              {gradeParam === 9 && containsMathConcept(currentContent, 'number system') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Number System Visualization</h3>
                  <NumberSystemVisualization />
                </div>
              )}
              
              {/* Grade 9 Polynomials - Polynomial Graph */}
              {gradeParam === 9 && containsMathConcept(currentContent, 'polynomial') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Polynomial Graph</h3>
                  <PolynomialGraph />
                </div>
              )}
              
              {/* Grade 9 Coordinate Geometry - Coordinate Geometry */}
              {gradeParam === 9 && containsMathConcept(currentContent, 'coordinate geometry') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Coordinate Geometry</h3>
                  <CoordinateGeometry />
                </div>
              )}
              
              {/* Grade 10 Real Numbers - Prime Factorization Tree */}
              {gradeParam === 10 && containsMathConcept(currentContent, 'prime factor') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Prime Factorization Tree</h3>
                  <PrimeFactorizationTree />
                </div>
              )}
              
              {/* Grade 10 Real Numbers - Euclid's Algorithm Visualizer */}
              {gradeParam === 10 && containsMathConcept(currentContent, 'euclid') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Euclid's Algorithm Visualizer</h3>
                  <EuclidsAlgorithmVisualizer />
                </div>
              )}
              
              {/* Grade 10 Polynomials - Polynomial Division */}
              {gradeParam === 10 && containsMathConcept(currentContent, 'polynomial') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Polynomial Division</h3>
                  <PolynomialDivision />
                </div>
              )}
              
              {/* Grade 10 Pair of Linear Equations - Linear Equations Graph */}
              {gradeParam === 10 && containsMathConcept(currentContent, 'linear equation') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Linear Equations Graph</h3>
                  <LinearEquationsGraph />
                </div>
              )}
            </div>
            
            {/* Grade 11 Sets - Venn Diagram */}
            {gradeParam === 11 && containsMathConcept(currentContent, 'set') && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Venn Diagram</h3>
                <VennDiagram />
              </div>
            )}
            
            {/* Grade 11 Relations and Functions - Relation Graph */}
            {gradeParam === 11 && containsMathConcept(currentContent, 'relation') && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Relation Graph Builder</h3>
                <RelationGraph />
              </div>
            )}
            
            {/* Grade 11 Trigonometric Functions - Unit Circle */}
            {gradeParam === 11 && containsMathConcept(currentContent, 'trigonometric') && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Interactive Unit Circle</h3>
                <UnitCircle />
              </div>
            )}
            
            <div className="flex justify-between pt-4">
              <button
                onClick={handlePreviousSubtopic}
                disabled={activeSubtopic === 0}
                className={`px-4 py-2 rounded-lg ${
                  activeSubtopic === 0
                    ? 'bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                ← Previous
              </button>
              
              {isLastSubtopic ? (
                <button
                  onClick={handleNextSubtopic}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Finish Lesson →
                </button>
              ) : (
                <button
                  onClick={handleNextSubtopic}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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
    // Handle new format (Grade 12)
    else if (isNewFormat(lessonContent)) {
      // For now, we'll show a placeholder for Grade 12 content
      // In a real implementation, we would render the new content structure
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📘</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{lessonContent.title}</h2>
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            Content for this lesson is available but not yet fully implemented in the viewer.
          </p>
          <button
            onClick={handleStartQuiz}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Start Quiz →
          </button>
          <Link
            to={`/lessons/${subjectParam}/${gradeParam}`}
            className="inline-block mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            ← Back to Lessons
          </Link>
        </div>
      );
    }
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
        <span className="font-medium">Lesson {lesson}</span>
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

export default LessonDetailPage;