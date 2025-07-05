import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHelpCircle, FiSearch, FiBook, FiVideo, FiMessageSquare, FiMail, FiPhone, FiUsers, FiTrendingUp, FiSettings, FiShield, FiCreditCard, FiChevronRight, FiPlay, FiDownload, FiExternalLink, FiClock, FiStar } = FiIcons;

const HelpHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('articles');

  const categories = [
    { id: 'all', label: 'All Topics', icon: FiBook },
    { id: 'getting-started', label: 'Getting Started', icon: FiPlay },
    { id: 'referrals', label: 'Referral Management', icon: FiUsers },
    { id: 'network', label: 'Professional Network', icon: FiTrendingUp },
    { id: 'billing', label: 'Billing & Payments', icon: FiCreditCard },
    { id: 'account', label: 'Account Settings', icon: FiSettings },
    { id: 'privacy', label: 'Privacy & Security', icon: FiShield }
  ];

  const helpArticles = [
    {
      id: 1,
      title: 'Getting Started with Link.Refer.Dental',
      category: 'getting-started',
      description: 'Learn the basics of setting up your profile and making your first referral',
      readTime: '5 min read',
      popularity: 95,
      lastUpdated: '2024-01-15',
      tags: ['onboarding', 'setup', 'profile']
    },
    {
      id: 2,
      title: 'How to Create and Track Referrals',
      category: 'referrals',
      description: 'Step-by-step guide to creating referrals and monitoring their progress',
      readTime: '7 min read',
      popularity: 88,
      lastUpdated: '2024-01-14',
      tags: ['referrals', 'tracking', 'workflow']
    },
    {
      id: 3,
      title: 'Building Your Professional Network',
      category: 'network',
      description: 'Tips for connecting with other dental professionals and growing your network',
      readTime: '6 min read',
      popularity: 82,
      lastUpdated: '2024-01-13',
      tags: ['networking', 'connections', 'growth']
    },
    {
      id: 4,
      title: 'Understanding Billing and Payments',
      category: 'billing',
      description: 'Complete guide to subscription plans, billing cycles, and payment methods',
      readTime: '8 min read',
      popularity: 75,
      lastUpdated: '2024-01-12',
      tags: ['billing', 'payments', 'subscription']
    },
    {
      id: 5,
      title: 'Privacy Settings and Data Security',
      category: 'privacy',
      description: 'How to configure privacy settings and keep your data secure',
      readTime: '4 min read',
      popularity: 70,
      lastUpdated: '2024-01-11',
      tags: ['privacy', 'security', 'HIPAA']
    },
    {
      id: 6,
      title: 'Managing Your Account Settings',
      category: 'account',
      description: 'Customize your account preferences and notification settings',
      readTime: '5 min read',
      popularity: 68,
      lastUpdated: '2024-01-10',
      tags: ['account', 'settings', 'preferences']
    }
  ];

  const videoTutorials = [
    {
      id: 1,
      title: 'Platform Overview and Navigation',
      duration: '8:32',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop',
      description: 'A comprehensive overview of the platform interface and navigation',
      category: 'getting-started'
    },
    {
      id: 2,
      title: 'Creating Your First Referral',
      duration: '6:15',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
      description: 'Step-by-step walkthrough of the referral creation process',
      category: 'referrals'
    },
    {
      id: 3,
      title: 'Advanced Analytics and Reporting',
      duration: '10:45',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      description: 'Learn how to use advanced analytics to track your performance',
      category: 'network'
    }
  ];

  const faqs = [
    {
      question: 'How do I create my first referral?',
      answer: 'Navigate to the Referral Management section and click "New Referral". Fill in the patient information, select the specialty, and choose a receiving doctor from your network.',
      category: 'referrals'
    },
    {
      question: 'Is my patient data secure and HIPAA compliant?',
      answer: 'Yes, our platform is fully HIPAA compliant with end-to-end encryption, secure data storage, and comprehensive audit trails to protect patient information.',
      category: 'privacy'
    },
    {
      question: 'How do I connect with other dental professionals?',
      answer: 'Use the Professional Network section to search for colleagues by specialty, location, or name. Send connection requests to build your referral network.',
      category: 'network'
    },
    {
      question: 'What subscription plans are available?',
      answer: 'We offer three plans: Starter ($49/month), Professional ($99/month), and Enterprise ($199/month). Each plan includes different features and referral limits.',
      category: 'billing'
    },
    {
      question: 'How can I track my referral performance?',
      answer: 'The Analytics dashboard provides comprehensive insights into your referral patterns, completion rates, and network growth metrics.',
      category: 'referrals'
    },
    {
      question: 'Can I customize my notification preferences?',
      answer: 'Yes, go to Settings > Notifications to customize email and push notification preferences for different types of activities.',
      category: 'account'
    }
  ];

  const contactOptions = [
    {
      id: 'email',
      title: 'Email Support',
      description: 'Get detailed help via email',
      contact: 'support@linkrefer.dental',
      responseTime: '< 24 hours',
      icon: FiMail,
      color: 'blue'
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+1 (555) 123-4567',
      responseTime: 'Mon-Fri 9AM-6PM EST',
      icon: FiPhone,
      color: 'green'
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Instant help through chat',
      contact: 'Start Chat',
      responseTime: 'Available now',
      icon: FiMessageSquare,
      color: 'purple'
    }
  ];

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-dental-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-dental-900 mb-4"
          >
            Help Center
          </motion.h1>
          <p className="text-xl text-dental-600 max-w-2xl mx-auto">
            Find answers, tutorials, and get support for Link.Refer.Dental
          </p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles, tutorials, and FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-dental-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-dental-600 border border-dental-200 hover:bg-primary-50'
                }`}
              >
                <SafeIcon icon={category.icon} className="w-4 h-4" />
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-lg max-w-md mx-auto">
          {[
            { key: 'articles', label: 'Articles', icon: FiBook },
            { key: 'videos', label: 'Videos', icon: FiVideo },
            { key: 'faqs', label: 'FAQs', icon: FiHelpCircle },
            { key: 'contact', label: 'Contact', icon: FiMail }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-primary-500 text-white'
                  : 'text-dental-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'articles' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-primary-600 font-medium">
                      {categories.find(c => c.id === article.category)?.label}
                    </span>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-dental-600">{article.popularity}%</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-dental-900 mb-2">{article.title}</h3>
                  <p className="text-dental-600 text-sm mb-4">{article.description}</p>
                  <div className="flex items-center justify-between text-sm text-dental-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiClock} className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <span>Updated {article.lastUpdated}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-dental-100 text-dental-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2">
                    <span>Read Article</span>
                    <SafeIcon icon={FiChevronRight} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'videos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {videoTutorials.map((video) => (
              <div key={video.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                      <SafeIcon icon={FiPlay} className="w-8 h-8 text-primary-600 ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-dental-900 mb-2">{video.title}</h3>
                  <p className="text-dental-600 text-sm mb-4">{video.description}</p>
                  <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2">
                    <SafeIcon icon={FiPlay} className="w-4 h-4" />
                    <span>Watch Video</span>
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'faqs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-dental-900 mb-3">{faq.question}</h3>
                <p className="text-dental-600 leading-relaxed">{faq.answer}</p>
                <div className="mt-3">
                  <span className="text-sm text-primary-600 font-medium">
                    {categories.find(c => c.id === faq.category)?.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-dental-900 mb-2">Get in Touch</h2>
              <p className="text-dental-600">Choose the best way to reach our support team</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactOptions.map((option) => (
                <div key={option.id} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <div className={`w-16 h-16 bg-${option.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <SafeIcon icon={option.icon} className={`w-8 h-8 text-${option.color}-600`} />
                  </div>
                  <h3 className="text-lg font-semibold text-dental-900 mb-2">{option.title}</h3>
                  <p className="text-dental-600 text-sm mb-4">{option.description}</p>
                  <p className="font-medium text-dental-900 mb-2">{option.contact}</p>
                  <p className="text-sm text-dental-500 mb-4">{option.responseTime}</p>
                  <button className={`w-full bg-${option.color}-500 text-white py-2 rounded-lg hover:bg-${option.color}-600 transition-colors flex items-center justify-center space-x-2`}>
                    <span>Contact Now</span>
                    <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-dental-900 mb-6">Still Need Help?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-dental-200 rounded-lg hover:bg-dental-50 transition-colors">
              <SafeIcon icon={FiDownload} className="w-4 h-4 text-dental-600" />
              <span className="text-dental-700">Download User Guide</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-dental-200 rounded-lg hover:bg-dental-50 transition-colors">
              <SafeIcon icon={FiUsers} className="w-4 h-4 text-dental-600" />
              <span className="text-dental-700">Community Forum</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
              <span>Schedule Demo</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpHub;