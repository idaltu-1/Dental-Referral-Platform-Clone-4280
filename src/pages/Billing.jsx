import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import StripeProvider from '../components/StripeProvider';
import PaymentForm from '../components/PaymentForm';
import { stripeService } from '../services/stripeService';
import { stripeConfig } from '../config/stripe';

const { FiCreditCard, FiCalendar, FiDollarSign, FiDownload, FiEye, FiEdit, FiTrash2, FiPlus } = FiIcons;

const Billing = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [invoices, setInvoices] = useState([]);

  // Mock data - in real app, fetch from your backend
  useEffect(() => {
    // Simulate loading subscription data
    setSubscription({
      id: 'sub_1234567890',
      plan: 'Professional',
      status: 'active',
      currentPeriodStart: '2024-01-01',
      currentPeriodEnd: '2024-02-01',
      amount: 99,
      interval: 'month'
    });

    setPaymentMethods([
      {
        id: 'pm_1234567890',
        type: 'card',
        brand: 'visa',
        last4: '4242',
        expMonth: 12,
        expYear: 2025,
        isDefault: true
      }
    ]);

    setInvoices([
      {
        id: 'in_1234567890',
        date: '2024-01-01',
        amount: 99,
        status: 'paid',
        description: 'Professional Plan - Monthly',
        downloadUrl: '#'
      },
      {
        id: 'in_0987654321',
        date: '2023-12-01',
        amount: 99,
        status: 'paid',
        description: 'Professional Plan - Monthly',
        downloadUrl: '#'
      }
    ]);
  }, []);

  const handlePaymentSuccess = (paymentResult) => {
    console.log('Payment successful:', paymentResult);
    setShowPaymentForm(false);
    alert('Payment processed successfully!');
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    alert('Payment failed. Please try again.');
  };

  const handleCancelSubscription = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      try {
        await stripeService.cancelSubscription(subscription.id);
        alert('Subscription cancelled successfully');
        // Refresh subscription data
      } catch (error) {
        alert('Error cancelling subscription. Please try again.');
      }
    }
  };

  const handleUpdatePaymentMethod = () => {
    alert('Payment method update feature coming soon!');
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
            Billing & Payments
          </motion.h1>
          <p className="text-dental-600">Manage your subscription and payment methods</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-lg">
          {['overview', 'subscription', 'payments', 'invoices'].map((tab) => (
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
            {/* Current Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold text-dental-900 mb-6">Current Subscription</h2>
              {subscription ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-dental-600 text-sm">Plan</p>
                    <p className="text-xl font-bold text-dental-900">{subscription.plan}</p>
                  </div>
                  <div>
                    <p className="text-dental-600 text-sm">Status</p>
                    <span className="inline-flex px-2 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                      {subscription.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-dental-600 text-sm">Next Billing</p>
                    <p className="text-lg font-semibold text-dental-900">{subscription.currentPeriodEnd}</p>
                  </div>
                </div>
              ) : (
                <p className="text-dental-600">No active subscription</p>
              )}
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setShowPaymentForm(true)}
              >
                <SafeIcon icon={FiPlus} className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-dental-900 mb-2">Add Payment Method</h3>
                <p className="text-dental-600 text-sm">Add a new card or payment method</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer"
              >
                <SafeIcon icon={FiDownload} className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-dental-900 mb-2">Download Invoices</h3>
                <p className="text-dental-600 text-sm">Get your billing history</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer"
                onClick={handleUpdatePaymentMethod}
              >
                <SafeIcon icon={FiEdit} className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-dental-900 mb-2">Update Payment</h3>
                <p className="text-dental-600 text-sm">Change your payment method</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer"
                onClick={handleCancelSubscription}
              >
                <SafeIcon icon={FiTrash2} className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-dental-900 mb-2">Cancel Subscription</h3>
                <p className="text-dental-600 text-sm">End your current plan</p>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'subscription' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold text-dental-900 mb-6">Subscription Details</h2>
            {subscription && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-dental-900 mb-3">Plan Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-dental-600">Plan:</span>
                        <span className="font-medium">{subscription.plan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dental-600">Price:</span>
                        <span className="font-medium">${subscription.amount}/{subscription.interval}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dental-600">Status:</span>
                        <span className="font-medium capitalize">{subscription.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-dental-900 mb-3">Billing Cycle</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-dental-600">Current Period Start:</span>
                        <span className="font-medium">{subscription.currentPeriodStart}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dental-600">Current Period End:</span>
                        <span className="font-medium">{subscription.currentPeriodEnd}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dental-600">Next Billing:</span>
                        <span className="font-medium">{subscription.currentPeriodEnd}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-dental-200 pt-6">
                  <div className="flex space-x-4">
                    <button
                      onClick={handleUpdatePaymentMethod}
                      className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Change Plan
                    </button>
                    <button
                      onClick={handleCancelSubscription}
                      className="border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'payments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-dental-900">Payment Methods</h2>
              <button
                onClick={() => setShowPaymentForm(true)}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                <span>Add Payment Method</span>
              </button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border border-dental-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <SafeIcon icon={FiCreditCard} className="w-6 h-6 text-dental-600" />
                    <div>
                      <p className="font-medium text-dental-900">
                        **** **** **** {method.last4}
                      </p>
                      <p className="text-sm text-dental-600">
                        {method.brand.toUpperCase()} • Expires {method.expMonth}/{method.expYear}
                      </p>
                    </div>
                    {method.isDefault && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-primary-600 hover:text-primary-700">
                      <SafeIcon icon={FiEdit} className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'invoices' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-dental-200">
              <h2 className="text-xl font-semibold text-dental-900">Invoice History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dental-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-dental-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-dental-900">
                          {invoice.id}
                        </div>
                        <div className="text-sm text-dental-500">
                          {invoice.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dental-900">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dental-900">
                        ${invoice.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-primary-600 hover:text-primary-900">
                            <SafeIcon icon={FiEye} className="w-4 h-4" />
                          </button>
                          <button className="text-dental-600 hover:text-dental-900">
                            <SafeIcon icon={FiDownload} className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Payment Form Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <StripeProvider>
              <PaymentForm
                amount={99}
                description="Add Payment Method"
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                onCancel={() => setShowPaymentForm(false)}
              />
            </StripeProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;