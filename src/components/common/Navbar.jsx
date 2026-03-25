import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const NAV_LINKS = [
  { label: 'Home',     to: '/',        hash: '',          type: 'link'   },
  { label: 'Services', href: '/#services', hash: '#services', type: 'anchor' },
  { label: 'Our Team', href: '/#team',     hash: '#team',     type: 'anchor' },
  { label: 'Contact',  to: '/contact', hash: '',          type: 'link'   },
];

const Navbar = () => {
  const { user, logout } = useAuth();
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

  // Home is only active when on / with no hash
  // Anchors are active when hash matches
  // Other links match by pathname
  const isActive = (item) => {
    if (item.type === 'anchor') return location.hash === item.hash;
    if (item.to === '/') return location.pathname === '/' && !location.hash;
    return location.pathname === item.to;
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-secondary-900/95 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-white/5' : ''
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo — white pill so white-bg PNG looks intentional */}
          <Link to="/" className="flex items-center group">
            <div className="bg-white rounded-xl px-3 py-1.5 shadow-lg group-hover:shadow-xl transition-all duration-200">
              <img
                src="/Logo.png"
                alt="VeloT Africa"
                className="h-10 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop nav — dark pill ONLY on the menu */}
          <div className="hidden md:flex items-center gap-0.5 bg-secondary-900/80 border border-white/10 rounded-full px-1.5 py-1.5 backdrop-blur-md shadow-xl shadow-black/30">
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

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-300 hidden lg:inline max-w-[160px] truncate drop-shadow">
                  {user.fullName || user.email}
                </span>
                <Link to="/dashboard"
                  className="text-sm font-semibold text-gray-200 hover:text-white transition-colors px-3 py-2 drop-shadow">
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="text-sm px-4 py-2 rounded-full bg-secondary-900/70 border border-white/10 backdrop-blur-md text-gray-300 hover:border-red-500/50 hover:text-red-400 transition-all shadow-lg">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="text-sm font-semibold text-gray-200 hover:text-white transition-colors px-3 py-2 drop-shadow">
                  Sign In
                </Link>
                <Link to="/signup"
                  className="text-sm px-5 py-2.5 rounded-full bg-primary-600 text-white font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/40">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-secondary-900/70 border border-white/10 backdrop-blur-md text-gray-300 hover:bg-secondary-800 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-secondary-900/98 backdrop-blur-xl border-t border-white/5 shadow-2xl">
          <div className="px-4 py-5 space-y-1">
            {NAV_LINKS.map((item) => {
              const active = isActive(item);
              const cls = `block px-4 py-3 rounded-xl font-semibold transition-all ${
                active
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`;
              return item.type === 'link'
                ? <Link key={item.label} to={item.to} onClick={() => setMobileMenuOpen(false)} className={cls}>{item.label}</Link>
                : <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className={cls}>{item.label}</a>;
            })}
            <div className="border-t border-white/5 pt-3 mt-3 space-y-1">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white font-semibold transition-all">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-semibold transition-all">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white font-semibold transition-all">
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
