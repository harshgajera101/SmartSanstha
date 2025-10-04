// import React, { useState } from 'react';
// import { BookOpen, TrendingUp, Library, Search } from 'lucide-react';
// import { Card } from '../common/Card';
// import { CONSTITUTION_PARTS, RECOMMENDED_ARTICLES } from '../../data/articlesData';
// import { ArticleCard } from './ArticleCard';
// import { ConstitutionParts } from './ConstitutionParts';

// interface LearnPageProps {
//   onNavigate?: (page: string) => void;
// }

// export const LearnPage: React.FC<LearnPageProps> = ({ onNavigate = () => {} }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');

//   const categories = [
//     { id: 'all', label: 'All Parts' },
//     { id: 'fundamental-rights', label: 'Fundamental Rights' },
//     { id: 'directive-principles', label: 'Directive Principles' },
//     { id: 'union', label: 'Union & States' },
//     { id: 'other', label: 'Other' },
//   ];

//   return (
//     <div className="w-full max-w-7xl animate-fade-in">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl mb-6">
//           <BookOpen className="w-10 h-10 text-white" />
//         </div>
//         <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
//           Learn the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Constitution</span>
//         </h1>
//         <p className="text-xl text-slate-400 max-w-3xl mx-auto">
//           Explore all 25 parts of the Indian Constitution, simplified for easy understanding
//         </p>
//       </div>

//       {/* What You'll Learn */}
//       <Card className="mb-12">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-white mb-4">What You'll Learn</h2>
//           <p className="text-slate-400 max-w-2xl mx-auto">
//             Comprehensive understanding of India's constitutional framework
//           </p>
//         </div>
//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="text-center p-6 bg-slate-700/50 rounded-xl">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
//               <BookOpen className="w-6 h-6 text-white" />
//             </div>
//             <h3 className="font-bold text-white mb-2">Fundamental Rights</h3>
//             <p className="text-sm text-slate-400">Your basic rights as an Indian citizen</p>
//           </div>
//           <div className="text-center p-6 bg-slate-700/50 rounded-xl">
//             <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
//               <Library className="w-6 h-6 text-white" />
//             </div>
//             <h3 className="font-bold text-white mb-2">Government Structure</h3>
//             <p className="text-sm text-slate-400">How our democracy functions</p>
//           </div>
//           <div className="text-center p-6 bg-slate-700/50 rounded-xl">
//             <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
//               <TrendingUp className="w-6 h-6 text-white" />
//             </div>
//             <h3 className="font-bold text-white mb-2">Directive Principles</h3>
//             <p className="text-sm text-slate-400">Guidelines for governance</p>
//           </div>
//         </div>
//       </Card>

//       {/* Recommended Articles */}
//       <div className="mb-16">
//         <div className="flex items-center gap-3 mb-6">
//           <TrendingUp className="w-6 h-6 text-orange-400" />
//           <h2 className="text-3xl font-bold text-white">Recommended for You</h2>
//         </div>
//         <div className="grid md:grid-cols-3 gap-6">
//           {RECOMMENDED_ARTICLES.map((article) => (
//             <ArticleCard key={article.id} article={article} onNavigate={onNavigate} />
//           ))}
//         </div>
//       </div>

//       {/* Search and Filter */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Search parts or articles..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//           <div className="flex gap-2 overflow-x-auto pb-2">
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 className={`px-4 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
//                   selectedCategory === category.id
//                     ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
//                     : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
//                 }`}
//               >
//                 {category.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* All Constitution Parts */}
//       <ConstitutionParts
//         searchQuery={searchQuery}
//         selectedCategory={selectedCategory}
//         onNavigate={onNavigate}
//       />
//     </div>
//   );
// };
















import React, { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, Library, Search, Loader, AlertCircle } from 'lucide-react';
import { Card } from '../common/Card';
import { ArticleCard } from './ArticleCard';
import { ConstitutionParts } from './ConstitutionParts';
import { articleAPI } from '../../services/api';

interface LearnPageProps {
  onNavigate?: (page: string, data?: any) => void;
}

// Static dummy recommended articles for reference
const DUMMY_RECOMMENDED = [
  {
    id: 'article-14',
    article: 'Article 14',
    title: 'Equality before law',
    summary: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    readTime: 5,
    category: 'fundamental-rights'
  },
  {
    id: 'article-19',
    article: 'Article 19',
    title: 'Protection of certain rights regarding freedom of speech',
    summary: 'All citizens shall have the right to freedom of speech and expression, to assemble peaceably, to form associations, and to move freely throughout India.',
    readTime: 6,
    category: 'fundamental-rights'
  },
  {
    id: 'article-21',
    article: 'Article 21',
    title: 'Protection of life and personal liberty',
    summary: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
    readTime: 7,
    category: 'fundamental-rights'
  }
];

export const LearnPage: React.FC<LearnPageProps> = ({ onNavigate = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [parts, setParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Parts' },
    { id: 'fundamental-rights', label: 'Fundamental Rights' },
    { id: 'directive-principles', label: 'Directive Principles' },
    { id: 'union', label: 'Union & States' },
    { id: 'other', label: 'Other' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📡 Fetching constitution parts...');

      const partsResponse: any = await articleAPI.getAllParts();

      console.log('📦 Parts response:', partsResponse);

      if (partsResponse?.success) {
        setParts(partsResponse.data || []);
        console.log(`✅ Loaded ${partsResponse.data?.length || 0} parts`);
      } else {
        setError('Failed to load data from backend');
      }

    } catch (err: any) {
      console.error('❌ Error fetching data:', err);
      setError('Failed to load data. Make sure backend is running on http://localhost:5001');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl animate-fade-in flex flex-col items-center justify-center py-20">
        <Loader className="w-16 h-16 text-orange-400 animate-spin mb-4" />
        <p className="text-slate-400 text-lg">Loading constitution data...</p>
        <p className="text-slate-500 text-sm mt-2">Connecting to backend...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl animate-fade-in">
        <Card className="text-center py-16 border-red-500/50">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Connection Error</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={fetchData}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-all"
            >
              Try Again
            </button>
            <button
              onClick={() => window.open('http://localhost:5001/api/test', '_blank')}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all"
            >
              Test Backend
            </button>
          </div>
        </Card>
      </div>
    );
  }

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
          Explore the Indian Constitution with {parts.length} parts and hundreds of articles
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

      {/* Static Recommended Articles Section (Dummy for Reference) */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-orange-400" />
          <h2 className="text-3xl font-bold text-white">Recommended for You</h2>
          <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold">
            DEMO
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {DUMMY_RECOMMENDED.map((article: any) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onNavigate={onNavigate} 
            />
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
        parts={parts}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onNavigate={onNavigate}
      />
    </div>
  );
};