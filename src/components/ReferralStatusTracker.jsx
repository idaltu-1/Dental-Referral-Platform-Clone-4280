import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiClock, FiCheck, FiAlertCircle, FiUser, FiCalendar, FiMapPin,
  FiPhone, FiMail, FiMessageSquare, FiEye, FiEdit, FiFilter,
  FiSearch, FiDownload, FiSend, FiX, FiRefreshCw
} = FiIcons;

const ReferralStatusTracker = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const statusConfig = {
    pending: {
      label: 'Pending',
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      icon: FiClock,
      description: 'Waiting for response'
    },
    accepted: {
      label: 'Accepted',
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      icon: FiCheck,
      description: 'Referral accepted'
    },
    declined: {
      label: 'Declined',
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
      icon: FiX,
      description: 'Referral declined'
    },
    completed: {
      label: 'Completed',
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200',
      icon: FiCheck,
      description: 'Patient treated'
    },
    follow_up: {
      label: 'Follow-up',
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-200',
      icon: FiRefreshCw,
      description: 'Requires follow-up'
    }
  };

  const referralData = [
    {
      id: 1,
      patientName: 'Sarah Johnson',
      patientAge: 28,
      referredTo: 'Dr. Michael Chen',
      specialty: 'Orthodontics',
      reason: 'Invisalign consultation',
      status: 'pending',
      dateReferred: '2024-01-15',
      lastUpdate: '2024-01-15',
      priority: 'normal',
      location: 'New York, NY',
      contact: {
        phone: '+1 (555) 123-4567',
        email: 'sarah.johnson@email.com'
      },
      notes: 'Patient interested in Invisalign treatment. Previous orthodontic history.',
      timeline: [
        { date: '2024-01-15', event: 'Referral sent', status: 'pending' }
      ]
    },
    {
      id: 2,
      patientName: 'Robert Martinez',
      patientAge: 45,
      referredTo: 'Dr. Emily Rodriguez',
      specialty: 'Periodontics',
      reason: 'Gum disease treatment',
      status: 'accepted',
      dateReferred: '2024-01-12',
      lastUpdate: '2024-01-13',
      priority: 'urgent',
      location: 'Los Angeles, CA',
      contact: {
        phone: '+1 (555) 987-6543',
        email: 'robert.martinez@email.com'
      },
      notes: 'Advanced periodontal disease. Urgent care needed.',
      timeline: [
        { date: '2024-01-12', event: 'Referral sent', status: 'pending' },
        { date: '2024-01-13', event: 'Referral accepted', status: 'accepted' }
      ]
    },
    {
      id: 3,
      patientName: 'Lisa Chen',
      patientAge: 34,
      referredTo: 'Dr. James Wilson',
      specialty: 'Endodontics',
      reason: 'Root canal treatment',
      status: 'completed',
      dateReferred: '2024-01-08',
      lastUpdate: '2024-01-14',
      priority: 'normal',
      location: 'Chicago, IL',
      contact: {
        phone: '+1 (555) 456-7890',
        email: 'lisa.chen@email.com'
      },
      notes: 'Tooth #14 requires root canal. Patient has dental anxiety.',
      timeline: [
        { date: '2024-01-08', event: 'Referral sent', status: 'pending' },
        { date: '2024-01-09', event: 'Referral accepted', status: 'accepted' },
        { date: '2024-01-12', event: 'Appointment scheduled', status: 'accepted' },
        { date: '2024-01-14', event: 'Treatment completed', status: 'completed' }
      ]
    },
    {
      id: 4,
      patientName: 'David Park',
      patientAge: 52,
      referredTo: 'Dr. Sarah Johnson',
      specialty: 'Oral Surgery',
      reason: 'Wisdom tooth extraction',
      status: 'declined',
      dateReferred: '2024-01-10',
      lastUpdate: '2024-01-11',
      priority: 'normal',
      location: 'Houston, TX',
      contact: {
        phone: '+1 (555) 234-5678',
        email: 'david.park@email.com'
      },
      notes: 'Impacted wisdom teeth. Patient prefers sedation.',
      timeline: [
        { date: '2024-01-10', event: 'Referral sent', status: 'pending' },
        { date: '2024-01-11', event: 'Referral declined - not accepting new patients', status: 'declined' }
      ]
    },
    {
      id: 5,
      patientName: 'Maria Garcia',
      patientAge: 67,
      referredTo: 'Dr. Robert Martinez',
      specialty: 'Prosthodontics',
      reason: 'Denture replacement',
      status: 'follow_up',
      dateReferred: '2024-01-05',
      lastUpdate: '2024-01-13',
      priority: 'normal',
      location: 'Phoenix, AZ',
      contact: {
        phone: '+1 (555) 345-6789',
        email: 'maria.garcia@email.com'
      },
      notes: 'Complete denture replacement needed. Medicare coverage.',
      timeline: [
        { date: '2024-01-05', event: 'Referral sent', status: 'pending' },
        { date: '2024-01-06', event: 'Referral accepted', status: 'accepted' },
        { date: '2024-01-10', event: 'Initial consultation completed', status: 'completed' },
        { date: '2024-01-13', event: 'Follow-up needed for insurance', status: 'follow_up' }
      ]
    }
  ];

  const filteredReferrals = referralData.filter(referral => {
    const matchesFilter = activeFilter === 'all' || referral.status === activeFilter;
    const matchesSearch = referral.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.referredTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusCounts = () => {
    return {
      all: referralData.length,
      pending: referralData.filter(r => r.status === 'pending').length,
      accepted: referralData.filter(r => r.status === 'accepted').length,
      completed: referralData.filter(r => r.status === 'completed').length,
      declined: referralData.filter(r => r.status === 'declined').length,
      follow_up: referralData.filter(r => r.status === 'follow_up').length
    };
  };

  const statusCounts = getStatusCounts();

  const getDaysSince = (date) => {
    const today = new Date();
    const referralDate = new Date(date);
    const diffTime = Math.abs(today - referralDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewDetails = (referral) => {
    setSelectedReferral(referral);
    setShowDetailsModal(true);
  };

  const getPriorityColor = (priority) => {
    return priority === 'urgent' ? 'text-red-600' : 'text-gray-600';
  };

  const filters = [
    { key: 'all', label: 'All Referrals' },
    { key: 'pending', label: 'Pending' },
    { key: 'accepted', label: 'Accepted' },
    { key: 'completed', label: 'Completed' },
    { key: 'declined', label: 'Declined' },
    { key: 'follow_up', label: 'Follow-up' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Referral Status Tracker</h3>
          <p className="text-gray-600">Monitor and manage your referral pipeline</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2">
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
            <SafeIcon icon={FiSend} className="w-4 h-4" />
            <span>New Referral</span>
          </button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`p-3 rounded-lg border-2 transition-colors ${
              activeFilter === filter.key
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {statusCounts[filter.key]}
              </div>
              <div className="text-sm text-gray-600">{filter.label}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by patient name, doctor, or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
          <SafeIcon icon={FiFilter} className="w-4 h-4" />
          <span>Advanced Filter</span>
        </button>
      </div>

      {/* Referrals List */}
      <div className="space-y-4">
        {filteredReferrals.map((referral, index) => {
          const status = statusConfig[referral.status];
          const daysSince = getDaysSince(referral.dateReferred);
          
          return (
            <motion.div
              key={referral.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiUser} className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {referral.patientName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Age {referral.patientAge} • {referral.specialty}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${status.bgColor} ${status.textColor} ${status.borderColor} border`}>
                      <SafeIcon icon={status.icon} className="w-4 h-4 inline mr-1" />
                      {status.label}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Referred To</p>
                      <p className="font-medium text-gray-900">{referral.referredTo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reason</p>
                      <p className="font-medium text-gray-900">{referral.reason}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date Referred</p>
                      <p className="font-medium text-gray-900">{referral.dateReferred}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Priority</p>
                      <p className={`font-medium ${getPriorityColor(referral.priority)}`}>
                        {referral.priority.charAt(0).toUpperCase() + referral.priority.slice(1)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-1" />
                      {referral.location}
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                      {daysSince} days ago
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                      Last update: {referral.lastUpdate}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleViewDetails(referral)}
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                    <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredReferrals.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiAlertCircle} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No referrals found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedReferral && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Referral Details - {selectedReferral.patientName}
                </h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Patient Information */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Patient Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedReferral.patientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">{selectedReferral.patientAge}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedReferral.contact.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedReferral.contact.email}</p>
                    </div>
                  </div>
                </div>

                {/* Referral Details */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Referral Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Referred To</p>
                      <p className="font-medium">{selectedReferral.referredTo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Specialty</p>
                      <p className="font-medium">{selectedReferral.specialty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reason</p>
                      <p className="font-medium">{selectedReferral.reason}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Priority</p>
                      <p className={`font-medium ${getPriorityColor(selectedReferral.priority)}`}>
                        {selectedReferral.priority.charAt(0).toUpperCase() + selectedReferral.priority.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Clinical Notes</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {selectedReferral.notes}
                  </p>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Timeline</h4>
                  <div className="space-y-3">
                    {selectedReferral.timeline.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">{item.event}</p>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                  Update Status
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ReferralStatusTracker;