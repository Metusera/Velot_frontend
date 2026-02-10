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
      <section className="relative overflow-hidden">
        {/* Light orange tint */}
        <div className="absolute inset-0 bg-primary-600/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left — Content */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-700 leading-tight mb-5">
                Accelerate Your{' '}
                <span className="text-primary-600">Career</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Learn cutting-edge skills from industry experts. Fast-track your path to success with VeloT Africa's comprehensive courses.
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                <Link
                  to="/programs"
                  className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Explore Courses →
                </Link>
                <a
                  href="#courses"
                  className="px-6 py-3 border-2 border-secondary-700 text-secondary-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Watch Demo
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: '2.5K+', label: 'Active Learners' },
                  { value: '150+', label: 'Expert Courses' },
                  { value: '94%', label: 'Success Rate' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl sm:text-3xl font-bold text-primary-600">{s.value}</p>
                    <p className="text-sm text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Visual */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full max-w-sm h-80 bg-secondary-700 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-3">⚡</div>
                  <p className="text-lg font-medium text-gray-300">Premium Learning Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      {categories.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-700 mb-2">
                Explore Learning Paths
              </h2>
              <p className="text-gray-500">Master in-demand skills across multiple domains</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/programs?category=${cat.slug}`}
                  className="flex flex-col items-center gap-2 p-5 bg-white border border-gray-200 rounded-xl text-center hover:border-primary-500 hover:shadow-sm transition-all group"
                >
                  <span className="text-2xl">{getCategoryIcon(cat.name)}</span>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FEATURED COURSES ─── */}
      <section id="courses" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary-700 mb-1">
              Featured Courses
            </h2>
            <p className="text-gray-500">Trending courses that accelerate your growth</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-primary-600" />
            </div>
          ) : programs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {programs.slice(0, 6).map((program) => (
                  <Link
                    key={program.id}
                    to={`/programs/${program.slug}`}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Image area */}
                    {program.thumbnail ? (
                      <img
                        src={program.thumbnail}
                        alt={program.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center">
                        <span className="text-gray-400 font-semibold text-sm">{program.title}</span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-primary-600 text-sm font-semibold mb-1">
                        {program.category?.name || 'General'}
                      </p>
                      <h3 className="text-base font-bold text-secondary-700 mb-3 leading-snug group-hover:text-primary-600 transition-colors">
                        {program.title}
                      </h3>

                      {/* Meta */}
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-3">
                        <span>⏱️ {program.duration}</span>
                        <span className="capitalize">📘 {program.levelDisplay || program.level}</span>
                      </div>

                      {/* Pricing row */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-lg font-bold text-secondary-700">
                          {formatPrice(program.price)}
                        </span>
                        <span className="text-xs text-gray-400 font-medium capitalize">
                          {program.levelDisplay || program.level}
                        </span>
                      </div>

                      {/* Enroll button */}
                      <div className="mt-4">
                        <span className="block w-full text-center py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg group-hover:bg-primary-700 transition-colors">
                          Enroll Now
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/programs"
                  className="inline-block px-8 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
                >
                  View All Courses
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
              <p className="text-gray-400">No courses available yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── STATS BANNER ─── */}
      <section className="bg-secondary-700 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2.5K+', label: 'Active Learners' },
              { value: '150+', label: 'Expert Courses' },
              { value: '85+', label: 'Instructors' },
              { value: '94%', label: 'Success Rate' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-bold text-primary-500">{s.value}</p>
                <p className="text-gray-300 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-700 mb-2">
                Success Stories
              </h2>
              <p className="text-gray-500">Learn from graduates who transformed their careers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="text-primary-500 text-sm mb-3">
                    {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-5">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    {t.image ? (
                      <img
                        src={`http://localhost:8000${t.image}`}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-secondary-600 flex items-center justify-center text-white font-semibold text-sm">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-secondary-700">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Accelerate Your Future?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of learners already transforming their careers with VeloT Africa
          </p>
          <Link
            to="/programs"
            className="inline-block px-8 py-3.5 bg-secondary-700 text-white font-semibold rounded-lg hover:bg-secondary-800 transition-colors"
          >
            Start Learning Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
