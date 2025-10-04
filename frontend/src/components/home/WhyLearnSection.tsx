import React from 'react';
import { Eye, Zap, MessageSquare, LineChart, Award, Users, BookMarked, Target } from 'lucide-react';

export const WhyLearnSection: React.FC = () => {
  const reasons = [
    { icon: Eye, title: 'Clarity & Understanding', desc: 'Simplified content makes complex legal concepts accessible', color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, title: 'Engaging Experience', desc: 'Gamification keeps you motivated and interested', color: 'from-purple-500 to-pink-500' },
    { icon: MessageSquare, title: 'Instant Guidance', desc: 'AI chatbot provides 24/7 support and answers', color: 'from-green-500 to-emerald-500' },
    { icon: LineChart, title: 'Track Progress', desc: 'Visual analytics show your learning journey', color: 'from-orange-500 to-red-500' },
    { icon: Award, title: 'Earn Achievements', desc: 'Badges and rewards motivate continuous learning', color: 'from-yellow-500 to-orange-500' },
    { icon: Users, title: 'Community Learning', desc: 'Connect with fellow learners nationwide', color: 'from-red-500 to-pink-500' },
    { icon: BookMarked, title: 'Structured Content', desc: 'Well-organized parts and articles for easy navigation', color: 'from-indigo-500 to-purple-500' },
    { icon: Target, title: 'Goal-Oriented', desc: 'Set targets and achieve milestones at your pace', color: 'from-cyan-500 to-blue-500' },
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-8 w-full max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Why Learn with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">SmartSanstha?</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto">
          Discover the advantages that make us the best platform for constitutional literacy
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center group cursor-pointer"
          >
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl shadow-lg`}>
              <reason.icon className="w-12 h-12 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">{reason.title}</h3>
            <p className="text-xs text-slate-400">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};