import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import './App.css';


console.log('Environment Variables:', {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_DATABASE_ID,
  appName: import.meta.env.VITE_APP_NAME
});

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? <HomePage /> : <AuthPage />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
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
