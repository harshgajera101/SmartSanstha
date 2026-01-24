// import React, { useState } from 'react';
// import {
//   BookOpen,
//   Menu,
//   X,
//   Home,
//   BookMarked,
//   Gamepad2,
//   User,
//   BarChart3,
//   Mail,
//   Scale,
//   LogIn,
//   LogOut,
//   Shield,
// } from 'lucide-react';

// interface UserData {
//   name: string;
//   type?: string; // 'admin'
// }

// interface NavbarProps {
//   currentPage: string;
//   onNavigate: (page: string) => void;
//   user: UserData | null;
//   onLogout: () => void;
// }

// export const Navbar: React.FC<NavbarProps> = ({
//   currentPage,
//   onNavigate,
//   user,
//   onLogout,
// }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   /* -------------------- Navigation Items -------------------- */

//   const startItems = [
//     { id: 'home', label: 'Home', icon: Home },
//     { id: 'about', label: 'About', icon: User },
//   ];

//   const contactItem = { id: 'contact', label: 'Contact', icon: Mail };

//   const authenticatedItems = [
//     { id: 'learn', label: 'Learn', icon: BookMarked },
//     { id: 'games', label: 'Games', icon: Gamepad2 },
//     { id: 'court-simulation', label: 'Court', icon: Scale },
//     { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
//   ];

//   const navItems = user
//     ? [...startItems, ...authenticatedItems, contactItem]
//     : [...startItems, contactItem];

//   const checkActive = (id: string) =>
//     currentPage === id ||
//     (id === 'games' &&
//       ['memory-game', 'rights-duties-game'].includes(currentPage));

//   /* -------------------- Reusable Links -------------------- */

//   const NavLink = ({
//     item,
//     action,
//     children,
//     customActive,
//   }: {
//     item?: any;
//     action?: () => void;
//     children: React.ReactNode;
//     customActive?: boolean;
//   }) => {
//     const isActive = customActive || (item && checkActive(item.id));

//     return (
//       <button
//         onClick={action || (() => item && onNavigate(item.id))}
//         className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
//           ${
//             isActive
//               ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
//               : 'text-slate-300 hover:bg-slate-800 hover:text-white'
//           }`}
//       >
//         {children}
//       </button>
//     );
//   };

//   const MobileNavLink = ({
//     item,
//     action,
//     children,
//     customActive,
//   }: {
//     item?: any;
//     action?: () => void;
//     children: React.ReactNode;
//     customActive?: boolean;
//   }) => {
//     const Icon = item?.icon;
//     const isActive = customActive || (item && checkActive(item.id));

//     return (
//       <button
//         onClick={action || (() => item && onNavigate(item.id))}
//         className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all
//           ${
//             isActive
//               ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
//               : 'text-slate-300 hover:bg-slate-800 hover:text-white'
//           }`}
//       >
//         {Icon && <Icon className="w-5 h-5" />}
//         {children}
//       </button>
//     );
//   };

//   /* -------------------- JSX -------------------- */

//   return (
//     <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-lg border-b border-slate-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div
//             className="flex items-center gap-2 cursor-pointer group"
//             onClick={() => onNavigate('home')}
//           >
//             <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg group-hover:shadow-orange-500/40 transition-all">
//               <BookOpen className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
//                 SmartSanstha
//               </span>
//               <p className="text-[10px] text-slate-400 -mt-1">
//                 Learn. Play. Grow.
//               </p>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-2">
//             {navItems.map((item) => (
//               <NavLink key={item.id} item={item}>
//                 {item.label}
//               </NavLink>
//             ))}

//             {user ? (
//               <>
//                 {/* User / Admin Indicator */}
//                 <div className="flex items-center gap-2 px-4 ml-2 border-l border-slate-700">
//                   {user.type === 'admin' ? (
//                     <>
//                       <span className="text-sm text-slate-300">Hi</span>
//                       <span className="inline-flex items-center gap-1 px-2 py-0.5
//                       bg-orange-500/15 border border-orange-500/30
//                       rounded-full text-orange-400 text-xs font-semibold
//                       transition-all">
//                         <Shield className="w-3.5 h-3.5" />
//                         Admin
//                       </span>
//                     </>
//                   ) : (
//                     <span className="text-sm text-slate-300">
//                       Hi, {user.name.split(' ')[0]}
//                     </span>
//                   )}
//                 </div>

//                 {/* Logout */}
//                 <button
//                   onClick={onLogout}
//                   className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
//                     text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <NavLink
//                 action={() => onNavigate('auth')}
//                 customActive={currentPage === 'auth'}
//               >
//                 Sign In
//               </NavLink>
//             )}
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
//           >
//             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="md:hidden border-t border-slate-800">
//           <nav className="px-4 py-3 space-y-2">
//             {navItems.map((item) => (
//               <MobileNavLink key={item.id} item={item}>
//                 {item.label}
//               </MobileNavLink>
//             ))}

