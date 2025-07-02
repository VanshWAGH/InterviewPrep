import { Client, Account, Databases, Storage, Query, Permission, Role } from 'appwrite';
import { Import } from 'lucide-react';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs - Updated with your actual IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_USER_PROFILE;
export const COLLECTIONS = {
  USER_PROFILES: import.meta.env.VITE_APPWRITE_COLLECTIONS_USER_PROFILE,
  TEST_RESULTS: import.meta.env.VITE_APPWRITE_COLLECTIONS_TEST_RESULT, // You'll need to create this collection or provide the actual ID
  QUESTIONS: import.meta.env.VITE_APPWRITE_COLLECTIONS_QUESTIONS, // You'll need to create this collection or provide the actual ID
  RESOURCES: import.meta.env.VITE_APPWRITE_COLLECTIONS_RESOURSES, // You'll need to create this collection or provide the actual ID
  CHAT_HISTORY: import.meta.env.VITE_APPWRITE_COLLECTIONS_CHAT_HISTORY // You'll need to create this collection or provide the actual ID
};

// Storage Bucket IDs
export const BUCKETS = {
  USER_AVATARS: 'user-avatars'
};

// Helper functions for database operations
export const createUserProfile = async (userId, profileData) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.USER_PROFILES,
      'unique()',
      {
        user_id: userId,
        domain: profileData.domain || '',
        level: profileData.level || 'beginner',
        streak: 0,
        total_score: 0,
        badges: JSON.stringify([]),
        skill_scores: JSON.stringify({}),
        last_active: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...profileData
      },
      [
        Permission.read(Role.user(userId)),
        Permission.write(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId))
      ]
    );
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER_PROFILES,
      [Query.equal('user_id', userId)]
    );
    return response.documents[0] || null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updates) => {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error('User profile not found');
    }
    
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.USER_PROFILES,
      profile.$id,
      {
        ...updates,
        updated_at: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const saveTestResult = async (userId, testData) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.TEST_RESULTS,
      'unique()',
      {
        user_id: userId,
        test_type: testData.testType,
        domain: testData.domain,
        level: testData.level,
        score: testData.score,
        total_questions: testData.totalQuestions,
        correct_answers: testData.correctAnswers,
        time_spent: testData.timeSpent,
        questions: JSON.stringify(testData.questions),
        user_answers: JSON.stringify(testData.userAnswers),
        ai_feedback: testData.aiFeedback || '',
        percentile_rank: testData.percentileRank || 0,
        completed_at: new Date().toISOString()
      },
      [
        Permission.read(Role.user(userId)),
        Permission.write(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId))
      ]
    );
  } catch (error) {
    console.error('Error saving test result:', error);
    throw error;
  }
};

export const getUserTestResults = async (userId, limit = 50) => {
  try {
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.TEST_RESULTS,
      [
        Query.equal('user_id', userId),
        Query.orderDesc('completed_at'),
        Query.limit(limit)
      ]
    );
  } catch (error) {
    console.error('Error getting test results:', error);
    throw error;
  }
};

export const getQuestions = async (domain, level, type, limit = 10) => {
  try {
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.QUESTIONS,
      [
        Query.equal('domain', domain),
        Query.equal('level', level),
        Query.equal('type', type),
        Query.limit(limit)
      ]
    );
  } catch (error) {
    console.error('Error getting questions:', error);
    throw error;
  }
};

export const getResources = async (domain, difficulty, type) => {
  try {
    const queries = [];
    if (domain) queries.push(Query.equal('domain', domain));
    if (difficulty) queries.push(Query.equal('difficulty', difficulty));
    if (type) queries.push(Query.equal('type', type));
    queries.push(Query.orderDesc('rating'));
    
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.RESOURCES,
      queries
    );
  } catch (error) {
    console.error('Error getting resources:', error);
    throw error;
  }
};

export const saveChatMessage = async (userId, message, response, context) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.CHAT_HISTORY,
      'unique()',
      {
        user_id: userId,
        message,
        response,
        context: context || '',
        sentiment: 'neutral',
        created_at: new Date().toISOString()
      },
      [
        Permission.read(Role.user(userId)),
        Permission.write(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId))
      ]
    );
  } catch (error) {
    console.error('Error saving chat message:', error);
    throw error;
  }
};

export const getLeaderboard = async (limit = 10) => {
  try {
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.USER_PROFILES,
      [
        Query.orderDesc('total_score'),
        Query.limit(limit)
      ]
    );
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    throw error;
  }
};

export { Query, Permission, Role };