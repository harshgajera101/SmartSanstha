import React, { useEffect, useMemo, useState, DragEvent } from "react";
import { 
    BookOpen, Trophy, RotateCcw, Star, Lightbulb, CheckCircle, Target, Brain, Users, Mail, 
    ShieldCheck, Gamepad2, Menu, X, Home, Info, Award, Scale, Bot, Drama, BarChart, 
    Zap, Eye, MessageSquare, LineChart, ChevronDown, Twitter, Linkedin, Github, Clock, BrainCircuit, Puzzle 
} from "lucide-react";

// --- GAME DATA & UTILS (Memory Game) ---
type ArticleCard = {
  uid: string;
  article: string;
  expl: string;
  flipped?: boolean;
  matched?: boolean;
};

const ARTICLE_DATA = [
  { article: "Article 12", expl: "Defines the meaning of 'State' under Fundamental Rights." },
  { article: "Article 14", expl: "Guarantees equality before the law and equal protection of the laws." },
  { article: "Article 19", expl: "Protects freedoms like speech, assembly, association — subject to reasonable restrictions." },
  { article: "Article 21", expl: "Right to life and personal liberty — a broad protection covering many derived rights." },
  { article: "Article 32", expl: "Right to constitutional remedies — approach the Supreme Court for enforcement of Fundamental Rights." },
  { article: "Article 368", expl: "Procedure for amending the Constitution — special majority and conditions for some amendments." },
  { article: "Article 370", expl: "(Historic) Special status clause — now abrogated in 2019." },
  { article: "Article 51A", expl: "Fundamental duties of citizens, such as respecting the Constitution." }
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function shuffle<T>(arr: T[]) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


// --- PAGE COMPONENTS ---

const HomePage = ({ setPage }: { setPage: (page: string) => void }) => (
    <div className="w-full animate-fade-in">
        {/* Hero Section */}
        <section className="relative text-center text-white bg-slate-900 rounded-2xl overflow-hidden py-20 md:py-32 border border-slate-800">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
                <h1 className="text-4xl md:text-5xl font-bold">Welcome To</h1>
                <h1 className="text-5xl md:text-6xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">SmartSanstha</h1>
                <p className="text-lg md:text-xl mt-4 text-slate-400">AI-Powered Gamified Constitutional Literacy Platform</p>
                <button 
                    onClick={() => setPage('games')}
                    className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95"
                >
                    Start Learning →
                </button>
            </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 px-6 md:px-8 grid md:grid-cols-2 gap-10 items-center">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4 text-white">What is SmartSanstha?</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                    SmartSanstha is an AI-powered, gamified learning platform designed to simplify the Indian Constitution for everyone. It transforms complex legal concepts into easy-to-understand language, enriched with interactive games, courtroom simulations, quizzes, and visual dashboards.
                </p>
                <p className="text-slate-400 leading-relaxed">
                    The platform not only helps users explore the Legislature, Executive, and Judiciary but also provides multilingual support and AI-driven insights to make learning engaging, inclusive, and impactful.
                </p>
            </div>
            <div className="flex justify-center items-center bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                <Scale className="w-48 h-48 text-blue-400" />
            </div>
        </section>

        {/* What We Offer Section */}
        <section className="bg-slate-800/50 text-white py-16 md:py-24 px-6 md:px-8 rounded-2xl border border-slate-700">
            <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { icon: Lightbulb, title: "Simplified Learning", desc: "Complex constitutional articles are translated into clear, easy-to-understand language with AI support." },
                    { icon: Drama, title: "Courtroom Simulation", desc: "Watch real-life inspired cases unfold and observe petitions, defenses, and judgments." },
                    { icon: Gamepad2, title: "Gamified Approach", desc: "Spin-the-wheel, quizzes, and scenario challenges make learning engaging and fun." },
                    { icon: BarChart, title: "Performance Tracking", desc: "Track progress and get guided suggestions for improvement with visual dashboards." },
                    { icon: Bot, title: "Ask Chatbot", desc: "An AI chatbot answers questions, simplifies legal terms, and guides learners to relevant content." }
                ].map((item, index) => (
                    <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center transform transition-transform hover:scale-105 hover:border-blue-500">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
                                <item.icon className="w-8 h-8 text-blue-400" />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg text-white">{item.title}</h3>
                        <p className="text-slate-400 mt-2 text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Why Learn Section */}
        <section className="py-16 md:py-24 px-6 md:px-8 text-center">
            <h2 className="text-3xl font-bold mb-12 text-white">Why Learn with SmartSanstha?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { icon: Eye, title: "Clarity & Understanding" },
                    { icon: Zap, title: "Engaging Experience" },
                    { icon: MessageSquare, title: "Instant Guidance" },
                    { icon: LineChart, title: "Smarter Progress" },
                ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 mb-4 transition-transform transform hover:scale-110">
                            <item.icon className="w-12 h-12 text-blue-400" />
                        </div>
                        <p className="font-semibold text-slate-300">{item.title}</p>
                    </div>
                ))}
            </div>
        </section>

        <FAQ />
    </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "Who is this platform for?", a: "SmartSanstha is for students, legal professionals, and anyone curious about the Indian Constitution. Our gamified approach makes it suitable for all learning levels." },
    { q: "Is the content accurate?", a: "Yes, all our educational content is thoroughly researched and verified by legal experts to ensure accuracy and reliability." },
    { q: "Can I use this on my mobile device?", a: "Absolutely! The platform is fully responsive and designed to work seamlessly across desktops, tablets, and smartphones." },
    { q: "How does the AI chatbot work?", a: "Our AI chatbot uses advanced natural language processing to understand your questions and provide instant, relevant answers based on our knowledge base." },
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex justify-between items-center text-left p-5 font-semibold text-white"
                    >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}>
                        <div className="p-5 pt-0 text-slate-400">
                            {faq.a}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
};


