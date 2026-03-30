import Navbar from '../../components/common/Navbar';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32">{children}</main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-gray-50 dark:bg-secondary-900 border-t border-gray-200 dark:border-white/5 text-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
            {/* About & Links */}
            <div>
              <div className="mb-4">
                <div className="bg-white inline-block rounded-xl px-3 py-1.5 mb-3">
                  <img src="/Logo.jpg" alt="VeloT Africa" className="h-8 w-auto object-contain" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Innovating Technology. Building Africa's Digital Future through software, IoT, AI, data analytics, training, and research.
              </p>
              <div className="flex gap-3 text-sm text-gray-300">
                
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
              <span>Kigali, Rwanda</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {/* LinkedIn */}
              <a href="https://linkedin.com/company/velotafrica" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="https://x.com/velotafrica" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-white hover:text-secondary-900 hover:border-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com/velotafrica" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;