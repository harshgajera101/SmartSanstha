import React, { useEffect, useState, useMemo } from "react";
import {
  Brain,
  RotateCcw,
  Trophy,
  Target,
  CheckCircle,
  Star,
  Clock,
  Lightbulb,
} from "lucide-react";
import { Button } from "../../common/Button";
import { ProgressBar } from "../../common/ProgressBar";
import { Modal } from "../../common/Modal";
import { ARTICLE_DATA } from "../../../data/articlesData";
import { shuffle, uid } from "../../../utils/helpers";
import { ArticleCard } from "../../../types";

export const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<ArticleCard[]>([]);
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
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  const totalPairs = ARTICLE_DATA.length;

  const initialize = () => {
    const doubled: ArticleCard[] = ARTICLE_DATA.flatMap((a) => [
      {
        uid: uid(),
        article: a.article,
        expl: a.expl,
        flipped: false,
        matched: false,
      },
      {
        uid: uid(),
        article: a.article,
        expl: a.expl,
        flipped: false,
        matched: false,
      },
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
    setTimeElapsed(0);
    setIsGameActive(true);
  };

  useEffect(() => {
    initialize();
    const stored = localStorage.getItem("memgame_best");
    if (stored) setBest(Number(stored));
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isGameActive && !gameComplete) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, gameComplete]);

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
      setIsGameActive(false);
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

  const progressPercent = Math.round((matches / totalPairs) * 100);

  const gridCols = useMemo(() => {
    if (ARTICLE_DATA.length <= 4) return "grid-cols-2 sm:grid-cols-4";
    if (ARTICLE_DATA.length <= 6)
      return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
    return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6";
  }, []);

  const getPerformanceMessage = () => {
    if (moves <= totalPairs + 2) return "Exceptional! 🏆";
    if (moves <= totalPairs + 4) return "Excellent! ⭐";
    if (moves <= totalPairs + 8) return "Good job! 👏";
    return "Well done! 🎉";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-7xl animate-fade-in">
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl mb-6">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          Constitution Card Match
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Test your memory while learning about India's Constitution
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-700">
          <Target className="w-5 h-5 text-orange-400" />
          <span className="text-sm font-semibold text-slate-300">
            Moves: {moves}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-700">
          <CheckCircle className="w-5 h-5 text-orange-400" />
          <span className="text-sm font-semibold text-slate-300">
            Matches: {matches}/{totalPairs}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-700">
          <Clock className="w-5 h-5 text-orange-400" />
          <span className="text-sm font-semibold text-slate-300">
            Time: {formatTime(timeElapsed)}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-700">
          <Trophy className="w-5 h-5 text-orange-400" />
          <span className="text-sm font-semibold text-slate-300">
            Best: {best === null ? "—" : `${best} moves`}
          </span>
        </div>
        <Button onClick={initialize} icon={<RotateCcw className="w-5 h-5" />}>
          New Game
        </Button>
      </div>

      <div className="mb-8">
        <ProgressBar value={progressPercent} label="Progress" color="primary" />
      </div>

      <main className={`grid gap-4 sm:gap-6 ${gridCols} mb-8`}>
        {cards.map((c, idx) => (
          <button
            key={c.uid}
            className="group w-full rounded-xl h-36 sm:h-44 md:h-48 lg:h-52 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all duration-300"
            style={{ perspective: "1000px" }}
            onClick={() => handleFlip(idx)}
          >
            <div
              className="relative w-full h-full transition-transform duration-700 group-hover:scale-105"
              style={{
                transformStyle: "preserve-3d",
                transform:
                  c.flipped || c.matched ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* FRONT SIDE */}
              <div
                className="absolute inset-0 rounded-xl shadow-lg bg-gradient-to-br from-slate-700 to-slate-800 p-6 flex flex-col items-center justify-center text-white border border-slate-600"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold tracking-wider mb-2">
                    SmartSanstha
                  </div>
                  <div className="text-xs opacity-70 text-slate-400">
                    Tap to Flip
                  </div>
                </div>
              </div>

              {/* BACK SIDE */}
              <div
                className="absolute inset-0 rounded-xl shadow-xl bg-white text-slate-800 border-2 border-orange-500 p-4 sm:p-6 flex flex-col justify-between"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="text-xs text-orange-700 font-semibold bg-orange-100 px-2 py-1 rounded-full">
                    {c.matched ? "MATCHED" : "ARTICLE"}
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

      {/* Match Modal */}
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Perfect Match! 🎉
            </h3>
            <div className="bg-slate-700 text-white px-4 py-2 rounded-xl font-bold text-lg mb-4 border border-slate-600">
              {modalArticle}
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">{modalExpl}</p>
            <Button onClick={() => setShowModal(false)} variant="primary">
              Continue
            </Button>
          </div>
        </Modal>
      )}

      {/* Game Complete Modal */}
      {gameComplete && (
        <Modal isOpen={gameComplete} onClose={() => setGameComplete(false)}>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Trophy className="w-10 h-10 text-white animate-bounce" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">
              Congratulations! 🏆
            </h3>
            <p className="text-lg text-slate-400 mb-4">
              {getPerformanceMessage()}
            </p>
            <div className="bg-slate-700 border border-slate-600 rounded-xl p-6 mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Moves:</span>
                <span className="text-2xl font-bold text-white">{moves}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Time:</span>
                <span className="text-2xl font-bold text-white">
                  {formatTime(timeElapsed)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Personal Best:</span>
                <span className="text-2xl font-bold text-orange-400">
                  {best || moves} moves
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={initialize} variant="primary" className="flex-1">
                Play Again
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
