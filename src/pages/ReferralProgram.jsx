import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReferralAnalytics from '../components/ReferralAnalytics';
import SmartReferralMatcher from '../components/SmartReferralMatcher';
import ReferralStatusTracker from '../components/ReferralStatusTracker';

const { 
  FiShare2, FiUsers, FiGift, FiCopy, FiMail, FiMessageSquare, 
  FiLinkedin, FiTwitter, FiDollarSign, FiTrendingUp, FiStar,
  FiCheck, FiExternalLink, FiCalendar, FiTarget, FiAward,
  FiUserPlus, FiX, FiSend, FiCreditCard, FiTrophy, FiZap,
  FiBarChart, FiActivity, FiEye
} = FiIcons;

const ReferralProgram = () => {
  const [referralCode, setReferralCode] = useState('DENTAL-DR-SMITH-2024');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [showNewReferralModal, setShowNewReferralModal] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample practitioners for smart matching
  const availablePractitioners = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Orthodontics",
      practice: "Elite Orthodontics",
      location: "New York, NY",
      rating: 4.9,
      reviews: 127,
      experience: "15 years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@eliteortho.com",
      specializations: ["Invisalign", "Braces", "Retainers"],
      verified: true,
      responseTime: "< 2 hours"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Oral Surgery",
      practice: "Advanced Oral Surgery Center",
      location: "Los Angeles, CA",
      rating: 4.8,
      reviews: 89,
      experience: "12 years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 987-6543",
      email: "michael.chen@aosc.com",
      specializations: ["Implants", "Extractions", "Jaw Surgery"],
      verified: true,
      responseTime: "< 4 hours"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Periodontics",
      practice: "Gum Health Specialists",
      location: "Chicago, IL",
      rating: 4.7,
      reviews: 156,
      experience: "18 years",
      image: "https://images.unsplash.com/photo-1594824947317-d0c8f5c1a2c4?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 456-7890",
      email: "emily.rodriguez@gumhealth.com",
      specializations: ["Gum Disease", "Implants", "Cosmetic Gum Surgery"],
      verified: true,
      responseTime: "< 1 hour"
    }
  ];

  // New Referral Form State
  const [newReferral, setNewReferral] = useState({
    name: '',
    email: '',
    practice: '',
    specialty: '',
    phone: '',
    personalMessage: ''
  });

  const referralStats = {
    totalReferrals: 12,
    successfulReferrals: 8,
    pendingReferrals: 4,
    totalEarnings: 400,
    currentMonthReferrals: 3,
    conversionRate: 67,
    availableBalance: 325,
    pendingEarnings: 150
  };

  const referralTiers = [
    {
      referrals: '1-5',
      reward: '$50',
      bonus: 'Welcome bonus',
      description: 'Get started with your first referrals',
      color: 'bg-green-500',
      current: true
    },
    {
      referrals: '6-15',
      reward: '$75',
      bonus: '10% platform discount',
      description: 'Growing your network pays off',
      color: 'bg-blue-500',
      current: false
    },
    {
      referrals: '16-30',
      reward: '$100',
      bonus: 'Featured profile',
      description: 'Become a referral champion',
      color: 'bg-purple-500',
      current: false
    },
    {
      referrals: '31+',
      reward: '$150',
      bonus: 'VIP support',
      description: 'Elite referrer benefits',
      color: 'bg-yellow-500',
      current: false
    }
  ];

  const availableRewards = [
    {
      id: 1,
      title: 'Cash Withdrawal',
      description: 'Withdraw your earnings to your bank account',
      cost: 25,
      type: 'cash',
      icon: FiDollarSign,
      minAmount: 50,
      processingTime: '3-5 business days'
    },
    {
      id: 2,
      title: 'Platform Credits',
      description: 'Apply credits to your monthly subscription',
      cost: 0,
      type: 'credits',
      icon: FiCreditCard,
      minAmount: 25,
      processingTime: 'Instant'
    },
    {
      id: 3,
      title: 'Featured Profile Boost',
      description: 'Feature your profile for 30 days',
      cost: 75,
      type: 'feature',
      icon: FiTrendingUp,
      minAmount: 75,
      processingTime: 'Within 24 hours'
    },
    {
      id: 4,
      title: 'Premium Analytics',
      description: 'Unlock advanced analytics for 3 months',
      cost: 150,
      type: 'analytics',
      icon: FiTarget,
      minAmount: 150,
      processingTime: 'Instant'
    }
  ];

  const recentReferrals = [
    {
      name: 'Dr. Jennifer Martinez',
      email: 'j.martinez@email.com',
      status: 'Active',
      joinDate: '2024-01-15',
      reward: '$50',
      specialty: 'Orthodontics'
    },
    {
      name: 'Dr. Robert Chen',
      email: 'r.chen@email.com',
      status: 'Active',
      joinDate: '2024-01-10',
      reward: '$50',
      specialty: 'Oral Surgery'
    },
    {
      name: 'Dr. Lisa Park',
      email: 'l.park@email.com',
      status: 'Pending',
      joinDate: '2024-01-08',
      reward: 'Pending',
      specialty: 'Periodontics'
    },
    {
      name: 'Dr. Michael Wilson',
      email: 'm.wilson@email.com',
      status: 'Active',
      joinDate: '2024-01-05',
      reward: '$50',
      specialty: 'Endodontics'
    }
  ];

  const shareTemplates = {
    email: {
      subject: 'Join me on Link.Refer.Dental - The future of dental referrals',
      body: `Hi [Name],

I've been using Link.Refer.Dental to manage my patient referrals and it's been a game-changer for my practice. The platform makes it so easy to connect with other dental professionals and track referrals seamlessly.

I think you'd really benefit from it too! Use my referral code ${referralCode} when you sign up and we'll both get rewarded.

Here's what I love about it:
• Streamlined referral management
• Verified network of dental professionals
• Advanced analytics and tracking
• HIPAA-compliant platform

Check it out: https://linkrefer.dental

Best regards,
Dr. Smith`
    },
    social: {
      message: `Just referred another colleague to @LinkReferDental! 🦷 The best platform for dental referral management. Use code ${referralCode} to join our growing network! #DentalReferrals #DentistryTech`
    },
    direct: {
      message: `Hey! I've been using Link.Refer.Dental for my practice referrals and love it. You should check it out - use my code ${referralCode} when you sign up!`
    }
  };

  const specialties = [
    'General Dentistry',
    'Orthodontics',
    'Oral Surgery',
    'Periodontics',
    'Endodontics',
    'Prosthodontics',
    'Pediatric Dentistry',
    'Oral Pathology'
  ];

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    }
  };

  const handleNewReferralSubmit = (e) => {
    e.preventDefault();
    console.log('Sending referral invitation:', newReferral);
    
    // Simulate sending invitation
    alert(`Referral invitation sent to ${newReferral.name} (${newReferral.email})`);
    
    // Reset form
    setNewReferral({
      name: '',
      email: '',
      practice: '',
      specialty: '',
      phone: '',
      personalMessage: ''
    });
    setShowNewReferralModal(false);
  };

  const handleRewardClaim = (reward) => {
    if (referralStats.availableBalance >= reward.minAmount) {
      alert(`${reward.title} claimed successfully! Processing time: ${reward.processingTime}`);
    } else {
      alert(`Insufficient balance. Minimum required: $${reward.minAmount}`);
    }
  };

  const handleReferralSent = (practitioner) => {
    console.log('Referral sent to:', practitioner.name);
    // This would typically update the referral tracking system
    alert(`Referral sent to ${practitioner.name} successfully!`);
  };

  const shareViaEmail = () => {
    const template = shareTemplates.email;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(template.body)}`;
    window.open(mailtoLink);
  };

  const shareViaSocial = (platform) => {
    const message = encodeURIComponent(shareTemplates.social.message);
    const url = encodeURIComponent('https://linkrefer.dental');
    
    const socialLinks = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${message}`,
      twitter: `https://twitter.com/intent/tweet?text=${message}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`
    };
    
    window.open(socialLinks[platform], '_blank');
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
            Referral Program
          </motion.h1>
          <p className="text-dental-600">
            Refer colleagues and earn rewards for growing the dental community
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowNewReferralModal(true)}
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <SafeIcon icon={FiUserPlus} className="w-5 h-5" />
            <span>New Referral</span>
          </button>
          
          <button
            onClick={() => setShowRewardsModal(true)}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <SafeIcon icon={FiGift} className="w-5 h-5" />
            <span>Claim Rewards</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'analytics'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <SafeIcon icon={FiBarChart} className="w-4 h-4 inline mr-2" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('smart-matching')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'smart-matching'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <SafeIcon icon={FiTarget} className="w-4 h-4 inline mr-2" />
            Smart Matching
          </button>
          <button
            onClick={() => setActiveTab('status-tracker')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'status-tracker'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <SafeIcon icon={FiActivity} className="w-4 h-4 inline mr-2" />
            Status Tracker
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dental-600 text-sm font-medium">Total Referrals</p>
                    <p className="text-2xl font-bold text-dental-900">{referralStats.totalReferrals}</p>
                  </div>
                  <SafeIcon icon={FiUsers} className="w-8 h-8 text-primary-600" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dental-600 text-sm font-medium">Total Earnings</p>
                    <p className="text-2xl font-bold text-dental-900">${referralStats.totalEarnings}</p>
                  </div>
                  <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-green-600" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Available Balance</p>
                    <p className="text-2xl font-bold">${referralStats.availableBalance}</p>
                  </div>
                  <SafeIcon icon={FiCreditCard} className="w-8 h-8 text-green-200" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dental-600 text-sm font-medium">Pending Earnings</p>
                    <p className="text-2xl font-bold text-dental-900">${referralStats.pendingEarnings}</p>
                  </div>
                  <SafeIcon icon={FiCalendar} className="w-8 h-8 text-yellow-600" />
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Share Your Referral Code */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <h2 className="text-2xl font-semibold text-dental-900 mb-6">
                    Share Your Referral Code
                  </h2>
                  
                  {/* Referral Code Display */}
                  <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 rounded-lg mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-dental-600 text-sm font-medium">Your referral code</p>
                        <p className="text-2xl font-bold text-dental-900 font-mono">{referralCode}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(referralCode, 'code')}
                        className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
                      >
                        <SafeIcon icon={copiedCode ? FiCheck : FiCopy} className="w-4 h-4" />
                        <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Share Methods */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-dental-900">Share via:</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Email Sharing */}
                      <div className="border border-dental-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <SafeIcon icon={FiMail} className="w-6 h-6 text-primary-600" />
                          <h4 className="font-semibold text-dental-900">Email</h4>
                        </div>
                        <p className="text-dental-600 text-sm mb-4">
                          Send a personalized email invitation
                        </p>
                        <button
                          onClick={shareViaEmail}
                          className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
                        >
                          <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
                          <span>Open Email Client</span>
                        </button>
                      </div>

                      {/* Social Media Sharing */}
                      <div className="border border-dental-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <SafeIcon icon={FiShare2} className="w-6 h-6 text-primary-600" />
                          <h4 className="font-semibold text-dental-900">Social Media</h4>
                        </div>
                        <p className="text-dental-600 text-sm mb-4">
                          Share on your social networks
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => shareViaSocial('linkedin')}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                          >
                            <SafeIcon icon={FiLinkedin} className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => shareViaSocial('twitter')}
                            className="flex-1 bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center"
                          >
                            <SafeIcon icon={FiTwitter} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Direct Share */}
                    <div className="border border-dental-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <SafeIcon icon={FiMessageSquare} className="w-6 h-6 text-primary-600" />
                        <h4 className="font-semibold text-dental-900">Direct Message</h4>
                      </div>
                      <p className="text-dental-600 text-sm mb-3">
                        Copy this message to share directly:
                      </p>
                      <div className="bg-dental-50 p-3 rounded-lg">
                        <p className="text-sm text-dental-700">{shareTemplates.direct.message}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(shareTemplates.direct.message, 'message')}
                        className="mt-3 w-full bg-dental-200 text-dental-700 py-2 rounded-lg hover:bg-dental-300 transition-colors flex items-center justify-center space-x-2"
                      >
                        <SafeIcon icon={copiedMessage ? FiCheck : FiCopy} className="w-4 h-4" />
                        <span>{copiedMessage ? 'Copied!' : 'Copy Message'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Recent Referrals */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <h2 className="text-2xl font-semibold text-dental-900 mb-6">Recent Referrals</h2>
                  <div className="space-y-4">
                    {recentReferrals.map((referral, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-dental-200 rounded-lg hover:bg-dental-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <SafeIcon icon={FiUsers} className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-dental-900">{referral.name}</p>
                            <p className="text-sm text-dental-600">{referral.specialty}</p>
                            <p className="text-xs text-dental-500">Joined: {referral.joinDate}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              referral.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {referral.status}
                          </span>
                          <p className="text-sm text-dental-600 mt-1">{referral.reward}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Referral Tiers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h2 className="text-xl font-semibold text-dental-900 mb-6">Referral Rewards</h2>
                <div className="space-y-4">
                  {referralTiers.map((tier, index) => (
                    <div 
                      key={index} 
                      className={`border-2 rounded-lg p-4 ${
                        tier.current ? 'border-primary-500 bg-primary-50' : 'border-dental-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-dental-900">{tier.referrals} Referrals</span>
                        <span className="text-lg font-bold text-primary-600">{tier.reward}</span>
                      </div>
                      <p className="text-sm text-dental-600 mb-2">{tier.description}</p>
                      <div className="bg-primary-100 px-2 py-1 rounded text-xs text-primary-600 inline-block">
                        {tier.bonus}
                      </div>
                      {tier.current && (
                        <div className="mt-2 flex items-center text-xs text-primary-600">
                          <SafeIcon icon={FiTrophy} className="w-4 h-4 mr-1" />
                          Current Tier
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <h3 className="font-semibold text-primary-900 mb-2">How it works:</h3>
                  <ul className="text-sm text-primary-700 space-y-1">
                    <li>• Share your referral code</li>
                    <li>• Colleague signs up using your code</li>
                    <li>• They complete onboarding</li>
                    <li>• You both get rewarded!</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ReferralAnalytics referralStats={referralStats} />
          </motion.div>
        )}

        {/* Smart Matching Tab */}
        {activeTab === 'smart-matching' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SmartReferralMatcher 
              availablePractitioners={availablePractitioners}
              onReferralSent={handleReferralSent}
            />
          </motion.div>
        )}

        {/* Status Tracker Tab */}
        {activeTab === 'status-tracker' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ReferralStatusTracker />
          </motion.div>
        )}

        {/* New Referral Modal */}
        {showNewReferralModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-dental-900">Send Referral Invitation</h3>
                  <button
                    onClick={() => setShowNewReferralModal(false)}
                    className="text-dental-400 hover:text-dental-600"
                  >
                    <SafeIcon icon={FiX} className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleNewReferralSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newReferral.name}
                      onChange={(e) => setNewReferral({...newReferral, name: e.target.value})}
                      className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Dr. John Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={newReferral.email}
                      onChange={(e) => setNewReferral({...newReferral, email: e.target.value})}
                      className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Practice Name
                    </label>
                    <input
                      type="text"
                      value={newReferral.practice}
                      onChange={(e) => setNewReferral({...newReferral, practice: e.target.value})}
                      className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="ABC Dental Practice"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Specialty
                    </label>
                    <select
                      value={newReferral.specialty}
                      onChange={(e) => setNewReferral({...newReferral, specialty: e.target.value})}
                      className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select Specialty</option>
                      {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newReferral.phone}
                      onChange={(e) => setNewReferral({...newReferral, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Personal Message
                    </label>
                    <textarea
                      value={newReferral.personalMessage}
                      onChange={(e) => setNewReferral({...newReferral, personalMessage: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      placeholder="Add a personal note to your invitation..."
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowNewReferralModal(false)}
                      className="flex-1 px-4 py-2 border border-dental-200 text-dental-600 rounded-lg hover:bg-dental-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <SafeIcon icon={FiSend} className="w-4 h-4" />
                      <span>Send Invitation</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* Rewards Modal */}
        {showRewardsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-dental-900">Claim Your Rewards</h3>
                    <p className="text-dental-600">Available Balance: ${referralStats.availableBalance}</p>
                  </div>
                  <button
                    onClick={() => setShowRewardsModal(false)}
                    className="text-dental-400 hover:text-dental-600"
                  >
                    <SafeIcon icon={FiX} className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableRewards.map((reward) => (
                    <div key={reward.id} className="border border-dental-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <SafeIcon icon={reward.icon} className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-dental-900">{reward.title}</h4>
                          {reward.cost > 0 && (
                            <p className="text-sm text-dental-600">Fee: ${reward.cost}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-dental-600 text-sm mb-3">{reward.description}</p>
                      <div className="space-y-2 mb-4">
                        <p className="text-xs text-dental-500">
                          Minimum: ${reward.minAmount}
                        </p>
                        <p className="text-xs text-dental-500">
                          Processing: {reward.processingTime}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRewardClaim(reward)}
                        disabled={referralStats.availableBalance < reward.minAmount}
                        className={`w-full py-2 rounded-lg font-medium transition-colors ${
                          referralStats.availableBalance >= reward.minAmount
                            ? 'bg-primary-500 text-white hover:bg-primary-600'
                            : 'bg-dental-200 text-dental-500 cursor-not-allowed'
                        }`}
                      >
                        {referralStats.availableBalance >= reward.minAmount ? 'Claim' : 'Insufficient Balance'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralProgram;