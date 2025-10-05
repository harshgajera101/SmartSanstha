// import React, { useState } from 'react';
// import { 
//   BookOpen, 
//   FileText, 
//   Lightbulb, 
//   Scale, 
//   ChevronRight, 
//   CheckCircle, 
//   XCircle,
//   Award,
//   RotateCcw,
//   Share2,
//   Bookmark,
//   ArrowLeft,
//   Sparkles,
//   Info,
//   BookMarked,
//   Brain,
//   Target
// } from 'lucide-react';
// import { Card } from '../components/common/Card';
// import { Button } from '../components/common/Button';
// import { ProgressBar } from '../components/common/ProgressBar';

// interface ArticlePageProps {
//   onNavigate: (page: string) => void;
// }

// // Demo Article Data - Replace with actual data from props/API
// const articleData = {
//   articleNumber: 'Article 21',
//   articleName: 'Protection of Life and Personal Liberty',
//   part: {
//     number: 3,
//     name: 'Fundamental Rights',
//     category: 'fundamental-rights'
//   },
//   simplifiedDescription: `Article 21 is one of the most important articles in the Indian Constitution. It guarantees that no person shall be deprived of their life or personal liberty except according to a procedure established by law. This means the government cannot take away your life or freedom without following proper legal procedures.

// This article has been interpreted very broadly by the Supreme Court to include many other rights like the right to live with dignity, right to education, right to privacy, right to clean environment, and many more. It's the foundation of human rights protection in India.

// In simple terms: Your life and freedom are protected, and the government must follow fair rules before taking any action against you.`,
//   originalText: `No person shall be deprived of his life or personal liberty except according to procedure established by law.`,
//   keyPoints: [
//     'Protects both life and personal liberty',
//     'Government must follow due process of law',
//     'Interpreted to include right to live with dignity',
//     'Covers various derived rights like privacy, education, clean environment',
//     'Can be enforced through Article 32 (Right to Constitutional Remedies)'
//   ],
//   historicalContext: `Article 21 was initially interpreted narrowly, but the landmark Maneka Gandhi vs Union of India case (1978) expanded its scope significantly. The Supreme Court held that the procedure must be fair, just, and reasonable, not arbitrary. This interpretation transformed Article 21 into the most expansive fundamental right.`,
//   landmarkCases: [
//     {
//       name: 'Maneka Gandhi vs Union of India (1978)',
//       significance: 'Expanded the scope of Article 21 to include fair and reasonable procedure'
//     },
//     {
//       name: 'Kharak Singh vs State of UP (1963)',
//       significance: 'Right to privacy first discussed under Article 21'
//     },
//     {
//       name: 'Olga Tellis vs Bombay Municipal Corporation (1985)',
//       significance: 'Right to livelihood is part of right to life'
//     }
//   ],
//   relatedArticles: [
//     { number: 'Article 14', name: 'Equality before Law' },
//     { number: 'Article 19', name: 'Freedom of Speech and Expression' },
//     { number: 'Article 32', name: 'Right to Constitutional Remedies' }
//   ],
//   quiz: [
//     {
//       id: 1,
//       question: 'What does Article 21 protect?',
//       options: [
//         'Right to property',
//         'Life and personal liberty',
//         'Freedom of religion',
//         'Right to education only'
//       ],
//       correctAnswer: 1,
//       explanation: 'Article 21 protects the right to life and personal liberty, which has been interpreted broadly by the Supreme Court.'
//     },
//     {
//       id: 2,
//       question: 'Which landmark case expanded the scope of Article 21?',
//       options: [
//         'Kesavananda Bharati case',
//         'Maneka Gandhi vs Union of India',
//         'Shah Bano case',
//         'Minerva Mills case'
//       ],
//       correctAnswer: 1,
//       explanation: 'The Maneka Gandhi vs Union of India (1978) case was a landmark judgment that greatly expanded the interpretation of Article 21.'
//     },
//     {
//       id: 3,
//       question: 'Can the government deprive someone of life or liberty?',
//       options: [
//         'Yes, at any time',
//         'No, never',
//         'Yes, but only through fair and reasonable legal procedure',
//         'Only during emergencies'
//       ],
//       correctAnswer: 2,
//       explanation: 'The government can deprive someone of life or liberty, but only through a fair, just, and reasonable procedure established by law.'
//     },
//     {
//       id: 4,
//       question: 'Which of these rights has been derived from Article 21?',
//       options: [
//         'Right to vote',
//         'Right to privacy',
//         'Right to property',
//         'Right to form associations'
//       ],
//       correctAnswer: 1,
//       explanation: 'The Supreme Court has interpreted Article 21 to include the right to privacy, along with many other rights like right to education and right to clean environment.'
//     },
//     {
//       id: 5,
//       question: 'Article 21 is part of which part of the Constitution?',
//       options: [
//         'Part II - Citizenship',
//         'Part III - Fundamental Rights',
//         'Part IV - Directive Principles',
//         'Part V - The Union'
//       ],
//       correctAnswer: 1,
//       explanation: 'Article 21 is part of Part III of the Constitution, which deals with Fundamental Rights.'
//     }
//   ]
// };

