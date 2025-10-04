import React from 'react';
import { Lightbulb, Drama, Gamepad2, BarChart, Bot, BookOpen, Zap, Trophy } from 'lucide-react';
import { Card } from '../common/Card';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Simplified Learning',
      desc: 'Complex constitutional articles translated into clear, easy-to-understand language with AI support and visual aids.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Gamepad2,
      title: 'Gamified Approach',
      desc: 'Memory games, puzzles, and scenario challenges make learning engaging and fun while retaining information better.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Drama,
      title: 'Courtroom Simulation',
      desc: 'Watch real-life inspired cases unfold and observe petitions, defenses, and judgments in interactive courtroom scenarios.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Bot,
      title: 'AI Chatbot Assistant',
      desc: 'Get instant answers to your questions, simplify legal terms, and receive guided suggestions from our intelligent chatbot.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: BarChart,
      title: 'Progress Tracking',
      desc: 'Track your learning journey with visual dashboards, performance metrics, and personalized improvement suggestions.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Trophy,
      title: 'Achievements & Rewards',
      desc: 'Earn badges, unlock achievements, and compete on leaderboards as you master constitutional knowledge.',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Lightbulb,
      title: 'Interactive Quizzes',
      desc: 'Test your knowledge with adaptive quizzes that adjust difficulty based on your performance and learning pace.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Quick Learning',
      desc: 'Micro-lessons and bite-sized content designed for busy schedules, learn anytime, anywhere at your own pace.',
      gradient: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-8 w-full max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Features</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto">
          Everything you need to master the Indian Constitution in one comprehensive platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            hover
            className="text-center group transform transition-all duration-300"
          >
            <div className="mb-4 flex justify-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="font-bold text-lg text-white mb-2">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};