const GamePage = () => {
    // ... [Memory Game logic remains unchanged]
    const [cards, setCards] = useState<ArticleCard[]>(() => []);
    const [first, setFirst] = useState<number | null>(null);
    const [second, setSecond] = useState<number | null>(null);
    const [disabled, setDisabled] = useState(false);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalExpl, setModalExpl] = useState("");
    const [modalArticle, setModalArticle] = useState("");
    const [best, setBest] = useState<number | null>(null);
    const [gameComplete, setGameComplete] = useState(false);
    const totalPairs = ARTICLE_DATA.length;
    const initialize = () => {
      const doubled: ArticleCard[] = ARTICLE_DATA.flatMap((a) => [
        { uid: uid(), article: a.article, expl: a.expl, flipped: false, matched: false },
        { uid: uid(), article: a.article, expl: a.expl, flipped: false, matched: false }
      ]);
      const shuffled = shuffle(doubled);
      setCards(shuffled);
      setFirst(null);
      setSecond(null);
      setDisabled(false);
      setMoves(0);
      setMatches(0);
      setShowModal(false);
      setModalExpl("");
      setModalArticle("");
      setGameComplete(false);
    };
    useEffect(() => {
      initialize();
      const stored = localStorage.getItem("memgame_best");
      if (stored) setBest(Number(stored));
    }, []);
    useEffect(() => {
      if (first !== null && second !== null) {
        setDisabled(true);
        const c1 = cards[first];
        const c2 = cards[second];
        setMoves((m) => m + 1);
        if (c1.article === c2.article) {
          setTimeout(() => {
              const newCards = cards.slice();
              newCards[first] = { ...newCards[first], matched: true };
              newCards[second] = { ...newCards[second], matched: true };
              setCards(newCards);
              setMatches((m) => m + 1);
              setModalExpl(c1.expl);
              setModalArticle(c1.article);
              setShowModal(true);
              setFirst(null);
              setSecond(null);
              setDisabled(false);
          }, 500);
        } else {
          setTimeout(() => {
            const newCards = cards.slice();
            newCards[first] = { ...newCards[first], flipped: false };
            newCards[second] = { ...newCards[second], flipped: false };
            setCards(newCards);
            setFirst(null);
            setSecond(null);
            setDisabled(false);
          }, 900);
        }
      }
    }, [first, second, cards]);
    useEffect(() => {
      if (matches === totalPairs && matches > 0) {
        const score = moves;
        if (best === null || score < best) {
          setBest(score);
          localStorage.setItem("memgame_best", String(score));
        }
        setGameComplete(true);
      }
    }, [matches, moves, best, totalPairs]);
    const handleFlip = (index: number) => {
      if (disabled) return;
      const card = cards[index];
      if (card.flipped || card.matched) return;
      const newCards = cards.slice();
      newCards[index] = { ...card, flipped: true };
      setCards(newCards);
      if (first === null) setFirst(index);
      else if (second === null) setSecond(index);
    };
    const handleReset = () => {
      initialize();
    };
    const progressPercent = Math.round((matches / totalPairs) * 100);
    const gridCols = useMemo(() => {
      if (ARTICLE_DATA.length <= 4) return "grid-cols-2 sm:grid-cols-4";
      if (ARTICLE_DATA.length <= 6) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
      return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6";
    }, []);
    const getPerformanceMessage = () => {
      if (moves <= totalPairs + 2) return "Exceptional! 🏆";
      if (moves <= totalPairs + 4) return "Excellent! ⭐";
      if (moves <= totalPairs + 8) return "Good job! 👏";
      return "Well done! 🎉";
    };

    return (
        <div className="w-full max-w-7xl animate-fade-in">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 border border-slate-700 rounded-full shadow-xl mb-6">
              <Brain className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Constitution Card Match
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Test your memory while learning about India's Constitution.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-700">
              <Target className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-slate-300">Moves: {moves}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-700">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-slate-300">Matches: {matches}/{totalPairs}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-700">
              <Trophy className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-slate-300">Best: {best === null ? '—' : `${best} moves`}</span>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold">
              <RotateCcw className="w-5 h-5" /> New Game
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2"><Star className="w-5 h-5 text-blue-400" /><span className="text-sm font-semibold text-slate-300">Progress</span></div>
              <span className="text-sm font-bold text-slate-300">{progressPercent}%</span>
            </div>
            <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden shadow-inner border border-slate-600">
              <div className="h-full bg-blue-500 transition-all duration-700 ease-out" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          <main className={`grid gap-4 sm:gap-6 ${gridCols} mb-8`}>
            {cards.map((c, idx) => (
              <button key={c.uid} className={`group perspective w-full rounded-xl h-36 sm:h-44 md:h-48 lg:h-52 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 ${c.matched ? 'opacity-50' : ''}`} onClick={() => handleFlip(idx)}>
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${c.flipped || c.matched ? 'rotate-y-180' : ''} group-hover:scale-105`}>
                  <div className="absolute inset-0 backface-hidden rounded-xl shadow-lg bg-slate-700 p-6 flex flex-col items-center justify-center text-white border border-slate-600">
                    <div className="relative z-10 text-center">
                      <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-90 text-blue-400" />
                      <div className="text-lg sm:text-xl font-bold tracking-wider mb-2">Constitution Quest</div>
                      <div className="text-xs opacity-70 text-slate-400">Tap to Flip</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-xl shadow-xl bg-white text-slate-800 border-2 border-slate-200 p-4 sm:p-6 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="text-xs text-blue-700 font-semibold bg-blue-100 px-2 py-1 rounded-full">{c.matched ? 'MATCHED' : 'ARTICLE'}</div>
                      {c.matched && (<div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-600" /></div>)}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center"><div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">{c.article}</div></div>
                    </div>
                    <div className="flex items-center justify-end">
                      <div className="flex items-center gap-1 text-xs text-slate-500"><Lightbulb className="w-3 h-3" />Learn</div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </main>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                <div className="relative z-50 max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl p-6 transform animate-bounce-in border border-slate-700">
                    <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"><CheckCircle className="w-8 h-8 text-white" /></div>
                    <h3 className="text-xl font-bold text-white mb-2">Perfect Match! 🎉</h3>
                    <div className="bg-slate-700 text-white px-4 py-2 rounded-xl font-bold text-lg mb-4 border border-slate-600">{modalArticle}</div>
                    <p className="text-slate-400 leading-relaxed mb-6">{modalExpl}</p>
                    <button onClick={() => setShowModal(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95">Continue</button>
                    </div>
                </div>
                </div>
            )}
            {gameComplete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <div className="relative z-50 max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl p-6 transform animate-bounce-in border border-slate-700">
                    <div className="text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-spin-slow"><Trophy className="w-10 h-10 text-white" /></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Congratulations! 🏆</h3>
                    <p className="text-lg text-slate-400 mb-4">{getPerformanceMessage()}</p>
                    <div className="bg-slate-700 border border-slate-600 rounded-xl p-4 mb-6">
                        <div className="text-3xl font-bold text-white">{moves} Moves</div>
                        <div className="text-sm text-slate-400">{best === moves ? "New Personal Best!" : `Personal Best: ${best || "—"} moves`}</div>
                    </div>
                    <div className="flex gap-3"><button onClick={handleReset} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95">Play Again</button></div>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
}

const AboutPage = () => (
    <div className="w-full max-w-5xl animate-fade-in text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 border border-slate-700 rounded-full shadow-xl mb-6">
            <Users className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">About Us</h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
            We are passionate about making learning engaging and accessible. Our mission is to combine education with interactive experiences to help users gain knowledge in a fun, memorable way.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 transform transition-transform hover:scale-105 hover:border-blue-500">
                <ShieldCheck className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
                <p className="text-slate-400">To be a leading platform for gamified learning, where knowledge is not just consumed, but experienced.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 transform transition-transform hover:scale-105 hover:border-blue-500">
                <Target className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
                <p className="text-slate-400">To create high-quality, educational games that are both fun to play and rich in valuable information.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 transform transition-transform hover:scale-105 hover:border-blue-500">
                <Brain className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Our Approach</h3>
                <p className="text-slate-400">We blend pedagogical principles with modern game design, ensuring our content is accurate, engaging, and effective.</p>
            </div>
        </div>
    </div>
);

const FeaturesPage = () => (
    <div className="w-full max-w-5xl animate-fade-in text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 border border-slate-700 rounded-full shadow-xl mb-6">
            <Award className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Features</h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Our platform is designed to provide an optimal learning experience. Discover the key features that make our games unique and effective.
        </p>
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-8 text-left bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex-shrink-0 w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                    <Gamepad2 className="w-12 h-12 text-blue-400" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Interactive Gameplay</h3>
                    <p className="text-slate-400">Engage your memory and decision-making skills with mechanics that are intuitive and fun, keeping you hooked.</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 text-left md:text-right bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex-shrink-0 w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                    <BookOpen className="w-12 h-12 text-blue-400" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Educational Content</h3>
                    <p className="text-slate-400">Each game reveals concise, easy-to-understand explanations of important constitutional articles, turning playtime into study time.</p>
                </div>
            </div>
             <div className="flex flex-col md:flex-row items-center gap-8 text-left bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex-shrink-0 w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                    <Trophy className="w-12 h-12 text-blue-400" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Track Your Progress</h3>
                    <p className="text-slate-400">Our games track your moves and save your best scores, encouraging you to improve your performance and replay to beat your own records.</p>
                </div>
            </div>
        </div>
    </div>
);


const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="w-full max-w-4xl animate-fade-in">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 border border-slate-700 rounded-full shadow-xl mb-6">
                    <Mail className="w-10 h-10 text-blue-400" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Contact Us</h1>
                <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
                    Have questions, suggestions, or feedback? We'd love to hear from you. Reach out to us using the form below.
                </p>
            </div>
            
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-slate-700">
                {submitted ? (
                    <div className="text-center py-10">
                         <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"><CheckCircle className="w-8 h-8 text-white" /></div>
                        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                        <p className="text-slate-400">Your message has been sent successfully. We'll get back to you soon.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                                <input type="text" id="name" required className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                <input type="email" id="email" required className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="your.email@example.com" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                            <textarea id="message" rows={5} required className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your message..."></textarea>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold">Send Message</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

const ExploreGamesPage = ({ setPage }: { setPage: (page: string) => void }) => {
    const games = [
        { id: 'memory', title: 'Constitution Card Match', subtitle: 'Match articles to learn key facts', difficulty: 'easy', estMinutes: 5, icon: Brain },
        { id: 'preamble', title: 'Preamble Builder', subtitle: 'Arrange keywords to form the Preamble', difficulty: 'medium', estMinutes: 7, icon: Puzzle },
        { id: 'rights-duties', title: 'Rights vs. Duties', subtitle: 'Balance freedom and order in scenarios', difficulty: 'hard', estMinutes: 10, icon: Scale },
    ];

    const GameCard = ({ game, onClick }: { game: typeof games[0], onClick: () => void }) => {
        const difficultyColor = {
            easy: 'text-green-400 bg-green-900/50',
            medium: 'text-yellow-400 bg-yellow-900/50',
            hard: 'text-red-400 bg-red-900/50',
        };

        return (
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-700 flex flex-col group hover:border-blue-500 transition-colors">
                <div className="flex-grow">
                    <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                        <game.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{game.subtitle}</p>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColor[game.difficulty as keyof typeof difficultyColor]}`}>{game.difficulty.toUpperCase()}</span>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{game.estMinutes} min</span>
                    </div>
                </div>
                <button onClick={onClick} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 transform group-hover:scale-105">Play Now</button>
            </div>
        );
    };

    return (
        <div className="w-full max-w-6xl animate-fade-in">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 border border-slate-700 rounded-full shadow-xl mb-6">
                    <Gamepad2 className="w-10 h-10 text-blue-400" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Explore Games</h1>
                <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
                    Play to retain better — each game targets a core constitutional concept.
                </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} onClick={() => {
                        if (game.id === 'memory') setPage('game-play');
                        if (game.id === 'rights-duties') setPage('rights-duties-game');
                    }} />
                ))}
            </div>
        </div>
    );
};