// export const ArticlePage: React.FC<ArticlePageProps> = ({ onNavigate }) => {
//   const [activeTab, setActiveTab] = useState<'simplified' | 'original'>('simplified');
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
//   const [showResults, setShowResults] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   const handleAnswerSelect = (answerIndex: number) => {
//     const newAnswers = [...selectedAnswers];
//     newAnswers[currentQuestion] = answerIndex;
//     setSelectedAnswers(newAnswers);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < articleData.quiz.length - 1) {
//       setCurrentQuestion(prev => prev + 1);
//     } else {
//       setShowResults(true);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(prev => prev - 1);
//     }
//   };

//   const calculateScore = () => {
//     let correct = 0;
//     selectedAnswers.forEach((answer, index) => {
//       if (answer === articleData.quiz[index].correctAnswer) {
//         correct++;
//       }
//     });
//     return correct;
//   };

//   const resetQuiz = () => {
//     setCurrentQuestion(0);
//     setSelectedAnswers([]);
//     setShowResults(false);
//   };

//   const getCategoryColor = (category: string) => {
//     const colors: { [key: string]: string } = {
//       'fundamental-rights': 'from-blue-500 to-cyan-500',
//       'directive-principles': 'from-purple-500 to-pink-500',
//       'union': 'from-orange-500 to-red-500',
//       'other': 'from-green-500 to-emerald-500',
//     };
//     return colors[category] || 'from-orange-500 to-red-500';
//   };

//   return (
//     <div className="w-full max-w-6xl animate-fade-in">
//       {/* Back Button */}
//       <button
//         onClick={() => onNavigate('learn')}
//         className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-6 group"
//       >
//         <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//         <span>Back to Learn</span>
//       </button>

//       {/* Header Section */}
//       <div className="relative mb-8">
//         <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl blur-xl"></div>
//         <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/30">
//           <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
//             <div className="flex-1">
//               {/* Part Badge */}
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-4">
//                 <BookMarked className="w-4 h-4 text-orange-400" />
//                 <span className="text-orange-400 font-semibold text-sm">
//                   Part {articleData.part.number}: {articleData.part.name}
//                 </span>
//               </div>

//               {/* Article Number */}
//               <div className="flex items-center gap-4 mb-4">
//                 <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(articleData.part.category)} rounded-2xl flex items-center justify-center shadow-lg`}>
//                   <Scale className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
//                     {articleData.articleNumber}
//                   </h1>
//                   <p className="text-slate-400 text-sm mt-1">Indian Constitution</p>
//                 </div>
//               </div>

//               {/* Article Name */}
//               <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
//                 {articleData.articleName}
//               </h2>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex md:flex-col gap-2">
//               <button
//                 onClick={() => setIsBookmarked(!isBookmarked)}
//                 className={`p-3 rounded-xl transition-all ${
//                   isBookmarked 
//                     ? 'bg-orange-500 text-white' 
//                     : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
//                 }`}
//                 title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
//               >
//                 <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
//               </button>
//               <button
//                 className="p-3 bg-slate-700 text-slate-400 rounded-xl hover:bg-slate-600 transition-all"
//                 title="Share article"
//               >
//                 <Share2 className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Key Points */}
//       <Card className="mb-8">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
//             <Sparkles className="w-5 h-5 text-white" />
//           </div>
//           <h3 className="text-2xl font-bold text-white">Key Points</h3>
//         </div>
//         <div className="grid md:grid-cols-2 gap-4">
//           {articleData.keyPoints.map((point, index) => (
//             <div
//               key={index}
//               className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors group"
//             >
//               <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                 <CheckCircle className="w-4 h-4 text-white" />
//               </div>
//               <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
//                 {point}
//               </p>
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* Content Tabs */}
//       <div className="flex gap-2 mb-6">
//         <button
//           onClick={() => setActiveTab('simplified')}
//           className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
//             activeTab === 'simplified'
//               ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
//               : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
//           }`}
//         >
//           <Lightbulb className="w-5 h-5" />
//           Simplified Explanation
//         </button>
//         <button
//           onClick={() => setActiveTab('original')}
//           className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
//             activeTab === 'original'
//               ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
//               : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
//           }`}
//         >
//           <FileText className="w-5 h-5" />
//           Original Text
//         </button>
//       </div>

//       {/* Content Area */}
//       {activeTab === 'simplified' ? (
//         <Card className="mb-8 animate-fade-in">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
//               <Lightbulb className="w-5 h-5 text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-white">Easy to Understand</h3>
//           </div>
//           <div className="prose prose-invert max-w-none">
//             {articleData.simplifiedDescription.split('\n\n').map((paragraph, index) => (
//               <p key={index} className="text-slate-300 leading-relaxed mb-4 text-lg">
//                 {paragraph}
//               </p>
//             ))}
//           </div>
//         </Card>
//       ) : (
//         <Card className="mb-8 animate-fade-in">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
//               <FileText className="w-5 h-5 text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-white">Constitutional Text</h3>
//           </div>
//           <div className="bg-slate-900/50 border-l-4 border-orange-500 p-6 rounded-lg">
//             <p className="text-slate-200 text-xl leading-relaxed italic font-serif">
//               "{articleData.originalText}"
//             </p>
//           </div>
//           <div className="mt-4 flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
//             <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
//             <p className="text-blue-200 text-sm">
//               This is the exact text as written in the Constitution of India. The simplified version above explains this in everyday language.
//             </p>
//           </div>
//         </Card>
//       )}

//       {/* Historical Context */}
//       <Card className="mb-8">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
//             <BookOpen className="w-5 h-5 text-white" />
//           </div>
//           <h3 className="text-2xl font-bold text-white">Historical Context</h3>
//         </div>
//         <p className="text-slate-300 leading-relaxed text-lg">
//           {articleData.historicalContext}
//         </p>
//       </Card>

//       {/* Landmark Cases */}
//       <Card className="mb-8">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
//             <Scale className="w-5 h-5 text-white" />
//           </div>
//           <h3 className="text-2xl font-bold text-white">Landmark Cases</h3>
//         </div>
//         <div className="space-y-4">
//           {articleData.landmarkCases.map((case_, index) => (
//             <div
//               key={index}
//               className="p-5 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl border border-slate-600 hover:border-orange-500/50 transition-colors"
//             >
//               <h4 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
//                 <ChevronRight className="w-5 h-5 text-orange-400" />
//                 {case_.name}
//               </h4>
//               <p className="text-slate-400 ml-7">{case_.significance}</p>
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* Related Articles */}
//       <Card className="mb-8">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
//             <BookMarked className="w-5 h-5 text-white" />
//           </div>
//           <h3 className="text-2xl font-bold text-white">Related Articles</h3>
//         </div>
//         <div className="grid md:grid-cols-3 gap-4">
//           {articleData.relatedArticles.map((article, index) => (
//             <button
//               key={index}
//               className="p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-all text-left group border border-slate-600 hover:border-orange-500/50"
//             >
//               <div className="font-bold text-orange-400 mb-1 group-hover:text-orange-300">
//                 {article.number}
//               </div>
//               <div className="text-slate-300 text-sm group-hover:text-white">{article.name}</div>
//             </button>
//           ))}
//         </div>
//       </Card>

