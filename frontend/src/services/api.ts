import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

console.log('🔗 Connecting to API:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000,
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
    return response.data;
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

// Article APIs
export const articleAPI = {
  getAllParts: () => api.get('/articles/parts'),
  getArticlesByPart: (part: string) => api.get(`/articles/part/${encodeURIComponent(part)}`),
  getArticle: (articleNumber: string) => api.get(`/articles/${articleNumber}`),
  searchArticles: (query: string) => api.get('/articles/search', { params: { q: query } }),
  getAllSubjects: () => api.get('/articles/subjects'), // New endpoint
};

// Chatbot APIs
export const chatbotAPI = {
  sendMessage: (message: string, sessionId: string) =>
    api.post('/chatbot/chat', { message, sessionId }),
  clearHistory: (sessionId: string) => api.delete(`/chatbot/history/${sessionId}`),
  askAboutArticle: (articleNumber: string, question: string) =>
    api.post('/chatbot/article-question', { articleNumber, question }),
};
// REQUIRED changes for your api.js file to work

export const quizAPI = {
  /**
   * Starts a new adaptive quiz session for a given part.
   * @returns {Promise<{quizId: string, question: object, questionNumber: number, totalQuestions: number}>}
   */
  startQuiz: (part: string) => 
    api.post('/quiz/start', { part }),

  /**
   * Submits an answer and gets the result + the next question.
   * @returns {Promise<{quizOver: boolean, result: object, question?: object, ...}>}
   */
  submitAnswer: (quizId: string, questionId: string, answerIndex: number) =>
    api.post('/quiz/answer', { quizId, questionId, answerIndex }),
  
  // The old 'generateFromPart' is now obsolete
  // generateFromPart: ... 
};