import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

const TestInterface = ({ testConfig, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false); // Added missing state
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyDgR0di6cVA-MIDBn1SoRVGg7id7s4yaw8");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const getFallbackQuestions = (config) => {
    return [
      {
        question_text: `Sample ${config.domain} question (${config.level} level)`,
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correct_answer: "Option 1",
        explanation: "This is a sample explanation for the fallback question."
      },
      {
        question_text: `Another ${config.domain} question`,
        options: ["Choice A", "Choice B", "Choice C", "Choice D"],
        correct_answer: "Choice B",
        explanation: "This is another sample explanation."
      }
    ];
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const prompt = {
          contents: [{
            parts: [{
              text: `Generate 10 ${testConfig.level} level multiple choice questions about ${testConfig.domain}. 
              Return a valid JSON array with question_text, options, correct_answer, and explanation.`
            }]
          }]
        };

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        try {
          const jsonString = text.replace(/```json|```/g, '').trim();
          const generatedQuestions = JSON.parse(jsonString);
          
          if (generatedQuestions?.length > 0) {
            setQuestions(generatedQuestions);
            return;
          }
        } catch (parseError) {
          console.error("Error parsing questions:", parseError);
          throw new Error("Failed to parse questions");
        }
        
        setQuestions(getFallbackQuestions(testConfig));
        setError("Using sample questions");
        
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions(getFallbackQuestions(testConfig));
        setError("Failed to generate questions. Using sample questions.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [testConfig]);

  const handleAnswerSelect = (answer) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newUserAnswers);
    setSelectedAnswer(answer);
    
    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      }, 1000);
    } else {
      completeTest(newUserAnswers, isCorrect);
    }
  };

  const completeTest = async (allAnswers, lastAnswerCorrect) => {
    try {
      const finalScore = score + (lastAnswerCorrect ? 1 : 0);
      const testData = {
        test_type: testConfig.type,
        domain: testConfig.domain,
        level: testConfig.level,
        score: finalScore,
        total_questions: questions.length,
        correct_answers: finalScore,
        questions: JSON.stringify(questions),
        user_answers: JSON.stringify(allAnswers),
      };

      // Here you would call your submitTestResult function
      // await submitTestResult('user_id', testData);
      
      setTestCompleted(true);
    } catch (error) {
      console.error("Error saving test results:", error);
      setError("Test completed but results couldn't be saved");
      setTestCompleted(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Generating questions...</p>
        </div>
      </div>
    );
  }

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Test Completed!</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Score: {score}/{questions.length}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Percentage: {Math.round((score / questions.length) * 100)}%
          </p>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      {error && (
        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-3 rounded-lg mb-4 max-w-4xl mx-auto">
          {error}
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-4"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Domain: {testConfig.domain} | Level: {testConfig.level}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {questions[currentQuestionIndex]?.question_text}
            </h2>
            
            <div className="space-y-3">
              {questions[currentQuestionIndex]?.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedAnswer === option
                      ? option === questions[currentQuestionIndex].correct_answer
                        ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-600'
                        : 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-600'
                      : 'border-gray-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {selectedAnswer && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Explanation:</h3>
              <p className="text-gray-700 dark:text-gray-300">
                {questions[currentQuestionIndex]?.explanation}
              </p>
            </div>
          )}
        </motion.div>

        <button
          onClick={onBack}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TestInterface;