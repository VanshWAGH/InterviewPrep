import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const RegisterForm = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    // Password validation
    const passwordErrors = [];
    if (formData.password.length < 8) passwordErrors.push('At least 8 characters');
    if (!/[A-Z]/.test(formData.password)) passwordErrors.push('One uppercase letter');
    if (!/[a-z]/.test(formData.password)) passwordErrors.push('One lowercase letter');
    if (!/[0-9]/.test(formData.password)) passwordErrors.push('One number');
    if (!/[^A-Za-z0-9]/.test(formData.password)) passwordErrors.push('One special character');
    
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.name);
    } catch (error) {
      // Error displayed via toast in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const PasswordRequirement = ({ meets, children }) => (
    <div className={`flex items-center mt-1 text-sm ${meets ? 'text-green-500' : 'text-gray-500'}`}>
      {meets ? <Check className="h-4 w-4 mr-1" /> : <span className="w-4 h-4 mr-1"></span>}
      {children}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Join InterviewGenius and start your preparation journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <div className="mt-1 relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.name}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <div className="mt-1 relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.email}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="mt-1 relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-10 py-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="mt-2">
            <PasswordRequirement meets={formData.password.length >= 8}>
              Minimum 8 characters
            </PasswordRequirement>
            <PasswordRequirement meets={/[A-Z]/.test(formData.password)}>
              One uppercase letter
            </PasswordRequirement>
            <PasswordRequirement meets={/[a-z]/.test(formData.password)}>
              One lowercase letter
            </PasswordRequirement>
            <PasswordRequirement meets={/[0-9]/.test(formData.password)}>
              One number
            </PasswordRequirement>
            <PasswordRequirement meets={/[^A-Za-z0-9]/.test(formData.password)}>
              One special character
            </PasswordRequirement>
          </div>

          {errors.password && (
            <div className="mt-2 flex items-start text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Please fix these password issues:</p>
                <ul className="list-disc list-inside pl-5">
                  {errors.password.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
          ) : 'Create Account'}
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button
            onClick={onToggleMode}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium focus:outline-none"
          >
            Sign in
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterForm;