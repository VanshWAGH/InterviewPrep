import { 
  createUserProfile, 
  getUserProfile, 
  updateUserProfile,
  saveTestResult,
  getUserTestResults,
  getQuestions,
  getResources,
  saveChatMessage,
  getLeaderboard
} from './appwrite.js';

// User Profile Management
export const initializeUserProfile = async (user) => {
  try {
    let profile = await getUserProfile(user.id);
    
    if (!profile) {
      profile = await createUserProfile(user.id, {
        domain: '',
        level: 'beginner'
      });
    }
    
    return profile;
  } catch (error) {
    console.error('Error initializing user profile:', error);
    throw error;
  }
};

export const updateUserStreak = async (userId) => {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) return;

    const lastActive = new Date(profile.last_active);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    let newStreak = profile.streak;
    
    if (daysDiff === 1) {
      // Consecutive day - increment streak
      newStreak = profile.streak + 1;
    } else if (daysDiff > 1) {
      // Missed days - reset streak
      newStreak = 1;
    }
    // If daysDiff === 0, same day - keep current streak

    await updateUserProfile(userId, {
      streak: newStreak,
      last_active: today.toISOString()
    });

    return newStreak;
  } catch (error) {
    console.error('Error updating user streak:', error);
    throw error;
  }
};

export const updateUserScore = async (userId, scoreToAdd) => {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) return;

    const newTotalScore = profile.total_score + scoreToAdd;
    
    await updateUserProfile(userId, {
      total_score: newTotalScore
    });

    return newTotalScore;
  } catch (error) {
    console.error('Error updating user score:', error);
    throw error;
  }
};

export const awardBadge = async (userId, badgeId) => {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) return;

    const currentBadges = JSON.parse(profile.badges || '[]');
    
    if (!currentBadges.includes(badgeId)) {
      currentBadges.push(badgeId);
      
      await updateUserProfile(userId, {
        badges: JSON.stringify(currentBadges)
      });
    }

    return currentBadges;
  } catch (error) {
    console.error('Error awarding badge:', error);
    throw error;
  }
};

// Test Management
export const submitTestResult = async (userId, testData) => {
  try {
    // Save test result
    const result = await saveTestResult(userId, testData);
    
    // Update user score
    await updateUserScore(userId, testData.score);
    
    // Update streak
    await updateUserStreak(userId);
    
    // Check for badge awards
    await checkAndAwardBadges(userId, testData);
    
    return result;
  } catch (error) {
    console.error('Error submitting test result:', error);
    throw error;
  }
};

export const checkAndAwardBadges = async (userId, testData) => {
  try {
    const testResults = await getUserTestResults(userId);
    const totalTests = testResults.documents.length;
    
    // Award badges based on achievements
    if (totalTests >= 10) {
      await awardBadge(userId, 'test-veteran');
    }
    
    if (testData.score >= 90) {
      await awardBadge(userId, 'perfectionist');
    }
    
    if (testData.testType === 'coding' && totalTests >= 5) {
      await awardBadge(userId, 'coding-master');
    }
    
    // Check for domain-specific badges
    const domainTests = testResults.documents.filter(
      test => JSON.parse(test.questions)[0]?.domain === testData.domain
    );
    
    if (domainTests.length >= 5) {
      await awardBadge(userId, `${testData.domain.toLowerCase()}-specialist`);
    }
  } catch (error) {
    console.error('Error checking badges:', error);
  }
};

// Analytics and Performance
export const calculatePerformanceStats = async (userId) => {
  try {
    const testResults = await getUserTestResults(userId);
    const profile = await getUserProfile(userId);
    
    if (!testResults.documents.length) {
      return {
        totalTests: 0,
        averageScore: 0,
        strongAreas: [],
        weakAreas: [],
        improvementTips: [],
        weeklyProgress: [],
        skillRadar: [],
        progressPercentage: 0
      };
    }

    const tests = testResults.documents;
    const totalTests = tests.length;
    const averageScore = Math.round(
      tests.reduce((sum, test) => sum + test.score, 0) / totalTests
    );

    // Calculate weekly progress
    const weeklyProgress = calculateWeeklyProgress(tests);
    
    // Calculate skill areas
    const skillAnalysis = calculateSkillAnalysis(tests);
    
    // Calculate progress percentage
    const progressPercentage = Math.min(
      Math.round((averageScore + (profile?.streak || 0) * 2) / 1.2),
      100
    );

    return {
      totalTests,
      averageScore,
      strongAreas: skillAnalysis.strong,
      weakAreas: skillAnalysis.weak,
      improvementTips: generateImprovementTips(skillAnalysis.weak),
      weeklyProgress,
      skillRadar: skillAnalysis.radar,
      progressPercentage
    };
  } catch (error) {
    console.error('Error calculating performance stats:', error);
    throw error;
  }
};

export const calculateWeeklyProgress = (tests) => {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const weeklyData = [];
  
  for (let i = 0; i < 4; i++) {
    const weekTests = tests.slice(i * 5, (i + 1) * 5);
    const weekScore = weekTests.length > 0 
      ? Math.round(weekTests.reduce((sum, test) => sum + test.score, 0) / weekTests.length)
      : 0;
    
    weeklyData.push({
      week: weeks[i],
      score: weekScore
    });
  }
  
  return weeklyData;
};

export const calculateSkillAnalysis = (tests) => {
  const skillScores = {};
  
  tests.forEach(test => {
    const domain = test.domain || 'General';
    if (!skillScores[domain]) {
      skillScores[domain] = [];
    }
    skillScores[domain].push(test.score);
  });

  const skillAverages = Object.entries(skillScores).map(([skill, scores]) => ({
    skill,
    score: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
  }));

  const strong = skillAverages
    .filter(skill => skill.score >= 75)
    .map(skill => skill.skill);
    
  const weak = skillAverages
    .filter(skill => skill.score < 60)
    .map(skill => skill.skill);

  return {
    strong,
    weak,
    radar: skillAverages
  };
};

export const generateImprovementTips = (weakAreas) => {
  const tips = {
    'Technical': 'Practice more coding problems and review fundamental concepts',
    'Behavioral': 'Work on STAR method for behavioral questions',
    'System Design': 'Study scalable system architectures and design patterns',
    'Communication': 'Practice explaining complex topics in simple terms',
    'Problem Solving': 'Break down problems into smaller, manageable parts',
    'Leadership': 'Develop examples of leadership experiences and impact'
  };

  return weakAreas.map(area => tips[area] || `Focus on improving ${area} skills`);
};

// Leaderboard
export const getWeeklyLeaderboard = async () => {
  try {
    const leaderboardData = await getLeaderboard(10);
    
    return leaderboardData.documents.map((profile, index) => ({
      id: profile.user_id,
      name: profile.name || 'Anonymous User',
      score: profile.total_score,
      streak: profile.streak,
      rank: index + 1
    }));
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return [];
  }
};

// Chat History
export const saveChatInteraction = async (userId, message, response) => {
  try {
    return await saveChatMessage(userId, message, response);
  } catch (error) {
    console.error('Error saving chat interaction:', error);
    throw error;
  }
};