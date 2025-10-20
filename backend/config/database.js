import { MongoClient } from 'mongodb';

let client;
let articlesCollection;

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

export async function connectDB() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    client = new MongoClient(mongoUri);
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    articlesCollection = client.db('Constitution_db').collection('Articles');
    
    // Test query
    const count = await articlesCollection.countDocuments();
    console.log(`📊 Found ${count} articles in database`);
    
    return articlesCollection;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

export function getArticlesCollection() {
  if (!articlesCollection) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return articlesCollection;
}

export async function closeDB() {
  if (client) {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}