// --- Rights vs. Duties Game ---

// --- TYPE DEFINITIONS (TypeScript) ---
interface IMeterEffect { freedom: number; order: number; }
interface IToken { id: string; label: string; meter: IMeterEffect; explanation: string; }
interface IRandomEvent { chance: number; effect: IMeterEffect; desc: string; }
interface IScenario { id: string; title: string; description: string; tokens: IToken[]; randomEvents?: IRandomEvent[]; }

// --- GAME DATA (JSON-driven Scenarios) ---
const scenarios: IScenario[] = [
  {
    id: "rvd-001", title: "University Protest", description: "Students are organizing a large-scale protest on campus against a sudden fee hike. Tensions are high.",
    tokens: [
      { id: "right_speech", label: "Freedom of Speech", meter: { freedom: 15, order: -10 }, explanation: "Upholding the students' right to protest is a cornerstone of a free society (Article 19). It allows grievances to be aired publicly." },
      { id: "duty_order", label: "Maintain Public Order", meter: { freedom: -8, order: 12 }, explanation: "The university has a duty to ensure the safety of all students and prevent disruption to its educational activities." },
      { id: "policy_mediate", label: "Mediation Policy", meter: { freedom: 5, order: 5 }, explanation: "Initiating dialogue between the student union and the administration can lead to a peaceful resolution, balancing expression with order." }
    ],
    randomEvents: [{ chance: 0.3, effect: { freedom: -5, order: -15 }, desc: "The protest turns disruptive, leading to minor property damage." }],
  },
  {
    id: "rvd-002", title: "Investigative Journalism Report", description: "A major news outlet is about to publish a story with leaked documents exposing corruption in a government infrastructure project.",
    tokens: [
        { id: "right_press", label: "Freedom of the Press", meter: { freedom: 20, order: -15 }, explanation: "A free press is vital for holding power to account and informing the public. Exposing corruption strengthens democracy." },
        { id: "duty_security", label: "National Security", meter: { freedom: -25, order: 20 }, explanation: "The government argues the leaked documents contain sensitive information that could compromise national security if published." },
        { id: "policy_redact", label: "Redact Sensitive Info", meter: { freedom: -5, order: 10 }, explanation: "Publishing the story while redacting names and sensitive data balances transparency with security concerns." }
    ],
  },
    {
    id: "rvd-003", title: "Community Festival Permit", description: "A local religious group wants to hold a large public festival in the city's main park, which will require road closures.",
    tokens: [
        { id: "right_assembly", label: "Freedom of Assembly", meter: { freedom: 15, order: -5 }, explanation: "Citizens have the right to assemble peacefully, which includes cultural and religious celebrations." },
        { id: "duty_public_access", label: "Ensure Public Access", meter: { freedom: -10, order: 15 }, explanation: "The city must ensure that public spaces and services remain accessible to all citizens, minimizing disruption from private events." },
    ],
    randomEvents: [{ chance: 0.2, effect: { freedom: 0, order: -10 }, desc: "Counter-protesters arrive, creating friction and requiring a larger police presence." }],
  }
];

