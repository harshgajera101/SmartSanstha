// config/database.js
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

let mongoClient;
let articlesCollection;
let scenariosCollection;

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Constitution_db';
const dbName = 'Constitution_db';

/**
 * Connect to MongoDB using both Mongoose (for models/login)
 * and MongoClient (for raw collections like Articles & Scenarios)
 */
export async function connectDB() {
  if (!mongoURI) {
    throw new Error('MongoDB URI is missing. Set MONGODB_URI in your .env file.');
  }

  try {
    console.log('🔗 Connecting to MongoDB...');

    // -----------------------------
    // 1️⃣ Connect using Mongoose (for schemas and login)
    // -----------------------------
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Mongoose connected');

    // -----------------------------
    // 2️⃣ Connect using MongoClient (for direct access)
    // -----------------------------
    mongoClient = new MongoClient(mongoURI);
    await mongoClient.connect();
    console.log('✅ MongoClient connected');

    const db = mongoClient.db(dbName);

    // Initialize collections
    articlesCollection = db.collection('Articles');
    scenariosCollection = db.collection('Scenarios');

    // -----------------------------
    // 3️⃣ Test queries
    // -----------------------------
    const articleCount = await articlesCollection.countDocuments();
    console.log(`📚 Found ${articleCount} Articles`);

    const scenarioCount = await scenariosCollection.countDocuments();
    console.log(`⚖️ Found ${scenarioCount} Court Scenarios`);

    console.log('🚀 Database connections initialized successfully');

    return { mongoose, articlesCollection, scenariosCollection };
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

/**
 * Get Articles collection (for direct MongoClient operations)
 */
export function getArticlesCollection() {
  if (!articlesCollection) {
    throw new Error('Articles Collection not initialized. Call connectDB() first.');
  }
  return articlesCollection;
}

/**
 * Get Scenarios collection (for direct MongoClient operations)
 */
export function getScenariosCollection() {
  if (!scenariosCollection) {
    throw new Error('Scenarios Collection not initialized. Call connectDB() first.');
  }
  return scenariosCollection;
}

/**
 * Close both Mongoose and MongoClient connections
 */
export async function closeDB() {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('🔌 Mongoose connection closed');
    }

    if (mongoClient) {
      await mongoClient.close();
      console.log('🔌 MongoClient connection closed');
    }
  } catch (error) {
    console.error('⚠️ Error closing database connections:', error.message);
  }
}
