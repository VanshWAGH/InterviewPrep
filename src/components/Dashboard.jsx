const React = require('react');
const { useState, useEffect } = require('react');
const { motion } = require('framer-motion');
const {
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
} = require('recharts');
const {
  Brain,
  Target,
  TrendingUp,
  Award,
  Clock,
  BookOpen,
  MessageCircle,
  Play
} = require('lucide-react');
const useAuth = require('../contexts/AuthContext').useAuth;

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTests: 0,
    averageScore: 0,
    strongAreas: [],
    weakAreas: [],
    improvementTips: [],
    weeklyProgress: []
  });

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
      ]
    });
  }, []);

  const skillsData = [
    { name: 'Technical', score: 85, color: '#3B82F6' },
    { name: 'Behavioral', score: 65, color: '#10B981' },
    { name: 'System Design', score: 55, color: '#F59E0B' },
    { name: 'Communication', score: 90, color: '#8B5CF6' }
  ];

  const testTypeData = [
    { name: 'MCQ', value: 40, color: '#3B82F6' },
    { name: 'Coding', value: 35, color: '#10B981' },
    { name: 'Case Study', value: 25, color: '#F59E0B' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ready to continue your interview preparation journey?
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tests</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTests}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageScore}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Strong Areas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.strongAreas.length}</p>
              </div>
              <Award className="h-8 w-8 text-amber-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Spent</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">42h</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Weekly Progress
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Skill Assessment
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl flex items-center space-x-3 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <Play className="h-6 w-6" />
            <span className="font-medium">Start Test</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-xl flex items-center space-x-3 hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
          >
            <Brain className="h-6 w-6" />
            <span className="font-medium">AI Coach</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-xl flex items-center space-x-3 hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
          >
            <BookOpen className="h-6 w-6" />
            <span className="font-medium">Resources</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl flex items-center space-x-3 hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="font-medium">Chat Bot</span>
          </motion.button>
        </motion.div>

        {/* Recent Activity & Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Strong Areas
            </h3>
            <div className="space-y-2">
              {stats.strongAreas.map((area, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">{area}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Improvement Tips
            </h3>
            <div className="space-y-3">
              {stats.improvementTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;