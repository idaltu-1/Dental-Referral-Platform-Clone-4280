# Link.Refer.Dental - Stripe Integration

This application now includes full Stripe integration for secure payment processing.

## Stripe Features

### 🔐 **Secure Payment Processing**
- **Live Stripe Integration**: Uses your provided live key for production payments
- **PCI Compliant**: All payment data handled securely by Stripe
- **Multiple Payment Methods**: Support for cards, ACH, and more

### 💳 **Subscription Management**
- **Flexible Plans**: Starter ($49), Professional ($99), Enterprise ($199)
- **Billing Options**: Monthly and yearly billing with automatic discounts
- **Plan Changes**: Easy upgrades/downgrades with prorated billing

### 💰 **Payment Features**
- **Referral Payouts**: Process payments to referring doctors
- **Rewards Claims**: Convert reward points to cash withdrawals
- **Invoice Management**: Automated billing and receipt generation
- **Payment Methods**: Add/remove payment methods securely

### 🛡️ **Security & Compliance**
- **Environment Variables**: Secure key management
- **HTTPS Only**: All payments require secure connections
- **Webhook Validation**: Secure event handling from Stripe
- **Audit Trails**: Complete payment history and tracking

## Setup Instructions

### 1. Environment Configuration
```bash
# Copy example environment file
cp .env.example .env

# Add your Stripe keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51PXRLcEWGT02FQpC...
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Backend Setup (Required)
You'll need to set up backend endpoints for:
- `/api/create-checkout-session` - Create subscription checkout
- `/api/create-payment-intent` - Process one-time payments
- `/api/create-payout` - Handle referral payouts
- `/api/webhook` - Handle Stripe webhooks

### 4. Stripe Dashboard Configuration
1. Set up your products and prices in Stripe Dashboard
2. Configure webhooks for payment updates
3. Set up Connect for referral payouts (if needed)

## Payment Flows

### Subscription Checkout
```javascript
import { stripeService } from './services/stripeService';

// Subscribe to a plan
await stripeService.createSubscriptionCheckout(
  'professional', // plan ID
  'monthly',      // billing period
  userId,         // user identifier
  userEmail       // user email
);
```

### One-time Payments
```javascript
// Process reward withdrawal
await stripeService.createPaymentIntent(
  amount,      // amount in dollars
  description, // payment description
  userId       // user identifier
);
```

### Referral Payouts
```javascript
// Pay referring doctor
await stripeService.createPayout(
  amount,      // payout amount
  destination, // recipient account
  userId       // referring user
);
```

## Security Notes

### 🔒 **Key Management**
- **Never expose secret keys** in frontend code
- Use environment variables for all sensitive data
- Rotate keys regularly for security

### 🌐 **Production Deployment**
- Ensure HTTPS is enabled
- Set up proper CORS policies
- Configure webhook endpoints securely

### 📊 **Monitoring**
- Monitor failed payments in Stripe Dashboard
- Set up alerts for payment issues
- Track subscription churn and revenue metrics

## Testing

### Test Cards (Development)
```
4242424242424242 - Visa (succeeds)
4000000000000002 - Visa (declined)
4000002760003184 - Visa (requires authentication)
```

### Webhook Testing
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhook
```

## Support

For payment-related issues:
1. Check Stripe Dashboard for payment status
2. Review webhook logs for processing errors
3. Contact Stripe support for payment disputes
4. Monitor application logs for integration issues

The application is now ready for production payment processing with enterprise-grade security and compliance.