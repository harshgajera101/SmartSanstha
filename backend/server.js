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
// HELPER FUNCTIONS
// =================================================================

function extractPartNumber(partName) {
  if (partName === 'Preamble') return 0;
  
  // Extract Roman numerals from part name (e.g., "Part III" -> "III")
  const match = partName.match(/Part\s+([IVXLCDM]+)/i);
  if (match) {
    return romanToDecimal(match[1]);
  }
  return 999; // Unknown parts go to end
}

function romanToDecimal(roman) {
  const romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanMap[roman[i]];
    const next = romanMap[roman[i + 1]];
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
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

// Get all parts with articles
app.get('/api/articles/parts', async (req, res) => {
  console.log('🎯 /api/articles/parts endpoint was hit!');
  try {
    // Fetch all articles from database
    const articles = await articlesCollection.find({}).toArray();
    console.log(`📚 Found ${articles.length} total articles`);
    
    // Group articles by Part
    const partsMap = new Map();
    
    articles.forEach(article => {
      const partName = article.Part;
      
      if (!partsMap.has(partName)) {
        partsMap.set(partName, {
          id: `part-${partName.toLowerCase().replace(/\s+/g, '-')}`,
          partNumber: extractPartNumber(partName),
          title: partName,
          description: `Learn about ${partName} of the Indian Constitution`,
          articles: [],
          totalArticles: 0,
          category: 'fundamental-rights', // You can categorize based on Part later
          difficulty: 'beginner'
        });
      }
      
      // Add article to this part
      partsMap.get(partName).articles.push({
        article: article.Article,
        title: article.Title
      });
      partsMap.get(partName).totalArticles++;
    });

    // Convert to array and sort by part number
    const parts = Array.from(partsMap.values()).sort((a, b) => a.partNumber - b.partNumber);
    
    console.log(`📦 Returning ${parts.length} parts`);
    console.log('Parts:', parts.map(p => `${p.title} (${p.totalArticles} articles)`));
    
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

// Get single article by article number
app.get('/api/articles/:articleNumber', async (req, res) => {
  console.log('🎯 /api/articles/:articleNumber endpoint was hit!');
  try {
    const { articleNumber } = req.params;
    console.log(`📄 Searching for article: ${articleNumber}`);
    
    // Find article in database - using exact match on Article field
    const article = await articlesCollection.findOne({ Article: articleNumber });

    if (!article) {
      console.log(`❌ Article ${articleNumber} not found`);
      return res.status(404).json({ 
        success: false, 
        error: 'Article not found' 
      });
    }

    console.log(`✅ Found article: ${article.Title}`);

    // Format response using ONLY the fields from your database
    const formatted = {
      articleNumber: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
      articleName: article.Title,
      part: {
        number: extractPartNumber(article.Part),
        name: article.Part,
        category: 'fundamental-rights'
      },
      simplifiedDescription: article.Simplified_Description,
      originalText: article.Original_Description,
      keyPoints: article.Key_Points || [],
      historicalContext: article.Historical_Context || 'Not available',
      landmarkCases: (article.Landmark_Cases || []).map(caseStr => {
        // Parse "Case Name: Significance" format
        const colonIndex = caseStr.indexOf(':');
        if (colonIndex > -1) {
          return {
            name: caseStr.substring(0, colonIndex).trim(),
            significance: caseStr.substring(colonIndex + 1).trim()
          };
        }
        return {
          name: caseStr,
          significance: ''
        };
      }),
      relatedArticles: (article.Related_Articles || []).map(related => {
        // Parse "Article X (Name)" or "Part X (Name)" format
        const match = related.match(/^(.*?)\s*\((.*?)\)$/);
        if (match) {
          return {
            number: match[1].trim(),
            name: match[2].trim()
          };
        }
        return {
          number: related,
          name: related
        };
      }),
      subject: article.Subject
    };

    res.json({
      success: true,
      data: formatted
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch article',
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
      readTime: Math.ceil(article.Simplified_Description.split(' ').length / 200), // Calculate read time
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
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch articles',
      message: error.message 
    });
  }
});

// Search articles
app.get('/api/articles/search', async (req, res) => {
  console.log('🎯 /api/articles/search endpoint was hit!');
  try {
    const { q } = req.query;
    console.log(`🔍 Searching for: ${q}`);
    
    if (!q) {
      return res.status(400).json({ 
        success: false, 
        error: 'Search query required' 
      });
    }

    const regex = new RegExp(q, 'i');
    const articles = await articlesCollection
      .find({
        $or: [
          { Title: { $regex: regex } },
          { Simplified_Description: { $regex: regex } },
          { Article: { $regex: regex } },
          { Subject: { $regex: regex } },
          { Part: { $regex: regex } }
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
      readTime: Math.ceil(article.Simplified_Description.split(' ').length / 200),
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
    res.status(500).json({ 
      success: false, 
      error: 'Failed to search',
      message: error.message 
    });
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