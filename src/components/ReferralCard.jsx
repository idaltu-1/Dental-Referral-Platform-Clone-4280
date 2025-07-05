import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUser, FiMail, FiPhone, FiCalendar, FiEdit, FiTrash2, FiEye, FiMessageSquare, FiMoreVertical } = FiIcons;

const ReferralCard = ({ referral, onEdit, onDelete, onView, onMessage }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
      case 'Urgent':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-dental-200"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUser} className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-dental-900">{referral.patientName}</h3>
              <p className="text-dental-600 text-sm">{referral.specialty}</p>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="text-dental-400 hover:text-dental-600 transition-colors"
            >
              <SafeIcon icon={FiMoreVertical} className="w-5 h-5" />
            </button>
            
            {showActions && (
              <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-dental-200 z-10 min-w-[160px]">
                <div className="py-1">
                  <button
                    onClick={() => { onView(referral); setShowActions(false); }}
                    className="flex items-center w-full px-4 py-2 text-sm text-dental-700 hover:bg-dental-50"
                  >
                    <SafeIcon icon={FiEye} className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                  <button
                    onClick={() => { onEdit(referral); setShowActions(false); }}
                    className="flex items-center w-full px-4 py-2 text-sm text-dental-700 hover:bg-dental-50"
                  >
                    <SafeIcon icon={FiEdit} className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => { onMessage(referral); setShowActions(false); }}
                    className="flex items-center w-full px-4 py-2 text-sm text-dental-700 hover:bg-dental-50"
                  >
                    <SafeIcon icon={FiMessageSquare} className="w-4 h-4 mr-2" />
                    Message
                  </button>
                  <button
                    onClick={() => { onDelete(referral.id); setShowActions(false); }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status and Priority */}
        <div className="flex items-center space-x-2 mb-4">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(referral.status)}`}>
            {referral.status}
          </span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(referral.priority)}`}>
            {referral.priority}
          </span>
          {referral.urgency && referral.urgency !== 'Routine' && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
              {referral.urgency}
            </span>
          )}
        </div>

        {/* Patient Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-dental-600 text-sm">
            <SafeIcon icon={FiMail} className="w-4 h-4 mr-2" />
            {referral.patientEmail}
          </div>
          <div className="flex items-center text-dental-600 text-sm">
            <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
            {referral.patientPhone}
          </div>
        </div>

        {/* Referral Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-dental-600">Referring Doctor:</span>
            <span className="font-medium text-dental-900">{referral.referringDoctor}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-dental-600">Receiving Doctor:</span>
            <span className="font-medium text-dental-900">{referral.receivingDoctor}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-dental-600">Date Created:</span>
            <span className="font-medium text-dental-900">{referral.dateCreated}</span>
          </div>
          {referral.dateCompleted && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-dental-600">Date Completed:</span>
              <span className="font-medium text-dental-900">{referral.dateCompleted}</span>
            </div>
          )}
        </div>

        {/* Notes Preview */}
        {referral.notes && (
          <div className="bg-dental-50 p-3 rounded-lg">
            <p className="text-dental-700 text-sm line-clamp-2">{referral.notes}</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => onView(referral)}
            className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            View Details
          </button>
          <button
            onClick={() => onMessage(referral)}
            className="px-4 py-2 border border-dental-200 text-dental-600 rounded-lg hover:bg-dental-50 transition-colors"
          >
            <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReferralCard;