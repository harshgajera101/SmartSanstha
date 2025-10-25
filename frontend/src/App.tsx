import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ArticlePage } from './pages/ArticlePage';
import { PartArticlesPage } from './pages/PartArticlesPage';
import { LearnPage } from './components/learn/LearnPage';
// import { ExploreGames } from './components/games/ExploreGames';
import { MemoryGame } from './components/games/MemoryGame/MemoryGame';
import { RightsDutiesGame } from './components/games/RightsDutiesGame/RightsDutiesGame';
import  CivicCityBuilder  from './components/games/CivicCityBuilder/CivicCityBuilder';
import JigsawPuzzle from './components/games/JigsawPuzzle/JigsawPuzzle'; 
import { Dashboard } from './components/dashboard/Dashboard';
import { ChatbotFloating } from './components/chatbot/ChatbotFloating';
import { CourtSimulationPage } from './pages/CourtSimulationPage';
import { GamesPage } from './pages/GamesPage';

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
      // case 'games':
      //   return <ExploreGames onNavigate={handleNavigation} />;
      case 'games':
        return <GamesPage onNavigate={handleNavigation} />;
      case 'memory-game':
        return <MemoryGame onNavigate={handleNavigation}/>;
      case 'rights-duties-game':
        return <RightsDutiesGame onNavigate={handleNavigation}/>;
      case 'civic-city-builder':
        return <CivicCityBuilder onNavigate={handleNavigation}/>;
      case 'jigsaw-puzzle':
        return <JigsawPuzzle onNavigate={handleNavigation}/>;  
      case 'dashboard':
        return <Dashboard />;
      case 'contact':
        return <ContactPage />;
      // Add to your navigation handling
      case 'court-simulation':
        return <CourtSimulationPage onNavigate={handleNavigation} />;
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