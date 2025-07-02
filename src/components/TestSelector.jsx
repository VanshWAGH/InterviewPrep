import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  FileText,
  Briefcase,
  Palette,
  Zap,
  ChevronRight,
  Clock,
  Target,
  Brain
} from 'lucide-react';

const TestSelector = ({ onStartTest }) => {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const domains = [
    { id: 'tech', name: 'Technology', icon: Code, color: 'from-blue-600 to-cyan-600' },
    { id: 'business', name: 'Business', icon: Briefcase, color: 'from-emerald-600 to-teal-600' },
    { id: 'design', name: 'Design', icon: Palette, color: 'from-purple-600 to-pink-600' },
    { id: 'marketing', name: 'Marketing', icon: Zap, color: 'from-amber-600 to-orange-600' }
  ];

  const levels = [
    { id: 'beginner', name: 'Beginner', description: 'Basic concepts and fundamentals' },
    { id: 'intermediate', name: 'Intermediate', description: 'Moderate complexity questions' },
    { id: 'advanced', name: 'Advanced', description: 'Complex problem-solving' },
    { id: 'pro', name: 'Professional', description: 'Expert-level challenges' }
  ];

  const testTypes = [
    {
      id: 'mcq',
      name: 'Multiple Choice',
      icon: FileText,
      description: 'AI-generated MCQ questions',
      duration: '30 min'
    },
    {
      id: 'coding',
      name: 'Coding Challenge',
      icon: Code,
      description: 'LeetCode and GFG problems',
      duration: '60 min'
    },
    {
      id: 'case-study',
      name: 'Case Study',
      icon: Brain,
      description: 'Real-world scenario analysis',
      duration: '45 min'
    }
  ];

  const handleStartTest = () => {
    if (selectedDomain && selectedLevel && selectedType) {
      onStartTest(selectedDomain, selectedLevel, selectedType);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Choose Your Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Select domain, difficulty level, and test type to begin your preparation
          </p>
        </motion.div>

        {/* Domain Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            1. Select Domain
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {domains.map((domain) => (
              <motion.button
                key={domain.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDomain(domain.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedDomain === domain.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${domain.color}`}>
                    <domain.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{domain.name}</h3>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Level Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            2. Select Difficulty Level
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {levels.map((level) => (
              <motion.button
                key={level.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedLevel(level.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedLevel === level.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{level.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{level.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Test Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            3. Select Test Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedType(type.id)}
                className={`p-5 rounded-xl border-2 transition-all duration-200 ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <div className="text-center">
                  <type.icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{type.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{type.description}</p>
                  <div className="flex items-center justify-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {type.duration}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Start Test Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{
              scale: selectedDomain && selectedLevel && selectedType ? 1.05 : 1,
              boxShadow:
                selectedDomain && selectedLevel && selectedType
                  ? '0 4px 14px rgba(0, 118, 255, 0.4)'
                  : 'none'
            }}
            whileTap={{
              scale: selectedDomain && selectedLevel && selectedType ? 0.95 : 1
            }}
            onClick={handleStartTest}
            disabled={!selectedDomain || !selectedLevel || !selectedType}
            className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 mx-auto ${
              !selectedDomain || !selectedLevel || !selectedType
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            <Target className="h-5 w-5" />
            <span>Start Test</span>
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default TestSelector;
