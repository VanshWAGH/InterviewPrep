import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../utils/appwrite';
import { initializeUserProfile } from '../utils/database';
import toast from 'react-hot-toast';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      // First check if we have a session
      await account.getSession('current');
      
      // If session exists, get user details
      const userData = await account.get();
      
      const enrichedUser = {
        id: userData.$id,
        email: userData.email,
        name: userData.name,
        createdAt: userData.$createdAt,
        streak: 0,
        totalScore: 0,
        level: 1,
        badges: [],
        skillScores: []
      };
      
      // Initialize user profile in database
      await initializeUserProfile(enrichedUser);
      
      setUser(enrichedUser);
    } catch (error) {
      // 401 is expected when no user is logged in
      if (error.code !== 401) {
        console.error('Auth error:', error);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to clear any existing sessions
  const clearExistingSessions = async () => {
    try {
      // Try to delete current session if it exists
      await account.deleteSession('current');
    } catch (error) {
      // Session might not exist, which is fine
      if (error.code !== 401) {
        console.log('No existing session to clear');
      }
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Clear any existing sessions first
      await clearExistingSessions();
      
      // Create new session
      await account.createEmailPasswordSession(email, password);
      await checkUser();
      toast.success('Welcome back! 🎉');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      
      let message = 'Login failed. Please check your credentials.';
      if (error.type === 'user_invalid_credentials') {
        message = 'Invalid email or password';
      } else if (error.type === 'user_blocked') {
        message = 'Account temporarily blocked. Try again later.';
      } else if (error.message && error.message.includes('session is active')) {
        // If we still get session active error, try one more time
        try {
          await account.deleteSessions();
          await account.createEmailPasswordSession(email, password);
          await checkUser();
          toast.success('Welcome back! 🎉');
          return true;
        } catch (retryError) {
          message = 'Login failed. Please try again.';
        }
      }
      
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    try {
      // Additional validation
      const commonPasswords = [
        'password', '12345678', 'qwertyui', 'interview', 'genius',
        'password123', 'letmein', 'welcome', 'admin123'
      ];
      
      if (commonPasswords.includes(password.toLowerCase())) {
        throw new Error('Password is too common. Please choose a stronger password.');
      }

      // Clear any existing sessions first
      await clearExistingSessions();

      // Create account
      await account.create('unique()', email, password, name);
      
      // Login after registration
      await account.createEmailPasswordSession(email, password);
      
      const userData = await account.get();
      const enrichedUser = {
        id: userData.$id,
        email: userData.email,
        name: userData.name,
        createdAt: userData.$createdAt,
        streak: 0,
        totalScore: 0,
        level: 1,
        badges: [],
        skillScores: []
      };
      
      await initializeUserProfile(enrichedUser);
      setUser(enrichedUser);
      
      toast.success('Account created successfully! Welcome to InterviewGenius! 🚀');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      
      let message = error.message;
      if (error.type === 'user_already_exists') {
        message = 'An account with this email already exists';
      } else if (error.type === 'invalid_password') {
        message = 'Password must be 8-265 characters and not commonly used';
      } else if (error.type === 'invalid_email') {
        message = 'Please enter a valid email address';
      } else if (error.message && error.message.includes('session is active')) {
        // If we still get session active error, try clearing all sessions
        try {
          await account.deleteSessions();
          await account.createEmailPasswordSession(email, password);
          
          const userData = await account.get();
          const enrichedUser = {
            id: userData.$id,
            email: userData.email,
            name: userData.name,
            createdAt: userData.$createdAt,
            streak: 0,
            totalScore: 0,
            level: 1,
            badges: [],
            skillScores: []
          };
          
          await initializeUserProfile(enrichedUser);
          setUser(enrichedUser);
          
          toast.success('Account created successfully! Welcome to InterviewGenius! 🚀');
          return true;
        } catch (retryError) {
          message = 'Registration failed. Please try again.';
        }
      }
      
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await account.deleteSession('current');
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear the user state
      setUser(null);
      toast.error(error.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading,
      checkUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};