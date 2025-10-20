import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

console.log('🔗 Connecting to API:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
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

// Quiz APIs
export const quizAPI = {
  generateFromPart: (part: string, questionCount: number = 5) =>
    api.post('/quiz/from-part', { part, questionCount }),
  generateFromArticle: (articleNumber: string, questionCount: number = 5) =>
    api.post('/quiz/from-article', { articleNumber, questionCount }),
  generateRandom: (questionCount: number = 5, category?: string) =>
    api.get('/quiz/random', { params: { questionCount, category } }),
};

export default api;