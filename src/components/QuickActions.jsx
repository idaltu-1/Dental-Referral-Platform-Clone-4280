import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReferralForm from './ReferralForm';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../hooks/useNotifications';

const {
  FiPlus,
  FiUsers,
  FiMessageSquare,
  FiBarChart3,
  FiSettings,
  FiSearch,
  FiCalendar,
  FiFileText,
  FiTrendingUp,
  FiUserPlus,
  FiMail,
  FiPhone,
  FiGift
} = FiIcons;

const QuickActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNewReferral = () => {
    setShowReferralForm(true);
  };

  const handleBrowseNetwork = () => {
    navigate('/network');
    addNotification({
      type: 'system',
      title: 'Network Access',
      message: 'Browsing professional network...',
      autoRemove: true
    });
  };

  const handleMessages = () => {
    navigate('/messages');
    addNotification({
      type: 'system',
      title: 'Messages',
      message: 'Opening message center...',
      autoRemove: true
    });
  };

  const handleQuickAnalytics = () => {
    navigate('/analytics');
  };

  const handleQuickSettings = () => {
    navigate('/settings');
  };

  const handleQuickSearch = () => {
    setShowQuickSearch(true);
  };

  const handleScheduleAppointment = () => {
    addNotification({
      type: 'system',
      title: 'Appointment Scheduler',
      message: 'Opening appointment scheduler...',
      autoRemove: true
    });
  };

  const handleCreateReport = () => {
    navigate('/advanced-analytics');
  };

  const handleInviteColleague = () => {
    navigate('/referral-program');
  };

  const handleReferralSubmit = async (formData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addNotification({
        type: 'referral',
        title: 'Referral Created',
        message: `Referral for ${formData.patientName} created successfully`,
        autoRemove: true
      });
      
      setShowReferralForm(false);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to create referral. Please try again.',
        autoRemove: true
      });
    }
  };

  const quickActions = [
    {
      id: 'new-referral',
      title: 'New Referral',
      description: 'Create a new patient referral',
      icon: FiPlus,
      color: 'from-primary-500 to-primary-600',
      action: handleNewReferral,
      priority: 'high'
    },
    {
      id: 'browse-network',
      title: 'Browse Network',
      description: 'Find dental professionals',
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600',
      action: handleBrowseNetwork,
      priority: 'high'
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'View recent messages',
      icon: FiMessageSquare,
      color: 'from-green-500 to-green-600',
      action: handleMessages,
      priority: 'high'
    },
    {
      id: 'quick-search',
      title: 'Quick Search',
      description: 'Search referrals & contacts',
      icon: FiSearch,
      color: 'from-purple-500 to-purple-600',
      action: handleQuickSearch,
      priority: 'medium'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View performance metrics',
      icon: FiBarChart3,
      color: 'from-orange-500 to-orange-600',
      action: handleQuickAnalytics,
      priority: 'medium'
    },
    {
      id: 'schedule',
      title: 'Schedule',
      description: 'Manage appointments',
      icon: FiCalendar,
      color: 'from-indigo-500 to-indigo-600',
      action: handleScheduleAppointment,
      priority: 'medium'
    },
    {
      id: 'reports',
      title: 'Create Report',
      description: 'Generate custom reports',
      icon: FiFileText,
      color: 'from-teal-500 to-teal-600',
      action: handleCreateReport,
      priority: 'low'
    },
    {
      id: 'invite',
      title: 'Invite Colleague',
      description: 'Refer a professional',
      icon: FiUserPlus,
      color: 'from-pink-500 to-pink-600',
      action: handleInviteColleague,
      priority: 'low'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Account preferences',
      icon: FiSettings,
      color: 'from-gray-500 to-gray-600',
      action: handleQuickSettings,
      priority: 'low'
    }
  ];

  const priorityActions = quickActions.filter(action => action.priority === 'high');
  const secondaryActions = quickActions.filter(action => action.priority !== 'high');

  return (
    <>
      <div className="space-y-6">
        {/* Primary Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold text-dental-900 mb-6">Quick Actions</h2>
          
          {/* High Priority Actions */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            {priorityActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.action}
                className={`w-full bg-gradient-to-r ${action.color} text-white p-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-3 group`}
              >
                <SafeIcon icon={action.icon} className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-semibold">{action.title}</div>
                  <div className="text-sm opacity-90">{action.description}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Secondary Actions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {secondaryActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={action.action}
                className={`bg-gradient-to-r ${action.color} text-white p-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex flex-col items-center space-y-2 group`}
              >
                <SafeIcon icon={action.icon} className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{action.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold text-dental-900 mb-4">Quick Access</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-dental-600">New referral from Dr. Smith</span>
              <span className="text-dental-400 ml-auto">2m ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-dental-600">Patient appointment scheduled</span>
              <span className="text-dental-400 ml-auto">5m ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-dental-600">Referral completed</span>
              <span className="text-dental-400 ml-auto">10m ago</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Referral Form Modal */}
      {showReferralForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <ReferralForm
              onSubmit={handleReferralSubmit}
              onCancel={() => setShowReferralForm(false)}
            />
          </div>
        </div>
      )}

      {/* Quick Search Modal */}
      {showQuickSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-dental-900">Quick Search</h3>
                <button
                  onClick={() => setShowQuickSearch(false)}
                  className="text-dental-400 hover:text-dental-600"
                >
                  <SafeIcon icon={FiPlus} className="w-5 h-5 rotate-45" />
                </button>
              </div>
              <div className="relative mb-4">
                <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search referrals, contacts, or practices..."
                  className="w-full pl-10 pr-4 py-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-dental-500">Recent Searches</div>
                <div className="space-y-1">
                  <button className="w-full text-left p-2 rounded hover:bg-dental-50 text-dental-700">Dr. Sarah Johnson</button>
                  <button className="w-full text-left p-2 rounded hover:bg-dental-50 text-dental-700">Orthodontic referrals</button>
                  <button className="w-full text-left p-2 rounded hover:bg-dental-50 text-dental-700">Elite Dental Care</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default QuickActions;