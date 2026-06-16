
const curriculum = [
  { icon: '🤖', title: 'Generative AI', desc: 'Prompt engineering, AI tools, and real-world applications' },
  { icon: '📊', title: 'Microsoft Excel', desc: 'Data cleaning, formulas, pivot tables, and dashboards' },
  { icon: '📋', title: 'Google Sheets', desc: 'Collaborative data analysis and automation with Sheets' },
  { icon: '📈', title: 'Power BI', desc: 'Building interactive reports and business dashboards' },
  { icon: '🔍', title: 'Looker Studio', desc: 'Data visualization and reporting with Google Looker Studio' },
];

const highlights = [
  { icon: '📅', label: 'Schedule', value: 'Wed & Fri · 6:00 PM – 8:30 PM' },
  { icon: '🗓️', label: 'Dates', value: 'May – June 2026' },
  { icon: '💰', label: 'Fee', value: '35,000 RWF' },
  { icon: '🌐', label: 'Mode', value: 'Online & Physical' },
  { icon: '📍', label: 'Location', value: 'Kigali, Rwanda' },
];

const TrainingPage = () => {
  return (
    <div className="font-sans bg-white dark:bg-secondary-900 pt-16">

      {/* Hero banner */}
      <section className="relative bg-secondary-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/40 via-secondary-900 to-secondary-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-red-400 text-sm font-semibold tracking-wide">Applications Closed</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            Professional Generative AI<br />
            <span className="text-primary-400">&amp; Data Analytics</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8 font-light">
            Master the tools shaping the future of data and AI — and become job-ready in just 2 months.
          </p>

          {/* Highlight pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {highlights.map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-5 py-2.5 backdrop-blur-sm">
                <span className="text-lg">{icon}</span>
                <span className="text-gray-300 text-sm">{label}:</span>
                <span className="text-white text-sm font-bold">{value}</span>
              </div>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 px-8 py-4 bg-red-600/20 border border-red-500/40 text-red-400 font-bold rounded-full text-lg cursor-default">
            Applications are now closed
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-gray-50 dark:bg-secondary-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary-800 dark:text-white mb-3">What You Will Learn</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">A practical, industry-focused curriculum covering 5 powerful tools</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculum.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white dark:bg-secondary-800 border border-gray-100 dark:border-white/8 rounded-2xl p-6 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-500/30 transition-all group">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-lg font-bold text-secondary-800 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
            {/* Fee card */}
            <div className="bg-primary-600 rounded-2xl p-6 flex flex-col justify-center text-center col-span-1 sm:col-span-2 lg:col-span-2">
              <p className="text-primary-200 text-sm font-semibold uppercase tracking-widest mb-2">Program Fee</p>
              <div className="text-5xl font-extrabold text-white mb-2">35,000 <span className="text-2xl font-semibold text-primary-200">RWF</span></div>
              <p className="text-primary-100 text-sm">One-time payment · Covers full 2-month program</p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications closed notice */}
      <section id="apply" className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-2xl p-10">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-800/40 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-red-700 dark:text-red-400 mb-3">Applications Closed</h2>
            <p className="text-red-600 dark:text-red-300 text-base sm:text-lg max-w-xl mx-auto">
              The application window for the May – June 2026 cohort has now closed. The program is currently in progress.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
              Stay tuned for the next cohort announcement. Join our WhatsApp group to be notified first.
            </p>
            <a
              href="https://chat.whatsapp.com/EHiDdm3UwR0GelHytehxPA"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-400 transition-all shadow-lg shadow-green-500/30"
            >
              Join WhatsApp for Next Cohort
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TrainingPage;
