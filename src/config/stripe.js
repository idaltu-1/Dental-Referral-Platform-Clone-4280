// Stripe configuration
export const stripeConfig = {
  // Use environment variables in production
  STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_live_51PXRLcEWGT02FQpCcO7ziScyPSG1hsR5e1RGjY1U33BPzoLkwZteBYTnRZbQVjAlPLuksDFeHWxJfXi1nhvqCekl000E8CirqQ',
  
  // Payment configuration
  CURRENCY: 'usd',
  PAYMENT_METHODS: ['card'],
  
  // Subscription plans
  PLANS: {
    STARTER: {
      id: 'starter',
      name: 'Starter',
      monthlyPriceId: 'price_starter_monthly',
      yearlyPriceId: 'price_starter_yearly',
      monthlyPrice: 49,
      yearlyPrice: 490
    },
    PROFESSIONAL: {
      id: 'professional',
      name: 'Professional',
      monthlyPriceId: 'price_professional_monthly',
      yearlyPriceId: 'price_professional_yearly',
      monthlyPrice: 99,
      yearlyPrice: 990
    },
    ENTERPRISE: {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPriceId: 'price_enterprise_monthly',
      yearlyPriceId: 'price_enterprise_yearly',
      monthlyPrice: 199,
      yearlyPrice: 1990
    }
  }
};

// Note: In production, use environment variables:
// VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
// The secret key should NEVER be exposed to the frontend