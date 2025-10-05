import React from 'react';
import { BarChart3, Trophy, Target, TrendingUp, Award, Flame, Calendar, BookOpen } from 'lucide-react';
// Corrected import paths to use the '@/' alias, which is the standard for your project setup.
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';
import { UserProgress } from './UserProgress';
import { ScoreCard } from './ScoreCard';
import { AchievementBadges } from './AchievementBadges';

// Define a type for the user object that will be passed in as a prop
interface UserData {
  name: string;
}

interface DashboardProps {
  user: UserData | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  // If no user data is passed, show a fallback message or loading state.
  if (!user) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Loading user data...</h1>
      </div>
    );
  }

  // Demo data - some parts can be kept for static display for now
  const staticData = {
    avatar: user.name.split(' ').map(n => n[0]).join(''), // Generate avatar initials from the user's name
    totalScore: 2450,
    gamesPlayed: 15,
    articlesRead: 23,
    quizzesTaken: 8,
    currentStreak: 7,
    joinedDate: '2025-01-15',
  };

  const recentActivity = [
    { id: 1, type: 'game', title: 'Constitution Card Match', score: 85, date: '2025-10-03' },
    { id: 2, type: 'article', title: 'Article 21 - Right to Life', progress: 100, date: '2025-10-02' },
    { id: 3, type: 'quiz', title: 'Fundamental Rights Quiz', score: 90, date: '2025-10-01' },
    { id: 4, type: 'game', title: 'Rights vs. Duties', score: 78, date: '2025-09-30' },
  ];

  const weeklyProgress = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 80 },
    { day: 'Wed', value: 45 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 75 },
    { day: 'Sat', value: 60 },
    { day: 'Sun', value: 85 },
  ];

  return (
    <div className="w-full max-w-7xl animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl">
            {staticData.avatar}
          </div>
          <div>
            {/* The user's name is now displayed dynamically from the prop */}
            <h1 className="text-4xl font-bold text-white">Welcome back, {user.name}! 👋</h1>
            <p className="text-slate-400">Track your constitutional learning journey</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <ScoreCard
          icon={Trophy}
          label="Total Score"
          value={staticData.totalScore}
          gradient="from-yellow-500 to-orange-500"
          trend="+12%"
        />
        <ScoreCard
          icon={Flame}
          label="Current Streak"
          value={`${staticData.currentStreak} days`}
          gradient="from-red-500 to-pink-500"
          trend="🔥"
        />
        <ScoreCard
          icon={Target}
          label="Games Played"
          value={staticData.gamesPlayed}
          gradient="from-blue-500 to-cyan-500"
          trend="+3"
        />
        <ScoreCard
          icon={BookOpen}
          label="Articles Read"
          value={staticData.articlesRead}
          gradient="from-purple-500 to-pink-500"
          trend="+5"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Learning Progress */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Learning Progress</h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-semibold">Fundamental Rights</span>
                  <span className="text-slate-400 text-sm">18/24 Articles</span>
                </div>
                <ProgressBar value={18} max={24} color="primary" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-semibold">Directive Principles</span>
                  <span className="text-slate-400 text-sm">10/16 Articles</span>
                </div>
                <ProgressBar value={10} max={16} color="info" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-semibold">Union & States</span>
                  <span className="text-slate-400 text-sm">45/100 Articles</span>
                </div>
                <ProgressBar value={45} max={100} color="warning" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-semibold">Overall Progress</span>
                  <span className="text-slate-400 text-sm">73/395 Articles</span>
                </div>
                <ProgressBar value={73} max={395} color="success" />
              </div>
            </div>
          </Card>

          {/* Weekly Activity Chart */}
          <Card className="mt-8">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Weekly Activity</h2>
            </div>
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full bg-slate-700 rounded-t-lg overflow-hidden" style={{ height: '100%' }}>
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg transition-all duration-500"
                      style={{ height: `${day.value}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-slate-500">
              Average daily activity: 72 minutes
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Achievements */}
          <AchievementBadges />

          {/* Recent Activity */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-orange-400" />
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'game' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                    activity.type === 'article' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                    'bg-gradient-to-br from-green-500 to-emerald-500'
                  }`}>
                    {activity.type === 'game' ? '🎮' : activity.type === 'article' ? '📖' : '📝'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-sm truncate">{activity.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-slate-400">{activity.date}</span>
                      {activity.score && (
                        <span className="text-xs font-bold text-orange-400">{activity.score}%</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* User Progress Component */}
      <UserProgress />
    </div>
  );
};

