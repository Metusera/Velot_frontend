import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PUBLISHED_PROGRAMS, GET_CATEGORIES } from '../../graphql/queries/programs';
import { formatPrice } from '../../utils/helpers';

const levelBadge = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-blue-100 text-blue-800',
  advanced: 'bg-purple-100 text-purple-800',
};

const ProgramsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const { data: programsData, loading, error } = useQuery(GET_PUBLISHED_PROGRAMS, {
    variables: {
      category: selectedCategory || null,
      level: selectedLevel || null,
    },
  });

  const { data: categoriesData } = useQuery(GET_CATEGORIES);

  if (error) {
    return (
      <div className="py-24 text-center">
        <p className="text-red-600">Error loading programs: {error.message}</p>
      </div>
    );
  }

  const programs = programsData?.publishedPrograms || [];

  return (
    <div className="bg-gray-50">
      {/* Page header */}
      <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Our Programs</h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Explore our professional tech training courses and start building your future today.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-8 flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categoriesData?.categories?.map((cat) => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="input-field"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {(selectedCategory || selectedLevel) && (
            <button
              onClick={() => { setSelectedCategory(''); setSelectedLevel(''); }}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium whitespace-nowrap pb-2.5"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Programs */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600" />
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No programs found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <Link
                key={program.id}
                to={`/programs/${program.slug}`}
                className="group bg-white rounded-xl p-7 border-l-4 border-primary-600 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Badges */}
                {program.badges && program.badges.length > 0 && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    {program.badges.includes('new') && (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-md">
                        🆕 NEW
                      </span>
                    )}
                    {program.badges.includes('hot') && (
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-md animate-pulse">
                        🔥 HOT
                      </span>
                    )}
                    {program.badges.includes('professional') && (
                      <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-md">
                        ⭐ PRO
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3 pr-24">
                  <h3 className="text-xl font-bold text-secondary-600 group-hover:text-primary-600 transition-colors">
                    {program.title}
                  </h3>
                  <span className={`text-xs font-semibold px-3 py-0.5 rounded-full ${levelBadge[program.level] || 'bg-gray-100 text-gray-700'}`}>
                    {program.levelDisplay || program.level}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                  {program.description?.replace(/<[^>]+>/g, '').substring(0, 200)}
                </p>

                <ul className="space-y-1.5 mb-5 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-primary-600 font-bold">&#10003;</span>
                    Duration: {program.duration}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-600 font-bold">&#10003;</span>
                    Category: {program.category?.name}
                  </li>
                  {program.eventCount > 0 && (
                    <li className="flex items-center gap-2">
                      <span className="text-primary-600 font-bold">&#10003;</span>
                      {program.upcomingEventsCount} upcoming event(s)
                    </li>
                  )}
                </ul>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-primary-600 text-white px-5 py-1.5 rounded-full font-bold text-sm">
                    {formatPrice(program.price)}
                  </span>
                  <span className="bg-secondary-600 text-white px-5 py-1.5 rounded-full font-medium text-sm group-hover:bg-primary-700 transition-colors">
                    View Details &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramsPage;