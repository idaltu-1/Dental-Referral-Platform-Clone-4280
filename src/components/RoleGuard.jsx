import React from 'react';
import { useRole } from '../context/RoleContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiLock, FiAlertCircle } = FiIcons;

const RoleGuard = ({ 
  children, 
  requiredPermission, 
  requiredRole, 
  minimumRole,
  fallback,
  showMessage = true 
}) => {
  const { hasPermission, hasRole, hasMinimumRole, loading } = useRole();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  let hasAccess = true;

  if (requiredPermission && !hasPermission(requiredPermission)) {
    hasAccess = false;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    hasAccess = false;
  }

  if (minimumRole && !hasMinimumRole(minimumRole)) {
    hasAccess = false;
  }

  if (!hasAccess) {
    if (fallback) {
      return fallback;
    }

    if (!showMessage) {
      return null;
    }

    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <SafeIcon icon={FiLock} className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Access Denied</h3>
        <p className="text-red-600">
          You don't have the required permissions to access this content.
        </p>
      </div>
    );
  }

  return children;
};

export default RoleGuard;