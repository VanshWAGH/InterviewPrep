import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

const AICommentBubble = ({ 
  comment, 
  percentile, 
  emotion = 'neutral' 
}) => {
  const getEmotionColor = () => {
    switch (emotion) {
      case 'happy': return 'from-green-500 to-emerald-500';
      case 'excited': return 'from-purple-500 to-pink-500';
      case 'thinking': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getEmoji = () => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'excited': return '🎉';
      case 'thinking': return '🤔';
      default: return '🤖';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative max-w-md mx-auto"
    >
      <div className="bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-900/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-xl">
        <div className="flex items-start space-x-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`p-2 rounded-full bg-gradient-to-r ${getEmotionColor()}`}
          >
            <Bot className="h-5 w-5 text-white" />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                AI Genius
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="h-4 w-4 text-yellow-500" />
              </motion.div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {comment} {getEmoji()}
            </p>
            {percentile && (
              <div className="mt-3 flex items-center space-x-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Better than {percentile}% of peers! 🎯
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Speech bubble tail */}
      <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white/90 dark:bg-gray-800/90 transform rotate-45 border-r border-b border-white/20 dark:border-gray-700/20"></div>
    </motion.div>
  );
};

export default AICommentBubble;
