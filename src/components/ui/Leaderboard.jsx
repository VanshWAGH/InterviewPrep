import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Flame } from 'lucide-react';

const Leaderboard = ({ entries, currentUserId }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-amber-400 to-amber-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`
            flex items-center space-x-4 p-4 rounded-xl backdrop-blur-lg border
            ${entry.id === currentUserId 
              ? 'bg-blue-500/20 border-blue-500/30 ring-2 ring-blue-500/50' 
              : 'bg-white/10 dark:bg-gray-800/10 border-white/20 dark:border-gray-700/20'
            }
          `}
        >
          <div className={`p-2 rounded-full bg-gradient-to-r ${getRankColor(entry.rank)}`}>
            {getRankIcon(entry.rank)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                {entry.name}
              </span>
              {entry.id === currentUserId && (
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">You</span>
              )}
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
              <span>{entry.score} points</span>
              {entry.streak > 0 && (
                <div className="flex items-center space-x-1">
                  <Flame className="h-3 w-3 text-orange-500" />
                  <span>{entry.streak} streak</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Leaderboard;
