import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useRole } from '../context/RoleContext';

const { FiUser, FiMail, FiPhone, FiMapPin, FiBuilding, FiX, FiSave, FiAlertCircle } = FiIcons;

const UserForm = ({ user = null, onSubmit, onCancel, isEdit = false }) => {
  const { roles } = useRole();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'STAFF',
    practice: user?.practice || '',
    location: user?.location || '',
    specialty: user?.specialty || '',
    licenseNumber: user?.licenseNumber || '',
    status: user?.status || 'Active'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const specialties = [
    'General Dentistry',
    'Orthodontics',
    'Oral Surgery',
    'Periodontics',
    'Endodontics',
    'Prosthodontics',
    'Pediatric Dentistry',
    'Oral Pathology'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.practice.trim()) {
      newErrors.practice = 'Practice name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting user form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg max-w-2xl mx-auto"
    >
      <div className="p-6 border-b border-dental-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-dental-900">
            {isEdit ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={onCancel}
            className="text-dental-400 hover:text-dental-600 transition-colors"
          >
            <SafeIcon icon={FiX} className="w-6 h-6" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-dental-900 mb-4 flex items-center">
            <SafeIcon icon={FiUser} className="w-5 h-5 mr-2" />
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.name ? 'border-red-500' : 'border-dental-200'
                }`}
                placeholder="Dr. John Smith"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.email ? 'border-red-500' : 'border-dental-200'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.phone ? 'border-red-500' : 'border-dental-200'
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Object.entries(roles).map(([key, role]) => (
                  <option key={key} value={key}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Practice Information */}
        <div>
          <h3 className="text-lg font-semibold text-dental-900 mb-4 flex items-center">
            <SafeIcon icon={FiBuilding} className="w-5 h-5 mr-2" />
            Practice Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Practice Name *
              </label>
              <input
                type="text"
                value={formData.practice}
                onChange={(e) => handleInputChange('practice', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.practice ? 'border-red-500' : 'border-dental-200'
                }`}
                placeholder="ABC Dental Practice"
              />
              {errors.practice && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                  {errors.practice}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.location ? 'border-red-500' : 'border-dental-200'
                }`}
                placeholder="New York, NY"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                  {errors.location}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Specialty
              </label>
              <select
                value={formData.specialty}
                onChange={(e) => handleInputChange('specialty', e.target.value)}
                className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select Specialty</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                License Number
              </label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="DL12345"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        {isEdit && (
          <div>
            <label className="block text-sm font-medium text-dental-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex space-x-4 pt-6 border-t border-dental-200">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-dental-200 text-dental-600 rounded-lg hover:bg-dental-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <SafeIcon icon={FiSave} className="w-5 h-5" />
                <span>{isEdit ? 'Update User' : 'Create User'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default UserForm;