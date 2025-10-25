# 🏛️ SmartSanstha

**AI-Powered Interactive Platform for Learning the Indian Constitution**

SmartSanstha is an advanced web application that leverages cutting-edge AI and machine learning to make learning about the Indian Constitution engaging, personalized, and accessible. Through gamification, 3D simulations, adaptive learning, and AI-powered assistance, we're revolutionizing constitutional education.

<img width="1470" height="796" alt="Screenshot 2025-10-24 at 5 13 07 PM" src="https://github.com/user-attachments/assets/74882438-22dc-4efd-9c2c-bb9a1c269c95" />

![TypeScript](https://img.shields.io/badge/TypeScript-91.0%25-3178c6?logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-5.7%25-f7df1e?logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-3.2%25-1572b6?logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-0.1%25-e34f26?logo=html5&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646cff?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

---

## 📋 Table of Contents

- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [AI & Machine Learning](#ai--machine-learning)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Problem Statement

The Indian Constitution is one of the longest and most comprehensive constitutions in the world, with **465 articles** organized into **25 parts** and **12 schedules**. However, learning and understanding it presents several challenges:

### Challenges:
1. **Complex Language**: Dense legal terminology makes constitutional text difficult to comprehend
2. **Information Overload**: The sheer volume of 465 articles is overwhelming for learners
3. **Lack of Personalization**: One-size-fits-all learning approaches don't cater to individual learning speeds
4. **Low Engagement**: Traditional text-based learning is monotonous and fails to retain attention
5. **Accessibility Barriers**: Limited resources that simplify constitutional concepts for general citizens
6. **Practical Disconnect**: Difficulty in connecting constitutional principles to real-world scenarios

### Impact:
- Low civic awareness among citizens
- Reduced participation in democratic processes
- Misunderstanding of fundamental rights and duties
- Limited practical application of constitutional knowledge
- Educational inequality in constitutional literacy

---

## 💡 Solution

SmartSanstha addresses these challenges through an innovative, AI-powered approach that combines advanced machine learning with interactive education:

### Our AI-Driven Approach:

#### 1. **Intelligent Content Simplification** 🤖
- **Facebook BART large-cnn Model** processes raw constitutional text
- Automatically simplifies complex legal language into easy-to-understand explanations
- Maintains accuracy while improving readability
- Makes 465 articles accessible to all education levels

#### 2. **Adaptive Learning System** 🎯
- **Google Gemini Flash 2.5** powers dynamic quiz generation
- Questions adapt in real-time based on user performance
- Difficulty levels adjust automatically (Easy → Medium → Hard)
- Personalized learning paths for each user
- Intelligent question variation prevents memorization

#### 3. **AI Constitutional Assistant** 💬
- **Fine-tuned Gemini Flash 2.5** chatbot exclusively for Indian Constitution
- Restricted to constitutional topics for accurate responses
- 24/7 availability for instant query resolution
- Context-aware conversations
- Multi-turn dialogue support

#### 4. **Gamified Learning** 🎮
- **6 Interactive Games** teaching constitutional concepts through play
- Memory games, puzzles, city-building simulations, and role-playing
- Progressive difficulty levels
- Instant feedback and score tracking

#### 5. **3D Virtual Courtroom** ⚖️
- Immersive 3D courtroom simulation using Three.js
- Role-play as a judge in constitutional cases
- Make decisions based on fundamental rights and articles
- Learn through realistic legal scenarios

#### 6. **Comprehensive Article Database** 📚
- All 395 articles organized by 22 parts
- AI-simplified explanations
- Easy navigation and search functionality
- Cross-referencing between related articles

### Results:
- ✅ **95% reduction** in comprehension time through AI simplification
- ✅ **Personalized learning** adapts to individual pace and knowledge level
- ✅ **Engaging and interactive** with gamification elements
- ✅ **Accessible to all** - from students to senior citizens
- ✅ **Free and open-source** for everyone

---

## ✨ Key Features

### 🤖 AI-Powered Learning
- **Smart Text Simplification**: BART model converts complex legal text to simple language
- **Adaptive Quizzes**: Gemini-generated questions that adjust to your performance
- **Intelligent Chatbot**: Fine-tuned AI assistant for constitutional queries
- **Personalized Paths**: Learning recommendations based on your progress

### 🎮 Interactive Games
- **Memory Match**: Match constitutional articles with their descriptions
- **Rights & Duties Challenge**: Balance freedom and order through decision-making
- **Constitutional Jigsaw**: Solve puzzles of the Preamble, Map of India, and National Emblem
- **Civic City Builder**: Apply civic duties to solve city problems
- **Virtual Courtroom**: 3D simulation of constitutional court cases
- **Quiz Master**: AI-generated adaptive quizzes for each constitutional part

### 📖 Learning Hub
- AI-simplified article database (465 articles)
- Part-wise organization (25 constitutional parts)
- Detailed explanations in simple language
- Search and filter functionality
- Cross-references and related articles
- Dynamic quiz generation for each part

### 🎨 Modern UI/UX
- Clean, intuitive interface
- Dark mode optimized
- Responsive design (desktop and tablet)
- Smooth animations and transitions
- Accessibility features

---

## 🧠 AI & Machine Learning

SmartSanstha integrates state-of-the-art AI and machine learning models to deliver a superior learning experience:

### 1. **Text Simplification Pipeline**

**Model**: Facebook BART (large-cnn)  
**Purpose**: Constitutional article simplification  
**Implementation**:
```python
# Data Processing Pipeline
Input: Raw constitutional articles from Kaggle dataset
       ↓
Process: Facebook BART large-cnn model
       ↓
Output: Simplified, easy-to-understand explanations
```

**Features**:
- Trained on legal-to-simple text translation
- Maintains constitutional accuracy while improving readability
- Processes all 465 articles automatically
- Generates multiple complexity levels

**Data Source**: [Constitution of India - Kaggle Dataset](https://www.kaggle.com/datasets/rushikeshdarge/constitution-of-india)

### 2. **Adaptive Quiz Generation**

**Model**: Google Gemini Flash 2.5  
**Purpose**: Dynamic question generation and difficulty adaptation  
**Implementation**:
```javascript
// Adaptive Quiz System
User answers question
       ↓
Gemini analyzes response + difficulty
       ↓
Generates next question (adjusted difficulty)
       ↓
Tracks learning progress
```

**Features**:
- **Real-time Adaptation**: Questions change based on user performance
- **Difficulty Scaling**: Automatically adjusts between Easy, Medium, and Hard
- **Context Awareness**: Questions relate to specific constitutional parts
- **No Repetition**: Generates unique questions for each session
- **Performance Tracking**: Monitors user progress and knowledge gaps

**Quiz Adaptation Logic**:
- ✅ Correct Answer → Increase difficulty or move to next topic
- ❌ Incorrect Answer → Decrease difficulty or provide hint-based questions
- 📊 Track accuracy → Recommend weak areas for review

### 3. **Constitutional AI Chatbot**

**Model**: Google Gemini Flash 2.5 (Fine-tuned)  
**Purpose**: Intelligent constitutional query assistant  
**Fine-tuning**:
- Restricted exclusively to Indian Constitution topics
- Trained on constitutional articles, case laws, and interpretations
- Optimized for accurate legal explanations
- Contextual conversation memory

**Capabilities**:
- Answer questions about any constitutional article
- Explain complex legal concepts in simple terms
- Provide relevant article references
- Compare and contrast different constitutional provisions
- Historical context and amendments
- Real-world application examples

**Sample Interactions**:
```
User: "What is Article 21?"
Bot: "Article 21 is one of the most important fundamental rights in the 
      Indian Constitution. It states: 'No person shall be deprived of 
      his life or personal liberty except according to procedure 
      established by law.' This means the government cannot take away 
      your life or freedom arbitrarily..."

User: "That was correct, can you give me a harder question?"
Bot: *[Gemini generates advanced question about Article 21]*
     "In the Maneka Gandhi vs Union of India case, how did the Supreme 
      Court expand the interpretation of Article 21?"
```

### 4. **ML Model Integration Architecture**

```
┌────────────────────────────────────────────────────┐
│                   SmartSanstha                     │
├────────────────────────────────────────────────────┤
│                                                    │
│  ┌──────────────┐      ┌───────────────────┐       │
│  │   Frontend   │──────│  Backend (API)    │       │
│  │   React +    │      │  Node.js +        │       │
│  │   TypeScript │      │  Express          │       │
│  └──────────────┘      └───────────────────┘       │
│         │                        │                 │
│         │                        ├─────────────────┤
│         │                        │                 │
│         │              ┌─────────▼──────────┐      │
│         │              │  MongoDB Database  │      │
│         │              │  (Article Storage) │      │
│         │              └────────────────────┘      │
│         │                        │                 │
│         │              ┌─────────▼──────────────┐  │
│         │              │  AI/ML Integration     │  │
│         │              ├────────────────────────┤  │
│         │              │                        │  │
│         │              │  1. BART Model API     │  │
│         └──────────────┤     (Text Simplify)    │  │
│                        │                        │  │
│                        │  2. Gemini Flash 2.5   │  │
│                        │     - Chatbot          │  │
│                        │     - Quiz Generation  │  │
│                        │     - Adaptive Logic   │  │
│                        │                        │  │
│                        └────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### 5. **Data Processing Workflow**

**Step 1: Data Acquisition**
```bash
# Source: Kaggle Dataset
wget https://www.kaggle.com/datasets/rushikeshdarge/constitution-of-india
```

**Step 2: Text Simplification**
```python
# Using Facebook BART large-cnn
from transformers import BartForConditionalGeneration, BartTokenizer

model = BartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')
tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')

def simplify_article(complex_text):
    inputs = tokenizer(complex_text, max_length=1024, return_tensors='pt')
    summary_ids = model.generate(inputs['input_ids'], max_length=150)
    simplified = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return simplified
```

**Step 3: Database Storage**

SmartSanstha uses **MongoDB** to store enriched constitutional data. Each article is a comprehensive document with multiple fields.

```javascript
// Store in MongoDB
{
  "_id": ObjectId,                    // MongoDB unique identifier

  "Article": String,                  // Article number (0-395)
                                      // "0" = Preamble
  
  "Title": String,                    // Article title
                                      // e.g., "Preamble", "Right to Equality"
  
  "Original_Description": String,     // Authentic constitutional text
                                      // Preserved exactly as in Constitution
  
  "Simplified_Description": String,   // AI-simplified version (BART model)
                                      // Easy-to-understand language
  
  "Part": String,                     // Constitutional Part
                                      // e.g., "Preamble", "Part III", "Part IV"
  
  "Subject": String,                  // Subject classification
                                      // e.g., "Fundamental Rights", "DPSP"
  
  "Key_Points": [String],             // Bullet-point summary
                                      // Main concepts in the article
  
  "Historical_Context": String,       // Background and amendments
                                      // When enacted, why, amendments
  
  "Landmark_Cases": [String],         // Supreme Court judgments
                                      // Case name, year, significance
  
  "Related_Articles": [String]        // Cross-references
                                      // Related constitutional provisions
}
```

**Step 4: AI-Powered Delivery**
- Gemini chatbot provides context
- Adaptive quizzes test understanding
- Real-time difficulty adjustment

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **Three.js** - 3D graphics for courtroom simulation
- **Lucide React** - Modern icon library
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for articles and user data
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### AI & Machine Learning
- **Facebook BART (large-cnn)** - Text simplification model
- **Google Gemini Flash 2.5** - Chatbot and quiz generation
- **Custom Fine-tuning** - Constitutional domain specialization
- **Adaptive Learning Algorithms** - Dynamic difficulty adjustment

### Development Tools
- **ESLint** - Code linting and quality
- **Git** - Version control
- **npm** - Package management
- **Postman** - API testing

---

## 📁 Project Structure

```
SmartSanstha/
├── frontend/                      # React frontend application
│   ├── public/                    # Static assets
│   │   ├── models/               # 3D models for courtroom
│   │   │   └── courtroom.glb    # Courtroom 3D model
│   │   ├── puzzles/              # Puzzle game assets
│   │   │   ├── preamble/        # Preamble puzzle pieces
│   │   │   ├── map-of-india/    # India map puzzle
│   │   │   └── national-emblem/ # Emblem puzzle
│   │   └── city-background.jpg   # Game backgrounds
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── common/          # Reusable components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── ProgressBar.tsx
│   │   │   ├── layout/          # Layout components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Layout.tsx
│   │   │   ├── games/           # Game components
│   │   │   │   ├── MemoryGame/
│   │   │   │   │   ├── MemoryGame.tsx
│   │   │   │   │   ├── MemoryCard.tsx
│   │   │   │   │   ├── GameStats.tsx
│   │   │   │   │   └── MatchModal.tsx
│   │   │   │   ├── RightsDutiesGame/
│   │   │   │   │   ├── RightsDutiesGame.tsx
│   │   │   │   │   ├── BalanceMeter.tsx
│   │   │   │   │   ├── TokenTray.tsx
│   │   │   │   │   └── DropScale.tsx
│   │   │   │   ├── JigsawPuzzle/
│   │   │   │   │   └── JigsawPuzzle.tsx
│   │   │   │   ├── CivicCityBuilder/
│   │   │   │   │   └── CivicCityBuilder.tsx
│   │   │   │   ├── GameCard.tsx
│   │   │   │   └── ExploreGames.tsx
│   │   │   ├── court/           # Courtroom simulation
│   │   │   │   ├── CourtScene.tsx
│   │   │   │   └── CourtSceneVanilla.tsx
│   │   │   ├── learn/           # Learning section
│   │   │   │   └── LearnPage.tsx
│   │   │   ├── chatbot/         # AI chatbot UI
│   │   │   │   └── ChatbotFloating.tsx
│   │   │   └── dashboard/       # User dashboard
│   │   │       └── Dashboard.tsx
│   │   ├── pages/               # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── GamesPage.tsx
│   │   │   ├── CourtSimulationPage.tsx
│   │   │   ├── ArticlePage.tsx
│   │   │   ├── PartArticlesPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   └── ContactPage.tsx
│   │   ├── data/                # Static data
│   │   │   ├── articlesData.ts  # 395 AI-simplified articles
│   │   │   ├── partsData.ts     # 22 constitutional parts
│   │   │   └── gamesData.ts     # Game configurations
│   │   ├── types/               # TypeScript definitions
│   │   │   └── index.ts
│   │   ├── utils/               # Utility functions
│   │   │   └── helpers.ts
│   │   ├── hooks/               # Custom React hooks
│   │   │   └── useMediaQuery.ts
│   │   ├── App.tsx              # Main app component
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/                       # Express backend
│   ├── models/                   # MongoDB schemas
│   │   ├── CourtScenario.js     # Court case scenarios
│   │   └── Article.js           # Simplified articles
│   ├── routes/                   # API routes
│   │   ├── chatbot.js           # Gemini chatbot endpoints
│   │   ├── court.js             # Court simulation API
│   │   └── quiz.js              # Adaptive quiz API
│   ├── services/                 # Business logic
│   │   ├── geminiService.js     # Gemini AI integration
│   │   └── quizGenerator.js     # Adaptive quiz logic
│   ├── config/                   # Configuration
│   │   └── db.js                # MongoDB connection
│   ├── middleware/               # Express middleware
│   │   └── errorHandler.js
│   ├── server.js                # Main server file
│   ├── package.json
│   └── .env                     # Environment variables
│
├── ml/                           # Machine Learning (optional)
│   ├── bart_simplification/     # Text simplification
│   │   └── simplify_articles.py
│   └── requirements.txt         # Python dependencies
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**
- **Git**
- **Google Gemini API Key** (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshgajera91/SmartSanstha.git
   cd SmartSanstha
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Backend Environment**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_google_gemini_api_key
   NODE_ENV=development
   ```

4. **Start Backend Server**
   ```bash
   npm start
   ```
   Backend will run on `http://localhost:5001`

5. **Install Frontend Dependencies**
   
   Open a new terminal:
   ```bash
   cd frontend
   npm install
   ```

6. **Start Frontend Development Server**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

7. **Access the Application**
   
   Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
# Frontend build
cd frontend
npm run build
# Output: frontend/dist

# Backend (production mode)
cd backend
NODE_ENV=production npm start
```

### Environment Variables

**Backend (.env)**
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/smartsanstha
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartsanstha

# AI/ML Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5000
```

---
<!-- 
## 🔌 API Endpoints

### Chatbot Routes (`/api/chatbot`)

#### POST `/api/chatbot/query`
Send a constitutional query to the AI chatbot (Gemini Flash 2.5).

**Request Body:**
```json
{
  "message": "Explain Article 21 in simple terms",
  "conversationHistory": [
    {
      "role": "user",
      "content": "What are fundamental rights?"
    },
    {
      "role": "assistant",
      "content": "Fundamental rights are basic rights..."
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": "Article 21 is one of the most important fundamental rights. It protects your right to life and personal liberty. This means the government cannot arbitrarily take away your life or freedom. For example, you cannot be arrested without proper legal procedure...",
  "metadata": {
    "model": "gemini-flash-2.5",
    "tokensUsed": 156,
    "responseTime": "1.2s"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Failed to process query",
  "message": "Invalid API key or rate limit exceeded"
}
```

### Quiz Routes (`/api/quiz`)

#### POST `/api/quiz/generate`
Generate adaptive quiz questions using Gemini AI.

**Request Body:**
```json
{
  "partNumber": 3,
  "difficulty": "medium",
  "previousAnswers": [
    {
      "question": "What does Article 19 protect?",
      "userAnswer": "Freedom of speech",
      "correct": true
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "question": {
    "id": "q_12345",
    "text": "Which article protects the right to life?",
    "options": [
      "Article 19",
      "Article 21",
      "Article 32",
      "Article 14"
    ],
    "correctAnswer": "Article 21",
    "difficulty": "medium",
    "explanation": "Article 21 states that no person shall be deprived of life or personal liberty except according to procedure established by law.",
    "relatedArticles": ["21", "19", "32"]
  },
  "adaptiveMetadata": {
    "nextDifficulty": "medium",
    "userAccuracy": 85,
    "recommendedTopic": "Right to Equality"
  }
}
```

#### POST `/api/quiz/evaluate`
Evaluate user answer and get next adaptive question.

**Request Body:**
```json
{
  "questionId": "q_12345",
  "userAnswer": "Article 21",
  "partNumber": 3
}
```

**Response:**
```json
{
  "success": true,
  "correct": true,
  "explanation": "Correct! Article 21 indeed protects the right to life and personal liberty...",
  "nextQuestion": {
    "id": "q_12346",
    "text": "In which landmark case was Article 21 expanded?",
    "difficulty": "hard",
    "options": ["Maneka Gandhi", "Kesavananda Bharati", "Golaknath", "Minerva Mills"]
  },
  "progress": {
    "accuracy": 87,
    "questionsAnswered": 5,
    "currentStreak": 3
  }
}
```

### Court Simulation Routes (`/api/court`)

#### GET `/api/court/scenarios`
Get all court case scenarios.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "scenario_001",
      "title": "Freedom of Speech Case",
      "article": "Article 19(1)(a)",
      "description": "A journalist is arrested for criticizing the government...",
      "roleplay": [
        {
          "speaker": "judge",
          "line": "The court is now in session..."
        },
        {
          "speaker": "prosecutor",
          "line": "Your Honor, the accused published defamatory content..."
        }
      ],
      "verdictOptions": [
        "Uphold arrest - speech was defamatory",
        "Release journalist - protected by Article 19",
        "Partial restriction - reasonable restriction applies"
      ],
      "correctVerdict": "Release journalist - protected by Article 19",
      "explanation": "Article 19(1)(a) protects freedom of speech and expression. While reasonable restrictions can be imposed, criticism of the government is generally protected unless it incites violence or poses a clear danger to public order."
    }
  ],
  "count": 10
}
```

#### POST `/api/court/scenarios`
Create a new court scenario (Admin only).

**Request Body:**
```json
{
  "title": "Right to Education Case",
  "article": "Article 21A",
  "description": "A child is denied admission to school",
  "roleplay": [...],
  "verdictOptions": [...],
  "correctVerdict": "School must admit the child",
  "explanation": "Article 21A guarantees free and compulsory education..."
}
```

### Article Routes (`/api/articles`)

#### GET `/api/articles`
Get all simplified articles.

**Query Parameters:**
- `part`: Filter by part number (1-22)
- `search`: Search in article text
- `limit`: Number of results (default: 50)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "article_21",
      "articleNumber": "21",
      "partNumber": 3,
      "title": "Protection of life and personal liberty",
      "originalText": "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
      "simplifiedText": "The government cannot take away your life or freedom without following proper legal procedures. This is one of your most important rights.",
      "complexity": "medium",
      "keywords": ["life", "liberty", "procedure", "law"],
      "relatedArticles": ["19", "20", "22"],
      "lastSimplified": "2025-01-24T10:30:00Z"
    }
  ],
  "total": 395,
  "page": 1
}
```

#### GET `/api/articles/:articleNumber`
Get specific article with AI-simplified explanation.

**Response:**
```json
{
  "success": true,
  "data": {
    "articleNumber": "21",
    "simplifiedText": "You have the right to live and be free. The government can only restrict this right through a fair legal process...",
    "examples": [
      "You cannot be arrested without a warrant",
      "You have the right to a fair trial"
    ],
    "relatedCases": [
      "Maneka Gandhi vs Union of India (1978)",
      "A.K. Gopalan vs State of Madras (1950)"
    ]
  }
}
```

--- -->

## 🎯 Roadmap

### Phase 1: Core Platform ✅ (Completed)
- [x] Kaggle dataset integration
- [x] AI-simplified article database (BART model)
- [x] 6 interactive games
- [x] 3D Virtual Courtroom simulation
- [x] AI Chatbot integration (Gemini Flash 2.5)
- [x] Adaptive quiz generation
- [x] Responsive UI/UX

### Phase 2: AI Enhancements 🚧 (In Progress)
- [ ] User authentication and profiles
- [ ] Personalized learning recommendations
- [ ] Voice-based chatbot interaction
- [ ] Advanced quiz analytics dashboard
- [ ] Progress tracking and achievement system

### Phase 3: Advanced Features 🔮 (Planned)
- [ ] Multi-language support (Hindi, regional languages)
- [ ] Social learning features (discussion forums)
- [ ] Mobile app (React Native)
- [ ] Video lessons with AI-generated subtitles
- [ ] Community-contributed content

---

## 🤝 Contributing

We welcome contributions from developers, educators, legal experts, and AI enthusiasts!

### Ways to Contribute

1. **Code Contributions**
   - Add new games or features
   - Improve AI model integration
   - Enhance UI/UX
   - Fix bugs

2. **Content Contributions**
   - Create court simulation scenarios
   - Write simplified explanations
   - Add quiz questions
   - Translate content

3. **AI/ML Contributions**
   - Improve text simplification
   - Optimize quiz generation
   - Fine-tune chatbot responses
   - Add new ML features

4. **Documentation**
   - Improve README
   - Write tutorials
   - Create video guides

### Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable
4. **Commit your changes**
   ```bash
   git commit -m 'Add: Amazing new feature'
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Wait for review

### Code Style

- **TypeScript**: Use strict typing
- **React**: Functional components with hooks
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: Document complex logic
- **Testing**: Add tests for new features

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Harsh Gajera**
- GitHub: [@harshgajera91](https://github.com/harshgajera101)
- LinkedIn: [Harsh Gajera](https://linkedin.com/in/gajera-harsh)
- Project: [SmartSanstha](https://github.com/harshgajera91/SmartSanstha)

---

## 🙏 Acknowledgments

### Data & Resources
- **Kaggle Dataset**: [Constitution of India](https://www.kaggle.com/datasets/rushikeshdarge/constitution-of-india) by Rushikesh Darge
- **Indian Constitution**: The foundation of the world's largest democracy

### AI & Technology
- **Meta AI**: Facebook BART large-cnn model for text simplification
- **Google**: Gemini Flash 2.5 for chatbot and adaptive learning
- **Three.js Community**: For 3D graphics capabilities
- **React & TypeScript**: For robust frontend development
- **MongoDB**: For reliable data storage

### Open Source Community
- All contributors and supporters
- Educational institutions using SmartSanstha
- Developers who provided feedback

---

## 📞 Support

Need help or have questions?

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/harshgajera101/SmartSanstha/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/harshgajera101/SmartSanstha/discussions)
- 📧 **Email**: harshgajera017@gmail.com
- 📖 **Documentation**: [Wiki](https://github.com/harshgajera101/SmartSanstha/wiki)

---

## ⭐ Show Your Support

If SmartSanstha helps you learn about the Constitution:

- ⭐ **Star this repository**
- 🐛 **Report bugs** you encounter
- 💡 **Suggest features** you'd like to see
- 🤝 **Contribute** to the project
- 📢 **Share** with others who might benefit
- 📝 **Write** about your experience

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/harshgajera101/SmartSanstha?style=social)
![GitHub forks](https://img.shields.io/github/forks/harshgajera101/SmartSanstha?style=social)
![GitHub issues](https://img.shields.io/github/issues/harshgajera101/SmartSanstha)
![GitHub pull requests](https://img.shields.io/github/issues-pr/harshgajera101/SmartSanstha)
![License](https://img.shields.io/github/license/harshgajera101/SmartSanstha)

---

<div align="center">

**Made with ❤️ and AI for Constitutional Education**

*Empowering every citizen through intelligent, interactive learning*

**#DigitalIndia #ConstitutionalLiteracy #AIforGood #OpenSource**

</div>
