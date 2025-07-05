import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OnBoarding } from '@questlabs/react-sdk';
import questConfig from '../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiActivity, FiCheckCircle, FiUsers, FiTrendingUp, FiTarget } = FiIcons;

const Onboarding = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Redirect if not authenticated
    if (!userId || !token) {
      navigate('/login');
    }
  }, [userId, token, navigate]);

  const getAnswers = () => {
    // Called when onboarding is completed
    navigate('/dashboard');
  };

  const benefits = [
    {
      icon: FiUsers,
      title: "Connect with Professionals",
      description: "Access our verified network of dental specialists"
    },
    {
      icon: FiTrendingUp,
      title: "Track Your Success",
      description: "Monitor referral performance with detailed analytics"
    },
    {
      icon: FiTarget,
      title: "Grow Your Practice",
      description: "Expand your referral network and increase revenue"
    }
  ];

  if (!userId || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dental-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dental-50 via-white to-primary-50 flex">
      {/* Left Section - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-primary-600 p-12 flex-col justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiActivity} className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Link.Refer.Dental</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Let&apos;s Get You{' '}
              <span className="block text-primary-100">Started!</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              We&apos;re setting up your profile to help you connect with the right dental professionals and streamline your referral process.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <SafeIcon icon={benefit.icon} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{benefit.title}</h3>
                  <p className="text-primary-100 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-primary-200" />
              <span className="text-primary-100 text-sm">Just a few quick questions...</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Onboarding Component */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiActivity} className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Link.Refer.Dental
              </span>
            </div>
            <h2 className="text-2xl font-bold text-dental-900 mb-2">Let&apos;s Get Started!</h2>
            <p className="text-dental-600">Setting up your profile for success</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block text-center mb-8">
            <h2 className="text-3xl font-bold text-dental-900 mb-2">Account Setup</h2>
            <p className="text-dental-600">Complete your profile to get started</p>
          </div>

          {/* Quest Onboarding Component */}
          <div className="bg-white rounded-2xl shadow-xl border border-dental-200 overflow-hidden">
            <OnBoarding
              userId={userId}
              token={token}
              questId={questConfig.QUEST_ONBOARDING_QUESTID}
              answer={answers}
              setAnswer={setAnswers}
              getAnswers={getAnswers}
              accent={questConfig.PRIMARY_COLOR}
              singleChoose="modal1"
              multiChoice="modal2"
              height="400px"
              className="quest-onboarding-custom"
            >
              <OnBoarding.Header />
              <OnBoarding.Content />
              <OnBoarding.Footer />
            </OnBoarding>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-dental-500 text-sm">
              Need help? Contact our support team at{' '}
              <span className="text-primary-600 font-medium">hello@linkrefer.dental</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;