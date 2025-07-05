import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

// Define roles and their permissions
const ROLES = {
  ADMIN: {
    name: 'Admin',
    level: 4,
    permissions: [
      'manage_users',
      'manage_roles',
      'view_analytics',
      'manage_system',
      'access_all_data',
      'manage_referrals',
      'manage_network',
      'manage_rewards'
    ]
  },
  PRACTICE_OWNER: {
    name: 'Practice Owner',
    level: 3,
    permissions: [
      'manage_practice_users',
      'view_practice_analytics',
      'manage_practice_referrals',
      'manage_practice_network',
      'view_practice_rewards',
      'manage_practice_settings'
    ]
  },
  DENTIST: {
    name: 'Dentist',
    level: 2,
    permissions: [
      'create_referrals',
      'view_referrals',
      'manage_own_referrals',
      'view_network',
      'view_analytics',
      'manage_profile',
      'view_rewards'
    ]
  },
  STAFF: {
    name: 'Staff',
    level: 1,
    permissions: [
      'view_referrals',
      'create_referrals',
      'manage_appointments',
      'view_network',
      'manage_profile'
    ]
  }
};

export const RoleProvider = ({ children }) => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('DENTIST');
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // In a real app, fetch user role from backend
      const storedRole = localStorage.getItem('userRole') || 'DENTIST';
      setUserRole(storedRole);
      setPermissions(ROLES[storedRole]?.permissions || []);
    }
    setLoading(false);
  }, [user]);

  const hasPermission = (permission) => {
    return permissions.includes(permission);
  };

  const hasRole = (role) => {
    return userRole === role;
  };

  const hasMinimumRole = (role) => {
    return ROLES[userRole]?.level >= ROLES[role]?.level;
  };

  const updateUserRole = (newRole) => {
    if (ROLES[newRole]) {
      setUserRole(newRole);
      setPermissions(ROLES[newRole].permissions);
      localStorage.setItem('userRole', newRole);
    }
  };

  const value = {
    userRole,
    permissions,
    roles: ROLES,
    hasPermission,
    hasRole,
    hasMinimumRole,
    updateUserRole,
    loading
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};