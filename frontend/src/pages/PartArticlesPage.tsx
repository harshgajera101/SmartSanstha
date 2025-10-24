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

  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [quiz, setQuiz] = useState<any[]>([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

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

      console.log("Response received:", response);

      if (response?.success) {
        setArticles(response.data || []);
        console.log(`✅ Loaded ${response.data?.length || 0} articles`);
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
    console.log("🎯 Article clicked:", article);
    console.log("📋 All articles:", articles);
    console.log("🔢 Index:", index);

    // Extract article number
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

    console.log("🔢 Extracted article number:", articleNumber);

    if (articleNumber) {
      // Navigate with all articles data AND part info for proper back navigation
      onNavigate("article", {
        articleNumber,
        allArticles: articles,
        currentIndex: index,
        partName: partData?.partName, // Pass part name
        partTitle: partData?.partTitle, // Pass part title
      });
    } else {
      console.error("❌ Could not extract article number from:", article);
      alert("Unable to open this article");
    }
  };

  const handleStartQuiz = async () => {
    try {
      setQuizLoading(true);
      console.log(`🎯 Generating quiz for part: ${partData?.partName}...`);

      const response: any = await quizAPI.generateFromPart(
        partData?.partName || "",
        10
      );

      if (response?.success && response?.data?.quiz) {
        setQuiz(response.data.quiz);
        setShowQuiz(true);
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setShowResults(false);
        console.log(
          "✅ Quiz generated with",
          response.data.quiz.length,
          "questions"
        );
      } else {
        alert(
          "Failed to generate quiz. This feature requires Google Gemini API configuration."
        );
      }
    } catch (err: any) {
      console.error("❌ Error generating quiz:", err);
      alert(
        "Quiz generation is not available yet. Please configure Google Gemini API in the backend."
      );
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
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (quiz[index] && answer === quiz[index].correctAnswer) {
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

      {/* Quiz Section */}
      {articles.length > 0 && (
        <Card className="mb-8 bg-gradient-to-br from-slate-800 to-slate-900 border-orange-500/30">
          {!showQuiz ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Test Your Knowledge
              </h3>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Take a comprehensive quiz on all articles in{" "}
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
                {quizLoading ? "Generating Quiz..." : "Start Quiz"}
              </Button>
              <p className="text-slate-500 text-sm mt-4">
                Note: Quiz generation requires Google Gemini API configuration
              </p>
            </div>
          ) : !showResults ? (
            <div className="animate-fade-in">
              {/* Quiz Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-400 font-semibold">
                    Question {currentQuestion + 1} of {quiz.length}
                  </span>
                  <span className="text-slate-400 font-semibold">
                    {selectedAnswers.filter((a) => a !== undefined).length}/
                    {quiz.length} Answered
                  </span>
                </div>
                <ProgressBar
                  value={((currentQuestion + 1) / quiz.length) * 100}
                  color="primary"
                />
              </div>

              {/* Question */}
              {quiz[currentQuestion] && (
                <>
                  <div className="mb-8">
                    <h4 className="text-2xl font-bold text-white mb-6 flex items-start gap-3">
                      <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                        {currentQuestion + 1}
                      </span>
                      {quiz[currentQuestion].question}
                    </h4>

                    {/* Options */}
                    <div className="space-y-3">
                      {quiz[currentQuestion].options?.map(
                        (option: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={`w-full p-5 rounded-xl text-left transition-all border-2 ${
                              selectedAnswers[currentQuestion] === index
                                ? "bg-orange-500 border-orange-400 text-white shadow-lg"
                                : "bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                  selectedAnswers[currentQuestion] === index
                                    ? "border-white bg-white text-orange-500"
                                    : "border-slate-500"
                                }`}
                              >
                                {selectedAnswers[currentQuestion] === index && (
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

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-6 border-t border-slate-700">
                    <Button
                      variant="outline"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswers[currentQuestion] === undefined}
                    >
                      {currentQuestion === quiz.length - 1
                        ? "Finish Quiz"
                        : "Next Question"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              {/* Results */}
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">
                Quiz Complete!
              </h3>
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-2">
                {calculateScore()}/{quiz.length}
              </div>
              <p className="text-slate-400 text-xl mb-8">
                {calculateScore() === quiz.length
                  ? "Perfect score! You mastered this part! 🏆"
                  : calculateScore() >= quiz.length * 0.7
                  ? "Great job! You have a good understanding! 👏"
                  : "Keep learning! Review the articles and try again. 📚"}
              </p>

              {/* Detailed Results */}
              <div className="max-w-3xl mx-auto mb-8 text-left space-y-4">
                {quiz.map((question: any, index: number) => {
                  const isCorrect =
                    selectedAnswers[index] === question.correctAnswer;
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
                            {question.question}
                          </h5>
                          <p
                            className={`text-sm mb-2 ${
                              isCorrect ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            Your answer:{" "}
                            {question.options?.[selectedAnswers[index]]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-400 mb-2">
                              Correct answer:{" "}
                              {question.options?.[question.correctAnswer]}
                            </p>
                          )}
                          {question.explanation && (
                            <p className="text-slate-400 text-sm">
                              {question.explanation}
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
                  onClick={resetQuiz}
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