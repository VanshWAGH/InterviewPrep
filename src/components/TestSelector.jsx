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
    { id: 'tech', name: 'Technology', icon: Code, color: 'from-blue-500 to-cyan-400' },
    { id: 'business', name: 'Business', icon: Briefcase, color: 'from-emerald-500 to-teal-400' },
    { id: 'design', name: 'Design', icon: Palette, color: 'from-purple-500 to-pink-400' },
    { id: 'marketing', name: 'Marketing', icon: Zap, color: 'from-amber-500 to-orange-400' }
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-lavender-50 dark:from-gray-900 dark:to-gray-800 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Test
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Select a domain, difficulty level, and test type to begin!
          </p>
        </motion.div>

        {/* Domain Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            1. Select Domain
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {domains.map((domain) => (
              <motion.button
                key={domain.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDomain(domain.id)}
                className={`p-5 rounded-2xl border backdrop-blur-md shadow-md transition-all ${
                  selectedDomain === domain.id
                    ? 'border-blue-500 ring-2 ring-blue-100 dark:ring-blue-400/30'
                    : 'border-white/20 dark:border-gray-700 hover:border-blue-300'
                } bg-white/70 dark:bg-gray-900/70`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${domain.color}`}>
                    <domain.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {domain.name}
                  </h3>
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
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            2. Select Difficulty Level
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {levels.map((level) => (
              <motion.button
                key={level.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedLevel(level.id)}
                className={`p-5 rounded-2xl border backdrop-blur-md shadow-md transition-all text-left ${
                  selectedLevel === level.id
                    ? 'border-blue-500 ring-2 ring-blue-100 dark:ring-blue-400/30'
                    : 'border-white/20 dark:border-gray-700 hover:border-blue-300'
                } bg-white/70 dark:bg-gray-900/70`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{level.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{level.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Test Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            3. Select Test Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedType(type.id)}
                className={`p-5 rounded-2xl border backdrop-blur-md shadow-md transition-all text-center ${
                  selectedType === type.id
                    ? 'border-blue-500 ring-2 ring-blue-100 dark:ring-blue-400/30'
                    : 'border-white/20 dark:border-gray-700 hover:border-blue-300'
                } bg-white/70 dark:bg-gray-900/70`}
              >
                <type.icon className="h-6 w-6 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">{type.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{type.description}</p>
                <div className="flex justify-center items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {type.duration}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center pt-6"
        >
          <motion.button
            whileHover={{
              scale: selectedDomain && selectedLevel && selectedType ? 1.05 : 1
            }}
            whileTap={{
              scale: selectedDomain && selectedLevel && selectedType ? 0.95 : 1
            }}
            onClick={handleStartTest}
            disabled={!selectedDomain || !selectedLevel || !selectedType}
            className={`px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 mx-auto transition-all duration-200
              ${
                !selectedDomain || !selectedLevel || !selectedType
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
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
