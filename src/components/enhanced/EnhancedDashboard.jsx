import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Brain,
  Target,
  TrendingUp,
  Award,
  Clock,
  BookOpen,
  MessageCircle,
  Play,
  Users,
  Zap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import GlassmorphismCard from '../ui/GlassmorphismCard';
import AnimatedProgressBar from '../ui/AnimatedProgressBar';
import SkillRadarChart from '../ui/SkillRadarChart';
import AICommentBubble from '../ui/AICommentBubble';
import StreakCounter from '../ui/StreakCounter';
import BadgeCollection from '../ui/BadgeCollection';
import Leaderboard from '../ui/Leaderboard';
import TypewriterEffect from '../ui/TypewriterEffect';

const EnhancedDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTests: 0,
    averageScore: 0,
    strongAreas: [],
    weakAreas: [],
    improvementTips: [],
    weeklyProgress: [],
    skillRadar: [],
    progressPercentage: 0
  });

  const [leaderboard, setLeaderboard] = useState([]);

  // Mock data for demonstration
  useEffect(() => {
    setStats({
      totalTests: 24,
      averageScore: 78,
      strongAreas: ['Problem Solving', 'Technical Knowledge', 'Communication'],
      weakAreas: ['System Design', 'Behavioral Questions'],
      improvementTips: [
        'Practice more system design questions',
        'Work on STAR method for behavioral questions',
        'Review database optimization concepts'
      ],
      weeklyProgress: [
        { week: 'Week 1', score: 65 },
        { week: 'Week 2', score: 72 },
        { week: 'Week 3', score: 78 },
        { week: 'Week 4', score: 82 }
      ],
      skillRadar: [
        { skill: 'Technical', score: 85 },
        { skill: 'Behavioral', score: 65 },
        { skill: 'System Design', score: 55 },
        { skill: 'Communication', score: 90 },
        { skill: 'Problem Solving', score: 88 },
        { skill: 'Leadership', score: 70 }
      ],
      progressPercentage: 78
    });

    setLeaderboard([
      { id: '1', name: 'Alex Chen', score: 2450, streak: 15, rank: 1 },
      { id: '2', name: 'Sarah Johnson', score: 2380, streak: 12, rank: 2 },
      { id: '3', name: 'Mike Rodriguez', score: 2290, streak: 8, rank: 3 },
      { id: user?.id || '4', name: user?.name || 'You', score: 2150, streak: 5, rank: 4 },
      { id: '5', name: 'Emma Wilson', score: 2100, streak: 7, rank: 5 }
    ]);
  }, [user]);

  const mockBadges = [
    { id: '1', name: 'Python Pro', description: 'Completed 50 Python questions', icon: 'brain', color: 'from-blue-500 to-blue-700', unlockedAt: '2024-01-15' },
    { id: '2', name: 'Case Study Master', description: 'Aced 10 case studies', icon: 'trophy', color: 'from-purple-500 to-purple-700', unlockedAt: '2024-01-20' },
    { id: '3', name: 'Speed Demon', description: 'Completed test in record time', icon: 'zap', color: 'from-yellow-500 to-orange-500', unlockedAt: '2024-01-25' },
    { id: '4', name: 'Streak Warrior', description: '7-day practice streak', icon: 'target', color: 'from-red-500 to-pink-500', unlockedAt: '2024-01-30' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome back, {user?.name}! 👋
          </h1>
          <div className="text-xl md:text-2xl font-medium">
            <TypewriterEffect
              strings={[
                "Ace your next interview in AI-powered style! 🚀",
                "Master technical interviews with confidence! 💪",
                "Level up your interview skills today! ⭐",
                "Practice makes perfect - let's begin! 🎯"
              ]}
              className="text-2xl font-bold"
            />
          </div>
        </motion.div>

        {/* AI Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <GlassmorphismCard gradient className="p-6">
            <AICommentBubble
              comment="Your performance has improved by 23% this week! Keep up the excellent work and focus on system design for even better results."
              percentile={82}
              emotion="excited"
            />
          </GlassmorphismCard>
        </motion.div>

        {/* Stats Cards with Enhanced Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassmorphismCard className="p-6" gradient>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tests</p>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                  >
                    {stats.totalTests}
                  </motion.p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Target className="h-10 w-10 text-blue-600" />
                </motion.div>
              </div>
            </GlassmorphismCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassmorphismCard className="p-6" gradient>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                  >
                    {stats.averageScore}%
                  </motion.p>
                </div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="h-10 w-10 text-emerald-600" />
                </motion.div>
              </div>
            </GlassmorphismCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassmorphismCard className="p-6" gradient>
              <StreakCounter streak={5} />
            </GlassmorphismCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassmorphismCard className="p-6" gradient>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Spent</p>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                  >
                    42h
                  </motion.p>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="h-10 w-10 text-purple-600" />
                </motion.div>
              </div>
            </GlassmorphismCard>
          </motion.div>
        </div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <GlassmorphismCard className="p-6" gradient>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Overall Progress
            </h3>
            <AnimatedProgressBar
              progress={stats.progressPercentage}
              label="Interview Readiness"
              color="from-blue-500 via-purple-500 to-pink-500"
              height="h-4"
            />
          </GlassmorphismCard>
        </motion.div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassmorphismCard className="p-6" gradient>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Skill Assessment Radar
              </h3>
              <SkillRadarChart data={stats.skillRadar} />
            </GlassmorphismCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <GlassmorphismCard className="p-6" gradient>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Weekly Progress
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="week" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="url(#gradient)" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </GlassmorphismCard>
          </motion.div>
        </div>

        {/* Badges and Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <GlassmorphismCard className="p-6" gradient>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Achievements 🏆
              </h3>
              <BadgeCollection badges={mockBadges} />
            </GlassmorphismCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <GlassmorphismCard className="p-6" gradient>
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Weekly Leaderboard
                </h3>
              </div>
              <Leaderboard entries={leaderboard} currentUserId={user?.id} />
            </GlassmorphismCard>
          </motion.div>
        </div>

        {/* Quick Actions with Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl flex items-center space-x-3 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 group"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="group-hover:animate-spin"
            >
              <Play className="h-6 w-6" />
            </motion.div>
            <span className="font-medium">Start Test</span>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-2xl flex items-center space-x-3 hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 group"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Brain className="h-6 w-6" />
            </motion.div>
            <span className="font-medium">AI Coach</span>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-2xl flex items-center space-x-3 hover:from-amber-700 hover:to-orange-700 transition-all duration-200 group"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BookOpen className="h-6 w-6" />
            </motion.div>
            <span className="font-medium">Resources</span>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl flex items-center space-x-3 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 group"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
            <span className="font-medium">Chat Bot</span>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.button>
        </motion.div>

        {/* Improvement Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <GlassmorphismCard className="p-6" gradient>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              AI-Powered Improvement Tips 💡
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.improvementTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-white/20 dark:bg-gray-800/20 rounded-xl"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
                  </motion.div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{tip}</span>
                </motion.div>
              ))}
            </div>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;