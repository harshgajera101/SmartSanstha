import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import articleRoutes from './routes/articleRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import quizRoutes from './routes/quizRoutes.js';

// Load environment variables
dotenv.config();
console.log('📝 Environment loaded');

const app = express();
const PORT = process.env.PORT || 5001;

// =================================================================
// MIDDLEWARE
// =================================================================
console.log('⚙️  Setting up middleware...');
app.use(cors());
app.use(express.json());
console.log('✅ Middleware configured');

// =================================================================
// ROUTES
// =================================================================

// Root route
app.get('/', (req, res) => {
  console.log('🎯 Root endpoint was hit!');
  res.json({ 
    message: 'SmartSanstha Backend API',
    version: '1.0.0',
    endpoints: {
      articles: '/api/articles',
      chatbot: '/api/chatbot',
      quiz: '/api/quiz'
    }
  });
});

// Test route
app.get('/api/test', (req, res) => {
  console.log('🎯 /api/test endpoint was hit!');
  res.json({ 
    success: true,
    message: 'Backend is working!',
    timestamp: new Date().toISOString()
  });
});

// Mount route modules
app.use('/api/articles', articleRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/quiz', quizRoutes);

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ 
    success: false, 
    error: 'Route not found',
    path: req.url 
  });
});

// =================================================================
// START SERVER
// =================================================================
console.log('🚀 Starting server...');
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`✅ Server is RUNNING!`);
    console.log(`🌐 Local: http://localhost:${PORT}`);
    console.log(`📍 API Base: http://localhost:${PORT}/api`);
    console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
    console.log('='.repeat(50));
    console.log('');
    console.log('📁 Available endpoints:');
    console.log('  Articles:');
    console.log('    GET  /api/articles/parts');
    console.log('    GET  /api/articles/subjects');
    console.log('    GET  /api/articles/:articleNumber');
    console.log('    GET  /api/articles/part/:part');
    console.log('    GET  /api/articles/search?q=...');
    console.log('  Chatbot:');
    console.log('    POST /api/chatbot/chat (not implemented)');
    console.log('  Quiz:');
    console.log('    POST /api/quiz/from-part (not implemented)');
    console.log('    POST /api/quiz/from-article (not implemented)');
    console.log('');
    console.log('Press Ctrl+C to stop');
    console.log('');
  });
}).catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});