import React, { useState } from 'react';
import { BookOpen, Menu, X, Home, BookMarked, Gamepad2, User, BarChart3, Mail, LogIn, LogOut } from 'lucide-react';

// Define a type for the user object for clarity
interface UserData {
  name: string;
}

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  // Add user and onLogout to the props
  user: UserData | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // navItems is now defined inside the component to access the 'user' prop
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'learn', label: 'Learn', icon: BookMarked },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    // Conditionally show dashboard if user is logged in
    ...(user ? [{ id: 'dashboard', label: 'Dashboard', icon: BarChart3 }] : []),
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  // NavLink and MobileNavLink components remain the same, so they are omitted for brevity...
  const NavLink = ({ item, action, isAuth, children }: { item?: typeof navItems[0], action?: () => void, isAuth?: boolean, children: React.ReactNode }) => {
    const isActive = item && currentPage === item.id;
    return (
      <button
        onClick={action || (() => { if(item) onNavigate(item.id); setIsMenuOpen(false); })}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
            : isAuth
            ? 'bg-orange-600 text-white hover:bg-orange-700'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        }`}
      >
        {children}
      </button>
    );
  };
  
  const MobileNavLink = ({ item, action, isAuth, children }: { item?: typeof navItems[0], action?: () => void, isAuth?: boolean, children: React.ReactNode }) => {
    const Icon = item?.icon;
    const isActive = item && currentPage === item.id;
    return (
      <button
        onClick={action || (() => { if(item) onNavigate(item.id); setIsMenuOpen(false); })}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
            : isAuth
            ? 'bg-orange-600 text-white hover:bg-orange-700'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        }`}
      >
        {children}
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
              <NavLink key={item.id} item={item}>{item.label}</NavLink>
            ))}
            {user ? (
              <>
                <span className="text-sm text-slate-300 px-4">Hi, {user.name.split(' ')[0]}</span>
                <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <NavLink isAuth action={() => onNavigate('auth')}>Sign In</NavLink>
            )}
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
              <MobileNavLink key={item.id} item={item}><item.icon className="w-5 h-5"/>{item.label}</MobileNavLink>
            ))}
            <div className="pt-2 border-t border-slate-700/50">
                {user ? (
                    <MobileNavLink action={onLogout}><LogOut className="w-5 h-5" />Logout</MobileNavLink>
                ) : (
                    <MobileNavLink action={() => onNavigate('auth')}><LogIn className="w-5 h-5"/>Sign In</MobileNavLink>
                )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};