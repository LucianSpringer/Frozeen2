
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Navbar: React.FC = () => {
  const { user, cart, logout, theme, toggleTheme } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Helper for active link classes
  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    const baseClass = "font-medium transition-colors duration-300";
    
    // On transparent Home hero (Light mode only effect basically, in Dark mode simplified)
    if (isHome && !isScrolled) {
        // If theme is dark, even "transparent" hero needs to be readable.
        // Assuming Hero is always an image/video, white text is safer.
      return `${baseClass} ${isActive ? "text-sky-400 font-bold" : "text-white/90 hover:text-sky-400"}`;
    }
    
    // Normal background (Sticky or other pages)
    return `${baseClass} ${isActive ? "text-sky-500 dark:text-sky-400 font-bold" : "text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400"}`;
  };

  // Navbar Background
  const navBackgroundClass = (isHome && !isScrolled) 
    ? 'bg-transparent border-transparent' 
    : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800';

  const logoTextClass = (isHome && !isScrolled) ? 'text-white' : 'text-sky-600 dark:text-sky-400';
  const logoBgClass = (isHome && !isScrolled) ? 'bg-white/20 text-white' : 'bg-sky-500 text-white';

  const iconClass = (isHome && !isScrolled) 
    ? 'text-white hover:text-sky-400' 
    : 'text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400';

  return (
    <nav className={`fixed w-full top-0 z-40 transition-all duration-300 ${navBackgroundClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${logoBgClass}`}>
                <span className="font-bold text-xl">F</span>
              </div>
              <span className={`font-bold text-2xl tracking-tight ${logoTextClass}`}>Frozeen</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={getLinkClass('/')}>Beranda</Link>
            <Link to="/products" className={getLinkClass('/products')}>Katalog Produk</Link>
            
            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme} 
                className={`p-2 rounded-full transition-colors ${iconClass}`}
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <Link to="/cart" className={`relative p-2 transition-colors ${iconClass}`}>
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-500 rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className={`flex items-center gap-2 font-medium transition-colors ${iconClass}`}>
                  <User size={20} />
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 w-56 mt-4 origin-top-right bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 divide-y divide-gray-100 dark:divide-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2">
                    <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-700 hover:text-sky-600 rounded-lg transition">
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                      <LogOut size={18} /> Keluar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className={`font-medium transition-colors ${iconClass}`}>Masuk</Link>
                <Link to="/register" className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:-translate-y-0.5">
                  Daftar Reseller
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <div className="flex md:hidden items-center gap-4">
            <button 
                onClick={toggleTheme} 
                className={`${isHome && !isScrolled ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}
            >
                {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
             <Link to="/cart" className={`relative p-2 ${isHome && !isScrolled ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${isHome && !isScrolled ? 'text-white' : 'text-slate-600 dark:text-slate-300'} hover:text-sky-500 transition`}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-xl absolute w-full left-0 top-20">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={`block px-4 py-3 rounded-lg text-base font-medium ${location.pathname === '/' ? 'text-sky-600 bg-sky-50 dark:bg-slate-800' : 'text-gray-700 dark:text-slate-200 hover:text-sky-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Beranda</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className={`block px-4 py-3 rounded-lg text-base font-medium ${location.pathname === '/products' ? 'text-sky-600 bg-sky-50 dark:bg-slate-800' : 'text-gray-700 dark:text-slate-200 hover:text-sky-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Katalog Produk</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className={`block px-4 py-3 rounded-lg text-base font-medium ${location.pathname === '/dashboard' ? 'text-sky-600 bg-sky-50 dark:bg-slate-800' : 'text-gray-700 dark:text-slate-200 hover:text-sky-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Dashboard</Link>
                <button onClick={() => {handleLogout(); setIsMenuOpen(false);}} className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">Keluar</button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-center px-4 py-3 rounded-lg text-base font-medium border border-slate-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Masuk</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block text-center px-4 py-3 rounded-lg text-base font-medium bg-orange-500 text-white hover:bg-orange-600">Daftar</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
