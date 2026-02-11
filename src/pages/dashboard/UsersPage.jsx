import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/queries/users';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../graphql/mutations/users';
import { usePermissions } from '../../hooks/usePermissions';
import { formatDate } from '../../utils/helpers';
import InviteUserModal from '../../components/dashboard/InviteUserModal';
import PendingInvitationsTable from '../../components/dashboard/PendingInvitationsTable';

const ROLE_OPTIONS = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'instructor', label: 'Instructor' },
  { value: 'editor', label: 'Editor' },
  { value: 'learner', label: 'Learner' },
];

const roleBadge = {
  super_admin: 'bg-red-100 text-red-700',
  admin: 'bg-purple-100 text-purple-700',
  instructor: 'bg-orange-100 text-orange-700',
  editor: 'bg-blue-100 text-blue-700',
  learner: 'bg-gray-100 text-gray-600',
};

const UsersPage = () => {
  const { canManageUsers, currentUser } = usePermissions();
  const [showForm, setShowForm] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    role: 'learner',
    isActive: true,
  });
  const [formError, setFormError] = useState('');

  const { data, loading, refetch } = useQuery(GET_ALL_USERS);
  const [createUser, { loading: creating }] = useMutation(CREATE_USER);
  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER);
  const [deleteUser, { loading: deleting }] = useMutation(DELETE_USER);

  if (!canManageUsers()) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-semibold">Access denied. Super Admin only.</p>
      </div>
    );
  }

  const users = data?.allUsers || [];

  const resetForm = () => {
    setFormData({ email: '', fullName: '', password: '', role: 'learner', isActive: true });
    setFormError('');
    setEditUser(null);
    setShowForm(false);
  };

  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (user) => {
    setEditUser(user);
    setFormData({
      email: user.email,
      fullName: user.fullName,
      password: '',
      role: user.role,
      isActive: user.isActive,
    });
    setFormError('');
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    try {
      if (editUser) {
        const { data } = await updateUser({
          variables: {
            id: editUser.id,
            fullName: formData.fullName,
            role: formData.role,
            isActive: formData.isActive,
          },
        });
        if (!data.updateUser.success) {
          setFormError(data.updateUser.message);
          return;
        }
      } else {
        if (!formData.password) {
          setFormError('Password is required for new users');
          return;
        }
        const { data } = await createUser({ variables: formData });
        if (!data.createUser.success) {
          setFormError(data.createUser.message);
          return;
        }
      }
      refetch();
      resetForm();
    } catch (err) {
      setFormError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteUser({ variables: { id } });
      if (data.deleteUser.success) {
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
    setDeleteConfirm(null);
  };

  const handleToggleActive = async (user) => {
    try {
      await updateUser({
        variables: { id: user.id, isActive: !user.isActive },
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 text-green-700 rounded-lg p-4 mb-6 flex items-center justify-between">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="text-green-600 hover:text-green-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">{users.length} total users</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowInviteModal(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Invite User
          </button>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </button>
        </div>
      </div>

      {/* Invite User Modal */}
      <InviteUserModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSuccess={(message) => setSuccessMessage(message)}
      />

      {/* Pending Invitations */}
      <div className="mb-6">
        <PendingInvitationsTable />
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editUser ? 'Edit User' : 'Create User'}
          </h2>
          {formError && (
            <div className="bg-red-50 text-red-700 text-sm rounded-lg p-3 mb-4">{formError}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  required
                  disabled={!!editUser}
                />
              </div>
              {!editUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="input-field"
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isActive" className="text-sm text-gray-700">Active account</label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={creating || updating}
                className="btn-primary"
              >
                {creating || updating ? 'Saving...' : editUser ? 'Update User' : 'Create User'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-primary-600" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">User</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Role</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Joined</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-600 flex items-center justify-center text-white font-semibold text-xs">
                          {(u.fullName || u.email).charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{u.fullName}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${roleBadge[u.role] || 'bg-gray-100 text-gray-600'}`}>
                        {u.roleDisplay}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleActive(u)}
                        disabled={u.id === currentUser?.id}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full cursor-pointer ${
                          u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        } ${u.id === currentUser?.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {u.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(u.dateJoined)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {u.id !== currentUser?.id && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(u)}
                            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Edit
                          </button>
                          {deleteConfirm === u.id ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleDelete(u.id)}
                                disabled={deleting}
                                className="text-xs text-red-600 font-medium"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-xs text-gray-400 font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(u.id)}
                              className="text-xs text-red-500 hover:text-red-600 font-medium"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Permission table */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-gray-600">Action</th>
                <th className="text-center px-4 py-2 font-semibold text-gray-600">Super Admin</th>
                <th className="text-center px-4 py-2 font-semibold text-gray-600">Admin</th>
                <th className="text-center px-4 py-2 font-semibold text-gray-600">Instructor</th>
                <th className="text-center px-4 py-2 font-semibold text-gray-600">Editor</th>
                <th className="text-center px-4 py-2 font-semibold text-gray-600">Learner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { action: 'Manage Users', sa: true, a: false, i: false, e: false, v: false },
                { action: 'Assign Roles', sa: true, a: false, i: false, e: false, v: false },
                { action: 'Teach Programs', sa: true, a: true, i: true, e: false, v: false },
                { action: 'Create Programs', sa: true, a: true, i: false, e: true, v: false },
                { action: 'Edit Own Programs', sa: true, a: true, i: true, e: true, v: false },
                { action: 'Edit All Programs', sa: true, a: true, i: false, e: true, v: false },
                { action: 'Delete Programs', sa: true, a: true, i: false, e: false, v: false },
                { action: 'Publish / Unpublish', sa: true, a: true, i: false, e: true, v: false },
                { action: 'View Students', sa: true, a: true, i: true, e: false, v: false },
                { action: 'View Content', sa: true, a: true, i: true, e: true, v: true },
              ].map((row) => (
                <tr key={row.action}>
                  <td className="px-4 py-2 text-gray-700">{row.action}</td>
                  {[row.sa, row.a, row.i, row.e, row.v].map((allowed, i) => (
                    <td key={i} className="text-center px-4 py-2">
                      {allowed ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
