import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useNotifications } from '../hooks/useNotifications';

const { FiBell, FiX, FiCheckCircle, FiAlertCircle, FiInfo, FiDollarSign } = FiIcons;

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'referral': return FiCheckCircle;
      case 'system': return FiInfo;
      case 'payment': return FiDollarSign;
      case 'error': return FiAlertCircle;
      default: return FiBell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'referral': return 'text-green-600 bg-green-100';
      case 'system': return 'text-blue-600 bg-blue-100';
      case 'payment': return 'text-purple-600 bg-purple-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-dental-600 bg-dental-100';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-dental-600 hover:text-primary-600 transition-colors"
      >
        <SafeIcon icon={FiBell} className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-dental-200 z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-dental-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-dental-900">Notifications</h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-dental-400 hover:text-dental-600"
                  >
                    <SafeIcon icon={FiX} className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-dental-500">
                  <SafeIcon icon={FiBell} className="w-12 h-12 mx-auto mb-3 text-dental-300" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-dental-100">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      layout
                      className={`p-4 hover:bg-dental-50 cursor-pointer ${
                        !notification.read ? 'bg-primary-25' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                          <SafeIcon icon={getNotificationIcon(notification.type)} className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`text-sm font-medium ${!notification.read ? 'text-dental-900' : 'text-dental-700'}`}>
                              {notification.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="text-dental-400 hover:text-dental-600 ml-2"
                            >
                              <SafeIcon icon={FiX} className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-dental-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-dental-500">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-dental-200 bg-dental-50">
                <div className="flex justify-between">
                  <button
                    onClick={clearAll}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;