// Format date to readable string
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format datetime to readable string
export const formatDateTime = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format price to currency
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Get role display name
export const getRoleDisplayName = (role) => {
  const roleMap = {
    super_admin: 'Super Admin',
    admin: 'Admin',
    editor: 'Editor',
    viewer: 'Viewer',
  };
  return roleMap[role] || role;
};

// Get level display name
export const getLevelDisplayName = (level) => {
  const levelMap = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };
  return levelMap[level] || level;
};

// Get status badge color
export const getStatusColor = (status) => {
  const colorMap = {
    draft: 'bg-gray-200 text-gray-800',
    published: 'bg-green-200 text-green-800',
    archived: 'bg-yellow-200 text-yellow-800',
    upcoming: 'bg-blue-200 text-blue-800',
    ongoing: 'bg-purple-200 text-purple-800',
    completed: 'bg-gray-200 text-gray-800',
    cancelled: 'bg-red-200 text-red-800',
  };
  return colorMap[status] || 'bg-gray-200 text-gray-800';
};
