import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useRole } from '../context/RoleContext';

const { FiChevronDown, FiUser, FiShield, FiUsers, FiSettings } = FiIcons;

const RoleSelector = ({ userId, currentRole, onRoleChange, disabled = false }) => {
  const { roles, hasPermission } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const canManageRoles = hasPermission('manage_roles');

  const roleIcons = {
    ADMIN: FiShield,
    PRACTICE_OWNER: FiSettings,
    DENTIST: FiUser,
    STAFF: FiUsers
  };

  const handleRoleChange = async (newRole) => {
    if (disabled || !canManageRoles || newRole === currentRole) return;

    setIsChanging(true);
    try {
      await onRoleChange(userId, newRole);
      setIsOpen(false);
    } catch (error) {
      console.error('Error changing role:', error);
    } finally {
      setIsChanging(false);
    }
  };

  if (!canManageRoles) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-dental-100 text-dental-700">
        <SafeIcon icon={roleIcons[currentRole]} className="w-4 h-4 mr-2" />
        {roles[currentRole]?.name}
      </span>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || isChanging}
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          disabled || isChanging
            ? 'bg-dental-100 text-dental-500 cursor-not-allowed'
            : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
        }`}
      >
        {isChanging ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
        ) : (
          <SafeIcon icon={roleIcons[currentRole]} className="w-4 h-4 mr-2" />
        )}
        {roles[currentRole]?.name}
        <SafeIcon icon={FiChevronDown} className="w-4 h-4 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-dental-200 z-20">
          <div className="py-1">
            {Object.entries(roles).map(([roleKey, role]) => (
              <button
                key={roleKey}
                onClick={() => handleRoleChange(roleKey)}
                className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
                  roleKey === currentRole
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-dental-700 hover:bg-dental-50'
                }`}
              >
                <SafeIcon icon={roleIcons[roleKey]} className="w-4 h-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">{role.name}</div>
                  <div className="text-xs text-dental-500">Level {role.level}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelector;