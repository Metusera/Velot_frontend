import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PUBLISHED_PROGRAMS, GET_CATEGORIES } from '../../graphql/queries/programs';
import { GET_TESTIMONIALS } from '../../graphql/queries/users';
import { useAuth } from '../../hooks/useAuth';
import { formatPrice } from '../../utils/helpers';

const categoryIcons = {
  'data': '📊',
  'web': '🌐',
  'programming': '💻',
  'cloud': '☁️',
  'marketing': '📢',
  'cyber': '🔐',
  'ai': '🤖',
  'design': '🎨',
  'mobile': '📱',
  'business': '💼',
};

const getCategoryIcon = (name) => {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (lower.includes(key)) return icon;
  }
  return '📚';
};

const levelBadge = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-blue-100 text-blue-700',
  advanced: 'bg-purple-100 text-purple-700',
};

const HomePage = () => {
  const { user } = useAuth();
  const { data, loading } = useQuery(GET_PUBLISHED_PROGRAMS, {
    variables: { category: null, level: null },
  });
  const { data: catData } = useQuery(GET_CATEGORIES);
  const { data: testiData } = useQuery(GET_TESTIMONIALS);

  const programs = data?.publishedPrograms || [];
  const categories = catData?.categories || [];
  const testimonials = testiData?.testimonials || [];

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-800 via-secondary-700 to-secondary-900">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-secondary-600/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-white/90 font-medium">Now Enrolling — 2026 Cohort</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                Accelerate Your
                <span className="block text-primary-400">Tech Career</span>
              </h1>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
                Industry-led training programs designed for Africa's next generation of tech professionals. Learn from experts, build real projects, and get certified.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/programs"
                  className="px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40"
                >
                  Explore Programs
                </Link>
                {!user && (
                  <Link
                    to="/signup"
                    className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                  >
                    Sign Up Free
                  </Link>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                {[
                  { value: '10K+', label: 'Active Learners' },
                  { value: '50+', label: 'Programs' },
                  { value: '94%', label: 'Completion Rate' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl sm:text-3xl font-bold text-white">{s.value}</p>
                    <p className="text-sm text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Visual Card Stack */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Main card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold">Fast-Track Learning</p>
                      <p className="text-gray-400 text-sm">Industry-paced curriculum</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'Web Development', progress: 85, color: 'bg-blue-500' },
                      { label: 'Data Science & AI', progress: 72, color: 'bg-purple-500' },
                      { label: 'Cloud Computing', progress: 63, color: 'bg-green-500' },
                    ].map((track) => (
                      <div key={track.label}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-gray-300">{track.label}</span>
                          <span className="text-white font-semibold">{track.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${track.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${track.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-primary-600 text-white px-4 py-2 rounded-xl shadow-lg font-bold text-sm">
                  Certified
                </div>

                {/* Floating users card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['bg-primary-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'].map((color, i) => (
                      <div key={i} className={`w-8 h-8 ${color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">10,000+</p>
                    <p className="text-xs text-gray-500">Learners enrolled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUSTED BY / PARTNERS ─── */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Trusted by leading organizations</p>
            <div className="flex items-center gap-8 text-gray-300">
              {['Google', 'Microsoft', 'AWS', 'Meta', 'IBM'].map((name) => (
                <span key={name} className="text-lg font-bold tracking-wide">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      {categories.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">Learning Paths</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-700 mb-3">
                Explore Our Categories
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Master in-demand skills across multiple technology domains with our structured learning paths</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/programs?category=${cat.slug}`}
                  className="flex flex-col items-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl text-center hover:border-primary-400 hover:shadow-md transition-all group"
                >
                  <span className="text-3xl">{getCategoryIcon(cat.name)}</span>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── WHY VELOT ─── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">Why VeloT Africa</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-700 mb-3">
              Built for Africa's Tech Future
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Everything you need to launch and grow your career in technology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'Industry-Led Curriculum',
                desc: 'Programs designed with input from leading tech companies in Africa and globally.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Expert Instructors',
                desc: 'Learn from professionals with real-world experience at top tech organizations.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: 'Recognized Certificates',
                desc: 'Earn certificates valued by employers across Africa and internationally.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Hands-on Projects',
                desc: 'Build a portfolio of real projects that showcase your skills to employers.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Flexible Learning',
                desc: 'Study at your own pace with on-demand content and live sessions.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Career Support',
                desc: 'Get career guidance, interview prep, and direct connections to hiring partners.',
              },
            ].map((feature) => (
              <div key={feature.title} className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-primary-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-secondary-700 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED COURSES ─── */}
      <section id="courses" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">Featured Programs</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-700">
                Popular Courses
              </h2>
            </div>
            <Link
              to="/programs"
              className="mt-4 sm:mt-0 text-primary-600 font-semibold hover:text-primary-700 transition-colors flex items-center gap-1"
            >
              View all programs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-primary-600" />
            </div>
          ) : programs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.slice(0, 6).map((program) => (
                <Link
                  key={program.id}
                  to={`/programs/${program.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative">
                    {program.thumbnail ? (
                      <img
                        src={program.thumbnail}
                        alt={program.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-secondary-600 to-secondary-800 flex items-center justify-center">
                        <span className="text-5xl font-bold text-white/20">{program.title.charAt(0)}</span>
                      </div>
                    )}

                    {/* Badges overlay */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {program.badges?.includes('new') && (
                        <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-lg shadow-sm">NEW</span>
                      )}
                      {program.badges?.includes('hot') && (
                        <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-sm animate-pulse">HOT</span>
                      )}
                      {program.badges?.includes('professional') && (
                        <span className="px-2.5 py-1 bg-purple-600 text-white text-xs font-bold rounded-lg shadow-sm">PRO</span>
                      )}
                    </div>

                    {/* Level badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${levelBadge[program.level] || 'bg-gray-100 text-gray-700'}`}>
                        {program.levelDisplay || program.level}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-primary-600 text-xs font-semibold uppercase tracking-wider mb-2">
                      {program.category?.name || 'General'}
                    </p>
                    <h3 className="text-lg font-bold text-secondary-700 mb-3 group-hover:text-primary-600 transition-colors leading-snug">
                      {program.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {program.duration}
                      </span>
                      {program.eventCount > 0 && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {program.upcomingEventsCount} events
                        </span>
                      )}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xl font-bold text-secondary-700">
                        {formatPrice(program.price)}
                      </span>
                      <span className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg group-hover:bg-primary-700 transition-colors">
                        Enroll Now
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-2xl">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-gray-400 text-lg">Programs coming soon. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── STATS BANNER ─── */}
      <section className="bg-secondary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10,000+', label: 'Active Learners', icon: '👥' },
              { value: '50+', label: 'Expert Programs', icon: '📚' },
              { value: '85+', label: 'Certified Instructors', icon: '🎓' },
              { value: '94%', label: 'Success Rate', icon: '📈' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{s.value}</p>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      {testimonials.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">Testimonials</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-700 mb-3">
                Success Stories
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Hear from graduates who transformed their careers with VeloT Africa</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow relative"
                >
                  {/* Quote mark */}
                  <div className="absolute top-6 right-6 text-4xl text-primary-200 font-serif leading-none">"</div>

                  <div className="flex items-center gap-1 text-primary-500 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-primary-500' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.text}"</p>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    {t.image ? (
                      <img
                        src={`http://localhost:8000${t.image}`}
                        alt={t.name}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-secondary-700">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 py-20">
        {/* Decorative */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-700/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of learners already building the future with VeloT Africa. Start your journey today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/programs"
              className="px-8 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Browse Programs
            </Link>
            {!user && (
              <Link
                to="/signup"
                className="px-8 py-3.5 bg-secondary-700 text-white font-bold rounded-xl hover:bg-secondary-800 transition-colors"
              >
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
