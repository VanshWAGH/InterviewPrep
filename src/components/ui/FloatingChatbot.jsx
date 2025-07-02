import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: "Hi! I'm your AI interview coach. Ask me anything about interview preparation! 🚀",
      isUser: false,
      timestamp: new Date().toISOString(),
      emotion: 'happy'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize Gemini with the correct model
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY");
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash", // Updated to current recommended model
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Generate response from Gemini with improved prompt
      const result = await model.generateContent({
        contents: [{
          parts: [{
            text: `You are an expert AI interview coach specializing in technical and behavioral interviews. 
            Provide concise, actionable advice (under 100 words) for this question: ${inputValue}
            
            Format your response clearly with:
            - Key points first
            - Specific examples if relevant
            - Avoid generic advice`
          }]
        }]
      });
      
      const response = await result.response;
      const text = response.text();

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: text,
        isUser: false,
        timestamp: new Date().toISOString(),
        emotion: Math.random() > 0.7 ? 'excited' : 'happy' // Randomize emotion
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later!",
        isUser: false,
        timestamp: new Date().toISOString(),
        emotion: 'thinking'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const getRobotEmotion = (emotion) => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'excited': return '🎉';
      case 'thinking': return '🤔';
      default: return '🤖';
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-2xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                >
                  <Bot className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">AI Coach</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Always here to help!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 h-64">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}>
                    {!message.isUser && (
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs opacity-70">AI Coach</span>
                        <span>{getRobotEmotion(message.emotion)}</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 z-50"
      >
        <motion.div
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.div>
        
        {/* Notification dot */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          />
        )}
      </motion.button>
    </>
  );
};

export default FloatingChatbot;