import express from 'express';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid'; // Use uuid for unique IDs

const router = express.Router();

// -----------------------------------------------------------------
// 1. GEMINI API INITIALIZATION
// -----------------------------------------------------------------

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const modelName = 'gemini-2.0-flash';

let genAI;
let modelsAPI; 

if (!GEMINI_API_KEY) {
  console.error("❌ FATAL: GEMINI_API_KEY environment variable not set for quiz routes.");
} else {
  console.log("✅ GEMINI_API_KEY found for quiz routes.");
  try {
    genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    if (genAI && genAI.models) {
      modelsAPI = genAI.models;
      console.log(`✅ Google AI Models API endpoint initialized (Using model: ${modelName}).`);
    } else {
      throw new Error("Failed to access .models property on GoogleGenAI client.");
    }
  } catch (error) {
    console.error("❌ FATAL: Failed to initialize Google AI client:", error.message);
    modelsAPI = null;
  }
}

// -----------------------------------------------------------------
// 2. HELPER FUNCTIONS
// -----------------------------------------------------------------

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function generateQuizPool(topic) {
  console.log(`🧠 Generating pool of 10 questions for topic: ${topic} (5 easy, 2 medium, 3 hard) using ${modelName}`);

  const prompt = `
    You are a quiz generation expert for a web app about the Indian Constitution.
    Generate a JSON object containing a pool of 10 quiz questions strictly about: "${topic}".

    The JSON object must have three keys: "easy", "medium", and "hard".
    - "easy": An array of exactly 5 easy question objects.
    - "medium": An array of exactly 2 medium question objects.
    - "hard": An array of exactly 3 hard question objects.

    Each question object in the arrays must have this exact structure:
    {
      "id": "a-unique-id-string-like-e1-or-m1", 
      "question": "The question text.",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0, 
      "explanation": "A brief explanation of why this is the correct answer.",
      "difficulty": "easy" 
    }
    
    Replace "easy" with "medium" or "hard" in the difficulty field as appropriate.
    Ensure each "id" is unique.
    CRITICAL: "correctAnswer" MUST be the zero-based index of the correct option.
    Do not include any text or backticks before or after the JSON object.
  `;

  try {
    if (!modelsAPI) {
      throw new Error("Google AI Models API client is not initialized.");
    }
    const result = await modelsAPI.generateContent({
      model: modelName,
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { 
        // --- THIS WAS THE ERROR ---
        responseMimeType: "application/json" // Fixed: Was "responseMdimeType"
      },
    });

    const response = result.response || result;
    const candidates = response.candidates;

    if (!candidates || candidates.length === 0 || !candidates[0].content?.parts?.[0]?.text) {
      console.error("❌ Unexpected response structure from Gemini API:", JSON.stringify(response, null, 2));
      throw new Error("Failed to parse response from AI model.");
    }
    
    let jsonText = candidates[0].content.parts[0].text;
    
    // --- ADDED LOGGING ---
    console.log("Raw JSON text from Gemini:", jsonText);

    // Clean up potential markdown fences, just in case
    jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();

    const questionPool = JSON.parse(jsonText); // This is where the error happened
    
    if (!questionPool.easy || !questionPool.medium || !questionPool.hard || 
        !Array.isArray(questionPool.easy) || !Array.isArray(questionPool.medium) || !Array.isArray(questionPool.hard)) {
      throw new Error("Generated JSON pool is missing easy/medium/hard arrays.");
    }
    
    const ensureIds = (arr, prefix) => arr.map((q, i) => ({ ...q, id: q.id || `${prefix}${i}-${uuidv4()}` }));
    questionPool.easy = ensureIds(questionPool.easy, 'e');
    questionPool.medium = ensureIds(questionPool.medium, 'm');
    questionPool.hard = ensureIds(questionPool.hard, 'h');

    shuffleArray(questionPool.easy);
    shuffleArray(questionPool.medium);
    shuffleArray(questionPool.hard);

    console.log(`✅ Successfully generated and shuffled pool: ${questionPool.easy.length} easy, ${questionPool.medium.length} medium, ${questionPool.hard.length} hard.`);
    return questionPool;

  } catch (error) {
    // This catch block is what's sending the error to your frontend
    console.error('❌ Error generating quiz pool from Gemini:', error.message);
    const detail = error.response?.data?.error?.message || error.message;
    throw new Error(`Failed to generate quiz pool from AI model: ${detail}`);
  }
}

// -----------------------------------------------------------------
// 3. QUIZ SESSION STORAGE
// -----------------------------------------------------------------
const quizSessions = {};

const sanitizeQuestion = (question) => {
    if (!question) return null;
    const { correctAnswer, explanation, ...clientQuestion } = question;
    return clientQuestion;
};


