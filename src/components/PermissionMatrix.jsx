import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useRole } from '../context/RoleContext';

const { FiCheck, FiX, FiInfo, FiShield, FiUsers, FiBarChart, FiSettings } = FiIcons;

const PermissionMatrix = ({ editable = false, onPermissionChange }) => {
  const { roles } = useRole();
  const [showTooltip, setShowTooltip] = useState(null);

  const permissionCategories = {
    'User Management': {
      icon: FiUsers,
      permissions: [
        { key: 'manage_users', label: 'Manage Users', description: 'Create, edit, and delete user accounts' },
        { key: 'manage_roles', label: 'Manage Roles', description: 'Assign and modify user roles' },
        { key: 'view_user_analytics', label: 'View User Analytics', description: 'Access user activity and statistics' }
      ]
    },
    'Referral Management': {
      icon: FiBarChart,
      permissions: [
        { key: 'create_referrals', label: 'Create Referrals', description: 'Create new patient referrals' },
        { key: 'view_referrals', label: 'View Referrals', description: 'View referral information' },
        { key: 'manage_own_referrals', label: 'Manage Own Referrals', description: 'Edit and update own referrals' },
        { key: 'manage_all_referrals', label: 'Manage All Referrals', description: 'Edit any referral in the system' },
        { key: 'delete_referrals', label: 'Delete Referrals', description: 'Remove referrals from the system' }
      ]
    },
    'Network & Analytics': {
      icon: FiBarChart,
      permissions: [
        { key: 'view_network', label: 'View Network', description: 'Access professional network directory' },
        { key: 'view_analytics', label: 'View Analytics', description: 'Access basic analytics and reports' },
        { key: 'view_advanced_analytics', label: 'Advanced Analytics', description: 'Access detailed analytics and insights' },
        { key: 'export_data', label: 'Export Data', description: 'Export reports and data' }
      ]
    },
    'System Administration': {
      icon: FiSettings,
      permissions: [
        { key: 'manage_system', label: 'System Management', description: 'Configure system settings' },
        { key: 'access_all_data', label: 'Access All Data', description: 'View all data across the platform' },
        { key: 'manage_billing', label: 'Manage Billing', description: 'Handle billing and subscriptions' },
        { key: 'manage_integrations', label: 'Manage Integrations', description: 'Configure third-party integrations' }
      ]
    },
    'Practice Management': {
      icon: FiShield,
      permissions: [
        { key: 'manage_practice_users', label: 'Manage Practice Users', description: 'Manage users within own practice' },
        { key: 'view_practice_analytics', label: 'Practice Analytics', description: 'View practice-specific analytics' },
        { key: 'manage_practice_settings', label: 'Practice Settings', description: 'Configure practice preferences' },
        { key: 'manage_practice_billing', label: 'Practice Billing', description: 'Handle practice billing' }
      ]
    }
  };

  const hasPermission = (roleKey, permissionKey) => {
    return roles[roleKey]?.permissions?.includes(permissionKey) || false;
  };

  const togglePermission = (roleKey, permissionKey) => {
    if (!editable || !onPermissionChange) return;
    onPermissionChange(roleKey, permissionKey);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-dental-200">
        <h3 className="text-xl font-semibold text-dental-900 mb-2">Permission Matrix</h3>
        <p className="text-dental-600">Manage role-based permissions across the platform</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-dental-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-dental-500 uppercase tracking-wider">
                Permission
              </th>
              {Object.entries(roles).map(([roleKey, role]) => (
                <th key={roleKey} className="px-4 py-4 text-center text-sm font-medium text-dental-500 uppercase tracking-wider">
                  {role.name}
                  <div className="text-xs text-dental-400 mt-1">Level {role.level}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-dental-200">
            {Object.entries(permissionCategories).map(([categoryName, category]) => (
              <React.Fragment key={categoryName}>
                <tr className="bg-dental-25">
                  <td colSpan={Object.keys(roles).length + 1} className="px-6 py-3">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={category.icon} className="w-5 h-5 text-primary-600" />
                      <span className="font-semibold text-dental-900">{categoryName}</span>
                    </div>
                  </td>
                </tr>
                {category.permissions.map((permission) => (
                  <tr key={permission.key} className="hover:bg-dental-25">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-dental-900">
                          {permission.label}
                        </span>
                        <button
                          onMouseEnter={() => setShowTooltip(permission.key)}
                          onMouseLeave={() => setShowTooltip(null)}
                          className="text-dental-400 hover:text-dental-600 relative"
                        >
                          <SafeIcon icon={FiInfo} className="w-4 h-4" />
                          {showTooltip === permission.key && (
                            <div className="absolute left-0 top-6 z-10 w-64 p-3 bg-dental-900 text-white text-sm rounded-lg shadow-lg">
                              {permission.description}
                            </div>
                          )}
                        </button>
                      </div>
                    </td>
                    {Object.entries(roles).map(([roleKey]) => (
                      <td key={roleKey} className="px-4 py-4 text-center">
                        {editable ? (
                          <button
                            onClick={() => togglePermission(roleKey, permission.key)}
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                              hasPermission(roleKey, permission.key)
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-dental-200 text-dental-500 hover:bg-dental-300'
                            }`}
                          >
                            <SafeIcon
                              icon={hasPermission(roleKey, permission.key) ? FiCheck : FiX}
                              className="w-4 h-4"
                            />
                          </button>
                        ) : (
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto ${
                              hasPermission(roleKey, permission.key)
                                ? 'bg-green-500 text-white'
                                : 'bg-dental-200 text-dental-500'
                            }`}
                          >
                            <SafeIcon
                              icon={hasPermission(roleKey, permission.key) ? FiCheck : FiX}
                              className="w-4 h-4"
                            />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionMatrix;