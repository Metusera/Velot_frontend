import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const NAV_LINKS = [
  { label: 'Home',     to: '/',             hash: '',          type: 'link'   },
  { label: 'Services', href: '/#services',  hash: '#services', type: 'anchor' },
  { label: 'Our Team', href: '/#team',      hash: '#team',     type: 'anchor' },
  { label: 'Contact',  to: '/contact',      hash: '',          type: 'link'   },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  const isActive = (item) => {
    if (item.type === 'anchor') return location.hash === item.hash;
    if (item.to === '/') return location.pathname === '/' && !location.hash;
    return location.pathname === item.to;
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 dark:bg-secondary-900/95 backdrop-blur-xl shadow-lg shadow-black/10 dark:shadow-black/40 border-b border-gray-200 dark:border-white/5'
        : ''
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/Logo.png"
              alt="VeloT Africa"
              className="h-24 w-auto object-contain bg-white rounded-2xl px-5 py-2 shadow-lg group-hover:shadow-xl transition-all duration-200"
              style={{ minWidth: '200px' }}
            />
          </Link>

          {/* Desktop nav pill — always dark for contrast over hero */}
          <div className="hidden md:flex items-center gap-0.5 bg-secondary-900/85 dark:bg-secondary-900/85 border border-white/10 rounded-full px-1.5 py-1.5 backdrop-blur-md shadow-xl shadow-black/30">
            {NAV_LINKS.map((item) => {
              const active = isActive(item);
              const cls = `px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                active
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/40'
                  : 'text-gray-200 hover:text-white hover:bg-white/10'
              }`;
              return item.type === 'link'
                ? <Link key={item.label} to={item.to} className={cls}>{item.label}</Link>
                : <a key={item.label} href={item.href} className={cls}>{item.label}</a>;
            })}
          </div>

          {/* Right side — auth + theme toggle */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-400 hidden lg:inline max-w-[140px] truncate">
                  {user.fullName || user.email}
                </span>
                <Link to="/dashboard"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-white transition-colors px-3 py-2">
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="text-sm px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-gray-300 dark:border-white/10 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:border-red-400 hover:text-red-500 transition-all shadow-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-white transition-colors px-3 py-2">
                  Sign In
                </Link>
                <Link to="/signup"
                  className="text-sm px-5 py-2.5 rounded-full bg-primary-600 text-white font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/30">
                  Get Started
                </Link>
              </>
            )}

            {/* ── Theme toggle (top-right corner) ── */}
            <button
              onClick={toggle}
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md text-gray-600 dark:text-yellow-300 hover:bg-primary-50 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-yellow-200 transition-all shadow-sm"
            >
              {dark ? (
                /* Sun — click to go light */
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                /* Moon — click to go dark */
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme toggle mobile */}
            <button
              onClick={toggle}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md text-gray-600 dark:text-yellow-300 transition-all shadow-sm"
            >
              {dark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                </svg>
              )}
            </button>
            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary-900/70 border border-white/10 backdrop-blur-md text-gray-300 hover:bg-secondary-800 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 dark:bg-secondary-900/98 backdrop-blur-xl border-t border-gray-100 dark:border-white/5 shadow-2xl">
          <div className="px-4 py-5 space-y-1">
            {NAV_LINKS.map((item) => {
              const active = isActive(item);
              const cls = `block px-4 py-3 rounded-xl font-semibold transition-all ${
                active
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-secondary-800 dark:hover:text-white'
              }`;
              return item.type === 'link'
                ? <Link key={item.label} to={item.to} onClick={() => setMobileMenuOpen(false)} className={cls}>{item.label}</Link>
                : <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className={cls}>{item.label}</a>;
            })}
            <div className="border-t border-gray-100 dark:border-white/5 pt-3 mt-3 space-y-1">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 font-semibold transition-all">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-semibold transition-all">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 font-semibold transition-all">
                    Sign In
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl bg-primary-600 text-white text-center font-bold hover:bg-primary-500 transition-all">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
