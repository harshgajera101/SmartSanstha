import express from 'express';
import { getArticlesCollection } from '../config/database.js';
import { extractPartNumber, getDifficultyLevel } from '../helpers/partHelpers.js';
import { verifyAccessToken } from '../middleware/authMiddleware.js';


const RECOMMENDATION_MAP = {
  "middle_school": ["Preamble", "Part I", "Part II", "Part III", "Part IV", "Part IV A"],
  "high_school": ["Part V", "Part VI", "Part IX", "Part IXA", "Part X", "Part XV"],
  "college_student": ["Part XI", "Part XII", "Part XIII", "Part XIV", "Part XVIII", "Part XIX"],
  "advanced_learner": ["Part XIV A", "Part XVII", "Part XX", "Part XXI", "Part XXII"],
};

const router = express.Router();

// =================================================================
// SPECIFIC ROUTES (must come first)
// =================================================================

// Get all parts with articles
router.get('/parts', async (req, res) => {
  console.log('🎯 /api/articles/parts endpoint was hit!');
  try {
    const articlesCollection = getArticlesCollection();
    
    // Fetch all articles from database
    const articles = await articlesCollection.find({}).toArray();
    console.log(`📚 Found ${articles.length} total articles`);
    
    // Group articles by Part
    const partsMap = new Map();
    
    articles.forEach(article => {
      const partName = article.Part;
      
      if (!partsMap.has(partName)) {
        const difficulty = getDifficultyLevel(partName);
        
        partsMap.set(partName, {
          id: `part-${partName.toLowerCase().replace(/\s+/g, '-')}`,
          partNumber: extractPartNumber(partName),
          title: partName,
          description: `Learn about ${partName} of the Indian Constitution`,
          articles: [],
          totalArticles: 0,
          subjects: new Set(),
          difficulty: difficulty
        });
      }
      
      // Add article to this part
      partsMap.get(partName).articles.push({
        article: article.Article,
        title: article.Title,
        subject: article.Subject
      });
      partsMap.get(partName).totalArticles++;
      
      // Add subject to the set
      if (article.Subject) {
        partsMap.get(partName).subjects.add(article.Subject);
      }
    });

    // Convert to array and process
    const parts = Array.from(partsMap.values()).map(part => {
      const subjectsArray = Array.from(part.subjects);
      const primarySubject = subjectsArray.length > 0 ? subjectsArray[0] : 'Other';
      
      return {
        id: part.id,
        partNumber: part.partNumber,
        title: part.title,
        description: part.description,
        articles: part.articles,
        totalArticles: part.totalArticles,
        subjects: subjectsArray,
        primarySubject: primarySubject,
        difficulty: part.difficulty
      };
    }).sort((a, b) => a.partNumber - b.partNumber);
    
    console.log(`📦 Returning ${parts.length} parts with difficulty levels`);
    
    // Log difficulty distribution
    const difficultyCount = {
      beginner: parts.filter(p => p.difficulty === 'beginner').length,
      intermediate: parts.filter(p => p.difficulty === 'intermediate').length,
      advanced: parts.filter(p => p.difficulty === 'advanced').length
    };
    console.log('📊 Difficulty distribution:', difficultyCount);
    
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

// Get all unique subjects
router.get('/subjects', async (req, res) => {
  console.log('🎯 /api/articles/subjects endpoint was hit!');
  try {
    const articlesCollection = getArticlesCollection();
    const subjects = await articlesCollection.distinct('Subject');
    
    console.log(`📋 Found ${subjects.length} unique subjects:`, subjects);
    
    res.json({
      success: true,
      data: subjects,
      count: subjects.length
    });
  } catch (error) {
    console.error('❌ Error in /api/articles/subjects:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch subjects',
      message: error.message 
    });
  }
});

// Search articles
router.get('/search', async (req, res) => {
  console.log('🎯 /api/articles/search endpoint was hit!');
  try {
    const articlesCollection = getArticlesCollection();
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

// --- MOVED THIS ROUTE UP ---
// Get recommendations based on user category
router.get('/recommendations', verifyAccessToken, async (req, res) => {
  console.log('🎯 /api/articles/recommendations endpoint was hit!');
  try {
    // 'req.user' is added by the 'verifyAccessToken' middleware
    const userCategory = req.user.category;

    if (!userCategory) {
      console.log('⚠️ User category not found in request');
      return res.status(400).json({ success: false, message: 'User category not found.' });
    }

    console.log(`ℹ️ Fetching recommendations for category: ${userCategory}`);

    // Get the list of part names for the user's category
    const partNames = RECOMMENDATION_MAP[userCategory] || RECOMMENDATION_MAP['advanced_learner'];

    // Get articles from the database
    const articlesCollection = getArticlesCollection();

    // ---
    // 💡 BUG FIX: Query the 'Part' field, not the 'Article' field
    // ---
    const articles = await articlesCollection.find({
      'Part': { $in: partNames }
    }).toArray();


    if (!articles || articles.length === 0) {
      console.log(`❌ No recommended articles found for parts: ${partNames.join(', ')}`);
      return res.status(404).json({ success: false, message: 'No recommended articles found.' });
    }

    // Format the articles for the ArticleCard component (just like you do in /part/:part)
    const formatted = articles.map(article => ({
      id: `article-${article.Article}`,
      article: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
      title: article.Title,
      summary: article.Simplified_Description,
      readTime: Math.ceil(article.Simplified_Description.split(' ').length / 200),
      category: 'recommendation', // You can use any category
      part: article.Part
    }));

    console.log(`✅ Found ${formatted.length} recommended articles`);

    res.json({
      success: true,
      data: formatted,
      count: formatted.length
    });

  } catch (error) {
    console.error('❌ Error in /api/articles/recommendations:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recommendations',
      message: error.message
    });
  }
});
// --- END OF MOVED ROUTE ---


// =================================================================
// DYNAMIC ROUTES (must come last)
// =================================================================

// Get single article by article number
// This route MUST come AFTER specific routes like '/parts', '/search', '/recommendations'
router.get('/:articleNumber', async (req, res) => {
  console.log('🎯 /api/articles/:articleNumber endpoint was hit!');
  try {
    const articlesCollection = getArticlesCollection();
    const { articleNumber } = req.params;
    console.log(`📄 Searching for article: ${articleNumber}`);
    
    const article = await articlesCollection.findOne({ Article: articleNumber });

    if (!article) {
      console.log(`❌ Article ${articleNumber} not found`);
      return res.status(404).json({ // 440 is not a standard code, changed to 404
        success: false, 
        error: 'Article not found' 
      });
    }

    console.log(`✅ Found article: ${article.Title}`);

    // Format response
    const formatted = {
      articleNumber: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`,
      articleName: article.Title,
      part: {
        number: extractPartNumber(article.Part),
        name: article.Part,
        category: 'fundamental-rights'
      },
      simplifiedDescription: article.Simplified_Description,
      originalText: article.Original_Description, // Note: Your DB might have Original_Description
      keyPoints: article.Key_Points || [],
      historicalContext: article.Historical_Context || 'Not available',
      landmarkCases: (article.Landmark_Cases || []).map(caseStr => {
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
    res.status(500).json({ // Typo 50O, changed to 500
      success: false, 
      error: 'Failed to fetch article',
      message: error.message 
    });
  }
});

// Get articles by part
router.get('/part/:part', async (req, res) => {
  console.log('🎯 /api/articles/part/:part endpoint was hit!');
  try {
    const articlesCollection = getArticlesCollection();
    const { part } = req.params;
    console.log(`📖 Searching for part: ${part}`);
    
    const articles = await articlesCollection
      .find({ Part: part })
      .toArray();
    
    console.log(`📚 Found ${articles.length} articles for ${part}`);

    // Get difficulty for this part
    const partDifficulty = getDifficultyLevel(part);

    const formatted = articles.map(article => ({
      id: `article-${article.Article}`,
      article: article.Article === '0' ? 'Preamble' : `Article ${article.Article}`, // Typo 'PSreamble' / 'PreamDble', corrected to 'Preamble'
      title: article.Title,
      summary: article.Simplified_Description,
      readTime: Math.ceil(article.Simplified_Description.split(' ').length / 200),
      category: 'fundamental-rights',
      part: article.Part,
      difficulty: partDifficulty // Add difficulty to each article
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


export default router;


