import React from 'react';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';

interface ArticleCardProps {
  article: {
    id: string;
    article: string;
    title: string;
    summary: string;
    readTime: number;
    category: string;
  };
  onNavigate: (page: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onNavigate }) => {
  const categoryColors: { [key: string]: string } = {
    'fundamental-rights': 'from-blue-500 to-cyan-500',
    'directive-principles': 'from-purple-500 to-pink-500',
    'union': 'from-orange-500 to-red-500',
    'other': 'from-green-500 to-emerald-500',
  };

  return (
    <Card hover className="group cursor-pointer" onClick={() => onNavigate('article')}>
      <div className={`w-12 h-12 bg-gradient-to-br ${categoryColors[article.category]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      <div className="text-sm font-bold text-orange-400 mb-2">{article.article}</div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">{article.title}</h3>
      <p className="text-slate-400 text-sm mb-4 line-clamp-3">{article.summary}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Clock className="w-4 h-4" />
          <span>{article.readTime} min read</span>
        </div>
        <button className="flex items-center gap-1 text-orange-400 font-semibold text-sm group-hover:gap-2 transition-all">
          Read <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
};