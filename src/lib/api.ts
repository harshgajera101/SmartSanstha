import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  withCredentials: true
})

export const pyApi = axios.create({
  baseURL: import.meta.env.VITE_PY_API_BASE_URL || 'http://localhost:8000',
})

// Example wrappers
export const AuthAPI = {
  me: () => api.get('/auth/me'),
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  signup: (name: string, email: string, password: string) => api.post('/auth/signup', { name, email, password }),
  logout: () => api.post('/auth/logout', {})
}

export const LearnAPI = {
  listCourses: () => api.get('/courses'),
}

export const CourtroomAPI = {
  listCases: () => api.get('/courtroom/cases'),
  getRecommendation: (text: string) => pyApi.post('/nlp/recommend', { text }) // Python microservice example
}

export const GamesAPI = {
  list: () => api.get('/games')
}
