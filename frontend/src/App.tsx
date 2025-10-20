import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ArticlePage } from './pages/ArticlePage';
import { PartArticlesPage } from './pages/PartArticlesPage';
import { LearnPage } from './components/learn/LearnPage';
import { ExploreGames } from './components/games/ExploreGames';
import { MemoryGame } from './components/games/MemoryGame/MemoryGame';
import { RightsDutiesGame } from './components/games/RightsDutiesGame/RightsDutiesGame';
import  CivicCityBuilder  from './components/games/CivicCityBuilder/CivicCityBuilder';
import JigsawPuzzle from './components/games/JigsawPuzzle/JigsawPuzzle'; 
import { Dashboard } from './components/dashboard/Dashboard';
import { ChatbotFloating } from './components/chatbot/ChatbotFloating';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState<any>(null);

  const handleNavigation = (page: string, data?: any) => {
    console.log('🧭 Navigation called:', page, data);
    setCurrentPage(page);
    setPageData(data || null);
  };

  const renderPage = () => {
    console.log('📄 Rendering page:', currentPage, 'with data:', pageData);
    
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'about':
        return <AboutPage />;
      case 'learn':
        return <LearnPage onNavigate={handleNavigation} />;
      case 'part-articles':
        return <PartArticlesPage onNavigate={handleNavigation} partData={pageData} />;
      case 'article':
        return <ArticlePage onNavigate={handleNavigation} articleData={pageData} />;
      case 'games':
        return <ExploreGames onNavigate={handleNavigation} />;
      case 'memory-game':
        return <MemoryGame />;
      case 'rights-duties-game':
        return <RightsDutiesGame />;
      case 'civic-city-builder':
        return <CivicCityBuilder />;
      case 'jigsaw-puzzle':
        return <JigsawPuzzle />;  
      case 'dashboard':
        return <Dashboard />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <>
      <Layout currentPage={currentPage} onNavigate={(page) => handleNavigation(page)}>
        {renderPage()}
      </Layout>
      <ChatbotFloating />
    </>
  );
}

export default App;