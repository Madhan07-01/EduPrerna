// Badge definitions for the EduPrerna app
export type BadgeRarity = 'rookie' | 'bronze' | 'silver' | 'gold' | 'diamond' | 'legendary';

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  quote?: string;
  unlockCondition: string;
  color: string;
  glow: string;
  borderColor: string;
}

// Comprehensive badge definitions based on the provided hierarchy
export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // 🟢 Rookie Badges (Easy intro tasks)
  {
    id: 'daily-starter',
    name: 'Daily Starter',
    description: 'Complete your first lesson of the day',
    icon: '🌅',
    rarity: 'rookie',
    quote: 'Every great journey begins with a single step.',
    unlockCondition: 'Complete any lesson for the first time in a day',
    color: 'from-green-500 to-emerald-600',
    glow: 'shadow-green-500/50',
    borderColor: 'border-green-500'
  },
  {
    id: 'quiz-taker',
    name: 'Quiz Taker',
    description: 'Attempt your first quiz',
    icon: '📝',
    rarity: 'rookie',
    quote: 'Courage is the first step to learning.',
    unlockCondition: 'Attempt any quiz for the first time',
    color: 'from-green-500 to-emerald-600',
    glow: 'shadow-green-500/50',
    borderColor: 'border-green-500'
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Visit 3 different subject pages',
    icon: '🧭',
    rarity: 'rookie',
    quote: 'Curiosity is the engine of learning.',
    unlockCondition: 'Visit 3 different subject pages',
    color: 'from-green-500 to-emerald-600',
    glow: 'shadow-green-500/50',
    borderColor: 'border-green-500'
  },
  {
    id: 'first-friend',
    name: 'First Friend',
    description: 'Add or join a study group',
    icon: '👥',
    rarity: 'rookie',
    quote: 'Learning together makes us stronger.',
    unlockCondition: 'Add or join a study group (if social features exist)',
    color: 'from-green-500 to-emerald-600',
    glow: 'shadow-green-500/50',
    borderColor: 'border-green-500'
  },

  // 🟤 Bronze Badges (Consistency & small milestones)
  {
    id: 'streak-starter',
    name: 'Streak Starter',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    rarity: 'bronze',
    quote: 'Consistency beats intensity.',
    unlockCondition: 'Maintain a 3-day learning streak',
    color: 'from-amber-700 to-amber-900',
    glow: 'shadow-amber-500/50',
    borderColor: 'border-amber-700'
  },
  {
    id: 'quiz-rookie',
    name: 'Quiz Rookie',
    description: 'Score at least 50% on 3 quizzes',
    icon: '📊',
    rarity: 'bronze',
    quote: 'Practice makes progress.',
    unlockCondition: 'Score at least 50% on 3 quizzes',
    color: 'from-amber-700 to-amber-900',
    glow: 'shadow-amber-500/50',
    borderColor: 'border-amber-700'
  },
  {
    id: 'note-keeper',
    name: 'Note Keeper',
    description: 'Bookmark or save 5 lessons',
    icon: '🔖',
    rarity: 'bronze',
    quote: 'Knowledge is power, but organized knowledge is wisdom.',
    unlockCondition: 'Bookmark or save 5 lessons',
    color: 'from-amber-700 to-amber-900',
    glow: 'shadow-amber-500/50',
    borderColor: 'border-amber-700'
  },
  {
    id: 'warm-up-champion',
    name: 'Warm-Up Champion',
    description: 'Complete 3 mini-games',
    icon: '🎮',
    rarity: 'bronze',
    quote: 'Play is the highest form of research.',
    unlockCondition: 'Complete 3 mini-games',
    color: 'from-amber-700 to-amber-900',
    glow: 'shadow-amber-500/50',
    borderColor: 'border-amber-700'
  },

  // ⚪ Silver Badges (Skill-building & progress)
  {
    id: 'subject-explorer',
    name: 'Subject Explorer',
    description: 'Complete at least 1 lesson in 3 different subjects',
    icon: '📚',
    rarity: 'silver',
    quote: 'A well-rounded mind is a powerful mind.',
    unlockCondition: 'Complete at least 1 lesson in 3 different subjects',
    color: 'from-gray-400 to-gray-600',
    glow: 'shadow-gray-500/50',
    borderColor: 'border-gray-500'
  },
  {
    id: 'quiz-challenger',
    name: 'Quiz Challenger',
    description: 'Score 70%+ on 5 quizzes',
    icon: '💪',
    rarity: 'silver',
    quote: 'Champions are made through challenge.',
    unlockCondition: 'Score 70%+ on 5 quizzes',
    color: 'from-gray-400 to-gray-600',
    glow: 'shadow-gray-500/50',
    borderColor: 'border-gray-500'
  },
  {
    id: 'persistence-pro',
    name: 'Persistence Pro',
    description: 'Maintain a 10-day streak',
    icon: '🏆',
    rarity: 'silver',
    quote: 'Perseverance is not a long race; it is many short races one after the other.',
    unlockCondition: 'Maintain a 10-day learning streak',
    color: 'from-gray-400 to-gray-600',
    glow: 'shadow-gray-500/50',
    borderColor: 'border-gray-500'
  },
  {
    id: 'daily-xp-earner',
    name: 'Daily XP Earner',
    description: 'Earn XP for 7 days in a row',
    icon: '⭐',
    rarity: 'silver',
    quote: 'Small daily improvements lead to stunning results.',
    unlockCondition: 'Earn XP for 7 days in a row',
    color: 'from-gray-400 to-gray-600',
    glow: 'shadow-gray-500/50',
    borderColor: 'border-gray-500'
  },

  // 🟡 Gold Badges (Intermediate mastery)
  {
    id: 'math-magician',
    name: 'Math Magician',
    description: 'Solve 50 math problems',
    icon: '➗',
    rarity: 'gold',
    quote: 'Mathematics is the language with which God has written the universe.',
    unlockCondition: 'Solve 50 math problems',
    color: 'from-yellow-500 to-amber-600',
    glow: 'shadow-yellow-500/50',
    borderColor: 'border-yellow-500'
  },
  {
    id: 'science-sleuth',
    name: 'Science Sleuth',
    description: 'Complete 10 science lessons',
    icon: '🔬',
    rarity: 'gold',
    quote: 'The important thing is not to stop questioning.',
    unlockCondition: 'Complete 10 science lessons',
    color: 'from-yellow-500 to-amber-600',
    glow: 'shadow-yellow-500/50',
    borderColor: 'border-yellow-500'
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Score 80%+ in 10 quizzes',
    icon: '🎓',
    rarity: 'gold',
    quote: 'Mastery is not a destination; it is a journey.',
    unlockCondition: 'Score 80%+ in 10 quizzes',
    color: 'from-yellow-500 to-amber-600',
    glow: 'shadow-yellow-500/50',
    borderColor: 'border-yellow-500'
  },
  {
    id: 'team-player',
    name: 'Team Player',
    description: 'Participate in 3 group challenges',
    icon: '🤝',
    rarity: 'gold',
    quote: 'Alone we can do so little; together we can do so much.',
    unlockCondition: 'Participate in 3 group challenges (if multiplayer features exist)',
    color: 'from-yellow-500 to-amber-600',
    glow: 'shadow-yellow-500/50',
    borderColor: 'border-yellow-500'
  },
  {
    id: 'speed-learner',
    name: 'Speed Learner',
    description: 'Finish a lesson in under X minutes with full score quiz at end',
    icon: '⚡',
    rarity: 'gold',
    quote: 'Efficiency is doing things right; effectiveness is doing the right things.',
    unlockCondition: 'Finish a lesson in under X minutes with full score quiz at end',
    color: 'from-yellow-500 to-amber-600',
    glow: 'shadow-yellow-500/50',
    borderColor: 'border-yellow-500'
  },

  // 💎 Diamond Badges (Advanced challenges)
  {
    id: 'subject-specialist',
    name: 'Subject Specialist',
    description: 'Complete all lessons in one subject',
    icon: '👑',
    rarity: 'diamond',
    quote: 'Excellence is not a skill, it is an attitude.',
    unlockCondition: 'Complete all lessons in one subject (e.g., Algebra or Chemistry)',
    color: 'from-blue-400 to-cyan-500',
    glow: 'shadow-blue-500/50',
    borderColor: 'border-blue-400'
  },
  {
    id: 'quiz-dominator',
    name: 'Quiz Dominator',
    description: 'Score 90%+ in 20 quizzes',
    icon: '💯',
    rarity: 'diamond',
    quote: 'Greatness is not a function of circumstance. Greatness is a function of choice.',
    unlockCondition: 'Score 90%+ in 20 quizzes',
    color: 'from-blue-400 to-cyan-500',
    glow: 'shadow-blue-500/50',
    borderColor: 'border-blue-400'
  },
  {
    id: 'month-warrior',
    name: 'Month Warrior',
    description: '30-day study streak',
    icon: '🗓️',
    rarity: 'diamond',
    quote: 'The secret of getting ahead is getting started, and continuing.',
    unlockCondition: 'Maintain a 30-day study streak',
    color: 'from-blue-400 to-cyan-500',
    glow: 'shadow-blue-500/50',
    borderColor: 'border-blue-400'
  },
  {
    id: 'knowledge-collector',
    name: 'Knowledge Collector',
    description: 'Earn all Rookie, Bronze, and Silver badges',
    icon: '🏅',
    rarity: 'diamond',
    quote: 'The only true wisdom is in knowing you know nothing.',
    unlockCondition: 'Earn all Rookie, Bronze, and Silver badges',
    color: 'from-blue-400 to-cyan-500',
    glow: 'shadow-blue-500/50',
    borderColor: 'border-blue-400'
  },
  {
    id: 'mini-game-pro',
    name: 'Mini-Game Pro',
    description: 'Win 20 mini-games',
    icon: '🎮',
    rarity: 'diamond',
    quote: 'Play is the highest form of research.',
    unlockCondition: 'Win 20 mini-games',
    color: 'from-blue-400 to-cyan-500',
    glow: 'shadow-blue-500/50',
    borderColor: 'border-blue-400'
  },

  // 🟣 Legendary Badges (Very rare, tough, limited)
  {
    id: 'quiz-champion',
    name: 'Quiz Champion',
    description: 'Score 100% on 10 quizzes in a row',
    icon: '🏆',
    rarity: 'legendary',
    quote: 'Champions aren\'t made in gyms. Champions are made from something deep inside them.',
    unlockCondition: 'Score 100% on 10 quizzes in a row (perfect streak)',
    color: 'from-purple-600 to-indigo-700',
    glow: 'shadow-purple-500/50',
    borderColor: 'border-purple-500'
  },
  {
    id: 'ultimate-learner',
    name: 'Ultimate Learner',
    description: 'Complete all lessons in ALL subjects for your grade',
    icon: '🌟',
    rarity: 'legendary',
    quote: 'The expert in anything was once a beginner who kept going.',
    unlockCondition: 'Complete all lessons in ALL subjects for your grade',
    color: 'from-purple-600 to-indigo-700',
    glow: 'shadow-purple-500/50',
    borderColor: 'border-purple-500'
  },
  {
    id: 'year-warrior',
    name: 'Year Warrior',
    description: 'Maintain a 365-day streak',
    icon: '🗓️',
    rarity: 'legendary',
    quote: 'A year from now you may wish you had started today.',
    unlockCondition: 'Maintain a 365-day streak (or 300-day flexible)',
    color: 'from-purple-600 to-indigo-700',
    glow: 'shadow-purple-500/50',
    borderColor: 'border-purple-500'
  },
  {
    id: 'knowledge-titan',
    name: 'Knowledge Titan',
    description: 'Collect all Gold & Diamond badges',
    icon: '🏛️',
    rarity: 'legendary',
    quote: 'The mind is not a vessel to be filled, but a fire to be kindled.',
    unlockCondition: 'Collect all Gold & Diamond badges',
    color: 'from-purple-600 to-indigo-700',
    glow: 'shadow-purple-500/50',
    borderColor: 'border-purple-500'
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Finish a timed challenge game with 100% score in record time',
    icon: '⏱️',
    rarity: 'legendary',
    quote: 'Time is what we want most, but what we use worst.',
    unlockCondition: 'Finish a timed challenge game with 100% score in record time',
    color: 'from-purple-600 to-indigo-700',
    glow: 'shadow-purple-500/50',
    borderColor: 'border-purple-500'
  }
];

