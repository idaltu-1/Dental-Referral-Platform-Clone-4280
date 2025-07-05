import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';

const { FiSettings, FiBell, FiShield, FiUser, FiMail, FiPhone, FiEye, FiEyeOff, FiKey, FiTrash2, FiDownload, FiUpload, FiSave, FiToggleLeft, FiToggleRight } = FiIcons;

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  
  const [settings, setSettings] = useState({
    // Account Settings
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification Settings
    emailNotifications: {
      newReferrals: true,
      statusUpdates: true,
      weeklyReports: true,
      systemUpdates: false,
      marketingEmails: false
    },
    pushNotifications: {
      newReferrals: true,
      messages: true,
      reminders: true,
      networkUpdates: false
    },
    
    // Privacy Settings
    profileVisibility: 'network', // public, network, private
    showEmail: false,
    showPhone: false,
    allowDirectMessages: true,
    showOnlineStatus: true,
    
    // Preferences
    theme: 'light', // light, dark, auto
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    
    // Security
    twoFactorEnabled: false,
    sessionTimeout: 30,
    loginAlerts: true
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleDirectChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const handleExportData = () => {
    // Simulate data export
    const data = {
      profile: user,
      settings: settings,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'link-refer-dental-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (window.confirm('Please confirm again. All your data will be permanently deleted.')) {
        console.log('Deleting account...');
        alert('Account deletion initiated. You will receive a confirmation email.');
        logout();
      }
    }
  };

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between p-4 border border-dental-200 rounded-lg">
      <div>
        <h4 className="font-medium text-dental-900">{label}</h4>
        {description && <p className="text-sm text-dental-600">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-primary-500' : 'bg-dental-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

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
            Settings
          </motion.h1>
          <p className="text-dental-600">Manage your account preferences and privacy settings</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap space-x-1 mb-8 bg-white p-1 rounded-lg shadow-lg overflow-x-auto">
          {[
            { key: 'account', label: 'Account', icon: FiUser },
            { key: 'notifications', label: 'Notifications', icon: FiBell },
            { key: 'privacy', label: 'Privacy', icon: FiShield },
            { key: 'preferences', label: 'Preferences', icon: FiSettings },
            { key: 'security', label: 'Security', icon: FiKey }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-primary-500 text-white'
                  : 'text-dental-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'account' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Account Information */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dental-900 mb-6">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dental-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleDirectChange('email', e.target.value)}
                    className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dental-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => handleDirectChange('phone', e.target.value)}
                    className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dental-900 mb-6">Change Password</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-dental-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={settings.currentPassword}
                      onChange={(e) => handleDirectChange('currentPassword', e.target.value)}
                      className="w-full p-3 pr-10 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dental-400"
                    >
                      <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dental-700 mb-2">New Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={settings.newPassword}
                    onChange={(e) => handleDirectChange('newPassword', e.target.value)}
                    className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dental-700 mb-2">Confirm New Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={settings.confirmPassword}
                    onChange={(e) => handleDirectChange('confirmPassword', e.target.value)}
                    className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Email Notifications */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dental-900 mb-6">Email Notifications</h3>
              <div className="space-y-4">
                <ToggleSwitch
                  checked={settings.emailNotifications.newReferrals}
                  onChange={(value) => handleSettingChange('emailNotifications', 'newReferrals', value)}
                  label="New Referrals"
                  description="Get notified when you receive new patient referrals"
                />
                <ToggleSwitch
                  checked={settings.emailNotifications.statusUpdates}
                  onChange={(value) => handleSettingChange('emailNotifications', 'statusUpdates', value)}
                  label="Status Updates"
                  description="Receive updates on referral progress and completions"
                />
                <ToggleSwitch
                  checked={settings.emailNotifications.weeklyReports}
                  onChange={(value) => handleSettingChange('emailNotifications', 'weeklyReports', value)}
                  label="Weekly Reports"
                  description="Get weekly summaries of your referral activity"
                />
                <ToggleSwitch
                  checked={settings.emailNotifications.systemUpdates}
                  onChange={(value) => handleSettingChange('emailNotifications', 'systemUpdates', value)}
                  label="System Updates"
                  description="Important platform updates and maintenance notices"
                />
                <ToggleSwitch
                  checked={settings.emailNotifications.marketingEmails}
                  onChange={(value) => handleSettingChange('emailNotifications', 'marketingEmails', value)}
                  label="Marketing Emails"
                  description="Tips, best practices, and promotional content"
                />
              </div>
            </div>

            {/* Push Notifications */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dental-900 mb-6">Push Notifications</h3>
              <div className="space-y-4">
                <ToggleSwitch
                  checked={settings.pushNotifications.newReferrals}
                  onChange={(value) => handleSettingChange('pushNotifications', 'newReferrals', value)}
                  label="New Referrals"
                  description="Instant notifications for new referrals"
                />
                <ToggleSwitch
                  checked={settings.pushNotifications.messages}
                  onChange={(value) => handleSettingChange('pushNotifications', 'messages', value)}
                  label="Messages"
                  description="New messages from colleagues"
                />
                <ToggleSwitch
                  checked={settings.pushNotifications.reminders}
                  onChange={(value) => handleSettingChange('pushNotifications', 'reminders', value)}
                  label="Reminders"
                  description="Appointment and follow-up reminders"
                />
                <ToggleSwitch
                  checked={settings.pushNotifications.networkUpdates}
                  onChange={(value) => handleSettingChange('pushNotifications', 'networkUpdates', value)}
                  label="Network Updates"
                  description="Updates from your professional network"
                />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'privacy' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-dental-900 mb-6">Privacy Settings</h3>
            <div className="space-y-6">
              {/* Profile Visibility */}
              <div>
                <label className="block text-sm font-medium text-dental-700 mb-3">Profile Visibility</label>
                <div className="space-y-2">
                  {[
                    { value: 'public', label: 'Public', description: 'Visible to everyone' },
                    { value: 'network', label: 'Network Only', description: 'Visible to your connections only' },
                    { value: 'private', label: 'Private', description: 'Only visible to you' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 border border-dental-200 rounded-lg cursor-pointer hover:bg-dental-50">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value={option.value}
                        checked={settings.profileVisibility === option.value}
                        onChange={(e) => handleDirectChange('profileVisibility', e.target.value)}
                        className="text-primary-600"
                      />
                      <div>
                        <p className="font-medium text-dental-900">{option.label}</p>
                        <p className="text-sm text-dental-600">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <ToggleSwitch
                  checked={settings.showEmail}
                  onChange={(value) => handleDirectChange('showEmail', value)}
                  label="Show Email Address"
                  description="Allow others to see your email address"
                />
                <ToggleSwitch
                  checked={settings.showPhone}
                  onChange={(value) => handleDirectChange('showPhone', value)}
                  label="Show Phone Number"
                  description="Allow others to see your phone number"
                />
                <ToggleSwitch
                  checked={settings.allowDirectMessages}
                  onChange={(value) => handleDirectChange('allowDirectMessages', value)}
                  label="Allow Direct Messages"
                  description="Let other professionals send you direct messages"
                />
                <ToggleSwitch
                  checked={settings.showOnlineStatus}
                  onChange={(value) => handleDirectChange('showOnlineStatus', value)}
                  label="Show Online Status"
                  description="Display when you're online to others"
                />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'preferences' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-dental-900 mb-6">Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dental-700 mb-2">Theme</label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleDirectChange('theme', e.target.value)}
                  className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dental-700 mb-2">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => handleDirectChange('language', e.target.value)}
                  className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dental-700 mb-2">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleDirectChange('timezone', e.target.value)}
                  className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dental-700 mb-2">Date Format</label>
                <select
                  value={settings.dateFormat}
                  onChange={(e) => handleDirectChange('dateFormat', e.target.value)}
                  className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dental-700 mb-2">Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleDirectChange('currency', e.target.value)}
                  className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD ($)</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Two-Factor Authentication */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dental-900 mb-6">Two-Factor Authentication</h3>
              <div className="space-y-4">
                <ToggleSwitch
                  checked={settings.twoFactorEnabled}
                  onChange={(value) => handleDirectChange('twoFactorEnabled', value)}
                  label="Enable Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                />
                {settings.twoFactorEnabled && (
                  <div className="ml-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800">Two-factor authentication is enabled. You'll need your phone to sign in.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Session Management */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dental-900 mb-6">Session Management</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dental-700 mb-2">Session Timeout (minutes)</label>
                  <select
                    value={settings.sessionTimeout}
                    onChange={(e) => handleDirectChange('sessionTimeout', parseInt(e.target.value))}
                    className="w-full max-w-xs p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={120}>2 hours</option>
                    <option value={480}>8 hours</option>
                  </select>
                </div>
                <ToggleSwitch
                  checked={settings.loginAlerts}
                  onChange={(value) => handleDirectChange('loginAlerts', value)}
                  label="Login Alerts"
                  description="Get notified of new sign-ins to your account"
                />
              </div>
            </div>

            {/* Data Management */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-dental-900 mb-6">Data Management</h3>
              <div className="space-y-4">
                <button
                  onClick={handleExportData}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Export My Data</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-dental-200 text-dental-600 rounded-lg hover:bg-dental-50 transition-colors">
                  <SafeIcon icon={FiUpload} className="w-4 h-4" />
                  <span>Import Data</span>
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-red-900 mb-4">Danger Zone</h3>
              <p className="text-red-700 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <SafeIcon icon={FiSave} className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;