import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GlassmorphismCard = ({
  children,
  className = '',
  hover = true,
  gradient = false
}) => {
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);

  const fetchTip = async () => {
    // Skip if we know API isn't available
    if (!apiAvailable) return;

    setLoading(true);
    try {
      // Check for API key
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error('API key not configured');
      }

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent({
        contents: [{
          parts: [{
            text: `Give me a short and actionable tip for interview preparation. 
                  Be concise (under 50 words), specific, and avoid generic advice.`
          }]
        }]
      });

      const response = await result.response;
      setTip(response.text().trim());
    } catch (err) {
      console.error('Gemini fetch error:', err);
      setApiAvailable(false);
      setTip("Practice explaining your projects clearly and concisely");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`
        relative backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 
        border border-white/20 dark:border-gray-700/20 rounded-2xl 
        shadow-xl shadow-black/5 dark:shadow-black/20
        ${gradient ? 'bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/20 dark:to-gray-900/5' : ''}
        ${className}
      `}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl" />
      )}
      <div className="relative z-10 p-4 space-y-3">
        <div className="text-sm text-gray-800 dark:text-white font-medium">
          {children}
        </div>

        <div className="text-xs text-gray-700 dark:text-gray-300 italic">
          {loading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Fetching a tip...</span>
            </div>
          ) : (
            tip && <span>💡 {tip}</span>
          )}
        </div>

        {apiAvailable && (
          <button
            onClick={fetchTip}
            className="text-xs px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Another Tip'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default GlassmorphismCard;