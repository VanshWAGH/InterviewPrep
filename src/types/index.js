// Type definitions for InterviewGenius
// These are JSDoc comments for better IDE support

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} [domain]
 * @property {string} [avatar]
 * @property {string} createdAt
 * @property {number} streak
 * @property {number} totalScore
 * @property {number} level
 * @property {Badge[]} badges
 * @property {SkillScore[]} skillScores
 */

/**
 * @typedef {Object} Badge
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} icon
 * @property {string} color
 * @property {string} unlockedAt
 */

/**
 * @typedef {Object} SkillScore
 * @property {string} skill
 * @property {number} score
 * @property {number} maxScore
 * @property {number} improvement
 */

/**
 * @typedef {Object} TestResult
 * @property {string} id
 * @property {string} userId
 * @property {'mcq'|'coding'|'case-study'} testType
 * @property {string} domain
 * @property {'beginner'|'intermediate'|'advanced'|'pro'} level
 * @property {number} score
 * @property {number} totalQuestions
 * @property {number} correctAnswers
 * @property {number} timeSpent
 * @property {string} feedback
 * @property {string} aiComment
 * @property {number} percentileRank
 * @property {string} completedAt
 */

/**
 * @typedef {Object} Question
 * @property {string} id
 * @property {string} question
 * @property {'mcq'|'coding'|'case-study'} type
 * @property {string[]} [options]
 * @property {string} [correctAnswer]
 * @property {string} [explanation]
 * @property {'beginner'|'intermediate'|'advanced'|'pro'} level
 * @property {string} domain
 * @property {string} [link]
 */

/**
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {string} content
 * @property {boolean} isUser
 * @property {string} timestamp
 * @property {'happy'|'thinking'|'excited'|'neutral'} [emotion]
 */

/**
 * @typedef {Object} Resource
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'article'|'video'|'guide'} type
 * @property {string} url
 * @property {string} domain
 * @property {string} difficulty
 * @property {string[]} tags
 */

/**
 * @typedef {Object} PerformanceStats
 * @property {number} totalTests
 * @property {number} averageScore
 * @property {string[]} strongAreas
 * @property {string[]} weakAreas
 * @property {string[]} improvementTips
 * @property {Array<{week: string, score: number}>} weeklyProgress
 * @property {Array<{skill: string, score: number}>} skillRadar
 * @property {number} progressPercentage
 */

/**
 * @typedef {Object} LeaderboardEntry
 * @property {string} id
 * @property {string} name
 * @property {number} score
 * @property {string} [avatar]
 * @property {number} streak
 * @property {number} rank
 */

module.exports = {};