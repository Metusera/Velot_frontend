import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROGRAM_BY_SLUG } from '../../graphql/queries/programs';
import { formatPrice, formatDate } from '../../utils/helpers';

const levelBadge = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-blue-100 text-blue-800',
  advanced: 'bg-purple-100 text-purple-800',
};

const ProgramDetailPage = () => {
  const { slug } = useParams();

  const { data, loading, error } = useQuery(GET_PROGRAM_BY_SLUG, {
    variables: { slug },
  });

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 text-center max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-secondary-700 mb-2">Program Not Found</h2>
        <p className="text-gray-500 mb-6">{error.message}</p>
        <Link to="/programs" className="btn-primary">Back to Programs</Link>
      </div>
    );
  }

  const program = data?.programBySlug;
  if (!program) return null;

  return (
    <div className="bg-gray-50">
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            to="/programs"
            className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Programs
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium">
              {program.category?.name}
            </span>
            <span className={`px-4 py-1 rounded-full text-sm font-semibold ${levelBadge[program.level] || 'bg-gray-100 text-gray-700'}`}>
              {program.levelDisplay || program.level}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{program.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {program.duration}
            </span>
            {program.eventCount > 0 && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {program.upcomingEventsCount} upcoming event(s)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content — left 2 cols */}
          <div className="lg:col-span-2 space-y-8">
            {/* Thumbnail */}
            {program.thumbnail ? (
              <img
                src={program.thumbnail}
                alt={program.title}
                className="w-full h-72 sm:h-96 object-cover rounded-xl shadow"
              />
            ) : (
              <div className="w-full h-72 sm:h-96 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow flex items-center justify-center">
                <span className="text-white text-7xl font-bold opacity-60">
                  {program.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-8 border-l-4 border-primary-600">
              <h2 className="text-2xl font-bold text-secondary-700 mb-4">About This Program</h2>
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: program.description }}
              />
            </div>
          </div>

          {/* Sidebar — right col */}
          <div className="space-y-6">
            {/* Price card */}
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Price</p>
              <p className="text-4xl font-bold text-primary-600 mb-5">
                {formatPrice(program.price)}
              </p>
              <button className="btn-primary w-full text-lg py-3">
                Enroll Now
              </button>
            </div>

            {/* Details card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-secondary-700 mb-4">Program Details</h3>
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Duration</dt>
                  <dd className="font-semibold text-gray-900">{program.duration}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Level</dt>
                  <dd className="font-semibold text-gray-900">{program.levelDisplay || program.level}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Category</dt>
                  <dd className="font-semibold text-gray-900">{program.category?.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Total Events</dt>
                  <dd className="font-semibold text-gray-900">{program.eventCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Published</dt>
                  <dd className="font-semibold text-gray-900">
                    {formatDate(program.publishedAt || program.createdAt)}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Upcoming events notice */}
            {program.upcomingEventsCount > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <p className="text-green-800 font-semibold text-sm flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {program.upcomingEventsCount} upcoming event(s) available!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailPage;
