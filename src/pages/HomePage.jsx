import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EnhancedDashboard from '../components/enhanced/EnhancedDashboard';
import TestSelector from '../components/TestSelector';
import FloatingChatbot from '../components/ui/FloatingChatbot';
import TestInterface from '../components/TestInterface'; // Add this import

const HomePage = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentTest, setCurrentTest] = useState(null);

  const handleStartTest = (domain, level, type) => {
    console.log('Starting test:', { domain, level, type });
    setCurrentTest({ domain, level, type });
    setCurrentView('test-interface');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentTest(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      {currentView === 'dashboard' && <EnhancedDashboard />}
      {currentView === 'test-selector' && (
        <TestSelector onStartTest={handleStartTest} />
      )}
      {currentView === 'test-interface' && (
        <TestInterface testConfig={currentTest} onBack={handleBackToDashboard} />
      )}

      {/* Floating Action Button */}
      <button
        onClick={() =>
          setCurrentView(
            currentView === 'dashboard' ? 'test-selector' : 'dashboard'
          )
        }
        className="fixed bottom-20 left-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-full shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 z-40"
      >
        {currentView === 'dashboard' ? '🎯' : '📊'}
      </button>

      <FloatingChatbot />
    </div>
  );
};

export default HomePage;