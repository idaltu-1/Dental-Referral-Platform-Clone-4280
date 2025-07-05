import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { stripeService } from '../services/stripeService';
import { useAuth } from '../context/AuthContext';

const { FiCreditCard, FiCalendar, FiDollarSign, FiCheck } = FiIcons;

const SubscriptionCard = ({ plan, billingPeriod, isPopular = false }) => {
  const { user } = useAuth();
  
  const handleSubscribe = async () => {
    try {
      await stripeService.createSubscriptionCheckout(
        plan.id,
        billingPeriod,
        user?.userId,
        user?.email
      );
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Error starting subscription. Please try again.');
    }
  };

  const getPrice = () => {
    return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = () => {
    if (billingPeriod === 'yearly') {
      const monthlyCost = plan.monthlyPrice * 12;
      const yearlyCost = plan.yearlyPrice;
      return monthlyCost - yearlyCost;
    }
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white rounded-2xl shadow-lg ${
        isPopular ? 'ring-2 ring-primary-500 scale-105' : ''
      } hover:shadow-xl transition-all duration-300`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
            <SafeIcon icon={FiCheck} className="w-4 h-4" />
            <span>Most Popular</span>
          </div>
        </div>
      )}

      <div className="p-8">
        {/* Plan Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-dental-900 mb-2">{plan.name}</h3>
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold text-dental-900">${getPrice()}</span>
            <span className="text-dental-600 ml-2">
              /{billingPeriod === 'monthly' ? 'month' : 'year'}
            </span>
          </div>
          {billingPeriod === 'yearly' && getSavings() > 0 && (
            <p className="text-green-600 text-sm mt-2">
              Save ${getSavings()} per year
            </p>
          )}
        </div>

        {/* Subscribe Button */}
        <button
          onClick={handleSubscribe}
          className={`w-full py-3 px-6 rounded-lg font-medium text-center transition-all duration-200 flex items-center justify-center space-x-2 ${
            isPopular
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl'
              : 'border-2 border-primary-200 text-primary-600 hover:bg-primary-50'
          }`}
        >
          <SafeIcon icon={FiCreditCard} className="w-5 h-5" />
          <span>Subscribe Now</span>
        </button>

        <div className="mt-4 text-center">
          <p className="text-dental-500 text-xs">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionCard;