import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useRole } from '../context/RoleContext';

const { FiShield, FiUsers, FiSettings, FiEdit, FiTrash2, FiPlus, FiSave, FiX, FiCheck, FiAlertTriangle, FiLock, FiUnlock, FiCrown, FiStar } = FiIcons;

const RoleManagement = ({ onClose }) => {
  const { roles, isSuperAdmin, updateUserRole } = useRole();
  const [activeTab, setActiveTab] = useState('roles');
  const [editingRole, setEditingRole] = useState(null);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    level: 1,
    permissions: [],
    description: ''
  });

  const allPermissions = [
    // User Management
    { key: 'manage_users', label: 'Manage Users', category: 'User Management', description: 'Create, edit, and delete user accounts' },
    { key: 'manage_roles', label: 'Manage Roles', category: 'User Management', description: 'Assign and modify user roles' },
    { key: 'view_user_analytics', label: 'View User Analytics', category: 'User Management', description: 'Access user activity and statistics' },
    { key: 'user_management', label: 'User Management Access', category: 'User Management', description: 'Access user management section' },
    
    // Referral Management
    { key: 'create_referrals', label: 'Create Referrals', category: 'Referral Management', description: 'Create new patient referrals' },
    { key: 'view_referrals', label: 'View Referrals', category: 'Referral Management', description: 'View referral information' },
    { key: 'manage_own_referrals', label: 'Manage Own Referrals', category: 'Referral Management', description: 'Edit and update own referrals' },
    { key: 'manage_all_referrals', label: 'Manage All Referrals', category: 'Referral Management', description: 'Edit any referral in the system' },
    { key: 'delete_referrals', label: 'Delete Referrals', category: 'Referral Management', description: 'Remove referrals from the system' },
    { key: 'view_own_referrals', label: 'View Own Referrals', category: 'Referral Management', description: 'View only own referrals' },
    
    // Network & Analytics
    { key: 'view_network', label: 'View Network', category: 'Network & Analytics', description: 'Access professional network directory' },
    { key: 'view_analytics', label: 'View Analytics', category: 'Network & Analytics', description: 'Access basic analytics and reports' },
    { key: 'view_advanced_analytics', label: 'Advanced Analytics', category: 'Network & Analytics', description: 'Access detailed analytics and insights' },
    { key: 'export_data', label: 'Export Data', category: 'Network & Analytics', description: 'Export reports and data' },
    { key: 'basic_analytics', label: 'Basic Analytics', category: 'Network & Analytics', description: 'View basic performance metrics' },
    
    // System Administration
    { key: 'manage_system', label: 'System Management', category: 'System Administration', description: 'Configure system settings' },
    { key: 'access_all_data', label: 'Access All Data', category: 'System Administration', description: 'View all data across the platform' },
    { key: 'manage_billing', label: 'Manage Billing', category: 'System Administration', description: 'Handle billing and subscriptions' },
    { key: 'manage_integrations', label: 'Manage Integrations', category: 'System Administration', description: 'Configure third-party integrations' },
    { key: 'system_configuration', label: 'System Configuration', category: 'System Administration', description: 'Configure system-wide settings' },
    { key: 'audit_logs', label: 'Audit Logs', category: 'System Administration', description: 'View system audit logs' },
    { key: 'security_management', label: 'Security Management', category: 'System Administration', description: 'Manage security settings' },
    { key: 'super_admin_panel', label: 'Super Admin Panel', category: 'System Administration', description: 'Access super admin features' },
    { key: 'database_access', label: 'Database Access', category: 'System Administration', description: 'Direct database access' },
    
    // Practice Management
    { key: 'manage_practice_users', label: 'Manage Practice Users', category: 'Practice Management', description: 'Manage users within own practice' },
    { key: 'view_practice_analytics', label: 'Practice Analytics', category: 'Practice Management', description: 'View practice-specific analytics' },
    { key: 'manage_practice_settings', label: 'Practice Settings', category: 'Practice Management', description: 'Configure practice preferences' },
    { key: 'manage_practice_billing', label: 'Practice Billing', category: 'Practice Management', description: 'Handle practice billing' },
    { key: 'manage_practice_referrals', label: 'Manage Practice Referrals', category: 'Practice Management', description: 'Manage all practice referrals' },
    { key: 'manage_practice_network', label: 'Manage Practice Network', category: 'Practice Management', description: 'Manage practice network connections' },
    
    // Profile & Rewards
    { key: 'manage_profile', label: 'Manage Profile', category: 'Profile & Rewards', description: 'Edit own profile information' },
    { key: 'view_rewards', label: 'View Rewards', category: 'Profile & Rewards', description: 'Access rewards program' },
    { key: 'manage_rewards', label: 'Manage Rewards', category: 'Profile & Rewards', description: 'Manage rewards system' },
    { key: 'specialist_features', label: 'Specialist Features', category: 'Profile & Rewards', description: 'Access specialist-only features' },
    { key: 'view_own_profile', label: 'View Own Profile', category: 'Profile & Rewards', description: 'View own profile' },
    { key: 'update_own_profile', label: 'Update Own Profile', category: 'Profile & Rewards', description: 'Update own profile information' }
  ];

  const permissionCategories = [...new Set(allPermissions.map(p => p.category))];

  const getRoleIcon = (role) => {
    switch (role) {
      case 'SUPER_ADMIN': return FiCrown;
      case 'DEVELOPER': return FiSettings;
      case 'SPECIALIST_ADMIN': return FiShield;
      case 'DENTIST_ADMIN': return FiUsers;
      case 'DENTAL_SPECIALIST': return FiStar;
      case 'REFERRING_DENTIST': return FiUsers;
      case 'PATIENT': return FiUsers;
      default: return FiUsers;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'from-purple-500 to-purple-600';
      case 'DEVELOPER': return 'from-gray-500 to-gray-600';
      case 'SPECIALIST_ADMIN': return 'from-blue-500 to-blue-600';
      case 'DENTIST_ADMIN': return 'from-indigo-500 to-indigo-600';
      case 'DENTAL_SPECIALIST': return 'from-green-500 to-green-600';
      case 'REFERRING_DENTIST': return 'from-orange-500 to-orange-600';
      case 'PATIENT': return 'from-pink-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleCreateRole = () => {
    if (!isSuperAdmin()) {
      alert('Only Super Admins can create new roles');
      return;
    }
    setShowCreateRole(true);
  };

  const handleSaveNewRole = () => {
    if (!newRole.name.trim()) {
      alert('Role name is required');
      return;
    }
    
    // In a real app, this would save to the database
    console.log('Creating new role:', newRole);
    alert('Role created successfully!');
    setShowCreateRole(false);
    setNewRole({ name: '', level: 1, permissions: [], description: '' });
  };

  const handleEditRole = (roleKey) => {
    if (!isSuperAdmin()) {
      alert('Only Super Admins can edit roles');
      return;
    }
    setEditingRole(roleKey);
  };

  const handleDeleteRole = (roleKey) => {
    if (!isSuperAdmin()) {
      alert('Only Super Admins can delete roles');
      return;
    }
    
    if (roleKey === 'SUPER_ADMIN') {
      alert('Cannot delete Super Admin role');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      console.log('Deleting role:', roleKey);
      alert('Role deleted successfully!');
    }
  };

  const togglePermission = (roleKey, permissionKey) => {
    if (!isSuperAdmin()) {
      alert('Only Super Admins can modify permissions');
      return;
    }
    
    console.log('Toggling permission:', { roleKey, permissionKey });
    // In a real app, this would update the role permissions
  };

  const hasPermission = (roleKey, permissionKey) => {
    return roles[roleKey]?.permissions?.includes(permissionKey) || false;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-dental-200 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiShield} className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-semibold">Role Management System</h2>
                <p className="text-primary-100">Manage user roles and permissions</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-primary-100 hover:text-white transition-colors"
            >
              <SafeIcon icon={FiX} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-dental-200 bg-dental-50">
          {['roles', 'permissions', 'hierarchy'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white text-primary-600 border-b-2 border-primary-500'
                  : 'text-dental-600 hover:text-primary-600 hover:bg-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'roles' && (
            <div className="space-y-6">
              {/* Header Actions */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-dental-900">System Roles</h3>
                {isSuperAdmin() && (
                  <button
                    onClick={handleCreateRole}
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiPlus} className="w-4 h-4" />
                    <span>Create Role</span>
                  </button>
                )}
              </div>

              {/* Roles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(roles).map(([roleKey, role]) => (
                  <div
                    key={roleKey}
                    className="bg-white border border-dental-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getRoleColor(roleKey)} rounded-lg flex items-center justify-center`}>
                          <SafeIcon icon={getRoleIcon(roleKey)} className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-dental-900">{role.name}</h4>
                          <p className="text-sm text-dental-500">Level {role.level}</p>
                        </div>
                      </div>
                      {isSuperAdmin() && roleKey !== 'SUPER_ADMIN' && (
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleEditRole(roleKey)}
                            className="text-dental-400 hover:text-primary-600 transition-colors"
                          >
                            <SafeIcon icon={FiEdit} className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRole(roleKey)}
                            className="text-dental-400 hover:text-red-600 transition-colors"
                          >
                            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-dental-600">Permissions:</span>
                        <span className="font-medium text-dental-900">
                          {role.permissions?.length || 0}
                        </span>
                      </div>
                      
                      {roleKey === 'SUPER_ADMIN' && (
                        <div className="flex items-center space-x-2 text-sm text-purple-600">
                          <SafeIcon icon={FiCrown} className="w-4 h-4" />
                          <span>Unlimited Access</span>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {role.permissions?.slice(0, 3).map((permission) => (
                          <span
                            key={permission}
                            className="px-2 py-1 bg-dental-100 text-dental-600 text-xs rounded"
                          >
                            {permission.replace(/_/g, ' ')}
                          </span>
                        ))}
                        {role.permissions?.length > 3 && (
                          <span className="px-2 py-1 bg-dental-100 text-dental-600 text-xs rounded">
                            +{role.permissions.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Create New Role Modal */}
              {showCreateRole && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
                  <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                    <h3 className="text-xl font-semibold text-dental-900 mb-4">Create New Role</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-dental-700 mb-2">
                          Role Name
                        </label>
                        <input
                          type="text"
                          value={newRole.name}
                          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                          className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter role name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dental-700 mb-2">
                          Level (1-7)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="7"
                          value={newRole.level}
                          onChange={(e) => setNewRole({ ...newRole, level: parseInt(e.target.value) })}
                          className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dental-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={newRole.description}
                          onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                          className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          rows={3}
                          placeholder="Describe this role..."
                        />
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-6">
                      <button
                        onClick={() => setShowCreateRole(false)}
                        className="flex-1 px-4 py-2 border border-dental-200 text-dental-600 rounded-lg hover:bg-dental-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveNewRole}
                        className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        Create Role
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-dental-900">Permission Matrix</h3>
              
              {/* Permission Categories */}
              {permissionCategories.map((category) => (
                <div key={category} className="bg-white border border-dental-200 rounded-xl overflow-hidden">
                  <div className="bg-dental-50 px-6 py-3 border-b border-dental-200">
                    <h4 className="font-semibold text-dental-900">{category}</h4>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-dental-25">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium text-dental-600">
                            Permission
                          </th>
                          {Object.entries(roles).map(([roleKey, role]) => (
                            <th key={roleKey} className="px-4 py-3 text-center text-sm font-medium text-dental-600">
                              {role.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dental-200">
                        {allPermissions
                          .filter(permission => permission.category === category)
                          .map((permission) => (
                            <tr key={permission.key} className="hover:bg-dental-25">
                              <td className="px-6 py-4">
                                <div>
                                  <div className="font-medium text-dental-900">{permission.label}</div>
                                  <div className="text-sm text-dental-500">{permission.description}</div>
                                </div>
                              </td>
                              {Object.entries(roles).map(([roleKey]) => (
                                <td key={roleKey} className="px-4 py-4 text-center">
                                  {roleKey === 'SUPER_ADMIN' ? (
                                    <SafeIcon icon={FiCrown} className="w-5 h-5 text-yellow-500 mx-auto" />
                                  ) : isSuperAdmin() ? (
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
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto ${
                                      hasPermission(roleKey, permission.key)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-dental-200 text-dental-500'
                                    }`}>
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
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'hierarchy' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-dental-900">Role Hierarchy</h3>
              
              <div className="bg-white border border-dental-200 rounded-xl p-6">
                <div className="space-y-4">
                  {Object.entries(roles)
                    .sort(([, a], [, b]) => b.level - a.level)
                    .map(([roleKey, role], index) => (
                      <div
                        key={roleKey}
                        className="flex items-center justify-between p-4 border border-dental-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl font-bold text-dental-400">
                            {index + 1}
                          </div>
                          <div className={`w-12 h-12 bg-gradient-to-r ${getRoleColor(roleKey)} rounded-lg flex items-center justify-center`}>
                            <SafeIcon icon={getRoleIcon(roleKey)} className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-dental-900">{role.name}</h4>
                            <p className="text-sm text-dental-500">Level {role.level}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm text-dental-600">Permissions</div>
                            <div className="font-semibold text-dental-900">
                              {roleKey === 'SUPER_ADMIN' ? 'All' : role.permissions?.length || 0}
                            </div>
                          </div>
                          
                          {roleKey === 'SUPER_ADMIN' && (
                            <div className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                              <SafeIcon icon={FiCrown} className="w-4 h-4" />
                              <span className="text-sm font-medium">Ultimate Access</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Hierarchy Rules</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Higher level roles inherit permissions from lower levels</li>
                    <li>• Super Admin (Level 7) has unrestricted access to all features</li>
                    <li>• Users can only manage roles at their level or below</li>
                    <li>• Role assignments require appropriate permissions</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-dental-200 bg-dental-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-dental-600">
              {isSuperAdmin() ? (
                <span className="flex items-center space-x-2 text-purple-600">
                  <SafeIcon icon={FiShield} className="w-4 h-4" />
                  <span>Super Admin - Full Management Access</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2 text-orange-600">
                  <SafeIcon icon={FiLock} className="w-4 h-4" />
                  <span>View Only - Contact Super Admin for changes</span>
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleManagement;