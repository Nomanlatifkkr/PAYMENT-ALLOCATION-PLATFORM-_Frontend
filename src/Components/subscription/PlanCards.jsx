import { Check, Crown, Zap, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

const plans = [
  {
    id: 'free',
    name: 'Free',
    icon: Star,
    price: 0,
    priceLabel: 'Free',
    features: [
      'Main destination only',
      'Basic dashboard',
      'Payment history',
    ],
    color: 'text-text-secondary',
    bg: 'bg-surface-hover',
    buttonVariant: 'outline',
  },
  {
    id: 'paid',
    name: 'Paid',
    icon: Zap,
    price: 2900, // $29.00
    priceLabel: '$29/month',
    features: [
      'Main + 2 reserve destinations',
      'Allocation rules',
      'Full reporting',
      'CSV exports',
    ],
    color: 'text-primary',
    bg: 'bg-primary/10',
    buttonVariant: 'primary',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: Crown,
    price: 9900, // $99.00
    priceLabel: '$99/month',
    features: [
      'Main + unlimited reserves',
      'Advanced allocation rules',
      'Priority support',
      'API access',
    ],
    color: 'text-warning',
    bg: 'bg-warning/10',
    buttonVariant: 'outline',
  },
];

const PlanCards = ({ currentTier, onUpgrade }) => {
  const formatMoney = (cents) => {
    if (cents === 0) return 'Free';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(cents / 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => {
        const isCurrent = plan.id === currentTier;
        const Icon = plan.icon;

        return (
          <div
            key={plan.id}
            className={cn(
              'bg-surface rounded-xl p-6 border transition-all',
              isCurrent
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-border hover:border-primary/30 hover:shadow-md'
            )}
          >
            {plan.popular && (
              <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full inline-block mb-3">
                Most Popular
              </div>
            )}
            <div className="flex items-center gap-2 mb-4">
              <div className={cn('p-2 rounded-lg', plan.bg, plan.color)}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">{plan.name}</h3>
            </div>
            <p className="text-2xl font-bold mb-4">{plan.priceLabel}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
            {isCurrent ? (
              <button
                disabled
                className="w-full py-2 px-4 bg-surface-soft text-text-secondary rounded-lg text-sm font-medium cursor-default"
              >
                Current Plan
              </button>
            ) : (
              <button
                onClick={() => onUpgrade(plan.id)}
                className={cn(
                  'w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors',
                  plan.buttonVariant === 'primary'
                    ? 'bg-primary text-white hover:bg-primary-light'
                    : 'border border-border hover:bg-surface-hover'
                )}
              >
                {plan.id === 'free' ? 'Downgrade' : 'Upgrade'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlanCards;