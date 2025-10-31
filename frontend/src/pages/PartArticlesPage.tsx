import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  BookOpen,
  Loader,
  AlertCircle,
  Search,
  Brain,
  Target,
  GraduationCap,
  TrendingUp,
  CheckCircle,
  XCircle,
  Award,
  RotateCcw,
} from "lucide-react";
import { Card } from "../components/common/Card";
import { ArticleCard } from "../components/learn/ArticleCard";
import { Button } from "../components/common/Button";
import { ProgressBar } from "../components/common/ProgressBar";
import { articleAPI, quizAPI } from "../services/api";

interface PartArticlesPageProps {
  onNavigate: (page: string, data?: any) => void;
  partData?: {
    partName: string;
    partTitle: string;
  };
}

export const PartArticlesPage: React.FC<PartArticlesPageProps> = ({
  onNavigate,
  partData,
}) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // --- NEW ADAPTIVE QUIZ STATE ---
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [quizId, setQuizId] = useState<string | null>(null);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState<any>(null); // Single question
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // Single answer
  const [lastResult, setLastResult] = useState<any>(null); // For immediate feedback
  const [quizHistory, setQuizHistory] = useState<any[]>([]); // To show results
  const [finalScore, setFinalScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loader for submit
  // --- END NEW QUIZ STATE ---

  useEffect(() => {
    if (partData?.partName) {
      fetchArticlesByPart(partData.partName);
    } else {
      setError("No part name provided");
      setLoading(false);
    }
  }, [partData]);

  const fetchArticlesByPart = async (partName: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`📚 Fetching articles for part: ${partName}`);

      const response: any = await articleAPI.getArticlesByPart(partName);

      if (response?.success) {
        setArticles(response.data || []);
      } else {
        setError("Failed to load articles");
      }
    } catch (err: any) {
      console.error("❌ Error fetching articles:", err);
      setError("Failed to load articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (article: any, index: number) => {
    let articleNumber = "";

    if (article.article === "Preamble") {
      articleNumber = "0";
    } else {
      const match = article.article?.match(/Article\s+(\d+)/);
      if (match) {
        articleNumber = match[1];
      } else if (article.id) {
        const idMatch = article.id.match(/article-(\d+)/);
        if (idMatch) {
          articleNumber = idMatch[1];
        }
      }
    }

    if (articleNumber) {
      onNavigate("article", {
        articleNumber,
        allArticles: articles,
        currentIndex: index,
        partName: partData?.partName,
        partTitle: partData?.partTitle,
      });
    } else {
      alert("Unable to open this article");
    }
  };

  // --- UPDATED QUIZ HANDLERS ---

  const handleStartQuiz = async () => {
    try {
      setQuizLoading(true);
      const topic = partData?.partName || "";
      console.log(`🎯 Starting quiz for part: ${topic}...`);

      const response: any = await quizAPI.startQuiz(topic);

      if (response?.success) {
        setQuizId(response.quizId);
        setCurrentQuizQuestion(response.question);
        setQuestionNumber(response.questionNumber);
        setTotalQuestions(response.totalQuestions);

        setShowQuiz(true);
        setShowResults(false);
        setSelectedAnswer(null);
        setLastResult(null);
        setQuizHistory([]); // Clear history
        setFinalScore(0);

        console.log("✅ Quiz started with ID:", response.quizId);
      } else {
        alert(
          "Failed to start quiz. This feature requires Google Gemini API configuration."
        );
      }
    } catch (err: any) {
      console.error("❌ Error starting quiz:", err);
      alert(
        "Quiz generation is not available yet. Please configure Google Gemini API in the backend."
      );
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || !quizId || !currentQuizQuestion?.id) return;
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const response: any = await quizAPI.submitAnswer(
        quizId,
        currentQuizQuestion.id,
        selectedAnswer
      );

      if (response?.success) {
        // Store history for the results page
        setQuizHistory((prev) => [
          ...prev,
          {
            question: currentQuizQuestion,
            answer: selectedAnswer,
            result: response.result,
          },
        ]);
        setLastResult(response.result); // For immediate feedback (if needed)

        if (response.quizOver) {
          console.log("✅ Quiz finished. Final Score:", response.finalScore);
          setFinalScore(response.finalScore);
          setShowResults(true);
          setCurrentQuizQuestion(null);
        } else {
          // Load next question
          setCurrentQuizQuestion(response.question);
          setQuestionNumber(response.questionNumber);
          setTotalQuestions(response.totalQuestions);
          setSelectedAnswer(null); // Reset selection
        }
      } else {
        alert("Failed to submit answer.");
      }
    } catch (err: any) {
      console.error("❌ Error submitting answer:", err);
      alert("An error occurred while submitting your answer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // This function now just returns the score provided by the server
  const calculateScore = () => {
    return finalScore;
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setShowResults(false);
    setQuizId(null);
    setCurrentQuizQuestion(null);
    setSelectedAnswer(null);
    setLastResult(null);
    setQuizHistory([]);
    setFinalScore(0);
    setQuestionNumber(0);
  };

  // --- END UPDATED QUIZ HANDLERS ---

  const filteredArticles = articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.article?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full max-w-7xl animate-fade-in flex flex-col items-center justify-center py-20">
        <Loader className="w-16 h-16 text-orange-400 animate-spin mb-4" />
        <p className="text-slate-400 text-lg">Loading articles...</p>
      </div>
    );
  }

  if (error || !partData) {
    return (
      <div className="w-full max-w-7xl animate-fade-in">
        <Card className="text-center py-16 border-red-500/50">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Error Loading Articles
          </h2>
          <p className="text-slate-400 mb-6">
            {error || "Something went wrong."}
          </p>
          <button
            onClick={() => onNavigate("learn")}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-all"
          >
            Back to Learn
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => onNavigate("learn")}
        className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-6 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to All Parts</span>
      </button>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl mb-6">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          {partData.partTitle || partData.partName}
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Explore {articles.length}{" "}
          {articles.length === 1 ? "article" : "articles"} in this part of the
          Indian Constitution
        </p>
      </div>

      {/* Search Bar */}
      {articles.length > 0 && (
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles in this part..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      )}

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 auto-rows-fr">
          {filteredArticles.map((article, index) => (
            <div
              key={article.id}
              onClick={() => handleArticleClick(article, index)}
            >
              <ArticleCard article={article} onNavigate={onNavigate} />
            </div>
          ))}
        </div>
      ) : (
        <Card className="text-center py-16 mb-12">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-400 mb-2">
            {searchQuery ? "No articles found" : "No articles available"}
          </h3>
          <p className="text-slate-500">
            {searchQuery
              ? "Try adjusting your search query"
              : "This part has no articles yet"}
          </p>
        </Card>
      )}

      {/* Learning Journey Section */}
      {articles.length > 0 && (
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30">
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-xl mb-6">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Test Your Knowledge?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                You've explored the articles in{" "}
                <span className="text-orange-400 font-semibold">
                  {partData.partTitle}
                </span>
                . Now it's time to see how well you understood them!
              </p>

              {/* Learning Stats */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {articles.length}
                  </div>
                  <div className="text-slate-400 text-sm">
                    Articles to Learn
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">5</div>
                  <div className="text-slate-400 text-sm">Quiz Questions</div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">5</div>
                  <div className="text-slate-400 text-sm">Minutes</div>
                </div>
              </div>

              {/* How it Works */}
              <div className="max-w-3xl mx-auto mb-8">
                <div className="grid md:grid-cols-3 gap-4 text-left">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">
                        Read Articles
                      </h4>
                      <p className="text-slate-400 text-sm">
                        Study all articles in this part carefully
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Take Quiz</h4>
                      <p className="text-slate-400 text-sm">
                        Answer questions to test understanding
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Get Results</h4>
                      <p className="text-slate-400 text-sm">
                        See your score and learn from mistakes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* --- UPDATED QUIZ SECTION --- */}
      {articles.length > 0 && (
        <Card className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/30">
          {!showQuiz ? (
            // "Start Quiz" Button
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Test Your Knowledge
              </h3>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Take an adaptive quiz on all articles in{" "}
                {partData.partTitle}
              </p>
              <Button
                size="lg"
                onClick={handleStartQuiz}
                disabled={quizLoading}
                icon={
                  quizLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Target className="w-5 h-5" />
                  )
                }
              >
                {quizLoading ? "Generating Quiz..." : "Start Adaptive Quiz"}
              </Button>
              <p className="text-slate-500 text-sm mt-4">
                Note: This quiz adapts to your answers. Good luck!
              </p>
            </div>
          ) : !showResults ? (
            // Quiz In Progress View (UPDATED)
            <div className="animate-fade-in">
              {/* Quiz Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-400 font-semibold">
                    Question {questionNumber} of {totalQuestions}
                  </span>
                  <span className="text-slate-400 font-semibold">
                    Score: {quizHistory.filter(h => h.result.isCorrect).length}
                  </span>
                </div>
                <ProgressBar
                  value={(questionNumber / totalQuestions) * 100}
                  color="primary"
                />
              </div>

              {/* Question */}
              {currentQuizQuestion && (
                <>
                  <div className="mb-8">
                    <h4 className="text-2xl font-bold text-white mb-6 flex items-start gap-3">
                      <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                        {questionNumber}
                      </span>
                      {currentQuizQuestion.question}
                    </h4>

                    {/* Options (UPDATED) */}
                    <div className="space-y-3">
                      {currentQuizQuestion.options?.map(
                        (option: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={`w-full p-5 rounded-xl text-left transition-all border-2 ${
                              selectedAnswer === index // Use single selectedAnswer
                                ? "bg-orange-500 border-orange-400 text-white shadow-lg"
                                : "bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                  selectedAnswer === index
                                    ? "border-white bg-white text-orange-500"
                                    : "border-slate-500"
                                }`}
                              >
                                {selectedAnswer === index && (
                                  <CheckCircle className="w-5 h-5" />
                                )}
                              </div>
                              <span className="font-medium">{option}</span>
                            </div>
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Navigation (UPDATED) */}
                  <div className="flex justify-end items-center pt-6 border-t border-slate-700">
                    {/* Previous Button is REMOVED */}
                    <Button
                      onClick={handleSubmitAnswer} // Use new handler
                      disabled={selectedAnswer === null || isSubmitting} // Use new disabled state
                      icon={ isSubmitting ? <Loader className="w-5 h-5 animate-spin" /> : undefined }
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : questionNumber === totalQuestions // Check if last question
                        ? "Finish Quiz"
                        : "Submit Answer"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            // Results View (UPDATED)
            <div className="text-center py-12 animate-fade-in">
              {/* Results */}
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">
                Quiz Complete!
              </h3>
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-2">
                {finalScore}/{totalQuestions}
              </div>
              <p className="text-slate-400 text-xl mb-8">
                {finalScore === totalQuestions
                  ? "Perfect score! You mastered this part! 🏆"
                  : finalScore >= totalQuestions * 0.7
                  ? "Great job! You have a good understanding! 👏"
                  : "Keep learning! Review the articles and try again. 📚"}
              </p>

              {/* Detailed Results (UPDATED) */}
              <div className="max-w-3xl mx-auto mb-8 text-left space-y-4">
                {quizHistory.map((historyItem: any, index: number) => {
                  const isCorrect = historyItem.result.isCorrect;
                  return (
                    <Card
                      key={index}
                      className={`${
                        isCorrect ? "border-green-500/50" : "border-red-500/50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isCorrect ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {isCorrect ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : (
                            <XCircle className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-white mb-2">
                            {historyItem.question.question}
                          </h5>
                          <p
                            className={`text-sm mb-2 ${
                              isCorrect ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            Your answer:{" "}
                            {historyItem.question.options?.[historyItem.answer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-400 mb-2">
                              Correct answer:{" "}
                              {
                                historyItem.question.options?.[
                                  historyItem.result.correctAnswer
                                ]
                              }
                            </p>
                          )}
                          {historyItem.result.explanation && (
                            <p className="text-slate-400 text-sm">
                              {historyItem.result.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={resetQuiz} // This is correct, it resets to the "Start Quiz" screen
                  icon={<RotateCcw className="w-5 h-5" />}
                >
                  Retake Quiz
                </Button>
                <Button
                  onClick={() => onNavigate("learn")}
                  icon={<BookOpen className="w-5 h-5" />}
                >
                  Learn More Parts
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};