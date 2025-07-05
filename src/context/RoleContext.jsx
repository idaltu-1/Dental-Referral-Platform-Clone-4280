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

// Updated comprehensive role system based on dental practice hierarchy
const ROLES = {
  SUPER_ADMIN: {
    name: 'Super Admin',
    level: 7,
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
      'super_admin_panel',
      'database_access',
      'user_management'
    ]
  },
  DEVELOPER: {
    name: 'Developer',
    level: 6,
    permissions: [
      'manage_system',
      'system_configuration',
      'manage_integrations',
      'audit_logs',
      'view_analytics',
      'manage_network',
      'access_all_data'
    ]
  },
  SPECIALIST_ADMIN: {
    name: 'Specialist Admin',
    level: 5,
    permissions: [
      'manage_users',
      'manage_roles',
      'view_analytics',
      'manage_referrals',
      'manage_network',
      'manage_rewards',
      'manage_practice_settings',
      'manage_practice_billing',
      'user_management'
    ]
  },
  DENTIST_ADMIN: {
    name: 'Dentist Admin',
    level: 4,
    permissions: [
      'manage_practice_users',
      'view_practice_analytics',
      'manage_practice_referrals',
      'manage_practice_network',
      'manage_practice_settings',
      'manage_practice_billing'
    ]
  },
  DENTAL_SPECIALIST: {
    name: 'Dental Specialist',
    level: 3,
    permissions: [
      'create_referrals',
      'view_referrals',
      'manage_own_referrals',
      'view_network',
      'view_analytics',
      'manage_profile',
      'view_rewards',
      'specialist_features'
    ]
  },
  REFERRING_DENTIST: {
    name: 'Referring Dentist',
    level: 2,
    permissions: [
      'create_referrals',
      'view_own_referrals',
      'manage_own_referrals',
      'view_network',
      'basic_analytics',
      'manage_profile',
      'view_rewards'
    ]
  },
  PATIENT: {
    name: 'Patient',
    level: 1,
    permissions: [
      'view_own_referrals',
      'view_own_profile',
      'update_own_profile'
    ]
  }
};

// Super Admin Configuration
const SUPER_ADMIN_EMAIL = 'wgray@stloralsurgery.com';

export const RoleProvider = ({ children }) => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('REFERRING_DENTIST');
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
        const storedRole = localStorage.getItem('userRole') || 'REFERRING_DENTIST';
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
      'user-management': 'user_management',
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