import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMenu, FiX, FiActivity, FiUsers, FiBarChart3, FiSettings, FiGift, FiRocket } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const dashboardItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiActivity },
    { path: '/get-started', label: 'Get Started', icon: FiRocket },
    { path: '/network', label: 'Network', icon: FiUsers },
    { path: '/analytics', label: 'Analytics', icon: FiBarChart3 },
    { path: '/rewards', label: 'Rewards', icon: FiGift },
    { path: '/referral-program', label: 'Refer & Earn', icon: FiUsers },
  ];

  const isDashboard = location.pathname.startsWith('/dashboard') || 
                     location.pathname.startsWith('/get-started') ||
                     location.pathname.startsWith('/network') || 
                     location.pathname.startsWith('/analytics') || 
                     location.pathname.startsWith('/rewards') || 
                     location.pathname.startsWith('/referral-program');

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-dental-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiActivity} className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              Link.Refer.Dental
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {isDashboard ? (
              dashboardItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-dental-600 hover:text-primary-600 hover:bg-dental-50'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))
            ) : (
              navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-dental-600 hover:text-primary-600 hover:bg-dental-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {!isDashboard && (
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-dental-600 hover:bg-dental-50"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-dental-200 mt-4 pt-4 pb-4"
          >
            <div className="flex flex-col space-y-2">
              {(isDashboard ? dashboardItems : navItems).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-dental-600 hover:text-primary-600 hover:bg-dental-50'
                  }`}
                >
                  {item.icon && <SafeIcon icon={item.icon} className="w-4 h-4" />}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              {!isDashboard && (
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-lg font-medium text-center mt-4"
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;