//       {/* Quiz Section */}
//       <Card className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/30">
//         {!showQuiz ? (
//           <div className="text-center py-12">
//             <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
//               <Brain className="w-10 h-10 text-white" />
//             </div>
//             <h3 className="text-3xl font-bold text-white mb-4">Test Your Knowledge</h3>
//             <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
//               Take a quick 5-question quiz to see how well you understood {articleData.articleNumber}
//             </p>
//             <Button
//               size="lg"
//               onClick={() => setShowQuiz(true)}
//               icon={<Target className="w-5 h-5" />}
//             >
//               Start Quiz
//             </Button>
//           </div>
//         ) : !showResults ? (
//           <div className="animate-fade-in">
//             {/* Quiz Progress */}
//             <div className="mb-8">
//               <div className="flex justify-between items-center mb-3">
//                 <span className="text-slate-400 font-semibold">
//                   Question {currentQuestion + 1} of {articleData.quiz.length}
//                 </span>
//                 <span className="text-slate-400 font-semibold">
//                   {selectedAnswers.filter(a => a !== undefined).length}/{articleData.quiz.length} Answered
//                 </span>
//               </div>
//               <ProgressBar
//                 value={(currentQuestion + 1) / articleData.quiz.length * 100}
//                 color="primary"
//               />
//             </div>

//             {/* Question */}
//             <div className="mb-8">
//               <h4 className="text-2xl font-bold text-white mb-6 flex items-start gap-3">
//                 <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
//                   {currentQuestion + 1}
//                 </span>
//                 {articleData.quiz[currentQuestion].question}
//               </h4>

//               {/* Options */}
//               <div className="space-y-3">
//                 {articleData.quiz[currentQuestion].options.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleAnswerSelect(index)}
//                     className={`w-full p-5 rounded-xl text-left transition-all border-2 ${
//                       selectedAnswers[currentQuestion] === index
//                         ? 'bg-orange-500 border-orange-400 text-white shadow-lg'
//                         : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
//                     }`}
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
//                         selectedAnswers[currentQuestion] === index
//                           ? 'border-white bg-white text-orange-500'
//                           : 'border-slate-500'
//                       }`}>
//                         {selectedAnswers[currentQuestion] === index && (
//                           <CheckCircle className="w-5 h-5" />
//                         )}
//                       </div>
//                       <span className="font-medium">{option}</span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Navigation */}
//             <div className="flex justify-between items-center pt-6 border-t border-slate-700">
//               <Button
//                 variant="outline"
//                 onClick={handlePreviousQuestion}
//                 disabled={currentQuestion === 0}
//               >
//                 Previous
//               </Button>
//               <Button
//                 onClick={handleNextQuestion}
//                 disabled={selectedAnswers[currentQuestion] === undefined}
//               >
//                 {currentQuestion === articleData.quiz.length - 1 ? 'Finish Quiz' : 'Next Question'}
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-12 animate-fade-in">
//             {/* Results */}
//             <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
//               <Award className="w-12 h-12 text-white" />
//             </div>
//             <h3 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h3>
//             <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-2">
//               {calculateScore()}/{articleData.quiz.length}
//             </div>
//             <p className="text-slate-400 text-xl mb-8">
//               {calculateScore() === articleData.quiz.length
//                 ? 'Perfect score! You mastered this article! 🏆'
//                 : calculateScore() >= 3
//                 ? 'Great job! You have a good understanding! 👏'
//                 : 'Keep learning! Review the article and try again. 📚'}
//             </p>

