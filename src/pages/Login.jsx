import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestLogin } from '@questlabs/react-sdk';
import { useAuth } from '../context/AuthContext';
import questConfig from '../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiActivity, FiUsers, FiTrendingUp, FiShield } = FiIcons;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = ({ userId, token, newUser }) => {
    login({ userId, token, newUser });
    if (newUser) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  const features = [
    {
      icon: FiUsers,
      title: "Professional Network",
      description: "Connect with verified dental professionals nationwide"
    },
    {
      icon: FiTrendingUp,
      title: "Smart Analytics",
      description: "Track and optimize your referral performance"
    },
    {
      icon: FiShield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security for patient data"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dental-50 via-white to-primary-50 flex">
      {/* Left Section - Branding */}
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
              Welcome Back to the Future of{' '}
              <span className="block text-primary-100">Dental Referrals</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Join thousands of dental professionals who trust our platform to streamline their referral process and grow their practice.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <SafeIcon icon={feature.icon} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-primary-100 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiActivity} className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Link.Refer.Dental
              </span>
            </div>
            <h2 className="text-2xl font-bold text-dental-900 mb-2">Welcome Back</h2>
            <p className="text-dental-600">Sign in to your account</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block text-center mb-8">
            <h2 className="text-3xl font-bold text-dental-900 mb-2">Welcome Back</h2>
            <p className="text-dental-600">Sign in to continue to your dashboard</p>
          </div>

          {/* Quest Login Component */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-dental-200">
            <QuestLogin
              onSubmit={handleLogin}
              email={true}
              google={false}
              accent={questConfig.PRIMARY_COLOR}
              buttonText="Sign In"
              placeholder="Enter your email"
              className="quest-login-custom"
            />
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-dental-500 text-sm">
              Don&apos;t have an account?{' '}
              <span className="text-primary-600 font-medium">
                Sign up during login to get started
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;