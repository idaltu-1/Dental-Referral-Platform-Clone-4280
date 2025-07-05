import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReferralForm from '../components/ReferralForm';
import ReferralCard from '../components/ReferralCard';
import { useReferrals } from '../hooks/useReferrals';

const { FiPlus, FiFilter, FiSearch, FiDownload, FiGrid, FiList, FiX } = FiIcons;

const ReferralManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingReferral, setEditingReferral] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    specialty: 'All',
    priority: 'All'
  });

  const { referrals, loading, createReferral, updateReferral, deleteReferral } = useReferrals(filters);

  const handleCreateReferral = async (formData) => {
    try {
      await createReferral(formData);
      setShowForm(false);
      alert('Referral created successfully!');
    } catch (error) {
      alert('Error creating referral. Please try again.');
    }
  };

  const handleUpdateReferral = async (formData) => {
    try {
      await updateReferral(editingReferral.id, formData);
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
        await deleteReferral(id);
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
    // Implementation for viewing referral details
    console.log('Viewing referral:', referral);
  };

  const handleMessageReferral = (referral) => {
    // Implementation for messaging about referral
    console.log('Messaging about referral:', referral);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         referral.specialty.toLowerCase().includes(filters.search.toLowerCase());
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
                    viewMode === 'grid' ? 'bg-white text-primary-600 shadow-sm' : 'text-dental-600'
                  }`}
                >
                  <SafeIcon icon={FiGrid} className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm' : 'text-dental-600'
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
                : "No referrals match your current filters."
              }
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
                          referral.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          referral.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          referral.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          referral.priority === 'High' || referral.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                          referral.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {referral.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dental-500">
                        {referral.dateCreated}
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
      </div>
    </div>
  );
};

export default ReferralManagement;