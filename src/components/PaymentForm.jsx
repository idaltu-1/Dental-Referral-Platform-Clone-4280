import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCreditCard, FiLock, FiCheck, FiX } = FiIcons;

const PaymentForm = ({ amount, description, onSuccess, onError, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      // Create payment method
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      // In a real app, you would create a payment intent on your backend
      // and confirm it here with the payment method
      
      // Simulate successful payment for demo
      setTimeout(() => {
        setProcessing(false);
        onSuccess({
          id: 'pi_demo_' + Date.now(),
          status: 'succeeded',
          amount: amount * 100,
          paymentMethod: paymentMethod.id
        });
      }, 2000);

    } catch (err) {
      setProcessing(false);
      setError(err.message);
      onError && onError(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiCreditCard} className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold text-dental-900 mb-2">Payment Details</h3>
        <p className="text-dental-600">{description}</p>
        <div className="text-2xl font-bold text-primary-600 mt-2">
          ${amount.toFixed(2)}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-dental-700 mb-2">
            Card Information
          </label>
          <div className="border border-dental-200 rounded-lg p-3 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
            <SafeIcon icon={FiX} className="w-5 h-5 text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        <div className="bg-dental-50 border border-dental-200 rounded-lg p-3">
          <div className="flex items-center space-x-2 text-dental-600 text-sm">
            <SafeIcon icon={FiLock} className="w-4 h-4" />
            <span>Your payment information is encrypted and secure</span>
          </div>
        </div>

        <div className="flex space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-dental-200 text-dental-600 rounded-lg hover:bg-dental-50 transition-colors"
              disabled={processing}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={!stripe || processing}
            className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <SafeIcon icon={FiCheck} className="w-4 h-4" />
                <span>Pay ${amount.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PaymentForm;