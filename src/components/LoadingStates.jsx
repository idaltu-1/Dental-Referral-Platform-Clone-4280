import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiActivity } = FiIcons;

// Skeleton Loaders
export const SkeletonCard = () => (
  <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-dental-200 rounded-full"></div>
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-dental-200 rounded w-3/4"></div>
        <div className="h-3 bg-dental-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-3 bg-dental-200 rounded"></div>
      <div className="h-3 bg-dental-200 rounded w-5/6"></div>
      <div className="h-3 bg-dental-200 rounded w-3/4"></div>
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 4 }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    <div className="p-4 border-b border-dental-200">
      <div className="h-6 bg-dental-200 rounded w-1/4"></div>
    </div>
    <div className="divide-y divide-dental-200">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4 flex space-x-4">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={`h-4 bg-dental-200 rounded ${
                colIndex === 0 ? 'w-1/4' : colIndex === 1 ? 'w-1/3' : 'w-1/5'
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonChart = () => (
  <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
    <div className="h-6 bg-dental-200 rounded w-1/3 mb-6"></div>
    <div className="h-64 bg-dental-200 rounded"></div>
  </div>
);

// Loading Spinner
export const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-primary-500',
    white: 'border-white',
    dental: 'border-dental-500'
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}></div>
  );
};

// Page Loading
export const PageLoading = ({ message = 'Loading...' }) => (
  <div className="min-h-screen bg-dental-50 flex items-center justify-center">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-6"
      >
        <SafeIcon icon={FiActivity} className="w-8 h-8 text-white" />
      </motion.div>
      <h2 className="text-xl font-semibold text-dental-900 mb-2">Link.Refer.Dental</h2>
      <p className="text-dental-600">{message}</p>
    </div>
  </div>
);

// Button Loading State
export const LoadingButton = ({ 
  children, 
  loading = false, 
  disabled = false, 
  className = '',
  ...props 
}) => (
  <button
    disabled={disabled || loading}
    className={`relative ${className} ${
      disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    {...props}
  >
    {loading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <LoadingSpinner size="sm" color="white" />
      </div>
    )}
    <span className={loading ? 'invisible' : ''}>{children}</span>
  </button>
);

// Inline Loading
export const InlineLoading = ({ text = 'Loading...', className = '' }) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <LoadingSpinner size="sm" />
    <span className="text-dental-600">{text}</span>
  </div>
);