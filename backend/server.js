import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
console.log('📝 Environment loaded');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
console.log('⚙️  Setting up middleware...');
app.use(cors());
app.use(express.json());
console.log('✅ Middleware configured');

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
console.log('🔗 Connecting to MongoDB...');
const client = new MongoClient(mongoUri);
let articlesCollection;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    articlesCollection = client.db('Constitution_db').collection('Articles');
    
    // Test query
    const count = await articlesCollection.countDocuments();
    console.log(`📊 Found ${count} articles in database`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

// =================================================================
// ROUTES
// =================================================================

// Test route
app.get('/api/test', (req, res) => {
  console.log('🎯 /api/test endpoint was hit!');
  res.json({ 
    success: true,
    message: 'Backend is working!',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  console.log('🎯 Root endpoint was hit!');
  res.json({ 
    message: 'SmartSanstha Backend API',
    endpoints: [
      'GET /api/test',
      'GET /api/articles/parts',
      'GET /api/articles/recommended',
      'GET /api/articles/:articleNumber'
    ]
  });
});

// Get all parts
app.get('/api/articles/parts', async (req, res) => {
  console.log('🎯 /api/articles/parts endpoint was hit!');
  try {
    const articles = await articlesCollection.find({}).toArray();
    console.log(`📚 Found ${articles.length} articles`);
    
    // Group by Part
    const partsMap = new Map();
    
    articles.forEach(article => {
      const partName = article.Part;
      if (!partsMap.has(partName)) {
        partsMap.set(partName, {
          id: `part-${partName.toLowerCase().replace(/\s+/g, '-')}`,
          partNumber: partName === 'Preamble' ? 0 : 1,
          title: partName,
          description: `Learn about ${partName}`,
          articles: [],
          totalArticles: 0,
          category: 'fundamental-rights',
          difficulty: 'beginner'
        });
      }
      
      partsMap.get(partName).articles.push({
        article: article.Article,
        title: article.Title
      });
      partsMap.get(partName).totalArticles++;
    });

    const parts = Array.from(partsMap.values());
    console.log(`📦 Returning ${parts.length} parts`);
    
    res.json({
      success: true,
      data: parts,
      count: parts.length
    });
  } catch (error) {
    console.error('❌ Error in /api/articles/parts:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch parts',
      message: error.message 
    });
  }
});

// Get recommended articles - THIS WAS MISSING!
app.get('/api/articles/recommended', async (req, res) => {
  console.log('🎯 /api/articles/recommended endpoint was hit!');
  try {
    const articles = await articlesCollection
      .find({ Article: { $in: ['14', '19', '21'] } })
      .toArray();
    
    console.log(`⭐ Found ${articles.length} recommended articles`);

    const formatted = articles.map(article => ({
      id: `article-${article.Article}`,
      article: `Article ${article.Article}`,
      title: article.Title,
      summary: article.Simplified_Description,
      readTime: 5,
      category: 'fundamental-rights'
    }));

    res.json({
      success: true,
      data: formatted,
      count: formatted.length
    });
  } catch (error) {
    console.error('❌ Error in /api/articles/recommended:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch recommended articles',
      message: error.message 
    });
  }
});

// Get articles by part
app.get('/api/articles/part/:part', async (req, res) => {
  console.log('🎯 /api/articles/part/:part endpoint was hit!');
  try {
    const { part } = req.params;
    console.log(`📖 Searching for part: ${part}`);
    
    const articles = await articlesCollection
      .find({ Part: part })
      .toArray();
    
    console.log(`📚 Found ${articles.length} articles for ${part}`);

    const formatted = articles.map(article => ({
      id: `article-${article.Article}`,
      article: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
      title: article.Title,
      summary: article.Simplified_Description,
      readTime: 5,
      category: 'fundamental-rights',
      part: article.Part
    }));

    res.json({
      success: true,
      data: formatted,
      count: formatted.length
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch articles' });
  }
});

// Get single article
app.get('/api/articles/:articleNumber', async (req, res) => {
  console.log('🎯 /api/articles/:articleNumber endpoint was hit!');
  try {
    const { articleNumber } = req.params;
    console.log(`📄 Searching for article: ${articleNumber}`);
    
    const article = await articlesCollection.findOne({ Article: articleNumber });

    if (!article) {
      console.log(`❌ Article ${articleNumber} not found`);
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    console.log(`✅ Found article: ${article.Title}`);

    const formatted = {
      articleNumber: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
      articleName: article.Title,
      part: {
        number: 1,
        name: article.Part,
        category: 'fundamental-rights'
      },
      simplifiedDescription: article.Simplified_Description,
      originalText: article.Original_Description || 'Not available',
      keyPoints: article.Key_Points || [],
      historicalContext: article.Historical_Context || 'Not available',
      landmarkCases: (article.Landmark_Cases || []).map(c => ({
        name: typeof c === 'string' ? c.split(':')[0].trim() : c.name || 'Unknown',
        significance: typeof c === 'string' ? (c.split(':')[1] || '').trim() : c.significance || 'Unknown'
      })),
      relatedArticles: (article.Related_Articles || []).map(r => ({
        number: typeof r === 'string' ? r : r.number || 'Unknown',
        name: typeof r === 'string' ? r : r.name || 'Unknown'
      })),
      subject: article.Subject
    };

    res.json({
      success: true,
      data: formatted
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch article' });
  }
});

// Search articles
app.get('/api/articles/search', async (req, res) => {
  console.log('🎯 /api/articles/search endpoint was hit!');
  try {
    const { q } = req.query;
    console.log(`🔍 Searching for: ${q}`);
    
    if (!q) {
      return res.status(400).json({ success: false, error: 'Search query required' });
    }

    const regex = new RegExp(q, 'i');
    const articles = await articlesCollection
      .find({
        $or: [
          { Title: { $regex: regex } },
          { Simplified_Description: { $regex: regex } },
          { Article: { $regex: regex } }
        ]
      })
      .limit(20)
      .toArray();

    console.log(`📚 Found ${articles.length} results`);

    const formatted = articles.map(article => ({
      id: `article-${article.Article}`,
      article: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
      title: article.Title,
      summary: article.Simplified_Description,
      readTime: 5,
      category: 'fundamental-rights'
    }));

    res.json({
      success: true,
      data: formatted,
      count: formatted.length
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to search' });
  }
});

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
    console.log('Available endpoints:');
    console.log('  GET /api/test');
    console.log('  GET /api/articles/parts');
    console.log('  GET /api/articles/recommended');
    console.log('  GET /api/articles/:articleNumber');
    console.log('  GET /api/articles/part/:part');
    console.log('  GET /api/articles/search?q=...');
    console.log('');
    console.log('Press Ctrl+C to stop');
    console.log('');
  });
}).catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});