import React, { useState } from 'react';
import { BookOpen, Menu, X, Home, BookMarked, Gamepad2, User, BarChart3, Mail } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'learn', label: 'Learn', icon: BookMarked },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = currentPage === item.id || 
      (item.id === 'games' && ['memory-game', 'rights-duties-game'].includes(currentPage));
    
    return (
      <button
        onClick={() => {
          onNavigate(item.id);
          setIsMenuOpen(false);
        }}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
          ${isActive 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }
        `}
      >
        {item.label}
      </button>
    );
  };

  const MobileNavLink = ({ item }: { item: typeof navItems[0] }) => {
    const Icon = item.icon;
    const isActive = currentPage === item.id ||
      (item.id === 'games' && ['memory-game', 'rights-duties-game'].includes(currentPage));
    
    return (
      <button
        onClick={() => {
          onNavigate(item.id);
          setIsMenuOpen(false);
        }}
        className={`
          w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300
          ${isActive 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }
        `}
      >
        <Icon className="w-5 h-5" />
        {item.label}
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                SmartSanstha
              </span>
              <p className="text-[10px] text-slate-400 -mt-1">Learn. Play. Grow.</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map(item => (
              <NavLink key={item.id} item={item} />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in-down border-t border-slate-800">
          <nav className="px-4 py-3 space-y-2">
            {navItems.map(item => (
              <MobileNavLink key={item.id} item={item} />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};