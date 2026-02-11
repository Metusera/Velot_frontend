import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `px-3 py-2 text-sm font-medium transition-colors ${
      isActive(path)
        ? 'text-primary-600 font-semibold'
        : 'text-secondary-700 hover:text-primary-600'
    }`;

  return (
    <header className={`fixed top-0 z-50 w-full transition-shadow duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* Arrow icon matching VeloT logo */}
            <div className="flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 28L20 8L26 20L38 20" stroke="#1F3A56" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30 14L38 20L30 26" stroke="#D97635" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="hidden sm:block leading-none">
              <span className="block font-extrabold text-xl tracking-tight" style={{ lineHeight: '1.1' }}>
                <span className="text-secondary-700">Velo</span><span className="text-primary-600">T</span>
              </span>
              <span className="block text-[10px] font-bold text-primary-600 tracking-[0.25em] uppercase">AFRICA</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/programs" className={navLinkClass('/programs')}>Programs</Link>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <span className="text-sm text-gray-500 hidden lg:inline">
                  {user.fullName || user.email}
                </span>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm px-4 py-2 font-medium text-secondary-700 hover:text-primary-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-sm px-6 py-2 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-secondary-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-secondary-600 hover:bg-gray-50 font-medium">Home</Link>
            <Link to="/programs" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-secondary-600 hover:bg-gray-50 font-medium">Programs</Link>
            <hr className="my-2" />
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-secondary-600 hover:bg-gray-50 font-medium">Dashboard</Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-secondary-600 hover:bg-gray-50 font-medium">Sign In</Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg bg-primary-600 text-white text-center font-semibold">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
