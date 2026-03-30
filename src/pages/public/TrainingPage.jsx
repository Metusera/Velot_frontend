import { useState } from 'react';
import { Link } from 'react-router-dom';

const curriculum = [
  { icon: '🤖', title: 'Generative AI', desc: 'Prompt engineering, AI tools, and real-world applications' },
  { icon: '📊', title: 'Microsoft Excel', desc: 'Data cleaning, formulas, pivot tables, and dashboards' },
  { icon: '📋', title: 'Google Sheets', desc: 'Collaborative data analysis and automation with Sheets' },
  { icon: '📈', title: 'Power BI', desc: 'Building interactive reports and business dashboards' },
  { icon: '🔍', title: 'Looker Studio', desc: 'Data visualization and reporting with Google Looker Studio' },
];

const highlights = [
  { icon: '📅', label: 'Schedule', value: 'Tue & Thu · 6:00 PM – 8:30 PM' },
  { icon: '🗓️', label: 'Dates', value: 'May – June 2026' },
  { icon: '💰', label: 'Fee', value: '35,000 RWF' },
  { icon: '🌐', label: 'Mode', value: 'Online & Physical' },
];

const TrainingPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="font-sans bg-white dark:bg-secondary-900 pt-16">

      {/* Hero banner */}
      <section className="relative bg-secondary-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/40 via-secondary-900 to-secondary-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm font-semibold tracking-wide">Applications Open Now</span>
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

          <a href="#apply"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-full text-lg hover:bg-primary-500 transition-all shadow-xl shadow-primary-600/30">
            Apply Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
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

      {/* Application form */}
      <section id="apply" className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary-800 dark:text-white mb-3">Apply for the Program</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Fill in the form below — takes less than 2 minutes</p>
          </div>

          {/* Embedded Google Form */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdVJXxBEzOpbPRrwAlE_pt7xqZ5qXVNJGdVDhgj-TboFMIMSg/viewform?embedded=true"
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Training Application Form"
              className="w-full bg-white"
              onLoad={() => setFormSubmitted(true)}
            >
              Loading form…
            </iframe>
          </div>

          {/* WhatsApp join prompt */}
          <div className="mt-10 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30">
              {/* WhatsApp icon */}
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-1">After applying, join our WhatsApp group!</h3>
              <p className="text-green-700 dark:text-green-400 text-sm">Get updates, schedules, and connect with fellow participants before the program starts.</p>
            </div>
            <a
              href="https://chat.whatsapp.com/EHiDdm3UwR0GelHytehxPA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-400 transition-all shadow-lg shadow-green-500/30 whitespace-nowrap"
            >
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TrainingPage;
