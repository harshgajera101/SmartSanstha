import React, { useState } from 'react';
import { BookOpen, TrendingUp, Library, Search } from 'lucide-react';
import { Card } from '../common/Card';
import { CONSTITUTION_PARTS, RECOMMENDED_ARTICLES } from '../../data/articlesData';
import { ArticleCard } from './ArticleCard';
import { ConstitutionParts } from './ConstitutionParts';

interface LearnPageProps {
  onNavigate?: (page: string) => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({ onNavigate = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Parts' },
    { id: 'fundamental-rights', label: 'Fundamental Rights' },
    { id: 'directive-principles', label: 'Directive Principles' },
    { id: 'union', label: 'Union & States' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <div className="w-full max-w-7xl animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl mb-6">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Learn the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Constitution</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Explore all 25 parts of the Indian Constitution, simplified for easy understanding
        </p>
      </div>

      {/* What You'll Learn */}
      <Card className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">What You'll Learn</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Comprehensive understanding of India's constitutional framework
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-slate-700/50 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-white mb-2">Fundamental Rights</h3>
            <p className="text-sm text-slate-400">Your basic rights as an Indian citizen</p>
          </div>
          <div className="text-center p-6 bg-slate-700/50 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Library className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-white mb-2">Government Structure</h3>
            <p className="text-sm text-slate-400">How our democracy functions</p>
          </div>
          <div className="text-center p-6 bg-slate-700/50 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-white mb-2">Directive Principles</h3>
            <p className="text-sm text-slate-400">Guidelines for governance</p>
          </div>
        </div>
      </Card>

      {/* Recommended Articles */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-orange-400" />
          <h2 className="text-3xl font-bold text-white">Recommended for You</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {RECOMMENDED_ARTICLES.map((article) => (
            <ArticleCard key={article.id} article={article} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search parts or articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All Constitution Parts */}
      <ConstitutionParts
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onNavigate={onNavigate}
      />
    </div>
  );
};