//             {user && (
//               <div className="pt-2 border-t border-slate-700/50 px-4 flex items-center gap-2">
//                 {user.type === 'admin' ? (
//                   <>
//                     <span className="text-sm text-slate-300">Hi</span>
//                     <span className="inline-flex items-center gap-1 px-2 py-0.5
//                       bg-orange-500/15 border border-orange-500/30
//                       rounded-full text-orange-400 text-xs font-semibold
//                       transition-all">
//                       <Shield className="w-3.5 h-3.5" />
//                       Admin
//                     </span>
//                   </>
//                 ) : (
//                   <span className="text-sm text-slate-300">
//                     Hi, {user.name.split(' ')[0]}
//                   </span>
//                 )}
//               </div>
//             )}

//             <div className="pt-2 border-t border-slate-700/50">
//               {user ? (
//                 <MobileNavLink action={onLogout}>
//                   <LogOut className="w-5 h-5" />
//                   Logout
//                 </MobileNavLink>
//               ) : (
//                 <MobileNavLink
//                   action={() => onNavigate('auth')}
//                   customActive={currentPage === 'auth'}
//                 >
//                   <LogIn className="w-5 h-5" />
//                   Sign In
//                 </MobileNavLink>
//               )}
//             </div>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };














// frontend/src/components/layout/Navbar.tsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Menu,
  X,
  Home,
  BookMarked,
  Gamepad2,
  User,
  BarChart3,
  Mail,
  Scale,
  LogIn,
  LogOut,
  Shield,
} from 'lucide-react';

interface UserData {
  name: string;
  type?: string;
}

interface NavbarProps {
  user: UserData | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  /* -------------------- Navigation Items -------------------- */

  const startItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'about', label: 'About', icon: User, path: '/about' },
  ];

  const contactItem = { id: 'contact', label: 'Contact', icon: Mail, path: '/contact' };

  const authenticatedItems = [
    { id: 'learn', label: 'Learn', icon: BookMarked, path: '/learn' },
    { id: 'games', label: 'Games', icon: Gamepad2, path: '/games' },
    { id: 'court-simulation', label: 'Court', icon: Scale, path: '/court-simulation' },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
  ];

  const navItems = user
    ? [...startItems, ...authenticatedItems, contactItem]
    : [...startItems, contactItem];

  const checkActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  /* -------------------- Reusable Links -------------------- */

  const NavLink = ({ item }: { item: any }) => {
    const isActive = checkActive(item.path);

    return (
      <Link
        to={item.path}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
          ${
            isActive
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
      >
        {item.label}
      </Link>
    );
  };

  const MobileNavLink = ({ item }: { item: any }) => {
    const Icon = item.icon;
    const isActive = checkActive(item.path);

    return (
      <Link
        to={item.path}
        onClick={() => setIsMenuOpen(false)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all
          ${
            isActive
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
      >
        <Icon className="w-5 h-5" />
        {item.label}
      </Link>
    );
  };

  /* -------------------- JSX -------------------- */

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg group-hover:shadow-orange-500/40 transition-all">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                SmartSanstha
              </span>
              <p className="text-[10px] text-slate-400 -mt-1">
                Learn. Play. Grow.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}

            {user ? (
              <>
                {/* User / Admin Indicator */}
                <div className="flex items-center gap-2 px-4 ml-2 border-l border-slate-700">
                  {user.type === 'admin' ? (
                    <>
                      <span className="text-sm text-slate-300">Hi</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-500/15 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold">
                        <Shield className="w-3.5 h-3.5" />
                        Admin
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-slate-300">
                      Hi, {user.name.split(' ')[0]}
                    </span>
                  )}
                </div>

                {/* Logout */}
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${
                    location.pathname === '/login'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-800">
          <nav className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <MobileNavLink key={item.id} item={item} />
            ))}

            {user && (
              <div className="pt-2 border-t border-slate-700/50 px-4 flex items-center gap-2">
                {user.type === 'admin' ? (
                  <>
                    <span className="text-sm text-slate-300">Hi</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-500/15 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold">
                      <Shield className="w-3.5 h-3.5" />
                      Admin
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-slate-300">
                    Hi, {user.name.split(' ')[0]}
                  </span>
                )}
              </div>
            )}

            <div className="pt-2 border-t border-slate-700/50">
              {user ? (
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
                >
                  <LogIn className="w-5 h-5" />
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};