const RightsDutiesGame = () => {
    const [gameState, setGameState] = useState<'playing' | 'debrief' | 'end'>('playing');
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [freedom, setFreedom] = useState(50);
    const [order, setOrder] = useState(50);
    const [debriefResult, setDebriefResult] = useState<{token: IToken, randomEvent?: IRandomEvent, finalFreedom: number, finalOrder: number} | null>(null);
    const currentScenario = scenarios[currentScenarioIndex];

    const BalanceMeter = ({ freedom, order }: { freedom: number; order: number }) => {
        const freedomPercentage = Math.max(0, Math.min(100, freedom));
        const orderPercentage = Math.max(0, Math.min(100, order));
        return (
            <div className="w-full max-w-2xl mx-auto p-4 bg-slate-800/80 rounded-xl shadow-lg border border-slate-700">
                <h2 className="text-center text-xl font-bold text-white mb-4">Societal Equilibrium</h2>
                <div className="flex justify-between items-center space-x-4">
                    <div className="flex-1 text-center">
                        <span className="text-lg font-semibold text-sky-300">Freedom</span>
                        <div className="w-full bg-slate-700 rounded-full h-8 mt-2 overflow-hidden border border-slate-600"><div className="bg-sky-500 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${freedomPercentage}%` }}></div></div>
                        <p className="text-white text-2xl font-bold mt-1">{freedomPercentage.toFixed(0)}</p>
                    </div>
                    <div className="text-4xl text-slate-400"><Scale /></div>
                    <div className="flex-1 text-center">
                        <span className="text-lg font-semibold text-teal-300">Order</span>
                        <div className="w-full bg-slate-700 rounded-full h-8 mt-2 overflow-hidden border border-slate-600"><div className="bg-teal-500 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${orderPercentage}%` }}></div></div>
                        <p className="text-white text-2xl font-bold mt-1">{orderPercentage.toFixed(0)}</p>
                    </div>
                </div>
            </div>
        );
    };

    const ScenarioDisplay = ({ scenario }: { scenario: IScenario }) => (
        <div className="w-full max-w-2xl mx-auto p-6 bg-slate-800/50 rounded-xl shadow-lg text-center my-6 border border-slate-700">
            <h3 className="text-2xl font-bold text-blue-400">{scenario.title}</h3>
            <p className="text-slate-400 mt-2">{scenario.description}</p>
        </div>
    );

    const Token = ({ token }: { token: IToken }) => {
        const onDragStart = (e: DragEvent<HTMLDivElement>) => e.dataTransfer.setData("application/json", JSON.stringify(token));
        return (<div draggable onDragStart={onDragStart} className="cursor-grab p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all text-center font-semibold border border-blue-400">{token.label}</div>);
    };

    const TokenTray = ({ tokens }: { tokens: IToken[] }) => (
        <div className="w-full max-w-2xl mx-auto p-4 bg-slate-900/50 rounded-xl mt-6 border border-slate-700">
            <h3 className="text-center text-lg font-semibold text-slate-300 mb-4">Choose a Token to Play</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{tokens.map(token => <Token key={token.id} token={token} />)}</div>
        </div>
    );

    const DropScale = ({ onDrop }: { onDrop: (token: IToken) => void }) => {
        const onDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();
        const handleDrop = (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            const token: IToken = JSON.parse(e.dataTransfer.getData("application/json"));
            if (token) onDrop(token);
        };
        return (
            <div onDragOver={onDragOver} onDrop={handleDrop} className="w-full max-w-xs mx-auto my-6 p-8 border-2 border-dashed border-slate-600 rounded-2xl bg-slate-800/50 text-center transition-colors duration-300 hover:border-blue-500 hover:bg-slate-800">
                <p className="text-slate-400 font-semibold">Drag and Drop Token Here</p>
            </div>
        );
    };

    const DebriefModal = ({ result, onNext }: { result: { token: IToken; randomEvent?: IRandomEvent; finalFreedom: number; finalOrder: number }; onNext: () => void }) => {
        const freedomChange = result.token.meter.freedom + (result.randomEvent?.effect.freedom || 0);
        const orderChange = result.token.meter.order + (result.randomEvent?.effect.order || 0);
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-slate-700 animate-fade-in">
                    <h2 className="text-3xl font-bold text-center text-blue-400 mb-4">Decision Impact</h2>
                    <p className="text-slate-300 text-lg mb-4">You chose to prioritize: <span className="font-bold text-white">{result.token.label}</span>.</p>
                    <div className="bg-slate-900/50 p-4 rounded-lg mb-4 border border-slate-700"><p className="text-slate-400">{result.token.explanation}</p></div>
                    {result.randomEvent && (<div className="bg-red-900/50 p-4 rounded-lg mb-4 border border-red-500/50"><h4 className="font-bold text-red-300">Random Event!</h4><p className="text-red-200">{result.randomEvent.desc}</p></div>)}
                    <div className="text-center my-6">
                        <p className={`text-xl font-semibold ${freedomChange >= 0 ? 'text-sky-400' : 'text-red-400'}`}>Freedom Change: {freedomChange >= 0 ? '+' : ''}{freedomChange}</p>
                        <p className={`text-xl font-semibold ${orderChange >= 0 ? 'text-teal-400' : 'text-red-400'}`}>Order Change: {orderChange >= 0 ? '+' : ''}{orderChange}</p>
                    </div>
                    <div className="flex justify-center"><button onClick={onNext} className="mt-4 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-lg shadow-lg">Next Scenario</button></div>
                </div>
            </div>
        );
    };

    const handleTokenDrop = (token: IToken) => {
        let finalFreedom = freedom + token.meter.freedom, finalOrder = order + token.meter.order, triggeredEvent: IRandomEvent | undefined;
        if (currentScenario.randomEvents) {
            for (const event of currentScenario.randomEvents) {
                if (Math.random() < event.chance) { triggeredEvent = event; finalFreedom += event.effect.freedom; finalOrder += event.effect.order; break; }
            }
        }
        finalFreedom = Math.max(0, Math.min(100, finalFreedom));
        finalOrder = Math.max(0, Math.min(100, finalOrder));
        setFreedom(finalFreedom); setOrder(finalOrder); setDebriefResult({ token, randomEvent: triggeredEvent, finalFreedom, finalOrder }); setGameState('debrief');
    };
    const handleNextScenario = () => {
        if (currentScenarioIndex < scenarios.length - 1) { setCurrentScenarioIndex(prev => prev + 1); setDebriefResult(null); setGameState('playing'); } 
        else { setGameState('end'); }
    };
    const restartGame = () => { setFreedom(50); setOrder(50); setCurrentScenarioIndex(0); setDebriefResult(null); setGameState('playing'); };

    return (
        <div className="w-full max-w-4xl animate-fade-in">
            <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Rights vs. Duties</h1>
                <p className="text-lg text-slate-400 mt-2">A Game of Societal Balance</p>
            </header>
            <main>
                {(gameState === 'playing' || gameState === 'debrief') && (
                    <>
                        <BalanceMeter freedom={freedom} order={order} />
                        <ScenarioDisplay scenario={currentScenario} />
                        <DropScale onDrop={handleTokenDrop} />
                        <TokenTray tokens={currentScenario.tokens} />
                    </>
                )}
                {gameState === 'debrief' && debriefResult && (<DebriefModal result={debriefResult} onNext={handleNextScenario} />)}
                {gameState === 'end' && (
                    <div className="text-center max-w-2xl mx-auto p-8 bg-slate-800/80 rounded-2xl animate-fade-in border border-slate-700">
                        <h2 className="text-4xl font-bold text-blue-400">Game Over!</h2>
                        <p className="text-xl mt-4 text-slate-300">You have completed all scenarios.</p>
                        <div className="mt-8"><h3 className="text-2xl font-semibold mb-4 text-white">Final Equilibrium:</h3><BalanceMeter freedom={freedom} order={order} /></div>
                        <button onClick={restartGame} className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-lg shadow-lg">Play Again</button>
                    </div>
                )}
            </main>
        </div>
    );
};


