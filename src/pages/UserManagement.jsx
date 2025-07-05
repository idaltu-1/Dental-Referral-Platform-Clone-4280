import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import RoleGuard from '../components/RoleGuard';
import RoleSelector from '../components/RoleSelector';
import UserForm from '../components/UserForm';
import { useRole } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';

const {
  FiUsers,
  FiUserPlus,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiShield,
  FiEye,
  FiUserCheck,
  FiUserX,
  FiDownload,
  FiUpload,
  FiCrown,
  FiStar,
  FiSettings
} = FiIcons;

const UserManagement = () => {
  const { roles, isSuperAdmin, canEditSection } = useRole();
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Enhanced users with super admin account
  const users = [
    {
      id: 'super-admin-001',
      name: 'Dr. William Gray',
      email: 'wgray@stloralsurgery.com',
      phone: '+1 (555) 123-4567',
      role: 'SUPER_ADMIN',
      status: 'Active',
      practice: 'St. Louis Oral Surgery',
      location: 'St. Louis, MO',
      joinDate: '2022-01-01',
      lastLogin: '2024-01-20',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      subscriptionLevel: 'celestial',
      specialPermissions: ['system_owner', 'billing_admin', 'security_admin']
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      role: 'PRACTICE_OWNER',
      status: 'Active',
      practice: 'Elite Dental Care',
      location: 'New York, NY',
      joinDate: '2023-01-15',
      lastLogin: '2024-01-20',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      subscriptionLevel: 'professional'
    },
    {
      id: 3,
      name: 'Dr. Michael Chen',
      email: 'michael.chen@example.com',
      phone: '+1 (555) 987-6543',
      role: 'DENTIST',
      status: 'Active',
      practice: 'Smile Specialists',
      location: 'Los Angeles, CA',
      joinDate: '2023-02-20',
      lastLogin: '2024-01-19',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      subscriptionLevel: 'starter'
    },
    {
      id: 4,
      name: 'Jennifer Martinez',
      email: 'jennifer.martinez@example.com',
      phone: '+1 (555) 456-7890',
      role: 'STAFF',
      status: 'Active',
      practice: 'Elite Dental Care',
      location: 'New York, NY',
      joinDate: '2023-03-10',
      lastLogin: '2024-01-18',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3a2?w=150&h=150&fit=crop&crop=face',
      subscriptionLevel: 'starter'
    },
    {
      id: 5,
      name: 'Dr. Robert Wilson',
      email: 'robert.wilson@example.com',
      phone: '+1 (555) 234-5678',
      role: 'DENTIST',
      status: 'Inactive',
      practice: 'Family Dental',
      location: 'Chicago, IL',
      joinDate: '2023-04-05',
      lastLogin: '2024-01-10',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      subscriptionLevel: 'enterprise'
    },
    {
      id: 6,
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      phone: '+1 (555) 345-6789',
      role: 'ADMIN',
      status: 'Active',
      practice: 'System Admin',
      location: 'Remote',
      joinDate: '2022-12-01',
      lastLogin: '2024-01-20',
      avatar: 'https://images.unsplash.com/photo-1594824947317-d0c8f5c1a2c4?w=150&h=150&fit=crop&crop=face',
      subscriptionLevel: 'enterprise'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.practice.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-purple-100 text-purple-800';
      case 'ADMIN': return 'bg-blue-100 text-blue-800';
      case 'PRACTICE_OWNER': return 'bg-indigo-100 text-indigo-800';
      case 'DENTIST': return 'bg-green-100 text-green-800';
      case 'STAFF': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionBadge = (level) => {
    switch (level) {
      case 'celestial':
        return (
          <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            <SafeIcon icon={FiCrown} className="w-3 h-3" />
            <span>Celestial</span>
          </div>
        );
      case 'enterprise':
        return (
          <div className="flex items-center space-x-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
            <SafeIcon icon={FiStar} className="w-3 h-3" />
            <span>Enterprise</span>
          </div>
        );
      case 'professional':
        return (
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            Professional
          </div>
        );
      case 'starter':
        return (
          <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
            Starter
          </div>
        );
      default:
        return null;
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowAddModal(true);
  };

  const handleDeleteUser = (userId) => {
    const userToDelete = users.find(u => u.id === userId);
    
    // Prevent deletion of super admin
    if (userToDelete?.role === 'SUPER_ADMIN') {
      alert('Cannot delete Super Admin account');
      return;
    }

    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log('Deleting user:', userId);
      alert('User deleted successfully');
    }
  };

  const handleToggleStatus = (userId) => {
    const userToToggle = users.find(u => u.id === userId);
    
    // Prevent status change of super admin
    if (userToToggle?.role === 'SUPER_ADMIN') {
      alert('Cannot modify Super Admin status');
      return;
    }

    console.log('Toggling status for user:', userId);
    alert('User status updated');
  };

  const handleRoleChange = (userId, newRole) => {
    const userToUpdate = users.find(u => u.id === userId);
    
    // Only super admin can assign certain roles
    if (!isSuperAdmin() && (newRole === 'SUPER_ADMIN' || newRole === 'ADMIN')) {
      alert('Insufficient privileges to assign this role');
      return;
    }

    // Prevent changing super admin role
    if (userToUpdate?.role === 'SUPER_ADMIN') {
      alert('Cannot change Super Admin role');
      return;
    }

    console.log('Changing role for user:', userId, 'to:', newRole);
    alert('Role updated successfully');
  };

  const handleUserSubmit = (formData) => {
    if (selectedUser) {
      console.log('Updating user:', selectedUser.id, formData);
    } else {
      console.log('Creating new user:', formData);
    }
    setShowAddModal(false);
    setSelectedUser(null);
  };

  return (
    <RoleGuard requiredPermission="manage_users">
      <div className="min-h-screen bg-dental-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-dental-900 mb-2 flex items-center space-x-3"
            >
              <span>User Management</span>
              {isSuperAdmin() && (
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <SafeIcon icon={FiShield} className="w-4 h-4" />
                  <span>Super Admin Access</span>
                </div>
              )}
            </motion.h1>
            <p className="text-dental-600">
              Manage users, roles, and permissions
              {isSuperAdmin() && (
                <span className="text-purple-600 font-medium"> • Full administrative control</span>
              )}
            </p>
          </div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg mb-8"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
              <div className="flex flex-wrap items-center gap-4">
                {/* Search */}
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Role Filter */}
                <div className="relative">
                  <SafeIcon icon={FiFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="All">All Roles</option>
                    {Object.entries(roles).map(([key, role]) => (
                      <option key={key} value={key}>{role.name}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <SafeIcon icon={FiShield} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="bg-dental-100 text-dental-600 px-4 py-2 rounded-lg font-medium hover:bg-dental-200 transition-colors flex items-center space-x-2">
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button className="bg-dental-100 text-dental-600 px-4 py-2 rounded-lg font-medium hover:bg-dental-200 transition-colors flex items-center space-x-2">
                  <SafeIcon icon={FiUpload} className="w-4 h-4" />
                  <span>Import</span>
                </button>
                {canEditSection('user-management') && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiUserPlus} className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dental-600 text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-dental-900">{users.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiUsers} className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dental-600 text-sm font-medium">Active Users</p>
                  <p className="text-2xl font-bold text-dental-900">
                    {users.filter(u => u.status === 'Active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiUserCheck} className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dental-600 text-sm font-medium">Super Admins</p>
                  <p className="text-2xl font-bold text-dental-900">
                    {users.filter(u => u.role === 'SUPER_ADMIN').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiCrown} className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dental-600 text-sm font-medium">Celestial Users</p>
                  <p className="text-2xl font-bold text-dental-900">
                    {users.filter(u => u.subscriptionLevel === 'celestial').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiStar} className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-dental-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dental-900">
                  Users ({filteredUsers.length})
                </h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dental-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Subscription
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Practice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-dental-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-dental-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <div className="flex items-center space-x-2">
                              <div className="text-sm font-medium text-dental-900">
                                {user.name}
                              </div>
                              {user.role === 'SUPER_ADMIN' && (
                                <SafeIcon icon={FiCrown} className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                            <div className="text-sm text-dental-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {canEditSection('user-management') && user.role !== 'SUPER_ADMIN' ? (
                          <RoleSelector
                            userId={user.id}
                            currentRole={user.role}
                            onRoleChange={handleRoleChange}
                          />
                        ) : (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                            {roles[user.role]?.name}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getSubscriptionBadge(user.subscriptionLevel)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-dental-900">{user.practice}</div>
                        <div className="text-sm text-dental-500">{user.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dental-500">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="relative">
                          <button
                            onClick={() => setShowActionMenu(showActionMenu === user.id ? null : user.id)}
                            className="text-dental-400 hover:text-dental-600"
                          >
                            <SafeIcon icon={FiMoreVertical} className="w-5 h-5" />
                          </button>
                          {showActionMenu === user.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-dental-200 z-10">
                              <div className="py-1">
                                {canEditSection('user-management') && (
                                  <button
                                    onClick={() => handleEditUser(user)}
                                    className="flex items-center px-4 py-2 text-sm text-dental-700 hover:bg-dental-50 w-full"
                                  >
                                    <SafeIcon icon={FiEdit} className="w-4 h-4 mr-2" />
                                    Edit User
                                  </button>
                                )}
                                {canEditSection('user-management') && user.role !== 'SUPER_ADMIN' && (
                                  <>
                                    <button
                                      onClick={() => handleToggleStatus(user.id)}
                                      className="flex items-center px-4 py-2 text-sm text-dental-700 hover:bg-dental-50 w-full"
                                    >
                                      <SafeIcon icon={user.status === 'Active' ? FiUserX : FiUserCheck} className="w-4 h-4 mr-2" />
                                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                    </button>
                                    <button
                                      onClick={() => handleDeleteUser(user.id)}
                                      className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full"
                                    >
                                      <SafeIcon icon={FiTrash2} className="w-4 h-4 mr-2" />
                                      Delete User
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Add/Edit User Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <UserForm
                user={selectedUser}
                onSubmit={handleUserSubmit}
                onCancel={() => {
                  setShowAddModal(false);
                  setSelectedUser(null);
                }}
                isEdit={!!selectedUser}
              />
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
};

export default UserManagement;