import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Trophy, Flame, Target, BookOpen, 
  TrendingUp, Clock, CheckCircle, AlertCircle, Calendar
} from 'lucide-react';
import { Card } from '../../common/Card';
import { ScoreCard } from '../ScoreCard';
import { ProgressBar } from '../../common/ProgressBar';
import { RecentReading } from '../RecentReading';
import { Bookmarks } from '../Bookmarks';

interface DetailState {
  user: { name: string; email: string; category: string; };
  stats: {
    totalScore: number;
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
    if (!dateStr) return "N/A";
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
        else setError(json.message);
      } catch (err) {
        setError("Failed to fetch user analytics");
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUserStats();
  }, [userId, API_URL]);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div></div>;
  if (error || !data) return <div className="p-20 text-center text-white"><AlertCircle className="mx-auto mb-4 text-red-500" size={48} /><p>{error}</p></div>;

  const formattedActivities = data.lastArticles.map((a, i) => ({
    id: i,
    title: `Article ${a.articleNumber}`,
    articleNumber: a.articleNumber,
    partName: a.partName,
    date: new Date(a.lastReadAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  }));

  return (
    <div className="w-full max-w-7xl animate-fade-in mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={18} /> Back to Admin Dashboard
      </button>
      
      {/* Header with Account Timestamps */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 mb-8 shadow-xl">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {data.user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{data.user.name}</h1>
            <p className="text-slate-400 text-sm">{data.user.email} • <span className="text-orange-400 capitalize">{data.user.category.replace('_', ' ')}</span></p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-8">
          <div className="flex items-center gap-3">
            <Calendar className="text-orange-400 w-5 h-5" />
            <div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Joined On</p>
              <p className="text-slate-200 text-xs">{formatDateTime(data.stats.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="text-green-400 w-5 h-5" />
            <div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Last Active</p>
              <p className="text-slate-200 text-xs">{formatDateTime(data.stats.lastActive)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <ScoreCard icon={Trophy} label="Total Score" value={data.stats.totalScore} gradient="from-yellow-500 to-orange-500" />
        <ScoreCard icon={CheckCircle} label="Quizzes" value={data.stats.quizzesTaken} gradient="from-green-500 to-emerald-600" />
        <ScoreCard icon={Target} label="Games" value={data.stats.gamesPlayed} gradient="from-blue-500 to-cyan-500" />
        <ScoreCard icon={BookOpen} label="Articles" value={data.stats.articlesRead} gradient="from-purple-500 to-pink-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Learning Progress</h2>
            </div>
            <div className="space-y-6">
              {data.perPart.map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2 text-slate-300">
                    <span>{p.partName}</span>
                    <span>{p.readCount}/{p.totalInPart}</span>
                  </div>
                  <ProgressBar value={p.readCount} max={p.totalInPart} color="primary" />
                </div>
              ))}
              <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center">
                <span className="text-white font-bold">Overall Completion</span>
                <span className="text-orange-400 font-bold">{data.stats.articlesRead}/466</span>
              </div>
              <ProgressBar value={data.stats.articlesRead} max={466} color="success" />
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Bookmarks bookmarks={data.bookmarks} />
          <RecentReading activities={formattedActivities} />
          <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20">
             <div className="flex items-center gap-3 mb-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <h3 className="text-white font-bold">User Streak</h3>
             </div>
             <p className="text-3xl font-black text-white">{data.stats.currentStreak} Days</p>
          </Card>
        </div>
      </div>
    </div>
  );
};