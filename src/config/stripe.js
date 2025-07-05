// Stripe configuration
export const stripeConfig = {
  // Use environment variables in production
  STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_live_51PXRLcEWGT02FQpCcO7ziScyPSG1hsR5e1RGjY1U33BPzoLkwZteBYTnRZbQVjAlPLuksDFeHWxJfXi1nhvqCekl000E8CirqQ',
  
  // Payment configuration
  CURRENCY: 'usd',
  PAYMENT_METHODS: ['card'],
  
  // Updated subscription plans with new pricing
  PLANS: {
    STARTER: {
      id: 'starter',
      name: 'Starter',
      monthlyPriceId: 'price_starter_monthly',
      yearlyPriceId: 'price_starter_yearly',
      monthlyPrice: 79,
      yearlyPrice: 790,
      referralLimit: 20,
      features: ['Basic referral management', 'Email support', 'Mobile app access', 'Basic analytics']
    },
    PROFESSIONAL: {
      id: 'professional',
      name: 'Professional',
      monthlyPriceId: 'price_professional_monthly',
      yearlyPriceId: 'price_professional_yearly',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      referralLimit: 100,
      features: ['Advanced referral management', 'Priority support', 'Advanced analytics', 'Team collaboration', 'Custom workflows']
    },
    ENTERPRISE: {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPriceId: 'price_enterprise_monthly',
      yearlyPriceId: 'price_enterprise_yearly',
      monthlyPrice: 499,
      yearlyPrice: 4990,
      referralLimit: -1, // Unlimited
      features: ['Unlimited referrals', '24/7 phone support', 'Custom integrations', 'Dedicated account manager', 'Advanced reporting']
    },
    CELESTIAL: {
      id: 'celestial',
      name: 'Celestial',
      monthlyPriceId: null, // No pricing
      yearlyPriceId: null,
      monthlyPrice: 0,
      yearlyPrice: 0,
      referralLimit: -1, // Unlimited
      features: [
        'Unlimited everything',
        'Super admin privileges', 
        'White-label solutions',
        'Custom development',
        'Priority feature requests',
        'Direct developer access',
        'System configuration access',
        'Audit log access',
        'Security management',
        'Multi-tenant management'
      ],
      description: 'Priceless - Reserved for system administrators and key stakeholders',
      restrictedAccess: true
    }
  }
};

// Note: In production, use environment variables:
// VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
// The secret key should NEVER be exposed to the frontend