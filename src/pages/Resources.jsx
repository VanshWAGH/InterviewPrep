import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, BookOpen, Code, FileText, Link } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ResourcesPage = () => {
  const [resources, setResources] = useState({
    leetcode: [],
    gfg: [],
    articles: [],
    loading: true,
    error: null
  });

  const fetchResources = async () => {
    try {
      // Check for API key
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error('API key not configured');
      }

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Fetch LeetCode questions
      const leetcodePrompt = `Provide 5 important LeetCode questions for technical interviews with their difficulty levels.
        Format as: "1. [Question Name] (Difficulty) - [Brief Description]"
        Keep it concise and focus on commonly asked questions.`;

      const leetcodeResult = await model.generateContent({ contents: [{ parts: [{ text: leetcodePrompt }] }] });
      const leetcodeResponse = await leetcodeResult.response;
      const leetcodeText = leetcodeResponse.text();

      // Fetch GFG questions
      const gfgPrompt = `Provide 5 important GeeksForGeeks problems for technical interviews with their difficulty levels.
        Format as: "1. [Problem Name] (Difficulty) - [Brief Description]"
        Focus on data structures and algorithms.`;

      const gfgResult = await model.generateContent({ contents: [{ parts: [{ text: gfgPrompt }] }] });
      const gfgResponse = await gfgResult.response;
      const gfgText = gfgResponse.text();

      // Fetch articles
      const articlesPrompt = `Suggest 3 high-quality articles about technical interview preparation with their URLs.
        Format as: "1. [Article Title] - [Brief Summary] (URL: [link])"
        Focus on practical advice and recent content.`;

      const articlesResult = await model.generateContent({ contents: [{ parts: [{ text: articlesPrompt }] }] });
      const articlesResponse = await articlesResult.response;
      const articlesText = articlesResponse.text();

      setResources({
        leetcode: formatResponse(leetcodeText),
        gfg: formatResponse(gfgText),
        articles: formatResponse(articlesText),
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      setResources({
        leetcode: getFallbackLeetCode(),
        gfg: getFallbackGFG(),
        articles: getFallbackArticles(),
        loading: false,
        error: error.message.includes('quota') ? 
          'API quota exceeded. Showing fallback resources.' : 
          'Failed to fetch resources. Showing fallback content.'
      });
    }
  };

  const formatResponse = (text) => {
    return text.split('\n').filter(line => line.trim().length > 0);
  };

  // Fallback content
  const getFallbackLeetCode = () => [
    "1. Two Sum (Easy) - Find two numbers that add up to target",
    "2. Reverse Linked List (Easy) - Classic linked list problem",
    "3. Merge Intervals (Medium) - Important for array manipulation",
    "4. Valid Parentheses (Easy) - Stack implementation",
    "5. Maximum Subarray (Medium) - Kadane's algorithm"
  ];

  const getFallbackGFG = () => [
    "1. Detect Cycle in a Graph (Medium) - Graph traversal",
    "2. N-Queens Problem (Hard) - Backtracking classic",
    "3. Dijkstra's Algorithm (Hard) - Shortest path in graphs",
    "4. LRU Cache (Medium) - Design + data structures",
    "5. Rotate Matrix (Medium) - 2D array manipulation"
  ];

  const getFallbackArticles = () => [
    "1. The Ultimate Guide to Technical Interviews - Covers all aspects (URL: https://example.com/tech-interview-guide)",
    "2. System Design Primer - GitHub repo with resources (URL: https://github.com/donnemartin/system-design-primer)",
    "3. Behavioral Interview Questions - How to answer (URL: https://example.com/behavioral-questions)"
  ];

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Interview Resources
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Curated collection of resources to help you prepare
          </p>
        </motion.div>

        {resources.error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-800 dark:text-yellow-200"
          >
            ⚠️ {resources.error}
          </motion.div>
        )}

        {resources.loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* LeetCode Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Code className="h-6 w-6 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">LeetCode</h2>
              </div>
              <ul className="space-y-2">
                {resources.leetcode.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* GFG Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Code className="h-6 w-6 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">GeeksForGeeks</h2>
              </div>
              <ul className="space-y-2">
                {resources.gfg.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Articles Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-6 w-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Articles</h2>
              </div>
              <ul className="space-y-2">
                {resources.articles.map((item, index) => {
                  const urlMatch = item.match(/\(URL: (https?:\/\/[^)]+)\)/);
                  const url = urlMatch ? urlMatch[1] : null;
                  const text = url ? item.replace(/\(URL: [^)]+\)/, '') : item;
                  
                  return (
                    <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">
                      {text}
                      {url && (
                        <a 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                        >
                          <Link className="inline h-3 w-3" />
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;