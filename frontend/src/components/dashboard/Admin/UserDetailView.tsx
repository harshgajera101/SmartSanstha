// frontend/src/components/dashboard/Admin/UserDetailView.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Trophy, Target, BookOpen,
  TrendingUp, Clock, CheckCircle, AlertCircle, Calendar, Bookmark
} from 'lucide-react';
import { Card } from '../../common/Card';
import { ScoreCard } from '../ScoreCard';
import { RecentReading } from "../RecentReading";
import { Bookmarks } from '../Bookmarks';
import { LearnProgress } from '../LearnProgress';
// import { PerformanceGraph } from "../PerformanceGraph";

interface DetailState {
  user: { name: string; email: string; category: string; };
  stats: {
    totalScore: number;
    gameScore: number;
    articleScore: number;
    articlesRead: number;
    quizzesTaken: number;
    currentStreak: number;
    gamesPlayed: number;
    createdAt: string;
    lastActive: string;
  };
  lastArticles: any[];
  bookmarks: any[];
  perPart: { partName: string; readCount: number; totalInPart: number; }[];
}

export const UserDetailView: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<DetailState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';

  const formatDateTime = (dateStr: string | undefined) => {
    if (!dateStr) return "Never";
    return new Date(dateStr).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/admin/users/${userId}/stats`, { credentials: 'include' });
        const json = await res.json();
        if (json.success) setData(json.data);
        else setError(json.message || "User statistics not found");
      } catch (err) {
        setError("Network error: Could not reach the server.");
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUserStats();
  }, [userId, API_URL]);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div></div>;
  if (error || !data) return <div className="p-20 text-center text-white"><AlertCircle className="mx-auto mb-4 text-red-500" size={48} /><p>{error}</p></div>;

  const recentReadingData = data.lastArticles.map((a, i) => ({
    id: i + 1,
    title: `Article ${a.articleNumber}`,
    articleNumber: a.articleNumber,
    partName: a.partName,
    date: new Date(a.lastReadAt || a.completedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  }));

  return (
    <div className="w-full max-w-7xl animate-fade-in mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Admin Dashboard
      </button>

      {/* Header Info Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 mb-8 shadow-xl">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-xl">
            {data.user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{data.user.name}</h1>
            <p className="text-slate-400 text-sm">
              <span className="text-orange-400 font-medium">{data.user.email}</span> • {data.user.category.replace('_', ' ')}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-8">
          <div className="flex items-center gap-3">
            <Calendar className="text-orange-400 w-5 h-5" />
            <div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Created</p>
              <p className="text-slate-200 text-xs font-medium">{formatDateTime(data.stats.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="text-green-400 w-5 h-5" />
            <div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Last Active</p>
              <p className="text-slate-200 text-xs font-medium">{formatDateTime(data.stats.lastActive)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <ScoreCard icon={Trophy} label="Total Score" value={data.stats.totalScore} gradient="from-yellow-500 to-orange-500" />
        <ScoreCard icon={CheckCircle} label="Quizzes" value={`${data.stats.quizzesTaken} Taken`} gradient="from-green-500 to-emerald-600" />
        <ScoreCard icon={Target} label="Games" value={data.stats.gamesPlayed} gradient="from-blue-500 to-cyan-500" />
        <ScoreCard icon={BookOpen} label="Articles" value={data.stats.articlesRead} gradient="from-purple-500 to-pink-500" />
      </div> */}

      <div className="grid lg:grid-cols-3 gap-8 items-stretch">
        {/* Left Column: Stats + Progress */}
        <div className="lg:col-span-2 flex flex-col">
          {/* Combined Stats Grid for better density */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <ScoreCard icon={Trophy} label="Total Score" value={data.stats.totalScore} gradient="from-yellow-500 to-orange-500" />
            <ScoreCard icon={CheckCircle} label="Quizzes" value={`${data.stats.quizzesTaken} Taken`} gradient="from-green-500 to-emerald-600" />
            <ScoreCard icon={Target} label="Games" value={data.stats.gamesPlayed} gradient="from-blue-500 to-cyan-500" />
            <ScoreCard icon={BookOpen} label="Articles" value={data.stats.articlesRead} gradient="from-purple-500 to-pink-500" />
          </div>

          {/* flex-grow ensures LearnProgress fills the height to match the sidebar */}
          <div className="flex-grow">
            <LearnProgress
              perPart={data.perPart}
              articlesRead={data.stats.articlesRead}
              totalArticles={466}
            />
          </div>

          {/* Performance Graph (if uncommented later) will sit nicely below */}
          {/* <div className="mt-8">
      <PerformanceGraph totalScore={data.stats.totalScore} gameScore={data.stats.gameScore} />
    </div> */}
        </div>

        {/* Right Column: Sidebar */}
        <div className="flex flex-col space-y-8">
            <Bookmarks bookmarks={data.bookmarks} />
            <RecentReading activities={recentReadingData} />
        </div>
      </div>
    </div>
  );
};