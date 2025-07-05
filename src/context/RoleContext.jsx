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

// Define comprehensive roles with hierarchical permissions
const ROLES = {
  SUPER_ADMIN: {
    name: 'Super Admin',
    level: 5,
    permissions: [
      // All permissions - complete system control
      'manage_users',
      'manage_roles',
      'manage_system',
      'access_all_data',
      'manage_billing',
      'manage_integrations',
      'view_analytics',
      'manage_referrals',
      'manage_network',
      'manage_rewards',
      'delete_any_data',
      'system_configuration',
      'audit_logs',
      'security_management',
      'super_admin_panel'
    ]
  },
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
      'manage_rewards',
      'manage_billing'
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
      'manage_practice_settings',
      'manage_practice_billing'
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

// Super Admin Configuration
const SUPER_ADMIN_EMAIL = 'wgray@stloralsurgery.com';

export const RoleProvider = ({ children }) => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('DENTIST');
  const [permissions, setPermissions] = useState([]);
  const [subscriptionLevel, setSubscriptionLevel] = useState('starter');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Check if user is the super admin
      if (user.email === SUPER_ADMIN_EMAIL || user.userId === 'super-admin') {
        setUserRole('SUPER_ADMIN');
        setPermissions(ROLES.SUPER_ADMIN.permissions);
        setSubscriptionLevel('celestial');
        localStorage.setItem('userRole', 'SUPER_ADMIN');
        localStorage.setItem('subscriptionLevel', 'celestial');
      } else {
        // Regular user role detection
        const storedRole = localStorage.getItem('userRole') || 'DENTIST';
        const storedSubscription = localStorage.getItem('subscriptionLevel') || 'starter';
        
        setUserRole(storedRole);
        setSubscriptionLevel(storedSubscription);
        setPermissions(ROLES[storedRole]?.permissions || []);
      }
    }
    setLoading(false);
  }, [user]);

  const hasPermission = (permission) => {
    // Super admin has all permissions
    if (userRole === 'SUPER_ADMIN') return true;
    return permissions.includes(permission);
  };

  const hasRole = (role) => {
    return userRole === role;
  };

  const hasMinimumRole = (role) => {
    return ROLES[userRole]?.level >= ROLES[role]?.level;
  };

  const isSuperAdmin = () => {
    return userRole === 'SUPER_ADMIN';
  };

  const canEditSection = (section) => {
    // Super admin can edit everything
    if (isSuperAdmin()) return true;

    // Define section-specific permissions
    const sectionPermissions = {
      'user-management': 'manage_users',
      'billing': 'manage_billing',
      'analytics': 'view_analytics',
      'system': 'manage_system',
      'network': 'manage_network',
      'referrals': 'manage_referrals',
      'rewards': 'manage_rewards'
    };

    return hasPermission(sectionPermissions[section]);
  };

  const updateUserRole = (newRole) => {
    // Only super admin can change roles to SUPER_ADMIN
    if (newRole === 'SUPER_ADMIN' && !isSuperAdmin()) {
      throw new Error('Unauthorized: Cannot assign Super Admin role');
    }

    if (ROLES[newRole]) {
      setUserRole(newRole);
      setPermissions(ROLES[newRole].permissions);
      localStorage.setItem('userRole', newRole);
    }
  };

  const updateSubscriptionLevel = (newLevel) => {
    // Only super admin can set celestial level for others
    if (newLevel === 'celestial' && !isSuperAdmin()) {
      throw new Error('Unauthorized: Celestial level restricted');
    }

    setSubscriptionLevel(newLevel);
    localStorage.setItem('subscriptionLevel', newLevel);
  };

  const getSubscriptionLimits = () => {
    const limits = {
      starter: {
        referrals: 20,
        users: 3,
        features: 'basic'
      },
      professional: {
        referrals: 100,
        users: 10,
        features: 'advanced'
      },
      enterprise: {
        referrals: -1,
        users: 50,
        features: 'premium'
      },
      celestial: {
        referrals: -1,
        users: -1,
        features: 'unlimited'
      }
    };

    return limits[subscriptionLevel] || limits.starter;
  };

  const value = {
    userRole,
    permissions,
    subscriptionLevel,
    roles: ROLES,
    hasPermission,
    hasRole,
    hasMinimumRole,
    isSuperAdmin,
    canEditSection,
    updateUserRole,
    updateSubscriptionLevel,
    getSubscriptionLimits,
    loading
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};