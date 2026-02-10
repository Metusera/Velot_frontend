import { useAuth } from './useAuth';
import { ROLES } from '../utils/constants';

export const usePermissions = () => {
  const { user, hasPermission } = useAuth();

  return {
    // Check if user has specific role
    isSuperAdmin: () => hasPermission(ROLES.SUPER_ADMIN),
    isAdmin: () => hasPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    isEditor: () => hasPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR]),
    isViewer: () => hasPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR, ROLES.VIEWER]),

    // Check if user can perform specific actions
    canManageUsers: () => hasPermission(ROLES.SUPER_ADMIN),
    canDeletePrograms: () => hasPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
    canCreatePrograms: () => hasPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR]),
    canEditPrograms: () => hasPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR]),
    canPublishPrograms: () => hasPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR]),

    // Generic permission check
    hasRole: (roles) => hasPermission(roles),

    // Get current user
    currentUser: user,
  };
};
