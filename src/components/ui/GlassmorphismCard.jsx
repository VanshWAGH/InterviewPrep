import React from 'react';
import { motion } from 'framer-motion';

const GlassmorphismCard = ({ 
  children, 
  className = '', 
  hover = true,
  gradient = false 
}) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`
        relative backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 
        border border-white/20 dark:border-gray-700/20 rounded-2xl 
        shadow-xl shadow-black/5 dark:shadow-black/20
        ${gradient ? 'bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-900/5' : ''}
        ${className}
      `}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassmorphismCard;
