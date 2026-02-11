import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Navbar />
      {/* offset for fixed navbar */}
      <main className="flex-1 pt-16">{children}</main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
            {/* About & Links */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white">V</span>
                </div>
                <span className="font-bold text-lg text-white">VeloT Africa</span>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Accelerating Africa's Tech Revolution through industry-leading training programs.
              </p>
              <div className="flex gap-3 text-sm text-gray-300">
                <Link to="/programs" className="hover:text-primary-400 transition">Programs</Link>
                <span className="text-gray-600">|</span>
                <a href="#" className="hover:text-primary-400 transition">About</a>
                <span className="text-gray-600">|</span>
                <a href="#" className="hover:text-primary-400 transition">Contact</a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-3">Legal & Support</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <a href="#" className="hover:text-primary-400 transition">Privacy Policy</a>
                <a href="#" className="hover:text-primary-400 transition">Terms</a>
                <a href="#" className="hover:text-primary-400 transition">Refund Policy</a>
                <a href="#" className="hover:text-primary-400 transition">Help Center</a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-white mb-3">Stay Updated</h4>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2 text-white text-sm font-semibold hover:from-primary-700 hover:to-secondary-700 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-700/50 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-4 text-gray-400">
              <span>&copy; {new Date().getFullYear()} VeloT Africa</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                10,000+ learners
              </span>
              <span className="hidden sm:inline">•</span>
              <span>Industry certified</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { name: 'Twitter', icon: '🐦' },
                { name: 'LinkedIn', icon: '💼' },
                { name: 'Facebook', icon: '📘' },
                { name: 'Instagram', icon: '📸' },
                { name: 'YouTube', icon: '🎥' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="text-gray-400 hover:text-primary-400 transition"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;