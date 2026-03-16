import { useState, useEffect } from 'react';
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
          <Link to="/" className="flex items-center">
            <img
              src="/Logo.jpg"
              alt="VeloT Africa"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <a href="/#services" className="px-3 py-2 text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors">Services</a>
            <a href="/#team" className="px-3 py-2 text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors">Our Team</a>
            <Link to="/contact" className={navLinkClass('/contact')}>Contact</Link>
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
            <a href="/#services" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-secondary-600 hover:bg-gray-50 font-medium">Services</a>
            <a href="/#team" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-secondary-600 hover:bg-gray-50 font-medium">Our Team</a>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-secondary-600 hover:bg-gray-50 font-medium">Contact</Link>
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
