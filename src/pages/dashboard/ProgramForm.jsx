import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_PROGRAM, UPDATE_PROGRAM } from '../../graphql/mutations/programs';
import { GET_CATEGORIES, GET_ALL_PROGRAMS } from '../../graphql/queries/programs';

const ProgramForm = () => {
  const { id } = useParams(); // if editing
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    duration: '',
    price: '',
    level: 'beginner',
    slug: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load categories
  const { data: categoriesData } = useQuery(GET_CATEGORIES);

  // Load existing program if editing
  const { data: programsData } = useQuery(GET_ALL_PROGRAMS, {
    skip: !isEditing,
  });

  useEffect(() => {
    if (isEditing && programsData?.allPrograms) {
      const program = programsData.allPrograms.find((p) => p.id === id);
      if (program) {
        setFormData({
          title: program.title || '',
          description: program.description || '',
          categoryId: program.category?.id || '',
          duration: program.duration || '',
          price: program.price || '',
          level: program.level || 'beginner',
          slug: program.slug || '',
        });
      }
    }
  }, [isEditing, id, programsData]);

  const [createProgram, { loading: creating }] = useMutation(CREATE_PROGRAM, {
    refetchQueries: [{ query: GET_ALL_PROGRAMS }],
    onCompleted: (data) => {
      if (data.createProgram.success) {
        setSuccess('Program created successfully!');
        setTimeout(() => navigate('/dashboard/programs'), 1200);
      } else {
        setError(data.createProgram.message);
      }
    },
    onError: (err) => setError(err.message),
  });

  const [updateProgram, { loading: updating }] = useMutation(UPDATE_PROGRAM, {
    refetchQueries: [{ query: GET_ALL_PROGRAMS }],
    onCompleted: (data) => {
      if (data.updateProgram.success) {
        setSuccess('Program updated successfully!');
        setTimeout(() => navigate('/dashboard/programs'), 1200);
      } else {
        setError(data.updateProgram.message);
      }
    },
    onError: (err) => setError(err.message),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.title || !formData.description || !formData.categoryId || !formData.duration || !formData.price) {
      setError('Please fill in all required fields.');
      return;
    }

    const variables = {
      title: formData.title,
      description: formData.description,
      categoryId: formData.categoryId,
      duration: formData.duration,
      price: parseFloat(formData.price),
      level: formData.level,
      slug: formData.slug || undefined,
    };

    if (isEditing) {
      await updateProgram({ variables: { id, ...variables } });
    } else {
      await createProgram({ variables });
    }
  };

  const isLoading = creating || updating;

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard/programs')}
          className="text-primary-600 hover:text-primary-700 text-sm mb-2 inline-block"
        >
          ← Back to Programs
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Program' : 'Create New Program'}
        </h1>
      </div>

      <div className="card max-w-3xl">
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-800">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Web Development Bootcamp"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="input-field"
              placeholder="Describe the program content, objectives, and what students will learn..."
              required
            />
          </div>

          {/* Category + Level row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select a category</option>
                {categoriesData?.categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {categoriesData?.categories?.length === 0 && (
                <p className="text-xs text-amber-600 mt-1">
                  No categories yet.{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard/categories')}
                    className="underline"
                  >
                    Create one first
                  </button>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level <span className="text-red-500">*</span>
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="input-field"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Duration + Price row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. 8 weeks, 3 months"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (USD) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input-field"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Slug (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug <span className="text-gray-400 text-xs">(optional — auto-generated from title)</span>
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="input-field"
              placeholder="web-development-bootcamp"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50"
            >
              {isLoading
                ? (isEditing ? 'Updating...' : 'Creating...')
                : (isEditing ? 'Update Program' : 'Create Program')
              }
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/programs')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramForm;
