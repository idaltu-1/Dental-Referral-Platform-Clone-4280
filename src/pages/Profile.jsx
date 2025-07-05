import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';

const { FiUser, FiMail, FiPhone, FiMapPin, FiBuilding, FiEdit, FiSave, FiCamera, FiShield, FiAward, FiCalendar, FiStar, FiTrendingUp, FiUsers, FiFileText } = FiIcons;

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [profileData, setProfileData] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    practice: 'Elite Dental Care',
    location: 'New York, NY',
    specialty: 'Orthodontics',
    licenseNumber: 'DL12345',
    experience: '15 years',
    education: 'Harvard School of Dental Medicine',
    bio: 'Experienced orthodontist specializing in Invisalign and advanced orthodontic treatments. Committed to providing exceptional patient care and building lasting relationships with referring doctors.',
    website: 'https://elitedentalcare.com',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
    certifications: [
      'Invisalign Certified Provider',
      'American Board of Orthodontics',
      'Damon System Certified',
      'SureSmile Advanced Provider'
    ],
    languages: ['English', 'Spanish', 'French'],
    insuranceAccepted: [
      'Delta Dental',
      'MetLife',
      'Cigna',
      'Aetna',
      'BlueCross BlueShield'
    ]
  });

  const stats = [
    { label: 'Referrals Completed', value: '247', icon: FiTrendingUp, color: 'text-green-600' },
    { label: 'Network Connections', value: '89', icon: FiUsers, color: 'text-blue-600' },
    { label: 'Patient Rating', value: '4.9', icon: FiStar, color: 'text-yellow-600' },
    { label: 'Years Experience', value: '15', icon: FiCalendar, color: 'text-purple-600' }
  ];

  const recentActivity = [
    { action: 'Completed referral for orthodontic treatment', date: '2024-01-15', type: 'referral' },
    { action: 'Updated practice information', date: '2024-01-14', type: 'profile' },
    { action: 'Received 5-star patient review', date: '2024-01-13', type: 'review' },
    { action: 'Connected with Dr. Michael Chen', date: '2024-01-12', type: 'network' }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save profile data
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

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
            Professional Profile
          </motion.h1>
          <p className="text-dental-600">Manage your professional information and credentials</p>
        </div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary-500 text-white rounded-full p-2 cursor-pointer hover:bg-primary-600 transition-colors">
                  <SafeIcon icon={FiCamera} className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-bold text-dental-900 bg-transparent border-b border-dental-200 focus:border-primary-500 outline-none"
                  />
                  <input
                    type="text"
                    value={profileData.specialty}
                    onChange={(e) => handleInputChange('specialty', e.target.value)}
                    className="text-primary-600 font-medium bg-transparent border-b border-dental-200 focus:border-primary-500 outline-none"
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-dental-900">{profileData.name}</h2>
                  <p className="text-primary-600 font-medium">{profileData.specialty}</p>
                  <p className="text-dental-600">{profileData.practice}</p>
                  <p className="text-dental-500">{profileData.location}</p>
                </div>
              )}
            </div>

            {/* Edit Button */}
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-dental-200 text-dental-600 rounded-lg hover:bg-dental-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiSave} className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiEdit} className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <SafeIcon icon={stat.icon} className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <p className="text-2xl font-bold text-dental-900">{stat.value}</p>
              <p className="text-dental-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-lg">
          {['overview', 'details', 'credentials', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-primary-500 text-white'
                  : 'text-dental-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-dental-900 mb-4">About</h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={6}
                  className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              ) : (
                <p className="text-dental-600">{profileData.bio}</p>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-dental-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMail} className="w-5 h-5 text-dental-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="flex-1 p-2 border border-dental-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <span className="text-dental-600">{profileData.email}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiPhone} className="w-5 h-5 text-dental-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="flex-1 p-2 border border-dental-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <span className="text-dental-600">{profileData.phone}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiBuilding} className="w-5 h-5 text-dental-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.practice}
                      onChange={(e) => handleInputChange('practice', e.target.value)}
                      className="flex-1 p-2 border border-dental-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <span className="text-dental-600">{profileData.practice}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMapPin} className="w-5 h-5 text-dental-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="flex-1 p-2 border border-dental-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <span className="text-dental-600">{profileData.location}</span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'details' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-dental-900 mb-6">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dental-700 mb-2">License Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="text-dental-600">{profileData.licenseNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-dental-700 mb-2">Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="text-dental-600">{profileData.experience}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-dental-700 mb-2">Education</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="text-dental-600">{profileData.education}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-dental-700 mb-2">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    {profileData.website}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'credentials' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-dental-900 mb-4">Certifications</h3>
              <div className="space-y-2">
                {profileData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <SafeIcon icon={FiAward} className="w-4 h-4 text-primary-600" />
                    <span className="text-dental-600">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Languages & Insurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-dental-900 mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.languages.map((lang, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-dental-900 mb-4">Insurance Accepted</h3>
                <div className="space-y-2">
                  {profileData.insuranceAccepted.map((insurance, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <SafeIcon icon={FiShield} className="w-4 h-4 text-green-600" />
                      <span className="text-dental-600">{insurance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'activity' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-dental-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border border-dental-200 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'referral' ? 'bg-green-100' :
                    activity.type === 'profile' ? 'bg-blue-100' :
                    activity.type === 'review' ? 'bg-yellow-100' : 'bg-purple-100'
                  }`}>
                    <SafeIcon 
                      icon={
                        activity.type === 'referral' ? FiTrendingUp :
                        activity.type === 'profile' ? FiUser :
                        activity.type === 'review' ? FiStar : FiUsers
                      } 
                      className={`w-5 h-5 ${
                        activity.type === 'referral' ? 'text-green-600' :
                        activity.type === 'profile' ? 'text-blue-600' :
                        activity.type === 'review' ? 'text-yellow-600' : 'text-purple-600'
                      }`} 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-dental-900">{activity.action}</p>
                    <p className="text-sm text-dental-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;