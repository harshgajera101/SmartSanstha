import { MongoClient } from 'mongodb';

let client;
let articlesCollection;
let scenariosCollection; // New collection variable

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'Constitution_db'; // Database name

export async function connectDB() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    client = new MongoClient(mongoUri);
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(dbName);

    articlesCollection = db.collection('Articles');
    scenariosCollection = db.collection('Scenarios'); // Initialize Scenarios collection
    
    // Test query for Articles
    const articleCount = await articlesCollection.countDocuments();
    console.log(`📊 Found ${articleCount} articles in database`);

    // Test query for Scenarios
    const scenarioCount = await scenariosCollection.countDocuments();
    console.log(`⚖️ Found ${scenarioCount} court scenarios in database`);
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

export function getArticlesCollection() {
  if (!articlesCollection) {
    throw new Error('Articles Collection not initialized. Call connectDB() first.');
  }
  return articlesCollection;
}

// New function to get the Scenarios collection
export function getScenariosCollection() {
  if (!scenariosCollection) {
    throw new Error('Scenarios Collection not initialized. Call connectDB() first.');
  }
  return scenariosCollection;
}

export async function closeDB() {
  if (client) {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}