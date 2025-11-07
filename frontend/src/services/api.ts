import axios from 'axios';

// --- CONFIGURATION ---
const API_BASE_URL = 'http://localhost:5001/api';
// Ensure withCredentials is set for authorization (used in recommendation logic)
const WITH_CREDENTIALS = true; 
// ---------------------

console.log('🔗 Connecting to API:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000,
  withCredentials: WITH_CREDENTIALS, // Kept for recommendations and auth
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('📤 Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request setup error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ Got response from:', response.config.url);
    return response.data; // This is correct
  },
  (error) => {
    console.error('❌ API Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// =================================================================
// 📚 Article APIs (Includes all routes + recommendation)
// =================================================================
export const articleAPI = {
  getAllParts: () => api.get('/articles/parts'),
  getArticlesByPart: (part: string) => api.get(`/articles/part/${encodeURIComponent(part)}`),
  getArticle: (articleNumber: string) => api.get(`/articles/${articleNumber}`),
  searchArticles: (query: string) => api.get('/articles/search', { params: { q: query } }),
  getAllSubjects: () => api.get('/articles/subjects'), 
  getRecommendations: () => api.get('/articles/recommendations'), // From recommendation logic
};

// =================================================================
// 🤖 Chatbot APIs
// =================================================================
export const chatbotAPI = {
  sendMessage: (message: string, sessionId: string) =>
    api.post('/chatbot/chat', { message, sessionId }),
  clearHistory: (sessionId: string) => api.delete(`/chatbot/history/${sessionId}`),
  askAboutArticle: (articleNumber: string, question: string) =>
    api.post('/chatbot/article-question', { articleNumber, question }),
};

// =================================================================
// 📝 Quiz APIs (Corrected to match quizRoutes.js)
// =================================================================
export const quizAPI = {
  /**
   * Starts a new adaptive quiz session for a given part.
   * NOTE: Backend route is /api/quiz/start (as per quizRoutes.js)
   */
  startQuiz: (part: string) => 
    api.post('/quiz/start', { part }), // Corrected to /quiz/start to match quizRoutes.js

  /**
   * Submits an answer and gets the result + the next question.
   */
  submitAnswer: (quizId: string, questionId: string, answerIndex: number) =>
    api.post('/quiz/answer', { quizId, questionId, answerIndex }),
  
  /**
   * Generates a quiz based on a specific article.
   * NOTE: You should confirm if you want to implement the generateFromArticle endpoint
    * in your quizRoutes.js. If you do, the route should be defined in quizRoutes.js.
   */
  generateFromArticle: (articleNumber: string) =>
    api.post('/quiz/from-article', { articleNumber }), // This needs a corresponding route in quizRoutes.js if used
};