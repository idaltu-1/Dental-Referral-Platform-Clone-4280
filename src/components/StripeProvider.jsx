import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '../services/stripeService';

const StripeProvider = ({ children }) => {
  const stripePromise = getStripe();

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;