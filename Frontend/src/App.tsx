import React, { useState, useEffect } from 'react';
// Reverted import paths to use relative paths instead of the '@/' alias
// to resolve the build error.
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
import { AuthPage } from './pages/AuthPage';

export interface UserData {
  id: string;
  name: string;
  email: string;
  category: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_AUTH_API_BASE_URL;

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch(`${API_URL}/api/user/me`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.profile);
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, [API_URL]);

  const handleLoginSuccess = (userData: UserData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setCurrentPage('home');
    }
  };

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
        return user ? <Dashboard user={user} /> : <HomePage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'auth':
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">Loading...</div>;
  }

  return (
    <>
      <Layout
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      >
        {renderPage()}
      </Layout>
      <ChatbotFloating />
    </>
  );
}

export default App;

