import React, { useEffect, useState, useMemo } from "react";
import { Brain, RotateCcw, Trophy, CheckCircle } from "lucide-react";
import { Button } from "../../common/Button";
import { ProgressBar } from "../../common/ProgressBar";
import { Modal } from "../../common/Modal";
import { ARTICLE_DATA } from "../../../data/articlesData";
import { shuffle, uid } from "../../../utils/helpers";
import { ArticleCard, ArticleData } from "../../../types";
import { MemoryCard } from "./MemoryCard";
import { GameStats } from "./GameStats";
import { MatchModal } from "./MatchModal";

export const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<ArticleCard[]>([]);
  const [first, setFirst] = useState<number | null>(null);
  const [second, setSecond] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [matchedArticleData, setMatchedArticleData] = useState<ArticleData | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  const totalPairs = useMemo(() => ARTICLE_DATA.length, []);

  const initialize = () => {
    const doubled: ArticleCard[] = ARTICLE_DATA.flatMap((a) => [{...a, uid: uid(), flipped: false, matched: false}, {...a, uid: uid(), flipped: false, matched: false}]);
    setCards(shuffle(doubled));
    setFirst(null); setSecond(null); setDisabled(false); setMoves(0); setMatches(0);
    setShowMatchModal(false); setShowCompleteModal(false); setMatchedArticleData(null);
    setTimeElapsed(0); setIsGameActive(true);
  };

  useEffect(() => {
    initialize();
    const stored = localStorage.getItem("memgame_best");
    if (stored) setBest(Number(stored));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive) {
      interval = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive]);

  useEffect(() => {
    if (first === null || second === null) return;

    setDisabled(true);
    setMoves((m) => m + 1);
    const c1 = cards[first];
    const c2 = cards[second];

    if (c1.article === c2.article) {
      setTimeout(() => {
        setCards(prev => prev.map(card => card.article === c1.article ? { ...card, matched: true } : card));
        setMatches((m) => m + 1);
        const fullArticleData = ARTICLE_DATA.find(a => a.article === c1.article);
        if (fullArticleData) setMatchedArticleData(fullArticleData);
        setShowMatchModal(true);
        setFirst(null); setSecond(null); setDisabled(false);
      }, 500);
    } else {
      setTimeout(() => {
        setCards(prev => prev.map((card, index) => (index === first || index === second) ? { ...card, flipped: false } : card));
        setFirst(null); setSecond(null); setDisabled(false);
      }, 900);
    }
  }, [first, second]);

  useEffect(() => {
    if (matches === totalPairs && matches > 0) {
      setIsGameActive(false);
      if (best === null || moves < best) {
        setBest(moves);
        localStorage.setItem("memgame_best", String(moves));
      }
      setTimeout(() => setShowCompleteModal(true), 500);
    }
  }, [matches, moves, best, totalPairs]);

  const handleFlip = (index: number) => {
    if (disabled || cards[index].flipped || cards[index].matched) return;
    setCards(prev => prev.map((card, i) => i === index ? { ...card, flipped: true } : card));
    first === null ? setFirst(index) : setSecond(index);
  };

  const progressPercent = Math.round((matches / totalPairs) * 100);
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
  const getPerformanceMessage = () => {
    if (moves <= totalPairs + 2) return "Exceptional! 🏆";
    if (moves <= totalPairs + 5) return "Excellent! ⭐";
    if (moves <= totalPairs + 9) return "Good job! 👏";
    return "Well done! 🎉";
  };
  
  const gridCols = useMemo(() => "grid-cols-3 sm:grid-cols-6", []);

  return (
    <div className="w-full max-w-7xl animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl mb-6">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Constitution Card Match</h1>
        <p className="text-xl text-slate-400">Test your memory and learn about key constitutional articles.</p>
      </div>

      <GameStats moves={moves} matches={matches} totalPairs={totalPairs} time={formatTime(timeElapsed)} best={best} onNewGame={initialize} />
      <div className="mb-8"><ProgressBar value={progressPercent} /></div>

      <main className={`grid gap-4 ${gridCols} mb-8`}>
        {cards.map((card, idx) => <MemoryCard key={card.uid} card={card} onFlip={() => handleFlip(idx)} />)}
      </main>

      <MatchModal 
        isOpen={showMatchModal}
        onClose={() => setShowMatchModal(false)}
        articleData={matchedArticleData}
      />

      {showCompleteModal && (
        <Modal isOpen={showCompleteModal} onClose={() => {}}>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Trophy className="w-10 h-10 text-white animate-bounce" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Congratulations!</h3>
            <p className="text-lg text-slate-400 mb-4">{getPerformanceMessage()}</p>
            <div className="bg-slate-700 border border-slate-600 rounded-xl p-6 mb-6 space-y-3">
              <div className="flex justify-between items-center"><span className="text-slate-400">Moves:</span><span className="text-2xl font-bold text-white">{moves}</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-400">Time:</span><span className="text-2xl font-bold text-white">{formatTime(timeElapsed)}</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-400">Personal Best:</span><span className="text-2xl font-bold text-orange-400">{best || moves} moves</span></div>
            </div>
            <Button onClick={initialize} variant="primary" className="flex-1">Play Again</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};