// Helper function to get badge by ID
export function getBadgeDefinition(id: string): BadgeDefinition | undefined {
  return BADGE_DEFINITIONS.find(badge => badge.id === id);
}

// Helper function to get badges by rarity
export function getBadgesByRarity(rarity: BadgeRarity): BadgeDefinition[] {
  return BADGE_DEFINITIONS.filter(badge => badge.rarity === rarity);
}

// Badge sections for UI display
export const BADGE_SECTIONS = [
  { 
    id: 'legendary', 
    name: 'Legendary', 
    icon: '🟣',
    color: 'from-purple-600 to-indigo-700',
    borderColor: 'border-purple-500'
  },
  { 
    id: 'diamond', 
    name: 'Diamond', 
    icon: '💎',
    color: 'from-blue-400 to-cyan-500',
    borderColor: 'border-blue-400'
  },
  { 
    id: 'gold', 
    name: 'Gold', 
    icon: '🥇',
    color: 'from-yellow-500 to-amber-600',
    borderColor: 'border-yellow-500'
  },
  { 
    id: 'silver', 
    name: 'Silver', 
    icon: '🥈',
    color: 'from-gray-400 to-gray-600',
    borderColor: 'border-gray-500'
  },
  { 
    id: 'bronze', 
    name: 'Bronze', 
    icon: '🥉',
    color: 'from-amber-700 to-amber-900',
    borderColor: 'border-amber-700'
  },
  { 
    id: 'rookie', 
    name: 'Rookie', 
    icon: '🟢',
    color: 'from-green-500 to-emerald-600',
    borderColor: 'border-green-500'
  }
];