// -----------------------------------------------------------------
// 4. NEW ROUTE: START QUIZ
// -----------------------------------------------------------------
router.post('/start', async (req, res) => {
  console.log('🎯 /api/quiz/start endpoint was hit!');
  
  const { part } = req.body;
  if (!part) {
    return res.status(400).json({ success: false, error: 'Missing "part" (topic).' });
  }

  if (!modelsAPI) {
    return res.status(503).json({ success: false, error: 'Service unavailable: API Key/Model API failed to initialize.' });
  }

  try {
    // This function is the one that was failing
    const questionPool = await generateQuizPool(part);

    const quizId = uuidv4();
    const session = {
      quizId,
      part,
      pool: questionPool,
      currentDifficulty: 'easy', 
      poolIndex: { easy: 0, medium: 0, hard: 0 },
      score: 0,
      questionsAnswered: 0,
      totalQuestions: 5,
      lastQuestion: null,
    };

    const firstQuestion = session.pool.easy[session.poolIndex.easy];
    session.poolIndex.easy++;
    session.lastQuestion = firstQuestion;
    session.questionsAnswered = 1;
    
    console.log(`[Quiz ${quizId}] Starting quiz. Allotting first question (easy).`);

    quizSessions[quizId] = session;

    res.json({
      success: true,
      quizId,
      question: sanitizeQuestion(firstQuestion),
      questionNumber: session.questionsAnswered,
      totalQuestions: session.totalQuestions
    });

  } catch (error) {
    // If generateQuizPool throws an error, this catch block runs
    console.error('❌ Error in /api/quiz/start:', error.message);
    // This sends the 500 error to the frontend
    res.status(500).json({ success: false, error: error.message });
  }
});


// -----------------------------------------------------------------
// 5. NEW ROUTE: SUBMIT ANSWER
// -----------------------------------------------------------------
router.post('/answer', (req, res) => {
  console.log('🎯 /api/quiz/answer endpoint was hit!');
  const { quizId, questionId, answerIndex } = req.body;

  if (!quizId || !questionId || answerIndex === undefined) {
    return res.status(400).json({ success: false, error: 'Missing quizId, questionId, or answerIndex.' });
  }

  const session = quizSessions[quizId];
  if (!session) {
    return res.status(404).json({ success: false, error: 'Quiz session not found or has expired.' });
  }

  const lastQuestion = session.lastQuestion;
  if (lastQuestion.id !== questionId) {
    return res.status(400).json({ success: false, error: 'Question ID mismatch. Out of sync?' });
  }

  const isCorrect = (lastQuestion.correctAnswer === answerIndex);
  if (isCorrect) {
    session.score++;
  }
  console.log(`[Quiz ${quizId}] User answered question ${session.questionsAnswered} (${lastQuestion.difficulty}). Correct: ${isCorrect}`);

  const result = {
    isCorrect,
    correctAnswer: lastQuestion.correctAnswer,
    explanation: lastQuestion.explanation,
  };

  if (session.questionsAnswered >= session.totalQuestions) {
    console.log(`[Quiz ${quizId}] Quiz finished. Score: ${session.score}/${session.totalQuestions}`);
    delete quizSessions[quizId];
    return res.json({
      success: true,
      quizOver: true,
      result,
      finalScore: session.score,
      totalQuestions: session.totalQuestions
    });
  }

  let nextDifficulty;
  if (isCorrect) {
    if (session.currentDifficulty === 'easy') nextDifficulty = 'medium';
    else if (session.currentDifficulty === 'medium') nextDifficulty = 'hard';
    else nextDifficulty = 'hard'; 
  } else {
    nextDifficulty = 'easy';
  }
  
  console.log(`[Quiz ${quizId}] Logic: Answer was ${isCorrect ? 'Correct' : 'Incorrect'}. Current difficulty: ${session.currentDifficulty}. Attempting to allot next: ${nextDifficulty}`);

  let nextQuestion = null;
  let pool = session.pool[nextDifficulty];
  let index = session.poolIndex[nextDifficulty];

  if (index < pool.length) {
    nextQuestion = pool[index];
    session.poolIndex[nextDifficulty]++; 
    console.log(`[Quiz ${quizId}] ✅ Allotted ${nextDifficulty} question #${index} from pool.`);
  } else {
    console.warn(`[Quiz ${quizId}] ⚠️ Pool for '${nextDifficulty}' exhausted (index ${index} >= ${pool.length}). Falling back to 'easy'.`);
    nextDifficulty = 'easy';
    pool = session.pool.easy;
    index = session.poolIndex.easy;

    if (index >= pool.length) {
      console.warn(`[Quiz ${quizId}] ⚠️ Easy pool also exhausted. Wrapping around to easy[0].`);
      session.poolIndex.easy = 0;
      index = 0;
    }
    
    nextQuestion = pool[index];
    session.poolIndex.easy++; 
    console.log(`[Quiz ${quizId}] ✅ Allotted fallback easy question #${index}.`);
  }

  session.currentDifficulty = nextDifficulty; 
  session.questionsAnswered++;
  session.lastQuestion = nextQuestion; 

  res.json({
    success: true,
    quizOver: false,
    result, 
    question: sanitizeQuestion(nextQuestion), 
    questionNumber: session.questionsAnswered,
    totalQuestions: session.totalQuestions
  });
});

export default router;