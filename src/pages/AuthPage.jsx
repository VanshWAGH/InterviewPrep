import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              InterviewGenius
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered interview preparation platform
          </p>
        </motion.div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <LoginForm key="login" onToggleMode={() => setIsLogin(false)} />
            ) : (
              <RegisterForm key="register" onToggleMode={() => setIsLogin(true)} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
