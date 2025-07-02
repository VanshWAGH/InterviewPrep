import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const generateInterviewQuestions = async (domain, level, count = 5) => {
  const prompt = `Generate ${count} interview questions for ${domain} domain at ${level} level. 
  Return as JSON array with structure: [{"question": "...", "type": "mcq", "options": ["A", "B", "C", "D"], "correctAnswer": "A", "explanation": "..."}]`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    return [];
  }
};

export const generateFeedback = async (questions, userAnswers, domain) => {
  const prompt = `Analyze these interview answers for ${domain} domain:
  Questions: ${JSON.stringify(questions)}
  User Answers: ${JSON.stringify(userAnswers)}
  
  Provide detailed feedback including:
  1. Overall performance analysis
  2. Strengths identified
  3. Areas for improvement
  4. Specific recommendations
  5. Study resources suggestions
  
  Return as structured JSON with these fields.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const generateChatResponse = async (message, context = '') => {
  const prompt = `You are an AI interview coach. User asked: "${message}"
  Context: ${context}
  
  Provide helpful, encouraging advice for interview preparation. Be specific and actionable.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};