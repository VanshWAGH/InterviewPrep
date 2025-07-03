import React from 'react';
import { motion } from 'framer-motion';
import { User, Moon, Sun, LogOut, Brain } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-indigo-600 dark:bg-indigo-700">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
              InterviewGenius
            </span>
          </div>

          {/* Controls: Theme + Auth */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* User Auth Info */}
            {user && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                    <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  aria-label="Log Out"
                  className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  <LogOut className="h-5 w-5 text-red-600 dark:text-red-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;