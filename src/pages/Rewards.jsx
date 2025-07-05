import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiGift, FiTrophy, FiStar, FiUsers, FiTarget, FiAward, FiTrendingUp, FiDollarSign, FiCalendar, FiCheckCircle, FiClock, FiZap } = FiIcons;

const Rewards = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userPoints, setUserPoints] = useState(2450);
  const [userLevel, setUserLevel] = useState('Gold');
  const [levelProgress, setLevelProgress] = useState(75);

  const rewardTiers = [
    {
      name: 'Bronze',
      minPoints: 0,
      maxPoints: 999,
      color: 'bg-orange-500',
      benefits: ['Basic rewards', 'Monthly newsletter', 'Standard support'],
      icon: FiAward
    },
    {
      name: 'Silver',
      minPoints: 1000,
      maxPoints: 2499,
      color: 'bg-gray-400',
      benefits: ['10% platform discount', 'Priority support', 'Exclusive webinars'],
      icon: FiStar
    },
    {
      name: 'Gold',
      minPoints: 2500,
      maxPoints: 4999,
      color: 'bg-yellow-500',
      benefits: ['20% platform discount', 'Featured profile', 'Advanced analytics'],
      icon: FiTrophy
    },
    {
      name: 'Platinum',
      minPoints: 5000,
      maxPoints: 9999,
      color: 'bg-purple-500',
      benefits: ['30% platform discount', 'VIP support', 'Custom integrations'],
      icon: FiZap
    },
    {
      name: 'Diamond',
      minPoints: 10000,
      maxPoints: null,
      color: 'bg-blue-500',
      benefits: ['50% platform discount', 'Dedicated account manager', 'Beta features'],
      icon: FiGift
    }
  ];

  const pointsActivities = [
    {
      activity: 'Complete referral',
      points: 100,
      description: 'Successfully complete a patient referral',
      icon: FiCheckCircle,
      frequency: 'Per referral'
    },
    {
      activity: 'Receive referral',
      points: 50,
      description: 'Accept and process an incoming referral',
      icon: FiUsers,
      frequency: 'Per referral'
    },
    {
      activity: 'Profile completion',
      points: 200,
      description: 'Complete 100% of your professional profile',
      icon: FiTarget,
      frequency: 'One-time'
    },
    {
      activity: 'Refer a colleague',
      points: 500,
      description: 'Successfully invite another dental professional',
      icon: FiGift,
      frequency: 'Per referral'
    },
    {
      activity: 'Monthly active user',
      points: 150,
      description: 'Use the platform actively for a full month',
      icon: FiCalendar,
      frequency: 'Monthly'
    },
    {
      activity: 'Patient feedback',
      points: 75,
      description: 'Receive positive patient feedback (4+ stars)',
      icon: FiStar,
      frequency: 'Per review'
    },
    {
      activity: 'Educational content',
      points: 25,
      description: 'Complete educational modules or webinars',
      icon: FiTrendingUp,
      frequency: 'Per module'
    },
    {
      activity: 'Community engagement',
      points: 30,
      description: 'Participate in forums and discussions',
      icon: FiUsers,
      frequency: 'Per post'
    }
  ];

  const availableRewards = [
    {
      id: 1,
      title: 'Free Month Subscription',
      description: 'Get one month free on your current plan',
      pointsCost: 1000,
      category: 'subscription',
      icon: FiGift,
      value: '$99',
      expires: '30 days'
    },
    {
      id: 2,
      title: 'Featured Profile Boost',
      description: 'Feature your profile for increased visibility',
      pointsCost: 750,
      category: 'promotion',
      icon: FiTrendingUp,
      value: '$75',
      expires: '30 days'
    },
    {
      id: 3,
      title: 'Premium Analytics Access',
      description: 'Unlock advanced analytics for 3 months',
      pointsCost: 1500,
      category: 'features',
      icon: FiTarget,
      value: '$150',
      expires: '90 days'
    },
    {
      id: 4,
      title: 'CE Credits Course',
      description: 'Free continuing education course (2 CE credits)',
      pointsCost: 500,
      category: 'education',
      icon: FiTrendingUp,
      value: '$50',
      expires: '60 days'
    },
    {
      id: 5,
      title: 'Dental Conference Discount',
      description: '25% off next major dental conference',
      pointsCost: 2000,
      category: 'events',
      icon: FiCalendar,
      value: '$200',
      expires: '180 days'
    },
    {
      id: 6,
      title: 'Priority Support',
      description: '24/7 priority support for 6 months',
      pointsCost: 1200,
      category: 'support',
      icon: FiZap,
      value: '$120',
      expires: '180 days'
    }
  ];

  const recentActivity = [
    {
      action: 'Completed referral to Dr. Smith',
      points: 100,
      date: '2024-01-15',
      type: 'earned'
    },
    {
      action: 'Received patient feedback (5 stars)',
      points: 75,
      date: '2024-01-14',
      type: 'earned'
    },
    {
      action: 'Redeemed: Featured Profile Boost',
      points: -750,
      date: '2024-01-12',
      type: 'redeemed'
    },
    {
      action: 'Monthly active user bonus',
      points: 150,
      date: '2024-01-01',
      type: 'earned'
    },
    {
      action: 'Referred Dr. Johnson',
      points: 500,
      date: '2023-12-28',
      type: 'earned'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Dr. Sarah Johnson', points: 8750, badge: 'Platinum' },
    { rank: 2, name: 'Dr. Michael Chen', points: 7200, badge: 'Platinum' },
    { rank: 3, name: 'Dr. Emily Rodriguez', points: 6500, badge: 'Gold' },
    { rank: 4, name: 'Dr. James Wilson', points: 5800, badge: 'Gold' },
    { rank: 5, name: 'You', points: userPoints, badge: userLevel },
    { rank: 6, name: 'Dr. Lisa Park', points: 2100, badge: 'Silver' },
    { rank: 7, name: 'Dr. Robert Martinez', points: 1950, badge: 'Silver' },
    { rank: 8, name: 'Dr. Amanda White', points: 1800, badge: 'Silver' }
  ];

  const getCurrentTier = () => {
    return rewardTiers.find(tier => 
      userPoints >= tier.minPoints && 
      (tier.maxPoints === null || userPoints <= tier.maxPoints)
    );
  };

  const getNextTier = () => {
    const currentTierIndex = rewardTiers.findIndex(tier => tier.name === userLevel);
    return currentTierIndex < rewardTiers.length - 1 ? rewardTiers[currentTierIndex + 1] : null;
  };

  const redeemReward = (rewardId, pointsCost) => {
    if (userPoints >= pointsCost) {
      setUserPoints(prev => prev - pointsCost);
      alert('Reward redeemed successfully!');
    } else {
      alert('Insufficient points for this reward.');
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
            Rewards Program
          </motion.h1>
          <p className="text-dental-600">Earn points for your engagement and redeem exciting rewards!</p>
        </div>

        {/* Points Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 rounded-xl text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100 text-sm font-medium">Total Points</p>
                <p className="text-3xl font-bold">{userPoints.toLocaleString()}</p>
              </div>
              <SafeIcon icon={FiStar} className="w-12 h-12 text-primary-200" />
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
                <p className="text-dental-600 text-sm font-medium">Current Level</p>
                <p className="text-2xl font-bold text-dental-900">{userLevel}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiTrophy} className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dental-600 text-sm font-medium">Progress to {getNextTier()?.name || 'Max Level'}</p>
                <div className="w-full bg-dental-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-dental-500 mt-1">{levelProgress}% complete</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-lg">
          {['overview', 'earn', 'redeem', 'activity', 'leaderboard'].map((tab) => (
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
          <div className="space-y-8">
            {/* Reward Tiers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-dental-900 mb-6">Reward Tiers</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {rewardTiers.map((tier, index) => (
                  <div
                    key={tier.name}
                    className={`p-4 rounded-lg border-2 ${
                      tier.name === userLevel
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-dental-200 bg-dental-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-12 h-12 ${tier.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <SafeIcon icon={tier.icon} className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-dental-900 mb-2">{tier.name}</h3>
                      <p className="text-sm text-dental-600 mb-3">
                        {tier.minPoints.toLocaleString()}
                        {tier.maxPoints ? ` - ${tier.maxPoints.toLocaleString()}` : '+'} pts
                      </p>
                      <ul className="text-xs text-dental-600 space-y-1">
                        {tier.benefits.map((benefit, idx) => (
                          <li key={idx}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <SafeIcon icon={FiCheckCircle} className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-dental-900">47</p>
                <p className="text-dental-600">Completed Referrals</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <SafeIcon icon={FiUsers} className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-dental-900">12</p>
                <p className="text-dental-600">Colleagues Referred</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <SafeIcon icon={FiStar} className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-dental-900">4.8</p>
                <p className="text-dental-600">Average Rating</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <SafeIcon icon={FiGift} className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-dental-900">8</p>
                <p className="text-dental-600">Rewards Claimed</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earn' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-dental-900 mb-6">How to Earn Points</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pointsActivities.map((activity, index) => (
                <div key={index} className="border border-dental-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <SafeIcon icon={activity.icon} className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-dental-900">{activity.activity}</h3>
                        <span className="text-lg font-bold text-primary-600">+{activity.points}</span>
                      </div>
                      <p className="text-dental-600 text-sm mb-2">{activity.description}</p>
                      <p className="text-dental-500 text-xs">{activity.frequency}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'redeem' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-dental-900 mb-6">Available Rewards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableRewards.map((reward) => (
                  <div key={reward.id} className="border border-dental-200 rounded-lg p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <SafeIcon icon={reward.icon} className="w-8 h-8 text-primary-600" />
                      </div>
                      <h3 className="font-semibold text-dental-900 mb-2">{reward.title}</h3>
                      <p className="text-dental-600 text-sm mb-3">{reward.description}</p>
                      <div className="flex items-center justify-between text-sm text-dental-500 mb-4">
                        <span>Value: {reward.value}</span>
                        <span>Expires: {reward.expires}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-600">{reward.pointsCost} pts</span>
                      <button
                        onClick={() => redeemReward(reward.id, reward.pointsCost)}
                        disabled={userPoints < reward.pointsCost}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          userPoints >= reward.pointsCost
                            ? 'bg-primary-500 text-white hover:bg-primary-600'
                            : 'bg-dental-200 text-dental-500 cursor-not-allowed'
                        }`}
                      >
                        {userPoints >= reward.pointsCost ? 'Redeem' : 'Insufficient Points'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'activity' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-dental-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-dental-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <SafeIcon 
                        icon={activity.type === 'earned' ? FiTrendingUp : FiGift} 
                        className={`w-5 h-5 ${activity.type === 'earned' ? 'text-green-600' : 'text-red-600'}`} 
                      />
                    </div>
                    <div>
                      <p className="font-medium text-dental-900">{activity.action}</p>
                      <p className="text-sm text-dental-500">{activity.date}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${
                    activity.type === 'earned' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {activity.points > 0 ? '+' : ''}{activity.points}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'leaderboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-dental-900 mb-6">Monthly Leaderboard</h2>
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    user.name === 'You' ? 'bg-primary-50 border-2 border-primary-200' : 'bg-dental-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      user.rank <= 3 ? 'bg-yellow-500 text-white' : 'bg-dental-200 text-dental-600'
                    }`}>
                      {user.rank}
                    </div>
                    <div>
                      <p className={`font-medium ${user.name === 'You' ? 'text-primary-600' : 'text-dental-900'}`}>
                        {user.name}
                      </p>
                      <p className="text-sm text-dental-500">{user.badge} Member</p>
                    </div>
                  </div>
                  <span className="font-bold text-dental-900">{user.points.toLocaleString()} pts</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Rewards;