// --- MAIN APP ---

const Footer = ({ setPage }: { setPage: (page: string) => void }) => (
    <footer className="relative z-10 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        <BookOpen className="w-7 h-7 text-blue-400"/>
                        <span className="font-bold text-xl text-white">SmartSanstha</span>
                    </div>
                    <p className="mt-4 text-slate-400 text-sm max-w-xs mx-auto md:mx-0">
                        An AI-powered platform making constitutional literacy engaging and accessible for everyone.
                    </p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-400">Navigation</h3>
                    <ul className="mt-4 space-y-2">
                        <li><button onClick={() => setPage('home')} className="text-slate-300 hover:text-blue-400 transition-colors text-sm">Home</button></li>
                        <li><button onClick={() => setPage('games')} className="text-slate-300 hover:text-blue-400 transition-colors text-sm">Games</button></li>
                        <li><button onClick={() => setPage('about')} className="text-slate-300 hover:text-blue-400 transition-colors text-sm">About</button></li>
                        <li><button onClick={() => setPage('features')} className="text-slate-300 hover:text-blue-400 transition-colors text-sm">Features</button></li>
                        <li><button onClick={() => setPage('contact')} className="text-slate-300 hover:text-blue-400 transition-colors text-sm">Contact</button></li>
                    </ul>
                </div>
                <div>
                     <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-400">Follow Us</h3>
                     <div className="flex mt-4 space-x-4 justify-center md:justify-start">
                        <a href="#" className="text-slate-400 hover:text-blue-400" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="text-slate-400 hover:text-blue-400" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="text-slate-400 hover:text-blue-400" aria-label="GitHub"><Github className="w-5 h-5" /></a>
                     </div>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                <p>&copy; {new Date().getFullYear()} SmartSanstha. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);

