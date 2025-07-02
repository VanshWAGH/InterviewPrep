import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedProgressBar = ({
  progress,
  label,
  color = 'from-blue-500 to-purple-500',
  showPercentage = true,
  height = 'h-3'
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 500);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round(progress)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${height} overflow-hidden`}>
        <motion.div
          className={`${height} bg-gradient-to-r ${color} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: `${animatedProgress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-white/30"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedProgressBar;