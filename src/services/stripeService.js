import { loadStripe } from '@stripe/stripe-js';
import { stripeConfig } from '../config/stripe';

// Initialize Stripe
let stripePromise;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripeConfig.STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

// Payment service class
export class StripeService {
  constructor() {
    this.stripe = null;
    this.init();
  }

  async init() {
    this.stripe = await getStripe();
  }

  // Create subscription checkout session
  async createSubscriptionCheckout(planId, billingPeriod = 'monthly', userId, userEmail) {
    try {
      const plan = stripeConfig.PLANS[planId.toUpperCase()];
      if (!plan) {
        throw new Error('Invalid plan selected');
      }

      const priceId = billingPeriod === 'yearly' ? plan.yearlyPriceId : plan.monthlyPriceId;

      // In a real app, this would call your backend API
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId,
          userEmail,
          mode: 'subscription',
          successUrl: `${window.location.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/pricing`
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // Redirect to Stripe Checkout
      const result = await this.stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  // Create one-time payment for rewards withdrawal
  async createPaymentIntent(amount, description, userId) {
    try {
      // In a real app, this would call your backend API
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          currency: stripeConfig.CURRENCY,
          description,
          userId,
        }),
      });

      const paymentIntent = await response.json();

      if (paymentIntent.error) {
        throw new Error(paymentIntent.error);
      }

      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  // Handle successful payment
  async handlePaymentSuccess(sessionId) {
    try {
      // In a real app, this would verify the session with your backend
      const response = await fetch(`/api/checkout-session/${sessionId}`);
      const session = await response.json();

      return session;
    } catch (error) {
      console.error('Error handling payment success:', error);
      throw error;
    }
  }

  // Create transfer for referral payouts
  async createPayout(amount, destination, userId) {
    try {
      // This would be handled by your backend
      const response = await fetch('/api/create-payout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          destination,
          userId,
        }),
      });

      const payout = await response.json();

      if (payout.error) {
        throw new Error(payout.error);
      }

      return payout;
    } catch (error) {
      console.error('Error creating payout:', error);
      throw error;
    }
  }

  // Get customer subscription status
  async getSubscriptionStatus(customerId) {
    try {
      const response = await fetch(`/api/subscription-status/${customerId}`);
      const subscription = await response.json();

      return subscription;
    } catch (error) {
      console.error('Error getting subscription status:', error);
      throw error;
    }
  }

  // Cancel subscription
  async cancelSubscription(subscriptionId) {
    try {
      const response = await fetch(`/api/cancel-subscription/${subscriptionId}`, {
        method: 'POST',
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      return result;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }

  // Update payment method
  async updatePaymentMethod(customerId, paymentMethodId) {
    try {
      const response = await fetch('/api/update-payment-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          paymentMethodId,
        }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      return result;
    } catch (error) {
      console.error('Error updating payment method:', error);
      throw error;
    }
  }
}

// Create a singleton instance
export const stripeService = new StripeService();