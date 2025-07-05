import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMessageSquare, FiStar, FiSend, FiThumbsUp, FiThumbsDown, FiBug, FiLightbulb, FiHeart, FiTrendingUp, FiCheck, FiX, FiUser, FiCalendar } = FiIcons;

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('general');
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    category: 'general',
    priority: 'medium',
    email: '',
    allowContact: true
  });
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    { id: 'general', label: 'General Feedback', icon: FiMessageSquare, color: 'blue' },
    { id: 'bug', label: 'Report Bug', icon: FiBug, color: 'red' },
    { id: 'feature', label: 'Feature Request', icon: FiLightbulb, color: 'yellow' },
    { id: 'compliment', label: 'Compliment', icon: FiHeart, color: 'pink' }
  ];

  const recentFeedback = [
    {
      id: 1,
      user: 'Dr. Sarah Johnson',
      type: 'feature',
      subject: 'Mobile app improvements',
      rating: 4,
      date: '2024-01-15',
      status: 'In Review',
      preview: 'Would love to see better mobile notifications...'
    },
    {
      id: 2,
      user: 'Dr. Michael Chen',
      type: 'compliment',
      subject: 'Great referral tracking',
      rating: 5,
      date: '2024-01-14',
      status: 'Acknowledged',
      preview: 'The referral tracking feature has been amazing...'
    },
    {
      id: 3,
      user: 'Dr. Emily Rodriguez',
      type: 'bug',
      subject: 'Dashboard loading issue',
      rating: 3,
      date: '2024-01-13',
      status: 'Fixed',
      preview: 'Sometimes the dashboard takes too long to load...'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { ...formData, rating, type: feedbackType });
    setSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        subject: '',
        message: '',
        category: 'general',
        priority: 'medium',
        email: '',
        allowContact: true
      });
      setRating(0);
      setFeedbackType('general');
    }, 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-dental-50 py-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-dental-900 mb-2">Thank You!</h2>
          <p className="text-dental-600 mb-4">
            Your feedback has been submitted successfully. We appreciate you taking the time to help us improve.
          </p>
          <div className="text-sm text-dental-500">
            You'll receive an email confirmation shortly.
          </div>
        </motion.div>
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
            Feedback & Suggestions
          </motion.h1>
          <p className="text-dental-600">Help us improve Link.Refer.Dental with your valuable feedback</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold text-dental-900 mb-6">Share Your Feedback</h2>
              
              {/* Feedback Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dental-700 mb-3">
                  What type of feedback do you have?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFeedbackType(type.id)}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        feedbackType === type.id
                          ? `border-${type.color}-500 bg-${type.color}-50`
                          : 'border-dental-200 hover:border-dental-300'
                      }`}
                    >
                      <SafeIcon 
                        icon={type.icon} 
                        className={`w-6 h-6 mx-auto mb-2 ${
                          feedbackType === type.id ? `text-${type.color}-600` : 'text-dental-600'
                        }`} 
                      />
                      <p className={`text-sm font-medium ${
                        feedbackType === type.id ? `text-${type.color}-700` : 'text-dental-700'
                      }`}>
                        {type.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dental-700 mb-3">
                  How would you rate your overall experience?
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-colors"
                    >
                      <SafeIcon 
                        icon={FiStar} 
                        className={`w-8 h-8 ${
                          star <= rating ? 'text-yellow-400 fill-current' : 'text-dental-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-dental-600 mt-1">
                    {rating === 5 ? 'Excellent!' : 
                     rating === 4 ? 'Good' : 
                     rating === 3 ? 'Average' : 
                     rating === 2 ? 'Poor' : 'Very Poor'}
                  </p>
                )}
              </div>

              {/* Feedback Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-dental-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Brief description of your feedback"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dental-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    placeholder="Please provide detailed feedback..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="general">General</option>
                      <option value="ui-ux">User Interface</option>
                      <option value="performance">Performance</option>
                      <option value="features">Features</option>
                      <option value="billing">Billing</option>
                      <option value="support">Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dental-700 mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="For follow-up questions"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="allowContact"
                    checked={formData.allowContact}
                    onChange={(e) => handleInputChange('allowContact', e.target.checked)}
                    className="rounded border-dental-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="allowContact" className="text-sm text-dental-600">
                    Allow us to contact you for follow-up questions
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiSend} className="w-5 h-5" />
                  <span>Submit Feedback</span>
                </button>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-semibold text-dental-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setFeedbackType('bug')}
                  className="w-full flex items-center space-x-3 p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <SafeIcon icon={FiBug} className="w-5 h-5 text-red-600" />
                  <span className="text-dental-700">Report a Bug</span>
                </button>
                <button
                  onClick={() => setFeedbackType('feature')}
                  className="w-full flex items-center space-x-3 p-3 border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors"
                >
                  <SafeIcon icon={FiLightbulb} className="w-5 h-5 text-yellow-600" />
                  <span className="text-dental-700">Suggest Feature</span>
                </button>
                <button
                  onClick={() => setFeedbackType('compliment')}
                  className="w-full flex items-center space-x-3 p-3 border border-pink-200 rounded-lg hover:bg-pink-50 transition-colors"
                >
                  <SafeIcon icon={FiHeart} className="w-5 h-5 text-pink-600" />
                  <span className="text-dental-700">Send Compliment</span>
                </button>
              </div>
            </motion.div>

            {/* Recent Community Feedback */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-semibold text-dental-900 mb-4">Recent Community Feedback</h3>
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="border-l-4 border-primary-200 pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-dental-900 text-sm">{feedback.subject}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        feedback.status === 'Fixed' ? 'bg-green-100 text-green-800' :
                        feedback.status === 'In Review' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {feedback.status}
                      </span>
                    </div>
                    <p className="text-dental-600 text-xs mb-2">{feedback.preview}</p>
                    <div className="flex items-center space-x-3 text-xs text-dental-500">
                      <span>{feedback.user}</span>
                      <span>•</span>
                      <span>{feedback.date}</span>
                      <div className="flex">
                        {[...Array(feedback.rating)].map((_, i) => (
                          <SafeIcon key={i} icon={FiStar} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Feedback Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-semibold text-dental-900 mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-dental-600">Feedback Received</span>
                  <span className="font-semibold text-dental-900">127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dental-600">Issues Fixed</span>
                  <span className="font-semibold text-green-600">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dental-600">Features Added</span>
                  <span className="font-semibold text-blue-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dental-600">Avg. Response Time</span>
                  <span className="font-semibold text-dental-900">2.4 hours</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;