//             {/* Detailed Results */}
//             <div className="max-w-3xl mx-auto mb-8 text-left space-y-4">
//               {articleData.quiz.map((question, index) => {
//                 const isCorrect = selectedAnswers[index] === question.correctAnswer;
//                 return (
//                   <Card key={index} className={`${isCorrect ? 'border-green-500/50' : 'border-red-500/50'}`}>
//                     <div className="flex items-start gap-4">
//                       <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
//                         isCorrect ? 'bg-green-500' : 'bg-red-500'
//                       }`}>
//                         {isCorrect ? (
//                           <CheckCircle className="w-6 h-6 text-white" />
//                         ) : (
//                           <XCircle className="w-6 h-6 text-white" />
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <h5 className="font-bold text-white mb-2">{question.question}</h5>
//                         <p className={`text-sm mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
//                           Your answer: {question.options[selectedAnswers[index]]}
//                         </p>
//                         {!isCorrect && (
//                           <p className="text-sm text-green-400 mb-2">
//                             Correct answer: {question.options[question.correctAnswer]}
//                           </p>
//                         )}
//                         <p className="text-slate-400 text-sm">{question.explanation}</p>
//                       </div>
//                     </div>
//                   </Card>
//                 );
//               })}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4 justify-center">
//               <Button
//                 variant="outline"
//                 onClick={resetQuiz}
//                 icon={<RotateCcw className="w-5 h-5" />}
//               >
//                 Retake Quiz
//               </Button>
//               <Button
//                 onClick={() => onNavigate('learn')}
//                 icon={<BookOpen className="w-5 h-5" />}
//               >
//                 Learn More Articles
//               </Button>
//             </div>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };














import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  FileText, 
  Lightbulb, 
  Scale, 
  ChevronRight, 
  CheckCircle, 
  XCircle,
  Award,
  RotateCcw,
  Share2,
  Bookmark,
  ArrowLeft,
  Sparkles,
  Info,
  BookMarked,
  Brain,
  Target,
  Loader,
  AlertCircle
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { articleAPI, quizAPI } from '../services/api';

