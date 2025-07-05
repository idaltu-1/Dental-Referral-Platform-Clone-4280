import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SubscriptionCard from '../components/SubscriptionCard';
import { stripeConfig } from '../config/stripe';

const { FiCheck, FiX, FiStar, FiUsers, FiTrendingUp, FiShield, FiZap } = FiIcons;

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = Object.values(stripeConfig.PLANS).map((plan, index) => ({
    ...plan,
    description: index === 0 
      ? "Perfect for individual practitioners starting their referral network"
      : index === 1 
      ? "Ideal for growing practices with moderate referral volume"
      : "Comprehensive solution for large practices and multi-location groups",
    features: index === 0 
      ? [
          "Up to 50 referrals per month",
          "Basic network access", 
          "Email support",
          "Mobile app access",
          "Basic analytics",
          "HIPAA compliant platform"
        ]
      : index === 1
      ? [
          "Up to 200 referrals per month",
          "Full network access",
          "Priority email support", 
          "Mobile app access",
          "Advanced analytics",
          "HIPAA compliant platform",
          "Custom workflows",
          "Team collaboration tools",
          "Integration support"
        ]
      : [
          "Unlimited referrals",
          "Premium network access",
          "24/7 phone & email support",
          "Mobile app access", 
          "Advanced analytics & reporting",
          "HIPAA compliant platform",
          "Custom workflows",
          "Team collaboration tools",
          "Custom integrations",
          "Dedicated account manager",
          "Training & onboarding",
          "API access"
        ],
    limitations: index === 0
      ? [
          "Advanced analytics",
          "Priority support", 
          "Custom integrations",
          "Team management"
        ]
      : index === 1
      ? [
          "24/7 phone support",
          "Custom integrations",
          "Dedicated account manager"
        ]
      : [],
    popular: index === 1,
    color: index === 0 ? "gray" : index === 1 ? "primary" : "purple"
  }));

  const faqs = [
    {
      question: "What's included in the free trial?",
      answer: "Your 14-day free trial includes full access to all Professional plan features, including up to 200 referrals, advanced analytics, and priority support."
    },
    {
      question: "Can I change my plan at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is my data secure and HIPAA compliant?",
      answer: "Absolutely. All plans include full HIPAA compliance with end-to-end encryption, secure data storage, and comprehensive audit trails."
    },
    {
      question: "Do you offer custom integrations?",
      answer: "Custom integrations are available with our Enterprise plan. We can integrate with most practice management systems and EHR platforms."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards through our secure Stripe payment processing. Enterprise customers can also arrange ACH transfers and invoicing."
    }
  ];

  const getPrice = (plan) => {
    return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    return monthlyCost - yearlyCost;
  };

  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-dental-900 mb-6"
          >
            Simple, Transparent
            <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
              {" "}Pricing
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-dental-600 max-w-2xl mx-auto mb-8"
          >
            Choose the perfect plan for your practice. All plans include our core features with secure Stripe payments and no hidden fees.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center space-x-4"
          >
            <span className={`font-medium ${billingPeriod === 'monthly' ? 'text-dental-900' : 'text-dental-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingPeriod === 'yearly' ? 'bg-primary-500' : 'bg-dental-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-medium ${billingPeriod === 'yearly' ? 'text-dental-900' : 'text-dental-500'}`}>
              Yearly
            </span>
            {billingPeriod === 'yearly' && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                Save up to 20%
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg ${
                  plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
                } hover:shadow-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                      <SafeIcon icon={FiStar} className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-dental-900 mb-2">{plan.name}</h3>
                    <p className="text-dental-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-dental-900">${getPrice(plan)}</span>
                      <span className="text-dental-600 ml-2">
                        /{billingPeriod === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {billingPeriod === 'yearly' && (
                      <p className="text-green-600 text-sm mt-2">
                        Save ${getSavings(plan)} per year
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-dental-700">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <SafeIcon icon={FiX} className="w-5 h-5 text-dental-300 flex-shrink-0" />
                        <span className="text-dental-400">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <SubscriptionCard 
                    plan={plan} 
                    billingPeriod={billingPeriod} 
                    isPopular={plan.popular} 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-dental-50 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dental-900 mb-4">
              Why Choose Link.Refer.Dental?
            </h2>
            <p className="text-xl text-dental-600 max-w-2xl mx-auto">
              Our platform is designed specifically for dental professionals with features that matter most to your practice.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiUsers,
                title: "Verified Network",
                description: "Connect with thousands of verified dental professionals"
              },
              {
                icon: FiTrendingUp,
                title: "Smart Analytics",
                description: "Track performance and optimize your referral process"
              },
              {
                icon: FiShield,
                title: "Secure Payments",
                description: "Enterprise-grade security powered by Stripe"
              },
              {
                icon: FiZap,
                title: "Real-time Updates",
                description: "Instant notifications and status updates"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-dental-900 mb-2">{feature.title}</h3>
                <p className="text-dental-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dental-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-dental-600">
              Have questions? We're here to help.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-semibold text-dental-900 mb-3">{faq.question}</h3>
                <p className="text-dental-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Referral Process?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of dental professionals who trust Link.Refer.Dental for their referral management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-dental-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;