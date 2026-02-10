import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CATEGORIES } from '../../graphql/queries/programs';
import { CREATE_CATEGORY } from '../../graphql/mutations/programs';

const CategoriesPage = () => {
  const { data, loading, error, refetch } = useQuery(GET_CATEGORIES);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [formError, setFormError] = useState('');

  const [createCategory, { loading: creating }] = useMutation(CREATE_CATEGORY, {
    onCompleted: (data) => {
      if (data.createCategory.success) {
        setFormData({ name: '', description: '' });
        setShowForm(false);
        refetch();
      } else {
        setFormError(data.createCategory.message);
      }
    },
    onError: (err) => setFormError(err.message),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!formData.name.trim()) {
      setFormError('Category name is required.');
      return;
    }
    await createCategory({
      variables: {
        name: formData.name,
        description: formData.description || undefined,
      },
    });
  };

  const categories = data?.categories || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">{categories.length} categorie(s)</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : '+ New Category'}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="card mb-6 max-w-lg">
          <h2 className="text-lg font-semibold mb-4">Create Category</h2>
          {formError && (
            <div className="mb-3 rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-800">{formError}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder="e.g. Web Development"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                rows={3}
                placeholder="Optional description..."
              />
            </div>
            <button
              type="submit"
              disabled={creating}
              className="btn-primary disabled:opacity-50"
            >
              {creating ? 'Creating...' : 'Create Category'}
            </button>
          </form>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {error.message}</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500">No categories yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="card">
              <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.description || 'No description'}</p>
              <p className="text-xs text-gray-400 mt-2">Slug: {cat.slug}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
