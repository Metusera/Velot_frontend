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
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white text-lg">V</span>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  VeloT Africa
                </span>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2"></div>
                  <span>Accelerating Africa's Tech Revolution</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2"></div>
                  <span>Industry-leading training programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2"></div>
                  <span>Career transformation through tech skills</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white flex items-center gap-2">
                <span className="w-6 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></span>
                Quick Links
              </h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link 
                    to="/programs" 
                    className="group flex items-center gap-2 hover:text-primary-300 transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full group-hover:scale-125 transition-transform"></span>
                    <span>Programs</span>
                  </Link>
                </li>
                <li>
                  <a 
                    href="#why" 
                    className="group flex items-center gap-2 hover:text-primary-300 transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full group-hover:scale-125 transition-transform"></span>
                    <span>Why Us</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="group flex items-center gap-2 hover:text-primary-300 transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full group-hover:scale-125 transition-transform"></span>
                    <span>Blog</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="group flex items-center gap-2 hover:text-primary-300 transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full group-hover:scale-125 transition-transform"></span>
                    <span>Resources</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white flex items-center gap-2">
                <span className="w-6 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></span>
                Legal
              </h4>
              <ul className="space-y-3 text-gray-300">
                {['Privacy Policy', 'Terms & Conditions', 'Refund Policy', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="group flex items-center gap-2 hover:text-primary-300 transition-all duration-300"
                    >
                      <span className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:scale-125 transition-transform"></span>
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white flex items-center gap-2">
                <span className="w-6 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></span>
                Stay Updated
              </h4>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Subscribe for tech tips, industry insights, and course updates.
              </p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-r from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300 pointer-events-none"></div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-3 text-white text-sm font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl shadow-primary-500/20"
                >
                  Subscribe Now
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-700/50 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} VeloT Africa. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { name: 'Twitter', color: 'hover:text-blue-400', icon: '🐦' },
                { name: 'LinkedIn', color: 'hover:text-blue-500', icon: '💼' },
                { name: 'Facebook', color: 'hover:text-blue-600', icon: '📘' },
                { name: 'Instagram', color: 'hover:text-pink-500', icon: '📸' },
                { name: 'YouTube', color: 'hover:text-red-500', icon: '🎥' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 flex items-center gap-2`}
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                  <span className="text-sm hidden sm:inline">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-8 pt-8 border-t border-gray-700/50 flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Trusted by 10,000+ learners</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Industry certified programs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>24/7 learning support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;