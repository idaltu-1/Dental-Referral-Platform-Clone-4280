import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestLogin } from '@questlabs/react-sdk';
import { useAuth } from '../context/AuthContext';
import questConfig from '../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiActivity,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiUserPlus,
  FiLogIn,
  FiCheck,
  FiAlertCircle
} = FiIcons;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [authMode, setAuthMode] = useState('quest'); // 'quest' or 'password'
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    practice: '',
    specialty: ''
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

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

  const handleQuestLogin = ({ userId, token, newUser }) => {
    login({ userId, token, newUser });
    if (newUser) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  const validatePassword = (password) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    strength = Object.values(checks).filter(Boolean).length;
    return { strength, checks };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time password strength validation
    if (field === 'password') {
      const { strength } = validatePassword(value);
      setPasswordStrength(strength);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const { checks } = validatePassword(formData.password);
      if (!checks.length) {
        newErrors.password = 'Password must be at least 8 characters long';
      }
    }

    // Confirm password validation (only for sign up)
    if (isSignUp) {
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      }

      if (!formData.practice.trim()) {
        newErrors.practice = 'Practice name is required';
      }

      if (!formData.specialty) {
        newErrors.specialty = 'Please select your specialty';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordAuth = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call for authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isSignUp) {
        // Simulate user creation
        const newUser = {
          userId: `user_${Date.now()}`,
          token: `token_${Date.now()}`,
          email: formData.email,
          name: formData.name,
          practice: formData.practice,
          specialty: formData.specialty,
          newUser: true
        };
        
        login(newUser);
        navigate('/onboarding');
      } else {
        // Simulate login
        const existingUser = {
          userId: `user_${Date.now()}`,
          token: `token_${Date.now()}`,
          email: formData.email,
          newUser: false
        };
        
        login(existingUser);
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return 'Enter password';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

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
              Welcome to the Future of{' '}
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

      {/* Right Section - Authentication Forms */}
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
            <h2 className="text-3xl font-bold text-dental-900 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-dental-600">
              {isSignUp ? 'Join our professional network' : 'Sign in to continue to your dashboard'}
            </p>
          </div>

          {/* Authentication Method Toggle */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-dental-200 mb-6">
            <div className="flex space-x-1 mb-6 bg-dental-100 p-1 rounded-lg">
              <button
                onClick={() => setAuthMode('quest')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  authMode === 'quest'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-dental-600'
                }`}
              >
                Quick Login
              </button>
              <button
                onClick={() => setAuthMode('password')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  authMode === 'password'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-dental-600'
                }`}
              >
                Password Login
              </button>
            </div>

            {/* Quest Login */}
            {authMode === 'quest' && (
              <div>
                <h3 className="text-lg font-semibold text-dental-900 mb-4">
                  Sign in with Email
                </h3>
                <QuestLogin
                  onSubmit={handleQuestLogin}
                  email={true}
                  google={false}
                  accent={questConfig.PRIMARY_COLOR}
                  buttonText="Continue with Email"
                  placeholder="Enter your email address"
                  className="quest-login-custom"
                />
                <p className="text-dental-500 text-sm mt-4 text-center">
                  We'll send you a secure login link
                </p>
              </div>
            )}

            {/* Password Authentication */}
            {authMode === 'password' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-dental-900">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </h3>
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    {isSignUp ? 'Sign In Instead' : 'Create Account'}
                  </button>
                </div>

                <form onSubmit={handlePasswordAuth} className="space-y-4">
                  {/* Sign Up Fields */}
                  {isSignUp && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-dental-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <SafeIcon icon={FiUsers} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                              errors.name ? 'border-red-500' : 'border-dental-200'
                            }`}
                            placeholder="Dr. John Smith"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-dental-700 mb-2">
                            Practice Name *
                          </label>
                          <input
                            type="text"
                            value={formData.practice}
                            onChange={(e) => handleInputChange('practice', e.target.value)}
                            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                              errors.practice ? 'border-red-500' : 'border-dental-200'
                            }`}
                            placeholder="ABC Dental"
                          />
                          {errors.practice && (
                            <p className="text-red-500 text-sm mt-1">{errors.practice}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-dental-700 mb-2">
                            Specialty *
                          </label>
                          <select
                            value={formData.specialty}
                            onChange={(e) => handleInputChange('specialty', e.target.value)}
                            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                              errors.specialty ? 'border-red-500' : 'border-dental-200'
                            }`}
                          >
                            <option value="">Select Specialty</option>
                            {specialties.map((specialty) => (
                              <option key={specialty} value={specialty}>
                                {specialty}
                              </option>
                            ))}
                          </select>
                          {errors.specialty && (
                            <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                          errors.email ? 'border-red-500' : 'border-dental-200'
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                          errors.password ? 'border-red-500' : 'border-dental-200'
                        }`}
                        placeholder={isSignUp ? 'Create a strong password' : 'Enter your password'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dental-400 hover:text-dental-600"
                      >
                        <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator (Sign Up Only) */}
                    {isSignUp && formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-1">
                            <div
                              className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-dental-600">{getPasswordStrengthText()}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <div className="flex items-center space-x-1">
                            <SafeIcon 
                              icon={formData.password.length >= 8 ? FiCheck : FiAlertCircle} 
                              className={`w-3 h-3 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}
                            />
                            <span className={formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}>
                              8+ characters
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <SafeIcon 
                              icon={/[A-Z]/.test(formData.password) ? FiCheck : FiAlertCircle} 
                              className={`w-3 h-3 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}
                            />
                            <span className={/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                              Uppercase
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <SafeIcon 
                              icon={/\d/.test(formData.password) ? FiCheck : FiAlertCircle} 
                              className={`w-3 h-3 ${/\d/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}
                            />
                            <span className={/\d/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                              Number
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <SafeIcon 
                              icon={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? FiCheck : FiAlertCircle} 
                              className={`w-3 h-3 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}
                            />
                            <span className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                              Special char
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password (Sign Up Only) */}
                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-medium text-dental-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                            errors.confirmPassword ? 'border-red-500' : 'border-dental-200'
                          }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dental-400 hover:text-dental-600"
                        >
                          <SafeIcon icon={showConfirmPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-1" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Submit Error */}
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-700 text-sm flex items-center">
                        <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-2" />
                        {errors.submit}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <SafeIcon icon={isSignUp ? FiUserPlus : FiLogIn} className="w-5 h-5" />
                        <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-dental-500 text-sm">
              {authMode === 'quest' ? (
                <>
                  Secure authentication powered by Quest Labs.{' '}
                  <button
                    onClick={() => setAuthMode('password')}
                    className="text-primary-600 font-medium hover:underline"
                  >
                    Use password instead
                  </button>
                </>
              ) : (
                <>
                  Your data is encrypted and secure.{' '}
                  <button
                    onClick={() => setAuthMode('quest')}
                    className="text-primary-600 font-medium hover:underline"
                  >
                    Use quick login instead
                  </button>
                </>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;