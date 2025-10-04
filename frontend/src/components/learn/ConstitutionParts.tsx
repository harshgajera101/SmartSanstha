// import React from 'react';
// import { CONSTITUTION_PARTS } from '../../data/articlesData';
// import { Card } from '../common/Card';
// import { BookOpen, FileText, TrendingUp } from 'lucide-react';

// interface ConstitutionPartsProps {
//   searchQuery: string;
//   selectedCategory: string;
//   onNavigate?: (page: string) => void;
// }

// export const ConstitutionParts: React.FC<ConstitutionPartsProps> = ({
//   searchQuery,
//   selectedCategory,
//   onNavigate = () => {}
// }) => {
//   const filteredParts = CONSTITUTION_PARTS.filter((part) => {
//     const matchesSearch =
//       part.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       part.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory =
//       selectedCategory === 'all' || part.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const difficultyColors = {
//     beginner: 'from-green-500 to-emerald-500',
//     intermediate: 'from-yellow-500 to-orange-500',
//     advanced: 'from-red-500 to-pink-500',
//   };

//   const categoryIcons: { [key: string]: React.ReactNode } = {
//     'fundamental-rights': <BookOpen className="w-5 h-5" />,
//     'directive-principles': <FileText className="w-5 h-5" />,
//     'union': <TrendingUp className="w-5 h-5" />,
//     'other': <BookOpen className="w-5 h-5" />,
//   };

//   return (
//     <div>
//       <div className="flex items-center gap-3 mb-6">
//         <FileText className="w-6 h-6 text-orange-400" />
//         <h2 className="text-3xl font-bold text-white">All 25 Parts</h2>
//         <span className="text-slate-500">({filteredParts.length} parts)</span>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredParts.map((part) => (
//           <Card 
//             key={part.id} 
//             hover 
//             className="group cursor-pointer"
//             onClick={() => onNavigate('article')}
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <div className={`w-12 h-12 bg-gradient-to-br ${difficultyColors[part.difficulty]} rounded-xl flex items-center justify-center font-bold text-white text-lg group-hover:scale-110 transition-transform`}>
//                   {part.partNumber}
//                 </div>
//                 <div className="text-slate-400">
//                   {categoryIcons[part.category]}
//                 </div>
//               </div>
//               <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${difficultyColors[part.difficulty]} text-white`}>
//                 {part.difficulty}
//               </span>
//             </div>
            
//             <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
//               {part.title}
//             </h3>
            
//             <p className="text-slate-400 text-sm mb-4 line-clamp-3">
//               {part.description}
//             </p>
            
//             <div className="flex items-center justify-between pt-4 border-t border-slate-700">
//               <div className="text-sm text-slate-500">
//                 {part.totalArticles} Articles
//               </div>
//               <button className="text-orange-400 font-semibold text-sm hover:gap-2 flex items-center gap-1 transition-all">
//                 Explore →
//               </button>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {filteredParts.length === 0 && (
//         <div className="text-center py-16">
//           <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
//             <BookOpen className="w-10 h-10 text-slate-600" />
//           </div>
//           <h3 className="text-xl font-bold text-slate-400 mb-2">No parts found</h3>
//           <p className="text-slate-500">Try adjusting your search or filters</p>
//         </div>
//       )}
//     </div>
//   );
// };























import React from 'react';
import { Card } from '../common/Card';
import { BookOpen, FileText, TrendingUp } from 'lucide-react';

interface ConstitutionPartsProps {
  parts: any[];
  searchQuery: string;
  selectedCategory: string;
  onNavigate?: (page: string, data?: any) => void;
}

export const ConstitutionParts: React.FC<ConstitutionPartsProps> = ({
  parts,
  searchQuery,
  selectedCategory,
  onNavigate = () => {}
}) => {
  const filteredParts = parts.filter((part) => {
    const matchesSearch =
      part.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const difficultyColors = {
    beginner: 'from-green-500 to-emerald-500',
    intermediate: 'from-yellow-500 to-orange-500',
    advanced: 'from-red-500 to-pink-500',
  };

  const categoryIcons: { [key: string]: React.ReactNode } = {
    'fundamental-rights': <BookOpen className="w-5 h-5" />,
    'directive-principles': <FileText className="w-5 h-5" />,
    'union': <TrendingUp className="w-5 h-5" />,
    'other': <BookOpen className="w-5 h-5" />,
  };

  const handlePartClick = (part: any) => {
    console.log('🎯 Part clicked:', part);
    console.log('📋 Articles in this part:', part.articles);
    
    // Navigate to article page with the first article of this part
    if (part.articles && part.articles.length > 0) {
      const firstArticle = part.articles[0];
      console.log('📄 First article:', firstArticle);
      
      // Pass the article number (without "Article" prefix if it has one)
      const articleNumber = firstArticle.article;
      console.log('🔢 Article number to fetch:', articleNumber);
      
      onNavigate('article', { articleNumber: articleNumber });
    } else {
      console.warn('⚠️ No articles found in this part');
      alert('This part has no articles yet.');
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-orange-400" />
        <h2 className="text-3xl font-bold text-white">All Constitution Parts</h2>
        <span className="text-slate-500">({filteredParts.length} parts)</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParts.map((part) => (
          <Card 
            key={part.id} 
            hover 
            className="group cursor-pointer"
            onClick={() => handlePartClick(part)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${difficultyColors[part.difficulty as keyof typeof difficultyColors] || difficultyColors.intermediate} rounded-xl flex items-center justify-center font-bold text-white text-lg group-hover:scale-110 transition-transform`}>
                  {part.partNumber || '?'}
                </div>
                <div className="text-slate-400">
                  {categoryIcons[part.category] || categoryIcons['other']}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${difficultyColors[part.difficulty as keyof typeof difficultyColors] || difficultyColors.intermediate} text-white`}>
                {part.difficulty || 'intermediate'}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
              {part.title}
            </h3>
            
            <p className="text-slate-400 text-sm mb-4 line-clamp-3">
              {part.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
              <div className="text-sm text-slate-500">
                {part.totalArticles} Articles
              </div>
              <button className="text-orange-400 font-semibold text-sm hover:gap-2 flex items-center gap-1 transition-all">
                Explore →
              </button>
            </div>
          </Card>
        ))}
      </div>

      {filteredParts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-400 mb-2">No parts found</h3>
          <p className="text-slate-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};