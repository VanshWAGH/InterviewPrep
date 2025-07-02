import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar } from 'lucide-react';

const StreakCounter = ({ streak, maxStreak = 30 }) => {
  const getStreakColor = () => {
    if (streak >= 20) return 'from-red-500 to-orange-500';
    if (streak >= 10) return 'from-orange-500 to-yellow-500';
    if (streak >= 5) return 'from-yellow-500 to-amber-500';
    return 'from-gray-500 to-gray-600';
  };

  const getStreakIntensity = () => {
    if (streak >= 20) return 'animate-pulse';
    if (streak >= 10) return 'animate-bounce';
    return '';
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.6 }}
      className="flex items-center space-x-3 bg-gradient-to-r from-white/10 to-white/5 dark:from-gray-800/10 dark:to-gray-900/5 backdrop-blur-lg rounded-xl p-4 border border-white/20 dark:border-gray-700/20"
    >
      <motion.div
        className={`${getStreakIntensity()}`}
        animate={streak >= 5 ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <div className={`p-3 rounded-full bg-gradient-to-r ${getStreakColor()}`}>
          <Flame className="h-6 w-6 text-white" />
        </div>
      </motion.div>
      
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {streak}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            day{streak !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3" />
          <span>Interview prep streak! 🔥</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StreakCounter;
