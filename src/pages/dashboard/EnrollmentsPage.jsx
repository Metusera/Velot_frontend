import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_MY_ENROLLMENTS } from '../../graphql/queries/enrollments';
import { formatDate } from '../../utils/helpers';

const statusBadge = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  inactive: 'bg-gray-100 text-gray-800',
};

const EnrollmentsPage = () => {
  const { data, loading, error } = useQuery(GET_MY_ENROLLMENTS);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 text-center">
        <p className="text-red-600">Error loading enrollments: {error.message}</p>
      </div>
    );
  }

  const enrollments = data?.myEnrollments || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Enrollments</h1>
        <p className="text-gray-500 mt-1">Track your learning progress and continue where you left off.</p>
      </div>

      {enrollments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Enrollments Yet</h3>
          <p className="text-gray-500 mb-6">Start learning by browsing our available programs.</p>
          <Link to="/programs" className="btn-primary inline-block">
            Browse Programs
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => (
            <div key={enrollment.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border-l-4 border-primary-600">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {enrollment.program.title}
                  </h3>
                  <p className="text-sm text-gray-500">{enrollment.program.category?.name}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusBadge[enrollment.status] || 'bg-gray-100 text-gray-800'}`}>
                  {enrollment.statusDisplay}
                </span>
              </div>

              {/* Progress Bar */}
              {enrollment.progressPercentage > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span className="font-semibold">{Math.round(enrollment.progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${enrollment.progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Enrollment Details */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Enrolled {formatDate(enrollment.enrolledAt)}</span>
                </div>
                {enrollment.completedAt && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-green-600">Completed {formatDate(enrollment.completedAt)}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  to={`/learn/${enrollment.program.slug}`}
                  className="flex-1 btn-primary text-center"
                >
                  {enrollment.progressPercentage > 0 ? 'Continue Learning' : 'Start Learning'}
                </Link>
                <Link
                  to={`/programs/${enrollment.program.slug}`}
                  className="btn-secondary px-4"
                  title="View Program Details"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollmentsPage;
