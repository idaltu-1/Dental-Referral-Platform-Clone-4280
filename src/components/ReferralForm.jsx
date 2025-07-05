import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUser, FiMail, FiPhone, FiMapPin, FiFileText, FiCalendar, FiAlertCircle, FiX, FiSave } = FiIcons;

const ReferralForm = ({ onSubmit, onCancel, initialData = null, isEdit = false }) => {
  const [formData, setFormData] = useState({
    patientName: initialData?.patientName || '',
    patientEmail: initialData?.patientEmail || '',
    patientPhone: initialData?.patientPhone || '',
    patientAddress: initialData?.patientAddress || '',
    specialty: initialData?.specialty || '',
    receivingDoctor: initialData?.receivingDoctor || '',
    priority: initialData?.priority || 'Medium',
    urgency: initialData?.urgency || 'Routine',
    notes: initialData?.notes || '',
    appointmentDate: initialData?.appointmentDate || '',
    insuranceProvider: initialData?.insuranceProvider || '',
    reasonForReferral: initialData?.reasonForReferral || ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const specialties = [
    'Orthodontics',
    'Oral Surgery',
    'Periodontics', 
    'Endodontics',
    'Prosthodontics',
    'Pediatric Dentistry',
    'Oral Pathology'
  ];

  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  const urgencyLevels = ['Routine', 'Urgent', 'Emergency'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.patientEmail.trim()) {
      newErrors.patientEmail = 'Patient email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.patientEmail)) {
      newErrors.patientEmail = 'Email format is invalid';
    }

    if (!formData.patientPhone.trim()) {
      newErrors.patientPhone = 'Patient phone is required';
    }

    if (!formData.specialty) {
      newErrors.specialty = 'Specialty is required';
    }

    if (!formData.reasonForReferral.trim()) {
      newErrors.reasonForReferral = 'Reason for referral is required';
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
      console.error('Error submitting referral:', error);
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
      className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto"
    >
      <div className="p-6 border-b border-dental-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-dental-900">
            {isEdit ? 'Edit Referral' : 'New Referral'}
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
        {/* Patient Information */}
        <div>
          <h3 className="text-lg font-semibold text-dental-900 mb-4 flex items-center">
            <SafeIcon icon={FiUser} className="w-5 h-5 mr-2" />
            Patient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Patient Name *
              </label>
              <input
                type="text"
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.patientName ? 'border-red-500' : 'border-dental-200'
                }`}
                placeholder="Enter patient's full name"
              />
              {errors.patientName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                  {errors.patientName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.patientEmail}
                onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.patientEmail ? 'border-red-500' : 'border-dental-200'
                }`}
                placeholder="patient@email.com"
              />
              {errors.patientEmail && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                  {errors.patientEmail}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.patientPhone}
                onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.patientPhone ? 'border-red-500' : 'border-dental-200'
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.patientPhone && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                  {errors.patientPhone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Insurance Provider
              </label>
              <input
                type="text"
                value={formData.insuranceProvider}
                onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Insurance company name"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-dental-700 mb-2">
              Patient Address
            </label>
            <input
              type="text"
              value={formData.patientAddress}
              onChange={(e) => handleInputChange('patientAddress', e.target.value)}
              className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Street address, city, state, ZIP"
            />
          </div>
        </div>

        {/* Referral Details */}
        <div>
          <h3 className="text-lg font-semibold text-dental-900 mb-4 flex items-center">
            <SafeIcon icon={FiFileText} className="w-5 h-5 mr-2" />
            Referral Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Specialty *
              </label>
              <select
                value={formData.specialty}
                onChange={(e) => handleInputChange('specialty', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.specialty ? 'border-red-500' : 'border-dental-200'
                }`}
              >
                <option value="">Select specialty</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
              {errors.specialty && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                  {errors.specialty}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Preferred Doctor
              </label>
              <input
                type="text"
                value={formData.receivingDoctor}
                onChange={(e) => handleInputChange('receivingDoctor', e.target.value)}
                className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Dr. John Smith (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Priority Level
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Urgency
              </label>
              <select
                value={formData.urgency}
                onChange={(e) => handleInputChange('urgency', e.target.value)}
                className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {urgencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                Preferred Appointment Date
              </label>
              <input
                type="date"
                value={formData.appointmentDate}
                onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>

        {/* Reason and Notes */}
        <div>
          <label className="block text-sm font-medium text-dental-700 mb-2">
            Reason for Referral *
          </label>
          <textarea
            value={formData.reasonForReferral}
            onChange={(e) => handleInputChange('reasonForReferral', e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
              errors.reasonForReferral ? 'border-red-500' : 'border-dental-200'
            }`}
            placeholder="Describe the reason for this referral..."
          />
          {errors.reasonForReferral && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
              {errors.reasonForReferral}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-dental-700 mb-2">
            Additional Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            placeholder="Any additional information or special instructions..."
          />
        </div>

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
                <span>{isEdit ? 'Update Referral' : 'Create Referral'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ReferralForm;