import React, { useEffect, useMemo, useState } from "react";
import { BookOpen, Trophy, RotateCcw, Star, Lightbulb, CheckCircle, Target, Brain } from "lucide-react";

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
  { article: "Article 370", expl: "(Historic) Special status clause — now abrogated in 2019; used here as a contextual discussion prompt." },
  { article: "Article 51A", expl: "Fundamental duties of citizens, such as respecting the Constitution and promoting harmony." }
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

export default function MemoryCardGame(): JSX.Element {
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
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-20 w-40 h-40 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-sky-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-slate-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center p-4 sm:p-6">
        <div className="w-full max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 border border-slate-700 rounded-full shadow-xl mb-6">
              <Brain className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Constitution Card Match
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Test your memory while learning about India's Constitution through this engaging card matching game.
            </p>
          </div>

          {/* Game Stats */}
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
            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold"
            >
              <RotateCcw className="w-5 h-5" />
              New Game
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold text-slate-300">Progress</span>
              </div>
              <span className="text-sm font-bold text-slate-300">{progressPercent}%</span>
            </div>
            <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden shadow-inner border border-slate-600">
              <div 
                className="h-full bg-blue-500 transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${progressPercent}%` }}
              >
              </div>
            </div>
          </div>

          {/* Game Grid */}
          <main className={`grid gap-4 sm:gap-6 ${gridCols} mb-8`}>
            {cards.map((c, idx) => (
              <button
                key={c.uid}
                className={`group perspective w-full rounded-xl h-36 sm:h-44 md:h-48 lg:h-52 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 ${
                  c.matched ? 'opacity-50' : ''
                }`}
                onClick={() => handleFlip(idx)}
                aria-label={`Card ${idx + 1} ${c.matched ? 'matched' : c.flipped ? c.article : 'face down'}`}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${c.flipped || c.matched ? 'rotate-y-180' : ''} group-hover:scale-105`}>
                  {/* Card Back (Face Down) */}
                  <div className="absolute inset-0 backface-hidden rounded-xl shadow-lg bg-slate-700 p-6 flex flex-col items-center justify-center text-white border border-slate-600">
                    <div className="relative z-10 text-center">
                      <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-90 text-blue-400" />
                      <div className="text-lg sm:text-xl font-bold tracking-wider mb-2">Constitution Quest</div>
                      <div className="text-xs opacity-70 text-slate-400">Tap to Flip</div>
                    </div>
                  </div>

                  {/* Card Front (Face Up) */}
                  <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-xl shadow-xl bg-white text-slate-800 border-2 border-slate-200 p-4 sm:p-6 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="text-xs text-blue-700 font-semibold bg-blue-100 px-2 py-1 rounded-full">
                        {c.matched ? 'MATCHED' : 'ARTICLE'}
                      </div>
                      {c.matched && (
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                          {c.article}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Lightbulb className="w-3 h-3" />
                        Learn
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </main>
        </div>
      </div>

      {/* Match Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-50 max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl p-6 transform animate-bounce-in border border-slate-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Perfect Match! 🎉</h3>
              <div className="bg-slate-700 text-white px-4 py-2 rounded-xl font-bold text-lg mb-4 border border-slate-600">
                {modalArticle}
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">{modalExpl}</p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Complete Modal */}
      {gameComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-50 max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl p-6 transform animate-bounce-in border border-slate-700">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-spin-slow">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Congratulations! 🏆</h3>
              <p className="text-lg text-slate-400 mb-4">{getPerformanceMessage()}</p>
              <div className="bg-slate-700 border border-slate-600 rounded-xl p-4 mb-6">
                <div className="text-3xl font-bold text-white">{moves} Moves</div>
                <div className="text-sm text-slate-400">
                  {best === moves ? "New Personal Best!" : `Personal Best: ${best || "—"} moves`}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
        .animate-fade-in { animation: fade-in 280ms ease; }
      `}</style>
    </div>
  );
}

