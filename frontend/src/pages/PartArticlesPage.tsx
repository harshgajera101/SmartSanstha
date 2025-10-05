import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Loader, AlertCircle, Search } from 'lucide-react';
import { Card } from '../components/common/Card';
import { ArticleCard } from '../components/learn/ArticleCard';
import { articleAPI } from '../services/api';

interface PartArticlesPageProps {
  onNavigate: (page: string, data?: any) => void;
  partData?: { 
    partName: string;
    partTitle: string;
  };
}

export const PartArticlesPage: React.FC<PartArticlesPageProps> = ({ onNavigate, partData }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (partData?.partName) {
      fetchArticlesByPart(partData.partName);
    } else {
      setError('No part name provided');
      setLoading(false);
    }
  }, [partData]);

  const fetchArticlesByPart = async (partName: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`📚 Fetching articles for part: ${partName}`);
      
      const response: any = await articleAPI.getArticlesByPart(partName);
      
      console.log('Response received:', response);
      
      if (response?.success) {
        setArticles(response.data || []);
        console.log(`✅ Loaded ${response.data?.length || 0} articles`);
      } else {
        setError('Failed to load articles');
      }
    } catch (err: any) {
      console.error('❌ Error fetching articles:', err);
      setError('Failed to load articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) =>
    article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.article?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full max-w-7xl animate-fade-in flex flex-col items-center justify-center py-20">
        <Loader className="w-16 h-16 text-orange-400 animate-spin mb-4" />
        <p className="text-slate-400 text-lg">Loading articles...</p>
      </div>
    );
  }

  if (error || !partData) {
    return (
      <div className="w-full max-w-7xl animate-fade-in">
        <Card className="text-center py-16 border-red-500/50">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Articles</h2>
          <p className="text-slate-400 mb-6">{error || 'Something went wrong.'}</p>
          <button
            onClick={() => onNavigate('learn')}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-all"
          >
            Back to Learn
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('learn')}
        className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-6 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to All Parts</span>
      </button>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl mb-6">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          {partData.partTitle || partData.partName}
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Explore {articles.length} {articles.length === 1 ? 'article' : 'articles'} in this part of the Indian Constitution
        </p>
      </div>

      {/* Search Bar */}
      {articles.length > 0 && (
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles in this part..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      )}

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-16">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-400 mb-2">
            {searchQuery ? 'No articles found' : 'No articles available'}
          </h3>
          <p className="text-slate-500">
            {searchQuery ? 'Try adjusting your search query' : 'This part has no articles yet'}
          </p>
        </Card>
      )}
    </div>
  );
};