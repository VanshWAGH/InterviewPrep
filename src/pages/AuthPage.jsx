import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Play, Sparkles } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      
      {/* Left Side: Decorative Illustration */}
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/40 via-pink-100/30 to-transparent dark:from-gray-800/70 dark:via-gray-700/50 dark:to-transparent z-10" />
        <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-pink-200/30 blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 p-8"
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Interview Illustration"
            className="max-w-[90%] h-auto object-contain rounded-xl shadow-2xl border-4 border-white/50"
          />
          <motion.div 
            className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-purple-100"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles className="h-8 w-8 text-purple-500" />
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 md:py-0">
        <div className="max-w-md w-full space-y-8">

          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Brain className="h-12 w-12 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-300">
                InterviewGenius
              </span>
            </div>
            <p className="text-purple-600/80 dark:text-purple-300/80 font-medium">
              Elevate your interview skills with AI
            </p>
          </motion.div>

          {/* Auth Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/95 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-8 border border-purple-100/50 dark:border-gray-700 shadow-xl"
          >
            <AnimatePresence mode="wait">
              {isLogin ? (
                <LoginForm key="login" onToggleMode={() => setIsLogin(false)} />
              ) : (
                <RegisterForm key="register" onToggleMode={() => setIsLogin(true)} />
              )}
            </AnimatePresence>
          </motion.div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 gap-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 text-white p-4 rounded-xl flex items-center justify-center space-x-3 hover:shadow-lg transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-purple-300/50"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="group-hover:animate-pulse"
              >
                <Play className="h-5 w-5" />
              </motion.div>
              <span className="font-semibold tracking-tight">Start Practicing Now</span>
              <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </motion.button>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-8 right-8 hidden md:block">
            <div className="w-16 h-16 rounded-full bg-purple-300/20 absolute -bottom-4 -right-4"></div>
            <div className="w-8 h-8 rounded-full bg-pink-300/30 absolute -top-4 -left-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;