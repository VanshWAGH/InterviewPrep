import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
  Zap,
  ArrowUpRight
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
import FloatingChatbot from '../ui/FloatingChatbot';

const EnhancedDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
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
  const [activeTab, setActiveTab] = useState('prep-stages');
  const resources = [
    {
      name: "LeetCode",
      description: "Practice coding problems for technical interviews",
      url: "https://leetcode.com",
      type: "website",
      category: "Coding Practice"
    },
    {
      name: "NeetCode",
      description: "YouTube channel with coding interview solutions",
      url: "https://www.youtube.com/c/NeetCode",
      thumbnail: "https://yt3.googleusercontent.com/ytc/APkrFKZe5g5Yy10Npu2SJplXKr77E9XWZQ-b3b3N8p5-=s900-c-k-c0x00ffffff-no-rj",
      type: "youtube",
      category: "Video Tutorials"
    },
    // ... other resources ...
  ];

  // ResourceCard component definition
  const ResourceCard = ({ resource }) => (
    <motion.div 
      whileHover={{ scale: 1.05, y: -5 }}
      className="w-64 h-64 flex-shrink-0 bg-white/80 dark:bg-slate-800/80 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 flex flex-col"
    >
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
        {resource.type === 'website' ? (
          <img 
            src={`https://s2.googleusercontent.com/s2/favicons?domain=${resource.url}`}
            alt={resource.name}
            className="absolute top-4 left-4 h-8 w-8 rounded-full bg-white p-1"
          />
        ) : (
          <img 
            src={resource.thumbnail}
            alt={resource.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">
          {resource.name}
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
          {resource.description}
        </p>
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
        >
          Visit Resource
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );

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

  // Check if we're on the resources page
  const isResourcesPage = location.pathname.includes('/dashboard/resources');

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-lavender-50 to-rose-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Only show dashboard content if we're not on the resources page */}
        {!isResourcesPage && (
          <>
            {/* Hero Section with Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-800 dark:text-slate-100 mb-6">
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
                  className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                />
              </div>
            </motion.div>

            {/* AI Demo Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <div className="backdrop-blur-md bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/20 rounded-3xl p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-blue-100 dark:hover:ring-blue-900">
                <AICommentBubble
                  comment={
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                          rotate: [0, 2, -2, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                        className="inline-block"
                      >
                        🚀 Your interview skills are soaring! 
                      </motion.div>
                      <br />
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        You've improved by <span className="font-bold text-blue-600">23%</span> this week - outperforming <span className="font-bold text-purple-600">82%</span> of peers!
                      </motion.span>
                      <br />
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="block mt-2"
                      >
                        Focus on <span className="font-bold text-pink-600">System Design</span> to reach the next level!
                      </motion.span>
                    </motion.div>
                  }
                  percentile={82}
                  emotion="excited"
                />
              </div>
            </motion.div>

            {/* Progress Section */}
           {/* Progress Section - Replaced with Interview Preparation Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-10"
            >
              <div className="backdrop-blur-md bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/20 rounded-3xl p-0 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-blue-100 dark:hover:ring-blue-900">
                <div className="relative h-100 w-full">
                  <img 
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                    alt="Interview preparation" 
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6">
                    <div>
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-2xl font-bold text-white mb-2"
                      >
                        Master Your Next Interview
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="text-slate-200"
                      >
                        Practice with our AI-powered mock interviews and get real-time feedback
                      </motion.p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="mt-4 bg-white text-slate-900 px-6 py-2 rounded-full font-medium hover:bg-slate-100 transition-colors"
                      >
                        Start Practicing Now
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 gap-8 mb-10"
            >
              <div className="backdrop-blur-md bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/20 rounded-3xl p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-blue-100 dark:hover:ring-blue-900">
                <div className="flex border-b border-slate-200 dark:border-slate-700">
                  <button
                    className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                      activeTab === 'prep-stages'
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                    onClick={() => setActiveTab('prep-stages')}
                  >
                    Preparation Stages
                  </button>
                  <button
                    className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                      activeTab === 'interview-guide'
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                    onClick={() => setActiveTab('interview-guide')}
                  >
                    Interview Guide
                  </button>
                </div>

                <div className="mt-6">
                  {activeTab === 'prep-stages' && (
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-4">
                          <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Foundation Building</h4>
                          <p className="text-slate-600 dark:text-slate-400 mt-1">
                            Master core concepts and fundamentals (2-4 weeks)
                          </p>
                          <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-center">
                              <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Study data structures & algorithms
                            </li>
                            <li className="flex items-center">
                              <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Practice coding problems (Easy-Medium)
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-4">
                          <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Skill Enhancement</h4>
                          <p className="text-slate-600 dark:text-slate-400 mt-1">
                            Strengthen problem-solving abilities (3-5 weeks)
                          </p>
                          <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-center">
                              <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Solve advanced coding challenges
                            </li>
                            <li className="flex items-center">
                              <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Learn system design fundamentals
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mr-4">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Mock Interviews</h4>
                          <p className="text-slate-600 dark:text-slate-400 mt-1">
                            Simulate real interview conditions (2-3 weeks)
                          </p>
                          <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-center">
                              <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Complete timed coding sessions
                            </li>
                            <li className="flex items-center">
                              <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Practice behavioral questions (STAR method)
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'interview-guide' && (
                    <div className="space-y-6">
                      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center">
                          <svg className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Before the Interview
                        </h4>
                        <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Research the company and role thoroughly
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Review your resume and prepare stories
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            Prepare questions to ask the interviewer
                          </li>
                        </ul>
                      </div>

                      <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center">
                          <svg className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          During the Interview
                        </h4>
                        <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            Think aloud while solving problems
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            Clarify requirements before coding
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            Maintain good body language and eye contact
                          </li>
                        </ul>
                      </div>

                      <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center">
                          <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          After the Interview
                        </h4>
                        <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                          <li className="flex items-start">
                            <span className="text-emerald-500 mr-2">•</span>
                            Send a thank-you email within 24 hours
                          </li>
                          <li className="flex items-start">
                            <span className="text-emerald-500 mr-2">•</span>
                            Reflect on what went well and what didn't
                          </li>
                          <li className="flex items-start">
                            <span className="text-emerald-500 mr-2">•</span>
                            Follow up if you don't hear back in a week
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Badges and Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  >
    <div className="backdrop-blur-md bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/20 rounded-3xl p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-blue-100 dark:hover:ring-blue-900">
      <h3 className="text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100 mb-6">
        Essential Resources 🚀
      </h3>
      
      <div className="relative">
        {/* Auto-scrolling horizontal carousel */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            animate={{
              x: [0, -1000],
              transition: {
                duration: 60,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }
            }}
            className="absolute top-0 left-0 flex space-x-6"
          >
            {resources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </motion.div>
        </div>
        
        {/* Pause on hover */}
        <div className="absolute inset-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded-xl" />
      </div>
    </div>
  </motion.div>

  {/* Leaderboard remains the same */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9 }}
  >
    <div className="backdrop-blur-md bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/20 rounded-3xl p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-indigo-100 dark:hover:ring-indigo-900">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl">
          <Users className="h-5 w-5 text-indigo-600" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100">
          Weekly Leaderboard
        </h3>
      </div>
      <Leaderboard entries={leaderboard} currentUserId={user?.id} />
    </div>
  </motion.div>
            </div>

            {/* Quick Actions with Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-2xl flex items-center space-x-4 hover:shadow-2xl transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="group-hover:animate-pulse"
                >
                  <Play className="h-6 w-6" />
                </motion.div>
                <span className="font-semibold tracking-tight">Start Test</span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatOpen(true)}
                className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-2xl flex items-center space-x-4 hover:shadow-2xl transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-emerald-300"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Brain className="h-6 w-6" />
                </motion.div>
                <span className="font-semibold tracking-tight">AI Coach</span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => navigate('/dashboard/resources')}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-2xl flex items-center space-x-4 hover:shadow-2xl transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-amber-300"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <BookOpen className="h-6 w-6" />
                </motion.div>
                <span className="font-semibold tracking-tight">Resources</span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl flex items-center space-x-4 hover:shadow-2xl transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MessageCircle className="h-6 w-6" />
                </motion.div>
                <span className="font-semibold tracking-tight">Chat Bot</span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.button>
            </motion.div>

            {/* Improvement Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <div className="backdrop-blur-md bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/20 rounded-3xl p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-yellow-100 dark:hover:ring-yellow-900">
                <h3 className="text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100 mb-6">
                  AI-Powered Improvement Tips 💡
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stats.improvementTips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="flex items-start space-x-4 p-6 backdrop-blur-sm bg-white/30 dark:bg-slate-700/30 border border-white/20 dark:border-slate-600/20 rounded-2xl hover:scale-[1.02] transition-all duration-300"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        className="p-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl"
                      >
                        <Zap className="h-5 w-5 text-yellow-600" />
                      </motion.div>
                      <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{tip}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Footer Section */}
            <motion.footer 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-20 pt-12 pb-8 border-t border-slate-200 dark:border-slate-800"
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Company Info */}
                  <div className="space-y-4">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2"
                    >
                      <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        InterviewPrep
                      </span>
                    </motion.div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Empowering candidates with AI-powered interview preparation tools to land their dream jobs.
                    </p>
                    <div className="flex space-x-4">
                      <motion.a 
                        whileHover={{ y: -2 }}
                        href="#" 
                        className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </motion.a>
                      <motion.a 
                        whileHover={{ y: -2 }}
                        href="#" 
                        className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </motion.a>
                      <motion.a 
                        whileHover={{ y: -2 }}
                        href="#" 
                        className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
                      Quick Links
                    </h3>
                    <ul className="space-y-3">
                      <motion.li whileHover={{ x: 5 }}>
                        <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors text-sm">
                          Home
                        </a>
                      </motion.li>
                      <motion.li whileHover={{ x: 5 }}>
                        <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors text-sm">
                          Practice Tests
                        </a>
                      </motion.li>
                      <motion.li whileHover={{ x: 5 }}>
                        <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors text-sm">
                          Resources
                        </a>
                      </motion.li>
                      <motion.li whileHover={{ x: 5 }}>
                        <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors text-sm">
                          Pricing
                        </a>
                      </motion.li>
                    </ul>
                  </div>

                  {/* Resources */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
                      Resources
                    </h3>
                    <ul className="space-y-3">
                      <motion.li whileHover={{ x: 5 }}>
                        <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors text-sm">
                          Blog
                        </a>
                      </motion.li>
                      <motion.li whileHover={{ x: 5 }}>
                        <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors text-sm">
                          Interview Tips
                        </a>
                      </motion.li>
                      <motion.li whileHover={{ x: 5 }}>
                        <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors text-sm">
                          Success Stories
                        </a>
                      </motion.li>
                      <motion.li whileHover={{ x: 5 }}>
                        <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors text-sm">
                          FAQ
                        </a>
                      </motion.li>
                    </ul>
                  </div>

                  {/* Newsletter */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
                      Stay Updated
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      Subscribe to our newsletter for the latest interview tips and resources.
                    </p>
                    <div className="flex">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="px-4 py-2 rounded-l-lg border border-r-0 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full bg-white dark:bg-slate-800"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors"
                      >
                        Subscribe
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    © {new Date().getFullYear()} InterviewPrep. All rights reserved.
                  </p>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm transition-colors">
                      Privacy Policy
                    </a>
                    <a href="#" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm transition-colors">
                      Terms of Service
                    </a>
                    <a href="#" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm transition-colors">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </motion.footer>
          </>
        )}

        {/* This is where the nested routes will render */}
        <Outlet />

        {/* Floating Chatbot */}
        {isChatOpen && <FloatingChatbot onClose={() => setIsChatOpen(false)} />}
      </div>
    </div>
  );
};

export default EnhancedDashboard;