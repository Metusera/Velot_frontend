import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_PROGRAMS } from '../../graphql/queries/programs';
import { DELETE_PROGRAM, PUBLISH_PROGRAM, UNPUBLISH_PROGRAM } from '../../graphql/mutations/programs';
import { formatPrice, formatDate } from '../../utils/helpers';

const statusBadge = (status) => {
  const styles = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    archived: 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${styles[status] || styles.draft}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ProgramsList = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_PROGRAMS);

  const [deleteProgram] = useMutation(DELETE_PROGRAM, {
    onCompleted: () => refetch(),
  });

  const [publishProgram] = useMutation(PUBLISH_PROGRAM, {
    onCompleted: () => refetch(),
  });

  const [unpublishProgram] = useMutation(UNPUBLISH_PROGRAM, {
    onCompleted: () => refetch(),
  });

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteProgram({ variables: { id } });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleTogglePublish = async (program) => {
    try {
      if (program.status === 'published') {
        await unpublishProgram({ variables: { id: program.id } });
      } else {
        await publishProgram({ variables: { id: program.id } });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error loading programs: {error.message}</p>
      </div>
    );
  }

  const programs = data?.allPrograms || [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programs</h1>
          <p className="text-sm text-gray-500 mt-1">{programs.length} program(s) total</p>
        </div>
        <Link to="/dashboard/programs/create" className="btn-primary">
          + New Program
        </Link>
      </div>

      {/* Table */}
      {programs.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 mb-4">No programs yet.</p>
          <Link to="/dashboard/programs/create" className="btn-primary">
            Create Your First Program
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {programs.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm mr-3 flex-shrink-0">
                          {program.title.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{program.title}</p>
                          <p className="text-xs text-gray-500">{program.duration}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{program.category?.name || '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{program.levelDisplay || program.level}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatPrice(program.price)}</td>
                    <td className="px-6 py-4">{statusBadge(program.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(program.createdAt)}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleTogglePublish(program)}
                        className="text-xs text-primary-600 hover:text-primary-800 font-medium"
                      >
                        {program.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <Link
                        to={`/dashboard/programs/${program.id}/edit`}
                        className="text-xs text-gray-600 hover:text-gray-800 font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(program.id, program.title)}
                        className="text-xs text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramsList;
