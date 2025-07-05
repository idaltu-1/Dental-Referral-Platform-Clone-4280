// Stripe configuration with live key and updated pricing
export const stripeConfig = {
  // Use the provided live key
  STRIPE_PUBLISHABLE_KEY: 'pk_live_51PXRLcEWGT02FQpCcO7ziScyPSG1hsR5e1RGjY1U33BPzoLkwZteBYTnRZbQVjAlPLuksDFeHWxJfXi1nhvqCekl000E8CirqQ',
  
  // Payment configuration
  CURRENCY: 'usd',
  PAYMENT_METHODS: ['card'],
  
  // Updated subscription plans with new pricing structure
  PLANS: {
    STARTER: {
      id: 'starter',
      name: 'Starter',
      monthlyPriceId: 'price_starter_monthly_2024',
      yearlyPriceId: 'price_starter_yearly_2024',
      monthlyPrice: 49,
      yearlyPrice: 490,
      referralLimit: 20,
      features: [
        'Up to 20 referrals per month',
        'Basic referral management',
        'Email support',
        'Mobile app access',
        'Basic analytics',
        'HIPAA compliant platform'
      ]
    },
    PROFESSIONAL: {
      id: 'professional',
      name: 'Professional',
      monthlyPriceId: 'price_professional_monthly_2024',
      yearlyPriceId: 'price_professional_yearly_2024',
      monthlyPrice: 99,
      yearlyPrice: 990,
      referralLimit: 100,
      features: [
        'Up to 100 referrals per month',
        'Advanced referral management',
        'Priority support',
        'Advanced analytics',
        'Team collaboration',
        'Custom workflows',
        'Integration support',
        'Mobile app access'
      ]
    },
    ENTERPRISE: {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPriceId: 'price_enterprise_monthly_2024',
      yearlyPriceId: 'price_enterprise_yearly_2024',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      referralLimit: -1, // Unlimited
      features: [
        'Unlimited referrals',
        '24/7 phone support',
        'Custom integrations',
        'Dedicated account manager',
        'Advanced reporting',
        'API access',
        'Custom workflows',
        'Multi-location support',
        'Training & onboarding'
      ]
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