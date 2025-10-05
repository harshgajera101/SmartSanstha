// import React from 'react';
// import { Clock, BookOpen, ArrowRight } from 'lucide-react';
// import { Card } from '../common/Card';

// interface ArticleCardProps {
//   article: {
//     id: string;
//     article: string;
//     title: string;
//     summary: string;
//     readTime: number;
//     category: string;
//   };
//   onNavigate: (page: string) => void;
// }

// export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onNavigate }) => {
//   const categoryColors: { [key: string]: string } = {
//     'fundamental-rights': 'from-blue-500 to-cyan-500',
//     'directive-principles': 'from-purple-500 to-pink-500',
//     'union': 'from-orange-500 to-red-500',
//     'other': 'from-green-500 to-emerald-500',
//   };

//   return (
//     <Card hover className="group cursor-pointer" onClick={() => onNavigate('article')}>
//       <div className={`w-12 h-12 bg-gradient-to-br ${categoryColors[article.category]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
//         <BookOpen className="w-6 h-6 text-white" />
//       </div>
//       <div className="text-sm font-bold text-orange-400 mb-2">{article.article}</div>
//       <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">{article.title}</h3>
//       <p className="text-slate-400 text-sm mb-4 line-clamp-3">{article.summary}</p>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2 text-slate-500 text-sm">
//           <Clock className="w-4 h-4" />
//           <span>{article.readTime} min read</span>
//         </div>
//         <button className="flex items-center gap-1 text-orange-400 font-semibold text-sm group-hover:gap-2 transition-all">
//           Read <ArrowRight className="w-4 h-4" />
//         </button>
//       </div>
//     </Card>
//   );
// };


























import React from 'react';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';

interface ArticleCardProps {
  article: {
    id: string;
    article: string; // e.g., "Article 14" or "Preamble"
    title: string;
    summary: string;
    readTime: number;
    category: string;
  };
  onNavigate: (page: string, data?: any) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onNavigate }) => {
  const categoryColors: { [key: string]: string } = {
    'fundamental-rights': 'from-blue-500 to-cyan-500',
    'directive-principles': 'from-purple-500 to-pink-500',
    'union': 'from-orange-500 to-red-500',
    'other': 'from-green-500 to-emerald-500',
  };

  const handleClick = () => {
    console.log('🎯 Article card clicked:', article);
    
    // Extract article number from the article string
    // Examples: "Article 14" -> "14", "Preamble" -> "0"
    let articleNumber = '';
    
    if (article.article === 'Preamble') {
      articleNumber = '0';
    } else {
      // Extract number from "Article X" format
      const match = article.article.match(/Article\s+(\d+)/);
      if (match) {
        articleNumber = match[1];
      } else {
        // If article.id format is "article-X", extract X
        const idMatch = article.id.match(/article-(\d+)/);
        if (idMatch) {
          articleNumber = idMatch[1];
        }
      }
    }
    
    console.log('🔢 Extracted article number:', articleNumber);
    
    if (articleNumber) {
      onNavigate('article', { articleNumber });
    } else {
      console.error('❌ Could not extract article number from:', article);
      alert('Unable to load this article. Please try again.');
    }
  };

  return (
    <Card hover className="group cursor-pointer" onClick={handleClick}>
      <div className={`w-12 h-12 bg-gradient-to-br ${
        categoryColors[article.category] || categoryColors['other']
      } rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      
      <div className="text-sm font-bold text-orange-400 mb-2">
        {article.article}
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
        {article.title}
      </h3>
      
      <p className="text-slate-400 text-sm mb-4 line-clamp-3">
        {article.summary}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
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