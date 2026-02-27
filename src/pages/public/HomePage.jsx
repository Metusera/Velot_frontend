import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PUBLISHED_PROGRAMS, GET_CATEGORIES } from '../../graphql/queries/programs';
import { useAuth } from '../../hooks/useAuth';
import { formatPrice } from '../../utils/helpers';

const levelBadge = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-blue-100 text-blue-700',
  advanced: 'bg-purple-100 text-purple-700',
};

const SERVICES = [
  {
    title: 'Software Development',
    desc: 'Custom applications and enterprise solutions built with modern frameworks and global best practices.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Internet of Things',
    desc: 'IoT solutions for smart cities, agriculture, and industrial automation to drive operational efficiency.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
  },
  {
    title: 'AI & Machine Learning',
    desc: 'Intelligent systems that learn, adapt, and drive data-driven decision making for organisations.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Data Analytics',
    desc: 'Transforming raw data into actionable insights through sophisticated visualisation and analysis.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Tech Training',
    desc: 'Hands-on programs in software, IoT, AI, and cloud designed to upskill Africa\'s next generation.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'IT Consulting',
    desc: 'Strategic guidance on digital transformation, enterprise architecture, and technology adoption.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const HomePage = () => {
  const { user } = useAuth();
  const { data, loading } = useQuery(GET_PUBLISHED_PROGRAMS, {
    variables: { category: null, level: null },
  });
  const { data: catData } = useQuery(GET_CATEGORIES);

  const programs = data?.publishedPrograms || [];
  const categories = catData?.categories || [];

  return (
    <div>

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden bg-secondary-800 min-h-[90vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-600/40 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <div>
              <img src="/Logo.jpg" alt="VeloT Africa" className="h-14 w-auto brightness-0 invert mb-8" />

              <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                <span className="text-sm text-primary-300 font-medium">Now Enrolling — 2026 Cohort</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
                Innovating Technology.<br />
                <span className="text-primary-400">Building Capacity.</span>
              </h1>

              <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                VeloT Africa delivers world-class technology solutions and practical training to accelerate digital transformation across the continent.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/programs"
                  className="px-7 py-3.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/30">
                  Explore Programs
                </Link>
                {!user && (
                  <Link to="/signup"
                    className="px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                    Get Started Free
                  </Link>
                )}
              </div>

              <div className="flex gap-10 pt-8 border-t border-white/10">
                {[
                  { value: '200+', label: 'Active Learners' },
                  { value: '10+', label: 'Programs' },
                  { value: '95%', label: 'Success Rate' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-extrabold text-white">{s.value}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — glass card */}
            <div className="hidden lg:block">
              <div className="relative ml-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
                    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Fast-Track Learning</p>
                      <p className="text-gray-500 text-xs">Industry-paced curriculum</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-semibold">Popular Tracks</p>
                  <div className="space-y-5">
                    {[
                      { label: 'Software Development', progress: 88, color: 'bg-blue-500' },
                      { label: 'Data Science & AI', progress: 74, color: 'bg-purple-500' },
                      { label: 'Cloud & IoT', progress: 62, color: 'bg-primary-500' },
                      { label: 'Cybersecurity', progress: 51, color: 'bg-green-500' },
                    ].map((t) => (
                      <div key={t.label}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-300">{t.label}</span>
                          <span className="text-white font-bold">{t.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${t.color} rounded-full`} style={{ width: `${t.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {['bg-primary-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-400'].map((c, i) => (
                        <div key={i} className={`w-7 h-7 ${c} rounded-full border-2 border-secondary-800 flex items-center justify-center text-white text-[10px] font-bold`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">+200 learners enrolled</span>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-primary-600 text-white px-4 py-2.5 rounded-2xl shadow-xl text-center">
                  <p className="text-xs font-extrabold uppercase tracking-wider">Certified</p>
                  <p className="text-[10px] text-primary-200">Programs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SERVICES ── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-primary-600 font-bold text-xs uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary-700 mb-4">
              Technology Solutions & Training
            </h2>
            <p className="text-gray-500 leading-relaxed">
              From enterprise software to hands-on skills training — we equip individuals and organisations to thrive in the digital era.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title}
                className="group p-6 border border-gray-200 rounded-2xl hover:border-primary-400 hover:shadow-lg transition-all duration-200">
                <div className="w-12 h-12 bg-secondary-50 border border-secondary-100 text-secondary-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all">
                  {s.icon}
                </div>
                <h3 className="font-bold text-secondary-700 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PROGRAMS ── */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <p className="text-primary-600 font-bold text-xs uppercase tracking-widest mb-3">Learn With Us</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary-700">Featured Programs</h2>
            </div>
            <Link to="/programs" className="mt-4 sm:mt-0 flex items-center gap-1 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Category chips */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.slice(0, 7).map((cat) => (
                <Link key={cat.id} to={`/programs?category=${cat.slug}`}
                  className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all">
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-primary-600" />
            </div>
          ) : programs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {programs.slice(0, 6).map((program) => (
                <Link key={program.id} to={`/programs/${program.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden h-44">
                    {program.thumbnail ? (
                      <img src={program.thumbnail} alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-secondary-600 to-secondary-800 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {program.badges?.includes('new') && (
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-md">NEW</span>
                      )}
                      {program.badges?.includes('hot') && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-md animate-pulse">HOT</span>
                      )}
                      {program.badges?.includes('professional') && (
                        <span className="px-2 py-0.5 bg-purple-600 text-white text-xs font-bold rounded-md">PRO</span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-md ${levelBadge[program.level] || 'bg-white/80 text-gray-700'}`}>
                        {program.levelDisplay || program.level}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-primary-600 text-xs font-bold uppercase tracking-wider mb-1.5">
                      {program.category?.name}
                    </p>
                    <h3 className="font-bold text-secondary-700 mb-3 group-hover:text-primary-600 transition-colors leading-snug">
                      {program.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {program.duration}
                      </span>
                      {program.eventCount > 0 && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {program.upcomingEventsCount} sessions
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-lg font-extrabold text-secondary-700">{formatPrice(program.price)}</span>
                      <span className="px-3 py-1.5 bg-primary-600 text-white text-xs font-bold rounded-lg group-hover:bg-primary-700 transition-colors">
                        Enroll Now
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-gray-300 rounded-2xl bg-white">
              <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-gray-400">Programs coming soon. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. STATS ── */}
      <section className="py-16 bg-secondary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '200+', label: 'Active Learners', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
              { value: '10+', label: 'Expert Programs', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
              { value: '8+', label: 'Expert Instructors', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg> },
              { value: '95%', label: 'Success Rate', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-center mb-2 text-primary-400">{s.icon}</div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white">{s.value}</p>
                <p className="text-gray-400 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-secondary-700 to-secondary-900 rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary-500/10 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <img src="/Logo.jpg" alt="VeloT Africa" className="h-10 mx-auto mb-6 brightness-0 invert opacity-80" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to Transform Your Future?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Whether you're looking to upskill, build a product, or transform your organisation — VeloT Africa has the right solution for you.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/programs"
                  className="px-8 py-3.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-500 transition-colors shadow-lg shadow-primary-600/30">
                  Browse Programs
                </Link>
                {!user ? (
                  <Link to="/signup"
                    className="px-8 py-3.5 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                    Create Free Account
                  </Link>
                ) : (
                  <Link to="/dashboard"
                    className="px-8 py-3.5 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
