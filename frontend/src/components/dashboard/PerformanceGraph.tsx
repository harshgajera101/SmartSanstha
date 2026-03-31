// frontend/src/components/dashboard/PerformanceGraph.tsx
import React from "react";
import { TrendingUp } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Card } from "../common/Card";

interface PerformanceGraphProps {
  totalScore: number;
  gameScore: number;
}

export const PerformanceGraph: React.FC<PerformanceGraphProps> = ({
  totalScore,
  gameScore,
}) => {
  // Mocking a growth trend based on current totalScore (155 in your data)
  const performanceData = [
    { name: "Week 1", score: Math.round(totalScore * 0.2), games: Math.round(gameScore * 0.1) },
    { name: "Week 2", score: Math.round(totalScore * 0.4), games: Math.round(gameScore * 0.4) },
    { name: "Week 3", score: Math.round(totalScore * 0.7), games: Math.round(gameScore * 0.6) },
    { name: "Week 4", score: totalScore, games: gameScore },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-orange-400" />
          <h2 className="text-2xl font-bold text-white">Performance Analytics</h2>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-slate-400">Score Growth</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
              itemStyle={{ color: "#f97316" }}
              cursor={{ stroke: '#334155', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#f97316"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorScore)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};