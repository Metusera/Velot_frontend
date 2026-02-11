import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { GET_ALL_PROGRAMS, GET_CATEGORIES } from '../../graphql/queries/programs';
import { GET_ALL_USERS } from '../../graphql/queries/users';
import { GET_PENDING_INVITATIONS } from '../../graphql/queries/invitations';
import { GET_MY_ENROLLMENTS } from '../../graphql/queries/enrollments';

const DashboardHome = () => {
  const { user } = useAuth();
  const { isSuperAdmin, currentUser } = usePermissions();
  const { data: programsData } = useQuery(GET_ALL_PROGRAMS);
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const { data: usersData } = useQuery(GET_ALL_USERS, { skip: !isSuperAdmin() });
  const { data: invitationsData } = useQuery(GET_PENDING_INVITATIONS, { skip: !isSuperAdmin() });
  const { data: enrollmentsData } = useQuery(GET_MY_ENROLLMENTS, { skip: isSuperAdmin() });

  const programs = programsData?.allPrograms || [];
  const categories = categoriesData?.categories || [];
  const users = usersData?.allUsers || [];
  const pendingInvitations = invitationsData?.pendingInvitations || [];
  const myEnrollments = enrollmentsData?.myEnrollments || [];

  const publishedCount = programs.filter((p) => p.status === 'published').length;
  const draftCount = programs.filter((p) => p.status === 'draft').length;
  const activeUsersCount = users.filter((u) => u.isActive).length;
  const activeEnrollments = myEnrollments.filter((e) => e.status === 'active').length;

  // Determine if user is a learner
  const isStudent = !isSuperAdmin() && currentUser?.role?.toLowerCase() === 'learner';

  // Build stats array based on user role
  let stats = [];

  if (isStudent) {
    // Student-specific stats
    stats = [
      { label: 'My Enrollments', value: myEnrollments.length, color: 'bg-blue-500', link: '/programs', icon: '🎓' },
      { label: 'Active Courses', value: activeEnrollments, color: 'bg-green-500', link: '/programs', icon: '📖' },
      { label: 'Available Programs', value: publishedCount, color: 'bg-purple-500', link: '/programs', icon: '🚀' },
    ];
  } else {
    // Admin/Editor stats
    stats = [
      { label: 'Total Programs', value: programs.length, color: 'bg-blue-500', link: '/dashboard/programs', icon: '📚' },
      { label: 'Published', value: publishedCount, color: 'bg-green-500', link: '/dashboard/programs', icon: '✅' },
      { label: 'Drafts', value: draftCount, color: 'bg-yellow-500', link: '/dashboard/programs', icon: '📝' },
      { label: 'Categories', value: categories.length, color: 'bg-purple-500', link: '/dashboard/categories', icon: '🏷️' },
    ];

    // Add super admin-specific stats
    if (isSuperAdmin()) {
      stats.push({ label: 'Active Users', value: activeUsersCount, color: 'bg-red-500', link: '/dashboard/users', icon: '👥' });
      stats.push({ label: 'Pending Invites', value: pendingInvitations.length, color: 'bg-orange-500', link: '/dashboard/users', icon: '📧' });
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.fullName || 'User'}!
        </h1>
        <p className="text-gray-500 mt-1">
          {isStudent ? "Here's your learning progress." : "Here's what's happening with your programs."}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.link} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4`}>
                {stat.value}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {isStudent ? (
            /* Student actions */
            <>
              <Link to="/programs" className="btn-primary">
                Browse Programs
              </Link>
              <Link to="/dashboard/enrollments" className="btn-secondary">
                My Enrollments
              </Link>
            </>
          ) : (
            /* Admin actions */
            <>
              <Link to="/dashboard/programs/create" className="btn-primary">
                + New Program
              </Link>
              <Link to="/dashboard/categories" className="btn-secondary">
                Manage Categories
              </Link>
              {isSuperAdmin() && (
                <Link to="/dashboard/users" className="btn-secondary">
                  Manage Users
                </Link>
              )}
              <Link to="/programs" className="btn-secondary">
                View Public Site →
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Recent programs - Admin only */}
      {programs.length > 0 && !isStudent && (
        <div className="card mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Programs</h2>
            <Link to="/dashboard/programs" className="text-sm text-primary-600 hover:text-primary-700">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {programs.slice(0, 5).map((program) => (
              <div key={program.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs">
                    {program.title.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{program.title}</p>
                    <p className="text-xs text-gray-500">{program.category?.name}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                  ${program.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {program.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent users for super admins */}
      {isSuperAdmin() && users.length > 0 && (
        <div className="card mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
            <Link to="/dashboard/users" className="text-sm text-primary-600 hover:text-primary-700">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 font-bold text-sm">
                    {user.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                    ${user.role === 'super_admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'editor' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {user.roleDisplay}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending invitations for super admins */}
      {isSuperAdmin() && pendingInvitations.length > 0 && (
        <div className="card mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pending Invitations</h2>
            <Link to="/dashboard/users" className="text-sm text-primary-600 hover:text-primary-700">
              Manage →
            </Link>
          </div>
          <div className="space-y-3">
            {pendingInvitations.slice(0, 5).map((invitation) => (
              <div key={invitation.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{invitation.fullName}</p>
                    <p className="text-xs text-gray-500">{invitation.email}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-orange-100 text-orange-800 capitalize">
                  {invitation.role.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My enrollments for students */}
      {isStudent && myEnrollments.length > 0 && (
        <div className="card mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Recent Enrollments</h2>
            <Link to="/dashboard/enrollments" className="text-sm text-primary-600 hover:text-primary-700">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {myEnrollments.slice(0, 5).map((enrollment) => (
              <div key={enrollment.id} className="py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs">
                      {enrollment.program.title.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{enrollment.program.title}</p>
                      <p className="text-xs text-gray-500">{enrollment.program.category?.name}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                    ${enrollment.status === 'active' ? 'bg-green-100 text-green-800' :
                      enrollment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    {enrollment.status}
                  </span>
                </div>
                {enrollment.progressPercentage > 0 && (
                  <div className="pl-11">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-primary-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${enrollment.progressPercentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{Math.round(enrollment.progressPercentage)}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
