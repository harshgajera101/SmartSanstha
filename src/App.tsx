// import { useRoutes } from 'react-router-dom'
// import routes from './routes'

// export default function App() {
//   const element = useRoutes(routes)
//   return element
// }


import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ArticlePage } from './pages/ArticlePage';
import { LearnPage } from './components/learn/LearnPage';
import { ExploreGames } from './components/games/ExploreGames';
import { MemoryGame } from './components/games/MemoryGame/MemoryGame';
import { RightsDutiesGame } from './components/games/RightsDutiesGame/RightsDutiesGame';
import { Dashboard } from './components/dashboard/Dashboard';
import { ChatbotFloating } from './components/chatbot/ChatbotFloating';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'learn':
        return <LearnPage onNavigate={setCurrentPage} />;
      case 'article':
        return <ArticlePage onNavigate={setCurrentPage} />;
      case 'games':
        return <ExploreGames onNavigate={setCurrentPage} />;
      case 'memory-game':
        return <MemoryGame />;
      case 'rights-duties-game':
        return <RightsDutiesGame />;
      case 'dashboard':
        return <Dashboard />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>
      <ChatbotFloating />
    </>
  );
}

export default App;