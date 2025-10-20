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
import { BookOpen, TrendingUp, Library, Search, Loader, AlertCircle, Filter } from 'lucide-react';
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
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [parts, setParts] = useState<any[]>([]);
  const [allSubjects, setAllSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Group similar subjects together
  const getSubjectCategory = (subject: string): string => {
    const subjectLower = subject.toLowerCase();
    
    // Fundamental Rights
    if (subjectLower.includes('fundamental rights')) {
      return 'Fundamental Rights';
    }
    // Directive Principles
    if (subjectLower.includes('directive principles')) {
      return 'Directive Principles';
    }
    // Union related (The Union, Union & Its Territory)
    if (subjectLower.includes('the union') || subjectLower.includes('union') && subjectLower.includes('territory')) {
      return 'The Union';
    }
    // States related (The States, Union Territories, Panchayats, Municipalities)
    if (subjectLower.includes('the states') || 
        subjectLower.includes('union territories') || 
        subjectLower.includes('panchayats') || 
        subjectLower.includes('municipalities')) {
      return 'States & Local Bodies';
    }
    // Citizenship
    if (subjectLower.includes('citizenship')) {
      return 'Citizenship';
    }
    // Fundamental Duties
    if (subjectLower.includes('fundamental duties')) {
      return 'Fundamental Duties';
    }
    
    // Everything else
    return 'Other';
  };

  // Create filter categories from subjects
  const createFilterCategories = () => {
    const categoryMap = new Map<string, string[]>();
    
    // Group subjects by category
    allSubjects.forEach(subject => {
      const category = getSubjectCategory(subject);
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)!.push(subject);
    });

    // Convert to filter options
    const categories = [
      { id: 'all', label: 'All Parts', subjects: [] }
    ];

    // Add main categories
    const mainCategories = [
      'Fundamental Rights',
      'Directive Principles',
      'Fundamental Duties',
      'The Union',
      'States & Local Bodies',
      'Citizenship'
    ];

    mainCategories.forEach(cat => {
      if (categoryMap.has(cat)) {
        categories.push({
          id: cat.toLowerCase().replace(/\s+/g, '-'),
          label: cat,
          subjects: categoryMap.get(cat)!
        });
        categoryMap.delete(cat);
      }
    });

    // Add "Other" category with remaining subjects
    const otherSubjects: string[] = [];
    categoryMap.forEach(subjects => {
      otherSubjects.push(...subjects);
    });

    if (otherSubjects.length > 0) {
      categories.push({
        id: 'other',
        label: 'Other',
        subjects: otherSubjects
      });
    }

    return categories;
  };

  const filterCategories = createFilterCategories();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📡 Fetching constitution data...');

      // Fetch both parts and subjects
      const [partsResponse, subjectsResponse]: any[] = await Promise.all([
        articleAPI.getAllParts(),
        articleAPI.getAllSubjects()
      ]);

      console.log('📦 Parts response:', partsResponse);
      console.log('📋 Subjects response:', subjectsResponse);

      if (partsResponse?.success) {
        setParts(partsResponse.data || []);
        console.log(`✅ Loaded ${partsResponse.data?.length || 0} parts`);
      }

      if (subjectsResponse?.success) {
        setAllSubjects(subjectsResponse.data || []);
        console.log(`✅ Loaded ${subjectsResponse.data?.length || 0} subjects`);
      }

    } catch (err: any) {
      console.error('❌ Error fetching data:', err);
      setError('Failed to load data. Make sure backend is running on http://localhost:5001');
    } finally {
      setLoading(false);
    }
  };

  // Enhanced search and filter
  const getFilteredParts = () => {
    let filtered = parts;

    // Apply subject filter
    if (selectedSubject !== 'all') {
      const selectedCategory = filterCategories.find(cat => cat.id === selectedSubject);
      
      if (selectedCategory && selectedCategory.subjects.length > 0) {
        // Filter parts that contain articles with any of the subjects in this category
        filtered = filtered.filter(part => {
          return part.articles?.some((article: any) => 
            selectedCategory.subjects.includes(article.subject)
          );
        });
        console.log(`🔍 Filtered by subject category "${selectedSubject}":`, filtered.length, 'parts');
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((part) => {
        // Search in part title
        const titleMatch = part.title?.toLowerCase().includes(query);
        
        // Search in part description
        const descriptionMatch = part.description?.toLowerCase().includes(query);
        
        // Search in article titles and subjects within this part
        const articleMatch = part.articles?.some((article: any) => 
          article.title?.toLowerCase().includes(query) ||
          article.article?.toLowerCase().includes(query) ||
          article.subject?.toLowerCase().includes(query)
        );

        return titleMatch || descriptionMatch || articleMatch;
      });
      console.log(`🔍 Filtered by search "${searchQuery}":`, filtered.length, 'parts');
    }

    return filtered;
  };

  const filteredParts = getFilteredParts();

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

      {/* Static Recommended Articles Section */}
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
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-slate-400" />
          <h3 className="text-lg font-semibold text-white">Filter by Subject</h3>
        </div>

        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by part name, article title, subject, or article number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Subject Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  console.log(`🎯 Subject category selected: ${category.id}`);
                  console.log(`📋 Includes subjects:`, category.subjects);
                  setSelectedSubject(category.id);
                }}
                className={`px-4 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedSubject === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedSubject !== 'all' || searchQuery.trim()) && (
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <span className="text-slate-400 text-sm">Active filters:</span>
            {selectedSubject !== 'all' && (
              <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm flex items-center gap-2">
                {filterCategories.find(c => c.id === selectedSubject)?.label}
                <button 
                  onClick={() => setSelectedSubject('all')}
                  className="hover:text-orange-300"
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery.trim() && (
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm flex items-center gap-2">
                Search: "{searchQuery}"
                <button 
                  onClick={() => setSearchQuery('')}
                  className="hover:text-blue-300"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSelectedSubject('all');
                setSearchQuery('');
              }}
              className="text-slate-400 hover:text-white text-sm underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-slate-400 text-sm">
        {filteredParts.length === parts.length ? (
          `Showing all ${parts.length} parts`
        ) : (
          `Found ${filteredParts.length} of ${parts.length} parts`
        )}
      </div>

      {/* All Constitution Parts */}
      <ConstitutionParts
        parts={filteredParts}
        searchQuery=""
        selectedCategory="all"
        onNavigate={onNavigate}
      />
    </div>
  );
};