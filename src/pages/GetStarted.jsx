import React from 'react';
import { motion } from 'framer-motion';
import { GetStarted as QuestGetStarted } from '@questlabs/react-sdk';
import questConfig from '../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiActivity, FiRocket, FiTarget, FiCheckCircle } = FiIcons;

const GetStarted = () => {
  const userId = localStorage.getItem('userId') || questConfig.USER_ID;

  const benefits = [
    {
      icon: FiTarget,
      title: "Complete Your Profile",
      description: "Set up your professional profile to connect with the right colleagues"
    },
    {
      icon: FiRocket,
      title: "Start Networking",
      description: "Join our verified network of dental professionals"
    },
    {
      icon: FiCheckCircle,
      title: "Track Progress",
      description: "Monitor your referral success and practice growth"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dental-50 via-white to-primary-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-3 mb-6"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiActivity} className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              Link.Refer.Dental
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-dental-900 mb-4"
          >
            Get Started with Your Journey
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-dental-600 max-w-2xl mx-auto"
          >
            Complete these steps to unlock the full potential of our dental referral platform
          </motion.p>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={benefit.icon} className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-dental-900 mb-2">{benefit.title}</h3>
              <p className="text-dental-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </motion.div>

        {/* GetStarted Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-dental-200 overflow-hidden"
        >
          <QuestGetStarted
            questId={questConfig.GET_STARTED_QUESTID}
            uniqueUserId={userId}
            accent={questConfig.PRIMARY_COLOR}
            autoHide={false}
          >
            <QuestGetStarted.Header />
            <QuestGetStarted.Progress />
            <QuestGetStarted.Content />
            <QuestGetStarted.Footer />
          </QuestGetStarted>
        </motion.div>

        {/* Footer Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-dental-500 text-sm">
            Need help? Contact our support team at{' '}
            <span className="text-primary-600 font-medium">hello@linkrefer.dental</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStarted;