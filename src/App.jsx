import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AuthPage from './pages/AuthPage';
import EnhancedDashboard from './components/enhanced/EnhancedDashboard';
import ResourcesPage from './pages/Resources';
import TestSelector from './components/TestSelector'; // Import your TestSelector component
import Navbar from './components/Navbar';
import './App.css';

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <AppContent />
    </>
  );
};

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
      
      {/* Dashboard layout route */}
      <Route path="/dashboard" element={<EnhancedDashboard />}>
        {/* Nested routes */}
        <Route index element={<div>Dashboard Home</div>} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="tests" element={<TestSelector />} /> {/* Add TestSelector route */}
        {/* Add more nested routes as needed */}
      </Route>
      
      {/* Redirect any unmatched routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppLayout />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-text)',
              },
            }}
          />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;