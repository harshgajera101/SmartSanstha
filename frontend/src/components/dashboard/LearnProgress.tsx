import React from "react";
import { TrendingUp } from "lucide-react";
import { Card } from "../common/Card";
import { ProgressBar } from "../common/ProgressBar";

interface PartProgress {
  partName: string;
  readCount: number;
  totalInPart: number;
}

interface LearnProgressProps {
  perPart: PartProgress[];
  articlesRead: number;
  totalArticles?: number;
}

export const LearnProgress: React.FC<LearnProgressProps> = ({
  perPart,
  articlesRead,
  totalArticles = 466,
}) => {
  const sortedPerPart = [...perPart]
    .filter((p) => p.totalInPart > 0)
    .sort((a, b) => {
      const pa = a.readCount / a.totalInPart;
      const pb = b.readCount / b.totalInPart;
      if (pa === 1 && pb !== 1) return 1;
      if (pa !== 1 && pb === 1) return -1;
      return pb - pa;
    });

  return (
    <Card className="flex flex-col p-0 overflow-hidden">
      {/* Header - Stays Fixed */}
      <div className="flex items-center gap-3 pb-4 shrink-0">
        <TrendingUp className="w-6 h-6 text-orange-400" />
        <h2 className="text-2xl font-bold text-white">Learning Progress</h2>
      </div>

      {/* Content Area - This is what scrolls */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-0 space-y-6 max-h-[380px]">
        {/* Parts List */}
        {sortedPerPart.length > 0 ? (
          sortedPerPart.map((part) => (
            <div key={part.partName}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300 font-semibold">{part.partName}</span>
                <span className="text-slate-400 text-sm">
                  {part.readCount}/{part.totalInPart}
                </span>
              </div>
              <ProgressBar
                value={part.readCount}
                max={part.totalInPart || 1}
                color="primary"
              />
            </div>
          ))
        ) : (
          <p className="text-slate-500 italic py-4">No progress recorded yet.</p>
        )}

        {/* Overall Completion - Now part of the scroll flow at the bottom */}
        <div className="pt-4 border-t border-slate-700/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 font-semibold text-lg">Overall Completion</span>
            <span className="text-slate-400 text-sm font-mono">
              {articlesRead}/{totalArticles}
            </span>
          </div>
          <ProgressBar value={articlesRead} max={totalArticles} color="success" />
        </div>
      </div>
    </Card>
  );
};