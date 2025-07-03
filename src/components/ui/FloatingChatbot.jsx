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

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        emotion: Math.random() > 0.7 ? 'excited' : 'happy'
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
            className="fixed bottom-24 right-6 w-[26rem] h-[30rem] max-w-full bg-gradient-to-br from-sky-50 to-lavender-50 dark:from-gray-800 dark:to-gray-900 
              backdrop-blur-md rounded-2xl border border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] 
              hover:scale-[1.02] hover:shadow-lg hover:ring-2 hover:ring-blue-100 
              transition-all duration-300 ease-in-out z-50"
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
                  <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 tracking-tight">
                    AI Coach
                  </h3>
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
                  <div className={`max-w-xs p-3 rounded-2xl text-sm ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {!message.isUser && (
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs opacity-70">AI Coach</span>
                        <span>{getRobotEmotion(message.emotion)}</span>
                      </div>
                    )}
                    <p>{message.content}</p>
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
                      {[0, 0.2, 0.4].map((d, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: d }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      ))}
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
                  className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                    rounded-xl text-sm text-slate-600 dark:text-slate-200 
                    focus:ring-2 focus:ring-blue-400 focus:outline-none 
                    transition duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl 
                    hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed 
                    transition-all duration-200"
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
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
          rounded-full shadow-xl hover:from-blue-600 hover:to-purple-600 
          transition-all duration-300 ring-1 ring-white/30 backdrop-blur-md z-50"
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