interface ArticlePageProps {
  onNavigate: (page: string, data?: any) => void;
  articleData?: { articleNumber: string };
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ onNavigate, articleData }) => {

  // Add these debug logs at the very beginning
  console.log('📄 ArticlePage mounted');
  console.log('📦 Article data received:', articleData);
  

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'simplified' | 'original'>('simplified');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quiz, setQuiz] = useState<any[]>([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (articleData?.articleNumber) {
      fetchArticle(articleData.articleNumber);
    } else {
      setError('No article number provided');
      setLoading(false);
    }
  }, [articleData]);

  const fetchArticle = async (articleNumber: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`📄 Fetching article ${articleNumber}...`);
      
      const response: any = await articleAPI.getArticle(articleNumber);
      
      console.log('Response received:', response);
      
      if (response?.success) {
        setArticle(response.data);
        console.log('✅ Article loaded:', response.data.articleName);
      } else {
        setError('Failed to load article data');
      }
    } catch (err: any) {
      console.error('❌ Error fetching article:', err);
      setError('Failed to load article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = async () => {
    try {
      setQuizLoading(true);
      console.log(`🎯 Generating quiz for article ${articleData?.articleNumber}...`);
      
      const response: any = await quizAPI.generateFromArticle(
        articleData?.articleNumber || '0',
        5
      );
      
      if (response?.success && response?.data?.quiz) {
        setQuiz(response.data.quiz);
        setShowQuiz(true);
        console.log('✅ Quiz generated with', response.data.quiz.length, 'questions');
      } else {
        alert('Failed to generate quiz. Please try again.');
      }
    } catch (err: any) {
      console.error('❌ Error generating quiz:', err);
      alert('Failed to generate quiz. Please make sure Google API key is configured.');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quiz[index]?.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setShowQuiz(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'fundamental-rights': 'from-blue-500 to-cyan-500',
      'directive-principles': 'from-purple-500 to-pink-500',
      'union': 'from-orange-500 to-red-500',
      'other': 'from-green-500 to-emerald-500',
    };
    return colors[category] || 'from-orange-500 to-red-500';
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl animate-fade-in flex flex-col items-center justify-center py-20">
        <Loader className="w-16 h-16 text-orange-400 animate-spin mb-4" />
        <p className="text-slate-400 text-lg">Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="w-full max-w-6xl animate-fade-in">
        <Card className="text-center py-16 border-red-500/50">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Article Not Found</h2>
          <p className="text-slate-400 mb-6">{error || 'The requested article could not be found.'}</p>
          <Button onClick={() => onNavigate('learn')}>
            Back to Learn
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('learn')}
        className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-6 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Learn</span>
      </button>

      {/* Header Section */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl blur-xl"></div>
        <Card className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/30">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              {/* Part Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-4">
                <BookMarked className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 font-semibold text-sm">
                  {article.part?.name || 'Unknown Part'}
                </span>
              </div>

              {/* Article Number */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(article.part?.category || 'other')} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                    {article.articleNumber}
                  </h1>
                  <p className="text-slate-400 text-sm mt-1">Indian Constitution</p>
                </div>
              </div>

              {/* Article Name */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {article.articleName}
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex md:flex-col gap-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-3 rounded-xl transition-all ${
                  isBookmarked 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button
                className="p-3 bg-slate-700 text-slate-400 rounded-xl hover:bg-slate-600 transition-all"
                title="Share article"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Points */}
      {article.keyPoints && article.keyPoints.length > 0 && (
        <Card className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Key Points</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {article.keyPoints.map((point: string, index: number) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors group"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Content Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('simplified')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'simplified'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <Lightbulb className="w-5 h-5" />
          Simplified Explanation
        </button>
        <button
          onClick={() => setActiveTab('original')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'original'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <FileText className="w-5 h-5" />
          Original Text
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'simplified' ? (
        <Card className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Easy to Understand</h3>
          </div>
          <div className="prose prose-invert max-w-none">
            {article.simplifiedDescription?.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index} className="text-slate-300 leading-relaxed mb-4 text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Constitutional Text</h3>
          </div>
          <div className="bg-slate-900/50 border-l-4 border-orange-500 p-6 rounded-lg">
            <p className="text-slate-200 text-xl leading-relaxed italic font-serif">
              "{article.originalText}"
            </p>
          </div>
          <div className="mt-4 flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-blue-200 text-sm">
              This is the exact text as written in the Constitution of India. The simplified version explains this in everyday language.
            </p>
          </div>
        </Card>
      )}

      {/* Historical Context */}
      {article.historicalContext && article.historicalContext !== 'Not available' && (
        <Card className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Historical Context</h3>
          </div>
          <p className="text-slate-300 leading-relaxed text-lg">
            {article.historicalContext}
          </p>
        </Card>
      )}

      {/* Landmark Cases */}
      {article.landmarkCases && article.landmarkCases.length > 0 && (
        <Card className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Landmark Cases</h3>
          </div>
          <div className="space-y-4">
            {article.landmarkCases.map((case_: any, index: number) => (
              <div
                key={index}
                className="p-5 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl border border-slate-600 hover:border-orange-500/50 transition-colors"
              >
                <h4 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-orange-400" />
                  {case_.name || 'Unknown Case'}
                </h4>
                <p className="text-slate-400 ml-7">{case_.significance || 'No details available'}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Related Articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <Card className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <BookMarked className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Related Articles</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {article.relatedArticles.map((related: any, index: number) => (
              <button
                key={index}
                className="p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-all text-left group border border-slate-600 hover:border-orange-500/50"
              >
                <div className="font-bold text-orange-400 mb-1 group-hover:text-orange-300">
                  {related.number || 'Unknown'}
                </div>
                <div className="text-slate-300 text-sm group-hover:text-white">{related.name || 'Unknown'}</div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Quiz Section */}
      <Card className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/30">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Test Your Knowledge</h3>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Take a quick 5-question quiz to see how well you understood {article.articleNumber}
          </p>
          <Button
            size="lg"
            onClick={handleStartQuiz}
            disabled={quizLoading}
            icon={quizLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Target className="w-5 h-5" />}
          >
            {quizLoading ? 'Generating Quiz...' : 'Start Quiz'}
          </Button>
          <p className="text-slate-500 text-sm mt-4">
            Note: Quiz generation requires Google Gemini API key
          </p>
        </div>
      </Card>
    </div>
  );
};