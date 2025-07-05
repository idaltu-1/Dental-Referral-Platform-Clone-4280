import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReferralForm from '../components/ReferralForm';
import ReferralCard from '../components/ReferralCard';
import { DatabaseService } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const {
  FiPlus,
  FiFilter,
  FiSearch,
  FiDownload,
  FiGrid,
  FiList,
  FiX,
  FiEye,
  FiEdit,
  FiTrash2,
  FiMessageSquare,
  FiCalendar,
  FiUser,
  FiPhone,
  FiMail
} = FiIcons;

const ReferralManagement = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingReferral, setEditingReferral] = useState(null);
  const [viewingReferral, setViewingReferral] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const [referrals, setReferrals] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    specialty: 'All',
    priority: 'All'
  });

  // Load referrals on component mount
  useEffect(() => {
    loadReferrals();
  }, [user, filters]);

  const loadReferrals = async () => {
    if (!user?.userId) return;
    
    setLoading(true);
    try {
      const data = await DatabaseService.getReferrals(user.userId, filters);
      setReferrals(data);
    } catch (error) {
      console.error('Error loading referrals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReferral = async (formData) => {
    try {
      const newReferral = await DatabaseService.saveReferral({
        ...formData,
        referring_doctor_id: user.userId,
        referring_doctor: user.name || 'Current User'
      });
      
      setReferrals(prev => [newReferral, ...prev]);
      setShowForm(false);
      alert('Referral created successfully!');
    } catch (error) {
      alert('Error creating referral. Please try again.');
    }
  };

  const handleUpdateReferral = async (formData) => {
    try {
      const updatedReferral = await DatabaseService.updateReferral(editingReferral.id, formData);
      setReferrals(prev => prev.map(ref => 
        ref.id === editingReferral.id ? updatedReferral : ref
      ));
      setEditingReferral(null);
      setShowForm(false);
      alert('Referral updated successfully!');
    } catch (error) {
      alert('Error updating referral. Please try again.');
    }
  };

  const handleDeleteReferral = async (id) => {
    if (window.confirm('Are you sure you want to delete this referral?')) {
      try {
        await DatabaseService.deleteReferral(id);
        setReferrals(prev => prev.filter(ref => ref.id !== id));
        alert('Referral deleted successfully!');
      } catch (error) {
        alert('Error deleting referral. Please try again.');
      }
    }
  };

  const handleEditReferral = (referral) => {
    setEditingReferral(referral);
    setShowForm(true);
  };

  const handleViewReferral = (referral) => {
    setViewingReferral(referral);
  };

  const handleMessageReferral = (referral) => {
    // Implementation for messaging about referral
    alert(`Opening message thread for referral: ${referral.patientName}`);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.patientName?.toLowerCase().includes(filters.search.toLowerCase()) ||
                         referral.specialty?.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'All' || referral.status === filters.status;
    const matchesSpecialty = filters.specialty === 'All' || referral.specialty === filters.specialty;
    const matchesPriority = filters.priority === 'All' || referral.priority === filters.priority;
    
    return matchesSearch && matchesStatus && matchesSpecialty && matchesPriority;
  });

  if (showForm) {
    return (
      <div className="min-h-screen bg-dental-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReferralForm
            onSubmit={editingReferral ? handleUpdateReferral : handleCreateReferral}
            onCancel={() => {
              setShowForm(false);
              setEditingReferral(null);
            }}
            initialData={editingReferral}
            isEdit={!!editingReferral}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dental-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-dental-900 mb-2"
          >
            Referral Management
          </motion.h1>
          <p className="text-dental-600">Manage all your patient referrals in one place</p>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="relative">
                <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search referrals..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              {/* Specialty Filter */}
              <select
                value={filters.specialty}
                onChange={(e) => handleFilterChange('specialty', e.target.value)}
                className="px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="All">All Specialties</option>
                <option value="Orthodontics">Orthodontics</option>
                <option value="Oral Surgery">Oral Surgery</option>
                <option value="Periodontics">Periodontics</option>
                <option value="Endodontics">Endodontics</option>
              </select>

              {/* Priority Filter */}
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="All">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-1 bg-dental-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-dental-600'
                  }`}
                >
                  <SafeIcon icon={FiGrid} className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-dental-600'
                  }`}
                >
                  <SafeIcon icon={FiList} className="w-4 h-4" />
                </button>
              </div>

              <button className="bg-dental-100 text-dental-600 px-4 py-2 rounded-lg font-medium hover:bg-dental-200 transition-colors flex items-center space-x-2">
                <SafeIcon icon={FiDownload} className="w-4 h-4" />
                <span>Export</span>
              </button>

              <button
                onClick={() => setShowForm(true)}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                <span>New Referral</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-dental-600">
            Showing {filteredReferrals.length} of {referrals.length} referrals
          </p>
        </div>

        {/* Referrals Display */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredReferrals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <SafeIcon icon={FiFilter} className="w-16 h-16 text-dental-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dental-900 mb-2">No referrals found</h3>
            <p className="text-dental-600 mb-6">
              {referrals.length === 0 
                ? "You haven't created any referrals yet." 
                : "No referrals match your current filters."}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2 mx-auto"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5" />
              <span>Create Your First Referral</span>
            </button>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReferrals.map((referral, index) => (
              <motion.div
                key={referral.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ReferralCard
                  referral={referral}
                  onEdit={handleEditReferral}
                  onDelete={handleDeleteReferral}
                  onView={handleViewReferral}
                  onMessage={handleMessageReferral}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dental-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Specialty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Date Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-dental-200">
                  {filteredReferrals.map((referral) => (
                    <tr key={referral.id} className="hover:bg-dental-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-dental-900">{referral.patientName}</div>
                          <div className="text-sm text-dental-500">{referral.patientEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dental-900">
                        {referral.specialty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          referral.status === 'Completed' 
                            ? 'bg-green-100 text-green-800'
                            : referral.status === 'In Progress' 
                            ? 'bg-blue-100 text-blue-800'
                            : referral.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          referral.priority === 'High' || referral.priority === 'Urgent' 
                            ? 'bg-red-100 text-red-800'
                            : referral.priority === 'Medium' 
                            ? 'bg-orange-100 text-orange-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {referral.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dental-500">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleViewReferral(referral)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditReferral(referral)}
                          className="text-dental-600 hover:text-dental-900"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Referral Details Modal */}
        {viewingReferral && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-dental-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-dental-900">Referral Details</h3>
                  <button
                    onClick={() => setViewingReferral(null)}
                    className="text-dental-400 hover:text-dental-600"
                  >
                    <SafeIcon icon={FiX} className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Patient Information */}
                <div className="bg-dental-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-dental-900 mb-3 flex items-center">
                    <SafeIcon icon={FiUser} className="w-5 h-5 mr-2" />
                    Patient Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-dental-600">Name</label>
                      <p className="text-dental-900">{viewingReferral.patientName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dental-600">Email</label>
                      <p className="text-dental-900">{viewingReferral.patientEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dental-600">Phone</label>
                      <p className="text-dental-900">{viewingReferral.patientPhone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dental-600">Address</label>
                      <p className="text-dental-900">{viewingReferral.patientAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Referral Details */}
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-dental-900 mb-3 flex items-center">
                    <SafeIcon icon={FiCalendar} className="w-5 h-5 mr-2" />
                    Referral Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-dental-600">Specialty</label>
                      <p className="text-dental-900">{viewingReferral.specialty}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dental-600">Priority</label>
                      <p className="text-dental-900">{viewingReferral.priority}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dental-600">Status</label>
                      <p className="text-dental-900">{viewingReferral.status}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dental-600">Receiving Doctor</label>
                      <p className="text-dental-900">{viewingReferral.receivingDoctor || 'Not assigned'}</p>
                    </div>
                  </div>
                </div>

                {/* Reason for Referral */}
                {viewingReferral.reasonForReferral && (
                  <div>
                    <h4 className="text-lg font-semibold text-dental-900 mb-3">Reason for Referral</h4>
                    <p className="text-dental-700 bg-dental-50 p-4 rounded-lg">
                      {viewingReferral.reasonForReferral}
                    </p>
                  </div>
                )}

                {/* Additional Notes */}
                {viewingReferral.notes && (
                  <div>
                    <h4 className="text-lg font-semibold text-dental-900 mb-3">Additional Notes</h4>
                    <p className="text-dental-700 bg-dental-50 p-4 rounded-lg">
                      {viewingReferral.notes}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4 border-t border-dental-200">
                  <button
                    onClick={() => {
                      setViewingReferral(null);
                      handleEditReferral(viewingReferral);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    <span>Edit Referral</span>
                  </button>
                  <button
                    onClick={() => handleMessageReferral(viewingReferral)}
                    className="flex items-center space-x-2 px-4 py-2 border border-dental-200 text-dental-600 rounded-lg hover:bg-dental-50 transition-colors"
                  >
                    <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                  <button
                    onClick={() => setViewingReferral(null)}
                    className="flex items-center space-x-2 px-4 py-2 border border-dental-200 text-dental-600 rounded-lg hover:bg-dental-50 transition-colors"
                  >
                    <SafeIcon icon={FiX} className="w-4 h-4" />
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralManagement;