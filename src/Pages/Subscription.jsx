import { useState } from 'react';
import CurrentPlanCard from '../components/subscription/CurrentPlanCard';
import PlanCards from '../components/subscription/PlanCards';
import BillingHistory from '../components/subscription/BillingHistory';
import PaymentMethodCard from '../components/subscription/PaymentMethodCard';
import { CreditCard } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock current subscription data – will come from API
const MOCK_SUBSCRIPTION = {
  tier: 'paid', // 'free', 'paid', 'premium'
  status: 'active',
  currentPeriodStart: '2026-02-01T00:00:00Z',
  currentPeriodEnd: '2026-03-01T00:00:00Z',
  cancelAtPeriodEnd: false,
  paymentMethod: {
    brand: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2028,
  },
};

const MOCK_BILLING_HISTORY = [
  {
    id: 'in_1',
    date: '2026-02-01T10:00:00Z',
    amount: 2900, // $29.00
    status: 'paid',
    invoiceUrl: '#',
  },
  {
    id: 'in_2',
    date: '2026-01-01T10:00:00Z',
    amount: 2900,
    status: 'paid',
    invoiceUrl: '#',
  },
  {
    id: 'in_3',
    date: '2025-12-01T10:00:00Z',
    amount: 0, // free trial?
    status: 'paid',
    invoiceUrl: '#',
  },
];

const Subscription = () => {
  const [subscription, setSubscription] = useState(MOCK_SUBSCRIPTION);
  const [billingHistory] = useState(MOCK_BILLING_HISTORY);
  const [isLoading, setIsLoading] = useState(false);

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      // API call to create Stripe Customer Portal session
      // const response = await fetch('/api/stripe/customer-portal', { method: 'POST' });
      // const { url } = await response.json();
      // window.location.href = url;
      
      // Mock redirect
      console.log('Redirecting to Stripe Customer Portal...');
    } catch (error) {
      console.error('Failed to open customer portal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = (tier) => {
    // Would redirect to Stripe Checkout for the selected plan
    console.log(`Upgrade to ${tier}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Subscription</h1>
        <p className="text-text-secondary mt-1">
          Manage your plan and billing information
        </p>
      </div>

      {/* Current Plan Card */}
      <CurrentPlanCard subscription={subscription} onManage={handleManageBilling} isLoading={isLoading} />

      {/* Plan Comparison */}
      <PlanCards currentTier={subscription.tier} onUpgrade={handleUpgrade} />

      {/* Two-column layout for payment method & billing history */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PaymentMethodCard paymentMethod={subscription.paymentMethod} />
        </div>
        <div className="lg:col-span-2">
          <BillingHistory history={billingHistory} />
        </div>
      </div>

      {/* Additional info card */}
      <div className="bg-surface-soft rounded-lg p-4 border border-border text-sm">
        <p className="text-text-secondary">
          <span className="font-medium text-text-primary">Need help?</span> Contact us at{' '}
          <a href="mailto:support@splitedge.com" className="text-primary hover:text-primary-light">
            support@splitedge.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Subscription;