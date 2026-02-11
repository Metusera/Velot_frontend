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
    isNew: false,
    isHot: false,
    isProfessional: false,
    autoCalculateBadges: true,
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
          isNew: program.isNew || false,
          isHot: program.isHot || false,
          isProfessional: program.isProfessional || false,
          autoCalculateBadges: program.autoCalculateBadges !== undefined ? program.autoCalculateBadges : true,
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
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
      isNew: formData.isNew,
      isHot: formData.isHot,
      isProfessional: formData.isProfessional,
      autoCalculateBadges: formData.autoCalculateBadges,
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

          {/* Badge Management */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Badge Management</h3>
            <p className="text-sm text-gray-600 mb-4">
              Badges highlight special programs. Enable auto-calculate for automatic badging based on rules (NEW: published &lt; 30 days, HOT: &gt; 50 enrollments, PRO: advanced + long duration), or manually override specific badges below.
            </p>

            <div className="space-y-3">
              {/* Auto Calculate Toggle */}
              <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                <input
                  type="checkbox"
                  name="autoCalculateBadges"
                  checked={formData.autoCalculateBadges}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900">Auto-calculate badges</span>
                  <p className="text-xs text-gray-600 mt-0.5">Automatically assign badges based on program metrics</p>
                </div>
              </label>

              {/* Manual Override Checkboxes */}
              <div className="pl-7 space-y-2">
                <p className="text-xs text-gray-500 mb-2">Manual overrides (only apply when auto-calculate is off):</p>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={formData.isNew}
                    onChange={handleCheckboxChange}
                    disabled={formData.autoCalculateBadges}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 disabled:opacity-50"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="font-semibold text-green-600">NEW</span> badge
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isHot"
                    checked={formData.isHot}
                    onChange={handleCheckboxChange}
                    disabled={formData.autoCalculateBadges}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 disabled:opacity-50"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="font-semibold text-red-600">HOT</span> badge
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isProfessional"
                    checked={formData.isProfessional}
                    onChange={handleCheckboxChange}
                    disabled={formData.autoCalculateBadges}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 disabled:opacity-50"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="font-semibold text-purple-600">PROFESSIONAL</span> badge
                  </span>
                </label>
              </div>
            </div>
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