export default function App(): JSX.Element {
  const [page, setPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={setPage} />;
      case 'games':
        return <ExploreGamesPage setPage={setPage}/>
      case 'game-play':
        return <GamePage />;
      case 'rights-duties-game':
        return <RightsDutiesGame />;
      case 'about':
        return <AboutPage />;
      case 'features':
        return <FeaturesPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };
  
  const NavLink = ({ pageName, children }: { pageName: string; children: React.ReactNode }) => (
    <button onClick={() => { setPage(pageName); setIsMenuOpen(false); }} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${(page === pageName || (page === 'game-play' && pageName === 'games')  || (page === 'rights-duties-game' && pageName === 'games')) ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
        {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-20 w-40 h-40 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-sky-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-slate-500 rounded-full blur-3xl"></div>
      </div>
      
       <header className="sticky top-0 z-40 bg-slate-900/70 backdrop-blur-lg border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
                        <BookOpen className="w-7 h-7 text-blue-400"/>
                        <span className="font-bold text-lg">SmartSanstha</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-2">
                        <NavLink pageName="home">Home</NavLink>
                        <NavLink pageName="games">Games</NavLink>
                        <NavLink pageName="about">About</NavLink>
                        <NavLink pageName="features">Features</NavLink>
                        <NavLink pageName="contact">Contact</NavLink>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
             {isMenuOpen && (
                <div className="md:hidden animate-fade-in-down">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={() => { setPage('home'); setIsMenuOpen(false); }} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${page === 'home' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                            <Home className="w-5 h-5"/> Home
                        </button>
                        <button onClick={() => { setPage('games'); setIsMenuOpen(false); }} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${(page === 'games' || page === 'game-play' || page === 'rights-duties-game') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                            <Gamepad2 className="w-5 h-5"/> Games
                        </button>
                        <button onClick={() => { setPage('about'); setIsMenuOpen(false); }} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${page === 'about' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                            <Info className="w-5 h-5"/> About
                        </button>
                         <button onClick={() => { setPage('features'); setIsMenuOpen(false); }} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${page === 'features' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                            <Award className="w-5 h-5"/> Features
                        </button>
                        <button onClick={() => { setPage('contact'); setIsMenuOpen(false); }} className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${page === 'contact' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                            <Mail className="w-5 h-5"/> Contact
                        </button>
                    </div>
                </div>
            )}
       </header>

      <main className="relative z-10 flex flex-col items-center p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>

       <Footer setPage={setPage} />


      <style>{`
        .perspective { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3) translateY(50px); }
          50% { transform: scale(1.05) translateY(-10px); }
          70% { transform: scale(0.95) translateY(5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-bounce-in { animation: bounce-in 0.6s ease-out; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        @keyframes fade-in-down { from { opacity: 0; transform: translateY(-10px) } to { opacity: 1; transform: translateY(0) } }
        .animate-fade-in-down { animation: fade-in-down 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}

